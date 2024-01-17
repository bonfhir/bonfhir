/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { ExecutionResult } from "graphql";
import { FhirQueryKeys } from "../cache-keys";
import { useFhirClientQueryContext } from "../context";

export interface UseFhirGraphQLResultOptions<TResult = any> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          TResult,
          unknown,
          TResult,
          ReturnType<(typeof FhirQueryKeys)["execute"]>
        >,
        "initialData" | "queryKey" | "queryFn"
      >
    | null
    | undefined;
}

/**
 * Execute a [$graphql operation](https://hl7.org/fhir/resource-operation-graphql.html).
 *
 * This hook returns the "raw" GraphQL ExecutionResult, including the `errors` and `extensions` field in the query data.
 * It does not put the query on error if there are GraphQL errors in the response - it is up
 * to the caller to handle them.
 *
 * Use the `useFhirGraphql` hook to have a simpler API that puts the query on error
 * whenever there are GraphQL errors.
 */
export function useFhirGraphQLResult<TResult = any>(
  query: string,
  variables?: Record<string, any>,
  operationName?: string | null | undefined,
  options?: UseFhirGraphQLResultOptions<TResult> | null | undefined,
): UseQueryResult<ExecutionResult<TResult>>;
export function useFhirGraphQLResult<
  TResult = any,
  TVariables = Record<string, any>,
>(
  query: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  options?: UseFhirGraphQLResultOptions<TResult> | null | undefined,
): UseQueryResult<ExecutionResult<TResult>>;
export function useFhirGraphQLResult<
  TResult = any,
  TVariables = Record<string, any>,
>(
  query: string | TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  operationName?:
    | string
    | UseFhirGraphQLResultOptions<TResult>
    | null
    | undefined,
  options?: UseFhirGraphQLResultOptions<TResult> | null | undefined,
): UseQueryResult<ExecutionResult<TResult>> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);
  if (typeof operationName !== "string") {
    options = operationName;
  }

  return useQuery<ExecutionResult<TResult>>({
    ...(options?.query as any),
    queryKey: FhirQueryKeys.execute(fhirQueryContext.clientKey, {
      operation: "$graphql",
      parameters: {
        query,
        variables,
      },
    }),
    queryFn: () =>
      fhirQueryContext.fhirClient.graphqlResult(
        query as any,
        variables as any,
        typeof operationName === "string" ? (operationName as any) : undefined,
      ),
  });
}
