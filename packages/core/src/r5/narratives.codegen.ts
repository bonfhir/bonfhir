/**
 * Narrative generators for r5/5.0.0
 */

import {
  Account,
  ActivityDefinition,
  ActorDefinition,
  AdministrableProductDefinition,
  AdverseEvent,
  AllergyIntolerance,
  Appointment,
  AppointmentResponse,
  ArtifactAssessment,
  AuditEvent,
  Basic,
  BiologicallyDerivedProduct,
  BiologicallyDerivedProductDispense,
  BodyStructure,
  CanonicalResource,
  CapabilityStatement,
  CarePlan,
  CareTeam,
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
  ConditionDefinition,
  Consent,
  Contract,
  Coverage,
  CoverageEligibilityRequest,
  CoverageEligibilityResponse,
  DetectedIssue,
  Device,
  DeviceAssociation,
  DeviceDefinition,
  DeviceDispense,
  DeviceMetric,
  DeviceRequest,
  DeviceUsage,
  DiagnosticReport,
  DocumentReference,
  Encounter,
  EncounterHistory,
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
  FhirDomainResource,
  Flag,
  FormularyItem,
  GenomicStudy,
  Goal,
  GraphDefinition,
  Group,
  GuidanceResponse,
  HealthcareService,
  ImagingSelection,
  ImagingStudy,
  Immunization,
  ImmunizationEvaluation,
  ImmunizationRecommendation,
  ImplementationGuide,
  Ingredient,
  InsurancePlan,
  InventoryItem,
  InventoryReport,
  Invoice,
  Library,
  Linkage,
  List,
  Location,
  ManufacturedItemDefinition,
  Measure,
  MeasureReport,
  Medication,
  MedicationAdministration,
  MedicationDispense,
  MedicationKnowledge,
  MedicationRequest,
  MedicationStatement,
  MedicinalProductDefinition,
  MessageDefinition,
  MessageHeader,
  MetadataResource,
  MolecularSequence,
  NamingSystem,
  Narrative,
  NutritionIntake,
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
  Permission,
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
  RequestOrchestration,
  Requirements,
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
  SubstanceNucleicAcid,
  SubstancePolymer,
  SubstanceProtein,
  SubstanceReferenceInformation,
  SubstanceSourceMaterial,
  SupplyDelivery,
  SupplyRequest,
  Task,
  TerminologyCapabilities,
  TestPlan,
  TestReport,
  TestScript,
  Transport,
  ValueSet,
  VerificationResult,
  VisionPrescription,
} from "./fhir-types.codegen";
import { DefaultFormatter, Formatter } from "./formatters";

export interface NarrativeOptions {
  /** The formatter to use. Will use the `Formatter.default` if not provided. */
  formatter?: DefaultFormatter | null | undefined;
}

