import { ReactElement } from "react";
import { useFhirUIContext } from "../../context";
import { FhirInputCommonProps } from "./common";

export interface FhirInputTimeProps<TRendererProps = any>
  extends FhirInputCommonProps {
  type: "time";
  placeholder?: string | null | undefined;
  value?: string | null | undefined;
  onChange?: (value: string | undefined) => void;
  className?: string | undefined;
  style?: Record<string, any> | undefined;
  rendererProps?: TRendererProps;
}

export function FhirInputTime<TRendererProps = any>(
  props: FhirInputTimeProps<TRendererProps>,
): ReactElement | null {
  const { render } = useFhirUIContext();

  return render("FhirInputTime", { ...props });
}

export type FhirInputTimeRendererProps<TRendererProps = any> =
  FhirInputTimeProps<TRendererProps>;

export type FhirInputTimeRenderer = (
  props: FhirInputTimeRendererProps,
) => ReactElement | null;
