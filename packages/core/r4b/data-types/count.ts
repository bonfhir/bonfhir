import { Count } from "fhir/r4";
import { FhirDataTypeAdapter } from "../data-type-adapter";
import { FhirCodeFormatOptions, fhirCodeTypeAdapter } from "./code";
import { removeDoubleSpaces } from "./helpers";
import { FhirIntegerFormatOptions, fhirIntegerTypeAdapter } from "./integer";

/**
 * A measured amount (or an amount that can potentially be measured).
 *
 * @see https://hl7.org/fhir/datatypes.html#count
 */

export type FhirCountFormatOptions = {
  codeValueSetExpansions: FhirCodeFormatOptions["valueSetExpansions"];
  valueNotation: FhirIntegerFormatOptions["notation"];
};

export interface FhirCountTypeAdapter {
  locale: FhirDataTypeAdapter["locale"];

  /**
   * Format a FHIR count
   *
   * @see https://hl7.org/fhir/datatypes.html#count
   */
  format(
    value: Count | null | undefined,
    options?: FhirCountFormatOptions | null | undefined
  ): string;
}

/**
 * Return a {@link FhirCountTypeAdapter}
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirCountTypeAdapter(
  locale?: string | undefined
): FhirCountTypeAdapter {
  // JIT locale check
  Intl.NumberFormat(locale);

  return {
    locale,
    format(fhirCount, options) {
      if (!fhirCount) return "";

      // value https://www.hl7.org/fhir/datatypes-definitions.html#Count.value
      const formattedValue = fhirIntegerTypeAdapter(locale).format(
        fhirCount.value,
        {
          notation: options?.valueNotation,
        }
      );

      // comparator https://www.hl7.org/fhir/datatypes-definitions.html#Count.comparator
      const formattedComparator = fhirCount.comparator || "";

      // unit https://www.hl7.org/fhir/datatypes-definitions.html#Count.unit
      const formattedUnit = fhirCount.unit?.trim() || "";

      // system https://www.hl7.org/fhir/datatypes-definitions.html#Count.system
      const formattedSystem = fhirCount.system?.trim() || "";

      // code https://www.hl7.org/fhir/datatypes-definitions.html#Count.code
      const formattedCode = fhirCodeTypeAdapter(locale).format(fhirCount.code, {
        valueSetExpansions: options?.codeValueSetExpansions,
      });

      if (!formattedCode) {
        throw new Error(
          "Code must be present, as described in `https://hl7.org/fhir/datatypes.html#Count'"
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
