import { Period } from "@bonfhir/fhirtypes/r5";
import { Formatter } from "../formatters";
import { dateTimeFormatter } from "./date-time";
import { PeriodFormatterOptions, periodFormatter } from "./period";
import { timeFormatter } from "./time";

describe("period", () => {
  const formatter = new Formatter()
    .register(periodFormatter)
    .register(dateTimeFormatter)
    .register(timeFormatter);

  it.each(<
    Array<[Period | undefined, PeriodFormatterOptions | undefined, string]>
  >[
    [
      {
        start: "2023-12-15",
        end: "2023-12-16",
      },
      undefined,
      "12/15/2023 - 12/16/2023",
    ],
    [
      {
        start: "2023-12-15",
      },
      undefined,
      "12/15/2023 - ongoing",
    ],
    [
      {
        start: "2015-02-07T13:28:17-05:00",
        end: "2015-02-08T13:28:17-05:00",
      },
      {
        dateStyle: "short",
        timeStyle: "long",
      },
      "2/7/15, 6:28:17 PM UTC - 2/8/15, 6:28:17 PM UTC",
    ],
    [
      {
        start: "2023-12-15T10:00:00",
        end: "2023-12-15T11:00:00",
      },
      undefined,
      "12/15/23, 10:00 AM - 11:00 AM",
    ],
    [
      {
        start: "2023-12-15T10:00:00",
        end: "2023-12-15T11:00:00",
      },
      { avoidDateDuplication: true },
      "12/15/23, 10:00 AM - 12/15/23, 11:00 AM",
    ],
    [
      {
        start: "2023-12-15T10:00:00",
        end: "2023-12-15T11:00:00",
      },
      { timeStyle: "long" },
      "12/15/23, 10:00:00 AM UTC - 11:00:00 AM UTC",
    ],
  ])("format %p %p => %p", (value, options, expected) => {
    expect(formatter.format("Period", value, options)).toEqual(expected);
  });
});
