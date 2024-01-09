import { IHookFunctions, IWebhookFunctions } from "n8n-core";
import {
  INodeType,
  INodeTypeDescription,
  IWebhookResponseData,
} from "n8n-workflow";

import { FetchFhirClient, FhirClient, build } from "@bonfhir/core/r4b";

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
    properties: [],
    webhooks: [
      {
        name: "default",
        httpMethod: "POST",
        responseMode: "onReceived",
        path: "",
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
    return {
      workflowData: [this.helpers.returnJsonArray(req.body)],
    };
  }

  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions): Promise<boolean> {
        const credentials = await this.getCredentials("FhirOAuth2Api");
        const client: FhirClient = new FetchFhirClient({
          baseUrl: "http://localhost:8103/fhir/R4",
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
        const webhookUrl = this.getNodeWebhookUrl("default");
        const webhookData = this.getWorkflowStaticData("node");

        const credentials = await this.getCredentials("FhirOAuth2Api");
        const client: FhirClient = new FetchFhirClient({
          baseUrl: "http://localhost:8103/fhir/R4",
          // @ts-expect-error TODO: these are set.
          auth: `${credentials.oauthTokenData.token_type} ${credentials.oauthTokenData.access_token}`,
        });

        const subscription = await client.create(
          build("Subscription", {
            status: "active",
            reason: "n8n workflow trigger",
            criteria: "Patient",
            channel: {
              type: "rest-hook",
              endpoint: webhookUrl,
            },
          }),
        );

        const subscriptionId = subscription.id;
        webhookData.subscriptionId = subscriptionId;

        return true;
      },

      async delete(this: IHookFunctions): Promise<boolean> {
        const webhookData = this.getWorkflowStaticData("node");

        const credentials = await this.getCredentials("FhirOAuth2Api");
        const client: FhirClient = new FetchFhirClient({
          baseUrl: "http://localhost:8103/fhir/R4",
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
