import { BundleExecutor, Resource, Retrieved } from "@bonfhir/core/r4b";
import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys";
import { useFhirClientQueryContext } from "../context";

export type UseFhirTransactionMutationArgs = (
  executor: BundleExecutor,
) => unknown;

export interface UseFhirTransactionMutationOptions {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  mutation?:
    | Omit<
        UseMutationOptions<
          BundleExecutor,
          unknown,
          UseFhirTransactionMutationArgs,
          unknown
        >,
        "mutationFn"
      >
    | null
    | undefined;
}

/**
 * The transaction interaction submits a set of actions to perform on a server in a single HTTP request/response.
 * All entries execute in a single transaction on the server.
 *
 * @see https://hl7.org/fhir/http.html#transaction
 */
export function useFhirTransactionMutation(
  options?: UseFhirTransactionMutationOptions | null | undefined,
): UseMutationResult<
  BundleExecutor,
  unknown,
  UseFhirTransactionMutationArgs,
  unknown
> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);

  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.mutation as any),
    onSuccess: (data, variables, context) => {
      for (const resource of data.futureRequests.map((x) => x.resource)) {
        if (
          (resource as Resource).resourceType &&
          (resource as Retrieved<Resource>).id
        ) {
          FhirQueryKeys.invalidateQueries(
            fhirQueryContext.clientKey,
            fhirQueryContext.queryClient,
            (resource as Resource).resourceType,
            (resource as Retrieved<Resource>).id,
          );
        }
      }
      options?.mutation?.onSuccess?.(data, variables, context);
    },
    mutationFn: async (args) => {
      const executor = fhirQueryContext.fhirClient.transaction();
      args(executor);
      await executor.send();
      // We touch all resources to ensure there are no errors at this stage
      for (const x of executor.futureRequests) x.resource;
      return executor;
    },
  });
}
