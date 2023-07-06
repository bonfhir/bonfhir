import {
  AnyResourceTypeOrCustomResource,
  BundleNavigator,
  FhirClientSearchParameters,
  ResourceOf,
  ResourceTypeOf,
  Retrieved,
  normalizeSearchParameters,
} from "@bonfhir/core/r4b";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys.js";
import { useFhirClientQueryContext } from "../context.js";

export interface UseFhirSearchAllPagesOptions<
  TResourceType extends AnyResourceTypeOrCustomResource,
> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          BundleNavigator<Retrieved<ResourceOf<TResourceType>>>,
          unknown,
          BundleNavigator<Retrieved<ResourceOf<TResourceType>>>,
          ReturnType<(typeof FhirQueryKeys)["search"]>
        >,
        "initialData" | "queryKey" | "queryFn" | "keepPreviousData"
      >
    | null
    | undefined;
}

/**
 * Return a [Query](https://tanstack.com/query/latest/docs/react/guides/queries) for a search request.
 *
 * @param parameters - the initial search parameters can either be a function that manipulates a `resourceSearch` for the
 * primary resource type or a search parameters string
 *
 * @see https://hl7.org/fhir/http.html#search
 */
export function useFhirSearchAllPages<
  TResourceType extends AnyResourceTypeOrCustomResource,
>(
  type: TResourceType,
  parameters: FhirClientSearchParameters<ResourceTypeOf<TResourceType>>,
  options?: UseFhirSearchAllPagesOptions<TResourceType> | null | undefined,
): UseQueryResult<BundleNavigator<ResourceOf<TResourceType>>> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);
  const normalizedParameters = normalizeSearchParameters(type, parameters);

  return useQuery<BundleNavigator<ResourceOf<TResourceType>>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.query as any),
    queryKey: FhirQueryKeys.search(
      fhirQueryContext.clientKey,
      type,
      normalizedParameters,
    ),
    queryFn: ({ signal }) =>
      fhirQueryContext.fhirClient.searchAllPages(type, parameters, { signal }),
  });
}
