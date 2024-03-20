import {
  CodeableConcept,
  Coding,
  ValueSet,
  ValueSetExpansionContains,
  compareBy,
} from "@bonfhir/core/r5";
import { useFhirExecute } from "@bonfhir/query/r5";
import { UseQueryResult } from "@tanstack/react-query";
import { ReactElement } from "react";
import { useFhirUIContext } from "../../context";
import { FhirError } from "../../index";
import { FhirInputCommonProps } from "./common";

export type FhirInputTerminologyProps<TRendererProps = any> =
  FhirInputCommonProps & {
    placeholder?: string | null | undefined;
    fhirClient?: string | null | undefined;
    filter?: ((value: ValueSetExpansionContains) => boolean) | null | undefined;
    sort?:
      | "original"
      | "display"
      | ((
          a: ValueSetExpansionContains,
          b: ValueSetExpansionContains,
        ) => number);
    className?: string | undefined;
    style?: Record<string, any> | undefined;
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
          ? useFhirExecute<ValueSet>(
              {
                operation: "$expand",
                resourceType: "ValueSet",
                parameters: [
                  {
                    name: "url",
                    valueUri: props.source,
                  },
                ],
                affectsState: false,
              },
              {
                fhirClient: props.fhirClient,
                query: {
                  gcTime: Number.POSITIVE_INFINITY,
                  staleTime: Number.POSITIVE_INFINITY,
                },
              },
            )
          : props.source;

      if (selectQuery.error) {
        return <FhirError error={selectQuery.error} />;
      }

      data = selectQuery.data?.expansion?.contains || [];
      if (props.filter) {
        data = data.filter((element) => props.filter?.(element));
      }

      switch (props.sort) {
        case "original": {
          break;
        }
        case "display":
        case undefined:
        // eslint-disable-next-line unicorn/no-null, no-fallthrough
        case null: {
          data = [...data].sort(compareBy("display"));
          break;
        }
        default: {
          if (typeof props.sort === "function") {
            data = [...data].sort(
              (a, b) =>
                (
                  props.sort as (
                    a: ValueSetExpansionContains,
                    b: ValueSetExpansionContains,
                  ) => number
                )?.(a, b) || 0,
            );
          }
          break;
        }
      }
    }

    return render<FhirInputTerminologyRendererProps>("FhirInputTerminology", {
      data,
      loading,
      ...props,
    });
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
