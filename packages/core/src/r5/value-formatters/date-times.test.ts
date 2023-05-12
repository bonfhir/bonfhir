import { Formatter } from "../formatters";
import {
  DateFormatterOptions,
  DateTimeFormatterOptions,
  dateFormatter,
  dateTimeFormatter,
} from "./date-times";

describe("date-times", () => {
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

  describe("datetime", () => {
    it.each(<Array<[string, DateTimeFormatterOptions | undefined, string]>>[
      ["2023", undefined, "2023"],
      ["2023-02", undefined, "2023"],
      ["2023-02-08", undefined, "2/8/2023"],
      ["2023-02-08", { dateStyle: "full" }, "Wednesday, February 8, 2023"],
      ["2023-02-08", { dateStyle: "medium" }, "Feb 8, 2023"],
      ["2023-02-08", { dateStyle: "short" }, "2/8/23"],
      [
        "2023-02-08",
        { dateStyle: "relative", relativeTo: "2023-02-09" },
        "yesterday",
      ],
      ["2023-02", { dateStyle: "medium" }, "Feb 2023"],
      [
        "2015-02-07T13:28:17-05:00",
        { dateStyle: "long", timeStyle: "medium" },
        "February 7, 2015 at 6:28:17 PM",
      ],
      [
        "2015-02-07T13:28:17-05:00",
        { dateStyle: "medium", timeStyle: "long" },
        "Feb 7, 2015, 6:28:17 PM UTC",
      ],
      [
        "2015-02-07T13:28:17-05:00",
        { dateStyle: "medium", timeStyle: "medium" },
        "Feb 7, 2015, 6:28:17 PM",
      ],
      ["2015-02-07T13:28:17-05:00", undefined, "2/7/15, 6:28 PM"],
      [
        "2015-02-07T13:28:17-05:00",
        { timeStyle: "full" },
        "2/7/15, 6:28:17 PM Coordinated Universal Time",
      ],
      [
        "2015-02-07T13:28:17-05:00",
        { dateStyle: "full" },
        "Saturday, February 7, 2015 at 6:28 PM",
      ],
      [
        "2015-02-07T13:28:17-05:00",
        { dateStyle: "relative", relativeTo: "2015-02-07T13:28:17-05:00" },
        "now",
      ],
      [
        "2015-02-07T13:28:17-05:00",
        { dateStyle: "relative", relativeTo: "2015-02-07T13:28:20-05:00" },
        "3 seconds ago",
      ],
      [
        "2015-02-07T13:28:17-05:00",
        { dateStyle: "relative", relativeTo: "2015-02-07T13:29:20-05:00" },
        "1 minute ago",
      ],
      [
        "2015-02-07T13:28:17-05:00",
        { dateStyle: "relative", relativeTo: "2015-02-07T14:29:20-05:00" },
        "1 hour ago",
      ],
      [
        "2015-02-07T13:28:17-05:00",
        { dateStyle: "relative", relativeTo: "2015-02-08T14:29:20Z" },
        "20 hours ago",
      ],
      [
        "2015-02-07T13:28:17-05:00",
        { dateStyle: "relative", relativeTo: "2015-02-07T13:25:20-05:00" },
        "in 3 minutes",
      ],
      [
        "2015-02-07T13:28:17-05:00",
        { dateStyle: "relative", relativeTo: "2015-02-07T10:25:20-05:00" },
        "in 4 hours",
      ],
    ])("format %p %p", (value, options, expected) => {
      expect(
        dateTimeFormatter.format(value, options, {
          formatter: {} as Formatter,
          locale: "en-us",
        })
      ).toEqual(expected);
    });
  });
});
