import { DomainResourceTypes } from "@bonfhir/core/r4b";
import {
  INodeProperties,
  INodePropertyOptions,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import {
  createOperation,
  createProperties,
  deleteOperation,
  deleteProperties,
  readOperation,
  readProperties,
  searchOperation,
  searchProperties,
  vreadOperation,
  vreadProperties,
} from "./description";

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

export class Fhir implements INodeType {
  description: INodeTypeDescription = {
    displayName: "FHIR API ",
    name: "fhir",
    icon: "file:Fhir.svg",
    group: ["transform"],
    version: 1,
    description: "Consume your FHIR API",
    defaults: {
      name: "Fhir",
    },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [
      {
        name: "fhirOAuth2Api",
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: "={{$parameter.fhirBaseUrl}}",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },

    // Basic node details will go here
    properties: [
      {
        displayName: "FHIR Base URL",
        name: "fhirBaseUrl",
        type: "string",
        description: "The base URL of the FHIR server API",
        placeholder: "http://localhost:8103/fhir/R4",
        default: "",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        options: [
          vreadOperation,
          readOperation,
          searchOperation,
          createOperation,
          deleteOperation,
        ],
        default: "",
      },
      resourcesProperties,
      readProperties,
      deleteProperties,
      searchProperties,
      ...vreadProperties.flat(),
      createProperties,
    ],
  };
}
