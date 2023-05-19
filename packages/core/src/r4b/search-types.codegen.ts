/**
 * Typed search builders for r4b/4.3.0
 */

import { AnyDomainResourceType } from "./fhir-types.codegen";
import { FhirSearchBuilder } from "./search";

/**
 * Return a search query builder, whether for a specific resource or a generic one.
 *
 * @example
 * > fhirSearch().addString("name", "John").href
 * > "name=John"
 *
 * > fhirSearch("Patient").name("John").active("true").href
 * > "name=John&active=true"
 */
export function fhirSearch(resourceType?: null | undefined): FhirSearchBuilder;
export function fhirSearch<
  TDomainResourceType extends AnyDomainResourceType = AnyDomainResourceType
>(resourceType: TDomainResourceType): ExtractSearchBuilder<TDomainResourceType>;
export function fhirSearch<
  TDomainResourceType extends AnyDomainResourceType = AnyDomainResourceType
>(
  resourceType?: TDomainResourceType | null | undefined
): FhirSearchBuilder | ExtractSearchBuilder<TDomainResourceType>;
export function fhirSearch<
  TDomainResourceType extends AnyDomainResourceType = AnyDomainResourceType
>(
  resourceType?: TDomainResourceType | null | undefined
): FhirSearchBuilder | ExtractSearchBuilder<TDomainResourceType> {
  if (!resourceType) {
    return new FhirSearchBuilder();
  }

  switch (resourceType) {
    case "Account": {
      return new AccountFhirSearchBuilder();
    }
    case "ActivityDefinition": {
      return new ActivityDefinitionFhirSearchBuilder();
    }
    case "AdministrableProductDefinition": {
      return new AdministrableProductDefinitionFhirSearchBuilder();
    }
    case "AdverseEvent": {
      return new AdverseEventFhirSearchBuilder();
    }
    case "AllergyIntolerance": {
      return new AllergyIntoleranceFhirSearchBuilder();
    }
    case "Appointment": {
      return new AppointmentFhirSearchBuilder();
    }
    case "AppointmentResponse": {
      return new AppointmentResponseFhirSearchBuilder();
    }
    case "AuditEvent": {
      return new AuditEventFhirSearchBuilder();
    }
    case "Basic": {
      return new BasicFhirSearchBuilder();
    }
    case "BiologicallyDerivedProduct": {
      return new BiologicallyDerivedProductFhirSearchBuilder();
    }
    case "BodyStructure": {
      return new BodyStructureFhirSearchBuilder();
    }
    case "CapabilityStatement": {
      return new CapabilityStatementFhirSearchBuilder();
    }
    case "CarePlan": {
      return new CarePlanFhirSearchBuilder();
    }
    case "CareTeam": {
      return new CareTeamFhirSearchBuilder();
    }
    case "CatalogEntry": {
      return new CatalogEntryFhirSearchBuilder();
    }
    case "ChargeItem": {
      return new ChargeItemFhirSearchBuilder();
    }
    case "ChargeItemDefinition": {
      return new ChargeItemDefinitionFhirSearchBuilder();
    }
    case "Citation": {
      return new CitationFhirSearchBuilder();
    }
    case "Claim": {
      return new ClaimFhirSearchBuilder();
    }
    case "ClaimResponse": {
      return new ClaimResponseFhirSearchBuilder();
    }
    case "ClinicalImpression": {
      return new ClinicalImpressionFhirSearchBuilder();
    }
    case "ClinicalUseDefinition": {
      return new ClinicalUseDefinitionFhirSearchBuilder();
    }
    case "CodeSystem": {
      return new CodeSystemFhirSearchBuilder();
    }
    case "Communication": {
      return new CommunicationFhirSearchBuilder();
    }
    case "CommunicationRequest": {
      return new CommunicationRequestFhirSearchBuilder();
    }
    case "CompartmentDefinition": {
      return new CompartmentDefinitionFhirSearchBuilder();
    }
    case "Composition": {
      return new CompositionFhirSearchBuilder();
    }
    case "ConceptMap": {
      return new ConceptMapFhirSearchBuilder();
    }
    case "Condition": {
      return new ConditionFhirSearchBuilder();
    }
    case "Consent": {
      return new ConsentFhirSearchBuilder();
    }
    case "Contract": {
      return new ContractFhirSearchBuilder();
    }
    case "Coverage": {
      return new CoverageFhirSearchBuilder();
    }
    case "CoverageEligibilityRequest": {
      return new CoverageEligibilityRequestFhirSearchBuilder();
    }
    case "CoverageEligibilityResponse": {
      return new CoverageEligibilityResponseFhirSearchBuilder();
    }
    case "DetectedIssue": {
      return new DetectedIssueFhirSearchBuilder();
    }
    case "Device": {
      return new DeviceFhirSearchBuilder();
    }
    case "DeviceDefinition": {
      return new DeviceDefinitionFhirSearchBuilder();
    }
    case "DeviceMetric": {
      return new DeviceMetricFhirSearchBuilder();
    }
    case "DeviceRequest": {
      return new DeviceRequestFhirSearchBuilder();
    }
    case "DeviceUseStatement": {
      return new DeviceUseStatementFhirSearchBuilder();
    }
    case "DiagnosticReport": {
      return new DiagnosticReportFhirSearchBuilder();
    }
    case "DocumentManifest": {
      return new DocumentManifestFhirSearchBuilder();
    }
    case "DocumentReference": {
      return new DocumentReferenceFhirSearchBuilder();
    }
    case "Encounter": {
      return new EncounterFhirSearchBuilder();
    }
    case "Endpoint": {
      return new EndpointFhirSearchBuilder();
    }
    case "EnrollmentRequest": {
      return new EnrollmentRequestFhirSearchBuilder();
    }
    case "EnrollmentResponse": {
      return new EnrollmentResponseFhirSearchBuilder();
    }
    case "EpisodeOfCare": {
      return new EpisodeOfCareFhirSearchBuilder();
    }
    case "EventDefinition": {
      return new EventDefinitionFhirSearchBuilder();
    }
    case "Evidence": {
      return new EvidenceFhirSearchBuilder();
    }
    case "EvidenceReport": {
      return new EvidenceReportFhirSearchBuilder();
    }
    case "EvidenceVariable": {
      return new EvidenceVariableFhirSearchBuilder();
    }
    case "ExampleScenario": {
      return new ExampleScenarioFhirSearchBuilder();
    }
    case "ExplanationOfBenefit": {
      return new ExplanationOfBenefitFhirSearchBuilder();
    }
    case "FamilyMemberHistory": {
      return new FamilyMemberHistoryFhirSearchBuilder();
    }
    case "Flag": {
      return new FlagFhirSearchBuilder();
    }
    case "Goal": {
      return new GoalFhirSearchBuilder();
    }
    case "GraphDefinition": {
      return new GraphDefinitionFhirSearchBuilder();
    }
    case "Group": {
      return new GroupFhirSearchBuilder();
    }
    case "GuidanceResponse": {
      return new GuidanceResponseFhirSearchBuilder();
    }
    case "HealthcareService": {
      return new HealthcareServiceFhirSearchBuilder();
    }
    case "ImagingStudy": {
      return new ImagingStudyFhirSearchBuilder();
    }
    case "Immunization": {
      return new ImmunizationFhirSearchBuilder();
    }
    case "ImmunizationEvaluation": {
      return new ImmunizationEvaluationFhirSearchBuilder();
    }
    case "ImmunizationRecommendation": {
      return new ImmunizationRecommendationFhirSearchBuilder();
    }
    case "ImplementationGuide": {
      return new ImplementationGuideFhirSearchBuilder();
    }
    case "Ingredient": {
      return new IngredientFhirSearchBuilder();
    }
    case "InsurancePlan": {
      return new InsurancePlanFhirSearchBuilder();
    }
    case "Invoice": {
      return new InvoiceFhirSearchBuilder();
    }
    case "Library": {
      return new LibraryFhirSearchBuilder();
    }
    case "Linkage": {
      return new LinkageFhirSearchBuilder();
    }
    case "List": {
      return new ListFhirSearchBuilder();
    }
    case "Location": {
      return new LocationFhirSearchBuilder();
    }
    case "ManufacturedItemDefinition": {
      return new ManufacturedItemDefinitionFhirSearchBuilder();
    }
    case "Measure": {
      return new MeasureFhirSearchBuilder();
    }
    case "MeasureReport": {
      return new MeasureReportFhirSearchBuilder();
    }
    case "Media": {
      return new MediaFhirSearchBuilder();
    }
    case "Medication": {
      return new MedicationFhirSearchBuilder();
    }
    case "MedicationAdministration": {
      return new MedicationAdministrationFhirSearchBuilder();
    }
    case "MedicationDispense": {
      return new MedicationDispenseFhirSearchBuilder();
    }
    case "MedicationKnowledge": {
      return new MedicationKnowledgeFhirSearchBuilder();
    }
    case "MedicationRequest": {
      return new MedicationRequestFhirSearchBuilder();
    }
    case "MedicationStatement": {
      return new MedicationStatementFhirSearchBuilder();
    }
    case "MedicinalProductDefinition": {
      return new MedicinalProductDefinitionFhirSearchBuilder();
    }
    case "MessageDefinition": {
      return new MessageDefinitionFhirSearchBuilder();
    }
    case "MessageHeader": {
      return new MessageHeaderFhirSearchBuilder();
    }
    case "MolecularSequence": {
      return new MolecularSequenceFhirSearchBuilder();
    }
    case "NamingSystem": {
      return new NamingSystemFhirSearchBuilder();
    }
    case "NutritionOrder": {
      return new NutritionOrderFhirSearchBuilder();
    }
    case "NutritionProduct": {
      return new NutritionProductFhirSearchBuilder();
    }
    case "Observation": {
      return new ObservationFhirSearchBuilder();
    }
    case "ObservationDefinition": {
      return new ObservationDefinitionFhirSearchBuilder();
    }
    case "OperationDefinition": {
      return new OperationDefinitionFhirSearchBuilder();
    }
    case "OperationOutcome": {
      return new OperationOutcomeFhirSearchBuilder();
    }
    case "Organization": {
      return new OrganizationFhirSearchBuilder();
    }
    case "OrganizationAffiliation": {
      return new OrganizationAffiliationFhirSearchBuilder();
    }
    case "PackagedProductDefinition": {
      return new PackagedProductDefinitionFhirSearchBuilder();
    }
    case "Patient": {
      return new PatientFhirSearchBuilder();
    }
    case "PaymentNotice": {
      return new PaymentNoticeFhirSearchBuilder();
    }
    case "PaymentReconciliation": {
      return new PaymentReconciliationFhirSearchBuilder();
    }
    case "Person": {
      return new PersonFhirSearchBuilder();
    }
    case "PlanDefinition": {
      return new PlanDefinitionFhirSearchBuilder();
    }
    case "Practitioner": {
      return new PractitionerFhirSearchBuilder();
    }
    case "PractitionerRole": {
      return new PractitionerRoleFhirSearchBuilder();
    }
    case "Procedure": {
      return new ProcedureFhirSearchBuilder();
    }
    case "Provenance": {
      return new ProvenanceFhirSearchBuilder();
    }
    case "Questionnaire": {
      return new QuestionnaireFhirSearchBuilder();
    }
    case "QuestionnaireResponse": {
      return new QuestionnaireResponseFhirSearchBuilder();
    }
    case "RegulatedAuthorization": {
      return new RegulatedAuthorizationFhirSearchBuilder();
    }
    case "RelatedPerson": {
      return new RelatedPersonFhirSearchBuilder();
    }
    case "RequestGroup": {
      return new RequestGroupFhirSearchBuilder();
    }
    case "ResearchDefinition": {
      return new ResearchDefinitionFhirSearchBuilder();
    }
    case "ResearchElementDefinition": {
      return new ResearchElementDefinitionFhirSearchBuilder();
    }
    case "ResearchStudy": {
      return new ResearchStudyFhirSearchBuilder();
    }
    case "ResearchSubject": {
      return new ResearchSubjectFhirSearchBuilder();
    }
    case "RiskAssessment": {
      return new RiskAssessmentFhirSearchBuilder();
    }
    case "Schedule": {
      return new ScheduleFhirSearchBuilder();
    }
    case "SearchParameter": {
      return new SearchParameterFhirSearchBuilder();
    }
    case "ServiceRequest": {
      return new ServiceRequestFhirSearchBuilder();
    }
    case "Slot": {
      return new SlotFhirSearchBuilder();
    }
    case "Specimen": {
      return new SpecimenFhirSearchBuilder();
    }
    case "SpecimenDefinition": {
      return new SpecimenDefinitionFhirSearchBuilder();
    }
    case "StructureDefinition": {
      return new StructureDefinitionFhirSearchBuilder();
    }
    case "StructureMap": {
      return new StructureMapFhirSearchBuilder();
    }
    case "Subscription": {
      return new SubscriptionFhirSearchBuilder();
    }
    case "SubscriptionStatus": {
      return new SubscriptionStatusFhirSearchBuilder();
    }
    case "SubscriptionTopic": {
      return new SubscriptionTopicFhirSearchBuilder();
    }
    case "Substance": {
      return new SubstanceFhirSearchBuilder();
    }
    case "SubstanceDefinition": {
      return new SubstanceDefinitionFhirSearchBuilder();
    }
    case "SupplyDelivery": {
      return new SupplyDeliveryFhirSearchBuilder();
    }
    case "SupplyRequest": {
      return new SupplyRequestFhirSearchBuilder();
    }
    case "Task": {
      return new TaskFhirSearchBuilder();
    }
    case "TerminologyCapabilities": {
      return new TerminologyCapabilitiesFhirSearchBuilder();
    }
    case "TestReport": {
      return new TestReportFhirSearchBuilder();
    }
    case "TestScript": {
      return new TestScriptFhirSearchBuilder();
    }
    case "ValueSet": {
      return new ValueSetFhirSearchBuilder();
    }
    case "VerificationResult": {
      return new VerificationResultFhirSearchBuilder();
    }
    case "VisionPrescription": {
      return new VisionPrescriptionFhirSearchBuilder();
    }
    default: {
      throw new Error(
        `Unsupported fhirSearch for resource type ${resourceType}`
      );
    }
  }
}

class AccountFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Account";

  Account(): this {
    return this;
  }
}

class ActivityDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ActivityDefinition";

  ActivityDefinition(): this {
    return this;
  }
}

class AdministrableProductDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "AdministrableProductDefinition";

  AdministrableProductDefinition(): this {
    return this;
  }
}

class AdverseEventFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "AdverseEvent";

  AdverseEvent(): this {
    return this;
  }
}

class AllergyIntoleranceFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "AllergyIntolerance";

  AllergyIntolerance(): this {
    return this;
  }
}

class AppointmentFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Appointment";

  Appointment(): this {
    return this;
  }
}

class AppointmentResponseFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "AppointmentResponse";

  AppointmentResponse(): this {
    return this;
  }
}

class AuditEventFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "AuditEvent";

  AuditEvent(): this {
    return this;
  }
}

class BasicFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Basic";

  Basic(): this {
    return this;
  }
}

class BiologicallyDerivedProductFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "BiologicallyDerivedProduct";

  BiologicallyDerivedProduct(): this {
    return this;
  }
}

class BodyStructureFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "BodyStructure";

  BodyStructure(): this {
    return this;
  }
}

class CapabilityStatementFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "CapabilityStatement";

  CapabilityStatement(): this {
    return this;
  }
}

class CarePlanFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "CarePlan";

  CarePlan(): this {
    return this;
  }
}

class CareTeamFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "CareTeam";

  CareTeam(): this {
    return this;
  }
}

class CatalogEntryFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "CatalogEntry";

  CatalogEntry(): this {
    return this;
  }
}

class ChargeItemFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ChargeItem";

  ChargeItem(): this {
    return this;
  }
}

class ChargeItemDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ChargeItemDefinition";

  ChargeItemDefinition(): this {
    return this;
  }
}

class CitationFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Citation";

  Citation(): this {
    return this;
  }
}

class ClaimFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Claim";

  Claim(): this {
    return this;
  }
}

class ClaimResponseFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ClaimResponse";

  ClaimResponse(): this {
    return this;
  }
}

class ClinicalImpressionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ClinicalImpression";

  ClinicalImpression(): this {
    return this;
  }
}

class ClinicalUseDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ClinicalUseDefinition";

  ClinicalUseDefinition(): this {
    return this;
  }
}

class CodeSystemFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "CodeSystem";

  CodeSystem(): this {
    return this;
  }
}

class CommunicationFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Communication";

  Communication(): this {
    return this;
  }
}

class CommunicationRequestFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "CommunicationRequest";

  CommunicationRequest(): this {
    return this;
  }
}

class CompartmentDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "CompartmentDefinition";

  CompartmentDefinition(): this {
    return this;
  }
}

class CompositionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Composition";

  Composition(): this {
    return this;
  }
}

class ConceptMapFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ConceptMap";

  ConceptMap(): this {
    return this;
  }
}

class ConditionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Condition";

  Condition(): this {
    return this;
  }
}

class ConsentFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Consent";

  Consent(): this {
    return this;
  }
}

class ContractFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Contract";

  Contract(): this {
    return this;
  }
}

class CoverageFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Coverage";

  Coverage(): this {
    return this;
  }
}

class CoverageEligibilityRequestFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "CoverageEligibilityRequest";

  CoverageEligibilityRequest(): this {
    return this;
  }
}

class CoverageEligibilityResponseFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "CoverageEligibilityResponse";

  CoverageEligibilityResponse(): this {
    return this;
  }
}

class DetectedIssueFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "DetectedIssue";

  DetectedIssue(): this {
    return this;
  }
}

class DeviceFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Device";

  Device(): this {
    return this;
  }
}

class DeviceDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "DeviceDefinition";

  DeviceDefinition(): this {
    return this;
  }
}

class DeviceMetricFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "DeviceMetric";

  DeviceMetric(): this {
    return this;
  }
}

class DeviceRequestFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "DeviceRequest";

  DeviceRequest(): this {
    return this;
  }
}

class DeviceUseStatementFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "DeviceUseStatement";

  DeviceUseStatement(): this {
    return this;
  }
}

class DiagnosticReportFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "DiagnosticReport";

  DiagnosticReport(): this {
    return this;
  }
}

class DocumentManifestFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "DocumentManifest";

  DocumentManifest(): this {
    return this;
  }
}

class DocumentReferenceFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "DocumentReference";

  DocumentReference(): this {
    return this;
  }
}

class EncounterFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Encounter";

  Encounter(): this {
    return this;
  }
}

class EndpointFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Endpoint";

  Endpoint(): this {
    return this;
  }
}

class EnrollmentRequestFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "EnrollmentRequest";

  EnrollmentRequest(): this {
    return this;
  }
}

class EnrollmentResponseFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "EnrollmentResponse";

  EnrollmentResponse(): this {
    return this;
  }
}

class EpisodeOfCareFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "EpisodeOfCare";

  EpisodeOfCare(): this {
    return this;
  }
}

class EventDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "EventDefinition";

  EventDefinition(): this {
    return this;
  }
}

class EvidenceFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Evidence";

  Evidence(): this {
    return this;
  }
}

class EvidenceReportFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "EvidenceReport";

  EvidenceReport(): this {
    return this;
  }
}

class EvidenceVariableFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "EvidenceVariable";

  EvidenceVariable(): this {
    return this;
  }
}

class ExampleScenarioFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ExampleScenario";

  ExampleScenario(): this {
    return this;
  }
}

class ExplanationOfBenefitFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ExplanationOfBenefit";

  ExplanationOfBenefit(): this {
    return this;
  }
}

class FamilyMemberHistoryFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "FamilyMemberHistory";

  FamilyMemberHistory(): this {
    return this;
  }
}

class FlagFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Flag";

  Flag(): this {
    return this;
  }
}

class GoalFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Goal";

  Goal(): this {
    return this;
  }
}

class GraphDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "GraphDefinition";

  GraphDefinition(): this {
    return this;
  }
}

class GroupFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Group";

  Group(): this {
    return this;
  }
}

class GuidanceResponseFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "GuidanceResponse";

  GuidanceResponse(): this {
    return this;
  }
}

class HealthcareServiceFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "HealthcareService";

  HealthcareService(): this {
    return this;
  }
}

class ImagingStudyFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ImagingStudy";

  ImagingStudy(): this {
    return this;
  }
}

class ImmunizationFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Immunization";

  Immunization(): this {
    return this;
  }
}

class ImmunizationEvaluationFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ImmunizationEvaluation";

  ImmunizationEvaluation(): this {
    return this;
  }
}

class ImmunizationRecommendationFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ImmunizationRecommendation";

  ImmunizationRecommendation(): this {
    return this;
  }
}

class ImplementationGuideFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ImplementationGuide";

  ImplementationGuide(): this {
    return this;
  }
}

class IngredientFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Ingredient";

  Ingredient(): this {
    return this;
  }
}

class InsurancePlanFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "InsurancePlan";

  InsurancePlan(): this {
    return this;
  }
}

class InvoiceFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Invoice";

  Invoice(): this {
    return this;
  }
}

class LibraryFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Library";

  Library(): this {
    return this;
  }
}

class LinkageFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Linkage";

  Linkage(): this {
    return this;
  }
}

class ListFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "List";

  List(): this {
    return this;
  }
}

class LocationFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Location";

  Location(): this {
    return this;
  }
}

class ManufacturedItemDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ManufacturedItemDefinition";

  ManufacturedItemDefinition(): this {
    return this;
  }
}

class MeasureFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Measure";

  Measure(): this {
    return this;
  }
}

class MeasureReportFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "MeasureReport";

  MeasureReport(): this {
    return this;
  }
}

class MediaFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Media";

  Media(): this {
    return this;
  }
}

class MedicationFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Medication";

  Medication(): this {
    return this;
  }
}

class MedicationAdministrationFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "MedicationAdministration";

  MedicationAdministration(): this {
    return this;
  }
}

class MedicationDispenseFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "MedicationDispense";

  MedicationDispense(): this {
    return this;
  }
}

class MedicationKnowledgeFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "MedicationKnowledge";

  MedicationKnowledge(): this {
    return this;
  }
}

class MedicationRequestFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "MedicationRequest";

  MedicationRequest(): this {
    return this;
  }
}

class MedicationStatementFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "MedicationStatement";

  MedicationStatement(): this {
    return this;
  }
}

class MedicinalProductDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "MedicinalProductDefinition";

  MedicinalProductDefinition(): this {
    return this;
  }
}

class MessageDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "MessageDefinition";

  MessageDefinition(): this {
    return this;
  }
}

class MessageHeaderFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "MessageHeader";

  MessageHeader(): this {
    return this;
  }
}

class MolecularSequenceFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "MolecularSequence";

  MolecularSequence(): this {
    return this;
  }
}

class NamingSystemFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "NamingSystem";

  NamingSystem(): this {
    return this;
  }
}

class NutritionOrderFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "NutritionOrder";

  NutritionOrder(): this {
    return this;
  }
}

class NutritionProductFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "NutritionProduct";

  NutritionProduct(): this {
    return this;
  }
}

class ObservationFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Observation";

  Observation(): this {
    return this;
  }
}

class ObservationDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ObservationDefinition";

  ObservationDefinition(): this {
    return this;
  }
}

class OperationDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "OperationDefinition";

  OperationDefinition(): this {
    return this;
  }
}

class OperationOutcomeFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "OperationOutcome";

  OperationOutcome(): this {
    return this;
  }
}

class OrganizationFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Organization";

  Organization(): this {
    return this;
  }
}

class OrganizationAffiliationFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "OrganizationAffiliation";

  OrganizationAffiliation(): this {
    return this;
  }
}

class PackagedProductDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "PackagedProductDefinition";

  PackagedProductDefinition(): this {
    return this;
  }
}

class PatientFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Patient";

  Patient(): this {
    return this;
  }
}

class PaymentNoticeFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "PaymentNotice";

  PaymentNotice(): this {
    return this;
  }
}

class PaymentReconciliationFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "PaymentReconciliation";

  PaymentReconciliation(): this {
    return this;
  }
}

class PersonFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Person";

  Person(): this {
    return this;
  }
}

class PlanDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "PlanDefinition";

  PlanDefinition(): this {
    return this;
  }
}

class PractitionerFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Practitioner";

  Practitioner(): this {
    return this;
  }
}

class PractitionerRoleFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "PractitionerRole";

  PractitionerRole(): this {
    return this;
  }
}

class ProcedureFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Procedure";

  Procedure(): this {
    return this;
  }
}

class ProvenanceFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Provenance";

  Provenance(): this {
    return this;
  }
}

class QuestionnaireFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Questionnaire";

  Questionnaire(): this {
    return this;
  }
}

class QuestionnaireResponseFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "QuestionnaireResponse";

  QuestionnaireResponse(): this {
    return this;
  }
}

class RegulatedAuthorizationFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "RegulatedAuthorization";

  RegulatedAuthorization(): this {
    return this;
  }
}

class RelatedPersonFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "RelatedPerson";

  RelatedPerson(): this {
    return this;
  }
}

class RequestGroupFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "RequestGroup";

  RequestGroup(): this {
    return this;
  }
}

class ResearchDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ResearchDefinition";

  ResearchDefinition(): this {
    return this;
  }
}

class ResearchElementDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ResearchElementDefinition";

  ResearchElementDefinition(): this {
    return this;
  }
}

class ResearchStudyFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ResearchStudy";

  ResearchStudy(): this {
    return this;
  }
}

class ResearchSubjectFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ResearchSubject";

  ResearchSubject(): this {
    return this;
  }
}

class RiskAssessmentFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "RiskAssessment";

  RiskAssessment(): this {
    return this;
  }
}

class ScheduleFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Schedule";

  Schedule(): this {
    return this;
  }
}

class SearchParameterFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "SearchParameter";

  SearchParameter(): this {
    return this;
  }
}

class ServiceRequestFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ServiceRequest";

  ServiceRequest(): this {
    return this;
  }
}

class SlotFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Slot";

  Slot(): this {
    return this;
  }
}

class SpecimenFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Specimen";

  Specimen(): this {
    return this;
  }
}

class SpecimenDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "SpecimenDefinition";

  SpecimenDefinition(): this {
    return this;
  }
}

class StructureDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "StructureDefinition";

  StructureDefinition(): this {
    return this;
  }
}

class StructureMapFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "StructureMap";

  StructureMap(): this {
    return this;
  }
}

class SubscriptionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Subscription";

  Subscription(): this {
    return this;
  }
}

class SubscriptionStatusFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "SubscriptionStatus";

  SubscriptionStatus(): this {
    return this;
  }
}

class SubscriptionTopicFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "SubscriptionTopic";

  SubscriptionTopic(): this {
    return this;
  }
}

class SubstanceFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Substance";

  Substance(): this {
    return this;
  }
}

class SubstanceDefinitionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "SubstanceDefinition";

  SubstanceDefinition(): this {
    return this;
  }
}

class SupplyDeliveryFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "SupplyDelivery";

  SupplyDelivery(): this {
    return this;
  }
}

class SupplyRequestFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "SupplyRequest";

  SupplyRequest(): this {
    return this;
  }
}

class TaskFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "Task";

  Task(): this {
    return this;
  }
}

class TerminologyCapabilitiesFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "TerminologyCapabilities";

  TerminologyCapabilities(): this {
    return this;
  }
}

class TestReportFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "TestReport";

  TestReport(): this {
    return this;
  }
}

class TestScriptFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "TestScript";

  TestScript(): this {
    return this;
  }
}

class ValueSetFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "ValueSet";

  ValueSet(): this {
    return this;
  }
}

class VerificationResultFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "VerificationResult";

  VerificationResult(): this {
    return this;
  }
}

class VisionPrescriptionFhirSearchBuilder extends FhirSearchBuilder {
  readonly resourceType = "VisionPrescription";

  VisionPrescription(): this {
    return this;
  }
}

