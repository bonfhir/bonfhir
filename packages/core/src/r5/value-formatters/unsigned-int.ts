import { ValueFormatter } from "../formatters.js";
import { IntegerFormatterOptions, integerFormatter } from "./integer.js";

/**
 * A non-negative Integer
 *
 * @see https://hl7.org/fhir/datatypes.html#unsignedInt
 */
export type UnsignedIntFormatterOptions = IntegerFormatterOptions;

export const unsignedIntFormatter: ValueFormatter<
  "unsignedInt",
  number | null | undefined,
  UnsignedIntFormatterOptions | null | undefined
> = {
  type: "unsignedInt",
  format: integerFormatter.format,
};
