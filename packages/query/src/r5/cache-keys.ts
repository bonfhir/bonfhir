import {
  AnyResourceType,
  BundleNavigator,
  ExtractResource,
  FhirClient,
  OperationParameters,
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
    type: AnyResourceType,
    id: string,
    options?: Parameters<FhirClient["read"]>[2] | null | undefined
  ) => [clientKey, type, id, "read", options] as const,

  /**
   * Get the query keys for a vread request
   */
  vread: (
    clientKey: string,
    type: AnyResourceType,
    id: string,
    vid: string,
    options?: Parameters<FhirClient["vread"]>[3] | null | undefined
  ) => [clientKey, type, id, "vread", vid, options] as const,

  /**
   * Get the query keys for a history request
   */
  history: (
    clientKey: string,
    type: AnyResourceType | null | undefined,
    id: string | null | undefined,
    options?: Parameters<FhirClient["history"]>[2] | null | undefined
  ) => {
    if (!type && !id) {
      return [clientKey, "history", options] as const;
    }
    if (!id) {
      return [clientKey, type, "history", options] as const;
    }
    return [clientKey, type, id, "history", options] as const;
  },

  /**
   * Get the query keys for a search request
   */
  search: (
    clientKey: string,
    type: AnyResourceType,
    parameters?: string | null | undefined,
    pageUrl?: string | null | undefined,
    options?: Parameters<FhirClient["search"]>[2] | null | undefined
  ) => [clientKey, type, "search", parameters, pageUrl, options] as const,

  /**
   * Get the query keys for a infinite search request
   */
  infiniteSearch: (
    clientKey: string,
    type: AnyResourceType,
    parameters?: string | null | undefined,
    options?: Parameters<FhirClient["search"]>[2] | null | undefined
  ) => [clientKey, type, "infiniteSearch", parameters, options] as const,

  /**
   * Lookup the query cache and try to find an existing instance of a resource stored in a search request,
   * by resource type and id.
   *
   * This enables an optimization to load initial data on read if it has been retrieved previously during a search
   * (a.k.a. master-detail scenarios)
   */
  findInSearch: (
    clientKey: string,
    queryClient: QueryClient,
    type: AnyResourceType,
    id: string
  ): ExtractResource<AnyResourceType> | undefined => {
    try {
      const inSearch = (
        queryClient.getQueriesData([clientKey, type, "search"]) || []
      )
        .flatMap(([, result]) => result as BundleNavigator)
        .find((navigator) => navigator.reference(`${type}/${id}`));
      if (inSearch) {
        return inSearch.reference(
          `${type}/${id}`
        ) as ExtractResource<AnyResourceType>;
      }

      return (
        queryClient.getQueriesData<{
          pages: Array<BundleNavigator>;
        }>([clientKey, type, "infiniteSearch"]) || []
      )
        .flatMap(([, pages]) => pages?.pages || [])
        .find((navigator) => navigator.reference(`${type}/${id}`))
        ?.reference(`${type}/${id}`) as ExtractResource<AnyResourceType>;
    } catch (error) {
      // Just in case the cache is corrupted.
      console.error(error);
      return undefined;
    }
  },

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
