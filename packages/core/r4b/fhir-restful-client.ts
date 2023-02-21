import { Bundle, CapabilityStatement, FhirResource, Identifier } from "fhir/r4";
import isEqual from "lodash/isEqual";
import omit from "lodash/omit";
import { merge, MergeResult } from "./merge";
import { fhirSearch } from "./search-builder";
import { ExtractResource, ResourceType, WithRequired } from "./types";

/**
 * Abstract FHIR Restful Client that can be used as a dependency.
 * Concrete implementation can be built following the interface defined here.
 *
 * https://hl7.org/fhir/http.html
 */
export interface FhirRestfulClient {
  /**
   * The read interaction accesses the current contents of a resource.
   * https://hl7.org/fhir/http.html#read
   */
  read: <TResource extends ResourceType>(
    type: TResource,
    id: string,
    options?: GeneralParameters | null | undefined
  ) => Promise<ExtractResource<TResource> | undefined>;

  /**
   * The vread interaction performs a version specific read of the resource.
   * https://hl7.org/fhir/http.html#vread
   */
  vread: <TResource extends ResourceType>(
    type: TResource,
    id: string,
    vid: string,
    options?: GeneralParameters | null | undefined
  ) => Promise<ExtractResource<TResource> | undefined>;

  /**
   * The update interaction creates a new current version for an existing resource or creates an initial version
   * if no resource already exists for the given id.
   * https://hl7.org/fhir/http.html#update
   */
  update: <TResource extends FhirResource>(
    body: TResource,
    options?:
      | (GeneralParameters &
          ConcurrencyParameters &
          ConditionalSearchParameters)
      | null
      | undefined
  ) => Promise<TResource>;

  /**
   * As an alternative to updating an entire resource, clients can perform a patch operation.
   * https://hl7.org/fhir/http.html#patch
   */
  patch: <TResource extends ResourceType>(
    type: TResource,
    id: string,
    body: JSONPatchBody,
    options?:
      | (GeneralParameters &
          ConcurrencyParameters &
          ConditionalSearchParameters)
      | null
      | undefined
  ) => Promise<ExtractResource<TResource>>;

  /**
   * The delete interaction removes an existing resource.
   * https://hl7.org/fhir/http.html#delete
   */
  delete: (
    type: ResourceType,
    id: string,
    options?:
      | (GeneralParameters & ConditionalSearchParameters)
      | null
      | undefined
  ) => Promise<void>;

  /**
   * The history interaction retrieves the history of either a particular resource, all resources of a given type, or all resources supported by the system.
   * https://hl7.org/fhir/http.html#history
   */
  history: <TResource extends ResourceType>(
    type?: TResource | null | undefined,
    id?: string | null | undefined,
    options?: (GeneralParameters & HistoryParameters) | null | undefined
  ) => Promise<Bundle<ExtractResource<TResource>>>;

  /**
   * The create interaction creates a new resource in a server-assigned location.
   * https://hl7.org/fhir/http.html#create
   */
  create: <TResource extends FhirResource>(
    body: TResource,
    options?:
      | (GeneralParameters & ConditionalSearchParameters)
      | null
      | undefined
  ) => Promise<TResource>;

  /**
   * This interaction searches a set of resources based on some filter criteria.
   * https://hl7.org/fhir/http.html#search
   */
  search: <TResource extends ResourceType>(
    type?: TResource | null | undefined,
    parameters?: string | null | undefined,
    options?: GeneralParameters | null | undefined
  ) => Promise<Bundle<ExtractResource<TResource>>>;

  /**
   * The capabilities interaction retrieves the information about a server's capabilities - which portions of this specification it supports.
   * https://hl7.org/fhir/http.html#capabilities
   */
  capabilities: (
    mode?: "full" | "normative" | "terminology" | null | undefined
  ) => Promise<CapabilityStatement>;

  /**
   * The batch and transaction interactions submit a set of actions to perform on a server in a single HTTP request/response.
   * https://hl7.org/fhir/http.html#transaction
   */
  batch: (
    body: Bundle,
    options?: GeneralParameters | null | undefined
  ) => Promise<Bundle>;

  /**
   * Execute a server operation.
   * https://www.hl7.org/fhir/operations.html
   * https://www.hl7.org/fhir/operationslist.html
   */
  execute: <TOperationResult, TOperationParameters = unknown>(
    operation: string | null | undefined,
    options?:
      | {
          type?: ResourceType | null | undefined;
          id?: string | null | undefined;
          parameters?: TOperationParameters | null | undefined;
        }
      | null
      | undefined
  ) => Promise<TOperationResult>;

