import { build } from "./builders";
import { hasComplexParameters } from "./fhir-client";
import { Parameters as FhirParameters } from "@bonfhir/fhirtypes/r5";

describe("fhir-client", () => {
  describe("hasComplexParameters", () => {
    it.each([
      [{ resourceType: "Parameters" }, false],
      [{ resourceType: "Parameters", parameter: [] }, false],
      [
        {
          resourceType: "Parameters",
          parameter: [
            {
              name: "graph",
              valueUri: "patient-with-appointments",
            },
          ],
        },
        false,
      ],
      [
        {
          resourceType: "Parameters",
          parameter: [
            {
              name: "graph",
              resource: build("Patient", {}),
            },
          ],
        },
        true,
      ],
      [
        {
          resourceType: "Parameters",
          parameter: [
            {
              name: "coding",
              valueCoding: {
                system: "http://example.com",
              },
            },
          ],
        },
        true,
      ],
      [
        {
          resourceType: "Parameters",
          parameter: [
            {
              name: "property",
              part: [
                {
                  name: "code",
                  valueCode: "code",
                },
              ],
            },
          ],
        },
        true,
      ],
    ] satisfies Array<[FhirParameters, boolean]>)(
      `should return %p for %p`,
      (parameters, expected) => {
        expect(hasComplexParameters(parameters)).toEqual(expected);
      },
    );
  });
});
