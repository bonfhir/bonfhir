import { Range } from "../fhir-types.codegen.js";
import { ValueFormatter, withValueFormatter } from "../formatters.js";
import { CodeFormatterOptions } from "./code.js";
import { DecimalFormatterOptions, decimalFormatter } from "./decimal.js";
import { QuantityFormatterOptions, quantityFormatter } from "./quantity.js";

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

    let formattedLow = withValueFormatter<typeof quantityFormatter>(
      formatterOptions.formatter,
    ).format("Quantity", value.low, {
      notation: options?.notation,
      expansions: options?.expansions,
      separator: options?.quantitySeparator,
    });
    const formattedHigh = withValueFormatter<typeof quantityFormatter>(
      formatterOptions.formatter,
    ).format("Quantity", value.high, {
      notation: options?.notation,
      expansions: options?.expansions,
      separator: options?.quantitySeparator,
    });

    if (value.low?.unit === value.high?.unit) {
      formattedLow = withValueFormatter<typeof decimalFormatter>(
        formatterOptions.formatter,
      ).format("decimal", value.low.value, {
        notation: options?.notation,
      });
    }

    return `${formattedLow}${
      options?.rangeSeparator ?? formatterOptions.rangeSeparator ?? " … "
    }${formattedHigh}`;
  },
};
