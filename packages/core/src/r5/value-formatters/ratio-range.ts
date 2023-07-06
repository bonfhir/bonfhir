/**
 * A set of ordered Quantity values defined by a low and high limit.
 *
 * @see https://hl7.org/fhir/datatypes.html#RatioRange
 */

import { RatioRange } from "../fhir-types.codegen.js";
import { ValueFormatter, withValueFormatter } from "../formatters.js";
import { QuantityFormatterOptions, quantityFormatter } from "./quantity.js";
import { RangeFormatterOptions, rangeFormatter } from "./range.js";

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

    const formattedRange = withValueFormatter<typeof rangeFormatter>(
      formatterOptions.formatter,
    ).format(
      "Range",
      { low: value.lowNumerator, high: value.highNumerator },
      {
        expansions: options?.numeratorExpansions,
        notation: options?.notation,
        quantitySeparator: options?.quantitySeparator,
        rangeSeparator: options?.rangeSeparator,
      },
    );

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
      formattedDenominator = formattedDenominator.replace(/^1 /, "");
    }

    return `${formattedRange}${
      options?.denominatorSeparator ??
      formatterOptions.denominatorSeparator ??
      "/"
    }${formattedDenominator}`;
  },
};
