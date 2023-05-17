/**
 * Narrative generators for r4b/4.3.0
 */

import {
  Account,
  ActivityDefinition,
  AdministrableProductDefinition,
  AdverseEvent,
  AllergyIntolerance,
  AnyDomainResource,
  Appointment,
  AppointmentResponse,
  AuditEvent,
  Basic,
  BiologicallyDerivedProduct,
  BodyStructure,
  CapabilityStatement,
  CarePlan,
  CareTeam,
  CatalogEntry,
  ChargeItem,
  ChargeItemDefinition,
  Citation,
  Claim,
  ClaimResponse,
  ClinicalImpression,
  ClinicalUseDefinition,
  CodeSystem,
  Communication,
  CommunicationRequest,
  CompartmentDefinition,
  Composition,
  ConceptMap,
  Condition,
  Consent,
  Contract,
  Coverage,
  CoverageEligibilityRequest,
  CoverageEligibilityResponse,
  DetectedIssue,
  Device,
  DeviceDefinition,
  DeviceMetric,
  DeviceRequest,
  DeviceUseStatement,
  DiagnosticReport,
  DocumentManifest,
  DocumentReference,
  Encounter,
  Endpoint,
  EnrollmentRequest,
  EnrollmentResponse,
  EpisodeOfCare,
  EventDefinition,
  Evidence,
  EvidenceReport,
  EvidenceVariable,
  ExampleScenario,
  ExplanationOfBenefit,
  FamilyMemberHistory,
  Flag,
  Goal,
  GraphDefinition,
  Group,
  GuidanceResponse,
  HealthcareService,
  ImagingStudy,
  Immunization,
  ImmunizationEvaluation,
  ImmunizationRecommendation,
  ImplementationGuide,
  Ingredient,
  InsurancePlan,
  Invoice,
  Library,
  Linkage,
  List,
  Location,
  ManufacturedItemDefinition,
  Measure,
  MeasureReport,
  Media,
  Medication,
  MedicationAdministration,
  MedicationDispense,
  MedicationKnowledge,
  MedicationRequest,
  MedicationStatement,
  MedicinalProductDefinition,
  MessageDefinition,
  MessageHeader,
  MolecularSequence,
  NamingSystem,
  Narrative,
  NutritionOrder,
  NutritionProduct,
  Observation,
  ObservationDefinition,
  OperationDefinition,
  OperationOutcome,
  Organization,
  OrganizationAffiliation,
  PackagedProductDefinition,
  Patient,
  PaymentNotice,
  PaymentReconciliation,
  Person,
  PlanDefinition,
  Practitioner,
  PractitionerRole,
  Procedure,
  Provenance,
  Questionnaire,
  QuestionnaireResponse,
  RegulatedAuthorization,
  RelatedPerson,
  RequestGroup,
  ResearchDefinition,
  ResearchElementDefinition,
  ResearchStudy,
  ResearchSubject,
  RiskAssessment,
  Schedule,
  SearchParameter,
  ServiceRequest,
  Slot,
  Specimen,
  SpecimenDefinition,
  StructureDefinition,
  StructureMap,
  Subscription,
  SubscriptionStatus,
  SubscriptionTopic,
  Substance,
  SubstanceDefinition,
  SupplyDelivery,
  SupplyRequest,
  Task,
  TerminologyCapabilities,
  TestReport,
  TestScript,
  ValueSet,
  VerificationResult,
  VisionPrescription,
} from "./fhir-types.codegen";
import { DefaultFormatter, Formatter } from "./formatters";
import { startCase } from "./lang-utils";

export interface NarrativeOptions {
  /** The formatter to use. Will use the `Formatter.default` if not provided. */
  formatter?: DefaultFormatter | null | undefined;
}

