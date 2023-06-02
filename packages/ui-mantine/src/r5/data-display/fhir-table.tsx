import { FhirTableRendererProps } from "@bonfhir/ui/r5";
import {
  LoadingOverlay,
  LoadingOverlayProps,
  Table,
  TableProps,
} from "@mantine/core";
import { DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";

export function MantineFhirTable(
  props: FhirTableRendererProps<MantineFhirTableProps>
): ReactElement | null {
  return (
    <>
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
    </>
  );
}

export interface MantineFhirTableProps {
  loadingOverlay?: LoadingOverlayProps | null | undefined;
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
}
