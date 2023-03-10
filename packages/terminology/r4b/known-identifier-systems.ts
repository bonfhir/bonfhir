import { IdentifierTypeCodes } from "./valuesets";

/**
 * Know Identifier Systems / Identifier Registry
 * https://hl7.org/fhir/identifier-registry.html
 */
export const KnownIdentifierSystems = Object.freeze({
  /**
   * As defined by [RFC 3986](http://www.ietf.org/rfc/rfc3986.txt) (with many schemes defined in many RFCs).
   * For OIDs and UUIDs, use the URN form ([urn:oid:](http://www.ietf.org/rfc/rfc3001.txt) (note: lowercase)
   * and [urn:uuid:](http://www.ietf.org/rfc/rfc4122.txt)
   */
  URI: {
    system: "urn:ietf:rfc:3986",
  },

  /**
   * An OID issued under DICOM OID rules. DICOM OIDs are represented as plain OIDs, with a prefix of "urn:oid:"
   */
  DICOMUniqueId: {
    system: "urn:dicom:uid",
  },

  /**
   * The SSN is represented in resources with dashes removed.
   */
  USSocialSecurityNumber: {
    system: "http://hl7.org/fhir/sid/us-ssn",
    type: IdentifierTypeCodes.values["Social Beneficiary Identifier"]
      .codeableConcept,
  },

  /**
   * Medicare Numbers (HIC or HICN) are represented without any spaces or dashes
   */
  USMedicareNumber: {
    system: "http://hl7.org/fhir/sid/us-medicare",
    type: IdentifierTypeCodes.values["Social Beneficiary Identifier"]
      .codeableConcept,
  },

  /**
   * Medicare Beneficiary Identifiers are represented without any spaces or dashes
   */
  USMedicareBeneficiaryIdentifier: {
    system: "http://hl7.org/fhir/sid/us-mbi",
    type: IdentifierTypeCodes.values["Social Beneficiary Identifier"]
      .codeableConcept,
  },

  USNationalProviderIdentifier: {
    system: "http://hl7.org/fhir/sid/us-npi",
    type: IdentifierTypeCodes.values["Provider number"].codeableConcept,
  },

  /**
   * GTIN
   */
  GlobalTradeItemNumber: {
    system: "https://www.gs1.org/gtin",
  },
} as const);
