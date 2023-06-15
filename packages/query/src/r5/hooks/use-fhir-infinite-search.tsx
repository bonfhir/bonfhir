import {
  AnyResourceType,
  BundleNavigator,
  CustomResourceClass,
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
  fhir?: Omit<Parameters<FhirClient["search"]>[2], "signal"> | null | undefined;
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

export interface UseFhirInfiniteSearchOptionsCustom<
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
>;
export function useFhirInfiniteSearch<
  TCustomResourceClass extends CustomResourceClass
>(
  type: TCustomResourceClass,
  parameters?:
    | FhirClientSearchParameters<TCustomResourceClass["resourceType"]>
    | null
    | undefined,
  options?:
    | UseFhirInfiniteSearchOptionsCustom<TCustomResourceClass>
    | null
    | undefined
): UseInfiniteQueryResult<
  BundleNavigator<Retrieved<InstanceType<TCustomResourceClass>>>
>;
export function useFhirInfiniteSearch<
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
    | UseFhirInfiniteSearchOptions<TResourceType>
    | UseFhirInfiniteSearchOptionsCustom<TCustomResourceClass>
    | null
    | undefined
):
  | UseInfiniteQueryResult<
      BundleNavigator<Retrieved<ExtractResource<TResourceType>>>
    >
  | UseInfiniteQueryResult<
      BundleNavigator<Retrieved<InstanceType<TCustomResourceClass>>>
    > {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);
  const resourceType = typeof type === "string" ? type : type.resourceType;
  const normalizedParameters = normalizeSearchParameters(
    resourceType as TResourceType,
    parameters as FhirClientSearchParameters<TResourceType>
  );

  return useInfiniteQuery<
    BundleNavigator<Retrieved<ExtractResource<TResourceType>>>
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
            parameters as FhirClientSearchParameters<TResourceType>,
            { ...options?.fhir, signal }
          ),
    keepPreviousData: true,
    getNextPageParam: (lastPage: BundleNavigator) => lastPage.linkUrl("next"),
  });
}
