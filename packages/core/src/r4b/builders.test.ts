import { build, id } from "./builders";
import { DomainResourceTypes } from "./fhir-types.codegen";

describe("builders", () => {
  describe("build", () => {
    it.each(DomainResourceTypes)("build %p", (resourceType) => {
      const patient = build(resourceType, {});

      expect(patient.resourceType).toEqual(resourceType);
      expect(patient.text).toBeDefined();
    });
  });

  describe("id", () => {
    it.each(<Array<[Parameters<typeof id>[0], ReturnType<typeof id>]>>[
      [undefined, undefined],
      ["", undefined],
      [
        "60425589-5a3f-4479-9524-03e5cf69e13d",
        "60425589-5a3f-4479-9524-03e5cf69e13d",
      ],
      [
        "Patient/60425589-5a3f-4479-9524-03e5cf69e13d",
        "60425589-5a3f-4479-9524-03e5cf69e13d",
      ],
      [
        { reference: "Patient/60425589-5a3f-4479-9524-03e5cf69e13d" },
        "60425589-5a3f-4479-9524-03e5cf69e13d",
      ],
      [
        build("Patient", {
          id: "Patient/60425589-5a3f-4479-9524-03e5cf69e13d",
        }),
        "60425589-5a3f-4479-9524-03e5cf69e13d",
      ],
    ])("%p => %p", (value, expected) => {
      expect(id(value)).toEqual(expected);
    });
  });
});
