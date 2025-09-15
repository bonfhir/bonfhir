import type {
  IHookFunctions,
  INodeType,
  INodeTypeDescription,
  IWebhookFunctions,
  IWebhookResponseData,
} from "n8n-workflow";
import { NodeOperationError } from "n8n-workflow";
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
    inputs: [],
    outputs: ["main"],
    credentials,
    webhooks: [
      {
        name: "default",
        httpMethod: '={{$parameter["mode"] == "webhook" ? "POST" : "PUT"}}',
        responseMode: "onReceived",
        path: '={{$parameter["mode"] == "webhook" ? $parameter["pathPrefix"] : "/fhir/:resourceType/:resourceId"}}',
        isFullPath: true,
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
        displayName: "Mode",
        name: "mode",
        type: "options",
        description: "How the trigger should behave",
        required: true,
        options: [
          {
            name: "Webhook",
            description:
              "Act as a standard Webhook: POST Method, and stable URL",
            value: "webhook",
          },
          {
            name: "Resthook / FHIR Client",
            description:
              "Act as if it was a FHIR Server receiving a FHIR REST API call, with a PUT method. This is how HAPI FHIR servers works.",
            value: "resthook",
          },
        ],
        default: "webhook",
      },
      {
        displayName: "Path Prefix",
        description: "The Webhook path prefix",
        hint: "Used to differentiate multiple webhooks - you should probably not change it",
        name: "pathPrefix",
        type: "string",
        required: true,
        default: `${Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)}`,
        displayOptions: {
          show: {
            mode: ["webhook"],
          },
        },
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
      webhookResponse: JSON.stringify(resource),
      workflowData: [this.helpers.returnJsonArray(resource)],
    };
  }

  webhookMethods = {
    default: {
      async checkExists(this: IHookFunctions) {
        const staticData = this.getWorkflowStaticData("global");
        const subscriptionId = staticData.subscriptionId as string;

        const allowUnauthorizedCerts = this.getNodeParameter(
          "allowUnauthorizedCerts",
          false,
        ) as boolean;
        let baseUrl = (this.getNodeParameter("baseUrl") as string)?.trim();
        if (baseUrl.endsWith("/")) {
          baseUrl = baseUrl.slice(0, -1);
        }

        // If we have a stored subscription ID, use it for direct lookup
        if (subscriptionId) {
          try {
            const response = await requestWithAuth(
              this,
              {
                method: "GET",
                headers: {
                  "content-type": `application/fhir+json`,
                },
                uri: `${baseUrl}/Subscription/${subscriptionId}`,
                json: true,
                simple: false,
                rejectUnauthorized: !allowUnauthorizedCerts,
              },
              await getAuthParameters(this),
            );

            // Check if the subscription exists and is active
            return (
              response &&
              response.resourceType === "Subscription" &&
              response.status === "active"
            );
          } catch {
            // If the subscription doesn't exist (404) or any other error, return false
            return false;
          }
        }

        // Fallback: Search by URL for existing workflows that don't have stored subscription ID
        // This provides backward compatibility during migration
        const webhookUrl = getWebhookUrl(this);
        try {
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
            // Store the found subscription ID for future use
            staticData.subscriptionId = subscription.id;
            staticData.baseUrl = baseUrl;
            return true;
          }

          return false;
        } catch {
          return false;
        }
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
        const webhookUrl = getWebhookUrl(this);
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

        const response = await requestWithAuth(
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
              criteria: `${resourceType}?${searchCriteria || ""}`,
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

        // Validate the response and extract subscription ID
        if (!response || !response.id) {
          throw new NodeOperationError(
            this.getNode(),
            `Failed to create FHIR subscription. Response: ${JSON.stringify(response)}`,
          );
        }

        // Store the subscription ID in static data for reliable tracking
        const staticData = this.getWorkflowStaticData("global");
        staticData.subscriptionId = response.id;
        staticData.baseUrl = baseUrl;

        return true;
      },

      async delete(this: IHookFunctions) {
        const staticData = this.getWorkflowStaticData("global");
        const subscriptionId = staticData.subscriptionId as string;

        // If no subscription ID is stored, nothing to delete
        if (!subscriptionId) {
          return true;
        }

        const allowUnauthorizedCerts = this.getNodeParameter(
          "allowUnauthorizedCerts",
          false,
        ) as boolean;
        let baseUrl = (this.getNodeParameter("baseUrl") as string)?.trim();
        if (baseUrl.endsWith("/")) {
          baseUrl = baseUrl.slice(0, -1);
        }

        try {
          await requestWithAuth(
            this,
            {
              method: "DELETE",
              headers: {
                "content-type": `application/fhir+json`,
              },
              uri: `${baseUrl}/Subscription/${subscriptionId}`,
              simple: false,
              rejectUnauthorized: !allowUnauthorizedCerts,
            },
            await getAuthParameters(this),
          );
        } catch (error) {
          // Log the error but don't fail the deletion process
          // The subscription might already be deleted or not exist
          console.warn(
            `Failed to delete FHIR subscription ${subscriptionId}:`,
            error,
          );
        }

        // Clear the stored subscription ID from static data
        delete staticData.subscriptionId;
        delete staticData.baseUrl;

        return true;
      },
    },
  };
}

function getWebhookUrl(node: IHookFunctions): string {
  return node
    .getNodeWebhookUrl("default")!
    .replace("/:resourceType/:resourceId", "");
}
