import { IHookFunctions, IWebhookFunctions } from "n8n-core";
import {
  IDataObject,
  INodePropertyOptions,
  INodeType,
  INodeTypeDescription,
  IWebhookResponseData,
} from "n8n-workflow";

import {
  DomainResourceTypes,
  FetchFhirClient,
  FhirClient,
  build,
} from "@bonfhir/core/r4b";

const resourceTypes: INodePropertyOptions[] = DomainResourceTypes.map(
  (type) => ({
    name: type as string,
    value: type as string,
  }),
);

const createClient = async (data: IHookFunctions): Promise<FhirClient> => {
  const credentials = await data.getCredentials("fhirOAuth2Api");
  const fhirBaseUrl = data.getNodeParameter("fhirBaseUrl") as string;

  return new FetchFhirClient({
    baseUrl: fhirBaseUrl,
    // @ts-expect-error TODO: these are set.
    auth: `${credentials.oauthTokenData.token_type} ${credentials.oauthTokenData.access_token}`,
  });
};

export class FhirWebhookTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: "FHIR Webhook Trigger",
    name: "fhirWebhookTrigger",
    icon: "file:FhirWebhookTrigger.svg",
    group: ["trigger"],
    version: 1,
    description: "Triggers the workflow when a FHIR webhook is received.",
    defaults: {
      name: "FHIR Webhook Trigger",
    },
    inputs: [],
    outputs: ["main"],
    properties: [
      {
        displayName: "FHIR Base URL",
        name: "fhirBaseUrl",
        type: "string",
        description: "The base URL of the FHIR server API",
        default: "http://localhost:8103/fhir/R4",
      },
      {
        displayName: "Additional Fields",
        name: "additionalFields",
        type: "collection",
        placeholder: "Add Field",
        default: {},
        options: [
          {
            displayName: "Override Webhook URL",
            name: "overrideWebhookUrl",
            type: "string",
            default: "",
            description:
              "If you're running n8n locally, you can use this to override the webhook URL",
          },
        ],
      },
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        noDataExpression: true,
        default: "patient",
        options: resourceTypes,
        required: true,
        description: "The resource type to subscribe for changes",
      },
    ],
    webhooks: [
      {
        name: "default",
        httpMethod: "POST",
        responseMode: "onReceived",
        path: "webhook",
      },
    ],
    credentials: [
      {
        name: "fhirOAuth2Api",
        required: true,
      },
    ],
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const req = this.getRequestObject();

    const rawResource = Buffer.from(req.rawBody);
    const resource = JSON.parse(rawResource.toString());

    return {
      workflowData: [this.helpers.returnJsonArray(resource)],
    };
  }

  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions): Promise<boolean> {
        const client = await createClient(this);

        const webhookUrl = this.getNodeWebhookUrl("default");
        const searchResults = await client.search("Subscription", (search) =>
          search.status("active").url(webhookUrl),
        );

        return searchResults.searchMatch().length > 0;
      },

      async create(this: IHookFunctions): Promise<boolean> {
        const client = await createClient(this);

        const defaultWebhookUrl = this.getNodeWebhookUrl("default");
        const webhookData = this.getWorkflowStaticData("node");

        const additionalFields = this.getNodeParameter(
          "additionalFields",
        ) as IDataObject;
        const webhookUrl =
          additionalFields.overrideWebhookUrl || defaultWebhookUrl;
        const resource = this.getNodeParameter("resource") as string;

        const subscription = await client.create(
          build("Subscription", {
            status: "active",
            reason: "n8n workflow trigger",
            criteria: resource,
            channel: {
              type: "rest-hook",
              endpoint: webhookUrl as string,
              payload: "application/fhir+json",
            },
          }),
        );

        const subscriptionId = subscription.id;
        webhookData.subscriptionId = subscriptionId;

        return true;
      },

      async delete(this: IHookFunctions): Promise<boolean> {
        const client = await createClient(this);
        const webhookData = this.getWorkflowStaticData("node");
        if (!webhookData.subscriptionId) return false;

        await client.delete(
          "Subscription",
          webhookData.subscriptionId as string,
        );

        delete webhookData.subscriptionId;
        return true;
      },
    },
  };
}
