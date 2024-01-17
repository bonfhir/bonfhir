import { ValueFormatter, withValueFormatter } from "../formatters";
import { codeFormatter } from "./code";
import {
  FormattableQuantity,
  QuantityFormatterOptions,
  quantityFormatter,
} from "./quantity";

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

export interface FormattableRatio {
  denominator?: FormattableQuantity | null | undefined;
  numerator?: FormattableQuantity | null | undefined;
}

export const ratioFormatter: ValueFormatter<
  "Ratio",
  FormattableRatio | null | undefined,
  RatioFormatterOptions | null | undefined
> = {
  type: "Ratio",
  format: (value, options, formatterOptions) => {
    if (!value) {
      return "";
    }

    const formattedNumerator = withValueFormatter<typeof quantityFormatter>(
      formatterOptions.formatter,
    ).format("Quantity", value.numerator, {
      expansions: options?.numeratorExpansions,
      notation: options?.notation,
      separator: options?.quantitySeparator,
    });

    let formattedDenominator = withValueFormatter<typeof quantityFormatter>(
      formatterOptions.formatter,
    ).format("Quantity", value.denominator, {
      expansions: options?.denominatorExpansions,
      notation: options?.notation,
      separator: options?.quantitySeparator,
    });

    if (
      value.denominator?.value === 1 &&
      options?.reduceSingleDenominator !== false
    ) {
      const formattedCode = withValueFormatter<typeof codeFormatter>(
        formatterOptions.formatter,
      ).format("code", value.denominator.code, {
        expansions: options?.denominatorExpansions,
      });
      formattedDenominator = value.denominator.unit || formattedCode || "";
    }

    return `${formattedNumerator}${
      options?.denominatorSeparator ??
      formatterOptions.denominatorSeparator ??
      "/"
    }${formattedDenominator}`;
  },
};
