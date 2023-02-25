import { useFhirQueryContext } from "@bonfhir/fhir-query/r4b";
import { useEffect, useState } from "react";
import { useMemoCompare } from "./use-memo-compare";

export interface UseFhirTableValue<
  TSort extends string = string,
  TSearchParams = unknown
> {
  pageNumber: number;
  pageSize: number;
  pageUrl: string | undefined;
  onPageChange: (pageUrl: string | undefined, pageNumber: number) => void;
  sort: TSort | undefined;
  onSortChange: (sort: string) => void;
  searchParams: TSearchParams | undefined;
}

export interface UseFhirTableState<
  TSort extends string = string,
  TSearchParams = unknown
> {
  pageNumber: number;
  pageUrl: string | undefined;
  sort: TSort | undefined;
  searchParams: TSearchParams | undefined;
}

export interface UseFhirTableArgs<
  TSort extends string = string,
  TSearchParams = unknown
> {
  key?: string | null | undefined;
  pageSize?: number | null | undefined;
  defaultSort?: TSort | null | undefined;
  searchParams?: TSearchParams | null | undefined;
}

export function useFhirTable<
  TSort extends string = string,
  TSearchParams = unknown
>(
  args?: UseFhirTableArgs<TSort, TSearchParams> | null | undefined
): UseFhirTableValue<TSort, TSearchParams> {
  const { queryClient } = useFhirQueryContext();

  const [state, setState] = useState<UseFhirTableState<TSort, TSearchParams>>(
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
          searchParams: args.searchParams || undefined,
        }
      : {
          pageNumber: 1,
          pageUrl: "",
          sort: args?.defaultSort || undefined,
          searchParams: args?.searchParams || undefined,
        }
  );

  const searchParams = useMemoCompare(args?.searchParams || undefined);

  useEffect(() => {
    setState((prevState) => {
      if (args?.key) {
        queryClient.setQueryData(["useFhirTable", "restoreState", args?.key], {
          ...prevState,
          searchParams,
          pageNumber: 1,
          pageUrl: "",
        });
      }

      return {
        ...prevState,
        searchParams,
        pageNumber: 1,
        pageUrl: "",
      };
    });
  }, [searchParams]);

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
    searchParams,
  };
}
