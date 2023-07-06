import { parseFhirDateTime } from "../date-time-helpers.js";
import { ValueFormatter } from "../formatters.js";
import { formatRelativeDateTime } from "../lang-utils.js";

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

export const dateTimeFormatter: ValueFormatter<
  "dateTime",
  string | null | undefined,
  DatetimeFormatterOptions | null | undefined
> = {
  type: "dateTime",
  format: (value, options, formatterOptions) => {
    const fhirDateTime = parseFhirDateTime(value);
    const intlOptions: Intl.DateTimeFormatOptions = {};

    switch (fhirDateTime.flavour) {
      case "NA":
      case "time": {
        return value || "";
      }
      case "year": {
        intlOptions.year = "numeric";
        break;
      }
      case "year-month": {
        intlOptions.year = "numeric";
        intlOptions.month = convertDateStyleToMonthStyle(options?.dateStyle);
        break;
      }
      case "date": {
        if (options?.dateStyle === "relative") {
          return formatRelativeDateTime(
            formatterOptions.locale,
            fhirDateTime.date,
            options.relativeTo,
            options.relativeStyle,
            true,
          );
        }
        intlOptions.dateStyle = options?.dateStyle || undefined;
        break;
      }
      case "dateTime": {
        if (options?.dateStyle === "relative") {
          return formatRelativeDateTime(
            formatterOptions.locale,
            fhirDateTime.date,
            options.relativeTo,
            options.relativeStyle,
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
      fhirDateTime.date,
    );
  },
};

function convertDateStyleToMonthStyle(
  style: DatetimeFormatterOptions["dateStyle"] | null | undefined,
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
