import { Quantity, Ratio } from "../fhir-types.codegen";
import { ValueFormatter, WithValueFormatter } from "../formatters";
import { CodeFormatterOptions } from "./code";
import { QuantityFormatterOptions } from "./quantity";

/**
 * A relationship between two Quantity values expressed as a numerator and a denominator.
 *
 * @see https://hl7.org/fhir/datatypes.html#ratio
 */
export interface RatioFormatterOptions {
  numeratorExpansions?: QuantityFormatterOptions["expansions"];

  denominatorExpansions?: QuantityFormatterOptions["expansions"];

  notation?: QuantityFormatterOptions["notation"];

  quantitySeparator?: QuantityFormatterOptions["separator"];

  /** Default to "/" */
  denominatorSeparator?: string | null | undefined;

  /**
   * If set to true, denominator with a value of 1 will not output the value.
   * e.g. 15 g / 1 ml => 13 g/ml
   *
   * Default to true
   */
  reduceSingleDenominator?: boolean | null | undefined;
}

export const ratioFormatter: ValueFormatter<
  "Ratio",
  Ratio | null | undefined,
  RatioFormatterOptions | null | undefined
> = {
  type: "Ratio",
  format: (value, options, formatterOptions) => {
    if (!value) {
      return "";
    }

    const quantityFormatter = formatterOptions.formatter as WithValueFormatter<
      "Quantity",
      Quantity | undefined,
      QuantityFormatterOptions
    >;
    const formattedNumerator = quantityFormatter.format(
      "Quantity",
      value.numerator,
      {
        expansions: options?.numeratorExpansions,
        notation: options?.notation,
        separator: options?.quantitySeparator,
      }
    );

    let formattedDenominator = quantityFormatter.format(
      "Quantity",
      value.denominator,
      {
        expansions: options?.denominatorExpansions,
        notation: options?.notation,
        separator: options?.quantitySeparator,
      }
    );

    if (
      value.denominator?.value === 1 &&
      options?.reduceSingleDenominator !== false
    ) {
      const formattedCode = (
        formatterOptions.formatter as WithValueFormatter<
          "code",
          string | undefined,
          CodeFormatterOptions
        >
      ).format("code", value.denominator.code, {
        expansions: options?.denominatorExpansions,
      });
      formattedDenominator = value.denominator.unit || formattedCode || "";
    }

    return `${formattedNumerator}${
      options?.denominatorSeparator ?? "/"
    }${formattedDenominator}`;
  },
};
