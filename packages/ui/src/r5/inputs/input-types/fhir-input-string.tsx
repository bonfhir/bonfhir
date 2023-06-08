import { ReactElement } from "react";
import { useFhirUIContext } from "../../context.js";
import { FhirInputCommonProps } from "./common.js";

export interface FhirInputStringProps<TRendererProps = any>
  extends FhirInputCommonProps {
  type: "string";
  placeholder?: string | null | undefined;
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
