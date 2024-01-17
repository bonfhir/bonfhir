import {
  AnyResourceType,
  AnyResourceTypeOrCustomResource,
  FhirClient,
  GeneralParameters,
  Operation,
  resourceTypeOf,
} from "@bonfhir/core/r5";
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
    type: AnyResourceTypeOrCustomResource,
    id: string,
    options?: GeneralParameters | null | undefined,
  ) => [clientKey, resourceTypeOf(type), id, "read", type, options] as const,

  /**
   * Get the query keys for a vread request
   */
  vread: (
    clientKey: string,
    type: AnyResourceTypeOrCustomResource,
    id: string,
    vid: string,
    options?: Parameters<FhirClient["vread"]>[3] | null | undefined,
  ) =>
    [clientKey, resourceTypeOf(type), id, "vread", vid, type, options] as const,

  /**
   * Get the query keys for a history request
   */
  history: (
    clientKey: string,
    type: AnyResourceTypeOrCustomResource | null | undefined,
    id: string | null | undefined,
    pageUrl?: string | null | undefined,
    options?: Parameters<FhirClient["history"]>[2] | null | undefined,
  ) => {
    if (!type && !id) {
      return [clientKey, "history", options] as const;
    }
    if (!id) {
      return [
        clientKey,
        resourceTypeOf(type),
        "history",
        type,
        pageUrl,
        options,
      ] as const;
    }
    return [
      clientKey,
      resourceTypeOf(type),
      id,
      "history",
      type,
      pageUrl,
      options,
    ] as const;
  },

  /**
   * Get the query keys for a search request
   */
  search: (
    clientKey: string,
    type: AnyResourceTypeOrCustomResource,
    parameters?: string | null | undefined,
    pageUrl?: string | null | undefined,
    options?: Parameters<FhirClient["search"]>[2] | null | undefined,
  ) =>
    [
      clientKey,
      resourceTypeOf(type),
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
    type: AnyResourceTypeOrCustomResource,
    parameters?: string | null | undefined,
    options?: Parameters<FhirClient["search"]>[2] | null | undefined,
  ) =>
    [
      clientKey,
      resourceTypeOf(type),
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
  execute: (
    clientKey: string,
    operation: Operation | Record<string, unknown>,
  ) =>
    [
      clientKey,
      operation.resourceType,
      operation.resourceId,
      "execute",
      operation.operation,
      operation.parameters,
    ] as const,

  clientFn: (clientKey: string, fn: string, params: unknown[]) =>
    [clientKey, "client", fn, ...params] as const,

  /**
   * Invalidate all queries that might be impacted by a change on a resource.
   */
  invalidateQueries: (
    clientKey: string,
    queryClient: QueryClient,
    type: AnyResourceType | undefined,
    id: string | undefined,
  ) => {
    if (!type && !id) {
      queryClient.invalidateQueries({ queryKey: [clientKey] });
      return;
    }

    queryClient.invalidateQueries({ queryKey: [clientKey, type, id] });
    queryClient.invalidateQueries({ queryKey: [clientKey, type, "search"] });
    queryClient.invalidateQueries({
      queryKey: [clientKey, type, "infiniteSearch"],
    });
    queryClient.invalidateQueries({ queryKey: [clientKey, "history"] });
    queryClient.invalidateQueries({ queryKey: [clientKey, type, "history"] });
    queryClient.invalidateQueries({
      queryKey: [clientKey, type, id, "history"],
    });
    queryClient.invalidateQueries({
      queryKey: [clientKey, type, id, "execute"],
    });
    queryClient.invalidateQueries({
      queryKey: [clientKey, type, undefined, "execute"],
    });
    queryClient.invalidateQueries({ queryKey: [clientKey, "client"] });
  },
};
