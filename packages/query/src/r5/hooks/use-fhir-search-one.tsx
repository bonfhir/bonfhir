import {
  AnyResourceType,
  BundleNavigator,
  CustomResourceClass,
  ExtractResource,
  FhirClient,
  FhirClientSearchParameters,
  Retrieved,
  WithResolvableReferences,
  normalizeSearchParameters,
} from "@bonfhir/core/r5";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys.js";
import { useFhirClientQueryContext } from "../context.js";

export interface UseFhirSearchOneOptions<
  TResourceType extends AnyResourceType
> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  fhir?:
    | Omit<Parameters<FhirClient["searchOne"]>[2], "signal">
    | null
    | undefined;
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

export interface UseFhirSearchOneOptionsCustom<
  TCustomResourceClass extends CustomResourceClass
> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  fhir?: Parameters<FhirClient["searchOne"]>[2] | null | undefined;
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
export function useFhirSearchOne<TResourceType extends AnyResourceType>(
  type: TResourceType,
  parameters?: FhirClientSearchParameters<TResourceType> | null | undefined,
  options?: UseFhirSearchOneOptions<TResourceType> | null | undefined
): UseQueryResult<
  WithResolvableReferences<Retrieved<ExtractResource<TResourceType>>>
>;
export function useFhirSearchOne<
  TCustomResourceClass extends CustomResourceClass
>(
  type: TCustomResourceClass,
  parameters?:
    | FhirClientSearchParameters<TCustomResourceClass["resourceType"]>
    | null
    | undefined,
  options?:
    | UseFhirSearchOneOptionsCustom<TCustomResourceClass>
    | null
    | undefined
): UseQueryResult<
  WithResolvableReferences<Retrieved<InstanceType<TCustomResourceClass>>>
>;
export function useFhirSearchOne<
  TResourceType extends AnyResourceType,
  TCustomResourceClass extends CustomResourceClass
>(
  type: TResourceType | TCustomResourceClass,
  parameters?:
    | FhirClientSearchParameters<TResourceType>
    | FhirClientSearchParameters<TCustomResourceClass["resourceType"]>
    | null
    | undefined,
  options?:
    | UseFhirSearchOneOptions<TResourceType>
    | UseFhirSearchOneOptionsCustom<TCustomResourceClass>
    | null
    | undefined
):
  | UseQueryResult<
      WithResolvableReferences<Retrieved<ExtractResource<TResourceType>>>
    >
  | UseQueryResult<
      WithResolvableReferences<Retrieved<InstanceType<TCustomResourceClass>>>
    > {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);
  const resourceType = typeof type === "string" ? type : type.resourceType;
  const normalizedParameters = normalizeSearchParameters(
    resourceType as TResourceType,
    parameters as FhirClientSearchParameters<TResourceType>
  );

  return useQuery<
    WithResolvableReferences<Retrieved<ExtractResource<TResourceType>>>
  >({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.query as any),
    queryKey: FhirQueryKeys.search(
      fhirQueryContext.clientKey,
      type,
      normalizedParameters,
      undefined,
      options?.fhir
    ),
    queryFn: ({ signal }) =>
      fhirQueryContext.fhirClient.searchOne(
        type as TResourceType,
        parameters as FhirClientSearchParameters<TResourceType>,
        { ...options?.fhir, signal }
      ),
  });
}
