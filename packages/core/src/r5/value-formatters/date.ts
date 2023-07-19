import { parseFhirDateTime } from "../date-time-helpers";
import { ValueFormatter } from "../formatters";
import { formatRelativeDateTime } from "../lang-utils";

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

    const fhirDateTime = parseFhirDateTime(value);

    if (fhirDateTime.flavour === "dateTime") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (fhirDateTime as any).flavour = "date";
      fhirDateTime.date = new Date(
        fhirDateTime.year,
        fhirDateTime.month - 1,
        fhirDateTime.day,
      );
    }

    const intlOptions: Intl.DateTimeFormatOptions = {
      timeZone: "UTC",
    };

    switch (fhirDateTime.flavour) {
      case "NA":
      case "time": {
        return value;
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
    }

    return new Intl.DateTimeFormat(formatterOptions.locale, intlOptions).format(
      fhirDateTime.date,
    );
  },
};

function convertDateStyleToMonthStyle(
  style: DateFormatterOptions["dateStyle"] | null | undefined,
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