export function narrative<TResourceType extends AnyDomainResource>(
  resource: TResourceType,
  options?: NarrativeOptions | null | undefined
): Narrative {
  switch (resource.resourceType) {
    case "Account": {
      return narrativeAccount(resource, options);
    }

    case "ActivityDefinition": {
      return narrativeActivityDefinition(resource, options);
    }

    case "AdministrableProductDefinition": {
      return narrativeAdministrableProductDefinition(resource, options);
    }

    case "AdverseEvent": {
      return narrativeAdverseEvent(resource, options);
    }

    case "AllergyIntolerance": {
      return narrativeAllergyIntolerance(resource, options);
    }

    case "Appointment": {
      return narrativeAppointment(resource, options);
    }

    case "AppointmentResponse": {
      return narrativeAppointmentResponse(resource, options);
    }

    case "AuditEvent": {
      return narrativeAuditEvent(resource, options);
    }

    case "Basic": {
      return narrativeBasic(resource, options);
    }

    case "BiologicallyDerivedProduct": {
      return narrativeBiologicallyDerivedProduct(resource, options);
    }

    case "BodyStructure": {
      return narrativeBodyStructure(resource, options);
    }

    case "CapabilityStatement": {
      return narrativeCapabilityStatement(resource, options);
    }

    case "CarePlan": {
      return narrativeCarePlan(resource, options);
    }

    case "CareTeam": {
      return narrativeCareTeam(resource, options);
    }

    case "CatalogEntry": {
      return narrativeCatalogEntry(resource, options);
    }

    case "ChargeItem": {
      return narrativeChargeItem(resource, options);
    }

    case "ChargeItemDefinition": {
      return narrativeChargeItemDefinition(resource, options);
    }

    case "Citation": {
      return narrativeCitation(resource, options);
    }

    case "Claim": {
      return narrativeClaim(resource, options);
    }

    case "ClaimResponse": {
      return narrativeClaimResponse(resource, options);
    }

    case "ClinicalImpression": {
      return narrativeClinicalImpression(resource, options);
    }

    case "ClinicalUseDefinition": {
      return narrativeClinicalUseDefinition(resource, options);
    }

    case "CodeSystem": {
      return narrativeCodeSystem(resource, options);
    }

    case "Communication": {
      return narrativeCommunication(resource, options);
    }

    case "CommunicationRequest": {
      return narrativeCommunicationRequest(resource, options);
    }

    case "CompartmentDefinition": {
      return narrativeCompartmentDefinition(resource, options);
    }

    case "Composition": {
      return narrativeComposition(resource, options);
    }

    case "ConceptMap": {
      return narrativeConceptMap(resource, options);
    }

    case "Condition": {
      return narrativeCondition(resource, options);
    }

    case "Consent": {
      return narrativeConsent(resource, options);
    }

    case "Contract": {
      return narrativeContract(resource, options);
    }

    case "Coverage": {
      return narrativeCoverage(resource, options);
    }

    case "CoverageEligibilityRequest": {
      return narrativeCoverageEligibilityRequest(resource, options);
    }

    case "CoverageEligibilityResponse": {
      return narrativeCoverageEligibilityResponse(resource, options);
    }

    case "DetectedIssue": {
      return narrativeDetectedIssue(resource, options);
    }

    case "Device": {
      return narrativeDevice(resource, options);
    }

    case "DeviceDefinition": {
      return narrativeDeviceDefinition(resource, options);
    }

    case "DeviceMetric": {
      return narrativeDeviceMetric(resource, options);
    }

    case "DeviceRequest": {
      return narrativeDeviceRequest(resource, options);
    }

    case "DeviceUseStatement": {
      return narrativeDeviceUseStatement(resource, options);
    }

    case "DiagnosticReport": {
      return narrativeDiagnosticReport(resource, options);
    }

    case "DocumentManifest": {
      return narrativeDocumentManifest(resource, options);
    }

    case "DocumentReference": {
      return narrativeDocumentReference(resource, options);
    }

    case "Encounter": {
      return narrativeEncounter(resource, options);
    }

    case "Endpoint": {
      return narrativeEndpoint(resource, options);
    }

    case "EnrollmentRequest": {
      return narrativeEnrollmentRequest(resource, options);
    }

    case "EnrollmentResponse": {
      return narrativeEnrollmentResponse(resource, options);
    }

    case "EpisodeOfCare": {
      return narrativeEpisodeOfCare(resource, options);
    }

    case "EventDefinition": {
      return narrativeEventDefinition(resource, options);
    }

    case "Evidence": {
      return narrativeEvidence(resource, options);
    }

    case "EvidenceReport": {
      return narrativeEvidenceReport(resource, options);
    }

    case "EvidenceVariable": {
      return narrativeEvidenceVariable(resource, options);
    }

    case "ExampleScenario": {
      return narrativeExampleScenario(resource, options);
    }

    case "ExplanationOfBenefit": {
      return narrativeExplanationOfBenefit(resource, options);
    }

    case "FamilyMemberHistory": {
      return narrativeFamilyMemberHistory(resource, options);
    }

    case "Flag": {
      return narrativeFlag(resource, options);
    }

    case "Goal": {
      return narrativeGoal(resource, options);
    }

    case "GraphDefinition": {
      return narrativeGraphDefinition(resource, options);
    }

    case "Group": {
      return narrativeGroup(resource, options);
    }

    case "GuidanceResponse": {
      return narrativeGuidanceResponse(resource, options);
    }

    case "HealthcareService": {
      return narrativeHealthcareService(resource, options);
    }

    case "ImagingStudy": {
      return narrativeImagingStudy(resource, options);
    }

    case "Immunization": {
      return narrativeImmunization(resource, options);
    }

    case "ImmunizationEvaluation": {
      return narrativeImmunizationEvaluation(resource, options);
    }

    case "ImmunizationRecommendation": {
      return narrativeImmunizationRecommendation(resource, options);
    }

    case "ImplementationGuide": {
      return narrativeImplementationGuide(resource, options);
    }

    case "Ingredient": {
      return narrativeIngredient(resource, options);
    }

    case "InsurancePlan": {
      return narrativeInsurancePlan(resource, options);
    }

    case "Invoice": {
      return narrativeInvoice(resource, options);
    }

    case "Library": {
      return narrativeLibrary(resource, options);
    }

    case "Linkage": {
      return narrativeLinkage(resource, options);
    }

    case "List": {
      return narrativeList(resource, options);
    }

    case "Location": {
      return narrativeLocation(resource, options);
    }

    case "ManufacturedItemDefinition": {
      return narrativeManufacturedItemDefinition(resource, options);
    }

    case "Measure": {
      return narrativeMeasure(resource, options);
    }

    case "MeasureReport": {
      return narrativeMeasureReport(resource, options);
    }

    case "Media": {
      return narrativeMedia(resource, options);
    }

    case "Medication": {
      return narrativeMedication(resource, options);
    }

    case "MedicationAdministration": {
      return narrativeMedicationAdministration(resource, options);
    }

    case "MedicationDispense": {
      return narrativeMedicationDispense(resource, options);
    }

    case "MedicationKnowledge": {
      return narrativeMedicationKnowledge(resource, options);
    }

    case "MedicationRequest": {
      return narrativeMedicationRequest(resource, options);
    }

    case "MedicationStatement": {
      return narrativeMedicationStatement(resource, options);
    }

    case "MedicinalProductDefinition": {
      return narrativeMedicinalProductDefinition(resource, options);
    }

    case "MessageDefinition": {
      return narrativeMessageDefinition(resource, options);
    }

    case "MessageHeader": {
      return narrativeMessageHeader(resource, options);
    }

    case "MolecularSequence": {
      return narrativeMolecularSequence(resource, options);
    }

    case "NamingSystem": {
      return narrativeNamingSystem(resource, options);
    }

    case "NutritionOrder": {
      return narrativeNutritionOrder(resource, options);
    }

    case "NutritionProduct": {
      return narrativeNutritionProduct(resource, options);
    }

    case "Observation": {
      return narrativeObservation(resource, options);
    }

    case "ObservationDefinition": {
      return narrativeObservationDefinition(resource, options);
    }

    case "OperationDefinition": {
      return narrativeOperationDefinition(resource, options);
    }

    case "OperationOutcome": {
      return narrativeOperationOutcome(resource, options);
    }

    case "Organization": {
      return narrativeOrganization(resource, options);
    }

    case "OrganizationAffiliation": {
      return narrativeOrganizationAffiliation(resource, options);
    }

    case "PackagedProductDefinition": {
      return narrativePackagedProductDefinition(resource, options);
    }

    case "Patient": {
      return narrativePatient(resource, options);
    }

    case "PaymentNotice": {
      return narrativePaymentNotice(resource, options);
    }

    case "PaymentReconciliation": {
      return narrativePaymentReconciliation(resource, options);
    }

    case "Person": {
      return narrativePerson(resource, options);
    }

    case "PlanDefinition": {
      return narrativePlanDefinition(resource, options);
    }

    case "Practitioner": {
      return narrativePractitioner(resource, options);
    }

    case "PractitionerRole": {
      return narrativePractitionerRole(resource, options);
    }

    case "Procedure": {
      return narrativeProcedure(resource, options);
    }

    case "Provenance": {
      return narrativeProvenance(resource, options);
    }

    case "Questionnaire": {
      return narrativeQuestionnaire(resource, options);
    }

    case "QuestionnaireResponse": {
      return narrativeQuestionnaireResponse(resource, options);
    }

    case "RegulatedAuthorization": {
      return narrativeRegulatedAuthorization(resource, options);
    }

    case "RelatedPerson": {
      return narrativeRelatedPerson(resource, options);
    }

    case "RequestGroup": {
      return narrativeRequestGroup(resource, options);
    }

    case "ResearchDefinition": {
      return narrativeResearchDefinition(resource, options);
    }

    case "ResearchElementDefinition": {
      return narrativeResearchElementDefinition(resource, options);
    }

    case "ResearchStudy": {
      return narrativeResearchStudy(resource, options);
    }

    case "ResearchSubject": {
      return narrativeResearchSubject(resource, options);
    }

    case "RiskAssessment": {
      return narrativeRiskAssessment(resource, options);
    }

    case "Schedule": {
      return narrativeSchedule(resource, options);
    }

    case "SearchParameter": {
      return narrativeSearchParameter(resource, options);
    }

    case "ServiceRequest": {
      return narrativeServiceRequest(resource, options);
    }

    case "Slot": {
      return narrativeSlot(resource, options);
    }

    case "Specimen": {
      return narrativeSpecimen(resource, options);
    }

    case "SpecimenDefinition": {
      return narrativeSpecimenDefinition(resource, options);
    }

    case "StructureDefinition": {
      return narrativeStructureDefinition(resource, options);
    }

    case "StructureMap": {
      return narrativeStructureMap(resource, options);
    }

    case "Subscription": {
      return narrativeSubscription(resource, options);
    }

    case "SubscriptionStatus": {
      return narrativeSubscriptionStatus(resource, options);
    }

    case "SubscriptionTopic": {
      return narrativeSubscriptionTopic(resource, options);
    }

    case "Substance": {
      return narrativeSubstance(resource, options);
    }

    case "SubstanceDefinition": {
      return narrativeSubstanceDefinition(resource, options);
    }

    case "SupplyDelivery": {
      return narrativeSupplyDelivery(resource, options);
    }

    case "SupplyRequest": {
      return narrativeSupplyRequest(resource, options);
    }

    case "Task": {
      return narrativeTask(resource, options);
    }

    case "TerminologyCapabilities": {
      return narrativeTerminologyCapabilities(resource, options);
    }

    case "TestReport": {
      return narrativeTestReport(resource, options);
    }

    case "TestScript": {
      return narrativeTestScript(resource, options);
    }

    case "ValueSet": {
      return narrativeValueSet(resource, options);
    }

    case "VerificationResult": {
      return narrativeVerificationResult(resource, options);
    }

    case "VisionPrescription": {
      return narrativeVisionPrescription(resource, options);
    }

    default: {
      throw new Error(
        `Unsupported resource type for narrative generation: ${
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (resource as any).resourceType
        }`
      );
    }
  }
}

function narrativeAccount(
  resource: Account,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["string", "description"],
      ["Identifier", "identifier"],
      ["string", "name"],
      ["Reference", "owner"],
      ["Period", "servicePeriod"],
      ["code", "status"],
      ["Reference", "subject"],
      ["CodeableConcept", "type"],
    ],
    options
  );
}

function narrativeActivityDefinition(
  resource: ActivityDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "code"],
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["markdown", "description"],
      ["boolean", "doNotPerform"],
      ["Period", "effectivePeriod"],
      ["boolean", "experimental"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "jurisdiction"],
      ["code", "kind"],
      ["string", "name"],
      ["string", "publisher"],
      ["code", "status"],
      ["string", "title"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeAdministrableProductDefinition(
  resource: AdministrableProductDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "administrableDoseForm"],
      ["Reference", "device"],
      ["Reference", "formOf"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "ingredient"],
      ["Reference", "producedFrom"],
      ["code", "status"],
      ["CodeableConcept", "unitOfPresentation"],
    ],
    options
  );
}

function narrativeAdverseEvent(
  resource: AdverseEvent,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["code", "actuality"],
      ["CodeableConcept", "category"],
      ["Reference", "contributor"],
      ["dateTime", "date"],
      ["dateTime", "detected"],
      ["Reference", "encounter"],
      ["CodeableConcept", "event"],
      ["Identifier", "identifier"],
      ["Reference", "location"],
      ["CodeableConcept", "outcome"],
      ["dateTime", "recordedDate"],
      ["Reference", "recorder"],
      ["Reference", "referenceDocument"],
      ["Reference", "resultingCondition"],
      ["CodeableConcept", "seriousness"],
      ["CodeableConcept", "severity"],
      ["Reference", "study"],
      ["Reference", "subject"],
      ["Reference", "subjectMedicalHistory"],
    ],
    options
  );
}

function narrativeAllergyIntolerance(
  resource: AllergyIntolerance,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "asserter"],
      ["code", "category"],
      ["CodeableConcept", "clinicalStatus"],
      ["CodeableConcept", "code"],
      ["code", "criticality"],
      ["Identifier", "identifier"],
      ["Reference", "patient"],
      ["code", "type"],
      ["CodeableConcept", "verificationStatus"],
    ],
    options
  );
}

