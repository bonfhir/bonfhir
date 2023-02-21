/**
 * A Uniform Resource Identifier Reference
 *
 * @see https://hl7.org/fhir/datatypes.html#uri
 */

export type FhirURIFormatOptions = Record<string, never>;

export type FhirURI = URL;

export interface FhirURITypeAdapter {
  locale: string | undefined;
  /**
   * Parse a FHIR URI
   *
   * @see https://hl7.org/fhir/datatypes.html#URI
   */
  parse(value: string | null | undefined): FhirURI | undefined;

  /**
   * Format a FHIR URI
   *
   * @see https://hl7.org/fhir/datatypes.html#URI
   */
  format(
    value: FhirURI | string | null | undefined,
    options?: FhirURIFormatOptions | null | undefined
  ): string;
}

/**
 * Return a {@link FhirURITypeAdapter}
 *
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirURITypeAdapter(
  locale?: string | undefined
): FhirURITypeAdapter {
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
      const fhirURI = value instanceof URL ? value : this.parse(value);

      return fhirURI?.toString() || "";
    },
  };
}
