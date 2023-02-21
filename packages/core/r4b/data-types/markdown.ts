import { marked } from "marked";
import { FhirDataTypeAdapter } from "../data-type-adapter";

/**
 * A FHIR string (see above) that may contain markdown syntax for optional processing
 * by a markdown presentation engine
 *
 * @see https://hl7.org/fhir/datatypes.html#markdown
 */

export interface FhirMarkdownFormatOptions {
  style?: "markdown" | "bareString" | "html" | "original";
}

export interface FhirMarkdownTypeAdapter {
  locale?: FhirDataTypeAdapter["locale"];

  /**
   * Parse markdown
   *
   * @see https://hl7.org/fhir/datatypes.html#markdown
   */
  parse(value: string | null | undefined): string | null | undefined;

  /**
   * Format a FHIR date
   *
   * @see https://hl7.org/fhir/datatypes.html#markdown
   */
  format(
    value: string | null | undefined,
    options?: FhirMarkdownFormatOptions | null | undefined
  ): string;
}

/**
 * Return a {@link FhirMarkdownTypeAdapter} that uses the [`Intl` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
 * (ECMAScript Internationalization API)
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirMarkdownTypeAdapter(
  locale?: string | undefined
): FhirMarkdownTypeAdapter {
  // JIT locale check
  Intl.DateTimeFormat(locale);

  return {
    locale,
    parse(value) {
      if (!value?.trim()) {
        return;
      }

      return value.trim();
    },

    format(value, options) {
      const formattedValue = this.parse(value);

      if (!formattedValue) return "";

      switch (options?.style) {
        case "bareString":
          return marked
            .parse(formattedValue)
            .replace(/<\/?[^>]+(>|$)/gi, "")
            .trim();
        case "html":
          return marked.parse(formattedValue).trim();
        case "markdown":
        case "original":
        // eslint-disable-next-line unicorn/no-null, no-fallthrough
        case null:
        case undefined:
          return formattedValue;
      }
    },
  };
}
