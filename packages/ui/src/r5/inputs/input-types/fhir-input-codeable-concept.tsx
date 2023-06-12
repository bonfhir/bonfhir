import {
  CodeableConcept,
  ValueSet,
  ValueSetExpandOperation,
  ValueSetExpansionContains,
} from "@bonfhir/core/r5";
import { useFhirExecute } from "@bonfhir/query/r5";
import { UseQueryResult } from "@tanstack/react-query";
import { ReactElement } from "react";
import { useFhirUIContext } from "../../context.js";
import { FhirInputCommonProps } from "./common.js";

export type FhirInputCodeableConceptProps<TRendererProps = any> =
  FhirInputCodeableConceptCommonProps<TRendererProps> &
    FhirInputCodeableConceptSelectProps;

export interface FhirInputCodeableConceptSelectProps {
  mode: "select";
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

  if (props.mode === "select") {
    let data: Array<ValueSetExpansionContains> = [];
    let loading = false;
    if (Array.isArray(props.source)) {
      data = props.source;
    } else {
      const selectQuery =
        typeof props.source === "string"
          ? useFhirExecute(
              new ValueSetExpandOperation({
                url: props.source,
              }),
              {
                fhirClient: props.fhirClient,
                query: {
                  cacheTime: Number.POSITIVE_INFINITY,
                  staleTime: Number.POSITIVE_INFINITY,
                },
              }
            )
          : props.source;
      data = selectQuery.data?.expansion?.contains || [];
      if (props.filter) {
        data = data.filter((element) => props.filter?.(element));
      }
      data = props.sort
        ? data.sort((a, b) => props.sort?.(a, b) || 0)
        : data.sort(sortContains);
      loading = selectQuery.isLoading;
    }

    return render("FhirInputCodeableConcept", { data, loading, ...props });
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

function sortContains(
  a: ValueSetExpansionContains,
  b: ValueSetExpansionContains
) {
  if (a.display && b.display) {
    if (a.display > b.display) {
      return 1;
    } else if (a.display < b.display) {
      return -1;
    }
  }
  return 0;
}
