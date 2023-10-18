import { Quantity } from "@bonfhir/core/r5";
import { ReactElement } from "react";
import { useFhirUIContext } from "../../context";
import { FhirInputCommonProps } from "./common";
import { FhirInputNumberProps } from "./fhir-input-number";
import { FhirInputTerminologyProps } from "./fhir-input-terminology";

export interface FhirInputQuantityProps<TRendererProps = any>
  extends FhirInputCommonProps {
  type: "Quantity";
  value?: Quantity | null | undefined;
  onChange?: (value: Quantity | undefined) => void;
  /**
   * Comparator parameters. Leave falsy to not have a comparator input.
   * `true` enables the comparator input with the default value set.
   * Otherwise, just pass in the props for the comparator input.
   */
  comparator?:
    | boolean
    | Omit<FhirInputTerminologyProps, "type" | "onChange">
    | null
    | undefined;
  /**
   * Decimal input props for the value.
   */
  decimal?: Omit<FhirInputNumberProps, "type" | "onChange"> | null | undefined;
  /**
   * Unit input props for the unit.
   * - a Falsy value puts the input as a free-form text input.
   * - a string value sets the unit as a fixed-value that cannot be changed by the user.
   * - otherwise, just pass in the props for the unit terminology input.
   */
  unit?:
    | string
    | Omit<FhirInputTerminologyProps, "type" | "onChange">
    | null
    | undefined;
  className?: string | undefined;
  style?: Record<string, any> | undefined;
  rendererProps?: TRendererProps;
}

export function FhirInputQuantity<TRendererProps = any>(
  props: FhirInputQuantityProps<TRendererProps>,
): ReactElement | null {
  const { render } = useFhirUIContext();

  return render("FhirInputQuantity", {
    ...props,
  });
}

export interface FhirInputQuantityRendererProps<TRendererProps = any>
  extends FhirInputQuantityProps<TRendererProps> {}

export type FhirInputQuantityRenderer = (
  props: FhirInputQuantityRendererProps,
) => ReactElement | null;
