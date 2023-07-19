import { build, codeableConcept, id } from "./builders";
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

  describe("codeableConcept", () => {
    it.each(<
      Array<
        [
          Parameters<typeof codeableConcept>[0],
          ReturnType<typeof codeableConcept>,
        ]
      >
    >[
      [undefined, undefined],
      [{ code: "M" }, { coding: [{ code: "M" }] }],
      [
        { code: "M", display: "Married" },
        { coding: [{ code: "M", display: "Married" }], text: "Married" },
      ],
      [
        [{ code: "M", display: "Married" }],
        { coding: [{ code: "M", display: "Married" }], text: "Married" },
      ],
      [
        [
          { code: "M", display: "Married" },
          { code: "M2", display: "Married2", userSelected: true },
        ],
        {
          coding: [
            { code: "M", display: "Married" },
            { code: "M2", display: "Married2", userSelected: true },
          ],
          text: "Married2",
        },
      ],
    ])("%p => %p", (value, expected) => {
      expect(codeableConcept(value)).toEqual(expected);
    });
  });
});
