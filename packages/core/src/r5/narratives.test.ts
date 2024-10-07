import conceptMap from "../../fixtures/concept-map-example.fhir.json";
import medication from "../../fixtures/medication-example.fhir.json";
import organization from "../../fixtures/organization-example.fhir.json";
import patient from "../../fixtures/patient-example.fhir.json";
import riskAssessment from "../../fixtures/risk-assessment-example.fhir.json";
import { AnyDomainResource } from "@bonfhir/fhirtypes/r5";
import { narrative } from "./narratives.codegen";

describe("narrative", () => {
  it.each(<Array<AnyDomainResource>>[
    conceptMap,
    medication,
    organization,
    patient,
    riskAssessment,
  ])("generate ($resourceType)", (resource) => {
    const result = narrative(resource);
    expect(result).toMatchSnapshot();
  });
});
