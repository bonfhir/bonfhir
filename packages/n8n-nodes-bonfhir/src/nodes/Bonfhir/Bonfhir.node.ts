/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable n8n-nodes-base/node-param-operation-option-action-miscased */
import { evaluate } from "fhirpath";
import {
  NodeApiError,
  NodeOperationError,
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
      '={{ $parameter["operation"] + ($parameter["operation"] == "Resolve" ? " references" : ": " + $parameter["resourceType"])}}',
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
        default: "",
        placeholder: "http://example.com/fhir",
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
            name: "Resolve",
            value: "Resolve",
            action: "Resolve FHIR references",
            description: "Resolve FHIR references",
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
          hide: {
            allPages: [false],
          },
        },
      },
      {
        displayName: "Error if More than One Result",
        description:
          "Whether this will return an error if there is more than one result in the search Bundle",
        name: "errorIfMoreThanOneResult",
        type: "boolean",
        default: false,
        displayOptions: {
          show: {
            operation: ["Search"],
          },
          hide: {
            allPages: [true],
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
        displayOptions: {
          hide: {
            operation: ["Resolve"],
          },
        },
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
        displayName: "Specify Patch Body",
        name: "specifyPatchBody",
        type: "options",
        options: [
          {
            name: "Using Fields Below",
            value: "keypair",
          },
          {
            name: "Using JSON",
            value: "json",
          },
        ],
        default: "keypair",
        displayOptions: {
          show: {
            operation: ["Patch"],
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
          hide: {
            specifyPatchBody: ["keypair"],
          },
        },
      },
      {
        displayName: "Patch Parameters",
        name: "patchParameters",
        type: "fixedCollection",
        displayOptions: {
          show: {
            specifyPatchBody: ["keypair"],
          },
        },
        typeOptions: {
          multipleValues: true,
        },
        placeholder: "Add Parameter",
        default: {
          parameters: [],
        },
        options: [
          {
            name: "parameters",
            displayName: "Parameter",
            values: [
              {
                displayName: "Op",
                name: "op",
                type: "options",
                default: "add",
                options: [
                  {
                    name: "Add",
                    description:
                      "Adds a value to an object or inserts it into an array",
                    value: "add",
                  },
                  {
                    name: "Copy",
                    description:
                      "Copies a value from one location to another within the JSON document. Both from and path are JSON Pointers.",
                    value: "copy",
                  },
                  {
                    name: "Move",
                    description:
                      "Moves a value from one location to the other. Both from and path are JSON Pointers.",
                    value: "move",
                  },
                  {
                    name: "Remove",
                    description: "Removes a value from an object or array",
                    value: "remove",
                  },
                  {
                    name: "Replace",
                    description:
                      "Replaces a value. Equivalent to a “remove” followed by an “add”.",
                    value: "replace",
                  },
                  {
                    name: "Test",
                    description:
                      "Tests that the specified value is set in the document. If the test fails, then the patch as a whole should not apply.",
                    value: "test",
                  },
                ],
              },
              {
                displayName: "From",
                name: "from",
                type: "string",
                default: "",
                placeholder: "{Only for Copy, Move, or Test}",
              },
              {
                displayName: "Path",
                name: "path",
                type: "string",
                default: "",
                placeholder: "/path/to/element",
              },
              {
                displayName: "Value",
                name: "value",
                type: "json",
                default: "",
              },
            ],
          },
        ],
      },
      {
        displayName: "Reference",
        description:
          "Either a string, a Reference object, or an array of Reference objects",
        name: "reference",
        type: "json",
        required: true,
        default: "",
        displayOptions: {
          show: {
            operation: ["Resolve"],
          },
        },
      },
      {
        displayName: "Specify Query Parameters",
        name: "specifyQuery",
        type: "options",
        options: [
          {
            name: "Using Fields Below",
            value: "keypair",
          },
          {
            name: "Using JSON",
            value: "json",
          },
        ],
        default: "keypair",
      },
      {
        displayName: "Query Parameters",
        name: "queryParameters",
        type: "fixedCollection",
        displayOptions: {
          show: {
            specifyQuery: ["keypair"],
          },
        },
        typeOptions: {
          multipleValues: true,
        },
        placeholder: "Add Parameter",
        default: {
          parameters: [],
        },
        options: [
          {
            name: "parameters",
            displayName: "Parameter",
            values: [
              {
                displayName: "Name",
                name: "name",
                type: "string",
                default: "",
              },
              {
                displayName: "Value",
                name: "value",
                type: "string",
                default: "",
              },
            ],
          },
        ],
      },
      {
        displayName: "JSON",
        name: "jsonQuery",
        type: "json",
        displayOptions: {
          show: {
            specifyQuery: ["json"],
          },
        },
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

    const authParameters = await getAuthParameters(this);
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      const builtRequestOptions = await buildRequestOptions(this, itemIndex);

      for (const {
        requestOptions,
        operation,
        baseUrl,
        resourceType,
      } of builtRequestOptions) {
        try {
          let response = await requestWithAuth(
            this,
            requestOptions,
            authParameters,
          );

          const errorIfMoreThanOneResult = this.getNodeParameter(
            "errorIfMoreThanOneResult",
            itemIndex,
            false,
          ) as boolean;
          if (
            operation === "Search" &&
            errorIfMoreThanOneResult &&
            response.resourceType === "Bundle" &&
            response.entry.filter((e: any) =>
              isSearchMatch(e, response.entry?.[0]),
            ).length > 1
          ) {
            throw new NodeApiError(
              this.getNode(),
              { operation, response },
              {
                message: `The search returned more than one result (${response.total ?? response.entry.filter((e: any) => isSearchMatch(e, response.entry?.[0])).length})`,
              },
            );
          }

          const fhirPath = this.getNodeParameter(
            "fhirPath",
            itemIndex,
            "",
          ) as string;
          if (fhirPath) {
            response = evaluate(response, fhirPath);
            if (Array.isArray(response)) {
              resultItems.push(
                ...response.flatMap((x) =>
                  processResponseIntoItems(x, itemIndex),
                ),
              );
            } else {
              resultItems.push(
                ...processResponseIntoItems(response, itemIndex),
              );
            }
            continue;
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
                nextUrl = `${baseUrl}/${resourceType}${restUrl.join(resourceType)}`;
              }
              const pageRequestOptions: OptionsWithUri = {
                headers: {
                  "content-type": `application/fhir+json`,
                },
                method: "GET",
                uri: nextUrl,
                json: true,
                rejectUnauthorized: requestOptions.rejectUnauthorized,
              };
              let response = await requestWithAuth(
                this,
                pageRequestOptions,
                authParameters,
              );

              nextUrl = getNextUrl(response);

              if (fhirPath) {
                response = evaluate(response, fhirPath);
              }

              resultItems.push(
                ...processResponseIntoItems(response, itemIndex),
              );
            }
          }
        } catch (error) {
          if (this.continueOnFail()) {
            const item = {
              error,

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
    }

    return [resultItems];
  }
}

async function buildRequestOptions(
  node: IExecuteFunctions,
  itemIndex: number,
): Promise<
  {
    requestOptions: OptionsWithUri;
    operation: string;
    baseUrl: string;
    resourceType: string;
  }[]
> {
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
  const specifyPatchBody = node.getNodeParameter(
    "specifyPatchBody",
    itemIndex,
    "keypair",
  ) as "keypair" | "json";
  const patchParameters = node.getNodeParameter(
    "patchParameters.parameters",
    itemIndex,
    [],
  ) as [
    {
      op: string;
      from: string;
      path: string;
      value: string;
    },
  ];
  let bodyParameter = node.getNodeParameter("body", itemIndex, "") as string;
  if (
    bodyParameter &&
    typeof bodyParameter === "string" &&
    bodyParameter?.trim()
  ) {
    bodyParameter = JSON.parse(bodyParameter);
  }
  const specifyQuery = node.getNodeParameter(
    "specifyQuery",
    itemIndex,
    "keypair",
  ) as string;
  const queryParameters = node.getNodeParameter(
    "queryParameters.parameters",
    itemIndex,
    [],
  ) as [{ name: string; value: string }];
  const jsonQueryParameter = node.getNodeParameter(
    "jsonQuery",
    itemIndex,
    "",
  ) as string;

  let qs;
  if (specifyQuery === "keypair" && queryParameters.length > 0) {
    qs = queryParameters.reduce((acc, { name, value }) => {
      acc[name] = value;
      return acc;
    }, {} as any);
  } else if (specifyQuery === "json" && jsonQueryParameter) {
    try {
      qs = JSON.parse(jsonQueryParameter);
    } catch {
      throw new NodeOperationError(
        node.getNode(),
        "JSON parameter need to be an valid JSON",
        {
          itemIndex,
        },
      );
    }
  }

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
    qs,
    json: true,
    rejectUnauthorized: !allowUnauthorizedCerts,
  };

  switch (operation) {
    case "Create": {
      return [
        {
          requestOptions: {
            ...requestOptions,
            method: "POST",
            uri: `${baseUrl}/${resourceType}`,
            body: bodyParameter,
          },
          operation,
          baseUrl,
          resourceType,
        },
      ];
    }
    case "Delete": {
      return [
        {
          requestOptions: {
            ...requestOptions,
            method: "DELETE",
            uri: `${baseUrl}/${resourceType}/${id}`,
          },
          operation,
          baseUrl,
          resourceType,
        },
      ];
    }
    case "History": {
      return [
        {
          requestOptions: {
            ...requestOptions,
            method: "GET",
            uri: `${baseUrl}/${resourceType}/${id}/_history`,
          },
          operation,
          baseUrl,
          resourceType,
        },
      ];
    }
    case "Patch": {
      return [
        {
          requestOptions: {
            ...requestOptions,
            method: "PATCH",
            uri: `${baseUrl}/${resourceType}/${id}`,
            body:
              specifyPatchBody === "keypair" ? patchParameters : bodyParameter,
          },
          operation,
          baseUrl,
          resourceType,
        },
      ];
    }
    case "Read": {
      return [
        {
          requestOptions: {
            ...requestOptions,
            method: "GET",
            uri: `${baseUrl}/${resourceType}/${id}`,
          },
          operation,
          baseUrl,
          resourceType,
        },
      ];
    }
    case "Resolve": {
      const reference = node.getNodeParameter("reference", itemIndex, "") as
        | string
        | object
        | object[]
        | undefined;
      if (!reference) {
        return [];
      }
      let allReferences = [];
      if (typeof reference === "string") {
        allReferences = [reference];
      } else if (Array.isArray(reference)) {
        allReferences = reference.map((ref) => ref?.reference).filter(Boolean);
      } else if (typeof reference === "object") {
        allReferences = [(reference as any).reference];
      }

      return allReferences.map((ref) => {
        const [refResourceType, ...refId] = ref.split("/");
        return {
          requestOptions: {
            ...requestOptions,
            method: "GET",
            uri: `${baseUrl}/${refResourceType}/${refId}`,
          },
          operation,
          baseUrl,
          resourceType,
        };
      });
    }
    case "Search": {
      return [
        {
          requestOptions: {
            ...requestOptions,
            method: "GET",
            uri: `${baseUrl}/${resourceType}`,
          },
          operation,
          baseUrl,
          resourceType,
        },
      ];
    }
    case "Update": {
      return [
        {
          requestOptions: {
            ...requestOptions,
            method: "PUT",

            uri: `${baseUrl}/${resourceType}/${id || (bodyParameter as any).id}`,
            body: bodyParameter,
          },
          operation,
          baseUrl,
          resourceType,
        },
      ];
    }
    case "VRead": {
      return [
        {
          requestOptions: {
            ...requestOptions,
            method: "GET",
            uri: `${baseUrl}/${resourceType}/${id}/_history/${vid}`,
          },
          operation,
          baseUrl,
          resourceType,
        },
      ];
    }

    default: {
      throw new NodeApiError(
        node.getNode(),
        { operation },
        { message: `The operation "${operation}" is not supported` },
      );
    }
  }
}

function getNextUrl(bundle: any): string | undefined {
  return bundle.link?.find((link: any) => link.relation === "next")?.url;
}

function processResponseIntoItems(response: any, itemIndex: number) {
  const resultItems = [];
  if (response.resourceType === "Bundle") {
    const allResources = new Map<string, unknown>();
    for (const entry of response.entry
      ?.map((entry: any) => entry.resource)
      .filter(Boolean) || []) {
      allResources.set(`${entry.resourceType}/${entry.id}`, entry);
      if (entry.meta?.versionId) {
        allResources.set(
          `${entry.resourceType}/${entry.id}/_history/${entry.meta.versionId}`,
          entry,
        );
      }
    }
    for (const entry of response.entry.filter((e: any) =>
      isSearchMatch(e, response.entry?.[0]),
    )) {
      resolveInternalReferences(entry, allResources);
      resultItems.push({
        json: entry.resource,
        pairedItem: {
          item: itemIndex,
        },
      });
    }
  } else if (response != undefined) {
    resultItems.push({
      json: response,
      pairedItem: {
        item: itemIndex,
      },
    });
  }
  return resultItems;
}

function isSearchMatch(entry: any, firstEntry: any) {
  return entry.search?.mode
    ? entry.search.mode === "match"
    : entry.resource?.resourceType === firstEntry.resource?.resourceType;
}

function resolveInternalReferences(
  entry: any,
  allResources: Map<string, unknown>,
) {
  if (!entry) {
    return;
  }

  if (Array.isArray(entry)) {
    for (const e of entry) resolveInternalReferences(e, allResources);
    return;
  }

  if (typeof entry !== "object") {
    return;
  }

  if (entry.reference && allResources.has(entry.reference)) {
    entry.included = allResources.get(entry.reference);
  }

  for (const key in entry) {
    resolveInternalReferences(entry[key], allResources);
  }
}
