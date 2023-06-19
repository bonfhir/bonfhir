import {
  AnyResourceTypeOrCustomResource,
  BundleNavigator,
  FhirClient,
  FhirClientSearchParameters,
  ResourceOf,
  ResourceTypeOf,
  Retrieved,
  normalizeSearchParameters,
} from "@bonfhir/core/r4b";
import {
  UseInfiniteQueryResult,
  UseQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys.js";
import { useFhirClientQueryContext } from "../context.js";

export interface UseFhirInfiniteSearchOptions<
  TResourceType extends AnyResourceTypeOrCustomResource
> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  fhir?: Omit<Parameters<FhirClient["search"]>[2], "signal"> | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          BundleNavigator<Retrieved<ResourceOf<TResourceType>>>,
          unknown,
          BundleNavigator<Retrieved<ResourceOf<TResourceType>>>,
          ReturnType<(typeof FhirQueryKeys)["infiniteSearch"]>
        >,
        | "initialData"
        | "queryKey"
        | "queryFn"
        | "keepPreviousData"
        | "getNextPageParam"
      >
    | null
    | undefined;
}

export function useFhirInfiniteSearch<
  TResourceType extends AnyResourceTypeOrCustomResource
>(
  type: TResourceType,
  parameters?:
    | FhirClientSearchParameters<ResourceTypeOf<TResourceType>>
    | null
    | undefined,
  options?: UseFhirInfiniteSearchOptions<TResourceType> | null | undefined
): UseInfiniteQueryResult<
  BundleNavigator<Retrieved<ResourceOf<TResourceType>>>
> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);
  const normalizedParameters = normalizeSearchParameters(type, parameters);

  return useInfiniteQuery<
    BundleNavigator<Retrieved<ResourceOf<TResourceType>>>
  >({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.query as any),
    queryKey: FhirQueryKeys.infiniteSearch(
      fhirQueryContext.clientKey,
      type,
      normalizedParameters,
      options?.fhir
    ),
    queryFn: ({ pageParam, signal }) =>
      pageParam
        ? fhirQueryContext.fhirClient.fetchPage(
            pageParam,
            { signal },
            typeof type === "string" ? undefined : type || undefined
          )
        : fhirQueryContext.fhirClient.search(
            type as TResourceType,
            parameters,
            { ...options?.fhir, signal }
          ),
    keepPreviousData: true,
    getNextPageParam: (lastPage: BundleNavigator) => lastPage.linkUrl("next"),
  });
}
