import { useState } from "react";

export interface UseFhirTableValue {
  pageNumber: number;
  pageSize: number;
  pageUrl: string | undefined;
  onPageChange: (pageUrl: string | undefined) => void;
}

export interface UseFhirTableState {
  pageNumber: number;
  pageUrl: string | undefined;
}

export interface UseFhirTableArgs {
  scope?: string | null | undefined;
  pageSize?: number | null | undefined;
  state?: ReturnType<typeof useState<UseFhirTableState>> | null | undefined;
}

export function useFhirTable(
  args?: UseFhirTableArgs | null | undefined
): UseFhirTableValue {
  const [state, setState] = args?.state
    ? args.state
    : useState<UseFhirTableState>({ pageNumber: 1, pageUrl: "" });

  return {
    pageNumber: state?.pageNumber || 1,
    pageSize: args?.pageSize || 20,
    pageUrl: state?.pageUrl || undefined,
    onPageChange: (pageUrl) => {
      setState((prevState: UseFhirTableState | undefined) => ({
        ...(prevState || { pageNumber: 1 }),
        pageUrl,
      }));
    },
  };
}
