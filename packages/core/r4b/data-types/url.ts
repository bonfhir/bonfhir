/**
 * A Uniform Resource Identifier Reference
 *
 * @see https://hl7.org/fhir/datatypes.html#url
 */

export type FhirURLFormatOptions = Record<string, never>;

export type FhirURL = URL;

export interface FhirURLTypeAdapter {
  locale: string | undefined;
  /**
   * Parse a FHIR URL
   *
   * @see https://hl7.org/fhir/datatypes.html#URL
   */
  parse(value: string | null | undefined): FhirURL | undefined;

  /**
   * Format a FHIR URL
   *
   * @see https://hl7.org/fhir/datatypes.html#URL
   */
  format(
    value: FhirURL | string | null | undefined,
    options?: FhirURLFormatOptions | null | undefined
  ): string;
}

/**
 * Return a {@link FhirURLTypeAdapter}
 *
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirURLTypeAdapter(
  locale?: string | undefined
): FhirURLTypeAdapter {
  // JIT locale check
  Intl.NumberFormat(locale);

  return {
    locale,
    parse(value) {
      if (!value?.trim()) {
        return undefined;
      }

      return new URL(value);
    },

    format(value, _options) {
      const fhirURL = value instanceof URL ? value : this.parse(value);

      return fhirURL?.toString() || "";
    },
  };
}
