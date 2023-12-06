/* eslint-disable unicorn/no-null */
import { build } from "./builders";
import { AnyResourceType, Reference, Resource } from "./fhir-types.codegen";
import {
  asArray,
  asResource,
  cleanFhirValues,
  findReference,
  findReferences,
  resourcesAreEqual,
  truncate,
  urlSafeConcat,
} from "./lang-utils";

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
      },
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

  describe("resourcesAreEqual", () => {
    it.each([
      [build("Patient", { id: "1" }), build("Patient", { id: "2" }), true],
      [
        build("Patient", { id: "1", name: [{ family: "Doe" }] }),
        build("Patient", { id: "2", name: [{ family: "Smith" }] }),
        false,
      ],
      [
        build("Patient", {
          id: "1",
          name: [{ family: "Doe" }],
          birthDate: "2023-01-01",
        }),
        build("Patient", {
          id: "2",
          name: [{ family: "Doe" }],
          birthDate: "2023-01-01",
        }),
        true,
      ],
      [
        build("Patient", {
          id: "1",
          name: [{ family: "Doe" }],
          birthDate: "2023-01-01",
        }),
        build("Patient", {
          birthDate: "2023-01-01",
          name: [{ family: "Doe" }],
          id: "2",
        }),
        true,
      ],
    ] satisfies Array<[Resource, Resource, boolean]>)(
      "%p == %p",
      (a, b, expected) => {
        expect(resourcesAreEqual(a, b)).toEqual(expected);
      },
    );
  });

  describe("asResource", () => {
    it.each([
      ["Patient", undefined, undefined],
      ["Patient", null, undefined],
      ["Patient", {} as Resource, undefined],
      ["Patient", { resourceType: "Appointment" }, undefined],
      ["Patient", { resourceType: "Patient" }, { resourceType: "Patient" }],
    ] satisfies Array<[AnyResourceType, Resource | null | undefined, unknown]>)(
      "%p == %p",
      (type, value, expected) => {
        expect(asResource(type, value)).toEqual(expected);
      },
    );
  });

  describe("findReference", () => {
    it.each([
      ["Patient", undefined, undefined],
      ["Patient", null, undefined],
      ["Patient", [], undefined],
      [
        "Patient",
        [
          { reference: "Appointment/2" },
          { reference: "Patient/1" },
          { reference: "Patient/2" },
        ],
        { reference: "Patient/1" },
      ],
    ] satisfies Array<
      [AnyResourceType, Reference[] | null | undefined, unknown]
    >)("%p == %p", (type, value, expected) => {
      expect(findReference(value, type)).toEqual(expected);
    });
  });

  describe("findReferences", () => {
    it.each([
      ["Patient", undefined, []],
      ["Patient", null, []],
      ["Patient", [], []],
      [
        "Patient",
        [
          { reference: "Appointment/2" },
          { reference: "Patient/1" },
          { reference: "Patient/2" },
        ],
        [{ reference: "Patient/1" }, { reference: "Patient/2" }],
      ],
    ] satisfies Array<
      [AnyResourceType, Reference[] | null | undefined, unknown]
    >)("%p == %p", (type, value, expected) => {
      expect(findReferences(value, type)).toEqual(expected);
    });
  });
});
