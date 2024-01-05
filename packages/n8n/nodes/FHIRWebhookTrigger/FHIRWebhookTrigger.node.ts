import { IHookFunctions, IWebhookFunctions } from "n8n-core";
import {
  INodeType,
  INodeTypeDescription,
  IWebhookResponseData,
} from "n8n-workflow";

import { FetchFhirClient, FhirClient } from "@bonfhir/core/r4b";

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
    return {
      workflowData: [this.helpers.returnJsonArray(req.body)],
    };
  }

  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions): Promise<boolean> {
        console.log("checkExists");

        const client: FhirClient = new FetchFhirClient({
          baseUrl: "http://fhir-server/fhir/R4",
          auth: "Basic <basic-auth-key>",
        });

        console.log("client", client);

        // const webhookData = this.getWorkflowStaticData("node");
        // const webhookUrl = this.getNodeWebhookUrl("default");
        // const event = this.getNodeParameter("event") as string;

        // const { hooks: webhooks } = await autofriendApiRequest.call(this, 'GET', '/hooks');
        // for (const webhook of webhooks) {
        //   if (webhook.target_url === webhookUrl && webhook.event === snakeCase(event)) {
        //     webhookData.webhookId = webhook.hook_id;
        //     return true;
        //   }
        // }
        return false;
      },

      async create(this: IHookFunctions): Promise<boolean> {
        console.log("create");
        // const webhookUrl = this.getNodeWebhookUrl("default");
        // const webhookData = this.getWorkflowStaticData("node");
        // const event = this.getNodeParameter("event") as string;

        // const body: IDataObject = {
        //   event: snakeCase(event),
        //   target_url: webhookUrl,
        // };

        // const webhook = await autofriendApiRequest.call(this, 'POST', '/hook', body);
        // webhookData.webhookId = webhook.hook_id;
        return true;
      },

      async delete(this: IHookFunctions): Promise<boolean> {
        console.log("delete");
        const webhookData = this.getWorkflowStaticData("node");
        try {
          // await autofriendApiRequest.call(this, 'DELETE', `/hook/${webhookData.webhookId}`);
        } catch {
          return false;
        }
        delete webhookData.webhookId;
        return true;
      },
    },
  };
}
