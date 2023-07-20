import { extension } from "@bonfhir/core/r4b";

/**
 * https://hl7.org/fhir/us/core/StructureDefinition-us-core-birthsex.html
 */
export const US_CORE_BIRTH_SEX_URL =
  "http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex";

/**
 * http://hl7.org/fhir/us/core/ValueSet/birthsex
 */
export type UsCoreBirthSex = "F" | "M" | "ASKU" | "OTH" | "UNK";

/**
 * https://hl7.org/fhir/us/core/StructureDefinition-us-core-birthsex.html
 *
 * http://hl7.org/fhir/us/core/ValueSet/birthsex
 */
export function usCorePatientBirthSex(): UsCoreBirthSex | undefined {
  return extension({
    kind: "valueCode",
    url: US_CORE_BIRTH_SEX_URL,
  }) as UsCoreBirthSex | undefined;
}
