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
import { useCallback } from "react";
import { FhirQueryKeys } from "../cache-keys.js";
import { useFhirClientQueryContext } from "../context.js";

export interface UseFhirReadOptions<TResourceType extends AnyResourceType> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  fhir?: Parameters<FhirClient["read"]>[2] | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          Retrieved<ExtractResource<TResourceType>>,
          unknown,
          Retrieved<ExtractResource<TResourceType>>,
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
export function useFhirRead<TResourceType extends AnyResourceType>(
  type: TResourceType,
  id: string,
  options?: UseFhirReadOptions<TResourceType> | null | undefined
): UseQueryResult<Retrieved<ExtractResource<TResourceType>>> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);

  const queryFn = useCallback(async () => {
    const resource = await fhirQueryContext.fhirClient.read(
      type,
      id,
      options?.fhir
    );
    if (!resource) {
      throw new Error(`${type} with id ${id} cannot be found.`);
    }

    return resource;
  }, [fhirQueryContext.fhirClient, type, id, options?.fhir]);

  return useQuery({
    initialData: () =>
      fhirQueryContext.manageCache
        ? FhirQueryKeys.findInSearch(
            fhirQueryContext.clientKey,
            fhirQueryContext.queryClient,
            type,
            id
          )
        : undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.query as any),
    queryKey: FhirQueryKeys.read(
      fhirQueryContext.clientKey,
      type,
      id,
      options?.fhir
    ),
    queryFn,
  });
}
