import {
  asArray,
  cleanFhirValues,
  truncate,
  urlSafeConcat,
} from "./lang-utils.js";

describe("lang-utils", () => {
  describe("asArray", () => {
    it("should return an array if the value is not an array", () => {
      expect(asArray("test")).toEqual(["test"]);
    });

    it("should return an array if the value is an array", () => {
      expect(asArray(["test"])).toEqual(["test"]);
    });
  });

  describe("truncate", () => {
    it.each`
      value                    | options                                      | expected
      ${""}                    | ${undefined}                                 | ${""}
      ${undefined}             | ${undefined}                                 | ${undefined}
      ${"Hello world"}         | ${{ length: 5, suffix: "" }}                 | ${"Hello"}
      ${"Hello, world"}        | ${{ length: 5, suffix: "", separator: "," }} | ${"Hello"}
      ${"Hello, world, again"} | ${{ length: 10, separator: /,\s/ }}          | ${"Hello, world..."}
      ${"Hello, world"}        | ${{ length: 20, suffix: "" }}                | ${"Hello, world"}
      ${"Hello, world"}        | ${{ length: 20, suffix: "..." }}             | ${"Hello, world"}
    `(
      "returns $expected when given value=$value, length=$length, omission=$omission, and separator=$separator",
      ({ value, options, expected }) => {
        expect(truncate(value, options)).toEqual(expected);
      }
    );
  });

  describe("urlSafeConcat", () => {
    it.each([
      [[], ""],
      [["http://localhost", "fhir/api/"], "http://localhost/fhir/api/"],
      [["http://localhost", "/fhir/api"], "http://localhost/fhir/api"],
      [["http://localhost/", "fhir/api"], "http://localhost/fhir/api"],
      [["http://localhost/", "/fhir/api"], "http://localhost/fhir/api"],
      [["http://localhost/", "/fhir/api/"], "http://localhost/fhir/api/"],
      [
        [new URL("http://localhost/"), undefined, "/fhir/api/"],
        "http://localhost/fhir/api/",
      ],
    ])("%p -> $%p", (urls, expected) => {
      expect(urlSafeConcat(...urls)).toEqual(expected);
    });
  });

  describe("cleanFhirValues", () => {
    it.each([
      [{}, undefined],
      [{ name: "" }, undefined],
      [{ name: "Acme, Inc" }, { name: "Acme, Inc" }],
      [{ name: ["Acme, Inc", ""] }, { name: ["Acme, Inc"] }],
      [
        { name: [{ family: "Doe" }, { given: [] }], birthDate: "2001-01-01" },
        { name: [{ family: "Doe" }], birthDate: "2001-01-01" },
      ],
    ])("%p == %p", (input, expected) => {
      expect(cleanFhirValues(input)).toEqual(expected);
    });
  });
});
