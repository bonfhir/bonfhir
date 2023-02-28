import { useFhirQueryContext } from "@bonfhir/fhir-query/r4b";
import { QueryKey } from "@tanstack/react-query";
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
  sort?: TSort | undefined;
  search?: TSearch | undefined;
}

export interface UseFhirTableArgs<
  TSort extends string = string,
  TSearch = unknown
> {
  pageSize?: number | null | undefined;
  defaultSort?: TSort | null | undefined;
  defaultSearch?: TSearch | null | undefined;
  stateManager?: FhirTableStateManager<TSort, TSearch> | null | undefined;
}

export type FhirTableStateManager<
  TSort extends string = string,
  TSearch = unknown
> = [
  UseFhirTableState<TSort, TSearch> | undefined,
  (value: UseFhirTableState<TSort, TSearch>) => void
];

export function useFhirTable<TSort extends string = string, TSearch = unknown>(
  args?: UseFhirTableArgs<TSort, TSearch> | null | undefined
): UseFhirTableValue<TSort, TSearch> {
  const [state, setState] = useState<
    UseFhirTableState<TSort, TSearch> | undefined
  >(args?.stateManager?.[0]);

  const updateState = (
    newState: Partial<UseFhirTableState<TSort, TSearch>>
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
    sort: state?.sort || args?.defaultSort || undefined,
    onSortChange: (sort) => updateState({ sort: sort as TSort }),
    search: state?.search || args?.defaultSearch || undefined,
    onSearch: (search) => updateState({ search }),
  };
}

export function useQueryStateManager<
  TSort extends string = string,
  TSearch = unknown
>(queryKey: QueryKey): FhirTableStateManager<TSort, TSearch> {
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
): FhirTableStateManager<TSort, TSearch> {
  return [
    urlSearchParams.has(scope)
      ? JSON.parse(atob(urlSearchParams.get(scope)!))
      : undefined,
    (value) => {
      setURLSearchParams({
        ...Object.fromEntries(urlSearchParams),
        [scope]: btoa(JSON.stringify(value)),
      });
    },
  ];
}
