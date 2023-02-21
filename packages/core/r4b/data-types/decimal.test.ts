import Decimal from "decimal.js";
import {
  FhirDecimal,
  FhirDecimalFormatOptions,
  fhirDecimalTypeAdapter,
} from "./decimal";

describe("fhirDecimalTypeAdapter", () => {
  ["en-us", undefined].forEach((locale) => {
    describe(`with ${locale} as locale`, () => {
      const adapter = fhirDecimalTypeAdapter(locale);

      it("exposes the locale", () => {
        expect(adapter.locale).toEqual(locale);
      });

      describe("decimal", () => {
        it.each([
          ["12.3", 12.3, 3],
          [12.3, 12.3, 3],
          ["123.3e13", 1_233_000_000_000_000, 4],
          [123.3e13, 1_233_000_000_000_000, 4],
          ["123.3e134", 1.233e136, 4],
          [123.3e134, 1.233e136, 4],
          ["-1", -1, 1],
          [-1, -1, 1],
          ["-1.5", -1.5, 2],
          [-1.5, -1.5, 2],
        ])("parse %p", (value, expectedValue, expectedPrecision) => {
          const fhirDecimal = adapter.parse(value);
          const expectedObject = new Decimal(expectedValue) as FhirDecimal;
          expectedObject.significantDigits = expectedPrecision;
          expect(fhirDecimal).toEqual(expectedObject);
        });

        it.each(<Array<[string | FhirDecimal | number | undefined, string]>>[
          [12.01, "12.01"],
          ["123.00", "123.00"],
          [123, "123"],
          [1.2, "1.2"],
        ])("format %p", (value, expected) => {
          expect(adapter.format(value)).toEqual(expected);
        });
      });
    });
  });

  describe("format with options", () => {
    const adapter = fhirDecimalTypeAdapter();

    it.each(<
      Array<[string | undefined, FhirDecimalFormatOptions | undefined, string]>
    >[
      ["123.00", undefined, "123.00"],
      ["987654321.001", { notation: "compact-short" }, "988M"],
      ["987654321.002", { notation: "compact-long" }, "988 million"],
      ["987654321.00", { notation: "scientific" }, "9.877E8"],
      ["987654321.00", { notation: "engineering" }, "987.654E6"],
      [undefined, undefined, ""],
    ])("given %p", (value, formatOptions, expected) => {
      expect(adapter.format(value, formatOptions)).toEqual(expected);
    });
  });

  describe("with chinese locale", () => {
    const adapter = fhirDecimalTypeAdapter("zh-Hans-CN-u-nu-hanidec");

    describe("decimal", () => {
      it.each([
        ["123456.78900", "一二三,四五六.七八九〇〇"],
        [123_456.789, "一二三,四五六.七八九"],
        [
          -142e42,
          "-一四二,〇〇〇,〇〇〇,〇〇〇,〇〇〇,〇〇〇,〇〇〇,〇〇〇,〇〇〇,〇〇〇,〇〇〇,〇〇〇,〇〇〇,〇〇〇,〇〇〇",
        ],
      ])("format %p", (value, expected) => {
        expect(adapter.format(value)).toEqual(expected);
      });
    });
  });

  describe("with an unknown locale", () => {
    it("raises an error", () => {
      expect(() => fhirDecimalTypeAdapter("nope")).toThrowError(
        "Incorrect locale information provided"
      );
    });
  });
});
