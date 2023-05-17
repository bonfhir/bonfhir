import { Range } from "../fhir-types.codegen";
import { ValueFormatter, WithValueFormatter } from "../formatters";
import { CodeFormatterOptions } from "./code";
import { DecimalFormatterOptions } from "./decimal";

/**
 * A set of ordered Quantity values defined by a low and high limit.
 *
 * @see https://hl7.org/fhir/datatypes.html#range
 */
export type RangeFormatterOptions = {
  expansions?: CodeFormatterOptions["expansions"];
  notation?: DecimalFormatterOptions["notation"];
};

export const rangeFormatter: ValueFormatter<
  "Range",
  Range | null | undefined,
  RangeFormatterOptions | null | undefined
> = {
  type: "Range",
  format: (value, options, formatterOptions) => {
    if (!value?.low || !value?.high) return "";

    const decimalFormatter = formatterOptions.formatter as WithValueFormatter<
      "decimal",
      number | undefined,
      DecimalFormatterOptions
    >;
    const formattedLow = decimalFormatter.format("decimal", value.low.value, {
      notation: options?.notation,
    });
    const formattedHigh = decimalFormatter.format("decimal", value.high.value, {
      notation: options?.notation,
    });

    const formattedUnit =
      value.low.unit?.trim() || value.high.unit?.trim() || "";

    // system https://www.hl7.org/fhir/datatypes-definitions.html#Quantity.system
    const formattedSystem =
      value.low.system?.trim() || value.high.system?.trim() || "";

    // code https://www.hl7.org/fhir/datatypes-definitions.html#Quantity.code
    let formattedCode: string;
    if (value.low.code || value.high.code)
      formattedCode = (
        formatterOptions.formatter as WithValueFormatter<
          "code",
          string | undefined,
          CodeFormatterOptions
        >
      ).format("code", value.low.code || value.high.code, {
        expansions: options?.expansions,
      });
    formattedCode ||= "";

    return [
      `[${formattedLow} ... ${formattedHigh}]${formattedCode || formattedUnit}`,
      formattedSystem ? `(${formattedSystem})` : "",
    ]
      .filter(Boolean)
      .join(" ");
  },
};
