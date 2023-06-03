/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FhirTableRendererProps } from "@bonfhir/ui/r5";
import {
  Group,
  LoadingOverlay,
  LoadingOverlayProps,
  Pagination,
  Stack,
  StackProps,
  Table,
  TableProps,
  Text,
} from "@mantine/core";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";

export function MantineFhirTable(
  props: FhirTableRendererProps<MantineFhirTableProps>
): ReactElement | null {
  return (
    <Stack {...props.rendererProps?.stack}>
      <LoadingOverlay
        visible={props.loading}
        {...props.rendererProps?.loadingOverlay}
      />
      <Table {...props.rendererProps?.table}>
        <thead {...props.rendererProps?.thead}>
          <tr>
            {props.columns.map((column) => (
              <th key={column.key} {...props.rendererProps?.th}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        {Boolean(props.query.data) && (
          <tbody {...props.rendererProps?.tbody}>
            {props.rows?.map((row, index) => (
              <tr key={index}>
                {props.columns.map((column) => (
                  <td key={column.key} {...props.rendererProps?.td}>
                    {column.render(row, index, props.query.data!)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      <MantineFhirTablePagination
        tableProps={props}
        {...props.rendererProps?.pagination}
      />
    </Stack>
  );
}

export interface MantineFhirTableProps {
  loadingOverlay?: LoadingOverlayProps | null | undefined;
  stack?: StackProps | null | undefined;
  table?: TableProps | null | undefined;
  thead?:
    | DetailedHTMLProps<
        HTMLAttributes<HTMLTableSectionElement>,
        HTMLTableSectionElement
      >
    | null
    | undefined;
  tbody?:
    | DetailedHTMLProps<
        HTMLAttributes<HTMLTableSectionElement>,
        HTMLTableSectionElement
      >
    | null
    | undefined;
  th?:
    | DetailedHTMLProps<
        HTMLAttributes<HTMLTableCellElement>,
        HTMLTableCellElement
      >
    | null
    | undefined;
  td?:
    | DetailedHTMLProps<
        HTMLAttributes<HTMLTableCellElement>,
        HTMLTableCellElement
      >
    | null
    | undefined;
  pagination?:
    | Omit<MantineFhirTablePaginationProps, "tableProps">
    | null
    | undefined;
}

export interface MantineFhirTablePaginationProps {
  tableProps: FhirTableRendererProps<MantineFhirTableProps>;
  paginationText?:
    | ((tableProps: FhirTableRendererProps<MantineFhirTableProps>) => ReactNode)
    | null
    | undefined;
}

export function MantineFhirTablePagination(
  props: MantineFhirTablePaginationProps
): ReactElement | null {
  if (!props.tableProps.query.data) {
    return null;
  }

  let paginationText = props.paginationText?.(props.tableProps);
  if (paginationText == undefined) {
    paginationText = props.tableProps.query.data?.total ? (
      <Text mx="sm">1-20 of {props.tableProps.query.data?.total}</Text>
    ) : (
      <Text mx="sm">1-20 of 35</Text>
    );
  }

  return (
    <Pagination.Root total={10}>
      <Group spacing={5} position="center">
        <Pagination.First />
        <Pagination.Previous />
        {paginationText}
        <Pagination.Next />
        <Pagination.Last />
      </Group>
    </Pagination.Root>
  );
}
