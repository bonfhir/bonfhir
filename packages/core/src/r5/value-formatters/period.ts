import { Period } from "../fhir-types.codegen";
import { ValueFormatter, WithValueFormatter } from "../formatters";
import { DatetimeFormatterOptions } from "./datetime";

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
        "datetime",
        string | undefined,
        DatetimeFormatterOptions
      >;
    const formattedStartDateTime = withDateTimeFormatterOptions.format(
      "datetime",
      value.start,
      options
    );
    const formattedEndDateTime = value.end
      ? withDateTimeFormatterOptions.format("datetime", value.end, options)
      : "ongoing";

    return [formattedStartDateTime, "-", formattedEndDateTime]
      .filter(Boolean)
      .join(" ");
  },
};
