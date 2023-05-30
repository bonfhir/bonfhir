import { Age } from "../fhir-types.codegen.js";
import { ValueFormatter } from "../formatters.js";
import { QuantityFormatterOptions, quantityFormatter } from "./quantity.js";

/**
 * A measured amount (or an amount that can potentially be measured).
 *
 * @see https://hl7.org/fhir/datatypes.html#age
 */
export type AgeFormatterOptions = QuantityFormatterOptions;

export const ageFormatter: ValueFormatter<
  "Age",
  Age | null | undefined,
  AgeFormatterOptions | null | undefined
> = {
  type: "Age",
  format: quantityFormatter.format,
};
