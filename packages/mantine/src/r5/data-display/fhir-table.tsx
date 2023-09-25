/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  FhirTableColumn,
  FhirTableRendererProps,
  useFhirUIContext,
} from "@bonfhir/react/r5";
import { Group, Table, TableProps, UnstyledButton } from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from "@tabler/icons-react";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  createElement,
} from "react";

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
      <thead {...props.rendererProps?.thead}>
        {props.rendererProps?.theadPrefix
          ? createElement(props.rendererProps.theadPrefix)
          : null}
        <tr>
          {props.columns.map((column) => (
            <th
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
            </th>
          ))}
        </tr>
      </thead>
      {Boolean(props.rows) && (
        <tbody {...props.rendererProps?.tbody}>
          {props.rows?.map((row, index) => (
            <tr
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
      sx={{
        fontSize: "inherit",
        fontWeight: "inherit",
        color: "inherit",
        width: "100%",
      }}
    >
      <Group
        position="apart"
        spacing={0}
        noWrap={true}
        sx={{
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
  thead?:
    | DetailedHTMLProps<
        HTMLAttributes<HTMLTableSectionElement>,
        HTMLTableSectionElement
      >
    | null
    | undefined;
  theadPrefix?: () => ReactElement;
  headerCell?: (props: MantineFhirTableHeaderProps) => ReactElement;
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
        column: FhirTableColumn<any>,
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
        row: any,
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
        row: any,
      ) => DetailedHTMLProps<
        HTMLAttributes<HTMLTableCellElement>,
        HTMLTableCellElement
      >)
    | null
    | undefined;
}
