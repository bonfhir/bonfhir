import { Age } from "fhir/r4";
import { FhirDataTypeAdapter } from "../data-type-adapter";
import { FhirCodeFormatOptions, fhirCodeTypeAdapter } from "./code";
import { removeDoubleSpaces } from "./helpers";
import { FhirIntegerFormatOptions, fhirIntegerTypeAdapter } from "./integer";

/**
 * A measured amount (or an amount that can potentially be measured).
 *
 * @see https://hl7.org/fhir/datatypes.html#age
 */

export type FhirAgeFormatOptions = {
  codeValueSetExpansions: FhirCodeFormatOptions["valueSetExpansions"];
  valueNotation: FhirIntegerFormatOptions["notation"];
};

export interface FhirAgeTypeAdapter {
  locale: FhirDataTypeAdapter["locale"];

  /**
   * Format a FHIR age
   *
   * @see https://hl7.org/fhir/datatypes.html#age
   */
  format(
    value: Age | null | undefined,
    options?: FhirAgeFormatOptions | null | undefined
  ): string;
}

/**
 * Return a {@link FhirAgeTypeAdapter}
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirAgeTypeAdapter(
  locale?: string | undefined
): FhirAgeTypeAdapter {
  // JIT locale check
  Intl.NumberFormat(locale);

  return {
    locale,
    format(fhirAge, options) {
      if (!fhirAge) return "";

      // value https://www.hl7.org/fhir/datatypes-definitions.html#Age.value
      const formattedValue = fhirIntegerTypeAdapter(locale).format(
        fhirAge.value,
        {
          notation: options?.valueNotation,
        }
      );

      // comparator https://www.hl7.org/fhir/datatypes-definitions.html#Age.comparator
      const formattedComparator = fhirAge.comparator || "";

      // unit https://www.hl7.org/fhir/datatypes-definitions.html#Age.unit
      const formattedUnit = fhirAge.unit?.trim() || "";

      // system https://www.hl7.org/fhir/datatypes-definitions.html#Age.system
      const formattedSystem = fhirAge.system?.trim() || "";

      // code https://www.hl7.org/fhir/datatypes-definitions.html#Age.code
      const formattedCode = fhirCodeTypeAdapter(locale).format(fhirAge.code, {
        valueSetExpansions: options?.codeValueSetExpansions,
      });

      if (!formattedCode) {
        throw new Error(
          "Code must be present, as described in `https://hl7.org/fhir/datatypes.html#Age'"
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
