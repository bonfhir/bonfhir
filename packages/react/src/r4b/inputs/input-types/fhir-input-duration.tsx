import { Duration } from "@bonfhir/core/r4b";
import { ReactElement } from "react";
import { useFhirUIContext } from "../../context";
import { FhirInputCommonProps } from "./common";
import { FhirInputNumberProps } from "./fhir-input-number";
import { FhirInputTerminologyProps } from "./fhir-input-terminology";

/**
 * This is essentially a Quantity input, but with defaults value that makes sense for a Duration.
 */
export interface FhirInputDurationProps<TRendererProps = any>
  extends FhirInputCommonProps {
  type: "Duration";
  value?: Duration | null | undefined;
  onChange?: (value: Duration | undefined) => void;
  comparator?:
    | boolean
    | Omit<FhirInputTerminologyProps, "type" | "onChange">
    | null
    | undefined;
  decimal?: Omit<FhirInputNumberProps, "type" | "onChange"> | null | undefined;
  unit?:
    | Omit<FhirInputTerminologyProps, "type" | "onChange">
    | null
    | undefined;
  className?: string | undefined;
  style?: Record<string, any> | undefined;
  rendererProps?: TRendererProps;
}

export function FhirInputDuration<TRendererProps = any>(
  props: FhirInputDurationProps<TRendererProps>,
): ReactElement | null {
  const { render } = useFhirUIContext();

  return render("FhirInputDuration", {
    ...props,
  });
}

export interface FhirInputDurationRendererProps<TRendererProps = any>
  extends FhirInputDurationProps<TRendererProps> {}

export type FhirInputDurationRenderer = (
  props: FhirInputDurationRendererProps,
) => ReactElement | null;
