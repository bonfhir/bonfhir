import {
  AnyResourceTypeOrCustomResource,
  BundleNavigator,
  FhirClient,
  FhirClientSearchParameters,
  ResourceOf,
  ResourceTypeOf,
  Retrieved,
  normalizeSearchParameters,
} from "@bonfhir/core/r5";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys.js";
import { useFhirClientQueryContext } from "../context.js";

export interface UseFhirSearchOptions<
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
 * @param pageUrl - a page url extracted from previous bundle to navigate to a subsequent page.
 *
 * @see https://hl7.org/fhir/http.html#search
 *
 * @example
 *  const [pageUrl, setPageUrl] = useState("");
 *  const patientQuery = useFhirSearch("Patient", (search) => search.name("John Doe")._sort("-organization"), pageUrl);
 *
 *  // To paginate
 *  setPageUrl(patientQuery.data?.linkUrl("next"));
 */
export function useFhirSearch<
  TResourceType extends AnyResourceTypeOrCustomResource
>(
  type: TResourceType,
  parameters?:
    | FhirClientSearchParameters<ResourceTypeOf<TResourceType>>
    | null
    | undefined,
  pageUrl?: string | null | undefined,
  options?: UseFhirSearchOptions<TResourceType> | null | undefined
): UseQueryResult<BundleNavigator<Retrieved<ResourceOf<TResourceType>>>> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);
  const normalizedParameters = normalizeSearchParameters(type, parameters);

  return useQuery<BundleNavigator<Retrieved<ResourceOf<TResourceType>>>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.query as any),
    queryKey: FhirQueryKeys.search(
      fhirQueryContext.clientKey,
      type,
      normalizedParameters,
      pageUrl,
      options?.fhir
    ),
    queryFn: ({ signal }) =>
      pageUrl
        ? fhirQueryContext.fhirClient.fetchPage(
            pageUrl,
            { signal },
            typeof type === "string" ? undefined : type || undefined
          )
        : fhirQueryContext.fhirClient.search(type, parameters, {
            ...options?.fhir,
            signal,
          }),
    keepPreviousData: true,
  });
}
