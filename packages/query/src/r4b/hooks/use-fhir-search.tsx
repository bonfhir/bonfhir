import {
  AnyResourceType,
  BundleNavigator,
  CustomResourceClass,
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

export interface UseFhirSearchOptionsCustom<
  TCustomResourceClass extends CustomResourceClass
> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  fhir?: Parameters<FhirClient["search"]>[2] | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          BundleNavigator<Retrieved<InstanceType<TCustomResourceClass>>>,
          unknown,
          BundleNavigator<Retrieved<InstanceType<TCustomResourceClass>>>,
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
): UseQueryResult<BundleNavigator<Retrieved<ExtractResource<TResourceType>>>>;
export function useFhirSearch<TCustomResourceClass extends CustomResourceClass>(
  type: TCustomResourceClass,
  parameters?:
    | FhirClientSearchParameters<TCustomResourceClass["resourceType"]>
    | null
    | undefined,
  pageUrl?: string | null | undefined,
  options?: UseFhirSearchOptionsCustom<TCustomResourceClass> | null | undefined
): UseQueryResult<
  BundleNavigator<Retrieved<InstanceType<TCustomResourceClass>>>
>;
export function useFhirSearch<
  TResourceType extends AnyResourceType,
  TCustomResourceClass extends CustomResourceClass
>(
  type: TResourceType | TCustomResourceClass,
  parameters?:
    | FhirClientSearchParameters<TResourceType>
    | FhirClientSearchParameters<TCustomResourceClass["resourceType"]>
    | null
    | undefined,
  pageUrl?: string | null | undefined,
  options?:
    | UseFhirSearchOptions<TResourceType>
    | UseFhirSearchOptionsCustom<TCustomResourceClass>
    | null
    | undefined
):
  | UseQueryResult<BundleNavigator<Retrieved<ExtractResource<TResourceType>>>>
  | UseQueryResult<
      BundleNavigator<Retrieved<InstanceType<TCustomResourceClass>>>
    > {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);
  const resourceType = typeof type === "string" ? type : type.resourceType;
  const normalizedParameters = normalizeSearchParameters(
    resourceType as TResourceType,
    parameters as FhirClientSearchParameters<TResourceType>
  );

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
        ? fhirQueryContext.fhirClient.fetchPage(
            pageUrl,
            undefined,
            typeof type === "string" ? undefined : type || undefined
          )
        : fhirQueryContext.fhirClient.search(
            type as TResourceType,
            parameters as FhirClientSearchParameters<TResourceType>,
            options?.fhir
          ),
    keepPreviousData: true,
  }) as UseQueryResult<
    BundleNavigator<Retrieved<ExtractResource<TResourceType>>>
  >;
}
