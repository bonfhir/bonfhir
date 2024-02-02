import { INodeType, INodeTypeDescription } from "n8n-workflow";
import {
  createOperation,
  dataFieldProperties,
  deleteOperation,
  patchOperation,
  readOperation,
  resourceIdFieldProperties,
  resourcesProperties,
  searchOperation,
  searchProperties,
  updateOperation,
  vreadOperation,
  vreadProperties,
} from "./description";

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
      resourcesProperties,
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
          patchOperation,
          updateOperation,
        ],
        default: "",
      },
      resourceIdFieldProperties,
      searchProperties,
      dataFieldProperties,
      ...vreadProperties.flat(),
    ],
  };
}
