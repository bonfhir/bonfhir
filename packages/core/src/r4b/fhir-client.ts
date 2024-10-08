/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnyResource,
  AnyResourceType,
  Bundle,
  CapabilityStatement,
  Parameters as FhirParameters,
  OperationOutcome,
  ParametersParameter,
  Reference,
  ResourceType,
  Retrieved,
  TerminologyCapabilities,
} from "@bonfhir/fhirtypes/r4b";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { ExecutionResult } from "graphql";
import { BundleExecutor } from "./bundle-executor";
import { BundleNavigator, WithResolvableReferences } from "./bundle-navigator";
import {
  AnyResourceTypeOrCustomResource,
  CustomResourceClass,
  ResourceOf,
  ResourceTypeOf,
  resourceTypeOf,
} from "./extensions";
import { Formatter } from "./formatters";
import { resourcesAreEqual } from "./lang-utils";
import { merge } from "./merge";
import { Merger } from "./mergers/index";
import { JSONPatchBody } from "./patch";
import { ExtractPatchBuilder, fhirJSONPatch } from "./patch.codegen";
import { ExtractSearchBuilder, fhirSearch } from "./search.codegen";

/**
 * Abstract FHIR Restful Client that can be used as a dependency.
 * Concrete implementation can be built following the interface defined here.
 *
 * https://hl7.org/fhir/http.html
 */
export interface FhirClient {
  /**
   * The read interaction accesses the current contents of a resource.
   * https://hl7.org/fhir/http.html#read
   */
  read<TResourceType extends AnyResourceTypeOrCustomResource>(
    id: Reference<ResourceOf<TResourceType>>,
    options?: GeneralParameters | null | undefined,
  ): Promise<Retrieved<ResourceOf<TResourceType>>>;
  read<TResourceType extends AnyResourceTypeOrCustomResource>(
    type: TResourceType,
    id: string | Reference,
    options?: GeneralParameters | null | undefined,
  ): Promise<Retrieved<ResourceOf<TResourceType>>>;

  /**
   * The vread interaction performs a version specific read of the resource.
   * https://hl7.org/fhir/http.html#vread
   */
  vread<TResourceType extends AnyResourceTypeOrCustomResource>(
    type: TResourceType,
    id: string,
    vid: string,
    options?: GeneralParameters | null | undefined,
  ): Promise<Retrieved<ResourceOf<TResourceType>>>;

  /**
   * The update interaction creates a new current version for an existing resource or creates an initial version
   * if no resource already exists for the given id.
   * https://hl7.org/fhir/http.html#update
   */
  update<TResource extends AnyResource>(
    body: TResource,
    options?:
      | (GeneralParameters &
          ConcurrencyParameters &
          ConditionalSearchParameters<TResource["resourceType"]>)
      | null
      | undefined,
  ): Promise<Retrieved<TResource>>;

  /**
   * As an alternative to updating an entire resource, clients can perform a patch operation.
   * https://hl7.org/fhir/http.html#patch
   */
  patch<TResourceType extends AnyResourceTypeOrCustomResource>(
    type: TResourceType,
    id: string,
    body: FhirClientPatchBody<ResourceTypeOf<TResourceType>>,
    options?:
      | (GeneralParameters &
          ConcurrencyParameters & {
            versionId?: string | null | undefined;
          } & ConditionalSearchParameters<ResourceTypeOf<TResourceType>>)
      | null
      | undefined,
  ): Promise<Retrieved<ResourceOf<TResourceType>>>;

  /**
   * The delete interaction removes an existing resource.
   * https://hl7.org/fhir/http.html#delete
   */
  delete(
    resource: Retrieved<AnyResource>,
    options?: GeneralParameters | null | undefined,
  ): Promise<void>;
  delete(
    type: AnyResourceType,
    id: string,
    options?: GeneralParameters | null | undefined,
  ): Promise<void>;

