/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ActivityDefinition,
  AnyResourceType,
  Binary,
  Bundle,
  CanonicalResource,
  CapabilityStatement,
  CodeSystem,
  CodeableConcept,
  Coding,
  ConceptMap,
  Element,
  Identifier,
  Library,
  Measure,
  MeasureReport,
  Meta,
  Observation,
  OperationOutcome,
  Parameters,
  Patient,
  Period,
  PlanDefinition,
  Questionnaire,
  Reference,
  Resource,
  ResourceType,
  Specimen,
  SpecimenDefinition,
  StructureDefinition,
  StructureMap,
  UsageContext,
  ValueSet,
} from "./fhir-types.codegen.js";

export interface OperationParameters {
  operation: string | null | undefined;
  resourceType?: ResourceType | null | undefined;
  resourceId?: string | null | undefined;
  parameters?: object | null | undefined;
  affectsState: boolean;
}

/**
 * Define what an operation is.
 */
export interface Operation<TOperationResult = unknown> {
  /**
   * Get the parameters of the operation.
   */
  getParameters(): OperationParameters;

  /**
   * This methods is a placeholder to preserve type inference for TypeScript.
   * It is necessary for the {@link ExtractOperationResultType} type helper to work properly, otherwise TypeScript
   * erase the generic parameter type.
   * It should systematically throw an error when called.
   */
  _resultTypeDoNotUse?: TOperationResult;
}

/**
 * Extract the result type of an operation.
 */
export type ExtractOperationResultType<T extends Operation> =
  T extends Operation<infer TOperationResult> ? TOperationResult : never;

/**
 * Apply
 *
 * The apply operation applies a definition in a specific context
 * @see {@link http://hl7.org/fhir/OperationDefinition/ActivityDefinition-apply}
 */
export class ActivityDefinitionApplyOperation implements Operation<Resource> {
  /**
   * Apply
   *
   * The apply operation applies a definition in a specific context
   * @see {@link http://hl7.org/fhir/OperationDefinition/ActivityDefinition-apply}
   */
  constructor(public parameters: ActivityDefinitionApplyOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$apply",
      resourceType: "ActivityDefinition",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Resource;
}

export interface ActivityDefinitionApplyOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * The activity definition to apply. If the operation is invoked on an instance,
   * this parameter is not allowed. If the operation is invoked at the type level,
   * this parameter is required
   */
  activityDefinition?: ActivityDefinition | undefined;
  /**
   * The subject(s) that is/are the target of the activity definition to be applied.
   * The subject may be a Patient, Practitioner, Organization, Location, Device, or
   * Group. Subjects provided in this parameter will be resolved as the subject of
   * the PlanDefinition based on the type of the subject. If multiple subjects of the
   * same type are provided, the behavior is implementation-defined
   */
  subject: Array<string>;
  /**
   * The encounter in context, if any
   */
  encounter?: string | undefined;
  /**
   * The practitioner in context
   */
  practitioner?: string | undefined;
  /**
   * The organization in context
   */
  organization?: string | undefined;
  /**
   * The type of user initiating the request, e.g. patient, healthcare provider, or
   * specific type of healthcare provider (physician, nurse, etc.)
   */
  userType?: CodeableConcept | undefined;
  /**
   * Preferred language of the person using the system
   */
  userLanguage?: CodeableConcept | undefined;
  /**
   * The task the system user is performing, e.g. laboratory results review,
   * medication list review, etc. This information can be used to tailor decision
   * support outputs, such as recommended information resources
   */
  userTaskContext?: CodeableConcept | undefined;
  /**
   * The current setting of the request (inpatient, outpatient, etc.)
   */
  setting?: CodeableConcept | undefined;
  /**
   * Additional detail about the setting of the request, if any
   */
  settingContext?: CodeableConcept | undefined;
}

/**
 * Data Requirements
 *
 * The data-requirements operation aggregates and returns the parameters and data
 * requirements for the activity definition and all its dependencies as a single
 * module definition library
 * @see {@link http://hl7.org/fhir/OperationDefinition/ActivityDefinition-data-requirements}
 */
export class ActivityDefinitionDataRequirementsOperation
  implements Operation<Library>
{
  /**
   * Data Requirements
   *
   * The data-requirements operation aggregates and returns the parameters and data
   * requirements for the activity definition and all its dependencies as a single
   * module definition library
   * @see {@link http://hl7.org/fhir/OperationDefinition/ActivityDefinition-data-requirements}
   */
  constructor(
    public parameters: ActivityDefinitionDataRequirementsOperationParameters
  ) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$data-requirements",
      resourceType: "ActivityDefinition",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Library;
}

export interface ActivityDefinitionDataRequirementsOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId: string;
}

/**
 * Fetch the current version of a canonical resource (based on canonical versioning)
 * 
 * Returns the most current version of the canonical resource with the specified
 * url available on the server.  It optionally also allows filtering to only expose
 * the most current version with a particular status or set of statuses.

Note that
 * 'current' is determined by comparing version values using the specified
 * versionAlgorithm, NOT by looking at lastUpdated.
 * @see {@link http://hl7.org/fhir/OperationDefinition/CanonicalResource-current-canonical}
 */
export class CanonicalResourceCurrentCanonicalOperation
  implements Operation<CanonicalResourceCurrentCanonicalOperationResult>
{
  /**
 * Fetch the current version of a canonical resource (based on canonical versioning)
 * 
 * Returns the most current version of the canonical resource with the specified
 * url available on the server.  It optionally also allows filtering to only expose
 * the most current version with a particular status or set of statuses.

Note that
 * 'current' is determined by comparing version values using the specified
 * versionAlgorithm, NOT by looking at lastUpdated.
 * @see {@link http://hl7.org/fhir/OperationDefinition/CanonicalResource-current-canonical}
 */
  constructor(
    public parameters: CanonicalResourceCurrentCanonicalOperationParameters
  ) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$current-canonical",
      resourceType: this.parameters.resourceType,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: CanonicalResourceCurrentCanonicalOperationResult;
}

export interface CanonicalResourceCurrentCanonicalOperationParameters {
  resourceType: AnyResourceType;
  /**
   * This is the canonical URL (with no version declared)
   * @fhirType uri
   */
  url: string;
  /**
   * The statuses to allow to be returned. If no status codes are provided, then any
   * status is ok
   * @fhirType code
   */
  status?: Array<string> | undefined;
}

export interface CanonicalResourceCurrentCanonicalOperationResult {
  /**
   * If no resources can be found, will return nothing.  If multiple resources are
   * found for the specified statuses and 'most current' can't be determined by
   * comparing the versions, the operation will fail with an operation outcome.
   */
  result?: CanonicalResource | undefined;
}

/**
 * Test if a server implements a client's required operations
 *
 * This operation asks the server to check that it implements all the resources,
 * interactions, search parameters, and operations that the client provides in its
 * capability statement. The client provides both capability statements by
 * reference, and must ensure that all the referenced resources are available to
 * the conformance server
 * @see {@link http://hl7.org/fhir/OperationDefinition/CapabilityStatement-conforms}
 */
export class CapabilityStatementConformsOperation
  implements Operation<CapabilityStatementConformsOperationResult>
{
  /**
   * Test if a server implements a client's required operations
   *
   * This operation asks the server to check that it implements all the resources,
   * interactions, search parameters, and operations that the client provides in its
   * capability statement. The client provides both capability statements by
   * reference, and must ensure that all the referenced resources are available to
   * the conformance server
   * @see {@link http://hl7.org/fhir/OperationDefinition/CapabilityStatement-conforms}
   */
  constructor(
    public parameters: CapabilityStatementConformsOperationParameters
  ) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$conforms",
      resourceType: "CapabilityStatement",
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: CapabilityStatementConformsOperationResult;
}

export interface CapabilityStatementConformsOperationParameters {
  /**
   * A canonical reference to the left-hand system's capability statement
   * @fhirType canonical
   */
  left?: string | undefined;
  /**
   * A canonical reference to the right-hand system's capability statement
   * @fhirType canonical
   */
  right?: string | undefined;
  /**
   * What kind of comparison to perform - server to server, or client to server (use
   * the codes 'server/server' or 'client/server')
   * @fhirType code
   */
  mode?: string | undefined;
}

export interface CapabilityStatementConformsOperationResult {
  /**
   * Outcome of the CapabilityStatement test
   */
  issues: OperationOutcome;
  /**
   * The intersection of the functionality described by the CapabilityStatement
   * resources
   */
  union?: CapabilityStatement | undefined;
  /**
   * The union of the functionality described by the CapabilityStatement resources
   */
  intersection?: CapabilityStatement | undefined;
}

/**
 * Test if a server implements a client's required operations
 *
 * This operation asks the server to check that it implements all the resources,
 * interactions, search parameters, and operations that the client provides in its
 * capability statement. The client provides its capability statement inline, or by
 * referring the server to the canonical URL of its capability statement
 * @see {@link http://hl7.org/fhir/OperationDefinition/CapabilityStatement-implements}
 */
export class CapabilityStatementImplementsOperation
  implements Operation<OperationOutcome>
{
  /**
   * Test if a server implements a client's required operations
   *
   * This operation asks the server to check that it implements all the resources,
   * interactions, search parameters, and operations that the client provides in its
   * capability statement. The client provides its capability statement inline, or by
   * referring the server to the canonical URL of its capability statement
   * @see {@link http://hl7.org/fhir/OperationDefinition/CapabilityStatement-implements}
   */
  constructor(
    public parameters: CapabilityStatementImplementsOperationParameters
  ) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$implements",
      resourceType: "CapabilityStatement",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: OperationOutcome;
}

export interface CapabilityStatementImplementsOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * A canonical reference to the server capability statement - use this if the
   * implements is not invoked on an instance (or on the /metadata end-point)
   * @fhirType canonical
   */
  server?: string | undefined;
  /**
   * A canonical reference to the client capability statement - use this if the
   * implements is not invoked on an instance (or on the /metadata end-point)
   * @fhirType canonical
   */
  client?: string | undefined;
  /**
   * The client capability statement, provided inline
   */
  resource?: CapabilityStatement | undefined;
}

/**
 * Fetch a subset of the CapabilityStatement resource
 *
 * This operation asks the server to return a subset of the CapabilityStatement
 * resource - just the REST parts that relate to a set of nominated resources - the
 * resources that the client is interested in
 * @see {@link http://hl7.org/fhir/OperationDefinition/CapabilityStatement-subset}
 */
export class CapabilityStatementSubsetOperation
  implements Operation<CapabilityStatement>
{
  /**
   * Fetch a subset of the CapabilityStatement resource
   *
   * This operation asks the server to return a subset of the CapabilityStatement
   * resource - just the REST parts that relate to a set of nominated resources - the
   * resources that the client is interested in
   * @see {@link http://hl7.org/fhir/OperationDefinition/CapabilityStatement-subset}
   */
  constructor(
    public parameters: CapabilityStatementSubsetOperationParameters
  ) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$subset",
      resourceType: "CapabilityStatement",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: CapabilityStatement;
}

export interface CapabilityStatementSubsetOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * The canonical URL - use this if the subset is not invoked on an instance (or on
   * the /metadata end-point)
   * @fhirType uri
   */
  server?: string | undefined;
  /**
   * A resource that the client would like to include in the return
   * @fhirType code
   */
  resource: Array<string>;
}

/**
 * Discover what versions a server supports
 *
 * Using the [FHIR Version Mime Type Parameter](http.html#version-parameter), a
 * server can support [multiple versions on the same
 * end-point](versioning.html#mt-version). The only way for client to find out what
 * versions a server supports in this fashion is the $versions operation. The
 * client invokes the operation with no parameters. and the server returns the list
 * of supported versions, along with the default version it will use if no
 * fhirVersion parameter is present
 * @see {@link http://hl7.org/fhir/OperationDefinition/CapabilityStatement-versions}
 */
export class CapabilityStatementVersionsOperation
  implements Operation<CapabilityStatementVersionsOperationResult>
{
  /**
   * Discover what versions a server supports
   *
   * Using the [FHIR Version Mime Type Parameter](http.html#version-parameter), a
   * server can support [multiple versions on the same
   * end-point](versioning.html#mt-version). The only way for client to find out what
   * versions a server supports in this fashion is the $versions operation. The
   * client invokes the operation with no parameters. and the server returns the list
   * of supported versions, along with the default version it will use if no
   * fhirVersion parameter is present
   * @see {@link http://hl7.org/fhir/OperationDefinition/CapabilityStatement-versions}
   */

  public getParameters(): OperationParameters {
    return {
      operation: "$versions",
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: CapabilityStatementVersionsOperationResult;
}

export interface CapabilityStatementVersionsOperationResult {
  /**
   * A version supported by the server. Use the major.minor version like 3.0
   * @fhirType code
   */
  version: Array<string>;
  /**
   * The default version for the server. Use the major.minor version like 3.0
   * @fhirType code
   */
  default: string;
}

/**
 * Apply
 *
 * The apply operation applies a definition in a specific context
 * @see {@link http://hl7.org/fhir/OperationDefinition/ChargeItemDefinition-apply}
 */
export class ChargeItemDefinitionApplyOperation implements Operation<Resource> {
  /**
   * Apply
   *
   * The apply operation applies a definition in a specific context
   * @see {@link http://hl7.org/fhir/OperationDefinition/ChargeItemDefinition-apply}
   */
  constructor(
    public parameters: ChargeItemDefinitionApplyOperationParameters
  ) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$apply",
      resourceType: "ChargeItemDefinition",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: true,
    };
  }

  public _resultTypeDoNotUse?: Resource;
}

export interface ChargeItemDefinitionApplyOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId: string;
  /**
   * The ChargeItem on which the definition is to ba applies
   */
  chargeItem: Reference;
  /**
   * The account in context, if any
   */
  account?: Reference | undefined;
}

/**
 * Submit a Claim resource for adjudication
 *
 * This operation is used to submit a Claim, Pre-Authorization or Pre-Determination
 * (all instances of Claim resources) for adjudication either as a single Claim
 * resource instance or as a Bundle containing the Claim and other referenced
 * resources, or Bundle containing a batch of Claim resources, either as single
 * Claims resources or Bundle resources, for processing. The only input parameter
 * is the single Claim or Bundle resource and the only output is a single
 * ClaimResponse, Bundle of ClaimResponses or an OperationOutcome resource.
 * @see {@link http://hl7.org/fhir/OperationDefinition/Claim-submit}
 */
export class ClaimSubmitOperation implements Operation<Resource> {
  /**
   * Submit a Claim resource for adjudication
   *
   * This operation is used to submit a Claim, Pre-Authorization or Pre-Determination
   * (all instances of Claim resources) for adjudication either as a single Claim
   * resource instance or as a Bundle containing the Claim and other referenced
   * resources, or Bundle containing a batch of Claim resources, either as single
   * Claims resources or Bundle resources, for processing. The only input parameter
   * is the single Claim or Bundle resource and the only output is a single
   * ClaimResponse, Bundle of ClaimResponses or an OperationOutcome resource.
   * @see {@link http://hl7.org/fhir/OperationDefinition/Claim-submit}
   */
  constructor(public parameters: ClaimSubmitOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$submit",
      resourceType: "Claim",
      parameters: this.parameters,
      affectsState: true,
    };
  }

  public _resultTypeDoNotUse?: Resource;
}

export interface ClaimSubmitOperationParameters {
  /**
   * A Claim resource or Bundle of claims, either as individual Claim resources or as
   * Bundles each containing a single Claim plus referenced resources.
   */
  resource: Resource;
}

/**
 * Finding codes based on supplied properties
 * 
 * Given a set of properties (and text), return one or more possible matching
 * codes

This operation takes a set of properties, and examines the code system
 * looking for codes in the code system that match a set of known properties.
 * When looking for matches, there are 3 possible types of match:
* a complete
 * match - a code that represents all the provided properties correctly
* a partial
 * match - a code that represents some of the provided properties correctly, and
 * not others 
* a possible match - a code that may represent the provided
 * properties closely, but may capture less or more precise information for some of
 * the properties

The $find-matches operation can be called in one of 2 modes:
*
 * By a human, looking for the best match for a set of properties. In this mode,
 * the server returns a list of complete, possible or partial matches (possibly
 * with comments), so that the user can choose (or not) the most appropriate code
*
 * By a machine (typically in a system interface performing a transformation). In
 * this mode, the server returns only a list of complete and partial matches, but
 * no possible matches. The machine can choose a code from the list (or not) based
 * on what properties are not coded

These modes are differentiated by the 'exact'
 * parameter, so the client can indicate whether it only wants exact matches
 * (including partial matches) or whether potential matches based on text matching
 * are desired
 
The find-matches operation is still preliminary. The interface can
 * be expected to change as more experience is gained from implementations.
 * @see {@link http://hl7.org/fhir/OperationDefinition/CodeSystem-find-matches}
 */
export class CodeSystemFindMatchesOperation
  implements Operation<CodeSystemFindMatchesOperationResult>
{
  /**
 * Finding codes based on supplied properties
 * 
 * Given a set of properties (and text), return one or more possible matching
 * codes

This operation takes a set of properties, and examines the code system
 * looking for codes in the code system that match a set of known properties.
 * When looking for matches, there are 3 possible types of match:
* a complete
 * match - a code that represents all the provided properties correctly
* a partial
 * match - a code that represents some of the provided properties correctly, and
 * not others 
* a possible match - a code that may represent the provided
 * properties closely, but may capture less or more precise information for some of
 * the properties

The $find-matches operation can be called in one of 2 modes:
*
 * By a human, looking for the best match for a set of properties. In this mode,
 * the server returns a list of complete, possible or partial matches (possibly
 * with comments), so that the user can choose (or not) the most appropriate code
*
 * By a machine (typically in a system interface performing a transformation). In
 * this mode, the server returns only a list of complete and partial matches, but
 * no possible matches. The machine can choose a code from the list (or not) based
 * on what properties are not coded

These modes are differentiated by the 'exact'
 * parameter, so the client can indicate whether it only wants exact matches
 * (including partial matches) or whether potential matches based on text matching
 * are desired
 
The find-matches operation is still preliminary. The interface can
 * be expected to change as more experience is gained from implementations.
 * @see {@link http://hl7.org/fhir/OperationDefinition/CodeSystem-find-matches}
 */
  constructor(public parameters: CodeSystemFindMatchesOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$find-matches",
      resourceType: "CodeSystem",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: CodeSystemFindMatchesOperationResult;
}

export interface CodeSystemFindMatchesOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * The system in which composition is to be performed. This must be provided unless
   * the operation is invoked on a code system instance
   * @fhirType uri
   */
  system?: string | undefined;
  /**
   * The version of the system for the inferencing to be performed
   */
  version?: string | undefined;
  /**
   * One or more properties that contain information to be composed into the code
   */
  property?: Array<CodeSystemFindMatchesOperationProperty> | undefined;
  /**
   * Whether the operation is being used by a human ('false'), or a machine ('true').
   * If the operation is being used by a human, the terminology server can return a
   * list of possible matches, with commentary. For a machine, the server returns
   * complete or partial matches, not possible matches. The default value is 'false'
   */
  exact: boolean;
  /**
   * Post-coordinated expressions are allowed to be returned in the matching codes
   * (mainly for SNOMED CT). Default = false
   */
  compositional?: boolean | undefined;
}

export interface CodeSystemFindMatchesOperationResult {
  /**
   * Concepts returned by the server as a result of the inferencing operation
   */
  match?: Array<CodeSystemFindMatchesOperationMatch> | undefined;
}

/**
 * One or more properties that contain information to be composed into the code
 */
export interface CodeSystemFindMatchesOperationProperty {
  /**
   * Identifies the property provided
   * @fhirType code
   */
  code: string;
  /**
   * The value of the property provided
   */
  value?: Element | undefined;
  /**
   * Nested Properties (mainly used for SNOMED CT composition, for relationship
   * Groups)
   */
  subproperty?:
    | Array<CodeSystemFindMatchesOperationPropertySubproperty>
    | undefined;
}

/**
 * Nested Properties (mainly used for SNOMED CT composition, for relationship
 * Groups)
 */
export interface CodeSystemFindMatchesOperationPropertySubproperty {
  /**
   * Identifies the sub-property provided
   * @fhirType code
   */
  code: string;
  /**
   * The value of the sub-property provided
   */
  value: Element;
}

/**
 * Concepts returned by the server as a result of the inferencing operation
 */
export interface CodeSystemFindMatchesOperationMatch {
  /**
   * A code that matches the properties provided
   */
  code: Coding;
  /**
   * One or more properties that contain properties that could not be matched into
   * the code
   */
  unmatched?: Array<CodeSystemFindMatchesOperationMatchUnmatched> | undefined;
  /**
   * Information about the quality of the match, if operation is for a human
   */
  comment?: string | undefined;
}

/**
 * One or more properties that contain properties that could not be matched into
 * the code
 */
