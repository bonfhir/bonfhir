/* eslint-disable @typescript-eslint/no-explicit-any */
import { BundleExecutor } from "./bundle-executor.js";
import {
  BundleNavigator,
  WithResolvableReferences,
} from "./bundle-navigator.js";
import { CustomResourceClass } from "./extensions.js";
import {
  AnyResource,
  AnyResourceType,
  Bundle,
  CapabilityStatement,
  ExtractResource,
  OperationOutcome,
  Retrieved,
} from "./fhir-types.codegen.js";
import { Formatter } from "./formatters.js";
import {
  ExtractOperationResultType,
  Operation,
  OperationParameters,
} from "./operations.codegen.js";
import { ExtractPatchBuilder, fhirJSONPatch } from "./patch.codegen.js";
import { JSONPatchBody } from "./patch.js";
import { ExtractSearchBuilder, fhirSearch } from "./search.codegen.js";

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
  read<TResourceType extends AnyResourceType>(
    type: TResourceType,
    id: string,
    options?: GeneralParameters | null | undefined
  ): Promise<Retrieved<ExtractResource<TResourceType>>>;
  read<TCustomResourceClass extends CustomResourceClass>(
    type: TCustomResourceClass,
    id: string,
    options?: GeneralParameters | null | undefined
  ): Promise<Retrieved<InstanceType<TCustomResourceClass>>>;

  /**
   * The vread interaction performs a version specific read of the resource.
   * https://hl7.org/fhir/http.html#vread
   */
  vread<TResourceType extends AnyResourceType>(
    type: TResourceType,
    id: string,
    vid: string,
    options?: GeneralParameters | null | undefined
  ): Promise<Retrieved<ExtractResource<TResourceType>>>;
  vread<TCustomResourceClass extends CustomResourceClass>(
    type: TCustomResourceClass,
    id: string,
    vid: string,
    options?: GeneralParameters | null | undefined
  ): Promise<Retrieved<InstanceType<TCustomResourceClass>>>;

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
      | undefined
  ): Promise<Retrieved<TResource>>;

  /**
   * As an alternative to updating an entire resource, clients can perform a patch operation.
   * https://hl7.org/fhir/http.html#patch
   */
  patch<TResourceType extends AnyResourceType>(
    type: TResourceType,
    id: string,
    body: FhirClientPatchBody<TResourceType>,
    options?:
      | (GeneralParameters &
          ConcurrencyParameters & {
            versionId?: string | null | undefined;
          } & ConditionalSearchParameters<TResourceType>)
      | null
      | undefined
  ): Promise<Retrieved<ExtractResource<TResourceType>>>;
  patch<TCustomResourceClass extends CustomResourceClass>(
    type: TCustomResourceClass,
    id: string,
    body: FhirClientPatchBody<TCustomResourceClass["resourceType"]>,
    options?:
      | (GeneralParameters &
          ConcurrencyParameters & {
            versionId?: string | null | undefined;
          } & ConditionalSearchParameters<TCustomResourceClass["resourceType"]>)
      | null
      | undefined
  ): Promise<Retrieved<InstanceType<TCustomResourceClass>>>;

  /**
   * The delete interaction removes an existing resource.
   * https://hl7.org/fhir/http.html#delete
   */
  delete(
    resource: Retrieved<AnyResource>,
    options?: GeneralParameters | null | undefined
  ): Promise<void>;
  delete(
    type: AnyResourceType,
    id: string,
    options?: GeneralParameters | null | undefined
  ): Promise<void>;

  /**
   * The history interaction retrieves the history of either a particular resource, all resources of a given type, or all resources supported by the system.
   * https://hl7.org/fhir/http.html#history
   */
  history<TResource extends AnyResource>(
    resource: Retrieved<TResource>,
    options?: (GeneralParameters & HistoryParameters) | null | undefined
  ): Promise<BundleNavigator<Retrieved<TResource>>>;
  history<TResourceType extends AnyResourceType>(
    type?: TResourceType | null | undefined,
    id?: string | null | undefined,
    options?: (GeneralParameters & HistoryParameters) | null | undefined
  ): Promise<BundleNavigator<Retrieved<ExtractResource<TResourceType>>>>;

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
      | undefined
  ): Promise<Retrieved<TResource>>;

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
      | undefined
  ): Promise<Retrieved<TResource>>;

  /**
   * This interaction searches a set of resources based on some filter criteria.
   * https://hl7.org/fhir/http.html#search
   */
  search<TResourceType extends AnyResourceType>(
    type?: TResourceType | null | undefined,
    parameters?: FhirClientSearchParameters<TResourceType> | null | undefined,
    options?: GeneralParameters | null | undefined
  ): Promise<BundleNavigator<Retrieved<ExtractResource<TResourceType>>>>;
  search<TCustomResourceClass extends CustomResourceClass>(
    type: TCustomResourceClass,
    parameters?:
      | FhirClientSearchParameters<TCustomResourceClass["resourceType"]>
      | null
      | undefined,
    options?: GeneralParameters | null | undefined
  ): Promise<BundleNavigator<Retrieved<InstanceType<TCustomResourceClass>>>>;

  /**
   * Execute a search operation, and return the first search match in the bundle.
   * Throw if there are zero or more than one match.
   *
   * Included resources are still accessible with resolvable references.
   * https://hl7.org/fhir/http.html#search
   */
  searchOne<TResourceType extends AnyResourceType>(
    type?: TResourceType | null | undefined,
    parameters?: FhirClientSearchParameters<TResourceType> | null | undefined,
    options?: GeneralParameters | null | undefined
  ): Promise<
    WithResolvableReferences<Retrieved<ExtractResource<TResourceType>>>
  >;
  searchOne<TCustomResourceClass extends CustomResourceClass>(
    type: TCustomResourceClass,
    parameters?:
      | FhirClientSearchParameters<TCustomResourceClass["resourceType"]>
      | null
      | undefined,
    options?: GeneralParameters | null | undefined
  ): Promise<
    WithResolvableReferences<Retrieved<InstanceType<TCustomResourceClass>>>
  >;

  /**
   * Execute a search operation and walk through all the search pages.
   * For each page, execute the `fn` callback by passing the current page bundle navigator.
   * https://hl7.org/fhir/http.html#search
   */
  searchByPage<TResourceType extends AnyResourceType>(
    type: TResourceType | null | undefined,
    search: FhirClientSearchParameters<TResourceType>,
    fn: (
      nav: BundleNavigator<Retrieved<ExtractResource<TResourceType>>>
    ) => unknown | Promise<unknown>,
    options?: GeneralParameters | null | undefined
  ): Promise<void>;
  searchByPage<TCustomResourceClass extends CustomResourceClass>(
    type: TCustomResourceClass,
    search: FhirClientSearchParameters<TCustomResourceClass["resourceType"]>,
    fn: (
      nav: BundleNavigator<Retrieved<InstanceType<TCustomResourceClass>>>
    ) => unknown | Promise<unknown>,
    options?: GeneralParameters | null | undefined
  ): Promise<void>;

  /**
   * Execute a search operation and retrieve all pages from the server, aggregating into a final {@link BundleNavigator}.
   * Be careful, as this can be a very long / expensive operation.
   */
  searchAllPages<TResourceType extends AnyResourceType>(
    type: TResourceType | null | undefined,
    search: FhirClientSearchParameters<TResourceType>,
    options?: GeneralParameters | null | undefined
  ): Promise<BundleNavigator<ExtractResource<TResourceType>>>;
  searchAllPages<TCustomResourceClass extends CustomResourceClass>(
    type: TCustomResourceClass,
    search: FhirClientSearchParameters<TCustomResourceClass["resourceType"]>,
    options?: GeneralParameters | null | undefined
  ): Promise<BundleNavigator<Retrieved<InstanceType<TCustomResourceClass>>>>;

  /**
   * The capabilities interaction retrieves the information about a server's capabilities - which portions of this specification it supports.
   * https://hl7.org/fhir/http.html#capabilities
   */
  capabilities(
    mode?: "full" | "normative" | "terminology" | null | undefined
  ): Promise<CapabilityStatement>;

  /**
   * The batch interaction submits a set of actions to perform on a server in a single HTTP request/response.
   * Each entry executes in a different transaction on the server.
   * https://hl7.org/fhir/http.html#transaction
   */
  batch(): BundleExecutor;
  batch(
    body: Bundle & { type: "batch" },
    options?: GeneralParameters | null | undefined
  ): Promise<Bundle>;

  /**
   * The transaction interaction submits a set of actions to perform on a server in a single HTTP request/response.
   * All entries execute in a single transaction on the server.
   * https://hl7.org/fhir/http.html#transaction
   */
  transaction(): BundleExecutor;
  transaction(
    body: Bundle & { type: "transaction" },
    options?: GeneralParameters | null | undefined
  ): Promise<Bundle>;

  /**
   * Execute a server operation.
   * https://www.hl7.org/fhir/operations.html
   * https://www.hl7.org/fhir/operationslist.html
   */
  execute<TOperation extends Operation>(
    operation: TOperation
  ): Promise<ExtractOperationResultType<TOperation>>;
  execute<TOperationResult>(
    operation: OperationParameters
  ): Promise<TOperationResult>;

  /**
   * Fetch a page from a bundle previously retrieved from a search or history operation.
   * @see {@link https://www.hl7.org/fhir/bundle.html#pagination}.
   * @see BundleNavigator.linkUrl
   *
   * @see also FhirClient.searchByPage, FhirClient.searchAllPages
   */
  fetchPage<TResource extends AnyResource>(
    resource: string | URL,
    init?: Parameters<typeof fetch>[1]
  ): Promise<BundleNavigator<Retrieved<TResource>>>;
  fetchPage<TCustomResourceClass extends CustomResourceClass>(
    resource: string | URL,
    init?: Parameters<typeof fetch>[1],
    customType?: TCustomResourceClass | null | undefined
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
      | undefined
  ): Promise<T>;
}

