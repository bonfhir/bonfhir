import Decimal from "decimal.js";
import { FhirDataTypeAdapter } from "../data-type-adapter";
/**
 * Rational numbers that have a decimal representation.
 *
 * @see https://hl7.org/fhir/datatypes.html#decimal
 */

export interface FhirDecimalFormatOptions {
  notation?:
    | "standard"
    | "scientific"
    | "engineering"
    | "compact-short"
    | "compact-long"
    | null
    | undefined;
}

export interface FhirDecimalTypeAdapter {
  locale?: FhirDataTypeAdapter["locale"];

  /**
   * Parse a FHIR decimal
   *
   * @see https://hl7.org/fhir/datatypes.html#decimal
   */
  parse(value: string | number | null | undefined): FhirDecimal | undefined;

  /**
   * Format a FHIR decimal
   *
   * @see https://hl7.org/fhir/datatypes.html#decimal
   */
  format(
    value: FhirDecimal | string | number | null | undefined,
    options?: FhirDecimalFormatOptions | null | undefined
  ): string;
}

/**
 * A parsed FHIR date
 *
 * @see https://hl7.org/fhir/datatypes.html#decimal
 */
export interface FhirDecimal extends Decimal {
  significantDigits: number | undefined;
}

const fhirDecimalRegexp = new RegExp(
  "^-?(0|[1-9]\\d*)(.\\d+)?([eE][+-]?\\d+)?$"
);

/**
 * Return a {@link FhirDecimalTypeAdapter} that uses the [`Intl` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
 * (ECMAScript Internationalization API)
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirDecimalTypeAdapter(
  locale?: string | undefined
): FhirDecimalTypeAdapter {
  // JIT locale check
  Intl.NumberFormat(locale);

  return {
    locale,
    parse(value) {
      if (typeof value !== "number") {
        if (!value?.trim()) {
          return;
        }

        if (!fhirDecimalRegexp.test(value.trim()))
          throw new Error(
            "Value does not match the fhir date format as described in `https://hl7.org/fhir/datatypes.html#decimal'"
          );
      }

      const decimal = new Decimal(value) as FhirDecimal;
      decimal.significantDigits =
        typeof value === "string" && !value.includes("e")
          ? value.trim().replace(/\.|-/g, "").length
          : decimal.precision();

      return decimal;
    },

    format(value, options) {
      const fhirDecimal = value instanceof Object ? value : this.parse(value);

      if (!fhirDecimal) return "";

      const valueToFormat = fhirDecimal.toNumber();

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
        intlOptions.minimumSignificantDigits = fhirDecimal.significantDigits;
      }

      return new Intl.NumberFormat(locale, intlOptions).format(valueToFormat);
    },
  };
}
