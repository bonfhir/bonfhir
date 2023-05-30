import {
  AnyResourceType,
  BundleNavigator,
  ExtractResource,
  FhirClient,
  FhirClientSearchParameters,
  Retrieved,
  normalizeSearchParameters,
} from "@bonfhir/core/r5";
import {
  UseInfiniteQueryResult,
  UseQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys.js";
import { useFhirClientQueryContext } from "../context.js";

export interface UseFhirInfiniteSearchOptions<
  TResourceType extends AnyResourceType
> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  fhir?: Parameters<FhirClient["search"]>[2] | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          BundleNavigator<Retrieved<ExtractResource<TResourceType>>>,
          unknown,
          BundleNavigator<Retrieved<ExtractResource<TResourceType>>>,
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

export function useFhirInfiniteSearch<TResourceType extends AnyResourceType>(
  type: TResourceType,
  parameters?: FhirClientSearchParameters<TResourceType> | null | undefined,
  options?: UseFhirInfiniteSearchOptions<TResourceType> | null | undefined
): UseInfiniteQueryResult<
  BundleNavigator<Retrieved<ExtractResource<TResourceType>>>
> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);
  const normalizedParameters = normalizeSearchParameters(type, parameters);

  return useInfiniteQuery({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.query as any),
    queryKey: FhirQueryKeys.infiniteSearch(
      fhirQueryContext.clientKey,
      type,
      normalizedParameters,
      options?.fhir
    ),
    queryFn: (data: { pageParam: string }) =>
      data?.pageParam
        ? fhirQueryContext.fhirClient.fetchPage(data?.pageParam)
        : fhirQueryContext.fhirClient.search(type, parameters, options?.fhir),
    keepPreviousData: true,
    getNextPageParam: (lastPage: BundleNavigator) => lastPage.linkUrl("next"),
  });
}
