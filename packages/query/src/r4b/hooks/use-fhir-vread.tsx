import {
  AnyResourceType,
  ExtractResource,
  FhirClient,
  Retrieved,
} from "@bonfhir/core/r4b";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys.js";
import { useFhirClientQueryContext } from "../context.js";

export interface UseFhirVReadOptions<TResourceType extends AnyResourceType> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  fhir?: Parameters<FhirClient["vread"]>[3] | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          Retrieved<ExtractResource<TResourceType>>,
          unknown,
          Retrieved<ExtractResource<TResourceType>>,
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
export function useFhirVRead<TResourceType extends AnyResourceType>(
  type: TResourceType,
  id: string,
  vid: string,
  options?: UseFhirVReadOptions<TResourceType> | null | undefined
): UseQueryResult<Retrieved<ExtractResource<TResourceType>>> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);

  return useQuery({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.query as any),
    queryKey: FhirQueryKeys.vread(
      fhirQueryContext.clientKey,
      type,
      id,
      vid,
      options?.fhir
    ),
    queryFn: () =>
      fhirQueryContext.fhirClient.vread(type, id, vid, options?.fhir),
  });
}
