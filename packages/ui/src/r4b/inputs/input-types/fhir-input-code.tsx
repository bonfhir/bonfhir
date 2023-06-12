import { ValueSet, ValueSetExpansionContains } from "@bonfhir/core/r4b";
import { UseQueryResult } from "@tanstack/react-query";
import { ReactElement } from "react";
import { useFhirUIContext } from "../../context.js";
import { FhirInputCommonProps, useFhirInputTerminologyData } from "./common.js";

export type FhirInputCodeProps<TRendererProps = any> =
  FhirInputCodeCommonProps<TRendererProps> & FhirInputCodeSelectProps;

export interface FhirInputCodeSelectProps {
  mode: "select" | "radio" | "segmented";
  source: string | UseQueryResult<ValueSet> | Array<ValueSetExpansionContains>;
}

export interface FhirInputCodeCommonProps<TRendererProps = any>
  extends FhirInputCommonProps {
  type: "code";
  placeholder?: string | null | undefined;
  fhirClient?: string | null | undefined;
  filter?: ((value: ValueSetExpansionContains) => boolean) | null | undefined;
  sort?: (a: ValueSetExpansionContains, b: ValueSetExpansionContains) => number;
  value?: string | null | undefined;
  onChange?: (value: string | undefined) => void;
  rendererProps?: TRendererProps;
}

export function FhirInputCode<TRendererProps = any>(
  props: FhirInputCodeProps<TRendererProps>
): ReactElement | null {
  const { render } = useFhirUIContext();

  if (["select", "radio", "segmented"].includes(props.mode)) {
    const { data, loading } = useFhirInputTerminologyData(props);
    return render<FhirInputCodeRendererSelectProps>("FhirInputCode", {
      data,
      loading,
      ...props,
    });
  }

  throw new TypeError(`Unsupported mode ${props.mode}.`);
}

export type FhirInputCodeRendererProps<TRendererProps = any> =
  FhirInputCodeRendererCommonProps<TRendererProps> &
    FhirInputCodeRendererSelectProps;

export interface FhirInputCodeRendererCommonProps<TRendererProps = any>
  extends FhirInputCodeCommonProps<TRendererProps> {}

export interface FhirInputCodeRendererSelectProps
  extends FhirInputCodeSelectProps {
  data: Array<ValueSetExpansionContains>;
  loading: boolean;
}

export type FhirInputCodeRenderer = (
  props: FhirInputCodeRendererProps
) => ReactElement | null;
