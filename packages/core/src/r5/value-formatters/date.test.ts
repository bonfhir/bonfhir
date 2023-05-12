import { Formatter } from "../formatters";
import { DateFormatterOptions, dateFormatter } from "./date";

describe("date", () => {
  it.each(<Array<[string, DateFormatterOptions | undefined, string]>>[
    ["2023-12-31", undefined, "12/31/2023"],
    ["2023-02-08", { dateStyle: "full" }, "Wednesday, February 8, 2023"],
    ["2023-02-08", { dateStyle: "medium" }, "Feb 8, 2023"],
    ["2023-02-08", { dateStyle: "short" }, "2/8/23"],
    [
      "2023-02-08",
      {
        dateStyle: "relative",
        relativeTo: "2023-02-08",
      },
      "today",
    ],
    [
      "2023-02-08",
      { dateStyle: "relative", relativeTo: "2023-02-09" },
      "yesterday",
    ],
    [
      "2023-02-08",
      { dateStyle: "relative", relativeTo: "2023-02-12" },
      "4 days ago",
    ],
    [
      "2023-02-08",
      { dateStyle: "relative", relativeTo: "2023-03-09" },
      "last month",
    ],
    [
      "2023-02-08",
      { dateStyle: "relative", relativeTo: "2023-04-08" },
      "2 months ago",
    ],
    [
      "2023-02-08",
      { dateStyle: "relative", relativeTo: "2023-12-31" },
      "last year",
    ],
    [
      "2023-02-08",
      { dateStyle: "relative", relativeTo: "2025-12-31" },
      "2 years ago",
    ],
    [
      "2023-02-08",
      { dateStyle: "relative", relativeTo: "2023-02-07" },
      "tomorrow",
    ],
    [
      "2023-02-08",
      { dateStyle: "relative", relativeTo: "2023-02-04" },
      "in 4 days",
    ],
    [
      "2023-02-08",
      { dateStyle: "relative", relativeTo: "2023-01-09" },
      "next month",
    ],
    [
      "2023-02-08",
      { dateStyle: "relative", relativeTo: "2022-12-01" },
      "in 2 months",
    ],
    [
      "2023-02-08",
      { dateStyle: "relative", relativeTo: "2022-03-01" },
      "next year",
    ],
    [
      "2023-02-08",
      { dateStyle: "relative", relativeTo: "2020-12-31" },
      "in 3 years",
    ],
    ["2023-02", { dateStyle: "medium" }, "Feb 2023"],
    ["2023", undefined, "2023"],
  ])("format %p", (value, options, expected) => {
    expect(
      dateFormatter.format(value, options, {
        formatter: {} as Formatter,
        locale: "en-us",
      })
    ).toEqual(expected);
  });
});
