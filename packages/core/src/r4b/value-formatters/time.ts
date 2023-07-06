import { parseFhirDateTime } from "../date-time-helpers.js";
import { ValueFormatter } from "../formatters.js";

/**
 * A time, or partial time (e.g. just year or year + month) as used in human communication.
 *
 * @see https://hl7.org/fhir/datatypes.html#time
 */

export interface TimeFormatterOptions {
  timeStyle?: "full" | "long" | "medium" | "short" | null | undefined;
}

export const timeFormatter: ValueFormatter<
  "time",
  string | null | undefined,
  TimeFormatterOptions | null | undefined
> = {
  type: "time",
  format: (value, options, formatterOptions) => {
    if (!value?.trim()) {
      return "";
    }

    const parsedDateTime = parseFhirDateTime(value);
    if (parsedDateTime.flavour !== "time") {
      return value.trim();
    }

    const intlOptions: Intl.DateTimeFormatOptions = {
      dateStyle: undefined,
      timeStyle: options?.timeStyle || "short",
    };
    intlOptions.timeStyle = options?.timeStyle || "short";

    return new Intl.DateTimeFormat(formatterOptions.locale, intlOptions).format(
      parsedDateTime.date,
    );
  },
};