export type AnyFhirSearchBuilder =
  | AccountFhirSearchBuilder
  | ActivityDefinitionFhirSearchBuilder
  | AdministrableProductDefinitionFhirSearchBuilder
  | AdverseEventFhirSearchBuilder
  | AllergyIntoleranceFhirSearchBuilder
  | AppointmentFhirSearchBuilder
  | AppointmentResponseFhirSearchBuilder
  | AuditEventFhirSearchBuilder
  | BasicFhirSearchBuilder
  | BiologicallyDerivedProductFhirSearchBuilder
  | BodyStructureFhirSearchBuilder
  | CapabilityStatementFhirSearchBuilder
  | CarePlanFhirSearchBuilder
  | CareTeamFhirSearchBuilder
  | CatalogEntryFhirSearchBuilder
  | ChargeItemFhirSearchBuilder
  | ChargeItemDefinitionFhirSearchBuilder
  | CitationFhirSearchBuilder
  | ClaimFhirSearchBuilder
  | ClaimResponseFhirSearchBuilder
  | ClinicalImpressionFhirSearchBuilder
  | ClinicalUseDefinitionFhirSearchBuilder
  | CodeSystemFhirSearchBuilder
  | CommunicationFhirSearchBuilder
  | CommunicationRequestFhirSearchBuilder
  | CompartmentDefinitionFhirSearchBuilder
  | CompositionFhirSearchBuilder
  | ConceptMapFhirSearchBuilder
  | ConditionFhirSearchBuilder
  | ConsentFhirSearchBuilder
  | ContractFhirSearchBuilder
  | CoverageFhirSearchBuilder
  | CoverageEligibilityRequestFhirSearchBuilder
  | CoverageEligibilityResponseFhirSearchBuilder
  | DetectedIssueFhirSearchBuilder
  | DeviceFhirSearchBuilder
  | DeviceDefinitionFhirSearchBuilder
  | DeviceMetricFhirSearchBuilder
  | DeviceRequestFhirSearchBuilder
  | DeviceUseStatementFhirSearchBuilder
  | DiagnosticReportFhirSearchBuilder
  | DocumentManifestFhirSearchBuilder
  | DocumentReferenceFhirSearchBuilder
  | EncounterFhirSearchBuilder
  | EndpointFhirSearchBuilder
  | EnrollmentRequestFhirSearchBuilder
  | EnrollmentResponseFhirSearchBuilder
  | EpisodeOfCareFhirSearchBuilder
  | EventDefinitionFhirSearchBuilder
  | EvidenceFhirSearchBuilder
  | EvidenceReportFhirSearchBuilder
  | EvidenceVariableFhirSearchBuilder
  | ExampleScenarioFhirSearchBuilder
  | ExplanationOfBenefitFhirSearchBuilder
  | FamilyMemberHistoryFhirSearchBuilder
  | FlagFhirSearchBuilder
  | GoalFhirSearchBuilder
  | GraphDefinitionFhirSearchBuilder
  | GroupFhirSearchBuilder
  | GuidanceResponseFhirSearchBuilder
  | HealthcareServiceFhirSearchBuilder
  | ImagingStudyFhirSearchBuilder
  | ImmunizationFhirSearchBuilder
  | ImmunizationEvaluationFhirSearchBuilder
  | ImmunizationRecommendationFhirSearchBuilder
  | ImplementationGuideFhirSearchBuilder
  | IngredientFhirSearchBuilder
  | InsurancePlanFhirSearchBuilder
  | InvoiceFhirSearchBuilder
  | LibraryFhirSearchBuilder
  | LinkageFhirSearchBuilder
  | ListFhirSearchBuilder
  | LocationFhirSearchBuilder
  | ManufacturedItemDefinitionFhirSearchBuilder
  | MeasureFhirSearchBuilder
  | MeasureReportFhirSearchBuilder
  | MediaFhirSearchBuilder
  | MedicationFhirSearchBuilder
  | MedicationAdministrationFhirSearchBuilder
  | MedicationDispenseFhirSearchBuilder
  | MedicationKnowledgeFhirSearchBuilder
  | MedicationRequestFhirSearchBuilder
  | MedicationStatementFhirSearchBuilder
  | MedicinalProductDefinitionFhirSearchBuilder
  | MessageDefinitionFhirSearchBuilder
  | MessageHeaderFhirSearchBuilder
  | MolecularSequenceFhirSearchBuilder
  | NamingSystemFhirSearchBuilder
  | NutritionOrderFhirSearchBuilder
  | NutritionProductFhirSearchBuilder
  | ObservationFhirSearchBuilder
  | ObservationDefinitionFhirSearchBuilder
  | OperationDefinitionFhirSearchBuilder
  | OperationOutcomeFhirSearchBuilder
  | OrganizationFhirSearchBuilder
  | OrganizationAffiliationFhirSearchBuilder
  | PackagedProductDefinitionFhirSearchBuilder
  | PatientFhirSearchBuilder
  | PaymentNoticeFhirSearchBuilder
  | PaymentReconciliationFhirSearchBuilder
  | PersonFhirSearchBuilder
  | PlanDefinitionFhirSearchBuilder
  | PractitionerFhirSearchBuilder
  | PractitionerRoleFhirSearchBuilder
  | ProcedureFhirSearchBuilder
  | ProvenanceFhirSearchBuilder
  | QuestionnaireFhirSearchBuilder
  | QuestionnaireResponseFhirSearchBuilder
  | RegulatedAuthorizationFhirSearchBuilder
  | RelatedPersonFhirSearchBuilder
  | RequestGroupFhirSearchBuilder
  | ResearchDefinitionFhirSearchBuilder
  | ResearchElementDefinitionFhirSearchBuilder
  | ResearchStudyFhirSearchBuilder
  | ResearchSubjectFhirSearchBuilder
  | RiskAssessmentFhirSearchBuilder
  | ScheduleFhirSearchBuilder
  | SearchParameterFhirSearchBuilder
  | ServiceRequestFhirSearchBuilder
  | SlotFhirSearchBuilder
  | SpecimenFhirSearchBuilder
  | SpecimenDefinitionFhirSearchBuilder
  | StructureDefinitionFhirSearchBuilder
  | StructureMapFhirSearchBuilder
  | SubscriptionFhirSearchBuilder
  | SubscriptionStatusFhirSearchBuilder
  | SubscriptionTopicFhirSearchBuilder
  | SubstanceFhirSearchBuilder
  | SubstanceDefinitionFhirSearchBuilder
  | SupplyDeliveryFhirSearchBuilder
  | SupplyRequestFhirSearchBuilder
  | TaskFhirSearchBuilder
  | TerminologyCapabilitiesFhirSearchBuilder
  | TestReportFhirSearchBuilder
  | TestScriptFhirSearchBuilder
  | ValueSetFhirSearchBuilder
  | VerificationResultFhirSearchBuilder
  | VisionPrescriptionFhirSearchBuilder;

/**
 * Allow referencing a search builder type from its string ResourceType representation.
 */
export type ExtractSearchBuilder<
  TDomainResourceType extends AnyDomainResourceType
> = Extract<AnyFhirSearchBuilder, { resourceType: TDomainResourceType }>;