export function narrative<TResourceType extends FhirDomainResource>(
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

    case "ActorDefinition": {
      return narrativeActorDefinition(resource, options);
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

    case "ArtifactAssessment": {
      return narrativeArtifactAssessment(resource, options);
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

    case "BiologicallyDerivedProductDispense": {
      return narrativeBiologicallyDerivedProductDispense(resource, options);
    }

    case "BodyStructure": {
      return narrativeBodyStructure(resource, options);
    }

    case "CanonicalResource": {
      return narrativeCanonicalResource(resource, options);
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

    case "ConditionDefinition": {
      return narrativeConditionDefinition(resource, options);
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

    case "DeviceAssociation": {
      return narrativeDeviceAssociation(resource, options);
    }

    case "DeviceDefinition": {
      return narrativeDeviceDefinition(resource, options);
    }

    case "DeviceDispense": {
      return narrativeDeviceDispense(resource, options);
    }

    case "DeviceMetric": {
      return narrativeDeviceMetric(resource, options);
    }

    case "DeviceRequest": {
      return narrativeDeviceRequest(resource, options);
    }

    case "DeviceUsage": {
      return narrativeDeviceUsage(resource, options);
    }

    case "DiagnosticReport": {
      return narrativeDiagnosticReport(resource, options);
    }

    case "DocumentReference": {
      return narrativeDocumentReference(resource, options);
    }

    case "Encounter": {
      return narrativeEncounter(resource, options);
    }

    case "EncounterHistory": {
      return narrativeEncounterHistory(resource, options);
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

    case "FormularyItem": {
      return narrativeFormularyItem(resource, options);
    }

    case "GenomicStudy": {
      return narrativeGenomicStudy(resource, options);
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

    case "ImagingSelection": {
      return narrativeImagingSelection(resource, options);
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

    case "InventoryItem": {
      return narrativeInventoryItem(resource, options);
    }

    case "InventoryReport": {
      return narrativeInventoryReport(resource, options);
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

    case "MetadataResource": {
      return narrativeMetadataResource(resource, options);
    }

    case "MolecularSequence": {
      return narrativeMolecularSequence(resource, options);
    }

    case "NamingSystem": {
      return narrativeNamingSystem(resource, options);
    }

    case "NutritionIntake": {
      return narrativeNutritionIntake(resource, options);
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

    case "Permission": {
      return narrativePermission(resource, options);
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

    case "RequestOrchestration": {
      return narrativeRequestOrchestration(resource, options);
    }

    case "Requirements": {
      return narrativeRequirements(resource, options);
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

    case "SubstanceNucleicAcid": {
      return narrativeSubstanceNucleicAcid(resource, options);
    }

    case "SubstancePolymer": {
      return narrativeSubstancePolymer(resource, options);
    }

    case "SubstanceProtein": {
      return narrativeSubstanceProtein(resource, options);
    }

    case "SubstanceReferenceInformation": {
      return narrativeSubstanceReferenceInformation(resource, options);
    }

    case "SubstanceSourceMaterial": {
      return narrativeSubstanceSourceMaterial(resource, options);
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

    case "TestPlan": {
      return narrativeTestPlan(resource, options);
    }

    case "TestReport": {
      return narrativeTestReport(resource, options);
    }

    case "TestScript": {
      return narrativeTestScript(resource, options);
    }

    case "Transport": {
      return narrativeTransport(resource, options);
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
      ["CodeableConcept", "billingStatus"],

      ["BackboneElement", "coverage"],

      ["markdown", "description"],

      ["BackboneElement", "diagnosis"],

      ["Identifier", "identifier"],

      ["string", "name"],

      ["Reference", "owner"],

      ["BackboneElement", "procedure"],

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
      ["boolean", "asNeededBoolean"],

      ["CodeableConcept", "asNeededCodeableConcept"],

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

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
    ],
    options
  );
}

function narrativeActorDefinition(
  resource: ActorDefinition,
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

      ["code", "type"],

      ["uri", "url"],

      ["UsageContext", "useContext"],

      ["string", "version"],

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["BackboneElement", "property"],

      ["BackboneElement", "routeOfAdministration"],

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

      ["CodeableConcept", "code"],

      ["BackboneElement", "contributingFactor"],

      ["dateTime", "detected"],

      ["Reference", "encounter"],

      ["Identifier", "identifier"],

      ["Reference", "location"],

      ["BackboneElement", "mitigatingAction"],

      ["Annotation", "note"],

      ["dateTime", "occurrenceDateTime"],

      ["Period", "occurrencePeriod"],

      ["Timing", "occurrenceTiming"],

      ["CodeableConcept", "outcome"],

      ["BackboneElement", "participant"],

      ["BackboneElement", "preventiveAction"],

      ["dateTime", "recordedDate"],

      ["Reference", "recorder"],

      ["Reference", "resultingEffect"],

      ["CodeableConcept", "seriousness"],

      ["code", "status"],

      ["Reference", "study"],

      ["Reference", "subject"],

      ["BackboneElement", "supportingInfo"],

      ["BackboneElement", "suspectEntity"],
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
      ["code", "category"],

      ["CodeableConcept", "clinicalStatus"],

      ["CodeableConcept", "code"],

      ["code", "criticality"],

      ["Identifier", "identifier"],

      ["BackboneElement", "participant"],

      ["Reference", "patient"],

      ["CodeableConcept", "type"],

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

      ["CodeableConcept", "cancellationReason"],

      ["CodeableConcept", "class"],

      ["instant", "end"],

      ["Identifier", "identifier"],

      ["CodeableReference", "reason"],

      ["CodeableConcept", "serviceCategory"],

      ["CodeableReference", "serviceType"],

      ["CodeableConcept", "specialty"],

      ["instant", "start"],

      ["code", "status"],

      ["Reference", "subject"],
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

      ["boolean", "proposedNewTime"],
    ],
    options
  );
}

function narrativeArtifactAssessment(
  resource: ArtifactAssessment,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "artifactReference"],

      ["canonical", "artifactCanonical"],

      ["uri", "artifactUri"],

      ["dateTime", "date"],

      ["code", "disposition"],

      ["Identifier", "identifier"],

      ["date", "lastReviewDate"],

      ["string", "title"],

      ["code", "workflowStatus"],
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

      ["BackboneElement", "agent"],

      ["CodeableConcept", "authorization"],

      ["CodeableConcept", "category"],

      ["CodeableConcept", "code"],

      ["BackboneElement", "entity"],

      ["BackboneElement", "outcome"],

      ["instant", "recorded"],

      ["code", "severity"],

      ["BackboneElement", "source"],
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

      ["dateTime", "created"],

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
  return buildNarrative(
    resource,
    [
      ["Identifier", "biologicalSourceEvent"],

      ["Identifier", "identifier"],
    ],
    options
  );
}

function narrativeBiologicallyDerivedProductDispense(
  resource: BiologicallyDerivedProductDispense,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "basedOn"],

      ["Reference", "destination"],

      ["Identifier", "identifier"],

      ["Reference", "location"],

      ["CodeableConcept", "matchStatus"],

      ["Annotation", "note"],

      ["CodeableConcept", "originRelationshipType"],

      ["Reference", "partOf"],

      ["Reference", "patient"],

      ["BackboneElement", "performer"],

      ["dateTime", "preparedDate"],

      ["Reference", "product"],

      ["Quantity", "quantity"],

      ["code", "status"],

      ["string", "usageInstruction"],

      ["dateTime", "whenHandedOver"],
    ],
    options
  );
}

function narrativeBodyStructure(
  resource: BodyStructure,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "active"],

      ["markdown", "description"],

      ["Identifier", "identifier"],

      ["CodeableConcept", "morphology"],

      ["Reference", "patient"],
    ],
    options
  );
}

function narrativeCanonicalResource(
  resource: CanonicalResource,
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

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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
      ["code", "acceptLanguage"],

      ["ContactDetail", "contact"],

      ["dateTime", "date"],

      ["BackboneElement", "document"],

      ["boolean", "experimental"],

      ["code", "fhirVersion"],

      ["code", "format"],

      ["Identifier", "identifier"],

      ["BackboneElement", "implementation"],

      ["canonical", "implementationGuide"],

      ["canonical", "imports"],

      ["canonical", "instantiates"],

      ["CodeableConcept", "jurisdiction"],

      ["code", "kind"],

      ["BackboneElement", "messaging"],

      ["string", "name"],

      ["code", "patchFormat"],

      ["string", "publisher"],

      ["BackboneElement", "rest"],

      ["BackboneElement", "software"],

      ["code", "status"],

      ["string", "title"],

      ["uri", "url"],

      ["UsageContext", "useContext"],

      ["string", "version"],

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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
      ["CodeableReference", "addresses"],

      ["Reference", "basedOn"],

      ["CodeableConcept", "category"],

      ["dateTime", "created"],

      ["Reference", "custodian"],

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

      ["Reference", "encounter"],

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

      ["boolean", "experimental"],

      ["Identifier", "identifier"],

      ["CodeableConcept", "jurisdiction"],

      ["string", "name"],

      ["canonical", "partOf"],

      ["string", "publisher"],

      ["canonical", "replaces"],

      ["code", "status"],

      ["string", "title"],

      ["uri", "url"],

      ["UsageContext", "useContext"],

      ["string", "version"],

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["BackboneElement", "insurance"],

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

      ["CodeableConcept", "decision"],

      ["Reference", "insurer"],

      ["code", "outcome"],

      ["Reference", "patient"],

      ["Reference", "request"],

      ["code", "status"],

      ["BackboneElement", "total"],

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
      ["dateTime", "date"],

      ["string", "description"],

      ["dateTime", "effectiveDateTime"],

      ["Period", "effectivePeriod"],

      ["Reference", "encounter"],

      ["Identifier", "identifier"],

      ["Reference", "performer"],

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

      ["BackboneElement", "contraindication"],

      ["Identifier", "identifier"],

      ["BackboneElement", "indication"],

      ["BackboneElement", "interaction"],

      ["canonical", "library"],

      ["Reference", "population"],

      ["CodeableConcept", "status"],

      ["Reference", "subject"],

      ["code", "type"],

      ["BackboneElement", "undesirableEffect"],

      ["BackboneElement", "warning"],
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

      ["Period", "effectivePeriod"],

      ["boolean", "experimental"],

      ["BackboneElement", "filter"],

      ["code", "hierarchyMeaning"],

      ["Identifier", "identifier"],

      ["CodeableConcept", "jurisdiction"],

      ["string", "name"],

      ["BackboneElement", "property"],

      ["string", "publisher"],

      ["code", "status"],

      ["canonical", "supplements"],

      ["string", "title"],

      ["uri", "url"],

      ["UsageContext", "useContext"],

      ["canonical", "valueSet"],

      ["string", "version"],

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],

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

      ["CodeableReference", "reason"],

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

      ["Reference", "informationProvider"],

      ["code", "intent"],

      ["dateTime", "occurrenceDateTime"],

      ["Period", "occurrencePeriod"],

      ["code", "priority"],

      ["CodeableReference", "reason"],

      ["Reference", "replaces"],

      ["Reference", "requester"],

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

      ["BackboneElement", "resource"],

      ["boolean", "search"],

      ["code", "status"],

      ["string", "title"],

      ["uri", "url"],

      ["UsageContext", "useContext"],

      ["string", "version"],

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["Reference", "custodian"],

      ["dateTime", "date"],

      ["Reference", "encounter"],

      ["BackboneElement", "event"],

      ["Identifier", "identifier"],

      ["string", "name"],

      ["code", "status"],

      ["Reference", "subject"],

      ["string", "title"],

      ["CodeableConcept", "type"],

      ["uri", "url"],

      ["UsageContext", "useContext"],

      ["string", "version"],
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
      ["BackboneElement", "additionalAttribute"],

      ["ContactDetail", "contact"],

      ["dateTime", "date"],

      ["Period", "effectivePeriod"],

      ["boolean", "experimental"],

      ["Identifier", "identifier"],

      ["CodeableConcept", "jurisdiction"],

      ["string", "name"],

      ["BackboneElement", "property"],

      ["string", "publisher"],

      ["uri", "sourceScopeUri"],

      ["canonical", "sourceScopeCanonical"],

      ["code", "status"],

      ["uri", "targetScopeUri"],

      ["canonical", "targetScopeCanonical"],

      ["string", "title"],

      ["uri", "url"],

      ["UsageContext", "useContext"],

      ["string", "version"],

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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
      ["CodeableConcept", "bodySite"],

      ["CodeableConcept", "clinicalStatus"],

      ["CodeableConcept", "code"],

      ["Reference", "encounter"],

      ["CodeableReference", "evidence"],

      ["Identifier", "identifier"],

      ["dateTime", "onsetDateTime"],

      ["Age", "onsetAge"],

      ["Period", "onsetPeriod"],

      ["Range", "onsetRange"],

      ["string", "onsetString"],

      ["BackboneElement", "participant"],

      ["dateTime", "recordedDate"],

      ["Reference", "subject"],

      ["CodeableConcept", "verificationStatus"],
    ],
    options
  );
}

