import { Quantity } from "fhir/r4";
import { FhirDataTypeAdapter } from "../data-type-adapter";
import { FhirCodeFormatOptions, fhirCodeTypeAdapter } from "./code";
import { FhirDecimalFormatOptions, fhirDecimalTypeAdapter } from "./decimal";
import { removeDoubleSpaces } from "./helpers";

/**
 * A measured amount (or an amount that can potentially be measured).
 * A SimpleQuantity shall have no operator
 *
 * @see https://hl7.org/fhir/datatypes.html#quantity
 */

export type SimpleQuantity = Quantity & {
  operator: null | undefined;
};

export type FhirSimpleQuantityFormatOptions = {
  codeValueSetExpansions: FhirCodeFormatOptions["valueSetExpansions"];
  valueNotation: FhirDecimalFormatOptions["notation"];
};

export interface FhirSimpleQuantityTypeAdapter {
  locale: FhirDataTypeAdapter["locale"];

  /**
   * Format a FHIR simpleQuantity
   *
   * @see https://hl7.org/fhir/datatypes.html#simpleQuantity
   */
  format(
    value: SimpleQuantity | null | undefined,
    options?: FhirSimpleQuantityFormatOptions | null | undefined
  ): string;
}

/**
 * Return a {@link FhirSimpleQuantityTypeAdapter}
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirSimpleQuantityTypeAdapter(
  locale?: string | undefined
): FhirSimpleQuantityTypeAdapter {
  // JIT locale check
  Intl.NumberFormat(locale);

  return {
    locale,
    format(fhirSimpleQuantity, options) {
      if (!fhirSimpleQuantity) return "";

      // value https://www.hl7.org/fhir/datatypes-definitions.html#Quantity.value
      const formattedValue = fhirDecimalTypeAdapter(locale).format(
        fhirSimpleQuantity.value,
        {
          notation: options?.valueNotation,
        }
      );

      // unit https://www.hl7.org/fhir/datatypes-definitions.html#Quantity.unit
      const formattedUnit = fhirSimpleQuantity.unit?.trim() || "";

      // system https://www.hl7.org/fhir/datatypes-definitions.html#Quantity.system
      const formattedSystem = fhirSimpleQuantity.system?.trim() || "";

      // code https://www.hl7.org/fhir/datatypes-definitions.html#Quantity.code
      let formattedCode: string;
      if (fhirSimpleQuantity.code)
        formattedCode = fhirCodeTypeAdapter(locale).format(
          fhirSimpleQuantity.code,
          {
            valueSetExpansions: options?.codeValueSetExpansions,
          }
        );
      formattedCode ||= "";

      return removeDoubleSpaces(
        [
          formattedValue,
          formattedCode ?? formattedUnit,
          formattedSystem ? `(${formattedSystem})` : "",
        ].join(" ")
      );
    },
  };
}
