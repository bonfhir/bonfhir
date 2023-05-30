import { FhirClient } from "@bonfhir/core/r4b";
import { QueryClient } from "@tanstack/react-query";
import { createContext, useContext } from "react";

/**
 * The name for the default {@link FhirClient}.
 */
export const DEFAULT_FHIR_CLIENT = "default";

export interface FhirQueryContext {
  /**
   * The {@link FhirClient} to make FHIR HTTP requests.
   */
  fhirClient: Record<string | typeof DEFAULT_FHIR_CLIENT, FhirClient>;

  /**
   * The {@link QueryClient} used to manage the state.
   */
  queryClient: QueryClient;

  /**
   * `true` when the cache invalidation / optimizations are managed by the default hooks.
   */
  manageCache: boolean;
}

/**
 * The context used by fhir-query.
 */
export const FhirQueryContext = createContext<FhirQueryContext | undefined>(
  undefined
);

/**
 * Get the current {@link FhirQueryContext}.
 *
 * @throws Error if no parent context exists (a.k.a. no `FhirQueryProvider` was used in the parent tree).
 */
export function useFhirQueryContext(): FhirQueryContext {
  const context = useContext(FhirQueryContext);
  if (!context) {
    throw new Error(
      "Missing FhirQueryContext. Did you forget to use a parent FhirQueryProvider?"
    );
  }

  return context;
}

/**
 * Get the current {@link FhirQueryContext} with a specific fhirClient.
 *
 * @throws Error if no parent context exists (a.k.a. no `FhirQueryProvider` was used in the parent tree).
 */
export function useFhirClientQueryContext(
  client: string | null | undefined
): Omit<FhirQueryContext, "fhirClient"> & {
  fhirClient: FhirClient;
  clientKey: string;
} {
  const context = useFhirQueryContext();
  const clientKey = client ?? DEFAULT_FHIR_CLIENT;

  const fhirClient = context.fhirClient[clientKey];
  if (!fhirClient) {
    throw new Error(
      `Unable to find a FhirClient with name ${clientKey}. Did you forget to configure it in a parent FhirQueryProvider?`
    );
  }

  return {
    ...context,
    fhirClient,
    clientKey,
  };
}
