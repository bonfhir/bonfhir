/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys";
import { useFhirClientQueryContext } from "../context";

export interface UseFhirGraphQLOptions<TResult = any> {
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
 * This hook puts the query on error if there are GraphQL errors in the response.
 * This make it easier to reason about, but do not support partial errors in GraphQL.
 *
 * Use the `useFhirGraphqlResult` hook to have access to the raw GraphQL response,
 * including the `errors` and `extensions` field.
 */
export function useFhirGraphQL<TResult = any>(
  query: string,
  variables?: Record<string, any>,
  operationName?: string | null | undefined,
  options?: UseFhirGraphQLOptions<TResult> | null | undefined,
): UseQueryResult<TResult>;
export function useFhirGraphQL<TResult = any, TVariables = Record<string, any>>(
  query: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  options?: UseFhirGraphQLOptions<TResult> | null | undefined,
): UseQueryResult<TResult>;
export function useFhirGraphQL<TResult = any, TVariables = Record<string, any>>(
  query: string | TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  operationName?: string | UseFhirGraphQLOptions<TResult> | null | undefined,
  options?: UseFhirGraphQLOptions<TResult> | null | undefined,
): UseQueryResult<TResult> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);
  if (typeof operationName !== "string") {
    options = operationName;
  }

  return useQuery<TResult>({
    ...(options?.query as any),
    queryKey: FhirQueryKeys.execute(fhirQueryContext.clientKey, {
      operation: "$graphql",
      parameters: {
        query,
        variables,
      },
    }),
    queryFn: () =>
      fhirQueryContext.fhirClient.graphql(
        query as any,
        variables as any,
        typeof operationName === "string" ? (operationName as any) : undefined,
      ),
  });
}
