import { FhirMarkdownFormatOptions, fhirMarkdownTypeAdapter } from "./markdown";

describe("fhirMarkdownTypeAdapter", () => {
  const adapter = fhirMarkdownTypeAdapter("fr-CA");

  it("exposes the locale", () => {
    expect(adapter.locale).toEqual("fr-CA");
  });

  describe("format", () => {
    it.each([
      [" __123__ ", "__123__"],
      ["  ", undefined],
      [undefined, undefined],
      // eslint-disable-next-line unicorn/no-null
      [null, undefined],
    ])("parse %p", (value, expected) => {
      expect(adapter.parse(value)).toEqual(expected);
    });

    it.each(<
      Array<
        [
          string | undefined | null,
          FhirMarkdownFormatOptions,
          string | undefined
        ]
      >
    >[
      ["_456_", undefined, "_456_"],
      [
        "**234** _123_",
        { style: "html" },
        "<p><strong>234</strong> <em>123</em></p>",
      ],
      ["*234* _123_", { style: "bareString" }, "234 123"],
    ])("format %p", (value, style, expected) => {
      expect(adapter.format(value, style)).toEqual(expected);
    });
  });

  describe("with an unknown locale", () => {
    it("raises an error", () => {
      expect(() => fhirMarkdownTypeAdapter("nope")).toThrowError(
        "Incorrect locale information provided"
      );
    });
  });
});
