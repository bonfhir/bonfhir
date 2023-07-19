/* eslint-disable @typescript-eslint/no-explicit-any */
import * as conceptMap from "../../fixtures/concept-map-example.fhir.json";
import * as medicationDispense from "../../fixtures/medication-dispense-example.fhir.json";
import * as medication from "../../fixtures/medication-example.fhir.json";
import * as organization from "../../fixtures/organization-example.fhir.json";
import * as patient from "../../fixtures/patient-example.fhir.json";
import * as riskAssessment from "../../fixtures/risk-assessment-example.fhir.json";
import { reference } from "./references.codegen";

describe("references", () => {
  it.each([conceptMap, medication, organization, patient, riskAssessment])(
    "build with display ($resourceType)",
    (resource) => {
      const result = reference(resource as any);
      expect(result.display).toBeTruthy();
    },
  );

  it.each([medicationDispense])(
    "build with no decorator ($resourceType)",
    (resource) => {
      const result = reference(resource as any);
      expect(result.display).toBeFalsy();
    },
  );
});
