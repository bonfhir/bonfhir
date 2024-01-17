import { ValueFormatter } from "../formatters";
import {
  FormattableQuantity,
  QuantityFormatterOptions,
  quantityFormatter,
} from "./quantity";

/**
 * A measured amount (or an amount that can potentially be measured).
 *
 * @see https://hl7.org/fhir/datatypes.html#distance
 */
export type DistanceFormatterOptions = QuantityFormatterOptions;

export const distanceFormatter: ValueFormatter<
  "Distance",
  FormattableQuantity | null | undefined,
  DistanceFormatterOptions | null | undefined
> = {
  type: "Distance",
  format: quantityFormatter.format,
};
