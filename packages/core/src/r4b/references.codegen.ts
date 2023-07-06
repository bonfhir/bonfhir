/**
 * Reference decorators for r4b/4.3.0
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  AnyResource,
  CodeableConcept,
  Reference,
  Resource,
  Retrieved,
} from "./fhir-types.codegen.js";
import { Formatter, withValueFormatter } from "./formatters.js";
import {
  codeableConceptFormatter,
  humanNameFormatter,
} from "./value-formatters/index.js";

export interface ReferenceOptions {
  versionSpecific?: boolean | null | undefined;
}

export const REFERENCE_DECORATORS: Record<
  string,
  (resource: Resource, reference: Reference) => Reference
> = {
  Account: decorate,
  ActivityDefinition: decorate,
  AllergyIntolerance: decorate,
  Basic: decorate,
  CapabilityStatement: decorate,
  CarePlan: decorate,
  CareTeam: decorate,
  ChargeItem: decorate,
  ChargeItemDefinition: decorate,
  Citation: decorate,
  ClinicalImpression: decorate,
  CodeSystem: decorate,
  CompartmentDefinition: decorate,
  Composition: decorate,
  ConceptMap: decorate,
  Condition: decorate,
  Contract: decorate,
  DetectedIssue: decorate,
  DiagnosticReport: decorate,
  Endpoint: decorate,
  EventDefinition: decorate,
  Evidence: decorate,
  EvidenceVariable: decorate,
  ExampleScenario: decorate,
  FamilyMemberHistory: decorate,
  Flag: decorate,
  GraphDefinition: decorate,
  Group: decorate,
  HealthcareService: decorate,
  ImplementationGuide: decorate,
  InsurancePlan: decorate,
  Library: decorate,
  List: decorate,
  Location: decorate,
  Measure: decorate,
  Medication: decorate,
  MedicationKnowledge: decorate,
  MessageDefinition: decorate,
  NamingSystem: decorate,
  NutritionProduct: decorate,
  Observation: decorate,
  ObservationDefinition: decorate,
  OperationDefinition: decorate,
  Organization: decorate,
  OrganizationAffiliation: decorate,
  PackagedProductDefinition: decorate,
  Patient: decorate,
  Person: decorate,
  PlanDefinition: decorate,
  Practitioner: decorate,
  PractitionerRole: decorate,
  Procedure: decorate,
  Questionnaire: decorate,
  RelatedPerson: decorate,
  RequestGroup: decorate,
  ResearchDefinition: decorate,
  ResearchElementDefinition: decorate,
  ResearchStudy: decorate,
  RiskAssessment: decorate,
  SearchParameter: decorate,
  ServiceRequest: decorate,
  StructureDefinition: decorate,
  StructureMap: decorate,
  SubscriptionTopic: decorate,
  Substance: decorate,
  Task: decorate,
  TerminologyCapabilities: decorate,
  TestReport: decorate,
  TestScript: decorate,
  ValueSet: decorate,
};

/**
 * Build a reference from a resource.
 */
export function reference<TTargetResource extends AnyResource = AnyResource>(
  resource: Retrieved<TTargetResource>,
  options?: ReferenceOptions | null | undefined,
): Reference<TTargetResource> {
  let reference: Reference<TTargetResource> = {
    reference: options?.versionSpecific
      ? `${resource.resourceType}/${resource.id}/_history/${resource.meta.versionId}`
      : `${resource.resourceType}/${resource.id}`,
    type: resource.resourceType,
  };

  // We handle the case of temporary bundle references as well.
  if (resource.id?.startsWith("urn:uuid:")) {
    reference.reference = reference.reference?.split("/").slice(1).join("/");
  }

  const decorator = REFERENCE_DECORATORS?.[resource.resourceType];

  if (decorator) {
    reference = decorator(resource, reference) as Reference<TTargetResource>;
  }

  return reference;
}

function decorate(resource: Resource, reference: Reference): Reference {
  const name = (resource as any).name;
  const title: string = (resource as any).title;
  const code: CodeableConcept = (resource as any).code;
  if (typeof name === "string" && name.length > 0) {
    reference.display = name.trim();
  } else if (typeof name === "object") {
    reference.display = withValueFormatter<typeof humanNameFormatter>(
      Formatter.default,
    ).format("HumanName", name, { max: 1 });
  } else if (title) {
    reference.display = title;
  } else if (code) {
    reference.display = withValueFormatter<typeof codeableConceptFormatter>(
      Formatter.default,
    ).format("CodeableConcept", code);
  }

  return reference;
}
