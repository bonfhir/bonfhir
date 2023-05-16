import { ValueFormatter } from "../formatters";
import { formatRelativeDateTime } from "../lang-utils";

/**
 * A dateTime, or partial dateTime (e.g. just year or year + month) as used in human communication.
 *
 * @see https://hl7.org/fhir/datatypes.html#dateTime
 */

export type DatetimeFormatterOptions =
  | {
      dateStyle?: "full" | "long" | "medium" | "short" | null;
      timeStyle?: "full" | "long" | "medium" | "short" | null;
    }
  | {
      dateStyle: "relative";
      relativeStyle?: "long" | "short" | null | undefined;
      /** From when the relative computation happen - defaults to now. */
      relativeTo?: string | number | Date | null | undefined;
    };

export const datetimeFormatter: ValueFormatter<
  "datetime",
  string | null | undefined,
  DatetimeFormatterOptions | null | undefined
> = {
  type: "datetime",
  format: (value, options, formatterOptions) => {
    if (!value) {
      return "";
    }

    const matchingData = value
      .trim()
      .match(
        /^(?<year>\d(\d(\d[1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(?<month>0[1-9]|1[0-2])(-(?<day>0[1-9]|[12]\d|3[01]))?)?(T(?<timeWithTimezone>(?<hours>[01]\d|2[0-3]):(?<minutes>[0-5]\d):(?<seconds>[0-5]\d|60)(?<milliseconds>\\.\d{1,9})?(?<timezone>Z|(\\+|-)((0\d|1[0-3]):[0-5]\d|14:00))))?$/
      )?.groups as {
      year?: string;
      month?: string;
      day?: string;
      timeWithTimezone?: string;
    };

    if (!matchingData?.year) {
      return value;
    }

    const { year, month, day, timeWithTimezone } = matchingData;
    const yearNumber = Number.parseInt(year);
    const monthNumber = month ? Number.parseInt(month) : undefined;
    const dayNumber = day ? Number.parseInt(day) : undefined;
    let flavour;
    if (timeWithTimezone) flavour = "full";
    if (day) flavour ||= "year-month-day";
    if (month) flavour ||= "year-month";
    flavour ||= "year";

    const date = timeWithTimezone
      ? new Date(value)
      : new Date(yearNumber, monthNumber ? monthNumber - 1 : 0, dayNumber || 1);

    const intlOptions: Intl.DateTimeFormatOptions = {};

    switch (flavour) {
      case "year": {
        intlOptions.year = "numeric";
        break;
      }
      case "year-month": {
        intlOptions.year = "numeric";
        intlOptions.month = convertDateStyleToMonthStyle(options?.dateStyle);
        break;
      }
      case "year-month-day": {
        if (options?.dateStyle === "relative") {
          return formatRelativeDateTime(
            formatterOptions.locale,
            date,
            options.relativeTo,
            options.relativeStyle,
            true
          );
        }
        intlOptions.dateStyle = options?.dateStyle || undefined;
        break;
      }
      case "full": {
        if (options?.dateStyle === "relative") {
          return formatRelativeDateTime(
            formatterOptions.locale,
            date,
            options.relativeTo,
            options.relativeStyle
          );
        }

        // by default we always show the date
        intlOptions.dateStyle =
          options?.dateStyle === undefined
            ? "short"
            : options?.dateStyle || undefined;
        // by default we always show the time
        intlOptions.timeStyle =
          options?.timeStyle === undefined
            ? "short"
            : options.timeStyle || undefined;
        break;
      }
    }

    return new Intl.DateTimeFormat(formatterOptions.locale, intlOptions).format(
      date
    );
  },
};

function convertDateStyleToMonthStyle(
  style: DatetimeFormatterOptions["dateStyle"] | null | undefined
): "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined {
  switch (style) {
    case "full":
    case "long": {
      return "long";
    }
    case "medium": {
      return "short";
    }
    case "short": {
      return "2-digit";
    }
    default: {
      return undefined;
    }
  }
}
