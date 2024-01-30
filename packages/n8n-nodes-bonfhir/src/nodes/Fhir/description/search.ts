import { DomainResourceTypes } from "@bonfhir/core/r4b";
import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export const searchProperties: INodeProperties[] = DomainResourceTypes.map(
  (type) => ({
    displayName: `${type} Search`,
    name: "search",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["search"],
        resource: [type],
      },
    },
    placeholder: "Insert Search Query here",
    description: `FHIR Search Query for the ${type.toLowerCase()}`,
    routing: {
      request: {
        url: `=/${type}?{{$value}}`,
      },
    },
  }),
);

export const searchOperation: INodePropertyOptions = {
  name: "Search",
  value: "search",
  action: "Search",
  routing: {
    request: {
      method: "GET",
    },
  },
};
