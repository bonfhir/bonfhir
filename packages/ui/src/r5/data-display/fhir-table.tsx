import { AnyResource, BundleNavigator, Retrieved } from "@bonfhir/core/r5";
import { UseQueryResult } from "@tanstack/react-query";
import { ReactElement, ReactNode } from "react";
import { useFhirUIContext } from "../context.js";

export interface FhirTableProps<
  TResource extends AnyResource = AnyResource,
  TRow = TResource,
  TRendererProps = any
> {
  query: UseQueryResult<BundleNavigator<Retrieved<TResource>>>;
  columns: FhirTableColumn<TResource, TRow>[];
  querySelect?: (
    navigator: BundleNavigator<Retrieved<TResource>>
  ) => TRow[] | undefined;
  loading?: boolean | null | undefined;
  rendererProps?: TRendererProps;
}

export interface FhirTableColumn<TResource extends AnyResource, TRow> {
  key: string;
  title: ReactNode;
  render: (
    row: TRow,
    index: number,
    data: BundleNavigator<Retrieved<TResource>>
  ) => ReactNode;
}

export function FhirTable<
  TResource extends AnyResource,
  TRow = TResource,
  TRendererProps = any
>(
  props: FhirTableProps<TResource, TRow, TRendererProps>
): ReactElement<any, any> | null {
  const { render } = useFhirUIContext();

  const rows =
    props.query.data && props.querySelect
      ? props.querySelect(props.query.data)
      : props.query.data?.searchMatch();

  return render("FhirTable", {
    ...props,
    loading: props.loading ?? props.query.isLoading,
    rows,
  });
}

export interface FhirTableRendererProps<TRendererProps = any>
  extends FhirTableProps<AnyResource, unknown, TRendererProps> {
  loading: boolean;
  rows: unknown[] | undefined;
}

export type FhirTableRenderer = (
  props: FhirTableRendererProps
) => ReactElement | null;
