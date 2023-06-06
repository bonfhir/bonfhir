import {
  AnyResource,
  BundleNavigator,
  Retrieved,
  WithResolvableReferences,
} from "@bonfhir/core/r5";
import { ReactElement, ReactNode } from "react";
import { useFhirUIContext } from "../context.js";

export interface FhirTableProps<
  TResource extends AnyResource,
  TRendererProps = any,
  TRow = WithResolvableReferences<Retrieved<TResource>>
> {
  data:
    | BundleNavigator<TResource>
    | BundleNavigator<Retrieved<TResource>>
    | Array<TResource>
    | null
    | undefined;
  columns: FhirTableColumn<TRow>[];
  sort?: string | null | undefined;
  onSortChange?: ((sort: string) => void) | null | undefined;
  rendererProps?: TRendererProps;
}

export interface FhirTableColumn<TRow> {
  key: string;
  title: ReactNode;
  sortable?: boolean | null | undefined;
  render: (row: TRow, index: number) => ReactNode;
}

export function FhirTable<
  TResource extends AnyResource,
  TRendererProps = any,
  TRow = WithResolvableReferences<Retrieved<TResource>>
>(
  props: FhirTableProps<TResource, TRendererProps, TRow>
): ReactElement<any, any> | null {
  const { render } = useFhirUIContext();

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
  AnyResource,
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
  props: FhirTableRendererProps
) => ReactElement | null;