function narrativeConditionDefinition(
  resource: ConditionDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "bodySite"],

      ["CodeableConcept", "code"],

      ["ContactDetail", "contact"],

      ["dateTime", "date"],

      ["boolean", "experimental"],

      ["Identifier", "identifier"],

      ["CodeableConcept", "jurisdiction"],

      ["string", "name"],

      ["string", "publisher"],

      ["CodeableConcept", "severity"],

      ["CodeableConcept", "stage"],

      ["code", "status"],

      ["string", "title"],

      ["uri", "url"],

      ["UsageContext", "useContext"],

      ["string", "version"],

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["date", "date"],

      ["code", "decision"],

      ["Reference", "grantee"],

      ["Reference", "grantor"],

      ["Identifier", "identifier"],

      ["Period", "period"],

      ["BackboneElement", "provision"],

      ["code", "status"],

      ["Reference", "subject"],

      ["BackboneElement", "verification"],
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

      ["Reference", "insurer"],

      ["code", "kind"],

      ["string", "network"],

      ["positiveInt", "order"],

      ["Period", "period"],

      ["Reference", "policyHolder"],

      ["code", "status"],

      ["Reference", "subscriber"],

      ["Identifier", "subscriberId"],

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

      ["Reference", "encounter"],

      ["dateTime", "identifiedDateTime"],

      ["Period", "identifiedPeriod"],

      ["Identifier", "identifier"],

      ["Reference", "implicated"],

      ["code", "severity"],

      ["code", "status"],

      ["Reference", "subject"],
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

      ["BackboneElement", "udiCarrier"],
    ],
    options
  );
}