export interface CodeSystemFindMatchesOperationMatchUnmatched {
  /**
   * Identifies the property provided
   * @fhirType code
   */
  code: string;
  /**
   * The value of the property provided
   */
  value: Element;
  /**
   * Nested Properties (mainly used for SNOMED CT composition, for relationship
   * Groups)
   */
  property?:
    | Array<CodeSystemFindMatchesOperationMatchUnmatchedProperty>
    | undefined;
}

/**
 * Nested Properties (mainly used for SNOMED CT composition, for relationship
 * Groups)
 */
export interface CodeSystemFindMatchesOperationMatchUnmatchedProperty {
  /**
   * Identifies the sub-property provided
   * @fhirType code
   */
  code: string;
  /**
   * The value of the sub-property provided
   */
  value: Element;
}

/**
 * Concept Look Up & Decomposition
 * 
 * Given a code/system, or a Coding, get additional details about the concept,
 * including definition, status, designations, and properties. One of the products
 * of this operation is a full decomposition of a code from a structured
 * terminology.

When invoking this operation, a client SHALL provide both a system
 * and a code, either using the system+code parameters, or in the coding parameter.
 * Other parameters are optional
 * @see {@link http://hl7.org/fhir/OperationDefinition/CodeSystem-lookup}
 */
export class CodeSystemLookupOperation
  implements Operation<CodeSystemLookupOperationResult>
{
  /**
 * Concept Look Up & Decomposition
 * 
 * Given a code/system, or a Coding, get additional details about the concept,
 * including definition, status, designations, and properties. One of the products
 * of this operation is a full decomposition of a code from a structured
 * terminology.

When invoking this operation, a client SHALL provide both a system
 * and a code, either using the system+code parameters, or in the coding parameter.
 * Other parameters are optional
 * @see {@link http://hl7.org/fhir/OperationDefinition/CodeSystem-lookup}
 */
  constructor(public parameters: CodeSystemLookupOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$lookup",
      resourceType: "CodeSystem",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: CodeSystemLookupOperationResult;
}

export interface CodeSystemLookupOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * The code that is to be located. If a code is provided, a system must be provided
   * @fhirType code
   */
  code?: string | undefined;
  /**
   * The system for the code that is to be located
   * @fhirType uri
   */
  system?: string | undefined;
  /**
   * The version of the system, if one was provided in the source data
   */
  version?: string | undefined;
  /**
   * A coding to look up
   */
  coding?: Coding | undefined;
  /**
   * The date for which the information should be returned. Normally, this is the
   * current conditions (which is the default value) but under some circumstances,
   * systems need to acccess this information as it would have been in the past. A
   * typical example of this would be where code selection is constrained to the set
   * of codes that were available when the patient was treated, not when the record
   * is being edited. Note that which date is appropriate is a matter for
   * implementation policy.
   * @fhirType dateTime
   */
  date?: string | undefined;
  /**
   * The requested language for display (see CodeSystem.concept.designation.language)
   * @fhirType code
   */
  displayLanguage?: string | undefined;
  /**
   * A property that the client wishes to be returned in the output. If no properties
   * are specified, the server chooses what to return. The following properties are
   * defined for all code systems: name, version (code system info) and code
   * information: display, designation, and lang.X where X is a designation language
   * code. These properties are returned explicitly in named out parameters with
   * matching names, or in designations. In addition, any property codes defined by
   * [this specification](codesystem.html#defined-props) or by the CodeSystem
   * ([CodeSystem.property.code](codesystem-definitions.html#CodeSystem.property))
   * are allowed, and these are returned in the out parameter ```property```
   * @fhirType code
   */
  property?: Array<string> | undefined;
  /**
   * Supplements to take into account when performing the $lookup operation. The
   * supplements must be for the same CodeSystem. By default, supplements for the
   * code system are not automatically included except where they provide additional
   * designations that may be indicated by, for example, the displayLanguage
   * parameter
   * @fhirType canonical
   */
  useSupplement?: Array<string> | undefined;
}

export interface CodeSystemLookupOperationResult {
  /**
   * A display name for the code system
   */
  name: string;
  /**
   * The version that these details are based on
   */
  version?: string | undefined;
  /**
   * The preferred display for this concept
   */
  display: string;
  /**
   * A statement of the meaning of the concept from the code system
   */
  definition?: string | undefined;
  /**
   * Additional representations for this concept
   */
  designation?: Array<CodeSystemLookupOperationDesignation> | undefined;
  /**
   * One or more properties that contain additional information about the code,
   * including status. For complex terminologies (e.g. SNOMED CT, LOINC,
   * medications), these properties serve to decompose the code
   */
  property?: Array<CodeSystemLookupOperationProperty> | undefined;
}

/**
 * Additional representations for this concept
 */
export interface CodeSystemLookupOperationDesignation {
  /**
   * The language this designation is defined for
   * @fhirType code
   */
  language?: string | undefined;
  /**
   * A code that details how this designation would be used
   */
  use?: Coding | undefined;
  /**
   * Additional codes that detail how this designation would be used (if there is
   * more than one)
   */
  additionalUse?: Array<Coding> | undefined;
  /**
   * The text value for this designation
   */
  value: string;
}

/**
 * One or more properties that contain additional information about the code,
 * including status. For complex terminologies (e.g. SNOMED CT, LOINC,
 * medications), these properties serve to decompose the code
 */
export interface CodeSystemLookupOperationProperty {
  /**
   * Identifies the property returned
   * @fhirType code
   */
  code: string;
  /**
   * The value of the property returned
   */
  value?: Element | undefined;
  /**
   * Human Readable representation of the property value (e.g. display for a code)
   */
  description?: string | undefined;
  /**
   * If information from a supplement is included as a property (e.g. any additional
   * property or property value), then this parameter must assert the url of the
   * supplement.
   * @fhirType canonical
   */
  source?: string | undefined;
  /**
   * Nested Properties (mainly used for SNOMED CT decomposition, for relationship
   * Groups)
   */
  subproperty?: Array<CodeSystemLookupOperationPropertySubproperty> | undefined;
}

/**
 * Nested Properties (mainly used for SNOMED CT decomposition, for relationship
 * Groups)
 */
export interface CodeSystemLookupOperationPropertySubproperty {
  /**
   * Identifies the sub-property returned
   * @fhirType code
   */
  code: string;
  /**
   * The value of the sub-property returned
   */
  value: Element;
  /**
   * Human Readable representation of the sub-property value (e.g. display for a
   * code)
   */
  description?: string | undefined;
  /**
   * If information from a supplement is included as a subproperty (e.g. any
   * additional subproperty or subproperty value), then this parameter must assert
   * the url of the supplement.
   * @fhirType canonical
   */
  source?: string | undefined;
}

/**
 * Subsumption Testing
 * 
 * Test the subsumption relationship between code/Coding A and code/Coding B given
 * the semantics of subsumption in the underlying code system (see
 * [hierarchyMeaning](codesystem-definitions.html#CodeSystem.hierarchyMeaning)).

W
 * hen invoking this operation, a client SHALL provide both A and B codes, either
 * as code or Coding parameters. The system parameter is required unless the
 * operation is invoked on an instance of a code system resource. Other parameters
 * are optional
 * @see {@link http://hl7.org/fhir/OperationDefinition/CodeSystem-subsumes}
 */
export class CodeSystemSubsumesOperation
  implements Operation<CodeSystemSubsumesOperationResult>
{
  /**
 * Subsumption Testing
 * 
 * Test the subsumption relationship between code/Coding A and code/Coding B given
 * the semantics of subsumption in the underlying code system (see
 * [hierarchyMeaning](codesystem-definitions.html#CodeSystem.hierarchyMeaning)).

W
 * hen invoking this operation, a client SHALL provide both A and B codes, either
 * as code or Coding parameters. The system parameter is required unless the
 * operation is invoked on an instance of a code system resource. Other parameters
 * are optional
 * @see {@link http://hl7.org/fhir/OperationDefinition/CodeSystem-subsumes}
 */
  constructor(public parameters: CodeSystemSubsumesOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$subsumes",
      resourceType: "CodeSystem",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: CodeSystemSubsumesOperationResult;
}

export interface CodeSystemSubsumesOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * The "A" code that is to be tested. If a code is provided, a system must be
   * provided
   * @fhirType code
   */
  codeA?: string | undefined;
  /**
   * The "B" code that is to be tested. If a code is provided, a system must be
   * provided
   * @fhirType code
   */
  codeB?: string | undefined;
  /**
   * The code system in which subsumption testing is to be performed. This must be
   * provided unless the operation is invoked on a code system instance
   * @fhirType uri
   */
  system?: string | undefined;
  /**
   * The version of the code system, if one was provided in the source data
   */
  version?: string | undefined;
  /**
   * The "A" Coding that is to be tested. The code system does not have to match the
   * specified subsumption code system, but the relationships between the code
   * systems must be well established
   */
  codingA?: Coding | undefined;
  /**
   * The "B" Coding that is to be tested. The code system does not have to match the
   * specified subsumption code system, but the relationships between the code
   * systems must be well established
   */
  codingB?: Coding | undefined;
}

export interface CodeSystemSubsumesOperationResult {
  /**
   * The subsumption relationship between code/Coding "A" and code/Coding "B". There
   * are 4 possible codes to be returned (equivalent, subsumes, subsumed-by, and
   * not-subsumed) as defined in the concept-subsumption-outcome value set.  If the
   * server is unable to determine the relationship between the codes/Codings, then
   * it returns an error response with an OperationOutcome.
   * @fhirType code
   */
  outcome: string;
}

/**
 * Code System based Validation
 * 
 * Validate that a coded value is in the code system. If the operation is not
 * called at the instance level, one of the parameters "url" or "codeSystem" must
 * be provided. The operation returns a result (true / false), an error message,
 * and the recommended display for the code.

When invoking this operation, a
 * client **SHALL** provide one (and only one) of the parameters (code+system,
 * coding, or codeableConcept). Other parameters (including version and display)
 * are optional. When validating a code or a coding, then the code, system and
 * version output parameters **SHOULD** be populated when possible. When a
 * validating a CodeableConcept, then the codeableConcept output parameter
 * **SHOULD** be populated when possible.
 * @see {@link http://hl7.org/fhir/OperationDefinition/CodeSystem-validate-code}
 */
export class CodeSystemValidateCodeOperation
  implements Operation<CodeSystemValidateCodeOperationResult>
{
  /**
 * Code System based Validation
 * 
 * Validate that a coded value is in the code system. If the operation is not
 * called at the instance level, one of the parameters "url" or "codeSystem" must
 * be provided. The operation returns a result (true / false), an error message,
 * and the recommended display for the code.

When invoking this operation, a
 * client **SHALL** provide one (and only one) of the parameters (code+system,
 * coding, or codeableConcept). Other parameters (including version and display)
 * are optional. When validating a code or a coding, then the code, system and
 * version output parameters **SHOULD** be populated when possible. When a
 * validating a CodeableConcept, then the codeableConcept output parameter
 * **SHOULD** be populated when possible.
 * @see {@link http://hl7.org/fhir/OperationDefinition/CodeSystem-validate-code}
 */
  constructor(public parameters: CodeSystemValidateCodeOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$validate-code",
      resourceType: "CodeSystem",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: CodeSystemValidateCodeOperationResult;
}

export interface CodeSystemValidateCodeOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * CodeSystem URL. The server must know the code system (e.g. it is defined
   * explicitly in the server'scode systems, or it is known implicitly by the server
   * @fhirType uri
   */
  url?: string | undefined;
  /**
   * The codeSystem is provided directly as part of the request. Servers may choose
   * not to accept code systems in this fashion. This parameter is used when the
   * client wants the server to check against a code system that is not stored on the
   * server
   */
  codeSystem?: CodeSystem | undefined;
  /**
   * The code that is to be validated
   * @fhirType code
   */
  code?: string | undefined;
  /**
   * The version of the code system, if one was provided in the source data
   */
  version?: string | undefined;
  /**
   * The display associated with the code, if provided. If a display is provided a
   * code must be provided. If no display is provided, the server cannot validate the
   * display value, but may choose to return a recommended display name in an
   * extension in the outcome. Whether displays are case sensitive is code system
   * dependent
   */
  display?: string | undefined;
  /**
   * A coding to validate. The system must match the specified code system
   */
  coding?: Coding | undefined;
  /**
   * A full codeableConcept to validate. The server returns true if one of the coding
   * values is in the code system, and may also validate that the codings are not in
   * conflict with each other if more than one is present
   */
  codeableConcept?: CodeableConcept | undefined;
  /**
   * The date for which the validation should be checked. Normally, this is the
   * current conditions (which is the default values) but under some circumstances,
   * systems need to validate that a correct code was used at some point in the past.
   * A typical example of this would be where code selection is constrained to the
   * set of codes that were available when the patient was treated, not when the
   * record is being edited. Note that which date is appropriate is a matter for
   * implementation policy.
   * @fhirType dateTime
   */
  date?: string | undefined;
  /**
 * If this parameter has a value of true, the client is stating that the validation
 * is being performed in a context where a concept designated as 'abstract' is
 * appropriate/allowed to be used, and the server should regard abstract codes as
 * valid. If this parameter is false, abstract codes are not considered to be
 * valid.

Note that. 'abstract' is a property defined by many HL7 code systems
 * that indicates that the concept is a logical grouping concept that is not
 * intended to be used asa 'concrete' concept to in an actual patient/care/process
 * record. This language is borrowed from Object Orienated theory where 'asbtract'
 * objects are never instantiated. However in the general record and terminology
 * eco-system, there are many contexts where it is appropraite to use these codes
 * e.g. as decision making criterion, or when editing value sets themselves. This
 * parameter allows a client to indicate to the server that it is working in such a
 * context.
 */
  abstract?: boolean | undefined;
  /**
   * Specifies the language to be used for description when validating the display
   * property
   * @fhirType code
   */
  displayLanguage?: string | undefined;
}

export interface CodeSystemValidateCodeOperationResult {
  /**
   * True if the concept details supplied are valid
   */
  result: boolean;
  /**
   * Error details, if result = false. If this is provided when result = true, the
   * message carries hints and warnings
   */
  message?: string | undefined;
  /**
   * A valid display for the concept if the system wishes to display this to a user
   */
  display?: string | undefined;
  /**
   * The code that was validated
   * @fhirType code
   */
  code?: string | undefined;
  /**
   * The system for the code that was validated
   * @fhirType uri
   */
  system?: string | undefined;
  /**
   * The version of the system of the code that was validated
   */
  version?: string | undefined;
  /**
   * A codeableConcept containing codings for all the validated codes
   */
  codeableConcept?: CodeableConcept | undefined;
  /**
   * List of itemised issues with paths constrained to simple FHIRPath. Examples are
   * CodeableConcept, CodeableConcept.coding[0], CodeableConcept.coding[1].display,
   * or Coding.display
   */
  issues?: OperationOutcome | undefined;
}

/**
 * Generate a Document
 *
 * A client can ask a server to generate a fully bundled document from a
 * composition resource. The server takes the composition resource, locates all the
 * referenced resources and other additional resources as configured or requested
 * and either returns a full document bundle, or returns an error. If some of the
 * resources are located on other servers, it is at the discretion of the  server
 * whether to retrieve them or return an error. If the correct version of the
 * document  that would be generated already exists, then the server can return the
 * existing one.
 * @see {@link http://hl7.org/fhir/OperationDefinition/Composition-document}
 */
export class CompositionDocumentOperation implements Operation<Bundle> {
  /**
   * Generate a Document
   *
   * A client can ask a server to generate a fully bundled document from a
   * composition resource. The server takes the composition resource, locates all the
   * referenced resources and other additional resources as configured or requested
   * and either returns a full document bundle, or returns an error. If some of the
   * resources are located on other servers, it is at the discretion of the  server
   * whether to retrieve them or return an error. If the correct version of the
   * document  that would be generated already exists, then the server can return the
   * existing one.
   * @see {@link http://hl7.org/fhir/OperationDefinition/Composition-document}
   */
  constructor(public parameters: CompositionDocumentOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$document",
      resourceType: "Composition",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Bundle;
}

export interface CompositionDocumentOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId: string;
  /**
   * Whether to store the document at the bundle end-point (/Bundle) or not once it
   * is generated. Value = true or false (default is for the server to decide). If
   * the document is stored, its location can be inferred from the Bundle.id, but it
   * SHOULD be provided explicitly in the HTTP Location header in the response
   */
  persist?: boolean | undefined;
  /**
   * Canonical reference to a GraphDefinition. If a URL is provided, it is the
   * canonical reference to a [GraphDefinition](graphdefinition.html) that it
   * controls what resources are to be added to the bundle when building the
   * document. The GraphDefinition can also specify profiles that apply to the
   * various resources
   * @fhirType uri
   */
  graph?: string | undefined;
}

/**
 * Closure Table Maintenance
 *
 * This operation provides support for ongoing maintenance of a client-side
 * [transitive closure
 * table](https://en.wikipedia.org/wiki/Transitive_closure#In_graph_theory) based
 * on server-side terminological logic. For details of how this is used, see
 * [Maintaining a Closure Table](terminology-service.html#closure)
 * @see {@link http://hl7.org/fhir/OperationDefinition/ConceptMap-closure}
 */
export class ConceptMapClosureOperation implements Operation<ConceptMap> {
  /**
   * Closure Table Maintenance
   *
   * This operation provides support for ongoing maintenance of a client-side
   * [transitive closure
   * table](https://en.wikipedia.org/wiki/Transitive_closure#In_graph_theory) based
   * on server-side terminological logic. For details of how this is used, see
   * [Maintaining a Closure Table](terminology-service.html#closure)
   * @see {@link http://hl7.org/fhir/OperationDefinition/ConceptMap-closure}
   */
  constructor(public parameters: ConceptMapClosureOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$closure",
      parameters: this.parameters,
      affectsState: true,
    };
  }

  public _resultTypeDoNotUse?: ConceptMap;
}

export interface ConceptMapClosureOperationParameters {
  /**
   * The name that defines the particular context for the subsumption based closure
   * table
   */
  name: string;
  /**
   * Concepts to add to the closure table
   */
  concept?: Array<Coding> | undefined;
  /**
   * A request to resynchronise - request to send all new entries since the nominated
   * version was sent by the server
   */
  version?: string | undefined;
}

/**
 * Concept Translation
 * 
 * Translate a code from one value set to another, based on the specified
 * ConceptMap resource. If no ConceptMap resource is specified, then other
 * additional knowledge available to the server may be used. 

 One (and only
 * one) of the in parameters (sourceCode, sourceCoding, sourceCodeableConcept,
 * targetCode, targetCoding, or targetCodeableConcept) SHALL be provided, to
 * identify the code that is to be translated.  

 The operation returns a set of
 * parameters including a 'result' for whether there is an acceptable match, and a
 * list of possible matches. Note that the list of matches may include notes of
 * codes for which mapping is specifically excluded (i.e. 'not-related-to'), so
 * implementers have to check the target.relationship for each match. If a source*
 * parameter is provided, the $translate operation will return all matches whereby
 * the provided source concept is the source of a mapping relationship (in a
 * specified ConceptMap or otherwise known to the server). If a target* parameter
 * is provided, the $translate operation will return all matches whereby the
 * provided target concept is the target of a mapping relationship (in a specified
 * ConceptMap or otherwise known to the server). Note: The source value set is an
 * optional parameter because in some cases, the client cannot know what the source
 * value set is. However, without a source value set, the server may be unable to
 * safely identify an applicable concept map, and would return an error. For this
 * reason, a source value set SHOULD always be provided. Note that servers may be
 * able to identify an appropriate concept map without a source value set if there
 * is a full mapping for the entire code system in the concept map, or by manual
 * intervention.
 * @see {@link http://hl7.org/fhir/OperationDefinition/ConceptMap-translate}
 */
