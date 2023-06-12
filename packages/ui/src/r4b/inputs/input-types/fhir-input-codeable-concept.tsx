import {
  CodeableConcept,
  ValueSet,
  ValueSetExpansionContains,
} from "@bonfhir/core/r4b";
import { UseQueryResult } from "@tanstack/react-query";
import { ReactElement } from "react";
import { useFhirUIContext } from "../../context.js";
import { FhirInputCommonProps, useFhirInputTerminologyData } from "./common.js";

export type FhirInputCodeableConceptProps<TRendererProps = any> =
  FhirInputCodeableConceptCommonProps<TRendererProps> &
    FhirInputCodeableConceptSelectProps;

export interface FhirInputCodeableConceptSelectProps {
  mode: "select" | "radio" | "segmented";
  source: string | UseQueryResult<ValueSet> | Array<ValueSetExpansionContains>;
}

export interface FhirInputCodeableConceptCommonProps<TRendererProps = any>
  extends FhirInputCommonProps {
  type: "CodeableConcept";
  placeholder?: string | null | undefined;
  fhirClient?: string | null | undefined;
  filter?: ((value: ValueSetExpansionContains) => boolean) | null | undefined;
  sort?: (a: ValueSetExpansionContains, b: ValueSetExpansionContains) => number;
  value?: CodeableConcept | null | undefined;
  onChange?: (value: CodeableConcept | undefined) => void;
  rendererProps?: TRendererProps;
}

export function FhirInputCodeableConcept<TRendererProps = any>(
  props: FhirInputCodeableConceptProps<TRendererProps>
): ReactElement | null {
  const { render } = useFhirUIContext();

  if (["select", "radio", "segmented"].includes(props.mode)) {
    const { data, loading } = useFhirInputTerminologyData(props);
    return render<FhirInputCodeableConceptRendererSelectProps>(
      "FhirInputCode",
      {
        data,
        loading,
        ...props,
      }
    );
  }

  throw new TypeError(`Unsupported mode ${props.mode}.`);
}

export type FhirInputCodeableConceptRendererProps<TRendererProps = any> =
  FhirInputCodeableConceptRendererCommonProps<TRendererProps> &
    FhirInputCodeableConceptRendererSelectProps;

export interface FhirInputCodeableConceptRendererCommonProps<
  TRendererProps = any
> extends FhirInputCodeableConceptCommonProps<TRendererProps> {}

export interface FhirInputCodeableConceptRendererSelectProps
  extends FhirInputCodeableConceptSelectProps {
  data: Array<ValueSetExpansionContains>;
  loading: boolean;
}

export type FhirInputCodeableConceptRenderer = (
  props: FhirInputCodeableConceptRendererProps
) => ReactElement | null;
