import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export const vreadProperties: INodeProperties[] = [
  {
    displayName: `Resource ID`,
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["vread"],
      },
    },
    placeholder: "Insert ID here",
    description: "FHIR ID for the Resource",
    routing: {
      request: {
        url: `=/{{$parameter.resource}}/{{$parameter.id}}/_history/{{$parameter.vid}}`,
      },
    },
  },
  {
    displayName: `Version ID`,
    name: "vid",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["vread"],
      },
    },
    placeholder: "Insert ID here",
    description: "Version ID for the Resource",
  },
];

export const vreadOperation: INodePropertyOptions = {
  name: "VRead",
  value: "vread",
  action: "Vread",
  description: "Read specific version of a resource",
  routing: {
    request: {
      method: "GET",
    },
  },
};