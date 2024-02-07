/* eslint-disable n8n-nodes-base/node-param-operation-option-action-miscased */
import { evaluate } from "fhirpath";
import {
  NodeApiError,
  type IExecuteFunctions,
  type INodeExecutionData,
  type INodeType,
  type INodeTypeDescription,
  type NodeExecutionWithMetadata,
} from "n8n-workflow";
import type { OptionsWithUri } from "request-promise-native";
import { DomainResourceTypes } from "../../domain-resource-types.codegen";
import {
  authenticationField,
  credentials,
  getAuthParameters,
  requestWithAuth,
} from "./Functions";

export class Bonfhir implements INodeType {
  description: INodeTypeDescription = {
    displayName: "bonFHIR",
    name: "bonfhir",
    version: 1,
    subtitle:
      '={{ $parameter["operation"] + ": " + $parameter["resourceType"]}}',
    icon: "file:Bonfhir.svg",
    group: ["output"],
    description: "Perform operations on FHIR resources",
    defaults: {
      name: "bonFHIR",
    },
    inputs: ["main"],
    outputs: ["main"],
    credentials,
    properties: [
      authenticationField,
      {
        displayName: "Base URL",
        name: "baseUrl",
        type: "string",
        description: "The base URL of the FHIR server API",
        required: true,
        default: "http://example.com/fhir",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        default: "Read",
        options: [
          {
            name: "Create",
            value: "Create",
            action: "Create a FHIR Resource",
            description: "Create a FHIR Resource",
          },
          {
            name: "Delete",
            value: "Delete",
            action: "Delete a FHIR Resource",
            description: "Delete a FHIR Resource",
          },
          {
            name: "History",
            value: "History",
            action: "Get the history of a FHIR Resource",
            description: "Get the history of a FHIR Resource",
          },
          {
            name: "Patch",
            value: "Patch",
            action: "Patch a FHIR Resource",
            description: "Patch a FHIR Resource",
          },
          {
            name: "Read",
            value: "Read",
            action: "Read a FHIR Resource",
            description: "Read a FHIR Resource",
          },
          {
            name: "Search",
            value: "Search",
            action: "Search FHIR Resources",
            description: "Search FHIR Resources",
          },
          {
            name: "Update",
            value: "Update",
            action: "Update a FHIR Resource",
            description: "Update a FHIR Resource",
          },
          {
            name: "VRead",
            value: "VRead",
            action: "Get a specific version of a FHIR Resource",
            description: "Get a specific version of a FHIR Resource",
          },
        ],
      },
      {
        displayName: "Retrieve All Pages?",
        description:
          "Whether to retrieve all pages of search results. Be careful as the result set may be large.",
        name: "allPages",
        type: "boolean",
        default: false,
        displayOptions: {
          show: {
            operation: ["Search"],
          },
        },
      },
      {
        displayName: "Normalize Next URL to Base URL",
        description:
          "Whether to try to normalize the next URL to the base URL. This is useful when the next URL is configured for a different base URL.",
        name: "normalizeNextUrlToBaseUrl",
        type: "boolean",
        default: false,
        displayOptions: {
          show: {
            operation: ["Search"],
          },
        },
      },
      {
        displayName: "Resource Type",
        name: "resourceType",
        type: "options",
        required: true,
        // eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
        default: "",
        options: [
          ...DomainResourceTypes.map((resourceType) => ({
            name: resourceType,
            value: resourceType,
          })),
          { name: "- Custom -", value: "customResourceType" },
        ],
      },
      {
        displayName: "Custom Resource Type",
        name: "customResourceType",
        type: "string",
        required: true,
        default: "",
        displayOptions: {
          show: {
            resourceType: ["customResourceType"],
          },
        },
      },
      {
        displayName: "ID",
        name: "id",
        type: "string",
        required: true,
        default: "",
        displayOptions: {
          show: {
            operation: [
              "Delete",
              "History",
              "Patch",
              "Read",
              "Update",
              "VRead",
            ],
          },
        },
      },
      {
        displayName: "Version ID",
        name: "vid",
        type: "string",
        required: true,
        default: "",
        displayOptions: {
          show: {
            operation: ["VRead"],
          },
        },
      },
      {
        displayName: "Body",
        name: "body",
        type: "json",
        required: true,
        default: "",
        displayOptions: {
          show: {
            operation: ["Create", "Patch", "Update"],
          },
        },
      },
      {
        displayName: "Query Params",
        name: "queryParams",
        type: "string",
        default: "",
      },
      {
        displayName: "FHIR Path",
        name: "fhirPath",
        type: "string",
        description: "A FHIR Path expression to extract data from the output",
        default: "",
      },
      {
        displayName: "Ignore SSL Issues",
        name: "allowUnauthorizedCerts",
        type: "boolean",
        default: false,
        description:
          "Whether to connect even if SSL certificate validation is not possible",
      },
    ],
  };