function narrativeAppointment(
  resource: Appointment,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "appointmentType"],
      ["CodeableConcept", "cancelationReason"],
      ["instant", "end"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "reasonCode"],
      ["CodeableConcept", "serviceCategory"],
      ["CodeableConcept", "serviceType"],
      ["CodeableConcept", "specialty"],
      ["instant", "start"],
      ["code", "status"],
    ],
    options
  );
}

function narrativeAppointmentResponse(
  resource: AppointmentResponse,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "actor"],
      ["Reference", "appointment"],
      ["Identifier", "identifier"],
      ["code", "participantStatus"],
      ["CodeableConcept", "participantType"],
    ],
    options
  );
}

function narrativeAuditEvent(
  resource: AuditEvent,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["code", "action"],
      ["code", "outcome"],
      ["string", "outcomeDesc"],
      ["CodeableConcept", "purposeOfEvent"],
      ["instant", "recorded"],
      ["Coding", "subtype"],
      ["Coding", "type"],
    ],
    options
  );
}

function narrativeBasic(
  resource: Basic,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "author"],
      ["CodeableConcept", "code"],
      ["date", "created"],
      ["Identifier", "identifier"],
      ["Reference", "subject"],
    ],
    options
  );
}

function narrativeBiologicallyDerivedProduct(
  resource: BiologicallyDerivedProduct,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(resource, [["Identifier", "identifier"]], options);
}

function narrativeBodyStructure(
  resource: BodyStructure,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "active"],
      ["string", "description"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "location"],
      ["CodeableConcept", "morphology"],
      ["Reference", "patient"],
    ],
    options
  );
}

function narrativeCapabilityStatement(
  resource: CapabilityStatement,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["boolean", "experimental"],
      ["code", "fhirVersion"],
      ["code", "format"],
      ["canonical", "implementationGuide"],
      ["canonical", "imports"],
      ["canonical", "instantiates"],
      ["CodeableConcept", "jurisdiction"],
      ["code", "kind"],
      ["string", "name"],
      ["code", "patchFormat"],
      ["string", "publisher"],
      ["code", "status"],
      ["string", "title"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeCarePlan(
  resource: CarePlan,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "addresses"],
      ["Reference", "author"],
      ["Reference", "basedOn"],
      ["CodeableConcept", "category"],
      ["dateTime", "created"],
      ["string", "description"],
      ["Reference", "encounter"],
      ["Identifier", "identifier"],
      ["canonical", "instantiatesCanonical"],
      ["uri", "instantiatesUri"],
      ["code", "intent"],
      ["Reference", "partOf"],
      ["Period", "period"],
      ["Reference", "replaces"],
      ["code", "status"],
      ["Reference", "subject"],
      ["string", "title"],
    ],
    options
  );
}

function narrativeCareTeam(
  resource: CareTeam,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "category"],
      ["Reference", "encounter"],
      ["Identifier", "identifier"],
      ["Reference", "managingOrganization"],
      ["string", "name"],
      ["Period", "period"],
      ["code", "status"],
      ["Reference", "subject"],
    ],
    options
  );
}

function narrativeCatalogEntry(
  resource: CatalogEntry,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Identifier", "identifier"],
      ["boolean", "orderable"],
      ["Reference", "referencedItem"],
    ],
    options
  );
}

function narrativeChargeItem(
  resource: ChargeItem,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "account"],
      ["CodeableConcept", "bodysite"],
      ["CodeableConcept", "code"],
      ["Reference", "context"],
      ["dateTime", "enteredDate"],
      ["Reference", "enterer"],
      ["Identifier", "identifier"],
      ["dateTime", "occurrenceDateTime"],
      ["Period", "occurrencePeriod"],
      ["Timing", "occurrenceTiming"],
      ["Quantity", "quantity"],
      ["code", "status"],
      ["Reference", "subject"],
    ],
    options
  );
}

function narrativeChargeItemDefinition(
  resource: ChargeItemDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "code"],
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["uri", "derivedFromUri"],
      ["markdown", "description"],
      ["Period", "effectivePeriod"],
      ["boolean", "experimental"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "jurisdiction"],
      ["canonical", "partOf"],
      ["string", "publisher"],
      ["canonical", "replaces"],
      ["code", "status"],
      ["string", "title"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeCitation(
  resource: Citation,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["Period", "effectivePeriod"],
      ["boolean", "experimental"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "jurisdiction"],
      ["string", "name"],
      ["string", "publisher"],
      ["code", "status"],
      ["string", "title"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeClaim(
  resource: Claim,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Period", "billablePeriod"],
      ["dateTime", "created"],
      ["Reference", "insurer"],
      ["Reference", "patient"],
      ["CodeableConcept", "priority"],
      ["Reference", "provider"],
      ["code", "status"],
      ["CodeableConcept", "type"],
      ["code", "use"],
    ],
    options
  );
}

function narrativeClaimResponse(
  resource: ClaimResponse,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["dateTime", "created"],
      ["Reference", "insurer"],
      ["code", "outcome"],
      ["Reference", "patient"],
      ["Reference", "request"],
      ["code", "status"],
      ["CodeableConcept", "type"],
      ["code", "use"],
    ],
    options
  );
}

function narrativeClinicalImpression(
  resource: ClinicalImpression,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "assessor"],
      ["CodeableConcept", "code"],
      ["dateTime", "date"],
      ["string", "description"],
      ["dateTime", "effectiveDateTime"],
      ["Period", "effectivePeriod"],
      ["Reference", "encounter"],
      ["Identifier", "identifier"],
      ["Reference", "problem"],
      ["code", "status"],
      ["Reference", "subject"],
    ],
    options
  );
}

function narrativeClinicalUseDefinition(
  resource: ClinicalUseDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "category"],
      ["Identifier", "identifier"],
      ["Reference", "population"],
      ["CodeableConcept", "status"],
      ["Reference", "subject"],
      ["code", "type"],
    ],
    options
  );
}

function narrativeCodeSystem(
  resource: CodeSystem,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "caseSensitive"],
      ["boolean", "compositional"],
      ["ContactDetail", "contact"],
      ["code", "content"],
      ["unsignedInt", "count"],
      ["dateTime", "date"],
      ["boolean", "experimental"],
      ["code", "hierarchyMeaning"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "jurisdiction"],
      ["string", "name"],
      ["string", "publisher"],
      ["code", "status"],
      ["canonical", "supplements"],
      ["string", "title"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["canonical", "valueSet"],
      ["string", "version"],
      ["boolean", "versionNeeded"],
    ],
    options
  );
}

function narrativeCommunication(
  resource: Communication,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "basedOn"],
      ["Reference", "encounter"],
      ["Identifier", "identifier"],
      ["canonical", "instantiatesCanonical"],
      ["uri", "instantiatesUri"],
      ["Reference", "partOf"],
      ["code", "priority"],
      ["CodeableConcept", "reasonCode"],
      ["Reference", "reasonReference"],
      ["code", "status"],
      ["CodeableConcept", "statusReason"],
      ["Reference", "subject"],
    ],
    options
  );
}

function narrativeCommunicationRequest(
  resource: CommunicationRequest,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["dateTime", "authoredOn"],
      ["Reference", "basedOn"],
      ["boolean", "doNotPerform"],
      ["Reference", "encounter"],
      ["Identifier", "groupIdentifier"],
      ["Identifier", "identifier"],
      ["dateTime", "occurrenceDateTime"],
      ["Period", "occurrencePeriod"],
      ["code", "priority"],
      ["CodeableConcept", "reasonCode"],
      ["Reference", "reasonReference"],
      ["Reference", "replaces"],
      ["Reference", "requester"],
      ["Reference", "sender"],
      ["code", "status"],
    ],
    options
  );
}

function narrativeCompartmentDefinition(
  resource: CompartmentDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["code", "code"],
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["boolean", "experimental"],
      ["string", "name"],
      ["string", "publisher"],
      ["boolean", "search"],
      ["code", "status"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeComposition(
  resource: Composition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "author"],
      ["CodeableConcept", "category"],
      ["code", "confidentiality"],
      ["Reference", "custodian"],
      ["dateTime", "date"],
      ["Reference", "encounter"],
      ["Identifier", "identifier"],
      ["code", "status"],
      ["Reference", "subject"],
      ["string", "title"],
      ["CodeableConcept", "type"],
    ],
    options
  );
}

function narrativeConceptMap(
  resource: ConceptMap,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["boolean", "experimental"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "jurisdiction"],
      ["string", "name"],
      ["string", "publisher"],
      ["uri", "sourceUri"],
      ["canonical", "sourceCanonical"],
      ["code", "status"],
      ["uri", "targetUri"],
      ["canonical", "targetCanonical"],
      ["string", "title"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeCondition(
  resource: Condition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "asserter"],
      ["CodeableConcept", "bodySite"],
      ["CodeableConcept", "clinicalStatus"],
      ["CodeableConcept", "code"],
      ["Reference", "encounter"],
      ["Identifier", "identifier"],
      ["dateTime", "onsetDateTime"],
      ["Age", "onsetAge"],
      ["Period", "onsetPeriod"],
      ["Range", "onsetRange"],
      ["string", "onsetString"],
      ["dateTime", "recordedDate"],
      ["Reference", "recorder"],
      ["Reference", "subject"],
      ["CodeableConcept", "verificationStatus"],
    ],
    options
  );
}