  /**
   * The history interaction retrieves the history of either a particular resource, all resources of a given type, or all resources supported by the system.
   * https://hl7.org/fhir/http.html#history
   */
  history<TResource extends AnyResource>(
    resource: Retrieved<TResource>,
    options?: (GeneralParameters & HistoryParameters) | null | undefined,
  ): Promise<BundleNavigator<Retrieved<TResource>>>;
  history<TResourceType extends AnyResourceTypeOrCustomResource>(
    type?: TResourceType | null | undefined,
    id?: string | null | undefined,
    options?: (GeneralParameters & HistoryParameters) | null | undefined,
  ): Promise<BundleNavigator<Retrieved<ResourceOf<TResourceType>>>>;

  /**
   * The create interaction creates a new resource in a server-assigned location.
   * https://hl7.org/fhir/http.html#create
   */
  create<TResource extends AnyResource>(
    body: TResource,
    options?:
      | (GeneralParameters &
          ConditionalSearchParameters<TResource["resourceType"]>)
      | null
      | undefined,
  ): Promise<Retrieved<TResource>>;

  createOr<TResource extends AnyResource>(
    action: CreateOrAction,
    resource: TResource,
    search?:
      | FhirClientSearchParameters<TResource["resourceType"]>
      | null
      | undefined,
  ): Promise<CreateOrResult<Retrieved<TResource>>>;

  /**
   * This is a basic create or update operation.
   * It invokes create if the resource has no id, update otherwise.
   */
  save<TResource extends AnyResource>(
    body: TResource,
    options?:
      | (GeneralParameters &
          ConcurrencyParameters &
          ConditionalSearchParameters<TResource["resourceType"]>)
      | null
      | undefined,
  ): Promise<Retrieved<TResource>>;

  /**
   * This interaction searches a set of resources based on some filter criteria.
   * https://hl7.org/fhir/http.html#search
   */
  search<TResourceType extends AnyResourceTypeOrCustomResource>(
    type?: TResourceType | null | undefined,
    parameters?:
      | FhirClientSearchParameters<ResourceTypeOf<TResourceType>>
      | null
      | undefined,
    options?: GeneralParameters | null | undefined,
  ): Promise<BundleNavigator<Retrieved<ResourceOf<TResourceType>>>>;

  /**
   * Execute a search operation, and return the first search match in the bundle.
   * Throw if there are zero or more than one match.
   *
   * Included resources are still accessible with resolvable references.
   * https://hl7.org/fhir/http.html#search
   */
  searchOne<TResourceType extends AnyResourceTypeOrCustomResource>(
    type?: TResourceType | null | undefined,
    parameters?:
      | FhirClientSearchParameters<ResourceTypeOf<TResourceType>>
      | null
      | undefined,
    options?: GeneralParameters | null | undefined,
  ): Promise<WithResolvableReferences<Retrieved<ResourceOf<TResourceType>>>>;

  /**
   * Execute a search operation and walk through all the search pages.
   * For each page, execute the `fn` callback by passing the current page bundle navigator.
   * https://hl7.org/fhir/http.html#search
   */
  searchByPage<TResourceType extends AnyResourceTypeOrCustomResource>(
    type: TResourceType | null | undefined,
    search:
      | FhirClientSearchParameters<ResourceTypeOf<TResourceType>>
      | null
      | undefined,
    fn: (
      nav: BundleNavigator<Retrieved<ResourceOf<TResourceType>>>,
    ) => unknown | Promise<unknown>,
    options?: GeneralParameters | null | undefined,
  ): Promise<void>;

  /**
   * Execute a search operation and retrieve all pages from the server, aggregating into a final {@link BundleNavigator}.
   * Be careful, as this can be a very long / expensive operation.
   */
  searchAllPages<TResourceType extends AnyResourceTypeOrCustomResource>(
    type: TResourceType | null | undefined,
    search?:
      | FhirClientSearchParameters<ResourceTypeOf<TResourceType>>
      | null
      | undefined,
    options?: GeneralParameters | null | undefined,
  ): Promise<BundleNavigator<ResourceOf<TResourceType>>>;

