import { Quantity } from "../fhir-types.codegen";
import { ValueFormatter, WithValueFormatter } from "../formatters";
import { CodeFormatterOptions } from "./code";
import { DecimalFormatterOptions } from "./decimal";

/**
 * A measured amount (or an amount that can potentially be measured).
 *
 * @see https://hl7.org/fhir/datatypes.html#quantity
 */
export interface QuantityFormatterOptions {
  /**
   * The list of possible ValueSet expansions for the code, to resolve the display name of the code.
   */
  expansions?: CodeFormatterOptions["expansions"];

  /**
   * The notation to use for the decimal value.
   */
  notation?: DecimalFormatterOptions["notation"];

  /** Between the number of the unit. Default to " " */
  separator?: string | null | undefined;
}

export const quantityFormatter: ValueFormatter<
  "Quantity",
  Quantity | null | undefined,
  QuantityFormatterOptions | null | undefined
> = {
  type: "Quantity",
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

    const formattedComparator = value.comparator || "";

    const formattedCode = (
      formatterOptions.formatter as WithValueFormatter<
        "code",
        string | undefined,
        CodeFormatterOptions
      >
    ).format("code", value.code, {
      expansions: options?.expansions,
    });

    const formattedUnit = value.unit?.trim() || formattedCode || "";

    return `${formattedComparator + " "}${formattedValue}${
      options?.separator ?? " "
    }${formattedCode || formattedUnit}`.trim();
  },
};
