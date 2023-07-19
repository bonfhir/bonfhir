import { Count } from "../fhir-types.codegen";
import { ValueFormatter } from "../formatters";
import { QuantityFormatterOptions, quantityFormatter } from "./quantity";

/**
 * A measured amount (or an amount that can potentially be measured).
 *
 * @see https://hl7.org/fhir/datatypes.html#count
 */
export type CountFormatterOptions = QuantityFormatterOptions;

export const countFormatter: ValueFormatter<
  "Count",
  Count | null | undefined,
  CountFormatterOptions | null | undefined
> = {
  type: "Count",
  format: quantityFormatter.format,
};
