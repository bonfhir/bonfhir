import { DomainResourceTypes } from "@bonfhir/core/r4b";
import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export const deleteProperties: INodeProperties[] = DomainResourceTypes.map(
  (type) => ({
    displayName: `${type} Delete`,
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["delete"],
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

export const deleteOperation: INodePropertyOptions = {
  name: "Delete",
  value: "delete",
  description: "Delete by ID",
  action: "Delete by ID",
  routing: {
    request: {
      method: "DELETE",
    },
  },
};
