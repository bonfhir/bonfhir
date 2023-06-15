import {
  AnyResourceType,
  BundleNavigator,
  CustomResourceClass,
  ExtractResource,
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

export interface UseFhirSearchAllPagesOptions<
  TResourceType extends AnyResourceType
> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
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

export interface UseFhirSearchAllPagesOptionsCustom<
  TCustomResourceClass extends CustomResourceClass
> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
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
 * @see https://hl7.org/fhir/http.html#search
 */
export function useFhirSearchAllPages<TResourceType extends AnyResourceType>(
  type: TResourceType,
  parameters: FhirClientSearchParameters<TResourceType>,
  options?: UseFhirSearchAllPagesOptions<TResourceType> | null | undefined
): UseQueryResult<BundleNavigator<ExtractResource<TResourceType>>>;
export function useFhirSearchAllPages<
  TCustomResourceClass extends CustomResourceClass
>(
  type: TCustomResourceClass,
  parameters: FhirClientSearchParameters<TCustomResourceClass["resourceType"]>,
  options?:
    | UseFhirSearchAllPagesOptionsCustom<TCustomResourceClass>
    | null
    | undefined
): UseQueryResult<BundleNavigator<InstanceType<TCustomResourceClass>>>;
export function useFhirSearchAllPages<
  TResourceType extends AnyResourceType,
  TCustomResourceClass extends CustomResourceClass
>(
  type: TResourceType | TCustomResourceClass,
  parameters:
    | FhirClientSearchParameters<TResourceType>
    | FhirClientSearchParameters<TCustomResourceClass["resourceType"]>,
  options?:
    | UseFhirSearchAllPagesOptions<TResourceType>
    | UseFhirSearchAllPagesOptionsCustom<TCustomResourceClass>
    | null
    | undefined
):
  | UseQueryResult<BundleNavigator<ExtractResource<TResourceType>>>
  | UseQueryResult<BundleNavigator<InstanceType<TCustomResourceClass>>> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);
  const resourceType = typeof type === "string" ? type : type.resourceType;
  const normalizedParameters = normalizeSearchParameters(
    resourceType as TResourceType,
    parameters as FhirClientSearchParameters<TResourceType>
  );

  return useQuery<BundleNavigator<ExtractResource<TResourceType>>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.query as any),
    queryKey: FhirQueryKeys.search(
      fhirQueryContext.clientKey,
      type,
      normalizedParameters
    ),
    queryFn: ({ signal }) =>
      fhirQueryContext.fhirClient.searchAllPages(
        type as TResourceType,
        parameters as FhirClientSearchParameters<TResourceType>,
        { signal }
      ),
  });
}
