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

    const matchingData = value
      .trim()
      .match(/^([01]\d|2[0-3]):[0-5]\d:([0-5]\d|60)(\.\d{1,9})?$/);
    if (!matchingData) {
      return value.trim();
    }

    const intlOptions: Intl.DateTimeFormatOptions = {
      timeZone: "UTC",
      dateStyle: undefined,
      timeStyle: options?.timeStyle || "short",
    };
    intlOptions.timeStyle = options?.timeStyle || "short";

    const date = new Date(`2000-01-01 ${value}`);
    return new Intl.DateTimeFormat(formatterOptions.locale, intlOptions).format(
      date
    );
  },
};
