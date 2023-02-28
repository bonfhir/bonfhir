import {
  FhirDataTypeAdapter,
  ValueSetExpandOperationResult,
} from "@bonfhir/core/r4b";
import { UseQueryResult } from "@tanstack/react-query";
import { FieldHelperProps, FieldInputProps, FieldMetaProps } from "formik";
import { ReactElement, ReactNode } from "react";
import { FhirValueProps } from "./display";
import { FhirFieldResourcePropsOptions } from "./forms/fields/resource";
import { FhirFieldStringPropsOptions } from "./forms/fields/string";

/**
 * Renderer interface for FHIR UI Components.
 *
 * The actual rendering on-screen is delegated to implementations of this interface.
 */
export interface FhirUIComponentsRenderer {
  /**
   * Renderer to display a empty error message.
   */
  empty: <TRendererProps = unknown>(
    props: EmptyProps<TRendererProps>
  ) => ReactElement | null;

  /**
   * Renderer to display a panel showing an unexpected/technical error.
   */
  errorPanel: <TRendererProps = unknown>(
    props: ErrorPanelProps<TRendererProps>
  ) => ReactElement | null;

  /**
   * Renderer for an Input component.
   */
  input: <TRendererProps = unknown>(
    props: InputProps<TRendererProps>
  ) => ReactElement | null;

  /**
   * Renderer to display a panel showing an unexpected/technical error.
   */
  loader: <TRendererProps = unknown>(
    props: LoaderProps<TRendererProps>
  ) => ReactElement | null;

  resource: <TRendererProps = unknown>(
    props: ResourceProps<TRendererProps>
  ) => ReactElement | null;

  table: <TRendererProps = unknown, TColumnRenderProps = unknown>(
    props: TableProps<TRendererProps, TColumnRenderProps>
  ) => ReactElement | null;

  /**
   * Renderer used to render <FhirValue />.
   * This one is optional - <FhirValue /> will renderer to a string if not provided.
   */
  value?:
    | (<TRendererProps = unknown>(
        props: ValueRendererProps<TRendererProps>
      ) => ReactElement | null)
    | null
    | undefined;
}

export type EmptyProps<TRendererProps = unknown> = TRendererProps & {
  query?: UseQueryResult | Array<UseQueryResult> | undefined;
};

export type ErrorPanelProps<TRendererProps = unknown> = TRendererProps & {
  query?: UseQueryResult | Array<UseQueryResult> | undefined;
  error: unknown;
};

export type InputProps<TRendererProps = unknown> = TRendererProps & {
  options?: FhirFieldStringPropsOptions | null | undefined;
} & {
  field: FieldInputProps<string>;
  meta: FieldMetaProps<string>;
  helpers: FieldHelperProps<string>;
};

export type LoaderProps<TRendererProps = unknown> = TRendererProps & {
  query?: UseQueryResult | Array<UseQueryResult> | undefined;
};

export type ResourceProps<TRendererProps = unknown> = TRendererProps & {
  options: FhirFieldResourcePropsOptions;
} & {
  field: FieldInputProps<string>;
  meta: FieldMetaProps<string>;
  helpers: FieldHelperProps<string>;
} & {
  onSearch?: (value: string) => void;
  items: Array<{ label: string; value: string }>;
};

export type TableProps<TRendererProps, TColumnRenderProps> = TRendererProps & {
  query: UseQueryResult;
  data: readonly unknown[] | undefined;
  columns: readonly TableColum<TColumnRenderProps>[];
  total: number;
  pageSize: number;
  onPageChange: (direction: "next" | "previous") => void;
  sort: string | null | undefined;
  onSortChange: (sort: string) => void;
};

export type TableColum<TRendererProps> = TRendererProps & {
  key: string;
  title: string;
  sortable: boolean;
  render: (rowIndex: number) => ReactNode;
};

export type ValueRendererProps<TRendererProps = unknown> = TRendererProps &
  FhirValueProps & {
    /**
     * The current {@link FhirDataTypeAdapter} configured in the context.
     */
    dataTypeAdapter: FhirDataTypeAdapter;

    /**
     * The ValueSet expansion query, if the `valueSetExpand` option was passed to <FhirValue />
     */
    valueSetExpandQuery: UseQueryResult<ValueSetExpandOperationResult>;

    /**
     * The formatted string using the options, if you want to use it directly.
     */
    formatted: string | undefined;
  };
