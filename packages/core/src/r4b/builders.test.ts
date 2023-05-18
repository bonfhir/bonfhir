/* eslint-disable @typescript-eslint/no-explicit-any */
import conceptMap from "../../fixtures/conceptmap-example.fhir.json";
import organization from "../../fixtures/organization-example.fhir.json";
import patient from "../../fixtures/patient-example.fhir.json";
import { reference } from "./builders";

describe("builders", () => {
  describe("reference", () => {
    it.each([patient, organization, conceptMap])(
      "build reference with display ($resourceType)",
      (resource) => {
        const result = reference(resource as any);
        expect(result.display).toBeTruthy();
        console.log(JSON.stringify(result, undefined, 2));
      }
    );
  });
});
