import { Formatter } from "@bonfhir/core/r5";
import { ReactElement, ReactNode } from "react";
import { useFhirUIContext } from "../context";
import { useFhirFormatters } from "../formatters";

export interface FhirFormatterProps<TRendererProps = any> {
  format: (formatter: Formatter) => ReactNode;
  rendererProps?: TRendererProps;
}

export function FhirFormatter<TRendererProps = any>(
  props: FhirFormatterProps<TRendererProps>,
): ReactElement | null {
  const formatter = useFhirFormatters();
  const { applyDefaultProps, render } = useFhirUIContext();
  props = applyDefaultProps("FhirFormatter", props);

  return render<FhirFormatterRendererProps>("FhirFormatter", {
    ...props,
    formattedValue: props.format(formatter),
  });
}

export interface FhirFormatterRendererProps<TRendererProps = any>
  extends FhirFormatterProps<TRendererProps> {
  formattedValue: ReactNode | undefined;
}

export type FhirFormatterRenderer = (
  props: FhirFormatterRendererProps,
) => ReactElement | null;
