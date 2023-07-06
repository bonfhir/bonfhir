import {
  AnyResourceType,
  Operation,
  OperationParameters,
} from "@bonfhir/core/r4b";
import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys.js";
import { useFhirClientQueryContext } from "../context.js";

export type UseFhirExecuteMutationArgs<
  TOperationResult,
  TOperation extends Operation<TOperationResult> = Operation<TOperationResult>,
> = TOperation | OperationParameters;

export interface UseFhirExecuteMutationOptions<TOperationResult> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  mutation?:
    | Omit<
        UseMutationOptions<
          TOperationResult,
          unknown,
          UseFhirExecuteMutationArgs<TOperationResult>,
          unknown
        >,
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
): UseMutationResult<
  TOperationResult,
  unknown,
  UseFhirExecuteMutationArgs<TOperationResult>,
  unknown
> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);

  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.mutation as any),
    onSuccess: (data, variables, context) => {
      if (fhirQueryContext.manageCache) {
        const operationParameters = (variables as Operation<TOperationResult>)
          .getParameters
          ? (variables as Operation<TOperationResult>).getParameters()
          : (variables as OperationParameters);
        if (
          operationParameters.resourceType &&
          operationParameters.resourceId
        ) {
          FhirQueryKeys.invalidateQueries(
            fhirQueryContext.clientKey,
            fhirQueryContext.queryClient,
            operationParameters.resourceType as AnyResourceType,
            operationParameters.resourceId,
          );
        }
      }
      options?.mutation?.onSuccess?.(data, variables, context);
    },
    mutationFn: (args) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fhirQueryContext.fhirClient.execute(args as any),
  });
}
