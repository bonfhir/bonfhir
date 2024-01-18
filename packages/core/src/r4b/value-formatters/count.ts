import { ValueFormatter } from "../formatters";
import {
  FormattableQuantity,
  QuantityFormatterOptions,
  quantityFormatter,
} from "./quantity";

/**
 * A measured amount (or an amount that can potentially be measured).
 *
 * @see https://hl7.org/fhir/datatypes.html#count
 */
export type CountFormatterOptions = QuantityFormatterOptions;

export const countFormatter: ValueFormatter<
  "Count",
  FormattableQuantity | null | undefined,
  CountFormatterOptions | null | undefined
> = {
  type: "Count",
  format: quantityFormatter.format,
};
