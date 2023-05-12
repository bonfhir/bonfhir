import { ValueFormatter } from "../formatters";

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

/**
 * A dateTime, or partial dateTime (e.g. just year or year + month) as used in human communication.
 *
 * @see https://hl7.org/fhir/datatypes.html#dateTime
 */

export type DateTimeFormatterOptions =
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
  "datetime",
  string | null | undefined,
  DateTimeFormatterOptions | null | undefined
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

/**
 * @see https://momentjs.com/docs/#/displaying/fromnow/
 * @see https://momentjs.com/docs/#/displaying/tonow/
 */
function formatRelativeDateTime(
  locale: string | undefined,
  value: Date,
  relativeTo: string | number | Date | null | undefined,
  relativeStyle: "long" | "short" | null | undefined,
  dateOnlyMode = false
) {
  const relativeToDate = relativeTo ? new Date(relativeTo) : new Date();
  const relative = new Intl.RelativeTimeFormat(locale || undefined, {
    style: relativeStyle ?? undefined,
    numeric: "auto",
  });

  if (
    dateOnlyMode &&
    value.getUTCFullYear() === relativeToDate.getUTCFullYear() &&
    value.getUTCMonth() === relativeToDate.getUTCMonth() &&
    value.getUTCDate() === relativeToDate.getUTCDate()
  ) {
    return relative.format(0, "day");
  }

  const diffSec = Math.floor(
    (relativeToDate.getTime() - value.getTime()) / 1000
  );

  // from now
  if (diffSec >= 0) {
    if (diffSec < 44) {
      return relative.format(-diffSec, "seconds");
    } else if (diffSec < 89) {
      return relative.format(-1, "minute");
    } else if (diffSec < 2640) {
      return relative.format(-Math.floor(diffSec / 60), "minutes");
    } else if (diffSec < 5340) {
      return relative.format(-1, "hour");
    } else if (diffSec < 75_600) {
      return relative.format(-Math.floor(diffSec / 3600), "hours");
    } else if (diffSec < 126_000) {
      return relative.format(-1, "day");
    } else if (diffSec < 2_160_000) {
      return relative.format(-Math.floor(diffSec / 86_400), "days");
    } else if (diffSec < 3_888_000) {
      return relative.format(-1, "month");
    } else if (diffSec < 27_561_600) {
      const monthDiff = relativeToDate.getMonth() - value.getMonth();
      const yearDiff = relativeToDate.getFullYear() - value.getFullYear();
      return relative.format(-(monthDiff + yearDiff * 12), "months");
    } else if (diffSec < 47_260_800) {
      return relative.format(-1, "year");
    }

    return relative.format(-Math.floor(diffSec / 31_104_000), "years");
  }

  // in now
  if (diffSec > -44) {
    return relative.format(-diffSec, "seconds");
  } else if (diffSec > -89) {
    return relative.format(-1, "minute");
  } else if (diffSec > -2640) {
    return relative.format(-Math.floor(diffSec / 60), "minutes");
  } else if (diffSec > -5340) {
    return relative.format(-1, "hour");
  } else if (diffSec > -75_600) {
    return relative.format(-Math.floor(diffSec / 3600), "hours");
  } else if (diffSec > -126_000) {
    return relative.format(1, "day");
  } else if (diffSec > -2_160_000) {
    return relative.format(-Math.floor(diffSec / 86_400), "days");
  } else if (diffSec > -3_888_000) {
    return relative.format(1, "month");
  } else if (diffSec > -27_561_600) {
    const monthDiff = relativeToDate.getMonth() - value.getMonth();
    const yearDiff = relativeToDate.getFullYear() - value.getFullYear();
    return relative.format(-(monthDiff + yearDiff * 12), "months");
  } else if (diffSec > -47_260_800) {
    return relative.format(1, "year");
  }

  return relative.format(-Math.floor(diffSec / 31_104_000), "years");
}
