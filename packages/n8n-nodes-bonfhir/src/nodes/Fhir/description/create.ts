import { DomainResourceTypes } from "@bonfhir/core/r4b";
import {
  IExecuteSingleFunctions,
  IHttpRequestOptions,
  INodeProperties,
  INodePropertyOptions,
} from "n8n-workflow";

export const createProperties: INodeProperties[][] = DomainResourceTypes.map(
  (type) => [
    {
      displayName: `New ${type} Data`,
      name: "data",
      type: "json",
      default: "",
      required: true,
      displayOptions: {
        show: {
          operation: ["create"],
          resource: [type],
        },
      },
      placeholder: `${type} Data`,
      routing: {
        request: {
          url: `=/${type}`,
        },
      },
    },
  ],
);

export const createOperation: INodePropertyOptions = {
  name: "Create",
  value: "create",
  routing: {
    send: {
      preSend: [parseJsonPreSendAction],
    },
    request: {
      method: "POST",
      body: {
        data: "={{$parameter.data}}",
        resourceType: "={{$parameter.resource}}",
      },
    },
  },
};

async function parseJsonPreSendAction(
  this: IExecuteSingleFunctions,
  requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
  const body = (requestOptions.body || {}) as {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resourceType: any;
  };

  return {
    ...requestOptions,
    body: {
      resourceType: body.resourceType,
      ...JSON.parse(body.data),
    },
  };
}
