import { BundleNavigator } from "./bundle-navigator";
import {
  AnyResource,
  AnyResourceType,
  Bundle,
  CapabilityStatement,
  ExtractResource,
  ResourceType,
  Retrieved,
} from "./fhir-types.codegen";
import { JSONPatchBody } from "./patch";
import { ExtractPatchBuilder } from "./patch.codegen";
import { ExtractSearchBuilder } from "./search.codegen";

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
  read: <TResourceType extends AnyResourceType>(
    type: TResourceType,
    id: string,
    options?: GeneralParameters | null | undefined
  ) => Promise<Retrieved<ExtractResource<TResourceType>> | undefined>;

  /**
   * The vread interaction performs a version specific read of the resource.
   * https://hl7.org/fhir/http.html#vread
   */
  vread: <TResourceType extends AnyResourceType>(
    type: TResourceType,
    id: string,
    vid: string,
    options?: GeneralParameters | null | undefined
  ) => Promise<Retrieved<ExtractResource<TResourceType>> | undefined>;

  /**
   * The update interaction creates a new current version for an existing resource or creates an initial version
   * if no resource already exists for the given id.
   * https://hl7.org/fhir/http.html#update
   */
  update: <TResource extends AnyResource>(
    body: TResource,
    options?:
      | (GeneralParameters &
          ConcurrencyParameters &
          ConditionalSearchParameters)
      | null
      | undefined
  ) => Promise<Retrieved<TResource>>;

  /**
   * As an alternative to updating an entire resource, clients can perform a patch operation.
   * https://hl7.org/fhir/http.html#patch
   */
  patch: <TResourceType extends AnyResourceType>(
    type: TResourceType,
    id: string,
    body: FhirClientPatchBody<TResourceType>,
    options?:
      | (GeneralParameters &
          ConcurrencyParameters &
          ConditionalSearchParameters)
      | null
      | undefined
  ) => Promise<Retrieved<ExtractResource<TResourceType>>>;

  /**
   * The delete interaction removes an existing resource.
   * https://hl7.org/fhir/http.html#delete
   */
  delete: (
    type: AnyResourceType,
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
  history: <TResourceType extends AnyResourceType>(
    type?: TResourceType | null | undefined,
    id?: string | null | undefined,
    options?: (GeneralParameters & HistoryParameters) | null | undefined
  ) => Promise<Bundle<Retrieved<ExtractResource<TResourceType>>>>;

  /**
   * The create interaction creates a new resource in a server-assigned location.
   * https://hl7.org/fhir/http.html#create
   */
  create: <TResource extends AnyResource>(
    body: TResource,
    options?:
      | (GeneralParameters & ConditionalSearchParameters)
      | null
      | undefined
  ) => Promise<Retrieved<TResource>>;

  /**
   * This interaction searches a set of resources based on some filter criteria.
   * https://hl7.org/fhir/http.html#search
   */
  search: <TResourceType extends AnyResourceType>(
    type?: TResourceType | null | undefined,
    parameters?: FhirClientSearchParameters<TResourceType> | null | undefined,
    options?: GeneralParameters | null | undefined
  ) => Promise<BundleNavigator<Retrieved<ExtractResource<TResourceType>>>>;

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
   * Execute an HTTP fetch operation to the FHIR server.
   */
  fetch: <T = unknown>(
    input: Parameters<typeof fetch>[0],
    init?: Parameters<typeof fetch>[1]
  ) => Promise<T>;
}

export type FhirClientPatchBody<TResourceType extends AnyResourceType> =
  | ((
      patch: ExtractPatchBuilder<TResourceType>
    ) => ExtractPatchBuilder<TResourceType> | JSONPatchBody)
  | JSONPatchBody;

export type FhirClientSearchParameters<TResource extends AnyResourceType> =
  | ((
      search: ExtractSearchBuilder<TResource>
    ) => ExtractSearchBuilder<TResource> | string)
  | string;

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
