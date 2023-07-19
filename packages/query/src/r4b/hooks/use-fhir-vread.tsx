import {
  AnyResourceTypeOrCustomResource,
  FhirClient,
  ResourceOf,
  Retrieved,
} from "@bonfhir/core/r4b";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys";
import { useFhirClientQueryContext } from "../context";

export interface UseFhirVReadOptions<
  TResourceType extends AnyResourceTypeOrCustomResource,
> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  fhir?: Omit<Parameters<FhirClient["vread"]>[3], "signal"> | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          Retrieved<ResourceOf<TResourceType>>,
          unknown,
          Retrieved<ResourceOf<TResourceType>>,
          ReturnType<(typeof FhirQueryKeys)["vread"]>
        >,
        "initialData" | "queryKey" | "queryFn"
      >
    | null
    | undefined;
}

/**
 * Return a [Query](https://tanstack.com/query/latest/docs/react/guides/queries) for a vread request.
 *
 * @see https://hl7.org/fhir/http.html#vread
 */
export function useFhirVRead<
  TResourceType extends AnyResourceTypeOrCustomResource,
>(
  type: TResourceType,
  id: string,
  vid: string,
  options?: UseFhirVReadOptions<TResourceType> | null | undefined,
): UseQueryResult<Retrieved<ResourceOf<TResourceType>>> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);

  return useQuery<Retrieved<ResourceOf<TResourceType>>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.query as any),
    queryKey: FhirQueryKeys.vread(
      fhirQueryContext.clientKey,
      type,
      id,
      vid,
      options?.fhir,
    ),
    queryFn: ({ signal }) =>
      fhirQueryContext.fhirClient.vread(type, id, vid, {
        ...options?.fhir,
        signal,
      }),
  });
}
