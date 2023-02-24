import { useFhirQueryContext } from "@bonfhir/fhir-query/r4b";
import { useState } from "react";

export interface UseFhirTableValue<TSort extends string = string> {
  pageNumber: number;
  pageSize: number;
  pageUrl: string | undefined;
  onPageChange: (pageUrl: string | undefined, pageNumber: number) => void;
  sort: TSort | undefined;
  onSortChange: (sort: string) => void;
}

export interface UseFhirTableState<TSort extends string = string> {
  pageNumber: number;
  pageUrl: string | undefined;
  sort: TSort | undefined;
}

export interface UseFhirTableArgs<TSort extends string = string> {
  key?: string | null | undefined;
  pageSize?: number | null | undefined;
  defaultSort?: TSort | null | undefined;
}

export function useFhirTable<TSort extends string = string>(
  args?: UseFhirTableArgs<TSort> | null | undefined
): UseFhirTableValue<TSort> {
  const { queryClient } = useFhirQueryContext();

  const [state, setState] = useState<UseFhirTableState<TSort>>(
    args?.key &&
      queryClient.getQueryData(["useFhirTable", "restoreState", args?.key])
      ? queryClient.getQueryData([
          "useFhirTable",
          "restoreState",
          args?.key,
        ]) ?? {
          pageNumber: 1,
          pageUrl: "",
          sort: args?.defaultSort || undefined,
        }
      : {
          pageNumber: 1,
          pageUrl: "",
          sort: args?.defaultSort || undefined,
        }
  );

  return {
    pageNumber: state?.pageNumber || 1,
    pageSize: args?.pageSize || 20,
    pageUrl: state?.pageUrl || undefined,
    onPageChange: (pageUrl, pageNumber) => {
      setState((prevState) => {
        if (args?.key) {
          queryClient.setQueryData(
            ["useFhirTable", "restoreState", args?.key],
            {
              ...prevState,
              pageNumber,
              pageUrl,
            }
          );
        }

        return {
          ...prevState,
          pageNumber,
          pageUrl,
        };
      });
    },
    sort: state?.sort || undefined,
    onSortChange: (sort) => {
      setState((prevState) => {
        if (args?.key) {
          queryClient.setQueryData(
            ["useFhirTable", "restoreState", args?.key],
            {
              ...prevState,
              sort: sort as TSort,
              pageNumber: 1,
              pageUrl: "",
            }
          );
        }

        return {
          ...prevState,
          sort: sort as TSort,
          pageNumber: 1,
          pageUrl: "",
        };
      });
    },
  };
}
