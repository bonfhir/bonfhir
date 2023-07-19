import { Formatter } from "../formatters";
import { CodeFormatterOptions, codeFormatter } from "./code";

describe("code", () => {
  const formatter = new Formatter().register(codeFormatter);

  const options: CodeFormatterOptions = {
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
    ["0", options, "red"],
    ["3", options, "3"],
  ])("format %p %p => %p", (value, options, expected) => {
    expect(formatter.format("code", value, options)).toEqual(expected);
  });
});
