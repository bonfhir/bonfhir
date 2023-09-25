import {
  BundleNavigator,
  Retrieved,
  WithResolvableReferences,
} from "@bonfhir/core/r5";
import { ReactElement, ReactNode } from "react";
import { useFhirUIContext } from "../context";

export interface FhirTableProps<
  TData extends BundleNavigator | any[],
  TRendererProps = any,
  TRow = TData extends BundleNavigator<infer TResource>
    ? WithResolvableReferences<Retrieved<TResource>>
    : TData extends Array<infer TArrayElement>
    ? TArrayElement
    : never,
> {
  data: TData | undefined;
  className?: string | undefined;
  style?: Record<string, any> | undefined;
  columns: FhirTableColumn<TRow>[];
  sort?: string | null | undefined;
  onSortChange?: ((sort: string) => void) | null | undefined;
  onRowClick?: ((row: TRow, index: number) => void) | null | undefined;
  onRowAuxClick?: ((row: TRow, index: number) => void) | null | undefined;
  onRowNavigate?: ((row: TRow, index: number) => string) | null | undefined;
  rendererProps?: TRendererProps;
}

export interface FhirTableColumn<TRow, TRendererProps = any> {
  key: string;
  title: ReactNode;
  sortable?: boolean | null | undefined;
  render: (row: TRow, index: number) => ReactNode;
  rendererProps?: TRendererProps;
}

export function FhirTable<
  TData extends BundleNavigator | any[],
  TRendererProps = any,
  TRow = TData extends BundleNavigator<infer TResource>
    ? WithResolvableReferences<Retrieved<TResource>>
    : TData extends Array<infer TArrayElement>
    ? TArrayElement
    : never,
>(
  props: FhirTableProps<TData, TRendererProps, TRow>,
): ReactElement<any, any> | null {
  const { applyDefaultProps, render } = useFhirUIContext();
  props = applyDefaultProps("FhirTable", props);

  const rows = (props.data as any)?.searchMatch?.() ?? props.data;

  return render("FhirTable", {
    ...props,
    rows,
    parsedSort: props.sort?.trim()
      ? {
          columnKey: props.sort.startsWith("-")
            ? props.sort.slice(1)
            : props.sort,
          desc: props.sort.startsWith("-"),
        }
      : undefined,
  });
}

export type FhirTableRendererProps<TRendererProps = any> = FhirTableProps<
  any,
  TRendererProps
> & {
  rows: unknown[] | undefined;
  parsedSort:
    | {
        columnKey: string;
        desc: boolean;
      }
    | undefined;
};

export type FhirTableRenderer = (
  props: FhirTableRendererProps,
) => ReactElement | null;
