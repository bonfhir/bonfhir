/* eslint-disable @typescript-eslint/no-explicit-any */
import conceptMap from "../../fixtures/concept-map-example.fhir.json";
import medication from "../../fixtures/medication-example.fhir.json";
import organization from "../../fixtures/organization-example.fhir.json";
import patient from "../../fixtures/patient-example.fhir.json";
import riskAssessment from "../../fixtures/risk-assessment-example.fhir.json";
import { reference } from "./builders";

describe("builders", () => {
  describe("reference", () => {
    it.each([conceptMap, medication, organization, patient, riskAssessment])(
      "build with display ($resourceType)",
      (resource) => {
        const result = reference(resource as any);
        expect(result.display).toBeTruthy();
      }
    );
  });
});
