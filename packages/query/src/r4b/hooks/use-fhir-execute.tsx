import { Operation } from "@bonfhir/core/r4b";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys";
import { useFhirClientQueryContext } from "../context";

export interface UseFhirExecuteOptions<TOperationResult> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          TOperationResult,
          unknown,
          TOperationResult,
          ReturnType<(typeof FhirQueryKeys)["execute"]>
        >,
        "initialData" | "queryKey" | "queryFn"
      >
    | null
    | undefined;
}

/**
 * Return a [Query](https://tanstack.com/query/latest/docs/react/guides/queries) for an operation request.
 * If  you want to execute an operation that affects state, you should use the {@link useFhirExecuteMutation} hook instead.
 *
 * @see https://hl7.org/fhir/operations.html
 * @see https://www.hl7.org/fhir/operationslist.html
 */
export function useFhirExecute<TOperationResult>(
  operation: Operation,
  options?: UseFhirExecuteOptions<Operation> | null | undefined,
): UseQueryResult<TOperationResult> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);

  if (operation.affectsState ?? true) {
    throw new Error(
      `useFhirExecute hook does not support operations that affect state (${operation.operation}). Use useFhirExecuteMutation instead.`,
    );
  }

  return useQuery({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.query as any),
    queryKey: FhirQueryKeys.execute(fhirQueryContext.clientKey, operation),
    queryFn: () => fhirQueryContext.fhirClient.execute(operation),
  });
}
