import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export const vreadProperties: INodeProperties[] = [
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
      url: `=/{{$parameter.resource}}/{{$parameter.id}}/_history/{{$parameter.vid}}`,
    },
  },
};
