/* eslint-disable @typescript-eslint/no-explicit-any */
import conceptMap from "../../fixtures/concept-map-example.fhir.json";
import medicationDispense from "../../fixtures/medication-dispense-example.fhir.json";
import medication from "../../fixtures/medication-example.fhir.json";
import organization from "../../fixtures/organization-example.fhir.json";
import patient from "../../fixtures/patient-example.fhir.json";
import riskAssessment from "../../fixtures/risk-assessment-example.fhir.json";
import { reference } from "./references.codegen";

describe("references", () => {
  it.each([conceptMap, medication, organization, patient, riskAssessment])(
    "build with display ($resourceType)",
    (resource) => {
      const result = reference(resource as any);
      expect(result.display).toBeTruthy();
    }
  );

  it.each([medicationDispense])(
    "build with no decorator ($resourceType)",
    (resource) => {
      const result = reference(resource as any);
      expect(result.display).toBeFalsy();
    }
  );
});
