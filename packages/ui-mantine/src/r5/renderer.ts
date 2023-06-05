import { FhirUIRenderer } from "@bonfhir/ui/r5";
import { MantineFhirTable } from "./data-display/fhir-table.js";
import { MantineFhirValue } from "./data-display/fhir-value.js";
import { MantineFhirPagination } from "./index.js";

export const MantineRenderer: FhirUIRenderer = {
  FhirPagination: MantineFhirPagination,
  FhirTable: MantineFhirTable,
  FhirValue: MantineFhirValue,
};
