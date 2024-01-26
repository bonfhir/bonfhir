import { DomainResourceTypes } from "@bonfhir/core/r4b";
import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export const readProperties: INodeProperties[] = DomainResourceTypes.map(
  (type) => ({
    displayName: `${type} Read`,
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["read"],
        resource: [type.toLowerCase()],
      },
    },
    placeholder: "Insert ID here",
    description: `FHIR ID for the ${type.toLowerCase()}`,
    routing: {
      request: {
        url: `=/${type}/{{$value}}`,
      },
    },
  }),
);

export const readOperation: INodePropertyOptions = {
  name: "Read",
  value: "read",
  description: "Read by ID",
  action: "Read by ID",
  routing: {
    request: {
      method: "GET",
    },
  },
};