export class ConceptMapTranslateOperation
  implements Operation<ConceptMapTranslateOperationResult>
{
  /**
 * Concept Translation
 * 
 * Translate a code from one value set to another, based on the specified
 * ConceptMap resource. If no ConceptMap resource is specified, then other
 * additional knowledge available to the server may be used. 

 One (and only
 * one) of the in parameters (sourceCode, sourceCoding, sourceCodeableConcept,
 * targetCode, targetCoding, or targetCodeableConcept) SHALL be provided, to
 * identify the code that is to be translated.  

 The operation returns a set of
 * parameters including a 'result' for whether there is an acceptable match, and a
 * list of possible matches. Note that the list of matches may include notes of
 * codes for which mapping is specifically excluded (i.e. 'not-related-to'), so
 * implementers have to check the target.relationship for each match. If a source*
 * parameter is provided, the $translate operation will return all matches whereby
 * the provided source concept is the source of a mapping relationship (in a
 * specified ConceptMap or otherwise known to the server). If a target* parameter
 * is provided, the $translate operation will return all matches whereby the
 * provided target concept is the target of a mapping relationship (in a specified
 * ConceptMap or otherwise known to the server). Note: The source value set is an
 * optional parameter because in some cases, the client cannot know what the source
 * value set is. However, without a source value set, the server may be unable to
 * safely identify an applicable concept map, and would return an error. For this
 * reason, a source value set SHOULD always be provided. Note that servers may be
 * able to identify an appropriate concept map without a source value set if there
 * is a full mapping for the entire code system in the concept map, or by manual
 * intervention.
 * @see {@link http://hl7.org/fhir/OperationDefinition/ConceptMap-translate}
 */
  constructor(public parameters: ConceptMapTranslateOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$translate",
      resourceType: "ConceptMap",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: ConceptMapTranslateOperationResult;
}

export interface ConceptMapTranslateOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * A canonical URL for a concept map. The server must know the concept map (e.g. it
   * is defined explicitly in the server's concept maps, or it is defined implicitly
   * by some code system known to the server.
   * @fhirType uri
   */
  url?: string | undefined;
  /**
   * The concept map is provided directly as part of the request. Servers may choose
   * not to accept concept maps in this fashion.
   */
  conceptMap?: ConceptMap | undefined;
  /**
   * The identifier that is used to identify a specific version of the concept map to
   * be used for the translation. This is an arbitrary value managed by the concept
   * map author and is not expected to be globally unique. For example, it might be a
   * timestamp (e.g. yyyymmdd) if a managed version is not available.
   */
  conceptMapVersion?: string | undefined;
  /**
   * The code that is to be translated. If a code is provided, a system must be
   * provided
   * @fhirType code
   */
  sourceCode?: string | undefined;
  /**
   * The system for the code that is to be translated
   * @fhirType uri
   */
  system?: string | undefined;
  /**
   * The version of the system, if one was provided in the source data
   */
  version?: string | undefined;
  /**
   * Limits the scope of the $translate operation to source codes
   * (ConceptMap.group.element.code) that are members of this value set.
   * @fhirType uri
   */
  sourceScope?: string | undefined;
  /**
   * A coding to translate
   */
  sourceCoding?: Coding | undefined;
  /**
   * A full codeableConcept to validate. The server can translate any of the coding
   * values (e.g. existing translations) as it chooses
   */
  sourceCodeableConcept?: CodeableConcept | undefined;
  /**
   * The target code that is to be translated to. If a code is provided, a system
   * must be provided
   * @fhirType uri
   */
  targetCode?: string | undefined;
  /**
   * A target coding to translate to
   * @fhirType uri
   */
  targetCoding?: string | undefined;
  /**
   * A full codeableConcept to validate. The server can translate any of the coding
   * values (e.g. existing translations) as it chooses
   * @fhirType uri
   */
  targetCodeableConcept?: string | undefined;
  /**
   * Limits the scope of the $translate operation to target codes
   * (ConceptMap.group.element.target.code) that are members of this value set.
   * @fhirType uri
   */
  targetScope?: string | undefined;
  /**
   * identifies a target code system in which a mapping is sought. This parameter is
   * an alternative to the targetScope parameter - only one is required. Searching
   * for any translation to a target code system irrespective of the context (e.g.
   * target valueset) may lead to unsafe results, and it is at the discretion of the
   * server to decide when to support this operation
   * @fhirType uri
   */
  targetSystem?: string | undefined;
  /**
   * Data from another attribute that may help produce the correct mapping
   */
  dependency?: Array<ConceptMapTranslateOperationDependency> | undefined;
}

export interface ConceptMapTranslateOperationResult {
  /**
   * True if the concept could be translated successfully. The value can only be true
   * if at least one returned match has a relationship other than 'not-related-to'.
   */
  result: boolean;
  /**
   * Error details, for display to a human. If this is provided when result = true,
   * the message carries hints and warnings (e.g. a note that the matches could be
   * improved by providing additional detail)
   */
  message?: string | undefined;
  /**
   * A concept in the target value set with a relationship. Note that there may be
   * multiple matches of equal or differing relationships, and the matches may
   * include the 'not-related-to' relationship value which means that there is no
   * translation
   */
  match?: Array<ConceptMapTranslateOperationMatch> | undefined;
}

/**
 * Data from another attribute that may help produce the correct mapping
 */
export interface ConceptMapTranslateOperationDependency {
  /**
   * The attribute for this dependency
   * @fhirType uri
   */
  attribute?: string | undefined;
  /**
   * The data value for this dependency
   */
  value?: Element | undefined;
}

/**
 * A concept in the target value set with a relationship. Note that there may be
 * multiple matches of equal or differing relationships, and the matches may
 * include the 'not-related-to' relationship value which means that there is no
 * translation
 */
export interface ConceptMapTranslateOperationMatch {
  /**
   * A code indicating the relationship (e.g., equivalent) of the translation, using
   * values from [ConceptMapRelationship](valueset-concept-map-relationship.html)
   * @fhirType code
   */
  relationship?: string | undefined;
  /**
   * The translation outcome. Note that this would never have userSelected = true,
   * since the process of translations implies that the user is not selecting the
   * code (and only the client could know differently)
   */
  concept?: Coding | undefined;
  /**
   * A property of this mapping (may be used to supply for example, mapping priority,
   * provenance, presentation hints, flag as experimental, and additional
   * documentation)
   */
  property?: Array<ConceptMapTranslateOperationMatchProperty> | undefined;
  /**
   * A data value to go in an attribute that is the product of this mapping
   */
  product?: Array<ConceptMapTranslateOperationMatchProduct> | undefined;
  /**
   * An data value in an additional attribute that this mapping depends on
   */
  dependsOn?: Array<ConceptMapTranslateOperationMatchDependsOn> | undefined;
  /**
   * The canonical reference to the concept map from which this mapping comes from
   * @fhirType uri
   */
  originMap?: string | undefined;
}

/**
 * A property of this mapping (may be used to supply for example, mapping priority,
 * provenance, presentation hints, flag as experimental, and additional
 * documentation)
 */
export interface ConceptMapTranslateOperationMatchProperty {
  /**
   * The uri that identifies the property
   * @fhirType uri
   */
  uri: string;
  /**
   * The value of the property
   */
  value: Element;
}

/**
 * A data value to go in an attribute that is the product of this mapping
 */
export interface ConceptMapTranslateOperationMatchProduct {
  /**
   * The attribute for this product
   * @fhirType uri
   */
  attribute: string;
  /**
   * The value for this product
   */
  value: Element;
}

/**
 * An data value in an additional attribute that this mapping depends on
 */
export interface ConceptMapTranslateOperationMatchDependsOn {
  /**
   * The attribute for this product
   * @fhirType uri
   */
  attribute: string;
  /**
   * The value for this product
   */
  value: Element;
}

/**
 * Submit an EligibilityRequest resource for assessment
 *
 * This operation is used to submit an EligibilityRequest for assessment either as
 * a single EligibilityRequest resource instance or as a Bundle containing the
 * EligibilityRequest and other referenced resources, or Bundle containing a batch
 * of EligibilityRequest resources, either as single EligibilityRequests resources
 * or Bundle resources, for processing. The only input parameter is the single
 * EligibilityRequest or Bundle resource and the only output is a single
 * EligibilityResponse, Bundle of EligibilityResponses or an OperationOutcome
 * resource.
 * @see {@link http://hl7.org/fhir/OperationDefinition/CoverageEligibilityRequest-submit}
 */
export class CoverageEligibilityRequestSubmitOperation
  implements Operation<Resource>
{
  /**
   * Submit an EligibilityRequest resource for assessment
   *
   * This operation is used to submit an EligibilityRequest for assessment either as
   * a single EligibilityRequest resource instance or as a Bundle containing the
   * EligibilityRequest and other referenced resources, or Bundle containing a batch
   * of EligibilityRequest resources, either as single EligibilityRequests resources
   * or Bundle resources, for processing. The only input parameter is the single
   * EligibilityRequest or Bundle resource and the only output is a single
   * EligibilityResponse, Bundle of EligibilityResponses or an OperationOutcome
   * resource.
   * @see {@link http://hl7.org/fhir/OperationDefinition/CoverageEligibilityRequest-submit}
   */
  constructor(
    public parameters: CoverageEligibilityRequestSubmitOperationParameters
  ) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$submit",
      resourceType: "CoverageEligibilityRequest",
      parameters: this.parameters,
      affectsState: true,
    };
  }

  public _resultTypeDoNotUse?: Resource;
}

export interface CoverageEligibilityRequestSubmitOperationParameters {
  /**
   * An EligibilityRequest resource or Bundle of EligibilityRequests, either as
   * individual EligibilityRequest resources or as Bundles each containing a single
   * EligibilityRequest plus referenced resources.
   */
  resource: Resource;
}

/**
 * Fetch DocumentReference
 * 
 * This operation is used to return all the references to documents related to a
 * patient. 

 The operation requires a patient id and takes the optional input
 * parameters: 
  - start date
  - end date
  - document type 

 and returns a
 * [Bundle](bundle.html) of type "searchset" containing
 * [DocumentReference](documentreference.html) resources for the patient. If the
 * server has or can create documents that are related to the patient, and that are
 * available for the given user, the server returns the DocumentReference resources
 * needed to support the records.  The principle intended use for this operation is
 * to provide a provider or patient with access to their available document
 * information. 

 This operation is *different* from a search by patient and type
 * and date range because: 

 1. It is used to request a server to *generate* a
 * document based on the specified parameters. 

 1. If no parameters are
 * specified, the server SHALL return a DocumentReference to the patient's most
 * current CCD 

 1. If the server cannot *generate* a document based on the
 * specified parameters, the operation will return an empty search bundle. 

 This
 * operation is the *same* as a FHIR RESTful search by patient, type and date range
 * because: 

 1. References for *existing* documents that meet the requirements of
 * the request SHOULD also be returned unless the client indicates they are only
 * interested in 'on-demand' documents using the *on-demand* parameter.
 * @see {@link http://hl7.org/fhir/OperationDefinition/DocumentReference-docref}
 */
export class DocumentReferenceDocrefOperation implements Operation<Bundle> {
  /**
 * Fetch DocumentReference
 * 
 * This operation is used to return all the references to documents related to a
 * patient. 

 The operation requires a patient id and takes the optional input
 * parameters: 
  - start date
  - end date
  - document type 

 and returns a
 * [Bundle](bundle.html) of type "searchset" containing
 * [DocumentReference](documentreference.html) resources for the patient. If the
 * server has or can create documents that are related to the patient, and that are
 * available for the given user, the server returns the DocumentReference resources
 * needed to support the records.  The principle intended use for this operation is
 * to provide a provider or patient with access to their available document
 * information. 

 This operation is *different* from a search by patient and type
 * and date range because: 

 1. It is used to request a server to *generate* a
 * document based on the specified parameters. 

 1. If no parameters are
 * specified, the server SHALL return a DocumentReference to the patient's most
 * current CCD 

 1. If the server cannot *generate* a document based on the
 * specified parameters, the operation will return an empty search bundle. 

 This
 * operation is the *same* as a FHIR RESTful search by patient, type and date range
 * because: 

 1. References for *existing* documents that meet the requirements of
 * the request SHOULD also be returned unless the client indicates they are only
 * interested in 'on-demand' documents using the *on-demand* parameter.
 * @see {@link http://hl7.org/fhir/OperationDefinition/DocumentReference-docref}
 */
  constructor(public parameters: DocumentReferenceDocrefOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$docref",
      resourceType: "DocumentReference",
      parameters: this.parameters,
      affectsState: true,
    };
  }

  public _resultTypeDoNotUse?: Bundle;
}

export interface DocumentReferenceDocrefOperationParameters {
  /**
   * The id of the patient resource located on the server on which this operation is
   * executed.  If there is no match, an empty Bundle is returned
   * @fhirType id
   */
  patient: string;
  /**
   * The date range relates to care dates, not record currency dates - e.g. all
   * records relating to care provided in a certain date range. If no start date is
   * provided, all documents prior to the end date are in scope.  If neither a start
   * date nor an end date is provided, the most recent or current document is in
   * scope.  The client **SHOULD** provide values precise to the second + time
   * offset.
   * @fhirType dateTime
   */
  start?: string | undefined;
  /**
   * The date range relates to care dates, not record currency dates - e.g. all
   * records relating to care provided in a certain date range. If no end date is
   * provided, all documents subsequent to the start date are in scope. If neither a
   * start date nor an end date is provided, the most recent or current document is
   * in scope.  The client **SHOULD** provide values precise to the second + time
   * offset.
   * @fhirType dateTime
   */
  end?: string | undefined;
  /**
   * The type relates to document type e.g. for the LOINC code for a C-CDA Clinical
   * Summary of Care (CCD) is 34133-9 (Summary of episode note). If no type is
   * provided, the CCD document, if available, SHALL be in scope and all other
   * document types MAY be in scope
   */
  type?: CodeableConcept | undefined;
  /**
   * This on-demand parameter allows client to dictate whether they are requesting
   * only 'on-demand' or both 'on-demand' and 'stable' documents (or delayed/deferred
   * assembly) that meet the query parameters
   */
  "on-demand"?: boolean | undefined;
}

/**
 * Generate a DocumentReference from a document
 * 
 * A client can ask a server to generate a document reference from a document.
The
 * server reads the existing document and generates a matching
 * DocumentReference
resource, or returns one it has previously generated. Servers
 * may be able to 
return or generate document references for the following types
 * of content:
 * @see {@link http://hl7.org/fhir/OperationDefinition/DocumentReference-generate}
 */
export class DocumentReferenceGenerateOperation implements Operation<Bundle> {
  /**
 * Generate a DocumentReference from a document
 * 
 * A client can ask a server to generate a document reference from a document.
The
 * server reads the existing document and generates a matching
 * DocumentReference
resource, or returns one it has previously generated. Servers
 * may be able to 
return or generate document references for the following types
 * of content:
 * @see {@link http://hl7.org/fhir/OperationDefinition/DocumentReference-generate}
 */
  constructor(
    public parameters: DocumentReferenceGenerateOperationParameters
  ) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$generate",
      resourceType: "DocumentReference",
      parameters: this.parameters,
      affectsState: true,
    };
  }

  public _resultTypeDoNotUse?: Bundle;
}

export interface DocumentReferenceGenerateOperationParameters {
  /**
   * The URL to the source document. This may be a general URL or a Binary or a
   * Composition or a Bundle.
   * @fhirType uri
   */
  url: string;
  /**
   * Whether to store the document at the document end-point (/Document) or not, once
   * it is generated (default is for the server to decide).
   */
  persist?: boolean | undefined;
}

/**
 * Fetch Encounter Record
 * 
 * This operation is used to return all the information related to an encounter
 * described in the resource on which this operation is invoked. The response is a
 * bundle of type "searchset". At a minimum, the encounter resource itself is
 * returned, along with any other resources that the server has available for the
 * given encounter for the user. The server also returns whatever resources are
 * needed to support the records - e.g. linked practitioners, locations,
 * organizations etc. The principle intended use for this operation is to provide a
 * patient with access to their record, or to allow a client to retrieve everything
 * for an encounter for efficient display).

The server SHOULD return all resources
 * it has that:

* are included in the encounter compartment for the identified
 * encounter (have a reference to the encounter)
* are referenced by the standard
 * extenstion for associating an encounter (where no reference element exists)
 * http://hl7.org/fhir/StructureDefinition/encounter-associatedEncounter
* the
 * server believes are relevant to the context of the encounter for any other
 * reason (internally defined/decided)
* any resource referenced by the above,
 * including binaries and attachments (to make a more complete package)

In the US
 * Realm, at a mimimum, the resources returned SHALL include all the data covered
 * by the meaningful use common data elements (see
 * [DAF](http://hl7.org/fhir/us/daf) for further guidance). Other applicable
 * implementation guides may make additional rules about the information that is
 * returned.   Note that for many resources, the exact nature of the link to
 * encounter can be ambiguous (e.g. for a DiagnosticReport, is it the encounter
 * when it was initiated, or when it was reported?)
 * @see {@link http://hl7.org/fhir/OperationDefinition/Encounter-everything}
 */
export class EncounterEverythingOperation implements Operation<Bundle> {
  /**
 * Fetch Encounter Record
 * 
 * This operation is used to return all the information related to an encounter
 * described in the resource on which this operation is invoked. The response is a
 * bundle of type "searchset". At a minimum, the encounter resource itself is
 * returned, along with any other resources that the server has available for the
 * given encounter for the user. The server also returns whatever resources are
 * needed to support the records - e.g. linked practitioners, locations,
 * organizations etc. The principle intended use for this operation is to provide a
 * patient with access to their record, or to allow a client to retrieve everything
 * for an encounter for efficient display).

The server SHOULD return all resources
 * it has that:

* are included in the encounter compartment for the identified
 * encounter (have a reference to the encounter)
* are referenced by the standard
 * extenstion for associating an encounter (where no reference element exists)
 * http://hl7.org/fhir/StructureDefinition/encounter-associatedEncounter
* the
 * server believes are relevant to the context of the encounter for any other
 * reason (internally defined/decided)
* any resource referenced by the above,
 * including binaries and attachments (to make a more complete package)

In the US
 * Realm, at a mimimum, the resources returned SHALL include all the data covered
 * by the meaningful use common data elements (see
 * [DAF](http://hl7.org/fhir/us/daf) for further guidance). Other applicable
 * implementation guides may make additional rules about the information that is
 * returned.   Note that for many resources, the exact nature of the link to
 * encounter can be ambiguous (e.g. for a DiagnosticReport, is it the encounter
 * when it was initiated, or when it was reported?)
 * @see {@link http://hl7.org/fhir/OperationDefinition/Encounter-everything}
 */
  constructor(public parameters: EncounterEverythingOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$everything",
      resourceType: "Encounter",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Bundle;
}

export interface EncounterEverythingOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId: string;
  /**
   * Resources updated after this period will be included in the response. The intent
   * of this parameter is to allow a client to request only records that have changed
   * since the last request, based on either the return header time, or or (for
   * asynchronous use), the transaction time
   * @fhirType instant
   */
  _since?: string | undefined;
  /**
   * One or more parameters, each containing one or more comma-delimited FHIR
   * resource types to include in the return resources. In the absense of any
   * specified types, the server returns all resource types
   * @fhirType code
   */
  _type?: Array<string> | undefined;
  /**
   * See discussion below on the utility of paging through the results of the
   * $everything operation
   * @fhirType integer
   */
  _count?: number | undefined;
}

/**
 * Fetch EpisodeOfCare Record
 * 
 * This operation is used to return all the information related to an episodeofcare
 * described in the resource on which this operation is invoked. The response is a
 * bundle of type "searchset". At a minimum, the episodeofcare resource itself is
 * returned, along with any other resources that the server has available for the
 * given episodeofcare for the user. The server also returns whatever resources are
 * needed to support the records - e.g. linked practitioners, locations,
 * organizations etc. The principle intended use for this operation is to provide a
 * patient with access to their record, or to allow a client to retrieve everything
 * for an episodeofcare for efficient display).

The server SHOULD return all
 * resources it has that:

* are included in the episodeofcare compartment for the
 * identified episodeofcare (have a reference to the episodeofcare)
* are
 * referenced by the standard extension for associating an episodeofcare (where no
 * reference element exists)
 * http://hl7.org/fhir/StructureDefinition/workflow-episodeOfCare
* the server
 * believes are relevant to the context of the episodeofcare for any other reason
 * (internally defined/decided)
* any resource referenced by the above, including
 * binaries and attachments (to make a more complete package)
 * @see {@link http://hl7.org/fhir/OperationDefinition/EpisodeOfCare-everything}
 */
export class EpisodeOfCareEverythingOperation implements Operation<Bundle> {
  /**
 * Fetch EpisodeOfCare Record
 * 
 * This operation is used to return all the information related to an episodeofcare
 * described in the resource on which this operation is invoked. The response is a
 * bundle of type "searchset". At a minimum, the episodeofcare resource itself is
 * returned, along with any other resources that the server has available for the
 * given episodeofcare for the user. The server also returns whatever resources are
 * needed to support the records - e.g. linked practitioners, locations,
 * organizations etc. The principle intended use for this operation is to provide a
 * patient with access to their record, or to allow a client to retrieve everything
 * for an episodeofcare for efficient display).

The server SHOULD return all
 * resources it has that:

* are included in the episodeofcare compartment for the
 * identified episodeofcare (have a reference to the episodeofcare)
* are
 * referenced by the standard extension for associating an episodeofcare (where no
 * reference element exists)
 * http://hl7.org/fhir/StructureDefinition/workflow-episodeOfCare
* the server
 * believes are relevant to the context of the episodeofcare for any other reason
 * (internally defined/decided)
* any resource referenced by the above, including
 * binaries and attachments (to make a more complete package)
 * @see {@link http://hl7.org/fhir/OperationDefinition/EpisodeOfCare-everything}
 */
  constructor(public parameters: EpisodeOfCareEverythingOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$everything",
      resourceType: "EpisodeOfCare",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Bundle;
}

export interface EpisodeOfCareEverythingOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId: string;
  /**
   * Resources updated after this period will be included in the response. The intent
   * of this parameter is to allow a client to request only records that have changed
   * since the last request, based on either the return header time, or or (for
   * asynchronous use), the transaction time
   * @fhirType instant
   */
  _since?: string | undefined;
  /**
   * One or more parameters, each containing one or more comma-delimited FHIR
   * resource types to include in the return resources. In the absense of any
   * specified types, the server returns all resource types
   * @fhirType code
   */
  _type?: Array<string> | undefined;
  /**
   * See discussion below on the utility of paging through the results of the
   * $everything operation
   * @fhirType integer
   */
  _count?: number | undefined;
}

