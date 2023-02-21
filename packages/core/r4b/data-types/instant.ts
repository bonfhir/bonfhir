import { FhirDataTypeAdapter } from "../data-type-adapter";
import {
  fhirDateRegexpFragment,
  fhirTimeWithZoneRegexpFragment,
} from "./helpers";

/**
 * A instant, or partial instant (e.g. just year or year + month) as used in human communication.
 *
 * @see https://hl7.org/fhir/datatypes.html#instant
 */

export interface FhirInstantFormatOptions {
  dateStyle?: "full" | "long" | "medium" | "short" | null;
  timeStyle?: "full" | "long" | "medium" | "short" | null;
}

export interface FhirInstantTypeAdapter {
  locale?: FhirDataTypeAdapter["locale"];

  /**
   * Parse a FHIR instant
   *
   * @see https://hl7.org/fhir/datatypes.html
   */
  parse(value: string | null | undefined): FhirInstant | undefined;

  /**
   * Format a FHIR instant
   *
   * @see https://hl7.org/fhir/datatypes.html
   */
  format(
    value: FhirInstant | string | null | undefined,
    options?: FhirInstantFormatOptions | null | undefined
  ): string;
}

/**
 * A parsed FHIR instant
 *
 * @see https://hl7.org/fhir/datatypes.html#instant
 */
export type FhirInstant = Date;

const fhirInstantRegexp = new RegExp(
  `^${fhirDateRegexpFragment}(T${fhirTimeWithZoneRegexpFragment})$`
);

/**
 * Return a {@link FhirInstantTypeAdapter} that uses the [`Intl` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
 * (ECMAScript Internationalization API)
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirInstantTypeAdapter(
  locale?: string | undefined
): FhirInstantTypeAdapter {
  // JIT locale check
  Intl.DateTimeFormat(locale);

  return {
    locale,
    parse(value) {
      if (!value?.trim()) {
        return;
      }

      const matchingData = value.trim().match(fhirInstantRegexp)?.groups;
      if (!matchingData?.year)
        throw new Error(
          "Value does not match the fhir instant format as described in `https://hl7.org/fhir/datatypes.html#instant'"
        );

      return new Date(value);
    },

    format(value, options) {
      const fhirInstant = value instanceof Date ? value : this.parse(value);

      if (!fhirInstant) return "";

      const intlOptions: Intl.DateTimeFormatOptions = {};

      // by default we always show the date
      intlOptions.dateStyle =
        options?.dateStyle === undefined
          ? "short"
          : options.dateStyle || undefined;
      // by default we always show the time
      intlOptions.timeStyle =
        options?.timeStyle === undefined
          ? "short"
          : options.timeStyle || undefined;

      return new Intl.DateTimeFormat(locale, intlOptions).format(fhirInstant);
    },
  };
}
