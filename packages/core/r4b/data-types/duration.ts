import { Duration } from "fhir/r4";
import { FhirDataTypeAdapter } from "../data-type-adapter";
import { FhirCodeFormatOptions, fhirCodeTypeAdapter } from "./code";
import { FhirDecimalFormatOptions, fhirDecimalTypeAdapter } from "./decimal";
import { removeDoubleSpaces } from "./helpers";

/**
 * A measured amount (or an amount that can potentially be measured).
 *
 * @see https://hl7.org/fhir/datatypes.html#duration
 */

export type FhirDurationFormatOptions = {
  codeValueSetExpansions: FhirCodeFormatOptions["valueSetExpansions"];
  valueNotation: FhirDecimalFormatOptions["notation"];
};

export interface FhirDurationTypeAdapter {
  locale: FhirDataTypeAdapter["locale"];

  /**
   * Format a FHIR duration
   *
   * @see https://hl7.org/fhir/datatypes.html#duration
   */
  format(
    value: Duration | null | undefined,
    options?: FhirDurationFormatOptions | null | undefined
  ): string;
}

/**
 * Return a {@link FhirDurationTypeAdapter}
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirDurationTypeAdapter(
  locale?: string | undefined
): FhirDurationTypeAdapter {
  // JIT locale check
  Intl.NumberFormat(locale);

  return {
    locale,
    format(fhirDuration, options) {
      if (!fhirDuration) return "";

      // value https://www.hl7.org/fhir/datatypes-definitions.html#Duration.value
      const formattedValue = fhirDecimalTypeAdapter(locale).format(
        fhirDuration.value,
        {
          notation: options?.valueNotation,
        }
      );

      // comparator https://www.hl7.org/fhir/datatypes-definitions.html#Duration.comparator
      const formattedComparator = fhirDuration.comparator || "";

      // unit https://www.hl7.org/fhir/datatypes-definitions.html#Duration.unit
      const formattedUnit = fhirDuration.unit?.trim() || "";

      // system https://www.hl7.org/fhir/datatypes-definitions.html#Duration.system
      const formattedSystem = fhirDuration.system?.trim() || "";

      // code https://www.hl7.org/fhir/datatypes-definitions.html#Duration.code
      const formattedCode = fhirCodeTypeAdapter(locale).format(
        fhirDuration.code,
        {
          valueSetExpansions: options?.codeValueSetExpansions,
        }
      );

      if (!formattedCode) {
        throw new Error(
          "Code must be present, as described in `https://hl7.org/fhir/datatypes.html#Duration'"
        );
      }

      return removeDoubleSpaces(
        [
          formattedComparator,
          formattedValue,
          formattedCode ?? formattedUnit,
          formattedSystem ? `(${formattedSystem})` : "",
        ].join(" ")
      );
    },
  };
}
