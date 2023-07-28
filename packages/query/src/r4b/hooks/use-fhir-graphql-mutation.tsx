/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys";
import { useFhirClientQueryContext } from "../context";

export interface UseFhirGraphQLMutationOptions<
  TResult = any,
  TVariables = Record<string, any>,
> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  mutation?:
    | Omit<
        UseMutationOptions<TResult, unknown, TVariables, unknown>,
        "mutationFn"
      >
    | null
    | undefined;
}

export function useFhirGraphQLMutation<TResult = any>(
  query: string,
  operationName?: string | null | undefined,
  options?: UseFhirGraphQLMutationOptions<TResult> | null | undefined,
): UseMutationResult<TResult, unknown, Record<string, any>, unknown>;
export function useFhirGraphQLMutation<
  TResult = any,
  TVariables = Record<string, any>,
>(
  query: TypedDocumentNode<TResult, TVariables>,
  options?: UseFhirGraphQLMutationOptions<TResult> | null | undefined,
): UseMutationResult<TResult, unknown, TVariables, unknown>;
export function useFhirGraphQLMutation<
  TResult = any,
  TVariables = Record<string, any>,
>(
  query: string | TypedDocumentNode<TResult, TVariables>,
  operationName?:
    | string
    | UseFhirGraphQLMutationOptions<TResult>
    | null
    | undefined,
  options?: UseFhirGraphQLMutationOptions<TResult> | null | undefined,
): UseMutationResult<TResult, unknown, TVariables, unknown> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);
  if (typeof operationName !== "string") {
    options = operationName;
  }

  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.mutation as any),
    onSuccess: (data, variables, context) => {
      if (fhirQueryContext.manageCache) {
        FhirQueryKeys.invalidateQueries(
          fhirQueryContext.clientKey,
          fhirQueryContext.queryClient,
          undefined,
          undefined,
        );
      }
      options?.mutation?.onSuccess?.(data, variables as any, context);
    },
    mutationFn: (variables) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fhirQueryContext.fhirClient.graphql(
        query as any,
        variables as any,
        operationName as any,
      ),
  });
}
