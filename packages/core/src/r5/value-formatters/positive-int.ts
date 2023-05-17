import { ValueFormatter } from "../formatters";
import { IntegerFormatterOptions, integerFormatter } from "./integer";

/**
 * A Positive Integer
 *
 * @see https://hl7.org/fhir/datatypes.html#positiveInt
 */
export type PositiveIntFormatterOptions = IntegerFormatterOptions;

export const positiveIntFormatter: ValueFormatter<
  "positiveInt",
  number | null | undefined,
  PositiveIntFormatterOptions | null | undefined
> = {
  type: "positiveInt",
  format: integerFormatter.format,
};
