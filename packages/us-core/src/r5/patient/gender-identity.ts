import { extension } from "@bonfhir/core/r5";

/**
 * https://hl7.org/fhir/us/core/StructureDefinition-us-core-genderIdentity.html
 */
export const US_CORE_GENDER_IDENTITY_URL =
  "http://hl7.org/fhir/us/core/StructureDefinition/us-core-genderIdentity";

/**
 * https://hl7.org/fhir/us/core/StructureDefinition-us-core-genderIdentity.html
 */
export function usCorePatientGenderIdentity() {
  return extension({
    kind: "valueCodeableConcept",
    url: US_CORE_GENDER_IDENTITY_URL,
  });
}
