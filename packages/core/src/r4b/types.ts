/**
 * Account
 *
 * A financial tool for tracking value accrued for a particular purpose.  In the
 * healthcare field, used to track charges for a patient, cost centers, etc.
 *
 * @see {@link http://hl7.org/fhir/R4B/Account.html}
 */
export interface Account extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Account";
}

/**
 * ActivityDefinition
 *
 * This resource allows for the definition of some activity to be performed,
 * independent of a particular patient, practitioner, or other performance context.
 *
 * @see {@link http://hl7.org/fhir/R4B/ActivityDefinition.html}
 */
export interface ActivityDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ActivityDefinition";
}

/**
 * AdministrableProductDefinition
 *
 * A medicinal product in the final form which is suitable for administering to a
 * patient (after any mixing of multiple components, dissolution etc. has been
 * performed).
 *
 * @see {@link http://hl7.org/fhir/R4B/AdministrableProductDefinition.html}
 */
export interface AdministrableProductDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "AdministrableProductDefinition";
}

/**
 * AdverseEvent
 *
 * Actual or  potential/avoided event causing unintended physical injury resulting
 * from or contributed to by medical care, a research study or other healthcare
 * setting factors that requires additional monitoring, treatment, or
 * hospitalization, or that results in death.
 *
 * @see {@link http://hl7.org/fhir/R4B/AdverseEvent.html}
 */
export interface AdverseEvent extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "AdverseEvent";
}

/**
 * AllergyIntolerance
 *
 * Risk of harmful or undesirable, physiological response which is unique to an
 * individual and associated with exposure to a substance.
 *
 * @see {@link http://hl7.org/fhir/R4B/AllergyIntolerance.html}
 */
export interface AllergyIntolerance extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "AllergyIntolerance";
}

/**
 * Appointment
 *
 * A booking of a healthcare event among patient(s), practitioner(s), related
 * person(s) and/or device(s) for a specific date/time. This may result in one or
 * more Encounter(s).
 *
 * @see {@link http://hl7.org/fhir/R4B/Appointment.html}
 */
export interface Appointment extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Appointment";
}

/**
 * AppointmentResponse
 *
 * A reply to an appointment request for a patient and/or practitioner(s), such as
 * a confirmation or rejection.
 *
 * @see {@link http://hl7.org/fhir/R4B/AppointmentResponse.html}
 */
export interface AppointmentResponse extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "AppointmentResponse";
}

/**
 * AuditEvent
 *
 * A record of an event made for purposes of maintaining a security log. Typical
 * uses include detection of intrusion attempts and monitoring for inappropriate
 * usage.
 *
 * @see {@link http://hl7.org/fhir/R4B/AuditEvent.html}
 */
export interface AuditEvent extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "AuditEvent";
}

/**
 * Basic
 *
 * Basic is used for handling concepts not yet defined in FHIR, narrative-only
 * resources that don't map to an existing resource, and custom resources not
 * appropriate for inclusion in the FHIR specification.
 *
 * @see {@link http://hl7.org/fhir/R4B/Basic.html}
 */
export interface Basic extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Basic";
}

/**
 * Binary
 *
 * A resource that represents the data of a single raw artifact as digital content
 * accessible in its native format.  A Binary resource can contain any content,
 * whether text, image, pdf, zip archive, etc.
 *
 * @see {@link http://hl7.org/fhir/R4B/Binary.html}
 */
export interface Binary extends Resource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: string;
}

/**
 * BiologicallyDerivedProduct
 *
 * A material substance originating from a biological entity intended to be
 * transplanted or infused
 * into another (possibly the same) biological entity.
 *
 * @see {@link http://hl7.org/fhir/R4B/BiologicallyDerivedProduct.html}
 */
export interface BiologicallyDerivedProduct extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "BiologicallyDerivedProduct";
}

/**
 * BodyStructure
 *
 * Record details about an anatomical structure.  This resource may be used when a
 * coded concept does not provide the necessary detail needed for the use case.
 *
 * @see {@link http://hl7.org/fhir/R4B/BodyStructure.html}
 */
export interface BodyStructure extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "BodyStructure";
}

/**
 * Bundle
 *
 * A container for a collection of resources.
 *
 * @see {@link http://hl7.org/fhir/R4B/Bundle.html}
 */
export interface Bundle extends Resource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: string;
}

/**
 * CapabilityStatement
 *
 * A Capability Statement documents a set of capabilities (behaviors) of a FHIR
 * Server for a particular version of FHIR that may be used as a statement of
 * actual server functionality or a statement of required or desired server
 * implementation.
 *
 * @see {@link http://hl7.org/fhir/R4B/CapabilityStatement.html}
 */
export interface CapabilityStatement extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "CapabilityStatement";
}

/**
 * CarePlan
 *
 * Describes the intention of how one or more practitioners intend to deliver care
 * for a particular patient, group or community for a period of time, possibly
 * limited to care for a specific condition or set of conditions.
 *
 * @see {@link http://hl7.org/fhir/R4B/CarePlan.html}
 */
export interface CarePlan extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "CarePlan";
}

/**
 * CareTeam
 *
 * The Care Team includes all the people and organizations who plan to participate
 * in the coordination and delivery of care for a patient.
 *
 * @see {@link http://hl7.org/fhir/R4B/CareTeam.html}
 */
export interface CareTeam extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "CareTeam";
}

/**
 * CatalogEntry
 *
 * Catalog entries are wrappers that contextualize items included in a catalog.
 *
 * @see {@link http://hl7.org/fhir/R4B/CatalogEntry.html}
 */
export interface CatalogEntry extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "CatalogEntry";
}

/**
 * ChargeItem
 *
 * The resource ChargeItem describes the provision of healthcare provider products
 * for a certain patient, therefore referring not only to the product, but
 * containing in addition details of the provision, like date, time, amounts and
 * participating organizations and persons. Main Usage of the ChargeItem is to
 * enable the billing process and internal cost allocation.
 *
 * @see {@link http://hl7.org/fhir/R4B/ChargeItem.html}
 */
