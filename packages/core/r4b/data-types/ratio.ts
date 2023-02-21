import { Ratio } from "fhir/r4";
import { FhirDataTypeAdapter } from "../data-type-adapter";
import { FhirCodeFormatOptions, fhirCodeTypeAdapter } from "./code";
import { FhirDecimalFormatOptions, fhirDecimalTypeAdapter } from "./decimal";
import { removeDoubleSpaces } from "./helpers";

/**
 * A relationship between two Quantity values expressed as a numerator and a denominator.
 *
 * @see https://hl7.org/fhir/datatypes.html#ratio
 */

export type FhirRatioFormatOptions = {
  codeValueSetExpansions: FhirCodeFormatOptions["valueSetExpansions"];
  numbersNotation: FhirDecimalFormatOptions["notation"];
};

export interface FhirRatioTypeAdapter {
  locale: FhirDataTypeAdapter["locale"];

  /**
   * Format a FHIR ratio
   *
   * @see https://hl7.org/fhir/datatypes.html#ratio
   */
  format(
    value: Ratio | null | undefined,
    options?: FhirRatioFormatOptions | null | undefined
  ): string;
}

/**
 * Return a {@link FhirRatioTypeAdapter}
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirRatioTypeAdapter(
  locale?: string | undefined
): FhirRatioTypeAdapter {
  // JIT locale check
  Intl.NumberFormat(locale);

  return {
    locale,
    format(fhirRatio, options) {
      if (!fhirRatio?.numerator || !fhirRatio?.denominator) return "";

      const formattedNumeratorValue = fhirDecimalTypeAdapter(locale).format(
        fhirRatio.numerator.value,
        {
          notation: options?.numbersNotation,
        }
      );
      const formattedDenominatorValue = fhirDecimalTypeAdapter(locale).format(
        fhirRatio.denominator.value,
        {
          notation: options?.numbersNotation,
        }
      );

      const formattedUnit = fhirRatio.numerator.unit?.trim() || "";
      const formattedSystem = fhirRatio.numerator.system?.trim() || "";

      let formattedCode: string;
      if (fhirRatio.numerator.code)
        formattedCode = fhirCodeTypeAdapter(locale).format(
          fhirRatio.numerator.code,
          {
            valueSetExpansions: options?.codeValueSetExpansions,
          }
        );
      formattedCode ||= "";

      return removeDoubleSpaces(
        [
          `${formattedNumeratorValue}/${formattedDenominatorValue}`,
          formattedCode ?? formattedUnit,
          formattedSystem ? `(${formattedSystem})` : "",
        ].join(" ")
      );
    },
  };
}
