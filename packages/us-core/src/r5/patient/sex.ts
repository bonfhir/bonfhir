import { extension } from "@bonfhir/core/r5";

/**
 * https://hl7.org/fhir/us/core/StructureDefinition-us-core-sex.html
 */
export const US_CORE_SEX_URL =
  "http://hl7.org/fhir/us/core/StructureDefinition/us-core-sex";

/**
 * https://vsac.nlm.nih.gov/valueset/2.16.840.1.113762.1.4.1240.3/expansion
 */
export type UsCoreSex =
  | "184115007"
  | "248152002"
  | "248153007"
  | "asked-declined";

/**
 * https://hl7.org/fhir/us/core/StructureDefinition-us-core-sex.html
 *
 * https://vsac.nlm.nih.gov/valueset/2.16.840.1.113762.1.4.1240.3/expansion
 */
export function usCorePatientSex(): UsCoreSex | undefined {
  return extension({
    kind: "valueCode",
    url: US_CORE_SEX_URL,
  }) as UsCoreSex | undefined;
}
