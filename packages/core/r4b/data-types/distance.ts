import { Distance } from "fhir/r4";
import { FhirDataTypeAdapter } from "../data-type-adapter";
import { FhirCodeFormatOptions, fhirCodeTypeAdapter } from "./code";
import { FhirDecimalFormatOptions, fhirDecimalTypeAdapter } from "./decimal";
import { removeDoubleSpaces } from "./helpers";

/**
 * A measured amount (or an amount that can potentially be measured).
 *
 * @see https://hl7.org/fhir/datatypes.html#distance
 */

export type FhirDistanceFormatOptions = {
  codeValueSetExpansions: FhirCodeFormatOptions["valueSetExpansions"];
  valueNotation: FhirDecimalFormatOptions["notation"];
};

export interface FhirDistanceTypeAdapter {
  locale: FhirDataTypeAdapter["locale"];

  /**
   * Format a FHIR distance
   *
   * @see https://hl7.org/fhir/datatypes.html#distance
   */
  format(
    value: Distance | null | undefined,
    options?: FhirDistanceFormatOptions | null | undefined
  ): string;
}

/**
 * Return a {@link FhirDistanceTypeAdapter}
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirDistanceTypeAdapter(
  locale?: string | undefined
): FhirDistanceTypeAdapter {
  // JIT locale check
  Intl.NumberFormat(locale);

  return {
    locale,
    format(fhirDistance, options) {
      if (!fhirDistance) return "";

      // value https://www.hl7.org/fhir/datatypes-definitions.html#Distance.value
      const formattedValue = fhirDecimalTypeAdapter(locale).format(
        fhirDistance.value,
        {
          notation: options?.valueNotation,
        }
      );

      // comparator https://www.hl7.org/fhir/datatypes-definitions.html#Distance.comparator
      const formattedComparator = fhirDistance.comparator || "";

      // unit https://www.hl7.org/fhir/datatypes-definitions.html#Distance.unit
      const formattedUnit = fhirDistance.unit?.trim() || "";

      // system https://www.hl7.org/fhir/datatypes-definitions.html#Distance.system
      const formattedSystem = fhirDistance.system?.trim() || "";

      // code https://www.hl7.org/fhir/datatypes-definitions.html#Distance.code
      const formattedCode = fhirCodeTypeAdapter(locale).format(
        fhirDistance.code,
        {
          valueSetExpansions: options?.codeValueSetExpansions,
        }
      );

      if (!formattedCode) {
        throw new Error(
          "Code must be present, as described in `https://hl7.org/fhir/datatypes.html#Distance'"
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
