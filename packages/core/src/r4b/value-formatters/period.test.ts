import { Period } from "../fhir-types.codegen";
import { Formatter } from "../formatters";
import { dateTimeFormatter } from "./datetime";
import { PeriodFormatterOptions, periodFormatter } from "./period";

describe("period", () => {
  const formatter = new Formatter()
    .register(periodFormatter)
    .register(dateTimeFormatter);

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
  ])("format %p", (value, options, expected) => {
    expect(formatter.format("period", value, options)).toEqual(expected);
  });
});
