import { CodeFormatterOptions, codeFormatter } from "./code";

describe("code", () => {
  const colorValueSetExpansion: CodeFormatterOptions = {
    expansions: [
      {
        code: "0",
        display: "red",
      },
      {
        code: "1",
        display: "blue",
      },
    ],
  };

  it.each([
    ["  456  ", undefined, "456"],
    [undefined, undefined, ""],
    // eslint-disable-next-line unicorn/no-null
    [null, undefined, ""],
    ["0", colorValueSetExpansion, "red"],
    ["3", colorValueSetExpansion, "3"],
  ])("parse %p", (value, options, expected) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(codeFormatter.format(value, options, {} as any)).toEqual(expected);
  });
});
