import { Range } from "fhir/r4";
import { FhirDataTypeAdapter } from "../data-type-adapter";
import { FhirCodeFormatOptions, fhirCodeTypeAdapter } from "./code";
import { FhirDecimalFormatOptions, fhirDecimalTypeAdapter } from "./decimal";
import { removeDoubleSpaces } from "./helpers";

/**
 * A set of ordered Quantity values defined by a low and high limit.
 *
 * @see https://hl7.org/fhir/datatypes.html#range
 */

export type FhirRangeFormatOptions = {
  codeValueSetExpansions: FhirCodeFormatOptions["valueSetExpansions"];
  numbersNotation: FhirDecimalFormatOptions["notation"];
};

export interface FhirRangeTypeAdapter {
  locale: FhirDataTypeAdapter["locale"];

  /**
   * Format a FHIR range
   *
   * @see https://hl7.org/fhir/datatypes.html#range
   */
  format(
    value: Range | null | undefined,
    options?: FhirRangeFormatOptions | null | undefined
  ): string;
}

/**
 * Return a {@link FhirRangeTypeAdapter}
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirRangeTypeAdapter(
  locale?: string | undefined
): FhirRangeTypeAdapter {
  // JIT locale check
  Intl.NumberFormat(locale);

  return {
    locale,
    format(fhirRange, options) {
      if (!fhirRange?.low || !fhirRange?.high) return "";

      const decimalAdapter = fhirDecimalTypeAdapter(locale);
      const formattedLow = decimalAdapter.format(fhirRange.low.value, {
        notation: options?.numbersNotation,
      });
      const formattedHigh = decimalAdapter.format(fhirRange.high.value, {
        notation: options?.numbersNotation,
      });

      const formattedUnit =
        fhirRange.low.unit?.trim() || fhirRange.high.unit?.trim() || "";

      // system https://www.hl7.org/fhir/datatypes-definitions.html#Quantity.system
      const formattedSystem =
        fhirRange.low.system?.trim() || fhirRange.high.system?.trim() || "";

      // code https://www.hl7.org/fhir/datatypes-definitions.html#Quantity.code
      let formattedCode: string;
      if (fhirRange.low.code || fhirRange.high.code)
        formattedCode = fhirCodeTypeAdapter(locale).format(
          fhirRange.low.code || fhirRange.high.code,
          {
            valueSetExpansions: options?.codeValueSetExpansions,
          }
        );
      formattedCode ||= "";

      return removeDoubleSpaces(
        [
          `[${formattedLow} ... ${formattedHigh}]${
            formattedCode?.length ? formattedCode : formattedUnit
          }`,
          formattedSystem ? `(${formattedSystem})` : "",
        ].join(" ")
      );
    },
  };
}
