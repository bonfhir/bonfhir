import { FhirClient } from "@bonfhir/core/r4b";
import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys";
import { useFhirClientQueryContext } from "../context";

export type UseFhirClientMutationArgs<TResult> = (
  client: FhirClient,
) => Promise<TResult>;

export interface UseFhirClientMutationOptions<TResult> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  mutation?:
    | Omit<
        UseMutationOptions<
          TResult,
          unknown,
          UseFhirClientMutationArgs<TResult>,
          unknown
        >,
        "mutationFn"
      >
    | null
    | undefined;
  /**
   * Whether to invalidate all queries that use the same FhirClient.
   * IF true, you should probably think about doing manual invalidation in the `onSuccess` callback.
   */
  doNotInvalidateAllQueries?: boolean;
}

/**
 * This hook allows you to perform one or several operations using a FhirClient directly.
 *
 * Invoking it will invalidate all queries that use the same FhirClient if `manageCache` is true (the default).
 */
export function useFhirClientMutation<TResult = unknown>(
  options?: UseFhirClientMutationOptions<TResult> | null | undefined,
): UseMutationResult<
  TResult,
  unknown,
  UseFhirClientMutationArgs<TResult>,
  unknown
> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);

  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.mutation as any),
    onSuccess: (data, variables, context) => {
      if (fhirQueryContext.manageCache && !options?.doNotInvalidateAllQueries) {
        FhirQueryKeys.invalidateQueries(
          fhirQueryContext.clientKey,
          fhirQueryContext.queryClient,
          undefined,
          undefined,
        );
      }
      options?.mutation?.onSuccess?.(data, variables, context);
    },
    mutationFn: async (args) => {
      return await args(fhirQueryContext.fhirClient);
    },
  });
}
