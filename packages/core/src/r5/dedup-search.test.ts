import { AnyResource } from "@bonfhir/fhirtypes/r5";
import { build, codeableConcept } from "./builders";
import { fhirDedupSearch } from "./dedup-search";

describe("fhirDedupSearch", () => {
  it.each([
    [build("Organization", {}), undefined],
    [build("Organization", { name: "Acme, Inc" }), "name=Acme%2C%20Inc"],
    [
      build("Medication", {
        code: codeableConcept({
          system: "http://hl7.org/fhir/sid/ndc",
          code: "0409-6531-02",
          display: "Vancomycin Hydrochloride (VANCOMYCIN HYDROCHLORIDE)",
        }),
      }),
      "code=http%3A%2F%2Fhl7.org%2Ffhir%2Fsid%2Fndc|0409-6531-02",
    ],
    [
      build("DiagnosticReport", {
        effectiveDateTime: "2020-01-01",
        subject: { reference: "Patient/123" },
        code: codeableConcept({
          system: "http://loinc.org",
          code: "58410-2",
          display:
            "Complete blood count (hemogram) panel - Blood by Automated count",
        }),
        status: "final",
      }),
      "effectiveDateTime=2020-01-01&code=http%3A%2F%2Floinc.org|58410-2&subject=Patient%2F123",
    ],
    [
      build("Patient", {
        identifier: [
          {
            use: "usual",
            type: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                  code: "MR",
                },
              ],
            },
            system: "urn:oid:1.2.36.146.595.217.0.1",
            value: "12345",
            period: {
              start: "2001-05-06",
            },
            assigner: {
              display: "Acme Healthcare",
            },
          },
        ],
      }),
      "identifier=urn%3Aoid%3A1.2.36.146.595.217.0.1|12345",
    ],
  ] satisfies Array<[AnyResource, string | undefined]>)(
    `return a dedup search %p => %p`,
    (resource, expected) => {
      const result = fhirDedupSearch(resource);
      if (expected === undefined) {
        expect(result).toBeFalsy();
      } else {
        expect(result?.href).toEqual(expected);
      }
    },
  );
});
