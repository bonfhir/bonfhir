import { FhirUIRenderer } from "@bonfhir/ui/r5";
import { MantineFhirTable } from "./data-display/fhir-table.js";
import { MantineFhirValue } from "./data-display/fhir-value.js";
import { MantineFhirPagination, MantineFhirQueryLoader } from "./index.js";
import { MantineFhirInputCode } from "./inputs/input-types/fhir-input-code.js";
import { MantineFhirInputDateTime } from "./inputs/input-types/fhir-input-date-time.js";
import { MantineFhirInputDate } from "./inputs/input-types/fhir-input-date.js";
import { MantineFhirInputString } from "./inputs/input-types/fhir-input-string.js";

export const MantineRenderer: FhirUIRenderer = {
  FhirInputCode: MantineFhirInputCode,
  FhirInputDate: MantineFhirInputDate,
  FhirInputDateTime: MantineFhirInputDateTime,
  FhirInputString: MantineFhirInputString,
  FhirPagination: MantineFhirPagination,
  FhirQueryLoader: MantineFhirQueryLoader,
  FhirTable: MantineFhirTable,
  FhirValue: MantineFhirValue,
};
