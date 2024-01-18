import { FhirClient } from "@bonfhir/core/r5";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys";
import { useFhirClientQueryContext } from "../context";

export interface UseFhirClientOptions<TResult> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          TResult,
          unknown,
          TResult,
          ReturnType<(typeof FhirQueryKeys)["clientFn"]>
        >,
        "initialData" | "queryKey" | "queryFn"
      >
    | null
    | undefined;
}

/**
 * Return a [Query](https://tanstack.com/query/latest/docs/react/guides/queries) using a FhirClient directly.
 */
export function useFhirClient<TResult>(
  fn: (client: FhirClient) => Promise<TResult>,
  params?: unknown[],
  options?: UseFhirClientOptions<TResult> | null | undefined,
): UseQueryResult<TResult> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);

  return useQuery<TResult>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.query as any),
    queryKey: FhirQueryKeys.clientFn(
      fhirQueryContext.clientKey,
      fn.toString(),
      params || [],
    ),
    queryFn: async () => await fn(fhirQueryContext.fhirClient),
  });
}
