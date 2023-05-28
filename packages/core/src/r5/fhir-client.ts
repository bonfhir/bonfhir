import {
  BundleNavigator,
  WithResolvableReferences,
  bundleNavigator,
} from "./bundle-navigator";
import {
  AnyResource,
  AnyResourceType,
  Bundle,
  CapabilityStatement,
  ExtractResource,
  OperationOutcome,
  Retrieved,
} from "./fhir-types.codegen";
import { Formatter } from "./formatters";
import {
  ExtractOperationResultType,
  Operation,
  OperationParameters,
} from "./operations.codegen";
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
  read<TResourceType extends AnyResourceType>(
    type: TResourceType,
    id: string,
    options?: GeneralParameters | null | undefined
  ): Promise<Retrieved<ExtractResource<TResourceType>>>;

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
   * This interaction searches a set of resources based on some filter criteria.
   * https://hl7.org/fhir/http.html#search
   */
  search<TResourceType extends AnyResourceType>(
    type?: TResourceType | null | undefined,
    parameters?: FhirClientSearchParameters<TResourceType> | null | undefined,
    options?: GeneralParameters | null | undefined
  ): Promise<BundleNavigator<Retrieved<ExtractResource<TResourceType>>>>;

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
    ) => unknown | Promise<unknown>
  ): Promise<void>;

  /**
   * Execute a search operation and retrieve all pages from the server, aggregating into a final {@link BundleNavigator}.
   * Be careful, as this can be a very long / expensive operation.
   */
  searchAllPages<TResourceType extends AnyResourceType>(
    type: TResourceType | null | undefined,
    search: FhirClientSearchParameters<TResourceType>
  ): Promise<BundleNavigator<ExtractResource<TResourceType>>>;

  /**
   * The capabilities interaction retrieves the information about a server's capabilities - which portions of this specification it supports.
   * https://hl7.org/fhir/http.html#capabilities
   */
  capabilities(
    mode?: "full" | "normative" | "terminology" | null | undefined
  ): Promise<CapabilityStatement>;

  /**
   * The batch and transaction interactions submit a set of actions to perform on a server in a single HTTP request/response.
   * https://hl7.org/fhir/http.html#transaction
   */
  batch(
    body: Bundle,
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
   * Execute an HTTP fetch operation to the FHIR server.
   */
  fetch<T = unknown>(
    resource: string | URL,
    init?: Parameters<typeof fetch>[1]
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    public status: number,
    public operationOutcome: OperationOutcome | undefined,
    public metadata?: Record<string, unknown> | undefined
  ) {
    const operationOutcomeMessage = operationOutcome?.issue
      ?.map(
        (issue) =>
          `${Formatter.default.format(
            "code",
            issue.code
          )}/${Formatter.default.format("CodeableConcept", issue.details)}${
            issue.expression ? ` at ${issue.expression}` : ""
          }`
      )
      .join(", ");
    super(
      `Error from FhirClient: ${status}${
        operationOutcomeMessage ? ` - ${operationOutcomeMessage}` : ""
      }`
    );
  }
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
  client: Pick<FhirClient, "search" | "fetch">,
  type: TResourceType | null | undefined,
  search: FhirClientSearchParameters<TResourceType>,
  fn: (
    nav: BundleNavigator<Retrieved<ExtractResource<TResourceType>>>
  ) => unknown | Promise<unknown>
): Promise<void> {
  let currentNavigator:
    | BundleNavigator<Retrieved<ExtractResource<TResourceType>>>
    | undefined;

  while (!currentNavigator || currentNavigator.linkUrl("next")) {
    currentNavigator = currentNavigator
      ? bundleNavigator(
          await client.fetch<Bundle<Retrieved<ExtractResource<TResourceType>>>>(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            currentNavigator.linkUrl("next")!
          )
        )
      : await client.search<TResourceType>(type, search);

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
  client: Pick<FhirClient, "search" | "fetch">,
  type: TResourceType | null | undefined,
  search: FhirClientSearchParameters<TResourceType>
): Promise<BundleNavigator<ExtractResource<TResourceType>>> {
  const results: Array<BundleNavigator<ExtractResource<TResourceType>>> = [];

  await searchByPage(client, type, search, (nav) => {
    results.push(nav);
  });

  return new BundleNavigator(results);
}
