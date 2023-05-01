/**
 * FHIR Definitions for r4b/4.3.0
 */



  


  


  


  
    /**
 * Account
 * 
 * A financial tool for tracking value accrued for a particular purpose.  In the
 * healthcare field, used to track charges for a patient, cost centers, etc.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Account.html}
 */
    export interface Account extends DomainResource {
      
      readonly resourceType: "Account";
      


      
      coverage?: Array<BackboneElement> | undefined;
      _coverage?: Element[] | undefined;
      
      coverage: Reference;
      _coverage?: Element | undefined;
      
      priority?: positiveInt | undefined;
      _priority?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      guarantor?: Array<BackboneElement> | undefined;
      _guarantor?: Element[] | undefined;
      
      onHold?: boolean | undefined;
      _onHold?: Element | undefined;
      
      party: Reference;
      _party?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      owner?: Reference | undefined;
      _owner?: Element | undefined;
      
      partOf?: Reference | undefined;
      _partOf?: Element | undefined;
      
      servicePeriod?: Period | undefined;
      _servicePeriod?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject?: Array<Reference> | undefined;
      _subject?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
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
      
      readonly resourceType: "ActivityDefinition";
      


      
      approvalDate?: date | undefined;
      _approvalDate?: Element | undefined;
      
      author?: Array<ContactDetail> | undefined;
      _author?: Element[] | undefined;
      
      bodySite?: Array<CodeableConcept> | undefined;
      _bodySite?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      doNotPerform?: boolean | undefined;
      _doNotPerform?: Element | undefined;
      
      dosage?: Array<Dosage> | undefined;
      _dosage?: Element[] | undefined;
      
      dynamicValue?: Array<BackboneElement> | undefined;
      _dynamicValue?: Element[] | undefined;
      
      expression: Expression;
      _expression?: Element | undefined;
      
      path: string;
      _path?: Element | undefined;
      
      editor?: Array<ContactDetail> | undefined;
      _editor?: Element[] | undefined;
      
      effectivePeriod?: Period | undefined;
      _effectivePeriod?: Element | undefined;
      
      endorser?: Array<ContactDetail> | undefined;
      _endorser?: Element[] | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      intent?: code | undefined;
      _intent?: Element | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      kind?: code | undefined;
      _kind?: Element | undefined;
      
      lastReviewDate?: date | undefined;
      _lastReviewDate?: Element | undefined;
      
      library?: Array<canonical> | undefined;
      _library?: Element[] | undefined;
      
      location?: Reference | undefined;
      _location?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      observationRequirement?: Array<Reference> | undefined;
      _observationRequirement?: Element[] | undefined;
      
      observationResultRequirement?: Array<Reference> | undefined;
      _observationResultRequirement?: Element[] | undefined;
      
      participant?: Array<BackboneElement> | undefined;
      _participant?: Element[] | undefined;
      
      role?: CodeableConcept | undefined;
      _role?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      priority?: code | undefined;
      _priority?: Element | undefined;
      
      product[x]?: Reference | CodeableConcept | undefined;
      _product[x]?: Element | undefined;
      
      profile?: canonical | undefined;
      _profile?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      relatedArtifact?: Array<RelatedArtifact> | undefined;
      _relatedArtifact?: Element[] | undefined;
      
      reviewer?: Array<ContactDetail> | undefined;
      _reviewer?: Element[] | undefined;
      
      specimenRequirement?: Array<Reference> | undefined;
      _specimenRequirement?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject[x]?: CodeableConcept | Reference | canonical | undefined;
      _subject[x]?: Element | undefined;
      
      subtitle?: string | undefined;
      _subtitle?: Element | undefined;
      
      timing[x]?: Timing | dateTime | Age | Period | Range | Duration | undefined;
      _timing[x]?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      topic?: Array<CodeableConcept> | undefined;
      _topic?: Element[] | undefined;
      
      transform?: canonical | undefined;
      _transform?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      usage?: string | undefined;
      _usage?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
    }

  


  


  


  


  


  


  
    /**
 * Address
 * 
 * Base StructureDefinition for Address Type: An address expressed using postal
 * conventions (as opposed to GPS or other location definition formats).  This data
 * type may be used to convey addresses for use in delivering mail as well as for
 * visiting locations which might not be valid for mail delivery.  There are a
 * variety of postal address formats defined around the world.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Address.html}
 */
    export interface Address extends Element {
      
      readonly resourceType: string;
      


      
      city?: string | undefined;
      _city?: Element | undefined;
      
      country?: string | undefined;
      _country?: Element | undefined;
      
      district?: string | undefined;
      _district?: Element | undefined;
      
      line?: Array<string> | undefined;
      _line?: Element[] | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      postalCode?: string | undefined;
      _postalCode?: Element | undefined;
      
      state?: string | undefined;
      _state?: Element | undefined;
      
      text?: string | undefined;
      _text?: Element | undefined;
      
      type?: code | undefined;
      _type?: Element | undefined;
      
      use?: code | undefined;
      _use?: Element | undefined;
      
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
      
      readonly resourceType: "AdministrableProductDefinition";
      


      
      administrableDoseForm?: CodeableConcept | undefined;
      _administrableDoseForm?: Element | undefined;
      
      device?: Reference | undefined;
      _device?: Element | undefined;
      
      formOf?: Array<Reference> | undefined;
      _formOf?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      ingredient?: Array<CodeableConcept> | undefined;
      _ingredient?: Element[] | undefined;
      
      producedFrom?: Array<Reference> | undefined;
      _producedFrom?: Element[] | undefined;
      
      property?: Array<BackboneElement> | undefined;
      _property?: Element[] | undefined;
      
      status?: CodeableConcept | undefined;
      _status?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      value[x]?: CodeableConcept | Quantity | date | boolean | Attachment | undefined;
      _value[x]?: Element | undefined;
      
      routeOfAdministration: Array<BackboneElement>;
      _routeOfAdministration?: Element[] | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      firstDose?: Quantity | undefined;
      _firstDose?: Element | undefined;
      
      maxDosePerDay?: Quantity | undefined;
      _maxDosePerDay?: Element | undefined;
      
      maxDosePerTreatmentPeriod?: Ratio | undefined;
      _maxDosePerTreatmentPeriod?: Element | undefined;
      
      maxSingleDose?: Quantity | undefined;
      _maxSingleDose?: Element | undefined;
      
      maxTreatmentPeriod?: Duration | undefined;
      _maxTreatmentPeriod?: Element | undefined;
      
      targetSpecies?: Array<BackboneElement> | undefined;
      _targetSpecies?: Element[] | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      withdrawalPeriod?: Array<BackboneElement> | undefined;
      _withdrawalPeriod?: Element[] | undefined;
      
      supportingInformation?: string | undefined;
      _supportingInformation?: Element | undefined;
      
      tissue: CodeableConcept;
      _tissue?: Element | undefined;
      
      value: Quantity;
      _value?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      unitOfPresentation?: CodeableConcept | undefined;
      _unitOfPresentation?: Element | undefined;
      
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
      
      readonly resourceType: "AdverseEvent";
      


      
      actuality: code;
      _actuality?: Element | undefined;
      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      contributor?: Array<Reference> | undefined;
      _contributor?: Element[] | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      detected?: dateTime | undefined;
      _detected?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      event?: CodeableConcept | undefined;
      _event?: Element | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      location?: Reference | undefined;
      _location?: Element | undefined;
      
      outcome?: CodeableConcept | undefined;
      _outcome?: Element | undefined;
      
      recordedDate?: dateTime | undefined;
      _recordedDate?: Element | undefined;
      
      recorder?: Reference | undefined;
      _recorder?: Element | undefined;
      
      referenceDocument?: Array<Reference> | undefined;
      _referenceDocument?: Element[] | undefined;
      
      resultingCondition?: Array<Reference> | undefined;
      _resultingCondition?: Element[] | undefined;
      
      seriousness?: CodeableConcept | undefined;
      _seriousness?: Element | undefined;
      
      severity?: CodeableConcept | undefined;
      _severity?: Element | undefined;
      
      study?: Array<Reference> | undefined;
      _study?: Element[] | undefined;
      
      subject: Reference;
      _subject?: Element | undefined;
      
      subjectMedicalHistory?: Array<Reference> | undefined;
      _subjectMedicalHistory?: Element[] | undefined;
      
      suspectEntity?: Array<BackboneElement> | undefined;
      _suspectEntity?: Element[] | undefined;
      
      causality?: Array<BackboneElement> | undefined;
      _causality?: Element[] | undefined;
      
      assessment?: CodeableConcept | undefined;
      _assessment?: Element | undefined;
      
      author?: Reference | undefined;
      _author?: Element | undefined;
      
      method?: CodeableConcept | undefined;
      _method?: Element | undefined;
      
      productRelatedness?: string | undefined;
      _productRelatedness?: Element | undefined;
      
      instance: Reference;
      _instance?: Element | undefined;
      
    }

  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  
    /**
 * Age
 * 
 * Base StructureDefinition for Age Type: A duration of time during which an
 * organism (or a process) has existed.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Age.html}
 */
    export interface Age extends Quantity {
      
      readonly resourceType: string;
      


      
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
      
      readonly resourceType: "AllergyIntolerance";
      


      
      asserter?: Reference | undefined;
      _asserter?: Element | undefined;
      
      category?: Array<code> | undefined;
      _category?: Element[] | undefined;
      
      clinicalStatus?: CodeableConcept | undefined;
      _clinicalStatus?: Element | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      criticality?: code | undefined;
      _criticality?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      lastOccurrence?: dateTime | undefined;
      _lastOccurrence?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      onset[x]?: dateTime | Age | Period | Range | string | undefined;
      _onset[x]?: Element | undefined;
      
      patient: Reference;
      _patient?: Element | undefined;
      
      reaction?: Array<BackboneElement> | undefined;
      _reaction?: Element[] | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      exposureRoute?: CodeableConcept | undefined;
      _exposureRoute?: Element | undefined;
      
      manifestation: Array<CodeableConcept>;
      _manifestation?: Element[] | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      onset?: dateTime | undefined;
      _onset?: Element | undefined;
      
      severity?: code | undefined;
      _severity?: Element | undefined;
      
      substance?: CodeableConcept | undefined;
      _substance?: Element | undefined;
      
      recordedDate?: dateTime | undefined;
      _recordedDate?: Element | undefined;
      
      recorder?: Reference | undefined;
      _recorder?: Element | undefined;
      
      type?: code | undefined;
      _type?: Element | undefined;
      
      verificationStatus?: CodeableConcept | undefined;
      _verificationStatus?: Element | undefined;
      
    }

  


  


  


  


  


  


  


  


  


  


  
    /**
 * Annotation
 * 
 * Base StructureDefinition for Annotation Type: A  text note which also  contains
 * information about who made the statement and when.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Annotation.html}
 */
    export interface Annotation extends Element {
      
      readonly resourceType: string;
      


      
      author[x]?: Reference | string | undefined;
      _author[x]?: Element | undefined;
      
      text: markdown;
      _text?: Element | undefined;
      
      time?: dateTime | undefined;
      _time?: Element | undefined;
      
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
      
      readonly resourceType: "Appointment";
      


      
      appointmentType?: CodeableConcept | undefined;
      _appointmentType?: Element | undefined;
      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      cancelationReason?: CodeableConcept | undefined;
      _cancelationReason?: Element | undefined;
      
      comment?: string | undefined;
      _comment?: Element | undefined;
      
      created?: dateTime | undefined;
      _created?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      end?: instant | undefined;
      _end?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      minutesDuration?: positiveInt | undefined;
      _minutesDuration?: Element | undefined;
      
      participant: Array<BackboneElement>;
      _participant?: Element[] | undefined;
      
      actor?: Reference | undefined;
      _actor?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      required?: code | undefined;
      _required?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      type?: Array<CodeableConcept> | undefined;
      _type?: Element[] | undefined;
      
      patientInstruction?: string | undefined;
      _patientInstruction?: Element | undefined;
      
      priority?: unsignedInt | undefined;
      _priority?: Element | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      requestedPeriod?: Array<Period> | undefined;
      _requestedPeriod?: Element[] | undefined;
      
      serviceCategory?: Array<CodeableConcept> | undefined;
      _serviceCategory?: Element[] | undefined;
      
      serviceType?: Array<CodeableConcept> | undefined;
      _serviceType?: Element[] | undefined;
      
      slot?: Array<Reference> | undefined;
      _slot?: Element[] | undefined;
      
      specialty?: Array<CodeableConcept> | undefined;
      _specialty?: Element[] | undefined;
      
      start?: instant | undefined;
      _start?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      supportingInformation?: Array<Reference> | undefined;
      _supportingInformation?: Element[] | undefined;
      
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
      
      readonly resourceType: "AppointmentResponse";
      


      
      actor?: Reference | undefined;
      _actor?: Element | undefined;
      
      appointment: Reference;
      _appointment?: Element | undefined;
      
      comment?: string | undefined;
      _comment?: Element | undefined;
      
      end?: instant | undefined;
      _end?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      participantStatus: code;
      _participantStatus?: Element | undefined;
      
      participantType?: Array<CodeableConcept> | undefined;
      _participantType?: Element[] | undefined;
      
      start?: instant | undefined;
      _start?: Element | undefined;
      
    }

  


  


  


  


  


  


  


  


  


  
    /**
 * Attachment
 * 
 * Base StructureDefinition for Attachment Type: For referring to data content
 * defined in other formats.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Attachment.html}
 */
    export interface Attachment extends Element {
      
      readonly resourceType: string;
      


      
      contentType?: code | undefined;
      _contentType?: Element | undefined;
      
      creation?: dateTime | undefined;
      _creation?: Element | undefined;
      
      data?: base64Binary | undefined;
      _data?: Element | undefined;
      
      hash?: base64Binary | undefined;
      _hash?: Element | undefined;
      
      language?: code | undefined;
      _language?: Element | undefined;
      
      size?: unsignedInt | undefined;
      _size?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      url?: url | undefined;
      _url?: Element | undefined;
      
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
      
      readonly resourceType: "AuditEvent";
      


      
      action?: code | undefined;
      _action?: Element | undefined;
      
      agent: Array<BackboneElement>;
      _agent?: Element[] | undefined;
      
      altId?: string | undefined;
      _altId?: Element | undefined;
      
      location?: Reference | undefined;
      _location?: Element | undefined;
      
      media?: Coding | undefined;
      _media?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      network?: BackboneElement | undefined;
      _network?: Element | undefined;
      
      address?: string | undefined;
      _address?: Element | undefined;
      
      type?: code | undefined;
      _type?: Element | undefined;
      
      policy?: Array<uri> | undefined;
      _policy?: Element[] | undefined;
      
      purposeOfUse?: Array<CodeableConcept> | undefined;
      _purposeOfUse?: Element[] | undefined;
      
      requestor: boolean;
      _requestor?: Element | undefined;
      
      role?: Array<CodeableConcept> | undefined;
      _role?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      who?: Reference | undefined;
      _who?: Element | undefined;
      
      entity?: Array<BackboneElement> | undefined;
      _entity?: Element[] | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      detail?: Array<BackboneElement> | undefined;
      _detail?: Element[] | undefined;
      
      type: string;
      _type?: Element | undefined;
      
      value[x]: string | base64Binary;
      _value[x]?: Element | undefined;
      
      lifecycle?: Coding | undefined;
      _lifecycle?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      query?: base64Binary | undefined;
      _query?: Element | undefined;
      
      role?: Coding | undefined;
      _role?: Element | undefined;
      
      securityLabel?: Array<Coding> | undefined;
      _securityLabel?: Element[] | undefined;
      
      type?: Coding | undefined;
      _type?: Element | undefined;
      
      what?: Reference | undefined;
      _what?: Element | undefined;
      
      outcome?: code | undefined;
      _outcome?: Element | undefined;
      
      outcomeDesc?: string | undefined;
      _outcomeDesc?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      purposeOfEvent?: Array<CodeableConcept> | undefined;
      _purposeOfEvent?: Element[] | undefined;
      
      recorded: instant;
      _recorded?: Element | undefined;
      
      source: BackboneElement;
      _source?: Element | undefined;
      
      observer: Reference;
      _observer?: Element | undefined;
      
      site?: string | undefined;
      _site?: Element | undefined;
      
      type?: Array<Coding> | undefined;
      _type?: Element[] | undefined;
      
      subtype?: Array<Coding> | undefined;
      _subtype?: Element[] | undefined;
      
      type: Coding;
      _type?: Element | undefined;
      
    }

  


  


  


  


  


  


  
    /**
 * BackboneElement
 * 
 * Base StructureDefinition for BackboneElement Type: Base definition for all
 * elements that are defined inside a resource - but not those in a data type.
 * 
 * @see {@link http://hl7.org/fhir/R4B/BackboneElement.html}
 */
    export interface BackboneElement extends Element {
      
      readonly resourceType: string;
      


      
      modifierExtension?: Array<Extension> | undefined;
      _modifierExtension?: Element[] | undefined;
      
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
      
      readonly resourceType: "Basic";
      


      
      author?: Reference | undefined;
      _author?: Element | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      created?: date | undefined;
      _created?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      subject?: Reference | undefined;
      _subject?: Element | undefined;
      
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
      
      readonly resourceType: string;
      


      
      contentType: code;
      _contentType?: Element | undefined;
      
      data?: base64Binary | undefined;
      _data?: Element | undefined;
      
      securityContext?: Reference | undefined;
      _securityContext?: Element | undefined;
      
    }

  


  


  
    /**
 * BiologicallyDerivedProduct
 * 
 * A material substance originating from a biological entity intended to be
 * transplanted or infused
into another (possibly the same) biological entity.
 * 
 * @see {@link http://hl7.org/fhir/R4B/BiologicallyDerivedProduct.html}
 */
    export interface BiologicallyDerivedProduct extends DomainResource {
      
      readonly resourceType: "BiologicallyDerivedProduct";
      


      
      collection?: BackboneElement | undefined;
      _collection?: Element | undefined;
      
      collected[x]?: dateTime | Period | undefined;
      _collected[x]?: Element | undefined;
      
      collector?: Reference | undefined;
      _collector?: Element | undefined;
      
      source?: Reference | undefined;
      _source?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      manipulation?: BackboneElement | undefined;
      _manipulation?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      time[x]?: dateTime | Period | undefined;
      _time[x]?: Element | undefined;
      
      parent?: Array<Reference> | undefined;
      _parent?: Element[] | undefined;
      
      processing?: Array<BackboneElement> | undefined;
      _processing?: Element[] | undefined;
      
      additive?: Reference | undefined;
      _additive?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      procedure?: CodeableConcept | undefined;
      _procedure?: Element | undefined;
      
      time[x]?: dateTime | Period | undefined;
      _time[x]?: Element | undefined;
      
      productCategory?: code | undefined;
      _productCategory?: Element | undefined;
      
      productCode?: CodeableConcept | undefined;
      _productCode?: Element | undefined;
      
      quantity?: integer | undefined;
      _quantity?: Element | undefined;
      
      request?: Array<Reference> | undefined;
      _request?: Element[] | undefined;
      
      status?: code | undefined;
      _status?: Element | undefined;
      
      storage?: Array<BackboneElement> | undefined;
      _storage?: Element[] | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      duration?: Period | undefined;
      _duration?: Element | undefined;
      
      scale?: code | undefined;
      _scale?: Element | undefined;
      
      temperature?: decimal | undefined;
      _temperature?: Element | undefined;
      
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
      
      readonly resourceType: "BodyStructure";
      


      
      active?: boolean | undefined;
      _active?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      image?: Array<Attachment> | undefined;
      _image?: Element[] | undefined;
      
      location?: CodeableConcept | undefined;
      _location?: Element | undefined;
      
      locationQualifier?: Array<CodeableConcept> | undefined;
      _locationQualifier?: Element[] | undefined;
      
      morphology?: CodeableConcept | undefined;
      _morphology?: Element | undefined;
      
      patient: Reference;
      _patient?: Element | undefined;
      
    }

  


  


  


  


  
    /**
 * Bundle
 * 
 * A container for a collection of resources.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Bundle.html}
 */
    export interface Bundle extends Resource {
      
      readonly resourceType: string;
      


      
      entry?: Array<BackboneElement> | undefined;
      _entry?: Element[] | undefined;
      
      fullUrl?: uri | undefined;
      _fullUrl?: Element | undefined;
      
      link?: Array<undefined> | undefined;
      _link?: Element[] | undefined;
      
      request?: BackboneElement | undefined;
      _request?: Element | undefined;
      
      ifMatch?: string | undefined;
      _ifMatch?: Element | undefined;
      
      ifModifiedSince?: instant | undefined;
      _ifModifiedSince?: Element | undefined;
      
      ifNoneExist?: string | undefined;
      _ifNoneExist?: Element | undefined;
      
      ifNoneMatch?: string | undefined;
      _ifNoneMatch?: Element | undefined;
      
      method: code;
      _method?: Element | undefined;
      
      url: uri;
      _url?: Element | undefined;
      
      resource?: Resource | undefined;
      _resource?: Element | undefined;
      
      response?: BackboneElement | undefined;
      _response?: Element | undefined;
      
      etag?: string | undefined;
      _etag?: Element | undefined;
      
      lastModified?: instant | undefined;
      _lastModified?: Element | undefined;
      
      location?: uri | undefined;
      _location?: Element | undefined;
      
      outcome?: Resource | undefined;
      _outcome?: Element | undefined;
      
      status: string;
      _status?: Element | undefined;
      
      search?: BackboneElement | undefined;
      _search?: Element | undefined;
      
      mode?: code | undefined;
      _mode?: Element | undefined;
      
      score?: decimal | undefined;
      _score?: Element | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      link?: Array<BackboneElement> | undefined;
      _link?: Element[] | undefined;
      
      relation: string;
      _relation?: Element | undefined;
      
      url: uri;
      _url?: Element | undefined;
      
      signature?: Signature | undefined;
      _signature?: Element | undefined;
      
      timestamp?: instant | undefined;
      _timestamp?: Element | undefined;
      
      total?: unsignedInt | undefined;
      _total?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
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
      
      readonly resourceType: "CapabilityStatement";
      


      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date: dateTime;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      document?: Array<BackboneElement> | undefined;
      _document?: Element[] | undefined;
      
      documentation?: markdown | undefined;
      _documentation?: Element | undefined;
      
      mode: code;
      _mode?: Element | undefined;
      
      profile: canonical;
      _profile?: Element | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      fhirVersion: code;
      _fhirVersion?: Element | undefined;
      
      format: Array<code>;
      _format?: Element[] | undefined;
      
      implementation?: BackboneElement | undefined;
      _implementation?: Element | undefined;
      
      custodian?: Reference | undefined;
      _custodian?: Element | undefined;
      
      description: string;
      _description?: Element | undefined;
      
      url?: url | undefined;
      _url?: Element | undefined;
      
      implementationGuide?: Array<canonical> | undefined;
      _implementationGuide?: Element[] | undefined;
      
      imports?: Array<canonical> | undefined;
      _imports?: Element[] | undefined;
      
      instantiates?: Array<canonical> | undefined;
      _instantiates?: Element[] | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      kind: code;
      _kind?: Element | undefined;
      
      messaging?: Array<BackboneElement> | undefined;
      _messaging?: Element[] | undefined;
      
      documentation?: markdown | undefined;
      _documentation?: Element | undefined;
      
      endpoint?: Array<BackboneElement> | undefined;
      _endpoint?: Element[] | undefined;
      
      address: url;
      _address?: Element | undefined;
      
      protocol: Coding;
      _protocol?: Element | undefined;
      
      reliableCache?: unsignedInt | undefined;
      _reliableCache?: Element | undefined;
      
      supportedMessage?: Array<BackboneElement> | undefined;
      _supportedMessage?: Element[] | undefined;
      
      definition: canonical;
      _definition?: Element | undefined;
      
      mode: code;
      _mode?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      patchFormat?: Array<code> | undefined;
      _patchFormat?: Element[] | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      rest?: Array<BackboneElement> | undefined;
      _rest?: Element[] | undefined;
      
      compartment?: Array<canonical> | undefined;
      _compartment?: Element[] | undefined;
      
      documentation?: markdown | undefined;
      _documentation?: Element | undefined;
      
      interaction?: Array<BackboneElement> | undefined;
      _interaction?: Element[] | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      documentation?: markdown | undefined;
      _documentation?: Element | undefined;
      
      mode: code;
      _mode?: Element | undefined;
      
      operation?: Array<undefined> | undefined;
      _operation?: Element[] | undefined;
      
      resource?: Array<BackboneElement> | undefined;
      _resource?: Element[] | undefined;
      
      conditionalCreate?: boolean | undefined;
      _conditionalCreate?: Element | undefined;
      
      conditionalDelete?: code | undefined;
      _conditionalDelete?: Element | undefined;
      
      conditionalRead?: code | undefined;
      _conditionalRead?: Element | undefined;
      
      conditionalUpdate?: boolean | undefined;
      _conditionalUpdate?: Element | undefined;
      
      documentation?: markdown | undefined;
      _documentation?: Element | undefined;
      
      interaction?: Array<BackboneElement> | undefined;
      _interaction?: Element[] | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      documentation?: markdown | undefined;
      _documentation?: Element | undefined;
      
      operation?: Array<BackboneElement> | undefined;
      _operation?: Element[] | undefined;
      
      definition: canonical;
      _definition?: Element | undefined;
      
      documentation?: markdown | undefined;
      _documentation?: Element | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      profile?: canonical | undefined;
      _profile?: Element | undefined;
      
      readHistory?: boolean | undefined;
      _readHistory?: Element | undefined;
      
      referencePolicy?: Array<code> | undefined;
      _referencePolicy?: Element[] | undefined;
      
      searchInclude?: Array<string> | undefined;
      _searchInclude?: Element[] | undefined;
      
      searchParam?: Array<BackboneElement> | undefined;
      _searchParam?: Element[] | undefined;
      
      definition?: canonical | undefined;
      _definition?: Element | undefined;
      
      documentation?: markdown | undefined;
      _documentation?: Element | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      searchRevInclude?: Array<string> | undefined;
      _searchRevInclude?: Element[] | undefined;
      
      supportedProfile?: Array<canonical> | undefined;
      _supportedProfile?: Element[] | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      updateCreate?: boolean | undefined;
      _updateCreate?: Element | undefined;
      
      versioning?: code | undefined;
      _versioning?: Element | undefined;
      
      searchParam?: Array<undefined> | undefined;
      _searchParam?: Element[] | undefined;
      
      security?: BackboneElement | undefined;
      _security?: Element | undefined;
      
      cors?: boolean | undefined;
      _cors?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      service?: Array<CodeableConcept> | undefined;
      _service?: Element[] | undefined;
      
      software?: BackboneElement | undefined;
      _software?: Element | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      releaseDate?: dateTime | undefined;
      _releaseDate?: Element | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "CarePlan";
      


      
      activity?: Array<BackboneElement> | undefined;
      _activity?: Element[] | undefined;
      
      detail?: BackboneElement | undefined;
      _detail?: Element | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      dailyAmount?: Quantity | undefined;
      _dailyAmount?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      doNotPerform?: boolean | undefined;
      _doNotPerform?: Element | undefined;
      
      goal?: Array<Reference> | undefined;
      _goal?: Element[] | undefined;
      
      instantiatesCanonical?: Array<canonical> | undefined;
      _instantiatesCanonical?: Element[] | undefined;
      
      instantiatesUri?: Array<uri> | undefined;
      _instantiatesUri?: Element[] | undefined;
      
      kind?: code | undefined;
      _kind?: Element | undefined;
      
      location?: Reference | undefined;
      _location?: Element | undefined;
      
      performer?: Array<Reference> | undefined;
      _performer?: Element[] | undefined;
      
      product[x]?: CodeableConcept | Reference | undefined;
      _product[x]?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      scheduled[x]?: Timing | Period | string | undefined;
      _scheduled[x]?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      statusReason?: CodeableConcept | undefined;
      _statusReason?: Element | undefined;
      
      outcomeCodeableConcept?: Array<CodeableConcept> | undefined;
      _outcomeCodeableConcept?: Element[] | undefined;
      
      outcomeReference?: Array<Reference> | undefined;
      _outcomeReference?: Element[] | undefined;
      
      progress?: Array<Annotation> | undefined;
      _progress?: Element[] | undefined;
      
      reference?: Reference | undefined;
      _reference?: Element | undefined;
      
      addresses?: Array<Reference> | undefined;
      _addresses?: Element[] | undefined;
      
      author?: Reference | undefined;
      _author?: Element | undefined;
      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      careTeam?: Array<Reference> | undefined;
      _careTeam?: Element[] | undefined;
      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      contributor?: Array<Reference> | undefined;
      _contributor?: Element[] | undefined;
      
      created?: dateTime | undefined;
      _created?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      goal?: Array<Reference> | undefined;
      _goal?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      instantiatesCanonical?: Array<canonical> | undefined;
      _instantiatesCanonical?: Element[] | undefined;
      
      instantiatesUri?: Array<uri> | undefined;
      _instantiatesUri?: Element[] | undefined;
      
      intent: code;
      _intent?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      partOf?: Array<Reference> | undefined;
      _partOf?: Element[] | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      replaces?: Array<Reference> | undefined;
      _replaces?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject: Reference;
      _subject?: Element | undefined;
      
      supportingInfo?: Array<Reference> | undefined;
      _supportingInfo?: Element[] | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
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
      
      readonly resourceType: "CareTeam";
      


      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      managingOrganization?: Array<Reference> | undefined;
      _managingOrganization?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      participant?: Array<BackboneElement> | undefined;
      _participant?: Element[] | undefined;
      
      member?: Reference | undefined;
      _member?: Element | undefined;
      
      onBehalfOf?: Reference | undefined;
      _onBehalfOf?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      role?: Array<CodeableConcept> | undefined;
      _role?: Element[] | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      status?: code | undefined;
      _status?: Element | undefined;
      
      subject?: Reference | undefined;
      _subject?: Element | undefined;
      
      telecom?: Array<ContactPoint> | undefined;
      _telecom?: Element[] | undefined;
      
    }

  


  


  
    /**
 * CatalogEntry
 * 
 * Catalog entries are wrappers that contextualize items included in a catalog.
 * 
 * @see {@link http://hl7.org/fhir/R4B/CatalogEntry.html}
 */
    export interface CatalogEntry extends DomainResource {
      
      readonly resourceType: "CatalogEntry";
      


      
      additionalCharacteristic?: Array<CodeableConcept> | undefined;
      _additionalCharacteristic?: Element[] | undefined;
      
      additionalClassification?: Array<CodeableConcept> | undefined;
      _additionalClassification?: Element[] | undefined;
      
      additionalIdentifier?: Array<Identifier> | undefined;
      _additionalIdentifier?: Element[] | undefined;
      
      classification?: Array<CodeableConcept> | undefined;
      _classification?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      lastUpdated?: dateTime | undefined;
      _lastUpdated?: Element | undefined;
      
      orderable: boolean;
      _orderable?: Element | undefined;
      
      referencedItem: Reference;
      _referencedItem?: Element | undefined;
      
      relatedEntry?: Array<BackboneElement> | undefined;
      _relatedEntry?: Element[] | undefined;
      
      item: Reference;
      _item?: Element | undefined;
      
      relationtype: code;
      _relationtype?: Element | undefined;
      
      status?: code | undefined;
      _status?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      validityPeriod?: Period | undefined;
      _validityPeriod?: Element | undefined;
      
      validTo?: dateTime | undefined;
      _validTo?: Element | undefined;
      
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
      
      readonly resourceType: "ChargeItem";
      


      
      account?: Array<Reference> | undefined;
      _account?: Element[] | undefined;
      
      bodysite?: Array<CodeableConcept> | undefined;
      _bodysite?: Element[] | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      context?: Reference | undefined;
      _context?: Element | undefined;
      
      costCenter?: Reference | undefined;
      _costCenter?: Element | undefined;
      
      definitionCanonical?: Array<canonical> | undefined;
      _definitionCanonical?: Element[] | undefined;
      
      definitionUri?: Array<uri> | undefined;
      _definitionUri?: Element[] | undefined;
      
      enteredDate?: dateTime | undefined;
      _enteredDate?: Element | undefined;
      
      enterer?: Reference | undefined;
      _enterer?: Element | undefined;
      
      factorOverride?: decimal | undefined;
      _factorOverride?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      occurrence[x]?: dateTime | Period | Timing | undefined;
      _occurrence[x]?: Element | undefined;
      
      overrideReason?: string | undefined;
      _overrideReason?: Element | undefined;
      
      partOf?: Array<Reference> | undefined;
      _partOf?: Element[] | undefined;
      
      performer?: Array<BackboneElement> | undefined;
      _performer?: Element[] | undefined;
      
      actor: Reference;
      _actor?: Element | undefined;
      
      function?: CodeableConcept | undefined;
      _function?: Element | undefined;
      
      performingOrganization?: Reference | undefined;
      _performingOrganization?: Element | undefined;
      
      priceOverride?: Money | undefined;
      _priceOverride?: Element | undefined;
      
      product[x]?: Reference | CodeableConcept | undefined;
      _product[x]?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      reason?: Array<CodeableConcept> | undefined;
      _reason?: Element[] | undefined;
      
      requestingOrganization?: Reference | undefined;
      _requestingOrganization?: Element | undefined;
      
      service?: Array<Reference> | undefined;
      _service?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject: Reference;
      _subject?: Element | undefined;
      
      supportingInformation?: Array<Reference> | undefined;
      _supportingInformation?: Element[] | undefined;
      
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
      
      readonly resourceType: "ChargeItemDefinition";
      


      
      applicability?: Array<BackboneElement> | undefined;
      _applicability?: Element[] | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      expression?: string | undefined;
      _expression?: Element | undefined;
      
      language?: string | undefined;
      _language?: Element | undefined;
      
      approvalDate?: date | undefined;
      _approvalDate?: Element | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      derivedFromUri?: Array<uri> | undefined;
      _derivedFromUri?: Element[] | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      effectivePeriod?: Period | undefined;
      _effectivePeriod?: Element | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      instance?: Array<Reference> | undefined;
      _instance?: Element[] | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      lastReviewDate?: date | undefined;
      _lastReviewDate?: Element | undefined;
      
      partOf?: Array<canonical> | undefined;
      _partOf?: Element[] | undefined;
      
      propertyGroup?: Array<BackboneElement> | undefined;
      _propertyGroup?: Element[] | undefined;
      
      applicability?: Array<undefined> | undefined;
      _applicability?: Element[] | undefined;
      
      priceComponent?: Array<BackboneElement> | undefined;
      _priceComponent?: Element[] | undefined;
      
      amount?: Money | undefined;
      _amount?: Element | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      factor?: decimal | undefined;
      _factor?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      replaces?: Array<canonical> | undefined;
      _replaces?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      url: uri;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "Citation";
      


      
      approvalDate?: date | undefined;
      _approvalDate?: Element | undefined;
      
      author?: Array<ContactDetail> | undefined;
      _author?: Element[] | undefined;
      
      citedArtifact?: BackboneElement | undefined;
      _citedArtifact?: Element | undefined;
      
      abstract?: Array<BackboneElement> | undefined;
      _abstract?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      language?: CodeableConcept | undefined;
      _language?: Element | undefined;
      
      text: markdown;
      _text?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      classification?: Array<BackboneElement> | undefined;
      _classification?: Element[] | undefined;
      
      classifier?: Array<CodeableConcept> | undefined;
      _classifier?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      whoClassified?: BackboneElement | undefined;
      _whoClassified?: Element | undefined;
      
      classifierCopyright?: string | undefined;
      _classifierCopyright?: Element | undefined;
      
      freeToShare?: boolean | undefined;
      _freeToShare?: Element | undefined;
      
      organization?: Reference | undefined;
      _organization?: Element | undefined;
      
      person?: Reference | undefined;
      _person?: Element | undefined;
      
      publisher?: Reference | undefined;
      _publisher?: Element | undefined;
      
      contributorship?: BackboneElement | undefined;
      _contributorship?: Element | undefined;
      
      complete?: boolean | undefined;
      _complete?: Element | undefined;
      
      entry?: Array<BackboneElement> | undefined;
      _entry?: Element[] | undefined;
      
      address?: Array<Address> | undefined;
      _address?: Element[] | undefined;
      
      affiliationInfo?: Array<BackboneElement> | undefined;
      _affiliationInfo?: Element[] | undefined;
      
      affiliation?: string | undefined;
      _affiliation?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      role?: string | undefined;
      _role?: Element | undefined;
      
      collectiveName?: string | undefined;
      _collectiveName?: Element | undefined;
      
      contributionInstance?: Array<BackboneElement> | undefined;
      _contributionInstance?: Element[] | undefined;
      
      time?: dateTime | undefined;
      _time?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      contributionType?: Array<CodeableConcept> | undefined;
      _contributionType?: Element[] | undefined;
      
      correspondingContact?: boolean | undefined;
      _correspondingContact?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      initials?: string | undefined;
      _initials?: Element | undefined;
      
      listOrder?: positiveInt | undefined;
      _listOrder?: Element | undefined;
      
      name?: HumanName | undefined;
      _name?: Element | undefined;
      
      role?: CodeableConcept | undefined;
      _role?: Element | undefined;
      
      telecom?: Array<ContactPoint> | undefined;
      _telecom?: Element[] | undefined;
      
      summary?: Array<BackboneElement> | undefined;
      _summary?: Element[] | undefined;
      
      source?: CodeableConcept | undefined;
      _source?: Element | undefined;
      
      style?: CodeableConcept | undefined;
      _style?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      value: markdown;
      _value?: Element | undefined;
      
      currentState?: Array<CodeableConcept> | undefined;
      _currentState?: Element[] | undefined;
      
      dateAccessed?: dateTime | undefined;
      _dateAccessed?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      part?: BackboneElement | undefined;
      _part?: Element | undefined;
      
      baseCitation?: Reference | undefined;
      _baseCitation?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      value?: string | undefined;
      _value?: Element | undefined;
      
      publicationForm?: Array<BackboneElement> | undefined;
      _publicationForm?: Element[] | undefined;
      
      accessionNumber?: string | undefined;
      _accessionNumber?: Element | undefined;
      
      articleDate?: dateTime | undefined;
      _articleDate?: Element | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      firstPage?: string | undefined;
      _firstPage?: Element | undefined;
      
      language?: Array<CodeableConcept> | undefined;
      _language?: Element[] | undefined;
      
      lastPage?: string | undefined;
      _lastPage?: Element | undefined;
      
      lastRevisionDate?: dateTime | undefined;
      _lastRevisionDate?: Element | undefined;
      
      pageCount?: string | undefined;
      _pageCount?: Element | undefined;
      
      pageString?: string | undefined;
      _pageString?: Element | undefined;
      
      periodicRelease?: BackboneElement | undefined;
      _periodicRelease?: Element | undefined;
      
      citedMedium?: CodeableConcept | undefined;
      _citedMedium?: Element | undefined;
      
      dateOfPublication?: BackboneElement | undefined;
      _dateOfPublication?: Element | undefined;
      
      date?: date | undefined;
      _date?: Element | undefined;
      
      day?: string | undefined;
      _day?: Element | undefined;
      
      month?: string | undefined;
      _month?: Element | undefined;
      
      season?: string | undefined;
      _season?: Element | undefined;
      
      text?: string | undefined;
      _text?: Element | undefined;
      
      year?: string | undefined;
      _year?: Element | undefined;
      
      issue?: string | undefined;
      _issue?: Element | undefined;
      
      volume?: string | undefined;
      _volume?: Element | undefined;
      
      publishedIn?: BackboneElement | undefined;
      _publishedIn?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      publisher?: Reference | undefined;
      _publisher?: Element | undefined;
      
      publisherLocation?: string | undefined;
      _publisherLocation?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      relatedIdentifier?: Array<Identifier> | undefined;
      _relatedIdentifier?: Element[] | undefined;
      
      relatesTo?: Array<BackboneElement> | undefined;
      _relatesTo?: Element[] | undefined;
      
      relationshipType: CodeableConcept;
      _relationshipType?: Element | undefined;
      
      target[x]: uri | Identifier | Reference | Attachment;
      _target[x]?: Element | undefined;
      
      targetClassifier?: Array<CodeableConcept> | undefined;
      _targetClassifier?: Element[] | undefined;
      
      statusDate?: Array<BackboneElement> | undefined;
      _statusDate?: Element[] | undefined;
      
      activity: CodeableConcept;
      _activity?: Element | undefined;
      
      actual?: boolean | undefined;
      _actual?: Element | undefined;
      
      period: Period;
      _period?: Element | undefined;
      
      title?: Array<BackboneElement> | undefined;
      _title?: Element[] | undefined;
      
      language?: CodeableConcept | undefined;
      _language?: Element | undefined;
      
      text: markdown;
      _text?: Element | undefined;
      
      type?: Array<CodeableConcept> | undefined;
      _type?: Element[] | undefined;
      
      version?: BackboneElement | undefined;
      _version?: Element | undefined;
      
      baseCitation?: Reference | undefined;
      _baseCitation?: Element | undefined;
      
      value: string;
      _value?: Element | undefined;
      
      webLocation?: Array<BackboneElement> | undefined;
      _webLocation?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      classification?: Array<BackboneElement> | undefined;
      _classification?: Element[] | undefined;
      
      classifier?: Array<CodeableConcept> | undefined;
      _classifier?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      currentState?: Array<CodeableConcept> | undefined;
      _currentState?: Element[] | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      editor?: Array<ContactDetail> | undefined;
      _editor?: Element[] | undefined;
      
      effectivePeriod?: Period | undefined;
      _effectivePeriod?: Element | undefined;
      
      endorser?: Array<ContactDetail> | undefined;
      _endorser?: Element[] | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      lastReviewDate?: date | undefined;
      _lastReviewDate?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      relatesTo?: Array<BackboneElement> | undefined;
      _relatesTo?: Element[] | undefined;
      
      relationshipType: CodeableConcept;
      _relationshipType?: Element | undefined;
      
      target[x]: uri | Identifier | Reference | Attachment;
      _target[x]?: Element | undefined;
      
      targetClassifier?: Array<CodeableConcept> | undefined;
      _targetClassifier?: Element[] | undefined;
      
      reviewer?: Array<ContactDetail> | undefined;
      _reviewer?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      statusDate?: Array<BackboneElement> | undefined;
      _statusDate?: Element[] | undefined;
      
      activity: CodeableConcept;
      _activity?: Element | undefined;
      
      actual?: boolean | undefined;
      _actual?: Element | undefined;
      
      period: Period;
      _period?: Element | undefined;
      
      summary?: Array<BackboneElement> | undefined;
      _summary?: Element[] | undefined;
      
      style?: CodeableConcept | undefined;
      _style?: Element | undefined;
      
      text: markdown;
      _text?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "Claim";
      


      
      accident?: BackboneElement | undefined;
      _accident?: Element | undefined;
      
      date: date;
      _date?: Element | undefined;
      
      location[x]?: Address | Reference | undefined;
      _location[x]?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      billablePeriod?: Period | undefined;
      _billablePeriod?: Element | undefined;
      
      careTeam?: Array<BackboneElement> | undefined;
      _careTeam?: Element[] | undefined;
      
      provider: Reference;
      _provider?: Element | undefined;
      
      qualification?: CodeableConcept | undefined;
      _qualification?: Element | undefined;
      
      responsible?: boolean | undefined;
      _responsible?: Element | undefined;
      
      role?: CodeableConcept | undefined;
      _role?: Element | undefined;
      
      sequence: positiveInt;
      _sequence?: Element | undefined;
      
      created: dateTime;
      _created?: Element | undefined;
      
      diagnosis?: Array<BackboneElement> | undefined;
      _diagnosis?: Element[] | undefined;
      
      diagnosis[x]: CodeableConcept | Reference;
      _diagnosis[x]?: Element | undefined;
      
      onAdmission?: CodeableConcept | undefined;
      _onAdmission?: Element | undefined;
      
      packageCode?: CodeableConcept | undefined;
      _packageCode?: Element | undefined;
      
      sequence: positiveInt;
      _sequence?: Element | undefined;
      
      type?: Array<CodeableConcept> | undefined;
      _type?: Element[] | undefined;
      
      enterer?: Reference | undefined;
      _enterer?: Element | undefined;
      
      facility?: Reference | undefined;
      _facility?: Element | undefined;
      
      fundsReserve?: CodeableConcept | undefined;
      _fundsReserve?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      insurance: Array<BackboneElement>;
      _insurance?: Element[] | undefined;
      
      businessArrangement?: string | undefined;
      _businessArrangement?: Element | undefined;
      
      claimResponse?: Reference | undefined;
      _claimResponse?: Element | undefined;
      
      coverage: Reference;
      _coverage?: Element | undefined;
      
      focal: boolean;
      _focal?: Element | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      preAuthRef?: Array<string> | undefined;
      _preAuthRef?: Element[] | undefined;
      
      sequence: positiveInt;
      _sequence?: Element | undefined;
      
      insurer?: Reference | undefined;
      _insurer?: Element | undefined;
      
      item?: Array<BackboneElement> | undefined;
      _item?: Element[] | undefined;
      
      bodySite?: CodeableConcept | undefined;
      _bodySite?: Element | undefined;
      
      careTeamSequence?: Array<positiveInt> | undefined;
      _careTeamSequence?: Element[] | undefined;
      
      category?: CodeableConcept | undefined;
      _category?: Element | undefined;
      
      detail?: Array<BackboneElement> | undefined;
      _detail?: Element[] | undefined;
      
      category?: CodeableConcept | undefined;
      _category?: Element | undefined;
      
      factor?: decimal | undefined;
      _factor?: Element | undefined;
      
      modifier?: Array<CodeableConcept> | undefined;
      _modifier?: Element[] | undefined;
      
      net?: Money | undefined;
      _net?: Element | undefined;
      
      productOrService: CodeableConcept;
      _productOrService?: Element | undefined;
      
      programCode?: Array<CodeableConcept> | undefined;
      _programCode?: Element[] | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      revenue?: CodeableConcept | undefined;
      _revenue?: Element | undefined;
      
      sequence: positiveInt;
      _sequence?: Element | undefined;
      
      subDetail?: Array<BackboneElement> | undefined;
      _subDetail?: Element[] | undefined;
      
      category?: CodeableConcept | undefined;
      _category?: Element | undefined;
      
      factor?: decimal | undefined;
      _factor?: Element | undefined;
      
      modifier?: Array<CodeableConcept> | undefined;
      _modifier?: Element[] | undefined;
      
      net?: Money | undefined;
      _net?: Element | undefined;
      
      productOrService: CodeableConcept;
      _productOrService?: Element | undefined;
      
      programCode?: Array<CodeableConcept> | undefined;
      _programCode?: Element[] | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      revenue?: CodeableConcept | undefined;
      _revenue?: Element | undefined;
      
      sequence: positiveInt;
      _sequence?: Element | undefined;
      
      udi?: Array<Reference> | undefined;
      _udi?: Element[] | undefined;
      
      unitPrice?: Money | undefined;
      _unitPrice?: Element | undefined;
      
      udi?: Array<Reference> | undefined;
      _udi?: Element[] | undefined;
      
      unitPrice?: Money | undefined;
      _unitPrice?: Element | undefined;
      
      diagnosisSequence?: Array<positiveInt> | undefined;
      _diagnosisSequence?: Element[] | undefined;
      
      encounter?: Array<Reference> | undefined;
      _encounter?: Element[] | undefined;
      
      factor?: decimal | undefined;
      _factor?: Element | undefined;
      
      informationSequence?: Array<positiveInt> | undefined;
      _informationSequence?: Element[] | undefined;
      
      location[x]?: CodeableConcept | Address | Reference | undefined;
      _location[x]?: Element | undefined;
      
      modifier?: Array<CodeableConcept> | undefined;
      _modifier?: Element[] | undefined;
      
      net?: Money | undefined;
      _net?: Element | undefined;
      
      procedureSequence?: Array<positiveInt> | undefined;
      _procedureSequence?: Element[] | undefined;
      
      productOrService: CodeableConcept;
      _productOrService?: Element | undefined;
      
      programCode?: Array<CodeableConcept> | undefined;
      _programCode?: Element[] | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      revenue?: CodeableConcept | undefined;
      _revenue?: Element | undefined;
      
      sequence: positiveInt;
      _sequence?: Element | undefined;
      
      serviced[x]?: date | Period | undefined;
      _serviced[x]?: Element | undefined;
      
      subSite?: Array<CodeableConcept> | undefined;
      _subSite?: Element[] | undefined;
      
      udi?: Array<Reference> | undefined;
      _udi?: Element[] | undefined;
      
      unitPrice?: Money | undefined;
      _unitPrice?: Element | undefined;
      
      originalPrescription?: Reference | undefined;
      _originalPrescription?: Element | undefined;
      
      patient: Reference;
      _patient?: Element | undefined;
      
      payee?: BackboneElement | undefined;
      _payee?: Element | undefined;
      
      party?: Reference | undefined;
      _party?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      prescription?: Reference | undefined;
      _prescription?: Element | undefined;
      
      priority: CodeableConcept;
      _priority?: Element | undefined;
      
      procedure?: Array<BackboneElement> | undefined;
      _procedure?: Element[] | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      procedure[x]: CodeableConcept | Reference;
      _procedure[x]?: Element | undefined;
      
      sequence: positiveInt;
      _sequence?: Element | undefined;
      
      type?: Array<CodeableConcept> | undefined;
      _type?: Element[] | undefined;
      
      udi?: Array<Reference> | undefined;
      _udi?: Element[] | undefined;
      
      provider: Reference;
      _provider?: Element | undefined;
      
      referral?: Reference | undefined;
      _referral?: Element | undefined;
      
      related?: Array<BackboneElement> | undefined;
      _related?: Element[] | undefined;
      
      claim?: Reference | undefined;
      _claim?: Element | undefined;
      
      reference?: Identifier | undefined;
      _reference?: Element | undefined;
      
      relationship?: CodeableConcept | undefined;
      _relationship?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subType?: CodeableConcept | undefined;
      _subType?: Element | undefined;
      
      supportingInfo?: Array<BackboneElement> | undefined;
      _supportingInfo?: Element[] | undefined;
      
      category: CodeableConcept;
      _category?: Element | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      reason?: CodeableConcept | undefined;
      _reason?: Element | undefined;
      
      sequence: positiveInt;
      _sequence?: Element | undefined;
      
      timing[x]?: date | Period | undefined;
      _timing[x]?: Element | undefined;
      
      value[x]?: boolean | string | Quantity | Attachment | Reference | undefined;
      _value[x]?: Element | undefined;
      
      total?: Money | undefined;
      _total?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      use: code;
      _use?: Element | undefined;
      
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
      
      readonly resourceType: "ClaimResponse";
      


      
      addItem?: Array<BackboneElement> | undefined;
      _addItem?: Element[] | undefined;
      
      adjudication: Array<undefined>;
      _adjudication?: Element[] | undefined;
      
      bodySite?: CodeableConcept | undefined;
      _bodySite?: Element | undefined;
      
      detail?: Array<BackboneElement> | undefined;
      _detail?: Element[] | undefined;
      
      adjudication: Array<undefined>;
      _adjudication?: Element[] | undefined;
      
      factor?: decimal | undefined;
      _factor?: Element | undefined;
      
      modifier?: Array<CodeableConcept> | undefined;
      _modifier?: Element[] | undefined;
      
      net?: Money | undefined;
      _net?: Element | undefined;
      
      noteNumber?: Array<positiveInt> | undefined;
      _noteNumber?: Element[] | undefined;
      
      productOrService: CodeableConcept;
      _productOrService?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      subDetail?: Array<BackboneElement> | undefined;
      _subDetail?: Element[] | undefined;
      
      adjudication: Array<undefined>;
      _adjudication?: Element[] | undefined;
      
      factor?: decimal | undefined;
      _factor?: Element | undefined;
      
      modifier?: Array<CodeableConcept> | undefined;
      _modifier?: Element[] | undefined;
      
      net?: Money | undefined;
      _net?: Element | undefined;
      
      noteNumber?: Array<positiveInt> | undefined;
      _noteNumber?: Element[] | undefined;
      
      productOrService: CodeableConcept;
      _productOrService?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      unitPrice?: Money | undefined;
      _unitPrice?: Element | undefined;
      
      unitPrice?: Money | undefined;
      _unitPrice?: Element | undefined;
      
      detailSequence?: Array<positiveInt> | undefined;
      _detailSequence?: Element[] | undefined;
      
      factor?: decimal | undefined;
      _factor?: Element | undefined;
      
      itemSequence?: Array<positiveInt> | undefined;
      _itemSequence?: Element[] | undefined;
      
      location[x]?: CodeableConcept | Address | Reference | undefined;
      _location[x]?: Element | undefined;
      
      modifier?: Array<CodeableConcept> | undefined;
      _modifier?: Element[] | undefined;
      
      net?: Money | undefined;
      _net?: Element | undefined;
      
      noteNumber?: Array<positiveInt> | undefined;
      _noteNumber?: Element[] | undefined;
      
      productOrService: CodeableConcept;
      _productOrService?: Element | undefined;
      
      programCode?: Array<CodeableConcept> | undefined;
      _programCode?: Element[] | undefined;
      
      provider?: Array<Reference> | undefined;
      _provider?: Element[] | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      serviced[x]?: date | Period | undefined;
      _serviced[x]?: Element | undefined;
      
      subdetailSequence?: Array<positiveInt> | undefined;
      _subdetailSequence?: Element[] | undefined;
      
      subSite?: Array<CodeableConcept> | undefined;
      _subSite?: Element[] | undefined;
      
      unitPrice?: Money | undefined;
      _unitPrice?: Element | undefined;
      
      adjudication?: Array<undefined> | undefined;
      _adjudication?: Element[] | undefined;
      
      communicationRequest?: Array<Reference> | undefined;
      _communicationRequest?: Element[] | undefined;
      
      created: dateTime;
      _created?: Element | undefined;
      
      disposition?: string | undefined;
      _disposition?: Element | undefined;
      
      error?: Array<BackboneElement> | undefined;
      _error?: Element[] | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      detailSequence?: positiveInt | undefined;
      _detailSequence?: Element | undefined;
      
      itemSequence?: positiveInt | undefined;
      _itemSequence?: Element | undefined;
      
      subDetailSequence?: positiveInt | undefined;
      _subDetailSequence?: Element | undefined;
      
      form?: Attachment | undefined;
      _form?: Element | undefined;
      
      formCode?: CodeableConcept | undefined;
      _formCode?: Element | undefined;
      
      fundsReserve?: CodeableConcept | undefined;
      _fundsReserve?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      insurance?: Array<BackboneElement> | undefined;
      _insurance?: Element[] | undefined;
      
      businessArrangement?: string | undefined;
      _businessArrangement?: Element | undefined;
      
      claimResponse?: Reference | undefined;
      _claimResponse?: Element | undefined;
      
      coverage: Reference;
      _coverage?: Element | undefined;
      
      focal: boolean;
      _focal?: Element | undefined;
      
      sequence: positiveInt;
      _sequence?: Element | undefined;
      
      insurer: Reference;
      _insurer?: Element | undefined;
      
      item?: Array<BackboneElement> | undefined;
      _item?: Element[] | undefined;
      
      adjudication: Array<BackboneElement>;
      _adjudication?: Element[] | undefined;
      
      amount?: Money | undefined;
      _amount?: Element | undefined;
      
      category: CodeableConcept;
      _category?: Element | undefined;
      
      reason?: CodeableConcept | undefined;
      _reason?: Element | undefined;
      
      value?: decimal | undefined;
      _value?: Element | undefined;
      
      detail?: Array<BackboneElement> | undefined;
      _detail?: Element[] | undefined;
      
      adjudication: Array<undefined>;
      _adjudication?: Element[] | undefined;
      
      detailSequence: positiveInt;
      _detailSequence?: Element | undefined;
      
      noteNumber?: Array<positiveInt> | undefined;
      _noteNumber?: Element[] | undefined;
      
      subDetail?: Array<BackboneElement> | undefined;
      _subDetail?: Element[] | undefined;
      
      adjudication?: Array<undefined> | undefined;
      _adjudication?: Element[] | undefined;
      
      noteNumber?: Array<positiveInt> | undefined;
      _noteNumber?: Element[] | undefined;
      
      subDetailSequence: positiveInt;
      _subDetailSequence?: Element | undefined;
      
      itemSequence: positiveInt;
      _itemSequence?: Element | undefined;
      
      noteNumber?: Array<positiveInt> | undefined;
      _noteNumber?: Element[] | undefined;
      
      outcome: code;
      _outcome?: Element | undefined;
      
      patient: Reference;
      _patient?: Element | undefined;
      
      payeeType?: CodeableConcept | undefined;
      _payeeType?: Element | undefined;
      
      payment?: BackboneElement | undefined;
      _payment?: Element | undefined;
      
      adjustment?: Money | undefined;
      _adjustment?: Element | undefined;
      
      adjustmentReason?: CodeableConcept | undefined;
      _adjustmentReason?: Element | undefined;
      
      amount: Money;
      _amount?: Element | undefined;
      
      date?: date | undefined;
      _date?: Element | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      preAuthPeriod?: Period | undefined;
      _preAuthPeriod?: Element | undefined;
      
      preAuthRef?: string | undefined;
      _preAuthRef?: Element | undefined;
      
      processNote?: Array<BackboneElement> | undefined;
      _processNote?: Element[] | undefined;
      
      language?: CodeableConcept | undefined;
      _language?: Element | undefined;
      
      number?: positiveInt | undefined;
      _number?: Element | undefined;
      
      text: string;
      _text?: Element | undefined;
      
      type?: code | undefined;
      _type?: Element | undefined;
      
      request?: Reference | undefined;
      _request?: Element | undefined;
      
      requestor?: Reference | undefined;
      _requestor?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subType?: CodeableConcept | undefined;
      _subType?: Element | undefined;
      
      total?: Array<BackboneElement> | undefined;
      _total?: Element[] | undefined;
      
      amount: Money;
      _amount?: Element | undefined;
      
      category: CodeableConcept;
      _category?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      use: code;
      _use?: Element | undefined;
      
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
      
      readonly resourceType: "ClinicalImpression";
      


      
      assessor?: Reference | undefined;
      _assessor?: Element | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      effective[x]?: dateTime | Period | undefined;
      _effective[x]?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      finding?: Array<BackboneElement> | undefined;
      _finding?: Element[] | undefined;
      
      basis?: string | undefined;
      _basis?: Element | undefined;
      
      itemCodeableConcept?: CodeableConcept | undefined;
      _itemCodeableConcept?: Element | undefined;
      
      itemReference?: Reference | undefined;
      _itemReference?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      investigation?: Array<BackboneElement> | undefined;
      _investigation?: Element[] | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      item?: Array<Reference> | undefined;
      _item?: Element[] | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      previous?: Reference | undefined;
      _previous?: Element | undefined;
      
      problem?: Array<Reference> | undefined;
      _problem?: Element[] | undefined;
      
      prognosisCodeableConcept?: Array<CodeableConcept> | undefined;
      _prognosisCodeableConcept?: Element[] | undefined;
      
      prognosisReference?: Array<Reference> | undefined;
      _prognosisReference?: Element[] | undefined;
      
      protocol?: Array<uri> | undefined;
      _protocol?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      statusReason?: CodeableConcept | undefined;
      _statusReason?: Element | undefined;
      
      subject: Reference;
      _subject?: Element | undefined;
      
      summary?: string | undefined;
      _summary?: Element | undefined;
      
      supportingInfo?: Array<Reference> | undefined;
      _supportingInfo?: Element[] | undefined;
      
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
      
      readonly resourceType: "ClinicalUseDefinition";
      


      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      contraindication?: BackboneElement | undefined;
      _contraindication?: Element | undefined;
      
      comorbidity?: Array<CodeableReference> | undefined;
      _comorbidity?: Element[] | undefined;
      
      diseaseStatus?: CodeableReference | undefined;
      _diseaseStatus?: Element | undefined;
      
      diseaseSymptomProcedure?: CodeableReference | undefined;
      _diseaseSymptomProcedure?: Element | undefined;
      
      indication?: Array<Reference> | undefined;
      _indication?: Element[] | undefined;
      
      otherTherapy?: Array<BackboneElement> | undefined;
      _otherTherapy?: Element[] | undefined;
      
      relationshipType: CodeableConcept;
      _relationshipType?: Element | undefined;
      
      therapy: CodeableReference;
      _therapy?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      indication?: BackboneElement | undefined;
      _indication?: Element | undefined;
      
      comorbidity?: Array<CodeableReference> | undefined;
      _comorbidity?: Element[] | undefined;
      
      diseaseStatus?: CodeableReference | undefined;
      _diseaseStatus?: Element | undefined;
      
      diseaseSymptomProcedure?: CodeableReference | undefined;
      _diseaseSymptomProcedure?: Element | undefined;
      
      duration[x]?: Range | string | undefined;
      _duration[x]?: Element | undefined;
      
      intendedEffect?: CodeableReference | undefined;
      _intendedEffect?: Element | undefined;
      
      otherTherapy?: Array<undefined> | undefined;
      _otherTherapy?: Element[] | undefined;
      
      undesirableEffect?: Array<Reference> | undefined;
      _undesirableEffect?: Element[] | undefined;
      
      interaction?: BackboneElement | undefined;
      _interaction?: Element | undefined;
      
      effect?: CodeableReference | undefined;
      _effect?: Element | undefined;
      
      incidence?: CodeableConcept | undefined;
      _incidence?: Element | undefined;
      
      interactant?: Array<BackboneElement> | undefined;
      _interactant?: Element[] | undefined;
      
      item[x]: Reference | CodeableConcept;
      _item[x]?: Element | undefined;
      
      management?: Array<CodeableConcept> | undefined;
      _management?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      population?: Array<Reference> | undefined;
      _population?: Element[] | undefined;
      
      status?: CodeableConcept | undefined;
      _status?: Element | undefined;
      
      subject?: Array<Reference> | undefined;
      _subject?: Element[] | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      undesirableEffect?: BackboneElement | undefined;
      _undesirableEffect?: Element | undefined;
      
      classification?: CodeableConcept | undefined;
      _classification?: Element | undefined;
      
      frequencyOfOccurrence?: CodeableConcept | undefined;
      _frequencyOfOccurrence?: Element | undefined;
      
      symptomConditionEffect?: CodeableReference | undefined;
      _symptomConditionEffect?: Element | undefined;
      
      warning?: BackboneElement | undefined;
      _warning?: Element | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
    }

  


  


  
    /**
 * CodeableConcept
 * 
 * Base StructureDefinition for CodeableConcept Type: A concept that may be defined
 * by a formal reference to a terminology or ontology or may be provided by text.
 * 
 * @see {@link http://hl7.org/fhir/R4B/CodeableConcept.html}
 */
    export interface CodeableConcept extends Element {
      
      readonly resourceType: string;
      


      
      coding?: Array<Coding> | undefined;
      _coding?: Element[] | undefined;
      
      text?: string | undefined;
      _text?: Element | undefined;
      
    }

  


  
    /**
 * CodeableReference
 * 
 * Base StructureDefinition for CodeableReference Type: A reference to a resource
 * (by instance), or instead, a reference to a concept defined in a terminology or
 * ontology (by class).
 * 
 * @see {@link http://hl7.org/fhir/R4B/CodeableReference.html}
 */
    export interface CodeableReference extends Element {
      
      readonly resourceType: string;
      


      
      concept?: CodeableConcept | undefined;
      _concept?: Element | undefined;
      
      reference?: Reference | undefined;
      _reference?: Element | undefined;
      
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
      
      readonly resourceType: "CodeSystem";
      


      
      caseSensitive?: boolean | undefined;
      _caseSensitive?: Element | undefined;
      
      compositional?: boolean | undefined;
      _compositional?: Element | undefined;
      
      concept?: Array<BackboneElement> | undefined;
      _concept?: Element[] | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      concept?: Array<undefined> | undefined;
      _concept?: Element[] | undefined;
      
      definition?: string | undefined;
      _definition?: Element | undefined;
      
      designation?: Array<BackboneElement> | undefined;
      _designation?: Element[] | undefined;
      
      language?: code | undefined;
      _language?: Element | undefined;
      
      use?: Coding | undefined;
      _use?: Element | undefined;
      
      value: string;
      _value?: Element | undefined;
      
      display?: string | undefined;
      _display?: Element | undefined;
      
      property?: Array<BackboneElement> | undefined;
      _property?: Element[] | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      value[x]: code | Coding | string | integer | boolean | dateTime | decimal;
      _value[x]?: Element | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      content: code;
      _content?: Element | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      count?: unsignedInt | undefined;
      _count?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      filter?: Array<BackboneElement> | undefined;
      _filter?: Element[] | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      operator: Array<code>;
      _operator?: Element[] | undefined;
      
      value: string;
      _value?: Element | undefined;
      
      hierarchyMeaning?: code | undefined;
      _hierarchyMeaning?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      property?: Array<BackboneElement> | undefined;
      _property?: Element[] | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      uri?: uri | undefined;
      _uri?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      supplements?: canonical | undefined;
      _supplements?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      valueSet?: canonical | undefined;
      _valueSet?: Element | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
      versionNeeded?: boolean | undefined;
      _versionNeeded?: Element | undefined;
      
    }

  


  
    /**
 * Coding
 * 
 * Base StructureDefinition for Coding Type: A reference to a code defined by a
 * terminology system.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Coding.html}
 */
    export interface Coding extends Element {
      
      readonly resourceType: string;
      


      
      code?: code | undefined;
      _code?: Element | undefined;
      
      display?: string | undefined;
      _display?: Element | undefined;
      
      system?: uri | undefined;
      _system?: Element | undefined;
      
      userSelected?: boolean | undefined;
      _userSelected?: Element | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "Communication";
      


      
      about?: Array<Reference> | undefined;
      _about?: Element[] | undefined;
      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      inResponseTo?: Array<Reference> | undefined;
      _inResponseTo?: Element[] | undefined;
      
      instantiatesCanonical?: Array<canonical> | undefined;
      _instantiatesCanonical?: Element[] | undefined;
      
      instantiatesUri?: Array<uri> | undefined;
      _instantiatesUri?: Element[] | undefined;
      
      medium?: Array<CodeableConcept> | undefined;
      _medium?: Element[] | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      partOf?: Array<Reference> | undefined;
      _partOf?: Element[] | undefined;
      
      payload?: Array<BackboneElement> | undefined;
      _payload?: Element[] | undefined;
      
      content[x]: string | Attachment | Reference;
      _content[x]?: Element | undefined;
      
      priority?: code | undefined;
      _priority?: Element | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      received?: dateTime | undefined;
      _received?: Element | undefined;
      
      recipient?: Array<Reference> | undefined;
      _recipient?: Element[] | undefined;
      
      sender?: Reference | undefined;
      _sender?: Element | undefined;
      
      sent?: dateTime | undefined;
      _sent?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      statusReason?: CodeableConcept | undefined;
      _statusReason?: Element | undefined;
      
      subject?: Reference | undefined;
      _subject?: Element | undefined;
      
      topic?: CodeableConcept | undefined;
      _topic?: Element | undefined;
      
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
      
      readonly resourceType: "CommunicationRequest";
      


      
      about?: Array<Reference> | undefined;
      _about?: Element[] | undefined;
      
      authoredOn?: dateTime | undefined;
      _authoredOn?: Element | undefined;
      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      doNotPerform?: boolean | undefined;
      _doNotPerform?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      groupIdentifier?: Identifier | undefined;
      _groupIdentifier?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      medium?: Array<CodeableConcept> | undefined;
      _medium?: Element[] | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      occurrence[x]?: dateTime | Period | undefined;
      _occurrence[x]?: Element | undefined;
      
      payload?: Array<BackboneElement> | undefined;
      _payload?: Element[] | undefined;
      
      content[x]: string | Attachment | Reference;
      _content[x]?: Element | undefined;
      
      priority?: code | undefined;
      _priority?: Element | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      recipient?: Array<Reference> | undefined;
      _recipient?: Element[] | undefined;
      
      replaces?: Array<Reference> | undefined;
      _replaces?: Element[] | undefined;
      
      requester?: Reference | undefined;
      _requester?: Element | undefined;
      
      sender?: Reference | undefined;
      _sender?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      statusReason?: CodeableConcept | undefined;
      _statusReason?: Element | undefined;
      
      subject?: Reference | undefined;
      _subject?: Element | undefined;
      
    }

  


  
    /**
 * CompartmentDefinition
 * 
 * A compartment definition that defines how resources are accessed on a server.
 * 
 * @see {@link http://hl7.org/fhir/R4B/CompartmentDefinition.html}
 */
    export interface CompartmentDefinition extends DomainResource {
      
      readonly resourceType: "CompartmentDefinition";
      


      
      code: code;
      _code?: Element | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      resource?: Array<BackboneElement> | undefined;
      _resource?: Element[] | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      documentation?: string | undefined;
      _documentation?: Element | undefined;
      
      param?: Array<string> | undefined;
      _param?: Element[] | undefined;
      
      search: boolean;
      _search?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      url: uri;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "Composition";
      


      
      attester?: Array<BackboneElement> | undefined;
      _attester?: Element[] | undefined;
      
      mode: code;
      _mode?: Element | undefined;
      
      party?: Reference | undefined;
      _party?: Element | undefined;
      
      time?: dateTime | undefined;
      _time?: Element | undefined;
      
      author: Array<Reference>;
      _author?: Element[] | undefined;
      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      confidentiality?: code | undefined;
      _confidentiality?: Element | undefined;
      
      custodian?: Reference | undefined;
      _custodian?: Element | undefined;
      
      date: dateTime;
      _date?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      event?: Array<BackboneElement> | undefined;
      _event?: Element[] | undefined;
      
      code?: Array<CodeableConcept> | undefined;
      _code?: Element[] | undefined;
      
      detail?: Array<Reference> | undefined;
      _detail?: Element[] | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      relatesTo?: Array<BackboneElement> | undefined;
      _relatesTo?: Element[] | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      target[x]: Identifier | Reference;
      _target[x]?: Element | undefined;
      
      section?: Array<BackboneElement> | undefined;
      _section?: Element[] | undefined;
      
      author?: Array<Reference> | undefined;
      _author?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      emptyReason?: CodeableConcept | undefined;
      _emptyReason?: Element | undefined;
      
      entry?: Array<Reference> | undefined;
      _entry?: Element[] | undefined;
      
      focus?: Reference | undefined;
      _focus?: Element | undefined;
      
      mode?: code | undefined;
      _mode?: Element | undefined;
      
      orderedBy?: CodeableConcept | undefined;
      _orderedBy?: Element | undefined;
      
      section?: Array<undefined> | undefined;
      _section?: Element[] | undefined;
      
      text?: Narrative | undefined;
      _text?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject?: Reference | undefined;
      _subject?: Element | undefined;
      
      title: string;
      _title?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
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
      
      readonly resourceType: "ConceptMap";
      


      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      group?: Array<BackboneElement> | undefined;
      _group?: Element[] | undefined;
      
      element: Array<BackboneElement>;
      _element?: Element[] | undefined;
      
      code?: code | undefined;
      _code?: Element | undefined;
      
      display?: string | undefined;
      _display?: Element | undefined;
      
      target?: Array<BackboneElement> | undefined;
      _target?: Element[] | undefined;
      
      code?: code | undefined;
      _code?: Element | undefined;
      
      comment?: string | undefined;
      _comment?: Element | undefined;
      
      dependsOn?: Array<BackboneElement> | undefined;
      _dependsOn?: Element[] | undefined;
      
      display?: string | undefined;
      _display?: Element | undefined;
      
      property: uri;
      _property?: Element | undefined;
      
      system?: canonical | undefined;
      _system?: Element | undefined;
      
      value: string;
      _value?: Element | undefined;
      
      display?: string | undefined;
      _display?: Element | undefined;
      
      equivalence: code;
      _equivalence?: Element | undefined;
      
      product?: Array<undefined> | undefined;
      _product?: Element[] | undefined;
      
      source?: uri | undefined;
      _source?: Element | undefined;
      
      sourceVersion?: string | undefined;
      _sourceVersion?: Element | undefined;
      
      target?: uri | undefined;
      _target?: Element | undefined;
      
      targetVersion?: string | undefined;
      _targetVersion?: Element | undefined;
      
      unmapped?: BackboneElement | undefined;
      _unmapped?: Element | undefined;
      
      code?: code | undefined;
      _code?: Element | undefined;
      
      display?: string | undefined;
      _display?: Element | undefined;
      
      mode: code;
      _mode?: Element | undefined;
      
      url?: canonical | undefined;
      _url?: Element | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      source[x]?: uri | canonical | undefined;
      _source[x]?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      target[x]?: uri | canonical | undefined;
      _target[x]?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "Condition";
      


      
      abatement[x]?: dateTime | Age | Period | Range | string | undefined;
      _abatement[x]?: Element | undefined;
      
      asserter?: Reference | undefined;
      _asserter?: Element | undefined;
      
      bodySite?: Array<CodeableConcept> | undefined;
      _bodySite?: Element[] | undefined;
      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      clinicalStatus?: CodeableConcept | undefined;
      _clinicalStatus?: Element | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      evidence?: Array<BackboneElement> | undefined;
      _evidence?: Element[] | undefined;
      
      code?: Array<CodeableConcept> | undefined;
      _code?: Element[] | undefined;
      
      detail?: Array<Reference> | undefined;
      _detail?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      onset[x]?: dateTime | Age | Period | Range | string | undefined;
      _onset[x]?: Element | undefined;
      
      recordedDate?: dateTime | undefined;
      _recordedDate?: Element | undefined;
      
      recorder?: Reference | undefined;
      _recorder?: Element | undefined;
      
      severity?: CodeableConcept | undefined;
      _severity?: Element | undefined;
      
      stage?: Array<BackboneElement> | undefined;
      _stage?: Element[] | undefined;
      
      assessment?: Array<Reference> | undefined;
      _assessment?: Element[] | undefined;
      
      summary?: CodeableConcept | undefined;
      _summary?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      subject: Reference;
      _subject?: Element | undefined;
      
      verificationStatus?: CodeableConcept | undefined;
      _verificationStatus?: Element | undefined;
      
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
      
      readonly resourceType: "Consent";
      


      
      category: Array<CodeableConcept>;
      _category?: Element[] | undefined;
      
      dateTime?: dateTime | undefined;
      _dateTime?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      organization?: Array<Reference> | undefined;
      _organization?: Element[] | undefined;
      
      patient?: Reference | undefined;
      _patient?: Element | undefined;
      
      performer?: Array<Reference> | undefined;
      _performer?: Element[] | undefined;
      
      policy?: Array<BackboneElement> | undefined;
      _policy?: Element[] | undefined;
      
      authority?: uri | undefined;
      _authority?: Element | undefined;
      
      uri?: uri | undefined;
      _uri?: Element | undefined;
      
      policyRule?: CodeableConcept | undefined;
      _policyRule?: Element | undefined;
      
      provision?: BackboneElement | undefined;
      _provision?: Element | undefined;
      
      action?: Array<CodeableConcept> | undefined;
      _action?: Element[] | undefined;
      
      actor?: Array<BackboneElement> | undefined;
      _actor?: Element[] | undefined;
      
      reference: Reference;
      _reference?: Element | undefined;
      
      role: CodeableConcept;
      _role?: Element | undefined;
      
      class?: Array<Coding> | undefined;
      _class?: Element[] | undefined;
      
      code?: Array<CodeableConcept> | undefined;
      _code?: Element[] | undefined;
      
      data?: Array<BackboneElement> | undefined;
      _data?: Element[] | undefined;
      
      meaning: code;
      _meaning?: Element | undefined;
      
      reference: Reference;
      _reference?: Element | undefined;
      
      dataPeriod?: Period | undefined;
      _dataPeriod?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      provision?: Array<undefined> | undefined;
      _provision?: Element[] | undefined;
      
      purpose?: Array<Coding> | undefined;
      _purpose?: Element[] | undefined;
      
      securityLabel?: Array<Coding> | undefined;
      _securityLabel?: Element[] | undefined;
      
      type?: code | undefined;
      _type?: Element | undefined;
      
      scope: CodeableConcept;
      _scope?: Element | undefined;
      
      source[x]?: Attachment | Reference | undefined;
      _source[x]?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      verification?: Array<BackboneElement> | undefined;
      _verification?: Element[] | undefined;
      
      verificationDate?: dateTime | undefined;
      _verificationDate?: Element | undefined;
      
      verified: boolean;
      _verified?: Element | undefined;
      
      verifiedWith?: Reference | undefined;
      _verifiedWith?: Element | undefined;
      
    }

  


  


  


  
    /**
 * ContactDetail
 * 
 * Base StructureDefinition for ContactDetail Type: Specifies contact information
 * for a person or organization.
 * 
 * @see {@link http://hl7.org/fhir/R4B/ContactDetail.html}
 */
    export interface ContactDetail extends Element {
      
      readonly resourceType: string;
      


      
      name?: string | undefined;
      _name?: Element | undefined;
      
      telecom?: Array<ContactPoint> | undefined;
      _telecom?: Element[] | undefined;
      
    }

  


  
    /**
 * ContactPoint
 * 
 * Base StructureDefinition for ContactPoint Type: Details for all kinds of
 * technology mediated contact points for a person or organization, including
 * telephone, email, etc.
 * 
 * @see {@link http://hl7.org/fhir/R4B/ContactPoint.html}
 */
    export interface ContactPoint extends Element {
      
      readonly resourceType: string;
      


      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      rank?: positiveInt | undefined;
      _rank?: Element | undefined;
      
      system?: code | undefined;
      _system?: Element | undefined;
      
      use?: code | undefined;
      _use?: Element | undefined;
      
      value?: string | undefined;
      _value?: Element | undefined;
      
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
      
      readonly resourceType: "Contract";
      


      
      alias?: Array<string> | undefined;
      _alias?: Element[] | undefined;
      
      applies?: Period | undefined;
      _applies?: Element | undefined;
      
      author?: Reference | undefined;
      _author?: Element | undefined;
      
      authority?: Array<Reference> | undefined;
      _authority?: Element[] | undefined;
      
      contentDefinition?: BackboneElement | undefined;
      _contentDefinition?: Element | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      publicationDate?: dateTime | undefined;
      _publicationDate?: Element | undefined;
      
      publicationStatus: code;
      _publicationStatus?: Element | undefined;
      
      publisher?: Reference | undefined;
      _publisher?: Element | undefined;
      
      subType?: CodeableConcept | undefined;
      _subType?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      contentDerivative?: CodeableConcept | undefined;
      _contentDerivative?: Element | undefined;
      
      domain?: Array<Reference> | undefined;
      _domain?: Element[] | undefined;
      
      expirationType?: CodeableConcept | undefined;
      _expirationType?: Element | undefined;
      
      friendly?: Array<BackboneElement> | undefined;
      _friendly?: Element[] | undefined;
      
      content[x]: Attachment | Reference;
      _content[x]?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      instantiatesCanonical?: Reference | undefined;
      _instantiatesCanonical?: Element | undefined;
      
      instantiatesUri?: uri | undefined;
      _instantiatesUri?: Element | undefined;
      
      issued?: dateTime | undefined;
      _issued?: Element | undefined;
      
      legal?: Array<BackboneElement> | undefined;
      _legal?: Element[] | undefined;
      
      content[x]: Attachment | Reference;
      _content[x]?: Element | undefined;
      
      legallyBinding[x]?: Attachment | Reference | undefined;
      _legallyBinding[x]?: Element | undefined;
      
      legalState?: CodeableConcept | undefined;
      _legalState?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      relevantHistory?: Array<Reference> | undefined;
      _relevantHistory?: Element[] | undefined;
      
      rule?: Array<BackboneElement> | undefined;
      _rule?: Element[] | undefined;
      
      content[x]: Attachment | Reference;
      _content[x]?: Element | undefined;
      
      scope?: CodeableConcept | undefined;
      _scope?: Element | undefined;
      
      signer?: Array<BackboneElement> | undefined;
      _signer?: Element[] | undefined;
      
      party: Reference;
      _party?: Element | undefined;
      
      signature: Array<Signature>;
      _signature?: Element[] | undefined;
      
      type: Coding;
      _type?: Element | undefined;
      
      site?: Array<Reference> | undefined;
      _site?: Element[] | undefined;
      
      status?: code | undefined;
      _status?: Element | undefined;
      
      subject?: Array<Reference> | undefined;
      _subject?: Element[] | undefined;
      
      subtitle?: string | undefined;
      _subtitle?: Element | undefined;
      
      subType?: Array<CodeableConcept> | undefined;
      _subType?: Element[] | undefined;
      
      supportingInfo?: Array<Reference> | undefined;
      _supportingInfo?: Element[] | undefined;
      
      term?: Array<BackboneElement> | undefined;
      _term?: Element[] | undefined;
      
      action?: Array<BackboneElement> | undefined;
      _action?: Element[] | undefined;
      
      context?: Reference | undefined;
      _context?: Element | undefined;
      
      contextLinkId?: Array<string> | undefined;
      _contextLinkId?: Element[] | undefined;
      
      doNotPerform?: boolean | undefined;
      _doNotPerform?: Element | undefined;
      
      intent: CodeableConcept;
      _intent?: Element | undefined;
      
      linkId?: Array<string> | undefined;
      _linkId?: Element[] | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      occurrence[x]?: dateTime | Period | Timing | undefined;
      _occurrence[x]?: Element | undefined;
      
      performer?: Reference | undefined;
      _performer?: Element | undefined;
      
      performerLinkId?: Array<string> | undefined;
      _performerLinkId?: Element[] | undefined;
      
      performerRole?: CodeableConcept | undefined;
      _performerRole?: Element | undefined;
      
      performerType?: Array<CodeableConcept> | undefined;
      _performerType?: Element[] | undefined;
      
      reason?: Array<string> | undefined;
      _reason?: Element[] | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonLinkId?: Array<string> | undefined;
      _reasonLinkId?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      requester?: Array<Reference> | undefined;
      _requester?: Element[] | undefined;
      
      requesterLinkId?: Array<string> | undefined;
      _requesterLinkId?: Element[] | undefined;
      
      securityLabelNumber?: Array<unsignedInt> | undefined;
      _securityLabelNumber?: Element[] | undefined;
      
      status: CodeableConcept;
      _status?: Element | undefined;
      
      subject?: Array<BackboneElement> | undefined;
      _subject?: Element[] | undefined;
      
      reference: Array<Reference>;
      _reference?: Element[] | undefined;
      
      role?: CodeableConcept | undefined;
      _role?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      applies?: Period | undefined;
      _applies?: Element | undefined;
      
      asset?: Array<BackboneElement> | undefined;
      _asset?: Element[] | undefined;
      
      answer?: Array<undefined> | undefined;
      _answer?: Element[] | undefined;
      
      condition?: string | undefined;
      _condition?: Element | undefined;
      
      context?: Array<BackboneElement> | undefined;
      _context?: Element[] | undefined;
      
      code?: Array<CodeableConcept> | undefined;
      _code?: Element[] | undefined;
      
      reference?: Reference | undefined;
      _reference?: Element | undefined;
      
      text?: string | undefined;
      _text?: Element | undefined;
      
      linkId?: Array<string> | undefined;
      _linkId?: Element[] | undefined;
      
      period?: Array<Period> | undefined;
      _period?: Element[] | undefined;
      
      periodType?: Array<CodeableConcept> | undefined;
      _periodType?: Element[] | undefined;
      
      relationship?: Coding | undefined;
      _relationship?: Element | undefined;
      
      scope?: CodeableConcept | undefined;
      _scope?: Element | undefined;
      
      securityLabelNumber?: Array<unsignedInt> | undefined;
      _securityLabelNumber?: Element[] | undefined;
      
      subtype?: Array<CodeableConcept> | undefined;
      _subtype?: Element[] | undefined;
      
      text?: string | undefined;
      _text?: Element | undefined;
      
      type?: Array<CodeableConcept> | undefined;
      _type?: Element[] | undefined;
      
      typeReference?: Array<Reference> | undefined;
      _typeReference?: Element[] | undefined;
      
      usePeriod?: Array<Period> | undefined;
      _usePeriod?: Element[] | undefined;
      
      valuedItem?: Array<BackboneElement> | undefined;
      _valuedItem?: Element[] | undefined;
      
      effectiveTime?: dateTime | undefined;
      _effectiveTime?: Element | undefined;
      
      entity[x]?: CodeableConcept | Reference | undefined;
      _entity[x]?: Element | undefined;
      
      factor?: decimal | undefined;
      _factor?: Element | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      linkId?: Array<string> | undefined;
      _linkId?: Element[] | undefined;
      
      net?: Money | undefined;
      _net?: Element | undefined;
      
      payment?: string | undefined;
      _payment?: Element | undefined;
      
      paymentDate?: dateTime | undefined;
      _paymentDate?: Element | undefined;
      
      points?: decimal | undefined;
      _points?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      recipient?: Reference | undefined;
      _recipient?: Element | undefined;
      
      responsible?: Reference | undefined;
      _responsible?: Element | undefined;
      
      securityLabelNumber?: Array<unsignedInt> | undefined;
      _securityLabelNumber?: Element[] | undefined;
      
      unitPrice?: Money | undefined;
      _unitPrice?: Element | undefined;
      
      group?: Array<undefined> | undefined;
      _group?: Element[] | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      issued?: dateTime | undefined;
      _issued?: Element | undefined;
      
      offer: BackboneElement;
      _offer?: Element | undefined;
      
      answer?: Array<BackboneElement> | undefined;
      _answer?: Element[] | undefined;
      
      value[x]: boolean | decimal | integer | date | dateTime | time | string | uri | Attachment | Coding | Quantity | Reference;
      _value[x]?: Element | undefined;
      
      decision?: CodeableConcept | undefined;
      _decision?: Element | undefined;
      
      decisionMode?: Array<CodeableConcept> | undefined;
      _decisionMode?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      linkId?: Array<string> | undefined;
      _linkId?: Element[] | undefined;
      
      party?: Array<BackboneElement> | undefined;
      _party?: Element[] | undefined;
      
      reference: Array<Reference>;
      _reference?: Element[] | undefined;
      
      role: CodeableConcept;
      _role?: Element | undefined;
      
      securityLabelNumber?: Array<unsignedInt> | undefined;
      _securityLabelNumber?: Element[] | undefined;
      
      text?: string | undefined;
      _text?: Element | undefined;
      
      topic?: Reference | undefined;
      _topic?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      securityLabel?: Array<BackboneElement> | undefined;
      _securityLabel?: Element[] | undefined;
      
      category?: Array<Coding> | undefined;
      _category?: Element[] | undefined;
      
      classification: Coding;
      _classification?: Element | undefined;
      
      control?: Array<Coding> | undefined;
      _control?: Element[] | undefined;
      
      number?: Array<unsignedInt> | undefined;
      _number?: Element[] | undefined;
      
      subType?: CodeableConcept | undefined;
      _subType?: Element | undefined;
      
      text?: string | undefined;
      _text?: Element | undefined;
      
      topic[x]?: CodeableConcept | Reference | undefined;
      _topic[x]?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      topic[x]?: CodeableConcept | Reference | undefined;
      _topic[x]?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
    }

  


  


  
    /**
 * Contributor
 * 
 * Base StructureDefinition for Contributor Type: A contributor to the content of a
 * knowledge asset, including authors, editors, reviewers, and endorsers.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Contributor.html}
 */
    export interface Contributor extends Element {
      
      readonly resourceType: string;
      


      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
    }

  


  


  
    /**
 * Count
 * 
 * Base StructureDefinition for Count Type: A measured amount (or an amount that
 * can potentially be measured). Note that measured amounts include amounts that
 * are not precisely quantified, including amounts involving arbitrary units and
 * floating currencies.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Count.html}
 */
    export interface Count extends Quantity {
      
      readonly resourceType: string;
      


      
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
      
      readonly resourceType: "Coverage";
      


      
      beneficiary: Reference;
      _beneficiary?: Element | undefined;
      
      class?: Array<BackboneElement> | undefined;
      _class?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      value: string;
      _value?: Element | undefined;
      
      contract?: Array<Reference> | undefined;
      _contract?: Element[] | undefined;
      
      costToBeneficiary?: Array<BackboneElement> | undefined;
      _costToBeneficiary?: Element[] | undefined;
      
      exception?: Array<BackboneElement> | undefined;
      _exception?: Element[] | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      value[x]: Quantity | Money;
      _value[x]?: Element | undefined;
      
      dependent?: string | undefined;
      _dependent?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      network?: string | undefined;
      _network?: Element | undefined;
      
      order?: positiveInt | undefined;
      _order?: Element | undefined;
      
      payor: Array<Reference>;
      _payor?: Element[] | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      policyHolder?: Reference | undefined;
      _policyHolder?: Element | undefined;
      
      relationship?: CodeableConcept | undefined;
      _relationship?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subrogation?: boolean | undefined;
      _subrogation?: Element | undefined;
      
      subscriber?: Reference | undefined;
      _subscriber?: Element | undefined;
      
      subscriberId?: string | undefined;
      _subscriberId?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
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
      
      readonly resourceType: "CoverageEligibilityRequest";
      


      
      created: dateTime;
      _created?: Element | undefined;
      
      enterer?: Reference | undefined;
      _enterer?: Element | undefined;
      
      facility?: Reference | undefined;
      _facility?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      insurance?: Array<BackboneElement> | undefined;
      _insurance?: Element[] | undefined;
      
      businessArrangement?: string | undefined;
      _businessArrangement?: Element | undefined;
      
      coverage: Reference;
      _coverage?: Element | undefined;
      
      focal?: boolean | undefined;
      _focal?: Element | undefined;
      
      insurer: Reference;
      _insurer?: Element | undefined;
      
      item?: Array<BackboneElement> | undefined;
      _item?: Element[] | undefined;
      
      category?: CodeableConcept | undefined;
      _category?: Element | undefined;
      
      detail?: Array<Reference> | undefined;
      _detail?: Element[] | undefined;
      
      diagnosis?: Array<BackboneElement> | undefined;
      _diagnosis?: Element[] | undefined;
      
      diagnosis[x]?: CodeableConcept | Reference | undefined;
      _diagnosis[x]?: Element | undefined;
      
      facility?: Reference | undefined;
      _facility?: Element | undefined;
      
      modifier?: Array<CodeableConcept> | undefined;
      _modifier?: Element[] | undefined;
      
      productOrService?: CodeableConcept | undefined;
      _productOrService?: Element | undefined;
      
      provider?: Reference | undefined;
      _provider?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      supportingInfoSequence?: Array<positiveInt> | undefined;
      _supportingInfoSequence?: Element[] | undefined;
      
      unitPrice?: Money | undefined;
      _unitPrice?: Element | undefined;
      
      patient: Reference;
      _patient?: Element | undefined;
      
      priority?: CodeableConcept | undefined;
      _priority?: Element | undefined;
      
      provider?: Reference | undefined;
      _provider?: Element | undefined;
      
      purpose: Array<code>;
      _purpose?: Element[] | undefined;
      
      serviced[x]?: date | Period | undefined;
      _serviced[x]?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      supportingInfo?: Array<BackboneElement> | undefined;
      _supportingInfo?: Element[] | undefined;
      
      appliesToAll?: boolean | undefined;
      _appliesToAll?: Element | undefined;
      
      information: Reference;
      _information?: Element | undefined;
      
      sequence: positiveInt;
      _sequence?: Element | undefined;
      
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
      
      readonly resourceType: "CoverageEligibilityResponse";
      


      
      created: dateTime;
      _created?: Element | undefined;
      
      disposition?: string | undefined;
      _disposition?: Element | undefined;
      
      error?: Array<BackboneElement> | undefined;
      _error?: Element[] | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      form?: CodeableConcept | undefined;
      _form?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      insurance?: Array<BackboneElement> | undefined;
      _insurance?: Element[] | undefined;
      
      benefitPeriod?: Period | undefined;
      _benefitPeriod?: Element | undefined;
      
      coverage: Reference;
      _coverage?: Element | undefined;
      
      inforce?: boolean | undefined;
      _inforce?: Element | undefined;
      
      item?: Array<BackboneElement> | undefined;
      _item?: Element[] | undefined;
      
      authorizationRequired?: boolean | undefined;
      _authorizationRequired?: Element | undefined;
      
      authorizationSupporting?: Array<CodeableConcept> | undefined;
      _authorizationSupporting?: Element[] | undefined;
      
      authorizationUrl?: uri | undefined;
      _authorizationUrl?: Element | undefined;
      
      benefit?: Array<BackboneElement> | undefined;
      _benefit?: Element[] | undefined;
      
      allowed[x]?: unsignedInt | string | Money | undefined;
      _allowed[x]?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      used[x]?: unsignedInt | string | Money | undefined;
      _used[x]?: Element | undefined;
      
      category?: CodeableConcept | undefined;
      _category?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      excluded?: boolean | undefined;
      _excluded?: Element | undefined;
      
      modifier?: Array<CodeableConcept> | undefined;
      _modifier?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      network?: CodeableConcept | undefined;
      _network?: Element | undefined;
      
      productOrService?: CodeableConcept | undefined;
      _productOrService?: Element | undefined;
      
      provider?: Reference | undefined;
      _provider?: Element | undefined;
      
      term?: CodeableConcept | undefined;
      _term?: Element | undefined;
      
      unit?: CodeableConcept | undefined;
      _unit?: Element | undefined;
      
      insurer: Reference;
      _insurer?: Element | undefined;
      
      outcome: code;
      _outcome?: Element | undefined;
      
      patient: Reference;
      _patient?: Element | undefined;
      
      preAuthRef?: string | undefined;
      _preAuthRef?: Element | undefined;
      
      purpose: Array<code>;
      _purpose?: Element[] | undefined;
      
      request: Reference;
      _request?: Element | undefined;
      
      requestor?: Reference | undefined;
      _requestor?: Element | undefined;
      
      serviced[x]?: date | Period | undefined;
      _serviced[x]?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
    }

  


  


  


  


  


  
    /**
 * DataRequirement
 * 
 * Base StructureDefinition for DataRequirement Type: Describes a required data
 * item for evaluation in terms of the type of data, and optional code or
 * date-based filters of the data.
 * 
 * @see {@link http://hl7.org/fhir/R4B/DataRequirement.html}
 */
    export interface DataRequirement extends Element {
      
      readonly resourceType: string;
      


      
      codeFilter?: Array<Element> | undefined;
      _codeFilter?: Element[] | undefined;
      
      code?: Array<Coding> | undefined;
      _code?: Element[] | undefined;
      
      path?: string | undefined;
      _path?: Element | undefined;
      
      searchParam?: string | undefined;
      _searchParam?: Element | undefined;
      
      valueSet?: canonical | undefined;
      _valueSet?: Element | undefined;
      
      dateFilter?: Array<Element> | undefined;
      _dateFilter?: Element[] | undefined;
      
      path?: string | undefined;
      _path?: Element | undefined;
      
      searchParam?: string | undefined;
      _searchParam?: Element | undefined;
      
      value[x]?: dateTime | Period | Duration | undefined;
      _value[x]?: Element | undefined;
      
      limit?: positiveInt | undefined;
      _limit?: Element | undefined;
      
      mustSupport?: Array<string> | undefined;
      _mustSupport?: Element[] | undefined;
      
      profile?: Array<canonical> | undefined;
      _profile?: Element[] | undefined;
      
      sort?: Array<Element> | undefined;
      _sort?: Element[] | undefined;
      
      direction: code;
      _direction?: Element | undefined;
      
      path: string;
      _path?: Element | undefined;
      
      subject[x]?: CodeableConcept | Reference | undefined;
      _subject[x]?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
    }

  


  
    /**
 * DataType
 * 
 * Base StructureDefinition for DataType Type: The base class for all re-useable
 * types defined as part of the FHIR Specification.
 * 
 * @see {@link http://hl7.org/fhir/R4B/DataType.html}
 */
    export interface DataType extends Element {
      
      readonly resourceType: string;
      


      
    }

  


  


  


  


  


  


  
    /**
 * Definition
 * 
 * Logical Model: A pattern to be followed by resources that represent a specific
 * proposal, plan and/or order for some sort of action or service.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Definition.html}
 */
    export interface Definition {
      
      readonly resourceType: string;
      


      
      approvalDate?: date | undefined;
      _approvalDate?: Element | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      derivedFromCanonical?: Array<canonical> | undefined;
      _derivedFromCanonical?: Element[] | undefined;
      
      derivedFromUri?: Array<uri> | undefined;
      _derivedFromUri?: Element[] | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      effectivePeriod?: Period | undefined;
      _effectivePeriod?: Element | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      lastReviewDate?: date | undefined;
      _lastReviewDate?: Element | undefined;
      
      partOf?: Array<canonical> | undefined;
      _partOf?: Element[] | undefined;
      
      performerType?: CodeableConcept | undefined;
      _performerType?: Element | undefined;
      
      publisher?: Reference | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      replaces?: Array<canonical> | undefined;
      _replaces?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject[x]?: CodeableConcept | Reference | undefined;
      _subject[x]?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "DetectedIssue";
      


      
      author?: Reference | undefined;
      _author?: Element | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      detail?: string | undefined;
      _detail?: Element | undefined;
      
      evidence?: Array<BackboneElement> | undefined;
      _evidence?: Element[] | undefined;
      
      code?: Array<CodeableConcept> | undefined;
      _code?: Element[] | undefined;
      
      detail?: Array<Reference> | undefined;
      _detail?: Element[] | undefined;
      
      identified[x]?: dateTime | Period | undefined;
      _identified[x]?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      implicated?: Array<Reference> | undefined;
      _implicated?: Element[] | undefined;
      
      mitigation?: Array<BackboneElement> | undefined;
      _mitigation?: Element[] | undefined;
      
      action: CodeableConcept;
      _action?: Element | undefined;
      
      author?: Reference | undefined;
      _author?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      patient?: Reference | undefined;
      _patient?: Element | undefined;
      
      reference?: uri | undefined;
      _reference?: Element | undefined;
      
      severity?: code | undefined;
      _severity?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
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
      
      readonly resourceType: "Device";
      


      
      contact?: Array<ContactPoint> | undefined;
      _contact?: Element[] | undefined;
      
      definition?: Reference | undefined;
      _definition?: Element | undefined;
      
      deviceName?: Array<BackboneElement> | undefined;
      _deviceName?: Element[] | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      distinctIdentifier?: string | undefined;
      _distinctIdentifier?: Element | undefined;
      
      expirationDate?: dateTime | undefined;
      _expirationDate?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      location?: Reference | undefined;
      _location?: Element | undefined;
      
      lotNumber?: string | undefined;
      _lotNumber?: Element | undefined;
      
      manufactureDate?: dateTime | undefined;
      _manufactureDate?: Element | undefined;
      
      manufacturer?: string | undefined;
      _manufacturer?: Element | undefined;
      
      modelNumber?: string | undefined;
      _modelNumber?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      owner?: Reference | undefined;
      _owner?: Element | undefined;
      
      parent?: Reference | undefined;
      _parent?: Element | undefined;
      
      partNumber?: string | undefined;
      _partNumber?: Element | undefined;
      
      patient?: Reference | undefined;
      _patient?: Element | undefined;
      
      property?: Array<BackboneElement> | undefined;
      _property?: Element[] | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      valueCode?: Array<CodeableConcept> | undefined;
      _valueCode?: Element[] | undefined;
      
      valueQuantity?: Array<Quantity> | undefined;
      _valueQuantity?: Element[] | undefined;
      
      safety?: Array<CodeableConcept> | undefined;
      _safety?: Element[] | undefined;
      
      serialNumber?: string | undefined;
      _serialNumber?: Element | undefined;
      
      specialization?: Array<BackboneElement> | undefined;
      _specialization?: Element[] | undefined;
      
      systemType: CodeableConcept;
      _systemType?: Element | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
      status?: code | undefined;
      _status?: Element | undefined;
      
      statusReason?: Array<CodeableConcept> | undefined;
      _statusReason?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      udiCarrier?: Array<BackboneElement> | undefined;
      _udiCarrier?: Element[] | undefined;
      
      carrierAIDC?: base64Binary | undefined;
      _carrierAIDC?: Element | undefined;
      
      carrierHRF?: string | undefined;
      _carrierHRF?: Element | undefined;
      
      deviceIdentifier?: string | undefined;
      _deviceIdentifier?: Element | undefined;
      
      entryType?: code | undefined;
      _entryType?: Element | undefined;
      
      issuer?: uri | undefined;
      _issuer?: Element | undefined;
      
      jurisdiction?: uri | undefined;
      _jurisdiction?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      version?: Array<BackboneElement> | undefined;
      _version?: Element[] | undefined;
      
      component?: Identifier | undefined;
      _component?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      value: string;
      _value?: Element | undefined;
      
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
      
      readonly resourceType: "DeviceDefinition";
      


      
      capability?: Array<BackboneElement> | undefined;
      _capability?: Element[] | undefined;
      
      description?: Array<CodeableConcept> | undefined;
      _description?: Element[] | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      contact?: Array<ContactPoint> | undefined;
      _contact?: Element[] | undefined;
      
      deviceName?: Array<BackboneElement> | undefined;
      _deviceName?: Element[] | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      languageCode?: Array<CodeableConcept> | undefined;
      _languageCode?: Element[] | undefined;
      
      manufacturer[x]?: string | Reference | undefined;
      _manufacturer[x]?: Element | undefined;
      
      material?: Array<BackboneElement> | undefined;
      _material?: Element[] | undefined;
      
      allergenicIndicator?: boolean | undefined;
      _allergenicIndicator?: Element | undefined;
      
      alternate?: boolean | undefined;
      _alternate?: Element | undefined;
      
      substance: CodeableConcept;
      _substance?: Element | undefined;
      
      modelNumber?: string | undefined;
      _modelNumber?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      onlineInformation?: uri | undefined;
      _onlineInformation?: Element | undefined;
      
      owner?: Reference | undefined;
      _owner?: Element | undefined;
      
      parentDevice?: Reference | undefined;
      _parentDevice?: Element | undefined;
      
      physicalCharacteristics?: ProdCharacteristic | undefined;
      _physicalCharacteristics?: Element | undefined;
      
      property?: Array<BackboneElement> | undefined;
      _property?: Element[] | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      valueCode?: Array<CodeableConcept> | undefined;
      _valueCode?: Element[] | undefined;
      
      valueQuantity?: Array<Quantity> | undefined;
      _valueQuantity?: Element[] | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      safety?: Array<CodeableConcept> | undefined;
      _safety?: Element[] | undefined;
      
      shelfLifeStorage?: Array<ProductShelfLife> | undefined;
      _shelfLifeStorage?: Element[] | undefined;
      
      specialization?: Array<BackboneElement> | undefined;
      _specialization?: Element[] | undefined;
      
      systemType: string;
      _systemType?: Element | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      udiDeviceIdentifier?: Array<BackboneElement> | undefined;
      _udiDeviceIdentifier?: Element[] | undefined;
      
      deviceIdentifier: string;
      _deviceIdentifier?: Element | undefined;
      
      issuer: uri;
      _issuer?: Element | undefined;
      
      jurisdiction: uri;
      _jurisdiction?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      version?: Array<string> | undefined;
      _version?: Element[] | undefined;
      
    }

  


  
    /**
 * DeviceMetric
 * 
 * Describes a measurement, calculation or setting capability of a medical device.
 * 
 * @see {@link http://hl7.org/fhir/R4B/DeviceMetric.html}
 */
    export interface DeviceMetric extends DomainResource {
      
      readonly resourceType: "DeviceMetric";
      


      
      calibration?: Array<BackboneElement> | undefined;
      _calibration?: Element[] | undefined;
      
      state?: code | undefined;
      _state?: Element | undefined;
      
      time?: instant | undefined;
      _time?: Element | undefined;
      
      type?: code | undefined;
      _type?: Element | undefined;
      
      category: code;
      _category?: Element | undefined;
      
      color?: code | undefined;
      _color?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      measurementPeriod?: Timing | undefined;
      _measurementPeriod?: Element | undefined;
      
      operationalStatus?: code | undefined;
      _operationalStatus?: Element | undefined;
      
      parent?: Reference | undefined;
      _parent?: Element | undefined;
      
      source?: Reference | undefined;
      _source?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      unit?: CodeableConcept | undefined;
      _unit?: Element | undefined;
      
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
      
      readonly resourceType: "DeviceRequest";
      


      
      authoredOn?: dateTime | undefined;
      _authoredOn?: Element | undefined;
      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      code[x]: Reference | CodeableConcept;
      _code[x]?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      groupIdentifier?: Identifier | undefined;
      _groupIdentifier?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      instantiatesCanonical?: Array<canonical> | undefined;
      _instantiatesCanonical?: Element[] | undefined;
      
      instantiatesUri?: Array<uri> | undefined;
      _instantiatesUri?: Element[] | undefined;
      
      insurance?: Array<Reference> | undefined;
      _insurance?: Element[] | undefined;
      
      intent: code;
      _intent?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      occurrence[x]?: dateTime | Period | Timing | undefined;
      _occurrence[x]?: Element | undefined;
      
      parameter?: Array<BackboneElement> | undefined;
      _parameter?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      value[x]?: CodeableConcept | Quantity | Range | boolean | undefined;
      _value[x]?: Element | undefined;
      
      performer?: Reference | undefined;
      _performer?: Element | undefined;
      
      performerType?: CodeableConcept | undefined;
      _performerType?: Element | undefined;
      
      priority?: code | undefined;
      _priority?: Element | undefined;
      
      priorRequest?: Array<Reference> | undefined;
      _priorRequest?: Element[] | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      relevantHistory?: Array<Reference> | undefined;
      _relevantHistory?: Element[] | undefined;
      
      requester?: Reference | undefined;
      _requester?: Element | undefined;
      
      status?: code | undefined;
      _status?: Element | undefined;
      
      subject: Reference;
      _subject?: Element | undefined;
      
      supportingInfo?: Array<Reference> | undefined;
      _supportingInfo?: Element[] | undefined;
      
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
      
      readonly resourceType: "DeviceUseStatement";
      


      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      bodySite?: CodeableConcept | undefined;
      _bodySite?: Element | undefined;
      
      derivedFrom?: Array<Reference> | undefined;
      _derivedFrom?: Element[] | undefined;
      
      device: Reference;
      _device?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      recordedOn?: dateTime | undefined;
      _recordedOn?: Element | undefined;
      
      source?: Reference | undefined;
      _source?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject: Reference;
      _subject?: Element | undefined;
      
      timing[x]?: Timing | Period | dateTime | undefined;
      _timing[x]?: Element | undefined;
      
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
      
      readonly resourceType: "DiagnosticReport";
      


      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      conclusion?: string | undefined;
      _conclusion?: Element | undefined;
      
      conclusionCode?: Array<CodeableConcept> | undefined;
      _conclusionCode?: Element[] | undefined;
      
      effective[x]?: dateTime | Period | undefined;
      _effective[x]?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      imagingStudy?: Array<Reference> | undefined;
      _imagingStudy?: Element[] | undefined;
      
      issued?: instant | undefined;
      _issued?: Element | undefined;
      
      media?: Array<BackboneElement> | undefined;
      _media?: Element[] | undefined;
      
      comment?: string | undefined;
      _comment?: Element | undefined;
      
      link: Reference;
      _link?: Element | undefined;
      
      performer?: Array<Reference> | undefined;
      _performer?: Element[] | undefined;
      
      presentedForm?: Array<Attachment> | undefined;
      _presentedForm?: Element[] | undefined;
      
      result?: Array<Reference> | undefined;
      _result?: Element[] | undefined;
      
      resultsInterpreter?: Array<Reference> | undefined;
      _resultsInterpreter?: Element[] | undefined;
      
      specimen?: Array<Reference> | undefined;
      _specimen?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject?: Reference | undefined;
      _subject?: Element | undefined;
      
    }

  


  


  


  


  


  


  


  
    /**
 * Distance
 * 
 * Base StructureDefinition for Distance Type: A length - a value with a unit that
 * is a physical distance.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Distance.html}
 */
    export interface Distance extends Quantity {
      
      readonly resourceType: string;
      


      
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
      
      readonly resourceType: "DocumentManifest";
      


      
      author?: Array<Reference> | undefined;
      _author?: Element[] | undefined;
      
      content: Array<Reference>;
      _content?: Element[] | undefined;
      
      created?: dateTime | undefined;
      _created?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      masterIdentifier?: Identifier | undefined;
      _masterIdentifier?: Element | undefined;
      
      recipient?: Array<Reference> | undefined;
      _recipient?: Element[] | undefined;
      
      related?: Array<BackboneElement> | undefined;
      _related?: Element[] | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      ref?: Reference | undefined;
      _ref?: Element | undefined;
      
      source?: uri | undefined;
      _source?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject?: Reference | undefined;
      _subject?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
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
      
      readonly resourceType: "DocumentReference";
      


      
      authenticator?: Reference | undefined;
      _authenticator?: Element | undefined;
      
      author?: Array<Reference> | undefined;
      _author?: Element[] | undefined;
      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      content: Array<BackboneElement>;
      _content?: Element[] | undefined;
      
      attachment: Attachment;
      _attachment?: Element | undefined;
      
      format?: Coding | undefined;
      _format?: Element | undefined;
      
      context?: BackboneElement | undefined;
      _context?: Element | undefined;
      
      encounter?: Array<Reference> | undefined;
      _encounter?: Element[] | undefined;
      
      event?: Array<CodeableConcept> | undefined;
      _event?: Element[] | undefined;
      
      facilityType?: CodeableConcept | undefined;
      _facilityType?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      practiceSetting?: CodeableConcept | undefined;
      _practiceSetting?: Element | undefined;
      
      related?: Array<Reference> | undefined;
      _related?: Element[] | undefined;
      
      sourcePatientInfo?: Reference | undefined;
      _sourcePatientInfo?: Element | undefined;
      
      custodian?: Reference | undefined;
      _custodian?: Element | undefined;
      
      date?: instant | undefined;
      _date?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      docStatus?: code | undefined;
      _docStatus?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      masterIdentifier?: Identifier | undefined;
      _masterIdentifier?: Element | undefined;
      
      relatesTo?: Array<BackboneElement> | undefined;
      _relatesTo?: Element[] | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      target: Reference;
      _target?: Element | undefined;
      
      securityLabel?: Array<CodeableConcept> | undefined;
      _securityLabel?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject?: Reference | undefined;
      _subject?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
    }

  


  


  


  
    /**
 * DomainResource
 * 
 * A resource that includes narrative, extensions, and contained resources.
 * 
 * @see {@link http://hl7.org/fhir/R4B/DomainResource.html}
 */
    export interface DomainResource extends Resource {
      
      readonly resourceType: string;
      


      
      contained?: Array<Resource> | undefined;
      _contained?: Element[] | undefined;
      
      extension?: Array<Extension> | undefined;
      _extension?: Element[] | undefined;
      
      modifierExtension?: Array<Extension> | undefined;
      _modifierExtension?: Element[] | undefined;
      
      text?: Narrative | undefined;
      _text?: Element | undefined;
      
    }

  


  


  
    /**
 * Dosage
 * 
 * Base StructureDefinition for Dosage Type: Indicates how the medication is/was
 * taken or should be taken by the patient.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Dosage.html}
 */
    export interface Dosage extends BackboneElement {
      
      readonly resourceType: string;
      


      
      additionalInstruction?: Array<CodeableConcept> | undefined;
      _additionalInstruction?: Element[] | undefined;
      
      asNeeded[x]?: boolean | CodeableConcept | undefined;
      _asNeeded[x]?: Element | undefined;
      
      doseAndRate?: Array<Element> | undefined;
      _doseAndRate?: Element[] | undefined;
      
      dose[x]?: Range | Quantity | undefined;
      _dose[x]?: Element | undefined;
      
      rate[x]?: Ratio | Range | Quantity | undefined;
      _rate[x]?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      maxDosePerAdministration?: Quantity | undefined;
      _maxDosePerAdministration?: Element | undefined;
      
      maxDosePerLifetime?: Quantity | undefined;
      _maxDosePerLifetime?: Element | undefined;
      
      maxDosePerPeriod?: Ratio | undefined;
      _maxDosePerPeriod?: Element | undefined;
      
      method?: CodeableConcept | undefined;
      _method?: Element | undefined;
      
      patientInstruction?: string | undefined;
      _patientInstruction?: Element | undefined;
      
      route?: CodeableConcept | undefined;
      _route?: Element | undefined;
      
      sequence?: integer | undefined;
      _sequence?: Element | undefined;
      
      site?: CodeableConcept | undefined;
      _site?: Element | undefined;
      
      text?: string | undefined;
      _text?: Element | undefined;
      
      timing?: Timing | undefined;
      _timing?: Element | undefined;
      
    }

  


  


  


  
    /**
 * Duration
 * 
 * Base StructureDefinition for Duration Type: A length of time.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Duration.html}
 */
    export interface Duration extends Quantity {
      
      readonly resourceType: string;
      


      
    }

  


  


  


  


  
    /**
 * Element
 * 
 * Base StructureDefinition for Element Type: Base definition for all elements in a
 * resource.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Element.html}
 */
    export interface Element {
      
      readonly resourceType: string;
      


      
      extension?: Array<Extension> | undefined;
      _extension?: Element[] | undefined;
      
      id?: http://hl7.org/fhirpath/System.String | undefined;
      _id?: Element | undefined;
      
    }

  


  
    /**
 * ElementDefinition
 * 
 * Base StructureDefinition for ElementDefinition Type: Captures constraints on
 * each element within the resource, profile, or extension.
 * 
 * @see {@link http://hl7.org/fhir/R4B/ElementDefinition.html}
 */
    export interface ElementDefinition extends BackboneElement {
      
      readonly resourceType: string;
      


      
      alias?: Array<string> | undefined;
      _alias?: Element[] | undefined;
      
      base?: Element | undefined;
      _base?: Element | undefined;
      
      max: string;
      _max?: Element | undefined;
      
      min: unsignedInt;
      _min?: Element | undefined;
      
      path: string;
      _path?: Element | undefined;
      
      binding?: Element | undefined;
      _binding?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      strength: code;
      _strength?: Element | undefined;
      
      valueSet?: canonical | undefined;
      _valueSet?: Element | undefined;
      
      code?: Array<Coding> | undefined;
      _code?: Element[] | undefined;
      
      comment?: markdown | undefined;
      _comment?: Element | undefined;
      
      condition?: Array<id> | undefined;
      _condition?: Element[] | undefined;
      
      constraint?: Array<Element> | undefined;
      _constraint?: Element[] | undefined;
      
      expression?: string | undefined;
      _expression?: Element | undefined;
      
      human: string;
      _human?: Element | undefined;
      
      key: id;
      _key?: Element | undefined;
      
      requirements?: string | undefined;
      _requirements?: Element | undefined;
      
      severity: code;
      _severity?: Element | undefined;
      
      source?: canonical | undefined;
      _source?: Element | undefined;
      
      xpath?: string | undefined;
      _xpath?: Element | undefined;
      
      contentReference?: uri | undefined;
      _contentReference?: Element | undefined;
      
      defaultValue[x]?: base64Binary | boolean | canonical | code | date | dateTime | decimal | id | instant | integer | markdown | oid | positiveInt | string | time | unsignedInt | uri | url | uuid | Address | Age | Annotation | Attachment | CodeableConcept | CodeableReference | Coding | ContactPoint | Count | Distance | Duration | HumanName | Identifier | Money | Period | Quantity | Range | Ratio | RatioRange | Reference | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage | undefined;
      _defaultValue[x]?: Element | undefined;
      
      definition?: markdown | undefined;
      _definition?: Element | undefined;
      
      example?: Array<Element> | undefined;
      _example?: Element[] | undefined;
      
      label: string;
      _label?: Element | undefined;
      
      value[x]: base64Binary | boolean | canonical | code | date | dateTime | decimal | id | instant | integer | markdown | oid | positiveInt | string | time | unsignedInt | uri | url | uuid | Address | Age | Annotation | Attachment | CodeableConcept | CodeableReference | Coding | ContactPoint | Count | Distance | Duration | HumanName | Identifier | Money | Period | Quantity | Range | Ratio | RatioRange | Reference | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage;
      _value[x]?: Element | undefined;
      
      fixed[x]?: base64Binary | boolean | canonical | code | date | dateTime | decimal | id | instant | integer | markdown | oid | positiveInt | string | time | unsignedInt | uri | url | uuid | Address | Age | Annotation | Attachment | CodeableConcept | CodeableReference | Coding | ContactPoint | Count | Distance | Duration | HumanName | Identifier | Money | Period | Quantity | Range | Ratio | RatioRange | Reference | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage | undefined;
      _fixed[x]?: Element | undefined;
      
      isModifier?: boolean | undefined;
      _isModifier?: Element | undefined;
      
      isModifierReason?: string | undefined;
      _isModifierReason?: Element | undefined;
      
      isSummary?: boolean | undefined;
      _isSummary?: Element | undefined;
      
      label?: string | undefined;
      _label?: Element | undefined;
      
      mapping?: Array<Element> | undefined;
      _mapping?: Element[] | undefined;
      
      comment?: string | undefined;
      _comment?: Element | undefined;
      
      identity: id;
      _identity?: Element | undefined;
      
      language?: code | undefined;
      _language?: Element | undefined;
      
      map: string;
      _map?: Element | undefined;
      
      max?: string | undefined;
      _max?: Element | undefined;
      
      maxLength?: integer | undefined;
      _maxLength?: Element | undefined;
      
      maxValue[x]?: date | dateTime | instant | time | decimal | integer | positiveInt | unsignedInt | Quantity | undefined;
      _maxValue[x]?: Element | undefined;
      
      meaningWhenMissing?: markdown | undefined;
      _meaningWhenMissing?: Element | undefined;
      
      min?: unsignedInt | undefined;
      _min?: Element | undefined;
      
      minValue[x]?: date | dateTime | instant | time | decimal | integer | positiveInt | unsignedInt | Quantity | undefined;
      _minValue[x]?: Element | undefined;
      
      mustSupport?: boolean | undefined;
      _mustSupport?: Element | undefined;
      
      orderMeaning?: string | undefined;
      _orderMeaning?: Element | undefined;
      
      path: string;
      _path?: Element | undefined;
      
      pattern[x]?: base64Binary | boolean | canonical | code | date | dateTime | decimal | id | instant | integer | markdown | oid | positiveInt | string | time | unsignedInt | uri | url | uuid | Address | Age | Annotation | Attachment | CodeableConcept | CodeableReference | Coding | ContactPoint | Count | Distance | Duration | HumanName | Identifier | Money | Period | Quantity | Range | Ratio | RatioRange | Reference | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage | undefined;
      _pattern[x]?: Element | undefined;
      
      representation?: Array<code> | undefined;
      _representation?: Element[] | undefined;
      
      requirements?: markdown | undefined;
      _requirements?: Element | undefined;
      
      short?: string | undefined;
      _short?: Element | undefined;
      
      sliceIsConstraining?: boolean | undefined;
      _sliceIsConstraining?: Element | undefined;
      
      sliceName?: string | undefined;
      _sliceName?: Element | undefined;
      
      slicing?: Element | undefined;
      _slicing?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      discriminator?: Array<Element> | undefined;
      _discriminator?: Element[] | undefined;
      
      path: string;
      _path?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      ordered?: boolean | undefined;
      _ordered?: Element | undefined;
      
      rules: code;
      _rules?: Element | undefined;
      
      type?: Array<Element> | undefined;
      _type?: Element[] | undefined;
      
      aggregation?: Array<code> | undefined;
      _aggregation?: Element[] | undefined;
      
      code: uri;
      _code?: Element | undefined;
      
      profile?: Array<canonical> | undefined;
      _profile?: Element[] | undefined;
      
      targetProfile?: Array<canonical> | undefined;
      _targetProfile?: Element[] | undefined;
      
      versioning?: code | undefined;
      _versioning?: Element | undefined;
      
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
      
      readonly resourceType: "Encounter";
      


      
      account?: Array<Reference> | undefined;
      _account?: Element[] | undefined;
      
      appointment?: Array<Reference> | undefined;
      _appointment?: Element[] | undefined;
      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      class: Coding;
      _class?: Element | undefined;
      
      classHistory?: Array<BackboneElement> | undefined;
      _classHistory?: Element[] | undefined;
      
      class: Coding;
      _class?: Element | undefined;
      
      period: Period;
      _period?: Element | undefined;
      
      diagnosis?: Array<BackboneElement> | undefined;
      _diagnosis?: Element[] | undefined;
      
      condition: Reference;
      _condition?: Element | undefined;
      
      rank?: positiveInt | undefined;
      _rank?: Element | undefined;
      
      use?: CodeableConcept | undefined;
      _use?: Element | undefined;
      
      episodeOfCare?: Array<Reference> | undefined;
      _episodeOfCare?: Element[] | undefined;
      
      hospitalization?: BackboneElement | undefined;
      _hospitalization?: Element | undefined;
      
      admitSource?: CodeableConcept | undefined;
      _admitSource?: Element | undefined;
      
      destination?: Reference | undefined;
      _destination?: Element | undefined;
      
      dietPreference?: Array<CodeableConcept> | undefined;
      _dietPreference?: Element[] | undefined;
      
      dischargeDisposition?: CodeableConcept | undefined;
      _dischargeDisposition?: Element | undefined;
      
      origin?: Reference | undefined;
      _origin?: Element | undefined;
      
      preAdmissionIdentifier?: Identifier | undefined;
      _preAdmissionIdentifier?: Element | undefined;
      
      reAdmission?: CodeableConcept | undefined;
      _reAdmission?: Element | undefined;
      
      specialArrangement?: Array<CodeableConcept> | undefined;
      _specialArrangement?: Element[] | undefined;
      
      specialCourtesy?: Array<CodeableConcept> | undefined;
      _specialCourtesy?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      length?: Duration | undefined;
      _length?: Element | undefined;
      
      location?: Array<BackboneElement> | undefined;
      _location?: Element[] | undefined;
      
      location: Reference;
      _location?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      physicalType?: CodeableConcept | undefined;
      _physicalType?: Element | undefined;
      
      status?: code | undefined;
      _status?: Element | undefined;
      
      participant?: Array<BackboneElement> | undefined;
      _participant?: Element[] | undefined;
      
      individual?: Reference | undefined;
      _individual?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      type?: Array<CodeableConcept> | undefined;
      _type?: Element[] | undefined;
      
      partOf?: Reference | undefined;
      _partOf?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      priority?: CodeableConcept | undefined;
      _priority?: Element | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      serviceProvider?: Reference | undefined;
      _serviceProvider?: Element | undefined;
      
      serviceType?: CodeableConcept | undefined;
      _serviceType?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      statusHistory?: Array<BackboneElement> | undefined;
      _statusHistory?: Element[] | undefined;
      
      period: Period;
      _period?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject?: Reference | undefined;
      _subject?: Element | undefined;
      
      type?: Array<CodeableConcept> | undefined;
      _type?: Element[] | undefined;
      
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
      
      readonly resourceType: "Endpoint";
      


      
      address: url;
      _address?: Element | undefined;
      
      connectionType: Coding;
      _connectionType?: Element | undefined;
      
      contact?: Array<ContactPoint> | undefined;
      _contact?: Element[] | undefined;
      
      header?: Array<string> | undefined;
      _header?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      managingOrganization?: Reference | undefined;
      _managingOrganization?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      payloadMimeType?: Array<code> | undefined;
      _payloadMimeType?: Element[] | undefined;
      
      payloadType: Array<CodeableConcept>;
      _payloadType?: Element[] | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
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
      
      readonly resourceType: "EnrollmentRequest";
      


      
      candidate?: Reference | undefined;
      _candidate?: Element | undefined;
      
      coverage?: Reference | undefined;
      _coverage?: Element | undefined;
      
      created?: dateTime | undefined;
      _created?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      insurer?: Reference | undefined;
      _insurer?: Element | undefined;
      
      provider?: Reference | undefined;
      _provider?: Element | undefined;
      
      status?: code | undefined;
      _status?: Element | undefined;
      
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
      
      readonly resourceType: "EnrollmentResponse";
      


      
      created?: dateTime | undefined;
      _created?: Element | undefined;
      
      disposition?: string | undefined;
      _disposition?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      organization?: Reference | undefined;
      _organization?: Element | undefined;
      
      outcome?: code | undefined;
      _outcome?: Element | undefined;
      
      request?: Reference | undefined;
      _request?: Element | undefined;
      
      requestProvider?: Reference | undefined;
      _requestProvider?: Element | undefined;
      
      status?: code | undefined;
      _status?: Element | undefined;
      
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
      
      readonly resourceType: "EpisodeOfCare";
      


      
      account?: Array<Reference> | undefined;
      _account?: Element[] | undefined;
      
      careManager?: Reference | undefined;
      _careManager?: Element | undefined;
      
      diagnosis?: Array<BackboneElement> | undefined;
      _diagnosis?: Element[] | undefined;
      
      condition: Reference;
      _condition?: Element | undefined;
      
      rank?: positiveInt | undefined;
      _rank?: Element | undefined;
      
      role?: CodeableConcept | undefined;
      _role?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      managingOrganization?: Reference | undefined;
      _managingOrganization?: Element | undefined;
      
      patient: Reference;
      _patient?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      referralRequest?: Array<Reference> | undefined;
      _referralRequest?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      statusHistory?: Array<BackboneElement> | undefined;
      _statusHistory?: Element[] | undefined;
      
      period: Period;
      _period?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      team?: Array<Reference> | undefined;
      _team?: Element[] | undefined;
      
      type?: Array<CodeableConcept> | undefined;
      _type?: Element[] | undefined;
      
    }

  


  


  
    /**
 * Event
 * 
 * Logical Model: A pattern to be followed by resources that represent the
 * performance of some activity, possibly in accordance with a request or service
 * definition.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Event.html}
 */
    export interface Event {
      
      readonly resourceType: string;
      


      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      instantiatesCanonical?: Array<canonical> | undefined;
      _instantiatesCanonical?: Element[] | undefined;
      
      instantiatesUri?: Array<uri> | undefined;
      _instantiatesUri?: Element[] | undefined;
      
      location?: Reference | undefined;
      _location?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      occurrence[x]?: dateTime | Period | Timing | undefined;
      _occurrence[x]?: Element | undefined;
      
      partOf?: Array<Reference> | undefined;
      _partOf?: Element[] | undefined;
      
      performer?: Array<Element> | undefined;
      _performer?: Element[] | undefined;
      
      actor: Reference;
      _actor?: Element | undefined;
      
      function?: CodeableConcept | undefined;
      _function?: Element | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      recorded?: dateTime | undefined;
      _recorded?: Element | undefined;
      
      reported[x]?: boolean | Reference | undefined;
      _reported[x]?: Element | undefined;
      
      researchStudy?: Array<Reference> | undefined;
      _researchStudy?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      statusReason?: CodeableConcept | undefined;
      _statusReason?: Element | undefined;
      
      subject: Reference;
      _subject?: Element | undefined;
      
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
      
      readonly resourceType: "EventDefinition";
      


      
      approvalDate?: date | undefined;
      _approvalDate?: Element | undefined;
      
      author?: Array<ContactDetail> | undefined;
      _author?: Element[] | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      editor?: Array<ContactDetail> | undefined;
      _editor?: Element[] | undefined;
      
      effectivePeriod?: Period | undefined;
      _effectivePeriod?: Element | undefined;
      
      endorser?: Array<ContactDetail> | undefined;
      _endorser?: Element[] | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      lastReviewDate?: date | undefined;
      _lastReviewDate?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      relatedArtifact?: Array<RelatedArtifact> | undefined;
      _relatedArtifact?: Element[] | undefined;
      
      reviewer?: Array<ContactDetail> | undefined;
      _reviewer?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject[x]?: CodeableConcept | Reference | undefined;
      _subject[x]?: Element | undefined;
      
      subtitle?: string | undefined;
      _subtitle?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      topic?: Array<CodeableConcept> | undefined;
      _topic?: Element[] | undefined;
      
      trigger: Array<TriggerDefinition>;
      _trigger?: Element[] | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      usage?: string | undefined;
      _usage?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "Evidence";
      


      
      approvalDate?: date | undefined;
      _approvalDate?: Element | undefined;
      
      assertion?: markdown | undefined;
      _assertion?: Element | undefined;
      
      author?: Array<ContactDetail> | undefined;
      _author?: Element[] | undefined;
      
      certainty?: Array<BackboneElement> | undefined;
      _certainty?: Element[] | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      rater?: string | undefined;
      _rater?: Element | undefined;
      
      rating?: CodeableConcept | undefined;
      _rating?: Element | undefined;
      
      subcomponent?: Array<undefined> | undefined;
      _subcomponent?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      citeAs[x]?: Reference | markdown | undefined;
      _citeAs[x]?: Element | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      editor?: Array<ContactDetail> | undefined;
      _editor?: Element[] | undefined;
      
      endorser?: Array<ContactDetail> | undefined;
      _endorser?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      lastReviewDate?: date | undefined;
      _lastReviewDate?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      relatedArtifact?: Array<RelatedArtifact> | undefined;
      _relatedArtifact?: Element[] | undefined;
      
      reviewer?: Array<ContactDetail> | undefined;
      _reviewer?: Element[] | undefined;
      
      statistic?: Array<BackboneElement> | undefined;
      _statistic?: Element[] | undefined;
      
      attributeEstimate?: Array<BackboneElement> | undefined;
      _attributeEstimate?: Element[] | undefined;
      
      attributeEstimate?: Array<undefined> | undefined;
      _attributeEstimate?: Element[] | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      level?: decimal | undefined;
      _level?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      range?: Range | undefined;
      _range?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      category?: CodeableConcept | undefined;
      _category?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      modelCharacteristic?: Array<BackboneElement> | undefined;
      _modelCharacteristic?: Element[] | undefined;
      
      attributeEstimate?: Array<undefined> | undefined;
      _attributeEstimate?: Element[] | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      value?: Quantity | undefined;
      _value?: Element | undefined;
      
      variable?: Array<BackboneElement> | undefined;
      _variable?: Element[] | undefined;
      
      handling?: code | undefined;
      _handling?: Element | undefined;
      
      valueCategory?: Array<CodeableConcept> | undefined;
      _valueCategory?: Element[] | undefined;
      
      valueQuantity?: Array<Quantity> | undefined;
      _valueQuantity?: Element[] | undefined;
      
      valueRange?: Array<Range> | undefined;
      _valueRange?: Element[] | undefined;
      
      variableDefinition: Reference;
      _variableDefinition?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      numberAffected?: unsignedInt | undefined;
      _numberAffected?: Element | undefined;
      
      numberOfEvents?: unsignedInt | undefined;
      _numberOfEvents?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      sampleSize?: BackboneElement | undefined;
      _sampleSize?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      knownDataCount?: unsignedInt | undefined;
      _knownDataCount?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      numberOfParticipants?: unsignedInt | undefined;
      _numberOfParticipants?: Element | undefined;
      
      numberOfStudies?: unsignedInt | undefined;
      _numberOfStudies?: Element | undefined;
      
      statisticType?: CodeableConcept | undefined;
      _statisticType?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      studyType?: CodeableConcept | undefined;
      _studyType?: Element | undefined;
      
      synthesisType?: CodeableConcept | undefined;
      _synthesisType?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      variableDefinition: Array<BackboneElement>;
      _variableDefinition?: Element[] | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      directnessMatch?: CodeableConcept | undefined;
      _directnessMatch?: Element | undefined;
      
      intended?: Reference | undefined;
      _intended?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      observed?: Reference | undefined;
      _observed?: Element | undefined;
      
      variableRole: CodeableConcept;
      _variableRole?: Element | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "EvidenceReport";
      


      
      author?: Array<ContactDetail> | undefined;
      _author?: Element[] | undefined;
      
      citeAs[x]?: Reference | markdown | undefined;
      _citeAs[x]?: Element | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      editor?: Array<ContactDetail> | undefined;
      _editor?: Element[] | undefined;
      
      endorser?: Array<ContactDetail> | undefined;
      _endorser?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      relatedArtifact?: Array<RelatedArtifact> | undefined;
      _relatedArtifact?: Element[] | undefined;
      
      relatedIdentifier?: Array<Identifier> | undefined;
      _relatedIdentifier?: Element[] | undefined;
      
      relatesTo?: Array<BackboneElement> | undefined;
      _relatesTo?: Element[] | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      target[x]: Identifier | Reference;
      _target[x]?: Element | undefined;
      
      reviewer?: Array<ContactDetail> | undefined;
      _reviewer?: Element[] | undefined;
      
      section?: Array<BackboneElement> | undefined;
      _section?: Element[] | undefined;
      
      author?: Array<Reference> | undefined;
      _author?: Element[] | undefined;
      
      emptyReason?: CodeableConcept | undefined;
      _emptyReason?: Element | undefined;
      
      entryClassifier?: Array<CodeableConcept> | undefined;
      _entryClassifier?: Element[] | undefined;
      
      entryQuantity?: Array<Quantity> | undefined;
      _entryQuantity?: Element[] | undefined;
      
      entryReference?: Array<Reference> | undefined;
      _entryReference?: Element[] | undefined;
      
      focus?: CodeableConcept | undefined;
      _focus?: Element | undefined;
      
      focusReference?: Reference | undefined;
      _focusReference?: Element | undefined;
      
      mode?: code | undefined;
      _mode?: Element | undefined;
      
      orderedBy?: CodeableConcept | undefined;
      _orderedBy?: Element | undefined;
      
      section?: Array<undefined> | undefined;
      _section?: Element[] | undefined;
      
      text?: Narrative | undefined;
      _text?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject: BackboneElement;
      _subject?: Element | undefined;
      
      characteristic?: Array<BackboneElement> | undefined;
      _characteristic?: Element[] | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      exclude?: boolean | undefined;
      _exclude?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      value[x]: Reference | CodeableConcept | boolean | Quantity | Range;
      _value[x]?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
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
      
      readonly resourceType: "EvidenceVariable";
      


      
      actual?: boolean | undefined;
      _actual?: Element | undefined;
      
      author?: Array<ContactDetail> | undefined;
      _author?: Element[] | undefined;
      
      category?: Array<BackboneElement> | undefined;
      _category?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      value[x]?: CodeableConcept | Quantity | Range | undefined;
      _value[x]?: Element | undefined;
      
      characteristic?: Array<BackboneElement> | undefined;
      _characteristic?: Element[] | undefined;
      
      definition[x]: Reference | canonical | CodeableConcept | Expression;
      _definition[x]?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      device?: Reference | undefined;
      _device?: Element | undefined;
      
      exclude?: boolean | undefined;
      _exclude?: Element | undefined;
      
      groupMeasure?: code | undefined;
      _groupMeasure?: Element | undefined;
      
      method?: CodeableConcept | undefined;
      _method?: Element | undefined;
      
      timeFromStart?: BackboneElement | undefined;
      _timeFromStart?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      range?: Range | undefined;
      _range?: Element | undefined;
      
      characteristicCombination?: code | undefined;
      _characteristicCombination?: Element | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      editor?: Array<ContactDetail> | undefined;
      _editor?: Element[] | undefined;
      
      endorser?: Array<ContactDetail> | undefined;
      _endorser?: Element[] | undefined;
      
      handling?: code | undefined;
      _handling?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      relatedArtifact?: Array<RelatedArtifact> | undefined;
      _relatedArtifact?: Element[] | undefined;
      
      reviewer?: Array<ContactDetail> | undefined;
      _reviewer?: Element[] | undefined;
      
      shortTitle?: string | undefined;
      _shortTitle?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subtitle?: string | undefined;
      _subtitle?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
    }

  


  


  


  


  


  


  


  
    /**
 * ExampleScenario
 * 
 * Example of workflow instance.
 * 
 * @see {@link http://hl7.org/fhir/R4B/ExampleScenario.html}
 */
    export interface ExampleScenario extends DomainResource {
      
      readonly resourceType: "ExampleScenario";
      


      
      actor?: Array<BackboneElement> | undefined;
      _actor?: Element[] | undefined;
      
      actorId: string;
      _actorId?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      instance?: Array<BackboneElement> | undefined;
      _instance?: Element[] | undefined;
      
      containedInstance?: Array<BackboneElement> | undefined;
      _containedInstance?: Element[] | undefined;
      
      resourceId: string;
      _resourceId?: Element | undefined;
      
      versionId?: string | undefined;
      _versionId?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      resourceId: string;
      _resourceId?: Element | undefined;
      
      resourceType: code;
      _resourceType?: Element | undefined;
      
      version?: Array<BackboneElement> | undefined;
      _version?: Element[] | undefined;
      
      description: markdown;
      _description?: Element | undefined;
      
      versionId: string;
      _versionId?: Element | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      process?: Array<BackboneElement> | undefined;
      _process?: Element[] | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      postConditions?: markdown | undefined;
      _postConditions?: Element | undefined;
      
      preConditions?: markdown | undefined;
      _preConditions?: Element | undefined;
      
      step?: Array<BackboneElement> | undefined;
      _step?: Element[] | undefined;
      
      alternative?: Array<BackboneElement> | undefined;
      _alternative?: Element[] | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      step?: Array<undefined> | undefined;
      _step?: Element[] | undefined;
      
      title: string;
      _title?: Element | undefined;
      
      operation?: BackboneElement | undefined;
      _operation?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      initiator?: string | undefined;
      _initiator?: Element | undefined;
      
      initiatorActive?: boolean | undefined;
      _initiatorActive?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      number: string;
      _number?: Element | undefined;
      
      receiver?: string | undefined;
      _receiver?: Element | undefined;
      
      receiverActive?: boolean | undefined;
      _receiverActive?: Element | undefined;
      
      request?: undefined | undefined;
      _request?: Element | undefined;
      
      response?: undefined | undefined;
      _response?: Element | undefined;
      
      type?: string | undefined;
      _type?: Element | undefined;
      
      pause?: boolean | undefined;
      _pause?: Element | undefined;
      
      process?: Array<undefined> | undefined;
      _process?: Element[] | undefined;
      
      title: string;
      _title?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
      workflow?: Array<canonical> | undefined;
      _workflow?: Element[] | undefined;
      
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
      
      readonly resourceType: "ExplanationOfBenefit";
      


      
      accident?: BackboneElement | undefined;
      _accident?: Element | undefined;
      
      date?: date | undefined;
      _date?: Element | undefined;
      
      location[x]?: Address | Reference | undefined;
      _location[x]?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      addItem?: Array<BackboneElement> | undefined;
      _addItem?: Element[] | undefined;
      
      adjudication?: Array<undefined> | undefined;
      _adjudication?: Element[] | undefined;
      
      bodySite?: CodeableConcept | undefined;
      _bodySite?: Element | undefined;
      
      detail?: Array<BackboneElement> | undefined;
      _detail?: Element[] | undefined;
      
      adjudication?: Array<undefined> | undefined;
      _adjudication?: Element[] | undefined;
      
      factor?: decimal | undefined;
      _factor?: Element | undefined;
      
      modifier?: Array<CodeableConcept> | undefined;
      _modifier?: Element[] | undefined;
      
      net?: Money | undefined;
      _net?: Element | undefined;
      
      noteNumber?: Array<positiveInt> | undefined;
      _noteNumber?: Element[] | undefined;
      
      productOrService: CodeableConcept;
      _productOrService?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      subDetail?: Array<BackboneElement> | undefined;
      _subDetail?: Element[] | undefined;
      
      adjudication?: Array<undefined> | undefined;
      _adjudication?: Element[] | undefined;
      
      factor?: decimal | undefined;
      _factor?: Element | undefined;
      
      modifier?: Array<CodeableConcept> | undefined;
      _modifier?: Element[] | undefined;
      
      net?: Money | undefined;
      _net?: Element | undefined;
      
      noteNumber?: Array<positiveInt> | undefined;
      _noteNumber?: Element[] | undefined;
      
      productOrService: CodeableConcept;
      _productOrService?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      unitPrice?: Money | undefined;
      _unitPrice?: Element | undefined;
      
      unitPrice?: Money | undefined;
      _unitPrice?: Element | undefined;
      
      detailSequence?: Array<positiveInt> | undefined;
      _detailSequence?: Element[] | undefined;
      
      factor?: decimal | undefined;
      _factor?: Element | undefined;
      
      itemSequence?: Array<positiveInt> | undefined;
      _itemSequence?: Element[] | undefined;
      
      location[x]?: CodeableConcept | Address | Reference | undefined;
      _location[x]?: Element | undefined;
      
      modifier?: Array<CodeableConcept> | undefined;
      _modifier?: Element[] | undefined;
      
      net?: Money | undefined;
      _net?: Element | undefined;
      
      noteNumber?: Array<positiveInt> | undefined;
      _noteNumber?: Element[] | undefined;
      
      productOrService: CodeableConcept;
      _productOrService?: Element | undefined;
      
      programCode?: Array<CodeableConcept> | undefined;
      _programCode?: Element[] | undefined;
      
      provider?: Array<Reference> | undefined;
      _provider?: Element[] | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      serviced[x]?: date | Period | undefined;
      _serviced[x]?: Element | undefined;
      
      subDetailSequence?: Array<positiveInt> | undefined;
      _subDetailSequence?: Element[] | undefined;
      
      subSite?: Array<CodeableConcept> | undefined;
      _subSite?: Element[] | undefined;
      
      unitPrice?: Money | undefined;
      _unitPrice?: Element | undefined;
      
      adjudication?: Array<undefined> | undefined;
      _adjudication?: Element[] | undefined;
      
      benefitBalance?: Array<BackboneElement> | undefined;
      _benefitBalance?: Element[] | undefined;
      
      category: CodeableConcept;
      _category?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      excluded?: boolean | undefined;
      _excluded?: Element | undefined;
      
      financial?: Array<BackboneElement> | undefined;
      _financial?: Element[] | undefined;
      
      allowed[x]?: unsignedInt | string | Money | undefined;
      _allowed[x]?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      used[x]?: unsignedInt | Money | undefined;
      _used[x]?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      network?: CodeableConcept | undefined;
      _network?: Element | undefined;
      
      term?: CodeableConcept | undefined;
      _term?: Element | undefined;
      
      unit?: CodeableConcept | undefined;
      _unit?: Element | undefined;
      
      benefitPeriod?: Period | undefined;
      _benefitPeriod?: Element | undefined;
      
      billablePeriod?: Period | undefined;
      _billablePeriod?: Element | undefined;
      
      careTeam?: Array<BackboneElement> | undefined;
      _careTeam?: Element[] | undefined;
      
      provider: Reference;
      _provider?: Element | undefined;
      
      qualification?: CodeableConcept | undefined;
      _qualification?: Element | undefined;
      
      responsible?: boolean | undefined;
      _responsible?: Element | undefined;
      
      role?: CodeableConcept | undefined;
      _role?: Element | undefined;
      
      sequence: positiveInt;
      _sequence?: Element | undefined;
      
      claim?: Reference | undefined;
      _claim?: Element | undefined;
      
      claimResponse?: Reference | undefined;
      _claimResponse?: Element | undefined;
      
      created: dateTime;
      _created?: Element | undefined;
      
      diagnosis?: Array<BackboneElement> | undefined;
      _diagnosis?: Element[] | undefined;
      
      diagnosis[x]: CodeableConcept | Reference;
      _diagnosis[x]?: Element | undefined;
      
      onAdmission?: CodeableConcept | undefined;
      _onAdmission?: Element | undefined;
      
      packageCode?: CodeableConcept | undefined;
      _packageCode?: Element | undefined;
      
      sequence: positiveInt;
      _sequence?: Element | undefined;
      
      type?: Array<CodeableConcept> | undefined;
      _type?: Element[] | undefined;
      
      disposition?: string | undefined;
      _disposition?: Element | undefined;
      
      enterer?: Reference | undefined;
      _enterer?: Element | undefined;
      
      facility?: Reference | undefined;
      _facility?: Element | undefined;
      
      form?: Attachment | undefined;
      _form?: Element | undefined;
      
      formCode?: CodeableConcept | undefined;
      _formCode?: Element | undefined;
      
      fundsReserve?: CodeableConcept | undefined;
      _fundsReserve?: Element | undefined;
      
      fundsReserveRequested?: CodeableConcept | undefined;
      _fundsReserveRequested?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      insurance: Array<BackboneElement>;
      _insurance?: Element[] | undefined;
      
      coverage: Reference;
      _coverage?: Element | undefined;
      
      focal: boolean;
      _focal?: Element | undefined;
      
      preAuthRef?: Array<string> | undefined;
      _preAuthRef?: Element[] | undefined;
      
      insurer: Reference;
      _insurer?: Element | undefined;
      
      item?: Array<BackboneElement> | undefined;
      _item?: Element[] | undefined;
      
      adjudication?: Array<BackboneElement> | undefined;
      _adjudication?: Element[] | undefined;
      
      amount?: Money | undefined;
      _amount?: Element | undefined;
      
      category: CodeableConcept;
      _category?: Element | undefined;
      
      reason?: CodeableConcept | undefined;
      _reason?: Element | undefined;
      
      value?: decimal | undefined;
      _value?: Element | undefined;
      
      bodySite?: CodeableConcept | undefined;
      _bodySite?: Element | undefined;
      
      careTeamSequence?: Array<positiveInt> | undefined;
      _careTeamSequence?: Element[] | undefined;
      
      category?: CodeableConcept | undefined;
      _category?: Element | undefined;
      
      detail?: Array<BackboneElement> | undefined;
      _detail?: Element[] | undefined;
      
      adjudication?: Array<undefined> | undefined;
      _adjudication?: Element[] | undefined;
      
      category?: CodeableConcept | undefined;
      _category?: Element | undefined;
      
      factor?: decimal | undefined;
      _factor?: Element | undefined;
      
      modifier?: Array<CodeableConcept> | undefined;
      _modifier?: Element[] | undefined;
      
      net?: Money | undefined;
      _net?: Element | undefined;
      
      noteNumber?: Array<positiveInt> | undefined;
      _noteNumber?: Element[] | undefined;
      
      productOrService: CodeableConcept;
      _productOrService?: Element | undefined;
      
      programCode?: Array<CodeableConcept> | undefined;
      _programCode?: Element[] | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      revenue?: CodeableConcept | undefined;
      _revenue?: Element | undefined;
      
      sequence: positiveInt;
      _sequence?: Element | undefined;
      
      subDetail?: Array<BackboneElement> | undefined;
      _subDetail?: Element[] | undefined;
      
      adjudication?: Array<undefined> | undefined;
      _adjudication?: Element[] | undefined;
      
      category?: CodeableConcept | undefined;
      _category?: Element | undefined;
      
      factor?: decimal | undefined;
      _factor?: Element | undefined;
      
      modifier?: Array<CodeableConcept> | undefined;
      _modifier?: Element[] | undefined;
      
      net?: Money | undefined;
      _net?: Element | undefined;
      
      noteNumber?: Array<positiveInt> | undefined;
      _noteNumber?: Element[] | undefined;
      
      productOrService: CodeableConcept;
      _productOrService?: Element | undefined;
      
      programCode?: Array<CodeableConcept> | undefined;
      _programCode?: Element[] | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      revenue?: CodeableConcept | undefined;
      _revenue?: Element | undefined;
      
      sequence: positiveInt;
      _sequence?: Element | undefined;
      
      udi?: Array<Reference> | undefined;
      _udi?: Element[] | undefined;
      
      unitPrice?: Money | undefined;
      _unitPrice?: Element | undefined;
      
      udi?: Array<Reference> | undefined;
      _udi?: Element[] | undefined;
      
      unitPrice?: Money | undefined;
      _unitPrice?: Element | undefined;
      
      diagnosisSequence?: Array<positiveInt> | undefined;
      _diagnosisSequence?: Element[] | undefined;
      
      encounter?: Array<Reference> | undefined;
      _encounter?: Element[] | undefined;
      
      factor?: decimal | undefined;
      _factor?: Element | undefined;
      
      informationSequence?: Array<positiveInt> | undefined;
      _informationSequence?: Element[] | undefined;
      
      location[x]?: CodeableConcept | Address | Reference | undefined;
      _location[x]?: Element | undefined;
      
      modifier?: Array<CodeableConcept> | undefined;
      _modifier?: Element[] | undefined;
      
      net?: Money | undefined;
      _net?: Element | undefined;
      
      noteNumber?: Array<positiveInt> | undefined;
      _noteNumber?: Element[] | undefined;
      
      procedureSequence?: Array<positiveInt> | undefined;
      _procedureSequence?: Element[] | undefined;
      
      productOrService: CodeableConcept;
      _productOrService?: Element | undefined;
      
      programCode?: Array<CodeableConcept> | undefined;
      _programCode?: Element[] | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      revenue?: CodeableConcept | undefined;
      _revenue?: Element | undefined;
      
      sequence: positiveInt;
      _sequence?: Element | undefined;
      
      serviced[x]?: date | Period | undefined;
      _serviced[x]?: Element | undefined;
      
      subSite?: Array<CodeableConcept> | undefined;
      _subSite?: Element[] | undefined;
      
      udi?: Array<Reference> | undefined;
      _udi?: Element[] | undefined;
      
      unitPrice?: Money | undefined;
      _unitPrice?: Element | undefined;
      
      originalPrescription?: Reference | undefined;
      _originalPrescription?: Element | undefined;
      
      outcome: code;
      _outcome?: Element | undefined;
      
      patient: Reference;
      _patient?: Element | undefined;
      
      payee?: BackboneElement | undefined;
      _payee?: Element | undefined;
      
      party?: Reference | undefined;
      _party?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      payment?: BackboneElement | undefined;
      _payment?: Element | undefined;
      
      adjustment?: Money | undefined;
      _adjustment?: Element | undefined;
      
      adjustmentReason?: CodeableConcept | undefined;
      _adjustmentReason?: Element | undefined;
      
      amount?: Money | undefined;
      _amount?: Element | undefined;
      
      date?: date | undefined;
      _date?: Element | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      preAuthRef?: Array<string> | undefined;
      _preAuthRef?: Element[] | undefined;
      
      preAuthRefPeriod?: Array<Period> | undefined;
      _preAuthRefPeriod?: Element[] | undefined;
      
      precedence?: positiveInt | undefined;
      _precedence?: Element | undefined;
      
      prescription?: Reference | undefined;
      _prescription?: Element | undefined;
      
      priority?: CodeableConcept | undefined;
      _priority?: Element | undefined;
      
      procedure?: Array<BackboneElement> | undefined;
      _procedure?: Element[] | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      procedure[x]: CodeableConcept | Reference;
      _procedure[x]?: Element | undefined;
      
      sequence: positiveInt;
      _sequence?: Element | undefined;
      
      type?: Array<CodeableConcept> | undefined;
      _type?: Element[] | undefined;
      
      udi?: Array<Reference> | undefined;
      _udi?: Element[] | undefined;
      
      processNote?: Array<BackboneElement> | undefined;
      _processNote?: Element[] | undefined;
      
      language?: CodeableConcept | undefined;
      _language?: Element | undefined;
      
      number?: positiveInt | undefined;
      _number?: Element | undefined;
      
      text?: string | undefined;
      _text?: Element | undefined;
      
      type?: code | undefined;
      _type?: Element | undefined;
      
      provider: Reference;
      _provider?: Element | undefined;
      
      referral?: Reference | undefined;
      _referral?: Element | undefined;
      
      related?: Array<BackboneElement> | undefined;
      _related?: Element[] | undefined;
      
      claim?: Reference | undefined;
      _claim?: Element | undefined;
      
      reference?: Identifier | undefined;
      _reference?: Element | undefined;
      
      relationship?: CodeableConcept | undefined;
      _relationship?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subType?: CodeableConcept | undefined;
      _subType?: Element | undefined;
      
      supportingInfo?: Array<BackboneElement> | undefined;
      _supportingInfo?: Element[] | undefined;
      
      category: CodeableConcept;
      _category?: Element | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      reason?: Coding | undefined;
      _reason?: Element | undefined;
      
      sequence: positiveInt;
      _sequence?: Element | undefined;
      
      timing[x]?: date | Period | undefined;
      _timing[x]?: Element | undefined;
      
      value[x]?: boolean | string | Quantity | Attachment | Reference | undefined;
      _value[x]?: Element | undefined;
      
      total?: Array<BackboneElement> | undefined;
      _total?: Element[] | undefined;
      
      amount: Money;
      _amount?: Element | undefined;
      
      category: CodeableConcept;
      _category?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      use: code;
      _use?: Element | undefined;
      
    }

  


  


  


  


  


  


  


  
    /**
 * Expression
 * 
 * Base StructureDefinition for Expression Type: A expression that is evaluated in
 * a specified context and returns a value. The context of use of the expression
 * must specify the context in which the expression is evaluated, and how the
 * result of the expression is used.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Expression.html}
 */
    export interface Expression extends Element {
      
      readonly resourceType: string;
      


      
      description?: string | undefined;
      _description?: Element | undefined;
      
      expression?: string | undefined;
      _expression?: Element | undefined;
      
      language: code;
      _language?: Element | undefined;
      
      name?: id | undefined;
      _name?: Element | undefined;
      
      reference?: uri | undefined;
      _reference?: Element | undefined;
      
    }

  


  


  


  


  
    /**
 * Extension
 * 
 * Base StructureDefinition for Extension Type: Optional Extension Element - found
 * in all resources.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Extension.html}
 */
    export interface Extension extends Element {
      
      readonly resourceType: string;
      


      
      url: http://hl7.org/fhirpath/System.String;
      _url?: Element | undefined;
      
      value[x]?: base64Binary | boolean | canonical | code | date | dateTime | decimal | id | instant | integer | markdown | oid | positiveInt | string | time | unsignedInt | uri | url | uuid | Address | Age | Annotation | Attachment | CodeableConcept | CodeableReference | Coding | ContactPoint | Count | Distance | Duration | HumanName | Identifier | Money | Period | Quantity | Range | Ratio | RatioRange | Reference | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage | undefined;
      _value[x]?: Element | undefined;
      
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
      
      readonly resourceType: "FamilyMemberHistory";
      


      
      age[x]?: Age | Range | string | undefined;
      _age[x]?: Element | undefined;
      
      born[x]?: Period | date | string | undefined;
      _born[x]?: Element | undefined;
      
      condition?: Array<BackboneElement> | undefined;
      _condition?: Element[] | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      contributedToDeath?: boolean | undefined;
      _contributedToDeath?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      onset[x]?: Age | Range | Period | string | undefined;
      _onset[x]?: Element | undefined;
      
      outcome?: CodeableConcept | undefined;
      _outcome?: Element | undefined;
      
      dataAbsentReason?: CodeableConcept | undefined;
      _dataAbsentReason?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      deceased[x]?: boolean | Age | Range | date | string | undefined;
      _deceased[x]?: Element | undefined;
      
      estimatedAge?: boolean | undefined;
      _estimatedAge?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      instantiatesCanonical?: Array<canonical> | undefined;
      _instantiatesCanonical?: Element[] | undefined;
      
      instantiatesUri?: Array<uri> | undefined;
      _instantiatesUri?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      patient: Reference;
      _patient?: Element | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      relationship: CodeableConcept;
      _relationship?: Element | undefined;
      
      sex?: CodeableConcept | undefined;
      _sex?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
    }

  


  


  


  


  
    /**
 * FiveWs
 * 
 * Logical Model: Who What When Where Why - Common pattern for all resources that
 * deals with attribution.
 * 
 * @see {@link http://hl7.org/fhir/R4B/FiveWs.html}
 */
    export interface FiveWs {
      
      readonly resourceType: string;
      


      
      actor?: Array<Reference> | undefined;
      _actor?: Element[] | undefined;
      
      author?: Array<Reference> | undefined;
      _author?: Element[] | undefined;
      
      cause?: Array<Reference> | undefined;
      _cause?: Element[] | undefined;
      
      class?: Array<CodeableConcept> | undefined;
      _class?: Element[] | undefined;
      
      context?: Reference | undefined;
      _context?: Element | undefined;
      
      done[x]?: dateTime | Period | undefined;
      _done[x]?: Element | undefined;
      
      grade?: CodeableConcept | undefined;
      _grade?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      init?: dateTime | undefined;
      _init?: Element | undefined;
      
      planned?: Array<Timing> | undefined;
      _planned?: Element[] | undefined;
      
      recorded?: instant | undefined;
      _recorded?: Element | undefined;
      
      source?: Array<Reference> | undefined;
      _source?: Element[] | undefined;
      
      status?: code | undefined;
      _status?: Element | undefined;
      
      subject?: Array<Reference> | undefined;
      _subject?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
      what[x]?: CodeableConcept | Reference | undefined;
      _what[x]?: Element | undefined;
      
      where[x]?: Array<CodeableConcept | Reference> | undefined;
      _where[x]?: Element[] | undefined;
      
      who?: Array<Reference> | undefined;
      _who?: Element[] | undefined;
      
      why[x]?: Array<CodeableConcept | Reference> | undefined;
      _why[x]?: Element[] | undefined;
      
      witness?: Array<Reference> | undefined;
      _witness?: Element[] | undefined;
      
    }

  


  
    /**
 * Flag
 * 
 * Prospective warnings of potential issues when providing care to the patient.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Flag.html}
 */
    export interface Flag extends DomainResource {
      
      readonly resourceType: "Flag";
      


      
      author?: Reference | undefined;
      _author?: Element | undefined;
      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject: Reference;
      _subject?: Element | undefined;
      
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
      
      readonly resourceType: "Goal";
      


      
      achievementStatus?: CodeableConcept | undefined;
      _achievementStatus?: Element | undefined;
      
      addresses?: Array<Reference> | undefined;
      _addresses?: Element[] | undefined;
      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      description: CodeableConcept;
      _description?: Element | undefined;
      
      expressedBy?: Reference | undefined;
      _expressedBy?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      lifecycleStatus: code;
      _lifecycleStatus?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      outcomeCode?: Array<CodeableConcept> | undefined;
      _outcomeCode?: Element[] | undefined;
      
      outcomeReference?: Array<Reference> | undefined;
      _outcomeReference?: Element[] | undefined;
      
      priority?: CodeableConcept | undefined;
      _priority?: Element | undefined;
      
      start[x]?: date | CodeableConcept | undefined;
      _start[x]?: Element | undefined;
      
      statusDate?: date | undefined;
      _statusDate?: Element | undefined;
      
      statusReason?: string | undefined;
      _statusReason?: Element | undefined;
      
      subject: Reference;
      _subject?: Element | undefined;
      
      target?: Array<BackboneElement> | undefined;
      _target?: Element[] | undefined;
      
      detail[x]?: Quantity | Range | CodeableConcept | string | boolean | integer | Ratio | undefined;
      _detail[x]?: Element | undefined;
      
      due[x]?: date | Duration | undefined;
      _due[x]?: Element | undefined;
      
      measure?: CodeableConcept | undefined;
      _measure?: Element | undefined;
      
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
      
      readonly resourceType: "GraphDefinition";
      


      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      link?: Array<BackboneElement> | undefined;
      _link?: Element[] | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      max?: string | undefined;
      _max?: Element | undefined;
      
      min?: integer | undefined;
      _min?: Element | undefined;
      
      path?: string | undefined;
      _path?: Element | undefined;
      
      sliceName?: string | undefined;
      _sliceName?: Element | undefined;
      
      target?: Array<BackboneElement> | undefined;
      _target?: Element[] | undefined;
      
      compartment?: Array<BackboneElement> | undefined;
      _compartment?: Element[] | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      expression?: string | undefined;
      _expression?: Element | undefined;
      
      rule: code;
      _rule?: Element | undefined;
      
      use: code;
      _use?: Element | undefined;
      
      link?: Array<undefined> | undefined;
      _link?: Element[] | undefined;
      
      params?: string | undefined;
      _params?: Element | undefined;
      
      profile?: canonical | undefined;
      _profile?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      profile?: canonical | undefined;
      _profile?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      start: code;
      _start?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "Group";
      


      
      active?: boolean | undefined;
      _active?: Element | undefined;
      
      actual: boolean;
      _actual?: Element | undefined;
      
      characteristic?: Array<BackboneElement> | undefined;
      _characteristic?: Element[] | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      exclude: boolean;
      _exclude?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      value[x]: CodeableConcept | boolean | Quantity | Range | Reference;
      _value[x]?: Element | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      managingEntity?: Reference | undefined;
      _managingEntity?: Element | undefined;
      
      member?: Array<BackboneElement> | undefined;
      _member?: Element[] | undefined;
      
      entity: Reference;
      _entity?: Element | undefined;
      
      inactive?: boolean | undefined;
      _inactive?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      quantity?: unsignedInt | undefined;
      _quantity?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
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
      
      readonly resourceType: "GuidanceResponse";
      


      
      dataRequirement?: Array<DataRequirement> | undefined;
      _dataRequirement?: Element[] | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      evaluationMessage?: Array<Reference> | undefined;
      _evaluationMessage?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      module[x]: uri | canonical | CodeableConcept;
      _module[x]?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      occurrenceDateTime?: dateTime | undefined;
      _occurrenceDateTime?: Element | undefined;
      
      outputParameters?: Reference | undefined;
      _outputParameters?: Element | undefined;
      
      performer?: Reference | undefined;
      _performer?: Element | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      requestIdentifier?: Identifier | undefined;
      _requestIdentifier?: Element | undefined;
      
      result?: Reference | undefined;
      _result?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject?: Reference | undefined;
      _subject?: Element | undefined;
      
    }

  


  


  
    /**
 * HealthcareService
 * 
 * The details of a healthcare service available at a location.
 * 
 * @see {@link http://hl7.org/fhir/R4B/HealthcareService.html}
 */
    export interface HealthcareService extends DomainResource {
      
      readonly resourceType: "HealthcareService";
      


      
      active?: boolean | undefined;
      _active?: Element | undefined;
      
      appointmentRequired?: boolean | undefined;
      _appointmentRequired?: Element | undefined;
      
      availabilityExceptions?: string | undefined;
      _availabilityExceptions?: Element | undefined;
      
      availableTime?: Array<BackboneElement> | undefined;
      _availableTime?: Element[] | undefined;
      
      allDay?: boolean | undefined;
      _allDay?: Element | undefined;
      
      availableEndTime?: time | undefined;
      _availableEndTime?: Element | undefined;
      
      availableStartTime?: time | undefined;
      _availableStartTime?: Element | undefined;
      
      daysOfWeek?: Array<code> | undefined;
      _daysOfWeek?: Element[] | undefined;
      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      characteristic?: Array<CodeableConcept> | undefined;
      _characteristic?: Element[] | undefined;
      
      comment?: string | undefined;
      _comment?: Element | undefined;
      
      communication?: Array<CodeableConcept> | undefined;
      _communication?: Element[] | undefined;
      
      coverageArea?: Array<Reference> | undefined;
      _coverageArea?: Element[] | undefined;
      
      eligibility?: Array<BackboneElement> | undefined;
      _eligibility?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      comment?: markdown | undefined;
      _comment?: Element | undefined;
      
      endpoint?: Array<Reference> | undefined;
      _endpoint?: Element[] | undefined;
      
      extraDetails?: markdown | undefined;
      _extraDetails?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      location?: Array<Reference> | undefined;
      _location?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      notAvailable?: Array<BackboneElement> | undefined;
      _notAvailable?: Element[] | undefined;
      
      description: string;
      _description?: Element | undefined;
      
      during?: Period | undefined;
      _during?: Element | undefined;
      
      photo?: Attachment | undefined;
      _photo?: Element | undefined;
      
      program?: Array<CodeableConcept> | undefined;
      _program?: Element[] | undefined;
      
      providedBy?: Reference | undefined;
      _providedBy?: Element | undefined;
      
      referralMethod?: Array<CodeableConcept> | undefined;
      _referralMethod?: Element[] | undefined;
      
      serviceProvisionCode?: Array<CodeableConcept> | undefined;
      _serviceProvisionCode?: Element[] | undefined;
      
      specialty?: Array<CodeableConcept> | undefined;
      _specialty?: Element[] | undefined;
      
      telecom?: Array<ContactPoint> | undefined;
      _telecom?: Element[] | undefined;
      
      type?: Array<CodeableConcept> | undefined;
      _type?: Element[] | undefined;
      
    }

  


  


  


  


  


  


  


  
    /**
 * HumanName
 * 
 * Base StructureDefinition for HumanName Type: A human's name with the ability to
 * identify parts and usage.
 * 
 * @see {@link http://hl7.org/fhir/R4B/HumanName.html}
 */
    export interface HumanName extends Element {
      
      readonly resourceType: string;
      


      
      family?: string | undefined;
      _family?: Element | undefined;
      
      given?: Array<string> | undefined;
      _given?: Element[] | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      prefix?: Array<string> | undefined;
      _prefix?: Element[] | undefined;
      
      suffix?: Array<string> | undefined;
      _suffix?: Element[] | undefined;
      
      text?: string | undefined;
      _text?: Element | undefined;
      
      use?: code | undefined;
      _use?: Element | undefined;
      
    }

  


  


  


  
    /**
 * Identifier
 * 
 * Base StructureDefinition for Identifier Type: An identifier - identifies some
 * entity uniquely and unambiguously. Typically this is used for business
 * identifiers.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Identifier.html}
 */
    export interface Identifier extends Element {
      
      readonly resourceType: string;
      


      
      assigner?: Reference | undefined;
      _assigner?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      system?: uri | undefined;
      _system?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      use?: code | undefined;
      _use?: Element | undefined;
      
      value?: string | undefined;
      _value?: Element | undefined;
      
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
      
      readonly resourceType: "ImagingStudy";
      


      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      endpoint?: Array<Reference> | undefined;
      _endpoint?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      interpreter?: Array<Reference> | undefined;
      _interpreter?: Element[] | undefined;
      
      location?: Reference | undefined;
      _location?: Element | undefined;
      
      modality?: Array<Coding> | undefined;
      _modality?: Element[] | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      numberOfInstances?: unsignedInt | undefined;
      _numberOfInstances?: Element | undefined;
      
      numberOfSeries?: unsignedInt | undefined;
      _numberOfSeries?: Element | undefined;
      
      procedureCode?: Array<CodeableConcept> | undefined;
      _procedureCode?: Element[] | undefined;
      
      procedureReference?: Reference | undefined;
      _procedureReference?: Element | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      referrer?: Reference | undefined;
      _referrer?: Element | undefined;
      
      series?: Array<BackboneElement> | undefined;
      _series?: Element[] | undefined;
      
      bodySite?: Coding | undefined;
      _bodySite?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      endpoint?: Array<Reference> | undefined;
      _endpoint?: Element[] | undefined;
      
      instance?: Array<BackboneElement> | undefined;
      _instance?: Element[] | undefined;
      
      number?: unsignedInt | undefined;
      _number?: Element | undefined;
      
      sopClass: Coding;
      _sopClass?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      uid: id;
      _uid?: Element | undefined;
      
      laterality?: Coding | undefined;
      _laterality?: Element | undefined;
      
      modality: Coding;
      _modality?: Element | undefined;
      
      number?: unsignedInt | undefined;
      _number?: Element | undefined;
      
      numberOfInstances?: unsignedInt | undefined;
      _numberOfInstances?: Element | undefined;
      
      performer?: Array<BackboneElement> | undefined;
      _performer?: Element[] | undefined;
      
      actor: Reference;
      _actor?: Element | undefined;
      
      function?: CodeableConcept | undefined;
      _function?: Element | undefined;
      
      specimen?: Array<Reference> | undefined;
      _specimen?: Element[] | undefined;
      
      started?: dateTime | undefined;
      _started?: Element | undefined;
      
      uid: id;
      _uid?: Element | undefined;
      
      started?: dateTime | undefined;
      _started?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject: Reference;
      _subject?: Element | undefined;
      
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
      
      readonly resourceType: "Immunization";
      


      
      doseQuantity?: Quantity | undefined;
      _doseQuantity?: Element | undefined;
      
      education?: Array<BackboneElement> | undefined;
      _education?: Element[] | undefined;
      
      documentType?: string | undefined;
      _documentType?: Element | undefined;
      
      presentationDate?: dateTime | undefined;
      _presentationDate?: Element | undefined;
      
      publicationDate?: dateTime | undefined;
      _publicationDate?: Element | undefined;
      
      reference?: uri | undefined;
      _reference?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      expirationDate?: date | undefined;
      _expirationDate?: Element | undefined;
      
      fundingSource?: CodeableConcept | undefined;
      _fundingSource?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      isSubpotent?: boolean | undefined;
      _isSubpotent?: Element | undefined;
      
      location?: Reference | undefined;
      _location?: Element | undefined;
      
      lotNumber?: string | undefined;
      _lotNumber?: Element | undefined;
      
      manufacturer?: Reference | undefined;
      _manufacturer?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      occurrence[x]: dateTime | string;
      _occurrence[x]?: Element | undefined;
      
      patient: Reference;
      _patient?: Element | undefined;
      
      performer?: Array<BackboneElement> | undefined;
      _performer?: Element[] | undefined;
      
      actor: Reference;
      _actor?: Element | undefined;
      
      function?: CodeableConcept | undefined;
      _function?: Element | undefined;
      
      primarySource?: boolean | undefined;
      _primarySource?: Element | undefined;
      
      programEligibility?: Array<CodeableConcept> | undefined;
      _programEligibility?: Element[] | undefined;
      
      protocolApplied?: Array<BackboneElement> | undefined;
      _protocolApplied?: Element[] | undefined;
      
      authority?: Reference | undefined;
      _authority?: Element | undefined;
      
      doseNumber[x]: positiveInt | string;
      _doseNumber[x]?: Element | undefined;
      
      series?: string | undefined;
      _series?: Element | undefined;
      
      seriesDoses[x]?: positiveInt | string | undefined;
      _seriesDoses[x]?: Element | undefined;
      
      targetDisease?: Array<CodeableConcept> | undefined;
      _targetDisease?: Element[] | undefined;
      
      reaction?: Array<BackboneElement> | undefined;
      _reaction?: Element[] | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      detail?: Reference | undefined;
      _detail?: Element | undefined;
      
      reported?: boolean | undefined;
      _reported?: Element | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      recorded?: dateTime | undefined;
      _recorded?: Element | undefined;
      
      reportOrigin?: CodeableConcept | undefined;
      _reportOrigin?: Element | undefined;
      
      route?: CodeableConcept | undefined;
      _route?: Element | undefined;
      
      site?: CodeableConcept | undefined;
      _site?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      statusReason?: CodeableConcept | undefined;
      _statusReason?: Element | undefined;
      
      subpotentReason?: Array<CodeableConcept> | undefined;
      _subpotentReason?: Element[] | undefined;
      
      vaccineCode: CodeableConcept;
      _vaccineCode?: Element | undefined;
      
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
      
      readonly resourceType: "ImmunizationEvaluation";
      


      
      authority?: Reference | undefined;
      _authority?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      doseNumber[x]?: positiveInt | string | undefined;
      _doseNumber[x]?: Element | undefined;
      
      doseStatus: CodeableConcept;
      _doseStatus?: Element | undefined;
      
      doseStatusReason?: Array<CodeableConcept> | undefined;
      _doseStatusReason?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      immunizationEvent: Reference;
      _immunizationEvent?: Element | undefined;
      
      patient: Reference;
      _patient?: Element | undefined;
      
      series?: string | undefined;
      _series?: Element | undefined;
      
      seriesDoses[x]?: positiveInt | string | undefined;
      _seriesDoses[x]?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      targetDisease: CodeableConcept;
      _targetDisease?: Element | undefined;
      
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
      
      readonly resourceType: "ImmunizationRecommendation";
      


      
      authority?: Reference | undefined;
      _authority?: Element | undefined;
      
      date: dateTime;
      _date?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      patient: Reference;
      _patient?: Element | undefined;
      
      recommendation: Array<BackboneElement>;
      _recommendation?: Element[] | undefined;
      
      contraindicatedVaccineCode?: Array<CodeableConcept> | undefined;
      _contraindicatedVaccineCode?: Element[] | undefined;
      
      dateCriterion?: Array<BackboneElement> | undefined;
      _dateCriterion?: Element[] | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      value: dateTime;
      _value?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      doseNumber[x]?: positiveInt | string | undefined;
      _doseNumber[x]?: Element | undefined;
      
      forecastReason?: Array<CodeableConcept> | undefined;
      _forecastReason?: Element[] | undefined;
      
      forecastStatus: CodeableConcept;
      _forecastStatus?: Element | undefined;
      
      series?: string | undefined;
      _series?: Element | undefined;
      
      seriesDoses[x]?: positiveInt | string | undefined;
      _seriesDoses[x]?: Element | undefined;
      
      supportingImmunization?: Array<Reference> | undefined;
      _supportingImmunization?: Element[] | undefined;
      
      supportingPatientInformation?: Array<Reference> | undefined;
      _supportingPatientInformation?: Element[] | undefined;
      
      targetDisease?: CodeableConcept | undefined;
      _targetDisease?: Element | undefined;
      
      vaccineCode?: Array<CodeableConcept> | undefined;
      _vaccineCode?: Element[] | undefined;
      
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
      
      readonly resourceType: "ImplementationGuide";
      


      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      definition?: BackboneElement | undefined;
      _definition?: Element | undefined;
      
      grouping?: Array<BackboneElement> | undefined;
      _grouping?: Element[] | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      page?: BackboneElement | undefined;
      _page?: Element | undefined;
      
      generation: code;
      _generation?: Element | undefined;
      
      name[x]: url | Reference;
      _name[x]?: Element | undefined;
      
      page?: Array<undefined> | undefined;
      _page?: Element[] | undefined;
      
      title: string;
      _title?: Element | undefined;
      
      parameter?: Array<BackboneElement> | undefined;
      _parameter?: Element[] | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      value: string;
      _value?: Element | undefined;
      
      resource: Array<BackboneElement>;
      _resource?: Element[] | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      example[x]?: boolean | canonical | undefined;
      _example[x]?: Element | undefined;
      
      fhirVersion?: Array<code> | undefined;
      _fhirVersion?: Element[] | undefined;
      
      groupingId?: id | undefined;
      _groupingId?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      reference: Reference;
      _reference?: Element | undefined;
      
      template?: Array<BackboneElement> | undefined;
      _template?: Element[] | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      scope?: string | undefined;
      _scope?: Element | undefined;
      
      source: string;
      _source?: Element | undefined;
      
      dependsOn?: Array<BackboneElement> | undefined;
      _dependsOn?: Element[] | undefined;
      
      packageId?: id | undefined;
      _packageId?: Element | undefined;
      
      uri: canonical;
      _uri?: Element | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      fhirVersion: Array<code>;
      _fhirVersion?: Element[] | undefined;
      
      global?: Array<BackboneElement> | undefined;
      _global?: Element[] | undefined;
      
      profile: canonical;
      _profile?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      license?: code | undefined;
      _license?: Element | undefined;
      
      manifest?: BackboneElement | undefined;
      _manifest?: Element | undefined;
      
      image?: Array<string> | undefined;
      _image?: Element[] | undefined;
      
      other?: Array<string> | undefined;
      _other?: Element[] | undefined;
      
      page?: Array<BackboneElement> | undefined;
      _page?: Element[] | undefined;
      
      anchor?: Array<string> | undefined;
      _anchor?: Element[] | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      rendering?: url | undefined;
      _rendering?: Element | undefined;
      
      resource: Array<BackboneElement>;
      _resource?: Element[] | undefined;
      
      example[x]?: boolean | canonical | undefined;
      _example[x]?: Element | undefined;
      
      reference: Reference;
      _reference?: Element | undefined;
      
      relativePath?: url | undefined;
      _relativePath?: Element | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      packageId: id;
      _packageId?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      url: uri;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
    }

  


  


  


  
    /**
 * Ingredient
 * 
 * An ingredient of a manufactured item or pharmaceutical product.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Ingredient.html}
 */
    export interface Ingredient extends DomainResource {
      
      readonly resourceType: "Ingredient";
      


      
      allergenicIndicator?: boolean | undefined;
      _allergenicIndicator?: Element | undefined;
      
      for?: Array<Reference> | undefined;
      _for?: Element[] | undefined;
      
      function?: Array<CodeableConcept> | undefined;
      _function?: Element[] | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      manufacturer?: Array<BackboneElement> | undefined;
      _manufacturer?: Element[] | undefined;
      
      manufacturer: Reference;
      _manufacturer?: Element | undefined;
      
      role?: code | undefined;
      _role?: Element | undefined;
      
      role: CodeableConcept;
      _role?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      substance: BackboneElement;
      _substance?: Element | undefined;
      
      code: CodeableReference;
      _code?: Element | undefined;
      
      strength?: Array<BackboneElement> | undefined;
      _strength?: Element[] | undefined;
      
      concentration[x]?: Ratio | RatioRange | undefined;
      _concentration[x]?: Element | undefined;
      
      country?: Array<CodeableConcept> | undefined;
      _country?: Element[] | undefined;
      
      measurementPoint?: string | undefined;
      _measurementPoint?: Element | undefined;
      
      presentation[x]?: Ratio | RatioRange | undefined;
      _presentation[x]?: Element | undefined;
      
      referenceStrength?: Array<BackboneElement> | undefined;
      _referenceStrength?: Element[] | undefined;
      
      country?: Array<CodeableConcept> | undefined;
      _country?: Element[] | undefined;
      
      measurementPoint?: string | undefined;
      _measurementPoint?: Element | undefined;
      
      strength[x]: Ratio | RatioRange;
      _strength[x]?: Element | undefined;
      
      substance?: CodeableReference | undefined;
      _substance?: Element | undefined;
      
      textConcentration?: string | undefined;
      _textConcentration?: Element | undefined;
      
      textPresentation?: string | undefined;
      _textPresentation?: Element | undefined;
      
    }

  


  


  


  


  


  


  


  


  


  


  


  
    /**
 * InsurancePlan
 * 
 * Details of a Health Insurance product/plan provided by an organization.
 * 
 * @see {@link http://hl7.org/fhir/R4B/InsurancePlan.html}
 */
    export interface InsurancePlan extends DomainResource {
      
      readonly resourceType: "InsurancePlan";
      


      
      administeredBy?: Reference | undefined;
      _administeredBy?: Element | undefined;
      
      alias?: Array<string> | undefined;
      _alias?: Element[] | undefined;
      
      contact?: Array<BackboneElement> | undefined;
      _contact?: Element[] | undefined;
      
      address?: Address | undefined;
      _address?: Element | undefined;
      
      name?: HumanName | undefined;
      _name?: Element | undefined;
      
      purpose?: CodeableConcept | undefined;
      _purpose?: Element | undefined;
      
      telecom?: Array<ContactPoint> | undefined;
      _telecom?: Element[] | undefined;
      
      coverage?: Array<BackboneElement> | undefined;
      _coverage?: Element[] | undefined;
      
      benefit: Array<BackboneElement>;
      _benefit?: Element[] | undefined;
      
      limit?: Array<BackboneElement> | undefined;
      _limit?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      value?: Quantity | undefined;
      _value?: Element | undefined;
      
      requirement?: string | undefined;
      _requirement?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      network?: Array<Reference> | undefined;
      _network?: Element[] | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      coverageArea?: Array<Reference> | undefined;
      _coverageArea?: Element[] | undefined;
      
      endpoint?: Array<Reference> | undefined;
      _endpoint?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      network?: Array<Reference> | undefined;
      _network?: Element[] | undefined;
      
      ownedBy?: Reference | undefined;
      _ownedBy?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      plan?: Array<BackboneElement> | undefined;
      _plan?: Element[] | undefined;
      
      coverageArea?: Array<Reference> | undefined;
      _coverageArea?: Element[] | undefined;
      
      generalCost?: Array<BackboneElement> | undefined;
      _generalCost?: Element[] | undefined;
      
      comment?: string | undefined;
      _comment?: Element | undefined;
      
      cost?: Money | undefined;
      _cost?: Element | undefined;
      
      groupSize?: positiveInt | undefined;
      _groupSize?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      network?: Array<Reference> | undefined;
      _network?: Element[] | undefined;
      
      specificCost?: Array<BackboneElement> | undefined;
      _specificCost?: Element[] | undefined;
      
      benefit?: Array<BackboneElement> | undefined;
      _benefit?: Element[] | undefined;
      
      cost?: Array<BackboneElement> | undefined;
      _cost?: Element[] | undefined;
      
      applicability?: CodeableConcept | undefined;
      _applicability?: Element | undefined;
      
      qualifiers?: Array<CodeableConcept> | undefined;
      _qualifiers?: Element[] | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      value?: Quantity | undefined;
      _value?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      category: CodeableConcept;
      _category?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      status?: code | undefined;
      _status?: Element | undefined;
      
      type?: Array<CodeableConcept> | undefined;
      _type?: Element[] | undefined;
      
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
      
      readonly resourceType: "Invoice";
      


      
      account?: Reference | undefined;
      _account?: Element | undefined;
      
      cancelledReason?: string | undefined;
      _cancelledReason?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      issuer?: Reference | undefined;
      _issuer?: Element | undefined;
      
      lineItem?: Array<BackboneElement> | undefined;
      _lineItem?: Element[] | undefined;
      
      chargeItem[x]: Reference | CodeableConcept;
      _chargeItem[x]?: Element | undefined;
      
      priceComponent?: Array<BackboneElement> | undefined;
      _priceComponent?: Element[] | undefined;
      
      amount?: Money | undefined;
      _amount?: Element | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      factor?: decimal | undefined;
      _factor?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      sequence?: positiveInt | undefined;
      _sequence?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      participant?: Array<BackboneElement> | undefined;
      _participant?: Element[] | undefined;
      
      actor: Reference;
      _actor?: Element | undefined;
      
      role?: CodeableConcept | undefined;
      _role?: Element | undefined;
      
      paymentTerms?: markdown | undefined;
      _paymentTerms?: Element | undefined;
      
      recipient?: Reference | undefined;
      _recipient?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject?: Reference | undefined;
      _subject?: Element | undefined;
      
      totalGross?: Money | undefined;
      _totalGross?: Element | undefined;
      
      totalNet?: Money | undefined;
      _totalNet?: Element | undefined;
      
      totalPriceComponent?: Array<undefined> | undefined;
      _totalPriceComponent?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
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
      
      readonly resourceType: "Library";
      


      
      approvalDate?: date | undefined;
      _approvalDate?: Element | undefined;
      
      author?: Array<ContactDetail> | undefined;
      _author?: Element[] | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      content?: Array<Attachment> | undefined;
      _content?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      dataRequirement?: Array<DataRequirement> | undefined;
      _dataRequirement?: Element[] | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      editor?: Array<ContactDetail> | undefined;
      _editor?: Element[] | undefined;
      
      effectivePeriod?: Period | undefined;
      _effectivePeriod?: Element | undefined;
      
      endorser?: Array<ContactDetail> | undefined;
      _endorser?: Element[] | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      lastReviewDate?: date | undefined;
      _lastReviewDate?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      parameter?: Array<ParameterDefinition> | undefined;
      _parameter?: Element[] | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      relatedArtifact?: Array<RelatedArtifact> | undefined;
      _relatedArtifact?: Element[] | undefined;
      
      reviewer?: Array<ContactDetail> | undefined;
      _reviewer?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject[x]?: CodeableConcept | Reference | undefined;
      _subject[x]?: Element | undefined;
      
      subtitle?: string | undefined;
      _subtitle?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      topic?: Array<CodeableConcept> | undefined;
      _topic?: Element[] | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      usage?: string | undefined;
      _usage?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "Linkage";
      


      
      active?: boolean | undefined;
      _active?: Element | undefined;
      
      author?: Reference | undefined;
      _author?: Element | undefined;
      
      item: Array<BackboneElement>;
      _item?: Element[] | undefined;
      
      resource: Reference;
      _resource?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
    }

  


  
    /**
 * List
 * 
 * A list is a curated collection of resources.
 * 
 * @see {@link http://hl7.org/fhir/R4B/List.html}
 */
    export interface List extends DomainResource {
      
      readonly resourceType: "List";
      


      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      emptyReason?: CodeableConcept | undefined;
      _emptyReason?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      entry?: Array<BackboneElement> | undefined;
      _entry?: Element[] | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      deleted?: boolean | undefined;
      _deleted?: Element | undefined;
      
      flag?: CodeableConcept | undefined;
      _flag?: Element | undefined;
      
      item: Reference;
      _item?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      mode: code;
      _mode?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      orderedBy?: CodeableConcept | undefined;
      _orderedBy?: Element | undefined;
      
      source?: Reference | undefined;
      _source?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject?: Reference | undefined;
      _subject?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
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
      
      readonly resourceType: "Location";
      


      
      address?: Address | undefined;
      _address?: Element | undefined;
      
      alias?: Array<string> | undefined;
      _alias?: Element[] | undefined;
      
      availabilityExceptions?: string | undefined;
      _availabilityExceptions?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      endpoint?: Array<Reference> | undefined;
      _endpoint?: Element[] | undefined;
      
      hoursOfOperation?: Array<BackboneElement> | undefined;
      _hoursOfOperation?: Element[] | undefined;
      
      allDay?: boolean | undefined;
      _allDay?: Element | undefined;
      
      closingTime?: time | undefined;
      _closingTime?: Element | undefined;
      
      daysOfWeek?: Array<code> | undefined;
      _daysOfWeek?: Element[] | undefined;
      
      openingTime?: time | undefined;
      _openingTime?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      managingOrganization?: Reference | undefined;
      _managingOrganization?: Element | undefined;
      
      mode?: code | undefined;
      _mode?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      operationalStatus?: Coding | undefined;
      _operationalStatus?: Element | undefined;
      
      partOf?: Reference | undefined;
      _partOf?: Element | undefined;
      
      physicalType?: CodeableConcept | undefined;
      _physicalType?: Element | undefined;
      
      position?: BackboneElement | undefined;
      _position?: Element | undefined;
      
      altitude?: decimal | undefined;
      _altitude?: Element | undefined;
      
      latitude: decimal;
      _latitude?: Element | undefined;
      
      longitude: decimal;
      _longitude?: Element | undefined;
      
      status?: code | undefined;
      _status?: Element | undefined;
      
      telecom?: Array<ContactPoint> | undefined;
      _telecom?: Element[] | undefined;
      
      type?: Array<CodeableConcept> | undefined;
      _type?: Element[] | undefined;
      
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
      
      readonly resourceType: "ManufacturedItemDefinition";
      


      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      ingredient?: Array<CodeableConcept> | undefined;
      _ingredient?: Element[] | undefined;
      
      manufacturedDoseForm: CodeableConcept;
      _manufacturedDoseForm?: Element | undefined;
      
      manufacturer?: Array<Reference> | undefined;
      _manufacturer?: Element[] | undefined;
      
      property?: Array<BackboneElement> | undefined;
      _property?: Element[] | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      value[x]?: CodeableConcept | Quantity | date | boolean | Attachment | undefined;
      _value[x]?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      unitOfPresentation?: CodeableConcept | undefined;
      _unitOfPresentation?: Element | undefined;
      
    }

  


  


  


  


  


  
    /**
 * MarketingStatus
 * 
 * Base StructureDefinition for MarketingStatus Type: The marketing status
 * describes the date when a medicinal product is actually put on the market or the
 * date as of which it is no longer available.
 * 
 * @see {@link http://hl7.org/fhir/R4B/MarketingStatus.html}
 */
    export interface MarketingStatus extends BackboneElement {
      
      readonly resourceType: string;
      


      
      country?: CodeableConcept | undefined;
      _country?: Element | undefined;
      
      dateRange?: Period | undefined;
      _dateRange?: Element | undefined;
      
      jurisdiction?: CodeableConcept | undefined;
      _jurisdiction?: Element | undefined;
      
      restoreDate?: dateTime | undefined;
      _restoreDate?: Element | undefined;
      
      status: CodeableConcept;
      _status?: Element | undefined;
      
    }

  


  


  


  


  


  


  


  
    /**
 * Measure
 * 
 * The Measure resource provides the definition of a quality measure.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Measure.html}
 */
    export interface Measure extends DomainResource {
      
      readonly resourceType: "Measure";
      


      
      approvalDate?: date | undefined;
      _approvalDate?: Element | undefined;
      
      author?: Array<ContactDetail> | undefined;
      _author?: Element[] | undefined;
      
      clinicalRecommendationStatement?: markdown | undefined;
      _clinicalRecommendationStatement?: Element | undefined;
      
      compositeScoring?: CodeableConcept | undefined;
      _compositeScoring?: Element | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      definition?: Array<markdown> | undefined;
      _definition?: Element[] | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      disclaimer?: markdown | undefined;
      _disclaimer?: Element | undefined;
      
      editor?: Array<ContactDetail> | undefined;
      _editor?: Element[] | undefined;
      
      effectivePeriod?: Period | undefined;
      _effectivePeriod?: Element | undefined;
      
      endorser?: Array<ContactDetail> | undefined;
      _endorser?: Element[] | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      group?: Array<BackboneElement> | undefined;
      _group?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      population?: Array<BackboneElement> | undefined;
      _population?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      criteria: Expression;
      _criteria?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      stratifier?: Array<BackboneElement> | undefined;
      _stratifier?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      component?: Array<BackboneElement> | undefined;
      _component?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      criteria: Expression;
      _criteria?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      criteria?: Expression | undefined;
      _criteria?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      guidance?: markdown | undefined;
      _guidance?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      improvementNotation?: CodeableConcept | undefined;
      _improvementNotation?: Element | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      lastReviewDate?: date | undefined;
      _lastReviewDate?: Element | undefined;
      
      library?: Array<canonical> | undefined;
      _library?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      rateAggregation?: string | undefined;
      _rateAggregation?: Element | undefined;
      
      rationale?: markdown | undefined;
      _rationale?: Element | undefined;
      
      relatedArtifact?: Array<RelatedArtifact> | undefined;
      _relatedArtifact?: Element[] | undefined;
      
      reviewer?: Array<ContactDetail> | undefined;
      _reviewer?: Element[] | undefined;
      
      riskAdjustment?: string | undefined;
      _riskAdjustment?: Element | undefined;
      
      scoring?: CodeableConcept | undefined;
      _scoring?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject[x]?: CodeableConcept | Reference | undefined;
      _subject[x]?: Element | undefined;
      
      subtitle?: string | undefined;
      _subtitle?: Element | undefined;
      
      supplementalData?: Array<BackboneElement> | undefined;
      _supplementalData?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      criteria: Expression;
      _criteria?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      usage?: Array<CodeableConcept> | undefined;
      _usage?: Element[] | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      topic?: Array<CodeableConcept> | undefined;
      _topic?: Element[] | undefined;
      
      type?: Array<CodeableConcept> | undefined;
      _type?: Element[] | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      usage?: string | undefined;
      _usage?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "MeasureReport";
      


      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      evaluatedResource?: Array<Reference> | undefined;
      _evaluatedResource?: Element[] | undefined;
      
      group?: Array<BackboneElement> | undefined;
      _group?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      measureScore?: Quantity | undefined;
      _measureScore?: Element | undefined;
      
      population?: Array<BackboneElement> | undefined;
      _population?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      count?: integer | undefined;
      _count?: Element | undefined;
      
      subjectResults?: Reference | undefined;
      _subjectResults?: Element | undefined;
      
      stratifier?: Array<BackboneElement> | undefined;
      _stratifier?: Element[] | undefined;
      
      code?: Array<CodeableConcept> | undefined;
      _code?: Element[] | undefined;
      
      stratum?: Array<BackboneElement> | undefined;
      _stratum?: Element[] | undefined;
      
      component?: Array<BackboneElement> | undefined;
      _component?: Element[] | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      value: CodeableConcept;
      _value?: Element | undefined;
      
      measureScore?: Quantity | undefined;
      _measureScore?: Element | undefined;
      
      population?: Array<BackboneElement> | undefined;
      _population?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      count?: integer | undefined;
      _count?: Element | undefined;
      
      subjectResults?: Reference | undefined;
      _subjectResults?: Element | undefined;
      
      value?: CodeableConcept | undefined;
      _value?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      improvementNotation?: CodeableConcept | undefined;
      _improvementNotation?: Element | undefined;
      
      measure: canonical;
      _measure?: Element | undefined;
      
      period: Period;
      _period?: Element | undefined;
      
      reporter?: Reference | undefined;
      _reporter?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject?: Reference | undefined;
      _subject?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
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
      
      readonly resourceType: "Media";
      


      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      bodySite?: CodeableConcept | undefined;
      _bodySite?: Element | undefined;
      
      content: Attachment;
      _content?: Element | undefined;
      
      created[x]?: dateTime | Period | undefined;
      _created[x]?: Element | undefined;
      
      device?: Reference | undefined;
      _device?: Element | undefined;
      
      deviceName?: string | undefined;
      _deviceName?: Element | undefined;
      
      duration?: decimal | undefined;
      _duration?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      frames?: positiveInt | undefined;
      _frames?: Element | undefined;
      
      height?: positiveInt | undefined;
      _height?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      issued?: instant | undefined;
      _issued?: Element | undefined;
      
      modality?: CodeableConcept | undefined;
      _modality?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      operator?: Reference | undefined;
      _operator?: Element | undefined;
      
      partOf?: Array<Reference> | undefined;
      _partOf?: Element[] | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject?: Reference | undefined;
      _subject?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      view?: CodeableConcept | undefined;
      _view?: Element | undefined;
      
      width?: positiveInt | undefined;
      _width?: Element | undefined;
      
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
      
      readonly resourceType: "Medication";
      


      
      amount?: Ratio | undefined;
      _amount?: Element | undefined;
      
      batch?: BackboneElement | undefined;
      _batch?: Element | undefined;
      
      expirationDate?: dateTime | undefined;
      _expirationDate?: Element | undefined;
      
      lotNumber?: string | undefined;
      _lotNumber?: Element | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      form?: CodeableConcept | undefined;
      _form?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      ingredient?: Array<BackboneElement> | undefined;
      _ingredient?: Element[] | undefined;
      
      isActive?: boolean | undefined;
      _isActive?: Element | undefined;
      
      item[x]: CodeableConcept | Reference;
      _item[x]?: Element | undefined;
      
      strength?: Ratio | undefined;
      _strength?: Element | undefined;
      
      manufacturer?: Reference | undefined;
      _manufacturer?: Element | undefined;
      
      status?: code | undefined;
      _status?: Element | undefined;
      
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
      
      readonly resourceType: "MedicationAdministration";
      


      
      category?: CodeableConcept | undefined;
      _category?: Element | undefined;
      
      context?: Reference | undefined;
      _context?: Element | undefined;
      
      device?: Array<Reference> | undefined;
      _device?: Element[] | undefined;
      
      dosage?: BackboneElement | undefined;
      _dosage?: Element | undefined;
      
      dose?: Quantity | undefined;
      _dose?: Element | undefined;
      
      method?: CodeableConcept | undefined;
      _method?: Element | undefined;
      
      rate[x]?: Ratio | Quantity | undefined;
      _rate[x]?: Element | undefined;
      
      route?: CodeableConcept | undefined;
      _route?: Element | undefined;
      
      site?: CodeableConcept | undefined;
      _site?: Element | undefined;
      
      text?: string | undefined;
      _text?: Element | undefined;
      
      effective[x]: dateTime | Period;
      _effective[x]?: Element | undefined;
      
      eventHistory?: Array<Reference> | undefined;
      _eventHistory?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      instantiates?: Array<uri> | undefined;
      _instantiates?: Element[] | undefined;
      
      medication[x]: CodeableConcept | Reference;
      _medication[x]?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      partOf?: Array<Reference> | undefined;
      _partOf?: Element[] | undefined;
      
      performer?: Array<BackboneElement> | undefined;
      _performer?: Element[] | undefined;
      
      actor: Reference;
      _actor?: Element | undefined;
      
      function?: CodeableConcept | undefined;
      _function?: Element | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      request?: Reference | undefined;
      _request?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      statusReason?: Array<CodeableConcept> | undefined;
      _statusReason?: Element[] | undefined;
      
      subject: Reference;
      _subject?: Element | undefined;
      
      supportingInformation?: Array<Reference> | undefined;
      _supportingInformation?: Element[] | undefined;
      
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
      
      readonly resourceType: "MedicationDispense";
      


      
      authorizingPrescription?: Array<Reference> | undefined;
      _authorizingPrescription?: Element[] | undefined;
      
      category?: CodeableConcept | undefined;
      _category?: Element | undefined;
      
      context?: Reference | undefined;
      _context?: Element | undefined;
      
      daysSupply?: Quantity | undefined;
      _daysSupply?: Element | undefined;
      
      destination?: Reference | undefined;
      _destination?: Element | undefined;
      
      detectedIssue?: Array<Reference> | undefined;
      _detectedIssue?: Element[] | undefined;
      
      dosageInstruction?: Array<Dosage> | undefined;
      _dosageInstruction?: Element[] | undefined;
      
      eventHistory?: Array<Reference> | undefined;
      _eventHistory?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      location?: Reference | undefined;
      _location?: Element | undefined;
      
      medication[x]: CodeableConcept | Reference;
      _medication[x]?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      partOf?: Array<Reference> | undefined;
      _partOf?: Element[] | undefined;
      
      performer?: Array<BackboneElement> | undefined;
      _performer?: Element[] | undefined;
      
      actor: Reference;
      _actor?: Element | undefined;
      
      function?: CodeableConcept | undefined;
      _function?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      receiver?: Array<Reference> | undefined;
      _receiver?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      statusReason[x]?: CodeableConcept | Reference | undefined;
      _statusReason[x]?: Element | undefined;
      
      subject?: Reference | undefined;
      _subject?: Element | undefined;
      
      substitution?: BackboneElement | undefined;
      _substitution?: Element | undefined;
      
      reason?: Array<CodeableConcept> | undefined;
      _reason?: Element[] | undefined;
      
      responsibleParty?: Array<Reference> | undefined;
      _responsibleParty?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      wasSubstituted: boolean;
      _wasSubstituted?: Element | undefined;
      
      supportingInformation?: Array<Reference> | undefined;
      _supportingInformation?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      whenHandedOver?: dateTime | undefined;
      _whenHandedOver?: Element | undefined;
      
      whenPrepared?: dateTime | undefined;
      _whenPrepared?: Element | undefined;
      
    }

  


  
    /**
 * MedicationKnowledge
 * 
 * Information about a medication that is used to support knowledge.
 * 
 * @see {@link http://hl7.org/fhir/R4B/MedicationKnowledge.html}
 */
    export interface MedicationKnowledge extends DomainResource {
      
      readonly resourceType: "MedicationKnowledge";
      


      
      administrationGuidelines?: Array<BackboneElement> | undefined;
      _administrationGuidelines?: Element[] | undefined;
      
      dosage?: Array<BackboneElement> | undefined;
      _dosage?: Element[] | undefined;
      
      dosage: Array<Dosage>;
      _dosage?: Element[] | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      indication[x]?: CodeableConcept | Reference | undefined;
      _indication[x]?: Element | undefined;
      
      patientCharacteristics?: Array<BackboneElement> | undefined;
      _patientCharacteristics?: Element[] | undefined;
      
      characteristic[x]: CodeableConcept | Quantity;
      _characteristic[x]?: Element | undefined;
      
      value?: Array<string> | undefined;
      _value?: Element[] | undefined;
      
      amount?: Quantity | undefined;
      _amount?: Element | undefined;
      
      associatedMedication?: Array<Reference> | undefined;
      _associatedMedication?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      contraindication?: Array<Reference> | undefined;
      _contraindication?: Element[] | undefined;
      
      cost?: Array<BackboneElement> | undefined;
      _cost?: Element[] | undefined;
      
      cost: Money;
      _cost?: Element | undefined;
      
      source?: string | undefined;
      _source?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      doseForm?: CodeableConcept | undefined;
      _doseForm?: Element | undefined;
      
      drugCharacteristic?: Array<BackboneElement> | undefined;
      _drugCharacteristic?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      value[x]?: CodeableConcept | string | Quantity | base64Binary | undefined;
      _value[x]?: Element | undefined;
      
      ingredient?: Array<BackboneElement> | undefined;
      _ingredient?: Element[] | undefined;
      
      isActive?: boolean | undefined;
      _isActive?: Element | undefined;
      
      item[x]: CodeableConcept | Reference;
      _item[x]?: Element | undefined;
      
      strength?: Ratio | undefined;
      _strength?: Element | undefined;
      
      intendedRoute?: Array<CodeableConcept> | undefined;
      _intendedRoute?: Element[] | undefined;
      
      kinetics?: Array<BackboneElement> | undefined;
      _kinetics?: Element[] | undefined;
      
      areaUnderCurve?: Array<Quantity> | undefined;
      _areaUnderCurve?: Element[] | undefined;
      
      halfLifePeriod?: Duration | undefined;
      _halfLifePeriod?: Element | undefined;
      
      lethalDose50?: Array<Quantity> | undefined;
      _lethalDose50?: Element[] | undefined;
      
      manufacturer?: Reference | undefined;
      _manufacturer?: Element | undefined;
      
      medicineClassification?: Array<BackboneElement> | undefined;
      _medicineClassification?: Element[] | undefined;
      
      classification?: Array<CodeableConcept> | undefined;
      _classification?: Element[] | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      monitoringProgram?: Array<BackboneElement> | undefined;
      _monitoringProgram?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      monograph?: Array<BackboneElement> | undefined;
      _monograph?: Element[] | undefined;
      
      source?: Reference | undefined;
      _source?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      packaging?: BackboneElement | undefined;
      _packaging?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      preparationInstruction?: markdown | undefined;
      _preparationInstruction?: Element | undefined;
      
      productType?: Array<CodeableConcept> | undefined;
      _productType?: Element[] | undefined;
      
      regulatory?: Array<BackboneElement> | undefined;
      _regulatory?: Element[] | undefined;
      
      maxDispense?: BackboneElement | undefined;
      _maxDispense?: Element | undefined;
      
      period?: Duration | undefined;
      _period?: Element | undefined;
      
      quantity: Quantity;
      _quantity?: Element | undefined;
      
      regulatoryAuthority: Reference;
      _regulatoryAuthority?: Element | undefined;
      
      schedule?: Array<BackboneElement> | undefined;
      _schedule?: Element[] | undefined;
      
      schedule: CodeableConcept;
      _schedule?: Element | undefined;
      
      substitution?: Array<BackboneElement> | undefined;
      _substitution?: Element[] | undefined;
      
      allowed: boolean;
      _allowed?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      relatedMedicationKnowledge?: Array<BackboneElement> | undefined;
      _relatedMedicationKnowledge?: Element[] | undefined;
      
      reference: Array<Reference>;
      _reference?: Element[] | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      status?: code | undefined;
      _status?: Element | undefined;
      
      synonym?: Array<string> | undefined;
      _synonym?: Element[] | undefined;
      
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
      
      readonly resourceType: "MedicationRequest";
      


      
      authoredOn?: dateTime | undefined;
      _authoredOn?: Element | undefined;
      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      courseOfTherapyType?: CodeableConcept | undefined;
      _courseOfTherapyType?: Element | undefined;
      
      detectedIssue?: Array<Reference> | undefined;
      _detectedIssue?: Element[] | undefined;
      
      dispenseRequest?: BackboneElement | undefined;
      _dispenseRequest?: Element | undefined;
      
      dispenseInterval?: Duration | undefined;
      _dispenseInterval?: Element | undefined;
      
      expectedSupplyDuration?: Duration | undefined;
      _expectedSupplyDuration?: Element | undefined;
      
      initialFill?: BackboneElement | undefined;
      _initialFill?: Element | undefined;
      
      duration?: Duration | undefined;
      _duration?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      numberOfRepeatsAllowed?: unsignedInt | undefined;
      _numberOfRepeatsAllowed?: Element | undefined;
      
      performer?: Reference | undefined;
      _performer?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      validityPeriod?: Period | undefined;
      _validityPeriod?: Element | undefined;
      
      doNotPerform?: boolean | undefined;
      _doNotPerform?: Element | undefined;
      
      dosageInstruction?: Array<Dosage> | undefined;
      _dosageInstruction?: Element[] | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      eventHistory?: Array<Reference> | undefined;
      _eventHistory?: Element[] | undefined;
      
      groupIdentifier?: Identifier | undefined;
      _groupIdentifier?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      instantiatesCanonical?: Array<canonical> | undefined;
      _instantiatesCanonical?: Element[] | undefined;
      
      instantiatesUri?: Array<uri> | undefined;
      _instantiatesUri?: Element[] | undefined;
      
      insurance?: Array<Reference> | undefined;
      _insurance?: Element[] | undefined;
      
      intent: code;
      _intent?: Element | undefined;
      
      medication[x]: CodeableConcept | Reference;
      _medication[x]?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      performer?: Reference | undefined;
      _performer?: Element | undefined;
      
      performerType?: CodeableConcept | undefined;
      _performerType?: Element | undefined;
      
      priority?: code | undefined;
      _priority?: Element | undefined;
      
      priorPrescription?: Reference | undefined;
      _priorPrescription?: Element | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      recorder?: Reference | undefined;
      _recorder?: Element | undefined;
      
      reported[x]?: boolean | Reference | undefined;
      _reported[x]?: Element | undefined;
      
      requester?: Reference | undefined;
      _requester?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      statusReason?: CodeableConcept | undefined;
      _statusReason?: Element | undefined;
      
      subject: Reference;
      _subject?: Element | undefined;
      
      substitution?: BackboneElement | undefined;
      _substitution?: Element | undefined;
      
      allowed[x]: boolean | CodeableConcept;
      _allowed[x]?: Element | undefined;
      
      reason?: CodeableConcept | undefined;
      _reason?: Element | undefined;
      
      supportingInformation?: Array<Reference> | undefined;
      _supportingInformation?: Element[] | undefined;
      
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

The primary
 * difference between a medication statement and a medication administration is
 * that the medication administration has complete administration information and
 * is based on actual administration information from the person who administered
 * the medication.  A medication statement is often, if not always, less specific.
 * There is no required date/time when the medication was administered, in fact we
 * only know that a source has reported the patient is taking this medication,
 * where details such as time, quantity, or rate or even medication product may be
 * incomplete or missing or less precise.  As stated earlier, the medication
 * statement information may come from the patient's memory, from a prescription
 * bottle or from a list of medications the patient, clinician or other party
 * maintains.  Medication administration is more formal and is not missing detailed
 * information.
 * 
 * @see {@link http://hl7.org/fhir/R4B/MedicationStatement.html}
 */
    export interface MedicationStatement extends DomainResource {
      
      readonly resourceType: "MedicationStatement";
      


      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      category?: CodeableConcept | undefined;
      _category?: Element | undefined;
      
      context?: Reference | undefined;
      _context?: Element | undefined;
      
      dateAsserted?: dateTime | undefined;
      _dateAsserted?: Element | undefined;
      
      derivedFrom?: Array<Reference> | undefined;
      _derivedFrom?: Element[] | undefined;
      
      dosage?: Array<Dosage> | undefined;
      _dosage?: Element[] | undefined;
      
      effective[x]?: dateTime | Period | undefined;
      _effective[x]?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      informationSource?: Reference | undefined;
      _informationSource?: Element | undefined;
      
      medication[x]: CodeableConcept | Reference;
      _medication[x]?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      partOf?: Array<Reference> | undefined;
      _partOf?: Element[] | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      statusReason?: Array<CodeableConcept> | undefined;
      _statusReason?: Element[] | undefined;
      
      subject: Reference;
      _subject?: Element | undefined;
      
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
      
      readonly resourceType: "MedicinalProductDefinition";
      


      
      additionalMonitoringIndicator?: CodeableConcept | undefined;
      _additionalMonitoringIndicator?: Element | undefined;
      
      attachedDocument?: Array<Reference> | undefined;
      _attachedDocument?: Element[] | undefined;
      
      characteristic?: Array<BackboneElement> | undefined;
      _characteristic?: Element[] | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      value[x]?: CodeableConcept | Quantity | date | boolean | Attachment | undefined;
      _value[x]?: Element | undefined;
      
      classification?: Array<CodeableConcept> | undefined;
      _classification?: Element[] | undefined;
      
      clinicalTrial?: Array<Reference> | undefined;
      _clinicalTrial?: Element[] | undefined;
      
      code?: Array<Coding> | undefined;
      _code?: Element[] | undefined;
      
      combinedPharmaceuticalDoseForm?: CodeableConcept | undefined;
      _combinedPharmaceuticalDoseForm?: Element | undefined;
      
      contact?: Array<BackboneElement> | undefined;
      _contact?: Element[] | undefined;
      
      contact: Reference;
      _contact?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      crossReference?: Array<BackboneElement> | undefined;
      _crossReference?: Element[] | undefined;
      
      product: CodeableReference;
      _product?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      domain?: CodeableConcept | undefined;
      _domain?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      impurity?: Array<CodeableReference> | undefined;
      _impurity?: Element[] | undefined;
      
      indication?: markdown | undefined;
      _indication?: Element | undefined;
      
      ingredient?: Array<CodeableConcept> | undefined;
      _ingredient?: Element[] | undefined;
      
      legalStatusOfSupply?: CodeableConcept | undefined;
      _legalStatusOfSupply?: Element | undefined;
      
      marketingStatus?: Array<MarketingStatus> | undefined;
      _marketingStatus?: Element[] | undefined;
      
      masterFile?: Array<Reference> | undefined;
      _masterFile?: Element[] | undefined;
      
      name: Array<BackboneElement>;
      _name?: Element[] | undefined;
      
      countryLanguage?: Array<BackboneElement> | undefined;
      _countryLanguage?: Element[] | undefined;
      
      country: CodeableConcept;
      _country?: Element | undefined;
      
      jurisdiction?: CodeableConcept | undefined;
      _jurisdiction?: Element | undefined;
      
      language: CodeableConcept;
      _language?: Element | undefined;
      
      namePart?: Array<BackboneElement> | undefined;
      _namePart?: Element[] | undefined;
      
      part: string;
      _part?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      productName: string;
      _productName?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      operation?: Array<BackboneElement> | undefined;
      _operation?: Element[] | undefined;
      
      confidentialityIndicator?: CodeableConcept | undefined;
      _confidentialityIndicator?: Element | undefined;
      
      effectiveDate?: Period | undefined;
      _effectiveDate?: Element | undefined;
      
      organization?: Array<Reference> | undefined;
      _organization?: Element[] | undefined;
      
      type?: CodeableReference | undefined;
      _type?: Element | undefined;
      
      packagedMedicinalProduct?: Array<CodeableConcept> | undefined;
      _packagedMedicinalProduct?: Element[] | undefined;
      
      pediatricUseIndicator?: CodeableConcept | undefined;
      _pediatricUseIndicator?: Element | undefined;
      
      route?: Array<CodeableConcept> | undefined;
      _route?: Element[] | undefined;
      
      specialMeasures?: Array<CodeableConcept> | undefined;
      _specialMeasures?: Element[] | undefined;
      
      status?: CodeableConcept | undefined;
      _status?: Element | undefined;
      
      statusDate?: dateTime | undefined;
      _statusDate?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "MessageDefinition";
      


      
      allowedResponse?: Array<BackboneElement> | undefined;
      _allowedResponse?: Element[] | undefined;
      
      message: canonical;
      _message?: Element | undefined;
      
      situation?: markdown | undefined;
      _situation?: Element | undefined;
      
      base?: canonical | undefined;
      _base?: Element | undefined;
      
      category?: code | undefined;
      _category?: Element | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date: dateTime;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      event[x]: Coding | uri;
      _event[x]?: Element | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      focus?: Array<BackboneElement> | undefined;
      _focus?: Element[] | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      max?: string | undefined;
      _max?: Element | undefined;
      
      min: unsignedInt;
      _min?: Element | undefined;
      
      profile?: canonical | undefined;
      _profile?: Element | undefined;
      
      graph?: Array<canonical> | undefined;
      _graph?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      parent?: Array<canonical> | undefined;
      _parent?: Element[] | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      replaces?: Array<canonical> | undefined;
      _replaces?: Element[] | undefined;
      
      responseRequired?: code | undefined;
      _responseRequired?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "MessageHeader";
      


      
      author?: Reference | undefined;
      _author?: Element | undefined;
      
      definition?: canonical | undefined;
      _definition?: Element | undefined;
      
      destination?: Array<BackboneElement> | undefined;
      _destination?: Element[] | undefined;
      
      endpoint: url;
      _endpoint?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      receiver?: Reference | undefined;
      _receiver?: Element | undefined;
      
      target?: Reference | undefined;
      _target?: Element | undefined;
      
      enterer?: Reference | undefined;
      _enterer?: Element | undefined;
      
      event[x]: Coding | uri;
      _event[x]?: Element | undefined;
      
      focus?: Array<Reference> | undefined;
      _focus?: Element[] | undefined;
      
      reason?: CodeableConcept | undefined;
      _reason?: Element | undefined;
      
      response?: BackboneElement | undefined;
      _response?: Element | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      details?: Reference | undefined;
      _details?: Element | undefined;
      
      identifier: id;
      _identifier?: Element | undefined;
      
      responsible?: Reference | undefined;
      _responsible?: Element | undefined;
      
      sender?: Reference | undefined;
      _sender?: Element | undefined;
      
      source: BackboneElement;
      _source?: Element | undefined;
      
      contact?: ContactPoint | undefined;
      _contact?: Element | undefined;
      
      endpoint: url;
      _endpoint?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      software?: string | undefined;
      _software?: Element | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
    }

  


  


  
    /**
 * Meta
 * 
 * Base StructureDefinition for Meta Type: The metadata about a resource. This is
 * content in the resource that is maintained by the infrastructure. Changes to the
 * content might not always be associated with version changes to the resource.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Meta.html}
 */
    export interface Meta extends Element {
      
      readonly resourceType: string;
      


      
      lastUpdated?: instant | undefined;
      _lastUpdated?: Element | undefined;
      
      profile?: Array<canonical> | undefined;
      _profile?: Element[] | undefined;
      
      security?: Array<Coding> | undefined;
      _security?: Element[] | undefined;
      
      source?: uri | undefined;
      _source?: Element | undefined;
      
      tag?: Array<Coding> | undefined;
      _tag?: Element[] | undefined;
      
      versionId?: id | undefined;
      _versionId?: Element | undefined;
      
    }

  


  


  


  


  


  


  


  


  


  
    /**
 * MolecularSequence
 * 
 * Raw data describing a biological sequence.
 * 
 * @see {@link http://hl7.org/fhir/R4B/MolecularSequence.html}
 */
    export interface MolecularSequence extends DomainResource {
      
      readonly resourceType: "MolecularSequence";
      


      
      coordinateSystem: integer;
      _coordinateSystem?: Element | undefined;
      
      device?: Reference | undefined;
      _device?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      observedSeq?: string | undefined;
      _observedSeq?: Element | undefined;
      
      patient?: Reference | undefined;
      _patient?: Element | undefined;
      
      performer?: Reference | undefined;
      _performer?: Element | undefined;
      
      pointer?: Array<Reference> | undefined;
      _pointer?: Element[] | undefined;
      
      quality?: Array<BackboneElement> | undefined;
      _quality?: Element[] | undefined;
      
      end?: integer | undefined;
      _end?: Element | undefined;
      
      fScore?: decimal | undefined;
      _fScore?: Element | undefined;
      
      gtFP?: decimal | undefined;
      _gtFP?: Element | undefined;
      
      method?: CodeableConcept | undefined;
      _method?: Element | undefined;
      
      precision?: decimal | undefined;
      _precision?: Element | undefined;
      
      queryFP?: decimal | undefined;
      _queryFP?: Element | undefined;
      
      queryTP?: decimal | undefined;
      _queryTP?: Element | undefined;
      
      recall?: decimal | undefined;
      _recall?: Element | undefined;
      
      roc?: BackboneElement | undefined;
      _roc?: Element | undefined;
      
      fMeasure?: Array<decimal> | undefined;
      _fMeasure?: Element[] | undefined;
      
      numFN?: Array<integer> | undefined;
      _numFN?: Element[] | undefined;
      
      numFP?: Array<integer> | undefined;
      _numFP?: Element[] | undefined;
      
      numTP?: Array<integer> | undefined;
      _numTP?: Element[] | undefined;
      
      precision?: Array<decimal> | undefined;
      _precision?: Element[] | undefined;
      
      score?: Array<integer> | undefined;
      _score?: Element[] | undefined;
      
      sensitivity?: Array<decimal> | undefined;
      _sensitivity?: Element[] | undefined;
      
      score?: Quantity | undefined;
      _score?: Element | undefined;
      
      standardSequence?: CodeableConcept | undefined;
      _standardSequence?: Element | undefined;
      
      start?: integer | undefined;
      _start?: Element | undefined;
      
      truthFN?: decimal | undefined;
      _truthFN?: Element | undefined;
      
      truthTP?: decimal | undefined;
      _truthTP?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      readCoverage?: integer | undefined;
      _readCoverage?: Element | undefined;
      
      referenceSeq?: BackboneElement | undefined;
      _referenceSeq?: Element | undefined;
      
      chromosome?: CodeableConcept | undefined;
      _chromosome?: Element | undefined;
      
      genomeBuild?: string | undefined;
      _genomeBuild?: Element | undefined;
      
      orientation?: code | undefined;
      _orientation?: Element | undefined;
      
      referenceSeqId?: CodeableConcept | undefined;
      _referenceSeqId?: Element | undefined;
      
      referenceSeqPointer?: Reference | undefined;
      _referenceSeqPointer?: Element | undefined;
      
      referenceSeqString?: string | undefined;
      _referenceSeqString?: Element | undefined;
      
      strand?: code | undefined;
      _strand?: Element | undefined;
      
      windowEnd?: integer | undefined;
      _windowEnd?: Element | undefined;
      
      windowStart?: integer | undefined;
      _windowStart?: Element | undefined;
      
      repository?: Array<BackboneElement> | undefined;
      _repository?: Element[] | undefined;
      
      datasetId?: string | undefined;
      _datasetId?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      readsetId?: string | undefined;
      _readsetId?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      variantsetId?: string | undefined;
      _variantsetId?: Element | undefined;
      
      specimen?: Reference | undefined;
      _specimen?: Element | undefined;
      
      structureVariant?: Array<BackboneElement> | undefined;
      _structureVariant?: Element[] | undefined;
      
      exact?: boolean | undefined;
      _exact?: Element | undefined;
      
      inner?: BackboneElement | undefined;
      _inner?: Element | undefined;
      
      end?: integer | undefined;
      _end?: Element | undefined;
      
      start?: integer | undefined;
      _start?: Element | undefined;
      
      length?: integer | undefined;
      _length?: Element | undefined;
      
      outer?: BackboneElement | undefined;
      _outer?: Element | undefined;
      
      end?: integer | undefined;
      _end?: Element | undefined;
      
      start?: integer | undefined;
      _start?: Element | undefined;
      
      variantType?: CodeableConcept | undefined;
      _variantType?: Element | undefined;
      
      type?: code | undefined;
      _type?: Element | undefined;
      
      variant?: Array<BackboneElement> | undefined;
      _variant?: Element[] | undefined;
      
      cigar?: string | undefined;
      _cigar?: Element | undefined;
      
      end?: integer | undefined;
      _end?: Element | undefined;
      
      observedAllele?: string | undefined;
      _observedAllele?: Element | undefined;
      
      referenceAllele?: string | undefined;
      _referenceAllele?: Element | undefined;
      
      start?: integer | undefined;
      _start?: Element | undefined;
      
      variantPointer?: Reference | undefined;
      _variantPointer?: Element | undefined;
      
    }

  


  
    /**
 * Money
 * 
 * Base StructureDefinition for Money Type: An amount of economic utility in some
 * recognized currency.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Money.html}
 */
    export interface Money extends Element {
      
      readonly resourceType: string;
      


      
      currency?: code | undefined;
      _currency?: Element | undefined;
      
      value?: decimal | undefined;
      _value?: Element | undefined;
      
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
      
      readonly resourceType: "NamingSystem";
      


      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      date: dateTime;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      kind: code;
      _kind?: Element | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      responsible?: string | undefined;
      _responsible?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      uniqueId: Array<BackboneElement>;
      _uniqueId?: Element[] | undefined;
      
      comment?: string | undefined;
      _comment?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      preferred?: boolean | undefined;
      _preferred?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      value: string;
      _value?: Element | undefined;
      
      usage?: string | undefined;
      _usage?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
    }

  


  
    /**
 * Narrative
 * 
 * Base StructureDefinition for Narrative Type: A human-readable summary of the
 * resource conveying the essential clinical and business information for the
 * resource.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Narrative.html}
 */
    export interface Narrative extends Element {
      
      readonly resourceType: string;
      


      
      div: xhtml;
      _div?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
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
      
      readonly resourceType: "NutritionOrder";
      


      
      allergyIntolerance?: Array<Reference> | undefined;
      _allergyIntolerance?: Element[] | undefined;
      
      dateTime: dateTime;
      _dateTime?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      enteralFormula?: BackboneElement | undefined;
      _enteralFormula?: Element | undefined;
      
      additiveProductName?: string | undefined;
      _additiveProductName?: Element | undefined;
      
      additiveType?: CodeableConcept | undefined;
      _additiveType?: Element | undefined;
      
      administration?: Array<BackboneElement> | undefined;
      _administration?: Element[] | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      rate[x]?: Quantity | Ratio | undefined;
      _rate[x]?: Element | undefined;
      
      schedule?: Timing | undefined;
      _schedule?: Element | undefined;
      
      administrationInstruction?: string | undefined;
      _administrationInstruction?: Element | undefined;
      
      baseFormulaProductName?: string | undefined;
      _baseFormulaProductName?: Element | undefined;
      
      baseFormulaType?: CodeableConcept | undefined;
      _baseFormulaType?: Element | undefined;
      
      caloricDensity?: Quantity | undefined;
      _caloricDensity?: Element | undefined;
      
      maxVolumeToDeliver?: Quantity | undefined;
      _maxVolumeToDeliver?: Element | undefined;
      
      routeofAdministration?: CodeableConcept | undefined;
      _routeofAdministration?: Element | undefined;
      
      excludeFoodModifier?: Array<CodeableConcept> | undefined;
      _excludeFoodModifier?: Element[] | undefined;
      
      foodPreferenceModifier?: Array<CodeableConcept> | undefined;
      _foodPreferenceModifier?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      instantiates?: Array<uri> | undefined;
      _instantiates?: Element[] | undefined;
      
      instantiatesCanonical?: Array<canonical> | undefined;
      _instantiatesCanonical?: Element[] | undefined;
      
      instantiatesUri?: Array<uri> | undefined;
      _instantiatesUri?: Element[] | undefined;
      
      intent: code;
      _intent?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      oralDiet?: BackboneElement | undefined;
      _oralDiet?: Element | undefined;
      
      fluidConsistencyType?: Array<CodeableConcept> | undefined;
      _fluidConsistencyType?: Element[] | undefined;
      
      instruction?: string | undefined;
      _instruction?: Element | undefined;
      
      nutrient?: Array<BackboneElement> | undefined;
      _nutrient?: Element[] | undefined;
      
      amount?: Quantity | undefined;
      _amount?: Element | undefined;
      
      modifier?: CodeableConcept | undefined;
      _modifier?: Element | undefined;
      
      schedule?: Array<Timing> | undefined;
      _schedule?: Element[] | undefined;
      
      texture?: Array<BackboneElement> | undefined;
      _texture?: Element[] | undefined;
      
      foodType?: CodeableConcept | undefined;
      _foodType?: Element | undefined;
      
      modifier?: CodeableConcept | undefined;
      _modifier?: Element | undefined;
      
      type?: Array<CodeableConcept> | undefined;
      _type?: Element[] | undefined;
      
      orderer?: Reference | undefined;
      _orderer?: Element | undefined;
      
      patient: Reference;
      _patient?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      supplement?: Array<BackboneElement> | undefined;
      _supplement?: Element[] | undefined;
      
      instruction?: string | undefined;
      _instruction?: Element | undefined;
      
      productName?: string | undefined;
      _productName?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      schedule?: Array<Timing> | undefined;
      _schedule?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
    }

  


  
    /**
 * NutritionProduct
 * 
 * A food or fluid product that is consumed by patients.
 * 
 * @see {@link http://hl7.org/fhir/R4B/NutritionProduct.html}
 */
    export interface NutritionProduct extends DomainResource {
      
      readonly resourceType: "NutritionProduct";
      


      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      ingredient?: Array<BackboneElement> | undefined;
      _ingredient?: Element[] | undefined;
      
      amount?: Array<Ratio> | undefined;
      _amount?: Element[] | undefined;
      
      item: CodeableReference;
      _item?: Element | undefined;
      
      instance?: BackboneElement | undefined;
      _instance?: Element | undefined;
      
      expiry?: dateTime | undefined;
      _expiry?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      lotNumber?: string | undefined;
      _lotNumber?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      useBy?: dateTime | undefined;
      _useBy?: Element | undefined;
      
      knownAllergen?: Array<CodeableReference> | undefined;
      _knownAllergen?: Element[] | undefined;
      
      manufacturer?: Array<Reference> | undefined;
      _manufacturer?: Element[] | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      nutrient?: Array<BackboneElement> | undefined;
      _nutrient?: Element[] | undefined;
      
      amount?: Array<Ratio> | undefined;
      _amount?: Element[] | undefined;
      
      item?: CodeableReference | undefined;
      _item?: Element | undefined;
      
      productCharacteristic?: Array<BackboneElement> | undefined;
      _productCharacteristic?: Element[] | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      value[x]: CodeableConcept | string | Quantity | base64Binary | Attachment | boolean;
      _value[x]?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
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
      
      readonly resourceType: "Observation";
      


      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      bodySite?: CodeableConcept | undefined;
      _bodySite?: Element | undefined;
      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      component?: Array<BackboneElement> | undefined;
      _component?: Element[] | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      dataAbsentReason?: CodeableConcept | undefined;
      _dataAbsentReason?: Element | undefined;
      
      interpretation?: Array<CodeableConcept> | undefined;
      _interpretation?: Element[] | undefined;
      
      referenceRange?: Array<undefined> | undefined;
      _referenceRange?: Element[] | undefined;
      
      value[x]?: Quantity | CodeableConcept | string | boolean | integer | Range | Ratio | SampledData | time | dateTime | Period | undefined;
      _value[x]?: Element | undefined;
      
      dataAbsentReason?: CodeableConcept | undefined;
      _dataAbsentReason?: Element | undefined;
      
      derivedFrom?: Array<Reference> | undefined;
      _derivedFrom?: Element[] | undefined;
      
      device?: Reference | undefined;
      _device?: Element | undefined;
      
      effective[x]?: dateTime | Period | Timing | instant | undefined;
      _effective[x]?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      focus?: Array<Reference> | undefined;
      _focus?: Element[] | undefined;
      
      hasMember?: Array<Reference> | undefined;
      _hasMember?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      interpretation?: Array<CodeableConcept> | undefined;
      _interpretation?: Element[] | undefined;
      
      issued?: instant | undefined;
      _issued?: Element | undefined;
      
      method?: CodeableConcept | undefined;
      _method?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      partOf?: Array<Reference> | undefined;
      _partOf?: Element[] | undefined;
      
      performer?: Array<Reference> | undefined;
      _performer?: Element[] | undefined;
      
      referenceRange?: Array<BackboneElement> | undefined;
      _referenceRange?: Element[] | undefined;
      
      age?: Range | undefined;
      _age?: Element | undefined;
      
      appliesTo?: Array<CodeableConcept> | undefined;
      _appliesTo?: Element[] | undefined;
      
      high?: Quantity | undefined;
      _high?: Element | undefined;
      
      low?: Quantity | undefined;
      _low?: Element | undefined;
      
      text?: string | undefined;
      _text?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      specimen?: Reference | undefined;
      _specimen?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject?: Reference | undefined;
      _subject?: Element | undefined;
      
      value[x]?: Quantity | CodeableConcept | string | boolean | integer | Range | Ratio | SampledData | time | dateTime | Period | undefined;
      _value[x]?: Element | undefined;
      
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
      
      readonly resourceType: "ObservationDefinition";
      


      
      abnormalCodedValueSet?: Reference | undefined;
      _abnormalCodedValueSet?: Element | undefined;
      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      criticalCodedValueSet?: Reference | undefined;
      _criticalCodedValueSet?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      method?: CodeableConcept | undefined;
      _method?: Element | undefined;
      
      multipleResultsAllowed?: boolean | undefined;
      _multipleResultsAllowed?: Element | undefined;
      
      normalCodedValueSet?: Reference | undefined;
      _normalCodedValueSet?: Element | undefined;
      
      permittedDataType?: Array<code> | undefined;
      _permittedDataType?: Element[] | undefined;
      
      preferredReportName?: string | undefined;
      _preferredReportName?: Element | undefined;
      
      qualifiedInterval?: Array<BackboneElement> | undefined;
      _qualifiedInterval?: Element[] | undefined;
      
      age?: Range | undefined;
      _age?: Element | undefined;
      
      appliesTo?: Array<CodeableConcept> | undefined;
      _appliesTo?: Element[] | undefined;
      
      category?: code | undefined;
      _category?: Element | undefined;
      
      condition?: string | undefined;
      _condition?: Element | undefined;
      
      context?: CodeableConcept | undefined;
      _context?: Element | undefined;
      
      gender?: code | undefined;
      _gender?: Element | undefined;
      
      gestationalAge?: Range | undefined;
      _gestationalAge?: Element | undefined;
      
      range?: Range | undefined;
      _range?: Element | undefined;
      
      quantitativeDetails?: BackboneElement | undefined;
      _quantitativeDetails?: Element | undefined;
      
      conversionFactor?: decimal | undefined;
      _conversionFactor?: Element | undefined;
      
      customaryUnit?: CodeableConcept | undefined;
      _customaryUnit?: Element | undefined;
      
      decimalPrecision?: integer | undefined;
      _decimalPrecision?: Element | undefined;
      
      unit?: CodeableConcept | undefined;
      _unit?: Element | undefined;
      
      validCodedValueSet?: Reference | undefined;
      _validCodedValueSet?: Element | undefined;
      
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
      
      readonly resourceType: "OperationDefinition";
      


      
      affectsState?: boolean | undefined;
      _affectsState?: Element | undefined;
      
      base?: canonical | undefined;
      _base?: Element | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      comment?: markdown | undefined;
      _comment?: Element | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      inputProfile?: canonical | undefined;
      _inputProfile?: Element | undefined;
      
      instance: boolean;
      _instance?: Element | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      kind: code;
      _kind?: Element | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      outputProfile?: canonical | undefined;
      _outputProfile?: Element | undefined;
      
      overload?: Array<BackboneElement> | undefined;
      _overload?: Element[] | undefined;
      
      comment?: string | undefined;
      _comment?: Element | undefined;
      
      parameterName?: Array<string> | undefined;
      _parameterName?: Element[] | undefined;
      
      parameter?: Array<BackboneElement> | undefined;
      _parameter?: Element[] | undefined;
      
      binding?: BackboneElement | undefined;
      _binding?: Element | undefined;
      
      strength: code;
      _strength?: Element | undefined;
      
      valueSet: canonical;
      _valueSet?: Element | undefined;
      
      documentation?: string | undefined;
      _documentation?: Element | undefined;
      
      max: string;
      _max?: Element | undefined;
      
      min: integer;
      _min?: Element | undefined;
      
      name: code;
      _name?: Element | undefined;
      
      part?: Array<undefined> | undefined;
      _part?: Element[] | undefined;
      
      referencedFrom?: Array<BackboneElement> | undefined;
      _referencedFrom?: Element[] | undefined;
      
      source: string;
      _source?: Element | undefined;
      
      sourceId?: string | undefined;
      _sourceId?: Element | undefined;
      
      searchType?: code | undefined;
      _searchType?: Element | undefined;
      
      targetProfile?: Array<canonical> | undefined;
      _targetProfile?: Element[] | undefined;
      
      type?: code | undefined;
      _type?: Element | undefined;
      
      use: code;
      _use?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      resource?: Array<code> | undefined;
      _resource?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      system: boolean;
      _system?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      type: boolean;
      _type?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "OperationOutcome";
      


      
      issue: Array<BackboneElement>;
      _issue?: Element[] | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      details?: CodeableConcept | undefined;
      _details?: Element | undefined;
      
      diagnostics?: string | undefined;
      _diagnostics?: Element | undefined;
      
      expression?: Array<string> | undefined;
      _expression?: Element[] | undefined;
      
      location?: Array<string> | undefined;
      _location?: Element[] | undefined;
      
      severity: code;
      _severity?: Element | undefined;
      
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
      
      readonly resourceType: "Organization";
      


      
      active?: boolean | undefined;
      _active?: Element | undefined;
      
      address?: Array<Address> | undefined;
      _address?: Element[] | undefined;
      
      alias?: Array<string> | undefined;
      _alias?: Element[] | undefined;
      
      contact?: Array<BackboneElement> | undefined;
      _contact?: Element[] | undefined;
      
      address?: Address | undefined;
      _address?: Element | undefined;
      
      name?: HumanName | undefined;
      _name?: Element | undefined;
      
      purpose?: CodeableConcept | undefined;
      _purpose?: Element | undefined;
      
      telecom?: Array<ContactPoint> | undefined;
      _telecom?: Element[] | undefined;
      
      endpoint?: Array<Reference> | undefined;
      _endpoint?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      partOf?: Reference | undefined;
      _partOf?: Element | undefined;
      
      telecom?: Array<ContactPoint> | undefined;
      _telecom?: Element[] | undefined;
      
      type?: Array<CodeableConcept> | undefined;
      _type?: Element[] | undefined;
      
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
      
      readonly resourceType: "OrganizationAffiliation";
      


      
      active?: boolean | undefined;
      _active?: Element | undefined;
      
      code?: Array<CodeableConcept> | undefined;
      _code?: Element[] | undefined;
      
      endpoint?: Array<Reference> | undefined;
      _endpoint?: Element[] | undefined;
      
      healthcareService?: Array<Reference> | undefined;
      _healthcareService?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      location?: Array<Reference> | undefined;
      _location?: Element[] | undefined;
      
      network?: Array<Reference> | undefined;
      _network?: Element[] | undefined;
      
      organization?: Reference | undefined;
      _organization?: Element | undefined;
      
      participatingOrganization?: Reference | undefined;
      _participatingOrganization?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      specialty?: Array<CodeableConcept> | undefined;
      _specialty?: Element[] | undefined;
      
      telecom?: Array<ContactPoint> | undefined;
      _telecom?: Element[] | undefined;
      
    }

  


  


  


  


  


  


  


  


  
    /**
 * PackagedProductDefinition
 * 
 * A medically related item or items, in a container or package.
 * 
 * @see {@link http://hl7.org/fhir/R4B/PackagedProductDefinition.html}
 */
    export interface PackagedProductDefinition extends DomainResource {
      
      readonly resourceType: "PackagedProductDefinition";
      


      
      characteristic?: Array<CodeableConcept> | undefined;
      _characteristic?: Element[] | undefined;
      
      containedItemQuantity?: Array<Quantity> | undefined;
      _containedItemQuantity?: Element[] | undefined;
      
      copackagedIndicator?: boolean | undefined;
      _copackagedIndicator?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      legalStatusOfSupply?: Array<BackboneElement> | undefined;
      _legalStatusOfSupply?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      jurisdiction?: CodeableConcept | undefined;
      _jurisdiction?: Element | undefined;
      
      manufacturer?: Array<Reference> | undefined;
      _manufacturer?: Element[] | undefined;
      
      marketingStatus?: Array<MarketingStatus> | undefined;
      _marketingStatus?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      package?: BackboneElement | undefined;
      _package?: Element | undefined;
      
      alternateMaterial?: Array<CodeableConcept> | undefined;
      _alternateMaterial?: Element[] | undefined;
      
      containedItem?: Array<BackboneElement> | undefined;
      _containedItem?: Element[] | undefined;
      
      amount?: Quantity | undefined;
      _amount?: Element | undefined;
      
      item: CodeableReference;
      _item?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      manufacturer?: Array<Reference> | undefined;
      _manufacturer?: Element[] | undefined;
      
      material?: Array<CodeableConcept> | undefined;
      _material?: Element[] | undefined;
      
      package?: Array<undefined> | undefined;
      _package?: Element[] | undefined;
      
      property?: Array<BackboneElement> | undefined;
      _property?: Element[] | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      value[x]?: CodeableConcept | Quantity | date | boolean | Attachment | undefined;
      _value[x]?: Element | undefined;
      
      quantity?: integer | undefined;
      _quantity?: Element | undefined;
      
      shelfLifeStorage?: Array<BackboneElement> | undefined;
      _shelfLifeStorage?: Element[] | undefined;
      
      period[x]?: Duration | string | undefined;
      _period[x]?: Element | undefined;
      
      specialPrecautionsForStorage?: Array<CodeableConcept> | undefined;
      _specialPrecautionsForStorage?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      packageFor?: Array<Reference> | undefined;
      _packageFor?: Element[] | undefined;
      
      status?: CodeableConcept | undefined;
      _status?: Element | undefined;
      
      statusDate?: dateTime | undefined;
      _statusDate?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
    }

  


  
    /**
 * ParameterDefinition
 * 
 * Base StructureDefinition for ParameterDefinition Type: The parameters to the
 * module. This collection specifies both the input and output parameters. Input
 * parameters are provided by the caller as part of the $evaluate operation. Output
 * parameters are included in the GuidanceResponse.
 * 
 * @see {@link http://hl7.org/fhir/R4B/ParameterDefinition.html}
 */
    export interface ParameterDefinition extends Element {
      
      readonly resourceType: string;
      


      
      documentation?: string | undefined;
      _documentation?: Element | undefined;
      
      max?: string | undefined;
      _max?: Element | undefined;
      
      min?: integer | undefined;
      _min?: Element | undefined;
      
      name?: code | undefined;
      _name?: Element | undefined;
      
      profile?: canonical | undefined;
      _profile?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      use: code;
      _use?: Element | undefined;
      
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
      
      readonly resourceType: string;
      


      
      parameter?: Array<BackboneElement> | undefined;
      _parameter?: Element[] | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      part?: Array<undefined> | undefined;
      _part?: Element[] | undefined;
      
      resource?: Resource | undefined;
      _resource?: Element | undefined;
      
      value[x]?: base64Binary | boolean | canonical | code | date | dateTime | decimal | id | instant | integer | markdown | oid | positiveInt | string | time | unsignedInt | uri | url | uuid | Address | Age | Annotation | Attachment | CodeableConcept | Coding | ContactPoint | Count | Distance | Duration | HumanName | Identifier | Money | Period | Quantity | Range | Ratio | Reference | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage | Meta | undefined;
      _value[x]?: Element | undefined;
      
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
      
      readonly resourceType: "Patient";
      


      
      active?: boolean | undefined;
      _active?: Element | undefined;
      
      address?: Array<Address> | undefined;
      _address?: Element[] | undefined;
      
      birthDate?: date | undefined;
      _birthDate?: Element | undefined;
      
      communication?: Array<BackboneElement> | undefined;
      _communication?: Element[] | undefined;
      
      language: CodeableConcept;
      _language?: Element | undefined;
      
      preferred?: boolean | undefined;
      _preferred?: Element | undefined;
      
      contact?: Array<BackboneElement> | undefined;
      _contact?: Element[] | undefined;
      
      address?: Address | undefined;
      _address?: Element | undefined;
      
      gender?: code | undefined;
      _gender?: Element | undefined;
      
      name?: HumanName | undefined;
      _name?: Element | undefined;
      
      organization?: Reference | undefined;
      _organization?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      relationship?: Array<CodeableConcept> | undefined;
      _relationship?: Element[] | undefined;
      
      telecom?: Array<ContactPoint> | undefined;
      _telecom?: Element[] | undefined;
      
      deceased[x]?: boolean | dateTime | undefined;
      _deceased[x]?: Element | undefined;
      
      gender?: code | undefined;
      _gender?: Element | undefined;
      
      generalPractitioner?: Array<Reference> | undefined;
      _generalPractitioner?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      link?: Array<BackboneElement> | undefined;
      _link?: Element[] | undefined;
      
      other: Reference;
      _other?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      managingOrganization?: Reference | undefined;
      _managingOrganization?: Element | undefined;
      
      maritalStatus?: CodeableConcept | undefined;
      _maritalStatus?: Element | undefined;
      
      multipleBirth[x]?: boolean | integer | undefined;
      _multipleBirth[x]?: Element | undefined;
      
      name?: Array<HumanName> | undefined;
      _name?: Element[] | undefined;
      
      photo?: Array<Attachment> | undefined;
      _photo?: Element[] | undefined;
      
      telecom?: Array<ContactPoint> | undefined;
      _telecom?: Element[] | undefined;
      
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
      
      readonly resourceType: "PaymentNotice";
      


      
      amount: Money;
      _amount?: Element | undefined;
      
      created: dateTime;
      _created?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      payee?: Reference | undefined;
      _payee?: Element | undefined;
      
      payment: Reference;
      _payment?: Element | undefined;
      
      paymentDate?: date | undefined;
      _paymentDate?: Element | undefined;
      
      paymentStatus?: CodeableConcept | undefined;
      _paymentStatus?: Element | undefined;
      
      provider?: Reference | undefined;
      _provider?: Element | undefined;
      
      recipient: Reference;
      _recipient?: Element | undefined;
      
      request?: Reference | undefined;
      _request?: Element | undefined;
      
      response?: Reference | undefined;
      _response?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
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
      
      readonly resourceType: "PaymentReconciliation";
      


      
      created: dateTime;
      _created?: Element | undefined;
      
      detail?: Array<BackboneElement> | undefined;
      _detail?: Element[] | undefined;
      
      amount?: Money | undefined;
      _amount?: Element | undefined;
      
      date?: date | undefined;
      _date?: Element | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      payee?: Reference | undefined;
      _payee?: Element | undefined;
      
      predecessor?: Identifier | undefined;
      _predecessor?: Element | undefined;
      
      request?: Reference | undefined;
      _request?: Element | undefined;
      
      response?: Reference | undefined;
      _response?: Element | undefined;
      
      responsible?: Reference | undefined;
      _responsible?: Element | undefined;
      
      submitter?: Reference | undefined;
      _submitter?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      disposition?: string | undefined;
      _disposition?: Element | undefined;
      
      formCode?: CodeableConcept | undefined;
      _formCode?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      outcome?: code | undefined;
      _outcome?: Element | undefined;
      
      paymentAmount: Money;
      _paymentAmount?: Element | undefined;
      
      paymentDate: date;
      _paymentDate?: Element | undefined;
      
      paymentIdentifier?: Identifier | undefined;
      _paymentIdentifier?: Element | undefined;
      
      paymentIssuer?: Reference | undefined;
      _paymentIssuer?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      processNote?: Array<BackboneElement> | undefined;
      _processNote?: Element[] | undefined;
      
      text?: string | undefined;
      _text?: Element | undefined;
      
      type?: code | undefined;
      _type?: Element | undefined;
      
      request?: Reference | undefined;
      _request?: Element | undefined;
      
      requestor?: Reference | undefined;
      _requestor?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
    }

  


  


  


  


  
    /**
 * Period
 * 
 * Base StructureDefinition for Period Type: A time period defined by a start and
 * end date and optionally time.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Period.html}
 */
    export interface Period extends Element {
      
      readonly resourceType: string;
      


      
      end?: dateTime | undefined;
      _end?: Element | undefined;
      
      start?: dateTime | undefined;
      _start?: Element | undefined;
      
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
      
      readonly resourceType: "Person";
      


      
      active?: boolean | undefined;
      _active?: Element | undefined;
      
      address?: Array<Address> | undefined;
      _address?: Element[] | undefined;
      
      birthDate?: date | undefined;
      _birthDate?: Element | undefined;
      
      gender?: code | undefined;
      _gender?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      link?: Array<BackboneElement> | undefined;
      _link?: Element[] | undefined;
      
      assurance?: code | undefined;
      _assurance?: Element | undefined;
      
      target: Reference;
      _target?: Element | undefined;
      
      managingOrganization?: Reference | undefined;
      _managingOrganization?: Element | undefined;
      
      name?: Array<HumanName> | undefined;
      _name?: Element[] | undefined;
      
      photo?: Attachment | undefined;
      _photo?: Element | undefined;
      
      telecom?: Array<ContactPoint> | undefined;
      _telecom?: Element[] | undefined;
      
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
      
      readonly resourceType: "PlanDefinition";
      


      
      action?: Array<BackboneElement> | undefined;
      _action?: Element[] | undefined;
      
      action?: Array<undefined> | undefined;
      _action?: Element[] | undefined;
      
      cardinalityBehavior?: code | undefined;
      _cardinalityBehavior?: Element | undefined;
      
      code?: Array<CodeableConcept> | undefined;
      _code?: Element[] | undefined;
      
      condition?: Array<BackboneElement> | undefined;
      _condition?: Element[] | undefined;
      
      expression?: Expression | undefined;
      _expression?: Element | undefined;
      
      kind: code;
      _kind?: Element | undefined;
      
      definition[x]?: canonical | uri | undefined;
      _definition[x]?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      documentation?: Array<RelatedArtifact> | undefined;
      _documentation?: Element[] | undefined;
      
      dynamicValue?: Array<BackboneElement> | undefined;
      _dynamicValue?: Element[] | undefined;
      
      expression?: Expression | undefined;
      _expression?: Element | undefined;
      
      path?: string | undefined;
      _path?: Element | undefined;
      
      goalId?: Array<id> | undefined;
      _goalId?: Element[] | undefined;
      
      groupingBehavior?: code | undefined;
      _groupingBehavior?: Element | undefined;
      
      input?: Array<DataRequirement> | undefined;
      _input?: Element[] | undefined;
      
      output?: Array<DataRequirement> | undefined;
      _output?: Element[] | undefined;
      
      participant?: Array<BackboneElement> | undefined;
      _participant?: Element[] | undefined;
      
      role?: CodeableConcept | undefined;
      _role?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      precheckBehavior?: code | undefined;
      _precheckBehavior?: Element | undefined;
      
      prefix?: string | undefined;
      _prefix?: Element | undefined;
      
      priority?: code | undefined;
      _priority?: Element | undefined;
      
      reason?: Array<CodeableConcept> | undefined;
      _reason?: Element[] | undefined;
      
      relatedAction?: Array<BackboneElement> | undefined;
      _relatedAction?: Element[] | undefined;
      
      actionId: id;
      _actionId?: Element | undefined;
      
      offset[x]?: Duration | Range | undefined;
      _offset[x]?: Element | undefined;
      
      relationship: code;
      _relationship?: Element | undefined;
      
      requiredBehavior?: code | undefined;
      _requiredBehavior?: Element | undefined;
      
      selectionBehavior?: code | undefined;
      _selectionBehavior?: Element | undefined;
      
      subject[x]?: CodeableConcept | Reference | canonical | undefined;
      _subject[x]?: Element | undefined;
      
      textEquivalent?: string | undefined;
      _textEquivalent?: Element | undefined;
      
      timing[x]?: dateTime | Age | Period | Duration | Range | Timing | undefined;
      _timing[x]?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      transform?: canonical | undefined;
      _transform?: Element | undefined;
      
      trigger?: Array<TriggerDefinition> | undefined;
      _trigger?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      approvalDate?: date | undefined;
      _approvalDate?: Element | undefined;
      
      author?: Array<ContactDetail> | undefined;
      _author?: Element[] | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      editor?: Array<ContactDetail> | undefined;
      _editor?: Element[] | undefined;
      
      effectivePeriod?: Period | undefined;
      _effectivePeriod?: Element | undefined;
      
      endorser?: Array<ContactDetail> | undefined;
      _endorser?: Element[] | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      goal?: Array<BackboneElement> | undefined;
      _goal?: Element[] | undefined;
      
      addresses?: Array<CodeableConcept> | undefined;
      _addresses?: Element[] | undefined;
      
      category?: CodeableConcept | undefined;
      _category?: Element | undefined;
      
      description: CodeableConcept;
      _description?: Element | undefined;
      
      documentation?: Array<RelatedArtifact> | undefined;
      _documentation?: Element[] | undefined;
      
      priority?: CodeableConcept | undefined;
      _priority?: Element | undefined;
      
      start?: CodeableConcept | undefined;
      _start?: Element | undefined;
      
      target?: Array<BackboneElement> | undefined;
      _target?: Element[] | undefined;
      
      detail[x]?: Quantity | Range | CodeableConcept | undefined;
      _detail[x]?: Element | undefined;
      
      due?: Duration | undefined;
      _due?: Element | undefined;
      
      measure?: CodeableConcept | undefined;
      _measure?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      lastReviewDate?: date | undefined;
      _lastReviewDate?: Element | undefined;
      
      library?: Array<canonical> | undefined;
      _library?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      relatedArtifact?: Array<RelatedArtifact> | undefined;
      _relatedArtifact?: Element[] | undefined;
      
      reviewer?: Array<ContactDetail> | undefined;
      _reviewer?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject[x]?: CodeableConcept | Reference | canonical | undefined;
      _subject[x]?: Element | undefined;
      
      subtitle?: string | undefined;
      _subtitle?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      topic?: Array<CodeableConcept> | undefined;
      _topic?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      usage?: string | undefined;
      _usage?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
    }

  


  
    /**
 * Population
 * 
 * Base StructureDefinition for Population Type: A populatioof people with some set
 * of grouping criteria.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Population.html}
 */
    export interface Population extends BackboneElement {
      
      readonly resourceType: string;
      


      
      age[x]?: Range | CodeableConcept | undefined;
      _age[x]?: Element | undefined;
      
      gender?: CodeableConcept | undefined;
      _gender?: Element | undefined;
      
      physiologicalCondition?: CodeableConcept | undefined;
      _physiologicalCondition?: Element | undefined;
      
      race?: CodeableConcept | undefined;
      _race?: Element | undefined;
      
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
      
      readonly resourceType: "Practitioner";
      


      
      active?: boolean | undefined;
      _active?: Element | undefined;
      
      address?: Array<Address> | undefined;
      _address?: Element[] | undefined;
      
      birthDate?: date | undefined;
      _birthDate?: Element | undefined;
      
      communication?: Array<CodeableConcept> | undefined;
      _communication?: Element[] | undefined;
      
      gender?: code | undefined;
      _gender?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      name?: Array<HumanName> | undefined;
      _name?: Element[] | undefined;
      
      photo?: Array<Attachment> | undefined;
      _photo?: Element[] | undefined;
      
      qualification?: Array<BackboneElement> | undefined;
      _qualification?: Element[] | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      issuer?: Reference | undefined;
      _issuer?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      telecom?: Array<ContactPoint> | undefined;
      _telecom?: Element[] | undefined;
      
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
      
      readonly resourceType: "PractitionerRole";
      


      
      active?: boolean | undefined;
      _active?: Element | undefined;
      
      availabilityExceptions?: string | undefined;
      _availabilityExceptions?: Element | undefined;
      
      availableTime?: Array<BackboneElement> | undefined;
      _availableTime?: Element[] | undefined;
      
      allDay?: boolean | undefined;
      _allDay?: Element | undefined;
      
      availableEndTime?: time | undefined;
      _availableEndTime?: Element | undefined;
      
      availableStartTime?: time | undefined;
      _availableStartTime?: Element | undefined;
      
      daysOfWeek?: Array<code> | undefined;
      _daysOfWeek?: Element[] | undefined;
      
      code?: Array<CodeableConcept> | undefined;
      _code?: Element[] | undefined;
      
      endpoint?: Array<Reference> | undefined;
      _endpoint?: Element[] | undefined;
      
      healthcareService?: Array<Reference> | undefined;
      _healthcareService?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      location?: Array<Reference> | undefined;
      _location?: Element[] | undefined;
      
      notAvailable?: Array<BackboneElement> | undefined;
      _notAvailable?: Element[] | undefined;
      
      description: string;
      _description?: Element | undefined;
      
      during?: Period | undefined;
      _during?: Element | undefined;
      
      organization?: Reference | undefined;
      _organization?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      practitioner?: Reference | undefined;
      _practitioner?: Element | undefined;
      
      specialty?: Array<CodeableConcept> | undefined;
      _specialty?: Element[] | undefined;
      
      telecom?: Array<ContactPoint> | undefined;
      _telecom?: Element[] | undefined;
      
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
      
      readonly resourceType: "Procedure";
      


      
      asserter?: Reference | undefined;
      _asserter?: Element | undefined;
      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      bodySite?: Array<CodeableConcept> | undefined;
      _bodySite?: Element[] | undefined;
      
      category?: CodeableConcept | undefined;
      _category?: Element | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      complication?: Array<CodeableConcept> | undefined;
      _complication?: Element[] | undefined;
      
      complicationDetail?: Array<Reference> | undefined;
      _complicationDetail?: Element[] | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      focalDevice?: Array<BackboneElement> | undefined;
      _focalDevice?: Element[] | undefined;
      
      action?: CodeableConcept | undefined;
      _action?: Element | undefined;
      
      manipulated: Reference;
      _manipulated?: Element | undefined;
      
      followUp?: Array<CodeableConcept> | undefined;
      _followUp?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      instantiatesCanonical?: Array<canonical> | undefined;
      _instantiatesCanonical?: Element[] | undefined;
      
      instantiatesUri?: Array<uri> | undefined;
      _instantiatesUri?: Element[] | undefined;
      
      location?: Reference | undefined;
      _location?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      outcome?: CodeableConcept | undefined;
      _outcome?: Element | undefined;
      
      partOf?: Array<Reference> | undefined;
      _partOf?: Element[] | undefined;
      
      performed[x]?: dateTime | Period | string | Age | Range | undefined;
      _performed[x]?: Element | undefined;
      
      performer?: Array<BackboneElement> | undefined;
      _performer?: Element[] | undefined;
      
      actor: Reference;
      _actor?: Element | undefined;
      
      function?: CodeableConcept | undefined;
      _function?: Element | undefined;
      
      onBehalfOf?: Reference | undefined;
      _onBehalfOf?: Element | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      recorder?: Reference | undefined;
      _recorder?: Element | undefined;
      
      report?: Array<Reference> | undefined;
      _report?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      statusReason?: CodeableConcept | undefined;
      _statusReason?: Element | undefined;
      
      subject: Reference;
      _subject?: Element | undefined;
      
      usedCode?: Array<CodeableConcept> | undefined;
      _usedCode?: Element[] | undefined;
      
      usedReference?: Array<Reference> | undefined;
      _usedReference?: Element[] | undefined;
      
    }

  


  


  
    /**
 * ProdCharacteristic
 * 
 * Base StructureDefinition for ProdCharacteristic Type: The marketing status
 * describes the date when a medicinal product is actually put on the market or the
 * date as of which it is no longer available.
 * 
 * @see {@link http://hl7.org/fhir/R4B/ProdCharacteristic.html}
 */
    export interface ProdCharacteristic extends BackboneElement {
      
      readonly resourceType: string;
      


      
      color?: Array<string> | undefined;
      _color?: Element[] | undefined;
      
      depth?: Quantity | undefined;
      _depth?: Element | undefined;
      
      externalDiameter?: Quantity | undefined;
      _externalDiameter?: Element | undefined;
      
      height?: Quantity | undefined;
      _height?: Element | undefined;
      
      image?: Array<Attachment> | undefined;
      _image?: Element[] | undefined;
      
      imprint?: Array<string> | undefined;
      _imprint?: Element[] | undefined;
      
      nominalVolume?: Quantity | undefined;
      _nominalVolume?: Element | undefined;
      
      scoring?: CodeableConcept | undefined;
      _scoring?: Element | undefined;
      
      shape?: string | undefined;
      _shape?: Element | undefined;
      
      weight?: Quantity | undefined;
      _weight?: Element | undefined;
      
      width?: Quantity | undefined;
      _width?: Element | undefined;
      
    }

  


  
    /**
 * ProductShelfLife
 * 
 * Base StructureDefinition for ProductShelfLife Type: The shelf-life and storage
 * information for a medicinal product item or container can be described using
 * this class.
 * 
 * @see {@link http://hl7.org/fhir/R4B/ProductShelfLife.html}
 */
    export interface ProductShelfLife extends BackboneElement {
      
      readonly resourceType: string;
      


      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      period: Quantity;
      _period?: Element | undefined;
      
      specialPrecautionsForStorage?: Array<CodeableConcept> | undefined;
      _specialPrecautionsForStorage?: Element[] | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
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
      
      readonly resourceType: "Provenance";
      


      
      activity?: CodeableConcept | undefined;
      _activity?: Element | undefined;
      
      agent: Array<BackboneElement>;
      _agent?: Element[] | undefined;
      
      onBehalfOf?: Reference | undefined;
      _onBehalfOf?: Element | undefined;
      
      role?: Array<CodeableConcept> | undefined;
      _role?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      who: Reference;
      _who?: Element | undefined;
      
      entity?: Array<BackboneElement> | undefined;
      _entity?: Element[] | undefined;
      
      agent?: Array<undefined> | undefined;
      _agent?: Element[] | undefined;
      
      role: code;
      _role?: Element | undefined;
      
      what: Reference;
      _what?: Element | undefined;
      
      location?: Reference | undefined;
      _location?: Element | undefined;
      
      occurred[x]?: Period | dateTime | undefined;
      _occurred[x]?: Element | undefined;
      
      policy?: Array<uri> | undefined;
      _policy?: Element[] | undefined;
      
      reason?: Array<CodeableConcept> | undefined;
      _reason?: Element[] | undefined;
      
      recorded: instant;
      _recorded?: Element | undefined;
      
      signature?: Array<Signature> | undefined;
      _signature?: Element[] | undefined;
      
      target: Array<Reference>;
      _target?: Element[] | undefined;
      
    }

  


  


  


  
    /**
 * Quantity
 * 
 * Base StructureDefinition for Quantity Type: A measured amount (or an amount that
 * can potentially be measured). Note that measured amounts include amounts that
 * are not precisely quantified, including amounts involving arbitrary units and
 * floating currencies.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Quantity.html}
 */
    export interface Quantity extends Element {
      
      readonly resourceType: string;
      


      
      code?: code | undefined;
      _code?: Element | undefined;
      
      comparator?: code | undefined;
      _comparator?: Element | undefined;
      
      system?: uri | undefined;
      _system?: Element | undefined;
      
      unit?: string | undefined;
      _unit?: Element | undefined;
      
      value?: decimal | undefined;
      _value?: Element | undefined;
      
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
      
      readonly resourceType: "Questionnaire";
      


      
      approvalDate?: date | undefined;
      _approvalDate?: Element | undefined;
      
      code?: Array<Coding> | undefined;
      _code?: Element[] | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      derivedFrom?: Array<canonical> | undefined;
      _derivedFrom?: Element[] | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      effectivePeriod?: Period | undefined;
      _effectivePeriod?: Element | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      item?: Array<BackboneElement> | undefined;
      _item?: Element[] | undefined;
      
      answerOption?: Array<BackboneElement> | undefined;
      _answerOption?: Element[] | undefined;
      
      initialSelected?: boolean | undefined;
      _initialSelected?: Element | undefined;
      
      value[x]: integer | date | time | string | Coding | Reference;
      _value[x]?: Element | undefined;
      
      answerValueSet?: canonical | undefined;
      _answerValueSet?: Element | undefined;
      
      code?: Array<Coding> | undefined;
      _code?: Element[] | undefined;
      
      definition?: uri | undefined;
      _definition?: Element | undefined;
      
      enableBehavior?: code | undefined;
      _enableBehavior?: Element | undefined;
      
      enableWhen?: Array<BackboneElement> | undefined;
      _enableWhen?: Element[] | undefined;
      
      answer[x]: boolean | decimal | integer | date | dateTime | time | string | Coding | Quantity | Reference;
      _answer[x]?: Element | undefined;
      
      operator: code;
      _operator?: Element | undefined;
      
      question: string;
      _question?: Element | undefined;
      
      initial?: Array<BackboneElement> | undefined;
      _initial?: Element[] | undefined;
      
      value[x]: boolean | decimal | integer | date | dateTime | time | string | uri | Attachment | Coding | Quantity | Reference;
      _value[x]?: Element | undefined;
      
      item?: Array<undefined> | undefined;
      _item?: Element[] | undefined;
      
      linkId: string;
      _linkId?: Element | undefined;
      
      maxLength?: integer | undefined;
      _maxLength?: Element | undefined;
      
      prefix?: string | undefined;
      _prefix?: Element | undefined;
      
      readOnly?: boolean | undefined;
      _readOnly?: Element | undefined;
      
      repeats?: boolean | undefined;
      _repeats?: Element | undefined;
      
      required?: boolean | undefined;
      _required?: Element | undefined;
      
      text?: string | undefined;
      _text?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      lastReviewDate?: date | undefined;
      _lastReviewDate?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subjectType?: Array<code> | undefined;
      _subjectType?: Element[] | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "QuestionnaireResponse";
      


      
      author?: Reference | undefined;
      _author?: Element | undefined;
      
      authored?: dateTime | undefined;
      _authored?: Element | undefined;
      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      item?: Array<BackboneElement> | undefined;
      _item?: Element[] | undefined;
      
      answer?: Array<BackboneElement> | undefined;
      _answer?: Element[] | undefined;
      
      item?: Array<undefined> | undefined;
      _item?: Element[] | undefined;
      
      value[x]?: boolean | decimal | integer | date | dateTime | time | string | uri | Attachment | Coding | Quantity | Reference | undefined;
      _value[x]?: Element | undefined;
      
      definition?: uri | undefined;
      _definition?: Element | undefined;
      
      item?: Array<undefined> | undefined;
      _item?: Element[] | undefined;
      
      linkId: string;
      _linkId?: Element | undefined;
      
      text?: string | undefined;
      _text?: Element | undefined;
      
      partOf?: Array<Reference> | undefined;
      _partOf?: Element[] | undefined;
      
      questionnaire?: canonical | undefined;
      _questionnaire?: Element | undefined;
      
      source?: Reference | undefined;
      _source?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject?: Reference | undefined;
      _subject?: Element | undefined;
      
    }

  


  
    /**
 * Range
 * 
 * Base StructureDefinition for Range Type: A set of ordered Quantities defined by
 * a low and high limit.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Range.html}
 */
    export interface Range extends Element {
      
      readonly resourceType: string;
      


      
      high?: Quantity | undefined;
      _high?: Element | undefined;
      
      low?: Quantity | undefined;
      _low?: Element | undefined;
      
    }

  


  
    /**
 * Ratio
 * 
 * Base StructureDefinition for Ratio Type: A relationship of two Quantity values -
 * expressed as a numerator and a denominator.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Ratio.html}
 */
    export interface Ratio extends Element {
      
      readonly resourceType: string;
      


      
      denominator?: Quantity | undefined;
      _denominator?: Element | undefined;
      
      numerator?: Quantity | undefined;
      _numerator?: Element | undefined;
      
    }

  


  
    /**
 * RatioRange
 * 
 * Base StructureDefinition for RatioRange Type: A range of ratios expressed as a
 * low and high numerator and a denominator.
 * 
 * @see {@link http://hl7.org/fhir/R4B/RatioRange.html}
 */
    export interface RatioRange extends Element {
      
      readonly resourceType: string;
      


      
      denominator?: Quantity | undefined;
      _denominator?: Element | undefined;
      
      highNumerator?: Quantity | undefined;
      _highNumerator?: Element | undefined;
      
      lowNumerator?: Quantity | undefined;
      _lowNumerator?: Element | undefined;
      
    }

  


  


  


  


  


  


  


  


  


  


  


  


  


  
    /**
 * Reference
 * 
 * Base StructureDefinition for Reference Type: A reference from one resource to
 * another.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Reference.html}
 */
    export interface Reference extends Element {
      
      readonly resourceType: string;
      


      
      display?: string | undefined;
      _display?: Element | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      reference?: string | undefined;
      _reference?: Element | undefined;
      
      type?: uri | undefined;
      _type?: Element | undefined;
      
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
      
      readonly resourceType: "RegulatedAuthorization";
      


      
      basis?: Array<CodeableConcept> | undefined;
      _basis?: Element[] | undefined;
      
      case?: BackboneElement | undefined;
      _case?: Element | undefined;
      
      application?: Array<undefined> | undefined;
      _application?: Element[] | undefined;
      
      date[x]?: Period | dateTime | undefined;
      _date[x]?: Element | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      status?: CodeableConcept | undefined;
      _status?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      holder?: Reference | undefined;
      _holder?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      indication?: CodeableReference | undefined;
      _indication?: Element | undefined;
      
      intendedUse?: CodeableConcept | undefined;
      _intendedUse?: Element | undefined;
      
      region?: Array<CodeableConcept> | undefined;
      _region?: Element[] | undefined;
      
      regulator?: Reference | undefined;
      _regulator?: Element | undefined;
      
      status?: CodeableConcept | undefined;
      _status?: Element | undefined;
      
      statusDate?: dateTime | undefined;
      _statusDate?: Element | undefined;
      
      subject?: Array<Reference> | undefined;
      _subject?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      validityPeriod?: Period | undefined;
      _validityPeriod?: Element | undefined;
      
    }

  


  


  


  
    /**
 * RelatedArtifact
 * 
 * Base StructureDefinition for RelatedArtifact Type: Related artifacts such as
 * additional documentation, justification, or bibliographic references.
 * 
 * @see {@link http://hl7.org/fhir/R4B/RelatedArtifact.html}
 */
    export interface RelatedArtifact extends Element {
      
      readonly resourceType: string;
      


      
      citation?: markdown | undefined;
      _citation?: Element | undefined;
      
      display?: string | undefined;
      _display?: Element | undefined;
      
      document?: Attachment | undefined;
      _document?: Element | undefined;
      
      label?: string | undefined;
      _label?: Element | undefined;
      
      resource?: canonical | undefined;
      _resource?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      url?: url | undefined;
      _url?: Element | undefined;
      
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
      
      readonly resourceType: "RelatedPerson";
      


      
      active?: boolean | undefined;
      _active?: Element | undefined;
      
      address?: Array<Address> | undefined;
      _address?: Element[] | undefined;
      
      birthDate?: date | undefined;
      _birthDate?: Element | undefined;
      
      communication?: Array<BackboneElement> | undefined;
      _communication?: Element[] | undefined;
      
      language: CodeableConcept;
      _language?: Element | undefined;
      
      preferred?: boolean | undefined;
      _preferred?: Element | undefined;
      
      gender?: code | undefined;
      _gender?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      name?: Array<HumanName> | undefined;
      _name?: Element[] | undefined;
      
      patient: Reference;
      _patient?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      photo?: Array<Attachment> | undefined;
      _photo?: Element[] | undefined;
      
      relationship?: Array<CodeableConcept> | undefined;
      _relationship?: Element[] | undefined;
      
      telecom?: Array<ContactPoint> | undefined;
      _telecom?: Element[] | undefined;
      
    }

  


  


  


  


  


  


  


  


  


  


  


  


  


  
    /**
 * Request
 * 
 * Logical Model: A pattern to be followed by resources that represent a specific
 * proposal, plan and/or order for some sort of action or service.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Request.html}
 */
    export interface Request {
      
      readonly resourceType: string;
      


      
      authoredOn?: dateTime | undefined;
      _authoredOn?: Element | undefined;
      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      doNotPerform?: boolean | undefined;
      _doNotPerform?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      groupIdentifier?: Identifier | undefined;
      _groupIdentifier?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      instantiatesCanonical?: Array<canonical> | undefined;
      _instantiatesCanonical?: Element[] | undefined;
      
      instantiatesUri?: Array<uri> | undefined;
      _instantiatesUri?: Element[] | undefined;
      
      insurance?: Array<Reference> | undefined;
      _insurance?: Element[] | undefined;
      
      intent: code;
      _intent?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      occurrence[x]?: dateTime | Period | Timing | undefined;
      _occurrence[x]?: Element | undefined;
      
      performer?: Reference | undefined;
      _performer?: Element | undefined;
      
      performerType?: CodeableConcept | undefined;
      _performerType?: Element | undefined;
      
      priority?: code | undefined;
      _priority?: Element | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      relevantHistory?: Array<Reference> | undefined;
      _relevantHistory?: Element[] | undefined;
      
      replaces?: Array<Reference> | undefined;
      _replaces?: Element[] | undefined;
      
      reported[x]?: boolean | Reference | undefined;
      _reported[x]?: Element | undefined;
      
      requester?: Reference | undefined;
      _requester?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      statusReason?: CodeableConcept | undefined;
      _statusReason?: Element | undefined;
      
      subject: Reference;
      _subject?: Element | undefined;
      
      supportingInfo?: Array<Reference> | undefined;
      _supportingInfo?: Element[] | undefined;
      
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
      
      readonly resourceType: "RequestGroup";
      


      
      action?: Array<BackboneElement> | undefined;
      _action?: Element[] | undefined;
      
      action?: Array<undefined> | undefined;
      _action?: Element[] | undefined;
      
      cardinalityBehavior?: code | undefined;
      _cardinalityBehavior?: Element | undefined;
      
      code?: Array<CodeableConcept> | undefined;
      _code?: Element[] | undefined;
      
      condition?: Array<BackboneElement> | undefined;
      _condition?: Element[] | undefined;
      
      expression?: Expression | undefined;
      _expression?: Element | undefined;
      
      kind: code;
      _kind?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      documentation?: Array<RelatedArtifact> | undefined;
      _documentation?: Element[] | undefined;
      
      groupingBehavior?: code | undefined;
      _groupingBehavior?: Element | undefined;
      
      participant?: Array<Reference> | undefined;
      _participant?: Element[] | undefined;
      
      precheckBehavior?: code | undefined;
      _precheckBehavior?: Element | undefined;
      
      prefix?: string | undefined;
      _prefix?: Element | undefined;
      
      priority?: code | undefined;
      _priority?: Element | undefined;
      
      relatedAction?: Array<BackboneElement> | undefined;
      _relatedAction?: Element[] | undefined;
      
      actionId: id;
      _actionId?: Element | undefined;
      
      offset[x]?: Duration | Range | undefined;
      _offset[x]?: Element | undefined;
      
      relationship: code;
      _relationship?: Element | undefined;
      
      requiredBehavior?: code | undefined;
      _requiredBehavior?: Element | undefined;
      
      resource?: Reference | undefined;
      _resource?: Element | undefined;
      
      selectionBehavior?: code | undefined;
      _selectionBehavior?: Element | undefined;
      
      textEquivalent?: string | undefined;
      _textEquivalent?: Element | undefined;
      
      timing[x]?: dateTime | Age | Period | Duration | Range | Timing | undefined;
      _timing[x]?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      author?: Reference | undefined;
      _author?: Element | undefined;
      
      authoredOn?: dateTime | undefined;
      _authoredOn?: Element | undefined;
      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      groupIdentifier?: Identifier | undefined;
      _groupIdentifier?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      instantiatesCanonical?: Array<canonical> | undefined;
      _instantiatesCanonical?: Element[] | undefined;
      
      instantiatesUri?: Array<uri> | undefined;
      _instantiatesUri?: Element[] | undefined;
      
      intent: code;
      _intent?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      priority?: code | undefined;
      _priority?: Element | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      replaces?: Array<Reference> | undefined;
      _replaces?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject?: Reference | undefined;
      _subject?: Element | undefined;
      
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
      
      readonly resourceType: "ResearchDefinition";
      


      
      approvalDate?: date | undefined;
      _approvalDate?: Element | undefined;
      
      author?: Array<ContactDetail> | undefined;
      _author?: Element[] | undefined;
      
      comment?: Array<string> | undefined;
      _comment?: Element[] | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      editor?: Array<ContactDetail> | undefined;
      _editor?: Element[] | undefined;
      
      effectivePeriod?: Period | undefined;
      _effectivePeriod?: Element | undefined;
      
      endorser?: Array<ContactDetail> | undefined;
      _endorser?: Element[] | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      exposure?: Reference | undefined;
      _exposure?: Element | undefined;
      
      exposureAlternative?: Reference | undefined;
      _exposureAlternative?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      lastReviewDate?: date | undefined;
      _lastReviewDate?: Element | undefined;
      
      library?: Array<canonical> | undefined;
      _library?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      outcome?: Reference | undefined;
      _outcome?: Element | undefined;
      
      population: Reference;
      _population?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      relatedArtifact?: Array<RelatedArtifact> | undefined;
      _relatedArtifact?: Element[] | undefined;
      
      reviewer?: Array<ContactDetail> | undefined;
      _reviewer?: Element[] | undefined;
      
      shortTitle?: string | undefined;
      _shortTitle?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject[x]?: CodeableConcept | Reference | undefined;
      _subject[x]?: Element | undefined;
      
      subtitle?: string | undefined;
      _subtitle?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      topic?: Array<CodeableConcept> | undefined;
      _topic?: Element[] | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      usage?: string | undefined;
      _usage?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "ResearchElementDefinition";
      


      
      approvalDate?: date | undefined;
      _approvalDate?: Element | undefined;
      
      author?: Array<ContactDetail> | undefined;
      _author?: Element[] | undefined;
      
      characteristic: Array<BackboneElement>;
      _characteristic?: Element[] | undefined;
      
      definition[x]: CodeableConcept | canonical | Expression | DataRequirement;
      _definition[x]?: Element | undefined;
      
      exclude?: boolean | undefined;
      _exclude?: Element | undefined;
      
      participantEffective[x]?: dateTime | Period | Duration | Timing | undefined;
      _participantEffective[x]?: Element | undefined;
      
      participantEffectiveDescription?: string | undefined;
      _participantEffectiveDescription?: Element | undefined;
      
      participantEffectiveGroupMeasure?: code | undefined;
      _participantEffectiveGroupMeasure?: Element | undefined;
      
      participantEffectiveTimeFromStart?: Duration | undefined;
      _participantEffectiveTimeFromStart?: Element | undefined;
      
      studyEffective[x]?: dateTime | Period | Duration | Timing | undefined;
      _studyEffective[x]?: Element | undefined;
      
      studyEffectiveDescription?: string | undefined;
      _studyEffectiveDescription?: Element | undefined;
      
      studyEffectiveGroupMeasure?: code | undefined;
      _studyEffectiveGroupMeasure?: Element | undefined;
      
      studyEffectiveTimeFromStart?: Duration | undefined;
      _studyEffectiveTimeFromStart?: Element | undefined;
      
      unitOfMeasure?: CodeableConcept | undefined;
      _unitOfMeasure?: Element | undefined;
      
      usageContext?: Array<UsageContext> | undefined;
      _usageContext?: Element[] | undefined;
      
      comment?: Array<string> | undefined;
      _comment?: Element[] | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      editor?: Array<ContactDetail> | undefined;
      _editor?: Element[] | undefined;
      
      effectivePeriod?: Period | undefined;
      _effectivePeriod?: Element | undefined;
      
      endorser?: Array<ContactDetail> | undefined;
      _endorser?: Element[] | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      lastReviewDate?: date | undefined;
      _lastReviewDate?: Element | undefined;
      
      library?: Array<canonical> | undefined;
      _library?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      relatedArtifact?: Array<RelatedArtifact> | undefined;
      _relatedArtifact?: Element[] | undefined;
      
      reviewer?: Array<ContactDetail> | undefined;
      _reviewer?: Element[] | undefined;
      
      shortTitle?: string | undefined;
      _shortTitle?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject[x]?: CodeableConcept | Reference | undefined;
      _subject[x]?: Element | undefined;
      
      subtitle?: string | undefined;
      _subtitle?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      topic?: Array<CodeableConcept> | undefined;
      _topic?: Element[] | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      usage?: string | undefined;
      _usage?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      variableType?: code | undefined;
      _variableType?: Element | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "ResearchStudy";
      


      
      arm?: Array<BackboneElement> | undefined;
      _arm?: Element[] | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      condition?: Array<CodeableConcept> | undefined;
      _condition?: Element[] | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      enrollment?: Array<Reference> | undefined;
      _enrollment?: Element[] | undefined;
      
      focus?: Array<CodeableConcept> | undefined;
      _focus?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      keyword?: Array<CodeableConcept> | undefined;
      _keyword?: Element[] | undefined;
      
      location?: Array<CodeableConcept> | undefined;
      _location?: Element[] | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      objective?: Array<BackboneElement> | undefined;
      _objective?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      partOf?: Array<Reference> | undefined;
      _partOf?: Element[] | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      phase?: CodeableConcept | undefined;
      _phase?: Element | undefined;
      
      primaryPurposeType?: CodeableConcept | undefined;
      _primaryPurposeType?: Element | undefined;
      
      principalInvestigator?: Reference | undefined;
      _principalInvestigator?: Element | undefined;
      
      protocol?: Array<Reference> | undefined;
      _protocol?: Element[] | undefined;
      
      reasonStopped?: CodeableConcept | undefined;
      _reasonStopped?: Element | undefined;
      
      relatedArtifact?: Array<RelatedArtifact> | undefined;
      _relatedArtifact?: Element[] | undefined;
      
      site?: Array<Reference> | undefined;
      _site?: Element[] | undefined;
      
      sponsor?: Reference | undefined;
      _sponsor?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
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
      
      readonly resourceType: "ResearchSubject";
      


      
      actualArm?: string | undefined;
      _actualArm?: Element | undefined;
      
      assignedArm?: string | undefined;
      _assignedArm?: Element | undefined;
      
      consent?: Reference | undefined;
      _consent?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      individual: Reference;
      _individual?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      study: Reference;
      _study?: Element | undefined;
      
    }

  


  


  
    /**
 * Resource
 * 
 * This is the base resource type for everything.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Resource.html}
 */
    export interface Resource {
      
      readonly resourceType: string;
      


      
      id?: http://hl7.org/fhirpath/System.String | undefined;
      _id?: Element | undefined;
      
      implicitRules?: uri | undefined;
      _implicitRules?: Element | undefined;
      
      language?: code | undefined;
      _language?: Element | undefined;
      
      meta?: Meta | undefined;
      _meta?: Element | undefined;
      
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
      
      readonly resourceType: "RiskAssessment";
      


      
      basedOn?: Reference | undefined;
      _basedOn?: Element | undefined;
      
      basis?: Array<Reference> | undefined;
      _basis?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      condition?: Reference | undefined;
      _condition?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      method?: CodeableConcept | undefined;
      _method?: Element | undefined;
      
      mitigation?: string | undefined;
      _mitigation?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      occurrence[x]?: dateTime | Period | undefined;
      _occurrence[x]?: Element | undefined;
      
      parent?: Reference | undefined;
      _parent?: Element | undefined;
      
      performer?: Reference | undefined;
      _performer?: Element | undefined;
      
      prediction?: Array<BackboneElement> | undefined;
      _prediction?: Element[] | undefined;
      
      outcome?: CodeableConcept | undefined;
      _outcome?: Element | undefined;
      
      probability[x]?: decimal | Range | undefined;
      _probability[x]?: Element | undefined;
      
      qualitativeRisk?: CodeableConcept | undefined;
      _qualitativeRisk?: Element | undefined;
      
      rationale?: string | undefined;
      _rationale?: Element | undefined;
      
      relativeRisk?: decimal | undefined;
      _relativeRisk?: Element | undefined;
      
      when[x]?: Period | Range | undefined;
      _when[x]?: Element | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject: Reference;
      _subject?: Element | undefined;
      
    }

  


  


  


  
    /**
 * SampledData
 * 
 * Base StructureDefinition for SampledData Type: A series of measurements taken by
 * a device, with upper and lower limits. There may be more than one dimension in
 * the data.
 * 
 * @see {@link http://hl7.org/fhir/R4B/SampledData.html}
 */
    export interface SampledData extends Element {
      
      readonly resourceType: string;
      


      
      data?: string | undefined;
      _data?: Element | undefined;
      
      dimensions: positiveInt;
      _dimensions?: Element | undefined;
      
      factor?: decimal | undefined;
      _factor?: Element | undefined;
      
      lowerLimit?: decimal | undefined;
      _lowerLimit?: Element | undefined;
      
      origin: Quantity;
      _origin?: Element | undefined;
      
      period: decimal;
      _period?: Element | undefined;
      
      upperLimit?: decimal | undefined;
      _upperLimit?: Element | undefined;
      
    }

  


  


  


  
    /**
 * Schedule
 * 
 * A container for slots of time that may be available for booking appointments.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Schedule.html}
 */
    export interface Schedule extends DomainResource {
      
      readonly resourceType: "Schedule";
      


      
      active?: boolean | undefined;
      _active?: Element | undefined;
      
      actor: Array<Reference>;
      _actor?: Element[] | undefined;
      
      comment?: string | undefined;
      _comment?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      planningHorizon?: Period | undefined;
      _planningHorizon?: Element | undefined;
      
      serviceCategory?: Array<CodeableConcept> | undefined;
      _serviceCategory?: Element[] | undefined;
      
      serviceType?: Array<CodeableConcept> | undefined;
      _serviceType?: Element[] | undefined;
      
      specialty?: Array<CodeableConcept> | undefined;
      _specialty?: Element[] | undefined;
      
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
      
      readonly resourceType: "SearchParameter";
      


      
      base: Array<code>;
      _base?: Element[] | undefined;
      
      chain?: Array<string> | undefined;
      _chain?: Element[] | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      comparator?: Array<code> | undefined;
      _comparator?: Element[] | undefined;
      
      component?: Array<BackboneElement> | undefined;
      _component?: Element[] | undefined;
      
      definition: canonical;
      _definition?: Element | undefined;
      
      expression: string;
      _expression?: Element | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      derivedFrom?: canonical | undefined;
      _derivedFrom?: Element | undefined;
      
      description: markdown;
      _description?: Element | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      expression?: string | undefined;
      _expression?: Element | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      modifier?: Array<code> | undefined;
      _modifier?: Element[] | undefined;
      
      multipleAnd?: boolean | undefined;
      _multipleAnd?: Element | undefined;
      
      multipleOr?: boolean | undefined;
      _multipleOr?: Element | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      target?: Array<code> | undefined;
      _target?: Element[] | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      url: uri;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
      xpath?: string | undefined;
      _xpath?: Element | undefined;
      
      xpathUsage?: code | undefined;
      _xpathUsage?: Element | undefined;
      
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
      
      readonly resourceType: "ServiceRequest";
      


      
      asNeeded[x]?: boolean | CodeableConcept | undefined;
      _asNeeded[x]?: Element | undefined;
      
      authoredOn?: dateTime | undefined;
      _authoredOn?: Element | undefined;
      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      bodySite?: Array<CodeableConcept> | undefined;
      _bodySite?: Element[] | undefined;
      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      doNotPerform?: boolean | undefined;
      _doNotPerform?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      instantiatesCanonical?: Array<canonical> | undefined;
      _instantiatesCanonical?: Element[] | undefined;
      
      instantiatesUri?: Array<uri> | undefined;
      _instantiatesUri?: Element[] | undefined;
      
      insurance?: Array<Reference> | undefined;
      _insurance?: Element[] | undefined;
      
      intent: code;
      _intent?: Element | undefined;
      
      locationCode?: Array<CodeableConcept> | undefined;
      _locationCode?: Element[] | undefined;
      
      locationReference?: Array<Reference> | undefined;
      _locationReference?: Element[] | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      occurrence[x]?: dateTime | Period | Timing | undefined;
      _occurrence[x]?: Element | undefined;
      
      orderDetail?: Array<CodeableConcept> | undefined;
      _orderDetail?: Element[] | undefined;
      
      patientInstruction?: string | undefined;
      _patientInstruction?: Element | undefined;
      
      performer?: Array<Reference> | undefined;
      _performer?: Element[] | undefined;
      
      performerType?: CodeableConcept | undefined;
      _performerType?: Element | undefined;
      
      priority?: code | undefined;
      _priority?: Element | undefined;
      
      quantity[x]?: Quantity | Ratio | Range | undefined;
      _quantity[x]?: Element | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      relevantHistory?: Array<Reference> | undefined;
      _relevantHistory?: Element[] | undefined;
      
      replaces?: Array<Reference> | undefined;
      _replaces?: Element[] | undefined;
      
      requester?: Reference | undefined;
      _requester?: Element | undefined;
      
      requisition?: Identifier | undefined;
      _requisition?: Element | undefined;
      
      specimen?: Array<Reference> | undefined;
      _specimen?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      subject: Reference;
      _subject?: Element | undefined;
      
      supportingInfo?: Array<Reference> | undefined;
      _supportingInfo?: Element[] | undefined;
      
    }

  


  


  


  


  


  


  


  


  


  


  
    /**
 * Signature
 * 
 * Base StructureDefinition for Signature Type: A signature along with supporting
 * context. The signature may be a digital signature that is cryptographic in
 * nature, or some other signature acceptable to the domain. This other signature
 * may be as simple as a graphical image representing a hand-written signature, or
 * a signature ceremony Different signature approaches have different utilities.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Signature.html}
 */
    export interface Signature extends Element {
      
      readonly resourceType: string;
      


      
      data?: base64Binary | undefined;
      _data?: Element | undefined;
      
      onBehalfOf?: Reference | undefined;
      _onBehalfOf?: Element | undefined;
      
      sigFormat?: code | undefined;
      _sigFormat?: Element | undefined;
      
      targetFormat?: code | undefined;
      _targetFormat?: Element | undefined;
      
      type: Array<Coding>;
      _type?: Element[] | undefined;
      
      when: instant;
      _when?: Element | undefined;
      
      who: Reference;
      _who?: Element | undefined;
      
    }

  


  


  


  


  
    /**
 * Slot
 * 
 * A slot of time on a schedule that may be available for booking appointments.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Slot.html}
 */
    export interface Slot extends DomainResource {
      
      readonly resourceType: "Slot";
      


      
      appointmentType?: CodeableConcept | undefined;
      _appointmentType?: Element | undefined;
      
      comment?: string | undefined;
      _comment?: Element | undefined;
      
      end: instant;
      _end?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      overbooked?: boolean | undefined;
      _overbooked?: Element | undefined;
      
      schedule: Reference;
      _schedule?: Element | undefined;
      
      serviceCategory?: Array<CodeableConcept> | undefined;
      _serviceCategory?: Element[] | undefined;
      
      serviceType?: Array<CodeableConcept> | undefined;
      _serviceType?: Element[] | undefined;
      
      specialty?: Array<CodeableConcept> | undefined;
      _specialty?: Element[] | undefined;
      
      start: instant;
      _start?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
    }

  


  


  


  


  


  


  
    /**
 * Specimen
 * 
 * A sample to be used for analysis.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Specimen.html}
 */
    export interface Specimen extends DomainResource {
      
      readonly resourceType: "Specimen";
      


      
      accessionIdentifier?: Identifier | undefined;
      _accessionIdentifier?: Element | undefined;
      
      collection?: BackboneElement | undefined;
      _collection?: Element | undefined;
      
      bodySite?: CodeableConcept | undefined;
      _bodySite?: Element | undefined;
      
      collected[x]?: dateTime | Period | undefined;
      _collected[x]?: Element | undefined;
      
      collector?: Reference | undefined;
      _collector?: Element | undefined;
      
      duration?: Duration | undefined;
      _duration?: Element | undefined;
      
      fastingStatus[x]?: CodeableConcept | Duration | undefined;
      _fastingStatus[x]?: Element | undefined;
      
      method?: CodeableConcept | undefined;
      _method?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      condition?: Array<CodeableConcept> | undefined;
      _condition?: Element[] | undefined;
      
      container?: Array<BackboneElement> | undefined;
      _container?: Element[] | undefined;
      
      additive[x]?: CodeableConcept | Reference | undefined;
      _additive[x]?: Element | undefined;
      
      capacity?: Quantity | undefined;
      _capacity?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      specimenQuantity?: Quantity | undefined;
      _specimenQuantity?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      parent?: Array<Reference> | undefined;
      _parent?: Element[] | undefined;
      
      processing?: Array<BackboneElement> | undefined;
      _processing?: Element[] | undefined;
      
      additive?: Array<Reference> | undefined;
      _additive?: Element[] | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      procedure?: CodeableConcept | undefined;
      _procedure?: Element | undefined;
      
      time[x]?: dateTime | Period | undefined;
      _time[x]?: Element | undefined;
      
      receivedTime?: dateTime | undefined;
      _receivedTime?: Element | undefined;
      
      request?: Array<Reference> | undefined;
      _request?: Element[] | undefined;
      
      status?: code | undefined;
      _status?: Element | undefined;
      
      subject?: Reference | undefined;
      _subject?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
    }

  


  


  
    /**
 * SpecimenDefinition
 * 
 * A kind of specimen with associated set of requirements.
 * 
 * @see {@link http://hl7.org/fhir/R4B/SpecimenDefinition.html}
 */
    export interface SpecimenDefinition extends DomainResource {
      
      readonly resourceType: "SpecimenDefinition";
      


      
      collection?: Array<CodeableConcept> | undefined;
      _collection?: Element[] | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      patientPreparation?: Array<CodeableConcept> | undefined;
      _patientPreparation?: Element[] | undefined;
      
      timeAspect?: string | undefined;
      _timeAspect?: Element | undefined;
      
      typeCollected?: CodeableConcept | undefined;
      _typeCollected?: Element | undefined;
      
      typeTested?: Array<BackboneElement> | undefined;
      _typeTested?: Element[] | undefined;
      
      container?: BackboneElement | undefined;
      _container?: Element | undefined;
      
      additive?: Array<BackboneElement> | undefined;
      _additive?: Element[] | undefined;
      
      additive[x]: CodeableConcept | Reference;
      _additive[x]?: Element | undefined;
      
      cap?: CodeableConcept | undefined;
      _cap?: Element | undefined;
      
      capacity?: Quantity | undefined;
      _capacity?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      material?: CodeableConcept | undefined;
      _material?: Element | undefined;
      
      minimumVolume[x]?: Quantity | string | undefined;
      _minimumVolume[x]?: Element | undefined;
      
      preparation?: string | undefined;
      _preparation?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      handling?: Array<BackboneElement> | undefined;
      _handling?: Element[] | undefined;
      
      instruction?: string | undefined;
      _instruction?: Element | undefined;
      
      maxDuration?: Duration | undefined;
      _maxDuration?: Element | undefined;
      
      temperatureQualifier?: CodeableConcept | undefined;
      _temperatureQualifier?: Element | undefined;
      
      temperatureRange?: Range | undefined;
      _temperatureRange?: Element | undefined;
      
      isDerived?: boolean | undefined;
      _isDerived?: Element | undefined;
      
      preference: code;
      _preference?: Element | undefined;
      
      rejectionCriterion?: Array<CodeableConcept> | undefined;
      _rejectionCriterion?: Element[] | undefined;
      
      requirement?: string | undefined;
      _requirement?: Element | undefined;
      
      retentionTime?: Duration | undefined;
      _retentionTime?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
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
      
      readonly resourceType: "StructureDefinition";
      


      
      abstract: boolean;
      _abstract?: Element | undefined;
      
      baseDefinition?: canonical | undefined;
      _baseDefinition?: Element | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      context?: Array<BackboneElement> | undefined;
      _context?: Element[] | undefined;
      
      expression: string;
      _expression?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      contextInvariant?: Array<string> | undefined;
      _contextInvariant?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      derivation?: code | undefined;
      _derivation?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      differential?: BackboneElement | undefined;
      _differential?: Element | undefined;
      
      element: Array<ElementDefinition>;
      _element?: Element[] | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      fhirVersion?: code | undefined;
      _fhirVersion?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      keyword?: Array<Coding> | undefined;
      _keyword?: Element[] | undefined;
      
      kind: code;
      _kind?: Element | undefined;
      
      mapping?: Array<BackboneElement> | undefined;
      _mapping?: Element[] | undefined;
      
      comment?: string | undefined;
      _comment?: Element | undefined;
      
      identity: id;
      _identity?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      uri?: uri | undefined;
      _uri?: Element | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      snapshot?: BackboneElement | undefined;
      _snapshot?: Element | undefined;
      
      element: Array<ElementDefinition>;
      _element?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      type: uri;
      _type?: Element | undefined;
      
      url: uri;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
    }

  


  
    /**
 * StructureMap
 * 
 * A Map of relationships between 2 structures that can be used to transform data.
 * 
 * @see {@link http://hl7.org/fhir/R4B/StructureMap.html}
 */
    export interface StructureMap extends DomainResource {
      
      readonly resourceType: "StructureMap";
      


      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      group: Array<BackboneElement>;
      _group?: Element[] | undefined;
      
      documentation?: string | undefined;
      _documentation?: Element | undefined;
      
      extends?: id | undefined;
      _extends?: Element | undefined;
      
      input: Array<BackboneElement>;
      _input?: Element[] | undefined;
      
      documentation?: string | undefined;
      _documentation?: Element | undefined;
      
      mode: code;
      _mode?: Element | undefined;
      
      name: id;
      _name?: Element | undefined;
      
      type?: string | undefined;
      _type?: Element | undefined;
      
      name: id;
      _name?: Element | undefined;
      
      rule: Array<BackboneElement>;
      _rule?: Element[] | undefined;
      
      dependent?: Array<BackboneElement> | undefined;
      _dependent?: Element[] | undefined;
      
      name: id;
      _name?: Element | undefined;
      
      variable: Array<string>;
      _variable?: Element[] | undefined;
      
      documentation?: string | undefined;
      _documentation?: Element | undefined;
      
      name: id;
      _name?: Element | undefined;
      
      rule?: Array<undefined> | undefined;
      _rule?: Element[] | undefined;
      
      source: Array<BackboneElement>;
      _source?: Element[] | undefined;
      
      check?: string | undefined;
      _check?: Element | undefined;
      
      condition?: string | undefined;
      _condition?: Element | undefined;
      
      context: id;
      _context?: Element | undefined;
      
      defaultValue[x]?: base64Binary | boolean | canonical | code | date | dateTime | decimal | id | instant | integer | markdown | oid | positiveInt | string | time | unsignedInt | uri | url | uuid | Address | Age | Annotation | Attachment | CodeableConcept | Coding | ContactPoint | Count | Distance | Duration | HumanName | Identifier | Money | Period | Quantity | Range | Ratio | Reference | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage | Meta | undefined;
      _defaultValue[x]?: Element | undefined;
      
      element?: string | undefined;
      _element?: Element | undefined;
      
      listMode?: code | undefined;
      _listMode?: Element | undefined;
      
      logMessage?: string | undefined;
      _logMessage?: Element | undefined;
      
      max?: string | undefined;
      _max?: Element | undefined;
      
      min?: integer | undefined;
      _min?: Element | undefined;
      
      type?: string | undefined;
      _type?: Element | undefined;
      
      variable?: id | undefined;
      _variable?: Element | undefined;
      
      target?: Array<BackboneElement> | undefined;
      _target?: Element[] | undefined;
      
      context?: id | undefined;
      _context?: Element | undefined;
      
      contextType?: code | undefined;
      _contextType?: Element | undefined;
      
      element?: string | undefined;
      _element?: Element | undefined;
      
      listMode?: Array<code> | undefined;
      _listMode?: Element[] | undefined;
      
      listRuleId?: id | undefined;
      _listRuleId?: Element | undefined;
      
      parameter?: Array<BackboneElement> | undefined;
      _parameter?: Element[] | undefined;
      
      value[x]: id | string | boolean | integer | decimal;
      _value[x]?: Element | undefined;
      
      transform?: code | undefined;
      _transform?: Element | undefined;
      
      variable?: id | undefined;
      _variable?: Element | undefined;
      
      typeMode: code;
      _typeMode?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      import?: Array<canonical> | undefined;
      _import?: Element[] | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      structure?: Array<BackboneElement> | undefined;
      _structure?: Element[] | undefined;
      
      alias?: string | undefined;
      _alias?: Element | undefined;
      
      documentation?: string | undefined;
      _documentation?: Element | undefined;
      
      mode: code;
      _mode?: Element | undefined;
      
      url: canonical;
      _url?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      url: uri;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "Subscription";
      


      
      channel: BackboneElement;
      _channel?: Element | undefined;
      
      endpoint?: url | undefined;
      _endpoint?: Element | undefined;
      
      header?: Array<string> | undefined;
      _header?: Element[] | undefined;
      
      payload?: code | undefined;
      _payload?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      contact?: Array<ContactPoint> | undefined;
      _contact?: Element[] | undefined;
      
      criteria: string;
      _criteria?: Element | undefined;
      
      end?: instant | undefined;
      _end?: Element | undefined;
      
      error?: string | undefined;
      _error?: Element | undefined;
      
      reason: string;
      _reason?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
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
      
      readonly resourceType: "SubscriptionStatus";
      


      
      error?: Array<CodeableConcept> | undefined;
      _error?: Element[] | undefined;
      
      eventsSinceSubscriptionStart?: string | undefined;
      _eventsSinceSubscriptionStart?: Element | undefined;
      
      notificationEvent?: Array<BackboneElement> | undefined;
      _notificationEvent?: Element[] | undefined;
      
      additionalContext?: Array<Reference> | undefined;
      _additionalContext?: Element[] | undefined;
      
      eventNumber: string;
      _eventNumber?: Element | undefined;
      
      focus?: Reference | undefined;
      _focus?: Element | undefined;
      
      timestamp?: instant | undefined;
      _timestamp?: Element | undefined;
      
      status?: code | undefined;
      _status?: Element | undefined;
      
      subscription: Reference;
      _subscription?: Element | undefined;
      
      topic?: canonical | undefined;
      _topic?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
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
      
      readonly resourceType: "SubscriptionTopic";
      


      
      approvalDate?: date | undefined;
      _approvalDate?: Element | undefined;
      
      canFilterBy?: Array<BackboneElement> | undefined;
      _canFilterBy?: Element[] | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      filterDefinition?: uri | undefined;
      _filterDefinition?: Element | undefined;
      
      filterParameter: string;
      _filterParameter?: Element | undefined;
      
      modifier?: Array<code> | undefined;
      _modifier?: Element[] | undefined;
      
      resource?: uri | undefined;
      _resource?: Element | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      derivedFrom?: Array<canonical> | undefined;
      _derivedFrom?: Element[] | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      effectivePeriod?: Period | undefined;
      _effectivePeriod?: Element | undefined;
      
      eventTrigger?: Array<BackboneElement> | undefined;
      _eventTrigger?: Element[] | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      event: CodeableConcept;
      _event?: Element | undefined;
      
      resource: uri;
      _resource?: Element | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      lastReviewDate?: date | undefined;
      _lastReviewDate?: Element | undefined;
      
      notificationShape?: Array<BackboneElement> | undefined;
      _notificationShape?: Element[] | undefined;
      
      include?: Array<string> | undefined;
      _include?: Element[] | undefined;
      
      resource: uri;
      _resource?: Element | undefined;
      
      revInclude?: Array<string> | undefined;
      _revInclude?: Element[] | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      resourceTrigger?: Array<BackboneElement> | undefined;
      _resourceTrigger?: Element[] | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      fhirPathCriteria?: string | undefined;
      _fhirPathCriteria?: Element | undefined;
      
      queryCriteria?: BackboneElement | undefined;
      _queryCriteria?: Element | undefined;
      
      current?: string | undefined;
      _current?: Element | undefined;
      
      previous?: string | undefined;
      _previous?: Element | undefined;
      
      requireBoth?: boolean | undefined;
      _requireBoth?: Element | undefined;
      
      resultForCreate?: code | undefined;
      _resultForCreate?: Element | undefined;
      
      resultForDelete?: code | undefined;
      _resultForDelete?: Element | undefined;
      
      resource: uri;
      _resource?: Element | undefined;
      
      supportedInteraction?: Array<code> | undefined;
      _supportedInteraction?: Element[] | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      url: uri;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
    }

  


  
    /**
 * Substance
 * 
 * A homogeneous material with a definite composition.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Substance.html}
 */
    export interface Substance extends DomainResource {
      
      readonly resourceType: "Substance";
      


      
      category?: Array<CodeableConcept> | undefined;
      _category?: Element[] | undefined;
      
      code: CodeableConcept;
      _code?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      ingredient?: Array<BackboneElement> | undefined;
      _ingredient?: Element[] | undefined;
      
      quantity?: Ratio | undefined;
      _quantity?: Element | undefined;
      
      substance[x]: CodeableConcept | Reference;
      _substance[x]?: Element | undefined;
      
      instance?: Array<BackboneElement> | undefined;
      _instance?: Element[] | undefined;
      
      expiry?: dateTime | undefined;
      _expiry?: Element | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      status?: code | undefined;
      _status?: Element | undefined;
      
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
      
      readonly resourceType: "SubstanceDefinition";
      


      
      classification?: Array<CodeableConcept> | undefined;
      _classification?: Element[] | undefined;
      
      code?: Array<BackboneElement> | undefined;
      _code?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      source?: Array<Reference> | undefined;
      _source?: Element[] | undefined;
      
      status?: CodeableConcept | undefined;
      _status?: Element | undefined;
      
      statusDate?: dateTime | undefined;
      _statusDate?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      domain?: CodeableConcept | undefined;
      _domain?: Element | undefined;
      
      grade?: Array<CodeableConcept> | undefined;
      _grade?: Element[] | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      informationSource?: Array<Reference> | undefined;
      _informationSource?: Element[] | undefined;
      
      manufacturer?: Array<Reference> | undefined;
      _manufacturer?: Element[] | undefined;
      
      moiety?: Array<BackboneElement> | undefined;
      _moiety?: Element[] | undefined;
      
      amount[x]?: Quantity | string | undefined;
      _amount[x]?: Element | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      measurementType?: CodeableConcept | undefined;
      _measurementType?: Element | undefined;
      
      molecularFormula?: string | undefined;
      _molecularFormula?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      opticalActivity?: CodeableConcept | undefined;
      _opticalActivity?: Element | undefined;
      
      role?: CodeableConcept | undefined;
      _role?: Element | undefined;
      
      stereochemistry?: CodeableConcept | undefined;
      _stereochemistry?: Element | undefined;
      
      molecularWeight?: Array<BackboneElement> | undefined;
      _molecularWeight?: Element[] | undefined;
      
      amount: Quantity;
      _amount?: Element | undefined;
      
      method?: CodeableConcept | undefined;
      _method?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      name?: Array<BackboneElement> | undefined;
      _name?: Element[] | undefined;
      
      domain?: Array<CodeableConcept> | undefined;
      _domain?: Element[] | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      language?: Array<CodeableConcept> | undefined;
      _language?: Element[] | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      official?: Array<BackboneElement> | undefined;
      _official?: Element[] | undefined;
      
      authority?: CodeableConcept | undefined;
      _authority?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      status?: CodeableConcept | undefined;
      _status?: Element | undefined;
      
      preferred?: boolean | undefined;
      _preferred?: Element | undefined;
      
      source?: Array<Reference> | undefined;
      _source?: Element[] | undefined;
      
      status?: CodeableConcept | undefined;
      _status?: Element | undefined;
      
      synonym?: Array<undefined> | undefined;
      _synonym?: Element[] | undefined;
      
      translation?: Array<undefined> | undefined;
      _translation?: Element[] | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      property?: Array<BackboneElement> | undefined;
      _property?: Element[] | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      value[x]?: CodeableConcept | Quantity | date | boolean | Attachment | undefined;
      _value[x]?: Element | undefined;
      
      relationship?: Array<BackboneElement> | undefined;
      _relationship?: Element[] | undefined;
      
      amount[x]?: Quantity | Ratio | string | undefined;
      _amount[x]?: Element | undefined;
      
      comparator?: CodeableConcept | undefined;
      _comparator?: Element | undefined;
      
      isDefining?: boolean | undefined;
      _isDefining?: Element | undefined;
      
      ratioHighLimitAmount?: Ratio | undefined;
      _ratioHighLimitAmount?: Element | undefined;
      
      source?: Array<Reference> | undefined;
      _source?: Element[] | undefined;
      
      substanceDefinition[x]?: Reference | CodeableConcept | undefined;
      _substanceDefinition[x]?: Element | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      sourceMaterial?: BackboneElement | undefined;
      _sourceMaterial?: Element | undefined;
      
      countryOfOrigin?: Array<CodeableConcept> | undefined;
      _countryOfOrigin?: Element[] | undefined;
      
      genus?: CodeableConcept | undefined;
      _genus?: Element | undefined;
      
      part?: CodeableConcept | undefined;
      _part?: Element | undefined;
      
      species?: CodeableConcept | undefined;
      _species?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      status?: CodeableConcept | undefined;
      _status?: Element | undefined;
      
      structure?: BackboneElement | undefined;
      _structure?: Element | undefined;
      
      molecularFormula?: string | undefined;
      _molecularFormula?: Element | undefined;
      
      molecularFormulaByMoiety?: string | undefined;
      _molecularFormulaByMoiety?: Element | undefined;
      
      molecularWeight?: undefined | undefined;
      _molecularWeight?: Element | undefined;
      
      opticalActivity?: CodeableConcept | undefined;
      _opticalActivity?: Element | undefined;
      
      representation?: Array<BackboneElement> | undefined;
      _representation?: Element[] | undefined;
      
      document?: Reference | undefined;
      _document?: Element | undefined;
      
      format?: CodeableConcept | undefined;
      _format?: Element | undefined;
      
      representation?: string | undefined;
      _representation?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
      sourceDocument?: Array<Reference> | undefined;
      _sourceDocument?: Element[] | undefined;
      
      stereochemistry?: CodeableConcept | undefined;
      _stereochemistry?: Element | undefined;
      
      technique?: Array<CodeableConcept> | undefined;
      _technique?: Element[] | undefined;
      
      supplier?: Array<Reference> | undefined;
      _supplier?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
    }

  


  


  


  


  


  
    /**
 * SupplyDelivery
 * 
 * Record of delivery of what is supplied.
 * 
 * @see {@link http://hl7.org/fhir/R4B/SupplyDelivery.html}
 */
    export interface SupplyDelivery extends DomainResource {
      
      readonly resourceType: "SupplyDelivery";
      


      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      destination?: Reference | undefined;
      _destination?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      occurrence[x]?: dateTime | Period | Timing | undefined;
      _occurrence[x]?: Element | undefined;
      
      partOf?: Array<Reference> | undefined;
      _partOf?: Element[] | undefined;
      
      patient?: Reference | undefined;
      _patient?: Element | undefined;
      
      receiver?: Array<Reference> | undefined;
      _receiver?: Element[] | undefined;
      
      status?: code | undefined;
      _status?: Element | undefined;
      
      suppliedItem?: BackboneElement | undefined;
      _suppliedItem?: Element | undefined;
      
      item[x]?: CodeableConcept | Reference | undefined;
      _item[x]?: Element | undefined;
      
      quantity?: Quantity | undefined;
      _quantity?: Element | undefined;
      
      supplier?: Reference | undefined;
      _supplier?: Element | undefined;
      
      type?: CodeableConcept | undefined;
      _type?: Element | undefined;
      
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
      
      readonly resourceType: "SupplyRequest";
      


      
      authoredOn?: dateTime | undefined;
      _authoredOn?: Element | undefined;
      
      category?: CodeableConcept | undefined;
      _category?: Element | undefined;
      
      deliverFrom?: Reference | undefined;
      _deliverFrom?: Element | undefined;
      
      deliverTo?: Reference | undefined;
      _deliverTo?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      item[x]: CodeableConcept | Reference;
      _item[x]?: Element | undefined;
      
      occurrence[x]?: dateTime | Period | Timing | undefined;
      _occurrence[x]?: Element | undefined;
      
      parameter?: Array<BackboneElement> | undefined;
      _parameter?: Element[] | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      value[x]?: CodeableConcept | Quantity | Range | boolean | undefined;
      _value[x]?: Element | undefined;
      
      priority?: code | undefined;
      _priority?: Element | undefined;
      
      quantity: Quantity;
      _quantity?: Element | undefined;
      
      reasonCode?: Array<CodeableConcept> | undefined;
      _reasonCode?: Element[] | undefined;
      
      reasonReference?: Array<Reference> | undefined;
      _reasonReference?: Element[] | undefined;
      
      requester?: Reference | undefined;
      _requester?: Element | undefined;
      
      status?: code | undefined;
      _status?: Element | undefined;
      
      supplier?: Array<Reference> | undefined;
      _supplier?: Element[] | undefined;
      
    }

  


  


  


  


  


  


  


  


  


  


  


  


  
    /**
 * Task
 * 
 * A task to be performed.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Task.html}
 */
    export interface Task extends DomainResource {
      
      readonly resourceType: "Task";
      


      
      authoredOn?: dateTime | undefined;
      _authoredOn?: Element | undefined;
      
      basedOn?: Array<Reference> | undefined;
      _basedOn?: Element[] | undefined;
      
      businessStatus?: CodeableConcept | undefined;
      _businessStatus?: Element | undefined;
      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      executionPeriod?: Period | undefined;
      _executionPeriod?: Element | undefined;
      
      focus?: Reference | undefined;
      _focus?: Element | undefined;
      
      for?: Reference | undefined;
      _for?: Element | undefined;
      
      groupIdentifier?: Identifier | undefined;
      _groupIdentifier?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      input?: Array<BackboneElement> | undefined;
      _input?: Element[] | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      value[x]: base64Binary | boolean | canonical | code | date | dateTime | decimal | id | instant | integer | markdown | oid | positiveInt | string | time | unsignedInt | uri | url | uuid | Address | Age | Annotation | Attachment | CodeableConcept | Coding | ContactPoint | Count | Distance | Duration | HumanName | Identifier | Money | Period | Quantity | Range | Ratio | Reference | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage | Meta;
      _value[x]?: Element | undefined;
      
      instantiatesCanonical?: canonical | undefined;
      _instantiatesCanonical?: Element | undefined;
      
      instantiatesUri?: uri | undefined;
      _instantiatesUri?: Element | undefined;
      
      insurance?: Array<Reference> | undefined;
      _insurance?: Element[] | undefined;
      
      intent: code;
      _intent?: Element | undefined;
      
      lastModified?: dateTime | undefined;
      _lastModified?: Element | undefined;
      
      location?: Reference | undefined;
      _location?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      output?: Array<BackboneElement> | undefined;
      _output?: Element[] | undefined;
      
      type: CodeableConcept;
      _type?: Element | undefined;
      
      value[x]: base64Binary | boolean | canonical | code | date | dateTime | decimal | id | instant | integer | markdown | oid | positiveInt | string | time | unsignedInt | uri | url | uuid | Address | Age | Annotation | Attachment | CodeableConcept | Coding | ContactPoint | Count | Distance | Duration | HumanName | Identifier | Money | Period | Quantity | Range | Ratio | Reference | SampledData | Signature | Timing | ContactDetail | Contributor | DataRequirement | Expression | ParameterDefinition | RelatedArtifact | TriggerDefinition | UsageContext | Dosage | Meta;
      _value[x]?: Element | undefined;
      
      owner?: Reference | undefined;
      _owner?: Element | undefined;
      
      partOf?: Array<Reference> | undefined;
      _partOf?: Element[] | undefined;
      
      performerType?: Array<CodeableConcept> | undefined;
      _performerType?: Element[] | undefined;
      
      priority?: code | undefined;
      _priority?: Element | undefined;
      
      reasonCode?: CodeableConcept | undefined;
      _reasonCode?: Element | undefined;
      
      reasonReference?: Reference | undefined;
      _reasonReference?: Element | undefined;
      
      relevantHistory?: Array<Reference> | undefined;
      _relevantHistory?: Element[] | undefined;
      
      requester?: Reference | undefined;
      _requester?: Element | undefined;
      
      restriction?: BackboneElement | undefined;
      _restriction?: Element | undefined;
      
      period?: Period | undefined;
      _period?: Element | undefined;
      
      recipient?: Array<Reference> | undefined;
      _recipient?: Element[] | undefined;
      
      repetitions?: positiveInt | undefined;
      _repetitions?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      statusReason?: CodeableConcept | undefined;
      _statusReason?: Element | undefined;
      
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
      
      readonly resourceType: "TerminologyCapabilities";
      


      
      closure?: BackboneElement | undefined;
      _closure?: Element | undefined;
      
      translation?: boolean | undefined;
      _translation?: Element | undefined;
      
      codeSearch?: code | undefined;
      _codeSearch?: Element | undefined;
      
      codeSystem?: Array<BackboneElement> | undefined;
      _codeSystem?: Element[] | undefined;
      
      subsumption?: boolean | undefined;
      _subsumption?: Element | undefined;
      
      uri?: canonical | undefined;
      _uri?: Element | undefined;
      
      version?: Array<BackboneElement> | undefined;
      _version?: Element[] | undefined;
      
      code?: string | undefined;
      _code?: Element | undefined;
      
      compositional?: boolean | undefined;
      _compositional?: Element | undefined;
      
      filter?: Array<BackboneElement> | undefined;
      _filter?: Element[] | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      op: Array<code>;
      _op?: Element[] | undefined;
      
      isDefault?: boolean | undefined;
      _isDefault?: Element | undefined;
      
      language?: Array<code> | undefined;
      _language?: Element[] | undefined;
      
      property?: Array<code> | undefined;
      _property?: Element[] | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date: dateTime;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      expansion?: BackboneElement | undefined;
      _expansion?: Element | undefined;
      
      hierarchical?: boolean | undefined;
      _hierarchical?: Element | undefined;
      
      incomplete?: boolean | undefined;
      _incomplete?: Element | undefined;
      
      paging?: boolean | undefined;
      _paging?: Element | undefined;
      
      parameter?: Array<BackboneElement> | undefined;
      _parameter?: Element[] | undefined;
      
      documentation?: string | undefined;
      _documentation?: Element | undefined;
      
      name: code;
      _name?: Element | undefined;
      
      textFilter?: markdown | undefined;
      _textFilter?: Element | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      implementation?: BackboneElement | undefined;
      _implementation?: Element | undefined;
      
      description: string;
      _description?: Element | undefined;
      
      url?: url | undefined;
      _url?: Element | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      kind: code;
      _kind?: Element | undefined;
      
      lockedDate?: boolean | undefined;
      _lockedDate?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      software?: BackboneElement | undefined;
      _software?: Element | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      translation?: BackboneElement | undefined;
      _translation?: Element | undefined;
      
      needsMap: boolean;
      _needsMap?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      validateCode?: BackboneElement | undefined;
      _validateCode?: Element | undefined;
      
      translations: boolean;
      _translations?: Element | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
    }

  


  


  
    /**
 * TestReport
 * 
 * A summary of information based on the results of executing a TestScript.
 * 
 * @see {@link http://hl7.org/fhir/R4B/TestReport.html}
 */
    export interface TestReport extends DomainResource {
      
      readonly resourceType: "TestReport";
      


      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      issued?: dateTime | undefined;
      _issued?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      participant?: Array<BackboneElement> | undefined;
      _participant?: Element[] | undefined;
      
      display?: string | undefined;
      _display?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
      uri: uri;
      _uri?: Element | undefined;
      
      result: code;
      _result?: Element | undefined;
      
      score?: decimal | undefined;
      _score?: Element | undefined;
      
      setup?: BackboneElement | undefined;
      _setup?: Element | undefined;
      
      action: Array<BackboneElement>;
      _action?: Element[] | undefined;
      
      assert?: BackboneElement | undefined;
      _assert?: Element | undefined;
      
      detail?: string | undefined;
      _detail?: Element | undefined;
      
      message?: markdown | undefined;
      _message?: Element | undefined;
      
      result: code;
      _result?: Element | undefined;
      
      operation?: BackboneElement | undefined;
      _operation?: Element | undefined;
      
      detail?: uri | undefined;
      _detail?: Element | undefined;
      
      message?: markdown | undefined;
      _message?: Element | undefined;
      
      result: code;
      _result?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      teardown?: BackboneElement | undefined;
      _teardown?: Element | undefined;
      
      action: Array<BackboneElement>;
      _action?: Element[] | undefined;
      
      operation: ;
      _operation?: Element | undefined;
      
      test?: Array<BackboneElement> | undefined;
      _test?: Element[] | undefined;
      
      action: Array<BackboneElement>;
      _action?: Element[] | undefined;
      
      assert?: undefined | undefined;
      _assert?: Element | undefined;
      
      operation?: undefined | undefined;
      _operation?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      tester?: string | undefined;
      _tester?: Element | undefined;
      
      testScript: Reference;
      _testScript?: Element | undefined;
      
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
      
      readonly resourceType: "TestScript";
      


      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      destination?: Array<BackboneElement> | undefined;
      _destination?: Element[] | undefined;
      
      index: integer;
      _index?: Element | undefined;
      
      profile: Coding;
      _profile?: Element | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      fixture?: Array<BackboneElement> | undefined;
      _fixture?: Element[] | undefined;
      
      autocreate: boolean;
      _autocreate?: Element | undefined;
      
      autodelete: boolean;
      _autodelete?: Element | undefined;
      
      resource?: Reference | undefined;
      _resource?: Element | undefined;
      
      identifier?: Identifier | undefined;
      _identifier?: Element | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      metadata?: BackboneElement | undefined;
      _metadata?: Element | undefined;
      
      capability: Array<BackboneElement>;
      _capability?: Element[] | undefined;
      
      capabilities: canonical;
      _capabilities?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      destination?: integer | undefined;
      _destination?: Element | undefined;
      
      link?: Array<uri> | undefined;
      _link?: Element[] | undefined;
      
      origin?: Array<integer> | undefined;
      _origin?: Element[] | undefined;
      
      required: boolean;
      _required?: Element | undefined;
      
      validated: boolean;
      _validated?: Element | undefined;
      
      link?: Array<BackboneElement> | undefined;
      _link?: Element[] | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      url: uri;
      _url?: Element | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      origin?: Array<BackboneElement> | undefined;
      _origin?: Element[] | undefined;
      
      index: integer;
      _index?: Element | undefined;
      
      profile: Coding;
      _profile?: Element | undefined;
      
      profile?: Array<Reference> | undefined;
      _profile?: Element[] | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      setup?: BackboneElement | undefined;
      _setup?: Element | undefined;
      
      action: Array<BackboneElement>;
      _action?: Element[] | undefined;
      
      assert?: BackboneElement | undefined;
      _assert?: Element | undefined;
      
      compareToSourceExpression?: string | undefined;
      _compareToSourceExpression?: Element | undefined;
      
      compareToSourceId?: string | undefined;
      _compareToSourceId?: Element | undefined;
      
      compareToSourcePath?: string | undefined;
      _compareToSourcePath?: Element | undefined;
      
      contentType?: code | undefined;
      _contentType?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      direction?: code | undefined;
      _direction?: Element | undefined;
      
      expression?: string | undefined;
      _expression?: Element | undefined;
      
      headerField?: string | undefined;
      _headerField?: Element | undefined;
      
      label?: string | undefined;
      _label?: Element | undefined;
      
      minimumId?: string | undefined;
      _minimumId?: Element | undefined;
      
      navigationLinks?: boolean | undefined;
      _navigationLinks?: Element | undefined;
      
      operator?: code | undefined;
      _operator?: Element | undefined;
      
      path?: string | undefined;
      _path?: Element | undefined;
      
      requestMethod?: code | undefined;
      _requestMethod?: Element | undefined;
      
      requestURL?: string | undefined;
      _requestURL?: Element | undefined;
      
      resource?: code | undefined;
      _resource?: Element | undefined;
      
      response?: code | undefined;
      _response?: Element | undefined;
      
      responseCode?: string | undefined;
      _responseCode?: Element | undefined;
      
      sourceId?: id | undefined;
      _sourceId?: Element | undefined;
      
      validateProfileId?: id | undefined;
      _validateProfileId?: Element | undefined;
      
      value?: string | undefined;
      _value?: Element | undefined;
      
      warningOnly: boolean;
      _warningOnly?: Element | undefined;
      
      operation?: BackboneElement | undefined;
      _operation?: Element | undefined;
      
      accept?: code | undefined;
      _accept?: Element | undefined;
      
      contentType?: code | undefined;
      _contentType?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      destination?: integer | undefined;
      _destination?: Element | undefined;
      
      encodeRequestUrl: boolean;
      _encodeRequestUrl?: Element | undefined;
      
      label?: string | undefined;
      _label?: Element | undefined;
      
      method?: code | undefined;
      _method?: Element | undefined;
      
      origin?: integer | undefined;
      _origin?: Element | undefined;
      
      params?: string | undefined;
      _params?: Element | undefined;
      
      requestHeader?: Array<BackboneElement> | undefined;
      _requestHeader?: Element[] | undefined;
      
      field: string;
      _field?: Element | undefined;
      
      value: string;
      _value?: Element | undefined;
      
      requestId?: id | undefined;
      _requestId?: Element | undefined;
      
      resource?: code | undefined;
      _resource?: Element | undefined;
      
      responseId?: id | undefined;
      _responseId?: Element | undefined;
      
      sourceId?: id | undefined;
      _sourceId?: Element | undefined;
      
      targetId?: id | undefined;
      _targetId?: Element | undefined;
      
      type?: Coding | undefined;
      _type?: Element | undefined;
      
      url?: string | undefined;
      _url?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      teardown?: BackboneElement | undefined;
      _teardown?: Element | undefined;
      
      action: Array<BackboneElement>;
      _action?: Element[] | undefined;
      
      operation: ;
      _operation?: Element | undefined;
      
      test?: Array<BackboneElement> | undefined;
      _test?: Element[] | undefined;
      
      action: Array<BackboneElement>;
      _action?: Element[] | undefined;
      
      assert?: undefined | undefined;
      _assert?: Element | undefined;
      
      operation?: undefined | undefined;
      _operation?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      url: uri;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      variable?: Array<BackboneElement> | undefined;
      _variable?: Element[] | undefined;
      
      defaultValue?: string | undefined;
      _defaultValue?: Element | undefined;
      
      description?: string | undefined;
      _description?: Element | undefined;
      
      expression?: string | undefined;
      _expression?: Element | undefined;
      
      headerField?: string | undefined;
      _headerField?: Element | undefined;
      
      hint?: string | undefined;
      _hint?: Element | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      path?: string | undefined;
      _path?: Element | undefined;
      
      sourceId?: id | undefined;
      _sourceId?: Element | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
    }

  


  


  


  


  


  
    /**
 * Timing
 * 
 * Base StructureDefinition for Timing Type: Specifies an event that may occur
 * multiple times. Timing schedules are used to record when things are planned,
 * expected or requested to occur. The most common usage is in dosage instructions
 * for medications. They are also used when planning care of various kinds, and may
 * be used for reporting the schedule to which past regular activities were carried
 * out.
 * 
 * @see {@link http://hl7.org/fhir/R4B/Timing.html}
 */
    export interface Timing extends BackboneElement {
      
      readonly resourceType: string;
      


      
      code?: CodeableConcept | undefined;
      _code?: Element | undefined;
      
      event?: Array<dateTime> | undefined;
      _event?: Element[] | undefined;
      
      repeat?: Element | undefined;
      _repeat?: Element | undefined;
      
      bounds[x]?: Duration | Range | Period | undefined;
      _bounds[x]?: Element | undefined;
      
      count?: positiveInt | undefined;
      _count?: Element | undefined;
      
      countMax?: positiveInt | undefined;
      _countMax?: Element | undefined;
      
      dayOfWeek?: Array<code> | undefined;
      _dayOfWeek?: Element[] | undefined;
      
      duration?: decimal | undefined;
      _duration?: Element | undefined;
      
      durationMax?: decimal | undefined;
      _durationMax?: Element | undefined;
      
      durationUnit?: code | undefined;
      _durationUnit?: Element | undefined;
      
      frequency?: positiveInt | undefined;
      _frequency?: Element | undefined;
      
      frequencyMax?: positiveInt | undefined;
      _frequencyMax?: Element | undefined;
      
      offset?: unsignedInt | undefined;
      _offset?: Element | undefined;
      
      period?: decimal | undefined;
      _period?: Element | undefined;
      
      periodMax?: decimal | undefined;
      _periodMax?: Element | undefined;
      
      periodUnit?: code | undefined;
      _periodUnit?: Element | undefined;
      
      timeOfDay?: Array<time> | undefined;
      _timeOfDay?: Element[] | undefined;
      
      when?: Array<code> | undefined;
      _when?: Element[] | undefined;
      
    }

  


  


  


  


  


  
    /**
 * TriggerDefinition
 * 
 * Base StructureDefinition for TriggerDefinition Type: A description of a
 * triggering event. Triggering events can be named events, data events, or
 * periodic, as determined by the type element.
 * 
 * @see {@link http://hl7.org/fhir/R4B/TriggerDefinition.html}
 */
    export interface TriggerDefinition extends Element {
      
      readonly resourceType: string;
      


      
      condition?: Expression | undefined;
      _condition?: Element | undefined;
      
      data?: Array<DataRequirement> | undefined;
      _data?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      timing[x]?: Timing | Reference | date | dateTime | undefined;
      _timing[x]?: Element | undefined;
      
      type: code;
      _type?: Element | undefined;
      
    }

  


  


  


  


  


  


  


  


  


  


  


  


  


  


  


  
    /**
 * UsageContext
 * 
 * Base StructureDefinition for UsageContext Type: Specifies clinical/business/etc.
 * metadata that can be used to retrieve, index and/or categorize an artifact. This
 * metadata can either be specific to the applicable population (e.g., age
 * category, DRG) or the specific context of care (e.g., venue, care setting,
 * provider of care).
 * 
 * @see {@link http://hl7.org/fhir/R4B/UsageContext.html}
 */
    export interface UsageContext extends Element {
      
      readonly resourceType: string;
      


      
      code: Coding;
      _code?: Element | undefined;
      
      value[x]: CodeableConcept | Quantity | Range | Reference;
      _value[x]?: Element | undefined;
      
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
      
      readonly resourceType: "ValueSet";
      


      
      compose?: BackboneElement | undefined;
      _compose?: Element | undefined;
      
      exclude?: Array<undefined> | undefined;
      _exclude?: Element[] | undefined;
      
      inactive?: boolean | undefined;
      _inactive?: Element | undefined;
      
      include: Array<BackboneElement>;
      _include?: Element[] | undefined;
      
      concept?: Array<BackboneElement> | undefined;
      _concept?: Element[] | undefined;
      
      code: code;
      _code?: Element | undefined;
      
      designation?: Array<BackboneElement> | undefined;
      _designation?: Element[] | undefined;
      
      language?: code | undefined;
      _language?: Element | undefined;
      
      use?: Coding | undefined;
      _use?: Element | undefined;
      
      value: string;
      _value?: Element | undefined;
      
      display?: string | undefined;
      _display?: Element | undefined;
      
      filter?: Array<BackboneElement> | undefined;
      _filter?: Element[] | undefined;
      
      op: code;
      _op?: Element | undefined;
      
      property: code;
      _property?: Element | undefined;
      
      value: string;
      _value?: Element | undefined;
      
      system?: uri | undefined;
      _system?: Element | undefined;
      
      valueSet?: Array<canonical> | undefined;
      _valueSet?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
      lockedDate?: date | undefined;
      _lockedDate?: Element | undefined;
      
      contact?: Array<ContactDetail> | undefined;
      _contact?: Element[] | undefined;
      
      copyright?: markdown | undefined;
      _copyright?: Element | undefined;
      
      date?: dateTime | undefined;
      _date?: Element | undefined;
      
      description?: markdown | undefined;
      _description?: Element | undefined;
      
      expansion?: BackboneElement | undefined;
      _expansion?: Element | undefined;
      
      contains?: Array<BackboneElement> | undefined;
      _contains?: Element[] | undefined;
      
      abstract?: boolean | undefined;
      _abstract?: Element | undefined;
      
      code?: code | undefined;
      _code?: Element | undefined;
      
      contains?: Array<undefined> | undefined;
      _contains?: Element[] | undefined;
      
      designation?: Array<undefined> | undefined;
      _designation?: Element[] | undefined;
      
      display?: string | undefined;
      _display?: Element | undefined;
      
      inactive?: boolean | undefined;
      _inactive?: Element | undefined;
      
      system?: uri | undefined;
      _system?: Element | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
      identifier?: uri | undefined;
      _identifier?: Element | undefined;
      
      offset?: integer | undefined;
      _offset?: Element | undefined;
      
      parameter?: Array<BackboneElement> | undefined;
      _parameter?: Element[] | undefined;
      
      name: string;
      _name?: Element | undefined;
      
      value[x]?: string | boolean | integer | decimal | uri | code | dateTime | undefined;
      _value[x]?: Element | undefined;
      
      timestamp: dateTime;
      _timestamp?: Element | undefined;
      
      total?: integer | undefined;
      _total?: Element | undefined;
      
      experimental?: boolean | undefined;
      _experimental?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      immutable?: boolean | undefined;
      _immutable?: Element | undefined;
      
      jurisdiction?: Array<CodeableConcept> | undefined;
      _jurisdiction?: Element[] | undefined;
      
      name?: string | undefined;
      _name?: Element | undefined;
      
      publisher?: string | undefined;
      _publisher?: Element | undefined;
      
      purpose?: markdown | undefined;
      _purpose?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      title?: string | undefined;
      _title?: Element | undefined;
      
      url?: uri | undefined;
      _url?: Element | undefined;
      
      useContext?: Array<UsageContext> | undefined;
      _useContext?: Element[] | undefined;
      
      version?: string | undefined;
      _version?: Element | undefined;
      
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
      
      readonly resourceType: "VerificationResult";
      


      
      attestation?: BackboneElement | undefined;
      _attestation?: Element | undefined;
      
      communicationMethod?: CodeableConcept | undefined;
      _communicationMethod?: Element | undefined;
      
      date?: date | undefined;
      _date?: Element | undefined;
      
      onBehalfOf?: Reference | undefined;
      _onBehalfOf?: Element | undefined;
      
      proxyIdentityCertificate?: string | undefined;
      _proxyIdentityCertificate?: Element | undefined;
      
      proxySignature?: Signature | undefined;
      _proxySignature?: Element | undefined;
      
      sourceIdentityCertificate?: string | undefined;
      _sourceIdentityCertificate?: Element | undefined;
      
      sourceSignature?: Signature | undefined;
      _sourceSignature?: Element | undefined;
      
      who?: Reference | undefined;
      _who?: Element | undefined;
      
      failureAction?: CodeableConcept | undefined;
      _failureAction?: Element | undefined;
      
      frequency?: Timing | undefined;
      _frequency?: Element | undefined;
      
      lastPerformed?: dateTime | undefined;
      _lastPerformed?: Element | undefined;
      
      need?: CodeableConcept | undefined;
      _need?: Element | undefined;
      
      nextScheduled?: date | undefined;
      _nextScheduled?: Element | undefined;
      
      primarySource?: Array<BackboneElement> | undefined;
      _primarySource?: Element[] | undefined;
      
      canPushUpdates?: CodeableConcept | undefined;
      _canPushUpdates?: Element | undefined;
      
      communicationMethod?: Array<CodeableConcept> | undefined;
      _communicationMethod?: Element[] | undefined;
      
      pushTypeAvailable?: Array<CodeableConcept> | undefined;
      _pushTypeAvailable?: Element[] | undefined;
      
      type?: Array<CodeableConcept> | undefined;
      _type?: Element[] | undefined;
      
      validationDate?: dateTime | undefined;
      _validationDate?: Element | undefined;
      
      validationStatus?: CodeableConcept | undefined;
      _validationStatus?: Element | undefined;
      
      who?: Reference | undefined;
      _who?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
      statusDate?: dateTime | undefined;
      _statusDate?: Element | undefined;
      
      target?: Array<Reference> | undefined;
      _target?: Element[] | undefined;
      
      targetLocation?: Array<string> | undefined;
      _targetLocation?: Element[] | undefined;
      
      validationProcess?: Array<CodeableConcept> | undefined;
      _validationProcess?: Element[] | undefined;
      
      validationType?: CodeableConcept | undefined;
      _validationType?: Element | undefined;
      
      validator?: Array<BackboneElement> | undefined;
      _validator?: Element[] | undefined;
      
      attestationSignature?: Signature | undefined;
      _attestationSignature?: Element | undefined;
      
      identityCertificate?: string | undefined;
      _identityCertificate?: Element | undefined;
      
      organization: Reference;
      _organization?: Element | undefined;
      
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
      
      readonly resourceType: "VisionPrescription";
      


      
      created: dateTime;
      _created?: Element | undefined;
      
      dateWritten: dateTime;
      _dateWritten?: Element | undefined;
      
      encounter?: Reference | undefined;
      _encounter?: Element | undefined;
      
      identifier?: Array<Identifier> | undefined;
      _identifier?: Element[] | undefined;
      
      lensSpecification: Array<BackboneElement>;
      _lensSpecification?: Element[] | undefined;
      
      add?: decimal | undefined;
      _add?: Element | undefined;
      
      axis?: integer | undefined;
      _axis?: Element | undefined;
      
      backCurve?: decimal | undefined;
      _backCurve?: Element | undefined;
      
      brand?: string | undefined;
      _brand?: Element | undefined;
      
      color?: string | undefined;
      _color?: Element | undefined;
      
      cylinder?: decimal | undefined;
      _cylinder?: Element | undefined;
      
      diameter?: decimal | undefined;
      _diameter?: Element | undefined;
      
      duration?: Quantity | undefined;
      _duration?: Element | undefined;
      
      eye: code;
      _eye?: Element | undefined;
      
      note?: Array<Annotation> | undefined;
      _note?: Element[] | undefined;
      
      power?: decimal | undefined;
      _power?: Element | undefined;
      
      prism?: Array<BackboneElement> | undefined;
      _prism?: Element[] | undefined;
      
      amount: decimal;
      _amount?: Element | undefined;
      
      base: code;
      _base?: Element | undefined;
      
      product: CodeableConcept;
      _product?: Element | undefined;
      
      sphere?: decimal | undefined;
      _sphere?: Element | undefined;
      
      patient: Reference;
      _patient?: Element | undefined;
      
      prescriber: Reference;
      _prescriber?: Element | undefined;
      
      status: code;
      _status?: Element | undefined;
      
    }

  


  


  


  


  


  


  


  


  


  


  

