import { Distance } from "../fhir-types.codegen.js";
import { ValueFormatter } from "../formatters.js";
import { QuantityFormatterOptions, quantityFormatter } from "./quantity.js";

/**
 * A measured amount (or an amount that can potentially be measured).
 *
 * @see https://hl7.org/fhir/datatypes.html#distance
 */
export type DistanceFormatterOptions = QuantityFormatterOptions;

export const distanceFormatter: ValueFormatter<
  "Distance",
  Distance | null | undefined,
  DistanceFormatterOptions | null | undefined
> = {
  type: "Distance",
  format: quantityFormatter.format,
};