export type FhirClientPatchBody<TResourceType extends AnyResourceType> =
  | ((
      patch: ExtractPatchBuilder<TResourceType>
    ) => ExtractPatchBuilder<TResourceType> | JSONPatchBody)
  | JSONPatchBody;

/**
 * This is a helper function that take either a function or a JSONPatchBody that represents a patch body,
 * and normalize them as the final FHIR patch body as a JSONPatchBody.
 */
export function normalizePatchBody<TResource extends AnyResourceType>(
  type: TResource,
  patch: FhirClientPatchBody<TResource>
): JSONPatchBody {
  if (typeof patch === "function") {
    const builtPatch = patch(fhirJSONPatch(type));
    if (Array.isArray(builtPatch)) {
      return builtPatch;
    }

    return builtPatch.patch;
  }
  return patch;
}

export type FhirClientSearchParameters<TResourceType extends AnyResourceType> =
  | ((
      search: ExtractSearchBuilder<TResourceType>
    ) => ExtractSearchBuilder<TResourceType> | string)
  | string;

/**
 * This is a helper function that take either a function or a string that represents search parameters,
 * and normalize them as the final FHIR search parameters as a string.
 */
export function normalizeSearchParameters<
  TResourceType extends AnyResourceType
>(
  type: TResourceType | null | undefined,
  parameters: FhirClientSearchParameters<TResourceType> | null | undefined
): string | undefined {
  if (typeof parameters === "function") {
    const builtParameters = parameters(fhirSearch(type) as any);
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
    message?: string | undefined
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
            ]}`
        )
        .join(", ");
    super(
      `Error from FhirClient: ${status || ""}${
        operationOutcomeMessage ? ` - ${operationOutcomeMessage}` : ""
      }`
    );
  }
}

export function isFhirClientError(error: unknown): error is FhirClientError {
  return error instanceof FhirClientError;
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
  TResourceType extends AnyResourceType
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
export async function searchByPage<TResourceType extends AnyResourceType>(
  client: Pick<FhirClient, "search" | "fetchPage">,
  type: TResourceType | null | undefined,
  search: FhirClientSearchParameters<TResourceType>,
  fn: (
    nav: BundleNavigator<Retrieved<ExtractResource<TResourceType>>>
  ) => unknown | Promise<unknown>,
  options?: GeneralParameters | null | undefined
): Promise<void>;
export async function searchByPage<
  TCustomResourceClass extends CustomResourceClass
>(
  client: Pick<FhirClient, "search" | "fetchPage">,
  type: TCustomResourceClass,
  search: FhirClientSearchParameters<TCustomResourceClass["resourceType"]>,
  fn: (
    nav: BundleNavigator<Retrieved<InstanceType<TCustomResourceClass>>>
  ) => unknown | Promise<unknown>,
  options?: GeneralParameters | null | undefined
): Promise<void>;
export async function searchByPage<
  TResourceType extends AnyResourceType,
  TCustomResourceClass extends CustomResourceClass
>(
  client: Pick<FhirClient, "search" | "fetchPage">,
  type: TResourceType | TCustomResourceClass | null | undefined,
  search:
    | FhirClientSearchParameters<TResourceType>
    | FhirClientSearchParameters<TCustomResourceClass["resourceType"]>,
  fn: (
    nav:
      | BundleNavigator<Retrieved<ExtractResource<TResourceType>>>
      | BundleNavigator<Retrieved<InstanceType<TCustomResourceClass>>>
  ) => unknown | Promise<unknown>,
  options?: GeneralParameters | null | undefined
): Promise<void> {
  let currentNavigator:
    | BundleNavigator<Retrieved<ExtractResource<TResourceType>>>
    | BundleNavigator<Retrieved<InstanceType<TCustomResourceClass>>>
    | undefined;

  while (!currentNavigator || currentNavigator.linkUrl("next")) {
    currentNavigator = currentNavigator
      ? await client.fetchPage(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          currentNavigator.linkUrl("next")!,
          { signal: options?.signal },
          typeof type === "string" ? undefined : type || undefined
        )
      : await client.search<TResourceType>(
          type as TResourceType,
          search as FhirClientSearchParameters<TResourceType>,
          options
        );

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
export async function searchAllPages<TResourceType extends AnyResourceType>(
  client: Pick<FhirClient, "search" | "fetchPage">,
  type: TResourceType | null | undefined,
  search: FhirClientSearchParameters<TResourceType>,
  options?: GeneralParameters | null | undefined
): Promise<BundleNavigator<ExtractResource<TResourceType>>>;
export async function searchAllPages<
  TCustomResourceClass extends CustomResourceClass
>(
  client: Pick<FhirClient, "search" | "fetchPage">,
  type: TCustomResourceClass,
  search: FhirClientSearchParameters<TCustomResourceClass["resourceType"]>,
  options?: GeneralParameters | null | undefined
): Promise<BundleNavigator<Retrieved<InstanceType<TCustomResourceClass>>>>;
export async function searchAllPages<
  TResourceType extends AnyResourceType,
  TCustomResourceClass extends CustomResourceClass
>(
  client: Pick<FhirClient, "search" | "fetchPage">,
  type: TResourceType | TCustomResourceClass | null | undefined,
  search:
    | FhirClientSearchParameters<TResourceType>
    | FhirClientSearchParameters<TCustomResourceClass["resourceType"]>,
  options?: GeneralParameters | null | undefined
): Promise<
  | BundleNavigator<ExtractResource<TResourceType>>
  | BundleNavigator<Retrieved<InstanceType<TCustomResourceClass>>>
> {
  const results: Array<
    | BundleNavigator<ExtractResource<TResourceType>>
    | BundleNavigator<Retrieved<InstanceType<TCustomResourceClass>>>
  > = [];

  await searchByPage(
    client,
    type as any,
    search as any,
    (nav) => {
      results.push(nav as any);
    },
    options
  );

  return new BundleNavigator(
    results,
    typeof type === "string" ? undefined : type || undefined
  ) as any;
}
