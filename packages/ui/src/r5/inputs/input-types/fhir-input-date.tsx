import { ReactElement } from "react";
import { useFhirUIContext } from "../../context.js";
import { FhirInputCommonProps } from "./common.js";

export interface FhirInputDateProps<TRendererProps = any>
  extends FhirInputCommonProps {
  type: "date";
  placeholder?: string | null | undefined;
  value?: string | null | undefined;
  onChange?: (value: string | undefined) => void;
  rendererProps?: TRendererProps;
}

export function FhirInputDate<TRendererProps = any>(
  props: FhirInputDateProps<TRendererProps>,
): ReactElement | null {
  const { render } = useFhirUIContext();

  return render("FhirInputDate", { ...props });
}

export type FhirInputDateRendererProps<TRendererProps = any> =
  FhirInputDateProps<TRendererProps>;

export type FhirInputDateRenderer = (
  props: FhirInputDateRendererProps,
) => ReactElement | null;
