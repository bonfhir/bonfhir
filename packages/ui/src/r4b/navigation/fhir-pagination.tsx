import { BundleNavigator, formatWithTokens } from "@bonfhir/core/r4b";
import { UseQueryResult } from "@tanstack/react-query";
import { ReactElement } from "react";
import { useFhirUIContext } from "../context.js";

export interface FhirPaginationProps<TRendererProps = any> {
  /** Starts at 1 */
  pageNumber: number;
  pageSize: number;
  pageUrl: string | undefined;
  onPageChange: (pageUrl: string | undefined, pageNumber: number) => void;

  query: UseQueryResult<BundleNavigator<any>>;

  /**
   * The text to display. Defaults to "{{pageFirstEntry}}-{{pageLastEntry}} of {{total}}"
   * Available tokens:
   *  - pageNumber
   *  - pageSize
   *  - total
   *  - pageFirstEntry
   *  - pageLastEntry
   *  - totalPages
   */
  textTemplate?: string | null | undefined;
  rendererProps?: TRendererProps;
}

export function FhirPagination<TRendererProps = any>(
  props: FhirPaginationProps<TRendererProps>
): ReactElement | null {
  const { formatter, render } = useFhirUIContext();
  const total = props.query.data?.total ?? 0;
  const totalPages = Math.ceil(total / props.pageSize);

  const finalTextTemplate =
    props.textTemplate ?? "{{pageFirstEntry}}-{{pageLastEntry}} of {{total}}";

  const renderedTextTemplate = formatWithTokens(finalTextTemplate, {
    pageNumber: formatter.format("positiveInt", props.pageNumber),
    pageSize: formatter.format("positiveInt", props.pageSize),
    total: formatter.format("positiveInt", total),
    pageFirstEntry: formatter.format(
      "positiveInt",
      (props.pageNumber - 1) * props.pageSize + 1
    ),
    pageLastEntry: formatter.format(
      "positiveInt",
      props.pageNumber * props.pageSize < total
        ? props.pageNumber * props.pageSize
        : total
    ),
    totalPages: formatter.format("positiveInt", totalPages),
  });

  return render("FhirPagination", {
    renderedTextTemplate,
    total,
    totalPages,
    ...props,
  });
}

export interface FhirPaginationRendererProps<TRendererProps = any>
  extends FhirPaginationProps<TRendererProps> {
  renderedTextTemplate: string | undefined;
  total: number;
  totalPages: number;
}

export type FhirPaginationRenderer = (
  props: FhirPaginationRendererProps
) => ReactElement | null;
