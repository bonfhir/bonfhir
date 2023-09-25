import { ReactElement } from "react";
import { useFhirUIContext } from "../../context";
import { FhirInputCommonProps } from "./common";

export interface FhirInputMarkdownProps<TRendererProps = any>
  extends FhirInputCommonProps {
  type: "markdown";
  placeholder?: string | null | undefined;
  value?: string | null | undefined;
  onChange?: (value: string | undefined) => void;
  className?: string | undefined;
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
