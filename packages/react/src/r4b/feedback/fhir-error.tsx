import { asError } from "@bonfhir/core/r4b";
import { ReactElement } from "react";
import { useFhirUIContext } from "../context";

export interface FhirErrorProps<TRendererProps = any> {
  className?: string | undefined;
  error?: unknown;
  onRetry?: () => void;
  rendererProps?: TRendererProps;
}

export function FhirError<TRendererProps = any>(
  props: FhirErrorProps<TRendererProps>,
): ReactElement | null {
  const { applyDefaultProps, render } = useFhirUIContext();
  props = applyDefaultProps("FhirError", props);

  return render<FhirErrorRendererProps>("FhirError", {
    ...props,
    error: asError(props.error),
  });
}

export interface FhirErrorRendererProps<TRendererProps = any>
  extends FhirErrorProps<TRendererProps> {
  error?: Error;
}

export type FhirErrorRenderer = (
  props: FhirErrorRendererProps,
) => ReactElement | null;
