import {
  AnyResource,
  AnyResourceType,
  BundleNavigator,
  ExtractResource,
  FhirClient,
  Retrieved,
} from "@bonfhir/core/r5";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys";
import { useFhirClientQueryContext } from "../context";

export interface UseFhirHistoryOptions<TResourceType extends AnyResourceType> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  fhir?: Parameters<FhirClient["history"]>[2] | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          BundleNavigator<Retrieved<ExtractResource<TResourceType>>>,
          unknown,
          BundleNavigator<Retrieved<ExtractResource<TResourceType>>>,
          ReturnType<(typeof FhirQueryKeys)["history"]>
        >,
        "initialData" | "queryKey" | "queryFn"
      >
    | null
    | undefined;
  pageUrl?: string | null | undefined;
}

/**
 * Return a [Query](https://tanstack.com/query/latest/docs/react/guides/queries) for a history request.
 *
 * @see https://hl7.org/fhir/http.html#history
 */
export function useFhirHistory<TResource extends AnyResource>(
  resource: Retrieved<TResource>,
  options?: UseFhirHistoryOptions<TResource["resourceType"]> | null | undefined,
): UseQueryResult<BundleNavigator<Retrieved<TResource>>>;
export function useFhirHistory<TResourceType extends AnyResourceType>(
  type?: TResourceType | null | undefined,
  id?: string | null | undefined,
  options?: UseFhirHistoryOptions<TResourceType> | null | undefined,
): UseQueryResult<BundleNavigator<Retrieved<ExtractResource<TResourceType>>>>;
export function useFhirHistory<TResourceType extends AnyResourceType>(
  type?: TResourceType | Retrieved<AnyResource> | null | undefined,
  id?: string | UseFhirHistoryOptions<TResourceType> | null | undefined,
  options?: UseFhirHistoryOptions<TResourceType> | null | undefined,
): UseQueryResult<BundleNavigator<Retrieved<ExtractResource<TResourceType>>>> {
  if (type && typeof type !== "string") {
    return useFhirHistory(
      type.resourceType,
      type.id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      id as any,
    ) as UseQueryResult<
      BundleNavigator<Retrieved<ExtractResource<TResourceType>>>
    >;
  }

  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);

  return useQuery({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.query as any),
    queryKey: FhirQueryKeys.history(
      fhirQueryContext.clientKey,
      type,
      id as string,
      options?.pageUrl,
      options?.fhir,
    ),
    queryFn: ({ signal }) =>
      options?.pageUrl
        ? fhirQueryContext.fhirClient.fetchPage(
            options?.pageUrl,
            { signal },
            typeof type === "string" ? undefined : type || undefined,
          )
        : fhirQueryContext.fhirClient.history(type, id as string, {
            ...options?.fhir,
            signal,
          }),
  });
}
