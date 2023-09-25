import { BundleNavigator, formatWithTokens } from "@bonfhir/core/r4b";
import { ReactElement } from "react";
import { useFhirUIContext } from "../context";

export interface FhirPaginationProps<TRendererProps = any> {
  /** Starts at 1 */
  pageNumber: number;
  pageSize: number;
  pageUrl: string | undefined;
  onPageChange: (pageUrl: string | undefined, pageNumber: number) => void;

  data?: Pick<BundleNavigator, "total" | "linkUrl"> | null | undefined;

  total?: number | null | undefined;

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
  className?: string | undefined;
  style?: Record<string, any> | undefined;
  rendererProps?: TRendererProps;
}

export function FhirPagination<TRendererProps = any>(
  props: FhirPaginationProps<TRendererProps>,
): ReactElement | null {
  const { applyDefaultProps, formatter, render } = useFhirUIContext();
  props = applyDefaultProps("FhirPagination", props);

  const total = props.total == undefined ? props.data?.total ?? 0 : props.total;
  const totalPages = Math.ceil(total / props.pageSize);

  const finalTextTemplate =
    props.textTemplate ?? "{{pageFirstEntry}}-{{pageLastEntry}} of {{total}}";

  const renderedTextTemplate = formatWithTokens(finalTextTemplate, {
    pageNumber: formatter.format("positiveInt", props.pageNumber),
    pageSize: formatter.format("positiveInt", props.pageSize),
    total: formatter.format("positiveInt", total),
    pageFirstEntry: formatter.format(
      "positiveInt",
      totalPages === 0 ? 0 : (props.pageNumber - 1) * props.pageSize + 1,
    ),
    pageLastEntry: formatter.format(
      "positiveInt",
      props.pageNumber * props.pageSize < total
        ? props.pageNumber * props.pageSize
        : total,
    ),
    totalPages: formatter.format("positiveInt", totalPages),
  });

  return render<FhirPaginationRendererProps>("FhirPagination", {
    ...props,
    renderedTextTemplate,
    total,
    totalPages,
  });
}

export interface FhirPaginationRendererProps<TRendererProps = any>
  extends FhirPaginationProps<TRendererProps> {
  renderedTextTemplate: string | undefined;
  total: number;
  totalPages: number;
}

export type FhirPaginationRenderer = (
  props: FhirPaginationRendererProps,
) => ReactElement | null;
