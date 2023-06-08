import { ReactElement, ReactNode } from "react";
import { useFhirUIContext } from "../../context.js";

export interface FhirInputStringProps<TRendererProps = any> {
  type: "string";
  label?: ReactNode | null | undefined;
  description?: ReactNode | null | undefined;
  error?: ReactNode | null | undefined;
  placeholder?: string | null | undefined;
  required?: boolean | null | undefined;
  value?: string | null | undefined;
  onChange?: (value: string | undefined) => void;
  rendererProps?: TRendererProps;
}

export function FhirInputString<TRendererProps = any>(
  props: FhirInputStringProps<TRendererProps>
): ReactElement | null {
  const { render } = useFhirUIContext();

  return render("FhirInputString", { ...props });
}

export type FhirInputStringRendererProps<TRendererProps = any> =
  FhirInputStringProps<TRendererProps>;

export type FhirInputStringRenderer = (
  props: FhirInputStringRendererProps
) => ReactElement | null;