  /**
   * Execute an HTTP Get and return the parsed body.
   */
  get: <T = unknown>(url: URL | string) => Promise<T>;
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
export type ConditionalSearchParameters = Record<string, string>;

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

export type JSONPatchBody = Array<JSONPatchOperation>;

export type JSONPatchOperation =
  | JSONPatchOperationAdd
  | JSONPatchOperationRemove
  | JSONPatchOperationReplace
  | JSONPatchOperationMove
  | JSONPatchOperationCopy
  | JSONPatchOperationTest;

export interface JSONPatchOperationAdd {
  op: "add";
  path: string;
  value: unknown;
}

export interface JSONPatchOperationRemove {
  op: "remove";
  path: string;
}

export interface JSONPatchOperationReplace {
  op: "replace";
  path: string;
  value: unknown;
}

export interface JSONPatchOperationMove {
  op: "move";
  path: string;
  from: string;
}

export interface JSONPatchOperationCopy {
  op: "copy";
  path: string;
  from: string;
}

export interface JSONPatchOperationTest {
  op: "test";
  path: string;
  value: unknown;
}

/**
 * Structure to build interception on top of a `FhirRestfulClient`.
 */
export type FhirRestfulClientInterceptor = {
  [K in keyof FhirRestfulClient]?:
    | ((
        client: FhirRestfulClient,
        args: Parameters<FhirRestfulClient[K]>
      ) => ReturnType<FhirRestfulClient[K]>)
    | null
    | undefined;
};

/**
 * Allows to weave in interceptor for each `FhirRestfulClient` methods.
 */
export function decorateFhirRestfulClient(
  client: FhirRestfulClient,
  interceptor: FhirRestfulClientInterceptor
): FhirRestfulClient {
  return Object.entries(client).reduce((acc, cur) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [key, fn] = cur as [keyof FhirRestfulClient, any];
    acc[key] = (...args: unknown[]) => {
      if (interceptor[key]) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return interceptor[key]!(client, args as never);
      }
      return fn(...args);
    };
    return acc;
  }, {} as FhirRestfulClient);
}

export type CreateOrMergeAction = "return" | "replace" | "merge" | "add";

/**
 * Searches for an existing resource that have the same identifiers (or use a custom search query string).
 *  - if not found, create the new resource and return it
 *  - if found, depending on the action, either:
 *     - return the existing resource
 *     - replace the existing resource and return the new one
 *     - merge the 2 resources, update the resource if need be on the server, and return the final merged result
 *     - or create another resource only if it is different the the existing one
 */
export async function createOr<
  TResource extends FhirResource & { identifier?: Identifier[] }
>(
  action: CreateOrMergeAction,
  client: FhirRestfulClient,
  resource: TResource
): Promise<MergeResult<TResource>>;
export async function createOr<TResource extends FhirResource>(
  action: CreateOrMergeAction,
  client: FhirRestfulClient,
  resource: TResource,
  search: string
): Promise<MergeResult<TResource>>;
export async function createOr<
  TResource extends
    | FhirResource
    | (FhirResource & { identifier?: Identifier[] })
>(
  action: CreateOrMergeAction,
  client: FhirRestfulClient,
  resource: TResource,
  search?: string | null | undefined
): Promise<MergeResult<TResource>> {
  if (
    !search &&
    !(resource as { identifier?: Identifier[] }).identifier?.length
  ) {
    throw new Error(
      `Unable to createOr${action} resource of type ${resource.resourceType} as it has no identifier.`
    );
  }

  const current = (
    await client.search(
      resource.resourceType,
      search ||
        fhirSearch().token(
          "identifier",
          (resource as { identifier?: Identifier[] }).identifier
        ).href
    )
  )?.entry?.[0]?.resource as TResource | undefined;

  if (!current) {
    return [await client.create(resource), true];
  }

  if (action === "return") {
    return [current, false];
  }

  if (action === "replace") {
    if (isEqual(omit(current, ["id"]), resource)) {
      return [current, false];
    }
    resource.id = current.id;
    return [await client.update(resource), true];
  }

  if (action === "add") {
    if (isEqual(omit(current, ["id"]), resource)) {
      return [current, false];
    }
    return [await client.create(resource), true];
  }

  const [merged, isUpdated] = merge({ current, incoming: resource });
  if (isUpdated) {
    return [await client.update(merged), true];
  }

  return [merged, false];
}

/**
 * Execute a search operation and retrieve all pages from the server, aggregating into a final `Bundle`.
 * Be careful, as this can be a very long / expensive operation.
 */
export async function searchAllPages<TResource extends ResourceType>(
  client: FhirRestfulClient,
  type: TResource | null | undefined,
  search: string
): Promise<WithRequired<Bundle<ExtractResource<TResource>>, "entry">> {
  const result: WithRequired<Bundle<ExtractResource<TResource>>, "entry"> = {
    resourceType: "Bundle",
    type: "searchset",
    entry: [],
  };

  let currentSearchBundle: Bundle<ExtractResource<TResource>> | undefined;

  while (!currentSearchBundle || linkUrl(currentSearchBundle, "next")) {
    currentSearchBundle = currentSearchBundle
      ? await client.get<
          Bundle<ExtractResource<TResource>>
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        >(linkUrl(currentSearchBundle, "next")!)
      : await client.search<TResource>(type, search);

    result.entry.push(...(currentSearchBundle.entry || []));
  }

  return result;
}

/**
 * Return the url associated with a link, characterized by a relation.
 */
export function linkUrl(
  bundle: Bundle,
  relation: "self" | "first" | "next" | "previous"
) {
  return bundle.link?.find((link) => link.relation === relation)?.url;
}
