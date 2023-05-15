import { ValueFormatter } from "../formatters";
import { DateTimeFormatterOptions, dateTimeFormatter } from "./datetime";

/**
 * A instant, or partial instant (e.g. just year or year + month) as used in human communication.
 *
 * @see https://hl7.org/fhir/datatypes.html#instant
 */
export type InstantFormatterOptions = DateTimeFormatterOptions;

export const instantFormatter: ValueFormatter<
  "instant",
  string | null | undefined,
  InstantFormatterOptions | null | undefined
> = {
  type: "instant",
  format: dateTimeFormatter.format,
};
