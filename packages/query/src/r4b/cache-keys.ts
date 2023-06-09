import {
  AnyResourceType,
  CustomResourceClass,
  FhirClient,
  GeneralParameters,
  OperationParameters,
} from "@bonfhir/core/r4b";
import { QueryClient } from "@tanstack/react-query";

/**
 * Manages [Query keys](https://tanstack.com/query/latest/docs/react/guides/query-keys) and
 * cache optimizations / invalidations.
 */
export const FhirQueryKeys = {
  /**
   * Get the query keys for a read request
   */
  read: (
    clientKey: string,
    type: AnyResourceType | CustomResourceClass,
    id: string,
    options?: GeneralParameters | null | undefined
  ) => [clientKey, normalizeType(type), id, "read", type, options] as const,

  /**
   * Get the query keys for a vread request
   */
  vread: (
    clientKey: string,
    type: AnyResourceType | CustomResourceClass,
    id: string,
    vid: string,
    options?: Parameters<FhirClient["vread"]>[3] | null | undefined
  ) =>
    [clientKey, normalizeType(type), id, "vread", vid, type, options] as const,

  /**
   * Get the query keys for a history request
   */
  history: (
    clientKey: string,
    type: AnyResourceType | CustomResourceClass | null | undefined,
    id: string | null | undefined,
    options?: Parameters<FhirClient["history"]>[2] | null | undefined
  ) => {
    if (!type && !id) {
      return [clientKey, "history", options] as const;
    }
    if (!id) {
      return [
        clientKey,
        normalizeType(type),
        "history",
        type,
        options,
      ] as const;
    }
    return [
      clientKey,
      normalizeType(type),
      id,
      "history",
      type,
      options,
    ] as const;
  },

  /**
   * Get the query keys for a search request
   */
  search: (
    clientKey: string,
    type: AnyResourceType | CustomResourceClass,
    parameters?: string | null | undefined,
    pageUrl?: string | null | undefined,
    options?: Parameters<FhirClient["search"]>[2] | null | undefined
  ) =>
    [
      clientKey,
      normalizeType(type),
      "search",
      type,
      parameters,
      pageUrl,
      options,
    ] as const,

  /**
   * Get the query keys for a infinite search request
   */
  infiniteSearch: (
    clientKey: string,
    type: AnyResourceType | CustomResourceClass,
    parameters?: string | null | undefined,
    options?: Parameters<FhirClient["search"]>[2] | null | undefined
  ) =>
    [
      clientKey,
      normalizeType(type),
      "infiniteSearch",
      type,
      parameters,
      options,
    ] as const,

  /**
   * Get the query keys for a capabilities request
   */
  capabilities: (clientKey: string, mode: string | null | undefined) =>
    [clientKey, "capabilities", mode] as const,

  /**
   * Get the query keys for an execute request
   */
  execute: (clientKey: string, parameters: OperationParameters) =>
    [
      clientKey,
      parameters.resourceType,
      parameters.resourceId,
      "execute",
      parameters.operation,
      parameters.parameters,
    ] as const,

  /**
   * Invalidate all queries that might be impacted by a change on a resource.
   */
  invalidateQueries: (
    clientKey: string,
    queryClient: QueryClient,
    type: AnyResourceType,
    id: string
  ) => {
    queryClient.invalidateQueries([clientKey, type, id]);
    queryClient.invalidateQueries([clientKey, type, "search"]);
    queryClient.invalidateQueries([clientKey, type, "infiniteSearch"]);
    queryClient.invalidateQueries([clientKey, "history"]);
    queryClient.invalidateQueries([clientKey, type, "history"]);
    queryClient.invalidateQueries([clientKey, type, id, "history"]);
    queryClient.invalidateQueries([clientKey, type, id, "execute"]);
    queryClient.invalidateQueries([clientKey, type, undefined, "execute"]);
  },
};

function normalizeType(type: null | undefined): undefined;
function normalizeType(
  type: AnyResourceType | CustomResourceClass
): AnyResourceType;
function normalizeType(
  type: AnyResourceType | CustomResourceClass | null | undefined
): AnyResourceType | undefined;
function normalizeType(
  type: AnyResourceType | CustomResourceClass | null | undefined
): AnyResourceType | undefined {
  if (!type) {
    return undefined;
  }
  if (typeof type === "string") {
    return type;
  }

  return type.resourceType;
}
