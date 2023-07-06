import {
  CodeableConcept,
  Coding,
  ValueSet,
  ValueSetExpandOperation,
  ValueSetExpansionContains,
  compareBy,
} from "@bonfhir/core/r5";
import { useFhirExecute } from "@bonfhir/query/r5";
import { UseQueryResult } from "@tanstack/react-query";
import { ReactElement } from "react";
import { useFhirUIContext } from "../../context.js";
import { FhirInputCommonProps } from "./common.js";

export type FhirInputTerminologyProps<TRendererProps = any> =
  FhirInputCommonProps & {
    placeholder?: string | null | undefined;
    fhirClient?: string | null | undefined;
    filter?: ((value: ValueSetExpansionContains) => boolean) | null | undefined;
    sort?: (
      a: ValueSetExpansionContains,
      b: ValueSetExpansionContains,
    ) => number;
    value?: string | null | undefined;
    onChange?: (value: string | undefined) => void;
    rendererProps?: TRendererProps;
  } & {
    mode?: "select" | "radio" | "segmented" | null | undefined;
    source:
      | string
      | UseQueryResult<ValueSet>
      | Array<ValueSetExpansionContains>;
  } & (
      | {
          type: "code";
          value?: string | null | undefined;
          onChange?: (value: string | undefined) => void;
        }
      | {
          type: "Coding";
          value?: Coding | null | undefined;
          onChange?: (value: Coding | undefined) => void;
        }
      | {
          type: "CodeableConcept";
          value?: CodeableConcept | null | undefined;
          onChange?: (value: CodeableConcept | undefined) => void;
        }
    );

export function FhirInputTerminology<TRendererProps = any>(
  props: FhirInputTerminologyProps<TRendererProps>,
): ReactElement | null {
  const { render } = useFhirUIContext();

  if (!props.mode || ["select", "radio", "segmented"].includes(props.mode)) {
    let data: Array<ValueSetExpansionContains> = [];
    let loading = false;
    if (Array.isArray(props.source)) {
      (data = props.source), (loading = false);
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
              },
            )
          : props.source;
      data = selectQuery.data?.expansion?.contains || [];
      if (props.filter) {
        data = data.filter((element) => props.filter?.(element));
      }
      data = props.sort
        ? data.sort((a, b) => props.sort?.(a, b) || 0)
        : data.sort(compareBy("display"));

      return render<FhirInputTerminologyRendererProps>("FhirInputTerminology", {
        data,
        loading,
        ...props,
      });
    }
  }

  throw new TypeError(`Unsupported mode ${props.mode}.`);
}

export type FhirInputTerminologyRendererProps<TRendererProps = any> =
  FhirInputTerminologyProps<TRendererProps> & {
    mode?: "select" | "radio" | "segmented" | null | undefined;
    data: Array<ValueSetExpansionContains>;
    loading: boolean;
  };

export type FhirInputTerminologyRenderer = (
  props: FhirInputTerminologyRendererProps,
) => ReactElement | null;
