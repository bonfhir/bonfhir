/**
 * FHIR Definitions for r5/5.0.0
 */



  
    /**
 * Account
 * 
 * A financial tool for tracking value accrued for a particular purpose.  In the
 * healthcare field, used to track charges for a patient, cost centers, etc.
 * 
 * @see {@link http://hl7.org/fhir/R5/Account.html}
 */
    export interface Account extends DomainResource {
      
      readonly resourceType: "Account";
      

      
        balance?: Array<BackboneElement> | undefined;
        _balance?: Element[] | undefined;
      
        aggregate?: CodeableConcept | undefined;
        _aggregate?: Element | undefined;
      
        amount: Money;
        _amount?: Element | undefined;
      
        estimate?: boolean | undefined;
        _estimate?: Element | undefined;
      
        term?: CodeableConcept | undefined;
        _term?: Element | undefined;
      
        billingStatus?: CodeableConcept | undefined;
        _billingStatus?: Element | undefined;
      
        calculatedAt?: string | undefined;
        _calculatedAt?: Element | undefined;
      
        coverage?: Array<BackboneElement> | undefined;
        _coverage?: Element[] | undefined;
      
        coverage: Reference;
        _coverage?: Element | undefined;
      
        priority?: number | undefined;
        _priority?: Element | undefined;
      
        currency?: CodeableConcept | undefined;
        _currency?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        diagnosis?: Array<BackboneElement> | undefined;
        _diagnosis?: Element[] | undefined;
      
        condition: CodeableReference;
        _condition?: Element | undefined;
      
        dateOfDiagnosis?: string | undefined;
        _dateOfDiagnosis?: Element | undefined;
      
        onAdmission?: boolean | undefined;
        _onAdmission?: Element | undefined;
      
        packageCode?: Array<CodeableConcept> | undefined;
        _packageCode?: Element[] | undefined;
      
        sequence?: number | undefined;
        _sequence?: Element | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
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
      
        procedure?: Array<BackboneElement> | undefined;
        _procedure?: Element[] | undefined;
      
        code: CodeableReference;
        _code?: Element | undefined;
      
        dateOfService?: string | undefined;
        _dateOfService?: Element | undefined;
      
        device?: Array<Reference> | undefined;
        _device?: Element[] | undefined;
      
        packageCode?: Array<CodeableConcept> | undefined;
        _packageCode?: Element[] | undefined;
      
        sequence?: number | undefined;
        _sequence?: Element | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
        relatedAccount?: Array<BackboneElement> | undefined;
        _relatedAccount?: Element[] | undefined;
      
        account: Reference;
        _account?: Element | undefined;
      
        relationship?: CodeableConcept | undefined;
        _relationship?: Element | undefined;
      
        servicePeriod?: Period | undefined;
        _servicePeriod?: Element | undefined;
      
        status: string;
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
 * @see {@link http://hl7.org/fhir/R5/ActivityDefinition.html}
 */
    export interface ActivityDefinition extends DomainResource {
      
      readonly resourceType: "ActivityDefinition";
      

      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        asNeededBoolean?: boolean | undefined;
        _asNeededBoolean?: Element | undefined;
      
        asNeededCodeableConcept?: CodeableConcept | undefined;
        _asNeededCodeableConcept?: Element | undefined;
      
        author?: Array<ContactDetail> | undefined;
        _author?: Element[] | undefined;
      
        bodySite?: Array<CodeableConcept> | undefined;
        _bodySite?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
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
      
        intent?: string | undefined;
        _intent?: Element | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        kind?: string | undefined;
        _kind?: Element | undefined;
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        library?: Array<string> | undefined;
        _library?: Element[] | undefined;
      
        location?: CodeableReference | undefined;
        _location?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        observationRequirement?: Array<string> | undefined;
        _observationRequirement?: Element[] | undefined;
      
        observationResultRequirement?: Array<string> | undefined;
        _observationResultRequirement?: Element[] | undefined;
      
        participant?: Array<BackboneElement> | undefined;
        _participant?: Element[] | undefined;
      
        function?: CodeableConcept | undefined;
        _function?: Element | undefined;
      
        role?: CodeableConcept | undefined;
        _role?: Element | undefined;
      
        type?: string | undefined;
        _type?: Element | undefined;
      
        typeCanonical?: string | undefined;
        _typeCanonical?: Element | undefined;
      
        typeReference?: Reference | undefined;
        _typeReference?: Element | undefined;
      
        priority?: string | undefined;
        _priority?: Element | undefined;
      
        productCodeableConcept?: CodeableConcept | undefined;
        _productCodeableConcept?: Element | undefined;
      
        productReference?: Reference | undefined;
        _productReference?: Element | undefined;
      
        profile?: string | undefined;
        _profile?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        relatedArtifact?: Array<RelatedArtifact> | undefined;
        _relatedArtifact?: Element[] | undefined;
      
        reviewer?: Array<ContactDetail> | undefined;
        _reviewer?: Element[] | undefined;
      
        specimenRequirement?: Array<string> | undefined;
        _specimenRequirement?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subjectCanonical?: string | undefined;
        _subjectCanonical?: Element | undefined;
      
        subjectCodeableConcept?: CodeableConcept | undefined;
        _subjectCodeableConcept?: Element | undefined;
      
        subjectReference?: Reference | undefined;
        _subjectReference?: Element | undefined;
      
        subtitle?: string | undefined;
        _subtitle?: Element | undefined;
      
        timingAge?: Age | undefined;
        _timingAge?: Element | undefined;
      
        timingDuration?: Duration | undefined;
        _timingDuration?: Element | undefined;
      
        timingRange?: Range | undefined;
        _timingRange?: Element | undefined;
      
        timingTiming?: Timing | undefined;
        _timingTiming?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        topic?: Array<CodeableConcept> | undefined;
        _topic?: Element[] | undefined;
      
        transform?: string | undefined;
        _transform?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        usage?: string | undefined;
        _usage?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * ActorDefinition
 * 
 * The ActorDefinition resource is used to describe an actor - a human or an
 * application that plays a role in data exchange, and that may have obligations
 * associated with the role the actor plays.
 * 
 * @see {@link http://hl7.org/fhir/R5/ActorDefinition.html}
 */
    export interface ActorDefinition extends DomainResource {
      
      readonly resourceType: "ActorDefinition";
      

      
        capabilities?: string | undefined;
        _capabilities?: Element | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        derivedFrom?: Array<string> | undefined;
        _derivedFrom?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        documentation?: string | undefined;
        _documentation?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        reference?: Array<string> | undefined;
        _reference?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  


  
    /**
 * Address
 * 
 * Address Type: An address expressed using postal conventions (as opposed to GPS
 * or other location definition formats).  This data type may be used to convey
 * addresses for use in delivering mail as well as for visiting locations which
 * might not be valid for mail delivery.  There are a variety of postal address
 * formats defined around the world.
The ISO21090-codedString may be used to
 * provide a coded representation of the contents of strings in an Address.
 * 
 * @see {@link http://hl7.org/fhir/R5/Address.html}
 */
    export interface Address extends DataType {
      
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
      
        type?: string | undefined;
        _type?: Element | undefined;
      
        use?: string | undefined;
        _use?: Element | undefined;
      
    }

  


  
    /**
 * AdministrableProductDefinition
 * 
 * A medicinal product in the final form which is suitable for administering to a
 * patient (after any mixing of multiple components, dissolution etc. has been
 * performed).
 * 
 * @see {@link http://hl7.org/fhir/R5/AdministrableProductDefinition.html}
 */
    export interface AdministrableProductDefinition extends DomainResource {
      
      readonly resourceType: "AdministrableProductDefinition";
      

      
        administrableDoseForm?: CodeableConcept | undefined;
        _administrableDoseForm?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
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
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueDate?: string | undefined;
        _valueDate?: Element | undefined;
      
        valueMarkdown?: string | undefined;
        _valueMarkdown?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
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
      
        status: string;
        _status?: Element | undefined;
      
        unitOfPresentation?: CodeableConcept | undefined;
        _unitOfPresentation?: Element | undefined;
      
    }

  


  
    /**
 * AdverseEvent
 * 
 * An event (i.e. any change to current patient status) that may be related to
 * unintended effects on a patient or research participant. The unintended effects
 * may require additional monitoring, treatment, hospitalization, or may result in
 * death. The AdverseEvent resource also extends to potential or avoided events
 * that could have had such effects. There are two major domains where the
 * AdverseEvent resource is expected to be used. One is in clinical care reported
 * adverse events and the other is in reporting adverse events in clinical
 * research trial management.  Adverse events can be reported by healthcare
 * providers, patients, caregivers or by medical products manufacturers.  Given the
 * differences between these two concepts, we recommend consulting the domain
 * specific implementation guides when implementing the AdverseEvent Resource. The
 * implementation guides include specific extensions, value sets and constraints.
 * 
 * @see {@link http://hl7.org/fhir/R5/AdverseEvent.html}
 */
    export interface AdverseEvent extends DomainResource {
      
      readonly resourceType: "AdverseEvent";
      

      
        actuality: string;
        _actuality?: Element | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        contributingFactor?: Array<BackboneElement> | undefined;
        _contributingFactor?: Element[] | undefined;
      
        itemCodeableConcept?: CodeableConcept | undefined;
        _itemCodeableConcept?: Element | undefined;
      
        itemReference?: Reference | undefined;
        _itemReference?: Element | undefined;
      
        detected?: string | undefined;
        _detected?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        expectedInResearchStudy?: boolean | undefined;
        _expectedInResearchStudy?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        location?: Reference | undefined;
        _location?: Element | undefined;
      
        mitigatingAction?: Array<BackboneElement> | undefined;
        _mitigatingAction?: Element[] | undefined;
      
        itemCodeableConcept?: CodeableConcept | undefined;
        _itemCodeableConcept?: Element | undefined;
      
        itemReference?: Reference | undefined;
        _itemReference?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        occurrenceDateTime?: string | undefined;
        _occurrenceDateTime?: Element | undefined;
      
        occurrencePeriod?: Period | undefined;
        _occurrencePeriod?: Element | undefined;
      
        occurrenceTiming?: Timing | undefined;
        _occurrenceTiming?: Element | undefined;
      
        outcome?: Array<CodeableConcept> | undefined;
        _outcome?: Element[] | undefined;
      
        participant?: Array<BackboneElement> | undefined;
        _participant?: Element[] | undefined;
      
        actor: Reference;
        _actor?: Element | undefined;
      
        function?: CodeableConcept | undefined;
        _function?: Element | undefined;
      
        preventiveAction?: Array<BackboneElement> | undefined;
        _preventiveAction?: Element[] | undefined;
      
        itemCodeableConcept?: CodeableConcept | undefined;
        _itemCodeableConcept?: Element | undefined;
      
        itemReference?: Reference | undefined;
        _itemReference?: Element | undefined;
      
        recordedDate?: string | undefined;
        _recordedDate?: Element | undefined;
      
        recorder?: Reference | undefined;
        _recorder?: Element | undefined;
      
        resultingEffect?: Array<Reference> | undefined;
        _resultingEffect?: Element[] | undefined;
      
        seriousness?: CodeableConcept | undefined;
        _seriousness?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        study?: Array<Reference> | undefined;
        _study?: Element[] | undefined;
      
        subject: Reference;
        _subject?: Element | undefined;
      
        supportingInfo?: Array<BackboneElement> | undefined;
        _supportingInfo?: Element[] | undefined;
      
        itemCodeableConcept?: CodeableConcept | undefined;
        _itemCodeableConcept?: Element | undefined;
      
        itemReference?: Reference | undefined;
        _itemReference?: Element | undefined;
      
        suspectEntity?: Array<BackboneElement> | undefined;
        _suspectEntity?: Element[] | undefined;
      
        causality?: BackboneElement | undefined;
        _causality?: Element | undefined;
      
        assessmentMethod?: CodeableConcept | undefined;
        _assessmentMethod?: Element | undefined;
      
        author?: Reference | undefined;
        _author?: Element | undefined;
      
        entityRelatedness?: CodeableConcept | undefined;
        _entityRelatedness?: Element | undefined;
      
        instanceCodeableConcept?: CodeableConcept | undefined;
        _instanceCodeableConcept?: Element | undefined;
      
        instanceReference?: Reference | undefined;
        _instanceReference?: Element | undefined;
      
    }

  


  
    /**
 * Age
 * 
 * Age Type: A duration of time during which an organism (or a process) has
 * existed.
 * 
 * @see {@link http://hl7.org/fhir/R5/Age.html}
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
 * @see {@link http://hl7.org/fhir/R5/AllergyIntolerance.html}
 */
    export interface AllergyIntolerance extends DomainResource {
      
      readonly resourceType: "AllergyIntolerance";
      

      
        category?: Array<string> | undefined;
        _category?: Element[] | undefined;
      
        clinicalStatus?: CodeableConcept | undefined;
        _clinicalStatus?: Element | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        criticality?: string | undefined;
        _criticality?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        lastOccurrence?: string | undefined;
        _lastOccurrence?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        onsetAge?: Age | undefined;
        _onsetAge?: Element | undefined;
      
        onsetDateTime?: string | undefined;
        _onsetDateTime?: Element | undefined;
      
        onsetPeriod?: Period | undefined;
        _onsetPeriod?: Element | undefined;
      
        onsetRange?: Range | undefined;
        _onsetRange?: Element | undefined;
      
        onsetString?: string | undefined;
        _onsetString?: Element | undefined;
      
        participant?: Array<BackboneElement> | undefined;
        _participant?: Element[] | undefined;
      
        actor: Reference;
        _actor?: Element | undefined;
      
        function?: CodeableConcept | undefined;
        _function?: Element | undefined;
      
        patient: Reference;
        _patient?: Element | undefined;
      
        reaction?: Array<BackboneElement> | undefined;
        _reaction?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        exposureRoute?: CodeableConcept | undefined;
        _exposureRoute?: Element | undefined;
      
        manifestation: Array<CodeableReference>;
        _manifestation?: Element[] | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        onset?: string | undefined;
        _onset?: Element | undefined;
      
        severity?: string | undefined;
        _severity?: Element | undefined;
      
        substance?: CodeableConcept | undefined;
        _substance?: Element | undefined;
      
        recordedDate?: string | undefined;
        _recordedDate?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        verificationStatus?: CodeableConcept | undefined;
        _verificationStatus?: Element | undefined;
      
    }

  


  
    /**
 * Annotation
 * 
 * Annotation Type: A  text note which also  contains information about who made
 * the statement and when.
 * 
 * @see {@link http://hl7.org/fhir/R5/Annotation.html}
 */
    export interface Annotation extends DataType {
      
      readonly resourceType: string;
      

      
        authorReference?: Reference | undefined;
        _authorReference?: Element | undefined;
      
        authorString?: string | undefined;
        _authorString?: Element | undefined;
      
        text: string;
        _text?: Element | undefined;
      
        time?: string | undefined;
        _time?: Element | undefined;
      
    }

  


  
    /**
 * Appointment
 * 
 * A booking of a healthcare event among patient(s), practitioner(s), related
 * person(s) and/or device(s) for a specific date/time. This may result in one or
 * more Encounter(s).
 * 
 * @see {@link http://hl7.org/fhir/R5/Appointment.html}
 */
    export interface Appointment extends DomainResource {
      
      readonly resourceType: "Appointment";
      

      
        account?: Array<Reference> | undefined;
        _account?: Element[] | undefined;
      
        appointmentType?: CodeableConcept | undefined;
        _appointmentType?: Element | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        cancellationDate?: string | undefined;
        _cancellationDate?: Element | undefined;
      
        cancellationReason?: CodeableConcept | undefined;
        _cancellationReason?: Element | undefined;
      
        class?: Array<CodeableConcept> | undefined;
        _class?: Element[] | undefined;
      
        created?: string | undefined;
        _created?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        end?: string | undefined;
        _end?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        minutesDuration?: number | undefined;
        _minutesDuration?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        occurrenceChanged?: boolean | undefined;
        _occurrenceChanged?: Element | undefined;
      
        originatingAppointment?: Reference | undefined;
        _originatingAppointment?: Element | undefined;
      
        participant: Array<BackboneElement>;
        _participant?: Element[] | undefined;
      
        actor?: Reference | undefined;
        _actor?: Element | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        required?: boolean | undefined;
        _required?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
        patientInstruction?: Array<CodeableReference> | undefined;
        _patientInstruction?: Element[] | undefined;
      
        previousAppointment?: Reference | undefined;
        _previousAppointment?: Element | undefined;
      
        priority?: CodeableConcept | undefined;
        _priority?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        recurrenceId?: number | undefined;
        _recurrenceId?: Element | undefined;
      
        recurrenceTemplate?: Array<BackboneElement> | undefined;
        _recurrenceTemplate?: Element[] | undefined;
      
        excludingDate?: Array<string> | undefined;
        _excludingDate?: Element[] | undefined;
      
        excludingRecurrenceId?: Array<number> | undefined;
        _excludingRecurrenceId?: Element[] | undefined;
      
        lastOccurrenceDate?: string | undefined;
        _lastOccurrenceDate?: Element | undefined;
      
        monthlyTemplate?: BackboneElement | undefined;
        _monthlyTemplate?: Element | undefined;
      
        dayOfMonth?: number | undefined;
        _dayOfMonth?: Element | undefined;
      
        dayOfWeek?: Coding | undefined;
        _dayOfWeek?: Element | undefined;
      
        monthInterval: number;
        _monthInterval?: Element | undefined;
      
        nthWeekOfMonth?: Coding | undefined;
        _nthWeekOfMonth?: Element | undefined;
      
        occurrenceCount?: number | undefined;
        _occurrenceCount?: Element | undefined;
      
        occurrenceDate?: Array<string> | undefined;
        _occurrenceDate?: Element[] | undefined;
      
        recurrenceType: CodeableConcept;
        _recurrenceType?: Element | undefined;
      
        timezone?: CodeableConcept | undefined;
        _timezone?: Element | undefined;
      
        weeklyTemplate?: BackboneElement | undefined;
        _weeklyTemplate?: Element | undefined;
      
        friday?: boolean | undefined;
        _friday?: Element | undefined;
      
        monday?: boolean | undefined;
        _monday?: Element | undefined;
      
        saturday?: boolean | undefined;
        _saturday?: Element | undefined;
      
        sunday?: boolean | undefined;
        _sunday?: Element | undefined;
      
        thursday?: boolean | undefined;
        _thursday?: Element | undefined;
      
        tuesday?: boolean | undefined;
        _tuesday?: Element | undefined;
      
        wednesday?: boolean | undefined;
        _wednesday?: Element | undefined;
      
        weekInterval?: number | undefined;
        _weekInterval?: Element | undefined;
      
        yearlyTemplate?: BackboneElement | undefined;
        _yearlyTemplate?: Element | undefined;
      
        yearInterval: number;
        _yearInterval?: Element | undefined;
      
        replaces?: Array<Reference> | undefined;
        _replaces?: Element[] | undefined;
      
        requestedPeriod?: Array<Period> | undefined;
        _requestedPeriod?: Element[] | undefined;
      
        serviceCategory?: Array<CodeableConcept> | undefined;
        _serviceCategory?: Element[] | undefined;
      
        serviceType?: Array<CodeableReference> | undefined;
        _serviceType?: Element[] | undefined;
      
        slot?: Array<Reference> | undefined;
        _slot?: Element[] | undefined;
      
        specialty?: Array<CodeableConcept> | undefined;
        _specialty?: Element[] | undefined;
      
        start?: string | undefined;
        _start?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
        supportingInformation?: Array<Reference> | undefined;
        _supportingInformation?: Element[] | undefined;
      
        virtualService?: Array<VirtualServiceDetail> | undefined;
        _virtualService?: Element[] | undefined;
      
    }

  


  
    /**
 * AppointmentResponse
 * 
 * A reply to an appointment request for a patient and/or practitioner(s), such as
 * a confirmation or rejection.
 * 
 * @see {@link http://hl7.org/fhir/R5/AppointmentResponse.html}
 */
    export interface AppointmentResponse extends DomainResource {
      
      readonly resourceType: "AppointmentResponse";
      

      
        actor?: Reference | undefined;
        _actor?: Element | undefined;
      
        appointment: Reference;
        _appointment?: Element | undefined;
      
        comment?: string | undefined;
        _comment?: Element | undefined;
      
        end?: string | undefined;
        _end?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        occurrenceDate?: string | undefined;
        _occurrenceDate?: Element | undefined;
      
        participantStatus: string;
        _participantStatus?: Element | undefined;
      
        participantType?: Array<CodeableConcept> | undefined;
        _participantType?: Element[] | undefined;
      
        proposedNewTime?: boolean | undefined;
        _proposedNewTime?: Element | undefined;
      
        recurrenceId?: number | undefined;
        _recurrenceId?: Element | undefined;
      
        recurring?: boolean | undefined;
        _recurring?: Element | undefined;
      
        start?: string | undefined;
        _start?: Element | undefined;
      
    }

  


  
    /**
 * ArtifactAssessment
 * 
 * This Resource provides one or more comments, classifiers or ratings about a
 * Resource and supports attribution and rights management metadata for the added
 * content.
 * 
 * @see {@link http://hl7.org/fhir/R5/ArtifactAssessment.html}
 */
    export interface ArtifactAssessment extends DomainResource {
      
      readonly resourceType: "ArtifactAssessment";
      

      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        artifactCanonical?: string | undefined;
        _artifactCanonical?: Element | undefined;
      
        artifactReference?: Reference | undefined;
        _artifactReference?: Element | undefined;
      
        artifactUri?: string | undefined;
        _artifactUri?: Element | undefined;
      
        citeAsMarkdown?: string | undefined;
        _citeAsMarkdown?: Element | undefined;
      
        citeAsReference?: Reference | undefined;
        _citeAsReference?: Element | undefined;
      
        content?: Array<BackboneElement> | undefined;
        _content?: Element[] | undefined;
      
        author?: Reference | undefined;
        _author?: Element | undefined;
      
        classifier?: Array<CodeableConcept> | undefined;
        _classifier?: Element[] | undefined;
      
        component?: Array<undefined> | undefined;
        _component?: Element[] | undefined;
      
        freeToShare?: boolean | undefined;
        _freeToShare?: Element | undefined;
      
        informationType?: string | undefined;
        _informationType?: Element | undefined;
      
        path?: Array<string> | undefined;
        _path?: Element[] | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        relatedArtifact?: Array<RelatedArtifact> | undefined;
        _relatedArtifact?: Element[] | undefined;
      
        summary?: string | undefined;
        _summary?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        disposition?: string | undefined;
        _disposition?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        workflowStatus?: string | undefined;
        _workflowStatus?: Element | undefined;
      
    }

  


  
    /**
 * Attachment
 * 
 * Attachment Type: For referring to data content defined in other formats.
 * 
 * @see {@link http://hl7.org/fhir/R5/Attachment.html}
 */
    export interface Attachment extends DataType {
      
      readonly resourceType: string;
      

      
        contentType?: string | undefined;
        _contentType?: Element | undefined;
      
        creation?: string | undefined;
        _creation?: Element | undefined;
      
        data?: string | undefined;
        _data?: Element | undefined;
      
        duration?: number | undefined;
        _duration?: Element | undefined;
      
        frames?: number | undefined;
        _frames?: Element | undefined;
      
        hash?: string | undefined;
        _hash?: Element | undefined;
      
        height?: number | undefined;
        _height?: Element | undefined;
      
        language?: string | undefined;
        _language?: Element | undefined;
      
        pages?: number | undefined;
        _pages?: Element | undefined;
      
        size?: integer64 | undefined;
        _size?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        width?: number | undefined;
        _width?: Element | undefined;
      
    }

  


  
    /**
 * AuditEvent
 * 
 * A record of an event relevant for purposes such as operations, privacy,
 * security, maintenance, and performance analysis.
 * 
 * @see {@link http://hl7.org/fhir/R5/AuditEvent.html}
 */
    export interface AuditEvent extends DomainResource {
      
      readonly resourceType: "AuditEvent";
      

      
        action?: string | undefined;
        _action?: Element | undefined;
      
        agent: Array<BackboneElement>;
        _agent?: Element[] | undefined;
      
        authorization?: Array<CodeableConcept> | undefined;
        _authorization?: Element[] | undefined;
      
        location?: Reference | undefined;
        _location?: Element | undefined;
      
        networkReference?: Reference | undefined;
        _networkReference?: Element | undefined;
      
        networkString?: string | undefined;
        _networkString?: Element | undefined;
      
        networkUri?: string | undefined;
        _networkUri?: Element | undefined;
      
        policy?: Array<string> | undefined;
        _policy?: Element[] | undefined;
      
        requestor?: boolean | undefined;
        _requestor?: Element | undefined;
      
        role?: Array<CodeableConcept> | undefined;
        _role?: Element[] | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        who: Reference;
        _who?: Element | undefined;
      
        authorization?: Array<CodeableConcept> | undefined;
        _authorization?: Element[] | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        code: CodeableConcept;
        _code?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        entity?: Array<BackboneElement> | undefined;
        _entity?: Element[] | undefined;
      
        agent?: Array<undefined> | undefined;
        _agent?: Element[] | undefined;
      
        detail?: Array<BackboneElement> | undefined;
        _detail?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        valueBase64Binary?: string | undefined;
        _valueBase64Binary?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valuePeriod?: Period | undefined;
        _valuePeriod?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueRatio?: Ratio | undefined;
        _valueRatio?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        valueTime?: time | undefined;
        _valueTime?: Element | undefined;
      
        query?: string | undefined;
        _query?: Element | undefined;
      
        role?: CodeableConcept | undefined;
        _role?: Element | undefined;
      
        securityLabel?: Array<CodeableConcept> | undefined;
        _securityLabel?: Element[] | undefined;
      
        what?: Reference | undefined;
        _what?: Element | undefined;
      
        occurredDateTime?: string | undefined;
        _occurredDateTime?: Element | undefined;
      
        occurredPeriod?: Period | undefined;
        _occurredPeriod?: Element | undefined;
      
        outcome?: BackboneElement | undefined;
        _outcome?: Element | undefined;
      
        code: Coding;
        _code?: Element | undefined;
      
        detail?: Array<CodeableConcept> | undefined;
        _detail?: Element[] | undefined;
      
        patient?: Reference | undefined;
        _patient?: Element | undefined;
      
        recorded: string;
        _recorded?: Element | undefined;
      
        severity?: string | undefined;
        _severity?: Element | undefined;
      
        source: BackboneElement;
        _source?: Element | undefined;
      
        observer: Reference;
        _observer?: Element | undefined;
      
        site?: Reference | undefined;
        _site?: Element | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
    }

  


  
    /**
 * Availability
 * 
 * Availability Type: Availability data for an {item}.
 * 
 * @see {@link http://hl7.org/fhir/R5/Availability.html}
 */
    export interface Availability extends DataType {
      
      readonly resourceType: string;
      

      
        availableTime?: Array<Element> | undefined;
        _availableTime?: Element[] | undefined;
      
        allDay?: boolean | undefined;
        _allDay?: Element | undefined;
      
        availableEndTime?: time | undefined;
        _availableEndTime?: Element | undefined;
      
        availableStartTime?: time | undefined;
        _availableStartTime?: Element | undefined;
      
        daysOfWeek?: Array<string> | undefined;
        _daysOfWeek?: Element[] | undefined;
      
        notAvailableTime?: Array<Element> | undefined;
        _notAvailableTime?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        during?: Period | undefined;
        _during?: Element | undefined;
      
    }

  


  
    /**
 * BackboneElement
 * 
 * BackboneElement Type: Base definition for all elements that are defined inside a
 * resource - but not those in a data type.
 * 
 * @see {@link http://hl7.org/fhir/R5/BackboneElement.html}
 */
    export interface BackboneElement extends Element {
      
      readonly resourceType: string;
      

      
        modifierExtension?: Array<Extension> | undefined;
        _modifierExtension?: Element[] | undefined;
      
    }

  


  
    /**
 * BackboneType
 * 
 * BackboneType Type: Base definition for the few data types that are allowed to
 * carry modifier extensions.
 * 
 * @see {@link http://hl7.org/fhir/R5/BackboneType.html}
 */
    export interface BackboneType extends DataType {
      
      readonly resourceType: string;
      

      
        modifierExtension?: Array<Extension> | undefined;
        _modifierExtension?: Element[] | undefined;
      
    }

  


  
    /**
 * Base
 * 
 * Base Type: Base definition for all types defined in FHIR type system.
 * 
 * @see {@link http://hl7.org/fhir/R5/Base.html}
 */
    export interface Base {
      
      readonly resourceType: string;
      

      
    }

  


  


  
    /**
 * Basic
 * 
 * Basic is used for handling concepts not yet defined in FHIR, narrative-only
 * resources that don't map to an existing resource, and custom resources not
 * appropriate for inclusion in the FHIR specification.
 * 
 * @see {@link http://hl7.org/fhir/R5/Basic.html}
 */
    export interface Basic extends DomainResource {
      
      readonly resourceType: "Basic";
      

      
        author?: Reference | undefined;
        _author?: Element | undefined;
      
        code: CodeableConcept;
        _code?: Element | undefined;
      
        created?: string | undefined;
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
 * @see {@link http://hl7.org/fhir/R5/Binary.html}
 */
    export interface Binary extends Resource {
      
      readonly resourceType: string;
      

      
        contentType: string;
        _contentType?: Element | undefined;
      
        data?: string | undefined;
        _data?: Element | undefined;
      
        securityContext?: Reference | undefined;
        _securityContext?: Element | undefined;
      
    }

  


  
    /**
 * BiologicallyDerivedProduct
 * 
 * A biological material originating from a biological entity intended to be
 * transplanted or infused into another (possibly the same) biological entity.
 * 
 * @see {@link http://hl7.org/fhir/R5/BiologicallyDerivedProduct.html}
 */
    export interface BiologicallyDerivedProduct extends DomainResource {
      
      readonly resourceType: "BiologicallyDerivedProduct";
      

      
        biologicalSourceEvent?: Identifier | undefined;
        _biologicalSourceEvent?: Element | undefined;
      
        collection?: BackboneElement | undefined;
        _collection?: Element | undefined;
      
        collectedDateTime?: string | undefined;
        _collectedDateTime?: Element | undefined;
      
        collectedPeriod?: Period | undefined;
        _collectedPeriod?: Element | undefined;
      
        collector?: Reference | undefined;
        _collector?: Element | undefined;
      
        source?: Reference | undefined;
        _source?: Element | undefined;
      
        division?: string | undefined;
        _division?: Element | undefined;
      
        expirationDate?: string | undefined;
        _expirationDate?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        parent?: Array<Reference> | undefined;
        _parent?: Element[] | undefined;
      
        processingFacility?: Array<Reference> | undefined;
        _processingFacility?: Element[] | undefined;
      
        productCategory?: Coding | undefined;
        _productCategory?: Element | undefined;
      
        productCode?: CodeableConcept | undefined;
        _productCode?: Element | undefined;
      
        productStatus?: Coding | undefined;
        _productStatus?: Element | undefined;
      
        property?: Array<BackboneElement> | undefined;
        _property?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valuePeriod?: Period | undefined;
        _valuePeriod?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueRatio?: Ratio | undefined;
        _valueRatio?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        request?: Array<Reference> | undefined;
        _request?: Element[] | undefined;
      
        storageTempRequirements?: Range | undefined;
        _storageTempRequirements?: Element | undefined;
      
    }

  


  
    /**
 * BiologicallyDerivedProductDispense
 * 
 * A record of dispensation of a biologically derived product.
 * 
 * @see {@link http://hl7.org/fhir/R5/BiologicallyDerivedProductDispense.html}
 */
    export interface BiologicallyDerivedProductDispense extends DomainResource {
      
      readonly resourceType: "BiologicallyDerivedProductDispense";
      

      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        destination?: Reference | undefined;
        _destination?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        location?: Reference | undefined;
        _location?: Element | undefined;
      
        matchStatus?: CodeableConcept | undefined;
        _matchStatus?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        originRelationshipType?: CodeableConcept | undefined;
        _originRelationshipType?: Element | undefined;
      
        partOf?: Array<Reference> | undefined;
        _partOf?: Element[] | undefined;
      
        patient: Reference;
        _patient?: Element | undefined;
      
        performer?: Array<BackboneElement> | undefined;
        _performer?: Element[] | undefined;
      
        actor: Reference;
        _actor?: Element | undefined;
      
        function?: CodeableConcept | undefined;
        _function?: Element | undefined;
      
        preparedDate?: string | undefined;
        _preparedDate?: Element | undefined;
      
        product: Reference;
        _product?: Element | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        usageInstruction?: string | undefined;
        _usageInstruction?: Element | undefined;
      
        whenHandedOver?: string | undefined;
        _whenHandedOver?: Element | undefined;
      
    }

  


  
    /**
 * BodyStructure
 * 
 * Record details about an anatomical structure.  This resource may be used when a
 * coded concept does not provide the necessary detail needed for the use case.
 * 
 * @see {@link http://hl7.org/fhir/R5/BodyStructure.html}
 */
    export interface BodyStructure extends DomainResource {
      
      readonly resourceType: "BodyStructure";
      

      
        active?: boolean | undefined;
        _active?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        excludedStructure?: Array<undefined> | undefined;
        _excludedStructure?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        image?: Array<Attachment> | undefined;
        _image?: Element[] | undefined;
      
        includedStructure: Array<BackboneElement>;
        _includedStructure?: Element[] | undefined;
      
        bodyLandmarkOrientation?: Array<BackboneElement> | undefined;
        _bodyLandmarkOrientation?: Element[] | undefined;
      
        clockFacePosition?: Array<CodeableConcept> | undefined;
        _clockFacePosition?: Element[] | undefined;
      
        distanceFromLandmark?: Array<BackboneElement> | undefined;
        _distanceFromLandmark?: Element[] | undefined;
      
        device?: Array<CodeableReference> | undefined;
        _device?: Element[] | undefined;
      
        value?: Array<Quantity> | undefined;
        _value?: Element[] | undefined;
      
        landmarkDescription?: Array<CodeableConcept> | undefined;
        _landmarkDescription?: Element[] | undefined;
      
        surfaceOrientation?: Array<CodeableConcept> | undefined;
        _surfaceOrientation?: Element[] | undefined;
      
        laterality?: CodeableConcept | undefined;
        _laterality?: Element | undefined;
      
        qualifier?: Array<CodeableConcept> | undefined;
        _qualifier?: Element[] | undefined;
      
        spatialReference?: Array<Reference> | undefined;
        _spatialReference?: Element[] | undefined;
      
        structure: CodeableConcept;
        _structure?: Element | undefined;
      
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
 * @see {@link http://hl7.org/fhir/R5/Bundle.html}
 */
    export interface Bundle extends Resource {
      
      readonly resourceType: string;
      

      
        entry?: Array<BackboneElement> | undefined;
        _entry?: Element[] | undefined;
      
        fullUrl?: string | undefined;
        _fullUrl?: Element | undefined;
      
        link?: Array<undefined> | undefined;
        _link?: Element[] | undefined;
      
        request?: BackboneElement | undefined;
        _request?: Element | undefined;
      
        ifMatch?: string | undefined;
        _ifMatch?: Element | undefined;
      
        ifModifiedSince?: string | undefined;
        _ifModifiedSince?: Element | undefined;
      
        ifNoneExist?: string | undefined;
        _ifNoneExist?: Element | undefined;
      
        ifNoneMatch?: string | undefined;
        _ifNoneMatch?: Element | undefined;
      
        method: string;
        _method?: Element | undefined;
      
        url: string;
        _url?: Element | undefined;
      
        resource?: Resource | undefined;
        _resource?: Element | undefined;
      
        response?: BackboneElement | undefined;
        _response?: Element | undefined;
      
        etag?: string | undefined;
        _etag?: Element | undefined;
      
        lastModified?: string | undefined;
        _lastModified?: Element | undefined;
      
        location?: string | undefined;
        _location?: Element | undefined;
      
        outcome?: Resource | undefined;
        _outcome?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        search?: BackboneElement | undefined;
        _search?: Element | undefined;
      
        mode?: string | undefined;
        _mode?: Element | undefined;
      
        score?: number | undefined;
        _score?: Element | undefined;
      
        identifier?: Identifier | undefined;
        _identifier?: Element | undefined;
      
        issues?: Resource | undefined;
        _issues?: Element | undefined;
      
        link?: Array<BackboneElement> | undefined;
        _link?: Element[] | undefined;
      
        relation: string;
        _relation?: Element | undefined;
      
        url: string;
        _url?: Element | undefined;
      
        signature?: Signature | undefined;
        _signature?: Element | undefined;
      
        timestamp?: string | undefined;
        _timestamp?: Element | undefined;
      
        total?: unsignedInt | undefined;
        _total?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
    }

  


  


  
    /**
 * CanonicalResource
 * 
 * Common Interface declaration for conformance and knowledge artifact resources.
 * 
 * @see {@link http://hl7.org/fhir/R5/CanonicalResource.html}
 */
    export interface CanonicalResource extends DomainResource {
      
      readonly resourceType: "CanonicalResource";
      

      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * CapabilityStatement
 * 
 * A Capability Statement documents a set of capabilities (behaviors) of a FHIR
 * Server or Client for a particular version of FHIR that may be used as a
 * statement of actual server functionality or a statement of required or desired
 * server implementation.
 * 
 * @see {@link http://hl7.org/fhir/R5/CapabilityStatement.html}
 */
    export interface CapabilityStatement extends DomainResource {
      
      readonly resourceType: "CapabilityStatement";
      

      
        acceptLanguage?: Array<string> | undefined;
        _acceptLanguage?: Element[] | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date: string;
        _date?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        document?: Array<BackboneElement> | undefined;
        _document?: Element[] | undefined;
      
        documentation?: string | undefined;
        _documentation?: Element | undefined;
      
        mode: string;
        _mode?: Element | undefined;
      
        profile: string;
        _profile?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        fhirVersion: string;
        _fhirVersion?: Element | undefined;
      
        format: Array<string>;
        _format?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        implementation?: BackboneElement | undefined;
        _implementation?: Element | undefined;
      
        custodian?: Reference | undefined;
        _custodian?: Element | undefined;
      
        description: string;
        _description?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        implementationGuide?: Array<string> | undefined;
        _implementationGuide?: Element[] | undefined;
      
        imports?: Array<string> | undefined;
        _imports?: Element[] | undefined;
      
        instantiates?: Array<string> | undefined;
        _instantiates?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        kind: string;
        _kind?: Element | undefined;
      
        messaging?: Array<BackboneElement> | undefined;
        _messaging?: Element[] | undefined;
      
        documentation?: string | undefined;
        _documentation?: Element | undefined;
      
        endpoint?: Array<BackboneElement> | undefined;
        _endpoint?: Element[] | undefined;
      
        address: string;
        _address?: Element | undefined;
      
        protocol: Coding;
        _protocol?: Element | undefined;
      
        reliableCache?: unsignedInt | undefined;
        _reliableCache?: Element | undefined;
      
        supportedMessage?: Array<BackboneElement> | undefined;
        _supportedMessage?: Element[] | undefined;
      
        definition: string;
        _definition?: Element | undefined;
      
        mode: string;
        _mode?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        patchFormat?: Array<string> | undefined;
        _patchFormat?: Element[] | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        rest?: Array<BackboneElement> | undefined;
        _rest?: Element[] | undefined;
      
        compartment?: Array<string> | undefined;
        _compartment?: Element[] | undefined;
      
        documentation?: string | undefined;
        _documentation?: Element | undefined;
      
        interaction?: Array<BackboneElement> | undefined;
        _interaction?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        documentation?: string | undefined;
        _documentation?: Element | undefined;
      
        mode: string;
        _mode?: Element | undefined;
      
        operation?: Array<undefined> | undefined;
        _operation?: Element[] | undefined;
      
        resource?: Array<BackboneElement> | undefined;
        _resource?: Element[] | undefined;
      
        conditionalCreate?: boolean | undefined;
        _conditionalCreate?: Element | undefined;
      
        conditionalDelete?: string | undefined;
        _conditionalDelete?: Element | undefined;
      
        conditionalPatch?: boolean | undefined;
        _conditionalPatch?: Element | undefined;
      
        conditionalRead?: string | undefined;
        _conditionalRead?: Element | undefined;
      
        conditionalUpdate?: boolean | undefined;
        _conditionalUpdate?: Element | undefined;
      
        documentation?: string | undefined;
        _documentation?: Element | undefined;
      
        interaction?: Array<BackboneElement> | undefined;
        _interaction?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        documentation?: string | undefined;
        _documentation?: Element | undefined;
      
        operation?: Array<BackboneElement> | undefined;
        _operation?: Element[] | undefined;
      
        definition: string;
        _definition?: Element | undefined;
      
        documentation?: string | undefined;
        _documentation?: Element | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        profile?: string | undefined;
        _profile?: Element | undefined;
      
        readHistory?: boolean | undefined;
        _readHistory?: Element | undefined;
      
        referencePolicy?: Array<string> | undefined;
        _referencePolicy?: Element[] | undefined;
      
        searchInclude?: Array<string> | undefined;
        _searchInclude?: Element[] | undefined;
      
        searchParam?: Array<BackboneElement> | undefined;
        _searchParam?: Element[] | undefined;
      
        definition?: string | undefined;
        _definition?: Element | undefined;
      
        documentation?: string | undefined;
        _documentation?: Element | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        searchRevInclude?: Array<string> | undefined;
        _searchRevInclude?: Element[] | undefined;
      
        supportedProfile?: Array<string> | undefined;
        _supportedProfile?: Element[] | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        updateCreate?: boolean | undefined;
        _updateCreate?: Element | undefined;
      
        versioning?: string | undefined;
        _versioning?: Element | undefined;
      
        searchParam?: Array<undefined> | undefined;
        _searchParam?: Element[] | undefined;
      
        security?: BackboneElement | undefined;
        _security?: Element | undefined;
      
        cors?: boolean | undefined;
        _cors?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        service?: Array<CodeableConcept> | undefined;
        _service?: Element[] | undefined;
      
        software?: BackboneElement | undefined;
        _software?: Element | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        releaseDate?: string | undefined;
        _releaseDate?: Element | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * CarePlan
 * 
 * Describes the intention of how one or more practitioners intend to deliver care
 * for a particular patient, group or community for a period of time, possibly
 * limited to care for a specific condition or set of conditions.
 * 
 * @see {@link http://hl7.org/fhir/R5/CarePlan.html}
 */
    export interface CarePlan extends DomainResource {
      
      readonly resourceType: "CarePlan";
      

      
        activity?: Array<BackboneElement> | undefined;
        _activity?: Element[] | undefined;
      
        performedActivity?: Array<CodeableReference> | undefined;
        _performedActivity?: Element[] | undefined;
      
        plannedActivityReference?: Reference | undefined;
        _plannedActivityReference?: Element | undefined;
      
        progress?: Array<Annotation> | undefined;
        _progress?: Element[] | undefined;
      
        addresses?: Array<CodeableReference> | undefined;
        _addresses?: Element[] | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        careTeam?: Array<Reference> | undefined;
        _careTeam?: Element[] | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        contributor?: Array<Reference> | undefined;
        _contributor?: Element[] | undefined;
      
        created?: string | undefined;
        _created?: Element | undefined;
      
        custodian?: Reference | undefined;
        _custodian?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        goal?: Array<Reference> | undefined;
        _goal?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        instantiatesCanonical?: Array<string> | undefined;
        _instantiatesCanonical?: Element[] | undefined;
      
        instantiatesUri?: Array<string> | undefined;
        _instantiatesUri?: Element[] | undefined;
      
        intent: string;
        _intent?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        partOf?: Array<Reference> | undefined;
        _partOf?: Element[] | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        replaces?: Array<Reference> | undefined;
        _replaces?: Element[] | undefined;
      
        status: string;
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
 * in the coordination and delivery of care.
 * 
 * @see {@link http://hl7.org/fhir/R5/CareTeam.html}
 */
    export interface CareTeam extends DomainResource {
      
      readonly resourceType: "CareTeam";
      

      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
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
      
        coveragePeriod?: Period | undefined;
        _coveragePeriod?: Element | undefined;
      
        coverageTiming?: Timing | undefined;
        _coverageTiming?: Element | undefined;
      
        member?: Reference | undefined;
        _member?: Element | undefined;
      
        onBehalfOf?: Reference | undefined;
        _onBehalfOf?: Element | undefined;
      
        role?: CodeableConcept | undefined;
        _role?: Element | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        status?: string | undefined;
        _status?: Element | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
        telecom?: Array<ContactPoint> | undefined;
        _telecom?: Element[] | undefined;
      
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
 * @see {@link http://hl7.org/fhir/R5/ChargeItem.html}
 */
    export interface ChargeItem extends DomainResource {
      
      readonly resourceType: "ChargeItem";
      

      
        account?: Array<Reference> | undefined;
        _account?: Element[] | undefined;
      
        bodysite?: Array<CodeableConcept> | undefined;
        _bodysite?: Element[] | undefined;
      
        code: CodeableConcept;
        _code?: Element | undefined;
      
        costCenter?: Reference | undefined;
        _costCenter?: Element | undefined;
      
        definitionCanonical?: Array<string> | undefined;
        _definitionCanonical?: Element[] | undefined;
      
        definitionUri?: Array<string> | undefined;
        _definitionUri?: Element[] | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        enteredDate?: string | undefined;
        _enteredDate?: Element | undefined;
      
        enterer?: Reference | undefined;
        _enterer?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        occurrenceDateTime?: string | undefined;
        _occurrenceDateTime?: Element | undefined;
      
        occurrencePeriod?: Period | undefined;
        _occurrencePeriod?: Element | undefined;
      
        occurrenceTiming?: Timing | undefined;
        _occurrenceTiming?: Element | undefined;
      
        overrideReason?: CodeableConcept | undefined;
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
      
        product?: Array<CodeableReference> | undefined;
        _product?: Element[] | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        reason?: Array<CodeableConcept> | undefined;
        _reason?: Element[] | undefined;
      
        requestingOrganization?: Reference | undefined;
        _requestingOrganization?: Element | undefined;
      
        service?: Array<CodeableReference> | undefined;
        _service?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject: Reference;
        _subject?: Element | undefined;
      
        supportingInformation?: Array<Reference> | undefined;
        _supportingInformation?: Element[] | undefined;
      
        totalPriceComponent?: MonetaryComponent | undefined;
        _totalPriceComponent?: Element | undefined;
      
        unitPriceComponent?: MonetaryComponent | undefined;
        _unitPriceComponent?: Element | undefined;
      
    }

  


  
    /**
 * ChargeItemDefinition
 * 
 * The ChargeItemDefinition resource provides the properties that apply to the
 * (billing) codes necessary to calculate costs and prices. The properties may
 * differ largely depending on type and realm, therefore this resource gives only a
 * rough structure and requires profiling for each type of billing code system.
 * 
 * @see {@link http://hl7.org/fhir/R5/ChargeItemDefinition.html}
 */
    export interface ChargeItemDefinition extends DomainResource {
      
      readonly resourceType: "ChargeItemDefinition";
      

      
        applicability?: Array<BackboneElement> | undefined;
        _applicability?: Element[] | undefined;
      
        condition?: Expression | undefined;
        _condition?: Element | undefined;
      
        effectivePeriod?: Period | undefined;
        _effectivePeriod?: Element | undefined;
      
        relatedArtifact?: RelatedArtifact | undefined;
        _relatedArtifact?: Element | undefined;
      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        derivedFromUri?: Array<string> | undefined;
        _derivedFromUri?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        instance?: Array<Reference> | undefined;
        _instance?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        partOf?: Array<string> | undefined;
        _partOf?: Element[] | undefined;
      
        propertyGroup?: Array<BackboneElement> | undefined;
        _propertyGroup?: Element[] | undefined;
      
        applicability?: Array<undefined> | undefined;
        _applicability?: Element[] | undefined;
      
        priceComponent?: Array<MonetaryComponent> | undefined;
        _priceComponent?: Element[] | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        replaces?: Array<string> | undefined;
        _replaces?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * Citation
 * 
 * The Citation Resource enables reference to any knowledge artifact for purposes
 * of identification and attribution. The Citation Resource supports existing
 * reference structures and developing publication practices such as versioning,
 * expressing complex contributorship roles, and referencing computable resources.
 * 
 * @see {@link http://hl7.org/fhir/R5/Citation.html}
 */
    export interface Citation extends DomainResource {
      
      readonly resourceType: "Citation";
      

      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        author?: Array<ContactDetail> | undefined;
        _author?: Element[] | undefined;
      
        citedArtifact?: BackboneElement | undefined;
        _citedArtifact?: Element | undefined;
      
        abstract?: Array<BackboneElement> | undefined;
        _abstract?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        language?: CodeableConcept | undefined;
        _language?: Element | undefined;
      
        text: string;
        _text?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        classification?: Array<BackboneElement> | undefined;
        _classification?: Element[] | undefined;
      
        artifactAssessment?: Array<Reference> | undefined;
        _artifactAssessment?: Element[] | undefined;
      
        classifier?: Array<CodeableConcept> | undefined;
        _classifier?: Element[] | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        contributorship?: BackboneElement | undefined;
        _contributorship?: Element | undefined;
      
        complete?: boolean | undefined;
        _complete?: Element | undefined;
      
        entry?: Array<BackboneElement> | undefined;
        _entry?: Element[] | undefined;
      
        affiliation?: Array<Reference> | undefined;
        _affiliation?: Element[] | undefined;
      
        contributionInstance?: Array<BackboneElement> | undefined;
        _contributionInstance?: Element[] | undefined;
      
        time?: string | undefined;
        _time?: Element | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        contributionType?: Array<CodeableConcept> | undefined;
        _contributionType?: Element[] | undefined;
      
        contributor: Reference;
        _contributor?: Element | undefined;
      
        correspondingContact?: boolean | undefined;
        _correspondingContact?: Element | undefined;
      
        forenameInitials?: string | undefined;
        _forenameInitials?: Element | undefined;
      
        rankingOrder?: number | undefined;
        _rankingOrder?: Element | undefined;
      
        role?: CodeableConcept | undefined;
        _role?: Element | undefined;
      
        summary?: Array<BackboneElement> | undefined;
        _summary?: Element[] | undefined;
      
        source?: CodeableConcept | undefined;
        _source?: Element | undefined;
      
        style?: CodeableConcept | undefined;
        _style?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        value: string;
        _value?: Element | undefined;
      
        currentState?: Array<CodeableConcept> | undefined;
        _currentState?: Element[] | undefined;
      
        dateAccessed?: string | undefined;
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
      
        articleDate?: string | undefined;
        _articleDate?: Element | undefined;
      
        citedMedium?: CodeableConcept | undefined;
        _citedMedium?: Element | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        firstPage?: string | undefined;
        _firstPage?: Element | undefined;
      
        issue?: string | undefined;
        _issue?: Element | undefined;
      
        language?: Array<CodeableConcept> | undefined;
        _language?: Element[] | undefined;
      
        lastPage?: string | undefined;
        _lastPage?: Element | undefined;
      
        lastRevisionDate?: string | undefined;
        _lastRevisionDate?: Element | undefined;
      
        pageCount?: string | undefined;
        _pageCount?: Element | undefined;
      
        pageString?: string | undefined;
        _pageString?: Element | undefined;
      
        publicationDateSeason?: string | undefined;
        _publicationDateSeason?: Element | undefined;
      
        publicationDateText?: string | undefined;
        _publicationDateText?: Element | undefined;
      
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
      
        volume?: string | undefined;
        _volume?: Element | undefined;
      
        relatedIdentifier?: Array<Identifier> | undefined;
        _relatedIdentifier?: Element[] | undefined;
      
        relatesTo?: Array<BackboneElement> | undefined;
        _relatesTo?: Element[] | undefined;
      
        citation?: string | undefined;
        _citation?: Element | undefined;
      
        classifier?: Array<CodeableConcept> | undefined;
        _classifier?: Element[] | undefined;
      
        display?: string | undefined;
        _display?: Element | undefined;
      
        document?: Attachment | undefined;
        _document?: Element | undefined;
      
        label?: string | undefined;
        _label?: Element | undefined;
      
        resource?: string | undefined;
        _resource?: Element | undefined;
      
        resourceReference?: Reference | undefined;
        _resourceReference?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
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
      
        text: string;
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
      
        classifier?: Array<CodeableConcept> | undefined;
        _classifier?: Element[] | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        classification?: Array<BackboneElement> | undefined;
        _classification?: Element[] | undefined;
      
        classifier?: Array<CodeableConcept> | undefined;
        _classifier?: Element[] | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        currentState?: Array<CodeableConcept> | undefined;
        _currentState?: Element[] | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
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
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        relatedArtifact?: Array<RelatedArtifact> | undefined;
        _relatedArtifact?: Element[] | undefined;
      
        reviewer?: Array<ContactDetail> | undefined;
        _reviewer?: Element[] | undefined;
      
        status: string;
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
      
        text: string;
        _text?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * Claim
 * 
 * A provider issued list of professional services and products which have been
 * provided, or are to be provided, to a patient which is sent to an insurer for
 * reimbursement.
 * 
 * @see {@link http://hl7.org/fhir/R5/Claim.html}
 */
    export interface Claim extends DomainResource {
      
      readonly resourceType: "Claim";
      

      
        accident?: BackboneElement | undefined;
        _accident?: Element | undefined;
      
        date: string;
        _date?: Element | undefined;
      
        locationAddress?: Address | undefined;
        _locationAddress?: Element | undefined;
      
        locationReference?: Reference | undefined;
        _locationReference?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        billablePeriod?: Period | undefined;
        _billablePeriod?: Element | undefined;
      
        careTeam?: Array<BackboneElement> | undefined;
        _careTeam?: Element[] | undefined;
      
        provider: Reference;
        _provider?: Element | undefined;
      
        responsible?: boolean | undefined;
        _responsible?: Element | undefined;
      
        role?: CodeableConcept | undefined;
        _role?: Element | undefined;
      
        sequence: number;
        _sequence?: Element | undefined;
      
        specialty?: CodeableConcept | undefined;
        _specialty?: Element | undefined;
      
        created: string;
        _created?: Element | undefined;
      
        diagnosis?: Array<BackboneElement> | undefined;
        _diagnosis?: Element[] | undefined;
      
        diagnosisCodeableConcept?: CodeableConcept | undefined;
        _diagnosisCodeableConcept?: Element | undefined;
      
        diagnosisReference?: Reference | undefined;
        _diagnosisReference?: Element | undefined;
      
        onAdmission?: CodeableConcept | undefined;
        _onAdmission?: Element | undefined;
      
        sequence: number;
        _sequence?: Element | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
        diagnosisRelatedGroup?: CodeableConcept | undefined;
        _diagnosisRelatedGroup?: Element | undefined;
      
        encounter?: Array<Reference> | undefined;
        _encounter?: Element[] | undefined;
      
        enterer?: Reference | undefined;
        _enterer?: Element | undefined;
      
        event?: Array<BackboneElement> | undefined;
        _event?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        whenDateTime?: string | undefined;
        _whenDateTime?: Element | undefined;
      
        whenPeriod?: Period | undefined;
        _whenPeriod?: Element | undefined;
      
        facility?: Reference | undefined;
        _facility?: Element | undefined;
      
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
      
        identifier?: Identifier | undefined;
        _identifier?: Element | undefined;
      
        preAuthRef?: Array<string> | undefined;
        _preAuthRef?: Element[] | undefined;
      
        sequence: number;
        _sequence?: Element | undefined;
      
        insurer?: Reference | undefined;
        _insurer?: Element | undefined;
      
        item?: Array<BackboneElement> | undefined;
        _item?: Element[] | undefined;
      
        bodySite?: Array<BackboneElement> | undefined;
        _bodySite?: Element[] | undefined;
      
        site: Array<CodeableReference>;
        _site?: Element[] | undefined;
      
        subSite?: Array<CodeableConcept> | undefined;
        _subSite?: Element[] | undefined;
      
        careTeamSequence?: Array<number> | undefined;
        _careTeamSequence?: Element[] | undefined;
      
        category?: CodeableConcept | undefined;
        _category?: Element | undefined;
      
        detail?: Array<BackboneElement> | undefined;
        _detail?: Element[] | undefined;
      
        category?: CodeableConcept | undefined;
        _category?: Element | undefined;
      
        factor?: number | undefined;
        _factor?: Element | undefined;
      
        modifier?: Array<CodeableConcept> | undefined;
        _modifier?: Element[] | undefined;
      
        net?: Money | undefined;
        _net?: Element | undefined;
      
        patientPaid?: Money | undefined;
        _patientPaid?: Element | undefined;
      
        productOrService?: CodeableConcept | undefined;
        _productOrService?: Element | undefined;
      
        productOrServiceEnd?: CodeableConcept | undefined;
        _productOrServiceEnd?: Element | undefined;
      
        programCode?: Array<CodeableConcept> | undefined;
        _programCode?: Element[] | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        revenue?: CodeableConcept | undefined;
        _revenue?: Element | undefined;
      
        sequence: number;
        _sequence?: Element | undefined;
      
        subDetail?: Array<BackboneElement> | undefined;
        _subDetail?: Element[] | undefined;
      
        category?: CodeableConcept | undefined;
        _category?: Element | undefined;
      
        factor?: number | undefined;
        _factor?: Element | undefined;
      
        modifier?: Array<CodeableConcept> | undefined;
        _modifier?: Element[] | undefined;
      
        net?: Money | undefined;
        _net?: Element | undefined;
      
        patientPaid?: Money | undefined;
        _patientPaid?: Element | undefined;
      
        productOrService?: CodeableConcept | undefined;
        _productOrService?: Element | undefined;
      
        productOrServiceEnd?: CodeableConcept | undefined;
        _productOrServiceEnd?: Element | undefined;
      
        programCode?: Array<CodeableConcept> | undefined;
        _programCode?: Element[] | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        revenue?: CodeableConcept | undefined;
        _revenue?: Element | undefined;
      
        sequence: number;
        _sequence?: Element | undefined;
      
        tax?: Money | undefined;
        _tax?: Element | undefined;
      
        traceNumber?: Array<Identifier> | undefined;
        _traceNumber?: Element[] | undefined;
      
        udi?: Array<Reference> | undefined;
        _udi?: Element[] | undefined;
      
        unitPrice?: Money | undefined;
        _unitPrice?: Element | undefined;
      
        tax?: Money | undefined;
        _tax?: Element | undefined;
      
        traceNumber?: Array<Identifier> | undefined;
        _traceNumber?: Element[] | undefined;
      
        udi?: Array<Reference> | undefined;
        _udi?: Element[] | undefined;
      
        unitPrice?: Money | undefined;
        _unitPrice?: Element | undefined;
      
        diagnosisSequence?: Array<number> | undefined;
        _diagnosisSequence?: Element[] | undefined;
      
        encounter?: Array<Reference> | undefined;
        _encounter?: Element[] | undefined;
      
        factor?: number | undefined;
        _factor?: Element | undefined;
      
        informationSequence?: Array<number> | undefined;
        _informationSequence?: Element[] | undefined;
      
        locationAddress?: Address | undefined;
        _locationAddress?: Element | undefined;
      
        locationCodeableConcept?: CodeableConcept | undefined;
        _locationCodeableConcept?: Element | undefined;
      
        locationReference?: Reference | undefined;
        _locationReference?: Element | undefined;
      
        modifier?: Array<CodeableConcept> | undefined;
        _modifier?: Element[] | undefined;
      
        net?: Money | undefined;
        _net?: Element | undefined;
      
        patientPaid?: Money | undefined;
        _patientPaid?: Element | undefined;
      
        procedureSequence?: Array<number> | undefined;
        _procedureSequence?: Element[] | undefined;
      
        productOrService?: CodeableConcept | undefined;
        _productOrService?: Element | undefined;
      
        productOrServiceEnd?: CodeableConcept | undefined;
        _productOrServiceEnd?: Element | undefined;
      
        programCode?: Array<CodeableConcept> | undefined;
        _programCode?: Element[] | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        request?: Array<Reference> | undefined;
        _request?: Element[] | undefined;
      
        revenue?: CodeableConcept | undefined;
        _revenue?: Element | undefined;
      
        sequence: number;
        _sequence?: Element | undefined;
      
        servicedDate?: string | undefined;
        _servicedDate?: Element | undefined;
      
        servicedPeriod?: Period | undefined;
        _servicedPeriod?: Element | undefined;
      
        tax?: Money | undefined;
        _tax?: Element | undefined;
      
        traceNumber?: Array<Identifier> | undefined;
        _traceNumber?: Element[] | undefined;
      
        udi?: Array<Reference> | undefined;
        _udi?: Element[] | undefined;
      
        unitPrice?: Money | undefined;
        _unitPrice?: Element | undefined;
      
        originalPrescription?: Reference | undefined;
        _originalPrescription?: Element | undefined;
      
        patient: Reference;
        _patient?: Element | undefined;
      
        patientPaid?: Money | undefined;
        _patientPaid?: Element | undefined;
      
        payee?: BackboneElement | undefined;
        _payee?: Element | undefined;
      
        party?: Reference | undefined;
        _party?: Element | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        prescription?: Reference | undefined;
        _prescription?: Element | undefined;
      
        priority?: CodeableConcept | undefined;
        _priority?: Element | undefined;
      
        procedure?: Array<BackboneElement> | undefined;
        _procedure?: Element[] | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        procedureCodeableConcept?: CodeableConcept | undefined;
        _procedureCodeableConcept?: Element | undefined;
      
        procedureReference?: Reference | undefined;
        _procedureReference?: Element | undefined;
      
        sequence: number;
        _sequence?: Element | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
        udi?: Array<Reference> | undefined;
        _udi?: Element[] | undefined;
      
        provider?: Reference | undefined;
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
      
        status: string;
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
      
        sequence: number;
        _sequence?: Element | undefined;
      
        timingDate?: string | undefined;
        _timingDate?: Element | undefined;
      
        timingPeriod?: Period | undefined;
        _timingPeriod?: Element | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueIdentifier?: Identifier | undefined;
        _valueIdentifier?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        total?: Money | undefined;
        _total?: Element | undefined;
      
        traceNumber?: Array<Identifier> | undefined;
        _traceNumber?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        use: string;
        _use?: Element | undefined;
      
    }

  


  
    /**
 * ClaimResponse
 * 
 * This resource provides the adjudication details from the processing of a Claim
 * resource.
 * 
 * @see {@link http://hl7.org/fhir/R5/ClaimResponse.html}
 */
    export interface ClaimResponse extends DomainResource {
      
      readonly resourceType: "ClaimResponse";
      

      
        addItem?: Array<BackboneElement> | undefined;
        _addItem?: Element[] | undefined;
      
        adjudication?: Array<undefined> | undefined;
        _adjudication?: Element[] | undefined;
      
        bodySite?: Array<BackboneElement> | undefined;
        _bodySite?: Element[] | undefined;
      
        site: Array<CodeableReference>;
        _site?: Element[] | undefined;
      
        subSite?: Array<CodeableConcept> | undefined;
        _subSite?: Element[] | undefined;
      
        detail?: Array<BackboneElement> | undefined;
        _detail?: Element[] | undefined;
      
        adjudication?: Array<undefined> | undefined;
        _adjudication?: Element[] | undefined;
      
        factor?: number | undefined;
        _factor?: Element | undefined;
      
        modifier?: Array<CodeableConcept> | undefined;
        _modifier?: Element[] | undefined;
      
        net?: Money | undefined;
        _net?: Element | undefined;
      
        noteNumber?: Array<number> | undefined;
        _noteNumber?: Element[] | undefined;
      
        productOrService?: CodeableConcept | undefined;
        _productOrService?: Element | undefined;
      
        productOrServiceEnd?: CodeableConcept | undefined;
        _productOrServiceEnd?: Element | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        revenue?: CodeableConcept | undefined;
        _revenue?: Element | undefined;
      
        reviewOutcome?: undefined | undefined;
        _reviewOutcome?: Element | undefined;
      
        subDetail?: Array<BackboneElement> | undefined;
        _subDetail?: Element[] | undefined;
      
        adjudication?: Array<undefined> | undefined;
        _adjudication?: Element[] | undefined;
      
        factor?: number | undefined;
        _factor?: Element | undefined;
      
        modifier?: Array<CodeableConcept> | undefined;
        _modifier?: Element[] | undefined;
      
        net?: Money | undefined;
        _net?: Element | undefined;
      
        noteNumber?: Array<number> | undefined;
        _noteNumber?: Element[] | undefined;
      
        productOrService?: CodeableConcept | undefined;
        _productOrService?: Element | undefined;
      
        productOrServiceEnd?: CodeableConcept | undefined;
        _productOrServiceEnd?: Element | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        revenue?: CodeableConcept | undefined;
        _revenue?: Element | undefined;
      
        reviewOutcome?: undefined | undefined;
        _reviewOutcome?: Element | undefined;
      
        tax?: Money | undefined;
        _tax?: Element | undefined;
      
        traceNumber?: Array<Identifier> | undefined;
        _traceNumber?: Element[] | undefined;
      
        unitPrice?: Money | undefined;
        _unitPrice?: Element | undefined;
      
        tax?: Money | undefined;
        _tax?: Element | undefined;
      
        traceNumber?: Array<Identifier> | undefined;
        _traceNumber?: Element[] | undefined;
      
        unitPrice?: Money | undefined;
        _unitPrice?: Element | undefined;
      
        detailSequence?: Array<number> | undefined;
        _detailSequence?: Element[] | undefined;
      
        factor?: number | undefined;
        _factor?: Element | undefined;
      
        itemSequence?: Array<number> | undefined;
        _itemSequence?: Element[] | undefined;
      
        locationAddress?: Address | undefined;
        _locationAddress?: Element | undefined;
      
        locationCodeableConcept?: CodeableConcept | undefined;
        _locationCodeableConcept?: Element | undefined;
      
        locationReference?: Reference | undefined;
        _locationReference?: Element | undefined;
      
        modifier?: Array<CodeableConcept> | undefined;
        _modifier?: Element[] | undefined;
      
        net?: Money | undefined;
        _net?: Element | undefined;
      
        noteNumber?: Array<number> | undefined;
        _noteNumber?: Element[] | undefined;
      
        productOrService?: CodeableConcept | undefined;
        _productOrService?: Element | undefined;
      
        productOrServiceEnd?: CodeableConcept | undefined;
        _productOrServiceEnd?: Element | undefined;
      
        programCode?: Array<CodeableConcept> | undefined;
        _programCode?: Element[] | undefined;
      
        provider?: Array<Reference> | undefined;
        _provider?: Element[] | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        request?: Array<Reference> | undefined;
        _request?: Element[] | undefined;
      
        revenue?: CodeableConcept | undefined;
        _revenue?: Element | undefined;
      
        reviewOutcome?: undefined | undefined;
        _reviewOutcome?: Element | undefined;
      
        servicedDate?: string | undefined;
        _servicedDate?: Element | undefined;
      
        servicedPeriod?: Period | undefined;
        _servicedPeriod?: Element | undefined;
      
        subdetailSequence?: Array<number> | undefined;
        _subdetailSequence?: Element[] | undefined;
      
        tax?: Money | undefined;
        _tax?: Element | undefined;
      
        traceNumber?: Array<Identifier> | undefined;
        _traceNumber?: Element[] | undefined;
      
        unitPrice?: Money | undefined;
        _unitPrice?: Element | undefined;
      
        adjudication?: Array<undefined> | undefined;
        _adjudication?: Element[] | undefined;
      
        communicationRequest?: Array<Reference> | undefined;
        _communicationRequest?: Element[] | undefined;
      
        created: string;
        _created?: Element | undefined;
      
        decision?: CodeableConcept | undefined;
        _decision?: Element | undefined;
      
        diagnosisRelatedGroup?: CodeableConcept | undefined;
        _diagnosisRelatedGroup?: Element | undefined;
      
        disposition?: string | undefined;
        _disposition?: Element | undefined;
      
        encounter?: Array<Reference> | undefined;
        _encounter?: Element[] | undefined;
      
        error?: Array<BackboneElement> | undefined;
        _error?: Element[] | undefined;
      
        code: CodeableConcept;
        _code?: Element | undefined;
      
        detailSequence?: number | undefined;
        _detailSequence?: Element | undefined;
      
        expression?: Array<string> | undefined;
        _expression?: Element[] | undefined;
      
        itemSequence?: number | undefined;
        _itemSequence?: Element | undefined;
      
        subDetailSequence?: number | undefined;
        _subDetailSequence?: Element | undefined;
      
        event?: Array<BackboneElement> | undefined;
        _event?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        whenDateTime?: string | undefined;
        _whenDateTime?: Element | undefined;
      
        whenPeriod?: Period | undefined;
        _whenPeriod?: Element | undefined;
      
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
      
        sequence: number;
        _sequence?: Element | undefined;
      
        insurer?: Reference | undefined;
        _insurer?: Element | undefined;
      
        item?: Array<BackboneElement> | undefined;
        _item?: Element[] | undefined;
      
        adjudication?: Array<BackboneElement> | undefined;
        _adjudication?: Element[] | undefined;
      
        amount?: Money | undefined;
        _amount?: Element | undefined;
      
        category: CodeableConcept;
        _category?: Element | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        reason?: CodeableConcept | undefined;
        _reason?: Element | undefined;
      
        detail?: Array<BackboneElement> | undefined;
        _detail?: Element[] | undefined;
      
        adjudication?: Array<undefined> | undefined;
        _adjudication?: Element[] | undefined;
      
        detailSequence: number;
        _detailSequence?: Element | undefined;
      
        noteNumber?: Array<number> | undefined;
        _noteNumber?: Element[] | undefined;
      
        reviewOutcome?: undefined | undefined;
        _reviewOutcome?: Element | undefined;
      
        subDetail?: Array<BackboneElement> | undefined;
        _subDetail?: Element[] | undefined;
      
        adjudication?: Array<undefined> | undefined;
        _adjudication?: Element[] | undefined;
      
        noteNumber?: Array<number> | undefined;
        _noteNumber?: Element[] | undefined;
      
        reviewOutcome?: undefined | undefined;
        _reviewOutcome?: Element | undefined;
      
        subDetailSequence: number;
        _subDetailSequence?: Element | undefined;
      
        traceNumber?: Array<Identifier> | undefined;
        _traceNumber?: Element[] | undefined;
      
        traceNumber?: Array<Identifier> | undefined;
        _traceNumber?: Element[] | undefined;
      
        itemSequence: number;
        _itemSequence?: Element | undefined;
      
        noteNumber?: Array<number> | undefined;
        _noteNumber?: Element[] | undefined;
      
        reviewOutcome?: BackboneElement | undefined;
        _reviewOutcome?: Element | undefined;
      
        decision?: CodeableConcept | undefined;
        _decision?: Element | undefined;
      
        preAuthPeriod?: Period | undefined;
        _preAuthPeriod?: Element | undefined;
      
        preAuthRef?: string | undefined;
        _preAuthRef?: Element | undefined;
      
        reason?: Array<CodeableConcept> | undefined;
        _reason?: Element[] | undefined;
      
        traceNumber?: Array<Identifier> | undefined;
        _traceNumber?: Element[] | undefined;
      
        outcome: string;
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
      
        date?: string | undefined;
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
      
        number?: number | undefined;
        _number?: Element | undefined;
      
        text: string;
        _text?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        request?: Reference | undefined;
        _request?: Element | undefined;
      
        requestor?: Reference | undefined;
        _requestor?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subType?: CodeableConcept | undefined;
        _subType?: Element | undefined;
      
        total?: Array<BackboneElement> | undefined;
        _total?: Element[] | undefined;
      
        amount: Money;
        _amount?: Element | undefined;
      
        category: CodeableConcept;
        _category?: Element | undefined;
      
        traceNumber?: Array<Identifier> | undefined;
        _traceNumber?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        use: string;
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
 * @see {@link http://hl7.org/fhir/R5/ClinicalImpression.html}
 */
    export interface ClinicalImpression extends DomainResource {
      
      readonly resourceType: "ClinicalImpression";
      

      
        changePattern?: CodeableConcept | undefined;
        _changePattern?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        effectiveDateTime?: string | undefined;
        _effectiveDateTime?: Element | undefined;
      
        effectivePeriod?: Period | undefined;
        _effectivePeriod?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        finding?: Array<BackboneElement> | undefined;
        _finding?: Element[] | undefined;
      
        basis?: string | undefined;
        _basis?: Element | undefined;
      
        item?: CodeableReference | undefined;
        _item?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        performer?: Reference | undefined;
        _performer?: Element | undefined;
      
        previous?: Reference | undefined;
        _previous?: Element | undefined;
      
        problem?: Array<Reference> | undefined;
        _problem?: Element[] | undefined;
      
        prognosisCodeableConcept?: Array<CodeableConcept> | undefined;
        _prognosisCodeableConcept?: Element[] | undefined;
      
        prognosisReference?: Array<Reference> | undefined;
        _prognosisReference?: Element[] | undefined;
      
        protocol?: Array<string> | undefined;
        _protocol?: Element[] | undefined;
      
        status: string;
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
 * @see {@link http://hl7.org/fhir/R5/ClinicalUseDefinition.html}
 */
    export interface ClinicalUseDefinition extends DomainResource {
      
      readonly resourceType: "ClinicalUseDefinition";
      

      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        contraindication?: BackboneElement | undefined;
        _contraindication?: Element | undefined;
      
        applicability?: Expression | undefined;
        _applicability?: Element | undefined;
      
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
      
        treatment: CodeableReference;
        _treatment?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        indication?: BackboneElement | undefined;
        _indication?: Element | undefined;
      
        applicability?: Expression | undefined;
        _applicability?: Element | undefined;
      
        comorbidity?: Array<CodeableReference> | undefined;
        _comorbidity?: Element[] | undefined;
      
        diseaseStatus?: CodeableReference | undefined;
        _diseaseStatus?: Element | undefined;
      
        diseaseSymptomProcedure?: CodeableReference | undefined;
        _diseaseSymptomProcedure?: Element | undefined;
      
        durationRange?: Range | undefined;
        _durationRange?: Element | undefined;
      
        durationString?: string | undefined;
        _durationString?: Element | undefined;
      
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
      
        itemCodeableConcept?: CodeableConcept | undefined;
        _itemCodeableConcept?: Element | undefined;
      
        itemReference?: Reference | undefined;
        _itemReference?: Element | undefined;
      
        management?: Array<CodeableConcept> | undefined;
        _management?: Element[] | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        library?: Array<string> | undefined;
        _library?: Element[] | undefined;
      
        population?: Array<Reference> | undefined;
        _population?: Element[] | undefined;
      
        status?: CodeableConcept | undefined;
        _status?: Element | undefined;
      
        subject?: Array<Reference> | undefined;
        _subject?: Element[] | undefined;
      
        type: string;
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
      
        description?: string | undefined;
        _description?: Element | undefined;
      
    }

  


  


  
    /**
 * CodeableConcept
 * 
 * CodeableConcept Type: A concept that may be defined by a formal reference to a
 * terminology or ontology or may be provided by text.
 * 
 * @see {@link http://hl7.org/fhir/R5/CodeableConcept.html}
 */
    export interface CodeableConcept extends DataType {
      
      readonly resourceType: string;
      

      
        coding?: Array<Coding> | undefined;
        _coding?: Element[] | undefined;
      
        text?: string | undefined;
        _text?: Element | undefined;
      
    }

  


  
    /**
 * CodeableReference
 * 
 * CodeableReference Type: A reference to a resource (by instance), or instead, a
 * reference to a concept defined in a terminology or ontology (by class).
 * 
 * @see {@link http://hl7.org/fhir/R5/CodeableReference.html}
 */
    export interface CodeableReference extends DataType {
      
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
 * @see {@link http://hl7.org/fhir/R5/CodeSystem.html}
 */
    export interface CodeSystem extends DomainResource {
      
      readonly resourceType: "CodeSystem";
      

      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        author?: Array<ContactDetail> | undefined;
        _author?: Element[] | undefined;
      
        caseSensitive?: boolean | undefined;
        _caseSensitive?: Element | undefined;
      
        compositional?: boolean | undefined;
        _compositional?: Element | undefined;
      
        concept?: Array<BackboneElement> | undefined;
        _concept?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        concept?: Array<undefined> | undefined;
        _concept?: Element[] | undefined;
      
        definition?: string | undefined;
        _definition?: Element | undefined;
      
        designation?: Array<BackboneElement> | undefined;
        _designation?: Element[] | undefined;
      
        additionalUse?: Array<Coding> | undefined;
        _additionalUse?: Element[] | undefined;
      
        language?: string | undefined;
        _language?: Element | undefined;
      
        use?: Coding | undefined;
        _use?: Element | undefined;
      
        value: string;
        _value?: Element | undefined;
      
        display?: string | undefined;
        _display?: Element | undefined;
      
        property?: Array<BackboneElement> | undefined;
        _property?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCode?: string | undefined;
        _valueCode?: Element | undefined;
      
        valueCoding?: Coding | undefined;
        _valueCoding?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueDecimal?: number | undefined;
        _valueDecimal?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        content: string;
        _content?: Element | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        count?: unsignedInt | undefined;
        _count?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        editor?: Array<ContactDetail> | undefined;
        _editor?: Element[] | undefined;
      
        effectivePeriod?: Period | undefined;
        _effectivePeriod?: Element | undefined;
      
        endorser?: Array<ContactDetail> | undefined;
        _endorser?: Element[] | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        filter?: Array<BackboneElement> | undefined;
        _filter?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        operator: Array<string>;
        _operator?: Element[] | undefined;
      
        value: string;
        _value?: Element | undefined;
      
        hierarchyMeaning?: string | undefined;
        _hierarchyMeaning?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        property?: Array<BackboneElement> | undefined;
        _property?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        uri?: string | undefined;
        _uri?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        relatedArtifact?: Array<RelatedArtifact> | undefined;
        _relatedArtifact?: Element[] | undefined;
      
        reviewer?: Array<ContactDetail> | undefined;
        _reviewer?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        supplements?: string | undefined;
        _supplements?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        topic?: Array<CodeableConcept> | undefined;
        _topic?: Element[] | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        valueSet?: string | undefined;
        _valueSet?: Element | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
        versionNeeded?: boolean | undefined;
        _versionNeeded?: Element | undefined;
      
    }

  


  
    /**
 * Coding
 * 
 * Coding Type: A reference to a code defined by a terminology system.
 * 
 * @see {@link http://hl7.org/fhir/R5/Coding.html}
 */
    export interface Coding extends DataType {
      
      readonly resourceType: string;
      

      
        code?: string | undefined;
        _code?: Element | undefined;
      
        display?: string | undefined;
        _display?: Element | undefined;
      
        system?: string | undefined;
        _system?: Element | undefined;
      
        userSelected?: boolean | undefined;
        _userSelected?: Element | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
    }

  


  
    /**
 * Communication
 * 
 * A clinical or business level record of information being transmitted or shared;
 * e.g. an alert that was sent to a responsible provider, a public health agency
 * communication to a provider/reporter in response to a case report for a
 * reportable condition.
 * 
 * @see {@link http://hl7.org/fhir/R5/Communication.html}
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
      
        instantiatesCanonical?: Array<string> | undefined;
        _instantiatesCanonical?: Element[] | undefined;
      
        instantiatesUri?: Array<string> | undefined;
        _instantiatesUri?: Element[] | undefined;
      
        medium?: Array<CodeableConcept> | undefined;
        _medium?: Element[] | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        partOf?: Array<Reference> | undefined;
        _partOf?: Element[] | undefined;
      
        payload?: Array<BackboneElement> | undefined;
        _payload?: Element[] | undefined;
      
        contentAttachment?: Attachment | undefined;
        _contentAttachment?: Element | undefined;
      
        contentCodeableConcept?: CodeableConcept | undefined;
        _contentCodeableConcept?: Element | undefined;
      
        contentReference?: Reference | undefined;
        _contentReference?: Element | undefined;
      
        priority?: string | undefined;
        _priority?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        received?: string | undefined;
        _received?: Element | undefined;
      
        recipient?: Array<Reference> | undefined;
        _recipient?: Element[] | undefined;
      
        sender?: Reference | undefined;
        _sender?: Element | undefined;
      
        sent?: string | undefined;
        _sent?: Element | undefined;
      
        status: string;
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
 * @see {@link http://hl7.org/fhir/R5/CommunicationRequest.html}
 */
    export interface CommunicationRequest extends DomainResource {
      
      readonly resourceType: "CommunicationRequest";
      

      
        about?: Array<Reference> | undefined;
        _about?: Element[] | undefined;
      
        authoredOn?: string | undefined;
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
      
        informationProvider?: Array<Reference> | undefined;
        _informationProvider?: Element[] | undefined;
      
        intent: string;
        _intent?: Element | undefined;
      
        medium?: Array<CodeableConcept> | undefined;
        _medium?: Element[] | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        occurrenceDateTime?: string | undefined;
        _occurrenceDateTime?: Element | undefined;
      
        occurrencePeriod?: Period | undefined;
        _occurrencePeriod?: Element | undefined;
      
        payload?: Array<BackboneElement> | undefined;
        _payload?: Element[] | undefined;
      
        contentAttachment?: Attachment | undefined;
        _contentAttachment?: Element | undefined;
      
        contentCodeableConcept?: CodeableConcept | undefined;
        _contentCodeableConcept?: Element | undefined;
      
        contentReference?: Reference | undefined;
        _contentReference?: Element | undefined;
      
        priority?: string | undefined;
        _priority?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        recipient?: Array<Reference> | undefined;
        _recipient?: Element[] | undefined;
      
        replaces?: Array<Reference> | undefined;
        _replaces?: Element[] | undefined;
      
        requester?: Reference | undefined;
        _requester?: Element | undefined;
      
        status: string;
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
 * @see {@link http://hl7.org/fhir/R5/CompartmentDefinition.html}
 */
    export interface CompartmentDefinition extends DomainResource {
      
      readonly resourceType: "CompartmentDefinition";
      

      
        code: string;
        _code?: Element | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        resource?: Array<BackboneElement> | undefined;
        _resource?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        documentation?: string | undefined;
        _documentation?: Element | undefined;
      
        endParam?: string | undefined;
        _endParam?: Element | undefined;
      
        param?: Array<string> | undefined;
        _param?: Element[] | undefined;
      
        startParam?: string | undefined;
        _startParam?: Element | undefined;
      
        search: boolean;
        _search?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url: string;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
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
 * @see {@link http://hl7.org/fhir/R5/Composition.html}
 */
    export interface Composition extends DomainResource {
      
      readonly resourceType: "Composition";
      

      
        attester?: Array<BackboneElement> | undefined;
        _attester?: Element[] | undefined;
      
        mode: CodeableConcept;
        _mode?: Element | undefined;
      
        party?: Reference | undefined;
        _party?: Element | undefined;
      
        time?: string | undefined;
        _time?: Element | undefined;
      
        author: Array<Reference>;
        _author?: Element[] | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        custodian?: Reference | undefined;
        _custodian?: Element | undefined;
      
        date: string;
        _date?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        event?: Array<BackboneElement> | undefined;
        _event?: Element[] | undefined;
      
        detail?: Array<CodeableReference> | undefined;
        _detail?: Element[] | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        relatesTo?: Array<RelatedArtifact> | undefined;
        _relatesTo?: Element[] | undefined;
      
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
      
        orderedBy?: CodeableConcept | undefined;
        _orderedBy?: Element | undefined;
      
        section?: Array<undefined> | undefined;
        _section?: Element[] | undefined;
      
        text?: Narrative | undefined;
        _text?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject?: Array<Reference> | undefined;
        _subject?: Element[] | undefined;
      
        title: string;
        _title?: Element | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
    }

  


  


  


  
    /**
 * ConceptMap
 * 
 * A statement of relationships from one set of concepts to one or more other
 * concepts - either concepts in code systems, or data element/data element
 * concepts, or classes in class models.
 * 
 * @see {@link http://hl7.org/fhir/R5/ConceptMap.html}
 */
    export interface ConceptMap extends DomainResource {
      
      readonly resourceType: "ConceptMap";
      

      
        additionalAttribute?: Array<BackboneElement> | undefined;
        _additionalAttribute?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        uri?: string | undefined;
        _uri?: Element | undefined;
      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        author?: Array<ContactDetail> | undefined;
        _author?: Element[] | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
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
      
        element: Array<BackboneElement>;
        _element?: Element[] | undefined;
      
        code?: string | undefined;
        _code?: Element | undefined;
      
        display?: string | undefined;
        _display?: Element | undefined;
      
        noMap?: boolean | undefined;
        _noMap?: Element | undefined;
      
        target?: Array<BackboneElement> | undefined;
        _target?: Element[] | undefined;
      
        code?: string | undefined;
        _code?: Element | undefined;
      
        comment?: string | undefined;
        _comment?: Element | undefined;
      
        dependsOn?: Array<BackboneElement> | undefined;
        _dependsOn?: Element[] | undefined;
      
        attribute: string;
        _attribute?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCode?: string | undefined;
        _valueCode?: Element | undefined;
      
        valueCoding?: Coding | undefined;
        _valueCoding?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueSet?: string | undefined;
        _valueSet?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        display?: string | undefined;
        _display?: Element | undefined;
      
        product?: Array<undefined> | undefined;
        _product?: Element[] | undefined;
      
        property?: Array<BackboneElement> | undefined;
        _property?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCode?: string | undefined;
        _valueCode?: Element | undefined;
      
        valueCoding?: Coding | undefined;
        _valueCoding?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueDecimal?: number | undefined;
        _valueDecimal?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        relationship: string;
        _relationship?: Element | undefined;
      
        valueSet?: string | undefined;
        _valueSet?: Element | undefined;
      
        valueSet?: string | undefined;
        _valueSet?: Element | undefined;
      
        source?: string | undefined;
        _source?: Element | undefined;
      
        target?: string | undefined;
        _target?: Element | undefined;
      
        unmapped?: BackboneElement | undefined;
        _unmapped?: Element | undefined;
      
        code?: string | undefined;
        _code?: Element | undefined;
      
        display?: string | undefined;
        _display?: Element | undefined;
      
        mode: string;
        _mode?: Element | undefined;
      
        otherMap?: string | undefined;
        _otherMap?: Element | undefined;
      
        relationship?: string | undefined;
        _relationship?: Element | undefined;
      
        valueSet?: string | undefined;
        _valueSet?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        property?: Array<BackboneElement> | undefined;
        _property?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        system?: string | undefined;
        _system?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        uri?: string | undefined;
        _uri?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        relatedArtifact?: Array<RelatedArtifact> | undefined;
        _relatedArtifact?: Element[] | undefined;
      
        reviewer?: Array<ContactDetail> | undefined;
        _reviewer?: Element[] | undefined;
      
        sourceScopeCanonical?: string | undefined;
        _sourceScopeCanonical?: Element | undefined;
      
        sourceScopeUri?: string | undefined;
        _sourceScopeUri?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        targetScopeCanonical?: string | undefined;
        _targetScopeCanonical?: Element | undefined;
      
        targetScopeUri?: string | undefined;
        _targetScopeUri?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        topic?: Array<CodeableConcept> | undefined;
        _topic?: Element[] | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * Condition
 * 
 * A clinical condition, problem, diagnosis, or other event, situation, issue, or
 * clinical concept that has risen to a level of concern.
 * 
 * @see {@link http://hl7.org/fhir/R5/Condition.html}
 */
    export interface Condition extends DomainResource {
      
      readonly resourceType: "Condition";
      

      
        abatementAge?: Age | undefined;
        _abatementAge?: Element | undefined;
      
        abatementDateTime?: string | undefined;
        _abatementDateTime?: Element | undefined;
      
        abatementPeriod?: Period | undefined;
        _abatementPeriod?: Element | undefined;
      
        abatementRange?: Range | undefined;
        _abatementRange?: Element | undefined;
      
        abatementString?: string | undefined;
        _abatementString?: Element | undefined;
      
        bodySite?: Array<CodeableConcept> | undefined;
        _bodySite?: Element[] | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        clinicalStatus: CodeableConcept;
        _clinicalStatus?: Element | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        evidence?: Array<CodeableReference> | undefined;
        _evidence?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        onsetAge?: Age | undefined;
        _onsetAge?: Element | undefined;
      
        onsetDateTime?: string | undefined;
        _onsetDateTime?: Element | undefined;
      
        onsetPeriod?: Period | undefined;
        _onsetPeriod?: Element | undefined;
      
        onsetRange?: Range | undefined;
        _onsetRange?: Element | undefined;
      
        onsetString?: string | undefined;
        _onsetString?: Element | undefined;
      
        participant?: Array<BackboneElement> | undefined;
        _participant?: Element[] | undefined;
      
        actor: Reference;
        _actor?: Element | undefined;
      
        function?: CodeableConcept | undefined;
        _function?: Element | undefined;
      
        recordedDate?: string | undefined;
        _recordedDate?: Element | undefined;
      
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
 * ConditionDefinition
 * 
 * A definition of a condition and information relevant to managing it.
 * 
 * @see {@link http://hl7.org/fhir/R5/ConditionDefinition.html}
 */
    export interface ConditionDefinition extends DomainResource {
      
      readonly resourceType: "ConditionDefinition";
      

      
        bodySite?: CodeableConcept | undefined;
        _bodySite?: Element | undefined;
      
        code: CodeableConcept;
        _code?: Element | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        definition?: Array<string> | undefined;
        _definition?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        hasBodySite?: boolean | undefined;
        _hasBodySite?: Element | undefined;
      
        hasSeverity?: boolean | undefined;
        _hasSeverity?: Element | undefined;
      
        hasStage?: boolean | undefined;
        _hasStage?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        medication?: Array<BackboneElement> | undefined;
        _medication?: Element[] | undefined;
      
        category?: CodeableConcept | undefined;
        _category?: Element | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        observation?: Array<BackboneElement> | undefined;
        _observation?: Element[] | undefined;
      
        category?: CodeableConcept | undefined;
        _category?: Element | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        plan?: Array<BackboneElement> | undefined;
        _plan?: Element[] | undefined;
      
        reference: Reference;
        _reference?: Element | undefined;
      
        role?: CodeableConcept | undefined;
        _role?: Element | undefined;
      
        precondition?: Array<BackboneElement> | undefined;
        _precondition?: Element[] | undefined;
      
        code: CodeableConcept;
        _code?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        questionnaire?: Array<BackboneElement> | undefined;
        _questionnaire?: Element[] | undefined;
      
        purpose: string;
        _purpose?: Element | undefined;
      
        reference: Reference;
        _reference?: Element | undefined;
      
        severity?: CodeableConcept | undefined;
        _severity?: Element | undefined;
      
        stage?: CodeableConcept | undefined;
        _stage?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subtitle?: string | undefined;
        _subtitle?: Element | undefined;
      
        team?: Array<Reference> | undefined;
        _team?: Element[] | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * Consent
 * 
 * A record of a healthcare consumer’s  choices  or choices made on their behalf by
 * a third party, which permits or denies identified recipient(s) or recipient
 * role(s) to perform one or more actions within a given policy context, for
 * specific purposes and periods of time.
 * 
 * @see {@link http://hl7.org/fhir/R5/Consent.html}
 */
    export interface Consent extends DomainResource {
      
      readonly resourceType: "Consent";
      

      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        controller?: Array<Reference> | undefined;
        _controller?: Element[] | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        decision?: string | undefined;
        _decision?: Element | undefined;
      
        grantee?: Array<Reference> | undefined;
        _grantee?: Element[] | undefined;
      
        grantor?: Array<Reference> | undefined;
        _grantor?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        manager?: Array<Reference> | undefined;
        _manager?: Element[] | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        policyBasis?: BackboneElement | undefined;
        _policyBasis?: Element | undefined;
      
        reference?: Reference | undefined;
        _reference?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        policyText?: Array<Reference> | undefined;
        _policyText?: Element[] | undefined;
      
        provision?: Array<BackboneElement> | undefined;
        _provision?: Element[] | undefined;
      
        action?: Array<CodeableConcept> | undefined;
        _action?: Element[] | undefined;
      
        actor?: Array<BackboneElement> | undefined;
        _actor?: Element[] | undefined;
      
        reference?: Reference | undefined;
        _reference?: Element | undefined;
      
        role?: CodeableConcept | undefined;
        _role?: Element | undefined;
      
        code?: Array<CodeableConcept> | undefined;
        _code?: Element[] | undefined;
      
        data?: Array<BackboneElement> | undefined;
        _data?: Element[] | undefined;
      
        meaning: string;
        _meaning?: Element | undefined;
      
        reference: Reference;
        _reference?: Element | undefined;
      
        dataPeriod?: Period | undefined;
        _dataPeriod?: Element | undefined;
      
        documentType?: Array<Coding> | undefined;
        _documentType?: Element[] | undefined;
      
        expression?: Expression | undefined;
        _expression?: Element | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        provision?: Array<undefined> | undefined;
        _provision?: Element[] | undefined;
      
        purpose?: Array<Coding> | undefined;
        _purpose?: Element[] | undefined;
      
        resourceType?: Array<Coding> | undefined;
        _resourceType?: Element[] | undefined;
      
        securityLabel?: Array<Coding> | undefined;
        _securityLabel?: Element[] | undefined;
      
        regulatoryBasis?: Array<CodeableConcept> | undefined;
        _regulatoryBasis?: Element[] | undefined;
      
        sourceAttachment?: Array<Attachment> | undefined;
        _sourceAttachment?: Element[] | undefined;
      
        sourceReference?: Array<Reference> | undefined;
        _sourceReference?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
        verification?: Array<BackboneElement> | undefined;
        _verification?: Element[] | undefined;
      
        verificationDate?: Array<string> | undefined;
        _verificationDate?: Element[] | undefined;
      
        verificationType?: CodeableConcept | undefined;
        _verificationType?: Element | undefined;
      
        verified: boolean;
        _verified?: Element | undefined;
      
        verifiedBy?: Reference | undefined;
        _verifiedBy?: Element | undefined;
      
        verifiedWith?: Reference | undefined;
        _verifiedWith?: Element | undefined;
      
    }

  


  
    /**
 * ContactDetail
 * 
 * ContactDetail Type: Specifies contact information for a person or organization.
 * 
 * @see {@link http://hl7.org/fhir/R5/ContactDetail.html}
 */
    export interface ContactDetail extends DataType {
      
      readonly resourceType: string;
      

      
        name?: string | undefined;
        _name?: Element | undefined;
      
        telecom?: Array<ContactPoint> | undefined;
        _telecom?: Element[] | undefined;
      
    }

  


  
    /**
 * ContactPoint
 * 
 * ContactPoint Type: Details for all kinds of technology mediated contact points
 * for a person or organization, including telephone, email, etc.
 * 
 * @see {@link http://hl7.org/fhir/R5/ContactPoint.html}
 */
    export interface ContactPoint extends DataType {
      
      readonly resourceType: string;
      

      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        rank?: number | undefined;
        _rank?: Element | undefined;
      
        system?: string | undefined;
        _system?: Element | undefined;
      
        use?: string | undefined;
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
 * @see {@link http://hl7.org/fhir/R5/Contract.html}
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
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        publicationDate?: string | undefined;
        _publicationDate?: Element | undefined;
      
        publicationStatus: string;
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
      
        contentAttachment?: Attachment | undefined;
        _contentAttachment?: Element | undefined;
      
        contentReference?: Reference | undefined;
        _contentReference?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        instantiatesCanonical?: Reference | undefined;
        _instantiatesCanonical?: Element | undefined;
      
        instantiatesUri?: string | undefined;
        _instantiatesUri?: Element | undefined;
      
        issued?: string | undefined;
        _issued?: Element | undefined;
      
        legal?: Array<BackboneElement> | undefined;
        _legal?: Element[] | undefined;
      
        contentAttachment?: Attachment | undefined;
        _contentAttachment?: Element | undefined;
      
        contentReference?: Reference | undefined;
        _contentReference?: Element | undefined;
      
        legallyBindingAttachment?: Attachment | undefined;
        _legallyBindingAttachment?: Element | undefined;
      
        legallyBindingReference?: Reference | undefined;
        _legallyBindingReference?: Element | undefined;
      
        legalState?: CodeableConcept | undefined;
        _legalState?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        relevantHistory?: Array<Reference> | undefined;
        _relevantHistory?: Element[] | undefined;
      
        rule?: Array<BackboneElement> | undefined;
        _rule?: Element[] | undefined;
      
        contentAttachment?: Attachment | undefined;
        _contentAttachment?: Element | undefined;
      
        contentReference?: Reference | undefined;
        _contentReference?: Element | undefined;
      
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
      
        status?: string | undefined;
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
      
        occurrenceDateTime?: string | undefined;
        _occurrenceDateTime?: Element | undefined;
      
        occurrencePeriod?: Period | undefined;
        _occurrencePeriod?: Element | undefined;
      
        occurrenceTiming?: Timing | undefined;
        _occurrenceTiming?: Element | undefined;
      
        performer?: Reference | undefined;
        _performer?: Element | undefined;
      
        performerLinkId?: Array<string> | undefined;
        _performerLinkId?: Element[] | undefined;
      
        performerRole?: CodeableConcept | undefined;
        _performerRole?: Element | undefined;
      
        performerType?: Array<CodeableConcept> | undefined;
        _performerType?: Element[] | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        reasonLinkId?: Array<string> | undefined;
        _reasonLinkId?: Element[] | undefined;
      
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
      
        effectiveTime?: string | undefined;
        _effectiveTime?: Element | undefined;
      
        entityCodeableConcept?: CodeableConcept | undefined;
        _entityCodeableConcept?: Element | undefined;
      
        entityReference?: Reference | undefined;
        _entityReference?: Element | undefined;
      
        factor?: number | undefined;
        _factor?: Element | undefined;
      
        identifier?: Identifier | undefined;
        _identifier?: Element | undefined;
      
        linkId?: Array<string> | undefined;
        _linkId?: Element[] | undefined;
      
        net?: Money | undefined;
        _net?: Element | undefined;
      
        payment?: string | undefined;
        _payment?: Element | undefined;
      
        paymentDate?: string | undefined;
        _paymentDate?: Element | undefined;
      
        points?: number | undefined;
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
      
        issued?: string | undefined;
        _issued?: Element | undefined;
      
        offer: BackboneElement;
        _offer?: Element | undefined;
      
        answer?: Array<BackboneElement> | undefined;
        _answer?: Element[] | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCoding?: Coding | undefined;
        _valueCoding?: Element | undefined;
      
        valueDate?: string | undefined;
        _valueDate?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueDecimal?: number | undefined;
        _valueDecimal?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        valueTime?: time | undefined;
        _valueTime?: Element | undefined;
      
        valueUri?: string | undefined;
        _valueUri?: Element | undefined;
      
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
      
        topicCodeableConcept?: CodeableConcept | undefined;
        _topicCodeableConcept?: Element | undefined;
      
        topicReference?: Reference | undefined;
        _topicReference?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        topicCodeableConcept?: CodeableConcept | undefined;
        _topicCodeableConcept?: Element | undefined;
      
        topicReference?: Reference | undefined;
        _topicReference?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
    }

  


  
    /**
 * Contributor
 * 
 * Contributor Type: A contributor to the content of a knowledge asset, including
 * authors, editors, reviewers, and endorsers.
 * 
 * @see {@link http://hl7.org/fhir/R5/Contributor.html}
 */
    export interface Contributor extends DataType {
      
      readonly resourceType: string;
      

      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
    }

  


  
    /**
 * Count
 * 
 * Count Type: A measured amount (or an amount that can potentially be measured).
 * Note that measured amounts include amounts that are not precisely quantified,
 * including amounts involving arbitrary units and floating currencies.
 * 
 * @see {@link http://hl7.org/fhir/R5/Count.html}
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
 * @see {@link http://hl7.org/fhir/R5/Coverage.html}
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
      
        value: Identifier;
        _value?: Element | undefined;
      
        contract?: Array<Reference> | undefined;
        _contract?: Element[] | undefined;
      
        costToBeneficiary?: Array<BackboneElement> | undefined;
        _costToBeneficiary?: Element[] | undefined;
      
        category?: CodeableConcept | undefined;
        _category?: Element | undefined;
      
        exception?: Array<BackboneElement> | undefined;
        _exception?: Element[] | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        network?: CodeableConcept | undefined;
        _network?: Element | undefined;
      
        term?: CodeableConcept | undefined;
        _term?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        unit?: CodeableConcept | undefined;
        _unit?: Element | undefined;
      
        valueMoney?: Money | undefined;
        _valueMoney?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        dependent?: string | undefined;
        _dependent?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        insurancePlan?: Reference | undefined;
        _insurancePlan?: Element | undefined;
      
        insurer?: Reference | undefined;
        _insurer?: Element | undefined;
      
        kind: string;
        _kind?: Element | undefined;
      
        network?: string | undefined;
        _network?: Element | undefined;
      
        order?: number | undefined;
        _order?: Element | undefined;
      
        paymentBy?: Array<BackboneElement> | undefined;
        _paymentBy?: Element[] | undefined;
      
        party: Reference;
        _party?: Element | undefined;
      
        responsibility?: string | undefined;
        _responsibility?: Element | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        policyHolder?: Reference | undefined;
        _policyHolder?: Element | undefined;
      
        relationship?: CodeableConcept | undefined;
        _relationship?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subrogation?: boolean | undefined;
        _subrogation?: Element | undefined;
      
        subscriber?: Reference | undefined;
        _subscriber?: Element | undefined;
      
        subscriberId?: Array<Identifier> | undefined;
        _subscriberId?: Element[] | undefined;
      
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
 * @see {@link http://hl7.org/fhir/R5/CoverageEligibilityRequest.html}
 */
    export interface CoverageEligibilityRequest extends DomainResource {
      
      readonly resourceType: "CoverageEligibilityRequest";
      

      
        created: string;
        _created?: Element | undefined;
      
        enterer?: Reference | undefined;
        _enterer?: Element | undefined;
      
        event?: Array<BackboneElement> | undefined;
        _event?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        whenDateTime?: string | undefined;
        _whenDateTime?: Element | undefined;
      
        whenPeriod?: Period | undefined;
        _whenPeriod?: Element | undefined;
      
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
      
        diagnosisCodeableConcept?: CodeableConcept | undefined;
        _diagnosisCodeableConcept?: Element | undefined;
      
        diagnosisReference?: Reference | undefined;
        _diagnosisReference?: Element | undefined;
      
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
      
        supportingInfoSequence?: Array<number> | undefined;
        _supportingInfoSequence?: Element[] | undefined;
      
        unitPrice?: Money | undefined;
        _unitPrice?: Element | undefined;
      
        patient: Reference;
        _patient?: Element | undefined;
      
        priority?: CodeableConcept | undefined;
        _priority?: Element | undefined;
      
        provider?: Reference | undefined;
        _provider?: Element | undefined;
      
        purpose: Array<string>;
        _purpose?: Element[] | undefined;
      
        servicedDate?: string | undefined;
        _servicedDate?: Element | undefined;
      
        servicedPeriod?: Period | undefined;
        _servicedPeriod?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        supportingInfo?: Array<BackboneElement> | undefined;
        _supportingInfo?: Element[] | undefined;
      
        appliesToAll?: boolean | undefined;
        _appliesToAll?: Element | undefined;
      
        information: Reference;
        _information?: Element | undefined;
      
        sequence: number;
        _sequence?: Element | undefined;
      
    }

  


  
    /**
 * CoverageEligibilityResponse
 * 
 * This resource provides eligibility and plan details from the processing of an
 * CoverageEligibilityRequest resource.
 * 
 * @see {@link http://hl7.org/fhir/R5/CoverageEligibilityResponse.html}
 */
    export interface CoverageEligibilityResponse extends DomainResource {
      
      readonly resourceType: "CoverageEligibilityResponse";
      

      
        created: string;
        _created?: Element | undefined;
      
        disposition?: string | undefined;
        _disposition?: Element | undefined;
      
        error?: Array<BackboneElement> | undefined;
        _error?: Element[] | undefined;
      
        code: CodeableConcept;
        _code?: Element | undefined;
      
        expression?: Array<string> | undefined;
        _expression?: Element[] | undefined;
      
        event?: Array<BackboneElement> | undefined;
        _event?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        whenDateTime?: string | undefined;
        _whenDateTime?: Element | undefined;
      
        whenPeriod?: Period | undefined;
        _whenPeriod?: Element | undefined;
      
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
      
        authorizationUrl?: string | undefined;
        _authorizationUrl?: Element | undefined;
      
        benefit?: Array<BackboneElement> | undefined;
        _benefit?: Element[] | undefined;
      
        allowedMoney?: Money | undefined;
        _allowedMoney?: Element | undefined;
      
        allowedString?: string | undefined;
        _allowedString?: Element | undefined;
      
        allowedUnsignedInt?: unsignedInt | undefined;
        _allowedUnsignedInt?: Element | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        usedMoney?: Money | undefined;
        _usedMoney?: Element | undefined;
      
        usedString?: string | undefined;
        _usedString?: Element | undefined;
      
        usedUnsignedInt?: unsignedInt | undefined;
        _usedUnsignedInt?: Element | undefined;
      
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
      
        outcome: string;
        _outcome?: Element | undefined;
      
        patient: Reference;
        _patient?: Element | undefined;
      
        preAuthRef?: string | undefined;
        _preAuthRef?: Element | undefined;
      
        purpose: Array<string>;
        _purpose?: Element[] | undefined;
      
        request: Reference;
        _request?: Element | undefined;
      
        requestor?: Reference | undefined;
        _requestor?: Element | undefined;
      
        servicedDate?: string | undefined;
        _servicedDate?: Element | undefined;
      
        servicedPeriod?: Period | undefined;
        _servicedPeriod?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
    }

  


  


  


  
    /**
 * DataRequirement
 * 
 * DataRequirement Type: Describes a required data item for evaluation in terms of
 * the type of data, and optional code or date-based filters of the data.
 * 
 * @see {@link http://hl7.org/fhir/R5/DataRequirement.html}
 */
    export interface DataRequirement extends DataType {
      
      readonly resourceType: string;
      

      
        codeFilter?: Array<Element> | undefined;
        _codeFilter?: Element[] | undefined;
      
        code?: Array<Coding> | undefined;
        _code?: Element[] | undefined;
      
        path?: string | undefined;
        _path?: Element | undefined;
      
        searchParam?: string | undefined;
        _searchParam?: Element | undefined;
      
        valueSet?: string | undefined;
        _valueSet?: Element | undefined;
      
        dateFilter?: Array<Element> | undefined;
        _dateFilter?: Element[] | undefined;
      
        path?: string | undefined;
        _path?: Element | undefined;
      
        searchParam?: string | undefined;
        _searchParam?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueDuration?: Duration | undefined;
        _valueDuration?: Element | undefined;
      
        valuePeriod?: Period | undefined;
        _valuePeriod?: Element | undefined;
      
        limit?: number | undefined;
        _limit?: Element | undefined;
      
        mustSupport?: Array<string> | undefined;
        _mustSupport?: Element[] | undefined;
      
        profile?: Array<string> | undefined;
        _profile?: Element[] | undefined;
      
        sort?: Array<Element> | undefined;
        _sort?: Element[] | undefined;
      
        direction: string;
        _direction?: Element | undefined;
      
        path: string;
        _path?: Element | undefined;
      
        subjectCodeableConcept?: CodeableConcept | undefined;
        _subjectCodeableConcept?: Element | undefined;
      
        subjectReference?: Reference | undefined;
        _subjectReference?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        valueFilter?: Array<Element> | undefined;
        _valueFilter?: Element[] | undefined;
      
        comparator?: string | undefined;
        _comparator?: Element | undefined;
      
        path?: string | undefined;
        _path?: Element | undefined;
      
        searchParam?: string | undefined;
        _searchParam?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueDuration?: Duration | undefined;
        _valueDuration?: Element | undefined;
      
        valuePeriod?: Period | undefined;
        _valuePeriod?: Element | undefined;
      
    }

  


  
    /**
 * DataType
 * 
 * DataType Type: The base class for all re-useable types defined as part of the
 * FHIR Specification.
 * 
 * @see {@link http://hl7.org/fhir/R5/DataType.html}
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
 * @see {@link http://hl7.org/fhir/R5/Definition.html}
 */
    export interface Definition extends Base {
      
      readonly resourceType: string;
      

      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        derivedFromCanonical?: Array<string> | undefined;
        _derivedFromCanonical?: Element[] | undefined;
      
        derivedFromUri?: Array<string> | undefined;
        _derivedFromUri?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        effectivePeriod?: Period | undefined;
        _effectivePeriod?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        partOf?: Array<string> | undefined;
        _partOf?: Element[] | undefined;
      
        performerType?: CodeableConcept | undefined;
        _performerType?: Element | undefined;
      
        product?: CodeableReference | undefined;
        _product?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject?: Array<CodeableReference> | undefined;
        _subject?: Element[] | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        topic?: Array<CodeableConcept> | undefined;
        _topic?: Element[] | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * DetectedIssue
 * 
 * Indicates an actual or potential clinical issue with or between one or more
 * active or proposed clinical actions for a patient; e.g. Drug-drug interaction,
 * Ineffective treatment frequency, Procedure-condition conflict, gaps in care,
 * etc.
 * 
 * @see {@link http://hl7.org/fhir/R5/DetectedIssue.html}
 */
    export interface DetectedIssue extends DomainResource {
      
      readonly resourceType: "DetectedIssue";
      

      
        author?: Reference | undefined;
        _author?: Element | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        detail?: string | undefined;
        _detail?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        evidence?: Array<BackboneElement> | undefined;
        _evidence?: Element[] | undefined;
      
        code?: Array<CodeableConcept> | undefined;
        _code?: Element[] | undefined;
      
        detail?: Array<Reference> | undefined;
        _detail?: Element[] | undefined;
      
        identifiedDateTime?: string | undefined;
        _identifiedDateTime?: Element | undefined;
      
        identifiedPeriod?: Period | undefined;
        _identifiedPeriod?: Element | undefined;
      
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
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        reference?: string | undefined;
        _reference?: Element | undefined;
      
        severity?: string | undefined;
        _severity?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
    }

  


  
    /**
 * Device
 * 
 * This resource describes the properties (regulated, has real time clock, etc.),
 * adminstrative (manufacturer name, model number, serial number, firmware, etc.),
 * and type (knee replacement, blood pressure cuff, MRI, etc.) of a physical unit
 * (these values do not change much within a given module, for example the serail
 * number, manufacturer name, and model number). An actual unit may consist of
 * several modules in a distinct hierarchy and these are represented by multiple
 * Device resources and bound through the 'parent' element.
 * 
 * @see {@link http://hl7.org/fhir/R5/Device.html}
 */
    export interface Device extends DomainResource {
      
      readonly resourceType: "Device";
      

      
        availabilityStatus?: CodeableConcept | undefined;
        _availabilityStatus?: Element | undefined;
      
        biologicalSourceEvent?: Identifier | undefined;
        _biologicalSourceEvent?: Element | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        conformsTo?: Array<BackboneElement> | undefined;
        _conformsTo?: Element[] | undefined;
      
        category?: CodeableConcept | undefined;
        _category?: Element | undefined;
      
        specification: CodeableConcept;
        _specification?: Element | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        contact?: Array<ContactPoint> | undefined;
        _contact?: Element[] | undefined;
      
        cycle?: Count | undefined;
        _cycle?: Element | undefined;
      
        definition?: CodeableReference | undefined;
        _definition?: Element | undefined;
      
        displayName?: string | undefined;
        _displayName?: Element | undefined;
      
        duration?: Duration | undefined;
        _duration?: Element | undefined;
      
        endpoint?: Array<Reference> | undefined;
        _endpoint?: Element[] | undefined;
      
        expirationDate?: string | undefined;
        _expirationDate?: Element | undefined;
      
        gateway?: Array<CodeableReference> | undefined;
        _gateway?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        location?: Reference | undefined;
        _location?: Element | undefined;
      
        lotNumber?: string | undefined;
        _lotNumber?: Element | undefined;
      
        manufactureDate?: string | undefined;
        _manufactureDate?: Element | undefined;
      
        manufacturer?: string | undefined;
        _manufacturer?: Element | undefined;
      
        mode?: CodeableConcept | undefined;
        _mode?: Element | undefined;
      
        modelNumber?: string | undefined;
        _modelNumber?: Element | undefined;
      
        name?: Array<BackboneElement> | undefined;
        _name?: Element[] | undefined;
      
        display?: boolean | undefined;
        _display?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        value: string;
        _value?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        owner?: Reference | undefined;
        _owner?: Element | undefined;
      
        parent?: Reference | undefined;
        _parent?: Element | undefined;
      
        partNumber?: string | undefined;
        _partNumber?: Element | undefined;
      
        property?: Array<BackboneElement> | undefined;
        _property?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        safety?: Array<CodeableConcept> | undefined;
        _safety?: Element[] | undefined;
      
        serialNumber?: string | undefined;
        _serialNumber?: Element | undefined;
      
        status?: string | undefined;
        _status?: Element | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
        udiCarrier?: Array<BackboneElement> | undefined;
        _udiCarrier?: Element[] | undefined;
      
        carrierAIDC?: string | undefined;
        _carrierAIDC?: Element | undefined;
      
        carrierHRF?: string | undefined;
        _carrierHRF?: Element | undefined;
      
        deviceIdentifier: string;
        _deviceIdentifier?: Element | undefined;
      
        entryType?: string | undefined;
        _entryType?: Element | undefined;
      
        issuer: string;
        _issuer?: Element | undefined;
      
        jurisdiction?: string | undefined;
        _jurisdiction?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        version?: Array<BackboneElement> | undefined;
        _version?: Element[] | undefined;
      
        component?: Identifier | undefined;
        _component?: Element | undefined;
      
        installDate?: string | undefined;
        _installDate?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        value: string;
        _value?: Element | undefined;
      
    }

  


  
    /**
 * DeviceAssociation
 * 
 * A record of association of a device.
 * 
 * @see {@link http://hl7.org/fhir/R5/DeviceAssociation.html}
 */
    export interface DeviceAssociation extends DomainResource {
      
      readonly resourceType: "DeviceAssociation";
      

      
        bodyStructure?: Reference | undefined;
        _bodyStructure?: Element | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        device: Reference;
        _device?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        operation?: Array<BackboneElement> | undefined;
        _operation?: Element[] | undefined;
      
        operator?: Array<Reference> | undefined;
        _operator?: Element[] | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        status: CodeableConcept;
        _status?: Element | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        status: CodeableConcept;
        _status?: Element | undefined;
      
        statusReason?: Array<CodeableConcept> | undefined;
        _statusReason?: Element[] | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
    }

  


  
    /**
 * DeviceDefinition
 * 
 * This is a specialized resource that defines the characteristics and capabilities
 * of a device.
 * 
 * @see {@link http://hl7.org/fhir/R5/DeviceDefinition.html}
 */
    export interface DeviceDefinition extends DomainResource {
      
      readonly resourceType: "DeviceDefinition";
      

      
        chargeItem?: Array<BackboneElement> | undefined;
        _chargeItem?: Element[] | undefined;
      
        chargeItemCode: CodeableReference;
        _chargeItemCode?: Element | undefined;
      
        count: Quantity;
        _count?: Element | undefined;
      
        effectivePeriod?: Period | undefined;
        _effectivePeriod?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        classification?: Array<BackboneElement> | undefined;
        _classification?: Element[] | undefined;
      
        justification?: Array<RelatedArtifact> | undefined;
        _justification?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        conformsTo?: Array<BackboneElement> | undefined;
        _conformsTo?: Element[] | undefined;
      
        category?: CodeableConcept | undefined;
        _category?: Element | undefined;
      
        source?: Array<RelatedArtifact> | undefined;
        _source?: Element[] | undefined;
      
        specification: CodeableConcept;
        _specification?: Element | undefined;
      
        version?: Array<string> | undefined;
        _version?: Element[] | undefined;
      
        contact?: Array<ContactPoint> | undefined;
        _contact?: Element[] | undefined;
      
        correctiveAction?: BackboneElement | undefined;
        _correctiveAction?: Element | undefined;
      
        period: Period;
        _period?: Element | undefined;
      
        recall: boolean;
        _recall?: Element | undefined;
      
        scope?: string | undefined;
        _scope?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        deviceName?: Array<BackboneElement> | undefined;
        _deviceName?: Element[] | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        guideline?: BackboneElement | undefined;
        _guideline?: Element | undefined;
      
        contraindication?: Array<CodeableConcept> | undefined;
        _contraindication?: Element[] | undefined;
      
        indication?: Array<CodeableConcept> | undefined;
        _indication?: Element[] | undefined;
      
        intendedUse?: string | undefined;
        _intendedUse?: Element | undefined;
      
        relatedArtifact?: Array<RelatedArtifact> | undefined;
        _relatedArtifact?: Element[] | undefined;
      
        usageInstruction?: string | undefined;
        _usageInstruction?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        warning?: Array<CodeableConcept> | undefined;
        _warning?: Element[] | undefined;
      
        hasPart?: Array<BackboneElement> | undefined;
        _hasPart?: Element[] | undefined;
      
        count?: number | undefined;
        _count?: Element | undefined;
      
        reference: Reference;
        _reference?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        languageCode?: Array<CodeableConcept> | undefined;
        _languageCode?: Element[] | undefined;
      
        link?: Array<BackboneElement> | undefined;
        _link?: Element[] | undefined;
      
        relatedDevice: CodeableReference;
        _relatedDevice?: Element | undefined;
      
        relation: Coding;
        _relation?: Element | undefined;
      
        manufacturer?: Reference | undefined;
        _manufacturer?: Element | undefined;
      
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
      
        owner?: Reference | undefined;
        _owner?: Element | undefined;
      
        packaging?: Array<BackboneElement> | undefined;
        _packaging?: Element[] | undefined;
      
        count?: number | undefined;
        _count?: Element | undefined;
      
        distributor?: Array<BackboneElement> | undefined;
        _distributor?: Element[] | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        organizationReference?: Array<Reference> | undefined;
        _organizationReference?: Element[] | undefined;
      
        identifier?: Identifier | undefined;
        _identifier?: Element | undefined;
      
        packaging?: Array<undefined> | undefined;
        _packaging?: Element[] | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        udiDeviceIdentifier?: Array<undefined> | undefined;
        _udiDeviceIdentifier?: Element[] | undefined;
      
        partNumber?: string | undefined;
        _partNumber?: Element | undefined;
      
        productionIdentifierInUDI?: Array<string> | undefined;
        _productionIdentifierInUDI?: Element[] | undefined;
      
        property?: Array<BackboneElement> | undefined;
        _property?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        regulatoryIdentifier?: Array<BackboneElement> | undefined;
        _regulatoryIdentifier?: Element[] | undefined;
      
        deviceIdentifier: string;
        _deviceIdentifier?: Element | undefined;
      
        issuer: string;
        _issuer?: Element | undefined;
      
        jurisdiction: string;
        _jurisdiction?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        safety?: Array<CodeableConcept> | undefined;
        _safety?: Element[] | undefined;
      
        shelfLifeStorage?: Array<ProductShelfLife> | undefined;
        _shelfLifeStorage?: Element[] | undefined;
      
        udiDeviceIdentifier?: Array<BackboneElement> | undefined;
        _udiDeviceIdentifier?: Element[] | undefined;
      
        deviceIdentifier: string;
        _deviceIdentifier?: Element | undefined;
      
        issuer: string;
        _issuer?: Element | undefined;
      
        jurisdiction: string;
        _jurisdiction?: Element | undefined;
      
        marketDistribution?: Array<BackboneElement> | undefined;
        _marketDistribution?: Element[] | undefined;
      
        marketPeriod: Period;
        _marketPeriod?: Element | undefined;
      
        subJurisdiction: string;
        _subJurisdiction?: Element | undefined;
      
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
 * DeviceDispense
 * 
 * Indicates that a device is to be or has been dispensed for a named
 * person/patient.  This includes a description of the product (supply) provided
 * and the instructions for using the device.
 * 
 * @see {@link http://hl7.org/fhir/R5/DeviceDispense.html}
 */
    export interface DeviceDispense extends DomainResource {
      
      readonly resourceType: "DeviceDispense";
      

      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        destination?: Reference | undefined;
        _destination?: Element | undefined;
      
        device: CodeableReference;
        _device?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        eventHistory?: Array<Reference> | undefined;
        _eventHistory?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        location?: Reference | undefined;
        _location?: Element | undefined;
      
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
      
        preparedDate?: string | undefined;
        _preparedDate?: Element | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        receiver?: Reference | undefined;
        _receiver?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        statusReason?: CodeableReference | undefined;
        _statusReason?: Element | undefined;
      
        subject: Reference;
        _subject?: Element | undefined;
      
        supportingInformation?: Array<Reference> | undefined;
        _supportingInformation?: Element[] | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        usageInstruction?: string | undefined;
        _usageInstruction?: Element | undefined;
      
        whenHandedOver?: string | undefined;
        _whenHandedOver?: Element | undefined;
      
    }

  


  
    /**
 * DeviceMetric
 * 
 * Describes a measurement, calculation or setting capability of a device.  The
 * DeviceMetric resource is derived from the ISO/IEEE 11073-10201 Domain
 * Information Model standard, but is more widely applicable.
 * 
 * @see {@link http://hl7.org/fhir/R5/DeviceMetric.html}
 */
    export interface DeviceMetric extends DomainResource {
      
      readonly resourceType: "DeviceMetric";
      

      
        calibration?: Array<BackboneElement> | undefined;
        _calibration?: Element[] | undefined;
      
        state?: string | undefined;
        _state?: Element | undefined;
      
        time?: string | undefined;
        _time?: Element | undefined;
      
        type?: string | undefined;
        _type?: Element | undefined;
      
        category: string;
        _category?: Element | undefined;
      
        color?: string | undefined;
        _color?: Element | undefined;
      
        device: Reference;
        _device?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        measurementFrequency?: Quantity | undefined;
        _measurementFrequency?: Element | undefined;
      
        operationalStatus?: string | undefined;
        _operationalStatus?: Element | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        unit?: CodeableConcept | undefined;
        _unit?: Element | undefined;
      
    }

  


  


  
    /**
 * DeviceRequest
 * 
 * Represents a request a device to be provided to a specific patient. The device
 * may be an implantable device to be subsequently implanted, or an external
 * assistive device, such as a walker, to be delivered and subsequently be used.
 * 
 * @see {@link http://hl7.org/fhir/R5/DeviceRequest.html}
 */
    export interface DeviceRequest extends DomainResource {
      
      readonly resourceType: "DeviceRequest";
      

      
        asNeeded?: boolean | undefined;
        _asNeeded?: Element | undefined;
      
        asNeededFor?: CodeableConcept | undefined;
        _asNeededFor?: Element | undefined;
      
        authoredOn?: string | undefined;
        _authoredOn?: Element | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        code: CodeableReference;
        _code?: Element | undefined;
      
        doNotPerform?: boolean | undefined;
        _doNotPerform?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        groupIdentifier?: Identifier | undefined;
        _groupIdentifier?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        instantiatesCanonical?: Array<string> | undefined;
        _instantiatesCanonical?: Element[] | undefined;
      
        instantiatesUri?: Array<string> | undefined;
        _instantiatesUri?: Element[] | undefined;
      
        insurance?: Array<Reference> | undefined;
        _insurance?: Element[] | undefined;
      
        intent: string;
        _intent?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        occurrenceDateTime?: string | undefined;
        _occurrenceDateTime?: Element | undefined;
      
        occurrencePeriod?: Period | undefined;
        _occurrencePeriod?: Element | undefined;
      
        occurrenceTiming?: Timing | undefined;
        _occurrenceTiming?: Element | undefined;
      
        parameter?: Array<BackboneElement> | undefined;
        _parameter?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        performer?: CodeableReference | undefined;
        _performer?: Element | undefined;
      
        priority?: string | undefined;
        _priority?: Element | undefined;
      
        quantity?: number | undefined;
        _quantity?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        relevantHistory?: Array<Reference> | undefined;
        _relevantHistory?: Element[] | undefined;
      
        replaces?: Array<Reference> | undefined;
        _replaces?: Element[] | undefined;
      
        requester?: Reference | undefined;
        _requester?: Element | undefined;
      
        status?: string | undefined;
        _status?: Element | undefined;
      
        subject: Reference;
        _subject?: Element | undefined;
      
        supportingInfo?: Array<Reference> | undefined;
        _supportingInfo?: Element[] | undefined;
      
    }

  


  
    /**
 * DeviceUsage
 * 
 * A record of a device being used by a patient where the record is the result of a
 * report from the patient or a clinician.
 * 
 * @see {@link http://hl7.org/fhir/R5/DeviceUsage.html}
 */
    export interface DeviceUsage extends DomainResource {
      
      readonly resourceType: "DeviceUsage";
      

      
        adherence?: BackboneElement | undefined;
        _adherence?: Element | undefined;
      
        code: CodeableConcept;
        _code?: Element | undefined;
      
        reason: Array<CodeableConcept>;
        _reason?: Element[] | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        bodySite?: CodeableReference | undefined;
        _bodySite?: Element | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        context?: Reference | undefined;
        _context?: Element | undefined;
      
        dateAsserted?: string | undefined;
        _dateAsserted?: Element | undefined;
      
        derivedFrom?: Array<Reference> | undefined;
        _derivedFrom?: Element[] | undefined;
      
        device: CodeableReference;
        _device?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        informationSource?: Reference | undefined;
        _informationSource?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        patient: Reference;
        _patient?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        timingDateTime?: string | undefined;
        _timingDateTime?: Element | undefined;
      
        timingPeriod?: Period | undefined;
        _timingPeriod?: Element | undefined;
      
        timingTiming?: Timing | undefined;
        _timingTiming?: Element | undefined;
      
        usageReason?: Array<CodeableConcept> | undefined;
        _usageReason?: Element[] | undefined;
      
        usageStatus?: CodeableConcept | undefined;
        _usageStatus?: Element | undefined;
      
    }

  


  
    /**
 * DiagnosticReport
 * 
 * The findings and interpretation of diagnostic tests performed on patients,
 * groups of patients, products, substances, devices, and locations, and/or
 * specimens derived from these. The report includes clinical context such as
 * requesting provider information, and some mix of atomic results, images, textual
 * and coded interpretations, and formatted representation of diagnostic reports.
 * The report also includes non-clinical context such as batch analysis and
 * stability reporting of products and substances.
 * 
 * @see {@link http://hl7.org/fhir/R5/DiagnosticReport.html}
 */
    export interface DiagnosticReport extends DomainResource {
      
      readonly resourceType: "DiagnosticReport";
      

      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        code: CodeableConcept;
        _code?: Element | undefined;
      
        composition?: Reference | undefined;
        _composition?: Element | undefined;
      
        conclusion?: string | undefined;
        _conclusion?: Element | undefined;
      
        conclusionCode?: Array<CodeableConcept> | undefined;
        _conclusionCode?: Element[] | undefined;
      
        effectiveDateTime?: string | undefined;
        _effectiveDateTime?: Element | undefined;
      
        effectivePeriod?: Period | undefined;
        _effectivePeriod?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        issued?: string | undefined;
        _issued?: Element | undefined;
      
        media?: Array<BackboneElement> | undefined;
        _media?: Element[] | undefined;
      
        comment?: string | undefined;
        _comment?: Element | undefined;
      
        link: Reference;
        _link?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
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
      
        status: string;
        _status?: Element | undefined;
      
        study?: Array<Reference> | undefined;
        _study?: Element[] | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
        supportingInfo?: Array<BackboneElement> | undefined;
        _supportingInfo?: Element[] | undefined;
      
        reference: Reference;
        _reference?: Element | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
    }

  


  
    /**
 * Distance
 * 
 * Distance Type: A length - a value with a unit that is a physical distance.
 * 
 * @see {@link http://hl7.org/fhir/R5/Distance.html}
 */
    export interface Distance extends Quantity {
      
      readonly resourceType: string;
      

      
    }

  


  


  
    /**
 * DocumentReference
 * 
 * A reference to a document of any kind for any purpose. While the term “document”
 * implies a more narrow focus, for this resource this “document” encompasses *any*
 * serialized object with a mime-type, it includes formal patient-centric documents
 * (CDA), clinical notes, scanned paper, non-patient specific documents like policy
 * text, as well as a photo, video, or audio recording acquired or used in
 * healthcare.  The DocumentReference resource provides metadata about the document
 * so that the document can be discovered and managed.  The actual content may be
 * inline base64 encoded data or provided by direct reference.
 * 
 * @see {@link http://hl7.org/fhir/R5/DocumentReference.html}
 */
    export interface DocumentReference extends DomainResource {
      
      readonly resourceType: "DocumentReference";
      

      
        attester?: Array<BackboneElement> | undefined;
        _attester?: Element[] | undefined;
      
        mode: CodeableConcept;
        _mode?: Element | undefined;
      
        party?: Reference | undefined;
        _party?: Element | undefined;
      
        time?: string | undefined;
        _time?: Element | undefined;
      
        author?: Array<Reference> | undefined;
        _author?: Element[] | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        bodySite?: Array<CodeableReference> | undefined;
        _bodySite?: Element[] | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        content: Array<BackboneElement>;
        _content?: Element[] | undefined;
      
        attachment: Attachment;
        _attachment?: Element | undefined;
      
        profile?: Array<BackboneElement> | undefined;
        _profile?: Element[] | undefined;
      
        valueCanonical?: string | undefined;
        _valueCanonical?: Element | undefined;
      
        valueCoding?: Coding | undefined;
        _valueCoding?: Element | undefined;
      
        valueUri?: string | undefined;
        _valueUri?: Element | undefined;
      
        context?: Array<Reference> | undefined;
        _context?: Element[] | undefined;
      
        custodian?: Reference | undefined;
        _custodian?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        docStatus?: string | undefined;
        _docStatus?: Element | undefined;
      
        event?: Array<CodeableReference> | undefined;
        _event?: Element[] | undefined;
      
        facilityType?: CodeableConcept | undefined;
        _facilityType?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        modality?: Array<CodeableConcept> | undefined;
        _modality?: Element[] | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        practiceSetting?: CodeableConcept | undefined;
        _practiceSetting?: Element | undefined;
      
        relatesTo?: Array<BackboneElement> | undefined;
        _relatesTo?: Element[] | undefined;
      
        code: CodeableConcept;
        _code?: Element | undefined;
      
        target: Reference;
        _target?: Element | undefined;
      
        securityLabel?: Array<CodeableConcept> | undefined;
        _securityLabel?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
    }

  


  


  


  
    /**
 * DomainResource
 * 
 * A resource that includes narrative, extensions, and contained resources.
 * 
 * @see {@link http://hl7.org/fhir/R5/DomainResource.html}
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
 * Dosage Type: Indicates how the medication is/was taken or should be taken by the
 * patient.
 * 
 * @see {@link http://hl7.org/fhir/R5/Dosage.html}
 */
    export interface Dosage extends BackboneType {
      
      readonly resourceType: string;
      

      
        additionalInstruction?: Array<CodeableConcept> | undefined;
        _additionalInstruction?: Element[] | undefined;
      
        asNeeded?: boolean | undefined;
        _asNeeded?: Element | undefined;
      
        asNeededFor?: Array<CodeableConcept> | undefined;
        _asNeededFor?: Element[] | undefined;
      
        doseAndRate?: Array<Element> | undefined;
        _doseAndRate?: Element[] | undefined;
      
        doseQuantity?: Quantity | undefined;
        _doseQuantity?: Element | undefined;
      
        doseRange?: Range | undefined;
        _doseRange?: Element | undefined;
      
        rateQuantity?: Quantity | undefined;
        _rateQuantity?: Element | undefined;
      
        rateRange?: Range | undefined;
        _rateRange?: Element | undefined;
      
        rateRatio?: Ratio | undefined;
        _rateRatio?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        maxDosePerAdministration?: Quantity | undefined;
        _maxDosePerAdministration?: Element | undefined;
      
        maxDosePerLifetime?: Quantity | undefined;
        _maxDosePerLifetime?: Element | undefined;
      
        maxDosePerPeriod?: Array<Ratio> | undefined;
        _maxDosePerPeriod?: Element[] | undefined;
      
        method?: CodeableConcept | undefined;
        _method?: Element | undefined;
      
        patientInstruction?: string | undefined;
        _patientInstruction?: Element | undefined;
      
        route?: CodeableConcept | undefined;
        _route?: Element | undefined;
      
        sequence?: number | undefined;
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
 * Duration Type: A length of time.
 * 
 * @see {@link http://hl7.org/fhir/R5/Duration.html}
 */
    export interface Duration extends Quantity {
      
      readonly resourceType: string;
      

      
    }

  


  


  
    /**
 * Element
 * 
 * Element Type: Base definition for all elements in a resource.
 * 
 * @see {@link http://hl7.org/fhir/R5/Element.html}
 */
    export interface Element extends Base {
      
      readonly resourceType: string;
      

      
        extension?: Array<Extension> | undefined;
        _extension?: Element[] | undefined;
      
        id?: http://hl7.org/fhirpath/System.String | undefined;
        _id?: Element | undefined;
      
    }

  


  
    /**
 * ElementDefinition
 * 
 * ElementDefinition Type: Captures constraints on each element within the
 * resource, profile, or extension.
 * 
 * @see {@link http://hl7.org/fhir/R5/ElementDefinition.html}
 */
    export interface ElementDefinition extends BackboneType {
      
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
      
        additional?: Array<Element> | undefined;
        _additional?: Element[] | undefined;
      
        any?: boolean | undefined;
        _any?: Element | undefined;
      
        documentation?: string | undefined;
        _documentation?: Element | undefined;
      
        purpose: string;
        _purpose?: Element | undefined;
      
        shortDoco?: string | undefined;
        _shortDoco?: Element | undefined;
      
        usage?: Array<UsageContext> | undefined;
        _usage?: Element[] | undefined;
      
        valueSet: string;
        _valueSet?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        strength: string;
        _strength?: Element | undefined;
      
        valueSet?: string | undefined;
        _valueSet?: Element | undefined;
      
        code?: Array<Coding> | undefined;
        _code?: Element[] | undefined;
      
        comment?: string | undefined;
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
      
        severity: string;
        _severity?: Element | undefined;
      
        source?: string | undefined;
        _source?: Element | undefined;
      
        suppress?: boolean | undefined;
        _suppress?: Element | undefined;
      
        contentReference?: string | undefined;
        _contentReference?: Element | undefined;
      
        defaultValueAddress?: Address | undefined;
        _defaultValueAddress?: Element | undefined;
      
        defaultValueAge?: Age | undefined;
        _defaultValueAge?: Element | undefined;
      
        defaultValueAnnotation?: Annotation | undefined;
        _defaultValueAnnotation?: Element | undefined;
      
        defaultValueAttachment?: Attachment | undefined;
        _defaultValueAttachment?: Element | undefined;
      
        defaultValueAvailability?: Availability | undefined;
        _defaultValueAvailability?: Element | undefined;
      
        defaultValueBase64Binary?: string | undefined;
        _defaultValueBase64Binary?: Element | undefined;
      
        defaultValueBoolean?: boolean | undefined;
        _defaultValueBoolean?: Element | undefined;
      
        defaultValueCanonical?: string | undefined;
        _defaultValueCanonical?: Element | undefined;
      
        defaultValueCode?: string | undefined;
        _defaultValueCode?: Element | undefined;
      
        defaultValueCodeableConcept?: CodeableConcept | undefined;
        _defaultValueCodeableConcept?: Element | undefined;
      
        defaultValueCodeableReference?: CodeableReference | undefined;
        _defaultValueCodeableReference?: Element | undefined;
      
        defaultValueCoding?: Coding | undefined;
        _defaultValueCoding?: Element | undefined;
      
        defaultValueContactDetail?: ContactDetail | undefined;
        _defaultValueContactDetail?: Element | undefined;
      
        defaultValueContactPoint?: ContactPoint | undefined;
        _defaultValueContactPoint?: Element | undefined;
      
        defaultValueCount?: Count | undefined;
        _defaultValueCount?: Element | undefined;
      
        defaultValueDataRequirement?: DataRequirement | undefined;
        _defaultValueDataRequirement?: Element | undefined;
      
        defaultValueDate?: string | undefined;
        _defaultValueDate?: Element | undefined;
      
        defaultValueDateTime?: string | undefined;
        _defaultValueDateTime?: Element | undefined;
      
        defaultValueDecimal?: number | undefined;
        _defaultValueDecimal?: Element | undefined;
      
        defaultValueDistance?: Distance | undefined;
        _defaultValueDistance?: Element | undefined;
      
        defaultValueDosage?: Dosage | undefined;
        _defaultValueDosage?: Element | undefined;
      
        defaultValueDuration?: Duration | undefined;
        _defaultValueDuration?: Element | undefined;
      
        defaultValueExpression?: Expression | undefined;
        _defaultValueExpression?: Element | undefined;
      
        defaultValueExtendedContactDetail?: ExtendedContactDetail | undefined;
        _defaultValueExtendedContactDetail?: Element | undefined;
      
        defaultValueHumanName?: HumanName | undefined;
        _defaultValueHumanName?: Element | undefined;
      
        defaultValueId?: id | undefined;
        _defaultValueId?: Element | undefined;
      
        defaultValueIdentifier?: Identifier | undefined;
        _defaultValueIdentifier?: Element | undefined;
      
        defaultValueInstant?: string | undefined;
        _defaultValueInstant?: Element | undefined;
      
        defaultValueInteger?: number | undefined;
        _defaultValueInteger?: Element | undefined;
      
        defaultValueInteger64?: integer64 | undefined;
        _defaultValueInteger64?: Element | undefined;
      
        defaultValueMarkdown?: string | undefined;
        _defaultValueMarkdown?: Element | undefined;
      
        defaultValueMeta?: Meta | undefined;
        _defaultValueMeta?: Element | undefined;
      
        defaultValueMoney?: Money | undefined;
        _defaultValueMoney?: Element | undefined;
      
        defaultValueOid?: oid | undefined;
        _defaultValueOid?: Element | undefined;
      
        defaultValueParameterDefinition?: ParameterDefinition | undefined;
        _defaultValueParameterDefinition?: Element | undefined;
      
        defaultValuePeriod?: Period | undefined;
        _defaultValuePeriod?: Element | undefined;
      
        defaultValuePositiveInt?: number | undefined;
        _defaultValuePositiveInt?: Element | undefined;
      
        defaultValueQuantity?: Quantity | undefined;
        _defaultValueQuantity?: Element | undefined;
      
        defaultValueRange?: Range | undefined;
        _defaultValueRange?: Element | undefined;
      
        defaultValueRatio?: Ratio | undefined;
        _defaultValueRatio?: Element | undefined;
      
        defaultValueRatioRange?: RatioRange | undefined;
        _defaultValueRatioRange?: Element | undefined;
      
        defaultValueReference?: Reference | undefined;
        _defaultValueReference?: Element | undefined;
      
        defaultValueRelatedArtifact?: RelatedArtifact | undefined;
        _defaultValueRelatedArtifact?: Element | undefined;
      
        defaultValueSampledData?: SampledData | undefined;
        _defaultValueSampledData?: Element | undefined;
      
        defaultValueSignature?: Signature | undefined;
        _defaultValueSignature?: Element | undefined;
      
        defaultValueString?: string | undefined;
        _defaultValueString?: Element | undefined;
      
        defaultValueTime?: time | undefined;
        _defaultValueTime?: Element | undefined;
      
        defaultValueTiming?: Timing | undefined;
        _defaultValueTiming?: Element | undefined;
      
        defaultValueTriggerDefinition?: TriggerDefinition | undefined;
        _defaultValueTriggerDefinition?: Element | undefined;
      
        defaultValueUnsignedInt?: unsignedInt | undefined;
        _defaultValueUnsignedInt?: Element | undefined;
      
        defaultValueUri?: string | undefined;
        _defaultValueUri?: Element | undefined;
      
        defaultValueUrl?: string | undefined;
        _defaultValueUrl?: Element | undefined;
      
        defaultValueUsageContext?: UsageContext | undefined;
        _defaultValueUsageContext?: Element | undefined;
      
        defaultValueUuid?: uuid | undefined;
        _defaultValueUuid?: Element | undefined;
      
        definition?: string | undefined;
        _definition?: Element | undefined;
      
        example?: Array<Element> | undefined;
        _example?: Element[] | undefined;
      
        label: string;
        _label?: Element | undefined;
      
        valueAddress?: Address | undefined;
        _valueAddress?: Element | undefined;
      
        valueAge?: Age | undefined;
        _valueAge?: Element | undefined;
      
        valueAnnotation?: Annotation | undefined;
        _valueAnnotation?: Element | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueAvailability?: Availability | undefined;
        _valueAvailability?: Element | undefined;
      
        valueBase64Binary?: string | undefined;
        _valueBase64Binary?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCanonical?: string | undefined;
        _valueCanonical?: Element | undefined;
      
        valueCode?: string | undefined;
        _valueCode?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueCodeableReference?: CodeableReference | undefined;
        _valueCodeableReference?: Element | undefined;
      
        valueCoding?: Coding | undefined;
        _valueCoding?: Element | undefined;
      
        valueContactDetail?: ContactDetail | undefined;
        _valueContactDetail?: Element | undefined;
      
        valueContactPoint?: ContactPoint | undefined;
        _valueContactPoint?: Element | undefined;
      
        valueCount?: Count | undefined;
        _valueCount?: Element | undefined;
      
        valueDataRequirement?: DataRequirement | undefined;
        _valueDataRequirement?: Element | undefined;
      
        valueDate?: string | undefined;
        _valueDate?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueDecimal?: number | undefined;
        _valueDecimal?: Element | undefined;
      
        valueDistance?: Distance | undefined;
        _valueDistance?: Element | undefined;
      
        valueDosage?: Dosage | undefined;
        _valueDosage?: Element | undefined;
      
        valueDuration?: Duration | undefined;
        _valueDuration?: Element | undefined;
      
        valueExpression?: Expression | undefined;
        _valueExpression?: Element | undefined;
      
        valueExtendedContactDetail?: ExtendedContactDetail | undefined;
        _valueExtendedContactDetail?: Element | undefined;
      
        valueHumanName?: HumanName | undefined;
        _valueHumanName?: Element | undefined;
      
        valueId?: id | undefined;
        _valueId?: Element | undefined;
      
        valueIdentifier?: Identifier | undefined;
        _valueIdentifier?: Element | undefined;
      
        valueInstant?: string | undefined;
        _valueInstant?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueInteger64?: integer64 | undefined;
        _valueInteger64?: Element | undefined;
      
        valueMarkdown?: string | undefined;
        _valueMarkdown?: Element | undefined;
      
        valueMeta?: Meta | undefined;
        _valueMeta?: Element | undefined;
      
        valueMoney?: Money | undefined;
        _valueMoney?: Element | undefined;
      
        valueOid?: oid | undefined;
        _valueOid?: Element | undefined;
      
        valueParameterDefinition?: ParameterDefinition | undefined;
        _valueParameterDefinition?: Element | undefined;
      
        valuePeriod?: Period | undefined;
        _valuePeriod?: Element | undefined;
      
        valuePositiveInt?: number | undefined;
        _valuePositiveInt?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueRatio?: Ratio | undefined;
        _valueRatio?: Element | undefined;
      
        valueRatioRange?: RatioRange | undefined;
        _valueRatioRange?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        valueRelatedArtifact?: RelatedArtifact | undefined;
        _valueRelatedArtifact?: Element | undefined;
      
        valueSampledData?: SampledData | undefined;
        _valueSampledData?: Element | undefined;
      
        valueSignature?: Signature | undefined;
        _valueSignature?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        valueTime?: time | undefined;
        _valueTime?: Element | undefined;
      
        valueTiming?: Timing | undefined;
        _valueTiming?: Element | undefined;
      
        valueTriggerDefinition?: TriggerDefinition | undefined;
        _valueTriggerDefinition?: Element | undefined;
      
        valueUnsignedInt?: unsignedInt | undefined;
        _valueUnsignedInt?: Element | undefined;
      
        valueUri?: string | undefined;
        _valueUri?: Element | undefined;
      
        valueUrl?: string | undefined;
        _valueUrl?: Element | undefined;
      
        valueUsageContext?: UsageContext | undefined;
        _valueUsageContext?: Element | undefined;
      
        valueUuid?: uuid | undefined;
        _valueUuid?: Element | undefined;
      
        fixedAddress?: Address | undefined;
        _fixedAddress?: Element | undefined;
      
        fixedAge?: Age | undefined;
        _fixedAge?: Element | undefined;
      
        fixedAnnotation?: Annotation | undefined;
        _fixedAnnotation?: Element | undefined;
      
        fixedAttachment?: Attachment | undefined;
        _fixedAttachment?: Element | undefined;
      
        fixedAvailability?: Availability | undefined;
        _fixedAvailability?: Element | undefined;
      
        fixedBase64Binary?: string | undefined;
        _fixedBase64Binary?: Element | undefined;
      
        fixedBoolean?: boolean | undefined;
        _fixedBoolean?: Element | undefined;
      
        fixedCanonical?: string | undefined;
        _fixedCanonical?: Element | undefined;
      
        fixedCode?: string | undefined;
        _fixedCode?: Element | undefined;
      
        fixedCodeableConcept?: CodeableConcept | undefined;
        _fixedCodeableConcept?: Element | undefined;
      
        fixedCodeableReference?: CodeableReference | undefined;
        _fixedCodeableReference?: Element | undefined;
      
        fixedCoding?: Coding | undefined;
        _fixedCoding?: Element | undefined;
      
        fixedContactDetail?: ContactDetail | undefined;
        _fixedContactDetail?: Element | undefined;
      
        fixedContactPoint?: ContactPoint | undefined;
        _fixedContactPoint?: Element | undefined;
      
        fixedCount?: Count | undefined;
        _fixedCount?: Element | undefined;
      
        fixedDataRequirement?: DataRequirement | undefined;
        _fixedDataRequirement?: Element | undefined;
      
        fixedDate?: string | undefined;
        _fixedDate?: Element | undefined;
      
        fixedDateTime?: string | undefined;
        _fixedDateTime?: Element | undefined;
      
        fixedDecimal?: number | undefined;
        _fixedDecimal?: Element | undefined;
      
        fixedDistance?: Distance | undefined;
        _fixedDistance?: Element | undefined;
      
        fixedDosage?: Dosage | undefined;
        _fixedDosage?: Element | undefined;
      
        fixedDuration?: Duration | undefined;
        _fixedDuration?: Element | undefined;
      
        fixedExpression?: Expression | undefined;
        _fixedExpression?: Element | undefined;
      
        fixedExtendedContactDetail?: ExtendedContactDetail | undefined;
        _fixedExtendedContactDetail?: Element | undefined;
      
        fixedHumanName?: HumanName | undefined;
        _fixedHumanName?: Element | undefined;
      
        fixedId?: id | undefined;
        _fixedId?: Element | undefined;
      
        fixedIdentifier?: Identifier | undefined;
        _fixedIdentifier?: Element | undefined;
      
        fixedInstant?: string | undefined;
        _fixedInstant?: Element | undefined;
      
        fixedInteger?: number | undefined;
        _fixedInteger?: Element | undefined;
      
        fixedInteger64?: integer64 | undefined;
        _fixedInteger64?: Element | undefined;
      
        fixedMarkdown?: string | undefined;
        _fixedMarkdown?: Element | undefined;
      
        fixedMeta?: Meta | undefined;
        _fixedMeta?: Element | undefined;
      
        fixedMoney?: Money | undefined;
        _fixedMoney?: Element | undefined;
      
        fixedOid?: oid | undefined;
        _fixedOid?: Element | undefined;
      
        fixedParameterDefinition?: ParameterDefinition | undefined;
        _fixedParameterDefinition?: Element | undefined;
      
        fixedPeriod?: Period | undefined;
        _fixedPeriod?: Element | undefined;
      
        fixedPositiveInt?: number | undefined;
        _fixedPositiveInt?: Element | undefined;
      
        fixedQuantity?: Quantity | undefined;
        _fixedQuantity?: Element | undefined;
      
        fixedRange?: Range | undefined;
        _fixedRange?: Element | undefined;
      
        fixedRatio?: Ratio | undefined;
        _fixedRatio?: Element | undefined;
      
        fixedRatioRange?: RatioRange | undefined;
        _fixedRatioRange?: Element | undefined;
      
        fixedReference?: Reference | undefined;
        _fixedReference?: Element | undefined;
      
        fixedRelatedArtifact?: RelatedArtifact | undefined;
        _fixedRelatedArtifact?: Element | undefined;
      
        fixedSampledData?: SampledData | undefined;
        _fixedSampledData?: Element | undefined;
      
        fixedSignature?: Signature | undefined;
        _fixedSignature?: Element | undefined;
      
        fixedString?: string | undefined;
        _fixedString?: Element | undefined;
      
        fixedTime?: time | undefined;
        _fixedTime?: Element | undefined;
      
        fixedTiming?: Timing | undefined;
        _fixedTiming?: Element | undefined;
      
        fixedTriggerDefinition?: TriggerDefinition | undefined;
        _fixedTriggerDefinition?: Element | undefined;
      
        fixedUnsignedInt?: unsignedInt | undefined;
        _fixedUnsignedInt?: Element | undefined;
      
        fixedUri?: string | undefined;
        _fixedUri?: Element | undefined;
      
        fixedUrl?: string | undefined;
        _fixedUrl?: Element | undefined;
      
        fixedUsageContext?: UsageContext | undefined;
        _fixedUsageContext?: Element | undefined;
      
        fixedUuid?: uuid | undefined;
        _fixedUuid?: Element | undefined;
      
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
      
        language?: string | undefined;
        _language?: Element | undefined;
      
        map: string;
        _map?: Element | undefined;
      
        max?: string | undefined;
        _max?: Element | undefined;
      
        maxLength?: number | undefined;
        _maxLength?: Element | undefined;
      
        maxValueDate?: string | undefined;
        _maxValueDate?: Element | undefined;
      
        maxValueDateTime?: string | undefined;
        _maxValueDateTime?: Element | undefined;
      
        maxValueDecimal?: number | undefined;
        _maxValueDecimal?: Element | undefined;
      
        maxValueInstant?: string | undefined;
        _maxValueInstant?: Element | undefined;
      
        maxValueInteger?: number | undefined;
        _maxValueInteger?: Element | undefined;
      
        maxValueInteger64?: integer64 | undefined;
        _maxValueInteger64?: Element | undefined;
      
        maxValuePositiveInt?: number | undefined;
        _maxValuePositiveInt?: Element | undefined;
      
        maxValueQuantity?: Quantity | undefined;
        _maxValueQuantity?: Element | undefined;
      
        maxValueTime?: time | undefined;
        _maxValueTime?: Element | undefined;
      
        maxValueUnsignedInt?: unsignedInt | undefined;
        _maxValueUnsignedInt?: Element | undefined;
      
        meaningWhenMissing?: string | undefined;
        _meaningWhenMissing?: Element | undefined;
      
        min?: unsignedInt | undefined;
        _min?: Element | undefined;
      
        minValueDate?: string | undefined;
        _minValueDate?: Element | undefined;
      
        minValueDateTime?: string | undefined;
        _minValueDateTime?: Element | undefined;
      
        minValueDecimal?: number | undefined;
        _minValueDecimal?: Element | undefined;
      
        minValueInstant?: string | undefined;
        _minValueInstant?: Element | undefined;
      
        minValueInteger?: number | undefined;
        _minValueInteger?: Element | undefined;
      
        minValueInteger64?: integer64 | undefined;
        _minValueInteger64?: Element | undefined;
      
        minValuePositiveInt?: number | undefined;
        _minValuePositiveInt?: Element | undefined;
      
        minValueQuantity?: Quantity | undefined;
        _minValueQuantity?: Element | undefined;
      
        minValueTime?: time | undefined;
        _minValueTime?: Element | undefined;
      
        minValueUnsignedInt?: unsignedInt | undefined;
        _minValueUnsignedInt?: Element | undefined;
      
        mustHaveValue?: boolean | undefined;
        _mustHaveValue?: Element | undefined;
      
        mustSupport?: boolean | undefined;
        _mustSupport?: Element | undefined;
      
        orderMeaning?: string | undefined;
        _orderMeaning?: Element | undefined;
      
        path: string;
        _path?: Element | undefined;
      
        patternAddress?: Address | undefined;
        _patternAddress?: Element | undefined;
      
        patternAge?: Age | undefined;
        _patternAge?: Element | undefined;
      
        patternAnnotation?: Annotation | undefined;
        _patternAnnotation?: Element | undefined;
      
        patternAttachment?: Attachment | undefined;
        _patternAttachment?: Element | undefined;
      
        patternAvailability?: Availability | undefined;
        _patternAvailability?: Element | undefined;
      
        patternBase64Binary?: string | undefined;
        _patternBase64Binary?: Element | undefined;
      
        patternBoolean?: boolean | undefined;
        _patternBoolean?: Element | undefined;
      
        patternCanonical?: string | undefined;
        _patternCanonical?: Element | undefined;
      
        patternCode?: string | undefined;
        _patternCode?: Element | undefined;
      
        patternCodeableConcept?: CodeableConcept | undefined;
        _patternCodeableConcept?: Element | undefined;
      
        patternCodeableReference?: CodeableReference | undefined;
        _patternCodeableReference?: Element | undefined;
      
        patternCoding?: Coding | undefined;
        _patternCoding?: Element | undefined;
      
        patternContactDetail?: ContactDetail | undefined;
        _patternContactDetail?: Element | undefined;
      
        patternContactPoint?: ContactPoint | undefined;
        _patternContactPoint?: Element | undefined;
      
        patternCount?: Count | undefined;
        _patternCount?: Element | undefined;
      
        patternDataRequirement?: DataRequirement | undefined;
        _patternDataRequirement?: Element | undefined;
      
        patternDate?: string | undefined;
        _patternDate?: Element | undefined;
      
        patternDateTime?: string | undefined;
        _patternDateTime?: Element | undefined;
      
        patternDecimal?: number | undefined;
        _patternDecimal?: Element | undefined;
      
        patternDistance?: Distance | undefined;
        _patternDistance?: Element | undefined;
      
        patternDosage?: Dosage | undefined;
        _patternDosage?: Element | undefined;
      
        patternDuration?: Duration | undefined;
        _patternDuration?: Element | undefined;
      
        patternExpression?: Expression | undefined;
        _patternExpression?: Element | undefined;
      
        patternExtendedContactDetail?: ExtendedContactDetail | undefined;
        _patternExtendedContactDetail?: Element | undefined;
      
        patternHumanName?: HumanName | undefined;
        _patternHumanName?: Element | undefined;
      
        patternId?: id | undefined;
        _patternId?: Element | undefined;
      
        patternIdentifier?: Identifier | undefined;
        _patternIdentifier?: Element | undefined;
      
        patternInstant?: string | undefined;
        _patternInstant?: Element | undefined;
      
        patternInteger?: number | undefined;
        _patternInteger?: Element | undefined;
      
        patternInteger64?: integer64 | undefined;
        _patternInteger64?: Element | undefined;
      
        patternMarkdown?: string | undefined;
        _patternMarkdown?: Element | undefined;
      
        patternMeta?: Meta | undefined;
        _patternMeta?: Element | undefined;
      
        patternMoney?: Money | undefined;
        _patternMoney?: Element | undefined;
      
        patternOid?: oid | undefined;
        _patternOid?: Element | undefined;
      
        patternParameterDefinition?: ParameterDefinition | undefined;
        _patternParameterDefinition?: Element | undefined;
      
        patternPeriod?: Period | undefined;
        _patternPeriod?: Element | undefined;
      
        patternPositiveInt?: number | undefined;
        _patternPositiveInt?: Element | undefined;
      
        patternQuantity?: Quantity | undefined;
        _patternQuantity?: Element | undefined;
      
        patternRange?: Range | undefined;
        _patternRange?: Element | undefined;
      
        patternRatio?: Ratio | undefined;
        _patternRatio?: Element | undefined;
      
        patternRatioRange?: RatioRange | undefined;
        _patternRatioRange?: Element | undefined;
      
        patternReference?: Reference | undefined;
        _patternReference?: Element | undefined;
      
        patternRelatedArtifact?: RelatedArtifact | undefined;
        _patternRelatedArtifact?: Element | undefined;
      
        patternSampledData?: SampledData | undefined;
        _patternSampledData?: Element | undefined;
      
        patternSignature?: Signature | undefined;
        _patternSignature?: Element | undefined;
      
        patternString?: string | undefined;
        _patternString?: Element | undefined;
      
        patternTime?: time | undefined;
        _patternTime?: Element | undefined;
      
        patternTiming?: Timing | undefined;
        _patternTiming?: Element | undefined;
      
        patternTriggerDefinition?: TriggerDefinition | undefined;
        _patternTriggerDefinition?: Element | undefined;
      
        patternUnsignedInt?: unsignedInt | undefined;
        _patternUnsignedInt?: Element | undefined;
      
        patternUri?: string | undefined;
        _patternUri?: Element | undefined;
      
        patternUrl?: string | undefined;
        _patternUrl?: Element | undefined;
      
        patternUsageContext?: UsageContext | undefined;
        _patternUsageContext?: Element | undefined;
      
        patternUuid?: uuid | undefined;
        _patternUuid?: Element | undefined;
      
        representation?: Array<string> | undefined;
        _representation?: Element[] | undefined;
      
        requirements?: string | undefined;
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
      
        type: string;
        _type?: Element | undefined;
      
        ordered?: boolean | undefined;
        _ordered?: Element | undefined;
      
        rules: string;
        _rules?: Element | undefined;
      
        type?: Array<Element> | undefined;
        _type?: Element[] | undefined;
      
        aggregation?: Array<string> | undefined;
        _aggregation?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        profile?: Array<string> | undefined;
        _profile?: Element[] | undefined;
      
        targetProfile?: Array<string> | undefined;
        _targetProfile?: Element[] | undefined;
      
        versioning?: string | undefined;
        _versioning?: Element | undefined;
      
        valueAlternatives?: Array<string> | undefined;
        _valueAlternatives?: Element[] | undefined;
      
    }

  


  


  
    /**
 * Encounter
 * 
 * An interaction between healthcare provider(s), and/or patient(s) for the purpose
 * of providing healthcare service(s) or assessing the health status of patient(s).
 * 
 * @see {@link http://hl7.org/fhir/R5/Encounter.html}
 */
    export interface Encounter extends DomainResource {
      
      readonly resourceType: "Encounter";
      

      
        account?: Array<Reference> | undefined;
        _account?: Element[] | undefined;
      
        actualPeriod?: Period | undefined;
        _actualPeriod?: Element | undefined;
      
        admission?: BackboneElement | undefined;
        _admission?: Element | undefined;
      
        admitSource?: CodeableConcept | undefined;
        _admitSource?: Element | undefined;
      
        destination?: Reference | undefined;
        _destination?: Element | undefined;
      
        dischargeDisposition?: CodeableConcept | undefined;
        _dischargeDisposition?: Element | undefined;
      
        origin?: Reference | undefined;
        _origin?: Element | undefined;
      
        preAdmissionIdentifier?: Identifier | undefined;
        _preAdmissionIdentifier?: Element | undefined;
      
        reAdmission?: CodeableConcept | undefined;
        _reAdmission?: Element | undefined;
      
        appointment?: Array<Reference> | undefined;
        _appointment?: Element[] | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        careTeam?: Array<Reference> | undefined;
        _careTeam?: Element[] | undefined;
      
        class?: Array<CodeableConcept> | undefined;
        _class?: Element[] | undefined;
      
        diagnosis?: Array<BackboneElement> | undefined;
        _diagnosis?: Element[] | undefined;
      
        condition?: Array<CodeableReference> | undefined;
        _condition?: Element[] | undefined;
      
        use?: Array<CodeableConcept> | undefined;
        _use?: Element[] | undefined;
      
        dietPreference?: Array<CodeableConcept> | undefined;
        _dietPreference?: Element[] | undefined;
      
        episodeOfCare?: Array<Reference> | undefined;
        _episodeOfCare?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        length?: Duration | undefined;
        _length?: Element | undefined;
      
        location?: Array<BackboneElement> | undefined;
        _location?: Element[] | undefined;
      
        form?: CodeableConcept | undefined;
        _form?: Element | undefined;
      
        location: Reference;
        _location?: Element | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        status?: string | undefined;
        _status?: Element | undefined;
      
        participant?: Array<BackboneElement> | undefined;
        _participant?: Element[] | undefined;
      
        actor?: Reference | undefined;
        _actor?: Element | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
        partOf?: Reference | undefined;
        _partOf?: Element | undefined;
      
        plannedEndDate?: string | undefined;
        _plannedEndDate?: Element | undefined;
      
        plannedStartDate?: string | undefined;
        _plannedStartDate?: Element | undefined;
      
        priority?: CodeableConcept | undefined;
        _priority?: Element | undefined;
      
        reason?: Array<BackboneElement> | undefined;
        _reason?: Element[] | undefined;
      
        use?: Array<CodeableConcept> | undefined;
        _use?: Element[] | undefined;
      
        value?: Array<CodeableReference> | undefined;
        _value?: Element[] | undefined;
      
        serviceProvider?: Reference | undefined;
        _serviceProvider?: Element | undefined;
      
        serviceType?: Array<CodeableReference> | undefined;
        _serviceType?: Element[] | undefined;
      
        specialArrangement?: Array<CodeableConcept> | undefined;
        _specialArrangement?: Element[] | undefined;
      
        specialCourtesy?: Array<CodeableConcept> | undefined;
        _specialCourtesy?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
        subjectStatus?: CodeableConcept | undefined;
        _subjectStatus?: Element | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
        virtualService?: Array<VirtualServiceDetail> | undefined;
        _virtualService?: Element[] | undefined;
      
    }

  


  
    /**
 * EncounterHistory
 * 
 * A record of significant events/milestones key data throughout the history of an
 * Encounter
 * 
 * @see {@link http://hl7.org/fhir/R5/EncounterHistory.html}
 */
    export interface EncounterHistory extends DomainResource {
      
      readonly resourceType: "EncounterHistory";
      

      
        actualPeriod?: Period | undefined;
        _actualPeriod?: Element | undefined;
      
        class: CodeableConcept;
        _class?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        length?: Duration | undefined;
        _length?: Element | undefined;
      
        location?: Array<BackboneElement> | undefined;
        _location?: Element[] | undefined;
      
        form?: CodeableConcept | undefined;
        _form?: Element | undefined;
      
        location: Reference;
        _location?: Element | undefined;
      
        plannedEndDate?: string | undefined;
        _plannedEndDate?: Element | undefined;
      
        plannedStartDate?: string | undefined;
        _plannedStartDate?: Element | undefined;
      
        serviceType?: Array<CodeableReference> | undefined;
        _serviceType?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
        subjectStatus?: CodeableConcept | undefined;
        _subjectStatus?: Element | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
    }

  


  
    /**
 * Endpoint
 * 
 * The technical details of an endpoint that can be used for electronic services,
 * such as for web services providing XDS.b, a REST endpoint for another FHIR
 * server, or a s/Mime email address. This may include any security context
 * information.
 * 
 * @see {@link http://hl7.org/fhir/R5/Endpoint.html}
 */
    export interface Endpoint extends DomainResource {
      
      readonly resourceType: "Endpoint";
      

      
        address: string;
        _address?: Element | undefined;
      
        connectionType: Array<CodeableConcept>;
        _connectionType?: Element[] | undefined;
      
        contact?: Array<ContactPoint> | undefined;
        _contact?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        environmentType?: Array<CodeableConcept> | undefined;
        _environmentType?: Element[] | undefined;
      
        header?: Array<string> | undefined;
        _header?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        managingOrganization?: Reference | undefined;
        _managingOrganization?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        payload?: Array<BackboneElement> | undefined;
        _payload?: Element[] | undefined;
      
        mimeType?: Array<string> | undefined;
        _mimeType?: Element[] | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
    }

  


  
    /**
 * EnrollmentRequest
 * 
 * This resource provides the insurance enrollment details to the insurer regarding
 * a specified coverage.
 * 
 * @see {@link http://hl7.org/fhir/R5/EnrollmentRequest.html}
 */
    export interface EnrollmentRequest extends DomainResource {
      
      readonly resourceType: "EnrollmentRequest";
      

      
        candidate?: Reference | undefined;
        _candidate?: Element | undefined;
      
        coverage?: Reference | undefined;
        _coverage?: Element | undefined;
      
        created?: string | undefined;
        _created?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        insurer?: Reference | undefined;
        _insurer?: Element | undefined;
      
        provider?: Reference | undefined;
        _provider?: Element | undefined;
      
        status?: string | undefined;
        _status?: Element | undefined;
      
    }

  


  
    /**
 * EnrollmentResponse
 * 
 * This resource provides enrollment and plan details from the processing of an
 * EnrollmentRequest resource.
 * 
 * @see {@link http://hl7.org/fhir/R5/EnrollmentResponse.html}
 */
    export interface EnrollmentResponse extends DomainResource {
      
      readonly resourceType: "EnrollmentResponse";
      

      
        created?: string | undefined;
        _created?: Element | undefined;
      
        disposition?: string | undefined;
        _disposition?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        organization?: Reference | undefined;
        _organization?: Element | undefined;
      
        outcome?: string | undefined;
        _outcome?: Element | undefined;
      
        request?: Reference | undefined;
        _request?: Element | undefined;
      
        requestProvider?: Reference | undefined;
        _requestProvider?: Element | undefined;
      
        status?: string | undefined;
        _status?: Element | undefined;
      
    }

  


  
    /**
 * EpisodeOfCare
 * 
 * An association between a patient and an organization / healthcare provider(s)
 * during which time encounters may occur. The managing organization assumes a
 * level of responsibility for the patient during this time.
 * 
 * @see {@link http://hl7.org/fhir/R5/EpisodeOfCare.html}
 */
    export interface EpisodeOfCare extends DomainResource {
      
      readonly resourceType: "EpisodeOfCare";
      

      
        account?: Array<Reference> | undefined;
        _account?: Element[] | undefined;
      
        careManager?: Reference | undefined;
        _careManager?: Element | undefined;
      
        careTeam?: Array<Reference> | undefined;
        _careTeam?: Element[] | undefined;
      
        diagnosis?: Array<BackboneElement> | undefined;
        _diagnosis?: Element[] | undefined;
      
        condition?: Array<CodeableReference> | undefined;
        _condition?: Element[] | undefined;
      
        use?: CodeableConcept | undefined;
        _use?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        managingOrganization?: Reference | undefined;
        _managingOrganization?: Element | undefined;
      
        patient: Reference;
        _patient?: Element | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        reason?: Array<BackboneElement> | undefined;
        _reason?: Element[] | undefined;
      
        use?: CodeableConcept | undefined;
        _use?: Element | undefined;
      
        value?: Array<CodeableReference> | undefined;
        _value?: Element[] | undefined;
      
        referralRequest?: Array<Reference> | undefined;
        _referralRequest?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        statusHistory?: Array<BackboneElement> | undefined;
        _statusHistory?: Element[] | undefined;
      
        period: Period;
        _period?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
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
 * @see {@link http://hl7.org/fhir/R5/Event.html}
 */
    export interface Event extends Base {
      
      readonly resourceType: string;
      

      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        location?: Reference | undefined;
        _location?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        occurrenceDateTime?: string | undefined;
        _occurrenceDateTime?: Element | undefined;
      
        occurrencePeriod?: Period | undefined;
        _occurrencePeriod?: Element | undefined;
      
        occurrenceTiming?: Timing | undefined;
        _occurrenceTiming?: Element | undefined;
      
        partOf?: Array<Reference> | undefined;
        _partOf?: Element[] | undefined;
      
        performer?: Array<Element> | undefined;
        _performer?: Element[] | undefined;
      
        actor: Reference;
        _actor?: Element | undefined;
      
        function?: CodeableConcept | undefined;
        _function?: Element | undefined;
      
        product?: CodeableReference | undefined;
        _product?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        recorded?: string | undefined;
        _recorded?: Element | undefined;
      
        relevantHistory?: Array<Reference> | undefined;
        _relevantHistory?: Element[] | undefined;
      
        reportedBoolean?: boolean | undefined;
        _reportedBoolean?: Element | undefined;
      
        reportedReference?: Reference | undefined;
        _reportedReference?: Element | undefined;
      
        researchStudy?: Array<Reference> | undefined;
        _researchStudy?: Element[] | undefined;
      
        status: string;
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
 * @see {@link http://hl7.org/fhir/R5/EventDefinition.html}
 */
    export interface EventDefinition extends DomainResource {
      
      readonly resourceType: "EventDefinition";
      

      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        author?: Array<ContactDetail> | undefined;
        _author?: Element[] | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
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
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        relatedArtifact?: Array<RelatedArtifact> | undefined;
        _relatedArtifact?: Element[] | undefined;
      
        reviewer?: Array<ContactDetail> | undefined;
        _reviewer?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subjectCodeableConcept?: CodeableConcept | undefined;
        _subjectCodeableConcept?: Element | undefined;
      
        subjectReference?: Reference | undefined;
        _subjectReference?: Element | undefined;
      
        subtitle?: string | undefined;
        _subtitle?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        topic?: Array<CodeableConcept> | undefined;
        _topic?: Element[] | undefined;
      
        trigger: Array<TriggerDefinition>;
        _trigger?: Element[] | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        usage?: string | undefined;
        _usage?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * Evidence
 * 
 * The Evidence Resource provides a machine-interpretable expression of an evidence
 * concept including the evidence variables (e.g., population,
 * exposures/interventions, comparators, outcomes, measured variables, confounding
 * variables), the statistics, and the certainty of this evidence.
 * 
 * @see {@link http://hl7.org/fhir/R5/Evidence.html}
 */
    export interface Evidence extends DomainResource {
      
      readonly resourceType: "Evidence";
      

      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        assertion?: string | undefined;
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
      
        citeAsMarkdown?: string | undefined;
        _citeAsMarkdown?: Element | undefined;
      
        citeAsReference?: Reference | undefined;
        _citeAsReference?: Element | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        editor?: Array<ContactDetail> | undefined;
        _editor?: Element[] | undefined;
      
        endorser?: Array<ContactDetail> | undefined;
        _endorser?: Element[] | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
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
      
        level?: number | undefined;
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
      
        handling?: string | undefined;
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
      
        status: string;
        _status?: Element | undefined;
      
        studyDesign?: Array<CodeableConcept> | undefined;
        _studyDesign?: Element[] | undefined;
      
        synthesisType?: CodeableConcept | undefined;
        _synthesisType?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        variableDefinition: Array<BackboneElement>;
        _variableDefinition?: Element[] | undefined;
      
        description?: string | undefined;
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
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * EvidenceReport
 * 
 * The EvidenceReport Resource is a specialized container for a collection of
 * resources and codeable concepts, adapted to support compositions of Evidence,
 * EvidenceVariable, and Citation resources and related concepts.
 * 
 * @see {@link http://hl7.org/fhir/R5/EvidenceReport.html}
 */
    export interface EvidenceReport extends DomainResource {
      
      readonly resourceType: "EvidenceReport";
      

      
        author?: Array<ContactDetail> | undefined;
        _author?: Element[] | undefined;
      
        citeAsMarkdown?: string | undefined;
        _citeAsMarkdown?: Element | undefined;
      
        citeAsReference?: Reference | undefined;
        _citeAsReference?: Element | undefined;
      
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
      
        code: string;
        _code?: Element | undefined;
      
        target: BackboneElement;
        _target?: Element | undefined;
      
        display?: string | undefined;
        _display?: Element | undefined;
      
        identifier?: Identifier | undefined;
        _identifier?: Element | undefined;
      
        resource?: Reference | undefined;
        _resource?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
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
      
        mode?: string | undefined;
        _mode?: Element | undefined;
      
        orderedBy?: CodeableConcept | undefined;
        _orderedBy?: Element | undefined;
      
        section?: Array<undefined> | undefined;
        _section?: Element[] | undefined;
      
        text?: Narrative | undefined;
        _text?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        status: string;
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
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        url?: string | undefined;
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
 * @see {@link http://hl7.org/fhir/R5/EvidenceVariable.html}
 */
    export interface EvidenceVariable extends DomainResource {
      
      readonly resourceType: "EvidenceVariable";
      

      
        actual?: boolean | undefined;
        _actual?: Element | undefined;
      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        author?: Array<ContactDetail> | undefined;
        _author?: Element[] | undefined;
      
        category?: Array<BackboneElement> | undefined;
        _category?: Element[] | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        characteristic?: Array<BackboneElement> | undefined;
        _characteristic?: Element[] | undefined;
      
        definitionByCombination?: BackboneElement | undefined;
        _definitionByCombination?: Element | undefined;
      
        characteristic: Array<undefined>;
        _characteristic?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        threshold?: number | undefined;
        _threshold?: Element | undefined;
      
        definitionByTypeAndValue?: BackboneElement | undefined;
        _definitionByTypeAndValue?: Element | undefined;
      
        device?: Reference | undefined;
        _device?: Element | undefined;
      
        method?: Array<CodeableConcept> | undefined;
        _method?: Element[] | undefined;
      
        offset?: CodeableConcept | undefined;
        _offset?: Element | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueId?: id | undefined;
        _valueId?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        definitionCanonical?: string | undefined;
        _definitionCanonical?: Element | undefined;
      
        definitionCodeableConcept?: CodeableConcept | undefined;
        _definitionCodeableConcept?: Element | undefined;
      
        definitionExpression?: Expression | undefined;
        _definitionExpression?: Element | undefined;
      
        definitionId?: id | undefined;
        _definitionId?: Element | undefined;
      
        definitionReference?: Reference | undefined;
        _definitionReference?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        durationQuantity?: Quantity | undefined;
        _durationQuantity?: Element | undefined;
      
        durationRange?: Range | undefined;
        _durationRange?: Element | undefined;
      
        exclude?: boolean | undefined;
        _exclude?: Element | undefined;
      
        instancesQuantity?: Quantity | undefined;
        _instancesQuantity?: Element | undefined;
      
        instancesRange?: Range | undefined;
        _instancesRange?: Element | undefined;
      
        linkId?: id | undefined;
        _linkId?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        timeFromEvent?: Array<BackboneElement> | undefined;
        _timeFromEvent?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        eventCodeableConcept?: CodeableConcept | undefined;
        _eventCodeableConcept?: Element | undefined;
      
        eventDateTime?: string | undefined;
        _eventDateTime?: Element | undefined;
      
        eventId?: id | undefined;
        _eventId?: Element | undefined;
      
        eventReference?: Reference | undefined;
        _eventReference?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        range?: Range | undefined;
        _range?: Element | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        editor?: Array<ContactDetail> | undefined;
        _editor?: Element[] | undefined;
      
        effectivePeriod?: Period | undefined;
        _effectivePeriod?: Element | undefined;
      
        endorser?: Array<ContactDetail> | undefined;
        _endorser?: Element[] | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        handling?: string | undefined;
        _handling?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        relatedArtifact?: Array<RelatedArtifact> | undefined;
        _relatedArtifact?: Element[] | undefined;
      
        reviewer?: Array<ContactDetail> | undefined;
        _reviewer?: Element[] | undefined;
      
        shortTitle?: string | undefined;
        _shortTitle?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  


  


  


  


  


  
    /**
 * ExampleScenario
 * 
 * A walkthrough of a workflow showing the interaction between systems and the
 * instances shared, possibly including the evolution of instances over time.
 * 
 * @see {@link http://hl7.org/fhir/R5/ExampleScenario.html}
 */
    export interface ExampleScenario extends DomainResource {
      
      readonly resourceType: "ExampleScenario";
      

      
        actor?: Array<BackboneElement> | undefined;
        _actor?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        key: string;
        _key?: Element | undefined;
      
        title: string;
        _title?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        instance?: Array<BackboneElement> | undefined;
        _instance?: Element[] | undefined;
      
        containedInstance?: Array<BackboneElement> | undefined;
        _containedInstance?: Element[] | undefined;
      
        instanceReference: string;
        _instanceReference?: Element | undefined;
      
        versionReference?: string | undefined;
        _versionReference?: Element | undefined;
      
        content?: Reference | undefined;
        _content?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        key: string;
        _key?: Element | undefined;
      
        structureProfileCanonical?: string | undefined;
        _structureProfileCanonical?: Element | undefined;
      
        structureProfileUri?: string | undefined;
        _structureProfileUri?: Element | undefined;
      
        structureType: Coding;
        _structureType?: Element | undefined;
      
        structureVersion?: string | undefined;
        _structureVersion?: Element | undefined;
      
        title: string;
        _title?: Element | undefined;
      
        version?: Array<BackboneElement> | undefined;
        _version?: Element[] | undefined;
      
        content?: Reference | undefined;
        _content?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        key: string;
        _key?: Element | undefined;
      
        title: string;
        _title?: Element | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        process?: Array<BackboneElement> | undefined;
        _process?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        postConditions?: string | undefined;
        _postConditions?: Element | undefined;
      
        preConditions?: string | undefined;
        _preConditions?: Element | undefined;
      
        step?: Array<BackboneElement> | undefined;
        _step?: Element[] | undefined;
      
        alternative?: Array<BackboneElement> | undefined;
        _alternative?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        step?: Array<undefined> | undefined;
        _step?: Element[] | undefined;
      
        title: string;
        _title?: Element | undefined;
      
        number?: string | undefined;
        _number?: Element | undefined;
      
        operation?: BackboneElement | undefined;
        _operation?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        initiator?: string | undefined;
        _initiator?: Element | undefined;
      
        initiatorActive?: boolean | undefined;
        _initiatorActive?: Element | undefined;
      
        receiver?: string | undefined;
        _receiver?: Element | undefined;
      
        receiverActive?: boolean | undefined;
        _receiverActive?: Element | undefined;
      
        request?: undefined | undefined;
        _request?: Element | undefined;
      
        response?: undefined | undefined;
        _response?: Element | undefined;
      
        title: string;
        _title?: Element | undefined;
      
        type?: Coding | undefined;
        _type?: Element | undefined;
      
        pause?: boolean | undefined;
        _pause?: Element | undefined;
      
        process?: undefined | undefined;
        _process?: Element | undefined;
      
        workflow?: string | undefined;
        _workflow?: Element | undefined;
      
        title: string;
        _title?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  


  
    /**
 * ExplanationOfBenefit
 * 
 * This resource provides: the claim details; adjudication details from the
 * processing of a Claim; and optionally account balance information, for informing
 * the subscriber of the benefits provided.
 * 
 * @see {@link http://hl7.org/fhir/R5/ExplanationOfBenefit.html}
 */
    export interface ExplanationOfBenefit extends DomainResource {
      
      readonly resourceType: "ExplanationOfBenefit";
      

      
        accident?: BackboneElement | undefined;
        _accident?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        locationAddress?: Address | undefined;
        _locationAddress?: Element | undefined;
      
        locationReference?: Reference | undefined;
        _locationReference?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        addItem?: Array<BackboneElement> | undefined;
        _addItem?: Element[] | undefined;
      
        adjudication?: Array<undefined> | undefined;
        _adjudication?: Element[] | undefined;
      
        bodySite?: Array<BackboneElement> | undefined;
        _bodySite?: Element[] | undefined;
      
        site: Array<CodeableReference>;
        _site?: Element[] | undefined;
      
        subSite?: Array<CodeableConcept> | undefined;
        _subSite?: Element[] | undefined;
      
        detail?: Array<BackboneElement> | undefined;
        _detail?: Element[] | undefined;
      
        adjudication?: Array<undefined> | undefined;
        _adjudication?: Element[] | undefined;
      
        factor?: number | undefined;
        _factor?: Element | undefined;
      
        modifier?: Array<CodeableConcept> | undefined;
        _modifier?: Element[] | undefined;
      
        net?: Money | undefined;
        _net?: Element | undefined;
      
        noteNumber?: Array<number> | undefined;
        _noteNumber?: Element[] | undefined;
      
        patientPaid?: Money | undefined;
        _patientPaid?: Element | undefined;
      
        productOrService?: CodeableConcept | undefined;
        _productOrService?: Element | undefined;
      
        productOrServiceEnd?: CodeableConcept | undefined;
        _productOrServiceEnd?: Element | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        revenue?: CodeableConcept | undefined;
        _revenue?: Element | undefined;
      
        reviewOutcome?: undefined | undefined;
        _reviewOutcome?: Element | undefined;
      
        subDetail?: Array<BackboneElement> | undefined;
        _subDetail?: Element[] | undefined;
      
        adjudication?: Array<undefined> | undefined;
        _adjudication?: Element[] | undefined;
      
        factor?: number | undefined;
        _factor?: Element | undefined;
      
        modifier?: Array<CodeableConcept> | undefined;
        _modifier?: Element[] | undefined;
      
        net?: Money | undefined;
        _net?: Element | undefined;
      
        noteNumber?: Array<number> | undefined;
        _noteNumber?: Element[] | undefined;
      
        patientPaid?: Money | undefined;
        _patientPaid?: Element | undefined;
      
        productOrService?: CodeableConcept | undefined;
        _productOrService?: Element | undefined;
      
        productOrServiceEnd?: CodeableConcept | undefined;
        _productOrServiceEnd?: Element | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        revenue?: CodeableConcept | undefined;
        _revenue?: Element | undefined;
      
        reviewOutcome?: undefined | undefined;
        _reviewOutcome?: Element | undefined;
      
        tax?: Money | undefined;
        _tax?: Element | undefined;
      
        traceNumber?: Array<Identifier> | undefined;
        _traceNumber?: Element[] | undefined;
      
        unitPrice?: Money | undefined;
        _unitPrice?: Element | undefined;
      
        tax?: Money | undefined;
        _tax?: Element | undefined;
      
        traceNumber?: Array<Identifier> | undefined;
        _traceNumber?: Element[] | undefined;
      
        unitPrice?: Money | undefined;
        _unitPrice?: Element | undefined;
      
        detailSequence?: Array<number> | undefined;
        _detailSequence?: Element[] | undefined;
      
        factor?: number | undefined;
        _factor?: Element | undefined;
      
        itemSequence?: Array<number> | undefined;
        _itemSequence?: Element[] | undefined;
      
        locationAddress?: Address | undefined;
        _locationAddress?: Element | undefined;
      
        locationCodeableConcept?: CodeableConcept | undefined;
        _locationCodeableConcept?: Element | undefined;
      
        locationReference?: Reference | undefined;
        _locationReference?: Element | undefined;
      
        modifier?: Array<CodeableConcept> | undefined;
        _modifier?: Element[] | undefined;
      
        net?: Money | undefined;
        _net?: Element | undefined;
      
        noteNumber?: Array<number> | undefined;
        _noteNumber?: Element[] | undefined;
      
        patientPaid?: Money | undefined;
        _patientPaid?: Element | undefined;
      
        productOrService?: CodeableConcept | undefined;
        _productOrService?: Element | undefined;
      
        productOrServiceEnd?: CodeableConcept | undefined;
        _productOrServiceEnd?: Element | undefined;
      
        programCode?: Array<CodeableConcept> | undefined;
        _programCode?: Element[] | undefined;
      
        provider?: Array<Reference> | undefined;
        _provider?: Element[] | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        request?: Array<Reference> | undefined;
        _request?: Element[] | undefined;
      
        revenue?: CodeableConcept | undefined;
        _revenue?: Element | undefined;
      
        reviewOutcome?: undefined | undefined;
        _reviewOutcome?: Element | undefined;
      
        servicedDate?: string | undefined;
        _servicedDate?: Element | undefined;
      
        servicedPeriod?: Period | undefined;
        _servicedPeriod?: Element | undefined;
      
        subDetailSequence?: Array<number> | undefined;
        _subDetailSequence?: Element[] | undefined;
      
        tax?: Money | undefined;
        _tax?: Element | undefined;
      
        traceNumber?: Array<Identifier> | undefined;
        _traceNumber?: Element[] | undefined;
      
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
      
        allowedMoney?: Money | undefined;
        _allowedMoney?: Element | undefined;
      
        allowedString?: string | undefined;
        _allowedString?: Element | undefined;
      
        allowedUnsignedInt?: unsignedInt | undefined;
        _allowedUnsignedInt?: Element | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        usedMoney?: Money | undefined;
        _usedMoney?: Element | undefined;
      
        usedUnsignedInt?: unsignedInt | undefined;
        _usedUnsignedInt?: Element | undefined;
      
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
      
        responsible?: boolean | undefined;
        _responsible?: Element | undefined;
      
        role?: CodeableConcept | undefined;
        _role?: Element | undefined;
      
        sequence: number;
        _sequence?: Element | undefined;
      
        specialty?: CodeableConcept | undefined;
        _specialty?: Element | undefined;
      
        claim?: Reference | undefined;
        _claim?: Element | undefined;
      
        claimResponse?: Reference | undefined;
        _claimResponse?: Element | undefined;
      
        created: string;
        _created?: Element | undefined;
      
        decision?: CodeableConcept | undefined;
        _decision?: Element | undefined;
      
        diagnosis?: Array<BackboneElement> | undefined;
        _diagnosis?: Element[] | undefined;
      
        diagnosisCodeableConcept?: CodeableConcept | undefined;
        _diagnosisCodeableConcept?: Element | undefined;
      
        diagnosisReference?: Reference | undefined;
        _diagnosisReference?: Element | undefined;
      
        onAdmission?: CodeableConcept | undefined;
        _onAdmission?: Element | undefined;
      
        sequence: number;
        _sequence?: Element | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
        diagnosisRelatedGroup?: CodeableConcept | undefined;
        _diagnosisRelatedGroup?: Element | undefined;
      
        disposition?: string | undefined;
        _disposition?: Element | undefined;
      
        encounter?: Array<Reference> | undefined;
        _encounter?: Element[] | undefined;
      
        enterer?: Reference | undefined;
        _enterer?: Element | undefined;
      
        event?: Array<BackboneElement> | undefined;
        _event?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        whenDateTime?: string | undefined;
        _whenDateTime?: Element | undefined;
      
        whenPeriod?: Period | undefined;
        _whenPeriod?: Element | undefined;
      
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
      
        insurance?: Array<BackboneElement> | undefined;
        _insurance?: Element[] | undefined;
      
        coverage: Reference;
        _coverage?: Element | undefined;
      
        focal: boolean;
        _focal?: Element | undefined;
      
        preAuthRef?: Array<string> | undefined;
        _preAuthRef?: Element[] | undefined;
      
        insurer?: Reference | undefined;
        _insurer?: Element | undefined;
      
        item?: Array<BackboneElement> | undefined;
        _item?: Element[] | undefined;
      
        adjudication?: Array<BackboneElement> | undefined;
        _adjudication?: Element[] | undefined;
      
        amount?: Money | undefined;
        _amount?: Element | undefined;
      
        category: CodeableConcept;
        _category?: Element | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        reason?: CodeableConcept | undefined;
        _reason?: Element | undefined;
      
        bodySite?: Array<BackboneElement> | undefined;
        _bodySite?: Element[] | undefined;
      
        site: Array<CodeableReference>;
        _site?: Element[] | undefined;
      
        subSite?: Array<CodeableConcept> | undefined;
        _subSite?: Element[] | undefined;
      
        careTeamSequence?: Array<number> | undefined;
        _careTeamSequence?: Element[] | undefined;
      
        category?: CodeableConcept | undefined;
        _category?: Element | undefined;
      
        detail?: Array<BackboneElement> | undefined;
        _detail?: Element[] | undefined;
      
        adjudication?: Array<undefined> | undefined;
        _adjudication?: Element[] | undefined;
      
        category?: CodeableConcept | undefined;
        _category?: Element | undefined;
      
        factor?: number | undefined;
        _factor?: Element | undefined;
      
        modifier?: Array<CodeableConcept> | undefined;
        _modifier?: Element[] | undefined;
      
        net?: Money | undefined;
        _net?: Element | undefined;
      
        noteNumber?: Array<number> | undefined;
        _noteNumber?: Element[] | undefined;
      
        patientPaid?: Money | undefined;
        _patientPaid?: Element | undefined;
      
        productOrService?: CodeableConcept | undefined;
        _productOrService?: Element | undefined;
      
        productOrServiceEnd?: CodeableConcept | undefined;
        _productOrServiceEnd?: Element | undefined;
      
        programCode?: Array<CodeableConcept> | undefined;
        _programCode?: Element[] | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        revenue?: CodeableConcept | undefined;
        _revenue?: Element | undefined;
      
        reviewOutcome?: undefined | undefined;
        _reviewOutcome?: Element | undefined;
      
        sequence: number;
        _sequence?: Element | undefined;
      
        subDetail?: Array<BackboneElement> | undefined;
        _subDetail?: Element[] | undefined;
      
        adjudication?: Array<undefined> | undefined;
        _adjudication?: Element[] | undefined;
      
        category?: CodeableConcept | undefined;
        _category?: Element | undefined;
      
        factor?: number | undefined;
        _factor?: Element | undefined;
      
        modifier?: Array<CodeableConcept> | undefined;
        _modifier?: Element[] | undefined;
      
        net?: Money | undefined;
        _net?: Element | undefined;
      
        noteNumber?: Array<number> | undefined;
        _noteNumber?: Element[] | undefined;
      
        patientPaid?: Money | undefined;
        _patientPaid?: Element | undefined;
      
        productOrService?: CodeableConcept | undefined;
        _productOrService?: Element | undefined;
      
        productOrServiceEnd?: CodeableConcept | undefined;
        _productOrServiceEnd?: Element | undefined;
      
        programCode?: Array<CodeableConcept> | undefined;
        _programCode?: Element[] | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        revenue?: CodeableConcept | undefined;
        _revenue?: Element | undefined;
      
        reviewOutcome?: undefined | undefined;
        _reviewOutcome?: Element | undefined;
      
        sequence: number;
        _sequence?: Element | undefined;
      
        tax?: Money | undefined;
        _tax?: Element | undefined;
      
        traceNumber?: Array<Identifier> | undefined;
        _traceNumber?: Element[] | undefined;
      
        udi?: Array<Reference> | undefined;
        _udi?: Element[] | undefined;
      
        unitPrice?: Money | undefined;
        _unitPrice?: Element | undefined;
      
        tax?: Money | undefined;
        _tax?: Element | undefined;
      
        traceNumber?: Array<Identifier> | undefined;
        _traceNumber?: Element[] | undefined;
      
        udi?: Array<Reference> | undefined;
        _udi?: Element[] | undefined;
      
        unitPrice?: Money | undefined;
        _unitPrice?: Element | undefined;
      
        diagnosisSequence?: Array<number> | undefined;
        _diagnosisSequence?: Element[] | undefined;
      
        encounter?: Array<Reference> | undefined;
        _encounter?: Element[] | undefined;
      
        factor?: number | undefined;
        _factor?: Element | undefined;
      
        informationSequence?: Array<number> | undefined;
        _informationSequence?: Element[] | undefined;
      
        locationAddress?: Address | undefined;
        _locationAddress?: Element | undefined;
      
        locationCodeableConcept?: CodeableConcept | undefined;
        _locationCodeableConcept?: Element | undefined;
      
        locationReference?: Reference | undefined;
        _locationReference?: Element | undefined;
      
        modifier?: Array<CodeableConcept> | undefined;
        _modifier?: Element[] | undefined;
      
        net?: Money | undefined;
        _net?: Element | undefined;
      
        noteNumber?: Array<number> | undefined;
        _noteNumber?: Element[] | undefined;
      
        patientPaid?: Money | undefined;
        _patientPaid?: Element | undefined;
      
        procedureSequence?: Array<number> | undefined;
        _procedureSequence?: Element[] | undefined;
      
        productOrService?: CodeableConcept | undefined;
        _productOrService?: Element | undefined;
      
        productOrServiceEnd?: CodeableConcept | undefined;
        _productOrServiceEnd?: Element | undefined;
      
        programCode?: Array<CodeableConcept> | undefined;
        _programCode?: Element[] | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        request?: Array<Reference> | undefined;
        _request?: Element[] | undefined;
      
        revenue?: CodeableConcept | undefined;
        _revenue?: Element | undefined;
      
        reviewOutcome?: BackboneElement | undefined;
        _reviewOutcome?: Element | undefined;
      
        decision?: CodeableConcept | undefined;
        _decision?: Element | undefined;
      
        preAuthPeriod?: Period | undefined;
        _preAuthPeriod?: Element | undefined;
      
        preAuthRef?: string | undefined;
        _preAuthRef?: Element | undefined;
      
        reason?: Array<CodeableConcept> | undefined;
        _reason?: Element[] | undefined;
      
        sequence: number;
        _sequence?: Element | undefined;
      
        servicedDate?: string | undefined;
        _servicedDate?: Element | undefined;
      
        servicedPeriod?: Period | undefined;
        _servicedPeriod?: Element | undefined;
      
        tax?: Money | undefined;
        _tax?: Element | undefined;
      
        traceNumber?: Array<Identifier> | undefined;
        _traceNumber?: Element[] | undefined;
      
        udi?: Array<Reference> | undefined;
        _udi?: Element[] | undefined;
      
        unitPrice?: Money | undefined;
        _unitPrice?: Element | undefined;
      
        originalPrescription?: Reference | undefined;
        _originalPrescription?: Element | undefined;
      
        outcome: string;
        _outcome?: Element | undefined;
      
        patient: Reference;
        _patient?: Element | undefined;
      
        patientPaid?: Money | undefined;
        _patientPaid?: Element | undefined;
      
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
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        identifier?: Identifier | undefined;
        _identifier?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        preAuthRef?: Array<string> | undefined;
        _preAuthRef?: Element[] | undefined;
      
        preAuthRefPeriod?: Array<Period> | undefined;
        _preAuthRefPeriod?: Element[] | undefined;
      
        precedence?: number | undefined;
        _precedence?: Element | undefined;
      
        prescription?: Reference | undefined;
        _prescription?: Element | undefined;
      
        priority?: CodeableConcept | undefined;
        _priority?: Element | undefined;
      
        procedure?: Array<BackboneElement> | undefined;
        _procedure?: Element[] | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        procedureCodeableConcept?: CodeableConcept | undefined;
        _procedureCodeableConcept?: Element | undefined;
      
        procedureReference?: Reference | undefined;
        _procedureReference?: Element | undefined;
      
        sequence: number;
        _sequence?: Element | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
        udi?: Array<Reference> | undefined;
        _udi?: Element[] | undefined;
      
        processNote?: Array<BackboneElement> | undefined;
        _processNote?: Element[] | undefined;
      
        language?: CodeableConcept | undefined;
        _language?: Element | undefined;
      
        number?: number | undefined;
        _number?: Element | undefined;
      
        text?: string | undefined;
        _text?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        provider?: Reference | undefined;
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
      
        status: string;
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
      
        sequence: number;
        _sequence?: Element | undefined;
      
        timingDate?: string | undefined;
        _timingDate?: Element | undefined;
      
        timingPeriod?: Period | undefined;
        _timingPeriod?: Element | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueIdentifier?: Identifier | undefined;
        _valueIdentifier?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        total?: Array<BackboneElement> | undefined;
        _total?: Element[] | undefined;
      
        amount: Money;
        _amount?: Element | undefined;
      
        category: CodeableConcept;
        _category?: Element | undefined;
      
        traceNumber?: Array<Identifier> | undefined;
        _traceNumber?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        use: string;
        _use?: Element | undefined;
      
    }

  


  
    /**
 * Expression
 * 
 * Expression Type: A expression that is evaluated in a specified context and
 * returns a value. The context of use of the expression must specify the context
 * in which the expression is evaluated, and how the result of the expression is
 * used.
 * 
 * @see {@link http://hl7.org/fhir/R5/Expression.html}
 */
    export interface Expression extends DataType {
      
      readonly resourceType: string;
      

      
        description?: string | undefined;
        _description?: Element | undefined;
      
        expression?: string | undefined;
        _expression?: Element | undefined;
      
        language?: string | undefined;
        _language?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        reference?: string | undefined;
        _reference?: Element | undefined;
      
    }

  


  
    /**
 * ExtendedContactDetail
 * 
 * ExtendedContactDetail Type: Specifies contact information for a specific purpose
 * over a period of time, might be handled/monitored by a specific named person or
 * organization.
 * 
 * @see {@link http://hl7.org/fhir/R5/ExtendedContactDetail.html}
 */
    export interface ExtendedContactDetail extends DataType {
      
      readonly resourceType: string;
      

      
        address?: Address | undefined;
        _address?: Element | undefined;
      
        name?: Array<HumanName> | undefined;
        _name?: Element[] | undefined;
      
        organization?: Reference | undefined;
        _organization?: Element | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        purpose?: CodeableConcept | undefined;
        _purpose?: Element | undefined;
      
        telecom?: Array<ContactPoint> | undefined;
        _telecom?: Element[] | undefined;
      
    }

  


  
    /**
 * Extension
 * 
 * Extension Type: Optional Extension Element - found in all resources.
 * 
 * @see {@link http://hl7.org/fhir/R5/Extension.html}
 */
    export interface Extension extends DataType {
      
      readonly resourceType: string;
      

      
        url: http://hl7.org/fhirpath/System.String;
        _url?: Element | undefined;
      
        valueAddress?: Address | undefined;
        _valueAddress?: Element | undefined;
      
        valueAge?: Age | undefined;
        _valueAge?: Element | undefined;
      
        valueAnnotation?: Annotation | undefined;
        _valueAnnotation?: Element | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueAvailability?: Availability | undefined;
        _valueAvailability?: Element | undefined;
      
        valueBase64Binary?: string | undefined;
        _valueBase64Binary?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCanonical?: string | undefined;
        _valueCanonical?: Element | undefined;
      
        valueCode?: string | undefined;
        _valueCode?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueCodeableReference?: CodeableReference | undefined;
        _valueCodeableReference?: Element | undefined;
      
        valueCoding?: Coding | undefined;
        _valueCoding?: Element | undefined;
      
        valueContactDetail?: ContactDetail | undefined;
        _valueContactDetail?: Element | undefined;
      
        valueContactPoint?: ContactPoint | undefined;
        _valueContactPoint?: Element | undefined;
      
        valueCount?: Count | undefined;
        _valueCount?: Element | undefined;
      
        valueDataRequirement?: DataRequirement | undefined;
        _valueDataRequirement?: Element | undefined;
      
        valueDate?: string | undefined;
        _valueDate?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueDecimal?: number | undefined;
        _valueDecimal?: Element | undefined;
      
        valueDistance?: Distance | undefined;
        _valueDistance?: Element | undefined;
      
        valueDosage?: Dosage | undefined;
        _valueDosage?: Element | undefined;
      
        valueDuration?: Duration | undefined;
        _valueDuration?: Element | undefined;
      
        valueExpression?: Expression | undefined;
        _valueExpression?: Element | undefined;
      
        valueExtendedContactDetail?: ExtendedContactDetail | undefined;
        _valueExtendedContactDetail?: Element | undefined;
      
        valueHumanName?: HumanName | undefined;
        _valueHumanName?: Element | undefined;
      
        valueId?: id | undefined;
        _valueId?: Element | undefined;
      
        valueIdentifier?: Identifier | undefined;
        _valueIdentifier?: Element | undefined;
      
        valueInstant?: string | undefined;
        _valueInstant?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueInteger64?: integer64 | undefined;
        _valueInteger64?: Element | undefined;
      
        valueMarkdown?: string | undefined;
        _valueMarkdown?: Element | undefined;
      
        valueMeta?: Meta | undefined;
        _valueMeta?: Element | undefined;
      
        valueMoney?: Money | undefined;
        _valueMoney?: Element | undefined;
      
        valueOid?: oid | undefined;
        _valueOid?: Element | undefined;
      
        valueParameterDefinition?: ParameterDefinition | undefined;
        _valueParameterDefinition?: Element | undefined;
      
        valuePeriod?: Period | undefined;
        _valuePeriod?: Element | undefined;
      
        valuePositiveInt?: number | undefined;
        _valuePositiveInt?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueRatio?: Ratio | undefined;
        _valueRatio?: Element | undefined;
      
        valueRatioRange?: RatioRange | undefined;
        _valueRatioRange?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        valueRelatedArtifact?: RelatedArtifact | undefined;
        _valueRelatedArtifact?: Element | undefined;
      
        valueSampledData?: SampledData | undefined;
        _valueSampledData?: Element | undefined;
      
        valueSignature?: Signature | undefined;
        _valueSignature?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        valueTime?: time | undefined;
        _valueTime?: Element | undefined;
      
        valueTiming?: Timing | undefined;
        _valueTiming?: Element | undefined;
      
        valueTriggerDefinition?: TriggerDefinition | undefined;
        _valueTriggerDefinition?: Element | undefined;
      
        valueUnsignedInt?: unsignedInt | undefined;
        _valueUnsignedInt?: Element | undefined;
      
        valueUri?: string | undefined;
        _valueUri?: Element | undefined;
      
        valueUrl?: string | undefined;
        _valueUrl?: Element | undefined;
      
        valueUsageContext?: UsageContext | undefined;
        _valueUsageContext?: Element | undefined;
      
        valueUuid?: uuid | undefined;
        _valueUuid?: Element | undefined;
      
    }

  


  
    /**
 * FamilyMemberHistory
 * 
 * Significant health conditions for a person related to the patient relevant in
 * the context of care for the patient.
 * 
 * @see {@link http://hl7.org/fhir/R5/FamilyMemberHistory.html}
 */
    export interface FamilyMemberHistory extends DomainResource {
      
      readonly resourceType: "FamilyMemberHistory";
      

      
        ageAge?: Age | undefined;
        _ageAge?: Element | undefined;
      
        ageRange?: Range | undefined;
        _ageRange?: Element | undefined;
      
        ageString?: string | undefined;
        _ageString?: Element | undefined;
      
        bornDate?: string | undefined;
        _bornDate?: Element | undefined;
      
        bornPeriod?: Period | undefined;
        _bornPeriod?: Element | undefined;
      
        bornString?: string | undefined;
        _bornString?: Element | undefined;
      
        condition?: Array<BackboneElement> | undefined;
        _condition?: Element[] | undefined;
      
        code: CodeableConcept;
        _code?: Element | undefined;
      
        contributedToDeath?: boolean | undefined;
        _contributedToDeath?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        onsetAge?: Age | undefined;
        _onsetAge?: Element | undefined;
      
        onsetPeriod?: Period | undefined;
        _onsetPeriod?: Element | undefined;
      
        onsetRange?: Range | undefined;
        _onsetRange?: Element | undefined;
      
        onsetString?: string | undefined;
        _onsetString?: Element | undefined;
      
        outcome?: CodeableConcept | undefined;
        _outcome?: Element | undefined;
      
        dataAbsentReason?: CodeableConcept | undefined;
        _dataAbsentReason?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        deceasedAge?: Age | undefined;
        _deceasedAge?: Element | undefined;
      
        deceasedBoolean?: boolean | undefined;
        _deceasedBoolean?: Element | undefined;
      
        deceasedDate?: string | undefined;
        _deceasedDate?: Element | undefined;
      
        deceasedRange?: Range | undefined;
        _deceasedRange?: Element | undefined;
      
        deceasedString?: string | undefined;
        _deceasedString?: Element | undefined;
      
        estimatedAge?: boolean | undefined;
        _estimatedAge?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        instantiatesCanonical?: Array<string> | undefined;
        _instantiatesCanonical?: Element[] | undefined;
      
        instantiatesUri?: Array<string> | undefined;
        _instantiatesUri?: Element[] | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        participant?: Array<BackboneElement> | undefined;
        _participant?: Element[] | undefined;
      
        actor: Reference;
        _actor?: Element | undefined;
      
        function?: CodeableConcept | undefined;
        _function?: Element | undefined;
      
        patient: Reference;
        _patient?: Element | undefined;
      
        procedure?: Array<BackboneElement> | undefined;
        _procedure?: Element[] | undefined;
      
        code: CodeableConcept;
        _code?: Element | undefined;
      
        contributedToDeath?: boolean | undefined;
        _contributedToDeath?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        outcome?: CodeableConcept | undefined;
        _outcome?: Element | undefined;
      
        performedAge?: Age | undefined;
        _performedAge?: Element | undefined;
      
        performedDateTime?: string | undefined;
        _performedDateTime?: Element | undefined;
      
        performedPeriod?: Period | undefined;
        _performedPeriod?: Element | undefined;
      
        performedRange?: Range | undefined;
        _performedRange?: Element | undefined;
      
        performedString?: string | undefined;
        _performedString?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        relationship: CodeableConcept;
        _relationship?: Element | undefined;
      
        sex?: CodeableConcept | undefined;
        _sex?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
    }

  


  


  


  
    /**
 * FiveWs
 * 
 * Logical Model: Who What When Where Why - Common pattern for all resources that
 * deals with attribution.
 * 
 * @see {@link http://hl7.org/fhir/R5/FiveWs.html}
 */
    export interface FiveWs extends Base {
      
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
      
        doneDateTime?: string | undefined;
        _doneDateTime?: Element | undefined;
      
        donePeriod?: Period | undefined;
        _donePeriod?: Element | undefined;
      
        grade?: CodeableConcept | undefined;
        _grade?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        init?: string | undefined;
        _init?: Element | undefined;
      
        planned?: Array<Timing> | undefined;
        _planned?: Element[] | undefined;
      
        recorded?: string | undefined;
        _recorded?: Element | undefined;
      
        source?: Array<Reference> | undefined;
        _source?: Element[] | undefined;
      
        status?: string | undefined;
        _status?: Element | undefined;
      
        subject?: Array<Reference> | undefined;
        _subject?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        whatCodeableConcept?: CodeableConcept | undefined;
        _whatCodeableConcept?: Element | undefined;
      
        whatReference?: Reference | undefined;
        _whatReference?: Element | undefined;
      
        whereCodeableConcept?: Array<CodeableConcept> | undefined;
        _whereCodeableConcept?: Element[] | undefined;
      
        whereReference?: Array<Reference> | undefined;
        _whereReference?: Element[] | undefined;
      
        who?: Array<Reference> | undefined;
        _who?: Element[] | undefined;
      
        whyCodeableConcept?: Array<CodeableConcept> | undefined;
        _whyCodeableConcept?: Element[] | undefined;
      
        whyReference?: Array<Reference> | undefined;
        _whyReference?: Element[] | undefined;
      
        witness?: Array<Reference> | undefined;
        _witness?: Element[] | undefined;
      
    }

  


  
    /**
 * Flag
 * 
 * Prospective warnings of potential issues when providing care to the patient.
 * 
 * @see {@link http://hl7.org/fhir/R5/Flag.html}
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
      
        status: string;
        _status?: Element | undefined;
      
        subject: Reference;
        _subject?: Element | undefined;
      
    }

  


  
    /**
 * FormularyItem
 * 
 * This resource describes a product or service that is available through a program
 * and includes the conditions and constraints of availability.  All of the
 * information in this resource is specific to the inclusion of the item in the
 * formulary and is not inherent to the item itself.
 * 
 * @see {@link http://hl7.org/fhir/R5/FormularyItem.html}
 */
    export interface FormularyItem extends DomainResource {
      
      readonly resourceType: "FormularyItem";
      

      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        status?: string | undefined;
        _status?: Element | undefined;
      
    }

  


  
    /**
 * GenomicStudy
 * 
 * A set of analyses performed to analyze and generate genomic data.
 * 
 * @see {@link http://hl7.org/fhir/R5/GenomicStudy.html}
 */
    export interface GenomicStudy extends DomainResource {
      
      readonly resourceType: "GenomicStudy";
      

      
        analysis?: Array<BackboneElement> | undefined;
        _analysis?: Element[] | undefined;
      
        changeType?: Array<CodeableConcept> | undefined;
        _changeType?: Element[] | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        device?: Array<BackboneElement> | undefined;
        _device?: Element[] | undefined;
      
        device?: Reference | undefined;
        _device?: Element | undefined;
      
        function?: CodeableConcept | undefined;
        _function?: Element | undefined;
      
        focus?: Array<Reference> | undefined;
        _focus?: Element[] | undefined;
      
        genomeBuild?: CodeableConcept | undefined;
        _genomeBuild?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        input?: Array<BackboneElement> | undefined;
        _input?: Element[] | undefined;
      
        file?: Reference | undefined;
        _file?: Element | undefined;
      
        generatedByIdentifier?: Identifier | undefined;
        _generatedByIdentifier?: Element | undefined;
      
        generatedByReference?: Reference | undefined;
        _generatedByReference?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        instantiatesCanonical?: string | undefined;
        _instantiatesCanonical?: Element | undefined;
      
        instantiatesUri?: string | undefined;
        _instantiatesUri?: Element | undefined;
      
        methodType?: Array<CodeableConcept> | undefined;
        _methodType?: Element[] | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        output?: Array<BackboneElement> | undefined;
        _output?: Element[] | undefined;
      
        file?: Reference | undefined;
        _file?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        performer?: Array<BackboneElement> | undefined;
        _performer?: Element[] | undefined;
      
        actor?: Reference | undefined;
        _actor?: Element | undefined;
      
        role?: CodeableConcept | undefined;
        _role?: Element | undefined;
      
        protocolPerformed?: Reference | undefined;
        _protocolPerformed?: Element | undefined;
      
        regionsCalled?: Array<Reference> | undefined;
        _regionsCalled?: Element[] | undefined;
      
        regionsStudied?: Array<Reference> | undefined;
        _regionsStudied?: Element[] | undefined;
      
        specimen?: Array<Reference> | undefined;
        _specimen?: Element[] | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        instantiatesCanonical?: string | undefined;
        _instantiatesCanonical?: Element | undefined;
      
        instantiatesUri?: string | undefined;
        _instantiatesUri?: Element | undefined;
      
        interpreter?: Array<Reference> | undefined;
        _interpreter?: Element[] | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        referrer?: Reference | undefined;
        _referrer?: Element | undefined;
      
        startDate?: string | undefined;
        _startDate?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject: Reference;
        _subject?: Element | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
    }

  


  
    /**
 * Goal
 * 
 * Describes the intended objective(s) for a patient, group or organization care,
 * for example, weight loss, restoring an activity of daily living, obtaining herd
 * immunity via immunization, meeting a process improvement objective, etc.
 * 
 * @see {@link http://hl7.org/fhir/R5/Goal.html}
 */
    export interface Goal extends DomainResource {
      
      readonly resourceType: "Goal";
      

      
        achievementStatus?: CodeableConcept | undefined;
        _achievementStatus?: Element | undefined;
      
        addresses?: Array<Reference> | undefined;
        _addresses?: Element[] | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        continuous?: boolean | undefined;
        _continuous?: Element | undefined;
      
        description: CodeableConcept;
        _description?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        lifecycleStatus: string;
        _lifecycleStatus?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        outcome?: Array<CodeableReference> | undefined;
        _outcome?: Element[] | undefined;
      
        priority?: CodeableConcept | undefined;
        _priority?: Element | undefined;
      
        source?: Reference | undefined;
        _source?: Element | undefined;
      
        startCodeableConcept?: CodeableConcept | undefined;
        _startCodeableConcept?: Element | undefined;
      
        startDate?: string | undefined;
        _startDate?: Element | undefined;
      
        statusDate?: string | undefined;
        _statusDate?: Element | undefined;
      
        statusReason?: string | undefined;
        _statusReason?: Element | undefined;
      
        subject: Reference;
        _subject?: Element | undefined;
      
        target?: Array<BackboneElement> | undefined;
        _target?: Element[] | undefined;
      
        detailBoolean?: boolean | undefined;
        _detailBoolean?: Element | undefined;
      
        detailCodeableConcept?: CodeableConcept | undefined;
        _detailCodeableConcept?: Element | undefined;
      
        detailInteger?: number | undefined;
        _detailInteger?: Element | undefined;
      
        detailQuantity?: Quantity | undefined;
        _detailQuantity?: Element | undefined;
      
        detailRange?: Range | undefined;
        _detailRange?: Element | undefined;
      
        detailRatio?: Ratio | undefined;
        _detailRatio?: Element | undefined;
      
        detailString?: string | undefined;
        _detailString?: Element | undefined;
      
        dueDate?: string | undefined;
        _dueDate?: Element | undefined;
      
        dueDuration?: Duration | undefined;
        _dueDuration?: Element | undefined;
      
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
 * @see {@link http://hl7.org/fhir/R5/GraphDefinition.html}
 */
    export interface GraphDefinition extends DomainResource {
      
      readonly resourceType: "GraphDefinition";
      

      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        link?: Array<BackboneElement> | undefined;
        _link?: Element[] | undefined;
      
        compartment?: Array<BackboneElement> | undefined;
        _compartment?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        expression?: string | undefined;
        _expression?: Element | undefined;
      
        rule: string;
        _rule?: Element | undefined;
      
        use: string;
        _use?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        max?: string | undefined;
        _max?: Element | undefined;
      
        min?: number | undefined;
        _min?: Element | undefined;
      
        params?: string | undefined;
        _params?: Element | undefined;
      
        path?: string | undefined;
        _path?: Element | undefined;
      
        sliceName?: string | undefined;
        _sliceName?: Element | undefined;
      
        sourceId: id;
        _sourceId?: Element | undefined;
      
        targetId: id;
        _targetId?: Element | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        node?: Array<BackboneElement> | undefined;
        _node?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        nodeId: id;
        _nodeId?: Element | undefined;
      
        profile?: string | undefined;
        _profile?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        start?: id | undefined;
        _start?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * Group
 * 
 * Represents a defined collection of entities that may be discussed or acted upon
 * collectively but which are not expected to act collectively, and are not
 * formally or legally recognized; i.e. a collection of entities that isn't an
 * Organization.
 * 
 * @see {@link http://hl7.org/fhir/R5/Group.html}
 */
    export interface Group extends DomainResource {
      
      readonly resourceType: "Group";
      

      
        active?: boolean | undefined;
        _active?: Element | undefined;
      
        characteristic?: Array<BackboneElement> | undefined;
        _characteristic?: Element[] | undefined;
      
        code: CodeableConcept;
        _code?: Element | undefined;
      
        exclude: boolean;
        _exclude?: Element | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
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
      
        membership: string;
        _membership?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        quantity?: unsignedInt | undefined;
        _quantity?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
    }

  


  


  
    /**
 * GuidanceResponse
 * 
 * A guidance response is the formal response to a guidance request, including any
 * output parameters returned by the evaluation, as well as the description of any
 * proposed actions to be taken.
 * 
 * @see {@link http://hl7.org/fhir/R5/GuidanceResponse.html}
 */
    export interface GuidanceResponse extends DomainResource {
      
      readonly resourceType: "GuidanceResponse";
      

      
        dataRequirement?: Array<DataRequirement> | undefined;
        _dataRequirement?: Element[] | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        evaluationMessage?: Reference | undefined;
        _evaluationMessage?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        moduleCanonical?: string | undefined;
        _moduleCanonical?: Element | undefined;
      
        moduleCodeableConcept?: CodeableConcept | undefined;
        _moduleCodeableConcept?: Element | undefined;
      
        moduleUri?: string | undefined;
        _moduleUri?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        occurrenceDateTime?: string | undefined;
        _occurrenceDateTime?: Element | undefined;
      
        outputParameters?: Reference | undefined;
        _outputParameters?: Element | undefined;
      
        performer?: Reference | undefined;
        _performer?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        requestIdentifier?: Identifier | undefined;
        _requestIdentifier?: Element | undefined;
      
        result?: Array<Reference> | undefined;
        _result?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
    }

  


  
    /**
 * HealthcareService
 * 
 * The details of a healthcare service available at a location or in a catalog.  In
 * the case where there is a hierarchy of services (for example, Lab -> Pathology
 * -> Wound Cultures), this can be represented using a set of linked
 * HealthcareServices.
 * 
 * @see {@link http://hl7.org/fhir/R5/HealthcareService.html}
 */
    export interface HealthcareService extends DomainResource {
      
      readonly resourceType: "HealthcareService";
      

      
        active?: boolean | undefined;
        _active?: Element | undefined;
      
        appointmentRequired?: boolean | undefined;
        _appointmentRequired?: Element | undefined;
      
        availability?: Array<Availability> | undefined;
        _availability?: Element[] | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        characteristic?: Array<CodeableConcept> | undefined;
        _characteristic?: Element[] | undefined;
      
        comment?: string | undefined;
        _comment?: Element | undefined;
      
        communication?: Array<CodeableConcept> | undefined;
        _communication?: Element[] | undefined;
      
        contact?: Array<ExtendedContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        coverageArea?: Array<Reference> | undefined;
        _coverageArea?: Element[] | undefined;
      
        eligibility?: Array<BackboneElement> | undefined;
        _eligibility?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        comment?: string | undefined;
        _comment?: Element | undefined;
      
        endpoint?: Array<Reference> | undefined;
        _endpoint?: Element[] | undefined;
      
        extraDetails?: string | undefined;
        _extraDetails?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        location?: Array<Reference> | undefined;
        _location?: Element[] | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        offeredIn?: Array<Reference> | undefined;
        _offeredIn?: Element[] | undefined;
      
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
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
    }

  


  


  
    /**
 * HumanName
 * 
 * HumanName Type: A name, normally of a human, that can be used for other living
 * entities (e.g. animals but not organizations) that have been assigned names by a
 * human and may need the use of name parts or the need for usage information.
 * 
 * @see {@link http://hl7.org/fhir/R5/HumanName.html}
 */
    export interface HumanName extends DataType {
      
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
      
        use?: string | undefined;
        _use?: Element | undefined;
      
    }

  


  


  
    /**
 * Identifier
 * 
 * Identifier Type: An identifier - identifies some entity uniquely and
 * unambiguously. Typically this is used for business identifiers.
 * 
 * @see {@link http://hl7.org/fhir/R5/Identifier.html}
 */
    export interface Identifier extends DataType {
      
      readonly resourceType: string;
      

      
        assigner?: Reference | undefined;
        _assigner?: Element | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        system?: string | undefined;
        _system?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        use?: string | undefined;
        _use?: Element | undefined;
      
        value?: string | undefined;
        _value?: Element | undefined;
      
    }

  


  
    /**
 * ImagingSelection
 * 
 * A selection of DICOM SOP instances and/or frames within a single Study and
 * Series. This might include additional specifics such as an image region, an
 * Observation UID or a Segmentation Number, allowing linkage to an Observation
 * Resource or transferring this information along with the ImagingStudy Resource.
 * 
 * @see {@link http://hl7.org/fhir/R5/ImagingSelection.html}
 */
    export interface ImagingSelection extends DomainResource {
      
      readonly resourceType: "ImagingSelection";
      

      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        bodySite?: CodeableReference | undefined;
        _bodySite?: Element | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        code: CodeableConcept;
        _code?: Element | undefined;
      
        derivedFrom?: Array<Reference> | undefined;
        _derivedFrom?: Element[] | undefined;
      
        endpoint?: Array<Reference> | undefined;
        _endpoint?: Element[] | undefined;
      
        focus?: Array<Reference> | undefined;
        _focus?: Element[] | undefined;
      
        frameOfReferenceUid?: id | undefined;
        _frameOfReferenceUid?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        instance?: Array<BackboneElement> | undefined;
        _instance?: Element[] | undefined;
      
        imageRegion2D?: Array<BackboneElement> | undefined;
        _imageRegion2D?: Element[] | undefined;
      
        coordinate: Array<number>;
        _coordinate?: Element[] | undefined;
      
        regionType: string;
        _regionType?: Element | undefined;
      
        imageRegion3D?: Array<BackboneElement> | undefined;
        _imageRegion3D?: Element[] | undefined;
      
        coordinate: Array<number>;
        _coordinate?: Element[] | undefined;
      
        regionType: string;
        _regionType?: Element | undefined;
      
        number?: unsignedInt | undefined;
        _number?: Element | undefined;
      
        sopClass?: Coding | undefined;
        _sopClass?: Element | undefined;
      
        subset?: Array<string> | undefined;
        _subset?: Element[] | undefined;
      
        uid: id;
        _uid?: Element | undefined;
      
        issued?: string | undefined;
        _issued?: Element | undefined;
      
        performer?: Array<BackboneElement> | undefined;
        _performer?: Element[] | undefined;
      
        actor?: Reference | undefined;
        _actor?: Element | undefined;
      
        function?: CodeableConcept | undefined;
        _function?: Element | undefined;
      
        seriesNumber?: unsignedInt | undefined;
        _seriesNumber?: Element | undefined;
      
        seriesUid?: id | undefined;
        _seriesUid?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        studyUid?: id | undefined;
        _studyUid?: Element | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
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
 * @see {@link http://hl7.org/fhir/R5/ImagingStudy.html}
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
      
        location?: Reference | undefined;
        _location?: Element | undefined;
      
        modality?: Array<CodeableConcept> | undefined;
        _modality?: Element[] | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        numberOfInstances?: unsignedInt | undefined;
        _numberOfInstances?: Element | undefined;
      
        numberOfSeries?: unsignedInt | undefined;
        _numberOfSeries?: Element | undefined;
      
        partOf?: Array<Reference> | undefined;
        _partOf?: Element[] | undefined;
      
        procedure?: Array<CodeableReference> | undefined;
        _procedure?: Element[] | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        referrer?: Reference | undefined;
        _referrer?: Element | undefined;
      
        series?: Array<BackboneElement> | undefined;
        _series?: Element[] | undefined;
      
        bodySite?: CodeableReference | undefined;
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
      
        laterality?: CodeableConcept | undefined;
        _laterality?: Element | undefined;
      
        modality: CodeableConcept;
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
      
        started?: string | undefined;
        _started?: Element | undefined;
      
        uid: id;
        _uid?: Element | undefined;
      
        started?: string | undefined;
        _started?: Element | undefined;
      
        status: string;
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
 * @see {@link http://hl7.org/fhir/R5/Immunization.html}
 */
    export interface Immunization extends DomainResource {
      
      readonly resourceType: "Immunization";
      

      
        administeredProduct?: CodeableReference | undefined;
        _administeredProduct?: Element | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        doseQuantity?: Quantity | undefined;
        _doseQuantity?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        expirationDate?: string | undefined;
        _expirationDate?: Element | undefined;
      
        fundingSource?: CodeableConcept | undefined;
        _fundingSource?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        informationSource?: CodeableReference | undefined;
        _informationSource?: Element | undefined;
      
        isSubpotent?: boolean | undefined;
        _isSubpotent?: Element | undefined;
      
        location?: Reference | undefined;
        _location?: Element | undefined;
      
        lotNumber?: string | undefined;
        _lotNumber?: Element | undefined;
      
        manufacturer?: CodeableReference | undefined;
        _manufacturer?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        occurrenceDateTime?: string | undefined;
        _occurrenceDateTime?: Element | undefined;
      
        occurrenceString?: string | undefined;
        _occurrenceString?: Element | undefined;
      
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
      
        programEligibility?: Array<BackboneElement> | undefined;
        _programEligibility?: Element[] | undefined;
      
        program: CodeableConcept;
        _program?: Element | undefined;
      
        programStatus: CodeableConcept;
        _programStatus?: Element | undefined;
      
        protocolApplied?: Array<BackboneElement> | undefined;
        _protocolApplied?: Element[] | undefined;
      
        authority?: Reference | undefined;
        _authority?: Element | undefined;
      
        doseNumber: string;
        _doseNumber?: Element | undefined;
      
        series?: string | undefined;
        _series?: Element | undefined;
      
        seriesDoses?: string | undefined;
        _seriesDoses?: Element | undefined;
      
        targetDisease?: Array<CodeableConcept> | undefined;
        _targetDisease?: Element[] | undefined;
      
        reaction?: Array<BackboneElement> | undefined;
        _reaction?: Element[] | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        manifestation?: CodeableReference | undefined;
        _manifestation?: Element | undefined;
      
        reported?: boolean | undefined;
        _reported?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        route?: CodeableConcept | undefined;
        _route?: Element | undefined;
      
        site?: CodeableConcept | undefined;
        _site?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        statusReason?: CodeableConcept | undefined;
        _statusReason?: Element | undefined;
      
        subpotentReason?: Array<CodeableConcept> | undefined;
        _subpotentReason?: Element[] | undefined;
      
        supportingInformation?: Array<Reference> | undefined;
        _supportingInformation?: Element[] | undefined;
      
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
 * @see {@link http://hl7.org/fhir/R5/ImmunizationEvaluation.html}
 */
    export interface ImmunizationEvaluation extends DomainResource {
      
      readonly resourceType: "ImmunizationEvaluation";
      

      
        authority?: Reference | undefined;
        _authority?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        doseNumber?: string | undefined;
        _doseNumber?: Element | undefined;
      
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
      
        seriesDoses?: string | undefined;
        _seriesDoses?: Element | undefined;
      
        status: string;
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
 * @see {@link http://hl7.org/fhir/R5/ImmunizationRecommendation.html}
 */
    export interface ImmunizationRecommendation extends DomainResource {
      
      readonly resourceType: "ImmunizationRecommendation";
      

      
        authority?: Reference | undefined;
        _authority?: Element | undefined;
      
        date: string;
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
      
        value: string;
        _value?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        doseNumber?: string | undefined;
        _doseNumber?: Element | undefined;
      
        forecastReason?: Array<CodeableConcept> | undefined;
        _forecastReason?: Element[] | undefined;
      
        forecastStatus: CodeableConcept;
        _forecastStatus?: Element | undefined;
      
        series?: string | undefined;
        _series?: Element | undefined;
      
        seriesDoses?: string | undefined;
        _seriesDoses?: Element | undefined;
      
        supportingImmunization?: Array<Reference> | undefined;
        _supportingImmunization?: Element[] | undefined;
      
        supportingPatientInformation?: Array<Reference> | undefined;
        _supportingPatientInformation?: Element[] | undefined;
      
        targetDisease?: Array<CodeableConcept> | undefined;
        _targetDisease?: Element[] | undefined;
      
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
 * @see {@link http://hl7.org/fhir/R5/ImplementationGuide.html}
 */
    export interface ImplementationGuide extends DomainResource {
      
      readonly resourceType: "ImplementationGuide";
      

      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
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
      
        generation: string;
        _generation?: Element | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        page?: Array<undefined> | undefined;
        _page?: Element[] | undefined;
      
        sourceMarkdown?: string | undefined;
        _sourceMarkdown?: Element | undefined;
      
        sourceString?: string | undefined;
        _sourceString?: Element | undefined;
      
        sourceUrl?: string | undefined;
        _sourceUrl?: Element | undefined;
      
        title: string;
        _title?: Element | undefined;
      
        parameter?: Array<BackboneElement> | undefined;
        _parameter?: Element[] | undefined;
      
        code: Coding;
        _code?: Element | undefined;
      
        value: string;
        _value?: Element | undefined;
      
        resource?: Array<BackboneElement> | undefined;
        _resource?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        fhirVersion?: Array<string> | undefined;
        _fhirVersion?: Element[] | undefined;
      
        groupingId?: id | undefined;
        _groupingId?: Element | undefined;
      
        isExample?: boolean | undefined;
        _isExample?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        profile?: Array<string> | undefined;
        _profile?: Element[] | undefined;
      
        reference: Reference;
        _reference?: Element | undefined;
      
        template?: Array<BackboneElement> | undefined;
        _template?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        scope?: string | undefined;
        _scope?: Element | undefined;
      
        source: string;
        _source?: Element | undefined;
      
        dependsOn?: Array<BackboneElement> | undefined;
        _dependsOn?: Element[] | undefined;
      
        packageId?: id | undefined;
        _packageId?: Element | undefined;
      
        reason?: string | undefined;
        _reason?: Element | undefined;
      
        uri: string;
        _uri?: Element | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        fhirVersion: Array<string>;
        _fhirVersion?: Element[] | undefined;
      
        global?: Array<BackboneElement> | undefined;
        _global?: Element[] | undefined;
      
        profile: string;
        _profile?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        license?: string | undefined;
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
      
        rendering?: string | undefined;
        _rendering?: Element | undefined;
      
        resource: Array<BackboneElement>;
        _resource?: Element[] | undefined;
      
        isExample?: boolean | undefined;
        _isExample?: Element | undefined;
      
        profile?: Array<string> | undefined;
        _profile?: Element[] | undefined;
      
        reference: Reference;
        _reference?: Element | undefined;
      
        relativePath?: string | undefined;
        _relativePath?: Element | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        packageId: id;
        _packageId?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url: string;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * Ingredient
 * 
 * An ingredient of a manufactured item or pharmaceutical product.
 * 
 * @see {@link http://hl7.org/fhir/R5/Ingredient.html}
 */
    export interface Ingredient extends DomainResource {
      
      readonly resourceType: "Ingredient";
      

      
        allergenicIndicator?: boolean | undefined;
        _allergenicIndicator?: Element | undefined;
      
        comment?: string | undefined;
        _comment?: Element | undefined;
      
        for?: Array<Reference> | undefined;
        _for?: Element[] | undefined;
      
        function?: Array<CodeableConcept> | undefined;
        _function?: Element[] | undefined;
      
        group?: CodeableConcept | undefined;
        _group?: Element | undefined;
      
        identifier?: Identifier | undefined;
        _identifier?: Element | undefined;
      
        manufacturer?: Array<BackboneElement> | undefined;
        _manufacturer?: Element[] | undefined;
      
        manufacturer: Reference;
        _manufacturer?: Element | undefined;
      
        role?: string | undefined;
        _role?: Element | undefined;
      
        role: CodeableConcept;
        _role?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        substance: BackboneElement;
        _substance?: Element | undefined;
      
        code: CodeableReference;
        _code?: Element | undefined;
      
        strength?: Array<BackboneElement> | undefined;
        _strength?: Element[] | undefined;
      
        basis?: CodeableConcept | undefined;
        _basis?: Element | undefined;
      
        concentrationCodeableConcept?: CodeableConcept | undefined;
        _concentrationCodeableConcept?: Element | undefined;
      
        concentrationQuantity?: Quantity | undefined;
        _concentrationQuantity?: Element | undefined;
      
        concentrationRatio?: Ratio | undefined;
        _concentrationRatio?: Element | undefined;
      
        concentrationRatioRange?: RatioRange | undefined;
        _concentrationRatioRange?: Element | undefined;
      
        country?: Array<CodeableConcept> | undefined;
        _country?: Element[] | undefined;
      
        measurementPoint?: string | undefined;
        _measurementPoint?: Element | undefined;
      
        presentationCodeableConcept?: CodeableConcept | undefined;
        _presentationCodeableConcept?: Element | undefined;
      
        presentationQuantity?: Quantity | undefined;
        _presentationQuantity?: Element | undefined;
      
        presentationRatio?: Ratio | undefined;
        _presentationRatio?: Element | undefined;
      
        presentationRatioRange?: RatioRange | undefined;
        _presentationRatioRange?: Element | undefined;
      
        referenceStrength?: Array<BackboneElement> | undefined;
        _referenceStrength?: Element[] | undefined;
      
        country?: Array<CodeableConcept> | undefined;
        _country?: Element[] | undefined;
      
        measurementPoint?: string | undefined;
        _measurementPoint?: Element | undefined;
      
        strengthQuantity?: Quantity | undefined;
        _strengthQuantity?: Element | undefined;
      
        strengthRatio?: Ratio | undefined;
        _strengthRatio?: Element | undefined;
      
        strengthRatioRange?: RatioRange | undefined;
        _strengthRatioRange?: Element | undefined;
      
        substance: CodeableReference;
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
 * @see {@link http://hl7.org/fhir/R5/InsurancePlan.html}
 */
    export interface InsurancePlan extends DomainResource {
      
      readonly resourceType: "InsurancePlan";
      

      
        administeredBy?: Reference | undefined;
        _administeredBy?: Element | undefined;
      
        alias?: Array<string> | undefined;
        _alias?: Element[] | undefined;
      
        contact?: Array<ExtendedContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
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
      
        groupSize?: number | undefined;
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
      
        status?: string | undefined;
        _status?: Element | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
    }

  


  


  


  
    /**
 * InventoryItem
 * 
 * functional description of an inventory item used in inventory and supply-related
 * workflows.
 * 
 * @see {@link http://hl7.org/fhir/R5/InventoryItem.html}
 */
    export interface InventoryItem extends DomainResource {
      
      readonly resourceType: "InventoryItem";
      

      
        association?: Array<BackboneElement> | undefined;
        _association?: Element[] | undefined;
      
        associationType: CodeableConcept;
        _associationType?: Element | undefined;
      
        quantity: Ratio;
        _quantity?: Element | undefined;
      
        relatedItem: Reference;
        _relatedItem?: Element | undefined;
      
        baseUnit?: CodeableConcept | undefined;
        _baseUnit?: Element | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        characteristic?: Array<BackboneElement> | undefined;
        _characteristic?: Element[] | undefined;
      
        characteristicType: CodeableConcept;
        _characteristicType?: Element | undefined;
      
        valueAddress?: Address | undefined;
        _valueAddress?: Element | undefined;
      
        valueAnnotation?: Annotation | undefined;
        _valueAnnotation?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueDecimal?: number | undefined;
        _valueDecimal?: Element | undefined;
      
        valueDuration?: Duration | undefined;
        _valueDuration?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueRatio?: Ratio | undefined;
        _valueRatio?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        valueUrl?: string | undefined;
        _valueUrl?: Element | undefined;
      
        code?: Array<CodeableConcept> | undefined;
        _code?: Element[] | undefined;
      
        description?: BackboneElement | undefined;
        _description?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        language?: string | undefined;
        _language?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        instance?: BackboneElement | undefined;
        _instance?: Element | undefined;
      
        expiry?: string | undefined;
        _expiry?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        location?: Reference | undefined;
        _location?: Element | undefined;
      
        lotNumber?: string | undefined;
        _lotNumber?: Element | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
        inventoryStatus?: Array<CodeableConcept> | undefined;
        _inventoryStatus?: Element[] | undefined;
      
        name?: Array<BackboneElement> | undefined;
        _name?: Element[] | undefined;
      
        language: string;
        _language?: Element | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        nameType: Coding;
        _nameType?: Element | undefined;
      
        netContent?: Quantity | undefined;
        _netContent?: Element | undefined;
      
        productReference?: Reference | undefined;
        _productReference?: Element | undefined;
      
        responsibleOrganization?: Array<BackboneElement> | undefined;
        _responsibleOrganization?: Element[] | undefined;
      
        organization: Reference;
        _organization?: Element | undefined;
      
        role: CodeableConcept;
        _role?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
    }

  


  
    /**
 * InventoryReport
 * 
 * A report of inventory or stock items.
 * 
 * @see {@link http://hl7.org/fhir/R5/InventoryReport.html}
 */
    export interface InventoryReport extends DomainResource {
      
      readonly resourceType: "InventoryReport";
      

      
        countType: string;
        _countType?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        inventoryListing?: Array<BackboneElement> | undefined;
        _inventoryListing?: Element[] | undefined;
      
        countingDateTime?: string | undefined;
        _countingDateTime?: Element | undefined;
      
        item?: Array<BackboneElement> | undefined;
        _item?: Element[] | undefined;
      
        category?: CodeableConcept | undefined;
        _category?: Element | undefined;
      
        item: CodeableReference;
        _item?: Element | undefined;
      
        quantity: Quantity;
        _quantity?: Element | undefined;
      
        itemStatus?: CodeableConcept | undefined;
        _itemStatus?: Element | undefined;
      
        location?: Reference | undefined;
        _location?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        operationType?: CodeableConcept | undefined;
        _operationType?: Element | undefined;
      
        operationTypeReason?: CodeableConcept | undefined;
        _operationTypeReason?: Element | undefined;
      
        reportedDateTime: string;
        _reportedDateTime?: Element | undefined;
      
        reporter?: Reference | undefined;
        _reporter?: Element | undefined;
      
        reportingPeriod?: Period | undefined;
        _reportingPeriod?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
    }

  


  
    /**
 * Invoice
 * 
 * Invoice containing collected ChargeItems from an Account with calculated
 * individual and total price for Billing purpose.
 * 
 * @see {@link http://hl7.org/fhir/R5/Invoice.html}
 */
    export interface Invoice extends DomainResource {
      
      readonly resourceType: "Invoice";
      

      
        account?: Reference | undefined;
        _account?: Element | undefined;
      
        cancelledReason?: string | undefined;
        _cancelledReason?: Element | undefined;
      
        creation?: string | undefined;
        _creation?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        issuer?: Reference | undefined;
        _issuer?: Element | undefined;
      
        lineItem?: Array<BackboneElement> | undefined;
        _lineItem?: Element[] | undefined;
      
        chargeItemCodeableConcept?: CodeableConcept | undefined;
        _chargeItemCodeableConcept?: Element | undefined;
      
        chargeItemReference?: Reference | undefined;
        _chargeItemReference?: Element | undefined;
      
        priceComponent?: Array<MonetaryComponent> | undefined;
        _priceComponent?: Element[] | undefined;
      
        sequence?: number | undefined;
        _sequence?: Element | undefined;
      
        servicedDate?: string | undefined;
        _servicedDate?: Element | undefined;
      
        servicedPeriod?: Period | undefined;
        _servicedPeriod?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        participant?: Array<BackboneElement> | undefined;
        _participant?: Element[] | undefined;
      
        actor: Reference;
        _actor?: Element | undefined;
      
        role?: CodeableConcept | undefined;
        _role?: Element | undefined;
      
        paymentTerms?: string | undefined;
        _paymentTerms?: Element | undefined;
      
        periodDate?: string | undefined;
        _periodDate?: Element | undefined;
      
        periodPeriod?: Period | undefined;
        _periodPeriod?: Element | undefined;
      
        recipient?: Reference | undefined;
        _recipient?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
        totalGross?: Money | undefined;
        _totalGross?: Element | undefined;
      
        totalNet?: Money | undefined;
        _totalNet?: Element | undefined;
      
        totalPriceComponent?: Array<MonetaryComponent> | undefined;
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
 * @see {@link http://hl7.org/fhir/R5/Library.html}
 */
    export interface Library extends DomainResource {
      
      readonly resourceType: "Library";
      

      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        author?: Array<ContactDetail> | undefined;
        _author?: Element[] | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        content?: Array<Attachment> | undefined;
        _content?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        dataRequirement?: Array<DataRequirement> | undefined;
        _dataRequirement?: Element[] | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
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
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        parameter?: Array<ParameterDefinition> | undefined;
        _parameter?: Element[] | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        relatedArtifact?: Array<RelatedArtifact> | undefined;
        _relatedArtifact?: Element[] | undefined;
      
        reviewer?: Array<ContactDetail> | undefined;
        _reviewer?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subjectCodeableConcept?: CodeableConcept | undefined;
        _subjectCodeableConcept?: Element | undefined;
      
        subjectReference?: Reference | undefined;
        _subjectReference?: Element | undefined;
      
        subtitle?: string | undefined;
        _subtitle?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        topic?: Array<CodeableConcept> | undefined;
        _topic?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        usage?: string | undefined;
        _usage?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * Linkage
 * 
 * Identifies two or more records (resource instances) that refer to the same
 * real-world "occurrence".
 * 
 * @see {@link http://hl7.org/fhir/R5/Linkage.html}
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
      
        type: string;
        _type?: Element | undefined;
      
    }

  


  
    /**
 * List
 * 
 * A List is a curated collection of resources, for things such as problem lists,
 * allergy lists, facility list, organization list, etc.
 * 
 * @see {@link http://hl7.org/fhir/R5/List.html}
 */
    export interface List extends DomainResource {
      
      readonly resourceType: "List";
      

      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        emptyReason?: CodeableConcept | undefined;
        _emptyReason?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        entry?: Array<BackboneElement> | undefined;
        _entry?: Element[] | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        deleted?: boolean | undefined;
        _deleted?: Element | undefined;
      
        flag?: CodeableConcept | undefined;
        _flag?: Element | undefined;
      
        item: Reference;
        _item?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        mode: string;
        _mode?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        orderedBy?: CodeableConcept | undefined;
        _orderedBy?: Element | undefined;
      
        source?: Reference | undefined;
        _source?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject?: Array<Reference> | undefined;
        _subject?: Element[] | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
    }

  


  
    /**
 * Location
 * 
 * Details and position information for a place where services are provided and
 * resources and participants may be stored, found, contained, or accommodated.
 * 
 * @see {@link http://hl7.org/fhir/R5/Location.html}
 */
    export interface Location extends DomainResource {
      
      readonly resourceType: "Location";
      

      
        address?: Address | undefined;
        _address?: Element | undefined;
      
        alias?: Array<string> | undefined;
        _alias?: Element[] | undefined;
      
        characteristic?: Array<CodeableConcept> | undefined;
        _characteristic?: Element[] | undefined;
      
        contact?: Array<ExtendedContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        endpoint?: Array<Reference> | undefined;
        _endpoint?: Element[] | undefined;
      
        form?: CodeableConcept | undefined;
        _form?: Element | undefined;
      
        hoursOfOperation?: Array<Availability> | undefined;
        _hoursOfOperation?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        managingOrganization?: Reference | undefined;
        _managingOrganization?: Element | undefined;
      
        mode?: string | undefined;
        _mode?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        operationalStatus?: Coding | undefined;
        _operationalStatus?: Element | undefined;
      
        partOf?: Reference | undefined;
        _partOf?: Element | undefined;
      
        position?: BackboneElement | undefined;
        _position?: Element | undefined;
      
        altitude?: number | undefined;
        _altitude?: Element | undefined;
      
        latitude: number;
        _latitude?: Element | undefined;
      
        longitude: number;
        _longitude?: Element | undefined;
      
        status?: string | undefined;
        _status?: Element | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
        virtualService?: Array<VirtualServiceDetail> | undefined;
        _virtualService?: Element[] | undefined;
      
    }

  


  


  
    /**
 * ManufacturedItemDefinition
 * 
 * The definition and characteristics of a medicinal manufactured item, such as a
 * tablet or capsule, as contained in a packaged medicinal product.
 * 
 * @see {@link http://hl7.org/fhir/R5/ManufacturedItemDefinition.html}
 */
    export interface ManufacturedItemDefinition extends DomainResource {
      
      readonly resourceType: "ManufacturedItemDefinition";
      

      
        component?: Array<BackboneElement> | undefined;
        _component?: Element[] | undefined;
      
        amount?: Array<Quantity> | undefined;
        _amount?: Element[] | undefined;
      
        component?: Array<undefined> | undefined;
        _component?: Element[] | undefined;
      
        constituent?: Array<BackboneElement> | undefined;
        _constituent?: Element[] | undefined;
      
        amount?: Array<Quantity> | undefined;
        _amount?: Element[] | undefined;
      
        function?: Array<CodeableConcept> | undefined;
        _function?: Element[] | undefined;
      
        hasIngredient?: Array<CodeableReference> | undefined;
        _hasIngredient?: Element[] | undefined;
      
        location?: Array<CodeableConcept> | undefined;
        _location?: Element[] | undefined;
      
        function?: Array<CodeableConcept> | undefined;
        _function?: Element[] | undefined;
      
        property?: Array<undefined> | undefined;
        _property?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        ingredient?: Array<CodeableConcept> | undefined;
        _ingredient?: Element[] | undefined;
      
        manufacturedDoseForm: CodeableConcept;
        _manufacturedDoseForm?: Element | undefined;
      
        manufacturer?: Array<Reference> | undefined;
        _manufacturer?: Element[] | undefined;
      
        marketingStatus?: Array<MarketingStatus> | undefined;
        _marketingStatus?: Element[] | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        property?: Array<BackboneElement> | undefined;
        _property?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueDate?: string | undefined;
        _valueDate?: Element | undefined;
      
        valueMarkdown?: string | undefined;
        _valueMarkdown?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        unitOfPresentation?: CodeableConcept | undefined;
        _unitOfPresentation?: Element | undefined;
      
    }

  


  


  
    /**
 * MarketingStatus
 * 
 * MarketingStatus Type: The marketing status describes the date when a medicinal
 * product is actually put on the market or the date as of which it is no longer
 * available.
 * 
 * @see {@link http://hl7.org/fhir/R5/MarketingStatus.html}
 */
    export interface MarketingStatus extends BackboneType {
      
      readonly resourceType: string;
      

      
        country?: CodeableConcept | undefined;
        _country?: Element | undefined;
      
        dateRange?: Period | undefined;
        _dateRange?: Element | undefined;
      
        jurisdiction?: CodeableConcept | undefined;
        _jurisdiction?: Element | undefined;
      
        restoreDate?: string | undefined;
        _restoreDate?: Element | undefined;
      
        status: CodeableConcept;
        _status?: Element | undefined;
      
    }

  


  
    /**
 * Measure
 * 
 * The Measure resource provides the definition of a quality measure.
 * 
 * @see {@link http://hl7.org/fhir/R5/Measure.html}
 */
    export interface Measure extends DomainResource {
      
      readonly resourceType: "Measure";
      

      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        author?: Array<ContactDetail> | undefined;
        _author?: Element[] | undefined;
      
        basis?: string | undefined;
        _basis?: Element | undefined;
      
        clinicalRecommendationStatement?: string | undefined;
        _clinicalRecommendationStatement?: Element | undefined;
      
        compositeScoring?: CodeableConcept | undefined;
        _compositeScoring?: Element | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        disclaimer?: string | undefined;
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
      
        basis?: string | undefined;
        _basis?: Element | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        improvementNotation?: CodeableConcept | undefined;
        _improvementNotation?: Element | undefined;
      
        library?: Array<string> | undefined;
        _library?: Element[] | undefined;
      
        linkId?: string | undefined;
        _linkId?: Element | undefined;
      
        population?: Array<BackboneElement> | undefined;
        _population?: Element[] | undefined;
      
        aggregateMethod?: CodeableConcept | undefined;
        _aggregateMethod?: Element | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        criteria?: Expression | undefined;
        _criteria?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        groupDefinition?: Reference | undefined;
        _groupDefinition?: Element | undefined;
      
        inputPopulationId?: string | undefined;
        _inputPopulationId?: Element | undefined;
      
        linkId?: string | undefined;
        _linkId?: Element | undefined;
      
        rateAggregation?: string | undefined;
        _rateAggregation?: Element | undefined;
      
        scoring?: CodeableConcept | undefined;
        _scoring?: Element | undefined;
      
        scoringUnit?: CodeableConcept | undefined;
        _scoringUnit?: Element | undefined;
      
        stratifier?: Array<BackboneElement> | undefined;
        _stratifier?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        component?: Array<BackboneElement> | undefined;
        _component?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        criteria?: Expression | undefined;
        _criteria?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        groupDefinition?: Reference | undefined;
        _groupDefinition?: Element | undefined;
      
        linkId?: string | undefined;
        _linkId?: Element | undefined;
      
        criteria?: Expression | undefined;
        _criteria?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        groupDefinition?: Reference | undefined;
        _groupDefinition?: Element | undefined;
      
        linkId?: string | undefined;
        _linkId?: Element | undefined;
      
        subjectCodeableConcept?: CodeableConcept | undefined;
        _subjectCodeableConcept?: Element | undefined;
      
        subjectReference?: Reference | undefined;
        _subjectReference?: Element | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
        guidance?: string | undefined;
        _guidance?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        improvementNotation?: CodeableConcept | undefined;
        _improvementNotation?: Element | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        library?: Array<string> | undefined;
        _library?: Element[] | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        rateAggregation?: string | undefined;
        _rateAggregation?: Element | undefined;
      
        rationale?: string | undefined;
        _rationale?: Element | undefined;
      
        relatedArtifact?: Array<RelatedArtifact> | undefined;
        _relatedArtifact?: Element[] | undefined;
      
        reviewer?: Array<ContactDetail> | undefined;
        _reviewer?: Element[] | undefined;
      
        riskAdjustment?: string | undefined;
        _riskAdjustment?: Element | undefined;
      
        scoring?: CodeableConcept | undefined;
        _scoring?: Element | undefined;
      
        scoringUnit?: CodeableConcept | undefined;
        _scoringUnit?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subjectCodeableConcept?: CodeableConcept | undefined;
        _subjectCodeableConcept?: Element | undefined;
      
        subjectReference?: Reference | undefined;
        _subjectReference?: Element | undefined;
      
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
      
        linkId?: string | undefined;
        _linkId?: Element | undefined;
      
        usage?: Array<CodeableConcept> | undefined;
        _usage?: Element[] | undefined;
      
        term?: Array<BackboneElement> | undefined;
        _term?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        definition?: string | undefined;
        _definition?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        topic?: Array<CodeableConcept> | undefined;
        _topic?: Element[] | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        usage?: string | undefined;
        _usage?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * MeasureReport
 * 
 * The MeasureReport resource contains the results of the calculation of a measure;
 * and optionally a reference to the resources involved in that calculation.
 * 
 * @see {@link http://hl7.org/fhir/R5/MeasureReport.html}
 */
    export interface MeasureReport extends DomainResource {
      
      readonly resourceType: "MeasureReport";
      

      
        dataUpdateType?: string | undefined;
        _dataUpdateType?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        evaluatedResource?: Array<Reference> | undefined;
        _evaluatedResource?: Element[] | undefined;
      
        group?: Array<BackboneElement> | undefined;
        _group?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        linkId?: string | undefined;
        _linkId?: Element | undefined;
      
        measureScoreCodeableConcept?: CodeableConcept | undefined;
        _measureScoreCodeableConcept?: Element | undefined;
      
        measureScoreDateTime?: string | undefined;
        _measureScoreDateTime?: Element | undefined;
      
        measureScoreDuration?: Duration | undefined;
        _measureScoreDuration?: Element | undefined;
      
        measureScorePeriod?: Period | undefined;
        _measureScorePeriod?: Element | undefined;
      
        measureScoreQuantity?: Quantity | undefined;
        _measureScoreQuantity?: Element | undefined;
      
        measureScoreRange?: Range | undefined;
        _measureScoreRange?: Element | undefined;
      
        population?: Array<BackboneElement> | undefined;
        _population?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        count?: number | undefined;
        _count?: Element | undefined;
      
        linkId?: string | undefined;
        _linkId?: Element | undefined;
      
        subjectReport?: Array<Reference> | undefined;
        _subjectReport?: Element[] | undefined;
      
        subjectResults?: Reference | undefined;
        _subjectResults?: Element | undefined;
      
        subjects?: Reference | undefined;
        _subjects?: Element | undefined;
      
        stratifier?: Array<BackboneElement> | undefined;
        _stratifier?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        linkId?: string | undefined;
        _linkId?: Element | undefined;
      
        stratum?: Array<BackboneElement> | undefined;
        _stratum?: Element[] | undefined;
      
        component?: Array<BackboneElement> | undefined;
        _component?: Element[] | undefined;
      
        code: CodeableConcept;
        _code?: Element | undefined;
      
        linkId?: string | undefined;
        _linkId?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        measureScoreCodeableConcept?: CodeableConcept | undefined;
        _measureScoreCodeableConcept?: Element | undefined;
      
        measureScoreDateTime?: string | undefined;
        _measureScoreDateTime?: Element | undefined;
      
        measureScoreDuration?: Duration | undefined;
        _measureScoreDuration?: Element | undefined;
      
        measureScorePeriod?: Period | undefined;
        _measureScorePeriod?: Element | undefined;
      
        measureScoreQuantity?: Quantity | undefined;
        _measureScoreQuantity?: Element | undefined;
      
        measureScoreRange?: Range | undefined;
        _measureScoreRange?: Element | undefined;
      
        population?: Array<BackboneElement> | undefined;
        _population?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        count?: number | undefined;
        _count?: Element | undefined;
      
        linkId?: string | undefined;
        _linkId?: Element | undefined;
      
        subjectReport?: Array<Reference> | undefined;
        _subjectReport?: Element[] | undefined;
      
        subjectResults?: Reference | undefined;
        _subjectResults?: Element | undefined;
      
        subjects?: Reference | undefined;
        _subjects?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        improvementNotation?: CodeableConcept | undefined;
        _improvementNotation?: Element | undefined;
      
        inputParameters?: Reference | undefined;
        _inputParameters?: Element | undefined;
      
        location?: Reference | undefined;
        _location?: Element | undefined;
      
        measure?: string | undefined;
        _measure?: Element | undefined;
      
        period: Period;
        _period?: Element | undefined;
      
        reporter?: Reference | undefined;
        _reporter?: Element | undefined;
      
        reportingVendor?: Reference | undefined;
        _reportingVendor?: Element | undefined;
      
        scoring?: CodeableConcept | undefined;
        _scoring?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
        supplementalData?: Array<Reference> | undefined;
        _supplementalData?: Element[] | undefined;
      
        type: string;
        _type?: Element | undefined;
      
    }

  


  
    /**
 * Medication
 * 
 * This resource is primarily used for the identification and definition of a
 * medication, including ingredients, for the purposes of prescribing, dispensing,
 * and administering a medication as well as for making statements about medication
 * use.
 * 
 * @see {@link http://hl7.org/fhir/R5/Medication.html}
 */
    export interface Medication extends DomainResource {
      
      readonly resourceType: "Medication";
      

      
        batch?: BackboneElement | undefined;
        _batch?: Element | undefined;
      
        expirationDate?: string | undefined;
        _expirationDate?: Element | undefined;
      
        lotNumber?: string | undefined;
        _lotNumber?: Element | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        definition?: Reference | undefined;
        _definition?: Element | undefined;
      
        doseForm?: CodeableConcept | undefined;
        _doseForm?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        ingredient?: Array<BackboneElement> | undefined;
        _ingredient?: Element[] | undefined;
      
        isActive?: boolean | undefined;
        _isActive?: Element | undefined;
      
        item: CodeableReference;
        _item?: Element | undefined;
      
        strengthCodeableConcept?: CodeableConcept | undefined;
        _strengthCodeableConcept?: Element | undefined;
      
        strengthQuantity?: Quantity | undefined;
        _strengthQuantity?: Element | undefined;
      
        strengthRatio?: Ratio | undefined;
        _strengthRatio?: Element | undefined;
      
        marketingAuthorizationHolder?: Reference | undefined;
        _marketingAuthorizationHolder?: Element | undefined;
      
        status?: string | undefined;
        _status?: Element | undefined;
      
        totalVolume?: Quantity | undefined;
        _totalVolume?: Element | undefined;
      
    }

  


  
    /**
 * MedicationAdministration
 * 
 * Describes the event of a patient consuming or otherwise being administered a
 * medication.  This may be as simple as swallowing a tablet or it may be a long
 * running infusion. Related resources tie this event to the authorizing
 * prescription, and the specific encounter between patient and health care
 * practitioner. This event can also be used to record waste using a status of
 * not-done and the appropriate statusReason.
 * 
 * @see {@link http://hl7.org/fhir/R5/MedicationAdministration.html}
 */
    export interface MedicationAdministration extends DomainResource {
      
      readonly resourceType: "MedicationAdministration";
      

      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        device?: Array<CodeableReference> | undefined;
        _device?: Element[] | undefined;
      
        dosage?: BackboneElement | undefined;
        _dosage?: Element | undefined;
      
        dose?: Quantity | undefined;
        _dose?: Element | undefined;
      
        method?: CodeableConcept | undefined;
        _method?: Element | undefined;
      
        rateQuantity?: Quantity | undefined;
        _rateQuantity?: Element | undefined;
      
        rateRatio?: Ratio | undefined;
        _rateRatio?: Element | undefined;
      
        route?: CodeableConcept | undefined;
        _route?: Element | undefined;
      
        site?: CodeableConcept | undefined;
        _site?: Element | undefined;
      
        text?: string | undefined;
        _text?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        eventHistory?: Array<Reference> | undefined;
        _eventHistory?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        isSubPotent?: boolean | undefined;
        _isSubPotent?: Element | undefined;
      
        medication: CodeableReference;
        _medication?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        occurenceDateTime?: string | undefined;
        _occurenceDateTime?: Element | undefined;
      
        occurencePeriod?: Period | undefined;
        _occurencePeriod?: Element | undefined;
      
        occurenceTiming?: Timing | undefined;
        _occurenceTiming?: Element | undefined;
      
        partOf?: Array<Reference> | undefined;
        _partOf?: Element[] | undefined;
      
        performer?: Array<BackboneElement> | undefined;
        _performer?: Element[] | undefined;
      
        actor: CodeableReference;
        _actor?: Element | undefined;
      
        function?: CodeableConcept | undefined;
        _function?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        recorded?: string | undefined;
        _recorded?: Element | undefined;
      
        request?: Reference | undefined;
        _request?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        statusReason?: Array<CodeableConcept> | undefined;
        _statusReason?: Element[] | undefined;
      
        subject: Reference;
        _subject?: Element | undefined;
      
        subPotentReason?: Array<CodeableConcept> | undefined;
        _subPotentReason?: Element[] | undefined;
      
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
 * @see {@link http://hl7.org/fhir/R5/MedicationDispense.html}
 */
    export interface MedicationDispense extends DomainResource {
      
      readonly resourceType: "MedicationDispense";
      

      
        authorizingPrescription?: Array<Reference> | undefined;
        _authorizingPrescription?: Element[] | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        daysSupply?: Quantity | undefined;
        _daysSupply?: Element | undefined;
      
        destination?: Reference | undefined;
        _destination?: Element | undefined;
      
        dosageInstruction?: Array<Dosage> | undefined;
        _dosageInstruction?: Element[] | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        eventHistory?: Array<Reference> | undefined;
        _eventHistory?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        location?: Reference | undefined;
        _location?: Element | undefined;
      
        medication: CodeableReference;
        _medication?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        notPerformedReason?: CodeableReference | undefined;
        _notPerformedReason?: Element | undefined;
      
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
      
        recorded?: string | undefined;
        _recorded?: Element | undefined;
      
        renderedDosageInstruction?: string | undefined;
        _renderedDosageInstruction?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        statusChanged?: string | undefined;
        _statusChanged?: Element | undefined;
      
        subject: Reference;
        _subject?: Element | undefined;
      
        substitution?: BackboneElement | undefined;
        _substitution?: Element | undefined;
      
        reason?: Array<CodeableConcept> | undefined;
        _reason?: Element[] | undefined;
      
        responsibleParty?: Reference | undefined;
        _responsibleParty?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        wasSubstituted: boolean;
        _wasSubstituted?: Element | undefined;
      
        supportingInformation?: Array<Reference> | undefined;
        _supportingInformation?: Element[] | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        whenHandedOver?: string | undefined;
        _whenHandedOver?: Element | undefined;
      
        whenPrepared?: string | undefined;
        _whenPrepared?: Element | undefined;
      
    }

  


  
    /**
 * MedicationKnowledge
 * 
 * Information about a medication that is used to support knowledge.
 * 
 * @see {@link http://hl7.org/fhir/R5/MedicationKnowledge.html}
 */
    export interface MedicationKnowledge extends DomainResource {
      
      readonly resourceType: "MedicationKnowledge";
      

      
        associatedMedication?: Array<Reference> | undefined;
        _associatedMedication?: Element[] | undefined;
      
        author?: Reference | undefined;
        _author?: Element | undefined;
      
        clinicalUseIssue?: Array<Reference> | undefined;
        _clinicalUseIssue?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        cost?: Array<BackboneElement> | undefined;
        _cost?: Element[] | undefined;
      
        costCodeableConcept?: CodeableConcept | undefined;
        _costCodeableConcept?: Element | undefined;
      
        costMoney?: Money | undefined;
        _costMoney?: Element | undefined;
      
        effectiveDate?: Array<Period> | undefined;
        _effectiveDate?: Element[] | undefined;
      
        source?: string | undefined;
        _source?: Element | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        definitional?: BackboneElement | undefined;
        _definitional?: Element | undefined;
      
        definition?: Array<Reference> | undefined;
        _definition?: Element[] | undefined;
      
        doseForm?: CodeableConcept | undefined;
        _doseForm?: Element | undefined;
      
        drugCharacteristic?: Array<BackboneElement> | undefined;
        _drugCharacteristic?: Element[] | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueBase64Binary?: string | undefined;
        _valueBase64Binary?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        ingredient?: Array<BackboneElement> | undefined;
        _ingredient?: Element[] | undefined;
      
        item: CodeableReference;
        _item?: Element | undefined;
      
        strengthCodeableConcept?: CodeableConcept | undefined;
        _strengthCodeableConcept?: Element | undefined;
      
        strengthQuantity?: Quantity | undefined;
        _strengthQuantity?: Element | undefined;
      
        strengthRatio?: Ratio | undefined;
        _strengthRatio?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        intendedRoute?: Array<CodeableConcept> | undefined;
        _intendedRoute?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        indicationGuideline?: Array<BackboneElement> | undefined;
        _indicationGuideline?: Element[] | undefined;
      
        dosingGuideline?: Array<BackboneElement> | undefined;
        _dosingGuideline?: Element[] | undefined;
      
        administrationTreatment?: CodeableConcept | undefined;
        _administrationTreatment?: Element | undefined;
      
        dosage?: Array<BackboneElement> | undefined;
        _dosage?: Element[] | undefined;
      
        dosage: Array<Dosage>;
        _dosage?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        patientCharacteristic?: Array<BackboneElement> | undefined;
        _patientCharacteristic?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        treatmentIntent?: CodeableConcept | undefined;
        _treatmentIntent?: Element | undefined;
      
        indication?: Array<CodeableReference> | undefined;
        _indication?: Element[] | undefined;
      
        intendedJurisdiction?: Array<CodeableConcept> | undefined;
        _intendedJurisdiction?: Element[] | undefined;
      
        medicineClassification?: Array<BackboneElement> | undefined;
        _medicineClassification?: Element[] | undefined;
      
        classification?: Array<CodeableConcept> | undefined;
        _classification?: Element[] | undefined;
      
        sourceString?: string | undefined;
        _sourceString?: Element | undefined;
      
        sourceUri?: string | undefined;
        _sourceUri?: Element | undefined;
      
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
      
        name?: Array<string> | undefined;
        _name?: Element[] | undefined;
      
        packaging?: Array<BackboneElement> | undefined;
        _packaging?: Element[] | undefined;
      
        cost?: Array<undefined> | undefined;
        _cost?: Element[] | undefined;
      
        packagedProduct?: Reference | undefined;
        _packagedProduct?: Element | undefined;
      
        preparationInstruction?: string | undefined;
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
      
        schedule?: Array<CodeableConcept> | undefined;
        _schedule?: Element[] | undefined;
      
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
      
        status?: string | undefined;
        _status?: Element | undefined;
      
        storageGuideline?: Array<BackboneElement> | undefined;
        _storageGuideline?: Element[] | undefined;
      
        environmentalSetting?: Array<BackboneElement> | undefined;
        _environmentalSetting?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        reference?: string | undefined;
        _reference?: Element | undefined;
      
        stabilityDuration?: Duration | undefined;
        _stabilityDuration?: Element | undefined;
      
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
 * @see {@link http://hl7.org/fhir/R5/MedicationRequest.html}
 */
    export interface MedicationRequest extends DomainResource {
      
      readonly resourceType: "MedicationRequest";
      

      
        authoredOn?: string | undefined;
        _authoredOn?: Element | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        courseOfTherapyType?: CodeableConcept | undefined;
        _courseOfTherapyType?: Element | undefined;
      
        device?: Array<CodeableReference> | undefined;
        _device?: Element[] | undefined;
      
        dispenseRequest?: BackboneElement | undefined;
        _dispenseRequest?: Element | undefined;
      
        dispenseInterval?: Duration | undefined;
        _dispenseInterval?: Element | undefined;
      
        dispenser?: Reference | undefined;
        _dispenser?: Element | undefined;
      
        dispenserInstruction?: Array<Annotation> | undefined;
        _dispenserInstruction?: Element[] | undefined;
      
        doseAdministrationAid?: CodeableConcept | undefined;
        _doseAdministrationAid?: Element | undefined;
      
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
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        validityPeriod?: Period | undefined;
        _validityPeriod?: Element | undefined;
      
        doNotPerform?: boolean | undefined;
        _doNotPerform?: Element | undefined;
      
        dosageInstruction?: Array<Dosage> | undefined;
        _dosageInstruction?: Element[] | undefined;
      
        effectiveDosePeriod?: Period | undefined;
        _effectiveDosePeriod?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        eventHistory?: Array<Reference> | undefined;
        _eventHistory?: Element[] | undefined;
      
        groupIdentifier?: Identifier | undefined;
        _groupIdentifier?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        informationSource?: Array<Reference> | undefined;
        _informationSource?: Element[] | undefined;
      
        insurance?: Array<Reference> | undefined;
        _insurance?: Element[] | undefined;
      
        intent: string;
        _intent?: Element | undefined;
      
        medication: CodeableReference;
        _medication?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        performer?: Array<Reference> | undefined;
        _performer?: Element[] | undefined;
      
        performerType?: CodeableConcept | undefined;
        _performerType?: Element | undefined;
      
        priority?: string | undefined;
        _priority?: Element | undefined;
      
        priorPrescription?: Reference | undefined;
        _priorPrescription?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        recorder?: Reference | undefined;
        _recorder?: Element | undefined;
      
        renderedDosageInstruction?: string | undefined;
        _renderedDosageInstruction?: Element | undefined;
      
        reported?: boolean | undefined;
        _reported?: Element | undefined;
      
        requester?: Reference | undefined;
        _requester?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        statusChanged?: string | undefined;
        _statusChanged?: Element | undefined;
      
        statusReason?: CodeableConcept | undefined;
        _statusReason?: Element | undefined;
      
        subject: Reference;
        _subject?: Element | undefined;
      
        substitution?: BackboneElement | undefined;
        _substitution?: Element | undefined;
      
        allowedBoolean?: boolean | undefined;
        _allowedBoolean?: Element | undefined;
      
        allowedCodeableConcept?: CodeableConcept | undefined;
        _allowedCodeableConcept?: Element | undefined;
      
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
 * difference between a medicationstatement and a medicationadministration is that
 * the medication administration has complete administration information and is
 * based on actual administration information from the person who administered the
 * medication.  A medicationstatement is often, if not always, less specific.
 * There is no required date/time when the medication was administered, in fact we
 * only know that a source has reported the patient is taking this medication,
 * where details such as time, quantity, or rate or even medication product may be
 * incomplete or missing or less precise.  As stated earlier, the Medication
 * Statement information may come from the patient's memory, from a prescription
 * bottle or from a list of medications the patient, clinician or other party
 * maintains.  Medication administration is more formal and is not missing detailed
 * information.
 * 
 * @see {@link http://hl7.org/fhir/R5/MedicationStatement.html}
 */
    export interface MedicationStatement extends DomainResource {
      
      readonly resourceType: "MedicationStatement";
      

      
        adherence?: BackboneElement | undefined;
        _adherence?: Element | undefined;
      
        code: CodeableConcept;
        _code?: Element | undefined;
      
        reason?: CodeableConcept | undefined;
        _reason?: Element | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        dateAsserted?: string | undefined;
        _dateAsserted?: Element | undefined;
      
        derivedFrom?: Array<Reference> | undefined;
        _derivedFrom?: Element[] | undefined;
      
        dosage?: Array<Dosage> | undefined;
        _dosage?: Element[] | undefined;
      
        effectiveDateTime?: string | undefined;
        _effectiveDateTime?: Element | undefined;
      
        effectivePeriod?: Period | undefined;
        _effectivePeriod?: Element | undefined;
      
        effectiveTiming?: Timing | undefined;
        _effectiveTiming?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        informationSource?: Array<Reference> | undefined;
        _informationSource?: Element[] | undefined;
      
        medication: CodeableReference;
        _medication?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        partOf?: Array<Reference> | undefined;
        _partOf?: Element[] | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        relatedClinicalInformation?: Array<Reference> | undefined;
        _relatedClinicalInformation?: Element[] | undefined;
      
        renderedDosageInstruction?: string | undefined;
        _renderedDosageInstruction?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
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
 * @see {@link http://hl7.org/fhir/R5/MedicinalProductDefinition.html}
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
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueDate?: string | undefined;
        _valueDate?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueMarkdown?: string | undefined;
        _valueMarkdown?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        classification?: Array<CodeableConcept> | undefined;
        _classification?: Element[] | undefined;
      
        clinicalTrial?: Array<Reference> | undefined;
        _clinicalTrial?: Element[] | undefined;
      
        code?: Array<Coding> | undefined;
        _code?: Element[] | undefined;
      
        combinedPharmaceuticalDoseForm?: CodeableConcept | undefined;
        _combinedPharmaceuticalDoseForm?: Element | undefined;
      
        comprisedOf?: Array<Reference> | undefined;
        _comprisedOf?: Element[] | undefined;
      
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
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        domain?: CodeableConcept | undefined;
        _domain?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        impurity?: Array<CodeableReference> | undefined;
        _impurity?: Element[] | undefined;
      
        indication?: string | undefined;
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
      
        part?: Array<BackboneElement> | undefined;
        _part?: Element[] | undefined;
      
        part: string;
        _part?: Element | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        productName: string;
        _productName?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        usage?: Array<BackboneElement> | undefined;
        _usage?: Element[] | undefined;
      
        country: CodeableConcept;
        _country?: Element | undefined;
      
        jurisdiction?: CodeableConcept | undefined;
        _jurisdiction?: Element | undefined;
      
        language: CodeableConcept;
        _language?: Element | undefined;
      
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
      
        statusDate?: string | undefined;
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
 * @see {@link http://hl7.org/fhir/R5/MessageDefinition.html}
 */
    export interface MessageDefinition extends DomainResource {
      
      readonly resourceType: "MessageDefinition";
      

      
        allowedResponse?: Array<BackboneElement> | undefined;
        _allowedResponse?: Element[] | undefined;
      
        message: string;
        _message?: Element | undefined;
      
        situation?: string | undefined;
        _situation?: Element | undefined;
      
        base?: string | undefined;
        _base?: Element | undefined;
      
        category?: string | undefined;
        _category?: Element | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date: string;
        _date?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        eventCoding?: Coding | undefined;
        _eventCoding?: Element | undefined;
      
        eventUri?: string | undefined;
        _eventUri?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        focus?: Array<BackboneElement> | undefined;
        _focus?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        max?: string | undefined;
        _max?: Element | undefined;
      
        min: unsignedInt;
        _min?: Element | undefined;
      
        profile?: string | undefined;
        _profile?: Element | undefined;
      
        graph?: string | undefined;
        _graph?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        parent?: Array<string> | undefined;
        _parent?: Element[] | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        replaces?: Array<string> | undefined;
        _replaces?: Element[] | undefined;
      
        responseRequired?: string | undefined;
        _responseRequired?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * MessageHeader
 * 
 * The header for a message exchange that is either requesting or responding to an
 * action.  The reference(s) that are the subject of the action as well as other
 * information related to the action are typically transmitted in a bundle in which
 * the MessageHeader resource instance is the first resource in the bundle.
 * 
 * @see {@link http://hl7.org/fhir/R5/MessageHeader.html}
 */
    export interface MessageHeader extends DomainResource {
      
      readonly resourceType: "MessageHeader";
      

      
        author?: Reference | undefined;
        _author?: Element | undefined;
      
        definition?: string | undefined;
        _definition?: Element | undefined;
      
        destination?: Array<BackboneElement> | undefined;
        _destination?: Element[] | undefined;
      
        endpointReference?: Reference | undefined;
        _endpointReference?: Element | undefined;
      
        endpointUrl?: string | undefined;
        _endpointUrl?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        receiver?: Reference | undefined;
        _receiver?: Element | undefined;
      
        target?: Reference | undefined;
        _target?: Element | undefined;
      
        eventCanonical?: string | undefined;
        _eventCanonical?: Element | undefined;
      
        eventCoding?: Coding | undefined;
        _eventCoding?: Element | undefined;
      
        focus?: Array<Reference> | undefined;
        _focus?: Element[] | undefined;
      
        reason?: CodeableConcept | undefined;
        _reason?: Element | undefined;
      
        response?: BackboneElement | undefined;
        _response?: Element | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        details?: Reference | undefined;
        _details?: Element | undefined;
      
        identifier: Identifier;
        _identifier?: Element | undefined;
      
        responsible?: Reference | undefined;
        _responsible?: Element | undefined;
      
        sender?: Reference | undefined;
        _sender?: Element | undefined;
      
        source: BackboneElement;
        _source?: Element | undefined;
      
        contact?: ContactPoint | undefined;
        _contact?: Element | undefined;
      
        endpointReference?: Reference | undefined;
        _endpointReference?: Element | undefined;
      
        endpointUrl?: string | undefined;
        _endpointUrl?: Element | undefined;
      
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
 * Meta Type: The metadata about a resource. This is content in the resource that
 * is maintained by the infrastructure. Changes to the content might not always be
 * associated with version changes to the resource.
 * 
 * @see {@link http://hl7.org/fhir/R5/Meta.html}
 */
    export interface Meta extends DataType {
      
      readonly resourceType: string;
      

      
        lastUpdated?: string | undefined;
        _lastUpdated?: Element | undefined;
      
        profile?: Array<string> | undefined;
        _profile?: Element[] | undefined;
      
        security?: Array<Coding> | undefined;
        _security?: Element[] | undefined;
      
        source?: string | undefined;
        _source?: Element | undefined;
      
        tag?: Array<Coding> | undefined;
        _tag?: Element[] | undefined;
      
        versionId?: id | undefined;
        _versionId?: Element | undefined;
      
    }

  


  
    /**
 * MetadataResource
 * 
 * Common Interface declaration for conformance and knowledge artifact resources.
 * 
 * @see {@link http://hl7.org/fhir/R5/MetadataResource.html}
 */
    export interface MetadataResource extends DomainResource {
      
      readonly resourceType: "MetadataResource";
      

      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        author?: Array<ContactDetail> | undefined;
        _author?: Element[] | undefined;
      
        editor?: Array<ContactDetail> | undefined;
        _editor?: Element[] | undefined;
      
        effectivePeriod?: Period | undefined;
        _effectivePeriod?: Element | undefined;
      
        endorser?: Array<ContactDetail> | undefined;
        _endorser?: Element[] | undefined;
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        relatedArtifact?: Array<RelatedArtifact> | undefined;
        _relatedArtifact?: Element[] | undefined;
      
        reviewer?: Array<ContactDetail> | undefined;
        _reviewer?: Element[] | undefined;
      
        topic?: Array<CodeableConcept> | undefined;
        _topic?: Element[] | undefined;
      
    }

  


  


  


  
    /**
 * MolecularSequence
 * 
 * Representation of a molecular sequence.
 * 
 * @see {@link http://hl7.org/fhir/R5/MolecularSequence.html}
 */
    export interface MolecularSequence extends DomainResource {
      
      readonly resourceType: "MolecularSequence";
      

      
        device?: Reference | undefined;
        _device?: Element | undefined;
      
        focus?: Array<Reference> | undefined;
        _focus?: Element[] | undefined;
      
        formatted?: Array<Attachment> | undefined;
        _formatted?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        literal?: string | undefined;
        _literal?: Element | undefined;
      
        performer?: Reference | undefined;
        _performer?: Element | undefined;
      
        relative?: Array<BackboneElement> | undefined;
        _relative?: Element[] | undefined;
      
        coordinateSystem: CodeableConcept;
        _coordinateSystem?: Element | undefined;
      
        edit?: Array<BackboneElement> | undefined;
        _edit?: Element[] | undefined;
      
        end?: number | undefined;
        _end?: Element | undefined;
      
        replacedSequence?: string | undefined;
        _replacedSequence?: Element | undefined;
      
        replacementSequence?: string | undefined;
        _replacementSequence?: Element | undefined;
      
        start?: number | undefined;
        _start?: Element | undefined;
      
        ordinalPosition?: number | undefined;
        _ordinalPosition?: Element | undefined;
      
        sequenceRange?: Range | undefined;
        _sequenceRange?: Element | undefined;
      
        startingSequence?: BackboneElement | undefined;
        _startingSequence?: Element | undefined;
      
        chromosome?: CodeableConcept | undefined;
        _chromosome?: Element | undefined;
      
        genomeAssembly?: CodeableConcept | undefined;
        _genomeAssembly?: Element | undefined;
      
        orientation?: string | undefined;
        _orientation?: Element | undefined;
      
        sequenceCodeableConcept?: CodeableConcept | undefined;
        _sequenceCodeableConcept?: Element | undefined;
      
        sequenceReference?: Reference | undefined;
        _sequenceReference?: Element | undefined;
      
        sequenceString?: string | undefined;
        _sequenceString?: Element | undefined;
      
        strand?: string | undefined;
        _strand?: Element | undefined;
      
        windowEnd?: number | undefined;
        _windowEnd?: Element | undefined;
      
        windowStart?: number | undefined;
        _windowStart?: Element | undefined;
      
        specimen?: Reference | undefined;
        _specimen?: Element | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
        type?: string | undefined;
        _type?: Element | undefined;
      
    }

  


  
    /**
 * MonetaryComponent
 * 
 * MonetaryComponent Type: Availability data for an {item}.
 * 
 * @see {@link http://hl7.org/fhir/R5/MonetaryComponent.html}
 */
    export interface MonetaryComponent extends DataType {
      
      readonly resourceType: string;
      

      
        amount?: Money | undefined;
        _amount?: Element | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        factor?: number | undefined;
        _factor?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
    }

  


  
    /**
 * Money
 * 
 * Money Type: An amount of economic utility in some recognized currency.
 * 
 * @see {@link http://hl7.org/fhir/R5/Money.html}
 */
    export interface Money extends DataType {
      
      readonly resourceType: string;
      

      
        currency?: string | undefined;
        _currency?: Element | undefined;
      
        value?: number | undefined;
        _value?: Element | undefined;
      
    }

  


  


  
    /**
 * NamingSystem
 * 
 * A curated namespace that issues unique symbols within that namespace for the
 * identification of concepts, people, devices, etc.  Represents a "System" used
 * within the Identifier and Coding data types.
 * 
 * @see {@link http://hl7.org/fhir/R5/NamingSystem.html}
 */
    export interface NamingSystem extends DomainResource {
      
      readonly resourceType: "NamingSystem";
      

      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        author?: Array<ContactDetail> | undefined;
        _author?: Element[] | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date: string;
        _date?: Element | undefined;
      
        description?: string | undefined;
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
      
        kind: string;
        _kind?: Element | undefined;
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        relatedArtifact?: Array<RelatedArtifact> | undefined;
        _relatedArtifact?: Element[] | undefined;
      
        responsible?: string | undefined;
        _responsible?: Element | undefined;
      
        reviewer?: Array<ContactDetail> | undefined;
        _reviewer?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        topic?: Array<CodeableConcept> | undefined;
        _topic?: Element[] | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        uniqueId: Array<BackboneElement>;
        _uniqueId?: Element[] | undefined;
      
        authoritative?: boolean | undefined;
        _authoritative?: Element | undefined;
      
        comment?: string | undefined;
        _comment?: Element | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        preferred?: boolean | undefined;
        _preferred?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        value: string;
        _value?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        usage?: string | undefined;
        _usage?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * Narrative
 * 
 * Narrative Type: A human-readable summary of the resource conveying the essential
 * clinical and business information for the resource.
 * 
 * @see {@link http://hl7.org/fhir/R5/Narrative.html}
 */
    export interface Narrative extends DataType {
      
      readonly resourceType: string;
      

      
        div: xhtml;
        _div?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
    }

  


  
    /**
 * NutritionIntake
 * 
 * A record of food or fluid that is being consumed by a patient.  A
 * NutritionIntake may indicate that the patient may be consuming the food or fluid
 * now or has consumed the food or fluid in the past.  The source of this
 * information can be the patient, significant other (such as a family member or
 * spouse), or a clinician.  A common scenario where this information is captured
 * is during the history taking process during a patient visit or stay or through
 * an app that tracks food or fluids consumed.   The consumption information may
 * come from sources such as the patient's memory, from a nutrition label,  or from
 * a clinician documenting observed intake.
 * 
 * @see {@link http://hl7.org/fhir/R5/NutritionIntake.html}
 */
    export interface NutritionIntake extends DomainResource {
      
      readonly resourceType: "NutritionIntake";
      

      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        consumedItem: Array<BackboneElement>;
        _consumedItem?: Element[] | undefined;
      
        amount?: Quantity | undefined;
        _amount?: Element | undefined;
      
        notConsumed?: boolean | undefined;
        _notConsumed?: Element | undefined;
      
        notConsumedReason?: CodeableConcept | undefined;
        _notConsumedReason?: Element | undefined;
      
        nutritionProduct: CodeableReference;
        _nutritionProduct?: Element | undefined;
      
        rate?: Quantity | undefined;
        _rate?: Element | undefined;
      
        schedule?: Timing | undefined;
        _schedule?: Element | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        derivedFrom?: Array<Reference> | undefined;
        _derivedFrom?: Element[] | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        ingredientLabel?: Array<BackboneElement> | undefined;
        _ingredientLabel?: Element[] | undefined;
      
        amount: Quantity;
        _amount?: Element | undefined;
      
        nutrient: CodeableReference;
        _nutrient?: Element | undefined;
      
        instantiatesCanonical?: Array<string> | undefined;
        _instantiatesCanonical?: Element[] | undefined;
      
        instantiatesUri?: Array<string> | undefined;
        _instantiatesUri?: Element[] | undefined;
      
        location?: Reference | undefined;
        _location?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        occurrenceDateTime?: string | undefined;
        _occurrenceDateTime?: Element | undefined;
      
        occurrencePeriod?: Period | undefined;
        _occurrencePeriod?: Element | undefined;
      
        partOf?: Array<Reference> | undefined;
        _partOf?: Element[] | undefined;
      
        performer?: Array<BackboneElement> | undefined;
        _performer?: Element[] | undefined;
      
        actor: Reference;
        _actor?: Element | undefined;
      
        function?: CodeableConcept | undefined;
        _function?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        recorded?: string | undefined;
        _recorded?: Element | undefined;
      
        reportedBoolean?: boolean | undefined;
        _reportedBoolean?: Element | undefined;
      
        reportedReference?: Reference | undefined;
        _reportedReference?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        statusReason?: Array<CodeableConcept> | undefined;
        _statusReason?: Element[] | undefined;
      
        subject: Reference;
        _subject?: Element | undefined;
      
    }

  


  
    /**
 * NutritionOrder
 * 
 * A request to supply a diet, formula feeding (enteral) or oral nutritional
 * supplement to a patient/resident.
 * 
 * @see {@link http://hl7.org/fhir/R5/NutritionOrder.html}
 */
    export interface NutritionOrder extends DomainResource {
      
      readonly resourceType: "NutritionOrder";
      

      
        allergyIntolerance?: Array<Reference> | undefined;
        _allergyIntolerance?: Element[] | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        dateTime: string;
        _dateTime?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        enteralFormula?: BackboneElement | undefined;
        _enteralFormula?: Element | undefined;
      
        additive?: Array<BackboneElement> | undefined;
        _additive?: Element[] | undefined;
      
        productName?: string | undefined;
        _productName?: Element | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        type?: CodeableReference | undefined;
        _type?: Element | undefined;
      
        administration?: Array<BackboneElement> | undefined;
        _administration?: Element[] | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        rateQuantity?: Quantity | undefined;
        _rateQuantity?: Element | undefined;
      
        rateRatio?: Ratio | undefined;
        _rateRatio?: Element | undefined;
      
        schedule?: BackboneElement | undefined;
        _schedule?: Element | undefined;
      
        asNeeded?: boolean | undefined;
        _asNeeded?: Element | undefined;
      
        asNeededFor?: CodeableConcept | undefined;
        _asNeededFor?: Element | undefined;
      
        timing?: Array<Timing> | undefined;
        _timing?: Element[] | undefined;
      
        administrationInstruction?: string | undefined;
        _administrationInstruction?: Element | undefined;
      
        baseFormulaProductName?: string | undefined;
        _baseFormulaProductName?: Element | undefined;
      
        baseFormulaType?: CodeableReference | undefined;
        _baseFormulaType?: Element | undefined;
      
        caloricDensity?: Quantity | undefined;
        _caloricDensity?: Element | undefined;
      
        deliveryDevice?: Array<CodeableReference> | undefined;
        _deliveryDevice?: Element[] | undefined;
      
        maxVolumeToDeliver?: Quantity | undefined;
        _maxVolumeToDeliver?: Element | undefined;
      
        routeOfAdministration?: CodeableConcept | undefined;
        _routeOfAdministration?: Element | undefined;
      
        excludeFoodModifier?: Array<CodeableConcept> | undefined;
        _excludeFoodModifier?: Element[] | undefined;
      
        foodPreferenceModifier?: Array<CodeableConcept> | undefined;
        _foodPreferenceModifier?: Element[] | undefined;
      
        groupIdentifier?: Identifier | undefined;
        _groupIdentifier?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        instantiates?: Array<string> | undefined;
        _instantiates?: Element[] | undefined;
      
        instantiatesCanonical?: Array<string> | undefined;
        _instantiatesCanonical?: Element[] | undefined;
      
        instantiatesUri?: Array<string> | undefined;
        _instantiatesUri?: Element[] | undefined;
      
        intent: string;
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
      
        schedule?: BackboneElement | undefined;
        _schedule?: Element | undefined;
      
        asNeeded?: boolean | undefined;
        _asNeeded?: Element | undefined;
      
        asNeededFor?: CodeableConcept | undefined;
        _asNeededFor?: Element | undefined;
      
        timing?: Array<Timing> | undefined;
        _timing?: Element[] | undefined;
      
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
      
        outsideFoodAllowed?: boolean | undefined;
        _outsideFoodAllowed?: Element | undefined;
      
        performer?: Array<CodeableReference> | undefined;
        _performer?: Element[] | undefined;
      
        priority?: string | undefined;
        _priority?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject: Reference;
        _subject?: Element | undefined;
      
        supplement?: Array<BackboneElement> | undefined;
        _supplement?: Element[] | undefined;
      
        instruction?: string | undefined;
        _instruction?: Element | undefined;
      
        productName?: string | undefined;
        _productName?: Element | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        schedule?: BackboneElement | undefined;
        _schedule?: Element | undefined;
      
        asNeeded?: boolean | undefined;
        _asNeeded?: Element | undefined;
      
        asNeededFor?: CodeableConcept | undefined;
        _asNeededFor?: Element | undefined;
      
        timing?: Array<Timing> | undefined;
        _timing?: Element[] | undefined;
      
        type?: CodeableReference | undefined;
        _type?: Element | undefined;
      
        supportingInformation?: Array<Reference> | undefined;
        _supportingInformation?: Element[] | undefined;
      
    }

  


  
    /**
 * NutritionProduct
 * 
 * A food or supplement that is consumed by patients.
 * 
 * @see {@link http://hl7.org/fhir/R5/NutritionProduct.html}
 */
    export interface NutritionProduct extends DomainResource {
      
      readonly resourceType: "NutritionProduct";
      

      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        characteristic?: Array<BackboneElement> | undefined;
        _characteristic?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueBase64Binary?: string | undefined;
        _valueBase64Binary?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        ingredient?: Array<BackboneElement> | undefined;
        _ingredient?: Element[] | undefined;
      
        amount?: Array<Ratio> | undefined;
        _amount?: Element[] | undefined;
      
        item: CodeableReference;
        _item?: Element | undefined;
      
        instance?: Array<BackboneElement> | undefined;
        _instance?: Element[] | undefined;
      
        biologicalSourceEvent?: Identifier | undefined;
        _biologicalSourceEvent?: Element | undefined;
      
        expiry?: string | undefined;
        _expiry?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        lotNumber?: string | undefined;
        _lotNumber?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        useBy?: string | undefined;
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
      
        status: string;
        _status?: Element | undefined;
      
    }

  


  
    /**
 * Observation
 * 
 * Measurements and simple assertions made about a patient, device or other
 * subject.
 * 
 * @see {@link http://hl7.org/fhir/R5/Observation.html}
 */
    export interface Observation extends DomainResource {
      
      readonly resourceType: "Observation";
      

      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        bodySite?: CodeableConcept | undefined;
        _bodySite?: Element | undefined;
      
        bodyStructure?: Reference | undefined;
        _bodyStructure?: Element | undefined;
      
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
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valuePeriod?: Period | undefined;
        _valuePeriod?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueRatio?: Ratio | undefined;
        _valueRatio?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        valueSampledData?: SampledData | undefined;
        _valueSampledData?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        valueTime?: time | undefined;
        _valueTime?: Element | undefined;
      
        dataAbsentReason?: CodeableConcept | undefined;
        _dataAbsentReason?: Element | undefined;
      
        derivedFrom?: Array<Reference> | undefined;
        _derivedFrom?: Element[] | undefined;
      
        device?: Reference | undefined;
        _device?: Element | undefined;
      
        effectiveDateTime?: string | undefined;
        _effectiveDateTime?: Element | undefined;
      
        effectiveInstant?: string | undefined;
        _effectiveInstant?: Element | undefined;
      
        effectivePeriod?: Period | undefined;
        _effectivePeriod?: Element | undefined;
      
        effectiveTiming?: Timing | undefined;
        _effectiveTiming?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        focus?: Array<Reference> | undefined;
        _focus?: Element[] | undefined;
      
        hasMember?: Array<Reference> | undefined;
        _hasMember?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        instantiatesCanonical?: string | undefined;
        _instantiatesCanonical?: Element | undefined;
      
        instantiatesReference?: Reference | undefined;
        _instantiatesReference?: Element | undefined;
      
        interpretation?: Array<CodeableConcept> | undefined;
        _interpretation?: Element[] | undefined;
      
        issued?: string | undefined;
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
      
        normalValue?: CodeableConcept | undefined;
        _normalValue?: Element | undefined;
      
        text?: string | undefined;
        _text?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        specimen?: Reference | undefined;
        _specimen?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
        triggeredBy?: Array<BackboneElement> | undefined;
        _triggeredBy?: Element[] | undefined;
      
        observation: Reference;
        _observation?: Element | undefined;
      
        reason?: string | undefined;
        _reason?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valuePeriod?: Period | undefined;
        _valuePeriod?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueRatio?: Ratio | undefined;
        _valueRatio?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        valueSampledData?: SampledData | undefined;
        _valueSampledData?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        valueTime?: time | undefined;
        _valueTime?: Element | undefined;
      
    }

  


  


  


  


  


  


  
    /**
 * ObservationDefinition
 * 
 * Set of definitional characteristics for a kind of observation or measurement
 * produced or consumed by an orderable health care service.
 * 
 * @see {@link http://hl7.org/fhir/R5/ObservationDefinition.html}
 */
    export interface ObservationDefinition extends DomainResource {
      
      readonly resourceType: "ObservationDefinition";
      

      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
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
      
        permittedDataType?: Array<string> | undefined;
        _permittedDataType?: Element[] | undefined;
      
        permittedUnit?: Array<Coding> | undefined;
        _permittedUnit?: Element[] | undefined;
      
        qualifiedValue?: Array<undefined> | undefined;
        _qualifiedValue?: Element[] | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        derivedFromCanonical?: Array<string> | undefined;
        _derivedFromCanonical?: Element[] | undefined;
      
        derivedFromUri?: Array<string> | undefined;
        _derivedFromUri?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        device?: Array<Reference> | undefined;
        _device?: Element[] | undefined;
      
        effectivePeriod?: Period | undefined;
        _effectivePeriod?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        hasMember?: Array<Reference> | undefined;
        _hasMember?: Element[] | undefined;
      
        identifier?: Identifier | undefined;
        _identifier?: Element | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        method?: CodeableConcept | undefined;
        _method?: Element | undefined;
      
        multipleResultsAllowed?: boolean | undefined;
        _multipleResultsAllowed?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        performerType?: CodeableConcept | undefined;
        _performerType?: Element | undefined;
      
        permittedDataType?: Array<string> | undefined;
        _permittedDataType?: Element[] | undefined;
      
        permittedUnit?: Array<Coding> | undefined;
        _permittedUnit?: Element[] | undefined;
      
        preferredReportName?: string | undefined;
        _preferredReportName?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        qualifiedValue?: Array<BackboneElement> | undefined;
        _qualifiedValue?: Element[] | undefined;
      
        abnormalCodedValueSet?: string | undefined;
        _abnormalCodedValueSet?: Element | undefined;
      
        age?: Range | undefined;
        _age?: Element | undefined;
      
        appliesTo?: Array<CodeableConcept> | undefined;
        _appliesTo?: Element[] | undefined;
      
        condition?: string | undefined;
        _condition?: Element | undefined;
      
        context?: CodeableConcept | undefined;
        _context?: Element | undefined;
      
        criticalCodedValueSet?: string | undefined;
        _criticalCodedValueSet?: Element | undefined;
      
        gender?: string | undefined;
        _gender?: Element | undefined;
      
        gestationalAge?: Range | undefined;
        _gestationalAge?: Element | undefined;
      
        normalCodedValueSet?: string | undefined;
        _normalCodedValueSet?: Element | undefined;
      
        range?: Range | undefined;
        _range?: Element | undefined;
      
        rangeCategory?: string | undefined;
        _rangeCategory?: Element | undefined;
      
        validCodedValueSet?: string | undefined;
        _validCodedValueSet?: Element | undefined;
      
        specimen?: Array<Reference> | undefined;
        _specimen?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject?: Array<CodeableConcept> | undefined;
        _subject?: Element[] | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  


  


  


  


  


  


  


  
    /**
 * OperationDefinition
 * 
 * A formal computable definition of an operation (on the RESTful interface) or a
 * named query (using the search interaction).
 * 
 * @see {@link http://hl7.org/fhir/R5/OperationDefinition.html}
 */
    export interface OperationDefinition extends DomainResource {
      
      readonly resourceType: "OperationDefinition";
      

      
        affectsState?: boolean | undefined;
        _affectsState?: Element | undefined;
      
        base?: string | undefined;
        _base?: Element | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        comment?: string | undefined;
        _comment?: Element | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        inputProfile?: string | undefined;
        _inputProfile?: Element | undefined;
      
        instance: boolean;
        _instance?: Element | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        kind: string;
        _kind?: Element | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        outputProfile?: string | undefined;
        _outputProfile?: Element | undefined;
      
        overload?: Array<BackboneElement> | undefined;
        _overload?: Element[] | undefined;
      
        comment?: string | undefined;
        _comment?: Element | undefined;
      
        parameterName?: Array<string> | undefined;
        _parameterName?: Element[] | undefined;
      
        parameter?: Array<BackboneElement> | undefined;
        _parameter?: Element[] | undefined;
      
        allowedType?: Array<string> | undefined;
        _allowedType?: Element[] | undefined;
      
        binding?: BackboneElement | undefined;
        _binding?: Element | undefined;
      
        strength: string;
        _strength?: Element | undefined;
      
        valueSet: string;
        _valueSet?: Element | undefined;
      
        documentation?: string | undefined;
        _documentation?: Element | undefined;
      
        max: string;
        _max?: Element | undefined;
      
        min: number;
        _min?: Element | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        part?: Array<undefined> | undefined;
        _part?: Element[] | undefined;
      
        referencedFrom?: Array<BackboneElement> | undefined;
        _referencedFrom?: Element[] | undefined;
      
        source: string;
        _source?: Element | undefined;
      
        sourceId?: string | undefined;
        _sourceId?: Element | undefined;
      
        scope?: Array<string> | undefined;
        _scope?: Element[] | undefined;
      
        searchType?: string | undefined;
        _searchType?: Element | undefined;
      
        targetProfile?: Array<string> | undefined;
        _targetProfile?: Element[] | undefined;
      
        type?: string | undefined;
        _type?: Element | undefined;
      
        use: string;
        _use?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        resource?: Array<string> | undefined;
        _resource?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        system: boolean;
        _system?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        type: boolean;
        _type?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * OperationOutcome
 * 
 * A collection of error, warning, or information messages that result from a
 * system action.
 * 
 * @see {@link http://hl7.org/fhir/R5/OperationOutcome.html}
 */
    export interface OperationOutcome extends DomainResource {
      
      readonly resourceType: "OperationOutcome";
      

      
        issue: Array<BackboneElement>;
        _issue?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        details?: CodeableConcept | undefined;
        _details?: Element | undefined;
      
        diagnostics?: string | undefined;
        _diagnostics?: Element | undefined;
      
        expression?: Array<string> | undefined;
        _expression?: Element[] | undefined;
      
        location?: Array<string> | undefined;
        _location?: Element[] | undefined;
      
        severity: string;
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
 * @see {@link http://hl7.org/fhir/R5/Organization.html}
 */
    export interface Organization extends DomainResource {
      
      readonly resourceType: "Organization";
      

      
        active?: boolean | undefined;
        _active?: Element | undefined;
      
        alias?: Array<string> | undefined;
        _alias?: Element[] | undefined;
      
        contact?: Array<ExtendedContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        endpoint?: Array<Reference> | undefined;
        _endpoint?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        partOf?: Reference | undefined;
        _partOf?: Element | undefined;
      
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
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
    }

  


  
    /**
 * OrganizationAffiliation
 * 
 * Defines an affiliation/assotiation/relationship between 2 distinct
 * organizations, that is not a part-of relationship/sub-division relationship.
 * 
 * @see {@link http://hl7.org/fhir/R5/OrganizationAffiliation.html}
 */
    export interface OrganizationAffiliation extends DomainResource {
      
      readonly resourceType: "OrganizationAffiliation";
      

      
        active?: boolean | undefined;
        _active?: Element | undefined;
      
        code?: Array<CodeableConcept> | undefined;
        _code?: Element[] | undefined;
      
        contact?: Array<ExtendedContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
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
      
    }

  


  
    /**
 * PackagedProductDefinition
 * 
 * A medically related item or items, in a container or package.
 * 
 * @see {@link http://hl7.org/fhir/R5/PackagedProductDefinition.html}
 */
    export interface PackagedProductDefinition extends DomainResource {
      
      readonly resourceType: "PackagedProductDefinition";
      

      
        attachedDocument?: Array<Reference> | undefined;
        _attachedDocument?: Element[] | undefined;
      
        characteristic?: Array<undefined> | undefined;
        _characteristic?: Element[] | undefined;
      
        containedItemQuantity?: Array<Quantity> | undefined;
        _containedItemQuantity?: Element[] | undefined;
      
        copackagedIndicator?: boolean | undefined;
        _copackagedIndicator?: Element | undefined;
      
        description?: string | undefined;
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
      
        packageFor?: Array<Reference> | undefined;
        _packageFor?: Element[] | undefined;
      
        packaging?: BackboneElement | undefined;
        _packaging?: Element | undefined;
      
        alternateMaterial?: Array<CodeableConcept> | undefined;
        _alternateMaterial?: Element[] | undefined;
      
        componentPart?: boolean | undefined;
        _componentPart?: Element | undefined;
      
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
      
        packaging?: Array<undefined> | undefined;
        _packaging?: Element[] | undefined;
      
        property?: Array<BackboneElement> | undefined;
        _property?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueDate?: string | undefined;
        _valueDate?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        quantity?: number | undefined;
        _quantity?: Element | undefined;
      
        shelfLifeStorage?: Array<ProductShelfLife> | undefined;
        _shelfLifeStorage?: Element[] | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        status?: CodeableConcept | undefined;
        _status?: Element | undefined;
      
        statusDate?: string | undefined;
        _statusDate?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
    }

  


  
    /**
 * ParameterDefinition
 * 
 * ParameterDefinition Type: The parameters to the module. This collection
 * specifies both the input and output parameters. Input parameters are provided by
 * the caller as part of the $evaluate operation. Output parameters are included in
 * the GuidanceResponse.
 * 
 * @see {@link http://hl7.org/fhir/R5/ParameterDefinition.html}
 */
    export interface ParameterDefinition extends DataType {
      
      readonly resourceType: string;
      

      
        documentation?: string | undefined;
        _documentation?: Element | undefined;
      
        max?: string | undefined;
        _max?: Element | undefined;
      
        min?: number | undefined;
        _min?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        profile?: string | undefined;
        _profile?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        use: string;
        _use?: Element | undefined;
      
    }

  


  
    /**
 * Parameters
 * 
 * This resource is used to pass information into and back from an operation
 * (whether invoked directly from REST or within a messaging environment).  It is
 * not persisted or allowed to be referenced by other resources except as described
 * in the definition of the Parameters resource.
 * 
 * @see {@link http://hl7.org/fhir/R5/Parameters.html}
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
      
        valueAddress?: Address | undefined;
        _valueAddress?: Element | undefined;
      
        valueAge?: Age | undefined;
        _valueAge?: Element | undefined;
      
        valueAnnotation?: Annotation | undefined;
        _valueAnnotation?: Element | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueAvailability?: Availability | undefined;
        _valueAvailability?: Element | undefined;
      
        valueBase64Binary?: string | undefined;
        _valueBase64Binary?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCanonical?: string | undefined;
        _valueCanonical?: Element | undefined;
      
        valueCode?: string | undefined;
        _valueCode?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueCodeableReference?: CodeableReference | undefined;
        _valueCodeableReference?: Element | undefined;
      
        valueCoding?: Coding | undefined;
        _valueCoding?: Element | undefined;
      
        valueContactDetail?: ContactDetail | undefined;
        _valueContactDetail?: Element | undefined;
      
        valueContactPoint?: ContactPoint | undefined;
        _valueContactPoint?: Element | undefined;
      
        valueCount?: Count | undefined;
        _valueCount?: Element | undefined;
      
        valueDataRequirement?: DataRequirement | undefined;
        _valueDataRequirement?: Element | undefined;
      
        valueDate?: string | undefined;
        _valueDate?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueDecimal?: number | undefined;
        _valueDecimal?: Element | undefined;
      
        valueDistance?: Distance | undefined;
        _valueDistance?: Element | undefined;
      
        valueDosage?: Dosage | undefined;
        _valueDosage?: Element | undefined;
      
        valueDuration?: Duration | undefined;
        _valueDuration?: Element | undefined;
      
        valueExpression?: Expression | undefined;
        _valueExpression?: Element | undefined;
      
        valueExtendedContactDetail?: ExtendedContactDetail | undefined;
        _valueExtendedContactDetail?: Element | undefined;
      
        valueHumanName?: HumanName | undefined;
        _valueHumanName?: Element | undefined;
      
        valueId?: id | undefined;
        _valueId?: Element | undefined;
      
        valueIdentifier?: Identifier | undefined;
        _valueIdentifier?: Element | undefined;
      
        valueInstant?: string | undefined;
        _valueInstant?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueInteger64?: integer64 | undefined;
        _valueInteger64?: Element | undefined;
      
        valueMarkdown?: string | undefined;
        _valueMarkdown?: Element | undefined;
      
        valueMeta?: Meta | undefined;
        _valueMeta?: Element | undefined;
      
        valueMoney?: Money | undefined;
        _valueMoney?: Element | undefined;
      
        valueOid?: oid | undefined;
        _valueOid?: Element | undefined;
      
        valueParameterDefinition?: ParameterDefinition | undefined;
        _valueParameterDefinition?: Element | undefined;
      
        valuePeriod?: Period | undefined;
        _valuePeriod?: Element | undefined;
      
        valuePositiveInt?: number | undefined;
        _valuePositiveInt?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueRatio?: Ratio | undefined;
        _valueRatio?: Element | undefined;
      
        valueRatioRange?: RatioRange | undefined;
        _valueRatioRange?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        valueRelatedArtifact?: RelatedArtifact | undefined;
        _valueRelatedArtifact?: Element | undefined;
      
        valueSampledData?: SampledData | undefined;
        _valueSampledData?: Element | undefined;
      
        valueSignature?: Signature | undefined;
        _valueSignature?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        valueTime?: time | undefined;
        _valueTime?: Element | undefined;
      
        valueTiming?: Timing | undefined;
        _valueTiming?: Element | undefined;
      
        valueTriggerDefinition?: TriggerDefinition | undefined;
        _valueTriggerDefinition?: Element | undefined;
      
        valueUnsignedInt?: unsignedInt | undefined;
        _valueUnsignedInt?: Element | undefined;
      
        valueUri?: string | undefined;
        _valueUri?: Element | undefined;
      
        valueUrl?: string | undefined;
        _valueUrl?: Element | undefined;
      
        valueUsageContext?: UsageContext | undefined;
        _valueUsageContext?: Element | undefined;
      
        valueUuid?: uuid | undefined;
        _valueUuid?: Element | undefined;
      
    }

  


  
    /**
 * Participant
 * 
 * Logical Model: A pattern followed by resources that represent the participant in
 * some activity, process, or responsible for providing information about a
 * resource.
 * 
 * @see {@link http://hl7.org/fhir/R5/Participant.html}
 */
    export interface Participant extends Base {
      
      readonly resourceType: string;
      

      
        active?: boolean | undefined;
        _active?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
    }

  


  
    /**
 * ParticipantContactable
 * 
 * Logical Model: A pattern followed by resources that represent a participant that
 * can be contacted.
 * 
 * @see {@link http://hl7.org/fhir/R5/ParticipantContactable.html}
 */
    export interface ParticipantContactable extends Base {
      
      readonly resourceType: string;
      

      
        address?: Array<Address> | undefined;
        _address?: Element[] | undefined;
      
        telecom?: Array<ContactPoint> | undefined;
        _telecom?: Element[] | undefined;
      
    }

  


  
    /**
 * ParticipantLiving
 * 
 * Logical Model: A pattern followed by resources that represent the participant in
 * some activity, process, or responsible for providing information about a
 * resource.
 * 
 * @see {@link http://hl7.org/fhir/R5/ParticipantLiving.html}
 */
    export interface ParticipantLiving extends Base {
      
      readonly resourceType: string;
      

      
        birthDate?: string | undefined;
        _birthDate?: Element | undefined;
      
        communication?: Array<CodeableConcept> | undefined;
        _communication?: Element[] | undefined;
      
        gender?: string | undefined;
        _gender?: Element | undefined;
      
        photo?: Array<Attachment> | undefined;
        _photo?: Element[] | undefined;
      
    }

  


  
    /**
 * Patient
 * 
 * Demographics and other administrative information about an individual or animal
 * receiving care or other health-related services.
 * 
 * @see {@link http://hl7.org/fhir/R5/Patient.html}
 */
    export interface Patient extends DomainResource {
      
      readonly resourceType: "Patient";
      

      
        active?: boolean | undefined;
        _active?: Element | undefined;
      
        address?: Array<Address> | undefined;
        _address?: Element[] | undefined;
      
        birthDate?: string | undefined;
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
      
        gender?: string | undefined;
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
      
        deceasedBoolean?: boolean | undefined;
        _deceasedBoolean?: Element | undefined;
      
        deceasedDateTime?: string | undefined;
        _deceasedDateTime?: Element | undefined;
      
        gender?: string | undefined;
        _gender?: Element | undefined;
      
        generalPractitioner?: Array<Reference> | undefined;
        _generalPractitioner?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        link?: Array<BackboneElement> | undefined;
        _link?: Element[] | undefined;
      
        other: Reference;
        _other?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        managingOrganization?: Reference | undefined;
        _managingOrganization?: Element | undefined;
      
        maritalStatus?: CodeableConcept | undefined;
        _maritalStatus?: Element | undefined;
      
        multipleBirthBoolean?: boolean | undefined;
        _multipleBirthBoolean?: Element | undefined;
      
        multipleBirthInteger?: number | undefined;
        _multipleBirthInteger?: Element | undefined;
      
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
 * @see {@link http://hl7.org/fhir/R5/PaymentNotice.html}
 */
    export interface PaymentNotice extends DomainResource {
      
      readonly resourceType: "PaymentNotice";
      

      
        amount: Money;
        _amount?: Element | undefined;
      
        created: string;
        _created?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        payee?: Reference | undefined;
        _payee?: Element | undefined;
      
        payment?: Reference | undefined;
        _payment?: Element | undefined;
      
        paymentDate?: string | undefined;
        _paymentDate?: Element | undefined;
      
        paymentStatus?: CodeableConcept | undefined;
        _paymentStatus?: Element | undefined;
      
        recipient: Reference;
        _recipient?: Element | undefined;
      
        reporter?: Reference | undefined;
        _reporter?: Element | undefined;
      
        request?: Reference | undefined;
        _request?: Element | undefined;
      
        response?: Reference | undefined;
        _response?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
    }

  


  
    /**
 * PaymentReconciliation
 * 
 * This resource provides the details including amount of a payment and allocates
 * the payment items being paid.
 * 
 * @see {@link http://hl7.org/fhir/R5/PaymentReconciliation.html}
 */
    export interface PaymentReconciliation extends DomainResource {
      
      readonly resourceType: "PaymentReconciliation";
      

      
        accountNumber?: string | undefined;
        _accountNumber?: Element | undefined;
      
        allocation?: Array<BackboneElement> | undefined;
        _allocation?: Element[] | undefined;
      
        account?: Reference | undefined;
        _account?: Element | undefined;
      
        amount?: Money | undefined;
        _amount?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        identifier?: Identifier | undefined;
        _identifier?: Element | undefined;
      
        payee?: Reference | undefined;
        _payee?: Element | undefined;
      
        predecessor?: Identifier | undefined;
        _predecessor?: Element | undefined;
      
        response?: Reference | undefined;
        _response?: Element | undefined;
      
        responsible?: Reference | undefined;
        _responsible?: Element | undefined;
      
        submitter?: Reference | undefined;
        _submitter?: Element | undefined;
      
        target?: Reference | undefined;
        _target?: Element | undefined;
      
        targetItemIdentifier?: Identifier | undefined;
        _targetItemIdentifier?: Element | undefined;
      
        targetItemPositiveInt?: number | undefined;
        _targetItemPositiveInt?: Element | undefined;
      
        targetItemString?: string | undefined;
        _targetItemString?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        amount: Money;
        _amount?: Element | undefined;
      
        authorization?: string | undefined;
        _authorization?: Element | undefined;
      
        cardBrand?: string | undefined;
        _cardBrand?: Element | undefined;
      
        created: string;
        _created?: Element | undefined;
      
        date: string;
        _date?: Element | undefined;
      
        disposition?: string | undefined;
        _disposition?: Element | undefined;
      
        enterer?: Reference | undefined;
        _enterer?: Element | undefined;
      
        expirationDate?: string | undefined;
        _expirationDate?: Element | undefined;
      
        formCode?: CodeableConcept | undefined;
        _formCode?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        issuerType?: CodeableConcept | undefined;
        _issuerType?: Element | undefined;
      
        kind?: CodeableConcept | undefined;
        _kind?: Element | undefined;
      
        location?: Reference | undefined;
        _location?: Element | undefined;
      
        method?: CodeableConcept | undefined;
        _method?: Element | undefined;
      
        outcome?: string | undefined;
        _outcome?: Element | undefined;
      
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
      
        type?: string | undefined;
        _type?: Element | undefined;
      
        processor?: string | undefined;
        _processor?: Element | undefined;
      
        referenceNumber?: string | undefined;
        _referenceNumber?: Element | undefined;
      
        request?: Reference | undefined;
        _request?: Element | undefined;
      
        requestor?: Reference | undefined;
        _requestor?: Element | undefined;
      
        returnedAmount?: Money | undefined;
        _returnedAmount?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        tenderedAmount?: Money | undefined;
        _tenderedAmount?: Element | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
    }

  


  
    /**
 * Period
 * 
 * Period Type: A time period defined by a start and end date and optionally time.
 * 
 * @see {@link http://hl7.org/fhir/R5/Period.html}
 */
    export interface Period extends DataType {
      
      readonly resourceType: string;
      

      
        end?: string | undefined;
        _end?: Element | undefined;
      
        start?: string | undefined;
        _start?: Element | undefined;
      
    }

  


  
    /**
 * Permission
 * 
 * Permission resource holds access rules for a given data and context.
 * 
 * @see {@link http://hl7.org/fhir/R5/Permission.html}
 */
    export interface Permission extends DomainResource {
      
      readonly resourceType: "Permission";
      

      
        asserter?: Reference | undefined;
        _asserter?: Element | undefined;
      
        combining: string;
        _combining?: Element | undefined;
      
        date?: Array<string> | undefined;
        _date?: Element[] | undefined;
      
        justification?: BackboneElement | undefined;
        _justification?: Element | undefined;
      
        basis?: Array<CodeableConcept> | undefined;
        _basis?: Element[] | undefined;
      
        evidence?: Array<Reference> | undefined;
        _evidence?: Element[] | undefined;
      
        rule?: Array<BackboneElement> | undefined;
        _rule?: Element[] | undefined;
      
        activity?: Array<BackboneElement> | undefined;
        _activity?: Element[] | undefined;
      
        action?: Array<CodeableConcept> | undefined;
        _action?: Element[] | undefined;
      
        actor?: Array<Reference> | undefined;
        _actor?: Element[] | undefined;
      
        purpose?: Array<CodeableConcept> | undefined;
        _purpose?: Element[] | undefined;
      
        data?: Array<BackboneElement> | undefined;
        _data?: Element[] | undefined;
      
        expression?: Expression | undefined;
        _expression?: Element | undefined;
      
        period?: Array<Period> | undefined;
        _period?: Element[] | undefined;
      
        resource?: Array<BackboneElement> | undefined;
        _resource?: Element[] | undefined;
      
        meaning: string;
        _meaning?: Element | undefined;
      
        reference: Reference;
        _reference?: Element | undefined;
      
        security?: Array<Coding> | undefined;
        _security?: Element[] | undefined;
      
        limit?: Array<CodeableConcept> | undefined;
        _limit?: Element[] | undefined;
      
        type?: string | undefined;
        _type?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        validity?: Period | undefined;
        _validity?: Element | undefined;
      
    }

  


  
    /**
 * Person
 * 
 * Demographics and administrative information about a person independent of a
 * specific health-related context.
 * 
 * @see {@link http://hl7.org/fhir/R5/Person.html}
 */
    export interface Person extends DomainResource {
      
      readonly resourceType: "Person";
      

      
        active?: boolean | undefined;
        _active?: Element | undefined;
      
        address?: Array<Address> | undefined;
        _address?: Element[] | undefined;
      
        birthDate?: string | undefined;
        _birthDate?: Element | undefined;
      
        communication?: Array<BackboneElement> | undefined;
        _communication?: Element[] | undefined;
      
        language: CodeableConcept;
        _language?: Element | undefined;
      
        preferred?: boolean | undefined;
        _preferred?: Element | undefined;
      
        deceasedBoolean?: boolean | undefined;
        _deceasedBoolean?: Element | undefined;
      
        deceasedDateTime?: string | undefined;
        _deceasedDateTime?: Element | undefined;
      
        gender?: string | undefined;
        _gender?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        link?: Array<BackboneElement> | undefined;
        _link?: Element[] | undefined;
      
        assurance?: string | undefined;
        _assurance?: Element | undefined;
      
        target: Reference;
        _target?: Element | undefined;
      
        managingOrganization?: Reference | undefined;
        _managingOrganization?: Element | undefined;
      
        maritalStatus?: CodeableConcept | undefined;
        _maritalStatus?: Element | undefined;
      
        name?: Array<HumanName> | undefined;
        _name?: Element[] | undefined;
      
        photo?: Array<Attachment> | undefined;
        _photo?: Element[] | undefined;
      
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
 * @see {@link http://hl7.org/fhir/R5/PlanDefinition.html}
 */
    export interface PlanDefinition extends DomainResource {
      
      readonly resourceType: "PlanDefinition";
      

      
        action?: Array<BackboneElement> | undefined;
        _action?: Element[] | undefined;
      
        action?: Array<undefined> | undefined;
        _action?: Element[] | undefined;
      
        cardinalityBehavior?: string | undefined;
        _cardinalityBehavior?: Element | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        condition?: Array<BackboneElement> | undefined;
        _condition?: Element[] | undefined;
      
        expression?: Expression | undefined;
        _expression?: Element | undefined;
      
        kind: string;
        _kind?: Element | undefined;
      
        definitionCanonical?: string | undefined;
        _definitionCanonical?: Element | undefined;
      
        definitionUri?: string | undefined;
        _definitionUri?: Element | undefined;
      
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
      
        groupingBehavior?: string | undefined;
        _groupingBehavior?: Element | undefined;
      
        input?: Array<BackboneElement> | undefined;
        _input?: Element[] | undefined;
      
        relatedData?: id | undefined;
        _relatedData?: Element | undefined;
      
        requirement?: DataRequirement | undefined;
        _requirement?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        linkId?: string | undefined;
        _linkId?: Element | undefined;
      
        location?: CodeableReference | undefined;
        _location?: Element | undefined;
      
        output?: Array<BackboneElement> | undefined;
        _output?: Element[] | undefined;
      
        relatedData?: string | undefined;
        _relatedData?: Element | undefined;
      
        requirement?: DataRequirement | undefined;
        _requirement?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        participant?: Array<BackboneElement> | undefined;
        _participant?: Element[] | undefined;
      
        actorId?: string | undefined;
        _actorId?: Element | undefined;
      
        function?: CodeableConcept | undefined;
        _function?: Element | undefined;
      
        role?: CodeableConcept | undefined;
        _role?: Element | undefined;
      
        type?: string | undefined;
        _type?: Element | undefined;
      
        typeCanonical?: string | undefined;
        _typeCanonical?: Element | undefined;
      
        typeReference?: Reference | undefined;
        _typeReference?: Element | undefined;
      
        precheckBehavior?: string | undefined;
        _precheckBehavior?: Element | undefined;
      
        prefix?: string | undefined;
        _prefix?: Element | undefined;
      
        priority?: string | undefined;
        _priority?: Element | undefined;
      
        reason?: Array<CodeableConcept> | undefined;
        _reason?: Element[] | undefined;
      
        relatedAction?: Array<BackboneElement> | undefined;
        _relatedAction?: Element[] | undefined;
      
        endRelationship?: string | undefined;
        _endRelationship?: Element | undefined;
      
        offsetDuration?: Duration | undefined;
        _offsetDuration?: Element | undefined;
      
        offsetRange?: Range | undefined;
        _offsetRange?: Element | undefined;
      
        relationship: string;
        _relationship?: Element | undefined;
      
        targetId: id;
        _targetId?: Element | undefined;
      
        requiredBehavior?: string | undefined;
        _requiredBehavior?: Element | undefined;
      
        selectionBehavior?: string | undefined;
        _selectionBehavior?: Element | undefined;
      
        subjectCanonical?: string | undefined;
        _subjectCanonical?: Element | undefined;
      
        subjectCodeableConcept?: CodeableConcept | undefined;
        _subjectCodeableConcept?: Element | undefined;
      
        subjectReference?: Reference | undefined;
        _subjectReference?: Element | undefined;
      
        textEquivalent?: string | undefined;
        _textEquivalent?: Element | undefined;
      
        timingAge?: Age | undefined;
        _timingAge?: Element | undefined;
      
        timingDuration?: Duration | undefined;
        _timingDuration?: Element | undefined;
      
        timingRange?: Range | undefined;
        _timingRange?: Element | undefined;
      
        timingTiming?: Timing | undefined;
        _timingTiming?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        transform?: string | undefined;
        _transform?: Element | undefined;
      
        trigger?: Array<TriggerDefinition> | undefined;
        _trigger?: Element[] | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        actor?: Array<BackboneElement> | undefined;
        _actor?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        option: Array<BackboneElement>;
        _option?: Element[] | undefined;
      
        role?: CodeableConcept | undefined;
        _role?: Element | undefined;
      
        type?: string | undefined;
        _type?: Element | undefined;
      
        typeCanonical?: string | undefined;
        _typeCanonical?: Element | undefined;
      
        typeReference?: Reference | undefined;
        _typeReference?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        asNeededBoolean?: boolean | undefined;
        _asNeededBoolean?: Element | undefined;
      
        asNeededCodeableConcept?: CodeableConcept | undefined;
        _asNeededCodeableConcept?: Element | undefined;
      
        author?: Array<ContactDetail> | undefined;
        _author?: Element[] | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
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
      
        detailBoolean?: boolean | undefined;
        _detailBoolean?: Element | undefined;
      
        detailCodeableConcept?: CodeableConcept | undefined;
        _detailCodeableConcept?: Element | undefined;
      
        detailInteger?: number | undefined;
        _detailInteger?: Element | undefined;
      
        detailQuantity?: Quantity | undefined;
        _detailQuantity?: Element | undefined;
      
        detailRange?: Range | undefined;
        _detailRange?: Element | undefined;
      
        detailRatio?: Ratio | undefined;
        _detailRatio?: Element | undefined;
      
        detailString?: string | undefined;
        _detailString?: Element | undefined;
      
        due?: Duration | undefined;
        _due?: Element | undefined;
      
        measure?: CodeableConcept | undefined;
        _measure?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        library?: Array<string> | undefined;
        _library?: Element[] | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        relatedArtifact?: Array<RelatedArtifact> | undefined;
        _relatedArtifact?: Element[] | undefined;
      
        reviewer?: Array<ContactDetail> | undefined;
        _reviewer?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subjectCanonical?: string | undefined;
        _subjectCanonical?: Element | undefined;
      
        subjectCodeableConcept?: CodeableConcept | undefined;
        _subjectCodeableConcept?: Element | undefined;
      
        subjectReference?: Reference | undefined;
        _subjectReference?: Element | undefined;
      
        subtitle?: string | undefined;
        _subtitle?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        topic?: Array<CodeableConcept> | undefined;
        _topic?: Element[] | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        usage?: string | undefined;
        _usage?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  


  
    /**
 * Practitioner
 * 
 * A person who is directly or indirectly involved in the provisioning of
 * healthcare or related services.
 * 
 * @see {@link http://hl7.org/fhir/R5/Practitioner.html}
 */
    export interface Practitioner extends DomainResource {
      
      readonly resourceType: "Practitioner";
      

      
        active?: boolean | undefined;
        _active?: Element | undefined;
      
        address?: Array<Address> | undefined;
        _address?: Element[] | undefined;
      
        birthDate?: string | undefined;
        _birthDate?: Element | undefined;
      
        communication?: Array<BackboneElement> | undefined;
        _communication?: Element[] | undefined;
      
        language: CodeableConcept;
        _language?: Element | undefined;
      
        preferred?: boolean | undefined;
        _preferred?: Element | undefined;
      
        deceasedBoolean?: boolean | undefined;
        _deceasedBoolean?: Element | undefined;
      
        deceasedDateTime?: string | undefined;
        _deceasedDateTime?: Element | undefined;
      
        gender?: string | undefined;
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
 * perform, or has performed at an organization during a period of time.
 * 
 * @see {@link http://hl7.org/fhir/R5/PractitionerRole.html}
 */
    export interface PractitionerRole extends DomainResource {
      
      readonly resourceType: "PractitionerRole";
      

      
        active?: boolean | undefined;
        _active?: Element | undefined;
      
        availability?: Array<Availability> | undefined;
        _availability?: Element[] | undefined;
      
        characteristic?: Array<CodeableConcept> | undefined;
        _characteristic?: Element[] | undefined;
      
        code?: Array<CodeableConcept> | undefined;
        _code?: Element[] | undefined;
      
        communication?: Array<CodeableConcept> | undefined;
        _communication?: Element[] | undefined;
      
        contact?: Array<ExtendedContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        endpoint?: Array<Reference> | undefined;
        _endpoint?: Element[] | undefined;
      
        healthcareService?: Array<Reference> | undefined;
        _healthcareService?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        location?: Array<Reference> | undefined;
        _location?: Element[] | undefined;
      
        organization?: Reference | undefined;
        _organization?: Element | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        practitioner?: Reference | undefined;
        _practitioner?: Element | undefined;
      
        specialty?: Array<CodeableConcept> | undefined;
        _specialty?: Element[] | undefined;
      
    }

  


  
    /**
 * PrimitiveType
 * 
 * PrimitiveType Type: The base type for all re-useable types defined that have a
 * simple property.
 * 
 * @see {@link http://hl7.org/fhir/R5/PrimitiveType.html}
 */
    export interface PrimitiveType extends DataType {
      
      readonly resourceType: string;
      

      
    }

  


  
    /**
 * Procedure
 * 
 * An action that is or was performed on or for a patient, practitioner, device,
 * organization, or location. For example, this can be a physical intervention on a
 * patient like an operation, or less invasive like long term services, counseling,
 * or hypnotherapy.  This can be a quality or safety inspection for a location,
 * organization, or device.  This can be an accreditation procedure on a
 * practitioner for licensing.
 * 
 * @see {@link http://hl7.org/fhir/R5/Procedure.html}
 */
    export interface Procedure extends DomainResource {
      
      readonly resourceType: "Procedure";
      

      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        bodySite?: Array<CodeableConcept> | undefined;
        _bodySite?: Element[] | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        complication?: Array<CodeableReference> | undefined;
        _complication?: Element[] | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        focalDevice?: Array<BackboneElement> | undefined;
        _focalDevice?: Element[] | undefined;
      
        action?: CodeableConcept | undefined;
        _action?: Element | undefined;
      
        manipulated: Reference;
        _manipulated?: Element | undefined;
      
        focus?: Reference | undefined;
        _focus?: Element | undefined;
      
        followUp?: Array<CodeableConcept> | undefined;
        _followUp?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        instantiatesCanonical?: Array<string> | undefined;
        _instantiatesCanonical?: Element[] | undefined;
      
        instantiatesUri?: Array<string> | undefined;
        _instantiatesUri?: Element[] | undefined;
      
        location?: Reference | undefined;
        _location?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        occurrenceAge?: Age | undefined;
        _occurrenceAge?: Element | undefined;
      
        occurrenceDateTime?: string | undefined;
        _occurrenceDateTime?: Element | undefined;
      
        occurrencePeriod?: Period | undefined;
        _occurrencePeriod?: Element | undefined;
      
        occurrenceRange?: Range | undefined;
        _occurrenceRange?: Element | undefined;
      
        occurrenceString?: string | undefined;
        _occurrenceString?: Element | undefined;
      
        occurrenceTiming?: Timing | undefined;
        _occurrenceTiming?: Element | undefined;
      
        outcome?: CodeableConcept | undefined;
        _outcome?: Element | undefined;
      
        partOf?: Array<Reference> | undefined;
        _partOf?: Element[] | undefined;
      
        performer?: Array<BackboneElement> | undefined;
        _performer?: Element[] | undefined;
      
        actor: Reference;
        _actor?: Element | undefined;
      
        function?: CodeableConcept | undefined;
        _function?: Element | undefined;
      
        onBehalfOf?: Reference | undefined;
        _onBehalfOf?: Element | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        recorded?: string | undefined;
        _recorded?: Element | undefined;
      
        recorder?: Reference | undefined;
        _recorder?: Element | undefined;
      
        report?: Array<Reference> | undefined;
        _report?: Element[] | undefined;
      
        reportedBoolean?: boolean | undefined;
        _reportedBoolean?: Element | undefined;
      
        reportedReference?: Reference | undefined;
        _reportedReference?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        statusReason?: CodeableConcept | undefined;
        _statusReason?: Element | undefined;
      
        subject: Reference;
        _subject?: Element | undefined;
      
        supportingInfo?: Array<Reference> | undefined;
        _supportingInfo?: Element[] | undefined;
      
        used?: Array<CodeableReference> | undefined;
        _used?: Element[] | undefined;
      
    }

  


  
    /**
 * Product
 * 
 * Logical Model: A pattern to be followed by resources that represent a product
 * used in healthcare, for clinical or operational purposes.
 * 
 * @see {@link http://hl7.org/fhir/R5/Product.html}
 */
    export interface Product extends Base {
      
      readonly resourceType: string;
      

      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        instance?: Element | undefined;
        _instance?: Element | undefined;
      
        expiry?: string | undefined;
        _expiry?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        lotNumber?: string | undefined;
        _lotNumber?: Element | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
        manufacturer?: Array<Reference> | undefined;
        _manufacturer?: Element[] | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
    }

  


  
    /**
 * ProductShelfLife
 * 
 * ProductShelfLife Type: The shelf-life and storage information for a medicinal
 * product item or container can be described using this class.
 * 
 * @see {@link http://hl7.org/fhir/R5/ProductShelfLife.html}
 */
    export interface ProductShelfLife extends BackboneType {
      
      readonly resourceType: string;
      

      
        periodDuration?: Duration | undefined;
        _periodDuration?: Element | undefined;
      
        periodString?: string | undefined;
        _periodString?: Element | undefined;
      
        specialPrecautionsForStorage?: Array<CodeableConcept> | undefined;
        _specialPrecautionsForStorage?: Element[] | undefined;
      
        type?: CodeableConcept | undefined;
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
 * @see {@link http://hl7.org/fhir/R5/Provenance.html}
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
      
        authorization?: Array<CodeableReference> | undefined;
        _authorization?: Element[] | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        entity?: Array<BackboneElement> | undefined;
        _entity?: Element[] | undefined;
      
        agent?: Array<undefined> | undefined;
        _agent?: Element[] | undefined;
      
        role: string;
        _role?: Element | undefined;
      
        what: Reference;
        _what?: Element | undefined;
      
        location?: Reference | undefined;
        _location?: Element | undefined;
      
        occurredDateTime?: string | undefined;
        _occurredDateTime?: Element | undefined;
      
        occurredPeriod?: Period | undefined;
        _occurredPeriod?: Element | undefined;
      
        patient?: Reference | undefined;
        _patient?: Element | undefined;
      
        policy?: Array<string> | undefined;
        _policy?: Element[] | undefined;
      
        recorded?: string | undefined;
        _recorded?: Element | undefined;
      
        signature?: Array<Signature> | undefined;
        _signature?: Element[] | undefined;
      
        target: Array<Reference>;
        _target?: Element[] | undefined;
      
    }

  


  


  
    /**
 * Publishable
 * 
 * Logical Model: A pattern to be followed by resources that represent a
 * publishable knowledge artifact such as a ValueSet, Profile, Library, Decision
 * Support Rule, or Quality Measure.
 * 
 * @see {@link http://hl7.org/fhir/R5/Publishable.html}
 */
    export interface Publishable extends Base {
      
      readonly resourceType: string;
      

      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        author?: Array<ContactDetail> | undefined;
        _author?: Element[] | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date: string;
        _date?: Element | undefined;
      
        editor?: Array<ContactDetail> | undefined;
        _editor?: Element[] | undefined;
      
        effectivePeriod?: Period | undefined;
        _effectivePeriod?: Element | undefined;
      
        endorser?: Array<ContactDetail> | undefined;
        _endorser?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        relatedArtifact?: Array<RelatedArtifact> | undefined;
        _relatedArtifact?: Element[] | undefined;
      
        reviewer?: Array<ContactDetail> | undefined;
        _reviewer?: Element[] | undefined;
      
        topic?: Array<CodeableConcept> | undefined;
        _topic?: Element[] | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
    }

  


  


  


  


  


  


  


  


  


  
    /**
 * Quantity
 * 
 * Quantity Type: A measured amount (or an amount that can potentially be
 * measured). Note that measured amounts include amounts that are not precisely
 * quantified, including amounts involving arbitrary units and floating currencies.
 * 
 * @see {@link http://hl7.org/fhir/R5/Quantity.html}
 */
    export interface Quantity extends DataType {
      
      readonly resourceType: string;
      

      
        code?: string | undefined;
        _code?: Element | undefined;
      
        comparator?: string | undefined;
        _comparator?: Element | undefined;
      
        system?: string | undefined;
        _system?: Element | undefined;
      
        unit?: string | undefined;
        _unit?: Element | undefined;
      
        value?: number | undefined;
        _value?: Element | undefined;
      
    }

  


  
    /**
 * Questionnaire
 * 
 * A structured set of questions intended to guide the collection of answers from
 * end-users. Questionnaires provide detailed control over order, presentation,
 * phraseology and grouping to allow coherent, consistent data collection.
 * 
 * @see {@link http://hl7.org/fhir/R5/Questionnaire.html}
 */
    export interface Questionnaire extends DomainResource {
      
      readonly resourceType: "Questionnaire";
      

      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        code?: Array<Coding> | undefined;
        _code?: Element[] | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        derivedFrom?: Array<string> | undefined;
        _derivedFrom?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        effectivePeriod?: Period | undefined;
        _effectivePeriod?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        item?: Array<BackboneElement> | undefined;
        _item?: Element[] | undefined;
      
        answerConstraint?: string | undefined;
        _answerConstraint?: Element | undefined;
      
        answerOption?: Array<BackboneElement> | undefined;
        _answerOption?: Element[] | undefined;
      
        initialSelected?: boolean | undefined;
        _initialSelected?: Element | undefined;
      
        valueCoding?: Coding | undefined;
        _valueCoding?: Element | undefined;
      
        valueDate?: string | undefined;
        _valueDate?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        valueTime?: time | undefined;
        _valueTime?: Element | undefined;
      
        answerValueSet?: string | undefined;
        _answerValueSet?: Element | undefined;
      
        code?: Array<Coding> | undefined;
        _code?: Element[] | undefined;
      
        definition?: string | undefined;
        _definition?: Element | undefined;
      
        disabledDisplay?: string | undefined;
        _disabledDisplay?: Element | undefined;
      
        enableBehavior?: string | undefined;
        _enableBehavior?: Element | undefined;
      
        enableWhen?: Array<BackboneElement> | undefined;
        _enableWhen?: Element[] | undefined;
      
        answerBoolean?: boolean | undefined;
        _answerBoolean?: Element | undefined;
      
        answerCoding?: Coding | undefined;
        _answerCoding?: Element | undefined;
      
        answerDate?: string | undefined;
        _answerDate?: Element | undefined;
      
        answerDateTime?: string | undefined;
        _answerDateTime?: Element | undefined;
      
        answerDecimal?: number | undefined;
        _answerDecimal?: Element | undefined;
      
        answerInteger?: number | undefined;
        _answerInteger?: Element | undefined;
      
        answerQuantity?: Quantity | undefined;
        _answerQuantity?: Element | undefined;
      
        answerReference?: Reference | undefined;
        _answerReference?: Element | undefined;
      
        answerString?: string | undefined;
        _answerString?: Element | undefined;
      
        answerTime?: time | undefined;
        _answerTime?: Element | undefined;
      
        operator: string;
        _operator?: Element | undefined;
      
        question: string;
        _question?: Element | undefined;
      
        initial?: Array<BackboneElement> | undefined;
        _initial?: Element[] | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCoding?: Coding | undefined;
        _valueCoding?: Element | undefined;
      
        valueDate?: string | undefined;
        _valueDate?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueDecimal?: number | undefined;
        _valueDecimal?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        valueTime?: time | undefined;
        _valueTime?: Element | undefined;
      
        valueUri?: string | undefined;
        _valueUri?: Element | undefined;
      
        item?: Array<undefined> | undefined;
        _item?: Element[] | undefined;
      
        linkId: string;
        _linkId?: Element | undefined;
      
        maxLength?: number | undefined;
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
      
        type: string;
        _type?: Element | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subjectType?: Array<string> | undefined;
        _subjectType?: Element[] | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * QuestionnaireResponse
 * 
 * A structured set of questions and their answers. The questions are ordered and
 * grouped into coherent subsets, corresponding to the structure of the grouping of
 * the questionnaire being responded to.
 * 
 * @see {@link http://hl7.org/fhir/R5/QuestionnaireResponse.html}
 */
    export interface QuestionnaireResponse extends DomainResource {
      
      readonly resourceType: "QuestionnaireResponse";
      

      
        author?: Reference | undefined;
        _author?: Element | undefined;
      
        authored?: string | undefined;
        _authored?: Element | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        item?: Array<BackboneElement> | undefined;
        _item?: Element[] | undefined;
      
        answer?: Array<BackboneElement> | undefined;
        _answer?: Element[] | undefined;
      
        item?: Array<undefined> | undefined;
        _item?: Element[] | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCoding?: Coding | undefined;
        _valueCoding?: Element | undefined;
      
        valueDate?: string | undefined;
        _valueDate?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueDecimal?: number | undefined;
        _valueDecimal?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        valueTime?: time | undefined;
        _valueTime?: Element | undefined;
      
        valueUri?: string | undefined;
        _valueUri?: Element | undefined;
      
        definition?: string | undefined;
        _definition?: Element | undefined;
      
        item?: Array<undefined> | undefined;
        _item?: Element[] | undefined;
      
        linkId: string;
        _linkId?: Element | undefined;
      
        text?: string | undefined;
        _text?: Element | undefined;
      
        partOf?: Array<Reference> | undefined;
        _partOf?: Element[] | undefined;
      
        questionnaire: string;
        _questionnaire?: Element | undefined;
      
        source?: Reference | undefined;
        _source?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
    }

  


  
    /**
 * Range
 * 
 * Range Type: A set of ordered Quantities defined by a low and high limit.
 * 
 * @see {@link http://hl7.org/fhir/R5/Range.html}
 */
    export interface Range extends DataType {
      
      readonly resourceType: string;
      

      
        high?: Quantity | undefined;
        _high?: Element | undefined;
      
        low?: Quantity | undefined;
        _low?: Element | undefined;
      
    }

  


  
    /**
 * Ratio
 * 
 * Ratio Type: A relationship of two Quantity values - expressed as a numerator and
 * a denominator.
 * 
 * @see {@link http://hl7.org/fhir/R5/Ratio.html}
 */
    export interface Ratio extends DataType {
      
      readonly resourceType: string;
      

      
        denominator?: Quantity | undefined;
        _denominator?: Element | undefined;
      
        numerator?: Quantity | undefined;
        _numerator?: Element | undefined;
      
    }

  


  
    /**
 * RatioRange
 * 
 * RatioRange Type: A range of ratios expressed as a low and high numerator and a
 * denominator.
 * 
 * @see {@link http://hl7.org/fhir/R5/RatioRange.html}
 */
    export interface RatioRange extends DataType {
      
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
 * Reference Type: A reference from one resource to another.
 * 
 * @see {@link http://hl7.org/fhir/R5/Reference.html}
 */
    export interface Reference extends DataType {
      
      readonly resourceType: string;
      

      
        display?: string | undefined;
        _display?: Element | undefined;
      
        identifier?: Identifier | undefined;
        _identifier?: Element | undefined;
      
        reference?: string | undefined;
        _reference?: Element | undefined;
      
        type?: string | undefined;
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
 * @see {@link http://hl7.org/fhir/R5/RegulatedAuthorization.html}
 */
    export interface RegulatedAuthorization extends DomainResource {
      
      readonly resourceType: "RegulatedAuthorization";
      

      
        attachedDocument?: Array<Reference> | undefined;
        _attachedDocument?: Element[] | undefined;
      
        basis?: Array<CodeableConcept> | undefined;
        _basis?: Element[] | undefined;
      
        case?: BackboneElement | undefined;
        _case?: Element | undefined;
      
        application?: Array<undefined> | undefined;
        _application?: Element[] | undefined;
      
        dateDateTime?: string | undefined;
        _dateDateTime?: Element | undefined;
      
        datePeriod?: Period | undefined;
        _datePeriod?: Element | undefined;
      
        identifier?: Identifier | undefined;
        _identifier?: Element | undefined;
      
        status?: CodeableConcept | undefined;
        _status?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        holder?: Reference | undefined;
        _holder?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        indication?: Array<CodeableReference> | undefined;
        _indication?: Element[] | undefined;
      
        intendedUse?: CodeableConcept | undefined;
        _intendedUse?: Element | undefined;
      
        region?: Array<CodeableConcept> | undefined;
        _region?: Element[] | undefined;
      
        regulator?: Reference | undefined;
        _regulator?: Element | undefined;
      
        status?: CodeableConcept | undefined;
        _status?: Element | undefined;
      
        statusDate?: string | undefined;
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
 * RelatedArtifact Type: Related artifacts such as additional documentation,
 * justification, or bibliographic references.
 * 
 * @see {@link http://hl7.org/fhir/R5/RelatedArtifact.html}
 */
    export interface RelatedArtifact extends DataType {
      
      readonly resourceType: string;
      

      
        citation?: string | undefined;
        _citation?: Element | undefined;
      
        classifier?: Array<CodeableConcept> | undefined;
        _classifier?: Element[] | undefined;
      
        display?: string | undefined;
        _display?: Element | undefined;
      
        document?: Attachment | undefined;
        _document?: Element | undefined;
      
        label?: string | undefined;
        _label?: Element | undefined;
      
        publicationDate?: string | undefined;
        _publicationDate?: Element | undefined;
      
        publicationStatus?: string | undefined;
        _publicationStatus?: Element | undefined;
      
        resource?: string | undefined;
        _resource?: Element | undefined;
      
        resourceReference?: Reference | undefined;
        _resourceReference?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
    }

  


  
    /**
 * RelatedPerson
 * 
 * Information about a person that is involved in a patient's health or the care
 * for a patient, but who is not the target of healthcare, nor has a formal
 * responsibility in the care process.
 * 
 * @see {@link http://hl7.org/fhir/R5/RelatedPerson.html}
 */
    export interface RelatedPerson extends DomainResource {
      
      readonly resourceType: "RelatedPerson";
      

      
        active?: boolean | undefined;
        _active?: Element | undefined;
      
        address?: Array<Address> | undefined;
        _address?: Element[] | undefined;
      
        birthDate?: string | undefined;
        _birthDate?: Element | undefined;
      
        communication?: Array<BackboneElement> | undefined;
        _communication?: Element[] | undefined;
      
        language: CodeableConcept;
        _language?: Element | undefined;
      
        preferred?: boolean | undefined;
        _preferred?: Element | undefined;
      
        gender?: string | undefined;
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
 * @see {@link http://hl7.org/fhir/R5/Request.html}
 */
    export interface Request extends Base {
      
      readonly resourceType: string;
      

      
        authoredOn?: string | undefined;
        _authoredOn?: Element | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        deliverTo?: Array<Reference> | undefined;
        _deliverTo?: Element[] | undefined;
      
        doNotPerform?: boolean | undefined;
        _doNotPerform?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        groupIdentifier?: Identifier | undefined;
        _groupIdentifier?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        insurance?: Array<Reference> | undefined;
        _insurance?: Element[] | undefined;
      
        intent: string;
        _intent?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        occurrenceDateTime?: string | undefined;
        _occurrenceDateTime?: Element | undefined;
      
        occurrencePeriod?: Period | undefined;
        _occurrencePeriod?: Element | undefined;
      
        occurrenceTiming?: Timing | undefined;
        _occurrenceTiming?: Element | undefined;
      
        performer?: Reference | undefined;
        _performer?: Element | undefined;
      
        performerType?: CodeableConcept | undefined;
        _performerType?: Element | undefined;
      
        priority?: string | undefined;
        _priority?: Element | undefined;
      
        product?: CodeableReference | undefined;
        _product?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        relevantHistory?: Array<Reference> | undefined;
        _relevantHistory?: Element[] | undefined;
      
        replaces?: Array<Reference> | undefined;
        _replaces?: Element[] | undefined;
      
        reportedBoolean?: boolean | undefined;
        _reportedBoolean?: Element | undefined;
      
        reportedReference?: Reference | undefined;
        _reportedReference?: Element | undefined;
      
        requester?: Reference | undefined;
        _requester?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        statusReason?: CodeableConcept | undefined;
        _statusReason?: Element | undefined;
      
        subject: Reference;
        _subject?: Element | undefined;
      
        supportingInfo?: Array<Reference> | undefined;
        _supportingInfo?: Element[] | undefined;
      
    }

  


  
    /**
 * RequestOrchestration
 * 
 * A set of related requests that can be used to capture intended activities that
 * have inter-dependencies such as "give this medication after that one".
 * 
 * @see {@link http://hl7.org/fhir/R5/RequestOrchestration.html}
 */
    export interface RequestOrchestration extends DomainResource {
      
      readonly resourceType: "RequestOrchestration";
      

      
        action?: Array<BackboneElement> | undefined;
        _action?: Element[] | undefined;
      
        action?: Array<undefined> | undefined;
        _action?: Element[] | undefined;
      
        cardinalityBehavior?: string | undefined;
        _cardinalityBehavior?: Element | undefined;
      
        code?: Array<CodeableConcept> | undefined;
        _code?: Element[] | undefined;
      
        condition?: Array<BackboneElement> | undefined;
        _condition?: Element[] | undefined;
      
        expression?: Expression | undefined;
        _expression?: Element | undefined;
      
        kind: string;
        _kind?: Element | undefined;
      
        definitionCanonical?: string | undefined;
        _definitionCanonical?: Element | undefined;
      
        definitionUri?: string | undefined;
        _definitionUri?: Element | undefined;
      
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
      
        goal?: Array<Reference> | undefined;
        _goal?: Element[] | undefined;
      
        groupingBehavior?: string | undefined;
        _groupingBehavior?: Element | undefined;
      
        input?: Array<BackboneElement> | undefined;
        _input?: Element[] | undefined;
      
        relatedData?: id | undefined;
        _relatedData?: Element | undefined;
      
        requirement?: DataRequirement | undefined;
        _requirement?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        linkId?: string | undefined;
        _linkId?: Element | undefined;
      
        location?: CodeableReference | undefined;
        _location?: Element | undefined;
      
        output?: Array<BackboneElement> | undefined;
        _output?: Element[] | undefined;
      
        relatedData?: string | undefined;
        _relatedData?: Element | undefined;
      
        requirement?: DataRequirement | undefined;
        _requirement?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        participant?: Array<BackboneElement> | undefined;
        _participant?: Element[] | undefined;
      
        actorCanonical?: string | undefined;
        _actorCanonical?: Element | undefined;
      
        actorReference?: Reference | undefined;
        _actorReference?: Element | undefined;
      
        function?: CodeableConcept | undefined;
        _function?: Element | undefined;
      
        role?: CodeableConcept | undefined;
        _role?: Element | undefined;
      
        type?: string | undefined;
        _type?: Element | undefined;
      
        typeCanonical?: string | undefined;
        _typeCanonical?: Element | undefined;
      
        typeReference?: Reference | undefined;
        _typeReference?: Element | undefined;
      
        precheckBehavior?: string | undefined;
        _precheckBehavior?: Element | undefined;
      
        prefix?: string | undefined;
        _prefix?: Element | undefined;
      
        priority?: string | undefined;
        _priority?: Element | undefined;
      
        relatedAction?: Array<BackboneElement> | undefined;
        _relatedAction?: Element[] | undefined;
      
        endRelationship?: string | undefined;
        _endRelationship?: Element | undefined;
      
        offsetDuration?: Duration | undefined;
        _offsetDuration?: Element | undefined;
      
        offsetRange?: Range | undefined;
        _offsetRange?: Element | undefined;
      
        relationship: string;
        _relationship?: Element | undefined;
      
        targetId: id;
        _targetId?: Element | undefined;
      
        requiredBehavior?: string | undefined;
        _requiredBehavior?: Element | undefined;
      
        resource?: Reference | undefined;
        _resource?: Element | undefined;
      
        selectionBehavior?: string | undefined;
        _selectionBehavior?: Element | undefined;
      
        textEquivalent?: string | undefined;
        _textEquivalent?: Element | undefined;
      
        timingAge?: Age | undefined;
        _timingAge?: Element | undefined;
      
        timingDateTime?: string | undefined;
        _timingDateTime?: Element | undefined;
      
        timingDuration?: Duration | undefined;
        _timingDuration?: Element | undefined;
      
        timingPeriod?: Period | undefined;
        _timingPeriod?: Element | undefined;
      
        timingRange?: Range | undefined;
        _timingRange?: Element | undefined;
      
        timingTiming?: Timing | undefined;
        _timingTiming?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        transform?: string | undefined;
        _transform?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        author?: Reference | undefined;
        _author?: Element | undefined;
      
        authoredOn?: string | undefined;
        _authoredOn?: Element | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        goal?: Array<Reference> | undefined;
        _goal?: Element[] | undefined;
      
        groupIdentifier?: Identifier | undefined;
        _groupIdentifier?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        instantiatesCanonical?: Array<string> | undefined;
        _instantiatesCanonical?: Element[] | undefined;
      
        instantiatesUri?: Array<string> | undefined;
        _instantiatesUri?: Element[] | undefined;
      
        intent: string;
        _intent?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        priority?: string | undefined;
        _priority?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        replaces?: Array<Reference> | undefined;
        _replaces?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject?: Reference | undefined;
        _subject?: Element | undefined;
      
    }

  


  
    /**
 * Requirements
 * 
 * The Requirements resource is used to describe an actor - a human or an
 * application that plays a role in data exchange, and that may have obligations
 * associated with the role the actor plays.
 * 
 * @see {@link http://hl7.org/fhir/R5/Requirements.html}
 */
    export interface Requirements extends DomainResource {
      
      readonly resourceType: "Requirements";
      

      
        actor?: Array<string> | undefined;
        _actor?: Element[] | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        derivedFrom?: Array<string> | undefined;
        _derivedFrom?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        reference?: Array<string> | undefined;
        _reference?: Element[] | undefined;
      
        statement?: Array<BackboneElement> | undefined;
        _statement?: Element[] | undefined;
      
        conditionality?: boolean | undefined;
        _conditionality?: Element | undefined;
      
        conformance?: Array<string> | undefined;
        _conformance?: Element[] | undefined;
      
        derivedFrom?: string | undefined;
        _derivedFrom?: Element | undefined;
      
        key: id;
        _key?: Element | undefined;
      
        label?: string | undefined;
        _label?: Element | undefined;
      
        parent?: string | undefined;
        _parent?: Element | undefined;
      
        reference?: Array<string> | undefined;
        _reference?: Element[] | undefined;
      
        requirement: string;
        _requirement?: Element | undefined;
      
        satisfiedBy?: Array<string> | undefined;
        _satisfiedBy?: Element[] | undefined;
      
        source?: Array<Reference> | undefined;
        _source?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * ResearchStudy
 * 
 * A scientific study of nature that sometimes includes processes involved in
 * health and disease. For example, clinical trials are research studies that
 * involve people. These studies may be related to new ways to screen, prevent,
 * diagnose, and treat disease. They may also study certain outcomes and certain
 * groups of people by looking at data collected in the past or future.
 * 
 * @see {@link http://hl7.org/fhir/R5/ResearchStudy.html}
 */
    export interface ResearchStudy extends DomainResource {
      
      readonly resourceType: "ResearchStudy";
      

      
        associatedParty?: Array<BackboneElement> | undefined;
        _associatedParty?: Element[] | undefined;
      
        classifier?: Array<CodeableConcept> | undefined;
        _classifier?: Element[] | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        party?: Reference | undefined;
        _party?: Element | undefined;
      
        period?: Array<Period> | undefined;
        _period?: Element[] | undefined;
      
        role: CodeableConcept;
        _role?: Element | undefined;
      
        classifier?: Array<CodeableConcept> | undefined;
        _classifier?: Element[] | undefined;
      
        comparisonGroup?: Array<BackboneElement> | undefined;
        _comparisonGroup?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        intendedExposure?: Array<Reference> | undefined;
        _intendedExposure?: Element[] | undefined;
      
        linkId?: id | undefined;
        _linkId?: Element | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        observedGroup?: Reference | undefined;
        _observedGroup?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        condition?: Array<CodeableConcept> | undefined;
        _condition?: Element[] | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        descriptionSummary?: string | undefined;
        _descriptionSummary?: Element | undefined;
      
        focus?: Array<CodeableReference> | undefined;
        _focus?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        keyword?: Array<CodeableConcept> | undefined;
        _keyword?: Element[] | undefined;
      
        label?: Array<BackboneElement> | undefined;
        _label?: Element[] | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        value?: string | undefined;
        _value?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        objective?: Array<BackboneElement> | undefined;
        _objective?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        outcomeMeasure?: Array<BackboneElement> | undefined;
        _outcomeMeasure?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        reference?: Reference | undefined;
        _reference?: Element | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
        partOf?: Array<Reference> | undefined;
        _partOf?: Element[] | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        phase?: CodeableConcept | undefined;
        _phase?: Element | undefined;
      
        primaryPurposeType?: CodeableConcept | undefined;
        _primaryPurposeType?: Element | undefined;
      
        progressStatus?: Array<BackboneElement> | undefined;
        _progressStatus?: Element[] | undefined;
      
        actual?: boolean | undefined;
        _actual?: Element | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        state: CodeableConcept;
        _state?: Element | undefined;
      
        protocol?: Array<Reference> | undefined;
        _protocol?: Element[] | undefined;
      
        recruitment?: BackboneElement | undefined;
        _recruitment?: Element | undefined;
      
        actualGroup?: Reference | undefined;
        _actualGroup?: Element | undefined;
      
        actualNumber?: unsignedInt | undefined;
        _actualNumber?: Element | undefined;
      
        eligibility?: Reference | undefined;
        _eligibility?: Element | undefined;
      
        targetNumber?: unsignedInt | undefined;
        _targetNumber?: Element | undefined;
      
        region?: Array<CodeableConcept> | undefined;
        _region?: Element[] | undefined;
      
        relatedArtifact?: Array<RelatedArtifact> | undefined;
        _relatedArtifact?: Element[] | undefined;
      
        result?: Array<Reference> | undefined;
        _result?: Element[] | undefined;
      
        site?: Array<Reference> | undefined;
        _site?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        studyDesign?: Array<CodeableConcept> | undefined;
        _studyDesign?: Element[] | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        whyStopped?: CodeableConcept | undefined;
        _whyStopped?: Element | undefined;
      
    }

  


  
    /**
 * ResearchSubject
 * 
 * A ResearchSubject is a participant or object which is the recipient of
 * investigative activities in a research study.
 * 
 * @see {@link http://hl7.org/fhir/R5/ResearchSubject.html}
 */
    export interface ResearchSubject extends DomainResource {
      
      readonly resourceType: "ResearchSubject";
      

      
        actualComparisonGroup?: id | undefined;
        _actualComparisonGroup?: Element | undefined;
      
        assignedComparisonGroup?: id | undefined;
        _assignedComparisonGroup?: Element | undefined;
      
        consent?: Array<Reference> | undefined;
        _consent?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        progress?: Array<BackboneElement> | undefined;
        _progress?: Element[] | undefined;
      
        endDate?: string | undefined;
        _endDate?: Element | undefined;
      
        milestone?: CodeableConcept | undefined;
        _milestone?: Element | undefined;
      
        reason?: CodeableConcept | undefined;
        _reason?: Element | undefined;
      
        startDate?: string | undefined;
        _startDate?: Element | undefined;
      
        subjectState?: CodeableConcept | undefined;
        _subjectState?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        study: Reference;
        _study?: Element | undefined;
      
        subject: Reference;
        _subject?: Element | undefined;
      
    }

  


  
    /**
 * Resource
 * 
 * This is the base resource type for everything.
 * 
 * @see {@link http://hl7.org/fhir/R5/Resource.html}
 */
    export interface Resource extends Base {
      
      readonly resourceType: string;
      

      
        id?: http://hl7.org/fhirpath/System.String | undefined;
        _id?: Element | undefined;
      
        implicitRules?: string | undefined;
        _implicitRules?: Element | undefined;
      
        language?: string | undefined;
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
 * @see {@link http://hl7.org/fhir/R5/RiskAssessment.html}
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
      
        occurrenceDateTime?: string | undefined;
        _occurrenceDateTime?: Element | undefined;
      
        occurrencePeriod?: Period | undefined;
        _occurrencePeriod?: Element | undefined;
      
        parent?: Reference | undefined;
        _parent?: Element | undefined;
      
        performer?: Reference | undefined;
        _performer?: Element | undefined;
      
        prediction?: Array<BackboneElement> | undefined;
        _prediction?: Element[] | undefined;
      
        outcome?: CodeableConcept | undefined;
        _outcome?: Element | undefined;
      
        probabilityDecimal?: number | undefined;
        _probabilityDecimal?: Element | undefined;
      
        probabilityRange?: Range | undefined;
        _probabilityRange?: Element | undefined;
      
        qualitativeRisk?: CodeableConcept | undefined;
        _qualitativeRisk?: Element | undefined;
      
        rationale?: string | undefined;
        _rationale?: Element | undefined;
      
        relativeRisk?: number | undefined;
        _relativeRisk?: Element | undefined;
      
        whenPeriod?: Period | undefined;
        _whenPeriod?: Element | undefined;
      
        whenRange?: Range | undefined;
        _whenRange?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subject: Reference;
        _subject?: Element | undefined;
      
    }

  


  
    /**
 * SampledData
 * 
 * SampledData Type: A series of measurements taken by a device, with upper and
 * lower limits. There may be more than one dimension in the data.
 * 
 * @see {@link http://hl7.org/fhir/R5/SampledData.html}
 */
    export interface SampledData extends DataType {
      
      readonly resourceType: string;
      

      
        codeMap?: string | undefined;
        _codeMap?: Element | undefined;
      
        data?: string | undefined;
        _data?: Element | undefined;
      
        dimensions: number;
        _dimensions?: Element | undefined;
      
        factor?: number | undefined;
        _factor?: Element | undefined;
      
        interval?: number | undefined;
        _interval?: Element | undefined;
      
        intervalUnit: string;
        _intervalUnit?: Element | undefined;
      
        lowerLimit?: number | undefined;
        _lowerLimit?: Element | undefined;
      
        offsets?: string | undefined;
        _offsets?: Element | undefined;
      
        origin: Quantity;
        _origin?: Element | undefined;
      
        upperLimit?: number | undefined;
        _upperLimit?: Element | undefined;
      
    }

  


  
    /**
 * Schedule
 * 
 * A container for slots of time that may be available for booking appointments.
 * 
 * @see {@link http://hl7.org/fhir/R5/Schedule.html}
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
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        planningHorizon?: Period | undefined;
        _planningHorizon?: Element | undefined;
      
        serviceCategory?: Array<CodeableConcept> | undefined;
        _serviceCategory?: Element[] | undefined;
      
        serviceType?: Array<CodeableReference> | undefined;
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
 * @see {@link http://hl7.org/fhir/R5/SearchParameter.html}
 */
    export interface SearchParameter extends DomainResource {
      
      readonly resourceType: "SearchParameter";
      

      
        base: Array<string>;
        _base?: Element[] | undefined;
      
        chain?: Array<string> | undefined;
        _chain?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        comparator?: Array<string> | undefined;
        _comparator?: Element[] | undefined;
      
        component?: Array<BackboneElement> | undefined;
        _component?: Element[] | undefined;
      
        definition: string;
        _definition?: Element | undefined;
      
        expression: string;
        _expression?: Element | undefined;
      
        constraint?: string | undefined;
        _constraint?: Element | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        derivedFrom?: string | undefined;
        _derivedFrom?: Element | undefined;
      
        description: string;
        _description?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        expression?: string | undefined;
        _expression?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        modifier?: Array<string> | undefined;
        _modifier?: Element[] | undefined;
      
        multipleAnd?: boolean | undefined;
        _multipleAnd?: Element | undefined;
      
        multipleOr?: boolean | undefined;
        _multipleOr?: Element | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        processingMode?: string | undefined;
        _processingMode?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        target?: Array<string> | undefined;
        _target?: Element[] | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        url: string;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  


  
    /**
 * ServiceRequest
 * 
 * A record of a request for service such as diagnostic investigations, treatments,
 * or operations to be performed.
 * 
 * @see {@link http://hl7.org/fhir/R5/ServiceRequest.html}
 */
    export interface ServiceRequest extends DomainResource {
      
      readonly resourceType: "ServiceRequest";
      

      
        asNeededBoolean?: boolean | undefined;
        _asNeededBoolean?: Element | undefined;
      
        asNeededCodeableConcept?: CodeableConcept | undefined;
        _asNeededCodeableConcept?: Element | undefined;
      
        authoredOn?: string | undefined;
        _authoredOn?: Element | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        bodySite?: Array<CodeableConcept> | undefined;
        _bodySite?: Element[] | undefined;
      
        bodyStructure?: Reference | undefined;
        _bodyStructure?: Element | undefined;
      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        code?: CodeableReference | undefined;
        _code?: Element | undefined;
      
        doNotPerform?: boolean | undefined;
        _doNotPerform?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        focus?: Array<Reference> | undefined;
        _focus?: Element[] | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        instantiatesCanonical?: Array<string> | undefined;
        _instantiatesCanonical?: Element[] | undefined;
      
        instantiatesUri?: Array<string> | undefined;
        _instantiatesUri?: Element[] | undefined;
      
        insurance?: Array<Reference> | undefined;
        _insurance?: Element[] | undefined;
      
        intent: string;
        _intent?: Element | undefined;
      
        location?: Array<CodeableReference> | undefined;
        _location?: Element[] | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        occurrenceDateTime?: string | undefined;
        _occurrenceDateTime?: Element | undefined;
      
        occurrencePeriod?: Period | undefined;
        _occurrencePeriod?: Element | undefined;
      
        occurrenceTiming?: Timing | undefined;
        _occurrenceTiming?: Element | undefined;
      
        orderDetail?: Array<BackboneElement> | undefined;
        _orderDetail?: Element[] | undefined;
      
        parameter: Array<BackboneElement>;
        _parameter?: Element[] | undefined;
      
        code: CodeableConcept;
        _code?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valuePeriod?: Period | undefined;
        _valuePeriod?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueRatio?: Ratio | undefined;
        _valueRatio?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        parameterFocus?: CodeableReference | undefined;
        _parameterFocus?: Element | undefined;
      
        patientInstruction?: Array<BackboneElement> | undefined;
        _patientInstruction?: Element[] | undefined;
      
        instructionMarkdown?: string | undefined;
        _instructionMarkdown?: Element | undefined;
      
        instructionReference?: Reference | undefined;
        _instructionReference?: Element | undefined;
      
        performer?: Array<Reference> | undefined;
        _performer?: Element[] | undefined;
      
        performerType?: CodeableConcept | undefined;
        _performerType?: Element | undefined;
      
        priority?: string | undefined;
        _priority?: Element | undefined;
      
        quantityQuantity?: Quantity | undefined;
        _quantityQuantity?: Element | undefined;
      
        quantityRange?: Range | undefined;
        _quantityRange?: Element | undefined;
      
        quantityRatio?: Ratio | undefined;
        _quantityRatio?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
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
      
        status: string;
        _status?: Element | undefined;
      
        subject: Reference;
        _subject?: Element | undefined;
      
        supportingInfo?: Array<CodeableReference> | undefined;
        _supportingInfo?: Element[] | undefined;
      
    }

  


  
    /**
 * Shareable
 * 
 * Logical Model: A pattern to be followed by [canonical
 * resources](canonicalresource.html) that meet minimal requirements for sharing
 * via registries or similar mechanisms.
 * 
 * @see {@link http://hl7.org/fhir/R5/Shareable.html}
 */
    export interface Shareable extends Base {
      
      readonly resourceType: string;
      

      
        description: string;
        _description?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        knowledgeRepresentationLevel?: Array<CodeableConcept> | undefined;
        _knowledgeRepresentationLevel?: Element[] | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        title: string;
        _title?: Element | undefined;
      
        url: string;
        _url?: Element | undefined;
      
        version: string;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  


  


  


  


  


  


  


  


  


  
    /**
 * Signature
 * 
 * Signature Type: A signature along with supporting context. The signature may be
 * a digital signature that is cryptographic in nature, or some other signature
 * acceptable to the domain. This other signature may be as simple as a graphical
 * image representing a hand-written signature, or a signature ceremony Different
 * signature approaches have different utilities.
 * 
 * @see {@link http://hl7.org/fhir/R5/Signature.html}
 */
    export interface Signature extends DataType {
      
      readonly resourceType: string;
      

      
        data?: string | undefined;
        _data?: Element | undefined;
      
        onBehalfOf?: Reference | undefined;
        _onBehalfOf?: Element | undefined;
      
        sigFormat?: string | undefined;
        _sigFormat?: Element | undefined;
      
        targetFormat?: string | undefined;
        _targetFormat?: Element | undefined;
      
        type?: Array<Coding> | undefined;
        _type?: Element[] | undefined;
      
        when?: string | undefined;
        _when?: Element | undefined;
      
        who?: Reference | undefined;
        _who?: Element | undefined;
      
    }

  


  


  
    /**
 * Slot
 * 
 * A slot of time on a schedule that may be available for booking appointments.
 * 
 * @see {@link http://hl7.org/fhir/R5/Slot.html}
 */
    export interface Slot extends DomainResource {
      
      readonly resourceType: "Slot";
      

      
        appointmentType?: Array<CodeableConcept> | undefined;
        _appointmentType?: Element[] | undefined;
      
        comment?: string | undefined;
        _comment?: Element | undefined;
      
        end: string;
        _end?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        overbooked?: boolean | undefined;
        _overbooked?: Element | undefined;
      
        schedule: Reference;
        _schedule?: Element | undefined;
      
        serviceCategory?: Array<CodeableConcept> | undefined;
        _serviceCategory?: Element[] | undefined;
      
        serviceType?: Array<CodeableReference> | undefined;
        _serviceType?: Element[] | undefined;
      
        specialty?: Array<CodeableConcept> | undefined;
        _specialty?: Element[] | undefined;
      
        start: string;
        _start?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
    }

  


  
    /**
 * Specimen
 * 
 * A sample to be used for analysis.
 * 
 * @see {@link http://hl7.org/fhir/R5/Specimen.html}
 */
    export interface Specimen extends DomainResource {
      
      readonly resourceType: "Specimen";
      

      
        accessionIdentifier?: Identifier | undefined;
        _accessionIdentifier?: Element | undefined;
      
        collection?: BackboneElement | undefined;
        _collection?: Element | undefined;
      
        bodySite?: CodeableReference | undefined;
        _bodySite?: Element | undefined;
      
        collectedDateTime?: string | undefined;
        _collectedDateTime?: Element | undefined;
      
        collectedPeriod?: Period | undefined;
        _collectedPeriod?: Element | undefined;
      
        collector?: Reference | undefined;
        _collector?: Element | undefined;
      
        device?: CodeableReference | undefined;
        _device?: Element | undefined;
      
        duration?: Duration | undefined;
        _duration?: Element | undefined;
      
        fastingStatusCodeableConcept?: CodeableConcept | undefined;
        _fastingStatusCodeableConcept?: Element | undefined;
      
        fastingStatusDuration?: Duration | undefined;
        _fastingStatusDuration?: Element | undefined;
      
        method?: CodeableConcept | undefined;
        _method?: Element | undefined;
      
        procedure?: Reference | undefined;
        _procedure?: Element | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        combined?: string | undefined;
        _combined?: Element | undefined;
      
        condition?: Array<CodeableConcept> | undefined;
        _condition?: Element[] | undefined;
      
        container?: Array<BackboneElement> | undefined;
        _container?: Element[] | undefined;
      
        device: Reference;
        _device?: Element | undefined;
      
        location?: Reference | undefined;
        _location?: Element | undefined;
      
        specimenQuantity?: Quantity | undefined;
        _specimenQuantity?: Element | undefined;
      
        feature?: Array<BackboneElement> | undefined;
        _feature?: Element[] | undefined;
      
        description: string;
        _description?: Element | undefined;
      
        type: CodeableConcept;
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
      
        method?: CodeableConcept | undefined;
        _method?: Element | undefined;
      
        timeDateTime?: string | undefined;
        _timeDateTime?: Element | undefined;
      
        timePeriod?: Period | undefined;
        _timePeriod?: Element | undefined;
      
        receivedTime?: string | undefined;
        _receivedTime?: Element | undefined;
      
        request?: Array<Reference> | undefined;
        _request?: Element[] | undefined;
      
        role?: Array<CodeableConcept> | undefined;
        _role?: Element[] | undefined;
      
        status?: string | undefined;
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
 * @see {@link http://hl7.org/fhir/R5/SpecimenDefinition.html}
 */
    export interface SpecimenDefinition extends DomainResource {
      
      readonly resourceType: "SpecimenDefinition";
      

      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        collection?: Array<CodeableConcept> | undefined;
        _collection?: Element[] | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        derivedFromCanonical?: Array<string> | undefined;
        _derivedFromCanonical?: Element[] | undefined;
      
        derivedFromUri?: Array<string> | undefined;
        _derivedFromUri?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        effectivePeriod?: Period | undefined;
        _effectivePeriod?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        identifier?: Identifier | undefined;
        _identifier?: Element | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        patientPreparation?: Array<CodeableConcept> | undefined;
        _patientPreparation?: Element[] | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        subjectCodeableConcept?: CodeableConcept | undefined;
        _subjectCodeableConcept?: Element | undefined;
      
        subjectReference?: Reference | undefined;
        _subjectReference?: Element | undefined;
      
        timeAspect?: string | undefined;
        _timeAspect?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        typeCollected?: CodeableConcept | undefined;
        _typeCollected?: Element | undefined;
      
        typeTested?: Array<BackboneElement> | undefined;
        _typeTested?: Element[] | undefined;
      
        container?: BackboneElement | undefined;
        _container?: Element | undefined;
      
        additive?: Array<BackboneElement> | undefined;
        _additive?: Element[] | undefined;
      
        additiveCodeableConcept?: CodeableConcept | undefined;
        _additiveCodeableConcept?: Element | undefined;
      
        additiveReference?: Reference | undefined;
        _additiveReference?: Element | undefined;
      
        cap?: CodeableConcept | undefined;
        _cap?: Element | undefined;
      
        capacity?: Quantity | undefined;
        _capacity?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        material?: CodeableConcept | undefined;
        _material?: Element | undefined;
      
        minimumVolumeQuantity?: Quantity | undefined;
        _minimumVolumeQuantity?: Element | undefined;
      
        minimumVolumeString?: string | undefined;
        _minimumVolumeString?: Element | undefined;
      
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
      
        preference: string;
        _preference?: Element | undefined;
      
        rejectionCriterion?: Array<CodeableConcept> | undefined;
        _rejectionCriterion?: Element[] | undefined;
      
        requirement?: string | undefined;
        _requirement?: Element | undefined;
      
        retentionTime?: Duration | undefined;
        _retentionTime?: Element | undefined;
      
        singleUse?: boolean | undefined;
        _singleUse?: Element | undefined;
      
        testingDestination?: Array<CodeableConcept> | undefined;
        _testingDestination?: Element[] | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  


  
    /**
 * StructureDefinition
 * 
 * A definition of a FHIR structure. This resource is used to describe the
 * underlying resources, data types defined in FHIR, and also for describing
 * extensions and constraints on resources and data types.
 * 
 * @see {@link http://hl7.org/fhir/R5/StructureDefinition.html}
 */
    export interface StructureDefinition extends DomainResource {
      
      readonly resourceType: "StructureDefinition";
      

      
        abstract: boolean;
        _abstract?: Element | undefined;
      
        baseDefinition?: string | undefined;
        _baseDefinition?: Element | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        context?: Array<BackboneElement> | undefined;
        _context?: Element[] | undefined;
      
        expression: string;
        _expression?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        contextInvariant?: Array<string> | undefined;
        _contextInvariant?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        derivation?: string | undefined;
        _derivation?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        differential?: BackboneElement | undefined;
        _differential?: Element | undefined;
      
        element: Array<ElementDefinition>;
        _element?: Element[] | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        fhirVersion?: string | undefined;
        _fhirVersion?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        keyword?: Array<Coding> | undefined;
        _keyword?: Element[] | undefined;
      
        kind: string;
        _kind?: Element | undefined;
      
        mapping?: Array<BackboneElement> | undefined;
        _mapping?: Element[] | undefined;
      
        comment?: string | undefined;
        _comment?: Element | undefined;
      
        identity: id;
        _identity?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        uri?: string | undefined;
        _uri?: Element | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        snapshot?: BackboneElement | undefined;
        _snapshot?: Element | undefined;
      
        element: Array<ElementDefinition>;
        _element?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        url: string;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * StructureMap
 * 
 * A Map of relationships between 2 structures that can be used to transform data.
 * 
 * @see {@link http://hl7.org/fhir/R5/StructureMap.html}
 */
    export interface StructureMap extends DomainResource {
      
      readonly resourceType: "StructureMap";
      

      
        const?: Array<BackboneElement> | undefined;
        _const?: Element[] | undefined;
      
        name?: id | undefined;
        _name?: Element | undefined;
      
        value?: string | undefined;
        _value?: Element | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
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
      
        mode: string;
        _mode?: Element | undefined;
      
        name: id;
        _name?: Element | undefined;
      
        type?: string | undefined;
        _type?: Element | undefined;
      
        name: id;
        _name?: Element | undefined;
      
        rule?: Array<BackboneElement> | undefined;
        _rule?: Element[] | undefined;
      
        dependent?: Array<BackboneElement> | undefined;
        _dependent?: Element[] | undefined;
      
        name: id;
        _name?: Element | undefined;
      
        parameter: Array<undefined>;
        _parameter?: Element[] | undefined;
      
        documentation?: string | undefined;
        _documentation?: Element | undefined;
      
        name?: id | undefined;
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
      
        defaultValue?: string | undefined;
        _defaultValue?: Element | undefined;
      
        element?: string | undefined;
        _element?: Element | undefined;
      
        listMode?: string | undefined;
        _listMode?: Element | undefined;
      
        logMessage?: string | undefined;
        _logMessage?: Element | undefined;
      
        max?: string | undefined;
        _max?: Element | undefined;
      
        min?: number | undefined;
        _min?: Element | undefined;
      
        type?: string | undefined;
        _type?: Element | undefined;
      
        variable?: id | undefined;
        _variable?: Element | undefined;
      
        target?: Array<BackboneElement> | undefined;
        _target?: Element[] | undefined;
      
        context?: string | undefined;
        _context?: Element | undefined;
      
        element?: string | undefined;
        _element?: Element | undefined;
      
        listMode?: Array<string> | undefined;
        _listMode?: Element[] | undefined;
      
        listRuleId?: id | undefined;
        _listRuleId?: Element | undefined;
      
        parameter?: Array<BackboneElement> | undefined;
        _parameter?: Element[] | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueDate?: string | undefined;
        _valueDate?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueDecimal?: number | undefined;
        _valueDecimal?: Element | undefined;
      
        valueId?: id | undefined;
        _valueId?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        valueTime?: time | undefined;
        _valueTime?: Element | undefined;
      
        transform?: string | undefined;
        _transform?: Element | undefined;
      
        variable?: id | undefined;
        _variable?: Element | undefined;
      
        typeMode?: string | undefined;
        _typeMode?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        import?: Array<string> | undefined;
        _import?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        structure?: Array<BackboneElement> | undefined;
        _structure?: Element[] | undefined;
      
        alias?: string | undefined;
        _alias?: Element | undefined;
      
        documentation?: string | undefined;
        _documentation?: Element | undefined;
      
        mode: string;
        _mode?: Element | undefined;
      
        url: string;
        _url?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url: string;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * Subscription
 * 
 * The subscription resource describes a particular client's request to be notified
 * about a SubscriptionTopic.
 * 
 * @see {@link http://hl7.org/fhir/R5/Subscription.html}
 */
    export interface Subscription extends DomainResource {
      
      readonly resourceType: "Subscription";
      

      
        channelType: Coding;
        _channelType?: Element | undefined;
      
        contact?: Array<ContactPoint> | undefined;
        _contact?: Element[] | undefined;
      
        content?: string | undefined;
        _content?: Element | undefined;
      
        contentType?: string | undefined;
        _contentType?: Element | undefined;
      
        end?: string | undefined;
        _end?: Element | undefined;
      
        endpoint?: string | undefined;
        _endpoint?: Element | undefined;
      
        filterBy?: Array<BackboneElement> | undefined;
        _filterBy?: Element[] | undefined;
      
        comparator?: string | undefined;
        _comparator?: Element | undefined;
      
        filterParameter: string;
        _filterParameter?: Element | undefined;
      
        modifier?: string | undefined;
        _modifier?: Element | undefined;
      
        resourceType?: string | undefined;
        _resourceType?: Element | undefined;
      
        value: string;
        _value?: Element | undefined;
      
        heartbeatPeriod?: unsignedInt | undefined;
        _heartbeatPeriod?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        managingEntity?: Reference | undefined;
        _managingEntity?: Element | undefined;
      
        maxCount?: number | undefined;
        _maxCount?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        parameter?: Array<BackboneElement> | undefined;
        _parameter?: Element[] | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        value: string;
        _value?: Element | undefined;
      
        reason?: string | undefined;
        _reason?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        timeout?: unsignedInt | undefined;
        _timeout?: Element | undefined;
      
        topic: string;
        _topic?: Element | undefined;
      
    }

  


  


  
    /**
 * SubscriptionStatus
 * 
 * The SubscriptionStatus resource describes the state of a Subscription during
 * notifications. It is not persisted.
 * 
 * @see {@link http://hl7.org/fhir/R5/SubscriptionStatus.html}
 */
    export interface SubscriptionStatus extends DomainResource {
      
      readonly resourceType: "SubscriptionStatus";
      

      
        error?: Array<CodeableConcept> | undefined;
        _error?: Element[] | undefined;
      
        eventsSinceSubscriptionStart?: integer64 | undefined;
        _eventsSinceSubscriptionStart?: Element | undefined;
      
        notificationEvent?: Array<BackboneElement> | undefined;
        _notificationEvent?: Element[] | undefined;
      
        additionalContext?: Array<Reference> | undefined;
        _additionalContext?: Element[] | undefined;
      
        eventNumber: integer64;
        _eventNumber?: Element | undefined;
      
        focus?: Reference | undefined;
        _focus?: Element | undefined;
      
        timestamp?: string | undefined;
        _timestamp?: Element | undefined;
      
        status?: string | undefined;
        _status?: Element | undefined;
      
        subscription: Reference;
        _subscription?: Element | undefined;
      
        topic?: string | undefined;
        _topic?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
    }

  


  
    /**
 * SubscriptionTopic
 * 
 * Describes a stream of resource state changes identified by trigger criteria and
 * annotated with labels useful to filter projections from this topic.
 * 
 * @see {@link http://hl7.org/fhir/R5/SubscriptionTopic.html}
 */
    export interface SubscriptionTopic extends DomainResource {
      
      readonly resourceType: "SubscriptionTopic";
      

      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        canFilterBy?: Array<BackboneElement> | undefined;
        _canFilterBy?: Element[] | undefined;
      
        comparator?: Array<string> | undefined;
        _comparator?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        filterDefinition?: string | undefined;
        _filterDefinition?: Element | undefined;
      
        filterParameter: string;
        _filterParameter?: Element | undefined;
      
        modifier?: Array<string> | undefined;
        _modifier?: Element[] | undefined;
      
        resource?: string | undefined;
        _resource?: Element | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        derivedFrom?: Array<string> | undefined;
        _derivedFrom?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        effectivePeriod?: Period | undefined;
        _effectivePeriod?: Element | undefined;
      
        eventTrigger?: Array<BackboneElement> | undefined;
        _eventTrigger?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        event: CodeableConcept;
        _event?: Element | undefined;
      
        resource: string;
        _resource?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        notificationShape?: Array<BackboneElement> | undefined;
        _notificationShape?: Element[] | undefined;
      
        include?: Array<string> | undefined;
        _include?: Element[] | undefined;
      
        resource: string;
        _resource?: Element | undefined;
      
        revInclude?: Array<string> | undefined;
        _revInclude?: Element[] | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        resourceTrigger?: Array<BackboneElement> | undefined;
        _resourceTrigger?: Element[] | undefined;
      
        description?: string | undefined;
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
      
        resultForCreate?: string | undefined;
        _resultForCreate?: Element | undefined;
      
        resultForDelete?: string | undefined;
        _resultForDelete?: Element | undefined;
      
        resource: string;
        _resource?: Element | undefined;
      
        supportedInteraction?: Array<string> | undefined;
        _supportedInteraction?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url: string;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * Substance
 * 
 * A homogeneous material with a definite composition.
 * 
 * @see {@link http://hl7.org/fhir/R5/Substance.html}
 */
    export interface Substance extends DomainResource {
      
      readonly resourceType: "Substance";
      

      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        code: CodeableReference;
        _code?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        expiry?: string | undefined;
        _expiry?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        ingredient?: Array<BackboneElement> | undefined;
        _ingredient?: Element[] | undefined;
      
        quantity?: Ratio | undefined;
        _quantity?: Element | undefined;
      
        substanceCodeableConcept?: CodeableConcept | undefined;
        _substanceCodeableConcept?: Element | undefined;
      
        substanceReference?: Reference | undefined;
        _substanceReference?: Element | undefined;
      
        instance: boolean;
        _instance?: Element | undefined;
      
        quantity?: Quantity | undefined;
        _quantity?: Element | undefined;
      
        status?: string | undefined;
        _status?: Element | undefined;
      
    }

  


  
    /**
 * SubstanceDefinition
 * 
 * The detailed description of a substance, typically at a level beyond what is
 * used for prescribing.
 * 
 * @see {@link http://hl7.org/fhir/R5/SubstanceDefinition.html}
 */
    export interface SubstanceDefinition extends DomainResource {
      
      readonly resourceType: "SubstanceDefinition";
      

      
        characterization?: Array<BackboneElement> | undefined;
        _characterization?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        file?: Array<Attachment> | undefined;
        _file?: Element[] | undefined;
      
        form?: CodeableConcept | undefined;
        _form?: Element | undefined;
      
        technique?: CodeableConcept | undefined;
        _technique?: Element | undefined;
      
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
      
        statusDate?: string | undefined;
        _statusDate?: Element | undefined;
      
        description?: string | undefined;
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
      
        amountQuantity?: Quantity | undefined;
        _amountQuantity?: Element | undefined;
      
        amountString?: string | undefined;
        _amountString?: Element | undefined;
      
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
      
        date?: string | undefined;
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
      
        nucleicAcid?: Reference | undefined;
        _nucleicAcid?: Element | undefined;
      
        polymer?: Reference | undefined;
        _polymer?: Element | undefined;
      
        property?: Array<BackboneElement> | undefined;
        _property?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueDate?: string | undefined;
        _valueDate?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        protein?: Reference | undefined;
        _protein?: Element | undefined;
      
        referenceInformation?: Reference | undefined;
        _referenceInformation?: Element | undefined;
      
        relationship?: Array<BackboneElement> | undefined;
        _relationship?: Element[] | undefined;
      
        amountQuantity?: Quantity | undefined;
        _amountQuantity?: Element | undefined;
      
        amountRatio?: Ratio | undefined;
        _amountRatio?: Element | undefined;
      
        amountString?: string | undefined;
        _amountString?: Element | undefined;
      
        comparator?: CodeableConcept | undefined;
        _comparator?: Element | undefined;
      
        isDefining?: boolean | undefined;
        _isDefining?: Element | undefined;
      
        ratioHighLimitAmount?: Ratio | undefined;
        _ratioHighLimitAmount?: Element | undefined;
      
        source?: Array<Reference> | undefined;
        _source?: Element[] | undefined;
      
        substanceDefinitionCodeableConcept?: CodeableConcept | undefined;
        _substanceDefinitionCodeableConcept?: Element | undefined;
      
        substanceDefinitionReference?: Reference | undefined;
        _substanceDefinitionReference?: Element | undefined;
      
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
 * SubstanceNucleicAcid
 * 
 * Nucleic acids are defined by three distinct elements: the base, sugar and
 * linkage. Individual substance/moiety IDs will be created for each of these
 * elements. The nucleotide sequence will be always entered in the 5’-3’ direction.
 * 
 * @see {@link http://hl7.org/fhir/R5/SubstanceNucleicAcid.html}
 */
    export interface SubstanceNucleicAcid extends DomainResource {
      
      readonly resourceType: "SubstanceNucleicAcid";
      

      
        areaOfHybridisation?: string | undefined;
        _areaOfHybridisation?: Element | undefined;
      
        numberOfSubunits?: number | undefined;
        _numberOfSubunits?: Element | undefined;
      
        oligoNucleotideType?: CodeableConcept | undefined;
        _oligoNucleotideType?: Element | undefined;
      
        sequenceType?: CodeableConcept | undefined;
        _sequenceType?: Element | undefined;
      
        subunit?: Array<BackboneElement> | undefined;
        _subunit?: Element[] | undefined;
      
        fivePrime?: CodeableConcept | undefined;
        _fivePrime?: Element | undefined;
      
        length?: number | undefined;
        _length?: Element | undefined;
      
        linkage?: Array<BackboneElement> | undefined;
        _linkage?: Element[] | undefined;
      
        connectivity?: string | undefined;
        _connectivity?: Element | undefined;
      
        identifier?: Identifier | undefined;
        _identifier?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        residueSite?: string | undefined;
        _residueSite?: Element | undefined;
      
        sequence?: string | undefined;
        _sequence?: Element | undefined;
      
        sequenceAttachment?: Attachment | undefined;
        _sequenceAttachment?: Element | undefined;
      
        subunit?: number | undefined;
        _subunit?: Element | undefined;
      
        sugar?: Array<BackboneElement> | undefined;
        _sugar?: Element[] | undefined;
      
        identifier?: Identifier | undefined;
        _identifier?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        residueSite?: string | undefined;
        _residueSite?: Element | undefined;
      
        threePrime?: CodeableConcept | undefined;
        _threePrime?: Element | undefined;
      
    }

  


  
    /**
 * SubstancePolymer
 * 
 * Properties of a substance specific to it being a polymer.
 * 
 * @see {@link http://hl7.org/fhir/R5/SubstancePolymer.html}
 */
    export interface SubstancePolymer extends DomainResource {
      
      readonly resourceType: "SubstancePolymer";
      

      
        class?: CodeableConcept | undefined;
        _class?: Element | undefined;
      
        copolymerConnectivity?: Array<CodeableConcept> | undefined;
        _copolymerConnectivity?: Element[] | undefined;
      
        geometry?: CodeableConcept | undefined;
        _geometry?: Element | undefined;
      
        identifier?: Identifier | undefined;
        _identifier?: Element | undefined;
      
        modification?: string | undefined;
        _modification?: Element | undefined;
      
        monomerSet?: Array<BackboneElement> | undefined;
        _monomerSet?: Element[] | undefined;
      
        ratioType?: CodeableConcept | undefined;
        _ratioType?: Element | undefined;
      
        startingMaterial?: Array<BackboneElement> | undefined;
        _startingMaterial?: Element[] | undefined;
      
        amount?: Quantity | undefined;
        _amount?: Element | undefined;
      
        category?: CodeableConcept | undefined;
        _category?: Element | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        isDefining?: boolean | undefined;
        _isDefining?: Element | undefined;
      
        repeat?: Array<BackboneElement> | undefined;
        _repeat?: Element[] | undefined;
      
        averageMolecularFormula?: string | undefined;
        _averageMolecularFormula?: Element | undefined;
      
        repeatUnit?: Array<BackboneElement> | undefined;
        _repeatUnit?: Element[] | undefined;
      
        amount?: number | undefined;
        _amount?: Element | undefined;
      
        degreeOfPolymerisation?: Array<BackboneElement> | undefined;
        _degreeOfPolymerisation?: Element[] | undefined;
      
        average?: number | undefined;
        _average?: Element | undefined;
      
        high?: number | undefined;
        _high?: Element | undefined;
      
        low?: number | undefined;
        _low?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        orientation?: CodeableConcept | undefined;
        _orientation?: Element | undefined;
      
        structuralRepresentation?: Array<BackboneElement> | undefined;
        _structuralRepresentation?: Element[] | undefined;
      
        attachment?: Attachment | undefined;
        _attachment?: Element | undefined;
      
        format?: CodeableConcept | undefined;
        _format?: Element | undefined;
      
        representation?: string | undefined;
        _representation?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        unit?: string | undefined;
        _unit?: Element | undefined;
      
        repeatUnitAmountType?: CodeableConcept | undefined;
        _repeatUnitAmountType?: Element | undefined;
      
    }

  


  
    /**
 * SubstanceProtein
 * 
 * A SubstanceProtein is defined as a single unit of a linear amino acid sequence,
 * or a combination of subunits that are either covalently linked or have a defined
 * invariant stoichiometric relationship. This includes all synthetic, recombinant
 * and purified SubstanceProteins of defined sequence, whether the use is
 * therapeutic or prophylactic. This set of elements will be used to describe
 * albumins, coagulation factors, cytokines, growth factors,
 * peptide/SubstanceProtein hormones, enzymes, toxins, toxoids, recombinant
 * vaccines, and immunomodulators.
 * 
 * @see {@link http://hl7.org/fhir/R5/SubstanceProtein.html}
 */
    export interface SubstanceProtein extends DomainResource {
      
      readonly resourceType: "SubstanceProtein";
      

      
        disulfideLinkage?: Array<string> | undefined;
        _disulfideLinkage?: Element[] | undefined;
      
        numberOfSubunits?: number | undefined;
        _numberOfSubunits?: Element | undefined;
      
        sequenceType?: CodeableConcept | undefined;
        _sequenceType?: Element | undefined;
      
        subunit?: Array<BackboneElement> | undefined;
        _subunit?: Element[] | undefined;
      
        cTerminalModification?: string | undefined;
        _cTerminalModification?: Element | undefined;
      
        cTerminalModificationId?: Identifier | undefined;
        _cTerminalModificationId?: Element | undefined;
      
        length?: number | undefined;
        _length?: Element | undefined;
      
        nTerminalModification?: string | undefined;
        _nTerminalModification?: Element | undefined;
      
        nTerminalModificationId?: Identifier | undefined;
        _nTerminalModificationId?: Element | undefined;
      
        sequence?: string | undefined;
        _sequence?: Element | undefined;
      
        sequenceAttachment?: Attachment | undefined;
        _sequenceAttachment?: Element | undefined;
      
        subunit?: number | undefined;
        _subunit?: Element | undefined;
      
    }

  


  
    /**
 * SubstanceReferenceInformation
 * 
 * Todo.
 * 
 * @see {@link http://hl7.org/fhir/R5/SubstanceReferenceInformation.html}
 */
    export interface SubstanceReferenceInformation extends DomainResource {
      
      readonly resourceType: "SubstanceReferenceInformation";
      

      
        comment?: string | undefined;
        _comment?: Element | undefined;
      
        gene?: Array<BackboneElement> | undefined;
        _gene?: Element[] | undefined;
      
        gene?: CodeableConcept | undefined;
        _gene?: Element | undefined;
      
        geneSequenceOrigin?: CodeableConcept | undefined;
        _geneSequenceOrigin?: Element | undefined;
      
        source?: Array<Reference> | undefined;
        _source?: Element[] | undefined;
      
        geneElement?: Array<BackboneElement> | undefined;
        _geneElement?: Element[] | undefined;
      
        element?: Identifier | undefined;
        _element?: Element | undefined;
      
        source?: Array<Reference> | undefined;
        _source?: Element[] | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
        target?: Array<BackboneElement> | undefined;
        _target?: Element[] | undefined;
      
        amountQuantity?: Quantity | undefined;
        _amountQuantity?: Element | undefined;
      
        amountRange?: Range | undefined;
        _amountRange?: Element | undefined;
      
        amountString?: string | undefined;
        _amountString?: Element | undefined;
      
        amountType?: CodeableConcept | undefined;
        _amountType?: Element | undefined;
      
        interaction?: CodeableConcept | undefined;
        _interaction?: Element | undefined;
      
        organism?: CodeableConcept | undefined;
        _organism?: Element | undefined;
      
        organismType?: CodeableConcept | undefined;
        _organismType?: Element | undefined;
      
        source?: Array<Reference> | undefined;
        _source?: Element[] | undefined;
      
        target?: Identifier | undefined;
        _target?: Element | undefined;
      
        type?: CodeableConcept | undefined;
        _type?: Element | undefined;
      
    }

  


  
    /**
 * SubstanceSourceMaterial
 * 
 * Source material shall capture information on the taxonomic and anatomical
 * origins as well as the fraction of a material that can result in or can be
 * modified to form a substance. This set of data elements shall be used to define
 * polymer substances isolated from biological matrices. Taxonomic and anatomical
 * origins shall be described using a controlled vocabulary as required. This
 * information is captured for naturally derived polymers ( . starch) and
 * structurally diverse substances. For Organisms belonging to the Kingdom Plantae
 * the Substance level defines the fresh material of a single species or
 * infraspecies, the Herbal Drug and the Herbal preparation. For Herbal
 * preparations, the fraction information will be captured at the Substance
 * information level and additional information for herbal extracts will be
 * captured at the Specified Substance Group 1 information level. See for further
 * explanation the Substance Class: Structurally Diverse and the herbal annex.
 * 
 * @see {@link http://hl7.org/fhir/R5/SubstanceSourceMaterial.html}
 */
    export interface SubstanceSourceMaterial extends DomainResource {
      
      readonly resourceType: "SubstanceSourceMaterial";
      

      
        countryOfOrigin?: Array<CodeableConcept> | undefined;
        _countryOfOrigin?: Element[] | undefined;
      
        developmentStage?: CodeableConcept | undefined;
        _developmentStage?: Element | undefined;
      
        fractionDescription?: Array<BackboneElement> | undefined;
        _fractionDescription?: Element[] | undefined;
      
        fraction?: string | undefined;
        _fraction?: Element | undefined;
      
        materialType?: CodeableConcept | undefined;
        _materialType?: Element | undefined;
      
        geographicalLocation?: Array<string> | undefined;
        _geographicalLocation?: Element[] | undefined;
      
        organism?: BackboneElement | undefined;
        _organism?: Element | undefined;
      
        author?: Array<BackboneElement> | undefined;
        _author?: Element[] | undefined;
      
        authorDescription?: string | undefined;
        _authorDescription?: Element | undefined;
      
        authorType?: CodeableConcept | undefined;
        _authorType?: Element | undefined;
      
        family?: CodeableConcept | undefined;
        _family?: Element | undefined;
      
        genus?: CodeableConcept | undefined;
        _genus?: Element | undefined;
      
        hybrid?: BackboneElement | undefined;
        _hybrid?: Element | undefined;
      
        hybridType?: CodeableConcept | undefined;
        _hybridType?: Element | undefined;
      
        maternalOrganismId?: string | undefined;
        _maternalOrganismId?: Element | undefined;
      
        maternalOrganismName?: string | undefined;
        _maternalOrganismName?: Element | undefined;
      
        paternalOrganismId?: string | undefined;
        _paternalOrganismId?: Element | undefined;
      
        paternalOrganismName?: string | undefined;
        _paternalOrganismName?: Element | undefined;
      
        intraspecificDescription?: string | undefined;
        _intraspecificDescription?: Element | undefined;
      
        intraspecificType?: CodeableConcept | undefined;
        _intraspecificType?: Element | undefined;
      
        organismGeneral?: BackboneElement | undefined;
        _organismGeneral?: Element | undefined;
      
        class?: CodeableConcept | undefined;
        _class?: Element | undefined;
      
        kingdom?: CodeableConcept | undefined;
        _kingdom?: Element | undefined;
      
        order?: CodeableConcept | undefined;
        _order?: Element | undefined;
      
        phylum?: CodeableConcept | undefined;
        _phylum?: Element | undefined;
      
        species?: CodeableConcept | undefined;
        _species?: Element | undefined;
      
        organismId?: Identifier | undefined;
        _organismId?: Element | undefined;
      
        organismName?: string | undefined;
        _organismName?: Element | undefined;
      
        parentSubstanceId?: Array<Identifier> | undefined;
        _parentSubstanceId?: Element[] | undefined;
      
        parentSubstanceName?: Array<string> | undefined;
        _parentSubstanceName?: Element[] | undefined;
      
        partDescription?: Array<BackboneElement> | undefined;
        _partDescription?: Element[] | undefined;
      
        part?: CodeableConcept | undefined;
        _part?: Element | undefined;
      
        partLocation?: CodeableConcept | undefined;
        _partLocation?: Element | undefined;
      
        sourceMaterialClass?: CodeableConcept | undefined;
        _sourceMaterialClass?: Element | undefined;
      
        sourceMaterialState?: CodeableConcept | undefined;
        _sourceMaterialState?: Element | undefined;
      
        sourceMaterialType?: CodeableConcept | undefined;
        _sourceMaterialType?: Element | undefined;
      
    }

  


  
    /**
 * SupplyDelivery
 * 
 * Record of delivery of what is supplied.
 * 
 * @see {@link http://hl7.org/fhir/R5/SupplyDelivery.html}
 */
    export interface SupplyDelivery extends DomainResource {
      
      readonly resourceType: "SupplyDelivery";
      

      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        destination?: Reference | undefined;
        _destination?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        occurrenceDateTime?: string | undefined;
        _occurrenceDateTime?: Element | undefined;
      
        occurrencePeriod?: Period | undefined;
        _occurrencePeriod?: Element | undefined;
      
        occurrenceTiming?: Timing | undefined;
        _occurrenceTiming?: Element | undefined;
      
        partOf?: Array<Reference> | undefined;
        _partOf?: Element[] | undefined;
      
        patient?: Reference | undefined;
        _patient?: Element | undefined;
      
        receiver?: Array<Reference> | undefined;
        _receiver?: Element[] | undefined;
      
        status?: string | undefined;
        _status?: Element | undefined;
      
        suppliedItem?: Array<BackboneElement> | undefined;
        _suppliedItem?: Element[] | undefined;
      
        itemCodeableConcept?: CodeableConcept | undefined;
        _itemCodeableConcept?: Element | undefined;
      
        itemReference?: Reference | undefined;
        _itemReference?: Element | undefined;
      
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
 * A record of a non-patient specific request for a medication, substance, device,
 * certain types of biologically derived product, and nutrition product used in the
 * healthcare setting.
 * 
 * @see {@link http://hl7.org/fhir/R5/SupplyRequest.html}
 */
    export interface SupplyRequest extends DomainResource {
      
      readonly resourceType: "SupplyRequest";
      

      
        authoredOn?: string | undefined;
        _authoredOn?: Element | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        category?: CodeableConcept | undefined;
        _category?: Element | undefined;
      
        deliverFor?: Reference | undefined;
        _deliverFor?: Element | undefined;
      
        deliverFrom?: Reference | undefined;
        _deliverFrom?: Element | undefined;
      
        deliverTo?: Reference | undefined;
        _deliverTo?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        item: CodeableReference;
        _item?: Element | undefined;
      
        occurrenceDateTime?: string | undefined;
        _occurrenceDateTime?: Element | undefined;
      
        occurrencePeriod?: Period | undefined;
        _occurrencePeriod?: Element | undefined;
      
        occurrenceTiming?: Timing | undefined;
        _occurrenceTiming?: Element | undefined;
      
        parameter?: Array<BackboneElement> | undefined;
        _parameter?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        priority?: string | undefined;
        _priority?: Element | undefined;
      
        quantity: Quantity;
        _quantity?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        requester?: Reference | undefined;
        _requester?: Element | undefined;
      
        status?: string | undefined;
        _status?: Element | undefined;
      
        supplier?: Array<Reference> | undefined;
        _supplier?: Element[] | undefined;
      
    }

  


  
    /**
 * Task
 * 
 * A task to be performed.
 * 
 * @see {@link http://hl7.org/fhir/R5/Task.html}
 */
    export interface Task extends DomainResource {
      
      readonly resourceType: "Task";
      

      
        authoredOn?: string | undefined;
        _authoredOn?: Element | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        businessStatus?: CodeableConcept | undefined;
        _businessStatus?: Element | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        doNotPerform?: boolean | undefined;
        _doNotPerform?: Element | undefined;
      
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
      
        valueAddress?: Address | undefined;
        _valueAddress?: Element | undefined;
      
        valueAge?: Age | undefined;
        _valueAge?: Element | undefined;
      
        valueAnnotation?: Annotation | undefined;
        _valueAnnotation?: Element | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueAvailability?: Availability | undefined;
        _valueAvailability?: Element | undefined;
      
        valueBase64Binary?: string | undefined;
        _valueBase64Binary?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCanonical?: string | undefined;
        _valueCanonical?: Element | undefined;
      
        valueCode?: string | undefined;
        _valueCode?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueCodeableReference?: CodeableReference | undefined;
        _valueCodeableReference?: Element | undefined;
      
        valueCoding?: Coding | undefined;
        _valueCoding?: Element | undefined;
      
        valueContactDetail?: ContactDetail | undefined;
        _valueContactDetail?: Element | undefined;
      
        valueContactPoint?: ContactPoint | undefined;
        _valueContactPoint?: Element | undefined;
      
        valueCount?: Count | undefined;
        _valueCount?: Element | undefined;
      
        valueDataRequirement?: DataRequirement | undefined;
        _valueDataRequirement?: Element | undefined;
      
        valueDate?: string | undefined;
        _valueDate?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueDecimal?: number | undefined;
        _valueDecimal?: Element | undefined;
      
        valueDistance?: Distance | undefined;
        _valueDistance?: Element | undefined;
      
        valueDosage?: Dosage | undefined;
        _valueDosage?: Element | undefined;
      
        valueDuration?: Duration | undefined;
        _valueDuration?: Element | undefined;
      
        valueExpression?: Expression | undefined;
        _valueExpression?: Element | undefined;
      
        valueExtendedContactDetail?: ExtendedContactDetail | undefined;
        _valueExtendedContactDetail?: Element | undefined;
      
        valueHumanName?: HumanName | undefined;
        _valueHumanName?: Element | undefined;
      
        valueId?: id | undefined;
        _valueId?: Element | undefined;
      
        valueIdentifier?: Identifier | undefined;
        _valueIdentifier?: Element | undefined;
      
        valueInstant?: string | undefined;
        _valueInstant?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueInteger64?: integer64 | undefined;
        _valueInteger64?: Element | undefined;
      
        valueMarkdown?: string | undefined;
        _valueMarkdown?: Element | undefined;
      
        valueMeta?: Meta | undefined;
        _valueMeta?: Element | undefined;
      
        valueMoney?: Money | undefined;
        _valueMoney?: Element | undefined;
      
        valueOid?: oid | undefined;
        _valueOid?: Element | undefined;
      
        valueParameterDefinition?: ParameterDefinition | undefined;
        _valueParameterDefinition?: Element | undefined;
      
        valuePeriod?: Period | undefined;
        _valuePeriod?: Element | undefined;
      
        valuePositiveInt?: number | undefined;
        _valuePositiveInt?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueRatio?: Ratio | undefined;
        _valueRatio?: Element | undefined;
      
        valueRatioRange?: RatioRange | undefined;
        _valueRatioRange?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        valueRelatedArtifact?: RelatedArtifact | undefined;
        _valueRelatedArtifact?: Element | undefined;
      
        valueSampledData?: SampledData | undefined;
        _valueSampledData?: Element | undefined;
      
        valueSignature?: Signature | undefined;
        _valueSignature?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        valueTime?: time | undefined;
        _valueTime?: Element | undefined;
      
        valueTiming?: Timing | undefined;
        _valueTiming?: Element | undefined;
      
        valueTriggerDefinition?: TriggerDefinition | undefined;
        _valueTriggerDefinition?: Element | undefined;
      
        valueUnsignedInt?: unsignedInt | undefined;
        _valueUnsignedInt?: Element | undefined;
      
        valueUri?: string | undefined;
        _valueUri?: Element | undefined;
      
        valueUrl?: string | undefined;
        _valueUrl?: Element | undefined;
      
        valueUsageContext?: UsageContext | undefined;
        _valueUsageContext?: Element | undefined;
      
        valueUuid?: uuid | undefined;
        _valueUuid?: Element | undefined;
      
        instantiatesCanonical?: string | undefined;
        _instantiatesCanonical?: Element | undefined;
      
        instantiatesUri?: string | undefined;
        _instantiatesUri?: Element | undefined;
      
        insurance?: Array<Reference> | undefined;
        _insurance?: Element[] | undefined;
      
        intent: string;
        _intent?: Element | undefined;
      
        lastModified?: string | undefined;
        _lastModified?: Element | undefined;
      
        location?: Reference | undefined;
        _location?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        output?: Array<BackboneElement> | undefined;
        _output?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        valueAddress?: Address | undefined;
        _valueAddress?: Element | undefined;
      
        valueAge?: Age | undefined;
        _valueAge?: Element | undefined;
      
        valueAnnotation?: Annotation | undefined;
        _valueAnnotation?: Element | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueAvailability?: Availability | undefined;
        _valueAvailability?: Element | undefined;
      
        valueBase64Binary?: string | undefined;
        _valueBase64Binary?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCanonical?: string | undefined;
        _valueCanonical?: Element | undefined;
      
        valueCode?: string | undefined;
        _valueCode?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueCodeableReference?: CodeableReference | undefined;
        _valueCodeableReference?: Element | undefined;
      
        valueCoding?: Coding | undefined;
        _valueCoding?: Element | undefined;
      
        valueContactDetail?: ContactDetail | undefined;
        _valueContactDetail?: Element | undefined;
      
        valueContactPoint?: ContactPoint | undefined;
        _valueContactPoint?: Element | undefined;
      
        valueCount?: Count | undefined;
        _valueCount?: Element | undefined;
      
        valueDataRequirement?: DataRequirement | undefined;
        _valueDataRequirement?: Element | undefined;
      
        valueDate?: string | undefined;
        _valueDate?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueDecimal?: number | undefined;
        _valueDecimal?: Element | undefined;
      
        valueDistance?: Distance | undefined;
        _valueDistance?: Element | undefined;
      
        valueDosage?: Dosage | undefined;
        _valueDosage?: Element | undefined;
      
        valueDuration?: Duration | undefined;
        _valueDuration?: Element | undefined;
      
        valueExpression?: Expression | undefined;
        _valueExpression?: Element | undefined;
      
        valueExtendedContactDetail?: ExtendedContactDetail | undefined;
        _valueExtendedContactDetail?: Element | undefined;
      
        valueHumanName?: HumanName | undefined;
        _valueHumanName?: Element | undefined;
      
        valueId?: id | undefined;
        _valueId?: Element | undefined;
      
        valueIdentifier?: Identifier | undefined;
        _valueIdentifier?: Element | undefined;
      
        valueInstant?: string | undefined;
        _valueInstant?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueInteger64?: integer64 | undefined;
        _valueInteger64?: Element | undefined;
      
        valueMarkdown?: string | undefined;
        _valueMarkdown?: Element | undefined;
      
        valueMeta?: Meta | undefined;
        _valueMeta?: Element | undefined;
      
        valueMoney?: Money | undefined;
        _valueMoney?: Element | undefined;
      
        valueOid?: oid | undefined;
        _valueOid?: Element | undefined;
      
        valueParameterDefinition?: ParameterDefinition | undefined;
        _valueParameterDefinition?: Element | undefined;
      
        valuePeriod?: Period | undefined;
        _valuePeriod?: Element | undefined;
      
        valuePositiveInt?: number | undefined;
        _valuePositiveInt?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueRatio?: Ratio | undefined;
        _valueRatio?: Element | undefined;
      
        valueRatioRange?: RatioRange | undefined;
        _valueRatioRange?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        valueRelatedArtifact?: RelatedArtifact | undefined;
        _valueRelatedArtifact?: Element | undefined;
      
        valueSampledData?: SampledData | undefined;
        _valueSampledData?: Element | undefined;
      
        valueSignature?: Signature | undefined;
        _valueSignature?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        valueTime?: time | undefined;
        _valueTime?: Element | undefined;
      
        valueTiming?: Timing | undefined;
        _valueTiming?: Element | undefined;
      
        valueTriggerDefinition?: TriggerDefinition | undefined;
        _valueTriggerDefinition?: Element | undefined;
      
        valueUnsignedInt?: unsignedInt | undefined;
        _valueUnsignedInt?: Element | undefined;
      
        valueUri?: string | undefined;
        _valueUri?: Element | undefined;
      
        valueUrl?: string | undefined;
        _valueUrl?: Element | undefined;
      
        valueUsageContext?: UsageContext | undefined;
        _valueUsageContext?: Element | undefined;
      
        valueUuid?: uuid | undefined;
        _valueUuid?: Element | undefined;
      
        owner?: Reference | undefined;
        _owner?: Element | undefined;
      
        partOf?: Array<Reference> | undefined;
        _partOf?: Element[] | undefined;
      
        performer?: Array<BackboneElement> | undefined;
        _performer?: Element[] | undefined;
      
        actor: Reference;
        _actor?: Element | undefined;
      
        function?: CodeableConcept | undefined;
        _function?: Element | undefined;
      
        priority?: string | undefined;
        _priority?: Element | undefined;
      
        reason?: Array<CodeableReference> | undefined;
        _reason?: Element[] | undefined;
      
        relevantHistory?: Array<Reference> | undefined;
        _relevantHistory?: Element[] | undefined;
      
        requestedPerformer?: Array<CodeableReference> | undefined;
        _requestedPerformer?: Element[] | undefined;
      
        requestedPeriod?: Period | undefined;
        _requestedPeriod?: Element | undefined;
      
        requester?: Reference | undefined;
        _requester?: Element | undefined;
      
        restriction?: BackboneElement | undefined;
        _restriction?: Element | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        recipient?: Array<Reference> | undefined;
        _recipient?: Element[] | undefined;
      
        repetitions?: number | undefined;
        _repetitions?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        statusReason?: CodeableReference | undefined;
        _statusReason?: Element | undefined;
      
    }

  


  
    /**
 * TerminologyCapabilities
 * 
 * A TerminologyCapabilities resource documents a set of capabilities (behaviors)
 * of a FHIR Terminology Server that may be used as a statement of actual server
 * functionality or a statement of required or desired server implementation.
 * 
 * @see {@link http://hl7.org/fhir/R5/TerminologyCapabilities.html}
 */
    export interface TerminologyCapabilities extends DomainResource {
      
      readonly resourceType: "TerminologyCapabilities";
      

      
        closure?: BackboneElement | undefined;
        _closure?: Element | undefined;
      
        translation?: boolean | undefined;
        _translation?: Element | undefined;
      
        codeSearch?: string | undefined;
        _codeSearch?: Element | undefined;
      
        codeSystem?: Array<BackboneElement> | undefined;
        _codeSystem?: Element[] | undefined;
      
        content: string;
        _content?: Element | undefined;
      
        subsumption?: boolean | undefined;
        _subsumption?: Element | undefined;
      
        uri?: string | undefined;
        _uri?: Element | undefined;
      
        version?: Array<BackboneElement> | undefined;
        _version?: Element[] | undefined;
      
        code?: string | undefined;
        _code?: Element | undefined;
      
        compositional?: boolean | undefined;
        _compositional?: Element | undefined;
      
        filter?: Array<BackboneElement> | undefined;
        _filter?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        op: Array<string>;
        _op?: Element[] | undefined;
      
        isDefault?: boolean | undefined;
        _isDefault?: Element | undefined;
      
        language?: Array<string> | undefined;
        _language?: Element[] | undefined;
      
        property?: Array<string> | undefined;
        _property?: Element[] | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date: string;
        _date?: Element | undefined;
      
        description?: string | undefined;
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
      
        name: string;
        _name?: Element | undefined;
      
        textFilter?: string | undefined;
        _textFilter?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        implementation?: BackboneElement | undefined;
        _implementation?: Element | undefined;
      
        description: string;
        _description?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        kind: string;
        _kind?: Element | undefined;
      
        lockedDate?: boolean | undefined;
        _lockedDate?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        software?: BackboneElement | undefined;
        _software?: Element | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        translation?: BackboneElement | undefined;
        _translation?: Element | undefined;
      
        needsMap: boolean;
        _needsMap?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        validateCode?: BackboneElement | undefined;
        _validateCode?: Element | undefined;
      
        translations: boolean;
        _translations?: Element | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * TestPlan
 * 
 * A plan for executing testing on an artifact or specifications
 * 
 * @see {@link http://hl7.org/fhir/R5/TestPlan.html}
 */
    export interface TestPlan extends DomainResource {
      
      readonly resourceType: "TestPlan";
      

      
        category?: Array<CodeableConcept> | undefined;
        _category?: Element[] | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        dependency?: Array<BackboneElement> | undefined;
        _dependency?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        predecessor?: Reference | undefined;
        _predecessor?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        exitCriteria?: string | undefined;
        _exitCriteria?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        scope?: Array<Reference> | undefined;
        _scope?: Element[] | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        testCase?: Array<BackboneElement> | undefined;
        _testCase?: Element[] | undefined;
      
        assertion?: Array<BackboneElement> | undefined;
        _assertion?: Element[] | undefined;
      
        object?: Array<CodeableReference> | undefined;
        _object?: Element[] | undefined;
      
        result?: Array<CodeableReference> | undefined;
        _result?: Element[] | undefined;
      
        type?: Array<CodeableConcept> | undefined;
        _type?: Element[] | undefined;
      
        dependency?: Array<BackboneElement> | undefined;
        _dependency?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        predecessor?: Reference | undefined;
        _predecessor?: Element | undefined;
      
        scope?: Array<Reference> | undefined;
        _scope?: Element[] | undefined;
      
        sequence?: number | undefined;
        _sequence?: Element | undefined;
      
        testData?: Array<BackboneElement> | undefined;
        _testData?: Element[] | undefined;
      
        content?: Reference | undefined;
        _content?: Element | undefined;
      
        sourceReference?: Reference | undefined;
        _sourceReference?: Element | undefined;
      
        sourceString?: string | undefined;
        _sourceString?: Element | undefined;
      
        type: Coding;
        _type?: Element | undefined;
      
        testRun?: Array<BackboneElement> | undefined;
        _testRun?: Element[] | undefined;
      
        narrative?: string | undefined;
        _narrative?: Element | undefined;
      
        script?: BackboneElement | undefined;
        _script?: Element | undefined;
      
        language?: CodeableConcept | undefined;
        _language?: Element | undefined;
      
        sourceReference?: Reference | undefined;
        _sourceReference?: Element | undefined;
      
        sourceString?: string | undefined;
        _sourceString?: Element | undefined;
      
        testTools?: string | undefined;
        _testTools?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * TestReport
 * 
 * A summary of information based on the results of executing a TestScript.
 * 
 * @see {@link http://hl7.org/fhir/R5/TestReport.html}
 */
    export interface TestReport extends DomainResource {
      
      readonly resourceType: "TestReport";
      

      
        identifier?: Identifier | undefined;
        _identifier?: Element | undefined;
      
        issued?: string | undefined;
        _issued?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        participant?: Array<BackboneElement> | undefined;
        _participant?: Element[] | undefined;
      
        display?: string | undefined;
        _display?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
        uri: string;
        _uri?: Element | undefined;
      
        result: string;
        _result?: Element | undefined;
      
        score?: number | undefined;
        _score?: Element | undefined;
      
        setup?: BackboneElement | undefined;
        _setup?: Element | undefined;
      
        action: Array<BackboneElement>;
        _action?: Element[] | undefined;
      
        assert?: BackboneElement | undefined;
        _assert?: Element | undefined;
      
        detail?: string | undefined;
        _detail?: Element | undefined;
      
        message?: string | undefined;
        _message?: Element | undefined;
      
        requirement?: Array<BackboneElement> | undefined;
        _requirement?: Element[] | undefined;
      
        linkCanonical?: string | undefined;
        _linkCanonical?: Element | undefined;
      
        linkUri?: string | undefined;
        _linkUri?: Element | undefined;
      
        result: string;
        _result?: Element | undefined;
      
        operation?: BackboneElement | undefined;
        _operation?: Element | undefined;
      
        detail?: string | undefined;
        _detail?: Element | undefined;
      
        message?: string | undefined;
        _message?: Element | undefined;
      
        result: string;
        _result?: Element | undefined;
      
        status: string;
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
      
        testScript: string;
        _testScript?: Element | undefined;
      
    }

  


  
    /**
 * TestScript
 * 
 * A structured set of tests against a FHIR server or client implementation to
 * determine compliance against the FHIR specification.
 * 
 * @see {@link http://hl7.org/fhir/R5/TestScript.html}
 */
    export interface TestScript extends DomainResource {
      
      readonly resourceType: "TestScript";
      

      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        destination?: Array<BackboneElement> | undefined;
        _destination?: Element[] | undefined;
      
        index: number;
        _index?: Element | undefined;
      
        profile: Coding;
        _profile?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
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
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        metadata?: BackboneElement | undefined;
        _metadata?: Element | undefined;
      
        capability: Array<BackboneElement>;
        _capability?: Element[] | undefined;
      
        capabilities: string;
        _capabilities?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        destination?: number | undefined;
        _destination?: Element | undefined;
      
        link?: Array<string> | undefined;
        _link?: Element[] | undefined;
      
        origin?: Array<number> | undefined;
        _origin?: Element[] | undefined;
      
        required: boolean;
        _required?: Element | undefined;
      
        validated: boolean;
        _validated?: Element | undefined;
      
        link?: Array<BackboneElement> | undefined;
        _link?: Element[] | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        url: string;
        _url?: Element | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        origin?: Array<BackboneElement> | undefined;
        _origin?: Element[] | undefined;
      
        index: number;
        _index?: Element | undefined;
      
        profile: Coding;
        _profile?: Element | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        profile?: Array<string> | undefined;
        _profile?: Element[] | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        scope?: Array<BackboneElement> | undefined;
        _scope?: Element[] | undefined;
      
        artifact: string;
        _artifact?: Element | undefined;
      
        conformance?: CodeableConcept | undefined;
        _conformance?: Element | undefined;
      
        phase?: CodeableConcept | undefined;
        _phase?: Element | undefined;
      
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
      
        contentType?: string | undefined;
        _contentType?: Element | undefined;
      
        defaultManualCompletion?: string | undefined;
        _defaultManualCompletion?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        direction?: string | undefined;
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
      
        operator?: string | undefined;
        _operator?: Element | undefined;
      
        path?: string | undefined;
        _path?: Element | undefined;
      
        requestMethod?: string | undefined;
        _requestMethod?: Element | undefined;
      
        requestURL?: string | undefined;
        _requestURL?: Element | undefined;
      
        requirement?: Array<BackboneElement> | undefined;
        _requirement?: Element[] | undefined;
      
        linkCanonical?: string | undefined;
        _linkCanonical?: Element | undefined;
      
        linkUri?: string | undefined;
        _linkUri?: Element | undefined;
      
        resource?: string | undefined;
        _resource?: Element | undefined;
      
        response?: string | undefined;
        _response?: Element | undefined;
      
        responseCode?: string | undefined;
        _responseCode?: Element | undefined;
      
        sourceId?: id | undefined;
        _sourceId?: Element | undefined;
      
        stopTestOnFail: boolean;
        _stopTestOnFail?: Element | undefined;
      
        validateProfileId?: id | undefined;
        _validateProfileId?: Element | undefined;
      
        value?: string | undefined;
        _value?: Element | undefined;
      
        warningOnly: boolean;
        _warningOnly?: Element | undefined;
      
        operation?: BackboneElement | undefined;
        _operation?: Element | undefined;
      
        accept?: string | undefined;
        _accept?: Element | undefined;
      
        contentType?: string | undefined;
        _contentType?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        destination?: number | undefined;
        _destination?: Element | undefined;
      
        encodeRequestUrl: boolean;
        _encodeRequestUrl?: Element | undefined;
      
        label?: string | undefined;
        _label?: Element | undefined;
      
        method?: string | undefined;
        _method?: Element | undefined;
      
        origin?: number | undefined;
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
      
        resource?: string | undefined;
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
      
        status: string;
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
      
        url?: string | undefined;
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
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  


  
    /**
 * Timing
 * 
 * Timing Type: Specifies an event that may occur multiple times. Timing schedules
 * are used to record when things are planned, expected or requested to occur. The
 * most common usage is in dosage instructions for medications. They are also used
 * when planning care of various kinds, and may be used for reporting the schedule
 * to which past regular activities were carried out.
 * 
 * @see {@link http://hl7.org/fhir/R5/Timing.html}
 */
    export interface Timing extends BackboneType {
      
      readonly resourceType: string;
      

      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        event?: Array<string> | undefined;
        _event?: Element[] | undefined;
      
        repeat?: Element | undefined;
        _repeat?: Element | undefined;
      
        boundsDuration?: Duration | undefined;
        _boundsDuration?: Element | undefined;
      
        boundsPeriod?: Period | undefined;
        _boundsPeriod?: Element | undefined;
      
        boundsRange?: Range | undefined;
        _boundsRange?: Element | undefined;
      
        count?: number | undefined;
        _count?: Element | undefined;
      
        countMax?: number | undefined;
        _countMax?: Element | undefined;
      
        dayOfWeek?: Array<string> | undefined;
        _dayOfWeek?: Element[] | undefined;
      
        duration?: number | undefined;
        _duration?: Element | undefined;
      
        durationMax?: number | undefined;
        _durationMax?: Element | undefined;
      
        durationUnit?: string | undefined;
        _durationUnit?: Element | undefined;
      
        frequency?: number | undefined;
        _frequency?: Element | undefined;
      
        frequencyMax?: number | undefined;
        _frequencyMax?: Element | undefined;
      
        offset?: unsignedInt | undefined;
        _offset?: Element | undefined;
      
        period?: number | undefined;
        _period?: Element | undefined;
      
        periodMax?: number | undefined;
        _periodMax?: Element | undefined;
      
        periodUnit?: string | undefined;
        _periodUnit?: Element | undefined;
      
        timeOfDay?: Array<time> | undefined;
        _timeOfDay?: Element[] | undefined;
      
        when?: Array<string> | undefined;
        _when?: Element[] | undefined;
      
    }

  


  


  


  
    /**
 * Transport
 * 
 * Record of transport.
 * 
 * @see {@link http://hl7.org/fhir/R5/Transport.html}
 */
    export interface Transport extends DomainResource {
      
      readonly resourceType: "Transport";
      

      
        authoredOn?: string | undefined;
        _authoredOn?: Element | undefined;
      
        basedOn?: Array<Reference> | undefined;
        _basedOn?: Element[] | undefined;
      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        completionTime?: string | undefined;
        _completionTime?: Element | undefined;
      
        currentLocation: Reference;
        _currentLocation?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        focus?: Reference | undefined;
        _focus?: Element | undefined;
      
        for?: Reference | undefined;
        _for?: Element | undefined;
      
        groupIdentifier?: Identifier | undefined;
        _groupIdentifier?: Element | undefined;
      
        history?: Reference | undefined;
        _history?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        input?: Array<BackboneElement> | undefined;
        _input?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        valueAddress?: Address | undefined;
        _valueAddress?: Element | undefined;
      
        valueAge?: Age | undefined;
        _valueAge?: Element | undefined;
      
        valueAnnotation?: Annotation | undefined;
        _valueAnnotation?: Element | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueAvailability?: Availability | undefined;
        _valueAvailability?: Element | undefined;
      
        valueBase64Binary?: string | undefined;
        _valueBase64Binary?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCanonical?: string | undefined;
        _valueCanonical?: Element | undefined;
      
        valueCode?: string | undefined;
        _valueCode?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueCodeableReference?: CodeableReference | undefined;
        _valueCodeableReference?: Element | undefined;
      
        valueCoding?: Coding | undefined;
        _valueCoding?: Element | undefined;
      
        valueContactDetail?: ContactDetail | undefined;
        _valueContactDetail?: Element | undefined;
      
        valueContactPoint?: ContactPoint | undefined;
        _valueContactPoint?: Element | undefined;
      
        valueCount?: Count | undefined;
        _valueCount?: Element | undefined;
      
        valueDataRequirement?: DataRequirement | undefined;
        _valueDataRequirement?: Element | undefined;
      
        valueDate?: string | undefined;
        _valueDate?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueDecimal?: number | undefined;
        _valueDecimal?: Element | undefined;
      
        valueDistance?: Distance | undefined;
        _valueDistance?: Element | undefined;
      
        valueDosage?: Dosage | undefined;
        _valueDosage?: Element | undefined;
      
        valueDuration?: Duration | undefined;
        _valueDuration?: Element | undefined;
      
        valueExpression?: Expression | undefined;
        _valueExpression?: Element | undefined;
      
        valueExtendedContactDetail?: ExtendedContactDetail | undefined;
        _valueExtendedContactDetail?: Element | undefined;
      
        valueHumanName?: HumanName | undefined;
        _valueHumanName?: Element | undefined;
      
        valueId?: id | undefined;
        _valueId?: Element | undefined;
      
        valueIdentifier?: Identifier | undefined;
        _valueIdentifier?: Element | undefined;
      
        valueInstant?: string | undefined;
        _valueInstant?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueInteger64?: integer64 | undefined;
        _valueInteger64?: Element | undefined;
      
        valueMarkdown?: string | undefined;
        _valueMarkdown?: Element | undefined;
      
        valueMeta?: Meta | undefined;
        _valueMeta?: Element | undefined;
      
        valueMoney?: Money | undefined;
        _valueMoney?: Element | undefined;
      
        valueOid?: oid | undefined;
        _valueOid?: Element | undefined;
      
        valueParameterDefinition?: ParameterDefinition | undefined;
        _valueParameterDefinition?: Element | undefined;
      
        valuePeriod?: Period | undefined;
        _valuePeriod?: Element | undefined;
      
        valuePositiveInt?: number | undefined;
        _valuePositiveInt?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueRatio?: Ratio | undefined;
        _valueRatio?: Element | undefined;
      
        valueRatioRange?: RatioRange | undefined;
        _valueRatioRange?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        valueRelatedArtifact?: RelatedArtifact | undefined;
        _valueRelatedArtifact?: Element | undefined;
      
        valueSampledData?: SampledData | undefined;
        _valueSampledData?: Element | undefined;
      
        valueSignature?: Signature | undefined;
        _valueSignature?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        valueTime?: time | undefined;
        _valueTime?: Element | undefined;
      
        valueTiming?: Timing | undefined;
        _valueTiming?: Element | undefined;
      
        valueTriggerDefinition?: TriggerDefinition | undefined;
        _valueTriggerDefinition?: Element | undefined;
      
        valueUnsignedInt?: unsignedInt | undefined;
        _valueUnsignedInt?: Element | undefined;
      
        valueUri?: string | undefined;
        _valueUri?: Element | undefined;
      
        valueUrl?: string | undefined;
        _valueUrl?: Element | undefined;
      
        valueUsageContext?: UsageContext | undefined;
        _valueUsageContext?: Element | undefined;
      
        valueUuid?: uuid | undefined;
        _valueUuid?: Element | undefined;
      
        instantiatesCanonical?: string | undefined;
        _instantiatesCanonical?: Element | undefined;
      
        instantiatesUri?: string | undefined;
        _instantiatesUri?: Element | undefined;
      
        insurance?: Array<Reference> | undefined;
        _insurance?: Element[] | undefined;
      
        intent: string;
        _intent?: Element | undefined;
      
        lastModified?: string | undefined;
        _lastModified?: Element | undefined;
      
        location?: Reference | undefined;
        _location?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        output?: Array<BackboneElement> | undefined;
        _output?: Element[] | undefined;
      
        type: CodeableConcept;
        _type?: Element | undefined;
      
        valueAddress?: Address | undefined;
        _valueAddress?: Element | undefined;
      
        valueAge?: Age | undefined;
        _valueAge?: Element | undefined;
      
        valueAnnotation?: Annotation | undefined;
        _valueAnnotation?: Element | undefined;
      
        valueAttachment?: Attachment | undefined;
        _valueAttachment?: Element | undefined;
      
        valueAvailability?: Availability | undefined;
        _valueAvailability?: Element | undefined;
      
        valueBase64Binary?: string | undefined;
        _valueBase64Binary?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCanonical?: string | undefined;
        _valueCanonical?: Element | undefined;
      
        valueCode?: string | undefined;
        _valueCode?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueCodeableReference?: CodeableReference | undefined;
        _valueCodeableReference?: Element | undefined;
      
        valueCoding?: Coding | undefined;
        _valueCoding?: Element | undefined;
      
        valueContactDetail?: ContactDetail | undefined;
        _valueContactDetail?: Element | undefined;
      
        valueContactPoint?: ContactPoint | undefined;
        _valueContactPoint?: Element | undefined;
      
        valueCount?: Count | undefined;
        _valueCount?: Element | undefined;
      
        valueDataRequirement?: DataRequirement | undefined;
        _valueDataRequirement?: Element | undefined;
      
        valueDate?: string | undefined;
        _valueDate?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueDecimal?: number | undefined;
        _valueDecimal?: Element | undefined;
      
        valueDistance?: Distance | undefined;
        _valueDistance?: Element | undefined;
      
        valueDosage?: Dosage | undefined;
        _valueDosage?: Element | undefined;
      
        valueDuration?: Duration | undefined;
        _valueDuration?: Element | undefined;
      
        valueExpression?: Expression | undefined;
        _valueExpression?: Element | undefined;
      
        valueExtendedContactDetail?: ExtendedContactDetail | undefined;
        _valueExtendedContactDetail?: Element | undefined;
      
        valueHumanName?: HumanName | undefined;
        _valueHumanName?: Element | undefined;
      
        valueId?: id | undefined;
        _valueId?: Element | undefined;
      
        valueIdentifier?: Identifier | undefined;
        _valueIdentifier?: Element | undefined;
      
        valueInstant?: string | undefined;
        _valueInstant?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueInteger64?: integer64 | undefined;
        _valueInteger64?: Element | undefined;
      
        valueMarkdown?: string | undefined;
        _valueMarkdown?: Element | undefined;
      
        valueMeta?: Meta | undefined;
        _valueMeta?: Element | undefined;
      
        valueMoney?: Money | undefined;
        _valueMoney?: Element | undefined;
      
        valueOid?: oid | undefined;
        _valueOid?: Element | undefined;
      
        valueParameterDefinition?: ParameterDefinition | undefined;
        _valueParameterDefinition?: Element | undefined;
      
        valuePeriod?: Period | undefined;
        _valuePeriod?: Element | undefined;
      
        valuePositiveInt?: number | undefined;
        _valuePositiveInt?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueRatio?: Ratio | undefined;
        _valueRatio?: Element | undefined;
      
        valueRatioRange?: RatioRange | undefined;
        _valueRatioRange?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
        valueRelatedArtifact?: RelatedArtifact | undefined;
        _valueRelatedArtifact?: Element | undefined;
      
        valueSampledData?: SampledData | undefined;
        _valueSampledData?: Element | undefined;
      
        valueSignature?: Signature | undefined;
        _valueSignature?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        valueTime?: time | undefined;
        _valueTime?: Element | undefined;
      
        valueTiming?: Timing | undefined;
        _valueTiming?: Element | undefined;
      
        valueTriggerDefinition?: TriggerDefinition | undefined;
        _valueTriggerDefinition?: Element | undefined;
      
        valueUnsignedInt?: unsignedInt | undefined;
        _valueUnsignedInt?: Element | undefined;
      
        valueUri?: string | undefined;
        _valueUri?: Element | undefined;
      
        valueUrl?: string | undefined;
        _valueUrl?: Element | undefined;
      
        valueUsageContext?: UsageContext | undefined;
        _valueUsageContext?: Element | undefined;
      
        valueUuid?: uuid | undefined;
        _valueUuid?: Element | undefined;
      
        owner?: Reference | undefined;
        _owner?: Element | undefined;
      
        partOf?: Array<Reference> | undefined;
        _partOf?: Element[] | undefined;
      
        performerType?: Array<CodeableConcept> | undefined;
        _performerType?: Element[] | undefined;
      
        priority?: string | undefined;
        _priority?: Element | undefined;
      
        reason?: CodeableReference | undefined;
        _reason?: Element | undefined;
      
        relevantHistory?: Array<Reference> | undefined;
        _relevantHistory?: Element[] | undefined;
      
        requestedLocation: Reference;
        _requestedLocation?: Element | undefined;
      
        requester?: Reference | undefined;
        _requester?: Element | undefined;
      
        restriction?: BackboneElement | undefined;
        _restriction?: Element | undefined;
      
        period?: Period | undefined;
        _period?: Element | undefined;
      
        recipient?: Array<Reference> | undefined;
        _recipient?: Element[] | undefined;
      
        repetitions?: number | undefined;
        _repetitions?: Element | undefined;
      
        status?: string | undefined;
        _status?: Element | undefined;
      
        statusReason?: CodeableConcept | undefined;
        _statusReason?: Element | undefined;
      
    }

  


  
    /**
 * TriggerDefinition
 * 
 * TriggerDefinition Type: A description of a triggering event. Triggering events
 * can be named events, data events, or periodic, as determined by the type
 * element.
 * 
 * @see {@link http://hl7.org/fhir/R5/TriggerDefinition.html}
 */
    export interface TriggerDefinition extends DataType {
      
      readonly resourceType: string;
      

      
        code?: CodeableConcept | undefined;
        _code?: Element | undefined;
      
        condition?: Expression | undefined;
        _condition?: Element | undefined;
      
        data?: Array<DataRequirement> | undefined;
        _data?: Element[] | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        subscriptionTopic?: string | undefined;
        _subscriptionTopic?: Element | undefined;
      
        timingDate?: string | undefined;
        _timingDate?: Element | undefined;
      
        timingDateTime?: string | undefined;
        _timingDateTime?: Element | undefined;
      
        timingReference?: Reference | undefined;
        _timingReference?: Element | undefined;
      
        timingTiming?: Timing | undefined;
        _timingTiming?: Element | undefined;
      
        type: string;
        _type?: Element | undefined;
      
    }

  


  


  


  


  
    /**
 * UsageContext
 * 
 * UsageContext Type: Specifies clinical/business/etc. metadata that can be used to
 * retrieve, index and/or categorize an artifact. This metadata can either be
 * specific to the applicable population (e.g., age category, DRG) or the specific
 * context of care (e.g., venue, care setting, provider of care).
 * 
 * @see {@link http://hl7.org/fhir/R5/UsageContext.html}
 */
    export interface UsageContext extends DataType {
      
      readonly resourceType: string;
      

      
        code: Coding;
        _code?: Element | undefined;
      
        valueCodeableConcept?: CodeableConcept | undefined;
        _valueCodeableConcept?: Element | undefined;
      
        valueQuantity?: Quantity | undefined;
        _valueQuantity?: Element | undefined;
      
        valueRange?: Range | undefined;
        _valueRange?: Element | undefined;
      
        valueReference?: Reference | undefined;
        _valueReference?: Element | undefined;
      
    }

  


  


  
    /**
 * ValueSet
 * 
 * A ValueSet resource instance specifies a set of codes drawn from one or more
 * code systems, intended for use in a particular context. Value sets link between
 * [[[CodeSystem]]] definitions and their use in [coded
 * elements](terminologies.html).
 * 
 * @see {@link http://hl7.org/fhir/R5/ValueSet.html}
 */
    export interface ValueSet extends DomainResource {
      
      readonly resourceType: "ValueSet";
      

      
        approvalDate?: string | undefined;
        _approvalDate?: Element | undefined;
      
        author?: Array<ContactDetail> | undefined;
        _author?: Element[] | undefined;
      
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
      
        code: string;
        _code?: Element | undefined;
      
        designation?: Array<BackboneElement> | undefined;
        _designation?: Element[] | undefined;
      
        additionalUse?: Array<Coding> | undefined;
        _additionalUse?: Element[] | undefined;
      
        language?: string | undefined;
        _language?: Element | undefined;
      
        use?: Coding | undefined;
        _use?: Element | undefined;
      
        value: string;
        _value?: Element | undefined;
      
        display?: string | undefined;
        _display?: Element | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        filter?: Array<BackboneElement> | undefined;
        _filter?: Element[] | undefined;
      
        op: string;
        _op?: Element | undefined;
      
        property: string;
        _property?: Element | undefined;
      
        value: string;
        _value?: Element | undefined;
      
        system?: string | undefined;
        _system?: Element | undefined;
      
        valueSet?: Array<string> | undefined;
        _valueSet?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        lockedDate?: string | undefined;
        _lockedDate?: Element | undefined;
      
        property?: Array<string> | undefined;
        _property?: Element[] | undefined;
      
        contact?: Array<ContactDetail> | undefined;
        _contact?: Element[] | undefined;
      
        copyright?: string | undefined;
        _copyright?: Element | undefined;
      
        copyrightLabel?: string | undefined;
        _copyrightLabel?: Element | undefined;
      
        date?: string | undefined;
        _date?: Element | undefined;
      
        description?: string | undefined;
        _description?: Element | undefined;
      
        editor?: Array<ContactDetail> | undefined;
        _editor?: Element[] | undefined;
      
        effectivePeriod?: Period | undefined;
        _effectivePeriod?: Element | undefined;
      
        endorser?: Array<ContactDetail> | undefined;
        _endorser?: Element[] | undefined;
      
        expansion?: BackboneElement | undefined;
        _expansion?: Element | undefined;
      
        contains?: Array<BackboneElement> | undefined;
        _contains?: Element[] | undefined;
      
        abstract?: boolean | undefined;
        _abstract?: Element | undefined;
      
        code?: string | undefined;
        _code?: Element | undefined;
      
        contains?: Array<undefined> | undefined;
        _contains?: Element[] | undefined;
      
        designation?: Array<undefined> | undefined;
        _designation?: Element[] | undefined;
      
        display?: string | undefined;
        _display?: Element | undefined;
      
        inactive?: boolean | undefined;
        _inactive?: Element | undefined;
      
        property?: Array<BackboneElement> | undefined;
        _property?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        subProperty?: Array<BackboneElement> | undefined;
        _subProperty?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCode?: string | undefined;
        _valueCode?: Element | undefined;
      
        valueCoding?: Coding | undefined;
        _valueCoding?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueDecimal?: number | undefined;
        _valueDecimal?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCode?: string | undefined;
        _valueCode?: Element | undefined;
      
        valueCoding?: Coding | undefined;
        _valueCoding?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueDecimal?: number | undefined;
        _valueDecimal?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        system?: string | undefined;
        _system?: Element | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        identifier?: string | undefined;
        _identifier?: Element | undefined;
      
        next?: string | undefined;
        _next?: Element | undefined;
      
        offset?: number | undefined;
        _offset?: Element | undefined;
      
        parameter?: Array<BackboneElement> | undefined;
        _parameter?: Element[] | undefined;
      
        name: string;
        _name?: Element | undefined;
      
        valueBoolean?: boolean | undefined;
        _valueBoolean?: Element | undefined;
      
        valueCode?: string | undefined;
        _valueCode?: Element | undefined;
      
        valueDateTime?: string | undefined;
        _valueDateTime?: Element | undefined;
      
        valueDecimal?: number | undefined;
        _valueDecimal?: Element | undefined;
      
        valueInteger?: number | undefined;
        _valueInteger?: Element | undefined;
      
        valueString?: string | undefined;
        _valueString?: Element | undefined;
      
        valueUri?: string | undefined;
        _valueUri?: Element | undefined;
      
        property?: Array<BackboneElement> | undefined;
        _property?: Element[] | undefined;
      
        code: string;
        _code?: Element | undefined;
      
        uri?: string | undefined;
        _uri?: Element | undefined;
      
        timestamp: string;
        _timestamp?: Element | undefined;
      
        total?: number | undefined;
        _total?: Element | undefined;
      
        experimental?: boolean | undefined;
        _experimental?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        immutable?: boolean | undefined;
        _immutable?: Element | undefined;
      
        jurisdiction?: Array<CodeableConcept> | undefined;
        _jurisdiction?: Element[] | undefined;
      
        lastReviewDate?: string | undefined;
        _lastReviewDate?: Element | undefined;
      
        name?: string | undefined;
        _name?: Element | undefined;
      
        publisher?: string | undefined;
        _publisher?: Element | undefined;
      
        purpose?: string | undefined;
        _purpose?: Element | undefined;
      
        relatedArtifact?: Array<RelatedArtifact> | undefined;
        _relatedArtifact?: Element[] | undefined;
      
        reviewer?: Array<ContactDetail> | undefined;
        _reviewer?: Element[] | undefined;
      
        scope?: BackboneElement | undefined;
        _scope?: Element | undefined;
      
        exclusionCriteria?: string | undefined;
        _exclusionCriteria?: Element | undefined;
      
        inclusionCriteria?: string | undefined;
        _inclusionCriteria?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        title?: string | undefined;
        _title?: Element | undefined;
      
        topic?: Array<CodeableConcept> | undefined;
        _topic?: Element[] | undefined;
      
        url?: string | undefined;
        _url?: Element | undefined;
      
        useContext?: Array<UsageContext> | undefined;
        _useContext?: Element[] | undefined;
      
        version?: string | undefined;
        _version?: Element | undefined;
      
        versionAlgorithmCoding?: Coding | undefined;
        _versionAlgorithmCoding?: Element | undefined;
      
        versionAlgorithmString?: string | undefined;
        _versionAlgorithmString?: Element | undefined;
      
    }

  


  
    /**
 * VerificationResult
 * 
 * Describes validation requirements, source(s), status and dates for one or more
 * elements.
 * 
 * @see {@link http://hl7.org/fhir/R5/VerificationResult.html}
 */
    export interface VerificationResult extends DomainResource {
      
      readonly resourceType: "VerificationResult";
      

      
        attestation?: BackboneElement | undefined;
        _attestation?: Element | undefined;
      
        communicationMethod?: CodeableConcept | undefined;
        _communicationMethod?: Element | undefined;
      
        date?: string | undefined;
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
      
        lastPerformed?: string | undefined;
        _lastPerformed?: Element | undefined;
      
        need?: CodeableConcept | undefined;
        _need?: Element | undefined;
      
        nextScheduled?: string | undefined;
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
      
        validationDate?: string | undefined;
        _validationDate?: Element | undefined;
      
        validationStatus?: CodeableConcept | undefined;
        _validationStatus?: Element | undefined;
      
        who?: Reference | undefined;
        _who?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
        statusDate?: string | undefined;
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
 * VirtualServiceDetail
 * 
 * VirtualServiceDetail Type: Virtual Service Contact Details.
 * 
 * @see {@link http://hl7.org/fhir/R5/VirtualServiceDetail.html}
 */
    export interface VirtualServiceDetail extends DataType {
      
      readonly resourceType: string;
      

      
        additionalInfo?: Array<string> | undefined;
        _additionalInfo?: Element[] | undefined;
      
        addressContactPoint?: ContactPoint | undefined;
        _addressContactPoint?: Element | undefined;
      
        addressExtendedContactDetail?: ExtendedContactDetail | undefined;
        _addressExtendedContactDetail?: Element | undefined;
      
        addressString?: string | undefined;
        _addressString?: Element | undefined;
      
        addressUrl?: string | undefined;
        _addressUrl?: Element | undefined;
      
        channelType?: Coding | undefined;
        _channelType?: Element | undefined;
      
        maxParticipants?: number | undefined;
        _maxParticipants?: Element | undefined;
      
        sessionKey?: string | undefined;
        _sessionKey?: Element | undefined;
      
    }

  


  
    /**
 * VisionPrescription
 * 
 * An authorization for the provision of glasses and/or contact lenses to a
 * patient.
 * 
 * @see {@link http://hl7.org/fhir/R5/VisionPrescription.html}
 */
    export interface VisionPrescription extends DomainResource {
      
      readonly resourceType: "VisionPrescription";
      

      
        created: string;
        _created?: Element | undefined;
      
        dateWritten: string;
        _dateWritten?: Element | undefined;
      
        encounter?: Reference | undefined;
        _encounter?: Element | undefined;
      
        identifier?: Array<Identifier> | undefined;
        _identifier?: Element[] | undefined;
      
        lensSpecification: Array<BackboneElement>;
        _lensSpecification?: Element[] | undefined;
      
        add?: number | undefined;
        _add?: Element | undefined;
      
        axis?: number | undefined;
        _axis?: Element | undefined;
      
        backCurve?: number | undefined;
        _backCurve?: Element | undefined;
      
        brand?: string | undefined;
        _brand?: Element | undefined;
      
        color?: string | undefined;
        _color?: Element | undefined;
      
        cylinder?: number | undefined;
        _cylinder?: Element | undefined;
      
        diameter?: number | undefined;
        _diameter?: Element | undefined;
      
        duration?: Quantity | undefined;
        _duration?: Element | undefined;
      
        eye: string;
        _eye?: Element | undefined;
      
        note?: Array<Annotation> | undefined;
        _note?: Element[] | undefined;
      
        power?: number | undefined;
        _power?: Element | undefined;
      
        prism?: Array<BackboneElement> | undefined;
        _prism?: Element[] | undefined;
      
        amount: number;
        _amount?: Element | undefined;
      
        base: string;
        _base?: Element | undefined;
      
        product: CodeableConcept;
        _product?: Element | undefined;
      
        sphere?: number | undefined;
        _sphere?: Element | undefined;
      
        patient: Reference;
        _patient?: Element | undefined;
      
        prescriber: Reference;
        _prescriber?: Element | undefined;
      
        status: string;
        _status?: Element | undefined;
      
    }

  


  

