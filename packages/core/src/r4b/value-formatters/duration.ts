import { Distance } from "../fhir-types.codegen";
import { ValueFormatter, WithValueFormatter } from "../formatters";
import { CodeFormatterOptions } from "./code";
import { DecimalFormatterOptions } from "./decimal";

/**
 * A measured amount (or an amount that can potentially be measured).
 *
 * @see https://hl7.org/fhir/datatypes.html#duration
 */
export interface DurationFormatterOptions {
  /**
   * The list of possible ValueSet expansions for the code, to resolve the display name of the code.
   */
  expansions?: CodeFormatterOptions["expansions"];

  /**
   * The notation to use for the decimal value.
   */
  notation?: DecimalFormatterOptions["notation"];
}

export const durationFormatter: ValueFormatter<
  "duration",
  Distance | null | undefined,
  DurationFormatterOptions | null | undefined
> = {
  type: "duration",
  format: (value, options, formatterOptions) => {
    if (!value) return "";

    const formattedValue = (
      formatterOptions.formatter as WithValueFormatter<
        "decimal",
        number | undefined,
        DecimalFormatterOptions
      >
    ).format("decimal", value.value, {
      notation: options?.notation,
    });

    // comparator https://www.hl7.org/fhir/datatypes-definitions.html#Duration.comparator
    const formattedComparator = value.comparator || "";

    // unit https://www.hl7.org/fhir/datatypes-definitions.html#Duration.unit
    const formattedUnit = value.unit?.trim() || "";

    // system https://www.hl7.org/fhir/datatypes-definitions.html#Duration.system
    const formattedSystem = value.system?.trim() || "";

    // code https://www.hl7.org/fhir/datatypes-definitions.html#Duration.code
    const formattedCode = (
      formatterOptions.formatter as WithValueFormatter<
        "code",
        string | undefined,
        CodeFormatterOptions
      >
    ).format("code", value.code, {
      expansions: options?.expansions,
    });

    return [
      formattedComparator,
      formattedValue,
      formattedCode || formattedUnit,
      formattedSystem ? `(${formattedSystem})` : "",
    ]
      .filter(Boolean)
      .join(" ");
  },
};
