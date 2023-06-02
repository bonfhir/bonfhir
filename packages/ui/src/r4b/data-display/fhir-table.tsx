import { AnyResource, BundleNavigator, Retrieved } from "@bonfhir/core/r4b";
import { UseQueryResult } from "@tanstack/react-query";
import { ReactElement } from "react";
import { useFhirUIContext } from "../context.js";

export interface FhirTableProps<
  TResource extends AnyResource,
  TRendererProps = any
> {
  query: UseQueryResult<BundleNavigator<Retrieved<TResource>>>;
  loading?: boolean | null | undefined;
  rendererProps?: TRendererProps;
}

export function FhirTable<TResource extends AnyResource, TRendererProps = any>(
  props: FhirTableProps<TResource, TRendererProps>
): ReactElement<any, any> | null {
  const { render } = useFhirUIContext();

  return render("FhirTable", {
    ...props,
    loading: props.loading ?? props.query.isLoading,
  });
}

export interface FhirTableRendererProps<TRendererProps = any>
  extends FhirTableProps<AnyResource, TRendererProps> {
  loading: boolean;
}

export type FhirTableRenderer = (
  props: FhirTableRendererProps
) => ReactElement | null;