function narrativeDeviceAssociation(
  resource: DeviceAssociation,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "bodyStructure"],

      ["CodeableConcept", "category"],

      ["Reference", "device"],

      ["Identifier", "identifier"],

      ["BackboneElement", "operation"],

      ["Period", "period"],

      ["CodeableConcept", "status"],

      ["CodeableConcept", "statusReason"],

      ["Reference", "subject"],
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
      ["BackboneElement", "classification"],

      ["BackboneElement", "conformsTo"],

      ["BackboneElement", "deviceName"],

      ["BackboneElement", "hasPart"],

      ["Identifier", "identifier"],

      ["Reference", "manufacturer"],

      ["string", "modelNumber"],

      ["CodeableConcept", "safety"],
    ],
    options
  );
}

function narrativeDeviceDispense(
  resource: DeviceDispense,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableReference", "device"],

      ["Identifier", "identifier"],

      ["dateTime", "preparedDate"],

      ["code", "status"],

      ["Reference", "subject"],
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

      ["Reference", "device"],

      ["Identifier", "identifier"],

      ["code", "operationalStatus"],

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

      ["CodeableReference", "code"],

      ["boolean", "doNotPerform"],

      ["Reference", "encounter"],

      ["Identifier", "groupIdentifier"],

      ["Identifier", "identifier"],

      ["canonical", "instantiatesCanonical"],

      ["uri", "instantiatesUri"],

      ["code", "intent"],

      ["dateTime", "occurrenceDateTime"],

      ["Period", "occurrencePeriod"],

      ["Timing", "occurrenceTiming"],

      ["CodeableReference", "performer"],

      ["code", "priority"],

      ["CodeableReference", "reason"],

      ["Reference", "replaces"],

      ["Reference", "requester"],

      ["code", "status"],

      ["Reference", "subject"],
    ],
    options
  );
}

function narrativeDeviceUsage(
  resource: DeviceUsage,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "basedOn"],

      ["CodeableReference", "bodySite"],

      ["Reference", "context"],

      ["dateTime", "dateAsserted"],

      ["Reference", "derivedFrom"],

      ["CodeableReference", "device"],

      ["Identifier", "identifier"],

      ["Reference", "informationSource"],

      ["Reference", "patient"],

      ["CodeableReference", "reason"],

      ["code", "status"],

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

      ["BackboneElement", "media"],

      ["Reference", "performer"],

      ["Reference", "resultsInterpreter"],

      ["code", "status"],

      ["Reference", "subject"],
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

      ["CodeableReference", "bodySite"],

      ["CodeableConcept", "category"],

      ["BackboneElement", "content"],

      ["instant", "date"],

      ["markdown", "description"],

      ["code", "docStatus"],

      ["Identifier", "identifier"],

      ["CodeableConcept", "modality"],

      ["Period", "period"],

      ["BackboneElement", "relatesTo"],

      ["CodeableConcept", "securityLabel"],

      ["code", "status"],

      ["Reference", "subject"],

      ["CodeableConcept", "type"],

      ["string", "version"],
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

      ["CodeableConcept", "class"],

      ["BackboneElement", "diagnosis"],

      ["Reference", "episodeOfCare"],

      ["Identifier", "identifier"],

      ["BackboneElement", "participant"],

      ["BackboneElement", "reason"],

      ["CodeableReference", "serviceType"],

      ["code", "status"],

      ["Reference", "subject"],

      ["CodeableConcept", "type"],
    ],
    options
  );
}

function narrativeEncounterHistory(
  resource: EncounterHistory,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "class"],

      ["Identifier", "identifier"],

      ["CodeableReference", "serviceType"],

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

      ["CodeableConcept", "connectionType"],

      ["string", "description"],

      ["CodeableConcept", "environmentType"],

      ["Identifier", "identifier"],

      ["Reference", "managingOrganization"],

      ["string", "name"],

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
      ["BackboneElement", "diagnosis"],

      ["Reference", "managingOrganization"],

      ["Reference", "patient"],

      ["Period", "period"],

      ["BackboneElement", "reason"],

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

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["BackboneElement", "subject"],

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
      ["BackboneElement", "characteristic"],

      ["ContactDetail", "contact"],

      ["dateTime", "date"],

      ["markdown", "description"],

      ["Identifier", "identifier"],

      ["string", "name"],

      ["string", "publisher"],

      ["string", "shortTitle"],

      ["code", "status"],

      ["string", "title"],

      ["uri", "url"],

      ["UsageContext", "useContext"],

      ["string", "version"],

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["markdown", "description"],

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

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["CodeableConcept", "decision"],

      ["BackboneElement", "insurance"],

      ["Reference", "insurer"],

      ["code", "outcome"],

      ["Reference", "patient"],

      ["Reference", "provider"],

      ["code", "status"],

      ["BackboneElement", "total"],

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

      ["BackboneElement", "participant"],

      ["Reference", "patient"],

      ["CodeableReference", "reason"],

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

function narrativeFormularyItem(
  resource: FormularyItem,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "code"],

      ["Identifier", "identifier"],

      ["code", "status"],
    ],
    options
  );
}

function narrativeGenomicStudy(
  resource: GenomicStudy,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "encounter"],

      ["Identifier", "identifier"],

      ["code", "status"],

      ["Reference", "subject"],

      ["CodeableConcept", "type"],
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

      ["code", "lifecycleStatus"],

      ["CodeableConcept", "priority"],

      ["Reference", "source"],

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

      ["Identifier", "identifier"],

      ["CodeableConcept", "jurisdiction"],

      ["string", "name"],

      ["string", "publisher"],

      ["code", "status"],

      ["string", "title"],

      ["uri", "url"],

      ["UsageContext", "useContext"],

      ["string", "version"],

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["BackboneElement", "characteristic"],

      ["CodeableConcept", "code"],

      ["Identifier", "identifier"],

      ["Reference", "managingEntity"],

      ["code", "membership"],

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

      ["markdown", "comment"],

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

