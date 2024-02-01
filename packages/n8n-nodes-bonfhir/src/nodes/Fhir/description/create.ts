import {
  IExecuteSingleFunctions,
  IHttpRequestOptions,
  INodeProperties,
  INodePropertyOptions,
} from "n8n-workflow";

export const createProperties: INodeProperties = {
  displayName: `New resource Data`,
  name: "data",
  type: "json",
  default: "",
  required: true,
  displayOptions: {
    show: {
      operation: ["create"],
    },
  },
  routing: {
    request: {
      url: "={{$parameter.resource}}",
    },
  },
};

export const createOperation: INodePropertyOptions = {
  name: "Create",
  value: "create",
  action: "Create",
  description: "Create new FHIR resource",
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
    data: string;
    resourceType: string;
  };

  return {
    ...requestOptions,
    body: {
      resourceType: body.resourceType,
      ...JSON.parse(body.data),
    },
  };
}
