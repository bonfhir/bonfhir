import { FhirDefinitions } from "./fhir-definitions.js";

describe("fhir-definitions", () => {
  ["r4b", "r5"].map((release) =>
    describe(release, () => {
      it("load", async () => {
        const result = await FhirDefinitions.load(release);
        expect(result.release).toMatch(/^r.+$/);
        expect(result.version).toMatch(/^\d+\.\d+\.\d+$/);
        expect(result.domainResources.length).toBeTruthy();
      });
    }),
  );
});
