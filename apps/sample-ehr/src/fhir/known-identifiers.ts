import { codeableConcept } from "@bonfhir/core/r4b";
import { IdentifierSystem } from "@bonfhir/ui/r4b";

export const PatientIdentifierSystems: IdentifierSystem[] = [
  {
    system: "http://hl7.org/fhir/sid/us-ssn",
    label: "SSN",
    type: codeableConcept({
      code: "SS",
      display: "Social Security number",
      system: "http://terminology.hl7.org/CodeSystem/v2-0203",
    }),
    processValue: (value) => value.replace(/\W/g, ""),
  },
  {
    system: "http://hl7.org/fhir/sid/us-mbi",
    label: "MBI",
    type: codeableConcept({
      code: "MC",
      display: "Patient's Medicare number",
      system: "http://terminology.hl7.org/CodeSystem/v2-0203",
    }),
    processValue: (value) => value.replace(/\W/g, ""),
  },
];

export const SystemLabels = PatientIdentifierSystems.reduce((acc, cur) => {
  acc[cur.system] = cur.label || cur.system;
  return acc;
}, {} as Record<string, string>);