  /**
   * Execute a [$graph operation](http://hl7.org/fhir/resource-operation-graph.html) to retrieve an entire graph
   * of resources.
   */
  graph<TResourceType extends AnyResourceTypeOrCustomResource>(
    graph: string,
    resourceType?: TResourceType | null | undefined,
    resourceId?: string | null | undefined,
  ): Promise<BundleNavigator<Retrieved<ResourceOf<TResourceType>>>>;

  /**
   * Execute a [$graphql operation](https://hl7.org/fhir/resource-operation-graphql.html).
   *
   * This methods throws a `FhirClientError` if there are GraphQL errors in the response.
   * This make it easier to reason about, but do not support partial errors in GraphQL.
   *
   * Use the {@link graphqlResult} method to have access to the raw GraphQL response,
   * including the `errors` and `extensions` field.
   */
  graphql<TResult = any>(
    query: string,
    variables?: Record<string, any>,
    operationName?: string | null | undefined,
  ): Promise<TResult>;
  graphql<TResult = any, TVariables = Record<string, any>>(
    query: TypedDocumentNode<TResult, TVariables>,
    variables?: TVariables,
  ): Promise<TResult>;

  /**
   * Execute a [$graphql operation](https://hl7.org/fhir/resource-operation-graphql.html).
   *
   * This methods returns the "raw" GraphQL ExecutionResult, including the `errors` and `extensions` field.
   * It does not throw if there are GraphQL errors in the response - it is up to the caller to handle them.
   *
   * Use the {@link graphql} method to have a simpler API that throws a `FhirClientError`
   * whenever there are GraphQL errors.
   */
  graphqlResult<TResult = any>(
    query: string,
    variables?: Record<string, any>,
    operationName?: string | null | undefined,
  ): Promise<ExecutionResult<TResult>>;
  graphqlResult<TResult = any, TVariables = Record<string, any>>(
    query: TypedDocumentNode<TResult, TVariables>,
    variables?: TVariables,
  ): Promise<ExecutionResult<TResult>>;

  /**
   * The capabilities interaction retrieves the information about a server's capabilities - which portions of this specification it supports.
   * https://hl7.org/fhir/http.html#capabilities
   */
  capabilities(
    mode?: "full" | "normative" | null | undefined,
  ): Promise<CapabilityStatement>;
  capabilities(mode: "terminology"): Promise<TerminologyCapabilities>;

  /**
   * The batch interaction submits a set of actions to perform on a server in a single HTTP request/response.
   * Each entry executes in a different transaction on the server.
   * https://hl7.org/fhir/http.html#transaction
   */
  batch(): BundleExecutor;
  batch(
    body: Bundle,
    options?: GeneralParameters | null | undefined,
  ): Promise<Bundle>;

  /**
   * The transaction interaction submits a set of actions to perform on a server in a single HTTP request/response.
   * All entries execute in a single transaction on the server.
   * https://hl7.org/fhir/http.html#transaction
   */
  transaction(): BundleExecutor;
  transaction(
    body: Bundle,
    options?: GeneralParameters | null | undefined,
  ): Promise<Bundle>;

  /**
   * Execute a server operation.
   * https://www.hl7.org/fhir/operations.html
   * https://www.hl7.org/fhir/operationslist.html
   */
  execute<TOperationResult>(operation: Operation): Promise<TOperationResult>;

  /**
   * Fetch a page from a bundle previously retrieved from a search or history operation.
   * @see {@link https://www.hl7.org/fhir/bundle.html#pagination}.
   * @see BundleNavigator.linkUrl
   *
   * @see also FhirClient.searchByPage, FhirClient.searchAllPages
   */
  fetchPage<TResource extends AnyResource>(
    resource: string | URL,
    init?: Parameters<typeof fetch>[1],
  ): Promise<BundleNavigator<Retrieved<TResource>>>;
  fetchPage<TCustomResourceClass extends CustomResourceClass>(
    resource: string | URL,
    init?: Parameters<typeof fetch>[1],
    customType?: TCustomResourceClass | null | undefined,
  ): Promise<BundleNavigator<Retrieved<InstanceType<TCustomResourceClass>>>>;

