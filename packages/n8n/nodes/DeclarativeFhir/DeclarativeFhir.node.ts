import { INodeType, INodeTypeDescription } from "n8n-workflow";

const baseUrl = "http://localhost:8103"

export class DeclarativeFhir implements INodeType {
  description: INodeTypeDescription = {
    displayName: "DeclarativeFhir",
    name: "declarativeFhir",
    icon: "file:DecrarativeFhir.svg",
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
        name: "FhirOAuth2Api",
        required: true,
      },
    ],
    requestDefaults: {
      headers: {
        Accept: "application/json",
      },
      baseURL: baseUrl,
    },
    // Basic node details will go here
    properties: [
      // Resources and operations will go here
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        options: [
          {
            name: "Patient",
            value: "patient",
          },
        ],
        default: "patient",
        noDataExpression: true,
        required: true,
        description: "Get a patient",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        displayOptions: {
          show: {
            resource: ["patient"],
          },
        },
        options: [
          {
            name: "Get",
            value: "get",
            description: "Get a patient",
            action: "Get a patient",
          },
        ],
        default: "get",
        noDataExpression: true,
      },
      {
        displayName: "Patient ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["patient"],
          },
        },
        default: "",
        placeholder: "Insert ID here",
        description: "FHIR ID for the patient",
        routing: {
          request: {
            url: '=/fhir/R4/Patient/{{$value}}',
          },
        },
      },
    ],
  };
}
