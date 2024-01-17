import { ValueFormatter } from "../formatters";
import {
  FormattableQuantity,
  QuantityFormatterOptions,
  quantityFormatter,
} from "./quantity";

/**
 * A measured amount (or an amount that can potentially be measured).
 *
 * @see https://hl7.org/fhir/datatypes.html#age
 */
export type AgeFormatterOptions = QuantityFormatterOptions;

export const ageFormatter: ValueFormatter<
  "Age",
  FormattableQuantity | null | undefined,
  AgeFormatterOptions | null | undefined
> = {
  type: "Age",
  format: quantityFormatter.format,
};
