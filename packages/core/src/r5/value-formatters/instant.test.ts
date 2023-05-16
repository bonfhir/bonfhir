import { Formatter } from "../formatters";
import { InstantFormatterOptions, instantFormatter } from "./instant";

describe("instant", () => {
  const formatter = new Formatter().register(instantFormatter);

  it.each(<Array<[string, InstantFormatterOptions | undefined, string]>>[
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
  ])("format %p %p => %p", (value, options, expected) => {
    expect(formatter.format("instant", value, options)).toEqual(expected);
  });
});
