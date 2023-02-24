/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableColum, TableProps } from "@bonfhir/ui-components/r4b";
import {
  Table,
  TableColumnProps as AntdTableColumnProps,
  TablePaginationConfig,
  TableProps as AntdTableProps,
} from "antd";
import { ColumnType } from "antd/es/table";
import {
  FilterValue,
  SorterResult,
  SortOrder,
  TableCurrentDataSource,
} from "antd/es/table/interface";
import { ReactElement } from "react";

export function table(
  props: TableProps<AntdTableProps<unknown>, AntdTableColumnProps<unknown>>
): ReactElement | null {
  const {
    data,
    columns,
    pageSize,
    pageNumber,
    total,
    onPageChange,
    onChange,
    sort,
    onSortChange,
    ...renderedProps
  } = props as any;

  const { sortedKey, sortOrder } = parseSort(sort);

  const managedOnChange = (
    antdPagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<unknown> | SorterResult<unknown>[],
    extra: TableCurrentDataSource<unknown>
  ) => {
    if (antdPagination.current && antdPagination.current !== pageNumber) {
      if (antdPagination.current > pageNumber) {
        onPageChange?.("next");
      } else {
        onPageChange?.("previous");
      }
    }

    if (!Array.isArray(sorter)) {
      const newSort = `${sorter.order === "descend" ? "-" : ""}${
        sorter.columnKey
      }`;
      if (newSort !== sort) {
        onSortChange?.(newSort);
      }
    }

    onChange?.(antdPagination, filters, sorter, extra);
  };

  return (
    <Table
      dataSource={data as any}
      columns={columns.map(
        (
          column: TableColum<AntdTableColumnProps<object>>
        ): ColumnType<object> => {
          const { key, title, sortable, render, ...columnRenderProps } = column;
          return {
            key,
            title,
            render: (_value: any, _record: unknown, index: number) =>
              render(index),
            sorter: sortable,
            sortOrder: key === sortedKey ? sortOrder : null,
            ...columnRenderProps,
          };
        }
      )}
      pagination={{
        current: pageNumber,
        pageSize,
        total,
        hideOnSinglePage: true,
        simple: true,
        showTotal: () => Boolean(total),
      }}
      onChange={managedOnChange}
      rowKey={(resource) => resource?.id}
      {...renderedProps}
    />
  );
}

export function parseSort(sort: string): {
  sortedKey: string | null;
  sortOrder: SortOrder | null;
} {
  if (!sort) return { sortedKey: null, sortOrder: null };

  if (sort.startsWith("-")) {
    return {
      sortedKey: sort.slice(1),
      sortOrder: "descend",
    };
  }

  return {
    sortedKey: sort,
    sortOrder: "ascend",
  };
}