export interface ChargeItem extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ChargeItem";
}

/**
 * ChargeItemDefinition
 *
 * The ChargeItemDefinition resource provides the properties that apply to the
 * (billing) codes necessary to calculate costs and prices. The properties may
 * differ largely depending on type and realm, therefore this resource gives only a
 * rough structure and requires profiling for each type of billing code system.
 *
 * @see {@link http://hl7.org/fhir/R4B/ChargeItemDefinition.html}
 */
export interface ChargeItemDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ChargeItemDefinition";
}

/**
 * Citation
 *
 * The Citation Resource enables reference to any knowledge artifact for purposes
 * of identification and attribution. The Citation Resource supports existing
 * reference structures and developing publication practices such as versioning,
 * expressing complex contributorship roles, and referencing computable resources.
 *
 * @see {@link http://hl7.org/fhir/R4B/Citation.html}
 */
export interface Citation extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Citation";
}

/**
 * Claim
 *
 * A provider issued list of professional services and products which have been
 * provided, or are to be provided, to a patient which is sent to an insurer for
 * reimbursement.
 *
 * @see {@link http://hl7.org/fhir/R4B/Claim.html}
 */
export interface Claim extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Claim";
}

/**
 * ClaimResponse
 *
 * This resource provides the adjudication details from the processing of a Claim
 * resource.
 *
 * @see {@link http://hl7.org/fhir/R4B/ClaimResponse.html}
 */
export interface ClaimResponse extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ClaimResponse";
}

/**
 * ClinicalImpression
 *
 * A record of a clinical assessment performed to determine what problem(s) may
 * affect the patient and before planning the treatments or management strategies
 * that are best to manage a patient's condition. Assessments are often 1:1 with a
 * clinical consultation / encounter,  but this varies greatly depending on the
 * clinical workflow. This resource is called "ClinicalImpression" rather than
 * "ClinicalAssessment" to avoid confusion with the recording of assessment tools
 * such as Apgar score.
 *
 * @see {@link http://hl7.org/fhir/R4B/ClinicalImpression.html}
 */
export interface ClinicalImpression extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ClinicalImpression";
}

/**
 * ClinicalUseDefinition
 *
 * A single issue - either an indication, contraindication, interaction or an
 * undesirable effect for a medicinal product, medication, device or procedure.
 *
 * @see {@link http://hl7.org/fhir/R4B/ClinicalUseDefinition.html}
 */
export interface ClinicalUseDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ClinicalUseDefinition";
}

/**
 * CodeSystem
 *
 * The CodeSystem resource is used to declare the existence of and describe a code
 * system or code system supplement and its key properties, and optionally define a
 * part or all of its content.
 *
 * @see {@link http://hl7.org/fhir/R4B/CodeSystem.html}
 */
export interface CodeSystem extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "CodeSystem";
}

/**
 * Communication
 *
 * An occurrence of information being transmitted; e.g. an alert that was sent to a
 * responsible provider, a public health agency that was notified about a
 * reportable condition.
 *
 * @see {@link http://hl7.org/fhir/R4B/Communication.html}
 */
export interface Communication extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Communication";
}

/**
 * CommunicationRequest
 *
 * A request to convey information; e.g. the CDS system proposes that an alert be
 * sent to a responsible provider, the CDS system proposes that the public health
 * agency be notified about a reportable condition.
 *
 * @see {@link http://hl7.org/fhir/R4B/CommunicationRequest.html}
 */
export interface CommunicationRequest extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "CommunicationRequest";
}

/**
 * CompartmentDefinition
 *
 * A compartment definition that defines how resources are accessed on a server.
 *
 * @see {@link http://hl7.org/fhir/R4B/CompartmentDefinition.html}
 */
export interface CompartmentDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "CompartmentDefinition";
}

/**
 * Composition
 *
 * A set of healthcare-related information that is assembled together into a single
 * logical package that provides a single coherent statement of meaning,
 * establishes its own context and that has clinical attestation with regard to who
 * is making the statement. A Composition defines the structure and narrative
 * content necessary for a document. However, a Composition alone does not
 * constitute a document. Rather, the Composition must be the first entry in a
 * Bundle where Bundle.type=document, and any other resources referenced from
 * Composition must be included as subsequent entries in the Bundle (for example
 * Patient, Practitioner, Encounter, etc.).
 *
 * @see {@link http://hl7.org/fhir/R4B/Composition.html}
 */
export interface Composition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Composition";
}

/**
 * ConceptMap
 *
 * A statement of relationships from one set of concepts to one or more other
 * concepts - either concepts in code systems, or data element/data element
 * concepts, or classes in class models.
 *
 * @see {@link http://hl7.org/fhir/R4B/ConceptMap.html}
 */
export interface ConceptMap extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ConceptMap";
}

/**
 * Condition
 *
 * A clinical condition, problem, diagnosis, or other event, situation, issue, or
 * clinical concept that has risen to a level of concern.
 *
 * @see {@link http://hl7.org/fhir/R4B/Condition.html}
 */
export interface Condition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Condition";
}

/**
 * Consent
 *
 * A record of a healthcare consumer’s  choices, which permits or denies identified
 * recipient(s) or recipient role(s) to perform one or more actions within a given
 * policy context, for specific purposes and periods of time.
 *
 * @see {@link http://hl7.org/fhir/R4B/Consent.html}
 */
export interface Consent extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Consent";
}

/**
 * Contract
 *
 * Legally enforceable, formally recorded unilateral or bilateral directive i.e., a
 * policy or agreement.
 *
 * @see {@link http://hl7.org/fhir/R4B/Contract.html}
 */
export interface Contract extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Contract";
}

/**
 * Coverage
 *
 * Financial instrument which may be used to reimburse or pay for health care
 * products and services. Includes both insurance and self-payment.
 *
 * @see {@link http://hl7.org/fhir/R4B/Coverage.html}
 */
export interface Coverage extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Coverage";
}

