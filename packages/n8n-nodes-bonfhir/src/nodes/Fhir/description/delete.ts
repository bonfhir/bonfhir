import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export const deleteProperties: INodeProperties = {
  displayName: `Resource ID`,
  name: "id",
  type: "string",
  default: "",
  required: true,
  displayOptions: {
    show: {
      operation: ["delete"],
    },
  },
  placeholder: "Insert ID here",
  description: "FHIR ID for the resource to be deleted}",
  routing: {
    request: {
      url: `=/{{$parameter.resource}}/{{$value}}`,
    },
  },
};

export const deleteOperation: INodePropertyOptions = {
  name: "Delete",
  value: "delete",
  description: "Delete by ID",
  action: "Delete",
  routing: {
    request: {
      method: "DELETE",
    },
  },
};
