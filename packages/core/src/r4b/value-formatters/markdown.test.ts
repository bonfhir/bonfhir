import { Formatter } from "../formatters";
import { MarkdownFormatterOptions, markdownFormatter } from "./markdown";

describe("markdown", () => {
  const formatter = new Formatter().register(markdownFormatter);

  it.each(<
    Array<
      [string | undefined | null, MarkdownFormatterOptions, string | undefined]
    >
  >[
    ["_456_", undefined, "_456_"],
    [
      "**234** _123_",
      { style: "html" },
      "<p><strong>234</strong> <em>123</em></p>",
    ],
    ["*234* _123_", { style: "bareString" }, "234 123"],
  ])("format %p %p => %p", (value, style, expected) => {
    expect(formatter.format("markdown", value, style)).toEqual(expected);
  });
});
