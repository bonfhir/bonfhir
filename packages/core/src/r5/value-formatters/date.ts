import { ValueFormatter } from "../formatters.js";
import { formatRelativeDateTime } from "../lang-utils.js";

/**
 * A date, or partial date (e.g. just year or year + month) as used in human communication.
 *
 * @see https://hl7.org/fhir/datatypes.html#date
 */
export type DateFormatterOptions =
  | {
      dateStyle?: "full" | "long" | "medium" | "short" | null | undefined;
    }
  | {
      dateStyle: "relative";
      relativeStyle?: "long" | "short" | null | undefined;
      /** From when the relative computation happen - defaults to now. */
      relativeTo?: string | number | Date | null | undefined;
    };

export const dateFormatter: ValueFormatter<
  "date",
  string | null | undefined,
  DateFormatterOptions | null | undefined
> = {
  type: "date",
  format: (value, options, formatterOptions) => {
    if (!value) {
      return "";
    }

    const matchingData = value
      .trim()
      .match(
        /^(?<year>\d(\d(\d[1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(?<month>0[1-9]|1[0-2])(-(?<day>0[1-9]|[12]\d|3[01]))?)?$/
      )?.groups as { year?: string; month?: string; day?: string };

    if (!matchingData?.year) {
      return value;
    }

    const { year, month, day } = matchingData;
    const yearNumber = Number.parseInt(year);
    const monthNumber = month ? Number.parseInt(month) : undefined;
    const dayNumber = day ? Number.parseInt(day) : undefined;
    const flavour = day ? "full" : month ? "year-month" : "year";
    const date = new Date(
      Date.UTC(yearNumber, monthNumber ? monthNumber - 1 : 0, dayNumber || 1)
    );

    const intlOptions: Intl.DateTimeFormatOptions = {
      timeZone: "UTC",
    };

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
      case "full": {
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
    }

    return new Intl.DateTimeFormat(formatterOptions.locale, intlOptions).format(
      date
    );
  },
};

function convertDateStyleToMonthStyle(
  style: DateFormatterOptions["dateStyle"] | null | undefined
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
