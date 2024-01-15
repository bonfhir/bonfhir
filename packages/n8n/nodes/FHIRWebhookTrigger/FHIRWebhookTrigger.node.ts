import { IHookFunctions, IWebhookFunctions } from "n8n-core";
import {
  IDataObject,
  INodeType,
  INodeTypeDescription,
  IWebhookResponseData,
} from "n8n-workflow";

import { FetchFhirClient, FhirClient, build } from "@bonfhir/core/r4b";
import { resourceTypes } from "./Resources";

export class FHIRWebhookTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: "FHIR Webhook Trigger",
    name: "fhirWebhookTrigger",
    icon: "file:FHIRWebhookTrigger.svg",
    group: ["trigger"],
    version: 1,
    description: "Triggers the workflow when a FHIR webhook is received.",
    defaults: {
      name: "FHIR Webhook Trigger",
      color: "#1A82e2",
    },
    inputs: [],
    outputs: ["main"],
    properties: [
      {
        displayName: "FHIR base URL",
        name: "fhirBaseUrl",
        type: "string",
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
          },
        ],
      },
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        default: "patient",
        options: resourceTypes,
        required: true,
        description: "The resource type to listen for.",
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
        name: "FhirOAuth2Api",
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
        const credentials = await this.getCredentials("FhirOAuth2Api");
        const fhirBaseUrl = this.getNodeParameter("fhirBaseUrl") as string;

        const client: FhirClient = new FetchFhirClient({
          baseUrl: fhirBaseUrl,
          // @ts-expect-error TODO: these are set.
          auth: `${credentials.oauthTokenData.token_type} ${credentials.oauthTokenData.access_token}`,
        });

        const webhookUrl = this.getNodeWebhookUrl("default");
        const searchResults = await client.search("Subscription", (search) =>
          search.status("active").url(webhookUrl),
        );

        const matchingSubscription = searchResults.searchMatch()[0];

        if (matchingSubscription) return true;
        return false;
      },

      async create(this: IHookFunctions): Promise<boolean> {
        const defaultWebhookUrl = this.getNodeWebhookUrl("default");
        const webhookData = this.getWorkflowStaticData("node");

        const additionalFields = this.getNodeParameter(
          "additionalFields",
        ) as IDataObject;

        const webhookUrl =
          additionalFields.overrideWebhookUrl || defaultWebhookUrl;
        const fhirBaseUrl = this.getNodeParameter("fhirBaseUrl") as string;

        const resource = this.getNodeParameter("resource") as string;
        const credentials = await this.getCredentials("FhirOAuth2Api");
        const client: FhirClient = new FetchFhirClient({
          baseUrl: fhirBaseUrl,
          // @ts-expect-error TODO: these are set.
          auth: `${credentials.oauthTokenData.token_type} ${credentials.oauthTokenData.access_token}`,
        });

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
        const webhookData = this.getWorkflowStaticData("node");
        const fhirBaseUrl = this.getNodeParameter("fhirBaseUrl") as string;

        const credentials = await this.getCredentials("FhirOAuth2Api");
        const client: FhirClient = new FetchFhirClient({
          baseUrl: fhirBaseUrl,
          // @ts-expect-error TODO: these are set.
          auth: `${credentials.oauthTokenData.token_type} ${credentials.oauthTokenData.access_token}`,
        });

        if (!webhookData.subscriptionId) {
          return false;
        }
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
