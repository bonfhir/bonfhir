import { useFhirQueryContext } from "@bonfhir/query/r5";
import { QueryKey } from "@tanstack/react-query";
import { useState } from "react";

export interface UseFhirSearchControllerValue<
  TSort extends string = string,
  TSearch = unknown
> {
  pageNumber: number;
  pageSize: number;
  pageUrl: string | undefined;
  onPageChange: (pageUrl: string | undefined, pageNumber: number) => void;
  sort: TSort;
  onSortChange: (sort: string) => void;
  search: TSearch | undefined;
  onSearch: (search: TSearch) => void;
}

export interface UseFhirSearchControllerState<
  TSort extends string = string,
  TSearch = unknown
> {
  pageNumber: number;
  pageUrl: string | undefined;
  sort?: TSort | undefined;
  search?: TSearch | undefined;
}

export interface UseFhirSearchControllerArgs<
  TSort extends string = string,
  TSearch = unknown
> {
  pageSize?: number | null | undefined;
  defaultSort?: TSort | null | undefined;
  defaultSearch?: TSearch | null | undefined;
  stateManager?:
    | UseFhirSearchControllerStateManager<TSort, TSearch>
    | null
    | undefined;
}

export type UseFhirSearchControllerStateManager<
  TSort extends string = string,
  TSearch = unknown
> = [
  UseFhirSearchControllerState<TSort, TSearch> | undefined,
  (value: UseFhirSearchControllerState<TSort, TSearch>) => void
];

export function useFhirSearchController<
  TSort extends string = string,
  TSearch = unknown
>(
  args: UseFhirSearchControllerArgs<TSort, TSearch> | null | undefined
): UseFhirSearchControllerValue<TSort, TSearch> {
  const [state, setState] = useState<
    UseFhirSearchControllerState<TSort, TSearch> | undefined
  >(args?.stateManager?.[0]);

  const updateState = (
    newState: Partial<UseFhirSearchControllerState<TSort, TSearch>>
  ) => {
    setState((prevState) => {
      const newValue = {
        ...prevState,
        pageNumber: 1,
        pageUrl: "",
        ...newState,
      };

      args?.stateManager?.[1]?.(newValue);

      return newValue;
    });
  };

  return {
    pageNumber: state?.pageNumber || 1,
    pageSize: args?.pageSize || 20,
    pageUrl: state?.pageUrl || undefined,
    onPageChange: (pageUrl, pageNumber) => updateState({ pageNumber, pageUrl }),
    sort: state?.sort || args?.defaultSort || ("-_lastUpdated" as TSort),
    onSortChange: (sort) => updateState({ sort: sort as TSort }),
    search: state?.search || args?.defaultSearch || undefined,
    onSearch: (search) => updateState({ search }),
  };
}

export function useQueryStateManager<
  TSort extends string = string,
  TSearch = unknown
>(queryKey: QueryKey): UseFhirSearchControllerStateManager<TSort, TSearch> {
  const { queryClient } = useFhirQueryContext();

  return [
    queryClient.getQueryData(queryKey),
    (value) => {
      queryClient.setQueryData(queryKey, value);
    },
  ];
}

export function useURLSearchParamsStateManager<
  TSort extends string = string,
  TSearch = unknown
>(
  scope: string,
  [urlSearchParams, setURLSearchParams]: [
    URLSearchParams,
    (value: Record<string, string | string[]> | URLSearchParams) => void
  ]
): UseFhirSearchControllerStateManager<TSort, TSearch> {
  return [
    urlSearchParams.has(scope)
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        JSON.parse(atob(urlSearchParams.get(scope)!))
      : undefined,
    (value) => {
      setURLSearchParams({
        ...Object.fromEntries(urlSearchParams),
        [scope]: btoa(JSON.stringify(value)),
      });
    },
  ];
}
