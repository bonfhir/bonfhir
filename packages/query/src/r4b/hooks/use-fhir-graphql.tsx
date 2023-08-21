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
        operationName as any,
      ),
  });
}