  /**
   * Execute an HTTP fetch operation to the FHIR server.
   *
   * @param customType - Custom class or constructor function that will be used to instantiate the resource.
   */
  fetch<T = unknown>(
    resource: string | URL,
    init?: Parameters<typeof fetch>[1],
    customType?:
      | string
      // eslint-disable-next-line @typescript-eslint/ban-types
      | Function
      | null
      | undefined,
  ): Promise<T>;
}

export type FhirClientPatchBody<TResourceType extends AnyResourceType> =
  | ((
      patch: ExtractPatchBuilder<TResourceType>,
    ) => ExtractPatchBuilder<TResourceType> | JSONPatchBody)
  | JSONPatchBody;

/**
 * This is a helper function that take either a function or a JSONPatchBody that represents a patch body,
 * and normalize them as the final FHIR patch body as a JSONPatchBody.
 */
export function normalizePatchBody<
  TResourceType extends AnyResourceTypeOrCustomResource,
>(
  type: TResourceType,
  patch: FhirClientPatchBody<ResourceTypeOf<TResourceType>>,
): JSONPatchBody {
  if (typeof patch === "function") {
    const builtPatch = patch(fhirJSONPatch(resourceTypeOf(type)));
    if (Array.isArray(builtPatch)) {
      return builtPatch;
    }

    return builtPatch.patch;
  }
  return patch;
}

export type FhirClientSearchParameters<TResourceType extends AnyResourceType> =
  | ((
      search: ExtractSearchBuilder<TResourceType>,
    ) => ExtractSearchBuilder<TResourceType> | string)
  | string;

/**
 * This is a helper function that take either a function or a string that represents search parameters,
 * and normalize them as the final FHIR search parameters as a string.
 */
export function normalizeSearchParameters<
  TResourceType extends AnyResourceTypeOrCustomResource,
>(
  type: TResourceType | null | undefined,
  parameters:
    | FhirClientSearchParameters<ResourceTypeOf<TResourceType>>
    | null
    | undefined,
): string | undefined {
  if (typeof parameters === "function") {
    const builtParameters = parameters(fhirSearch(resourceTypeOf(type)) as any);
    if (typeof builtParameters === "string") {
      return builtParameters;
    }

    return builtParameters.href;
  }

  return parameters || undefined;
}

/**
 * Custom error raised by a FhirClient.
 */
export class FhirClientError extends Error {
  constructor(
    public status: number | undefined,
    public operationOutcome: OperationOutcome | undefined,
    public metadata?: Record<string, unknown> | undefined,
    message?: string | undefined,
  ) {
    const operationOutcomeMessage =
      message ||
      operationOutcome?.issue
        ?.map(
          (issue) =>
            Formatter.default.message`${["code", issue.code]}${[
              "CodeableConcept",
              issue.details,
              { decorator: "/{}" },
            ]}${[
              "string",
              issue.expression?.join(", "),
              { decorator: " at {}" },
            ]}`,
        )
        .join(", ");
    super(
      `Error from FhirClient: ${status || ""}${
        operationOutcomeMessage ? ` - ${operationOutcomeMessage}` : ""
      }`,
    );
  }
}

export function isFhirClientError(error: unknown): error is FhirClientError {
  return error instanceof FhirClientError;
}

export interface Operation {
  operation: string | null | undefined;
  resourceType?: ResourceType | null | undefined;
  resourceId?: string | null | undefined;
  parameters?: FhirParameters | ParametersParameter[] | null | undefined;
  affectsState?: boolean;
}

/**
 * https://hl7.org/fhir/http.html#parameters
 */
export interface GeneralParameters {
  /**
   * https://hl7.org/fhir/http.html#parameters
   */
  _format?: string | null | undefined;

  /**
   * https://hl7.org/fhir/http.html#parameters
   */
  _pretty?: boolean | null | undefined;