/**
 * CoverageEligibilityRequest
 *
 * The CoverageEligibilityRequest provides patient and insurance coverage
 * information to an insurer for them to respond, in the form of an
 * CoverageEligibilityResponse, with information regarding whether the stated
 * coverage is valid and in-force and optionally to provide the insurance details
 * of the policy.
 *
 * @see {@link http://hl7.org/fhir/R4B/CoverageEligibilityRequest.html}
 */
export interface CoverageEligibilityRequest extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "CoverageEligibilityRequest";
}

/**
 * CoverageEligibilityResponse
 *
 * This resource provides eligibility and plan details from the processing of an
 * CoverageEligibilityRequest resource.
 *
 * @see {@link http://hl7.org/fhir/R4B/CoverageEligibilityResponse.html}
 */
export interface CoverageEligibilityResponse extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "CoverageEligibilityResponse";
}

/**
 * DetectedIssue
 *
 * Indicates an actual or potential clinical issue with or between one or more
 * active or proposed clinical actions for a patient; e.g. Drug-drug interaction,
 * Ineffective treatment frequency, Procedure-condition conflict, etc.
 *
 * @see {@link http://hl7.org/fhir/R4B/DetectedIssue.html}
 */
export interface DetectedIssue extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "DetectedIssue";
}

/**
 * Device
 *
 * A type of a manufactured item that is used in the provision of healthcare
 * without being substantially changed through that activity. The device may be a
 * medical or non-medical device.
 *
 * @see {@link http://hl7.org/fhir/R4B/Device.html}
 */
export interface Device extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Device";
}

/**
 * DeviceDefinition
 *
 * The characteristics, operational status and capabilities of a medical-related
 * component of a medical device.
 *
 * @see {@link http://hl7.org/fhir/R4B/DeviceDefinition.html}
 */
export interface DeviceDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "DeviceDefinition";
}

/**
 * DeviceMetric
 *
 * Describes a measurement, calculation or setting capability of a medical device.
 *
 * @see {@link http://hl7.org/fhir/R4B/DeviceMetric.html}
 */
export interface DeviceMetric extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "DeviceMetric";
}

/**
 * DeviceRequest
 *
 * Represents a request for a patient to employ a medical device. The device may be
 * an implantable device, or an external assistive device, such as a walker.
 *
 * @see {@link http://hl7.org/fhir/R4B/DeviceRequest.html}
 */
export interface DeviceRequest extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "DeviceRequest";
}

/**
 * DeviceUseStatement
 *
 * A record of a device being used by a patient where the record is the result of a
 * report from the patient or another clinician.
 *
 * @see {@link http://hl7.org/fhir/R4B/DeviceUseStatement.html}
 */
export interface DeviceUseStatement extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "DeviceUseStatement";
}

/**
 * DiagnosticReport
 *
 * The findings and interpretation of diagnostic  tests performed on patients,
 * groups of patients, devices, and locations, and/or specimens derived from these.
 * The report includes clinical context such as requesting and provider
 * information, and some mix of atomic results, images, textual and coded
 * interpretations, and formatted representation of diagnostic reports.
 *
 * @see {@link http://hl7.org/fhir/R4B/DiagnosticReport.html}
 */
export interface DiagnosticReport extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "DiagnosticReport";
}

/**
 * DocumentManifest
 *
 * A collection of documents compiled for a purpose together with metadata that
 * applies to the collection.
 *
 * @see {@link http://hl7.org/fhir/R4B/DocumentManifest.html}
 */
export interface DocumentManifest extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "DocumentManifest";
}

/**
 * DocumentReference
 *
 * A reference to a document of any kind for any purpose. Provides metadata about
 * the document so that the document can be discovered and managed. The scope of a
 * document is any seralized object with a mime-type, so includes formal patient
 * centric documents (CDA), cliical notes, scanned paper, and non-patient specific
 * documents like policy text.
 *
 * @see {@link http://hl7.org/fhir/R4B/DocumentReference.html}
 */
export interface DocumentReference extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "DocumentReference";
}

/**
 * DomainResource
 *
 * A resource that includes narrative, extensions, and contained resources.
 *
 * @see {@link http://hl7.org/fhir/R4B/DomainResource.html}
 */
export interface DomainResource extends Resource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: string;
}

/**
 * Encounter
 *
 * An interaction between a patient and healthcare provider(s) for the purpose of
 * providing healthcare service(s) or assessing the health status of a patient.
 *
 * @see {@link http://hl7.org/fhir/R4B/Encounter.html}
 */
export interface Encounter extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Encounter";
}

/**
 * Endpoint
 *
 * The technical details of an endpoint that can be used for electronic services,
 * such as for web services providing XDS.b or a REST endpoint for another FHIR
 * server. This may include any security context information.
 *
 * @see {@link http://hl7.org/fhir/R4B/Endpoint.html}
 */
export interface Endpoint extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Endpoint";
}

/**
 * EnrollmentRequest
 *
 * This resource provides the insurance enrollment details to the insurer regarding
 * a specified coverage.
 *
 * @see {@link http://hl7.org/fhir/R4B/EnrollmentRequest.html}
 */
export interface EnrollmentRequest extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "EnrollmentRequest";
}

/**
 * EnrollmentResponse
 *
 * This resource provides enrollment and plan details from the processing of an
 * EnrollmentRequest resource.
 *
 * @see {@link http://hl7.org/fhir/R4B/EnrollmentResponse.html}
 */
export interface EnrollmentResponse extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "EnrollmentResponse";
}

/**
 * EpisodeOfCare
 *
 * An association between a patient and an organization / healthcare provider(s)
 * during which time encounters may occur. The managing organization assumes a
 * level of responsibility for the patient during this time.
 *
 * @see {@link http://hl7.org/fhir/R4B/EpisodeOfCare.html}
 */
export interface EpisodeOfCare extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "EpisodeOfCare";
}

/**
 * EventDefinition
 *
 * The EventDefinition resource provides a reusable description of when a
 * particular event can occur.
 *
 * @see {@link http://hl7.org/fhir/R4B/EventDefinition.html}
 */
export interface EventDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "EventDefinition";
}

