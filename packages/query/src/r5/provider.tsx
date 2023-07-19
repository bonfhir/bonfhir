import { FetchFhirClient, FhirClient } from "@bonfhir/core/r5";
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren, useMemo } from "react";
import { DEFAULT_FHIR_CLIENT, FhirQueryContext } from "./context";

export type FhirQueryProviderProps = PropsWithChildren<
  {
    /**
     * The {@link FhirRestfulClient} to make FHIR HTTP requests.
     */
    fhirClient: FhirClient | string | Record<string, FhirClient | string>;

    /**
     * Set to `false` to disable default cache invalidation / optimization strategies implemented in default hooks.
     */
    manageCache?: boolean | null | undefined;
  } & (
    | {
        /**
         * An existing {@link QueryClient} instance to use. If none is provided, a default instance is created
         * and managed automatically.
         */
        queryClient?: QueryClient | null | undefined;
      }
    | {
        /**
         * Any custom {@link QueryClientConfig} configuration options to use.
         */
        queryClientConfig?: QueryClientConfig | null | undefined;
      }
  )
>;

/**
 * Provide a context for fhir-query hooks.
 * Should probably be placed near the top of your React app render tree.
 */
export function FhirQueryProvider(props: FhirQueryProviderProps) {
  const fhirClient = normalizeFhirClient(props.fhirClient);
  const manageCache = props.manageCache == undefined || props.manageCache;
  if (hasQueryClient(props)) {
    return (
      <FhirQueryContext.Provider
        value={{
          fhirClient,
          queryClient: props.queryClient,
          manageCache,
        }}
      >
        {props.children}
      </FhirQueryContext.Provider>
    );
  }

  const queryClient = useMemo(
    () =>
      new QueryClient(
        hasQueryClientConfig(props) ? props.queryClientConfig : undefined,
      ),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <FhirQueryContext.Provider
        value={{
          fhirClient,
          queryClient,
          manageCache: manageCache,
        }}
      >
        {props.children}
      </FhirQueryContext.Provider>
    </QueryClientProvider>
  );
}

function hasQueryClient(
  value: FhirQueryProviderProps,
): value is FhirQueryProviderProps & { queryClient: QueryClient } {
  return !!(value as { queryClient: QueryClient }).queryClient;
}

function hasQueryClientConfig(
  value: FhirQueryProviderProps,
): value is FhirQueryProviderProps & { queryClientConfig: QueryClientConfig } {
  return !!(value as { queryClientConfig: QueryClientConfig })
    .queryClientConfig;
}

function normalizeFhirClient(
  fhirClient: FhirQueryProviderProps["fhirClient"],
): FhirQueryContext["fhirClient"] {
  if (isFhirClientMap(fhirClient)) {
    const result = Object.fromEntries(
      Object.entries(fhirClient)
        .map(([key, value]) => [
          key ?? DEFAULT_FHIR_CLIENT,
          typeof value === "string"
            ? new FetchFhirClient({ baseUrl: value })
            : value,
        ])
        .map(([key, value]) => [key, value]),
    );

    if (!result[DEFAULT_FHIR_CLIENT]) {
      throw new Error(
        `Missing a default FhirClient. You must provide a default FhirClient in the fhirClient prop using either an empty string or the "${DEFAULT_FHIR_CLIENT}" key.`,
      );
    }
    return result;
  }

  return {
    [DEFAULT_FHIR_CLIENT]:
      typeof fhirClient === "string"
        ? new FetchFhirClient({ baseUrl: fhirClient })
        : fhirClient,
  };
}

function isFhirClientMap(
  fhirClient: FhirQueryProviderProps["fhirClient"],
): fhirClient is Record<string, FhirClient | string> {
  if (typeof fhirClient === "string") {
    return false;
  }

  if (fhirClient["fetch"]) {
    return false;
  }

  return true;
}
