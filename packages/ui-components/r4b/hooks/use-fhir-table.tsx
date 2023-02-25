import { useFhirQueryContext } from "@bonfhir/fhir-query/r4b";
import { useState } from "react";

export interface UseFhirTableValue<
  TSort extends string = string,
  TSearch = unknown
> {
  pageNumber: number;
  pageSize: number;
  pageUrl: string | undefined;
  onPageChange: (pageUrl: string | undefined, pageNumber: number) => void;
  sort: TSort | undefined;
  onSortChange: (sort: string) => void;
  search: TSearch | undefined;
  onSearch: (search: TSearch) => void;
}

export interface UseFhirTableState<
  TSort extends string = string,
  TSearch = unknown
> {
  pageNumber: number;
  pageUrl: string | undefined;
  sort: TSort | undefined;
  search: TSearch | undefined;
}

export interface UseFhirTableArgs<
  TSort extends string = string,
  TSearch = unknown
> {
  key?: string | null | undefined;
  pageSize?: number | null | undefined;
  defaultSort?: TSort | null | undefined;
  defaultSearch?: TSearch | null | undefined;
}

export function useFhirTable<TSort extends string = string, TSearch = unknown>(
  args?: UseFhirTableArgs<TSort, TSearch> | null | undefined
): UseFhirTableValue<TSort, TSearch> {
  const { queryClient } = useFhirQueryContext();

  const [state, setState] = useState<UseFhirTableState<TSort, TSearch>>(
    args?.key &&
      queryClient.getQueryData(["useFhirTable", "restoreState", args.key])
      ? queryClient.getQueryData([
          "useFhirTable",
          "restoreState",
          args.key,
        ]) ?? {
          pageNumber: 1,
          pageUrl: "",
          sort: args.defaultSort || undefined,
          search: args.defaultSearch || undefined,
        }
      : {
          pageNumber: 1,
          pageUrl: "",
          sort: args?.defaultSort || undefined,
          search: args?.defaultSearch || undefined,
        }
  );

  const updateState = (
    newState: Partial<UseFhirTableState<TSort, TSearch>>
  ) => {
    setState((prevState) => {
      if (args?.key) {
        queryClient.setQueryData(["useFhirTable", "restoreState", args?.key], {
          ...prevState,
          pageNumber: 1,
          pageUrl: "",
          ...newState,
        });
      }

      return {
        ...prevState,
        pageNumber: 1,
        pageUrl: "",
        ...newState,
      };
    });
  };

  return {
    pageNumber: state?.pageNumber || 1,
    pageSize: args?.pageSize || 20,
    pageUrl: state?.pageUrl || undefined,
    onPageChange: (pageUrl, pageNumber) => updateState({ pageNumber, pageUrl }),
    sort: state?.sort || undefined,
    onSortChange: (sort) => updateState({ sort: sort as TSort }),
    search: state?.search || undefined,
    onSearch: (search) => updateState({ search }),
  };
}