/**
 * Evidence
 *
 * The Evidence Resource provides a machine-interpretable expression of an evidence
 * concept including the evidence variables (eg population,
 * exposures/interventions, comparators, outcomes, measured variables, confounding
 * variables), the statistics, and the certainty of this evidence.
 *
 * @see {@link http://hl7.org/fhir/R4B/Evidence.html}
 */
export interface Evidence extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Evidence";
}

/**
 * EvidenceReport
 *
 * The EvidenceReport Resource is a specialized container for a collection of
 * resources and codable concepts, adapted to support compositions of Evidence,
 * EvidenceVariable, and Citation resources and related concepts.
 *
 * @see {@link http://hl7.org/fhir/R4B/EvidenceReport.html}
 */
export interface EvidenceReport extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "EvidenceReport";
}

/**
 * EvidenceVariable
 *
 * The EvidenceVariable resource describes an element that knowledge (Evidence) is
 * about.
 *
 * @see {@link http://hl7.org/fhir/R4B/EvidenceVariable.html}
 */
export interface EvidenceVariable extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "EvidenceVariable";
}

/**
 * ExampleScenario
 *
 * Example of workflow instance.
 *
 * @see {@link http://hl7.org/fhir/R4B/ExampleScenario.html}
 */
export interface ExampleScenario extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ExampleScenario";
}

/**
 * ExplanationOfBenefit
 *
 * This resource provides: the claim details; adjudication details from the
 * processing of a Claim; and optionally account balance information, for informing
 * the subscriber of the benefits provided.
 *
 * @see {@link http://hl7.org/fhir/R4B/ExplanationOfBenefit.html}
 */
export interface ExplanationOfBenefit extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ExplanationOfBenefit";
}

/**
 * FamilyMemberHistory
 *
 * Significant health conditions for a person related to the patient relevant in
 * the context of care for the patient.
 *
 * @see {@link http://hl7.org/fhir/R4B/FamilyMemberHistory.html}
 */
export interface FamilyMemberHistory extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "FamilyMemberHistory";
}

/**
 * Flag
 *
 * Prospective warnings of potential issues when providing care to the patient.
 *
 * @see {@link http://hl7.org/fhir/R4B/Flag.html}
 */
export interface Flag extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Flag";
}

/**
 * Goal
 *
 * Describes the intended objective(s) for a patient, group or organization care,
 * for example, weight loss, restoring an activity of daily living, obtaining herd
 * immunity via immunization, meeting a process improvement objective, etc.
 *
 * @see {@link http://hl7.org/fhir/R4B/Goal.html}
 */
export interface Goal extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Goal";
}

/**
 * GraphDefinition
 *
 * A formal computable definition of a graph of resources - that is, a coherent set
 * of resources that form a graph by following references. The Graph Definition
 * resource defines a set and makes rules about the set.
 *
 * @see {@link http://hl7.org/fhir/R4B/GraphDefinition.html}
 */
export interface GraphDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "GraphDefinition";
}

/**
 * Group
 *
 * Represents a defined collection of entities that may be discussed or acted upon
 * collectively but which are not expected to act collectively, and are not
 * formally or legally recognized; i.e. a collection of entities that isn't an
 * Organization.
 *
 * @see {@link http://hl7.org/fhir/R4B/Group.html}
 */
export interface Group extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Group";
}

/**
 * GuidanceResponse
 *
 * A guidance response is the formal response to a guidance request, including any
 * output parameters returned by the evaluation, as well as the description of any
 * proposed actions to be taken.
 *
 * @see {@link http://hl7.org/fhir/R4B/GuidanceResponse.html}
 */
export interface GuidanceResponse extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "GuidanceResponse";
}

/**
 * HealthcareService
 *
 * The details of a healthcare service available at a location.
 *
 * @see {@link http://hl7.org/fhir/R4B/HealthcareService.html}
 */
export interface HealthcareService extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "HealthcareService";
}

/**
 * ImagingStudy
 *
 * Representation of the content produced in a DICOM imaging study. A study
 * comprises a set of series, each of which includes a set of Service-Object Pair
 * Instances (SOP Instances - images or other data) acquired or produced in a
 * common context.  A series is of only one modality (e.g. X-ray, CT, MR,
 * ultrasound), but a study may have multiple series of different modalities.
 *
 * @see {@link http://hl7.org/fhir/R4B/ImagingStudy.html}
 */
export interface ImagingStudy extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ImagingStudy";
}

/**
 * Immunization
 *
 * Describes the event of a patient being administered a vaccine or a record of an
 * immunization as reported by a patient, a clinician or another party.
 *
 * @see {@link http://hl7.org/fhir/R4B/Immunization.html}
 */
export interface Immunization extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Immunization";
}

/**
 * ImmunizationEvaluation
 *
 * Describes a comparison of an immunization event against published
 * recommendations to determine if the administration is "valid" in relation to
 * those  recommendations.
 *
 * @see {@link http://hl7.org/fhir/R4B/ImmunizationEvaluation.html}
 */
export interface ImmunizationEvaluation extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ImmunizationEvaluation";
}

/**
 * ImmunizationRecommendation
 *
 * A patient's point-in-time set of recommendations (i.e. forecasting) according to
 * a published schedule with optional supporting justification.
 *
 * @see {@link http://hl7.org/fhir/R4B/ImmunizationRecommendation.html}
 */
export interface ImmunizationRecommendation extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ImmunizationRecommendation";
}

/**
 * ImplementationGuide
 *
 * A set of rules of how a particular interoperability or standards problem is
 * solved - typically through the use of FHIR resources. This resource is used to
 * gather all the parts of an implementation guide into a logical whole and to
 * publish a computable definition of all the parts.
 *
 * @see {@link http://hl7.org/fhir/R4B/ImplementationGuide.html}
 */
export interface ImplementationGuide extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ImplementationGuide";
}

/**
 * Ingredient
 *
 * An ingredient of a manufactured item or pharmaceutical product.
 *
 * @see {@link http://hl7.org/fhir/R4B/Ingredient.html}
 */
