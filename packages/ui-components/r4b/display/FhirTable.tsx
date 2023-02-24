import { PaginatedBundleResult } from "@bonfhir/fhir-query/r4b";
import { UseQueryResult } from "@tanstack/react-query";
import { FhirResource } from "fhir/r4";
import { createElement, ReactElement, ReactNode, useCallback } from "react";
import { useFhirUIComponentsContext } from "../FhirUIComponentsContext";

export type FhirTableProps<
  PrimaryResourceType extends FhirResource,
  SecondaryResourceType extends FhirResource = PrimaryResourceType,
  TRendererProps = unknown,
  TColumnsRendererProps = unknown
> = TRendererProps & {
  columns: readonly FhirTableColumn<
    PrimaryResourceType,
    SecondaryResourceType,
    TColumnsRendererProps
  >[];
  query: UseQueryResult<
    PaginatedBundleResult<PrimaryResourceType, SecondaryResourceType>
  >;
  querySelect?:
    | ((
        queryResult: PaginatedBundleResult<
          PrimaryResourceType,
          SecondaryResourceType
        >
      ) => Array<PrimaryResourceType>)
    | null
    | undefined;
  pageSize: number;
  pageNumber: number;
  onPageChange?: (pageUrl: string | undefined, pageNumber: number) => void;
  sort?: string | null | undefined;
  onSortChange: (sort: string) => void;
};

export type FhirTableColumn<
  PrimaryResourceType extends FhirResource,
  SecondaryResourceType extends FhirResource = PrimaryResourceType,
  TRendererProps = unknown
> = TRendererProps & {
  key: string;
  title: string;
  sortable?: boolean | null | undefined;
  render: (
    row: PrimaryResourceType,
    index: number,
    data: PaginatedBundleResult<PrimaryResourceType, SecondaryResourceType>
  ) => ReactNode;
};

export function FhirTable<
  PrimaryResourceType extends FhirResource,
  SecondaryResourceType extends FhirResource = PrimaryResourceType,
  TRendererProps = unknown,
  TColumnsRendererProps = unknown
>(
  props: FhirTableProps<
    PrimaryResourceType,
    SecondaryResourceType,
    TRendererProps,
    TColumnsRendererProps
  >
): ReactElement | null {
  const { renderer } = useFhirUIComponentsContext();

  const {
    columns,
    query,
    querySelect,
    pageSize,
    pageNumber,
    onPageChange,
    sort,
    onSortChange,
    ...rendererProps
  } = props;

  const managedOnPageChange = useCallback(
    (direction: "next" | "previous") => {
      if (!onPageChange) {
        return;
      }

      switch (direction) {
        case "next":
          if (query.data?.hasNextPage) {
            onPageChange(query.data.nextPageUrl, pageNumber + 1);
          }
          break;
        case "previous":
          if (query.data?.hasPreviousPage) {
            onPageChange(query.data.previousPageUrl, pageNumber - 1);
          }
          break;
      }
    },
    [onPageChange]
  );

  const data =
    query.data && querySelect
      ? querySelect(query.data)
      : query.data?.nav.searchMatch();

  return createElement(renderer.table, {
    query,
    data,
    columns: columns.map((column) => {
      const { key, title, sortable, render, ...columnRendererProps } = column;
      return {
        key,
        title,
        sortable: !!sortable,
        render: (rowIndex: number) =>
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          render(data![rowIndex] as PrimaryResourceType, rowIndex, query.data!),
        ...columnRendererProps,
      };
    }),
    total: query.data?.bundle.total || 0,
    pageSize,
    pageNumber,
    onPageChange: managedOnPageChange,
    sort,
    onSortChange,
    ...rendererProps,
  });
}
