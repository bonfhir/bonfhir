import { UseQueryResult } from "@tanstack/react-query";
import isEmpty from "lodash/isEmpty";
import { createElement, PropsWithChildren, ReactElement } from "react";
import { useFhirUIComponentsContext } from "../FhirUIComponentsContext";

export type FhirQueryLoaderProps<
  TData = unknown,
  TError = unknown,
  TLoaderProps = unknown,
  TErrorPanelProps = unknown,
  TEmptyProps = unknown
> = PropsWithChildren<{
  query: UseQueryResult<TData, TError> | Array<UseQueryResult<TData, TError>>;
  emptyProps?: TEmptyProps | null | undefined;
  errorPanelProps?: TErrorPanelProps | null | undefined;
  loaderProps?: TLoaderProps | null | undefined;
}>;

export function FhirQueryLoader<
  TData = unknown,
  TError = unknown,
  TLoaderProps = unknown,
  TErrorPanelProps = unknown,
  TEmptyProps = unknown
>({
  query,
  emptyProps,
  errorPanelProps,
  loaderProps,
  children,
}: FhirQueryLoaderProps<
  TData,
  TError,
  TLoaderProps,
  TErrorPanelProps,
  TEmptyProps
>): ReactElement | null {
  const { renderer } = useFhirUIComponentsContext();

  const allQueries = Array.isArray(query) ? query : [query];

  const queriesInError = allQueries.filter((query) => query.isError);
  if (queriesInError.length) {
    return createElement(renderer.errorPanel, {
      query,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      error: queriesInError[0]!.error,
      ...errorPanelProps,
    });
  }

  const queriesInitiallyLoading = allQueries.filter(
    (query) => query.isInitialLoading
  );
  if (queriesInitiallyLoading.length) {
    return createElement(renderer.loader, { query, ...loaderProps });
  }

  if (emptyProps && isEmpty(allQueries[0]?.data)) {
    return createElement(renderer.empty, { query, ...emptyProps });
  }

  return <>{children}</>;
}
