import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export const readProperties: INodeProperties = {
  displayName: "Resource ID",
  name: "id",
  type: "string",
  default: "",
  required: true,
  displayOptions: {
    show: {
      operation: ["read"],
    },
  },
  placeholder: "Insert ID here",
  description: "FHIR ID for the Resource",
  routing: {
    request: {
      url: `=/{{$parameter.resource}}/{{$value}}`,
    },
  },
};

export const readOperation: INodePropertyOptions = {
  name: "Read",
  value: "read",
  description: "Read by ID",
  action: "Read",
  routing: {
    request: {
      method: "GET",
    },
  },
};