/**
 * Fetch a group of Patient Records
 *
 * This operation is used to return all the information related to one or more
 * patients that are part of the group on which this operation is invoked. The
 * response is a bundle of type "searchset". At a minimum, the patient resource(s)
 * itself is returned, along with any other resources that the server has that are
 * related to the patient(s), and that are available for the given user. The server
 * also returns whatever resources are needed to support the records - e.g. linked
 * practitioners, medications, locations, organizations etc.   The intended use for
 * this operation is for a provider or other user to perform a bulk data download.
 * The server SHOULD return at least all resources that it has that are in the
 * patient compartment for the identified patient(s), and any resource referenced
 * from those, including binaries and attachments. In the US Realm, at a mimimum,
 * the resources returned SHALL include all the data covered by the meaningful use
 * common data elements as defined in [US-Core](http://hl7.org/fhir/us/core). Other
 * applicable implementation guides may make additional rules about how much
 * information that is returned.
 * @see {@link http://hl7.org/fhir/OperationDefinition/Group-everything}
 */
export class GroupEverythingOperation implements Operation<Bundle> {
  /**
   * Fetch a group of Patient Records
   *
   * This operation is used to return all the information related to one or more
   * patients that are part of the group on which this operation is invoked. The
   * response is a bundle of type "searchset". At a minimum, the patient resource(s)
   * itself is returned, along with any other resources that the server has that are
   * related to the patient(s), and that are available for the given user. The server
   * also returns whatever resources are needed to support the records - e.g. linked
   * practitioners, medications, locations, organizations etc.   The intended use for
   * this operation is for a provider or other user to perform a bulk data download.
   * The server SHOULD return at least all resources that it has that are in the
   * patient compartment for the identified patient(s), and any resource referenced
   * from those, including binaries and attachments. In the US Realm, at a mimimum,
   * the resources returned SHALL include all the data covered by the meaningful use
   * common data elements as defined in [US-Core](http://hl7.org/fhir/us/core). Other
   * applicable implementation guides may make additional rules about how much
   * information that is returned.
   * @see {@link http://hl7.org/fhir/OperationDefinition/Group-everything}
   */
  constructor(public parameters: GroupEverythingOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$everything",
      resourceType: "Group",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Bundle;
}

export interface GroupEverythingOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId: string;
  /**
   * The date range relates to care dates, not record currency dates - e.g. all
   * records relating to care provided in a certain date range. If no start date is
   * provided, all records prior to the end date are in scope.
   * @fhirType date
   */
  start?: string | undefined;
  /**
   * The date range relates to care dates, not record currency dates - e.g. all
   * records relating to care provided in a certain date range. If no end date is
   * provided, all records subsequent to the start date are in scope.
   * @fhirType date
   */
  end?: string | undefined;
  /**
   * Resources updated after this period will be included in the response. The intent
   * of this parameter is to allow a client to request only records that have changed
   * since the last request, based on either the return header time, or or (for
   * asynchronous use), the transaction time
   * @fhirType instant
   */
  _since?: string | undefined;
  /**
   * One or more parameters, each containing one or more comma-delimited FHIR
   * resource types to include in the return resources. In the absense of any
   * specified types, the server returns all resource types
   * @fhirType code
   */
  _type?: Array<string> | undefined;
  /**
   * See discussion below on the utility of paging through the results of the
   * $everything operation
   * @fhirType integer
   */
  _count?: number | undefined;
}

/**
 * Data Requirements
 *
 * The data-requirements operation aggregates and returns the parameters and data
 * requirements for a resource and all its dependencies as a single module
 * definition
 * @see {@link http://hl7.org/fhir/OperationDefinition/Library-data-requirements}
 */
export class LibraryDataRequirementsOperation implements Operation<Library> {
  /**
   * Data Requirements
   *
   * The data-requirements operation aggregates and returns the parameters and data
   * requirements for a resource and all its dependencies as a single module
   * definition
   * @see {@link http://hl7.org/fhir/OperationDefinition/Library-data-requirements}
   */
  constructor(public parameters: LibraryDataRequirementsOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$data-requirements",
      resourceType: "Library",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Library;
}

export interface LibraryDataRequirementsOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * The target of the data requirements operation
   */
  target?: string | undefined;
}

/**
 * Find a functional list
 *
 * This operation allows a client to find an identified list for a particular
 * function by its function. The operation takes two parameters, the identity of a
 * patient, and the name of a functional list.     The list of defined functional
 * lists can be found at [Current Resource Lists](lifecycle.html#lists).
 * Applications are not required to support all the lists, and may define
 * additional lists of their own.   If the system is able to locate a list that
 * serves the identified purpose, it returns it as the body of the response with a
 * 200 OK status. If the resource cannot be located, the server returns a 404 not
 * found (optionally with an OperationOutcome resource)
 * @see {@link http://hl7.org/fhir/OperationDefinition/List-find}
 */
export class ListFindOperation implements Operation<unknown> {
  /**
   * Find a functional list
   *
   * This operation allows a client to find an identified list for a particular
   * function by its function. The operation takes two parameters, the identity of a
   * patient, and the name of a functional list.     The list of defined functional
   * lists can be found at [Current Resource Lists](lifecycle.html#lists).
   * Applications are not required to support all the lists, and may define
   * additional lists of their own.   If the system is able to locate a list that
   * serves the identified purpose, it returns it as the body of the response with a
   * 200 OK status. If the resource cannot be located, the server returns a 404 not
   * found (optionally with an OperationOutcome resource)
   * @see {@link http://hl7.org/fhir/OperationDefinition/List-find}
   */
  constructor(public parameters: ListFindOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$find",
      resourceType: "List",
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: unknown;
}

export interface ListFindOperationParameters {
  /**
   * The id of a patient resource located on the server on which this operation is
   * executed
   * @fhirType id
   */
  patient: string;
  /**
   * The code for the functional list that is being found
   * @fhirType code
   */
  name: string;
}

/**
 * Care Gaps
 *
 * The care-gaps operation is used to determine gaps-in-care based on the results
 * of quality measures
 * @see {@link http://hl7.org/fhir/OperationDefinition/Measure-care-gaps}
 */
export class MeasureCareGapsOperation implements Operation<Bundle> {
  /**
   * Care Gaps
   *
   * The care-gaps operation is used to determine gaps-in-care based on the results
   * of quality measures
   * @see {@link http://hl7.org/fhir/OperationDefinition/Measure-care-gaps}
   */
  constructor(public parameters: MeasureCareGapsOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$care-gaps",
      resourceType: "Measure",
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Bundle;
}

export interface MeasureCareGapsOperationParameters {
  /**
   * The start of the measurement period. In keeping with the semantics of the date
   * parameter used in the FHIR search operation, the period will start at the
   * beginning of the period implied by the supplied timestamp. E.g. a value of 2014
   * would set the period s
   * @fhirType date
   */
  periodStart: string;
  /**
   * The end of the measurement period. The period will end at the end of the period
   * implied by the supplied timestamp. E.g. a value of 2014 would set the period end
   * to be 2014-12-31T23:59:59 inclusive
   * @fhirType date
   */
  periodEnd: string;
  /**
   * The topic to be used to determine which measures are considered for the care
   * gaps report. Any measure with the given topic will be included in the report
   */
  topic: string;
  /**
   * Subject for which the care gaps report will be produced
   */
  subject: string;
}

/**
 * Collect Data
 *
 * The collect-data operation is used to collect the data-of-interest for the given
 * measure.
 * @see {@link http://hl7.org/fhir/OperationDefinition/Measure-collect-data}
 */
export class MeasureCollectDataOperation
  implements Operation<MeasureCollectDataOperationResult>
{
  /**
   * Collect Data
   *
   * The collect-data operation is used to collect the data-of-interest for the given
   * measure.
   * @see {@link http://hl7.org/fhir/OperationDefinition/Measure-collect-data}
   */
  constructor(public parameters: MeasureCollectDataOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$collect-data",
      resourceType: "Measure",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: MeasureCollectDataOperationResult;
}

export interface MeasureCollectDataOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * The start of the measurement period. In keeping with the semantics of the date
   * parameter used in the FHIR search operation, the period will start at the
   * beginning of the period implied by the supplied timestamp. E.g. a value of 2014
   * would set the period s
   * @fhirType date
   */
  periodStart: string;
  /**
   * The end of the measurement period. The period will end at the end of the period
   * implied by the supplied timestamp. E.g. a value of 2014 would set the period end
   * to be 2014-12-31T23:59:59 inclusive
   * @fhirType date
   */
  periodEnd: string;
  /**
   * The measure to evaluate. This parameter is only required when the operation is
   * invoked on the resource type, it is not used when invoking the operation on a
   * Measure instance
   */
  measure?: string | undefined;
  /**
   * Subject for which the measure will be collected. If not specified, measure data
   * will be collected for all subjects that meet the requirements of the measure. If
   * specified, the measure will only be calculated for the referenced subject(s)
   */
  subject?: string | undefined;
  /**
   * Practitioner for which the measure will be collected. If specified, measure data
   * will be collected only for subjects that have a primary relationship to the
   * identified practitioner
   */
  practitioner?: string | undefined;
  /**
   * The date the results of this measure were last received. This parameter used to
   * indicate when the last time data for this measure was collected. This
   * information is used to support incremental data collection scenarios
   * @fhirType dateTime
   */
  lastReceivedOn?: string | undefined;
}

export interface MeasureCollectDataOperationResult {
  /**
   * A MeasureReport of type data-exchange detailing the results of the operation
   */
  measureReport: MeasureReport;
  /**
   * The result resources that make up the data-of-interest for the measure
   */
  resource?: Array<Resource> | undefined;
}

/**
 * Data Requirements
 *
 * The data-requirements operation aggregates and returns the parameters and data
 * requirements for the measure and all its dependencies as a single module
 * definition
 * @see {@link http://hl7.org/fhir/OperationDefinition/Measure-data-requirements}
 */
export class MeasureDataRequirementsOperation implements Operation<Library> {
  /**
   * Data Requirements
   *
   * The data-requirements operation aggregates and returns the parameters and data
   * requirements for the measure and all its dependencies as a single module
   * definition
   * @see {@link http://hl7.org/fhir/OperationDefinition/Measure-data-requirements}
   */
  constructor(public parameters: MeasureDataRequirementsOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$data-requirements",
      resourceType: "Measure",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Library;
}

export interface MeasureDataRequirementsOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId: string;
  /**
   * The start of the measurement period. In keeping with the semantics of the date
   * parameter used in the FHIR search operation, the period will start at the
   * beginning of the period implied by the supplied timestamp. E.g. a value of 2014
   * would set the period start to be 2014-01-01T00:00:00 inclusive
   * @fhirType date
   */
  periodStart: string;
  /**
   * The end of the measurement period. The period will end at the end of the period
   * implied by the supplied timestamp. E.g. a value of 2014 would set the period end
   * to be 2014-12-31T23:59:59 inclusive
   * @fhirType date
   */
  periodEnd: string;
}

/**
 * Evaluate Measure
 *
 * The evaluate-measure operation is used to calculate an eMeasure and obtain the
 * results
 * @see {@link http://hl7.org/fhir/OperationDefinition/Measure-evaluate-measure}
 */
export class MeasureEvaluateMeasureOperation
  implements Operation<Array<Bundle> | undefined>
{
  /**
   * Evaluate Measure
   *
   * The evaluate-measure operation is used to calculate an eMeasure and obtain the
   * results
   * @see {@link http://hl7.org/fhir/OperationDefinition/Measure-evaluate-measure}
   */
  constructor(public parameters: MeasureEvaluateMeasureOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$evaluate-measure",
      resourceType: "Measure",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Array<Bundle> | undefined;
}

export interface MeasureEvaluateMeasureOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * The measure to evaluate. If the operation is invoked at the instance level, this
   * parameter is not allowed; if the operation is invoked at the type level, this
   * parameter is required, or a url (and optionally version) must be supplied.
   */
  measure?: Measure | undefined;
  /**
   * The url of the plan measure to be applied. If the operation is invoked at the
   * instance level, this parameter is not allowed; if the operation is invoked at
   * the type level, this parameter (and optionally the version), or the measure
   * parameter must be supplied
   * @fhirType canonical
   */
  url?: string | undefined;
  /**
   * The version of the measure to be applied. If the operation is invoked at the
   * instance level, this parameter is not allowed; if the operation is invoked at
   * the type level, this parameter may only be used if the url parameter is
   * supplied.
   */
  version?: string | undefined;
  /**
   * Subject for which the measure will be calculated. The subject may be a Patient,
   * Practitioner, PractitionerRole, Organization, Location, Device, or Group.
   * Subjects provided in this parameter will be resolved as the subject of the
   * measure based on the type of the subject. If multiple subjects of the same type
   * are provided, the behavior is implementation-defined
   */
  subject?: string | undefined;
  /**
   * The start of the measurement period. In keeping with the semantics of the date
   * parameter used in the FHIR search operation, the period will start at the
   * beginning of the period implied by the supplied timestamp. E.g. a value of 2014
   * would set the period start to be 2014-01-01T00:00:00 inclusive
   * @fhirType date
   */
  periodStart: string;
  /**
   * The end of the measurement period. The period will end at the end of the period
   * implied by the supplied timestamp. E.g. a value of 2014 would set the period end
   * to be 2014-12-31T23:59:59 inclusive
   * @fhirType date
   */
  periodEnd: string;
  /**
   * The type of measure report: individual, subject-list, or summary. If not
   * specified, a default value of individual will be used if the subject parameter
   * is supplied, otherwise, summary will be used. NOTE: Implementations should
   * support the use of `subject` for individual and `population` for summary for
   * backwards compatibility with existing implementations.
   * @fhirType code
   */
  reportType?: string | undefined;
  /**
   * The provider for which the report will be run. This may be a reference to a
   * Practitioner, PractitionerRole, or Organization. If specified, the measure will
   * be calculated for subjects that have a primary relationship to the identified
   * provider. How this relationship is determined is implementation-specific.
   */
  provider?: string | undefined;
  /**
   * The location for which the report will be run.
   */
  location?: string | undefined;
  /**
   * The date the results of this measure were last received. This parameter is only
   * valid for patient-level reports and is used to indicate when the last time a
   * result for this patient was received. This information can be used to limit the
   * set of resources returned for a patient-level report
   * @fhirType dateTime
   */
  lastReceivedOn?: string | undefined;
  /**
   * Any input parameters for the evaluation. Parameters defined in this input will
   * be made available by name to the CQL expression. Parameter types are mapped to
   * CQL as specified in the Using CQL topic of the Clinical Reasoning Module. If a
   * parameter appears more than once in the input Parameters resource, it is
   * represented with a List in the input CQL. If a parameter has parts, it is
   * represented as a Tuple in the input CQL.
   */
  parameters?: Parameters | undefined;
}

/**
 * Submit Data
 *
 * The submit-data operation is used to submit data-of-interest for a measure.
 * There is no expectation that the submitted data represents all the
 * data-of-interest, only that all the data submitted is relevant to the
 * calculation of the measure for a particular subject or population
 * @see {@link http://hl7.org/fhir/OperationDefinition/Measure-submit-data}
 */
export class MeasureSubmitDataOperation implements Operation<unknown> {
  /**
   * Submit Data
   *
   * The submit-data operation is used to submit data-of-interest for a measure.
   * There is no expectation that the submitted data represents all the
   * data-of-interest, only that all the data submitted is relevant to the
   * calculation of the measure for a particular subject or population
   * @see {@link http://hl7.org/fhir/OperationDefinition/Measure-submit-data}
   */
  constructor(public parameters: MeasureSubmitDataOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$submit-data",
      resourceType: "Measure",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: unknown;
}

export interface MeasureSubmitDataOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * The measure report being submitted
   */
  measureReport: MeasureReport;
  /**
   * The individual resources that make up the data-of-interest being submitted
   */
  resource?: Array<Resource> | undefined;
}

/**
 * Fetch Product Record
 *
 * This operation is used to return all the information related to one or more
 * products described in the resource or context on which this operation is
 * invoked. The response is a bundle of type "searchset". At a minimum, the product
 * resource(s) itself is returned, along with any other resources that the server
 * has that are related to the products(s), and that are available for the given
 * user. This is typically the marketing authorizations, ingredients, packages,
 * therapeutic indications and so on. The server also returns whatever resources
 * are needed to support the records - e.g. linked organizations, document
 * references etc.
 * @see {@link http://hl7.org/fhir/OperationDefinition/MedicinalProductDefinition-everything}
 */
export class MedicinalProductDefinitionEverythingOperation
  implements Operation<Bundle>
{
  /**
   * Fetch Product Record
   *
   * This operation is used to return all the information related to one or more
   * products described in the resource or context on which this operation is
   * invoked. The response is a bundle of type "searchset". At a minimum, the product
   * resource(s) itself is returned, along with any other resources that the server
   * has that are related to the products(s), and that are available for the given
   * user. This is typically the marketing authorizations, ingredients, packages,
   * therapeutic indications and so on. The server also returns whatever resources
   * are needed to support the records - e.g. linked organizations, document
   * references etc.
   * @see {@link http://hl7.org/fhir/OperationDefinition/MedicinalProductDefinition-everything}
   */
  constructor(
    public parameters: MedicinalProductDefinitionEverythingOperationParameters
  ) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$everything",
      resourceType: "MedicinalProductDefinition",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Bundle;
}

export interface MedicinalProductDefinitionEverythingOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * Resources updated after this period will be included in the response. The intent
   * of this parameter is to allow a client to request only records that have changed
   * since the last request, based on either the return header time, or or (for
   * asynchronous use), the transaction time
   * @fhirType instant
   */
  _since?: string | undefined;
  /**
   * See discussion below on the utility of paging through the results of the
   * $everything operation
   * @fhirType integer
   */
  _count?: number | undefined;
}

/**
 * Process Message
 *
 * This operation accepts a message, processes it according to the definition of
 * the event in the message header, and returns one or more response messages.
 * In addition to processing the message event, a server may choose to retain all
 * or some the resources and make them available on a RESTful interface, but is not
 * required to do so.
 * @see {@link http://hl7.org/fhir/OperationDefinition/MessageHeader-process-message}
 */
export class MessageHeaderProcessMessageOperation
  implements Operation<Bundle | undefined>
{
  /**
   * Process Message
   *
   * This operation accepts a message, processes it according to the definition of
   * the event in the message header, and returns one or more response messages.
   * In addition to processing the message event, a server may choose to retain all
   * or some the resources and make them available on a RESTful interface, but is not
   * required to do so.
   * @see {@link http://hl7.org/fhir/OperationDefinition/MessageHeader-process-message}
   */
  constructor(
    public parameters: MessageHeaderProcessMessageOperationParameters
  ) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$process-message",
      parameters: this.parameters,
      affectsState: true,
    };
  }

  public _resultTypeDoNotUse?: Bundle | undefined;
}

export interface MessageHeaderProcessMessageOperationParameters {
  /**
   * The message to process (or, if using asynchronous messaging, it may be a
   * response message to accept)
   */
  content: Bundle;
  /**
   * If 'true' the message is processed using the asynchronous messaging pattern
   */
  async?: boolean | undefined;
  /**
   * A URL to submit response messages to, if asynchronous messaging is being used,
   * and if the MessageHeader.source.endpoint is not the appropriate place to submit
   * responses
   * @fhirType url
   */
  "response-url"?: string | undefined;
}

/**
 * Fetch Preferred id
 * 
 * This operation returns the preferred identifiers for identifiers, and
 * terminologies. The operation takes 2 parameters:     

* a system identifier -
 * either a URI, an OID, or a v2 table 0396 (other) code  
* a code for what kind
 * of identifier is desired (URI, OID, v2 table 0396 identifier)    

and returns
 * either the requested identifier, or an HTTP errors response with an
 * OperationOutcome because either the provided identifier was not recognized, or
 * the requested identiifer type is not known.    

The principle use of this
 * operation is when converting between v2, CDA and FHIR Identifier/CX/II and
 * CodeableConcepts/C(N/W)E/CD but the operation may also find use when converting
 * metadata such as profiles.
 * @see {@link http://hl7.org/fhir/OperationDefinition/NamingSystem-preferred-id}
 */
