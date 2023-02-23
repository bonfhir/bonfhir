import { useFhirQueryContext } from "@bonfhir/fhir-query/r4b";
import { useState } from "react";

export interface UseFhirTableValue {
  pageNumber: number;
  pageSize: number;
  pageUrl: string | undefined;
  onPageChange: (pageUrl: string | undefined, pageNumber: number) => void;
}

export interface UseFhirTableState {
  pageNumber: number;
  pageUrl: string | undefined;
}

export interface UseFhirTableArgs {
  pageSize?: number | null | undefined;
  restoreKey?: string | null | undefined;
}

export function useFhirTable(
  args?: UseFhirTableArgs | null | undefined
): UseFhirTableValue {
  const { queryClient } = useFhirQueryContext();

  const [state, setState] = useState<UseFhirTableState>(
    args?.restoreKey &&
      queryClient.getQueryData([
        "useFhirTable",
        "restoreState",
        args?.restoreKey,
      ])
      ? queryClient.getQueryData([
          "useFhirTable",
          "restoreState",
          args?.restoreKey,
        ]) ?? {
          pageNumber: 1,
          pageUrl: "",
        }
      : {
          pageNumber: 1,
          pageUrl: "",
        }
  );

  return {
    pageNumber: state?.pageNumber || 1,
    pageSize: args?.pageSize || 20,
    pageUrl: state?.pageUrl || undefined,
    onPageChange: (pageUrl, pageNumber) => {
      if (args?.restoreKey) {
        queryClient.setQueryData(
          ["useFhirTable", "restoreState", args?.restoreKey],
          {
            pageNumber,
            pageUrl,
          }
        );
      }
      setState({
        pageNumber,
        pageUrl,
      });
    },
  };
}
