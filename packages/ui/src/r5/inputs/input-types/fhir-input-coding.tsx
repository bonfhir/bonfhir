import { Coding, ValueSet, ValueSetExpansionContains } from "@bonfhir/core/r5";
import { UseQueryResult } from "@tanstack/react-query";
import { ReactElement } from "react";
import { useFhirUIContext } from "../../context.js";
import { FhirInputCommonProps, useFhirInputTerminologyData } from "./common.js";

export type FhirInputCodingProps<TRendererProps = any> =
  FhirInputCodingCommonProps<TRendererProps> & FhirInputCodingSelectProps;

export interface FhirInputCodingSelectProps {
  mode: "select" | "radio" | "segmented";
  source: string | UseQueryResult<ValueSet> | Array<ValueSetExpansionContains>;
}

export interface FhirInputCodingCommonProps<TRendererProps = any>
  extends FhirInputCommonProps {
  type: "Coding";
  placeholder?: string | null | undefined;
  fhirClient?: string | null | undefined;
  filter?: ((value: ValueSetExpansionContains) => boolean) | null | undefined;
  sort?: (a: ValueSetExpansionContains, b: ValueSetExpansionContains) => number;
  value?: Coding | null | undefined;
  onChange?: (value: Coding | undefined) => void;
  rendererProps?: TRendererProps;
}

export function FhirInputCoding<TRendererProps = any>(
  props: FhirInputCodingProps<TRendererProps>
): ReactElement | null {
  const { render } = useFhirUIContext();

  if (["select", "radio", "segmented"].includes(props.mode)) {
    const { data, loading } = useFhirInputTerminologyData(props);
    return render<FhirInputCodingRendererSelectProps>("FhirInputCode", {
      data,
      loading,
      ...props,
    });
  }

  throw new TypeError(`Unsupported mode ${props.mode}.`);
}

export type FhirInputCodingRendererProps<TRendererProps = any> =
  FhirInputCodingRendererCommonProps<TRendererProps> &
    FhirInputCodingRendererSelectProps;

export interface FhirInputCodingRendererCommonProps<TRendererProps = any>
  extends FhirInputCodingCommonProps<TRendererProps> {}

export interface FhirInputCodingRendererSelectProps
  extends FhirInputCodingSelectProps {
  data: Array<ValueSetExpansionContains>;
  loading: boolean;
}

export type FhirInputCodingRenderer = (
  props: FhirInputCodingRendererProps
) => ReactElement | null;