export interface Ingredient extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Ingredient";
}

/**
 * InsurancePlan
 *
 * Details of a Health Insurance product/plan provided by an organization.
 *
 * @see {@link http://hl7.org/fhir/R4B/InsurancePlan.html}
 */
export interface InsurancePlan extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "InsurancePlan";
}

/**
 * Invoice
 *
 * Invoice containing collected ChargeItems from an Account with calculated
 * individual and total price for Billing purpose.
 *
 * @see {@link http://hl7.org/fhir/R4B/Invoice.html}
 */
export interface Invoice extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Invoice";
}

/**
 * Library
 *
 * The Library resource is a general-purpose container for knowledge asset
 * definitions. It can be used to describe and expose existing knowledge assets
 * such as logic libraries and information model descriptions, as well as to
 * describe a collection of knowledge assets.
 *
 * @see {@link http://hl7.org/fhir/R4B/Library.html}
 */
export interface Library extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Library";
}

/**
 * Linkage
 *
 * Identifies two or more records (resource instances) that refer to the same
 * real-world "occurrence".
 *
 * @see {@link http://hl7.org/fhir/R4B/Linkage.html}
 */
export interface Linkage extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Linkage";
}

/**
 * List
 *
 * A list is a curated collection of resources.
 *
 * @see {@link http://hl7.org/fhir/R4B/List.html}
 */
export interface List extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "List";
}

/**
 * Location
 *
 * Details and position information for a physical place where services are
 * provided and resources and participants may be stored, found, contained, or
 * accommodated.
 *
 * @see {@link http://hl7.org/fhir/R4B/Location.html}
 */
export interface Location extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Location";
}

/**
 * ManufacturedItemDefinition
 *
 * The definition and characteristics of a medicinal manufactured item, such as a
 * tablet or capsule, as contained in a packaged medicinal product.
 *
 * @see {@link http://hl7.org/fhir/R4B/ManufacturedItemDefinition.html}
 */
export interface ManufacturedItemDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ManufacturedItemDefinition";
}

/**
 * Measure
 *
 * The Measure resource provides the definition of a quality measure.
 *
 * @see {@link http://hl7.org/fhir/R4B/Measure.html}
 */
export interface Measure extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Measure";
}

/**
 * MeasureReport
 *
 * The MeasureReport resource contains the results of the calculation of a measure;
 * and optionally a reference to the resources involved in that calculation.
 *
 * @see {@link http://hl7.org/fhir/R4B/MeasureReport.html}
 */
export interface MeasureReport extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "MeasureReport";
}

/**
 * Media
 *
 * A photo, video, or audio recording acquired or used in healthcare. The actual
 * content may be inline or provided by direct reference.
 *
 * @see {@link http://hl7.org/fhir/R4B/Media.html}
 */
export interface Media extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Media";
}

/**
 * Medication
 *
 * This resource is primarily used for the identification and definition of a
 * medication for the purposes of prescribing, dispensing, and administering a
 * medication as well as for making statements about medication use.
 *
 * @see {@link http://hl7.org/fhir/R4B/Medication.html}
 */
export interface Medication extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Medication";
}

/**
 * MedicationAdministration
 *
 * Describes the event of a patient consuming or otherwise being administered a
 * medication.  This may be as simple as swallowing a tablet or it may be a long
 * running infusion.  Related resources tie this event to the authorizing
 * prescription, and the specific encounter between patient and health care
 * practitioner.
 *
 * @see {@link http://hl7.org/fhir/R4B/MedicationAdministration.html}
 */
export interface MedicationAdministration extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "MedicationAdministration";
}

/**
 * MedicationDispense
 *
 * Indicates that a medication product is to be or has been dispensed for a named
 * person/patient.  This includes a description of the medication product (supply)
 * provided and the instructions for administering the medication.  The medication
 * dispense is the result of a pharmacy system responding to a medication order.
 *
 * @see {@link http://hl7.org/fhir/R4B/MedicationDispense.html}
 */
export interface MedicationDispense extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "MedicationDispense";
}

/**
 * MedicationKnowledge
 *
 * Information about a medication that is used to support knowledge.
 *
 * @see {@link http://hl7.org/fhir/R4B/MedicationKnowledge.html}
 */
export interface MedicationKnowledge extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "MedicationKnowledge";
}

/**
 * MedicationRequest
 *
 * An order or request for both supply of the medication and the instructions for
 * administration of the medication to a patient. The resource is called
 * "MedicationRequest" rather than "MedicationPrescription" or "MedicationOrder" to
 * generalize the use across inpatient and outpatient settings, including care
 * plans, etc., and to harmonize with workflow patterns.
 *
 * @see {@link http://hl7.org/fhir/R4B/MedicationRequest.html}
 */
export interface MedicationRequest extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "MedicationRequest";
}

/**
 * MedicationStatement
 *
 * A record of a medication that is being consumed by a patient.   A
 * MedicationStatement may indicate that the patient may be taking the medication
 * now or has taken the medication in the past or will be taking the medication in
 * the future.  The source of this information can be the patient, significant
 * other (such as a family member or spouse), or a clinician.  A common scenario
 * where this information is captured is during the history taking process during a
 * patient visit or stay.   The medication information may come from sources such
 * as the patient's memory, from a prescription bottle,  or from a list of
 * medications the patient, clinician or other party maintains.
 *
 * The primary difference between a medication statement and a medication
 * administration is that the medication administration has complete administration
 * information and is based on actual administration information from the person
 * who administered the medication.  A medication statement is often, if not
 * always, less specific.  There is no required date/time when the medication was
 * administered, in fact we only know that a source has reported the patient is
 * taking this medication, where details such as time, quantity, or rate or even
 * medication product may be incomplete or missing or less precise.  As stated
 * earlier, the medication statement information may come from the patient's
 * memory, from a prescription bottle or from a list of medications the patient,
 * clinician or other party maintains.  Medication administration is more formal
 * and is not missing detailed information.
 *
 * @see {@link http://hl7.org/fhir/R4B/MedicationStatement.html}
 */
