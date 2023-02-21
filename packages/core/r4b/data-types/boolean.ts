/**
 * A boolean
 *
 * @see https://hl7.org/fhir/datatypes.html#boolean
 */

import merge from "lodash/merge";

export interface FhirBooleanFormatOptions {
  labels?: {
    true?: string;
    false?: string;
    nil?: string;
  };
}

export interface FhirBooleanTypeAdapter {
  locale: string | undefined;
  /**
   * Parse a FHIR boolean
   *
   * @see https://hl7.org/fhir/datatypes.html#boolean
   */
  parse(value: string | boolean | null | undefined): boolean | undefined;

  /**
   * Format a FHIR boolean
   *
   * @see https://hl7.org/fhir/datatypes.html#boolean
   */
  format(
    value: string | boolean | null | undefined,
    options?: FhirBooleanFormatOptions
  ): string;
}

const fhirBooleanRegexp = new RegExp("^(true)|(false)$");
const defaultLabels = {
  true: "true",
  false: "false",
  nil: "",
};

/**
 * Return a {@link FhirBooleanTypeAdapter}
 */
export function fhirBooleanTypeAdapter(
  locale: string | undefined
): FhirBooleanTypeAdapter {
  return {
    locale,
    parse(value) {
      if (typeof value === "boolean") return value;

      const sanitizedValue = value?.trim()?.toLowerCase();
      if (!sanitizedValue) {
        return;
      }

      // value is a string
      if (!fhirBooleanRegexp.test(sanitizedValue))
        throw new Error(
          "Value does not match the fhir boolean format as described in `https://hl7.org/fhir/datatypes.html#boolean`"
        );

      return sanitizedValue === "true";
    },

    format(value, options) {
      const fhirBoolean =
        typeof value === "boolean" ? value : this.parse(value);

      options ||= {};
      const labels = merge({}, defaultLabels, options.labels || {});
      switch (fhirBoolean) {
        case true:
          return labels["true"];
        case false:
          return labels["false"];
        // eslint-disable-next-line unicorn/no-null
        case null:
        case undefined:
          return labels["nil"];
      }
    },
  };
}
