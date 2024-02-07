import type {
  IHookFunctions,
  INodeType,
  INodeTypeDescription,
  IWebhookFunctions,
  IWebhookResponseData,
} from "n8n-workflow";
import { DomainResourceTypes } from "../../domain-resource-types.codegen";
import {
  authenticationField,
  credentials,
  getAuthParameters,
  requestWithAuth,
} from "./Functions";

export class BonfhirTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: "bonFHIR Trigger",
    name: "bonfhirTrigger",
    version: 1,
    icon: "file:Bonfhir.svg",
    group: ["trigger"],
    description: "Starts the workflow when a FHIR Subscription is triggered",
    subtitle:
      '={{$parameter["resourceType"] + ($parameter["searchCriteria"] ? "?"+$parameter["searchCriteria"] : "")}}',
    defaults: {
      name: "bonFHIR Trigger",
    },
    inputs: [""],
    outputs: ["main"],
    credentials,
    webhooks: [
      {
        name: "default",
        httpMethod: "POST",
        responseMode: "onReceived",
        path: "webhook",
      },
    ],
    properties: [
      {
        displayName: "Event",
        name: "event",
        type: "options",
        options: [
          {
            name: "FHIR Subscription",
            value: "fhirSubscription",
          },
        ],
        required: true,
        default: "fhirSubscription",
      },
      authenticationField,
      {
        displayName: "Base URL",
        name: "baseUrl",
        type: "string",
        description: "The base URL of the FHIR server API",
        required: true,
        default: "http://example.com/fhir",
      },
      {
        displayName: "Resource Type",
        name: "resourceType",
        type: "options",
        required: true,
        // eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
        default: "",
        options: [
          ...DomainResourceTypes.map((resourceType) => ({
            name: resourceType,
            value: resourceType,
          })),
          { name: "- Custom -", value: "customResourceType" },
        ],
      },
      {
        displayName: "Custom Resource Type",
        name: "customResourceType",
        type: "string",
        required: true,
        default: "",
        displayOptions: {
          show: {
            resourceType: ["customResourceType"],
          },
        },
      },
      {
        displayName: "Search Criteria",
        name: "searchCriteria",
        type: "string",
        default: "",
        description:
          'Additional search criteria to filter the subscription. Do not include the resource type in the search criteria, nor the "?".',
      },
      {
        displayName: "Reason",
        name: "reason",
        type: "string",
        required: true,
        default: "",
        description:
          "The reason for the subscription. This is a human-readable explanation of why the subscription is defined.",
      },
      {
        displayName: "Shared Secret",
        name: "secret",
        type: "string",
        typeOptions: {
          password: true,
        },
        default: `${Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)}`,
        description:
          "The shared secret to secure the webhook. Leave it empty to disable.",
      },
      {
        displayName: "Payload",
        name: "payload",
        type: "string",
        default: "application/fhir+json",
        description:
          "The payload format. Leave it as application/fhir+JSON unless you know what you are doing.",
      },
      {
        displayName: "Ignore SSL Issues",
        name: "allowUnauthorizedCerts",
        type: "boolean",
        default: false,
        description:
          "Whether to connect even if SSL certificate validation is not possible",
      },
    ],
  };

  async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
    const req = this.getRequestObject();

    const secret = this.getNodeParameter("secret") as string;
    if (secret) {
      const header = req.headers["x-subscription-auth"];
      if (header !== secret) {
        return {};
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawResource = Buffer.from((req as any).rawBody);
    const resource = JSON.parse(rawResource.toString());

    return {
      workflowData: [this.helpers.returnJsonArray(resource)],
    };
  }

  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions) {
        const allowUnauthorizedCerts = this.getNodeParameter(
          "allowUnauthorizedCerts",
          false,
        ) as boolean;
        let baseUrl = (this.getNodeParameter("baseUrl") as string)?.trim();
        if (baseUrl.endsWith("/")) {
          baseUrl = baseUrl.slice(0, -1);
        }
        const webhookUrl = this.getNodeWebhookUrl("default");

        const response = await requestWithAuth(
          this,
          {
            method: "GET",
            headers: {
              "content-type": `application/fhir+json`,
            },
            uri: `${baseUrl}/Subscription`,
            qs: {
              _count: 1,
              status: "active",
              url: webhookUrl,
            },
            json: true,
            simple: false,
            rejectUnauthorized: !allowUnauthorizedCerts,
          },
          await getAuthParameters(this),
        );
        return response.entry && response.entry.length > 0;
      },

      async create(this: IHookFunctions) {
        const allowUnauthorizedCerts = this.getNodeParameter(
          "allowUnauthorizedCerts",
          false,
        ) as boolean;
        let baseUrl = (this.getNodeParameter("baseUrl") as string)?.trim();
        if (baseUrl.endsWith("/")) {
          baseUrl = baseUrl.slice(0, -1);
        }
        const webhookUrl = this.getNodeWebhookUrl("default");
        const reason = this.getNodeParameter("reason") as string;
        const payload = this.getNodeParameter("payload") as string;
        const secret = this.getNodeParameter("secret") as string;
        let resourceType = this.getNodeParameter("resourceType", "") as string;
        if (resourceType === "customResourceType") {
          resourceType = this.getNodeParameter(
            "customResourceType",
            "",
          ) as string;
        }
        const searchCriteria = this.getNodeParameter(
          "searchCriteria",
        ) as string;

        await requestWithAuth(
          this,
          {
            method: "POST",
            headers: {
              "content-type": `application/fhir+json`,
            },
            uri: `${baseUrl}/Subscription`,
            json: true,
            body: {
              resourceType: "Subscription",
              status: "active",
              reason,
              criteria: `${resourceType}${searchCriteria ? "?" + searchCriteria : ""}`,
              channel: {
                type: "rest-hook",
                endpoint: webhookUrl,
                payload,
                header: secret ? [`X-Subscription-Auth: ${secret}`] : undefined,
              },
            },
            simple: false,
            rejectUnauthorized: !allowUnauthorizedCerts,
          },
          await getAuthParameters(this),
        );
        return true;
      },

      async delete(this: IHookFunctions) {
        const allowUnauthorizedCerts = this.getNodeParameter(
          "allowUnauthorizedCerts",
          false,
        ) as boolean;
        let baseUrl = (this.getNodeParameter("baseUrl") as string)?.trim();
        if (baseUrl.endsWith("/")) {
          baseUrl = baseUrl.slice(0, -1);
        }
        const webhookUrl = this.getNodeWebhookUrl("default");

        const response = await requestWithAuth(
          this,
          {
            method: "GET",
            headers: {
              "content-type": `application/fhir+json`,
            },
            uri: `${baseUrl}/Subscription`,
            qs: {
              _count: 1,
              status: "active",
              url: webhookUrl,
            },
            json: true,
            simple: false,
            rejectUnauthorized: !allowUnauthorizedCerts,
          },
          await getAuthParameters(this),
        );
        const subscription = response.entry?.[0]?.resource;
        if (subscription?.id) {
          await requestWithAuth(
            this,
            {
              method: "DELETE",
              headers: {
                "content-type": `application/fhir+json`,
              },
              uri: `${baseUrl}/Subscription/${subscription.id}`,
              simple: false,
              rejectUnauthorized: !allowUnauthorizedCerts,
            },
            await getAuthParameters(this),
          );
        }
        return true;
      },
    },
  };
}
