import { ReactElement } from "react";
import { useFhirUIContext } from "../../context.js";
import { FhirInputCommonProps } from "./common.js";

export interface FhirInputTimeProps<TRendererProps = any>
  extends FhirInputCommonProps {
  type: "time";
  placeholder?: string | null | undefined;
  value?: string | null | undefined;
  onChange?: (value: string | undefined) => void;
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
