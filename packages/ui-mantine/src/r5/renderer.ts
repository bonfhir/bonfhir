import { FhirUIRenderer } from "@bonfhir/ui/r5";
import { MantineFhirTable } from "./data-display/fhir-table.js";
import { MantineFhirValue } from "./data-display/fhir-value.js";

export const MantineRenderer: FhirUIRenderer = {
  FhirTable: MantineFhirTable,
  FhirValue: MantineFhirValue,
};