function narrativeConsent(
  resource: Consent,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "category"],
      ["dateTime", "dateTime"],
      ["Identifier", "identifier"],
      ["Reference", "organization"],
      ["Reference", "patient"],
      ["Reference", "performer"],
      ["CodeableConcept", "policyRule"],
      ["CodeableConcept", "scope"],
      ["Attachment", "sourceAttachment"],
      ["Reference", "sourceReference"],
      ["code", "status"],
    ],
    options
  );
}

function narrativeContract(
  resource: Contract,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Period", "applies"],
      ["Identifier", "identifier"],
      ["dateTime", "issued"],
      ["string", "name"],
      ["code", "status"],
      ["Reference", "subject"],
      ["CodeableConcept", "subType"],
      ["string", "title"],
      ["CodeableConcept", "type"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeCoverage(
  resource: Coverage,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "beneficiary"],
      ["string", "dependent"],
      ["Identifier", "identifier"],
      ["string", "network"],
      ["positiveInt", "order"],
      ["Reference", "payor"],
      ["Period", "period"],
      ["Reference", "policyHolder"],
      ["code", "status"],
      ["Reference", "subscriber"],
      ["string", "subscriberId"],
      ["CodeableConcept", "type"],
    ],
    options
  );
}

function narrativeCoverageEligibilityRequest(
  resource: CoverageEligibilityRequest,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["dateTime", "created"],
      ["Reference", "insurer"],
      ["Reference", "patient"],
      ["code", "purpose"],
      ["code", "status"],
    ],
    options
  );
}

function narrativeCoverageEligibilityResponse(
  resource: CoverageEligibilityResponse,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["dateTime", "created"],
      ["Reference", "insurer"],
      ["code", "outcome"],
      ["Reference", "patient"],
      ["code", "purpose"],
      ["Reference", "request"],
      ["code", "status"],
    ],
    options
  );
}

function narrativeDetectedIssue(
  resource: DetectedIssue,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "author"],
      ["CodeableConcept", "code"],
      ["dateTime", "identifiedDateTime"],
      ["Period", "identifiedPeriod"],
      ["Identifier", "identifier"],
      ["Reference", "implicated"],
      ["Reference", "patient"],
      ["code", "severity"],
      ["code", "status"],
    ],
    options
  );
}

function narrativeDevice(
  resource: Device,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "safety"],
      ["code", "status"],
    ],
    options
  );
}

function narrativeDeviceDefinition(
  resource: DeviceDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "parentDevice"],
      ["CodeableConcept", "safety"],
    ],
    options
  );
}

function narrativeDeviceMetric(
  resource: DeviceMetric,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["code", "category"],
      ["code", "color"],
      ["Identifier", "identifier"],
      ["Timing", "measurementPeriod"],
      ["code", "operationalStatus"],
      ["Reference", "parent"],
      ["Reference", "source"],
      ["CodeableConcept", "type"],
      ["CodeableConcept", "unit"],
    ],
    options
  );
}

function narrativeDeviceRequest(
  resource: DeviceRequest,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["dateTime", "authoredOn"],
      ["Reference", "basedOn"],
      ["Reference", "codeReference"],
      ["CodeableConcept", "codeCodeableConcept"],
      ["Reference", "encounter"],
      ["Identifier", "groupIdentifier"],
      ["Identifier", "identifier"],
      ["canonical", "instantiatesCanonical"],
      ["uri", "instantiatesUri"],
      ["code", "intent"],
      ["dateTime", "occurrenceDateTime"],
      ["Period", "occurrencePeriod"],
      ["Timing", "occurrenceTiming"],
      ["Reference", "performer"],
      ["CodeableConcept", "performerType"],
      ["code", "priority"],
      ["Reference", "priorRequest"],
      ["CodeableConcept", "reasonCode"],
      ["Reference", "reasonReference"],
      ["Reference", "requester"],
      ["code", "status"],
      ["Reference", "subject"],
    ],
    options
  );
}

function narrativeDeviceUseStatement(
  resource: DeviceUseStatement,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "basedOn"],
      ["CodeableConcept", "bodySite"],
      ["Reference", "derivedFrom"],
      ["Reference", "device"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "reasonCode"],
      ["Reference", "reasonReference"],
      ["dateTime", "recordedOn"],
      ["Reference", "source"],
      ["code", "status"],
      ["Reference", "subject"],
      ["Timing", "timingTiming"],
      ["Period", "timingPeriod"],
      ["dateTime", "timingDateTime"],
    ],
    options
  );
}

function narrativeDiagnosticReport(
  resource: DiagnosticReport,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "category"],
      ["CodeableConcept", "code"],
      ["dateTime", "effectiveDateTime"],
      ["Period", "effectivePeriod"],
      ["Reference", "encounter"],
      ["Identifier", "identifier"],
      ["instant", "issued"],
      ["Reference", "performer"],
      ["Reference", "resultsInterpreter"],
      ["code", "status"],
      ["Reference", "subject"],
    ],
    options
  );
}

function narrativeDocumentManifest(
  resource: DocumentManifest,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "author"],
      ["Reference", "content"],
      ["string", "description"],
      ["Identifier", "identifier"],
      ["Identifier", "masterIdentifier"],
      ["code", "status"],
      ["Reference", "subject"],
      ["CodeableConcept", "type"],
    ],
    options
  );
}

function narrativeDocumentReference(
  resource: DocumentReference,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "author"],
      ["CodeableConcept", "category"],
      ["instant", "date"],
      ["string", "description"],
      ["code", "docStatus"],
      ["Identifier", "identifier"],
      ["Identifier", "masterIdentifier"],
      ["CodeableConcept", "securityLabel"],
      ["code", "status"],
      ["Reference", "subject"],
      ["CodeableConcept", "type"],
    ],
    options
  );
}

function narrativeEncounter(
  resource: Encounter,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "appointment"],
      ["Coding", "class"],
      ["Reference", "episodeOfCare"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "reasonCode"],
      ["Reference", "reasonReference"],
      ["CodeableConcept", "serviceType"],
      ["code", "status"],
      ["Reference", "subject"],
      ["CodeableConcept", "type"],
    ],
    options
  );
}

function narrativeEndpoint(
  resource: Endpoint,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["url", "address"],
      ["Coding", "connectionType"],
      ["Identifier", "identifier"],
      ["Reference", "managingOrganization"],
      ["string", "name"],
      ["code", "payloadMimeType"],
      ["CodeableConcept", "payloadType"],
      ["Period", "period"],
      ["code", "status"],
    ],
    options
  );
}

function narrativeEnrollmentRequest(
  resource: EnrollmentRequest,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(resource, [["code", "status"]], options);
}

function narrativeEnrollmentResponse(
  resource: EnrollmentResponse,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(resource, [["code", "status"]], options);
}

function narrativeEpisodeOfCare(
  resource: EpisodeOfCare,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "managingOrganization"],
      ["Reference", "patient"],
      ["Period", "period"],
      ["code", "status"],
      ["CodeableConcept", "type"],
    ],
    options
  );
}

function narrativeEventDefinition(
  resource: EventDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["date", "approvalDate"],
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["Period", "effectivePeriod"],
      ["boolean", "experimental"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "jurisdiction"],
      ["date", "lastReviewDate"],
      ["string", "name"],
      ["string", "publisher"],
      ["code", "status"],
      ["string", "title"],
      ["TriggerDefinition", "trigger"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeEvidence(
  resource: Evidence,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "author"],
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["ContactDetail", "endorser"],
      ["Identifier", "identifier"],
      ["string", "publisher"],
      ["code", "status"],
      ["string", "title"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeEvidenceReport(
  resource: EvidenceReport,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "author"],
      ["ContactDetail", "contact"],
      ["ContactDetail", "endorser"],
      ["Identifier", "identifier"],
      ["string", "publisher"],
      ["Identifier", "relatedIdentifier"],
      ["code", "status"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
    ],
    options
  );
}

function narrativeEvidenceVariable(
  resource: EvidenceVariable,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["markdown", "description"],
      ["code", "handling"],
      ["Identifier", "identifier"],
      ["string", "name"],
      ["string", "publisher"],
      ["string", "shortTitle"],
      ["code", "status"],
      ["string", "title"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeExampleScenario(
  resource: ExampleScenario,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["boolean", "experimental"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "jurisdiction"],
      ["string", "name"],
      ["string", "publisher"],
      ["code", "status"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeExplanationOfBenefit(
  resource: ExplanationOfBenefit,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Period", "billablePeriod"],
      ["dateTime", "created"],
      ["Reference", "insurer"],
      ["code", "outcome"],
      ["Reference", "patient"],
      ["Reference", "provider"],
      ["code", "status"],
      ["CodeableConcept", "type"],
      ["code", "use"],
    ],
    options
  );
}

function narrativeFamilyMemberHistory(
  resource: FamilyMemberHistory,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Age", "ageAge"],
      ["Range", "ageRange"],
      ["string", "ageString"],
      ["CodeableConcept", "dataAbsentReason"],
      ["dateTime", "date"],
      ["boolean", "deceasedBoolean"],
      ["Age", "deceasedAge"],
      ["Range", "deceasedRange"],
      ["date", "deceasedDate"],
      ["string", "deceasedString"],
      ["boolean", "estimatedAge"],
      ["Identifier", "identifier"],
      ["canonical", "instantiatesCanonical"],
      ["uri", "instantiatesUri"],
      ["string", "name"],
      ["Reference", "patient"],
      ["CodeableConcept", "reasonCode"],
      ["Reference", "reasonReference"],
      ["CodeableConcept", "relationship"],
      ["CodeableConcept", "sex"],
      ["code", "status"],
    ],
    options
  );
}

function narrativeFlag(
  resource: Flag,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "author"],
      ["CodeableConcept", "category"],
      ["CodeableConcept", "code"],
      ["Reference", "encounter"],
      ["Identifier", "identifier"],
      ["Period", "period"],
      ["code", "status"],
      ["Reference", "subject"],
    ],
    options
  );
}