export interface MedicationStatement extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "MedicationStatement";
}

/**
 * MedicinalProductDefinition
 *
 * Detailed definition of a medicinal product, typically for uses other than direct
 * patient care (e.g. regulatory use, drug catalogs, to support prescribing,
 * adverse events management etc.).
 *
 * @see {@link http://hl7.org/fhir/R4B/MedicinalProductDefinition.html}
 */
export interface MedicinalProductDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "MedicinalProductDefinition";
}

/**
 * MessageDefinition
 *
 * Defines the characteristics of a message that can be shared between systems,
 * including the type of event that initiates the message, the content to be
 * transmitted and what response(s), if any, are permitted.
 *
 * @see {@link http://hl7.org/fhir/R4B/MessageDefinition.html}
 */
export interface MessageDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "MessageDefinition";
}

/**
 * MessageHeader
 *
 * The header for a message exchange that is either requesting or responding to an
 * action.  The reference(s) that are the subject of the action as well as other
 * information related to the action are typically transmitted in a bundle in which
 * the MessageHeader resource instance is the first resource in the bundle.
 *
 * @see {@link http://hl7.org/fhir/R4B/MessageHeader.html}
 */
export interface MessageHeader extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "MessageHeader";
}

/**
 * MolecularSequence
 *
 * Raw data describing a biological sequence.
 *
 * @see {@link http://hl7.org/fhir/R4B/MolecularSequence.html}
 */
export interface MolecularSequence extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "MolecularSequence";
}

/**
 * NamingSystem
 *
 * A curated namespace that issues unique symbols within that namespace for the
 * identification of concepts, people, devices, etc.  Represents a "System" used
 * within the Identifier and Coding data types.
 *
 * @see {@link http://hl7.org/fhir/R4B/NamingSystem.html}
 */
export interface NamingSystem extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "NamingSystem";
}

/**
 * NutritionOrder
 *
 * A request to supply a diet, formula feeding (enteral) or oral nutritional
 * supplement to a patient/resident.
 *
 * @see {@link http://hl7.org/fhir/R4B/NutritionOrder.html}
 */
export interface NutritionOrder extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "NutritionOrder";
}

/**
 * NutritionProduct
 *
 * A food or fluid product that is consumed by patients.
 *
 * @see {@link http://hl7.org/fhir/R4B/NutritionProduct.html}
 */
export interface NutritionProduct extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "NutritionProduct";
}

/**
 * Observation
 *
 * Measurements and simple assertions made about a patient, device or other
 * subject.
 *
 * @see {@link http://hl7.org/fhir/R4B/Observation.html}
 */
export interface Observation extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Observation";
}

/**
 * ObservationDefinition
 *
 * Set of definitional characteristics for a kind of observation or measurement
 * produced or consumed by an orderable health care service.
 *
 * @see {@link http://hl7.org/fhir/R4B/ObservationDefinition.html}
 */
export interface ObservationDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ObservationDefinition";
}

/**
 * OperationDefinition
 *
 * A formal computable definition of an operation (on the RESTful interface) or a
 * named query (using the search interaction).
 *
 * @see {@link http://hl7.org/fhir/R4B/OperationDefinition.html}
 */
export interface OperationDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "OperationDefinition";
}

/**
 * OperationOutcome
 *
 * A collection of error, warning, or information messages that result from a
 * system action.
 *
 * @see {@link http://hl7.org/fhir/R4B/OperationOutcome.html}
 */
export interface OperationOutcome extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "OperationOutcome";
}

/**
 * Organization
 *
 * A formally or informally recognized grouping of people or organizations formed
 * for the purpose of achieving some form of collective action.  Includes
 * companies, institutions, corporations, departments, community groups, healthcare
 * practice groups, payer/insurer, etc.
 *
 * @see {@link http://hl7.org/fhir/R4B/Organization.html}
 */
export interface Organization extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Organization";
}

/**
 * OrganizationAffiliation
 *
 * Defines an affiliation/assotiation/relationship between 2 distinct oganizations,
 * that is not a part-of relationship/sub-division relationship.
 *
 * @see {@link http://hl7.org/fhir/R4B/OrganizationAffiliation.html}
 */
export interface OrganizationAffiliation extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "OrganizationAffiliation";
}

/**
 * PackagedProductDefinition
 *
 * A medically related item or items, in a container or package.
 *
 * @see {@link http://hl7.org/fhir/R4B/PackagedProductDefinition.html}
 */
export interface PackagedProductDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "PackagedProductDefinition";
}

/**
 * Parameters
 *
 * This resource is a non-persisted resource used to pass information into and back
 * from an [operation](operations.html). It has no other use, and there is no
 * RESTful endpoint associated with it.
 *
 * @see {@link http://hl7.org/fhir/R4B/Parameters.html}
 */
export interface Parameters extends Resource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: string;
}

/**
 * Patient
 *
 * Demographics and other administrative information about an individual or animal
 * receiving care or other health-related services.
 *
 * @see {@link http://hl7.org/fhir/R4B/Patient.html}
 */
export interface Patient extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Patient";
}

/**
 * PaymentNotice
 *
 * This resource provides the status of the payment for goods and services
 * rendered, and the request and response resource references.
 *
 * @see {@link http://hl7.org/fhir/R4B/PaymentNotice.html}
 */
export interface PaymentNotice extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "PaymentNotice";
}

/**
 * PaymentReconciliation
 *
 * This resource provides the details including amount of a payment and allocates
 * the payment items being paid.
 *
 * @see {@link http://hl7.org/fhir/R4B/PaymentReconciliation.html}
 */
export interface PaymentReconciliation extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "PaymentReconciliation";
}

/**
 * Person
 *
 * Demographics and administrative information about a person independent of a
 * specific health-related context.
 *
 * @see {@link http://hl7.org/fhir/R4B/Person.html}
 */
export interface Person extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Person";
}

