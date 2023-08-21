import { AnyResourceType, Operation } from "@bonfhir/core/r5";
import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys";
import { useFhirClientQueryContext } from "../context";

export interface UseFhirExecuteMutationOptions<TOperationResult> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  mutation?:
    | Omit<
        UseMutationOptions<TOperationResult, unknown, Operation, unknown>,
        "mutationFn"
      >
    | null
    | undefined;
}

/**
 * Return a [Mutation](https://tanstack.com/query/latest/docs/react/guides/mutations) for an operation request.
 *
 * This version is to be used when the operation affects state, or you want to avoid query caching.
 * If that's not the case, consider using the {@link useFhirExecute} hook instead.
 *
 * @see https://hl7.org/fhir/operations.html
 * @see https://www.hl7.org/fhir/operationslist.html
 */
export function useFhirExecuteMutation<TOperationResult>(
  options?: UseFhirExecuteMutationOptions<TOperationResult> | null | undefined,
): UseMutationResult<TOperationResult, unknown, Operation, unknown> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);

  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.mutation as any),
    onSuccess: (data, operation, context) => {
      if (
        fhirQueryContext.manageCache &&
        operation.resourceType &&
        operation.resourceId
      ) {
        FhirQueryKeys.invalidateQueries(
          fhirQueryContext.clientKey,
          fhirQueryContext.queryClient,
          operation.resourceType as AnyResourceType,
          operation.resourceId,
        );
      }
      options?.mutation?.onSuccess?.(data, operation, context);
    },
    mutationFn: (args) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fhirQueryContext.fhirClient.execute(args as any),
  });
}