function narrativeImagingSelection(
  resource: ImagingSelection,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "basedOn"],

      ["CodeableReference", "bodySite"],

      ["CodeableConcept", "category"],

      ["CodeableConcept", "code"],

      ["Reference", "derivedFrom"],

      ["Reference", "endpoint"],

      ["Reference", "focus"],

      ["id", "frameOfReferenceUid"],

      ["Identifier", "identifier"],

      ["BackboneElement", "instance"],

      ["instant", "issued"],

      ["BackboneElement", "performer"],

      ["unsignedInt", "seriesNumber"],

      ["id", "seriesUid"],

      ["code", "status"],

      ["id", "studyUid"],

      ["Reference", "subject"],
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

      ["Reference", "location"],

      ["CodeableConcept", "modality"],

      ["Annotation", "note"],

      ["unsignedInt", "numberOfInstances"],

      ["unsignedInt", "numberOfSeries"],

      ["Reference", "partOf"],

      ["CodeableReference", "procedure"],

      ["CodeableReference", "reason"],

      ["Reference", "referrer"],

      ["BackboneElement", "series"],

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
      ["Reference", "basedOn"],

      ["boolean", "isSubpotent"],

      ["Annotation", "note"],

      ["dateTime", "occurrenceDateTime"],

      ["string", "occurrenceString"],

      ["Reference", "patient"],

      ["BackboneElement", "performer"],

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

      ["BackboneElement", "recommendation"],
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

      ["BackboneElement", "dependsOn"],

      ["boolean", "experimental"],

      ["code", "fhirVersion"],

      ["BackboneElement", "global"],

      ["Identifier", "identifier"],

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

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["CodeableConcept", "group"],

      ["Identifier", "identifier"],

      ["BackboneElement", "manufacturer"],

      ["CodeableConcept", "role"],

      ["code", "status"],

      ["BackboneElement", "substance"],
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

function narrativeInventoryItem(
  resource: InventoryItem,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "baseUnit"],

      ["CodeableConcept", "category"],

      ["CodeableConcept", "code"],

      ["Identifier", "identifier"],

      ["CodeableConcept", "inventoryStatus"],

      ["BackboneElement", "name"],

      ["Quantity", "netContent"],

      ["code", "status"],
    ],
    options
  );
}

function narrativeInventoryReport(
  resource: InventoryReport,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["code", "countType"],

      ["Identifier", "identifier"],

      ["BackboneElement", "inventoryListing"],

      ["CodeableConcept", "operationType"],

      ["CodeableConcept", "operationTypeReason"],

      ["dateTime", "reportedDateTime"],

      ["code", "status"],
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
      ["dateTime", "creation"],

      ["Identifier", "identifier"],

      ["date", "periodDate"],

      ["Period", "periodPeriod"],

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

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["BackboneElement", "item"],
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
      ["markdown", "description"],

      ["CodeableConcept", "form"],

      ["Identifier", "identifier"],

      ["Reference", "managingOrganization"],

      ["code", "mode"],

      ["string", "name"],

      ["Coding", "operationalStatus"],

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
      ["BackboneElement", "component"],

      ["Identifier", "identifier"],

      ["CodeableConcept", "ingredient"],

      ["CodeableConcept", "manufacturedDoseForm"],

      ["Reference", "manufacturer"],

      ["MarketingStatus", "marketingStatus"],

      ["string", "name"],

      ["BackboneElement", "property"],

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
      ["code", "basis"],

      ["markdown", "clinicalRecommendationStatement"],

      ["CodeableConcept", "compositeScoring"],

      ["ContactDetail", "contact"],

      ["dateTime", "date"],

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

      ["markdown", "rateAggregation"],

      ["markdown", "rationale"],

      ["markdown", "riskAdjustment"],

      ["CodeableConcept", "scoring"],

      ["CodeableConcept", "scoringUnit"],

      ["code", "status"],

      ["string", "title"],

      ["CodeableConcept", "type"],

      ["uri", "url"],

      ["UsageContext", "useContext"],

      ["string", "version"],

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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
      ["code", "dataUpdateType"],

      ["dateTime", "date"],

      ["Identifier", "identifier"],

      ["CodeableConcept", "improvementNotation"],

      ["canonical", "measure"],

      ["Period", "period"],

      ["Reference", "reporter"],

      ["CodeableConcept", "scoring"],

      ["code", "status"],

      ["Reference", "subject"],

      ["code", "type"],
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
      ["CodeableConcept", "code"],

      ["Identifier", "identifier"],

      ["Reference", "marketingAuthorizationHolder"],

      ["code", "status"],

      ["Quantity", "totalVolume"],
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
      ["CodeableReference", "medication"],

      ["dateTime", "occurenceDateTime"],

      ["Period", "occurencePeriod"],

      ["Timing", "occurenceTiming"],

      ["Reference", "partOf"],

      ["BackboneElement", "performer"],

      ["dateTime", "recorded"],

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
      ["CodeableReference", "medication"],

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
      ["CodeableConcept", "code"],

      ["Identifier", "identifier"],

      ["BackboneElement", "monitoringProgram"],

      ["string", "name"],

      ["code", "status"],
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

      ["code", "intent"],

      ["CodeableReference", "medication"],

      ["CodeableConcept", "performerType"],

      ["code", "priority"],

      ["boolean", "reported"],

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
      ["BackboneElement", "adherence"],

      ["CodeableConcept", "category"],

      ["dateTime", "dateAsserted"],

      ["dateTime", "effectiveDateTime"],

      ["Period", "effectivePeriod"],

      ["Timing", "effectiveTiming"],

      ["Reference", "encounter"],

      ["Identifier", "identifier"],

      ["CodeableReference", "medication"],

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

      ["BackboneElement", "characteristic"],

      ["CodeableConcept", "classification"],

      ["Reference", "clinicalTrial"],

      ["Coding", "code"],

      ["CodeableConcept", "combinedPharmaceuticalDoseForm"],

      ["Reference", "comprisedOf"],

      ["BackboneElement", "contact"],

      ["BackboneElement", "crossReference"],

      ["markdown", "description"],

      ["CodeableConcept", "domain"],

      ["Identifier", "identifier"],

      ["CodeableReference", "impurity"],

      ["markdown", "indication"],

      ["CodeableConcept", "ingredient"],

      ["CodeableConcept", "legalStatusOfSupply"],

      ["MarketingStatus", "marketingStatus"],

      ["Reference", "masterFile"],

      ["BackboneElement", "name"],

      ["BackboneElement", "operation"],

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

      ["BackboneElement", "focus"],

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

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["BackboneElement", "destination"],

      ["Coding", "eventCoding"],

      ["canonical", "eventCanonical"],

      ["Reference", "focus"],

      ["CodeableConcept", "reason"],

      ["BackboneElement", "response"],

      ["Reference", "responsible"],

      ["Reference", "sender"],

      ["BackboneElement", "source"],
    ],
    options
  );
}

