/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FhirTableColumn, FhirTableRendererProps } from "@bonfhir/ui/r5";
import { Table, TableProps } from "@mantine/core";
import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

export function MantineFhirTable(
  props: FhirTableRendererProps<MantineFhirTableProps>
): ReactElement | null {
  return (
    <Table {...props.rendererProps?.table}>
      <thead {...props.rendererProps?.thead}>
        <tr>
          {props.columns.map((column) => {
            return (
              <th
                key={column.key}
                {...propsOrFunction(props.rendererProps?.th, column)}
              >
                {column.title}
              </th>
            );
          })}
        </tr>
      </thead>
      {Boolean(props.rows) && (
        <tbody {...props.rendererProps?.tbody}>
          {props.rows?.map((row, index) => (
            <tr key={index} {...propsOrFunction(props.rendererProps?.tr, row)}>
              {props.columns.map((column) => (
                <td
                  key={column.key}
                  {...propsOrFunction(props.rendererProps?.td, column, row)}
                >
                  {column.render(row as any, index)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      )}
    </Table>
  );
}

function propsOrFunction<TProps extends object>(
  value: TProps | ((...arg: any[]) => TProps) | null | undefined,
  ...arg: any[]
): TProps | null | undefined {
  if (typeof value === "function") {
    return value(arg);
  }

  return value;
}

export interface MantineFhirTableProps {
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
    | ((
        column: FhirTableColumn<any>
      ) => DetailedHTMLProps<
        HTMLAttributes<HTMLTableCellElement>,
        HTMLTableCellElement
      >)
    | null
    | undefined;
  tr?:
    | DetailedHTMLProps<
        HTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
      >
    | ((
        row: any
      ) => DetailedHTMLProps<
        HTMLAttributes<HTMLTableRowElement>,
        HTMLTableRowElement
      >)
    | null
    | undefined;
  td?:
    | DetailedHTMLProps<
        HTMLAttributes<HTMLTableCellElement>,
        HTMLTableCellElement
      >
    | ((
        column: FhirTableColumn<any>,
        row: any
      ) => DetailedHTMLProps<
        HTMLAttributes<HTMLTableCellElement>,
        HTMLTableCellElement
      >)
    | null
    | undefined;
}
