import "@formatjs/intl-numberformat/polyfill";
import { ValueFormatter } from "../formatters";

/**
 * An Integer
 *
 * @see https://hl7.org/fhir/datatypes.html#integer
 */

export interface IntegerFormatterOptions {
  notation?:
    | "standard"
    | "scientific"
    | "engineering"
    | "compact-short"
    | "compact-long"
    | null
    | undefined;
}

export const integerFormatter: ValueFormatter<
  "integer",
  number | null | undefined,
  IntegerFormatterOptions | null | undefined
> = {
  type: "integer",
  format: (value, options, formatterOptions) => {
    if (value == undefined) {
      return "";
    }

    if (
      options?.notation &&
      ["compact-short", "compact-long"].includes(options.notation)
    ) {
      return new Intl.NumberFormat(formatterOptions.locale, {
        notation: "compact",
        compactDisplay: options.notation === "compact-long" ? "long" : "short",
      }).format(value);
    }

    return new Intl.NumberFormat(formatterOptions.locale, {
      notation: options?.notation as Intl.NumberFormatOptions["notation"],
    }).format(value);
  },
};
