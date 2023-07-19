import { Formatter } from "../formatters";
import { TimeFormatterOptions, timeFormatter } from "./time";

describe("time", () => {
  const formatter = new Formatter().register(timeFormatter);

  it.each(<Array<[string, TimeFormatterOptions | undefined, string]>>[
    ["18:30:25.123", undefined, "6:30 PM"],
    [
      "18:30:25.123",
      { timeStyle: "full" },
      "6:30:25 PM Coordinated Universal Time",
    ],
    ["18:30:25.123", { timeStyle: "short" }, "6:30 PM"],
    ["18:30:25", { timeStyle: "medium" }, "6:30:25 PM"],
  ])("format %p %p => %p", (value, options, expected) => {
    expect(formatter.format("time", value, options)).toEqual(expected);
  });
});
