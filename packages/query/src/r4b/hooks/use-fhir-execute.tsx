import {
  ExtractOperationResultType,
  Operation,
  OperationParameters,
} from "@bonfhir/core/r4b";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys.js";
import { useFhirClientQueryContext } from "../context.js";

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
 *
 * Will throw an error if the operation affects state.
 * If  you want to execute an operation that affects state, you should use the {@link useFhirExecuteMutation} hook instead.
 *
 * @see https://hl7.org/fhir/operations.html
 * @see https://www.hl7.org/fhir/operationslist.html
 */
export function useFhirExecute<TOperation extends Operation>(
  operation: TOperation,
  options?:
    | UseFhirExecuteOptions<ExtractOperationResultType<TOperation>>
    | null
    | undefined,
): UseQueryResult<ExtractOperationResultType<TOperation>>;
export function useFhirExecute<TOperationResult>(
  operation: OperationParameters,
): UseQueryResult<TOperationResult>;
export function useFhirExecute<
  TOperationResult,
  TOperation extends Operation<TOperationResult>,
>(
  operation: TOperation | OperationParameters,
  options?:
    | UseFhirExecuteOptions<ExtractOperationResultType<TOperation>>
    | null
    | undefined,
): UseQueryResult<TOperationResult> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);
  const operationParameters = (operation as Operation<TOperationResult>)
    .getParameters
    ? (operation as Operation<TOperationResult>).getParameters()
    : (operation as OperationParameters);

  if (operationParameters.affectsState) {
    throw new Error(
      `useFhirExecute hook does not support operations that affect state (${operationParameters.operation}). Use useFhirExecuteMutation instead.`,
    );
  }

  return useQuery({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.query as any),
    queryKey: FhirQueryKeys.execute(
      fhirQueryContext.clientKey,
      operationParameters,
    ),
    queryFn: () => fhirQueryContext.fhirClient.execute(operationParameters),
  });
}