/**
 * PlanDefinition
 *
 * This resource allows for the definition of various types of plans as a sharable,
 * consumable, and executable artifact. The resource is general enough to support
 * the description of a broad range of clinical and non-clinical artifacts such as
 * clinical decision support rules, order sets, protocols, and drug quality
 * specifications.
 *
 * @see {@link http://hl7.org/fhir/R4B/PlanDefinition.html}
 */
export interface PlanDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "PlanDefinition";
}

/**
 * Practitioner
 *
 * A person who is directly or indirectly involved in the provisioning of
 * healthcare.
 *
 * @see {@link http://hl7.org/fhir/R4B/Practitioner.html}
 */
export interface Practitioner extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Practitioner";
}

/**
 * PractitionerRole
 *
 * A specific set of Roles/Locations/specialties/services that a practitioner may
 * perform at an organization for a period of time.
 *
 * @see {@link http://hl7.org/fhir/R4B/PractitionerRole.html}
 */
export interface PractitionerRole extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "PractitionerRole";
}

/**
 * Procedure
 *
 * An action that is or was performed on or for a patient. This can be a physical
 * intervention like an operation, or less invasive like long term services,
 * counseling, or hypnotherapy.
 *
 * @see {@link http://hl7.org/fhir/R4B/Procedure.html}
 */
export interface Procedure extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Procedure";
}

/**
 * Provenance
 *
 * Provenance of a resource is a record that describes entities and processes
 * involved in producing and delivering or otherwise influencing that resource.
 * Provenance provides a critical foundation for assessing authenticity, enabling
 * trust, and allowing reproducibility. Provenance assertions are a form of
 * contextual metadata and can themselves become important records with their own
 * provenance. Provenance statement indicates clinical significance in terms of
 * confidence in authenticity, reliability, and trustworthiness, integrity, and
 * stage in lifecycle (e.g. Document Completion - has the artifact been legally
 * authenticated), all of which may impact security, privacy, and trust policies.
 *
 * @see {@link http://hl7.org/fhir/R4B/Provenance.html}
 */
export interface Provenance extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Provenance";
}

/**
 * Questionnaire
 *
 * A structured set of questions intended to guide the collection of answers from
 * end-users. Questionnaires provide detailed control over order, presentation,
 * phraseology and grouping to allow coherent, consistent data collection.
 *
 * @see {@link http://hl7.org/fhir/R4B/Questionnaire.html}
 */
export interface Questionnaire extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Questionnaire";
}

/**
 * QuestionnaireResponse
 *
 * A structured set of questions and their answers. The questions are ordered and
 * grouped into coherent subsets, corresponding to the structure of the grouping of
 * the questionnaire being responded to.
 *
 * @see {@link http://hl7.org/fhir/R4B/QuestionnaireResponse.html}
 */
export interface QuestionnaireResponse extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "QuestionnaireResponse";
}

/**
 * RegulatedAuthorization
 *
 * Regulatory approval, clearance or licencing related to a regulated product,
 * treatment, facility or activity that is cited in a guidance, regulation, rule or
 * legislative act. An example is Market Authorization relating to a Medicinal
 * Product.
 *
 * @see {@link http://hl7.org/fhir/R4B/RegulatedAuthorization.html}
 */
export interface RegulatedAuthorization extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "RegulatedAuthorization";
}

/**
 * RelatedPerson
 *
 * Information about a person that is involved in the care for a patient, but who
 * is not the target of healthcare, nor has a formal responsibility in the care
 * process.
 *
 * @see {@link http://hl7.org/fhir/R4B/RelatedPerson.html}
 */
export interface RelatedPerson extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "RelatedPerson";
}

/**
 * RequestGroup
 *
 * A group of related requests that can be used to capture intended activities that
 * have inter-dependencies such as "give this medication after that one".
 *
 * @see {@link http://hl7.org/fhir/R4B/RequestGroup.html}
 */
export interface RequestGroup extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "RequestGroup";
}

/**
 * ResearchDefinition
 *
 * The ResearchDefinition resource describes the conditional state (population and
 * any exposures being compared within the population) and outcome (if specified)
 * that the knowledge (evidence, assertion, recommendation) is about.
 *
 * @see {@link http://hl7.org/fhir/R4B/ResearchDefinition.html}
 */
export interface ResearchDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ResearchDefinition";
}

/**
 * ResearchElementDefinition
 *
 * The ResearchElementDefinition resource describes a "PICO" element that knowledge
 * (evidence, assertion, recommendation) is about.
 *
 * @see {@link http://hl7.org/fhir/R4B/ResearchElementDefinition.html}
 */
export interface ResearchElementDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ResearchElementDefinition";
}

/**
 * ResearchStudy
 *
 * A process where a researcher or organization plans and then executes a series of
 * steps intended to increase the field of healthcare-related knowledge.  This
 * includes studies of safety, efficacy, comparative effectiveness and other
 * information about medications, devices, therapies and other interventional and
 * investigative techniques.  A ResearchStudy involves the gathering of information
 * about human or animal subjects.
 *
 * @see {@link http://hl7.org/fhir/R4B/ResearchStudy.html}
 */
export interface ResearchStudy extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ResearchStudy";
}

/**
 * ResearchSubject
 *
 * A physical entity which is the primary unit of operational and/or administrative
 * interest in a study.
 *
 * @see {@link http://hl7.org/fhir/R4B/ResearchSubject.html}
 */
export interface ResearchSubject extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ResearchSubject";
}

/**
 * Resource
 *
 * This is the base resource type for everything.
 *
 * @see {@link http://hl7.org/fhir/R4B/Resource.html}
 */
export interface Resource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: string;
}

/**
 * RiskAssessment
 *
 * An assessment of the likely outcome(s) for a patient or other subject as well as
 * the likelihood of each outcome.
 *
 * @see {@link http://hl7.org/fhir/R4B/RiskAssessment.html}
 */
export interface RiskAssessment extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "RiskAssessment";
}

/**
 * Schedule
 *
 * A container for slots of time that may be available for booking appointments.
 *
 * @see {@link http://hl7.org/fhir/R4B/Schedule.html}
 */
export interface Schedule extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Schedule";
}

