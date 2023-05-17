import { ValueFormatter } from "../formatters";
import { IntegerFormatterOptions, integerFormatter } from "./integer";

/**
 * A signed 64-bit integer
 *
 * @see https://hl7.org/fhir/datatypes.html#integer64
 */
export type Integer64FormatterOptions = IntegerFormatterOptions;

export const integer64Formatter: ValueFormatter<
  "integer64",
  number | null | undefined,
  Integer64FormatterOptions | null | undefined
> = {
  type: "integer64",
  format: integerFormatter.format,
};
