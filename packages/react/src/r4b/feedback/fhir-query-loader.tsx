import {
  FhirClientError,
  asArray,
  asError,
  isFhirClientError,
} from "@bonfhir/core/r4b";
import {
  QueryObserverBaseResult,
  UseBaseQueryResult,
} from "@tanstack/react-query";
import { ReactElement, ReactNode } from "react";
import { useFhirUIContext } from "../context";

export type FhirQueryLoaderProps<TRendererProps, TData> = {
  query:
    | UseBaseQueryResult<TData>
    | [UseBaseQueryResult<TData>, ...QueryObserverBaseResult[]];
  allowRetry?: boolean | null | undefined;
  loader?: ReactElement | null | undefined;
  error?: ((error: FhirClientError | Error) => ReactElement) | null | undefined;
  children?: ReactNode | ((data: TData) => ReactNode) | undefined;
  className?: string | undefined;
  rendererProps?: TRendererProps;
};

export function FhirQueryLoader<TRendererProps, TData>(
  props: FhirQueryLoaderProps<TRendererProps, TData>,
): ReactElement | null {
  const { applyDefaultProps, render } = useFhirUIContext();
  props = applyDefaultProps("FhirQueryLoader", props);

  const queries = asArray(props.query);
  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError) && !isLoading;

  return render<FhirQueryLoaderRendererProps>("FhirQueryLoader", {
    ...props,
    children:
      typeof props.children === "function"
        ? queries[0].data
          ? props.children(queries[0].data)
          : undefined
        : props.children,
    isLoading,
    isError,
    errors: queries.map((query) =>
      isFhirClientError(query.error) ? query.error : asError(query.error),
    ),
    retry: () => {
      for (const query of queries) query.refetch();
    },
  });
}

export interface FhirQueryLoaderRendererProps<TRendererProps = any>
  extends FhirQueryLoaderProps<TRendererProps, any> {
  children?: ReactNode | undefined;
  isLoading: boolean;
  isError: boolean;
  errors: Array<FhirClientError | Error>;
  retry: () => void;
}

export type FhirQueryLoaderRenderer = (
  props: FhirQueryLoaderRendererProps,
) => ReactElement | null;