/**
 * SearchParameter
 *
 * A search parameter that defines a named search item that can be used to
 * search/filter on a resource.
 *
 * @see {@link http://hl7.org/fhir/R4B/SearchParameter.html}
 */
export interface SearchParameter extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "SearchParameter";
}

/**
 * ServiceRequest
 *
 * A record of a request for service such as diagnostic investigations, treatments,
 * or operations to be performed.
 *
 * @see {@link http://hl7.org/fhir/R4B/ServiceRequest.html}
 */
export interface ServiceRequest extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ServiceRequest";
}

/**
 * Slot
 *
 * A slot of time on a schedule that may be available for booking appointments.
 *
 * @see {@link http://hl7.org/fhir/R4B/Slot.html}
 */
export interface Slot extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Slot";
}

/**
 * Specimen
 *
 * A sample to be used for analysis.
 *
 * @see {@link http://hl7.org/fhir/R4B/Specimen.html}
 */
export interface Specimen extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Specimen";
}

/**
 * SpecimenDefinition
 *
 * A kind of specimen with associated set of requirements.
 *
 * @see {@link http://hl7.org/fhir/R4B/SpecimenDefinition.html}
 */
export interface SpecimenDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "SpecimenDefinition";
}

/**
 * StructureDefinition
 *
 * A definition of a FHIR structure. This resource is used to describe the
 * underlying resources, data types defined in FHIR, and also for describing
 * extensions and constraints on resources and data types.
 *
 * @see {@link http://hl7.org/fhir/R4B/StructureDefinition.html}
 */
export interface StructureDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "StructureDefinition";
}

/**
 * StructureMap
 *
 * A Map of relationships between 2 structures that can be used to transform data.
 *
 * @see {@link http://hl7.org/fhir/R4B/StructureMap.html}
 */
export interface StructureMap extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "StructureMap";
}

/**
 * Subscription
 *
 * The subscription resource is used to define a push-based subscription from a
 * server to another system. Once a subscription is registered with the server, the
 * server checks every resource that is created or updated, and if the resource
 * matches the given criteria, it sends a message on the defined "channel" so that
 * another system can take an appropriate action.
 *
 * @see {@link http://hl7.org/fhir/R4B/Subscription.html}
 */
export interface Subscription extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Subscription";
}

/**
 * SubscriptionStatus
 *
 * The SubscriptionStatus resource describes the state of a Subscription during
 * notifications.
 *
 * @see {@link http://hl7.org/fhir/R4B/SubscriptionStatus.html}
 */
export interface SubscriptionStatus extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "SubscriptionStatus";
}

/**
 * SubscriptionTopic
 *
 * Describes a stream of resource state changes identified by trigger criteria and
 * annotated with labels useful to filter projections from this topic.
 *
 * @see {@link http://hl7.org/fhir/R4B/SubscriptionTopic.html}
 */
export interface SubscriptionTopic extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "SubscriptionTopic";
}

/**
 * Substance
 *
 * A homogeneous material with a definite composition.
 *
 * @see {@link http://hl7.org/fhir/R4B/Substance.html}
 */
export interface Substance extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Substance";
}

/**
 * SubstanceDefinition
 *
 * The detailed description of a substance, typically at a level beyond what is
 * used for prescribing.
 *
 * @see {@link http://hl7.org/fhir/R4B/SubstanceDefinition.html}
 */
export interface SubstanceDefinition extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "SubstanceDefinition";
}

/**
 * SupplyDelivery
 *
 * Record of delivery of what is supplied.
 *
 * @see {@link http://hl7.org/fhir/R4B/SupplyDelivery.html}
 */
export interface SupplyDelivery extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "SupplyDelivery";
}

/**
 * SupplyRequest
 *
 * A record of a request for a medication, substance or device used in the
 * healthcare setting.
 *
 * @see {@link http://hl7.org/fhir/R4B/SupplyRequest.html}
 */
export interface SupplyRequest extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "SupplyRequest";
}

/**
 * Task
 *
 * A task to be performed.
 *
 * @see {@link http://hl7.org/fhir/R4B/Task.html}
 */
export interface Task extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "Task";
}

/**
 * TerminologyCapabilities
 *
 * A TerminologyCapabilities resource documents a set of capabilities (behaviors)
 * of a FHIR Terminology Server that may be used as a statement of actual server
 * functionality or a statement of required or desired server implementation.
 *
 * @see {@link http://hl7.org/fhir/R4B/TerminologyCapabilities.html}
 */
export interface TerminologyCapabilities extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "TerminologyCapabilities";
}

/**
 * TestReport
 *
 * A summary of information based on the results of executing a TestScript.
 *
 * @see {@link http://hl7.org/fhir/R4B/TestReport.html}
 */
export interface TestReport extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "TestReport";
}

/**
 * TestScript
 *
 * A structured set of tests against a FHIR server or client implementation to
 * determine compliance against the FHIR specification.
 *
 * @see {@link http://hl7.org/fhir/R4B/TestScript.html}
 */
export interface TestScript extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "TestScript";
}

/**
 * ValueSet
 *
 * A ValueSet resource instance specifies a set of codes drawn from one or more
 * code systems, intended for use in a particular context. Value sets link between
 * [[[CodeSystem]]] definitions and their use in [coded
 * elements](terminologies.html).
 *
 * @see {@link http://hl7.org/fhir/R4B/ValueSet.html}
 */
export interface ValueSet extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "ValueSet";
}

/**
 * VerificationResult
 *
 * Describes validation requirements, source(s), status and dates for one or more
 * elements.
 *
 * @see {@link http://hl7.org/fhir/R4B/VerificationResult.html}
 */
export interface VerificationResult extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "VerificationResult";
}

/**
 * VisionPrescription
 *
 * An authorization for the provision of glasses and/or contact lenses to a
 * patient.
 *
 * @see {@link http://hl7.org/fhir/R4B/VisionPrescription.html}
 */
export interface VisionPrescription extends DomainResource {
  /** Resource Type Name (for serialization) */

  readonly resourceType: "VisionPrescription";
}
