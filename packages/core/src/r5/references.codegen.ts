/**
 * Reference decorators for r5/5.0.0
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  AnyDomainResource,
  CodeableConcept,
  DomainResource,
  Reference,
  Retrieved,
} from "./fhir-types.codegen";
import { Formatter, withValueFormatter } from "./formatters";
import {
  codeableConceptFormatter,
  humanNameFormatter,
} from "./value-formatters";

export interface ReferenceOptions {
  versionSpecific?: boolean | null | undefined;
}

export type ReferenceFunction = {
  <TTargetResource extends AnyDomainResource = AnyDomainResource>(
    resource: Retrieved<TTargetResource>,
    options?: ReferenceOptions | null | undefined
  ): Reference<TTargetResource>;

  /**
   * Mapping of domain resource type and decorator function that are used to augment references created by the
   * reference function.
   */
  decorators?: Record<
    string,
    (resource: DomainResource, reference: Reference) => Reference
  >;
};

/**
 * Build a reference from a resource.
 */
let reference: ReferenceFunction = function <
  TTargetResource extends AnyDomainResource = AnyDomainResource
>(
  this: ReferenceFunction,
  resource: Retrieved<TTargetResource>,
  options?: ReferenceOptions | null | undefined
): Reference<TTargetResource> {
  let reference: Reference<TTargetResource> = {
    reference: options?.versionSpecific
      ? `${resource.resourceType}/${resource.id}/_history/${resource.meta.versionId}`
      : `${resource.resourceType}/${resource.id}`,
    type: resource.resourceType,
  };

  const decorator = this.decorators?.[resource.resourceType];

  if (decorator) {
    reference = decorator(resource, reference) as Reference<TTargetResource>;
  }

  return reference;
};

reference.decorators = {
  Account: decorate,
  ActivityDefinition: decorate,
  ActorDefinition: decorate,
  AdverseEvent: decorate,
  AllergyIntolerance: decorate,
  ArtifactAssessment: decorate,
  AuditEvent: decorate,
  Basic: decorate,
  CanonicalResource: decorate,
  CapabilityStatement: decorate,
  CarePlan: decorate,
  CareTeam: decorate,
  ChargeItem: decorate,
  ChargeItemDefinition: decorate,
  Citation: decorate,
  CodeSystem: decorate,
  CompartmentDefinition: decorate,
  Composition: decorate,
  ConceptMap: decorate,
  Condition: decorate,
  ConditionDefinition: decorate,
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
  FormularyItem: decorate,
  GraphDefinition: decorate,
  Group: decorate,
  HealthcareService: decorate,
  ImagingSelection: decorate,
  ImplementationGuide: decorate,
  InsurancePlan: decorate,
  InventoryItem: decorate,
  Library: decorate,
  List: decorate,
  Location: decorate,
  ManufacturedItemDefinition: decorate,
  Measure: decorate,
  Medication: decorate,
  MedicationKnowledge: decorate,
  MessageDefinition: decorate,
  NamingSystem: decorate,
  NutritionIntake: decorate,
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
  RequestOrchestration: decorate,
  Requirements: decorate,
  ResearchStudy: decorate,
  RiskAssessment: decorate,
  Schedule: decorate,
  SearchParameter: decorate,
  SpecimenDefinition: decorate,
  StructureDefinition: decorate,
  StructureMap: decorate,
  Subscription: decorate,
  SubscriptionTopic: decorate,
  Task: decorate,
  TerminologyCapabilities: decorate,
  TestPlan: decorate,
  TestReport: decorate,
  TestScript: decorate,
  Transport: decorate,
  ValueSet: decorate,
};

reference = reference.bind(reference);

export { reference };

function decorate(resource: DomainResource, reference: Reference): Reference {
  const name = (resource as any).name;
  const title: string = (resource as any).title;
  const code: CodeableConcept = (resource as any).code;
  if (typeof name === "string" && name.length > 0) {
    reference.display = name.trim();
  } else if (typeof name === "object") {
    reference.display = withValueFormatter<typeof humanNameFormatter>(
      Formatter.default
    ).format("HumanName", name, { max: 1 });
  } else if (title) {
    reference.display = title;
  } else if (code) {
    reference.display = withValueFormatter<typeof codeableConceptFormatter>(
      Formatter.default
    ).format("CodeableConcept", code);
  }

  return reference;
}
