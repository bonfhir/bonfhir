import "@formatjs/intl-numberformat/polyfill";
import { Decimal } from "decimal.js";
import { ValueFormatter } from "../formatters";

/**
 * Rational numbers that have a decimal representation.
 *
 * @see https://hl7.org/fhir/datatypes.html#decimal
 */

export interface DecimalFormatterOptions {
  notation?:
    | "standard"
    | "scientific"
    | "engineering"
    | "compact-short"
    | "compact-long"
    | null
    | undefined;
}

export const decimalFormatter: ValueFormatter<
  "decimal",
  number | string | null | undefined,
  DecimalFormatterOptions | null | undefined
> = {
  type: "decimal",
  format: (value, options, formatterOptions) => {
    let decimal;
    let significantDigits;
    if (typeof value === "number") {
      decimal = new Decimal(value);
      significantDigits = decimal.precision();
    } else {
      const trimmedValue = value?.trim();
      if (!trimmedValue) {
        return "";
      }

      if (!/^-?(0|[1-9]\d*)(.\d+)?([Ee][+-]?\d+)?$/.test(trimmedValue)) {
        return trimmedValue;
      }

      decimal = new Decimal(trimmedValue);
      significantDigits = trimmedValue.includes("e")
        ? decimal.precision()
        : trimmedValue.replaceAll(/\.|-/g, "").length;
    }

    const valueToFormat = decimal.toNumber();

    const intlOptions: Intl.NumberFormatOptions = {};
    if (options?.notation) {
      if (
        options.notation === "compact-short" ||
        options.notation === "compact-long"
      ) {
        intlOptions.notation = "compact";
        intlOptions.compactDisplay =
          options.notation === "compact-long" ? "long" : "short";
      } else {
        intlOptions.notation = options.notation;
      }
    } else {
      intlOptions.minimumSignificantDigits = significantDigits;
    }

    return new Intl.NumberFormat(formatterOptions.locale, intlOptions).format(
      valueToFormat,
    );
  },
};
