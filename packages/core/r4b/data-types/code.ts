import { ValueSetExpansionContains } from "fhir/r4";
import { FhirDataTypeAdapter } from "../data-type-adapter";

/**
 * A FHIR code
 * Indicates that the value is taken from a set of controlled strings defined elsewhere (such as a value set)
 *
 * @see https://hl7.org/fhir/datatypes.html#code
 */

export interface FhirCodeFormatOptions {
  valueSetExpansions?: ReadonlyArray<ValueSetExpansionContains>;
}

export interface FhirCodeTypeAdapter {
  locale?: FhirDataTypeAdapter["locale"];

  /**
   * Parse a FHIR code
   *
   * @see https://hl7.org/fhir/datatypes.html#code
   */
  parse(value: string | null | undefined): string | undefined;

  /**
   * Format a FHIR code
   *
   * @see https://hl7.org/fhir/datatypes.html#code
   */
  format(
    value: string | null | undefined,
    options?: FhirCodeFormatOptions | null | undefined
  ): string;
}

const fhirCodeRegexp = new RegExp(/^\S+( \S+)*$/);

/**
 * Return a {@link FhirCodeTypeAdapter} that uses optional valueSet to format codes
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirCodeTypeAdapter(
  locale?: string | undefined
): FhirCodeTypeAdapter {
  // JIT locale check
  Intl.DateTimeFormat(locale);

  return {
    locale,
    parse(value) {
      const formattedValue = value?.trim();

      if (!formattedValue) {
        return;
      }

      const matchingData = formattedValue.match(fhirCodeRegexp);
      if (!matchingData)
        throw new Error(
          "Value does not match the fhir code format as described in `https://hl7.org/fhir/datatypes.html#code'"
        );

      return formattedValue;
    },

    format(value, options) {
      const formattedValue = this.parse(value);

      if (!formattedValue) return "";
      if (!options?.valueSetExpansions) return formattedValue;

      const matchingCode = options.valueSetExpansions.find((element) => {
        return element?.code === formattedValue;
      });

      return matchingCode?.display || formattedValue;
    },
  };
}