function narrativeMetadataResource(
  resource: MetadataResource,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(resource, [["Period", "effectivePeriod"]], options);
}

function narrativeMolecularSequence(
  resource: MolecularSequence,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "device"],

      ["Reference", "focus"],

      ["Attachment", "formatted"],

      ["Identifier", "identifier"],

      ["string", "literal"],

      ["Reference", "performer"],

      ["BackboneElement", "relative"],

      ["Reference", "specimen"],

      ["Reference", "subject"],

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

      ["Period", "effectivePeriod"],

      ["boolean", "experimental"],

      ["Identifier", "identifier"],

      ["CodeableConcept", "jurisdiction"],

      ["code", "kind"],

      ["string", "name"],

      ["string", "publisher"],

      ["code", "status"],

      ["string", "title"],

      ["BackboneElement", "uniqueId"],

      ["uri", "url"],

      ["UsageContext", "useContext"],

      ["string", "version"],

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
    ],
    options
  );
}

function narrativeNutritionIntake(
  resource: NutritionIntake,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "basedOn"],

      ["CodeableConcept", "code"],

      ["Reference", "encounter"],

      ["Identifier", "identifier"],

      ["dateTime", "occurrenceDateTime"],

      ["Period", "occurrencePeriod"],

      ["Reference", "partOf"],

      ["dateTime", "recorded"],

      ["code", "status"],

      ["Reference", "subject"],
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

      ["Identifier", "groupIdentifier"],

      ["canonical", "instantiatesCanonical"],

      ["uri", "instantiatesUri"],

      ["code", "intent"],

      ["Reference", "orderer"],

      ["code", "status"],

      ["Reference", "subject"],
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

      ["BackboneElement", "nutrient"],

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

      ["BackboneElement", "component"],

      ["Reference", "derivedFrom"],

      ["dateTime", "effectiveDateTime"],

      ["Period", "effectivePeriod"],

      ["Timing", "effectiveTiming"],

      ["instant", "effectiveInstant"],

      ["Reference", "encounter"],

      ["Reference", "focus"],

      ["Reference", "hasMember"],

      ["Identifier", "identifier"],

      ["canonical", "instantiatesCanonical"],

      ["Reference", "instantiatesReference"],

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

      ["Attachment", "valueAttachment"],

      ["Reference", "valueReference"],
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

      ["ContactDetail", "contact"],

      ["dateTime", "date"],

      ["canonical", "derivedFromCanonical"],

      ["uri", "derivedFromUri"],

      ["Period", "effectivePeriod"],

      ["boolean", "experimental"],

      ["Identifier", "identifier"],

      ["CodeableConcept", "jurisdiction"],

      ["string", "name"],

      ["CodeableConcept", "performerType"],

      ["string", "publisher"],

      ["code", "status"],

      ["CodeableConcept", "subject"],

      ["string", "title"],

      ["uri", "url"],

      ["UsageContext", "useContext"],

      ["string", "version"],

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["Identifier", "identifier"],

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

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
    ],
    options
  );
}

function narrativeOperationOutcome(
  resource: OperationOutcome,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(resource, [["BackboneElement", "issue"]], options);
}

function narrativeOrganization(
  resource: Organization,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "active"],

      ["markdown", "description"],

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
      ["Reference", "attachedDocument"],

      ["Quantity", "containedItemQuantity"],

      ["boolean", "copackagedIndicator"],

      ["markdown", "description"],

      ["Identifier", "identifier"],

      ["BackboneElement", "legalStatusOfSupply"],

      ["Reference", "manufacturer"],

      ["MarketingStatus", "marketingStatus"],

      ["string", "name"],

      ["Reference", "packageFor"],

      ["BackboneElement", "packaging"],

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

      ["BackboneElement", "link"],

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
      ["Money", "amount"],

      ["dateTime", "created"],

      ["date", "date"],

      ["Reference", "paymentIssuer"],

      ["Period", "period"],

      ["code", "status"],

      ["CodeableConcept", "type"],
    ],
    options
  );
}

function narrativePermission(
  resource: Permission,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "asserter"],

      ["code", "combining"],

      ["dateTime", "date"],

      ["BackboneElement", "justification"],

      ["BackboneElement", "rule"],

      ["code", "status"],

      ["Period", "validity"],
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

