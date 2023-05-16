import { Distance } from "../fhir-types.codegen";
import { ValueFormatter } from "../formatters";
import { QuantityFormatterOptions, quantityFormatter } from "./quantity";

/**
 * A measured amount (or an amount that can potentially be measured).
 *
 * @see https://hl7.org/fhir/datatypes.html#duration
 */
export type DurationFormatterOptions = QuantityFormatterOptions;

export const durationFormatter: ValueFormatter<
  "Duration",
  Distance | null | undefined,
  DurationFormatterOptions | null | undefined
> = {
  type: "Duration",
  format: quantityFormatter.format,
};
