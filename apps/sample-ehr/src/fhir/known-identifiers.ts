import { codeableConcept } from "@bonfhir/core/r4b";
import { IdentifierSystem } from "@bonfhir/react/r4b";

export const PatientIdentifierSystems: IdentifierSystem[] = [
  {
    system: "http://hl7.org/fhir/sid/us-ssn",
    label: "SSN",
    type: codeableConcept({
      code: "SS",
      display: "Social Security number",
      system: "http://terminology.hl7.org/CodeSystem/v2-0203",
    }),
    processValue: (value) => value.replaceAll(/\W/g, ""),
  },
  {
    system: "http://hl7.org/fhir/sid/us-mbi",
    label: "MBI",
    type: codeableConcept({
      code: "MC",
      display: "Patient's Medicare number",
      system: "http://terminology.hl7.org/CodeSystem/v2-0203",
    }),
    processValue: (value) => value.replaceAll(/\W/g, ""),
  },
  {
    system: "https://github.com/synthetichealth/synthea",
    label: "Synthetic ID",
  },
  {
    system: "http://hospital.smarthealthit.org",
    label: "Medical Record Number",
    type: codeableConcept({
      code: "MR",
      display: "Medical Record Number",
      system: "http://terminology.hl7.org/CodeSystem/v2-0203",
    }),
  },
  {
    system: "urn:oid:2.16.840.1.113883.4.3.25",
    label: "Driver's License",
    type: codeableConcept({
      code: "DL",
      display: "Driver's License",
      system: "http://terminology.hl7.org/CodeSystem/v2-0203",
    }),
    processValue: (value) => value.replaceAll(/\W/g, ""),
  },
  {
    system:
      "http://standardhealthrecord.org/fhir/StructureDefinition/passportNumber",
    label: "Passport Number",
    type: codeableConcept({
      code: "PPN",
      system: "http://terminology.hl7.org/CodeSystem/v2-0203",
      display: "Passport Number",
    }),
    processValue: (value) => value.replaceAll(/\W/g, ""),
  },
];

export const SystemLabels = PatientIdentifierSystems.reduce(
  (acc, cur) => {
    acc[cur.system] = cur.label || cur.system;
    return acc;
  },
  {} as Record<string, string>,
);