  /**
   * https://hl7.org/fhir/search.html#summary
   */
  _summary?: "true" | "text" | "data" | "count" | "false" | null | undefined;

  /**
   * https://hl7.org/fhir/search.html#elements
   */
  _elements?: string | Array<string> | null | undefined;

  /**
   * The {@link AbortSignal} to use for the request in order to cancel it.
   */
  signal?: AbortSignal | null | undefined;
}

/**
 * https://hl7.org/fhir/http.html#concurrency
 */
export interface ConcurrencyParameters {
  /**
   * https://hl7.org/fhir/http.html#concurrency
   */
  preventConcurrentUpdates?: boolean | null | undefined;
}

/**
 * https://hl7.org/fhir/http.html#cond-update
 */
export interface ConditionalSearchParameters<
  TResourceType extends AnyResourceType,
> {
  search?: FhirClientSearchParameters<TResourceType> | null | undefined;
}

/**
 * https://hl7.org/fhir/http.html#history
 */
export interface HistoryParameters {
  /**
   * https://hl7.org/fhir/http.html#history
   */
  _count?: number | null | undefined;

  /**
   * https://hl7.org/fhir/http.html#history
   */
  _since?: Date | string | null | undefined;

  /**
   * https://hl7.org/fhir/http.html#history
   */
  _at?: Date | string | null | undefined;

  /**
   * https://hl7.org/fhir/http.html#history
   */
  _list?: string | null | undefined;
}

/**
 * Execute a search operation and walk through all the search pages.
 * For each page, execute the `fn` callback by passing the current page bundle navigator.
 *
 * This method is meant to be used by client implementations.
 * Prefer using `client.searchByPage`.
 */
export async function searchByPage<
  TResourceType extends AnyResourceTypeOrCustomResource,
>(
  client: Pick<FhirClient, "search" | "fetchPage">,
  type: TResourceType | null | undefined,
  search:
    | FhirClientSearchParameters<ResourceTypeOf<TResourceType>>
    | null
    | undefined,
  fn: (
    nav: BundleNavigator<Retrieved<ResourceOf<TResourceType>>>,
  ) => unknown | Promise<unknown>,
  options?: GeneralParameters | null | undefined,
): Promise<void> {
  let currentNavigator:
    | BundleNavigator<Retrieved<ResourceOf<TResourceType>>>
    | undefined;

  while (!currentNavigator || currentNavigator.linkUrl("next")) {
    currentNavigator = currentNavigator
      ? ((await client.fetchPage(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          currentNavigator.linkUrl("next")!,
          { signal: options?.signal },
          typeof type === "string" ? undefined : type || undefined,
        )) as BundleNavigator<Retrieved<ResourceOf<TResourceType>>>)
      : await client.search(type, search, options);

    await fn(currentNavigator);
  }
}

/**
 * Execute a search operation and retrieve all pages from the server, aggregating into a final {@link BundleNavigator}.
 * Be careful, as this can be a very long / expensive operation.
 *
 * This method is meant to be used by client implementations.
 * Prefer using `client.searchAllPages`.
 */
export async function searchAllPages<
  TResourceType extends AnyResourceTypeOrCustomResource,
>(
  client: Pick<FhirClient, "search" | "fetchPage">,
  type: TResourceType | null | undefined,
  search?:
    | FhirClientSearchParameters<ResourceTypeOf<TResourceType>>
    | null
    | undefined,
  options?: GeneralParameters | null | undefined,
): Promise<BundleNavigator<ResourceOf<TResourceType>>> {
  const results: Array<BundleNavigator<Retrieved<ResourceOf<TResourceType>>>> =
    [];

  await searchByPage(
    client,
    type,
    search,
    (nav) => {
      results.push(nav);
    },
    options,
  );

  return new BundleNavigator(
    results,
    typeof type === "string" ? undefined : (type as any) || undefined,
  );
}

export type CreateOrAction = "return" | "replace" | "add" | "merge";

/**
 * The result of a createOr operation.
 * The first element is the resource, the second is a boolean indicating whether the final resource is different
 * than the original resource.
 */