export class NamingSystemPreferredIdOperation
  implements Operation<NamingSystemPreferredIdOperationResult>
{
  /**
 * Fetch Preferred id
 * 
 * This operation returns the preferred identifiers for identifiers, and
 * terminologies. The operation takes 2 parameters:     

* a system identifier -
 * either a URI, an OID, or a v2 table 0396 (other) code  
* a code for what kind
 * of identifier is desired (URI, OID, v2 table 0396 identifier)    

and returns
 * either the requested identifier, or an HTTP errors response with an
 * OperationOutcome because either the provided identifier was not recognized, or
 * the requested identiifer type is not known.    

The principle use of this
 * operation is when converting between v2, CDA and FHIR Identifier/CX/II and
 * CodeableConcepts/C(N/W)E/CD but the operation may also find use when converting
 * metadata such as profiles.
 * @see {@link http://hl7.org/fhir/OperationDefinition/NamingSystem-preferred-id}
 */
  constructor(public parameters: NamingSystemPreferredIdOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$preferred-id",
      resourceType: "NamingSystem",
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: NamingSystemPreferredIdOperationResult;
}

export interface NamingSystemPreferredIdOperationParameters {
  /**
   * The server parses the provided identifier to see what type it is (e.g. a URI, an
   * OID as a URI, a plain OID, or a v2 table 0396 code). If the server can't tell
   * what type of identifier it is, it can try it as multiple types. It is an error
   * if more than one system matches the provided identifier
   */
  id: string;
  /**
   * @fhirType code
   */
  type: string;
  /**
   * If specified, the operation will indicate what the preferred identifier was on
   * the specified date.  If not specified, the operation will provide the preferred
   * identifier as of 'now'
   * @fhirType dateTime
   */
  date?: string | undefined;
}

export interface NamingSystemPreferredIdOperationResult {
  /**
   * OIDs are return as plain OIDs (not the URI form).
   */
  result: string;
}

/**
 * Translate id
 * 
 * This operation returns an identifier of the target type. The operation takes 5
 * parameters:     

* a source identifier value - either a URI, an OID, or a v2
 * table 0396 (other) code  
*  a code for what type of identifier the source
 * identifier is     

* a code for what kind of identifier is desired (URI, OID,
 * v2 table 0396 identifier)     

* an optional parameter preferredOnly for
 * whether only the preferred identifier is desired     

* an optional date to
 * return only identifiers that have a validity period that includes that date
 * and returns either the requested identifier(s), or an HTTP errors response
 * with an OperationOutcome because either the provided identifier was not
 * recognized, or the requested identiifer type is not known.
 * @see {@link http://hl7.org/fhir/OperationDefinition/NamingSystem-translate-id}
 */
export class NamingSystemTranslateIdOperation
  implements Operation<NamingSystemTranslateIdOperationResult>
{
  /**
 * Translate id
 * 
 * This operation returns an identifier of the target type. The operation takes 5
 * parameters:     

* a source identifier value - either a URI, an OID, or a v2
 * table 0396 (other) code  
*  a code for what type of identifier the source
 * identifier is     

* a code for what kind of identifier is desired (URI, OID,
 * v2 table 0396 identifier)     

* an optional parameter preferredOnly for
 * whether only the preferred identifier is desired     

* an optional date to
 * return only identifiers that have a validity period that includes that date
 * and returns either the requested identifier(s), or an HTTP errors response
 * with an OperationOutcome because either the provided identifier was not
 * recognized, or the requested identiifer type is not known.
 * @see {@link http://hl7.org/fhir/OperationDefinition/NamingSystem-translate-id}
 */
  constructor(public parameters: NamingSystemTranslateIdOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$translate-id",
      resourceType: "NamingSystem",
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: NamingSystemTranslateIdOperationResult;
}

export interface NamingSystemTranslateIdOperationParameters {
  /**
   * The server parses the provided identifier to see what type it is (e.g. a URI, an
   * OID as a URI, a plain OID, or a v2 table 0396 code). If the server can't tell
   * what type of identifier it is, it can try it as multiple types. It is an error
   * if more than one system matches the provided identifier
   */
  id: string;
  /**
   * @fhirType code
   */
  sourceType: string;
  /**
   * @fhirType code
   */
  targetType: string;
  /**
   * If preferredOnly = true then return only the preferred identifier, or if
   * preferredOnly = false then return all available ids.
   */
  preferredOnly?: boolean | undefined;
  /**
   * If 'date' is supplied return only ids that have a validity period that includes
   * that date.
   * @fhirType dateTime
   */
  date?: string | undefined;
}

export interface NamingSystemTranslateIdOperationResult {
  /**
   * True if the identifier could be translated successfully.
   */
  result: boolean;
  /**
   * The target identifer(s) of the requested type
   */
  targetIdentifier?: Array<string> | undefined;
  /**
   * Whether the target identifier is preferred.
   */
  "targetIdentifer.preferred"?: boolean | undefined;
  /**
   * The perioid when the target identifier is valid.
   */
  "targetIdentifier.period"?: Period | undefined;
}

/**
 * Last N Observations Query
 * 
 * The *lastn query* meets the common need for searching for the most recent or
 * last n=number of observations for a subject. For example, retrieving the last 5
 * temperatures for a patient to view trends or fetching the most recent laboratory
 * results or vitals signs. To ask a server to return the last n=number of
 * observations, the *lastn* query uses the [normal search
 * parameters](observation.html#search) defined for the Observation resource.
 * However, rather than their normal use, they are interpreted as inputs - i.e..
 * instead of requiring that the resources literally contain the search parameters,
 * they are passed to a server algorithm of some kind that uses them to determine
 * the most appropriate matches.

The request for a lastn query SHALL include:

* A
 * `$lastn` operation parameter
*  A subject using either the `patient` or
 * `subject`  search parameter
*  A `category` parameter and/or a search parameter
 * that contains a code element in its FHIRpath expression.  ( e.g., `code` or
 * `code-value-concept`)

The request for a lastn query MAY include:

* Other
 * Observation search parameters and modifiers

The response from a lastn query is
 * a set of observations:

*  Filtered by additional parameters
   * If not
 * explicitly filtered by status then will include statuses of 'entered-in-error'
*
 * 'GROUP BY' `Observation.code`
   * Codes SHALL be considered equivalent if the
 * `coding.value` *and* `coding.system` are the same.
   * Text only codes SHALL be
 * treated and grouped based on the text.
   * For codes with translations
 * (multiple codings), the code translations are assumed to be equal and the
 * grouping by code SHALL follow the transitive property of equality.

for
 * example:

|Observation.code for observation a|Observation.code for observation
 * b|Observation.code for observation c|number of groups [codes/text in each
 * group]|    
|---|---|---|---|     
|a|b|c | 3 [a],[b],[c]|    
|a|b|a,c | 2
 * [a.c],[b]|     
|a|b|a,b | 1 [a,b]|    
|'textM'|'Text'|'t e x t'|3
 * ['text'],['Text'],['t e x t']|

* Sorted from most recent to the oldest
*
 * Limited to the number of requested responses per group specified by the optional
 * *max* query parameter
  * In case of a tie - when the effective times for >1
 * Observations are equal - both will be returned.  Therefore, more Observations
 * may be returned than is specified in *max*.  For example, 4 Observations instead
 * of 3 if the 3rd and 4th most recent observation had the same effective time.
*
 * If no maximum number is given then only the most recent Observation in each
 * group is returned.

The set of returned observations should represent distinct
 * real-world observations and not the same observation with changes in status or
 * versions. If there are no matches, the *lastn* query SHALL return an empty
 * search set with no error, but may include an operation outcome with further
 * advice.
 * @see {@link http://hl7.org/fhir/OperationDefinition/Observation-lastn}
 */
export class ObservationLastnOperation implements Operation<Bundle> {
  /**
 * Last N Observations Query
 * 
 * The *lastn query* meets the common need for searching for the most recent or
 * last n=number of observations for a subject. For example, retrieving the last 5
 * temperatures for a patient to view trends or fetching the most recent laboratory
 * results or vitals signs. To ask a server to return the last n=number of
 * observations, the *lastn* query uses the [normal search
 * parameters](observation.html#search) defined for the Observation resource.
 * However, rather than their normal use, they are interpreted as inputs - i.e..
 * instead of requiring that the resources literally contain the search parameters,
 * they are passed to a server algorithm of some kind that uses them to determine
 * the most appropriate matches.

The request for a lastn query SHALL include:

* A
 * `$lastn` operation parameter
*  A subject using either the `patient` or
 * `subject`  search parameter
*  A `category` parameter and/or a search parameter
 * that contains a code element in its FHIRpath expression.  ( e.g., `code` or
 * `code-value-concept`)

The request for a lastn query MAY include:

* Other
 * Observation search parameters and modifiers

The response from a lastn query is
 * a set of observations:

*  Filtered by additional parameters
   * If not
 * explicitly filtered by status then will include statuses of 'entered-in-error'
*
 * 'GROUP BY' `Observation.code`
   * Codes SHALL be considered equivalent if the
 * `coding.value` *and* `coding.system` are the same.
   * Text only codes SHALL be
 * treated and grouped based on the text.
   * For codes with translations
 * (multiple codings), the code translations are assumed to be equal and the
 * grouping by code SHALL follow the transitive property of equality.

for
 * example:

|Observation.code for observation a|Observation.code for observation
 * b|Observation.code for observation c|number of groups [codes/text in each
 * group]|    
|---|---|---|---|     
|a|b|c | 3 [a],[b],[c]|    
|a|b|a,c | 2
 * [a.c],[b]|     
|a|b|a,b | 1 [a,b]|    
|'textM'|'Text'|'t e x t'|3
 * ['text'],['Text'],['t e x t']|

* Sorted from most recent to the oldest
*
 * Limited to the number of requested responses per group specified by the optional
 * *max* query parameter
  * In case of a tie - when the effective times for >1
 * Observations are equal - both will be returned.  Therefore, more Observations
 * may be returned than is specified in *max*.  For example, 4 Observations instead
 * of 3 if the 3rd and 4th most recent observation had the same effective time.
*
 * If no maximum number is given then only the most recent Observation in each
 * group is returned.

The set of returned observations should represent distinct
 * real-world observations and not the same observation with changes in status or
 * versions. If there are no matches, the *lastn* query SHALL return an empty
 * search set with no error, but may include an operation outcome with further
 * advice.
 * @see {@link http://hl7.org/fhir/OperationDefinition/Observation-lastn}
 */
  constructor(public parameters: ObservationLastnOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$lastn",
      resourceType: "Observation",
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Bundle;
}

export interface ObservationLastnOperationParameters {
  /**
   * `max` is  an optional input parameter to the *lastn* query operation.  It is
   * used to specify the maximum number of Observations to return from each group.
   * For example for the query "Fetch the last 3 results for all vitals for a
   * patient" `max` = 3.
   * @fhirType positiveInt
   */
  max?: number | undefined;
}

/**
 * Observation Statistics
 * 
 * The Statistics operation performs a set of statistical calculations on a set of
 * clinical measurements such as a blood pressure as stored on the server.  This
 * operation evaluates [Observation](observation.html) resources having
 * valueQuantity elements that have UCUM unit codes. Observations with a status of
 * 'entered-in-error' will be excluded from the calculations.      

Alternatively,
 * the [measure workflow pattern](measure.html) should be used when defining a
 * quality measure (e.g. a description of how to calculate a particular measurement
 * or set of measurements) as part of a workflow. 

The set of Observations is
 * defined by 4 parameters:

*  the subject of the observations for which the
 * statistics are being generated (`subject`)
* which observations to generate
 * statistics for (`code` and `system`, or `coding`)
* the time period over which
 * to generate statistics 'duration` or `period`)
* the set of statistical analyses
 * to return (`statistic`)

Possible statistical analyses (see
 * [StatisticsCode](valueset-observation-statistics.html)):

 - **average**
 * ("Average"): The [mean](https://en.wikipedia.org/wiki/Arithmetic_mean) of N
 * measurements over the stated period.
 - **maximum** ("Maximum"): The
 * [maximum](https://en.wikipedia.org/wiki/Maximal_element) value of N measurements
 * over the stated period.
 - **minimum** ("Minimum"): The
 * [minimum](https://en.wikipedia.org/wiki/Minimal_element) value of N measurements
 * over the stated period.
 - **count** ("Count"): The [number] of valid
 * measurements over the stated period that contributed to the other statistical
 * outputs.
 - **total-count** ("Total Count"): The total [number] of valid
 * measurements over the stated period, including observations that were ignored
 * because they did not contain valid result values.
 - **median** ("Median"): The
 * [median](https://en.wikipedia.org/wiki/Median) of N measurements over the stated
 * period.
 - **std-dev** ("Standard Deviation"): The [standard
 * deviation](https://en.wikipedia.org/wiki/Standard_deviation) of N measurements
 * over the stated period.
 - **sum** ("Sum"): The
 * [sum](https://en.wikipedia.org/wiki/Summation) of N measurements over the stated
 * period.
 - **variance** ("Variance"): The
 * [variance](https://en.wikipedia.org/wiki/Variance) of N measurements over the
 * stated period.
 - **20-percent** ("20th Percentile"): The 20th
 * [Percentile](https://en.wikipedia.org/wiki/Percentile) of N measurements over
 * the stated period.
 - **80-percent** ("80th Percentile"): The 80th
 * [Percentile](https://en.wikipedia.org/wiki/Percentile) of N measurements over
 * the stated period.
 - **4-lower** ("Lower Quartile"): The lower
 * [Quartile](https://en.wikipedia.org/wiki/Quartile) Boundary of N measurements
 * over the stated period.
 - **4-upper** ("Upper Quartile"): The upper
 * [Quartile](https://en.wikipedia.org/wiki/Quartile) Boundary of N measurements
 * over the stated period.
 - **4-dev** ("Quartile Deviation"): The difference
 * between the upper and lower [Quartiles](https://en.wikipedia.org/wiki/Quartile)
 * is called the Interquartile range. (IQR = Q3-Q1) Quartile deviation or
 * Semi-interquartile range is one-half the difference between the first and the
 * third quartiles.
 - **5-1** ("1st Quintile"): The lowest of four values that
 * divide the N measurements into a frequency distribution of five classes with
 * each containing one fifth of the total population.
 - **5-2** ("2nd Quintile"):
 * The second of four values that divide the N measurements into a frequency
 * distribution of five classes with each containing one fifth of the total
 * population.
 - **5-3** ("3rd Quintile"): The third of four values that divide
 * the N measurements into a frequency distribution of five classes with each
 * containing one fifth of the total population.
 - **5-4** ("4th Quintile"): The
 * fourth of four values that divide the N measurements into a frequency
 * distribution of five classes with each containing one fifth of the total
 * population.
 - **skew** ("Skew"): Skewness is a measure of the asymmetry of the
 * probability distribution of a real-valued random variable about its mean. The
 * skewness value can be positive or negative, or even undefined.  Source:
 * [Wikipedia](https://en.wikipedia.org/wiki/Skewness).
 - **kurtosis**
 * ("Kurtosis"): Kurtosis  is a measure of the "tailedness" of the probability
 * distribution of a real-valued random variable.   Source:
 * [Wikipedia](https://en.wikipedia.org/wiki/Kurtosis).
 - **regression**
 * ("Regression"): Linear regression is an approach for modeling two-dimensional
 * sample points with one independent variable and one dependent variable
 * (conventionally, the x and y coordinates in a Cartesian coordinate system) and
 * finds a linear function (a non-vertical straight line) that, as accurately as
 * possible, predicts the dependent variable values as a function of the
 * independent variables. Source:
 * [Wikipedia](https://en.wikipedia.org/wiki/Simple_linear_regression)  This
 * Statistic code will return both a gradient and an intercept value.


If
 * successful, the operation returns an Observation resource for each code with the
 * results of the statistical calculations as component value pairs where the
 * component code = the statistical code. The Observation also contains the input
 * parameters `patient`,`code` and `duration` parameters. If unsuccessful, an
 * [OperationOutcome](operationoutcome.html) with an error message will be
 * returned.

The client can request that all the observations on which the
 * statistics are based be returned as well, using the include parameter. If an
 * include parameter is specified, a limit may also be specified; the sources
 * observations are subsetted at the server's discretion if count > limit. This
 * functionality is included with the intent of supporting graphical presentation
 * @see {@link http://hl7.org/fhir/OperationDefinition/Observation-stats}
 */
export class ObservationStatsOperation
  implements Operation<ObservationStatsOperationResult>
{
  /**
 * Observation Statistics
 * 
 * The Statistics operation performs a set of statistical calculations on a set of
 * clinical measurements such as a blood pressure as stored on the server.  This
 * operation evaluates [Observation](observation.html) resources having
 * valueQuantity elements that have UCUM unit codes. Observations with a status of
 * 'entered-in-error' will be excluded from the calculations.      

Alternatively,
 * the [measure workflow pattern](measure.html) should be used when defining a
 * quality measure (e.g. a description of how to calculate a particular measurement
 * or set of measurements) as part of a workflow. 

The set of Observations is
 * defined by 4 parameters:

*  the subject of the observations for which the
 * statistics are being generated (`subject`)
* which observations to generate
 * statistics for (`code` and `system`, or `coding`)
* the time period over which
 * to generate statistics 'duration` or `period`)
* the set of statistical analyses
 * to return (`statistic`)

Possible statistical analyses (see
 * [StatisticsCode](valueset-observation-statistics.html)):

 - **average**
 * ("Average"): The [mean](https://en.wikipedia.org/wiki/Arithmetic_mean) of N
 * measurements over the stated period.
 - **maximum** ("Maximum"): The
 * [maximum](https://en.wikipedia.org/wiki/Maximal_element) value of N measurements
 * over the stated period.
 - **minimum** ("Minimum"): The
 * [minimum](https://en.wikipedia.org/wiki/Minimal_element) value of N measurements
 * over the stated period.
 - **count** ("Count"): The [number] of valid
 * measurements over the stated period that contributed to the other statistical
 * outputs.
 - **total-count** ("Total Count"): The total [number] of valid
 * measurements over the stated period, including observations that were ignored
 * because they did not contain valid result values.
 - **median** ("Median"): The
 * [median](https://en.wikipedia.org/wiki/Median) of N measurements over the stated
 * period.
 - **std-dev** ("Standard Deviation"): The [standard
 * deviation](https://en.wikipedia.org/wiki/Standard_deviation) of N measurements
 * over the stated period.
 - **sum** ("Sum"): The
 * [sum](https://en.wikipedia.org/wiki/Summation) of N measurements over the stated
 * period.
 - **variance** ("Variance"): The
 * [variance](https://en.wikipedia.org/wiki/Variance) of N measurements over the
 * stated period.
 - **20-percent** ("20th Percentile"): The 20th
 * [Percentile](https://en.wikipedia.org/wiki/Percentile) of N measurements over
 * the stated period.
 - **80-percent** ("80th Percentile"): The 80th
 * [Percentile](https://en.wikipedia.org/wiki/Percentile) of N measurements over
 * the stated period.
 - **4-lower** ("Lower Quartile"): The lower
 * [Quartile](https://en.wikipedia.org/wiki/Quartile) Boundary of N measurements
 * over the stated period.
 - **4-upper** ("Upper Quartile"): The upper
 * [Quartile](https://en.wikipedia.org/wiki/Quartile) Boundary of N measurements
 * over the stated period.
 - **4-dev** ("Quartile Deviation"): The difference
 * between the upper and lower [Quartiles](https://en.wikipedia.org/wiki/Quartile)
 * is called the Interquartile range. (IQR = Q3-Q1) Quartile deviation or
 * Semi-interquartile range is one-half the difference between the first and the
 * third quartiles.
 - **5-1** ("1st Quintile"): The lowest of four values that
 * divide the N measurements into a frequency distribution of five classes with
 * each containing one fifth of the total population.
 - **5-2** ("2nd Quintile"):
 * The second of four values that divide the N measurements into a frequency
 * distribution of five classes with each containing one fifth of the total
 * population.
 - **5-3** ("3rd Quintile"): The third of four values that divide
 * the N measurements into a frequency distribution of five classes with each
 * containing one fifth of the total population.
 - **5-4** ("4th Quintile"): The
 * fourth of four values that divide the N measurements into a frequency
 * distribution of five classes with each containing one fifth of the total
 * population.
 - **skew** ("Skew"): Skewness is a measure of the asymmetry of the
 * probability distribution of a real-valued random variable about its mean. The
 * skewness value can be positive or negative, or even undefined.  Source:
 * [Wikipedia](https://en.wikipedia.org/wiki/Skewness).
 - **kurtosis**
 * ("Kurtosis"): Kurtosis  is a measure of the "tailedness" of the probability
 * distribution of a real-valued random variable.   Source:
 * [Wikipedia](https://en.wikipedia.org/wiki/Kurtosis).
 - **regression**
 * ("Regression"): Linear regression is an approach for modeling two-dimensional
 * sample points with one independent variable and one dependent variable
 * (conventionally, the x and y coordinates in a Cartesian coordinate system) and
 * finds a linear function (a non-vertical straight line) that, as accurately as
 * possible, predicts the dependent variable values as a function of the
 * independent variables. Source:
 * [Wikipedia](https://en.wikipedia.org/wiki/Simple_linear_regression)  This
 * Statistic code will return both a gradient and an intercept value.


If
 * successful, the operation returns an Observation resource for each code with the
 * results of the statistical calculations as component value pairs where the
 * component code = the statistical code. The Observation also contains the input
 * parameters `patient`,`code` and `duration` parameters. If unsuccessful, an
 * [OperationOutcome](operationoutcome.html) with an error message will be
 * returned.

The client can request that all the observations on which the
 * statistics are based be returned as well, using the include parameter. If an
 * include parameter is specified, a limit may also be specified; the sources
 * observations are subsetted at the server's discretion if count > limit. This
 * functionality is included with the intent of supporting graphical presentation
 * @see {@link http://hl7.org/fhir/OperationDefinition/Observation-stats}
 */
  constructor(public parameters: ObservationStatsOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$stats",
      resourceType: "Observation",
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: ObservationStatsOperationResult;
}

export interface ObservationStatsOperationParameters {
  /**
   * The subject of the relevant Observations, which has the value of the
   * Observation.subject.reference. E.g. 'Patient/123'. Reference can be to an
   * absolute URL, but servers only perform stats on their own observations
   * @fhirType uri
   */
  subject: string;
  /**
 * The test code(s) upon which the statistics are being performed. Provide along
 * with a system, or as a coding. For example, the LOINC code  = 
2339-0 (Glucose
 * [Mass/ volume] in Blood) will evaluate all relevant Observations with this code
 * in `Observation.code` and `Observation.component.code`. For LOINC codes that are
 * panels, e.g., 85354-9(Blood pressure panel with all children optional), the
 * stats operation returns statistics for each of the individual panel
 * measurements.  That means it will include and evaluate all values grouped by
 * code for all the individual observations that are: 1) referenced in   `.related`
 * for `.related.type` = 'has-member'  and 2) component observations in
 * `Observation.component`.
 */
  code?: Array<string> | undefined;
  /**
   * The system for the code(s). Or provide a coding instead
   * @fhirType uri
   */
  system?: string | undefined;
  /**
   * The test code upon which the statistics are being performed, as a Coding
   */
  coding?: Array<Coding> | undefined;
  /**
   * The time period of interest given as hours.  For example, the duration = "1"
   * represents the last hour - the time period from on hour ago to now
   * @fhirType decimal
   */
  duration?: number | undefined;
  /**
   * The time period over which the calculations to be performed, if a duration is
   * not provided
   */
  period?: Period | undefined;
  /**
   * average|max|min|count  The statistical operations to be performed on the
   * relevant operations. Multiple statistics operations can be specified. These
   * codes are defined [here](valueset-observation-statistics.html)
   * @fhirType code
   */
  statistic: Array<string>;
  /**
   * Whether to return the observations on which the statistics are based
   */
  include?: boolean | undefined;
  /**
   * If an include parameter is specified, a limit may also be specified to limit the
   * number of source Observations returned.  If the include parameter is absent or
   * equal to "false" the limit parameter SHALL be ignored by the server
   * @fhirType positiveInt
   */
  limit?: number | undefined;
}

export interface ObservationStatsOperationResult {
  /**
   * A set of observations, one observation for each code, each containing one
   * component for each statistic. The Observation.component.code contains the
   * statistic, and is relative to the Observation.code and cannot be interpreted
   * independently.  The Observation will also contain a subject, effectivePeriod,
   * and code reflecting the input parameters.  The status is fixed to `final`.
   */
  statistics: Array<Observation>;
  /**
   * Source observations on which the statistics are based
   */
  source?: Array<Observation> | undefined;
}

/**
 * Fetch Patient Record
 *
 * This operation is used to return all the information related to one or more
 * patients described in the resource or context on which this operation is
 * invoked. The response is a bundle of type "searchset". At a minimum, the patient
 * resource(s) itself is returned, along with any other resources that the server
 * has that are related to the patient(s), and that are available for the given
 * user. The server also returns whatever resources are needed to support the
 * records - e.g. linked practitioners, medications, locations, organizations etc.
 * The intended use for this operation is to provide a patient with access to
 * their entire record (e.g. "Blue Button"), or for provider or other user to
 * perform a bulk data download.  The server SHOULD return at least all resources
 * that it has that are in the patient compartment for the identified patient(s),
 * and any resource referenced from those, including binaries and attachments. The
 * server SHOULD resolve version-specific references by returning the explicitly
 * named version. In the US Realm, at a minimum, the resources returned SHALL
 * include all the data covered by the meaningful use common data elements as
 * defined in the US Core Implementation Guide. Other applicable implementation
 * guides may make additional rules about how much information that is returned.
 * @see {@link http://hl7.org/fhir/OperationDefinition/Patient-everything}
 */
export class PatientEverythingOperation implements Operation<Bundle> {
  /**
   * Fetch Patient Record
   *
   * This operation is used to return all the information related to one or more
   * patients described in the resource or context on which this operation is
   * invoked. The response is a bundle of type "searchset". At a minimum, the patient
   * resource(s) itself is returned, along with any other resources that the server
   * has that are related to the patient(s), and that are available for the given
   * user. The server also returns whatever resources are needed to support the
   * records - e.g. linked practitioners, medications, locations, organizations etc.
   * The intended use for this operation is to provide a patient with access to
   * their entire record (e.g. "Blue Button"), or for provider or other user to
   * perform a bulk data download.  The server SHOULD return at least all resources
   * that it has that are in the patient compartment for the identified patient(s),
   * and any resource referenced from those, including binaries and attachments. The
   * server SHOULD resolve version-specific references by returning the explicitly
   * named version. In the US Realm, at a minimum, the resources returned SHALL
   * include all the data covered by the meaningful use common data elements as
   * defined in the US Core Implementation Guide. Other applicable implementation
   * guides may make additional rules about how much information that is returned.
   * @see {@link http://hl7.org/fhir/OperationDefinition/Patient-everything}
   */
  constructor(public parameters: PatientEverythingOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$everything",
      resourceType: "Patient",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Bundle;
}

export interface PatientEverythingOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * The date range relates to care dates, not record currency dates - e.g. all
   * records relating to care provided in a certain date range. If no start date is
   * provided, all records prior to the end date are in scope.
   * @fhirType date
   */
  start?: string | undefined;
  /**
   * The date range relates to care dates, not record currency dates - e.g. all
   * records relating to care provided in a certain date range. If no end date is
   * provided, all records subsequent to the start date are in scope.
   * @fhirType date
   */
  end?: string | undefined;
  /**
   * Resources updated after this period will be included in the response. The intent
   * of this parameter is to allow a client to request only records that have changed
   * since the last request, based on either the return header time, or or (for
   * asynchronous use), the transaction time
   * @fhirType instant
   */
  _since?: string | undefined;
  /**
   * One or more parameters, each containing one or more comma-delimited FHIR
   * resource types to include in the return resources. In the absence of any
   * specified types, the server returns all resource types
   * @fhirType code
   */
  _type?: Array<string> | undefined;
  /**
   * See discussion below on the utility of paging through the results of the
   * $everything operation
   * @fhirType integer
   */
  _count?: number | undefined;
}

/**
 * Find patient matches using MPI based logic
 * 
 * A Master Patient Index
 * ([MPI](http://en.wikipedia.org/wiki/Enterprise_master_patient_index) ) is a
 * service used to manage patient identification in a context where multiple
 * patient databases exist. Healthcare applications and middleware use the MPI to
 * match patients between the databases, and to store new patient details as they
 * are encountered. MPIs are highly specialized applications, often tailored
 * extensively to the institution's particular mix of patients. MPIs can also be
 * run on a regional and national basis.  

To ask an MPI to match a patient,
 * clients use the "$match" operation, which accepts a patient resource which may
 * be only partially complete. The data provided is interpreted as an MPI input and
 * processed by an algorithm of some kind that uses the data to determine the most
 * appropriate matches in the patient set.  Note that different MPI matching
 * algorithms have different required inputs. Consult with the vendor implementing
 * the $match operation as to its specific behaviors.

  The generic $match
 * operation does not specify any particular algorithm, nor a minimum set of
 * information that must be provided when asking for an MPI match operation to be
 * performed, but many implementations will have a set of minimum information,
 * which may be declared in their definition of the $match operation by specifying
 * a profile on the resource parameter, indicating which properties are required in
 * the search.

The patient resource submitted to the operation does not have to be
 * complete, nor does it need to pass validation (i.e. mandatory fields don't need
 * to be populated), but it does have to be a valid instance, as it is used as the
 * reference data to match against.

  Implementers of the $match algorithm should
 * consider the relevance of returning inactive patients, particularly ones
 * associated with patient merges.

E.g. If an inactive patient is "matched" and
 * its merged target resource will be included, then the inactive one may be
 * excluded, however if a patient was just marked as inactive for other reasons, it
 * could be included in the results.

(any specific MPI algorithm may or might not
 * behave as in these examples)
 * @see {@link http://hl7.org/fhir/OperationDefinition/Patient-match}
 */
export class PatientMatchOperation implements Operation<Bundle> {
  /**
 * Find patient matches using MPI based logic
 * 
 * A Master Patient Index
 * ([MPI](http://en.wikipedia.org/wiki/Enterprise_master_patient_index) ) is a
 * service used to manage patient identification in a context where multiple
 * patient databases exist. Healthcare applications and middleware use the MPI to
 * match patients between the databases, and to store new patient details as they
 * are encountered. MPIs are highly specialized applications, often tailored
 * extensively to the institution's particular mix of patients. MPIs can also be
 * run on a regional and national basis.  

To ask an MPI to match a patient,
 * clients use the "$match" operation, which accepts a patient resource which may
 * be only partially complete. The data provided is interpreted as an MPI input and
 * processed by an algorithm of some kind that uses the data to determine the most
 * appropriate matches in the patient set.  Note that different MPI matching
 * algorithms have different required inputs. Consult with the vendor implementing
 * the $match operation as to its specific behaviors.

  The generic $match
 * operation does not specify any particular algorithm, nor a minimum set of
 * information that must be provided when asking for an MPI match operation to be
 * performed, but many implementations will have a set of minimum information,
 * which may be declared in their definition of the $match operation by specifying
 * a profile on the resource parameter, indicating which properties are required in
 * the search.

The patient resource submitted to the operation does not have to be
 * complete, nor does it need to pass validation (i.e. mandatory fields don't need
 * to be populated), but it does have to be a valid instance, as it is used as the
 * reference data to match against.

  Implementers of the $match algorithm should
 * consider the relevance of returning inactive patients, particularly ones
 * associated with patient merges.

E.g. If an inactive patient is "matched" and
 * its merged target resource will be included, then the inactive one may be
 * excluded, however if a patient was just marked as inactive for other reasons, it
 * could be included in the results.

(any specific MPI algorithm may or might not
 * behave as in these examples)
 * @see {@link http://hl7.org/fhir/OperationDefinition/Patient-match}
 */
  constructor(public parameters: PatientMatchOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$match",
      resourceType: "Patient",
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Bundle;
}

export interface PatientMatchOperationParameters {
  /**
   * Use this to provide an entire set of patient details for the MPI to match
   * against (e.g. POST a patient record to Patient/$match).
   */
  resource: Resource;
  /**
   * If there are multiple potential matches, then the match should not return the
   * results with this flag set to true.  When false, the server may return multiple
   * results with each result graded accordingly.
   */
  onlyCertainMatches?: boolean | undefined;
  /**
   * The maximum number of records to return. If no value is provided, the server
   * decides how many matches to return. Note that clients should be careful when
   * using this, as it may prevent probable - and valid - matches from being returned
   * @fhirType integer
   */
  count?: number | undefined;
}

/**
 * Patient Merge
 * 
 * The merge operation is used to request two patient resources be merged. One of
 * the two patients is identified as the source and one as the target. The data
 * from the source patient will be merged with the data of the target patient.

The
 * source Patient resource will be updated to add a new Patient.link reference to
 * the target Patient resource with a link-type of replaced-by. The source Patient
 * will also be updated to have a status of inactive, unless the source Patient
 * resource was deleted.

The target Patient resource will be updated to add a new
 * Patient.link reference to the source Patient resource with a link-type of
 * replaces unless the source Patient resource is deleted. The target Patient
 * resource must be included in the result-patient parameter if used.
 * @see {@link http://hl7.org/fhir/OperationDefinition/Patient-merge}
 */
export class PatientMergeOperation implements Operation<Parameters> {
  /**
 * Patient Merge
 * 
 * The merge operation is used to request two patient resources be merged. One of
 * the two patients is identified as the source and one as the target. The data
 * from the source patient will be merged with the data of the target patient.

The
 * source Patient resource will be updated to add a new Patient.link reference to
 * the target Patient resource with a link-type of replaced-by. The source Patient
 * will also be updated to have a status of inactive, unless the source Patient
 * resource was deleted.

The target Patient resource will be updated to add a new
 * Patient.link reference to the source Patient resource with a link-type of
 * replaces unless the source Patient resource is deleted. The target Patient
 * resource must be included in the result-patient parameter if used.
 * @see {@link http://hl7.org/fhir/OperationDefinition/Patient-merge}
 */
  constructor(public parameters: PatientMergeOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$merge",
      resourceType: "Patient",
      parameters: this.parameters,
      affectsState: true,
    };
  }

  public _resultTypeDoNotUse?: Parameters;
}

export interface PatientMergeOperationParameters {
  /**
   * A direct resource reference to the **source** patient resource (this may include
   * an identifier).
   */
  "source-patient"?: Reference | undefined;
  /**
   * When source-patient-identifiers are provided, the server is expected to perform
   * an internal lookup to identify the source patient record. The server SHALL
   * reject the request if the provided identifiers do not resolve to a single
   * patient record. This resolution MAY occur asynchronously, for example, as part
   * of a review by a user.
   */
  "source-patient-identifier"?: Array<Identifier> | undefined;
  /**
 * A direct resource reference to the **target** patient resource.

This is the
 * surviving patient resource, the target for the merge.
 */
  "target-patient"?: Reference | undefined;
  /**
   * When target-patient-identifiers are provided, the server is expected to perform
   * an internal lookup to identify the target patient record. The server SHALL
   * reject the request if the provided identifiers do not resolve to a single
   * patient record. This resolution MAY occur asynchronously, for example, as part
   * of a review by a user.
   */
  "target-patient-identifier"?: Array<Identifier> | undefined;
  /**
 * The details of the Patient resource that is expected to be updated to complete
 * with and must have the same patient.id and provided identifiers included.

This
 * resource MUST have the link property included referencing the source patient
 * resource.

It will be used to perform an update on the target patient
 * resource.

In the absence of this parameter the servers should copy all
 * identifiers from the source patient into the target patient, and include the
 * link property (as shown in the example below).

This is often used when
 * properties from the source patient are desired to be included in the target
 * resource.

The receiving system may also apply other internal business rules
 * onto the merge which may make the resource different from what is provided here.
 */
  "result-patient"?: Patient | undefined;
  /**
 * If this is set to true then the merge will not be actually performed; an
 * OperationOutcome will be returned in the Parameters response that will indicate
 * that no merge has occurred and may include other diagnostic info if desired,
 * such as the scale of the merge.

e.g. Issue.details.text "Preview only Patient
 * merge - no issues detected"

e.g. Issue.diagnostics "Merge would update: 10
 * years of content or 120 resources"

The resulting target patient resource will
 * also be returned in the result.
 */
  preview?: boolean | undefined;
}

/**
 * Apply
 *
 * The apply operation applies a PlanDefinition to a given subject
 * @see {@link http://hl7.org/fhir/OperationDefinition/PlanDefinition-apply}
 */
export class PlanDefinitionApplyOperation
  implements Operation<Array<Bundle> | undefined>
{
  /**
   * Apply
   *
   * The apply operation applies a PlanDefinition to a given subject
   * @see {@link http://hl7.org/fhir/OperationDefinition/PlanDefinition-apply}
   */
  constructor(public parameters: PlanDefinitionApplyOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$apply",
      resourceType: "PlanDefinition",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Array<Bundle> | undefined;
}

export interface PlanDefinitionApplyOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * The plan definition to be applied. If the operation is invoked at the instance
   * level, this parameter is not allowed; if the operation is invoked at the type
   * level, this parameter is required, or a url (and optionally version) must be
   * supplied
   */
  planDefinition?: PlanDefinition | undefined;
  /**
   * The url of the plan definition to be applied. If the operation is invoked at the
   * instance level, this parameter is not allowed; if the operation is invoked at
   * the type level, this parameter (and optionally the version), or the
   * planDefinition parameter must be supplied
   * @fhirType canonical
   */
  url?: string | undefined;
  /**
   * The version of the plan definition to be applied. If the operation is invoked at
   * the instance level, this parameter is not allowed; if the operation is invoked
   * at the type level, this parameter may only be used if the url parameter is
   * supplied.
   */
  version?: string | undefined;
  /**
   * The subject(s) that is/are the target of the plan to be applied. The subject may
   * be a Patient, Practitioner, Organization, Location, Device, or Group. Subjects
   * provided in this parameter will be resolved as the subject of the PlanDefinition
   * based on the type of the subject. If multiple subjects of the same type are
   * provided, the behavior is implementation-defined
   */
  subject: Array<string>;
  /**
   * The encounter in context, if any
   */
  encounter?: string | undefined;
  /**
   * The practitioner applying the plan definition
   */
  practitioner?: string | undefined;
  /**
   * The organization applying the plan definition
   */
  organization?: string | undefined;
  /**
   * The type of user initiating the request, e.g. patient, healthcare provider, or
   * specific type of healthcare provider (physician, nurse, etc.)
   */
  userType?: CodeableConcept | undefined;
  /**
   * Preferred language of the person using the system
   */
  userLanguage?: CodeableConcept | undefined;
  /**
   * The task the system user is performing, e.g. laboratory results review,
   * medication list review, etc. This information can be used to tailor decision
   * support outputs, such as recommended information resources
   */
  userTaskContext?: CodeableConcept | undefined;
  /**
   * The current setting of the request (inpatient, outpatient, etc.)
   */
  setting?: CodeableConcept | undefined;
  /**
   * Additional detail about the setting of the request, if any
   */
  settingContext?: CodeableConcept | undefined;
}

/**
 * Data Requirements
 *
 * The data-requirements operation aggregates and returns the parameters and data
 * requirements for the plan definition and all its dependencies as a single module
 * definition library
 * @see {@link http://hl7.org/fhir/OperationDefinition/PlanDefinition-data-requirements}
 */
export class PlanDefinitionDataRequirementsOperation
  implements Operation<Library>
{
  /**
   * Data Requirements
   *
   * The data-requirements operation aggregates and returns the parameters and data
   * requirements for the plan definition and all its dependencies as a single module
   * definition library
   * @see {@link http://hl7.org/fhir/OperationDefinition/PlanDefinition-data-requirements}
   */
  constructor(
    public parameters: PlanDefinitionDataRequirementsOperationParameters
  ) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$data-requirements",
      resourceType: "PlanDefinition",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Library;
}

export interface PlanDefinitionDataRequirementsOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId: string;
}

/**
 * Add to an array in a large resource
 *
 * Add content to an array in a large resource such as List or Group. See
 * [Operations for Large Resources](operations-for-large-resources.html).
 * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-add}
 */
export class ResourceAddOperation implements Operation<Resource | undefined> {
  /**
   * Add to an array in a large resource
   *
   * Add content to an array in a large resource such as List or Group. See
   * [Operations for Large Resources](operations-for-large-resources.html).
   * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-add}
   */
  constructor(public parameters: ResourceAddOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$add",
      resourceType: this.parameters.resourceType,
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: true,
    };
  }

  public _resultTypeDoNotUse?: Resource | undefined;
}

export interface ResourceAddOperationParameters {
  resourceType: AnyResourceType;
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId: string;
  /**
   * Resource containing content to add. See [Operations for Large
   * Resources](operations-for-large-resources.html).
   */
  additions: Resource;
}

/**
 * Convert from one form to another
 *
 * This operation takes a resource in one form, and returns to in another form.
 * Both the `resource` and `return` parameters are a single resource. The primary
 * use of this operation is to convert between formats (e.g. (XML -> JSON or vice
 * versa)
 * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-convert}
 */
export class ResourceConvertOperation implements Operation<Resource> {
  /**
   * Convert from one form to another
   *
   * This operation takes a resource in one form, and returns to in another form.
   * Both the `resource` and `return` parameters are a single resource. The primary
   * use of this operation is to convert between formats (e.g. (XML -> JSON or vice
   * versa)
   * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-convert}
   */
  constructor(public parameters: ResourceConvertOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$convert",
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Resource;
}

export interface ResourceConvertOperationParameters {
  resourceType: AnyResourceType;
  /**
   * The resource that is to be converted
   */
  resource: Resource;
}

/**
 * Filter an array in a large resource
 *
 * Filter content from an array in a large resource such as List or Group. See
 * [Operations for Large Resources](operations-for-large-resources.html).
 * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-filter}
 */
export class ResourceFilterOperation
  implements Operation<Resource | undefined>
{
  /**
   * Filter an array in a large resource
   *
   * Filter content from an array in a large resource such as List or Group. See
   * [Operations for Large Resources](operations-for-large-resources.html).
   * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-filter}
   */
  constructor(public parameters: ResourceFilterOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$filter",
      resourceType: this.parameters.resourceType,
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: true,
    };
  }

  public _resultTypeDoNotUse?: Resource | undefined;
}

export interface ResourceFilterOperationParameters {
  resourceType: AnyResourceType;
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId: string;
  /**
   * Resource containing content that acts as a filter. See [Operations for Large
   * Resources](operations-for-large-resources.html).
   */
  probes: Resource;
}

/**
 * Return a graph of resources
 *
 * Return an entire graph of resources based on a
 * [GraphDefinition](graphdefinition.html). The operation is invoked on a specific
 * instance of a resource, and the graph definition tells the server what other
 * resources to return in the same packaage
 * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-graph}
 */
export class ResourceGraphOperation
  implements Operation<ResourceGraphOperationResult>
{
  /**
   * Return a graph of resources
   *
   * Return an entire graph of resources based on a
   * [GraphDefinition](graphdefinition.html). The operation is invoked on a specific
   * instance of a resource, and the graph definition tells the server what other
   * resources to return in the same packaage
   * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-graph}
   */
  constructor(public parameters: ResourceGraphOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$graph",
      resourceType: this.parameters.resourceType,
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: ResourceGraphOperationResult;
}

export interface ResourceGraphOperationParameters {
  resourceType: AnyResourceType;
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId: string;
  /**
   * Servers MAY choose to allow any graph definition to be specified, but MAY
   * require that the client choose a graph definition from a specific list of known
   * supported definitions. The server is not required to support a formal definition
   * of the graph on the end point
   * @fhirType uri
   */
  graph: string;
}

export interface ResourceGraphOperationResult {
  /**
   * The set of resources that were in the graph based on the provided definition
   */
  result: Bundle;
}

/**
 * Execute a graphql statement
 * 
 * Execute a graphql statement on a since resource or against the entire system.
 * See the [Using GraphQL with FHIR](graphql.html) page for further details.

For
 * the purposes of graphQL compatibility, this operation can also be invoked using
 * a POST with the graphQL as the body, or a JSON body (see [graphQL
 * spec](http://graphql.org/) for details)
 * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-graphql}
 */
export class ResourceGraphqlOperation
  implements Operation<ResourceGraphqlOperationResult>
{
  /**
 * Execute a graphql statement
 * 
 * Execute a graphql statement on a since resource or against the entire system.
 * See the [Using GraphQL with FHIR](graphql.html) page for further details.

For
 * the purposes of graphQL compatibility, this operation can also be invoked using
 * a POST with the graphQL as the body, or a JSON body (see [graphQL
 * spec](http://graphql.org/) for details)
 * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-graphql}
 */
  constructor(public parameters: ResourceGraphqlOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$graphql",
      resourceType: this.parameters.resourceType,
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: ResourceGraphqlOperationResult;
}

export interface ResourceGraphqlOperationParameters {
  resourceType: AnyResourceType;
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   *
   */
  query: string;
}

export interface ResourceGraphqlOperationResult {
  /**
   * The content is always returned as application/json; this SHOULD be specified in
   * the Accept header
   */
  result: Binary;
}

/**
 * Add profiles, tags, and security labels to a resource
 *
 * This operation takes a meta, and adds the profiles, tags, and security labels
 * found in it to the nominated resource
 * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-meta-add}
 */
export class ResourceMetaAddOperation implements Operation<Meta> {
  /**
   * Add profiles, tags, and security labels to a resource
   *
   * This operation takes a meta, and adds the profiles, tags, and security labels
   * found in it to the nominated resource
   * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-meta-add}
   */
  constructor(public parameters: ResourceMetaAddOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$meta-add",
      resourceType: this.parameters.resourceType,
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: true,
    };
  }

  public _resultTypeDoNotUse?: Meta;
}

export interface ResourceMetaAddOperationParameters {
  resourceType: AnyResourceType;
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId: string;
  /**
   * Profiles, tags, and security labels to add to the existing resource. Note that
   * profiles, tags, and security labels are sets, and duplicates are not created.
   * The identity of a tag or security label is the system+code. When matching
   * existing tags during adding, version and display are ignored. For profiles,
   * matching is based on the full URL
   */
  meta: Meta;
}

/**
 * Delete profiles, tags, and security labels for a resource
 *
 * This operation takes a meta, and deletes the profiles, tags, and security labels
 * found in it from the nominated resource
 * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-meta-delete}
 */
export class ResourceMetaDeleteOperation implements Operation<Meta> {
  /**
   * Delete profiles, tags, and security labels for a resource
   *
   * This operation takes a meta, and deletes the profiles, tags, and security labels
   * found in it from the nominated resource
   * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-meta-delete}
   */
  constructor(public parameters: ResourceMetaDeleteOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$meta-delete",
      resourceType: this.parameters.resourceType,
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: true,
    };
  }

  public _resultTypeDoNotUse?: Meta;
}

export interface ResourceMetaDeleteOperationParameters {
  resourceType: AnyResourceType;
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId: string;
  /**
   * Profiles, tags, and security labels to delete from the existing resource. It is
   * not an error if these tags, profiles, and labels do not exist.  The identity of
   * a tag or security label is the system+code. When matching existing tags during
   * deletion, version and display are ignored. For profiles, matching is based on
   * the full URL
   */
  meta: Meta;
}

/**
 * Access a list of profiles, tags, and security labels
 * 
 * This operation retrieves a summary of the profiles, tags, and security labels
 * for the given scope; e.g. for each scope:  

* system-wide: a list of all
 * profiles, tags and security labels in use by the system 
* resource-type level:
 * A list of all profiles, tags, and security labels for the resource type 
*
 * individual resource level: A list of all profiles, tags, and security labels for
 * the current version of the resource.  Also, as a special case, this operation
 * (and other meta operations) can be performed on a historical version of a
 * resource)
 * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-meta}
 */
export class ResourceMetaOperation implements Operation<Meta> {
  /**
 * Access a list of profiles, tags, and security labels
 * 
 * This operation retrieves a summary of the profiles, tags, and security labels
 * for the given scope; e.g. for each scope:  

* system-wide: a list of all
 * profiles, tags and security labels in use by the system 
* resource-type level:
 * A list of all profiles, tags, and security labels for the resource type 
*
 * individual resource level: A list of all profiles, tags, and security labels for
 * the current version of the resource.  Also, as a special case, this operation
 * (and other meta operations) can be performed on a historical version of a
 * resource)
 * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-meta}
 */
  constructor(public parameters: ResourceMetaOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$meta",
      resourceType: this.parameters.resourceType,
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Meta;
}

export interface ResourceMetaOperationParameters {
  resourceType: AnyResourceType;
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
}

/**
 * Remove from an array in a large resource
 *
 * Remove content from an array in a large resource such as List or Group. See
 * [Operations for Large Resources](operations-for-large-resources.html).
 * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-remove}
 */
export class ResourceRemoveOperation
  implements Operation<Resource | undefined>
{
  /**
   * Remove from an array in a large resource
   *
   * Remove content from an array in a large resource such as List or Group. See
   * [Operations for Large Resources](operations-for-large-resources.html).
   * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-remove}
   */
  constructor(public parameters: ResourceRemoveOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$remove",
      resourceType: this.parameters.resourceType,
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: true,
    };
  }

  public _resultTypeDoNotUse?: Resource | undefined;
}

export interface ResourceRemoveOperationParameters {
  resourceType: AnyResourceType;
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId: string;
  /**
   * Resource containing content to remove. See [Operations for Large
   * Resources](operations-for-large-resources.html).
   */
  removals: Resource;
}

/**
 * Validate a resource
 * 
 * The validate operation checks whether the attached content would be acceptable
 * either generally, as a create, an update or as a delete to an existing resource.
 * The action the server takes depends on the mode parameter:  

* [mode not
 * provided]: The server checks the content of the resource against any schema,
 * constraint rules, and other general terminology rules 
* create: The server
 * checks the content, and then checks that the content would be acceptable as a
 * create (e.g. that the content would not violate any uniqueness constraints) 
*
 * update: The server checks the content, and then checks that it would accept it
 * as an update against the nominated specific resource (e.g. that there are no
 * changes to immutable fields the server does not allow to change, and checking
 * version integrity if appropriate) 
* delete: The server ignores the content, and
 * checks that the nominated resource is allowed to be deleted (e.g. checking
 * referential integrity rules)  

Modes update and delete can only be used when
 * the operation is invoked at the resource instance level.   The return from this
 * operation is an [OperationOutcome](operationoutcome.html)

Note that this
 * operation is not the only way to validate resources - see [Validating
 * Resources](validation.html) for further information.
 * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-validate}
 */
export class ResourceValidateOperation implements Operation<OperationOutcome> {
  /**
 * Validate a resource
 * 
 * The validate operation checks whether the attached content would be acceptable
 * either generally, as a create, an update or as a delete to an existing resource.
 * The action the server takes depends on the mode parameter:  

* [mode not
 * provided]: The server checks the content of the resource against any schema,
 * constraint rules, and other general terminology rules 
* create: The server
 * checks the content, and then checks that the content would be acceptable as a
 * create (e.g. that the content would not violate any uniqueness constraints) 
*
 * update: The server checks the content, and then checks that it would accept it
 * as an update against the nominated specific resource (e.g. that there are no
 * changes to immutable fields the server does not allow to change, and checking
 * version integrity if appropriate) 
* delete: The server ignores the content, and
 * checks that the nominated resource is allowed to be deleted (e.g. checking
 * referential integrity rules)  

Modes update and delete can only be used when
 * the operation is invoked at the resource instance level.   The return from this
 * operation is an [OperationOutcome](operationoutcome.html)

Note that this
 * operation is not the only way to validate resources - see [Validating
 * Resources](validation.html) for further information.
 * @see {@link http://hl7.org/fhir/OperationDefinition/Resource-validate}
 */
  constructor(public parameters: ResourceValidateOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$validate",
      resourceType: this.parameters.resourceType,
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: OperationOutcome;
}

export interface ResourceValidateOperationParameters {
  resourceType: AnyResourceType;
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * Must be present unless the mode is "delete"
   */
  resource?: Resource | undefined;
  /**
   * Default is 'no action'; (e.g. general validation)
   * @fhirType code
   */
  mode?: string | undefined;
  /**
   * If this is nominated, then the resource is validated against this specific
   * profile. If a profile is nominated, and the server cannot validate against the
   * nominated profile, it SHALL return an error
   * @fhirType canonical
   */
  profile?: string | undefined;
  /**
   * Indicates an implementation context that applies to this validation.  Influences
   * which [additionalBindings](terminologies.html#binding) are relevant.  NOTE:
   * Expectations around subsumption testing, etc. are not yet defined and may be
   * server-specific.
   */
  usageContext?: Array<UsageContext> | undefined;
}

/**
 * Apply
 *
 * The apply operation applies a SpecimenDefinition in a given context to create a
 * Specimen resource instance
 * @see {@link http://hl7.org/fhir/OperationDefinition/SpecimenDefinition-apply}
 */
export class SpecimenDefinitionApplyOperation implements Operation<Specimen> {
  /**
   * Apply
   *
   * The apply operation applies a SpecimenDefinition in a given context to create a
   * Specimen resource instance
   * @see {@link http://hl7.org/fhir/OperationDefinition/SpecimenDefinition-apply}
   */
  constructor(public parameters: SpecimenDefinitionApplyOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$apply",
      resourceType: "SpecimenDefinition",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Specimen;
}

export interface SpecimenDefinitionApplyOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * The specimen definition to be applied. If the operation is invoked at the
   * instance level, this parameter is not allowed; if the operation is invoked at
   * the type level, this parameter is required
   */
  specimenDefinition?: SpecimenDefinition | undefined;
  /**
   * The subject(s) that is/are the target of the Specimen instance to be created.
   * The subject may be a Patient, Group, Device, Substance or Location. Subjects
   * provided in this parameter will be resolved as the subject of the Specimen based
   * on the type of the subject. If multiple subjects of the same type are provided,
   * the behavior is implementation-defined
   */
  subject: Array<string>;
  /**
   * The practitioner (or practitioner role) that is collecting the specimen
   */
  collector?: string | undefined;
  /**
   * The type of user initiating the request, e.g. patient, healthcare provider, or
   * specific type of healthcare provider (physician, nurse, etc.)
   */
  userType?: CodeableConcept | undefined;
  /**
   * Preferred language of the person using the system
   */
  userLanguage?: CodeableConcept | undefined;
  /**
   * The task the system user is performing, e.g. laboratory results review,
   * medication list review, etc. This information can be used to tailor decision
   * support outputs, such as recommended information resources
   */
  userTaskContext?: CodeableConcept | undefined;
  /**
   * The current setting of the request (inpatient, outpatient, etc.)
   */
  setting?: CodeableConcept | undefined;
  /**
   * Additional detail about the setting of the request, if any
   */
  settingContext?: CodeableConcept | undefined;
}

/**
 * Build Questionnaire
 * 
 * Generates a [Questionnaire](questionnaire.html) instance  based on a specified
 * [StructureDefinition](structuredefinition.html), creating questions for each
 * core element or extension element found in the
 * [StructureDefinition](structuredefinition.html).    

If the operation is not
 * called at the instance level, one of the *identifier*, *profile* or *url* 'in'
 * parameters must be provided. If more than one is specified, servers may raise an
 * error or may resolve with the parameter of their choice. If called at the
 * instance level, these parameters will be ignored. The response will contain a
 * [Questionnaire](questionnaire.html) instance based on the specified
 * [StructureDefinition](structuredefinition.html) and/or an
 * [OperationOutcome](operationoutcome.html) resource with errors or warnings.
 * Nested groups are used to handle complex structures and data types.  If the
 * 'supportedOnly' parameter is set to true, only those elements marked as "must
 * support" will be included.  

This operation is intended to enable
 * auto-generation of simple interfaces for arbitrary profiles.  The
 * 'questionnaire' approach to data entry has limitations that will make it less
 * optimal than custom-defined interfaces.  However, this function may be useful
 * for simple applications or for systems that wish to support "non-core" resources
 * with minimal development effort.
 * @see {@link http://hl7.org/fhir/OperationDefinition/StructureDefinition-questionnaire}
 */
export class StructureDefinitionQuestionnaireOperation
  implements Operation<Questionnaire>
{
  /**
 * Build Questionnaire
 * 
 * Generates a [Questionnaire](questionnaire.html) instance  based on a specified
 * [StructureDefinition](structuredefinition.html), creating questions for each
 * core element or extension element found in the
 * [StructureDefinition](structuredefinition.html).    

If the operation is not
 * called at the instance level, one of the *identifier*, *profile* or *url* 'in'
 * parameters must be provided. If more than one is specified, servers may raise an
 * error or may resolve with the parameter of their choice. If called at the
 * instance level, these parameters will be ignored. The response will contain a
 * [Questionnaire](questionnaire.html) instance based on the specified
 * [StructureDefinition](structuredefinition.html) and/or an
 * [OperationOutcome](operationoutcome.html) resource with errors or warnings.
 * Nested groups are used to handle complex structures and data types.  If the
 * 'supportedOnly' parameter is set to true, only those elements marked as "must
 * support" will be included.  

This operation is intended to enable
 * auto-generation of simple interfaces for arbitrary profiles.  The
 * 'questionnaire' approach to data entry has limitations that will make it less
 * optimal than custom-defined interfaces.  However, this function may be useful
 * for simple applications or for systems that wish to support "non-core" resources
 * with minimal development effort.
 * @see {@link http://hl7.org/fhir/OperationDefinition/StructureDefinition-questionnaire}
 */
  constructor(
    public parameters: StructureDefinitionQuestionnaireOperationParameters
  ) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$questionnaire",
      resourceType: "StructureDefinition",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Questionnaire;
}

export interface StructureDefinitionQuestionnaireOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * A logical identifier (i.e. 'StructureDefinition.identifier''). The server must
   * know the StructureDefinition or be able to retrieve it from other known
   * repositories.
   */
  identifier?: Identifier | undefined;
  /**
   * The [StructureDefinition](structuredefinition.html) is provided directly as part
   * of the request. Servers may choose not to accept profiles in this fashion
   */
  profile?: StructureDefinition | undefined;
  /**
   * The StructureDefinition's official URL (i.e. 'StructureDefinition.url'). The
   * server must know the StructureDefinition or be able to retrieve it from other
   * known repositories.
   * @fhirType canonical
   */
  url?: string | undefined;
  /**
   * If true, the questionnaire will only include those elements marked as
   * "mustSupport='true'" in the StructureDefinition.
   */
  supportedOnly?: boolean | undefined;
}

/**
 * Generate Snapshot
 * 
 * Generates a [StructureDefinition](structuredefinition.html) instance  with  a
 * snapshot, based on a differential in a specified
 * [StructureDefinition](structuredefinition.html).   

If the operation is not
 * called at the instance level, either *definition* or *url* 'in' parameters must
 * be provided. If more than one is specified, servers may raise an error or may
 * resolve with the parameter of their choice. If called at the instance level,
 * these parameters will be ignored.
 * @see {@link http://hl7.org/fhir/OperationDefinition/StructureDefinition-snapshot}
 */
export class StructureDefinitionSnapshotOperation
  implements Operation<StructureDefinition>
{
  /**
 * Generate Snapshot
 * 
 * Generates a [StructureDefinition](structuredefinition.html) instance  with  a
 * snapshot, based on a differential in a specified
 * [StructureDefinition](structuredefinition.html).   

If the operation is not
 * called at the instance level, either *definition* or *url* 'in' parameters must
 * be provided. If more than one is specified, servers may raise an error or may
 * resolve with the parameter of their choice. If called at the instance level,
 * these parameters will be ignored.
 * @see {@link http://hl7.org/fhir/OperationDefinition/StructureDefinition-snapshot}
 */
  constructor(
    public parameters: StructureDefinitionSnapshotOperationParameters
  ) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$snapshot",
      resourceType: "StructureDefinition",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: true,
    };
  }

  public _resultTypeDoNotUse?: StructureDefinition;
}

export interface StructureDefinitionSnapshotOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * The [StructureDefinition](structuredefinition.html) is provided directly as part
   * of the request. Servers may choose not to accept profiles in this fashion
   */
  definition?: StructureDefinition | undefined;
  /**
   * The StructureDefinition's canonical URL (i.e. 'StructureDefinition.url'). The
   * server must know the structure definition, or be able to retrieve it from other
   * known repositories.
   */
  url?: string | undefined;
}

