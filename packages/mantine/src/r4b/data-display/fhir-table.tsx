/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  FhirTableColumn,
  FhirTableRendererProps,
  useFhirUIContext,
} from "@bonfhir/react/r4b";
import {
  Group,
  Table,
  TableProps,
  TableTbodyProps,
  TableTdProps,
  TableThProps,
  TableTheadProps,
  TableTrProps,
  UnstyledButton,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from "@tabler/icons-react";
import { ReactElement, createElement } from "react";

export function MantineFhirTable(
  props: FhirTableRendererProps<MantineFhirTableProps>,
): ReactElement | null {
  const { onNavigate } = useFhirUIContext();

  return (
    <Table
      className={props.className}
      style={props.style}
      {...props.rendererProps?.table}
    >
      <Table.Thead {...props.rendererProps?.thead}>
        {props.rendererProps?.theadPrefix
          ? createElement(props.rendererProps.theadPrefix)
          : null}
        <Table.Tr>
          {props.columns.map((column) => (
            <Table.Th
              key={column.key}
              {...propsOrFunction(props.rendererProps?.th, column)}
            >
              {createElement(
                props.rendererProps?.headerCell ?? MantineFhirTableHeader,
                {
                  column,
                  parsedSort: props.parsedSort,
                  onSortChange: props.onSortChange,
                },
              )}
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      {Boolean(props.rows) && (
        <Table.Tbody {...props.rendererProps?.tbody}>
          {props.rows?.map((row, index) => (
            <Table.Tr
              key={index}
              onClick={() => {
                props.onRowClick?.(row as any, index);
                const target = props.onRowNavigate?.(row as any, index);
                if (target) {
                  onNavigate?.({ target, aux: false });
                }
              }}
              onAuxClick={() => {
                props.onRowAuxClick?.(row as any, index);
                const target = props.onRowNavigate?.(row as any, index);
                if (target) {
                  onNavigate?.({ target, aux: true });
                }
              }}
              style={{
                cursor:
                  props.onRowClick || props.onRowNavigate
                    ? "pointer"
                    : "default",
              }}
              {...propsOrFunction(props.rendererProps?.tr, row)}
            >
              {props.columns.map((column) => (
                <Table.Td
                  key={column.key}
                  {...propsOrFunction(props.rendererProps?.td, column, row)}
                >
                  {column.render(row as any, index)}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      )}
    </Table>
  );
}

export interface MantineFhirTableHeaderProps {
  column: FhirTableColumn<any>;
  parsedSort: FhirTableRendererProps["parsedSort"];
  onSortChange: FhirTableRendererProps["onSortChange"];
}

function MantineFhirTableHeader({
  column,
  parsedSort,
  onSortChange,
}: MantineFhirTableHeaderProps) {
  return column.sortable ? (
    <UnstyledButton
      onClick={() => {
        return onSortChange?.(parsedSort?.desc ? column.key : `-${column.key}`);
      }}
      style={{
        fontSize: "inherit",
        fontWeight: "inherit",
        color: "inherit",
        width: "100%",
      }}
    >
      <Group
        justify="apart"
        gap={0}
        wrap="nowrap"
        style={{
          fontSize: "inherit",
          fontWeight: "inherit",
          color: "inherit",
        }}
      >
        <>{column.title}</>
        <>
          {parsedSort?.columnKey === column.key ? (
            parsedSort.desc ? (
              <IconChevronDown />
            ) : (
              <IconChevronUp />
            )
          ) : (
            <IconSelector />
          )}
        </>
      </Group>
    </UnstyledButton>
  ) : (
    <>{column.title}</>
  );
}

function propsOrFunction<TProps extends object>(
  value: TProps | ((...arg: any[]) => TProps) | null | undefined,
  ...arg: any[]
): TProps | null | undefined {
  if (typeof value === "function") {
    return value(...arg);
  }

  return value;
}

export interface MantineFhirTableProps {
  table?: TableProps | null | undefined;
  thead?: TableTheadProps | null | undefined;
  theadPrefix?: () => ReactElement;
  headerCell?: (props: MantineFhirTableHeaderProps) => ReactElement;
  tbody?: TableTbodyProps | null | undefined;
  th?:
    | TableThProps
    | ((column: FhirTableColumn<any>) => TableThProps)
    | null
    | undefined;
  tr?: TableTrProps | ((row: any) => TableTrProps) | null | undefined;
  td?:
    | TableTdProps
    | ((column: FhirTableColumn<any>, row: any) => TableTdProps)
    | null
    | undefined;
}
