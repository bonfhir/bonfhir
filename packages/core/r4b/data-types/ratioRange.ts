import { RatioRange } from "fhir/r4";
import { FhirDataTypeAdapter } from "../data-type-adapter";
import { FhirCodeFormatOptions, fhirCodeTypeAdapter } from "./code";
import { FhirDecimalFormatOptions, fhirDecimalTypeAdapter } from "./decimal";
import { removeDoubleSpaces } from "./helpers";

/**
 * A set of ordered Quantity values defined by a low and high limit.
 *
 * @see https://hl7.org/fhir/datatypes.html#ratioRange
 */

export type FhirRatioRangeFormatOptions = {
  valueSetExpansions: FhirCodeFormatOptions["valueSetExpansions"];
  numeratorValueSetExpansions: FhirCodeFormatOptions["valueSetExpansions"];
  denominatorValueSetExpansions: FhirCodeFormatOptions["valueSetExpansions"];
  numbersNotation: FhirDecimalFormatOptions["notation"];
};

export interface FhirRatioRangeTypeAdapter {
  locale: FhirDataTypeAdapter["locale"];

  /**
   * Format a FHIR ratioRange
   *
   * @see https://hl7.org/fhir/datatypes.html#ratioRange
   */
  format(
    value: RatioRange | null | undefined,
    options?: FhirRatioRangeFormatOptions | null | undefined
  ): string;
}

/**
 * Return a {@link FhirRatioRangeTypeAdapter}
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirRatioRangeTypeAdapter(
  locale?: string | undefined
): FhirRatioRangeTypeAdapter {
  // JIT locale check
  Intl.NumberFormat(locale);

  return {
    locale,
    format(fhirRatioRange, options) {
      if (
        !fhirRatioRange?.lowNumerator ||
        !fhirRatioRange?.highNumerator ||
        !fhirRatioRange?.denominator
      )
        return "";

      const decimalAdapter = fhirDecimalTypeAdapter(locale);
      const formattedLow = decimalAdapter.format(
        fhirRatioRange.lowNumerator.value,
        {
          notation: options?.numbersNotation,
        }
      );
      const formattedHigh = decimalAdapter.format(
        fhirRatioRange.highNumerator.value,
        {
          notation: options?.numbersNotation,
        }
      );

      const formattedNumeratorUnit =
        fhirRatioRange.lowNumerator.unit?.trim() ||
        fhirRatioRange.highNumerator.unit?.trim() ||
        "";
      const formattedDenominatorUnit =
        fhirRatioRange.lowNumerator.unit?.trim() ||
        fhirRatioRange.highNumerator.unit?.trim() ||
        "";

      const formattedNumeratorCode = fhirCodeTypeAdapter(locale).format(
        fhirRatioRange.lowNumerator.code || fhirRatioRange.highNumerator.code,
        {
          valueSetExpansions:
            options?.numeratorValueSetExpansions || options?.valueSetExpansions,
        }
      );

      const formattedDenominatorValue = fhirDecimalTypeAdapter(locale).format(
        fhirRatioRange.denominator.value,
        {
          notation: options?.numbersNotation,
        }
      );

      const formattedDenominatorCode = fhirCodeTypeAdapter(locale).format(
        fhirRatioRange.denominator?.code,
        {
          valueSetExpansions:
            options?.denominatorValueSetExpansions ||
            options?.valueSetExpansions,
        }
      );

      return removeDoubleSpaces(
        [
          `[${formattedLow} ... ${formattedHigh}]${
            formattedNumeratorCode ?? formattedNumeratorUnit
          }`,
          "/",
          `${formattedDenominatorValue}${
            formattedDenominatorCode ?? formattedDenominatorUnit
          }`,
        ].join(" ")
      );
    },
  };
}
