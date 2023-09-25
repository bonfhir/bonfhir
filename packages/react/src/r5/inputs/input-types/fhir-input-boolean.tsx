import { ReactElement } from "react";
import { useFhirUIContext } from "../../context";
import { FhirInputCommonProps } from "./common";

export interface FhirInputBooleanProps<TRendererProps = any>
  extends FhirInputCommonProps {
  type: "boolean";
  mode?: "checkbox" | "switch";
  value?: boolean | null | undefined;
  onChange?: (value: boolean | undefined) => void;
  className?: string | undefined;
  rendererProps?: TRendererProps;
}

export function FhirInputBoolean<TRendererProps = any>(
  props: FhirInputBooleanProps<TRendererProps>,
): ReactElement | null {
  const { render } = useFhirUIContext();

  return render("FhirInputBoolean", { ...props });
}

export interface FhirInputBooleanRendererProps<TRendererProps = any>
  extends FhirInputBooleanProps<TRendererProps> {}

export type FhirInputBooleanRenderer = (
  props: FhirInputBooleanRendererProps,
) => ReactElement | null;
