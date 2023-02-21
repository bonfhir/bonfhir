import { FhirDataTypeAdapter } from "../data-type-adapter";

/**
 * An Integer
 *
 * @see https://hl7.org/fhir/datatypes.html#integer
 */

export interface FhirIntegerFormatOptions {
  notation?:
    | "standard"
    | "scientific"
    | "engineering"
    | "compact-short"
    | "compact-long"
    | null
    | undefined;
}

export interface FhirIntegerTypeAdapter {
  locale: FhirDataTypeAdapter["locale"];
  /**
   * Parse a FHIR integer
   *
   * @see https://hl7.org/fhir/datatypes.html#integer
   */
  parse(value: string | number | null | undefined): number | undefined;

  /**
   * Format a FHIR integer
   *
   * @see https://hl7.org/fhir/datatypes.html#integer
   */
  format(
    value: number | string | null | undefined,
    options?: FhirIntegerFormatOptions | null | undefined
  ): string;
}

const fhirIntegerRegexp = new RegExp("^([0]|[-+]?[1-9]\\d*)$");

/**
 * Return a {@link FhirIntegerTypeAdapter} that uses the [`Intl` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
 * (ECMAScript Internationalization API)
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirIntegerTypeAdapter(
  locale?: string | undefined
): FhirIntegerTypeAdapter {
  // JIT locale check
  Intl.NumberFormat(locale);

  return {
    locale,
    parse(value) {
      if (typeof value === "number")
        if (Number.isInteger(value)) return value;
        else {
          // is a float
          throw new TypeError(
            "Value is a float. It does not match the fhir integer format as described in `https://hl7.org/fhir/datatypes.html#number'"
          );
        }

      if (!value?.trim()) {
        return;
      }

      if (!fhirIntegerRegexp.test(value.trim()))
        throw new Error(
          "Value does not match the fhir integer format as described in `https://hl7.org/fhir/datatypes.html#integer'"
        );

      return parseInt(value);
    },

    format(value, options) {
      const fhirInteger = Number.isInteger(value)
        ? (value as number)
        : this.parse(value);

      if (!fhirInteger) return "";

      if (
        options?.notation &&
        ["compact-short", "compact-long"].includes(options.notation)
      ) {
        return new Intl.NumberFormat(locale, {
          notation: "compact",
          compactDisplay:
            options.notation === "compact-long" ? "long" : "short",
        }).format(fhirInteger);
      }

      return new Intl.NumberFormat(locale, {
        notation: options?.notation as Intl.NumberFormatOptions["notation"],
      }).format(fhirInteger);
    },
  };
}
