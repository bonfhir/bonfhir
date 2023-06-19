import {
  AnyResourceTypeOrCustomResource,
  FhirClient,
  ResourceOf,
  Retrieved,
} from "@bonfhir/core/r5";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys.js";
import { useFhirClientQueryContext } from "../context.js";

export interface UseFhirReadOptions<
  TResourceType extends AnyResourceTypeOrCustomResource
> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  fhir?: Omit<Parameters<FhirClient["read"]>[2], "signal"> | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          Retrieved<ResourceOf<TResourceType>>,
          unknown,
          Retrieved<ResourceOf<TResourceType>>,
          ReturnType<(typeof FhirQueryKeys)["read"]>
        >,
        "initialData" | "queryKey" | "queryFn"
      >
    | null
    | undefined;
}

/**
 * Return a [Query](https://tanstack.com/query/latest/docs/react/guides/queries) for a read request.
 *
 * @see https://hl7.org/fhir/http.html#read
 */
export function useFhirRead<
  TResourceType extends AnyResourceTypeOrCustomResource
>(
  type: TResourceType,
  id: string,
  options?: UseFhirReadOptions<TResourceType> | null | undefined
): UseQueryResult<Retrieved<ResourceOf<TResourceType>>> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);

  return useQuery<Retrieved<ResourceOf<TResourceType>>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.query as any),
    queryKey: FhirQueryKeys.read(
      fhirQueryContext.clientKey,
      type,
      id,
      options?.fhir
    ),
    queryFn: ({ signal }) =>
      fhirQueryContext.fhirClient.read(type as TResourceType, id, {
        ...options?.fhir,
        signal: signal ?? undefined,
      }),
  });
}