/**
 * Model Instance Transformation
 *
 * The transform operation takes input content, applies a structure map transform,
 * and then returns the output.
 * @see {@link http://hl7.org/fhir/OperationDefinition/StructureMap-transform}
 */
export class StructureMapTransformOperation implements Operation<Resource> {
  /**
   * Model Instance Transformation
   *
   * The transform operation takes input content, applies a structure map transform,
   * and then returns the output.
   * @see {@link http://hl7.org/fhir/OperationDefinition/StructureMap-transform}
   */
  constructor(public parameters: StructureMapTransformOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$transform",
      resourceType: "StructureMap",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Resource;
}

export interface StructureMapTransformOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * The structure map to apply. This is only needed if the operation is invoked at
   * the resource level and no structureMap has been provided. If the $transform
   * operation is invoked on a particular structure map, this will be ignored by the
   * server
   * @fhirType uri
   */
  source?: string | undefined;
  /**
   * The structure map to apply. This is only needed when the operation is invoked at
   * the resource level and no URI has been provided.
   */
  sourceMap?: StructureMap | undefined;
  /**
   * StructureMap resources that support the source map. If a source URL is provided,
   * the map can be provided in this parameter (or it can be provided as sourceMap).
   */
  supportingMap?: Array<StructureMap> | undefined;
  /**
   * The same as structureMap, but the resource is provided in the mapping language
   * rather than as a structureMap.
   */
  srcMap?: Array<string> | undefined;
  /**
   * The logical content to transform
   */
  content: Resource;
}

