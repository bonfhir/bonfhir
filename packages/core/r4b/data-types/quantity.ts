import { Quantity } from "fhir/r4";
import { FhirDataTypeAdapter } from "../data-type-adapter";
import { FhirCodeFormatOptions, fhirCodeTypeAdapter } from "./code";
import { FhirDecimalFormatOptions, fhirDecimalTypeAdapter } from "./decimal";
import { removeDoubleSpaces } from "./helpers";

/**
 * A measured amount (or an amount that can potentially be measured).
 *
 * @see https://hl7.org/fhir/datatypes.html#quantity
 */

export type FhirQuantityFormatOptions = {
  codeValueSetExpansions: FhirCodeFormatOptions["valueSetExpansions"];
  valueNotation: FhirDecimalFormatOptions["notation"];
};

export interface FhirQuantityTypeAdapter {
  locale: FhirDataTypeAdapter["locale"];

  /**
   * Format a FHIR quantity
   *
   * @see https://hl7.org/fhir/datatypes.html#quantity
   */
  format(
    value: Quantity | null | undefined,
    options?: FhirQuantityFormatOptions | null | undefined
  ): string;
}

/**
 * Return a {@link FhirQuantityTypeAdapter}
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirQuantityTypeAdapter(
  locale?: string | undefined
): FhirQuantityTypeAdapter {
  // JIT locale check
  Intl.NumberFormat(locale);

  return {
    locale,
    format(fhirQuantity, options) {
      if (!fhirQuantity) return "";

      // value https://www.hl7.org/fhir/datatypes-definitions.html#Quantity.value
      const formattedValue = fhirDecimalTypeAdapter(locale).format(
        fhirQuantity.value,
        {
          notation: options?.valueNotation,
        }
      );

      // comparator https://www.hl7.org/fhir/datatypes-definitions.html#Quantity.comparator
      const formattedComparator = fhirQuantity.comparator || "";

      // unit https://www.hl7.org/fhir/datatypes-definitions.html#Quantity.unit
      const formattedUnit = fhirQuantity.unit?.trim() || "";

      // system https://www.hl7.org/fhir/datatypes-definitions.html#Quantity.system
      const formattedSystem = fhirQuantity.system?.trim() || "";

      // code https://www.hl7.org/fhir/datatypes-definitions.html#Quantity.code
      const formattedCode = fhirCodeTypeAdapter(locale).format(
        fhirQuantity.code,
        {
          valueSetExpansions: options?.codeValueSetExpansions,
        }
      );

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
