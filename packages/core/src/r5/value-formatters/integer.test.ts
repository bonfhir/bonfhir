import { Formatter } from "../formatters";
import { IntegerFormatterOptions, integerFormatter } from "./integer";

describe("integer", () => {
  const formatter = new Formatter().register(integerFormatter);

  it.each(<
    Array<[number | undefined, IntegerFormatterOptions | undefined, string]>
  >[
    [123, undefined, "123"],
    [987_654_321, { notation: "compact-short" }, "988M"],
    [987_654_321, { notation: "compact-long" }, "988 million"],
    [987_654_321, { notation: "scientific" }, "9.877E8"],
    [987_654_321, { notation: "engineering" }, "987.654E6"],
    [-123, undefined, "-123"],
    [undefined, undefined, ""],
  ])("format %p", (value, options, expected) => {
    expect(formatter.format("integer", value, options)).toEqual(expected);
  });
});