/**
 * Search and retrieve prior events for a Subscription
 *
 * This operation is used to search for and return notifications that have been
 * previously triggered by a topic-based Subscription.
 * @see {@link http://hl7.org/fhir/OperationDefinition/Subscription-events}
 */
export class SubscriptionEventsOperation implements Operation<Bundle> {
  /**
   * Search and retrieve prior events for a Subscription
   *
   * This operation is used to search for and return notifications that have been
   * previously triggered by a topic-based Subscription.
   * @see {@link http://hl7.org/fhir/OperationDefinition/Subscription-events}
   */
  constructor(public parameters: SubscriptionEventsOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$events",
      resourceType: "Subscription",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Bundle;
}

export interface SubscriptionEventsOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId: string;
  /**
   * The starting event number, inclusive of this event (lower bound).
   * @fhirType integer64
   */
  eventsSinceNumber?: number | undefined;
  /**
   * The ending event number, inclusive of this event (upper bound).
   * @fhirType integer64
   */
  eventsUntilNumber?: number | undefined;
  /**
   * Requested content style of returned data. Codes from backport-content-value-set
   * (e.g., empty, id-only, full-resource). This is a hint to the server what a
   * client would prefer, and MAY be ignored.
   * @fhirType code
   */
  content?: string | undefined;
}

