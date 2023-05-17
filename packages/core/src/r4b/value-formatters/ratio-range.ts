/**
 * A set of ordered Quantity values defined by a low and high limit.
 *
 * @see https://hl7.org/fhir/datatypes.html#RatioRange
 */

import { Quantity, Range, RatioRange } from "../fhir-types.codegen";
import { ValueFormatter, WithValueFormatter } from "../formatters";
import { QuantityFormatterOptions } from "./quantity";
import { RangeFormatterOptions } from "./range";

export type RatioRangeFormatterOptions = {
  numeratorExpansions?: QuantityFormatterOptions["expansions"];

  denominatorExpansions?: QuantityFormatterOptions["expansions"];

  notation?: QuantityFormatterOptions["notation"];

  quantitySeparator?: QuantityFormatterOptions["separator"];

  rangeSeparator?: RangeFormatterOptions["rangeSeparator"];

  /** Default to "/" */
  denominatorSeparator?: string | null | undefined;

  /**
   * If set to true, denominator with a value of 1 will not output the value.
   * e.g. 15 g / 1 ml => 13 g/ml
   *
   * Default to true
   */
  reduceSingleDenominator?: boolean | null | undefined;
};

export const ratioRangeFormatter: ValueFormatter<
  "RatioRange",
  RatioRange | null | undefined,
  RatioRangeFormatterOptions | null | undefined
> = {
  type: "RatioRange",
  format: (value, options, formatterOptions) => {
    if (!value) {
      return "";
    }

    const quantityFormatter = formatterOptions.formatter as WithValueFormatter<
      "Quantity",
      Quantity | undefined,
      QuantityFormatterOptions
    >;

    const rangeFormatter = formatterOptions.formatter as WithValueFormatter<
      "Range",
      Range | undefined,
      RangeFormatterOptions
    >;

    const formattedRange = rangeFormatter.format(
      "Range",
      { low: value.lowNumerator, high: value.highNumerator },
      {
        expansions: options?.numeratorExpansions,
        notation: options?.notation,
        quantitySeparator: options?.quantitySeparator,
        rangeSeparator: options?.rangeSeparator,
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
      formattedDenominator = formattedDenominator.replace(/^1 /, "");
    }

    return `${formattedRange}${
      options?.denominatorSeparator ??
      formatterOptions.denominatorSeparator ??
      "/"
    }${formattedDenominator}`;
  },
};
