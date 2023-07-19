import { Period } from "../fhir-types.codegen";
import { ValueFormatter, withValueFormatter } from "../formatters";
import { DatetimeFormatterOptions, dateTimeFormatter } from "./date-time";

export type PeriodFormatterOptions = DatetimeFormatterOptions;

export const periodFormatter: ValueFormatter<
  "Period",
  Period | null | undefined,
  PeriodFormatterOptions | null | undefined
> = {
  type: "Period",
  format: (value, options, formatterOptions) => {
    if (!value?.start) return "";

    const formattedStartDateTime = withValueFormatter<typeof dateTimeFormatter>(
      formatterOptions.formatter,
    ).format("dateTime", value.start, options);
    const formattedEndDateTime = value.end
      ? withValueFormatter<typeof dateTimeFormatter>(
          formatterOptions.formatter,
        ).format("dateTime", value.end, options)
      : "ongoing";

    return [formattedStartDateTime, "-", formattedEndDateTime]
      .filter(Boolean)
      .join(" ");
  },
};
