import { FhirDataTypeAdapter } from "../data-type-adapter";
import {
  fhirDateRegexpFragment,
  fhirTimeWithZoneRegexpFragment,
} from "./helpers";

/**
 * A dateTime, or partial dateTime (e.g. just year or year + month) as used in human communication.
 *
 * @see https://hl7.org/fhir/datatypes.html#dateTime
 */

export interface FhirDateTimeFormatOptions {
  dateStyle?: "full" | "long" | "medium" | "short" | null;
  timeStyle?: "full" | "long" | "medium" | "short" | null;
}

export interface FhirDateTimeTypeAdapter {
  locale?: FhirDataTypeAdapter["locale"];

  /**
   * Parse a FHIR dateTime
   *
   * @see https://hl7.org/fhir/datatypes.html
   */
  parse(value: string | null | undefined): FhirDateTime | undefined;

  /**
   * Format a FHIR dateTime
   *
   * @see https://hl7.org/fhir/datatypes.html
   */
  format(
    value: FhirDateTime | string | null | undefined,
    options?: FhirDateTimeFormatOptions | null | undefined
  ): string;
}

/**
 * A parsed FHIR dateTime
 *
 * @see https://hl7.org/fhir/datatypes.html#dateTime
 */
export interface FhirDateTime {
  /**
   * The dateTime as a Javascript DateTime. Only the dateTime portion is significant, you must ignore the time.
   * May be inaccurate if the original value was missing day or month information.
   */
  date: Date;

  /**
   * The original flavour - indicates if it only had year, year-month, or was a complete dateTime.
   */
  flavour: "year" | "year-month" | "year-month-day" | "full";

  year: number;

  /**
   * The month number, **starting at 1**
   * Be careful, as the Javascript DateTime object starts month at 0 :-(.
   */
  month: number | undefined;

  /**
   * The day number, **starting at 1**
   */
  day: number | undefined;

  time: string | undefined;
}

const fhirDateTimeRegexp = new RegExp(
  `^${fhirDateRegexpFragment}(T${fhirTimeWithZoneRegexpFragment})?$`
);

/**
 * Return a {@link FhirDateTimeTypeAdapter} that uses the [`Intl` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
 * (ECMAScript Internationalization API)
 * @param locale - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
 */
export function fhirDateTimeTypeAdapter(
  locale?: string | undefined
): FhirDateTimeTypeAdapter {
  // JIT locale check
  Intl.DateTimeFormat(locale);

  return {
    locale,
    parse(value) {
      if (!value?.trim()) {
        return;
      }

      const matchingData = value.trim().match(fhirDateTimeRegexp)?.groups;
      if (!matchingData?.year)
        throw new Error(
          "Value does not match the fhir dateTime format as described in `https://hl7.org/fhir/datatypes.html#dateTime'"
        );

      const { year, month, day, timeWithTimezone } = matchingData;
      const yearNumber = parseInt(year);
      const monthNumber = month ? parseInt(month) : undefined;
      const dayNumber = day ? parseInt(day) : undefined;
      const date = timeWithTimezone
        ? new Date(value)
        : new Date(
            yearNumber,
            monthNumber ? monthNumber - 1 : 0,
            dayNumber || 1
          );
      let flavour: FhirDateTime["flavour"];
      if (timeWithTimezone) flavour = "full";
      if (day) flavour ||= "year-month-day";
      if (month) flavour ||= "year-month";
      flavour ||= "year";

      return {
        date: date,
        flavour: flavour,
        year: yearNumber,
        month: monthNumber,
        day: dayNumber,
        time: timeWithTimezone,
      };
    },

    format(value, options) {
      const fhirDateTime =
        typeof value === "string" ? this.parse(value) : value;

      if (!fhirDateTime) return "";

      const intlOptions: Intl.DateTimeFormatOptions = {};

      switch (fhirDateTime.flavour) {
        case "year":
          intlOptions.year = "numeric";
          break;
        case "year-month":
          intlOptions.year = "numeric";
          intlOptions.month = convertDateStyleToMonthStyle(options?.dateStyle);
          break;
        case "year-month-day":
          intlOptions.dateStyle = options?.dateStyle || undefined;
          break;
        case "full":
          // by default we always show the date
          intlOptions.dateStyle =
            options?.dateStyle === undefined
              ? "short"
              : options.dateStyle || undefined;
          // by default we always show the time
          intlOptions.timeStyle =
            options?.timeStyle === undefined
              ? "short"
              : options.timeStyle || undefined;
          break;
        default:
          throw new Error(`Unknown date flavour ${fhirDateTime.flavour}`);
      }

      return new Intl.DateTimeFormat(locale, intlOptions).format(
        fhirDateTime.date
      );
    },
  };
}

function convertDateStyleToMonthStyle(
  style: FhirDateTimeFormatOptions["dateStyle"] | null | undefined
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
