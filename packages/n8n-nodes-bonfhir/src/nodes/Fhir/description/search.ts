import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

export const searchProperties: INodeProperties = {
  displayName: `Search Query`,
  name: "search",
  type: "string",
  default: "",
  required: true,
  displayOptions: {
    show: {
      operation: ["search"],
    },
  },
  placeholder: "Insert Search Query here",
  description: "FHIR Search Query",
  routing: {
    request: {
      url: `=/{{$parameter.resource}}?{{$value}}`,
    },
  },
};

export const searchOperation: INodePropertyOptions = {
  name: "Search",
  value: "search",
  action: "Search",
  description: "Search by Query",
  routing: {
    request: {
      method: "GET",
    },
  },
};
