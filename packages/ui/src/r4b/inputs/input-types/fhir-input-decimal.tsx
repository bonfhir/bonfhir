import { ReactElement } from "react";
import { useFhirUIContext } from "../../context.js";

export interface FhirInputDecimalProps<TRendererProps = any> {
  type: "decimal";
  rendererProps?: TRendererProps;
}

export function FhirInputDecimal<TRendererProps = any>(
  props: FhirInputDecimalProps<TRendererProps>
): ReactElement | null {
  const { render } = useFhirUIContext();

  return render("FhirInputDecimal", { ...props });
}

export interface FhirInputDecimalRendererProps<TRendererProps = any>
  extends FhirInputDecimalProps<TRendererProps> {}

export type FhirInputDecimalRenderer = (
  props: FhirInputDecimalRendererProps
) => ReactElement | null;
