import { FhirDataTypeAdapter } from "../data-type-adapter";
import { fhirDateRegexpFragment } from "./helpers";

/**
 * A date, or partial date (e.g. just year or year + month) as used in human communication.
 *
 * @see https://hl7.org/fhir/datatypes.html#date
 */

export interface FhirDateFormatOptions {
  dateStyle?: "full" | "long" | "medium" | "short" | null | undefined;
}

export interface FhirDateTypeAdapter {
  locale?: FhirDataTypeAdapter["locale"];

  /**
   * Parse a FHIR date
   *
   * @see https://hl7.org/fhir/datatypes.html
   */
  parse(value: string | null | undefined): FhirDate | undefined;

  /**
   * Format a FHIR date
   *
   * @see https://hl7.org/fhir/datatypes.html
   */
  format(
    value: FhirDate | string | null | undefined,
    options?: FhirDateFormatOptions | null | undefined
  ): string;
}

/**
 * A parsed FHIR date
 *
 * @see https://hl7.org/fhir/datatypes.html#date
 */
export interface FhirDate {
  /**
   * The date as a Javascript Date. Only the date portion is significant, you must ignore the time.
   * May be inaccurate if the original value was missing day or month information.
   */
  date: Date;

  /**
   * The original flavour - indicates if it only had year, year-month, or was a complete date.
   */
  flavour: "year" | "year-month" | "full";

  year: number;

  /**
   * The month number, **starting at 1**
   * Be careful, as the Javascript Date object starts month at 0 :-(.
   */
  month: number | undefined;

  /**
   * The day number, **starting at 1**
   */
  day: number | undefined;
}

const fhirDateRegexp = new RegExp(`^${fhirDateRegexpFragment}$`);

/**
 * Return a {@link FhirDateTypeAdapter} that uses the [`Intl` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
 * (ECMAScript Internationalization API)
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirDateTypeAdapter(
  locale?: string | undefined
): FhirDateTypeAdapter {
  // JIT locale check
  Intl.DateTimeFormat(locale);

  return {
    locale,
    parse(value) {
      if (!value?.trim()) {
        return;
      }

      const matchingData = value.trim().match(fhirDateRegexp)?.groups;
      if (!matchingData?.year)
        throw new Error(
          "Value does not match the fhir date format as described in `https://hl7.org/fhir/datatypes.html#date'"
        );

      const { year, month, day } = matchingData;
      const yearNumber = parseInt(year);
      const monthNumber = month ? parseInt(month) : undefined;
      const dayNumber = day ? parseInt(day) : undefined;

      return {
        date: new Date(
          yearNumber,
          monthNumber ? monthNumber - 1 : 0,
          dayNumber || 1
        ),
        flavour: day ? "full" : month ? "year-month" : "year",
        year: yearNumber,
        month: monthNumber,
        day: dayNumber,
      };
    },

    format(value, options) {
      const fhirDate = typeof value === "string" ? this.parse(value) : value;

      if (!fhirDate) return "";

      const intlOptions: Intl.DateTimeFormatOptions = {
        timeZone: "UTC",
      };

      switch (fhirDate.flavour) {
        case "year":
          intlOptions.year = "numeric";
          break;
        case "year-month":
          intlOptions.year = "numeric";
          intlOptions.month = convertDateStyleToMonthStyle(options?.dateStyle);
          break;
        case "full":
          intlOptions.dateStyle = options?.dateStyle || undefined;
          break;
        default:
          throw new Error(`Unknown date flavour ${fhirDate.flavour}`);
      }

      return new Intl.DateTimeFormat(locale, intlOptions).format(fhirDate.date);
    },
  };
}

function convertDateStyleToMonthStyle(
  style: FhirDateFormatOptions["dateStyle"] | null | undefined
): "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined {
  switch (style) {
    case "full":
    case "long":
      return "long";
    case "medium":
      return "short";
    case "short":
      return "2-digit";
    default:
      return undefined;
  }
}
