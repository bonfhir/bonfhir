import { Quantity, Range } from "../fhir-types.codegen";
import { ValueFormatter, WithValueFormatter } from "../formatters";
import { CodeFormatterOptions } from "./code";
import { DecimalFormatterOptions } from "./decimal";
import { QuantityFormatterOptions } from "./quantity";

/**
 * A set of ordered Quantity values defined by a low and high limit.
 *
 * @see https://hl7.org/fhir/datatypes.html#Range
 */
export type RangeFormatterOptions = {
  expansions?: CodeFormatterOptions["expansions"];

  notation?: DecimalFormatterOptions["notation"];

  quantitySeparator?: QuantityFormatterOptions["separator"];

  /** Defaults to " … " */
  rangeSeparator?: string | null | undefined;
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

    const quantityFormatter = formatterOptions.formatter as WithValueFormatter<
      "Quantity",
      Quantity | undefined,
      QuantityFormatterOptions
    >;

    let formattedLow = quantityFormatter.format("Quantity", value.low, {
      notation: options?.notation,
      expansions: options?.expansions,
      separator: options?.quantitySeparator,
    });
    const formattedHigh = quantityFormatter.format("Quantity", value.high, {
      notation: options?.notation,
      expansions: options?.expansions,
      separator: options?.quantitySeparator,
    });

    if (value.low?.unit === value.high?.unit) {
      formattedLow = decimalFormatter.format("decimal", value.low.value, {
        notation: options?.notation,
      });
    }

    return `${formattedLow}${
      options?.rangeSeparator ?? formatterOptions.rangeSeparator ?? " … "
    }${formattedHigh}`;
  },
};
