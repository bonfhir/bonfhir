import { Period } from "../fhir-types.codegen";
import { ValueFormatter, WithValueFormatter } from "../formatters";
import { DatetimeFormatterOptions } from "./date-time";

export type PeriodFormatterOptions = DatetimeFormatterOptions;

export const periodFormatter: ValueFormatter<
  "Period",
  Period | null | undefined,
  PeriodFormatterOptions | null | undefined
> = {
  type: "Period",
  format: (value, options, formatterOptions) => {
    if (!value?.start) return "";

    const withDateTimeFormatterOptions =
      formatterOptions.formatter as WithValueFormatter<
        "dateTime",
        string | undefined,
        DatetimeFormatterOptions
      >;
    const formattedStartDateTime = withDateTimeFormatterOptions.format(
      "dateTime",
      value.start,
      options
    );
    const formattedEndDateTime = value.end
      ? withDateTimeFormatterOptions.format("dateTime", value.end, options)
      : "ongoing";

    return [formattedStartDateTime, "-", formattedEndDateTime]
      .filter(Boolean)
      .join(" ");
  },
};
