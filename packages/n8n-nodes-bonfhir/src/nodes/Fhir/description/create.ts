import {
  IExecuteSingleFunctions,
  IHttpRequestOptions,
  INodePropertyOptions,
} from "n8n-workflow";

export const updateOperation: INodePropertyOptions = {
  name: "Update",
  value: "update",
  action: "Update",
  description: "Update existing FHIR resource",
  routing: {
    send: {
      preSend: [parseJsonPreSendAction],
    },
    request: {
      method: "PUT",
      body: {
        data: "={{$parameter.data}}",
        resourceType: "={{$parameter.resource}}",
      },
    },
  },
};

export const patchOperation: INodePropertyOptions = {
  name: "Patch",
  value: "patch",
  action: "Patch",
  description: "Patch existing FHIR resource",
  routing: {
    send: {
      preSend: [parseJsonPreSendAction],
    },
    request: {
      method: "PATCH",
      body: {
        data: "={{$parameter.data}}",
        resourceType: "={{$parameter.resource}}",
      },
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