function narrativeGoal(
  resource: Goal,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "achievementStatus"],
      ["CodeableConcept", "category"],
      ["CodeableConcept", "description"],
      ["Reference", "expressedBy"],
      ["code", "lifecycleStatus"],
      ["CodeableConcept", "priority"],
      ["date", "startDate"],
      ["CodeableConcept", "startCodeableConcept"],
      ["date", "statusDate"],
      ["Reference", "subject"],
    ],
    options
  );
}

function narrativeGraphDefinition(
  resource: GraphDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["boolean", "experimental"],
      ["CodeableConcept", "jurisdiction"],
      ["string", "name"],
      ["string", "publisher"],
      ["code", "start"],
      ["code", "status"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeGroup(
  resource: Group,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "active"],
      ["boolean", "actual"],
      ["CodeableConcept", "code"],
      ["Identifier", "identifier"],
      ["Reference", "managingEntity"],
      ["string", "name"],
      ["unsignedInt", "quantity"],
      ["code", "type"],
    ],
    options
  );
}

function narrativeGuidanceResponse(
  resource: GuidanceResponse,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Identifier", "identifier"],
      ["uri", "moduleUri"],
      ["canonical", "moduleCanonical"],
      ["CodeableConcept", "moduleCodeableConcept"],
      ["Identifier", "requestIdentifier"],
      ["code", "status"],
    ],
    options
  );
}

function narrativeHealthcareService(
  resource: HealthcareService,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "active"],
      ["CodeableConcept", "category"],
      ["string", "comment"],
      ["Identifier", "identifier"],
      ["Reference", "location"],
      ["string", "name"],
      ["Attachment", "photo"],
      ["Reference", "providedBy"],
      ["CodeableConcept", "specialty"],
      ["CodeableConcept", "type"],
    ],
    options
  );
}

function narrativeImagingStudy(
  resource: ImagingStudy,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "basedOn"],
      ["string", "description"],
      ["Reference", "encounter"],
      ["Reference", "endpoint"],
      ["Identifier", "identifier"],
      ["Reference", "interpreter"],
      ["Reference", "location"],
      ["Coding", "modality"],
      ["Annotation", "note"],
      ["unsignedInt", "numberOfInstances"],
      ["unsignedInt", "numberOfSeries"],
      ["CodeableConcept", "procedureCode"],
      ["Reference", "procedureReference"],
      ["CodeableConcept", "reasonCode"],
      ["Reference", "reasonReference"],
      ["Reference", "referrer"],
      ["dateTime", "started"],
      ["code", "status"],
      ["Reference", "subject"],
    ],
    options
  );
}

function narrativeImmunization(
  resource: Immunization,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "isSubpotent"],
      ["Annotation", "note"],
      ["dateTime", "occurrenceDateTime"],
      ["string", "occurrenceString"],
      ["Reference", "patient"],
      ["boolean", "primarySource"],
      ["code", "status"],
      ["CodeableConcept", "vaccineCode"],
    ],
    options
  );
}

function narrativeImmunizationEvaluation(
  resource: ImmunizationEvaluation,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "doseStatus"],
      ["Reference", "immunizationEvent"],
      ["Reference", "patient"],
      ["code", "status"],
      ["CodeableConcept", "targetDisease"],
    ],
    options
  );
}

function narrativeImmunizationRecommendation(
  resource: ImmunizationRecommendation,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["dateTime", "date"],
      ["Identifier", "identifier"],
      ["Reference", "patient"],
    ],
    options
  );
}

function narrativeImplementationGuide(
  resource: ImplementationGuide,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["boolean", "experimental"],
      ["code", "fhirVersion"],
      ["CodeableConcept", "jurisdiction"],
      ["code", "license"],
      ["string", "name"],
      ["id", "packageId"],
      ["string", "publisher"],
      ["code", "status"],
      ["string", "title"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeIngredient(
  resource: Ingredient,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "allergenicIndicator"],
      ["Reference", "for"],
      ["CodeableConcept", "function"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "role"],
      ["code", "status"],
    ],
    options
  );
}

function narrativeInsurancePlan(
  resource: InsurancePlan,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "administeredBy"],
      ["Reference", "coverageArea"],
      ["Identifier", "identifier"],
      ["string", "name"],
      ["Reference", "ownedBy"],
      ["code", "status"],
      ["CodeableConcept", "type"],
    ],
    options
  );
}

function narrativeInvoice(
  resource: Invoice,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["dateTime", "date"],
      ["Identifier", "identifier"],
      ["Reference", "recipient"],
      ["code", "status"],
      ["Reference", "subject"],
      ["Money", "totalGross"],
      ["Money", "totalNet"],
      ["CodeableConcept", "type"],
    ],
    options
  );
}

function narrativeLibrary(
  resource: Library,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "contact"],
      ["Attachment", "content"],
      ["dateTime", "date"],
      ["markdown", "description"],
      ["Period", "effectivePeriod"],
      ["boolean", "experimental"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "jurisdiction"],
      ["string", "name"],
      ["string", "publisher"],
      ["code", "status"],
      ["string", "title"],
      ["CodeableConcept", "type"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeLinkage(
  resource: Linkage,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "active"],
      ["Reference", "author"],
    ],
    options
  );
}

function narrativeList(
  resource: List,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "code"],
      ["dateTime", "date"],
      ["code", "mode"],
      ["Reference", "source"],
      ["code", "status"],
      ["Reference", "subject"],
      ["string", "title"],
    ],
    options
  );
}

function narrativeLocation(
  resource: Location,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["string", "description"],
      ["Identifier", "identifier"],
      ["Reference", "managingOrganization"],
      ["code", "mode"],
      ["string", "name"],
      ["Coding", "operationalStatus"],
      ["CodeableConcept", "physicalType"],
      ["code", "status"],
      ["CodeableConcept", "type"],
    ],
    options
  );
}

function narrativeManufacturedItemDefinition(
  resource: ManufacturedItemDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Identifier", "identifier"],
      ["CodeableConcept", "ingredient"],
      ["CodeableConcept", "manufacturedDoseForm"],
      ["Reference", "manufacturer"],
      ["code", "status"],
      ["CodeableConcept", "unitOfPresentation"],
    ],
    options
  );
}

function narrativeMeasure(
  resource: Measure,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["markdown", "clinicalRecommendationStatement"],
      ["CodeableConcept", "compositeScoring"],
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["markdown", "definition"],
      ["markdown", "description"],
      ["markdown", "disclaimer"],
      ["Period", "effectivePeriod"],
      ["boolean", "experimental"],
      ["markdown", "guidance"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "improvementNotation"],
      ["CodeableConcept", "jurisdiction"],
      ["string", "name"],
      ["string", "publisher"],
      ["string", "rateAggregation"],
      ["markdown", "rationale"],
      ["string", "riskAdjustment"],
      ["CodeableConcept", "scoring"],
      ["code", "status"],
      ["string", "title"],
      ["CodeableConcept", "type"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeMeasureReport(
  resource: MeasureReport,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["dateTime", "date"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "improvementNotation"],
      ["canonical", "measure"],
      ["Period", "period"],
      ["Reference", "reporter"],
      ["code", "status"],
      ["Reference", "subject"],
      ["code", "type"],
    ],
    options
  );
}

