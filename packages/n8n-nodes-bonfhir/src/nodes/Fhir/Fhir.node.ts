import { INodeType, INodeTypeDescription } from "n8n-workflow";

export class Fhir implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Fhir",
    name: "fhir",
    icon: "file:Fhir.svg",
    group: ["transform"],
    version: 1,
    description: "Consume your FHIR API",
    defaults: {
      name: "Fhir",
    },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [
      {
        name: "fhirOAuth2Api",
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: "http://localhost:8103/fhir/R4",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
    // Basic node details will go here
    properties: [
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        options: [
          {
            name: "Account",
            value: "account",
          },
          {
            name: "ActivityDefinition",
            value: "activitydefinition",
          },
          {
            name: "AdministrableProductDefinition",
            value: "administrableproductdefinition",
          },
          {
            name: "AdverseEvent",
            value: "adverseevent",
          },
          {
            name: "AllergyIntolerance",
            value: "allergyintolerance",
          },
          {
            name: "Appointment",
            value: "appointment",
          },
          {
            name: "AppointmentResponse",
            value: "appointmentresponse",
          },
          {
            name: "AuditEvent",
            value: "auditevent",
          },
          {
            name: "Basic",
            value: "basic",
          },
          {
            name: "Binary",
            value: "binary",
          },
          {
            name: "BiologicallyDerivedProduct",
            value: "biologicallyderivedproduct",
          },
          {
            name: "BodyStructure",
            value: "bodystructure",
          },
          {
            name: "Bundle",
            value: "bundle",
          },
          {
            name: "CapabilityStatement",
            value: "capabilitystatement",
          },
          {
            name: "CarePlan",
            value: "careplan",
          },
          {
            name: "CareTeam",
            value: "careteam",
          },
          {
            name: "CatalogEntry",
            value: "catalogentry",
          },
          {
            name: "ChargeItem",
            value: "chargeitem",
          },
          {
            name: "ChargeItemDefinition",
            value: "chargeitemdefinition",
          },
          {
            name: "Citation",
            value: "citation",
          },
          {
            name: "Claim",
            value: "claim",
          },
          {
            name: "ClaimResponse",
            value: "claimresponse",
          },
          {
            name: "ClinicalImpression",
            value: "clinicalimpression",
          },
          {
            name: "ClinicalUseDefinition",
            value: "clinicalusedefinition",
          },
          {
            name: "CodeSystem",
            value: "codesystem",
          },
          {
            name: "Communication",
            value: "communication",
          },
          {
            name: "CommunicationRequest",
            value: "communicationrequest",
          },
          {
            name: "CompartmentDefinition",
            value: "compartmentdefinition",
          },
          {
            name: "Composition",
            value: "composition",
          },
          {
            name: "ConceptMap",
            value: "conceptmap",
          },
          {
            name: "Condition",
            value: "condition",
          },
          {
            name: "Consent",
            value: "consent",
          },
          {
            name: "Contract",
            value: "contract",
          },
          {
            name: "Coverage",
            value: "coverage",
          },
          {
            name: "CoverageEligibilityRequest",
            value: "coverageeligibilityrequest",
          },
          {
            name: "CoverageEligibilityResponse",
            value: "coverageeligibilityresponse",
          },
          {
            name: "DetectedIssue",
            value: "detectedissue",
          },
          {
            name: "Device",
            value: "device",
          },
          {
            name: "DeviceDefinition",
            value: "devicedefinition",
          },
          {
            name: "DeviceMetric",
            value: "devicemetric",
          },
          {
            name: "DeviceRequest",
            value: "devicerequest",
          },
          {
            name: "DeviceUseStatement",
            value: "deviceusestatement",
          },
          {
            name: "DiagnosticReport",
            value: "diagnosticreport",
          },
          {
            name: "DocumentManifest",
            value: "documentmanifest",
          },
          {
            name: "DocumentReference",
            value: "documentreference",
          },
          {
            name: "DomainResource",
            value: "domainresource",
          },
          {
            name: "Encounter",
            value: "encounter",
          },
          {
            name: "Endpoint",
            value: "endpoint",
          },
          {
            name: "EnrollmentRequest",
            value: "enrollmentrequest",
          },
          {
            name: "EnrollmentResponse",
            value: "enrollmentresponse",
          },
          {
            name: "EpisodeOfCare",
            value: "episodeofcare",
          },
          {
            name: "EventDefinition",
            value: "eventdefinition",
          },
          {
            name: "Evidence",
            value: "evidence",
          },
          {
            name: "EvidenceReport",
            value: "evidencereport",
          },
          {
            name: "EvidenceVariable",
            value: "evidencevariable",
          },
          {
            name: "ExampleScenario",
            value: "examplescenario",
          },
          {
            name: "ExplanationOfBenefit",
            value: "explanationofbenefit",
          },
          {
            name: "FamilyMemberHistory",
            value: "familymemberhistory",
          },
          {
            name: "Flag",
            value: "flag",
          },
          {
            name: "Goal",
            value: "goal",
          },
          {
            name: "GraphDefinition",
            value: "graphdefinition",
          },
          {
            name: "Group",
            value: "group",
          },
          {
            name: "GuidanceResponse",
            value: "guidanceresponse",
          },
          {
            name: "HealthcareService",
            value: "healthcareservice",
          },
          {
            name: "ImagingStudy",
            value: "imagingstudy",
          },
          {
            name: "Immunization",
            value: "immunization",
          },
          {
            name: "ImmunizationEvaluation",
            value: "immunizationevaluation",
          },
          {
            name: "ImmunizationRecommendation",
            value: "immunizationrecommendation",
          },
          {
            name: "ImplementationGuide",
            value: "implementationguide",
          },
          {
            name: "Ingredient",
            value: "ingredient",
          },
          {
            name: "InsurancePlan",
            value: "insuranceplan",
          },
          {
            name: "Invoice",
            value: "invoice",
          },
          {
            name: "Library",
            value: "library",
          },
          {
            name: "Linkage",
            value: "linkage",
          },
          {
            name: "List",
            value: "list",
          },
          {
            name: "Location",
            value: "location",
          },
          {
            name: "ManufacturedItemDefinition",
            value: "manufactureditemdefinition",
          },
          {
            name: "Measure",
            value: "measure",
          },
          {
            name: "MeasureReport",
            value: "measurereport",
          },
          {
            name: "Media",
            value: "media",
          },
          {
            name: "Medication",
            value: "medication",
          },
          {
            name: "MedicationAdministration",
            value: "medicationadministration",
          },
          {
            name: "MedicationDispense",
            value: "medicationdispense",
          },
          {
            name: "MedicationKnowledge",
            value: "medicationknowledge",
          },
          {
            name: "MedicationRequest",
            value: "medicationrequest",
          },
          {
            name: "MedicationStatement",
            value: "medicationstatement",
          },
          {
            name: "MedicinalProductDefinition",
            value: "medicinalproductdefinition",
          },
          {
            name: "MessageDefinition",
            value: "messagedefinition",
          },
          {
            name: "MessageHeader",
            value: "messageheader",
          },
          {
            name: "MolecularSequence",
            value: "molecularsequence",
          },
          {
            name: "NamingSystem",
            value: "namingsystem",
          },
          {
            name: "NutritionOrder",
            value: "nutritionorder",
          },
          {
            name: "NutritionProduct",
            value: "nutritionproduct",
          },
          {
            name: "Observation",
            value: "observation",
          },
          {
            name: "ObservationDefinition",
            value: "observationdefinition",
          },
          {
            name: "OperationDefinition",
            value: "operationdefinition",
          },
          {
            name: "OperationOutcome",
            value: "operationoutcome",
          },
          {
            name: "Organization",
            value: "organization",
          },
          {
            name: "OrganizationAffiliation",
            value: "organizationaffiliation",
          },
          {
            name: "PackagedProductDefinition",
            value: "packagedproductdefinition",
          },
          {
            name: "Parameters",
            value: "parameters",
          },
          {
            name: "Patient",
            value: "patient",
          },
          {
            name: "PaymentNotice",
            value: "paymentnotice",
          },
          {
            name: "PaymentReconciliation",
            value: "paymentreconciliation",
          },
          {
            name: "Person",
            value: "person",
          },
          {
            name: "PlanDefinition",
            value: "plandefinition",
          },
          {
            name: "Practitioner",
            value: "practitioner",
          },
          {
            name: "PractitionerRole",
            value: "practitionerrole",
          },
          {
            name: "Procedure",
            value: "procedure",
          },
          {
            name: "Provenance",
            value: "provenance",
          },
          {
            name: "Questionnaire",
            value: "questionnaire",
          },
          {
            name: "QuestionnaireResponse",
            value: "questionnaireresponse",
          },
          {
            name: "RegulatedAuthorization",
            value: "regulatedauthorization",
          },
          {
            name: "RelatedPerson",
            value: "relatedperson",
          },
          {
            name: "RequestGroup",
            value: "requestgroup",
          },
          {
            name: "ResearchDefinition",
            value: "researchdefinition",
          },
          {
            name: "ResearchElementDefinition",
            value: "researchelementdefinition",
          },
          {
            name: "ResearchStudy",
            value: "researchstudy",
          },
          {
            name: "ResearchSubject",
            value: "researchsubject",
          },
          {
            name: "Resource",
            value: "resource",
          },
          {
            name: "RiskAssessment",
            value: "riskassessment",
          },
          {
            name: "Schedule",
            value: "schedule",
          },
          {
            name: "SearchParameter",
            value: "searchparameter",
          },
          {
            name: "ServiceRequest",
            value: "servicerequest",
          },
          {
            name: "Slot",
            value: "slot",
          },
          {
            name: "Specimen",
            value: "specimen",
          },
          {
            name: "SpecimenDefinition",
            value: "specimendefinition",
          },
          {
            name: "StructureDefinition",
            value: "structuredefinition",
          },
          {
            name: "StructureMap",
            value: "structuremap",
          },
          {
            name: "Subscription",
            value: "subscription",
          },
          {
            name: "SubscriptionStatus",
            value: "subscriptionstatus",
          },
          {
            name: "SubscriptionTopic",
            value: "subscriptiontopic",
          },
          {
            name: "Substance",
            value: "substance",
          },
          {
            name: "SubstanceDefinition",
            value: "substancedefinition",
          },
          {
            name: "SupplyDelivery",
            value: "supplydelivery",
          },
          {
            name: "SupplyRequest",
            value: "supplyrequest",
          },
          {
            name: "Task",
            value: "task",
          },
          {
            name: "TerminologyCapabilities",
            value: "terminologycapabilities",
          },
          {
            name: "TestReport",
            value: "testreport",
          },
          {
            name: "TestScript",
            value: "testscript",
          },
          {
            name: "ValueSet",
            value: "valueset",
          },
          {
            name: "VerificationResult",
            value: "verificationresult",
          },
          {
            name: "VisionPrescription",
            value: "visionprescription",
          },
        ],
        default: "patient",
        noDataExpression: true,
        required: true,
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: [
              "account",
              "activitydefinition",
              "administrableproductdefinition",
              "adverseevent",
              "allergyintolerance",
              "appointment",
              "appointmentresponse",
              "auditevent",
              "basic",
              "binary",
              "biologicallyderivedproduct",
              "bodystructure",
              "bundle",
              "capabilitystatement",
              "careplan",
              "careteam",
              "catalogentry",
              "chargeitem",
              "chargeitemdefinition",
              "citation",
              "claim",
              "claimresponse",
              "clinicalimpression",
              "clinicalusedefinition",
              "codesystem",
              "communication",
              "communicationrequest",
              "compartmentdefinition",
              "composition",
              "conceptmap",
              "condition",
              "consent",
              "contract",
              "coverage",
              "coverageeligibilityrequest",
              "coverageeligibilityresponse",
              "detectedissue",
              "device",
              "devicedefinition",
              "devicemetric",
              "devicerequest",
              "deviceusestatement",
              "diagnosticreport",
              "documentmanifest",
              "documentreference",
              "domainresource",
              "encounter",
              "endpoint",
              "enrollmentrequest",
              "enrollmentresponse",
              "episodeofcare",
              "eventdefinition",
              "evidence",
              "evidencereport",
              "evidencevariable",
              "examplescenario",
              "explanationofbenefit",
              "familymemberhistory",
              "flag",
              "goal",
              "graphdefinition",
              "group",
              "guidanceresponse",
              "healthcareservice",
              "imagingstudy",
              "immunization",
              "immunizationevaluation",
              "immunizationrecommendation",
              "implementationguide",
              "ingredient",
              "insuranceplan",
              "invoice",
              "library",
              "linkage",
              "list",
              "location",
              "manufactureditemdefinition",
              "measure",
              "measurereport",
              "media",
              "medication",
              "medicationadministration",
              "medicationdispense",
              "medicationknowledge",
              "medicationrequest",
              "medicationstatement",
              "medicinalproductdefinition",
              "messagedefinition",
              "messageheader",
              "molecularsequence",
              "namingsystem",
              "nutritionorder",
              "nutritionproduct",
              "observation",
              "observationdefinition",
              "operationdefinition",
              "operationoutcome",
              "organization",
              "organizationaffiliation",
              "packagedproductdefinition",
              "parameters",
              "patient",
              "paymentnotice",
              "paymentreconciliation",
              "person",
              "plandefinition",
              "practitioner",
              "practitionerrole",
              "procedure",
              "provenance",
              "questionnaire",
              "questionnaireresponse",
              "regulatedauthorization",
              "relatedperson",
              "requestgroup",
              "researchdefinition",
              "researchelementdefinition",
              "researchstudy",
              "researchsubject",
              "resource",
              "riskassessment",
              "schedule",
              "searchparameter",
              "servicerequest",
              "slot",
              "specimen",
              "specimendefinition",
              "structuredefinition",
              "structuremap",
              "subscription",
              "subscriptionstatus",
              "subscriptiontopic",
              "substance",
              "substancedefinition",
              "supplydelivery",
              "supplyrequest",
              "task",
              "terminologycapabilities",
              "testreport",
              "testscript",
              "valueset",
              "verificationresult",
              "visionprescription",
            ],
          },
        },
        options: [
          {
            name: "Get",
            value: "get",
            description: "Get by ID",
            action: "Get by ID",
            routing: {
              request: {
                method: "GET",
              },
            },
          },
        ],
        default: "get",
      },

      {
        displayName: "Account ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["account"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the account",
        routing: {
          request: {
            url: "=/Account/{{$value}}",
          },
        },
      },
      {
        displayName: "ActivityDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["activitydefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the activitydefinition",
        routing: {
          request: {
            url: "=/ActivityDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "AdministrableProductDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["administrableproductdefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the administrableproductdefinition",
        routing: {
          request: {
            url: "=/AdministrableProductDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "AdverseEvent ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["adverseevent"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the adverseevent",
        routing: {
          request: {
            url: "=/AdverseEvent/{{$value}}",
          },
        },
      },
      {
        displayName: "AllergyIntolerance ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["allergyintolerance"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the allergyintolerance",
        routing: {
          request: {
            url: "=/AllergyIntolerance/{{$value}}",
          },
        },
      },
      {
        displayName: "Appointment ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["appointment"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the appointment",
        routing: {
          request: {
            url: "=/Appointment/{{$value}}",
          },
        },
      },
      {
        displayName: "AppointmentResponse ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["appointmentresponse"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the appointmentresponse",
        routing: {
          request: {
            url: "=/AppointmentResponse/{{$value}}",
          },
        },
      },
      {
        displayName: "AuditEvent ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["auditevent"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the auditevent",
        routing: {
          request: {
            url: "=/AuditEvent/{{$value}}",
          },
        },
      },
      {
        displayName: "Basic ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["basic"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the basic",
        routing: {
          request: {
            url: "=/Basic/{{$value}}",
          },
        },
      },
      {
        displayName: "Binary ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["binary"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the binary",
        routing: {
          request: {
            url: "=/Binary/{{$value}}",
          },
        },
      },
      {
        displayName: "BiologicallyDerivedProduct ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["biologicallyderivedproduct"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the biologicallyderivedproduct",
        routing: {
          request: {
            url: "=/BiologicallyDerivedProduct/{{$value}}",
          },
        },
      },
      {
        displayName: "BodyStructure ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["bodystructure"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the bodystructure",
        routing: {
          request: {
            url: "=/BodyStructure/{{$value}}",
          },
        },
      },
      {
        displayName: "Bundle ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["bundle"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the bundle",
        routing: {
          request: {
            url: "=/Bundle/{{$value}}",
          },
        },
      },
      {
        displayName: "CapabilityStatement ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["capabilitystatement"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the capabilitystatement",
        routing: {
          request: {
            url: "=/CapabilityStatement/{{$value}}",
          },
        },
      },
      {
        displayName: "CarePlan ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["careplan"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the careplan",
        routing: {
          request: {
            url: "=/CarePlan/{{$value}}",
          },
        },
      },
      {
        displayName: "CareTeam ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["careteam"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the careteam",
        routing: {
          request: {
            url: "=/CareTeam/{{$value}}",
          },
        },
      },
      {
        displayName: "CatalogEntry ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["catalogentry"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the catalogentry",
        routing: {
          request: {
            url: "=/CatalogEntry/{{$value}}",
          },
        },
      },
      {
        displayName: "ChargeItem ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["chargeitem"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the chargeitem",
        routing: {
          request: {
            url: "=/ChargeItem/{{$value}}",
          },
        },
      },
      {
        displayName: "ChargeItemDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["chargeitemdefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the chargeitemdefinition",
        routing: {
          request: {
            url: "=/ChargeItemDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "Citation ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["citation"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the citation",
        routing: {
          request: {
            url: "=/Citation/{{$value}}",
          },
        },
      },
      {
        displayName: "Claim ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["claim"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the claim",
        routing: {
          request: {
            url: "=/Claim/{{$value}}",
          },
        },
      },
      {
        displayName: "ClaimResponse ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["claimresponse"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the claimresponse",
        routing: {
          request: {
            url: "=/ClaimResponse/{{$value}}",
          },
        },
      },
      {
        displayName: "ClinicalImpression ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["clinicalimpression"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the clinicalimpression",
        routing: {
          request: {
            url: "=/ClinicalImpression/{{$value}}",
          },
        },
      },
      {
        displayName: "ClinicalUseDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["clinicalusedefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the clinicalusedefinition",
        routing: {
          request: {
            url: "=/ClinicalUseDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "CodeSystem ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["codesystem"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the codesystem",
        routing: {
          request: {
            url: "=/CodeSystem/{{$value}}",
          },
        },
      },
      {
        displayName: "Communication ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["communication"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the communication",
        routing: {
          request: {
            url: "=/Communication/{{$value}}",
          },
        },
      },
      {
        displayName: "CommunicationRequest ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["communicationrequest"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the communicationrequest",
        routing: {
          request: {
            url: "=/CommunicationRequest/{{$value}}",
          },
        },
      },
      {
        displayName: "CompartmentDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["compartmentdefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the compartmentdefinition",
        routing: {
          request: {
            url: "=/CompartmentDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "Composition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["composition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the composition",
        routing: {
          request: {
            url: "=/Composition/{{$value}}",
          },
        },
      },
      {
        displayName: "ConceptMap ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["conceptmap"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the conceptmap",
        routing: {
          request: {
            url: "=/ConceptMap/{{$value}}",
          },
        },
      },
      {
        displayName: "Condition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["condition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the condition",
        routing: {
          request: {
            url: "=/Condition/{{$value}}",
          },
        },
      },
      {
        displayName: "Consent ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["consent"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the consent",
        routing: {
          request: {
            url: "=/Consent/{{$value}}",
          },
        },
      },
      {
        displayName: "Contract ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["contract"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the contract",
        routing: {
          request: {
            url: "=/Contract/{{$value}}",
          },
        },
      },
      {
        displayName: "Coverage ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["coverage"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the coverage",
        routing: {
          request: {
            url: "=/Coverage/{{$value}}",
          },
        },
      },
      {
        displayName: "CoverageEligibilityRequest ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["coverageeligibilityrequest"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the coverageeligibilityrequest",
        routing: {
          request: {
            url: "=/CoverageEligibilityRequest/{{$value}}",
          },
        },
      },
      {
        displayName: "CoverageEligibilityResponse ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["coverageeligibilityresponse"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the coverageeligibilityresponse",
        routing: {
          request: {
            url: "=/CoverageEligibilityResponse/{{$value}}",
          },
        },
      },
      {
        displayName: "DetectedIssue ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["detectedissue"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the detectedissue",
        routing: {
          request: {
            url: "=/DetectedIssue/{{$value}}",
          },
        },
      },
      {
        displayName: "Device ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["device"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the device",
        routing: {
          request: {
            url: "=/Device/{{$value}}",
          },
        },
      },
      {
        displayName: "DeviceDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["devicedefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the devicedefinition",
        routing: {
          request: {
            url: "=/DeviceDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "DeviceMetric ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["devicemetric"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the devicemetric",
        routing: {
          request: {
            url: "=/DeviceMetric/{{$value}}",
          },
        },
      },
      {
        displayName: "DeviceRequest ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["devicerequest"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the devicerequest",
        routing: {
          request: {
            url: "=/DeviceRequest/{{$value}}",
          },
        },
      },
      {
        displayName: "DeviceUseStatement ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["deviceusestatement"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the deviceusestatement",
        routing: {
          request: {
            url: "=/DeviceUseStatement/{{$value}}",
          },
        },
      },
      {
        displayName: "DiagnosticReport ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["diagnosticreport"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the diagnosticreport",
        routing: {
          request: {
            url: "=/DiagnosticReport/{{$value}}",
          },
        },
      },
      {
        displayName: "DocumentManifest ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["documentmanifest"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the documentmanifest",
        routing: {
          request: {
            url: "=/DocumentManifest/{{$value}}",
          },
        },
      },
      {
        displayName: "DocumentReference ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["documentreference"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the documentreference",
        routing: {
          request: {
            url: "=/DocumentReference/{{$value}}",
          },
        },
      },
      {
        displayName: "DomainResource ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["domainresource"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the domainresource",
        routing: {
          request: {
            url: "=/DomainResource/{{$value}}",
          },
        },
      },
      {
        displayName: "Encounter ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["encounter"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the encounter",
        routing: {
          request: {
            url: "=/Encounter/{{$value}}",
          },
        },
      },
      {
        displayName: "Endpoint ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["endpoint"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the endpoint",
        routing: {
          request: {
            url: "=/Endpoint/{{$value}}",
          },
        },
      },
      {
        displayName: "EnrollmentRequest ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["enrollmentrequest"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the enrollmentrequest",
        routing: {
          request: {
            url: "=/EnrollmentRequest/{{$value}}",
          },
        },
      },
      {
        displayName: "EnrollmentResponse ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["enrollmentresponse"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the enrollmentresponse",
        routing: {
          request: {
            url: "=/EnrollmentResponse/{{$value}}",
          },
        },
      },
      {
        displayName: "EpisodeOfCare ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["episodeofcare"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the episodeofcare",
        routing: {
          request: {
            url: "=/EpisodeOfCare/{{$value}}",
          },
        },
      },
      {
        displayName: "EventDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["eventdefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the eventdefinition",
        routing: {
          request: {
            url: "=/EventDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "Evidence ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["evidence"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the evidence",
        routing: {
          request: {
            url: "=/Evidence/{{$value}}",
          },
        },
      },
      {
        displayName: "EvidenceReport ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["evidencereport"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the evidencereport",
        routing: {
          request: {
            url: "=/EvidenceReport/{{$value}}",
          },
        },
      },
      {
        displayName: "EvidenceVariable ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["evidencevariable"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the evidencevariable",
        routing: {
          request: {
            url: "=/EvidenceVariable/{{$value}}",
          },
        },
      },
      {
        displayName: "ExampleScenario ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["examplescenario"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the examplescenario",
        routing: {
          request: {
            url: "=/ExampleScenario/{{$value}}",
          },
        },
      },
      {
        displayName: "ExplanationOfBenefit ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["explanationofbenefit"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the explanationofbenefit",
        routing: {
          request: {
            url: "=/ExplanationOfBenefit/{{$value}}",
          },
        },
      },
      {
        displayName: "FamilyMemberHistory ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["familymemberhistory"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the familymemberhistory",
        routing: {
          request: {
            url: "=/FamilyMemberHistory/{{$value}}",
          },
        },
      },
      {
        displayName: "Flag ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["flag"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the flag",
        routing: {
          request: {
            url: "=/Flag/{{$value}}",
          },
        },
      },
      {
        displayName: "Goal ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["goal"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the goal",
        routing: {
          request: {
            url: "=/Goal/{{$value}}",
          },
        },
      },
      {
        displayName: "GraphDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["graphdefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the graphdefinition",
        routing: {
          request: {
            url: "=/GraphDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "Group ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["group"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the group",
        routing: {
          request: {
            url: "=/Group/{{$value}}",
          },
        },
      },
      {
        displayName: "GuidanceResponse ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["guidanceresponse"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the guidanceresponse",
        routing: {
          request: {
            url: "=/GuidanceResponse/{{$value}}",
          },
        },
      },
      {
        displayName: "HealthcareService ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["healthcareservice"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the healthcareservice",
        routing: {
          request: {
            url: "=/HealthcareService/{{$value}}",
          },
        },
      },
      {
        displayName: "ImagingStudy ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["imagingstudy"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the imagingstudy",
        routing: {
          request: {
            url: "=/ImagingStudy/{{$value}}",
          },
        },
      },
      {
        displayName: "Immunization ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["immunization"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the immunization",
        routing: {
          request: {
            url: "=/Immunization/{{$value}}",
          },
        },
      },
      {
        displayName: "ImmunizationEvaluation ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["immunizationevaluation"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the immunizationevaluation",
        routing: {
          request: {
            url: "=/ImmunizationEvaluation/{{$value}}",
          },
        },
      },
      {
        displayName: "ImmunizationRecommendation ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["immunizationrecommendation"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the immunizationrecommendation",
        routing: {
          request: {
            url: "=/ImmunizationRecommendation/{{$value}}",
          },
        },
      },
      {
        displayName: "ImplementationGuide ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["implementationguide"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the implementationguide",
        routing: {
          request: {
            url: "=/ImplementationGuide/{{$value}}",
          },
        },
      },
      {
        displayName: "Ingredient ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["ingredient"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the ingredient",
        routing: {
          request: {
            url: "=/Ingredient/{{$value}}",
          },
        },
      },
      {
        displayName: "InsurancePlan ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["insuranceplan"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the insuranceplan",
        routing: {
          request: {
            url: "=/InsurancePlan/{{$value}}",
          },
        },
      },
      {
        displayName: "Invoice ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["invoice"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the invoice",
        routing: {
          request: {
            url: "=/Invoice/{{$value}}",
          },
        },
      },
      {
        displayName: "Library ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["library"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the library",
        routing: {
          request: {
            url: "=/Library/{{$value}}",
          },
        },
      },
      {
        displayName: "Linkage ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["linkage"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the linkage",
        routing: {
          request: {
            url: "=/Linkage/{{$value}}",
          },
        },
      },
      {
        displayName: "List ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["list"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the list",
        routing: {
          request: {
            url: "=/List/{{$value}}",
          },
        },
      },
      {
        displayName: "Location ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["location"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the location",
        routing: {
          request: {
            url: "=/Location/{{$value}}",
          },
        },
      },
      {
        displayName: "ManufacturedItemDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["manufactureditemdefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the manufactureditemdefinition",
        routing: {
          request: {
            url: "=/ManufacturedItemDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "Measure ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["measure"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the measure",
        routing: {
          request: {
            url: "=/Measure/{{$value}}",
          },
        },
      },
      {
        displayName: "MeasureReport ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["measurereport"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the measurereport",
        routing: {
          request: {
            url: "=/MeasureReport/{{$value}}",
          },
        },
      },
      {
        displayName: "Media ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["media"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the media",
        routing: {
          request: {
            url: "=/Media/{{$value}}",
          },
        },
      },
      {
        displayName: "Medication ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["medication"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the medication",
        routing: {
          request: {
            url: "=/Medication/{{$value}}",
          },
        },
      },
      {
        displayName: "MedicationAdministration ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["medicationadministration"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the medicationadministration",
        routing: {
          request: {
            url: "=/MedicationAdministration/{{$value}}",
          },
        },
      },
      {
        displayName: "MedicationDispense ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["medicationdispense"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the medicationdispense",
        routing: {
          request: {
            url: "=/MedicationDispense/{{$value}}",
          },
        },
      },
      {
        displayName: "MedicationKnowledge ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["medicationknowledge"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the medicationknowledge",
        routing: {
          request: {
            url: "=/MedicationKnowledge/{{$value}}",
          },
        },
      },
      {
        displayName: "MedicationRequest ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["medicationrequest"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the medicationrequest",
        routing: {
          request: {
            url: "=/MedicationRequest/{{$value}}",
          },
        },
      },
      {
        displayName: "MedicationStatement ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["medicationstatement"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the medicationstatement",
        routing: {
          request: {
            url: "=/MedicationStatement/{{$value}}",
          },
        },
      },
      {
        displayName: "MedicinalProductDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["medicinalproductdefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the medicinalproductdefinition",
        routing: {
          request: {
            url: "=/MedicinalProductDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "MessageDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["messagedefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the messagedefinition",
        routing: {
          request: {
            url: "=/MessageDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "MessageHeader ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["messageheader"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the messageheader",
        routing: {
          request: {
            url: "=/MessageHeader/{{$value}}",
          },
        },
      },
      {
        displayName: "MolecularSequence ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["molecularsequence"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the molecularsequence",
        routing: {
          request: {
            url: "=/MolecularSequence/{{$value}}",
          },
        },
      },
      {
        displayName: "NamingSystem ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["namingsystem"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the namingsystem",
        routing: {
          request: {
            url: "=/NamingSystem/{{$value}}",
          },
        },
      },
      {
        displayName: "NutritionOrder ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["nutritionorder"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the nutritionorder",
        routing: {
          request: {
            url: "=/NutritionOrder/{{$value}}",
          },
        },
      },
      {
        displayName: "NutritionProduct ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["nutritionproduct"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the nutritionproduct",
        routing: {
          request: {
            url: "=/NutritionProduct/{{$value}}",
          },
        },
      },
      {
        displayName: "Observation ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["observation"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the observation",
        routing: {
          request: {
            url: "=/Observation/{{$value}}",
          },
        },
      },
      {
        displayName: "ObservationDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["observationdefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the observationdefinition",
        routing: {
          request: {
            url: "=/ObservationDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "OperationDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["operationdefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the operationdefinition",
        routing: {
          request: {
            url: "=/OperationDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "OperationOutcome ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["operationoutcome"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the operationoutcome",
        routing: {
          request: {
            url: "=/OperationOutcome/{{$value}}",
          },
        },
      },
      {
        displayName: "Organization ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["organization"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the organization",
        routing: {
          request: {
            url: "=/Organization/{{$value}}",
          },
        },
      },
      {
        displayName: "OrganizationAffiliation ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["organizationaffiliation"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the organizationaffiliation",
        routing: {
          request: {
            url: "=/OrganizationAffiliation/{{$value}}",
          },
        },
      },
      {
        displayName: "PackagedProductDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["packagedproductdefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the packagedproductdefinition",
        routing: {
          request: {
            url: "=/PackagedProductDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "Parameters ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["parameters"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the parameters",
        routing: {
          request: {
            url: "=/Parameters/{{$value}}",
          },
        },
      },
      {
        displayName: "Patient ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["patient"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the patient",
        routing: {
          request: {
            url: "=/Patient/{{$value}}",
          },
        },
      },
      {
        displayName: "PaymentNotice ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["paymentnotice"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the paymentnotice",
        routing: {
          request: {
            url: "=/PaymentNotice/{{$value}}",
          },
        },
      },
      {
        displayName: "PaymentReconciliation ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["paymentreconciliation"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the paymentreconciliation",
        routing: {
          request: {
            url: "=/PaymentReconciliation/{{$value}}",
          },
        },
      },
      {
        displayName: "Person ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["person"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the person",
        routing: {
          request: {
            url: "=/Person/{{$value}}",
          },
        },
      },
      {
        displayName: "PlanDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["plandefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the plandefinition",
        routing: {
          request: {
            url: "=/PlanDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "Practitioner ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["practitioner"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the practitioner",
        routing: {
          request: {
            url: "=/Practitioner/{{$value}}",
          },
        },
      },
      {
        displayName: "PractitionerRole ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["practitionerrole"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the practitionerrole",
        routing: {
          request: {
            url: "=/PractitionerRole/{{$value}}",
          },
        },
      },
      {
        displayName: "Procedure ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["procedure"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the procedure",
        routing: {
          request: {
            url: "=/Procedure/{{$value}}",
          },
        },
      },
      {
        displayName: "Provenance ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["provenance"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the provenance",
        routing: {
          request: {
            url: "=/Provenance/{{$value}}",
          },
        },
      },
      {
        displayName: "Questionnaire ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["questionnaire"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the questionnaire",
        routing: {
          request: {
            url: "=/Questionnaire/{{$value}}",
          },
        },
      },
      {
        displayName: "QuestionnaireResponse ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["questionnaireresponse"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the questionnaireresponse",
        routing: {
          request: {
            url: "=/QuestionnaireResponse/{{$value}}",
          },
        },
      },
      {
        displayName: "RegulatedAuthorization ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["regulatedauthorization"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the regulatedauthorization",
        routing: {
          request: {
            url: "=/RegulatedAuthorization/{{$value}}",
          },
        },
      },
      {
        displayName: "RelatedPerson ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["relatedperson"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the relatedperson",
        routing: {
          request: {
            url: "=/RelatedPerson/{{$value}}",
          },
        },
      },
      {
        displayName: "RequestGroup ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["requestgroup"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the requestgroup",
        routing: {
          request: {
            url: "=/RequestGroup/{{$value}}",
          },
        },
      },
      {
        displayName: "ResearchDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["researchdefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the researchdefinition",
        routing: {
          request: {
            url: "=/ResearchDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "ResearchElementDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["researchelementdefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the researchelementdefinition",
        routing: {
          request: {
            url: "=/ResearchElementDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "ResearchStudy ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["researchstudy"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the researchstudy",
        routing: {
          request: {
            url: "=/ResearchStudy/{{$value}}",
          },
        },
      },
      {
        displayName: "ResearchSubject ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["researchsubject"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the researchsubject",
        routing: {
          request: {
            url: "=/ResearchSubject/{{$value}}",
          },
        },
      },
      {
        displayName: "Resource ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["resource"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the resource",
        routing: {
          request: {
            url: "=/Resource/{{$value}}",
          },
        },
      },
      {
        displayName: "RiskAssessment ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["riskassessment"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the riskassessment",
        routing: {
          request: {
            url: "=/RiskAssessment/{{$value}}",
          },
        },
      },
      {
        displayName: "Schedule ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["schedule"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the schedule",
        routing: {
          request: {
            url: "=/Schedule/{{$value}}",
          },
        },
      },
      {
        displayName: "SearchParameter ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["searchparameter"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the searchparameter",
        routing: {
          request: {
            url: "=/SearchParameter/{{$value}}",
          },
        },
      },
      {
        displayName: "ServiceRequest ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["servicerequest"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the servicerequest",
        routing: {
          request: {
            url: "=/ServiceRequest/{{$value}}",
          },
        },
      },
      {
        displayName: "Slot ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["slot"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the slot",
        routing: {
          request: {
            url: "=/Slot/{{$value}}",
          },
        },
      },
      {
        displayName: "Specimen ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["specimen"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the specimen",
        routing: {
          request: {
            url: "=/Specimen/{{$value}}",
          },
        },
      },
      {
        displayName: "SpecimenDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["specimendefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the specimendefinition",
        routing: {
          request: {
            url: "=/SpecimenDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "StructureDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["structuredefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the structuredefinition",
        routing: {
          request: {
            url: "=/StructureDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "StructureMap ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["structuremap"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the structuremap",
        routing: {
          request: {
            url: "=/StructureMap/{{$value}}",
          },
        },
      },
      {
        displayName: "Subscription ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["subscription"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the subscription",
        routing: {
          request: {
            url: "=/Subscription/{{$value}}",
          },
        },
      },
      {
        displayName: "SubscriptionStatus ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["subscriptionstatus"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the subscriptionstatus",
        routing: {
          request: {
            url: "=/SubscriptionStatus/{{$value}}",
          },
        },
      },
      {
        displayName: "SubscriptionTopic ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["subscriptiontopic"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the subscriptiontopic",
        routing: {
          request: {
            url: "=/SubscriptionTopic/{{$value}}",
          },
        },
      },
      {
        displayName: "Substance ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["substance"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the substance",
        routing: {
          request: {
            url: "=/Substance/{{$value}}",
          },
        },
      },
      {
        displayName: "SubstanceDefinition ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["substancedefinition"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the substancedefinition",
        routing: {
          request: {
            url: "=/SubstanceDefinition/{{$value}}",
          },
        },
      },
      {
        displayName: "SupplyDelivery ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["supplydelivery"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the supplydelivery",
        routing: {
          request: {
            url: "=/SupplyDelivery/{{$value}}",
          },
        },
      },
      {
        displayName: "SupplyRequest ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["supplyrequest"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the supplyrequest",
        routing: {
          request: {
            url: "=/SupplyRequest/{{$value}}",
          },
        },
      },
      {
        displayName: "Task ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["task"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the task",
        routing: {
          request: {
            url: "=/Task/{{$value}}",
          },
        },
      },
      {
        displayName: "TerminologyCapabilities ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["terminologycapabilities"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the terminologycapabilities",
        routing: {
          request: {
            url: "=/TerminologyCapabilities/{{$value}}",
          },
        },
      },
      {
        displayName: "TestReport ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["testreport"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the testreport",
        routing: {
          request: {
            url: "=/TestReport/{{$value}}",
          },
        },
      },
      {
        displayName: "TestScript ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["testscript"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the testscript",
        routing: {
          request: {
            url: "=/TestScript/{{$value}}",
          },
        },
      },
      {
        displayName: "ValueSet ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["valueset"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the valueset",
        routing: {
          request: {
            url: "=/ValueSet/{{$value}}",
          },
        },
      },
      {
        displayName: "VerificationResult ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["verificationresult"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the verificationresult",
        routing: {
          request: {
            url: "=/VerificationResult/{{$value}}",
          },
        },
      },
      {
        displayName: "VisionPrescription ID",
        name: "id",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["get"],
            resource: ["visionprescription"],
          },
        },
        default: "bbc0696a-ba15-4410-b479-4f9963f54712",
        placeholder: "Insert ID here",
        description: "FHIR ID for the visionprescription",
        routing: {
          request: {
            url: "=/VisionPrescription/{{$value}}",
          },
        },
      },
    ],
  };
}
