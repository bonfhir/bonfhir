import { CodeableConcept } from "fhir/r4";
import { FhirDataTypeAdapter } from "../data-type-adapter";
import { FhirCodeFormatOptions } from "./code";
import { fhirCodingTypeAdapter } from "./coding";

/**
 * A CodeableConcept represents a value that is usually supplied by
 *  providing a reference to one or more terminologies or ontologies but
 *  may also be defined by the provision of text.
 * This is a common pattern in healthcare data.
 *
 * @see https://hl7.org/fhir/datatypes.html#codeableConcept
 */

export type FhirCodeableConceptFormatOptions = {
  valueSetExpansions?: FhirCodeFormatOptions["valueSetExpansions"];
  style?: "short" | "full" | "valuesOnly";
};

export interface FhirCodeableConceptTypeAdapter {
  locale: FhirDataTypeAdapter["locale"];

  /**
   * Format a FHIR codeableConcept
   *
   * @see https://hl7.org/fhir/datatypes.html#codeableConcept
   */
  format(
    value: CodeableConcept | null | undefined,
    options?: FhirCodeableConceptFormatOptions | null | undefined
  ): string;
}

/**
 * Return a {@link FhirCodeableConceptTypeAdapter}
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirCodeableConceptTypeAdapter(
  locale?: string | undefined
): FhirCodeableConceptTypeAdapter {
  // JIT locale check
  Intl.NumberFormat(locale);

  return {
    locale,
    format(fhirCodeableConcept, options) {
      if (!fhirCodeableConcept?.coding) return "";

      const codingAdapter = fhirCodingTypeAdapter(locale);
      const formattedCodings = fhirCodeableConcept.coding.map((coding) =>
        codingAdapter.format(coding, {
          valueSetExpansions: options?.valueSetExpansions,
        })
      );

      switch (options?.style) {
        // eslint-disable-next-line unicorn/no-null
        case null:
        case undefined:
        case "short":
          return fhirCodeableConcept.text || `[${formattedCodings.join(", ")}]`;
        case "valuesOnly":
          return `[${formattedCodings.join(", ")}]`;
        case "full":
          return `${fhirCodeableConcept.text} (${formattedCodings.join(", ")})`;
        default:
          throw new Error(`Unknown style option ${options?.style}`);
      }
    },
  };
}