function narrativePlanDefinition(
  resource: PlanDefinition,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["boolean", "asNeededBoolean"],

      ["CodeableConcept", "asNeededCodeableConcept"],

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

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["boolean", "deceasedBoolean"],

      ["dateTime", "deceasedDateTime"],

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
      ["Reference", "basedOn"],

      ["CodeableConcept", "bodySite"],

      ["CodeableConcept", "category"],

      ["CodeableConcept", "code"],

      ["Reference", "encounter"],

      ["Reference", "focus"],

      ["Identifier", "identifier"],

      ["canonical", "instantiatesCanonical"],

      ["uri", "instantiatesUri"],

      ["Reference", "location"],

      ["dateTime", "occurrenceDateTime"],

      ["Period", "occurrencePeriod"],

      ["string", "occurrenceString"],

      ["Age", "occurrenceAge"],

      ["Range", "occurrenceRange"],

      ["Timing", "occurrenceTiming"],

      ["CodeableConcept", "outcome"],

      ["Reference", "partOf"],

      ["BackboneElement", "performer"],

      ["CodeableReference", "reason"],

      ["dateTime", "recorded"],

      ["Reference", "recorder"],

      ["boolean", "reportedBoolean"],

      ["Reference", "reportedReference"],

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
      ["BackboneElement", "agent"],

      ["BackboneElement", "entity"],

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

      ["canonical", "derivedFrom"],

      ["markdown", "description"],

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

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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
      ["Reference", "attachedDocument"],

      ["CodeableConcept", "basis"],

      ["BackboneElement", "case"],

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

function narrativeRequestOrchestration(
  resource: RequestOrchestration,
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

function narrativeRequirements(
  resource: Requirements,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["ContactDetail", "contact"],

      ["dateTime", "date"],

      ["canonical", "derivedFrom"],

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

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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
      ["CodeableConcept", "condition"],

      ["Identifier", "identifier"],

      ["CodeableConcept", "keyword"],

      ["Reference", "partOf"],

      ["Period", "period"],

      ["CodeableConcept", "phase"],

      ["CodeableConcept", "primaryPurposeType"],

      ["Reference", "protocol"],

      ["BackboneElement", "recruitment"],

      ["CodeableConcept", "region"],

      ["Reference", "result"],

      ["Reference", "site"],

      ["code", "status"],

      ["CodeableConcept", "studyDesign"],

      ["string", "title"],

      ["CodeableConcept", "whyStopped"],
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

      ["Period", "period"],

      ["code", "status"],

      ["Reference", "study"],

      ["Reference", "subject"],
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

      ["string", "name"],

      ["Period", "planningHorizon"],

      ["CodeableConcept", "serviceCategory"],

      ["CodeableReference", "serviceType"],

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

      ["Identifier", "identifier"],

      ["CodeableConcept", "jurisdiction"],

      ["string", "name"],

      ["string", "publisher"],

      ["code", "status"],

      ["string", "title"],

      ["code", "type"],

      ["uri", "url"],

      ["UsageContext", "useContext"],

      ["string", "version"],

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["Reference", "bodyStructure"],

      ["CodeableConcept", "category"],

      ["CodeableReference", "code"],

      ["boolean", "doNotPerform"],

      ["Reference", "encounter"],

      ["Reference", "focus"],

      ["Identifier", "identifier"],

      ["canonical", "instantiatesCanonical"],

      ["uri", "instantiatesUri"],

      ["code", "intent"],

      ["CodeableReference", "location"],

      ["dateTime", "occurrenceDateTime"],

      ["Period", "occurrencePeriod"],

      ["Timing", "occurrenceTiming"],

      ["BackboneElement", "orderDetail"],

      ["Reference", "performer"],

      ["CodeableConcept", "performerType"],

      ["code", "priority"],

      ["Quantity", "quantityQuantity"],

      ["Ratio", "quantityRatio"],

      ["Range", "quantityRange"],

      ["CodeableReference", "reason"],

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

      ["CodeableReference", "serviceType"],

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

      ["code", "combined"],

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

      ["ContactDetail", "contact"],

      ["dateTime", "date"],

      ["canonical", "derivedFromCanonical"],

      ["uri", "derivedFromUri"],

      ["Period", "effectivePeriod"],

      ["boolean", "experimental"],

      ["Identifier", "identifier"],

      ["CodeableConcept", "jurisdiction"],

      ["string", "name"],

      ["CodeableConcept", "patientPreparation"],

      ["string", "publisher"],

      ["code", "status"],

      ["CodeableConcept", "subjectCodeableConcept"],

      ["Reference", "subjectReference"],

      ["string", "timeAspect"],

      ["string", "title"],

      ["CodeableConcept", "typeCollected"],

      ["uri", "url"],

      ["string", "version"],

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["BackboneElement", "context"],

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

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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
      ["BackboneElement", "const"],

      ["ContactDetail", "contact"],

      ["dateTime", "date"],

      ["boolean", "experimental"],

      ["BackboneElement", "group"],

      ["Identifier", "identifier"],

      ["canonical", "import"],

      ["CodeableConcept", "jurisdiction"],

      ["string", "name"],

      ["string", "publisher"],

      ["code", "status"],

      ["BackboneElement", "structure"],

      ["string", "title"],

      ["uri", "url"],

      ["UsageContext", "useContext"],

      ["string", "version"],

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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
      ["Coding", "channelType"],

      ["ContactPoint", "contact"],

      ["code", "content"],

      ["code", "contentType"],

      ["instant", "end"],

      ["url", "endpoint"],

      ["BackboneElement", "filterBy"],

      ["unsignedInt", "heartbeatPeriod"],

      ["Identifier", "identifier"],

      ["Reference", "managingEntity"],

      ["positiveInt", "maxCount"],

      ["string", "name"],

      ["string", "reason"],

      ["code", "status"],

      ["unsignedInt", "timeout"],

      ["canonical", "topic"],
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

      ["integer64", "eventsSinceSubscriptionStart"],

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
      ["BackboneElement", "canFilterBy"],

      ["ContactDetail", "contact"],

      ["dateTime", "date"],

      ["canonical", "derivedFrom"],

      ["Period", "effectivePeriod"],

      ["BackboneElement", "eventTrigger"],

      ["boolean", "experimental"],

      ["Identifier", "identifier"],

      ["CodeableConcept", "jurisdiction"],

      ["string", "name"],

      ["BackboneElement", "notificationShape"],

      ["string", "publisher"],

      ["BackboneElement", "resourceTrigger"],

      ["code", "status"],

      ["string", "title"],

      ["uri", "url"],

      ["UsageContext", "useContext"],

      ["string", "version"],

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["CodeableReference", "code"],

      ["markdown", "description"],

      ["dateTime", "expiry"],

      ["Identifier", "identifier"],

      ["BackboneElement", "ingredient"],

      ["boolean", "instance"],

      ["Quantity", "quantity"],

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
      ["BackboneElement", "characterization"],

      ["CodeableConcept", "classification"],

      ["BackboneElement", "code"],

      ["markdown", "description"],

      ["CodeableConcept", "domain"],

      ["CodeableConcept", "grade"],

      ["Identifier", "identifier"],

      ["Reference", "informationSource"],

      ["Reference", "manufacturer"],

      ["BackboneElement", "moiety"],

      ["BackboneElement", "molecularWeight"],

      ["BackboneElement", "name"],

      ["Annotation", "note"],

      ["Reference", "nucleicAcid"],

      ["Reference", "polymer"],

      ["BackboneElement", "property"],

      ["Reference", "protein"],

      ["Reference", "referenceInformation"],

      ["BackboneElement", "relationship"],

      ["BackboneElement", "sourceMaterial"],

      ["CodeableConcept", "status"],

      ["BackboneElement", "structure"],

      ["Reference", "supplier"],

      ["string", "version"],
    ],
    options
  );
}

