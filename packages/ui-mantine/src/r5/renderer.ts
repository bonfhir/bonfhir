import { FhirUIRenderer } from "@bonfhir/ui/r5";
import { MantineFhirTable } from "./data-display/fhir-table.js";
import { MantineFhirValue } from "./data-display/fhir-value.js";
import { MantineFhirPagination, MantineFhirQueryLoader } from "./index.js";

export const MantineRenderer: FhirUIRenderer = {
  FhirPagination: MantineFhirPagination,
  FhirQueryLoader: MantineFhirQueryLoader,
  FhirTable: MantineFhirTable,
  FhirValue: MantineFhirValue,
};