function narrativeMedia(
  resource: Media,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "basedOn"],
      ["CodeableConcept", "bodySite"],
      ["Attachment", "content"],
      ["dateTime", "createdDateTime"],
      ["Period", "createdPeriod"],
      ["Reference", "device"],
      ["string", "deviceName"],
      ["decimal", "duration"],
      ["Reference", "encounter"],
      ["positiveInt", "frames"],
      ["positiveInt", "height"],
      ["Identifier", "identifier"],
      ["instant", "issued"],
      ["CodeableConcept", "modality"],
      ["Reference", "operator"],
      ["Reference", "partOf"],
      ["CodeableConcept", "reasonCode"],
      ["code", "status"],
      ["Reference", "subject"],
      ["CodeableConcept", "type"],
      ["CodeableConcept", "view"],
      ["positiveInt", "width"],
    ],
    options
  );
}

function narrativeMedication(
  resource: Medication,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Ratio", "amount"],
      ["CodeableConcept", "code"],
      ["Identifier", "identifier"],
      ["Reference", "manufacturer"],
      ["code", "status"],
    ],
    options
  );
}

function narrativeMedicationAdministration(
  resource: MedicationAdministration,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["dateTime", "effectiveDateTime"],
      ["Period", "effectivePeriod"],
      ["uri", "instantiates"],
      ["CodeableConcept", "medicationCodeableConcept"],
      ["Reference", "medicationReference"],
      ["Reference", "partOf"],
      ["code", "status"],
      ["Reference", "subject"],
    ],
    options
  );
}

function narrativeMedicationDispense(
  resource: MedicationDispense,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "medicationCodeableConcept"],
      ["Reference", "medicationReference"],
      ["code", "status"],
      ["Reference", "subject"],
      ["dateTime", "whenPrepared"],
    ],
    options
  );
}

function narrativeMedicationKnowledge(
  resource: MedicationKnowledge,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Quantity", "amount"],
      ["CodeableConcept", "code"],
      ["Reference", "manufacturer"],
      ["code", "status"],
      ["string", "synonym"],
    ],
    options
  );
}

function narrativeMedicationRequest(
  resource: MedicationRequest,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["dateTime", "authoredOn"],
      ["Reference", "basedOn"],
      ["boolean", "doNotPerform"],
      ["Identifier", "groupIdentifier"],
      ["canonical", "instantiatesCanonical"],
      ["uri", "instantiatesUri"],
      ["code", "intent"],
      ["CodeableConcept", "medicationCodeableConcept"],
      ["Reference", "medicationReference"],
      ["CodeableConcept", "performerType"],
      ["code", "priority"],
      ["boolean", "reportedBoolean"],
      ["Reference", "reportedReference"],
      ["Reference", "requester"],
      ["code", "status"],
      ["Reference", "subject"],
    ],
    options
  );
}

function narrativeMedicationStatement(
  resource: MedicationStatement,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "basedOn"],
      ["CodeableConcept", "category"],
      ["Reference", "context"],
      ["dateTime", "dateAsserted"],
      ["dateTime", "effectiveDateTime"],
      ["Period", "effectivePeriod"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "medicationCodeableConcept"],
      ["Reference", "medicationReference"],
      ["Reference", "partOf"],
      ["code", "status"],
      ["Reference", "subject"],
    ],
    options
  );
}

function narrativeMedicinalProductDefinition(
  resource: MedicinalProductDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "additionalMonitoringIndicator"],
      ["Reference", "attachedDocument"],
      ["CodeableConcept", "classification"],
      ["Reference", "clinicalTrial"],
      ["Coding", "code"],
      ["CodeableConcept", "combinedPharmaceuticalDoseForm"],
      ["markdown", "description"],
      ["CodeableConcept", "domain"],
      ["Identifier", "identifier"],
      ["CodeableReference", "impurity"],
      ["markdown", "indication"],
      ["CodeableConcept", "ingredient"],
      ["CodeableConcept", "legalStatusOfSupply"],
      ["MarketingStatus", "marketingStatus"],
      ["Reference", "masterFile"],
      ["CodeableConcept", "packagedMedicinalProduct"],
      ["CodeableConcept", "pediatricUseIndicator"],
      ["CodeableConcept", "route"],
      ["CodeableConcept", "specialMeasures"],
      ["CodeableConcept", "status"],
      ["dateTime", "statusDate"],
      ["CodeableConcept", "type"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeMessageDefinition(
  resource: MessageDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["canonical", "base"],
      ["code", "category"],
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["markdown", "description"],
      ["Coding", "eventCoding"],
      ["uri", "eventUri"],
      ["boolean", "experimental"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "jurisdiction"],
      ["string", "name"],
      ["canonical", "parent"],
      ["string", "publisher"],
      ["markdown", "purpose"],
      ["canonical", "replaces"],
      ["code", "status"],
      ["string", "title"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeMessageHeader(
  resource: MessageHeader,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "author"],
      ["canonical", "definition"],
      ["Reference", "enterer"],
      ["Coding", "eventCoding"],
      ["uri", "eventUri"],
      ["Reference", "focus"],
      ["CodeableConcept", "reason"],
      ["Reference", "responsible"],
      ["Reference", "sender"],
    ],
    options
  );
}

function narrativeMolecularSequence(
  resource: MolecularSequence,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["integer", "coordinateSystem"],
      ["Reference", "device"],
      ["Identifier", "identifier"],
      ["string", "observedSeq"],
      ["Reference", "patient"],
      ["Reference", "performer"],
      ["Reference", "pointer"],
      ["Quantity", "quantity"],
      ["integer", "readCoverage"],
      ["Reference", "specimen"],
      ["code", "type"],
    ],
    options
  );
}

function narrativeNamingSystem(
  resource: NamingSystem,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["CodeableConcept", "jurisdiction"],
      ["code", "kind"],
      ["string", "name"],
      ["string", "publisher"],
      ["code", "status"],
      ["UsageContext", "useContext"],
    ],
    options
  );
}

function narrativeNutritionOrder(
  resource: NutritionOrder,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["dateTime", "dateTime"],
      ["canonical", "instantiatesCanonical"],
      ["uri", "instantiatesUri"],
      ["code", "intent"],
      ["Reference", "orderer"],
      ["Reference", "patient"],
      ["code", "status"],
    ],
    options
  );
}

function narrativeNutritionProduct(
  resource: NutritionProduct,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "category"],
      ["CodeableConcept", "code"],
      ["Reference", "manufacturer"],
      ["code", "status"],
    ],
    options
  );
}

function narrativeObservation(
  resource: Observation,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "basedOn"],
      ["CodeableConcept", "code"],
      ["Reference", "derivedFrom"],
      ["dateTime", "effectiveDateTime"],
      ["Period", "effectivePeriod"],
      ["Timing", "effectiveTiming"],
      ["instant", "effectiveInstant"],
      ["Reference", "encounter"],
      ["Reference", "focus"],
      ["Reference", "hasMember"],
      ["Identifier", "identifier"],
      ["instant", "issued"],
      ["Reference", "partOf"],
      ["Reference", "performer"],
      ["code", "status"],
      ["Reference", "subject"],
      ["Quantity", "valueQuantity"],
      ["CodeableConcept", "valueCodeableConcept"],
      ["string", "valueString"],
      ["boolean", "valueBoolean"],
      ["integer", "valueInteger"],
      ["Range", "valueRange"],
      ["Ratio", "valueRatio"],
      ["SampledData", "valueSampledData"],
      ["time", "valueTime"],
      ["dateTime", "valueDateTime"],
      ["Period", "valuePeriod"],
    ],
    options
  );
}

function narrativeObservationDefinition(
  resource: ObservationDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "category"],
      ["CodeableConcept", "code"],
      ["Identifier", "identifier"],
    ],
    options
  );
}

function narrativeOperationDefinition(
  resource: OperationDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "affectsState"],
      ["canonical", "base"],
      ["code", "code"],
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["boolean", "experimental"],
      ["boolean", "instance"],
      ["CodeableConcept", "jurisdiction"],
      ["code", "kind"],
      ["string", "name"],
      ["string", "publisher"],
      ["code", "resource"],
      ["code", "status"],
      ["boolean", "system"],
      ["string", "title"],
      ["boolean", "type"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeOperationOutcome(
  resource: OperationOutcome,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(resource, [], options);
}

function narrativeOrganization(
  resource: Organization,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "active"],
      ["Identifier", "identifier"],
      ["string", "name"],
      ["Reference", "partOf"],
      ["CodeableConcept", "type"],
    ],
    options
  );
}

function narrativeOrganizationAffiliation(
  resource: OrganizationAffiliation,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "active"],
      ["CodeableConcept", "code"],
      ["Identifier", "identifier"],
      ["Reference", "location"],
      ["Reference", "network"],
      ["Reference", "organization"],
      ["Reference", "participatingOrganization"],
      ["Period", "period"],
      ["CodeableConcept", "specialty"],
      ["ContactPoint", "telecom"],
    ],
    options
  );
}

function narrativePackagedProductDefinition(
  resource: PackagedProductDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "characteristic"],
      ["Quantity", "containedItemQuantity"],
      ["boolean", "copackagedIndicator"],
      ["markdown", "description"],
      ["Identifier", "identifier"],
      ["Reference", "manufacturer"],
      ["MarketingStatus", "marketingStatus"],
      ["string", "name"],
      ["Reference", "packageFor"],
      ["CodeableConcept", "status"],
      ["dateTime", "statusDate"],
      ["CodeableConcept", "type"],
    ],
    options
  );
}