  async execute(
    this: IExecuteFunctions,
  ): Promise<INodeExecutionData[][] | NodeExecutionWithMetadata[][] | null> {
    const items = this.getInputData();

    const resultItems: NodeExecutionWithMetadata[] = [];

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        const { requestOptions, operation, baseUrl, resourceType } =
          await buildRequestOptions(this, itemIndex);

        const authParameters = await getAuthParameters(this);
        let response = await requestWithAuth(
          this,
          requestOptions,
          authParameters,
        );

        response = JSON.parse(response);

        const fhirPath = this.getNodeParameter(
          "fhirPath",
          itemIndex,
          "",
        ) as string;
        if (fhirPath) {
          response = evaluate(response, fhirPath);
        }

        resultItems.push(...processResponseIntoItems(response, itemIndex));

        const allPages = this.getNodeParameter(
          "allPages",
          itemIndex,
          false,
        ) as boolean;

        const normalizeNextUrlToBaseUrl = this.getNodeParameter(
          "normalizeNextUrlToBaseUrl",
          itemIndex,
          false,
        ) as boolean;

        if (operation === "Search" && allPages) {
          let nextUrl = getNextUrl(response);
          while (nextUrl) {
            if (
              normalizeNextUrlToBaseUrl &&
              nextUrl &&
              !nextUrl.startsWith(baseUrl)
            ) {
              const [, ...restUrl] = nextUrl.split(resourceType);
              nextUrl = `${baseUrl}/${resourceType}${restUrl.join("")}`;
            }
            requestOptions.uri = nextUrl;
            let response = await requestWithAuth(
              this,
              requestOptions,
              authParameters,
            );

            response = JSON.parse(response);
            nextUrl = getNextUrl(response);

            if (fhirPath) {
              response = evaluate(response, fhirPath);
            }

            resultItems.push(...processResponseIntoItems(response, itemIndex));
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          const item = {
            error,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            json: this.getInputData(itemIndex) as any,
            pairedItem: {
              item: itemIndex,
            },
          };
          resultItems.push(item);
          continue;
        }
        throw error;
      }
    }

    return [resultItems];
  }
}

async function buildRequestOptions(
  node: IExecuteFunctions,
  itemIndex: number,
): Promise<{
  requestOptions: OptionsWithUri;
  operation: string;
  baseUrl: string;
  resourceType: string;
}> {
  let baseUrl = (node.getNodeParameter("baseUrl", itemIndex) as string)?.trim();
  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.slice(0, -1);
  }
  const operation = node.getNodeParameter("operation", itemIndex) as string;
  let resourceType = node.getNodeParameter(
    "resourceType",
    itemIndex,
    "",
  ) as string;
  if (resourceType === "customResourceType") {
    resourceType = node.getNodeParameter(
      "customResourceType",
      itemIndex,
      "",
    ) as string;
  }
  const id = node.getNodeParameter("id", itemIndex, "") as string;
  const vid = node.getNodeParameter("vid", itemIndex, "") as string;
  let bodyParameter = node.getNodeParameter("body", itemIndex, "") as string;
  if (
    bodyParameter &&
    typeof bodyParameter === "string" &&
    bodyParameter?.trim()
  ) {
    bodyParameter = JSON.parse(bodyParameter);
  }
  const queryParams = node.getNodeParameter(
    "queryParams",
    itemIndex,
    "",
  ) as string;
  const allowUnauthorizedCerts = node.getNodeParameter(
    "allowUnauthorizedCerts",
    itemIndex,
    false,
  ) as boolean;

  const requestOptions: OptionsWithUri = {
    headers: {
      "content-type": `application/fhir+json`,
    },
    uri: "",
    simple: false,
    rejectUnauthorized: !allowUnauthorizedCerts,
  };

  switch (operation) {
    case "Create": {
      requestOptions.method = "POST";
      requestOptions.uri = `${baseUrl}/${resourceType}${queryParams ? `?${queryParams}` : ""}`;
      requestOptions.body = bodyParameter;
      break;
    }
    case "Delete": {
      requestOptions.method = "DELETE";
      requestOptions.uri = `${baseUrl}/${resourceType}/${id}${queryParams ? `?${queryParams}` : ""}`;
      break;
    }
    case "History": {
      requestOptions.method = "GET";
      requestOptions.uri = `${baseUrl}/${resourceType}/${id}/_history${queryParams ? `?${queryParams}` : ""}`;
      break;
    }
    case "Patch": {
      requestOptions.method = "PATCH";
      requestOptions.uri = `${baseUrl}/${resourceType}/${id}${queryParams ? `?${queryParams}` : ""}`;
      requestOptions.body = bodyParameter;
      break;
    }
    case "Read": {
      requestOptions.method = "GET";
      requestOptions.uri = `${baseUrl}/${resourceType}/${id}${queryParams ? `?${queryParams}` : ""}`;
      break;
    }
    case "Search": {
      requestOptions.method = "GET";
      requestOptions.uri = `${baseUrl}/${resourceType}${queryParams ? `/?${queryParams}` : ""}`;
      break;
    }
    case "Update": {
      requestOptions.method = "PUT";
      requestOptions.uri = `${baseUrl}/${resourceType}/${id}${queryParams ? `?${queryParams}` : ""}`;
      requestOptions.body = bodyParameter;
      break;
    }
    case "VRead": {
      requestOptions.method = "GET";
      requestOptions.uri = `${baseUrl}/${resourceType}/${id}/_history/${vid}${queryParams ? `?${queryParams}` : ""}`;
      break;
    }

    default: {
      throw new NodeApiError(
        node.getNode(),
        { operation },
        { message: `The operation "${operation}" is not supported` },
      );
    }
  }

  return { requestOptions, operation, baseUrl, resourceType };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getNextUrl(bundle: any): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return bundle.link?.find((link: any) => link.relation === "next")?.url;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function processResponseIntoItems(response: any, itemIndex: number) {
  const resultItems = [];
  if (response.resourceType === "Bundle") {
    for (const entry of response.entry) {
      resultItems.push({
        json: entry.resource,
        pairedItem: {
          item: itemIndex,
        },
      });
    }
  } else {
    resultItems.push({
      json: response,
      pairedItem: {
        item: itemIndex,
      },
    });
  }
  return resultItems;
}