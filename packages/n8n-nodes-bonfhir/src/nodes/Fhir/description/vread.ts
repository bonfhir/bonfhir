import { DomainResourceTypes } from "@bonfhir/core/r4b";
import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export const vreadProperties: INodeProperties[][] = DomainResourceTypes.map(
  (type) => [
    {
      displayName: `${type} ID`,
      name: "id",
      type: "string",
      default: "",
      required: true,
      displayOptions: {
        show: {
          operation: ["vread"],
          resource: [type],
        },
      },
      placeholder: "Insert ID here",
      description: `FHIR ID for the ${type.toLowerCase()}`,
      routing: {
        request: {
          url: `=/${type}/{{$parameter.id}}/_history/{{$parameter.vid}}`,
        },
      },
    },
    {
      displayName: `${type} Version ID`,
      name: "vid",
      type: "string",
      default: "",
      required: true,
      displayOptions: {
        show: {
          operation: ["vread"],
          resource: [type],
        },
      },
      placeholder: "Insert ID here",
      description: `Version ID for the ${type.toLowerCase()}`,
    },
  ],
);

export const vreadOperation: INodePropertyOptions = {
  name: "VRead",
  value: "vread",
  action: "Vread",
  routing: {
    request: {
      method: "GET",
    },
  },
};