function narrativePatient(
  resource: Patient,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "active"],
      ["Address", "address"],
      ["date", "birthDate"],
      ["boolean", "deceasedBoolean"],
      ["dateTime", "deceasedDateTime"],
      ["code", "gender"],
      ["Identifier", "identifier"],
      ["Reference", "managingOrganization"],
      ["HumanName", "name"],
      ["ContactPoint", "telecom"],
    ],
    options
  );
}

function narrativePaymentNotice(
  resource: PaymentNotice,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Money", "amount"],
      ["dateTime", "created"],
      ["Reference", "payment"],
      ["Reference", "recipient"],
      ["code", "status"],
    ],
    options
  );
}

function narrativePaymentReconciliation(
  resource: PaymentReconciliation,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["dateTime", "created"],
      ["Money", "paymentAmount"],
      ["date", "paymentDate"],
      ["Reference", "paymentIssuer"],
      ["Period", "period"],
      ["code", "status"],
    ],
    options
  );
}

function narrativePerson(
  resource: Person,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "active"],
      ["date", "birthDate"],
      ["code", "gender"],
      ["Reference", "managingOrganization"],
      ["HumanName", "name"],
      ["ContactPoint", "telecom"],
    ],
    options
  );
}

function narrativePlanDefinition(
  resource: PlanDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["markdown", "description"],
      ["Period", "effectivePeriod"],
      ["boolean", "experimental"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "jurisdiction"],
      ["string", "name"],
      ["string", "publisher"],
      ["code", "status"],
      ["string", "title"],
      ["CodeableConcept", "type"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativePractitioner(
  resource: Practitioner,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "active"],
      ["Address", "address"],
      ["date", "birthDate"],
      ["code", "gender"],
      ["Identifier", "identifier"],
      ["HumanName", "name"],
      ["ContactPoint", "telecom"],
    ],
    options
  );
}

function narrativePractitionerRole(
  resource: PractitionerRole,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "active"],
      ["CodeableConcept", "code"],
      ["Identifier", "identifier"],
      ["Reference", "location"],
      ["Reference", "organization"],
      ["Period", "period"],
      ["Reference", "practitioner"],
      ["CodeableConcept", "specialty"],
      ["ContactPoint", "telecom"],
    ],
    options
  );
}

function narrativeProcedure(
  resource: Procedure,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "asserter"],
      ["Reference", "basedOn"],
      ["CodeableConcept", "bodySite"],
      ["CodeableConcept", "category"],
      ["CodeableConcept", "code"],
      ["Reference", "encounter"],
      ["Identifier", "identifier"],
      ["canonical", "instantiatesCanonical"],
      ["uri", "instantiatesUri"],
      ["Reference", "location"],
      ["CodeableConcept", "outcome"],
      ["Reference", "partOf"],
      ["dateTime", "performedDateTime"],
      ["Period", "performedPeriod"],
      ["string", "performedString"],
      ["Age", "performedAge"],
      ["Range", "performedRange"],
      ["CodeableConcept", "reasonCode"],
      ["Reference", "reasonReference"],
      ["Reference", "recorder"],
      ["code", "status"],
      ["CodeableConcept", "statusReason"],
      ["Reference", "subject"],
    ],
    options
  );
}

function narrativeProvenance(
  resource: Provenance,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["instant", "recorded"],
      ["Reference", "target"],
    ],
    options
  );
}

function narrativeQuestionnaire(
  resource: Questionnaire,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Coding", "code"],
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["Period", "effectivePeriod"],
      ["boolean", "experimental"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "jurisdiction"],
      ["string", "name"],
      ["string", "publisher"],
      ["code", "status"],
      ["code", "subjectType"],
      ["string", "title"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeQuestionnaireResponse(
  resource: QuestionnaireResponse,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "author"],
      ["dateTime", "authored"],
      ["Reference", "basedOn"],
      ["Reference", "encounter"],
      ["Identifier", "identifier"],
      ["Reference", "partOf"],
      ["canonical", "questionnaire"],
      ["Reference", "source"],
      ["code", "status"],
      ["Reference", "subject"],
    ],
    options
  );
}

function narrativeRegulatedAuthorization(
  resource: RegulatedAuthorization,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "basis"],
      ["markdown", "description"],
      ["Reference", "holder"],
      ["Identifier", "identifier"],
      ["CodeableReference", "indication"],
      ["CodeableConcept", "intendedUse"],
      ["CodeableConcept", "region"],
      ["Reference", "regulator"],
      ["CodeableConcept", "status"],
      ["dateTime", "statusDate"],
      ["Reference", "subject"],
      ["CodeableConcept", "type"],
      ["Period", "validityPeriod"],
    ],
    options
  );
}

function narrativeRelatedPerson(
  resource: RelatedPerson,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "active"],
      ["Address", "address"],
      ["date", "birthDate"],
      ["code", "gender"],
      ["Identifier", "identifier"],
      ["HumanName", "name"],
      ["Reference", "patient"],
      ["CodeableConcept", "relationship"],
      ["ContactPoint", "telecom"],
    ],
    options
  );
}

function narrativeRequestGroup(
  resource: RequestGroup,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "code"],
      ["Identifier", "groupIdentifier"],
      ["Identifier", "identifier"],
      ["canonical", "instantiatesCanonical"],
      ["uri", "instantiatesUri"],
      ["code", "intent"],
      ["code", "priority"],
      ["code", "status"],
    ],
    options
  );
}

function narrativeResearchDefinition(
  resource: ResearchDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["markdown", "description"],
      ["Period", "effectivePeriod"],
      ["boolean", "experimental"],
      ["Reference", "exposure"],
      ["Reference", "exposureAlternative"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "jurisdiction"],
      ["string", "name"],
      ["Reference", "outcome"],
      ["Reference", "population"],
      ["string", "publisher"],
      ["code", "status"],
      ["string", "title"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeResearchElementDefinition(
  resource: ResearchElementDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["markdown", "description"],
      ["Period", "effectivePeriod"],
      ["boolean", "experimental"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "jurisdiction"],
      ["string", "name"],
      ["string", "publisher"],
      ["string", "shortTitle"],
      ["code", "status"],
      ["string", "title"],
      ["code", "type"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeResearchStudy(
  resource: ResearchStudy,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "category"],
      ["CodeableConcept", "condition"],
      ["ContactDetail", "contact"],
      ["Reference", "enrollment"],
      ["CodeableConcept", "focus"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "keyword"],
      ["CodeableConcept", "location"],
      ["Reference", "partOf"],
      ["Period", "period"],
      ["CodeableConcept", "phase"],
      ["CodeableConcept", "primaryPurposeType"],
      ["Reference", "principalInvestigator"],
      ["Reference", "protocol"],
      ["CodeableConcept", "reasonStopped"],
      ["Reference", "site"],
      ["Reference", "sponsor"],
      ["code", "status"],
      ["string", "title"],
    ],
    options
  );
}

function narrativeResearchSubject(
  resource: ResearchSubject,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Identifier", "identifier"],
      ["Reference", "individual"],
      ["Period", "period"],
      ["code", "status"],
      ["Reference", "study"],
    ],
    options
  );
}

function narrativeRiskAssessment(
  resource: RiskAssessment,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "code"],
      ["Reference", "condition"],
      ["Reference", "encounter"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "method"],
      ["dateTime", "occurrenceDateTime"],
      ["Period", "occurrencePeriod"],
      ["Reference", "performer"],
      ["code", "status"],
      ["Reference", "subject"],
    ],
    options
  );
}

function narrativeSchedule(
  resource: Schedule,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "active"],
      ["Reference", "actor"],
      ["Identifier", "identifier"],
      ["Period", "planningHorizon"],
      ["CodeableConcept", "serviceCategory"],
      ["CodeableConcept", "serviceType"],
      ["CodeableConcept", "specialty"],
    ],
    options
  );
}

function narrativeSearchParameter(
  resource: SearchParameter,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["code", "base"],
      ["code", "code"],
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["markdown", "description"],
      ["boolean", "experimental"],
      ["CodeableConcept", "jurisdiction"],
      ["string", "name"],
      ["string", "publisher"],
      ["code", "status"],
      ["code", "type"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeServiceRequest(
  resource: ServiceRequest,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "asNeededBoolean"],
      ["CodeableConcept", "asNeededCodeableConcept"],
      ["dateTime", "authoredOn"],
      ["Reference", "basedOn"],
      ["CodeableConcept", "bodySite"],
      ["CodeableConcept", "category"],
      ["CodeableConcept", "code"],
      ["boolean", "doNotPerform"],
      ["Reference", "encounter"],
      ["Identifier", "identifier"],
      ["canonical", "instantiatesCanonical"],
      ["uri", "instantiatesUri"],
      ["code", "intent"],
      ["CodeableConcept", "locationCode"],
      ["Reference", "locationReference"],
      ["dateTime", "occurrenceDateTime"],
      ["Period", "occurrencePeriod"],
      ["Timing", "occurrenceTiming"],
      ["CodeableConcept", "orderDetail"],
      ["string", "patientInstruction"],
      ["Reference", "performer"],
      ["CodeableConcept", "performerType"],
      ["code", "priority"],
      ["Quantity", "quantityQuantity"],
      ["Ratio", "quantityRatio"],
      ["Range", "quantityRange"],
      ["CodeableConcept", "reasonCode"],
      ["Reference", "reasonReference"],
      ["Reference", "replaces"],
      ["Reference", "requester"],
      ["Identifier", "requisition"],
      ["Reference", "specimen"],
      ["code", "status"],
      ["Reference", "subject"],
    ],
    options
  );
}

