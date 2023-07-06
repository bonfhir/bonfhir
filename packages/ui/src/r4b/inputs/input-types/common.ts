import {
  ValueSet,
  ValueSetExpandOperation,
  ValueSetExpansionContains,
  compareBy,
} from "@bonfhir/core/r4b";
import { useFhirExecute } from "@bonfhir/query/r4b";
import { UseQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";

export interface FhirInputCommonProps {
  label?: ReactNode | null | undefined;
  description?: ReactNode | null | undefined;
  error?: ReactNode | null | undefined;
  required?: boolean | null | undefined;
  disabled?: boolean | null | undefined;
}

export interface UseFhirInputTerminologyDataProps {
  source: string | UseQueryResult<ValueSet> | Array<ValueSetExpansionContains>;
  fhirClient?: string | null | undefined;
  filter?: ((value: ValueSetExpansionContains) => boolean) | null | undefined;
  sort?: (a: ValueSetExpansionContains, b: ValueSetExpansionContains) => number;
}

export interface UseFhirInputTerminologyDataResult {
  data: Array<ValueSetExpansionContains>;
  loading: boolean;
}

export function useFhirInputTerminologyData(
  props: UseFhirInputTerminologyDataProps,
): UseFhirInputTerminologyDataResult {
  if (Array.isArray(props.source)) {
    return {
      data: props.source,
      loading: false,
    };
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
    let data: Array<ValueSetExpansionContains> = [];
    data = selectQuery.data?.expansion?.contains || [];
    if (props.filter) {
      data = data.filter((element) => props.filter?.(element));
    }
    data = props.sort
      ? data.sort((a, b) => props.sort?.(a, b) || 0)
      : data.sort(compareBy("display"));

    return {
      data,
      loading: selectQuery.isLoading,
    };
  }
}
