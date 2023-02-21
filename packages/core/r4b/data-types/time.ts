import { FhirDataTypeAdapter } from "../data-type-adapter";
import { fhirTimeRegexpFragment } from "./helpers";

/**
 * A time, or partial time (e.g. just year or year + month) as used in human communication.
 *
 * @see https://hl7.org/fhir/datatypes.html#time
 */

export interface FhirTimeFormatOptions {
  timeStyle?: "full" | "long" | "medium" | "short" | null | undefined;
}

export interface FhirTimeTypeAdapter {
  locale?: FhirDataTypeAdapter["locale"];

  /**
   * Parse a FHIR time
   *
   * @see https://hl7.org/fhir/datatypes.html
   */
  parse(value: string | null | undefined): FhirTime | undefined;

  /**
   * Format a FHIR time
   *
   * @see https://hl7.org/fhir/datatypes.html
   */
  format(
    value: FhirTime | string | null | undefined,
    options?: FhirTimeFormatOptions | null | undefined
  ): string;
}

/**
 * A parsed FHIR time
 *
 * @see https://hl7.org/fhir/datatypes.html#time
 */
export type FhirTime = string;

const fhirTimeRegexp = new RegExp(`^${fhirTimeRegexpFragment}$`);

/**
 * Return a {@link FhirTimeTypeAdapter} that uses the [`Intl` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
 * (ECMAScript Internationalization API)
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirTimeTypeAdapter(
  locale?: string | undefined
): FhirTimeTypeAdapter {
  // JIT locale check
  Intl.DateTimeFormat(locale);

  return {
    locale,
    parse(value) {
      if (!value?.trim()) {
        return;
      }

      const matchingData = value.trim().match(fhirTimeRegexp)?.groups;
      if (!matchingData?.hours)
        throw new Error(
          "Value does not match the fhir time format as described in `https://hl7.org/fhir/datatypes.html#time'"
        );

      return value.trim();
    },

    format(value, options) {
      const fhirTime = this.parse(value);

      if (!fhirTime) return "";

      const intlOptions: Intl.DateTimeFormatOptions = {
        timeZone: "UTC",
        dateStyle: undefined,
        timeStyle: options?.timeStyle || "short",
      };
      intlOptions.timeStyle = options?.timeStyle || "short";

      const date = new Date(`2013-11-27 ${fhirTime}`);
      return new Intl.DateTimeFormat(locale, intlOptions).format(date);
    },
  };
}
