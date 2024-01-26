import { DomainResourceTypes } from "@bonfhir/core/r4b";
import {
  INodeProperties,
  INodePropertyOptions,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";

const resourceTypes: INodePropertyOptions[] = DomainResourceTypes.map(
  (type) => ({
    name: type as string,
    value: type.toLowerCase(),
  }),
);

const resourcesList: string[] = DomainResourceTypes.map(
  (type) => type.toLowerCase() as string,
);

const getFields: INodeProperties[] = DomainResourceTypes.map((type) => ({
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
}));

const vread: INodeProperties[][] = DomainResourceTypes.map((type) => [
  {
    displayName: `${type} ID`,
    name: "id",
    type: "string",
    default: "",
    required: true,
    displayOptions: {
      show: {
        operation: ["vread"],
        resource: [type.toLowerCase()],
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
        resource: [type.toLowerCase()],
      },
    },
    placeholder: "Insert ID here",
    description: `Version ID for the ${type.toLowerCase()}`,
    // routing: {
    //   request: {
    //     url: `=/_history/{{$value}}`,
    //   },
    // },
  },
]);

const searchFields: INodeProperties[] = DomainResourceTypes.map((type) => ({
  displayName: `${type} Search`,
  name: "search",
  type: "string",
  default: "",
  required: true,
  displayOptions: {
    show: {
      operation: ["search"],
      resource: [type.toLowerCase()],
    },
  },
  placeholder: "Insert Search Query here",
  description: `FHIR Search Query for the ${type.toLowerCase()}`,
  routing: {
    request: {
      url: `=/${type}?{{$value}}`,
    },
  },
}));

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
      baseURL: "http://192.168.1.176:8103/fhir/R4",
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
        default: "http://localhost:8103/fhir/R4",
      },
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        options: resourceTypes,
        default: "patient",
        noDataExpression: true,
        required: true,
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: resourcesList,
          },
        },
        options: [
          {
            name: "Read",
            value: "read",
            description: "Read by ID",
            action: "Read by ID",
            routing: {
              request: {
                method: "GET",
              },
            },
          },
          {
            name: "Search",
            value: "search",
            action: "Search",
            routing: {
              request: {
                method: "GET",
              },
            },
          },
          {
            name: "VRead",
            value: "vread",
            action: "Vread",
            routing: {
              request: {
                method: "GET",
              },
            },
          },
        ],
        default: "read",
      },
      ...getFields,
      ...searchFields,
      ...vread.flat(),
    ],
  };
}
