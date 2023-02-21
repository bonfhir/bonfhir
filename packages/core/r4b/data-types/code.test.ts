import { FhirCodeFormatOptions, fhirCodeTypeAdapter } from "./code";

describe("fhirCodeTypeAdapter", () => {
  it("exposes the locale", () => {
    const adapter = fhirCodeTypeAdapter("fr-CA");
    expect(adapter.locale).toEqual("fr-CA");
  });

  describe("parse", () => {
    const adapter = fhirCodeTypeAdapter();

    it.each([
      ["  123  ", "123"],
      [undefined, undefined],
      // eslint-disable-next-line unicorn/no-null
      [null, undefined],
    ])("parse %p", (value, expected) => {
      expect(adapter.parse(value)).toEqual(expected);
    });
  });

  describe("format", () => {
    const adapter = fhirCodeTypeAdapter();
    const colorValueSetExpansion: FhirCodeFormatOptions = {
      valueSetExpansions: [
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
      // eslint-disable-next-line unicorn/no-null
      ["  123  ", null, "123"],
      ["  456  ", undefined, "456"],
      [undefined, undefined, ""],
      // eslint-disable-next-line unicorn/no-null
      [null, undefined, ""],
      ["0", colorValueSetExpansion, "red"],
      ["3", colorValueSetExpansion, "3"],
    ])("parse %p", (value, formatOptions, expected) => {
      expect(adapter.format(value, formatOptions)).toEqual(expected);
    });
  });

  describe("with an unknown locale", () => {
    it("raises an error", () => {
      expect(() => fhirCodeTypeAdapter("nope")).toThrowError(
        "Incorrect locale information provided"
      );
    });
  });
});