function narrativeSlot(
  resource: Slot,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "appointmentType"],
      ["instant", "end"],
      ["Identifier", "identifier"],
      ["Reference", "schedule"],
      ["CodeableConcept", "serviceCategory"],
      ["CodeableConcept", "serviceType"],
      ["CodeableConcept", "specialty"],
      ["instant", "start"],
      ["code", "status"],
    ],
    options
  );
}

function narrativeSpecimen(
  resource: Specimen,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Identifier", "accessionIdentifier"],
      ["CodeableConcept", "condition"],
      ["Identifier", "identifier"],
      ["dateTime", "receivedTime"],
      ["code", "status"],
      ["Reference", "subject"],
      ["CodeableConcept", "type"],
    ],
    options
  );
}

function narrativeSpecimenDefinition(
  resource: SpecimenDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "collection"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "patientPreparation"],
      ["string", "timeAspect"],
      ["CodeableConcept", "typeCollected"],
    ],
    options
  );
}

function narrativeStructureDefinition(
  resource: StructureDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "abstract"],
      ["canonical", "baseDefinition"],
      ["ContactDetail", "contact"],
      ["string", "contextInvariant"],
      ["dateTime", "date"],
      ["code", "derivation"],
      ["boolean", "experimental"],
      ["code", "fhirVersion"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "jurisdiction"],
      ["Coding", "keyword"],
      ["code", "kind"],
      ["string", "name"],
      ["string", "publisher"],
      ["code", "status"],
      ["string", "title"],
      ["uri", "type"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeStructureMap(
  resource: StructureMap,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["boolean", "experimental"],
      ["Identifier", "identifier"],
      ["canonical", "import"],
      ["CodeableConcept", "jurisdiction"],
      ["string", "name"],
      ["string", "publisher"],
      ["code", "status"],
      ["string", "title"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeSubscription(
  resource: Subscription,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactPoint", "contact"],
      ["string", "criteria"],
      ["instant", "end"],
      ["string", "error"],
      ["string", "reason"],
      ["code", "status"],
    ],
    options
  );
}

function narrativeSubscriptionStatus(
  resource: SubscriptionStatus,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "error"],
      ["string", "eventsSinceSubscriptionStart"],
      ["code", "status"],
      ["Reference", "subscription"],
      ["canonical", "topic"],
      ["code", "type"],
    ],
    options
  );
}

function narrativeSubscriptionTopic(
  resource: SubscriptionTopic,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["canonical", "derivedFrom"],
      ["Period", "effectivePeriod"],
      ["boolean", "experimental"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "jurisdiction"],
      ["string", "publisher"],
      ["code", "status"],
      ["string", "title"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeSubstance(
  resource: Substance,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "category"],
      ["CodeableConcept", "code"],
      ["string", "description"],
      ["Identifier", "identifier"],
      ["code", "status"],
    ],
    options
  );
}

function narrativeSubstanceDefinition(
  resource: SubstanceDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "classification"],
      ["markdown", "description"],
      ["CodeableConcept", "domain"],
      ["CodeableConcept", "grade"],
      ["Identifier", "identifier"],
      ["Reference", "informationSource"],
      ["Reference", "manufacturer"],
      ["Annotation", "note"],
      ["CodeableConcept", "status"],
      ["Reference", "supplier"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeSupplyDelivery(
  resource: SupplyDelivery,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "basedOn"],
      ["dateTime", "occurrenceDateTime"],
      ["Period", "occurrencePeriod"],
      ["Timing", "occurrenceTiming"],
      ["Reference", "partOf"],
      ["code", "status"],
    ],
    options
  );
}

function narrativeSupplyRequest(
  resource: SupplyRequest,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["dateTime", "authoredOn"],
      ["CodeableConcept", "category"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "itemCodeableConcept"],
      ["Reference", "itemReference"],
      ["dateTime", "occurrenceDateTime"],
      ["Period", "occurrencePeriod"],
      ["Timing", "occurrenceTiming"],
      ["code", "priority"],
      ["Quantity", "quantity"],
      ["Reference", "requester"],
      ["code", "status"],
      ["Reference", "supplier"],
    ],
    options
  );
}

function narrativeTask(
  resource: Task,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "basedOn"],
      ["CodeableConcept", "businessStatus"],
      ["CodeableConcept", "code"],
      ["string", "description"],
      ["Reference", "encounter"],
      ["Period", "executionPeriod"],
      ["Reference", "focus"],
      ["Reference", "for"],
      ["Identifier", "groupIdentifier"],
      ["canonical", "instantiatesCanonical"],
      ["uri", "instantiatesUri"],
      ["code", "intent"],
      ["dateTime", "lastModified"],
      ["Reference", "location"],
      ["Reference", "owner"],
      ["Reference", "partOf"],
      ["Reference", "requester"],
      ["code", "status"],
      ["CodeableConcept", "statusReason"],
    ],
    options
  );
}

function narrativeTerminologyCapabilities(
  resource: TerminologyCapabilities,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "contact"],
      ["markdown", "copyright"],
      ["dateTime", "date"],
      ["boolean", "experimental"],
      ["CodeableConcept", "jurisdiction"],
      ["code", "kind"],
      ["boolean", "lockedDate"],
      ["string", "name"],
      ["string", "publisher"],
      ["code", "status"],
      ["string", "title"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeTestReport(
  resource: TestReport,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Identifier", "identifier"],
      ["dateTime", "issued"],
      ["string", "name"],
      ["code", "result"],
      ["decimal", "score"],
      ["code", "status"],
      ["string", "tester"],
      ["Reference", "testScript"],
    ],
    options
  );
}

function narrativeTestScript(
  resource: TestScript,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["boolean", "experimental"],
      ["Identifier", "identifier"],
      ["CodeableConcept", "jurisdiction"],
      ["string", "name"],
      ["string", "publisher"],
      ["code", "status"],
      ["string", "title"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeValueSet(
  resource: ValueSet,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "contact"],
      ["dateTime", "date"],
      ["boolean", "experimental"],
      ["Identifier", "identifier"],
      ["boolean", "immutable"],
      ["CodeableConcept", "jurisdiction"],
      ["string", "name"],
      ["string", "publisher"],
      ["code", "status"],
      ["string", "title"],
      ["uri", "url"],
      ["UsageContext", "useContext"],
      ["string", "version"],
    ],
    options
  );
}

function narrativeVerificationResult(
  resource: VerificationResult,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "failureAction"],
      ["CodeableConcept", "need"],
      ["code", "status"],
      ["dateTime", "statusDate"],
      ["Reference", "target"],
      ["string", "targetLocation"],
      ["CodeableConcept", "validationProcess"],
      ["CodeableConcept", "validationType"],
    ],
    options
  );
}

function narrativeVisionPrescription(
  resource: VisionPrescription,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["dateTime", "created"],
      ["dateTime", "dateWritten"],
      ["Reference", "patient"],
      ["Reference", "prescriber"],
      ["code", "status"],
    ],
    options
  );
}

function buildNarrative<TResource extends AnyDomainResource>(
  resource: TResource,
  elements: Array<[string, keyof TResource]>,
  options?: NarrativeOptions | null | undefined
): Narrative {
  const formatter = options?.formatter ?? Formatter.default;
  return {
    status: "generated",
    div: `<div xmlns="http://www.w3.org/1999/xhtml"><ul>${(
      elements.map((element) => [
        startCase(element[1] as string).replace(" Boolean", ""),
        safeFormat(formatter, element[0], resource[element[1]]),
      ]) as Array<[string, string]>
    )
      .filter((element) => !!element[1])
      .map((element) => `<li><span>${element[0]}: </span>${element[1]}</li>`)
      .filter((x) => !!x)
      .join("")}</ul></div>`,
  };
}

function safeFormat(
  formatter: Formatter,
  type: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any | null | undefined
): string {
  if (formatter.canFormat(type)) {
    try {
      return htmlEncode(formatter.format(type, value as never));
    } catch {
      // Ignore
    }
  }

  return "";
}

function htmlEncode(value: string): string {
  return value.replace(
    /[&<>\u00A0-\u9999]/g,
    (i) => "&#" + i.codePointAt(0) + ";"
  );
}