/**
 * Get a binding token for use in a websocket connection
 *
 * This operation is used to get a token for a websocket client to use in order to
 * bind to one or more subscriptions.
 * @see {@link http://hl7.org/fhir/OperationDefinition/Subscription-get-ws-binding-token}
 */
export class SubscriptionGetWsBindingTokenOperation
  implements Operation<SubscriptionGetWsBindingTokenOperationResult>
{
  /**
   * Get a binding token for use in a websocket connection
   *
   * This operation is used to get a token for a websocket client to use in order to
   * bind to one or more subscriptions.
   * @see {@link http://hl7.org/fhir/OperationDefinition/Subscription-get-ws-binding-token}
   */
  constructor(
    public parameters: SubscriptionGetWsBindingTokenOperationParameters
  ) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$get-ws-binding-token",
      resourceType: "Subscription",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: true,
    };
  }

  public _resultTypeDoNotUse?: SubscriptionGetWsBindingTokenOperationResult;
}

export interface SubscriptionGetWsBindingTokenOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * At the Instance level, this parameter is ignored. At the Resource level, one or
   * more parameters containing a FHIR id for a Subscription to get a token for. In
   * the absence of any specified ids, the server may either return a token for all
   * Subscriptions available to the caller with a channel-type of websocket or fail
   * the request.
   * @fhirType id
   */
  id?: Array<string> | undefined;
}

export interface SubscriptionGetWsBindingTokenOperationResult {
  /**
   * An access token that a client may use to show authorization during a websocket
   * connection. The security details of the token are implementation-dependent and
   * beyond the scope of this operation definition.
   */
  token: string;
  /**
   * The date and time this token is valid until.
   * @fhirType dateTime
   */
  expiration: string;
  /**
   * The subscriptions this token is valid for.
   */
  subscription?: Array<string> | undefined;
  /**
   * The URL the client should use to connect to Websockets.
   * @fhirType url
   */
  "websocket-url": string;
}

/**
 * Get Current Subscription Status for One or More Subscriptions
 *
 * This operation is used to return the current status information about one or
 * more topic-based Subscriptions.
 * @see {@link http://hl7.org/fhir/OperationDefinition/Subscription-status}
 */
export class SubscriptionStatusOperation implements Operation<Bundle> {
  /**
   * Get Current Subscription Status for One or More Subscriptions
   *
   * This operation is used to return the current status information about one or
   * more topic-based Subscriptions.
   * @see {@link http://hl7.org/fhir/OperationDefinition/Subscription-status}
   */
  constructor(public parameters: SubscriptionStatusOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$status",
      resourceType: "Subscription",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: Bundle;
}

export interface SubscriptionStatusOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * At the Instance level, this parameter is ignored. At the Resource level, one or
   * more FHIR ids to Subscription resources to get status information for. In the
   * absence of any specified ids, the server returns the status for all
   * Subscriptions available to the caller. Multiple values are joined via OR (e.g.,
   * "id1" OR "id2").
   * @fhirType id
   */
  id?: Array<string> | undefined;
  /**
   * At the Instance level, this parameter is ignored. At the Resource level, a
   * Subscription status code to filter by (e.g., "active"). In the absence of any
   * specified status values, the server does not filter contents based on the
   * status. Multiple values are joined via OR (e.g., "error" OR "off").
   * @fhirType code
   */
  status?: Array<string> | undefined;
}

/**
 * Value Set Expansion
 * 
 * The definition of a value set is used to create a simple collection of codes
 * suitable for use for data entry or validation. 

If the operation is not called
 * at the instance level, one of the in parameters url, context or valueSet must be
 * provided.  An expanded value set will be returned, or an OperationOutcome with
 * an error message.
 * @see {@link http://hl7.org/fhir/OperationDefinition/ValueSet-expand}
 */
export class ValueSetExpandOperation implements Operation<ValueSet> {
  /**
 * Value Set Expansion
 * 
 * The definition of a value set is used to create a simple collection of codes
 * suitable for use for data entry or validation. 

If the operation is not called
 * at the instance level, one of the in parameters url, context or valueSet must be
 * provided.  An expanded value set will be returned, or an OperationOutcome with
 * an error message.
 * @see {@link http://hl7.org/fhir/OperationDefinition/ValueSet-expand}
 */
  constructor(public parameters: ValueSetExpandOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$expand",
      resourceType: "ValueSet",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: ValueSet;
}

export interface ValueSetExpandOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * A canonical reference to a value set. The server must know the value set (e.g.
   * it is defined explicitly in the server's value sets, or it is defined implicitly
   * by some code system known to the server
   * @fhirType uri
   */
  url?: string | undefined;
  /**
   * The value set is provided directly as part of the request. Servers may choose
   * not to accept value sets in this fashion
   */
  valueSet?: ValueSet | undefined;
  /**
   * The identifier that is used to identify a specific version of the value set to
   * be used when generating the expansion. This is an arbitrary value managed by the
   * value set author and is not expected to be globally unique. For example, it
   * might be a timestamp (e.g. yyyymmdd) if a managed version is not available.
   */
  valueSetVersion?: string | undefined;
  /**
   * The context of the value set, so that the server can resolve this to a value set
   * to expand. The recommended format for this URI is [Structure Definition
   * URL]#[name or path into structure definition] e.g.
   * http://hl7.org/fhir/StructureDefinition/observation-hspc-height-hspcheight#Obser
   * vation.interpretation. Other forms may be used but are not defined. This form is
   * only usable if the terminology server also has access to the conformance
   * registry that the server is using, but can be used to delegate the mapping from
   * an application context to a binding at run-time
   * @fhirType uri
   */
  context?: string | undefined;
  /**
 * If a context is provided, a context direction may also be provided. Valid values
 * are: 

* 'incoming': the codes a client can use for PUT/POST operations,  and 
*
 * 'outgoing', the codes a client might receive from the server.

The purpose is to
 * inform the server whether to use the value set associated with the context for
 * reading or writing purposes (note: for most elements, this is the same value
 * set, but there are a few elements where the reading and writing value sets are
 * different)
 * @fhirType code
 */
  contextDirection?: string | undefined;
  /**
 * A text filter that is applied to restrict the codes that are returned (this is
 * useful in a UI context). The interpretation of this is delegated to the server
 * in order to allow to determine the most optimal search approach for the context.
 * The server can document the way this parameter works in
 * [TerminologyCapabilities](terminologycapabilities.html)..expansion.textFilter.
 * Typical usage of this parameter includes functionality like:

* using left
 * matching e.g. "acut ast"
* allowing for wild cards such as %, &, ?
* searching
 * on definition as well as display(s)
* allowing for search conditions (and / or /
 * exclusions)

Text Search engines such as Lucene or Solr, long with their
 * considerable functionality, might also be used. The optional text search might
 * also be code system specific, and servers might have different implementations
 * for different code systems
 */
  filter?: string | undefined;
  /**
   * The date for which the expansion should be generated.  if a date is provided, it
   * means that the server should use the value set / code system definitions as they
   * were on the given date, or return an error if this is not possible.  Normally,
   * the date is the current conditions (which is the default value) but under some
   * circumstances, systems need to generate an expansion as it would have been in
   * the past. A typical example of this would be where code selection is constrained
   * to the set of codes that were available when the patient was treated, not when
   * the record is being edited. Note that which date is appropriate is a matter for
   * implementation policy.
   * @fhirType dateTime
   */
  date?: string | undefined;
  /**
   * Paging support - where to start if a subset is desired (default = 0). Offset is
   * number of records (not number of pages)
   * @fhirType integer
   */
  offset?: number | undefined;
  /**
   * Paging support - how many codes should be provided in a partial page view.
   * Paging only applies to flat expansions - servers ignore paging if the expansion
   * is not flat.  If count = 0, the client is asking how large the expansion is.
   * Servers SHOULD honor this request for hierarchical expansions as well, and
   * simply return the overall count
   * @fhirType integer
   */
  count?: number | undefined;
  /**
   * Controls whether concept designations are to be included or excluded in value
   * set expansions
   */
  includeDesignations?: boolean | undefined;
  /**
   * A [token](search.html#token) that specifies a system+code that is either a use
   * or a language. Designations that match by language or use are included in the
   * expansion. If no designation is specified, it is at the server discretion which
   * designations to return
   */
  designation?: Array<string> | undefined;
  /**
   * Controls whether the value set definition is included or excluded in value set
   * expansions
   */
  includeDefinition?: boolean | undefined;
  /**
   * Controls whether inactive concepts are included or excluded in value set
   * expansions. Note that if the value set explicitly specifies that inactive codes
   * are included, this parameter can still remove them from a specific expansion,
   * but this parameter cannot include them if the value set excludes them
   */
  activeOnly?: boolean | undefined;
  /**
   * The supplement must be used when performing an expansion. Use of this parameter
   * should result in $expand behaving the same way as if the supplements were
   * included in the value set definition using the
   * [http://hl7.org/fhir/StructureDefinition/valueset-supplement](http://hl7.org/fhi
   * r/extensions/StructureDefinition-valueset-supplement.html)
   * @fhirType canonical
   */
  useSupplement?: Array<string> | undefined;
  /**
   * Controls whether or not the value set expansion may nest codes or not (i.e.
   * ValueSet.expansion.contains.contains). If excludeNested is set to true, the
   * expansion MUST be flat (no nesting). If excludeNested is set to false (default),
   * however, nesting is possible but not required
   */
  excludeNested?: boolean | undefined;
  /**
 * Controls whether or not the value set expansion might include

* codes from
 * the CodeSystem with a notSelectable property set to true as specified in
 * [status](codesystem.html#status)] and in [Concept
 * Properties](codesystem-concept-properties.html)
* nested contains with no code
 * (see [Contains](valueset-definitions.html#ValueSet.expansion.contains.code))
*
 * nested contains in the ValueSet with [abstract =
 * true](valueset-definitions.html#ValueSet.expansion.contains.abstract)

One
 * purpose of such concepts is helping a user navigate through the list
 * efficiently. If excludeNotForUI is set to true, the concepts as described above
 * will be excluded from the expansion. If excludeNotForUI is set to false
 * (default), all concepts as described above may be part of the expansion. In the
 * FHIR Specification itself, the value set expansions are generated with
 * excludeNotForUI = false, and the expansions used when generating schema / code
 * etc., or performing validation, are all excludeNotForUI = true.
 */
  excludeNotForUI?: boolean | undefined;
  /**
   * Controls whether or not the value set expansion includes post coordinated codes
   */
  excludePostCoordinated?: boolean | undefined;
  /**
   * Specifies the language to be used for description in the expansions i.e. the
   * language to be used for ValueSet.expansion.contains.display
   * @fhirType code
   */
  displayLanguage?: string | undefined;
  /**
   * A request to return a particular property in the expansion. The returned
   * property may include subproperties. May be either a code from the code system
   * definition (convenient) or a the formal URI that refers to the property. Note
   * that property names can clash, so using a URI is recommended. The special value
   * '*' means all properties and their sub-properties known to the server
   */
  property?: Array<string> | undefined;
  /**
   * Code system, or a particular version of a code system to be excluded from the
   * value set expansion. The format is the same as a canonical URL:
   * [system]|[version] - e.g. http://loinc.org|2.56
   * @fhirType canonical
   */
  "exclude-system"?: Array<string> | undefined;
  /**
   * Specifies a version to use for a system, if the value set does not specify which
   * one to use. The format is the same as a canonical URL: [system]|[version] - e.g.
   * http://loinc.org|2.56
   * @fhirType canonical
   */
  "system-version"?: Array<string> | undefined;
  /**
   * Edge Case: Specifies a version to use for a system. If a value set specifies a
   * different version, an error is returned instead of the expansion. The format is
   * the same as a canonical URL: [system]|[version] - e.g. http://loinc.org|2.56
   * @fhirType canonical
   */
  "check-system-version"?: Array<string> | undefined;
  /**
   * Edge Case: Specifies a version to use for a system. This parameter overrides any
   * specified version in the value set (and any it depends on). The format is the
   * same as a canonical URL: [system]|[version] - e.g. http://loinc.org|2.56. Note
   * that this has obvious safety issues, in that it may result in a value set
   * expansion giving a different list of codes that is both wrong and unsafe, and
   * implementers should only use this capability reluctantly. It primarily exists to
   * deal with situations where specifications have fallen into decay as time passes.
   * If the value is override, the version used SHALL explicitly be represented in
   * the expansion parameters
   * @fhirType canonical
   */
  "force-system-version"?: Array<string> | undefined;
}

/**
 * Value Set based Validation
 * 
 * Validate that a coded value is in the set of codes allowed by a value set.

If
 * the operation is not called at the instance level, one of the in parameters url,
 * context or valueSet must be provided.  One (and only one) of the in parameters
 * code, coding, or codeableConcept must be provided.  The operation returns a
 * result (true / false), an error message, and the recommended display for the
 * code. When validating a code or a coding, then the code, system and version
 * output parameters **SHOULD** be populated when possible. When a validating a
 * CodeableConcept, then the codeableConcept output parameter **SHOULD** be
 * populated when possible.
 * @see {@link http://hl7.org/fhir/OperationDefinition/ValueSet-validate-code}
 */
export class ValueSetValidateCodeOperation
  implements Operation<ValueSetValidateCodeOperationResult>
{
  /**
 * Value Set based Validation
 * 
 * Validate that a coded value is in the set of codes allowed by a value set.

If
 * the operation is not called at the instance level, one of the in parameters url,
 * context or valueSet must be provided.  One (and only one) of the in parameters
 * code, coding, or codeableConcept must be provided.  The operation returns a
 * result (true / false), an error message, and the recommended display for the
 * code. When validating a code or a coding, then the code, system and version
 * output parameters **SHOULD** be populated when possible. When a validating a
 * CodeableConcept, then the codeableConcept output parameter **SHOULD** be
 * populated when possible.
 * @see {@link http://hl7.org/fhir/OperationDefinition/ValueSet-validate-code}
 */
  constructor(public parameters: ValueSetValidateCodeOperationParameters) {}

  public getParameters(): OperationParameters {
    return {
      operation: "$validate-code",
      resourceType: "ValueSet",
      resourceId: this.parameters.resourceId,
      parameters: this.parameters,
      affectsState: false,
    };
  }

  public _resultTypeDoNotUse?: ValueSetValidateCodeOperationResult;
}

export interface ValueSetValidateCodeOperationParameters {
  /**
   * The id of the resource to perform the operation on.
   */
  resourceId?: string | null | undefined;
  /**
   * Value set Canonical URL. The server must know the value set (e.g. it is defined
   * explicitly in the server's value sets, or it is defined implicitly by some code
   * system known to the server
   * @fhirType uri
   */
  url?: string | undefined;
  /**
   * The context of the value set, so that the server can resolve this to a value set
   * to validate against. The recommended format for this URI is [Structure
   * Definition URL]#[name or path into structure definition] e.g.
   * http://hl7.org/fhir/StructureDefinition/observation-hspc-height-hspcheight#Obser
   * vation.interpretation. Other forms may be used but are not defined. This form is
   * only usable if the terminology server also has access to the conformance
   * registry that the server is using, but can be used to delegate the mapping from
   * an application context to a binding at run-time
   * @fhirType uri
   */
  context?: string | undefined;
  /**
   * The value set is provided directly as part of the request. Servers may choose
   * not to accept value sets in this fashion. This parameter is used when the client
   * wants the server to expand a value set that is not stored on the server
   */
  valueSet?: ValueSet | undefined;
  /**
   * The identifier that is used to identify a specific version of the value set to
   * be used when validating the code. This is an arbitrary value managed by the
   * value set author and is not expected to be globally unique. For example, it
   * might be a timestamp (e.g. yyyymmdd) if a managed version is not available.
   */
  valueSetVersion?: string | undefined;
  /**
   * The code that is to be validated. If a code is provided, a system or a context
   * must be provided (if a context is provided, then the server SHALL ensure that
   * the code is not ambiguous without a system)
   * @fhirType code
   */
  code?: string | undefined;
  /**
   * The system for the code that is to be validated
   * @fhirType uri
   */
  system?: string | undefined;
  /**
   * The version of the system, if one was provided in the source data
   */
  systemVersion?: string | undefined;
  /**
   * The display associated with the code, if provided. If a display is provided a
   * code must be provided. If no display is provided, the server cannot validate the
   * display value, but may choose to return a recommended display name using the
   * display parameter in the outcome. Whether displays are case sensitive is code
   * system dependent
   */
  display?: string | undefined;
  /**
   * A coding to validate
   */
  coding?: Coding | undefined;
  /**
   * A full codeableConcept to validate. The server returns true if one of the coding
   * values is in the value set, and may also validate that the codings are not in
   * conflict with each other if more than one is present
   */
  codeableConcept?: CodeableConcept | undefined;
  /**
   * The date for which the validation should be checked. Normally, this is the
   * current conditions (which is the default values) but under some circumstances,
   * systems need to validate that a correct code was used at some point in the past.
   * A typical example of this would be where code selection is constrained to the
   * set of codes that were available when the patient was treated, not when the
   * record is being edited. Note that which date is appropriate is a matter for
   * implementation policy.
   * @fhirType dateTime
   */
  date?: string | undefined;
  /**
 * If this parameter has a value of true or the parametter is ommitted, the client
 * is stating that the validation is being performed in a context where a concept
 * designated as 'abstract' is appropriate/allowed to be used, and the server
 * should regard abstract codes as valid. If this parameter is false, abstract
 * codes are not considered to be valid.

Note that. 'abstract' is a property
 * defined by many HL7 code systems that indicates that the concept is a logical
 * grouping concept that is not intended to be used as a 'concrete' concept to in
 * an actual patient/care/process record. This language is borrowed from
 * object-orientated theory where 'abstract' entities are never instantiated.
 * However in the general record and terminology eco-system, there are many
 * contexts where it is appropriate to use these codes e.g. as decision making
 * criterion, or when editing value sets themselves. This parameter allows a client
 * to indicate to the server that it is working in such a context.
 */
  abstract?: boolean | undefined;
  /**
   * Specifies the language to be used for description when validating the display
   * property
   * @fhirType code
   */
  displayLanguage?: string | undefined;
  /**
   * The supplement must be used when validating the code. Use of this parameter
   * should result in $validate-code behaving the same way as if the supplements were
   * included in the value set definition using the
   * [http://hl7.org/fhir/StructureDefinition/valueset-supplement](http://hl7.org/fhi
   * r/extensions/StructureDefinition-valueset-supplement.html)
   * @fhirType canonical
   */
  useSupplement?: Array<string> | undefined;
}

export interface ValueSetValidateCodeOperationResult {
  /**
   * True if the concept details supplied are valid
   */
  result: boolean;
  /**
   * Error details, if result = false. If this is provided when result = true, the
   * message carries hints and warnings
   */
  message?: string | undefined;
  /**
   * A valid display for the concept if the system wishes to display this to a user
   */
  display?: string | undefined;
  /**
   * The code that was validated
   * @fhirType code
   */
  code?: string | undefined;
  /**
   * The system for the code that was validated
   * @fhirType uri
   */
  system?: string | undefined;
  /**
   * The version of the system of the code that was validated
   */
  version?: string | undefined;
  /**
   * A codeableConcept containing codings for all the validated codes
   */
  codeableConcept?: CodeableConcept | undefined;
  /**
   * List of itemised issues with paths constrained to simple FHIRPath. Examples are
   * CodeableConcept, CodeableConcept.coding[0], CodeableConcept.coding[1].display,
   * or Coding.display
   */
  issues?: OperationOutcome | undefined;
}