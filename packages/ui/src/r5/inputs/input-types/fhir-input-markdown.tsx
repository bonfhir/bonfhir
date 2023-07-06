import { ReactElement } from "react";
import { useFhirUIContext } from "../../context.js";
import { FhirInputCommonProps } from "./common.js";

export interface FhirInputMarkdownProps<TRendererProps = any>
  extends FhirInputCommonProps {
  type: "markdown";
  placeholder?: string | null | undefined;
  value?: string | null | undefined;
  onChange?: (value: string | undefined) => void;
  rendererProps?: TRendererProps;
}

export function FhirInputMarkdown<TRendererProps = any>(
  props: FhirInputMarkdownProps<TRendererProps>,
): ReactElement | null {
  const { render } = useFhirUIContext();

  return render("FhirInputMarkdown", { ...props });
}

export type FhirInputMarkdownRendererProps<TRendererProps = any> =
  FhirInputMarkdownProps<TRendererProps>;

export type FhirInputMarkdownRenderer = (
  props: FhirInputMarkdownRendererProps,
) => ReactElement | null;
