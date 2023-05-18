/**
 * Reference decorators for r4b/4.3.0
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { DomainResource, Reference } from "./fhir-types.codegen";
import { Formatter, withValueFormatter } from "./formatters";
import { humanNameFormatter } from "./value-formatters";

/**
 * Mapping of domain resource type and decorator function that are used to augment references created by the
 * reference function.
 */
export const ReferenceDecorators: Record<
  string,
  (resource: DomainResource, reference: Reference) => Reference
> = {
  Account: decorate,
  ActivityDefinition: decorate,
  CapabilityStatement: decorate,
  CarePlan: decorate,
  CareTeam: decorate,
  ChargeItemDefinition: decorate,
  Citation: decorate,
  CodeSystem: decorate,
  CompartmentDefinition: decorate,
  Composition: decorate,
  ConceptMap: decorate,
  Contract: decorate,
  Endpoint: decorate,
  EventDefinition: decorate,
  Evidence: decorate,
  EvidenceVariable: decorate,
  ExampleScenario: decorate,
  FamilyMemberHistory: decorate,
  GraphDefinition: decorate,
  Group: decorate,
  HealthcareService: decorate,
  ImplementationGuide: decorate,
  InsurancePlan: decorate,
  Library: decorate,
  List: decorate,
  Location: decorate,
  Measure: decorate,
  MessageDefinition: decorate,
  NamingSystem: decorate,
  OperationDefinition: decorate,
  Organization: decorate,
  PackagedProductDefinition: decorate,
  Patient: decorate,
  Person: decorate,
  PlanDefinition: decorate,
  Practitioner: decorate,
  Questionnaire: decorate,
  RelatedPerson: decorate,
  ResearchDefinition: decorate,
  ResearchElementDefinition: decorate,
  ResearchStudy: decorate,
  SearchParameter: decorate,
  StructureDefinition: decorate,
  StructureMap: decorate,
  SubscriptionTopic: decorate,
  TerminologyCapabilities: decorate,
  TestReport: decorate,
  TestScript: decorate,
  ValueSet: decorate,
};

function decorate(resource: DomainResource, reference: Reference): Reference {
  const name = (resource as any).name;
  const title: string = (resource as any).title;
  if (typeof name === "string" && name.length > 0) {
    reference.display = name.trim();
  } else if (typeof name === "object") {
    reference.display = withValueFormatter<typeof humanNameFormatter>(
      Formatter.default
    ).format("HumanName", name, { max: 1 });
  } else if (title) {
    reference.display = title;
  }

  return reference;
}