export type CreateOrResult<T> = [T, boolean];

export async function createOr<TResource extends AnyResource>(
  client: Pick<FhirClient, "create" | "update" | "search">,
  action: Exclude<CreateOrAction, "merge">,
  resource: TResource,
  search?:
    | FhirClientSearchParameters<TResource["resourceType"]>
    | null
    | undefined,
): Promise<CreateOrResult<Retrieved<TResource>>>;
export async function createOr<TResource extends AnyResource>(
  client: Pick<FhirClient, "create" | "update" | "search">,
  action: "merge",
  resource: TResource,
  search?:
    | FhirClientSearchParameters<TResource["resourceType"]>
    | null
    | undefined,
  mergers?: Array<Merger> | null | undefined,
): Promise<CreateOrResult<Retrieved<TResource>>>;
export async function createOr<TResource extends AnyResource>(
  client: Pick<FhirClient, "create" | "update" | "search">,
  action: CreateOrAction,
  resource: TResource,
  search?:
    | FhirClientSearchParameters<TResource["resourceType"]>
    | null
    | undefined,
  mergers?: Array<Merger> | null | undefined,
): Promise<CreateOrResult<Retrieved<TResource>>>;
export async function createOr<TResource extends AnyResource>(
  client: Pick<FhirClient, "create" | "update" | "search">,
  action: CreateOrAction,
  resource: TResource,
  search?:
    | FhirClientSearchParameters<TResource["resourceType"]>
    | null
    | undefined,
  mergers?: Array<Merger> | null | undefined,
): Promise<CreateOrResult<Retrieved<TResource>>> {
  const finalSearch = resolveSearch(resource, search);

  const searchResult = await client.search(
    resource.resourceType,
    finalSearch as any,
  );
  const found = searchResult.bundle.entry?.[0]?.resource as
    | Retrieved<TResource>
    | undefined;

  if (!found) {
    return [await client.create(resource), true];
  }

  if (action === "return") {
    return [found as any, false];
  }

  if (resourcesAreEqual(found, resource)) {
    return [found as any, false];
  }

  if (action === "replace") {
    resource.id = found.id;
    return [await client.update(resource), true];
  }

  if (action === "add") {
    return [await client.create(resource), true];
  }

  if (action === "merge") {
    const [merged, isUpdated] = merge({
      current: found,
      incoming: resource,
      mergers,
    });
    if (isUpdated) {
      return [await client.update(merged), true];
    }

    return [merged as Retrieved<TResource>, false];
  }

  throw new Error(`Unknown action ${action}`);
}

function resolveSearch<TResource extends AnyResource>(
  resource: TResource,
  search:
    | FhirClientSearchParameters<TResource["resourceType"]>
    | null
    | undefined,
): FhirClientSearchParameters<TResource["resourceType"]> {
  if (search) {
    return search;
  }

  if ((resource as any).url) {
    return fhirSearch().uriParam("url", (resource as any).url) as any;
  }

  if ((resource as any).identifier) {
    return fhirSearch().tokenParam(
      "identifier",
      (resource as any).identifier,
    ) as any;
  }

  if ((resource as any).name && typeof (resource as any).name === "string") {
    return fhirSearch().stringParam("name", (resource as any).name) as any;
  }

  throw new Error(
    `Cannot resolve search for ${resource.resourceType}/${resource.id}- you need to pass it explicitly.`,
  );
}

/**
 * Return true if parameters contains complex parameters (i.e. parameters that are not simple key-value pairs).
 */
export function hasComplexParameters(
  parameters: FhirParameters | null | undefined,
): boolean {
  if (!parameters?.parameter?.length) {
    return false;
  }

  for (const param of parameters.parameter) {
    if (
      typeof Object.entries(param).find(
        ([k, v]) =>
          v != undefined && (k === "resource" || k.startsWith("value")),
      )?.[1] === "object"
    ) {
      return true;
    }
    if (param.part?.length) {
      return true;
    }
  }
  return false;
}
