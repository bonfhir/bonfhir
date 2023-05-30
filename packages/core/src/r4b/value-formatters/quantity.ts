import { Quantity } from "../fhir-types.codegen.js";
import { ValueFormatter, withValueFormatter } from "../formatters.js";
import { CodeFormatterOptions, codeFormatter } from "./code.js";
import { DecimalFormatterOptions, decimalFormatter } from "./decimal.js";

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

    const formattedValue = withValueFormatter<typeof decimalFormatter>(
      formatterOptions.formatter
    ).format("decimal", value.value, {
      notation: options?.notation,
    });

    const formattedComparator = value.comparator || "";

    const formattedCode = withValueFormatter<typeof codeFormatter>(
      formatterOptions.formatter
    ).format("code", value.code, {
      expansions: options?.expansions,
    });

    const formattedUnit = value.unit?.trim() || formattedCode || "";

    return `${formattedComparator + " "}${formattedValue}${
      options?.separator ?? formatterOptions.quantitySeparator ?? " "
    }${formattedCode || formattedUnit}`.trim();
  },
};