function narrativeSubstanceNucleicAcid(
  resource: SubstanceNucleicAcid,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["string", "areaOfHybridisation"],

      ["integer", "numberOfSubunits"],

      ["CodeableConcept", "oligoNucleotideType"],

      ["CodeableConcept", "sequenceType"],

      ["BackboneElement", "subunit"],
    ],
    options
  );
}

function narrativeSubstancePolymer(
  resource: SubstancePolymer,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "class"],

      ["CodeableConcept", "copolymerConnectivity"],

      ["CodeableConcept", "geometry"],

      ["Identifier", "identifier"],

      ["string", "modification"],

      ["BackboneElement", "monomerSet"],

      ["BackboneElement", "repeat"],
    ],
    options
  );
}

function narrativeSubstanceProtein(
  resource: SubstanceProtein,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["string", "disulfideLinkage"],

      ["integer", "numberOfSubunits"],

      ["CodeableConcept", "sequenceType"],

      ["BackboneElement", "subunit"],
    ],
    options
  );
}

function narrativeSubstanceReferenceInformation(
  resource: SubstanceReferenceInformation,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["string", "comment"],

      ["BackboneElement", "gene"],

      ["BackboneElement", "geneElement"],

      ["BackboneElement", "target"],
    ],
    options
  );
}

function narrativeSubstanceSourceMaterial(
  resource: SubstanceSourceMaterial,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["CodeableConcept", "countryOfOrigin"],

      ["CodeableConcept", "developmentStage"],

      ["BackboneElement", "fractionDescription"],

      ["string", "geographicalLocation"],

      ["BackboneElement", "organism"],

      ["Identifier", "organismId"],

      ["string", "organismName"],

      ["Identifier", "parentSubstanceId"],

      ["string", "parentSubstanceName"],

      ["BackboneElement", "partDescription"],

      ["CodeableConcept", "sourceMaterialClass"],

      ["CodeableConcept", "sourceMaterialState"],

      ["CodeableConcept", "sourceMaterialType"],
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

      ["Reference", "basedOn"],

      ["CodeableConcept", "category"],

      ["Identifier", "identifier"],

      ["CodeableReference", "item"],

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

      ["boolean", "doNotPerform"],

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

      ["BackboneElement", "performer"],

      ["Period", "requestedPeriod"],

      ["Reference", "requester"],

      ["code", "status"],

      ["CodeableReference", "statusReason"],
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

      ["Identifier", "identifier"],

      ["BackboneElement", "implementation"],

      ["CodeableConcept", "jurisdiction"],

      ["code", "kind"],

      ["boolean", "lockedDate"],

      ["string", "name"],

      ["string", "publisher"],

      ["BackboneElement", "software"],

      ["code", "status"],

      ["string", "title"],

      ["uri", "url"],

      ["UsageContext", "useContext"],

      ["string", "version"],

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
    ],
    options
  );
}

function narrativeTestPlan(
  resource: TestPlan,
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

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["canonical", "testScript"],
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

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
    ],
    options
  );
}

function narrativeTransport(
  resource: Transport,
  options?: NarrativeOptions | null | undefined
): Narrative {
  return buildNarrative(
    resource,
    [
      ["Reference", "basedOn"],

      ["CodeableConcept", "code"],

      ["dateTime", "completionTime"],

      ["Reference", "currentLocation"],

      ["string", "description"],

      ["Reference", "encounter"],

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

      ["Reference", "requestedLocation"],

      ["Reference", "requester"],

      ["code", "status"],

      ["CodeableConcept", "statusReason"],
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

      ["Period", "effectivePeriod"],

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

      ["string", "versionAlgorithmString"],

      ["Coding", "versionAlgorithmCoding"],
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

      ["BackboneElement", "lensSpecification"],

      ["Reference", "patient"],

      ["Reference", "prescriber"],

      ["code", "status"],
    ],
    options
  );
}

function buildNarrative<TResource extends FhirDomainResource>(
  resource: TResource,
  elements: Array<[string, keyof TResource]>,
  options?: NarrativeOptions | null | undefined
): Narrative {
  const formatter = options?.formatter ?? Formatter.default;
  return {
    status: "generated",
    div: `<div xmlns="http://www.w3.org/1999/xhtml"><dl>${(
      elements.map((element) => [
        element[1],
        safeFormat(formatter, element[0], resource[element[1]]),
      ]) as Array<[string, string]>
    )
      .filter((element) => !!element[1])
      .map((element) => `<dt>${element[0]}</dt><dd>${element[1]}</dd>`)
      .filter((x) => !!x)
      .join("")}</dl></div>`,
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
      return formatter.format(type, value as never);
    } catch {
      // Ignore
    }
  }

  return "";
}
