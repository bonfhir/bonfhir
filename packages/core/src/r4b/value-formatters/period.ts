import { Period } from "../fhir-types.codegen";
import { ValueFormatter, WithValueFormatter } from "../formatters";
import { DateTimeFormatterOptions } from "./datetime";

export type PeriodFormatterOptions = DateTimeFormatterOptions;

export const periodFormatter: ValueFormatter<
  "period",
  Period | null | undefined,
  PeriodFormatterOptions | null | undefined
> = {
  type: "period",
  format: (value, options, formatterOptions) => {
    if (!value?.start) return "";

    const withDateTimeFormatterOptions =
      formatterOptions.formatter as WithValueFormatter<
        "datetime",
        string | undefined,
        DateTimeFormatterOptions
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
