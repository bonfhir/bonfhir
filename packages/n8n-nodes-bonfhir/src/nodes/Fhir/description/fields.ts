import { DomainResourceTypes } from "@bonfhir/core/r4b";
import { INodeProperties, INodePropertyOptions } from "n8n-workflow";

const resourceTypes: INodePropertyOptions[] = DomainResourceTypes.map(
  (type) => ({
    name: type as string,
    value: type as string,
  }),
);

export const resourcesProperties: INodeProperties = {
  displayName: "Resource",
  name: "resource",
  type: "options",
  default: "",
  options: resourceTypes,
  noDataExpression: true,
  required: true,
};

export const dataFieldProperties: INodeProperties = {
  displayName: `New resource Data`,
  name: "data",
  type: "json",
  default: "",
  required: true,
  displayOptions: {
    show: {
      operation: ["create", "update", "patch"],
    },
  },
  routing: {
    request: {
      url: "={{$parameter.resource}}",
    },
  },
};

export const resourceIdFieldProperties: INodeProperties = {
  displayName: "Resource ID",
  name: "id",
  type: "string",
  default: "",
  required: true,
  displayOptions: {
    show: {
      operation: ["read", "delete", "vread", "patch"],
    },
  },
  placeholder: "Insert ID here",
  description: "FHIR ID for the Resource",
};
