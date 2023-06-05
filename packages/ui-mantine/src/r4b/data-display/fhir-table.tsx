/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FhirTableRendererProps } from "@bonfhir/ui/r4b";
import { Group, Table, TableProps, UnstyledButton } from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from "@tabler/icons-react";
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
              <th key={column.key} {...props.rendererProps?.th}>
                {column.sortable ? (
                  <UnstyledButton
                    onClick={() => props.onSortChange?.(column.key)}
                  >
                    <Group position="apart">
                      {column.title}
                      {props.parsedSort &&
                      props.parsedSort.columnKey === column.key ? (
                        props.parsedSort.desc ? (
                          <IconChevronDown />
                        ) : (
                          <IconChevronUp />
                        )
                      ) : (
                        <IconSelector />
                      )}
                    </Group>
                  </UnstyledButton>
                ) : (
                  column.title
                )}
              </th>
            );
          })}
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
  );
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
