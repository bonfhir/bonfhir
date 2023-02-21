/**
 * A Uniform Resource Identifier Reference
 *
 * @see https://hl7.org/fhir/datatypes.html#canonical
 */

export type FhirCanonicalFormatOptions = Record<string, never>;

export type FhirCanonical = URL;

export interface FhirCanonicalTypeAdapter {
  locale: string | undefined;
  /**
   * Parse a FHIR Canonical
   *
   * @see https://hl7.org/fhir/datatypes.html#Canonical
   */
  parse(value: string | null | undefined): FhirCanonical | undefined;

  /**
   * Format a FHIR Canonical
   *
   * @see https://hl7.org/fhir/datatypes.html#Canonical
   */
  format(
    value: FhirCanonical | string | null | undefined,
    options?: FhirCanonicalFormatOptions | null | undefined
  ): string;
}

/**
 * Return a {@link FhirCanonicalTypeAdapter}
 *
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirCanonicalTypeAdapter(
  locale?: string | undefined
): FhirCanonicalTypeAdapter {
  // JIT locale check
  Intl.NumberFormat(locale);

  return {
    locale,
    parse(value) {
      if (!value?.trim()) {
        return;
      }

      return new URL(value);
    },

    format(value) {
      const fhirCanonical = value instanceof URL ? value : this.parse(value);

      return fhirCanonical?.toString() || "";
    },
  };
}
