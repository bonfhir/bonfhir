/* eslint-disable @typescript-eslint/no-explicit-any */
import { DecimalFormatterOptions, decimalFormatter } from "./decimal";

describe("decimal", () => {
  it.each(<
    Array<[string | undefined, DecimalFormatterOptions | undefined, string]>
  >[
    [0, undefined, "0"],
    [123, undefined, "123"],
    ["123.00", undefined, "123.00"],
    ["987654321.001", { notation: "compact-short" }, "988M"],
    ["987654321.002", { notation: "compact-long" }, "988 million"],
    ["987654321.00", { notation: "scientific" }, "9.877E8"],
    ["987654321.00", { notation: "engineering" }, "987.654E6"],
    [undefined, undefined, ""],
  ])("given %p", (value, formatOptions, expected) => {
    expect(
      decimalFormatter.format(value, formatOptions, { locale: "en-us" } as any)
    ).toEqual(expected);
  });
});
