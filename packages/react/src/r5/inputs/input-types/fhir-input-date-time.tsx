import { ReactElement } from "react";
import { useFhirUIContext } from "../../context";
import { FhirInputCommonProps } from "./common";

export interface FhirInputDateTimeProps<TRendererProps = any>
  extends FhirInputCommonProps {
  type: "dateTime" | "instant";
  placeholder?: string | null | undefined;
  value?: string | null | undefined;
  onChange?: (value: string | undefined) => void;
  className?: string | undefined;
  style?: Record<string, any> | undefined;
  rendererProps?: TRendererProps;
}

export function FhirInputDateTime<TRendererProps = any>(
  props: FhirInputDateTimeProps<TRendererProps>,
): ReactElement | null {
  const { render } = useFhirUIContext();

  return render("FhirInputDateTime", { ...props });
}

export type FhirInputDateTimeRendererProps<TRendererProps = any> =
  FhirInputDateTimeProps<TRendererProps>;

export type FhirInputDateTimeRenderer = (
  props: FhirInputDateTimeRendererProps,
) => ReactElement | null;
