import {
  AnyResourceType,
  BundleNavigator,
  ExtractResource,
  FhirClient,
  FhirClientSearchParameters,
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

export interface UseFhirSearchOptions<TResourceType extends AnyResourceType> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  fhir?: Parameters<FhirClient["search"]>[2] | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          BundleNavigator<Retrieved<ExtractResource<TResourceType>>>,
          unknown,
          BundleNavigator<Retrieved<ExtractResource<TResourceType>>>,
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
export function useFhirSearch<TResourceType extends AnyResourceType>(
  type: TResourceType,
  parameters?: FhirClientSearchParameters<TResourceType> | null | undefined,
  pageUrl?: string | null | undefined,
  options?: UseFhirSearchOptions<TResourceType> | null | undefined
): UseQueryResult<BundleNavigator<Retrieved<ExtractResource<TResourceType>>>> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);
  const normalizedParameters = normalizeSearchParameters(type, parameters);

  return useQuery({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.query as any),
    queryKey: FhirQueryKeys.search(
      fhirQueryContext.clientKey,
      type,
      normalizedParameters,
      pageUrl,
      options?.fhir
    ),
    queryFn: () =>
      pageUrl
        ? fhirQueryContext.fhirClient.fetchPage(pageUrl)
        : fhirQueryContext.fhirClient.search(type, parameters, options?.fhir),
    keepPreviousData: true,
  });
}
