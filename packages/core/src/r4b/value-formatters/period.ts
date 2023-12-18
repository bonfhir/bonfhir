import { parseFhirDateTime } from "../date-time-helpers";
import { Period } from "../fhir-types.codegen";
import {
  ValueFormatter,
  cleanUpCommonOptions,
  withValueFormatter,
} from "../formatters";
import { DatetimeFormatterOptions, dateTimeFormatter } from "./date-time";
import { timeFormatter } from "./time";

export type PeriodFormatterOptions = DatetimeFormatterOptions & {
  avoidDateDuplication?: boolean;
};

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
    ).format("dateTime", value.start, cleanUpCommonOptions(options));
    let formattedEndDateTime = value.end
      ? withValueFormatter<typeof dateTimeFormatter>(
          formatterOptions.formatter,
        ).format("dateTime", value.end, cleanUpCommonOptions(options))
      : "ongoing";

    if (options?.avoidDateDuplication !== true && value.start && value.end) {
      const parsedStartValue = parseFhirDateTime(value.start);
      const parsedEndValue = parseFhirDateTime(value.end);
      if (
        parsedStartValue.flavour === "dateTime" &&
        parsedEndValue.flavour === "dateTime" &&
        parsedStartValue.year == parsedEndValue.year &&
        parsedStartValue.month == parsedEndValue.month &&
        parsedStartValue.day == parsedEndValue.day
      ) {
        formattedEndDateTime = withValueFormatter<typeof timeFormatter>(
          formatterOptions.formatter,
        ).format("time", value.end.slice(11), {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          timeStyle: (options as any)?.timeStyle,
        });
      }
    }

    return [formattedStartDateTime, "-", formattedEndDateTime]
      .filter(Boolean)
      .join(" ");
  },
};
