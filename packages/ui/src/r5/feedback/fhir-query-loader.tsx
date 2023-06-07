import {
  FhirClientError,
  asArray,
  asError,
  isFhirClientError,
} from "@bonfhir/core/r5";
import { QueryObserverBaseResult } from "@tanstack/react-query";
import { PropsWithChildren, ReactElement } from "react";
import { useFhirUIContext } from "../context.js";

export type FhirQueryLoaderProps<TRendererProps = any> = PropsWithChildren & {
  query: QueryObserverBaseResult | Array<QueryObserverBaseResult>;
  allowRetry?: boolean | null | undefined;
  loader?: ReactElement | null | undefined;
  error?: ((error: FhirClientError | Error) => ReactElement) | null | undefined;
  rendererProps?: TRendererProps;
};

export function FhirQueryLoader<TRendererProps = any>(
  props: FhirQueryLoaderProps<TRendererProps>
): ReactElement | null {
  const { render } = useFhirUIContext();

  const queries = asArray(props.query);
  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError) && !isLoading;

  return render<FhirQueryLoaderRendererProps>("FhirQueryLoader", {
    ...props,
    isLoading,
    isError,
    errors: queries.map((query) =>
      isFhirClientError(query.error) ? query.error : asError(query.error)
    ),
    retry: () => {
      for (const query of queries) query.refetch();
    },
  });
}

export interface FhirQueryLoaderRendererProps<TRendererProps = any>
  extends FhirQueryLoaderProps<TRendererProps> {
  isLoading: boolean;
  isError: boolean;
  errors: Array<FhirClientError | Error>;
  retry: () => void;
}

export type FhirQueryLoaderRenderer = (
  props: FhirQueryLoaderRendererProps
) => ReactElement | null;
