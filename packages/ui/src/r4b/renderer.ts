import type { FhirTableRenderer } from "./data-display/fhir-table.js";
import type { FhirValueRenderer } from "./data-display/fhir-value.js";
import { FhirQueryLoaderRenderer } from "./feedback/fhir-query-loader.js";
import { FhirInputDateRenderer } from "./inputs/input-types/fhir-input-date.js";
import { FhirInputStringRenderer } from "./inputs/input-types/fhir-input-string.js";
import { FhirPaginationRenderer } from "./navigation/fhir-pagination.js";

export interface FhirUIRenderer {
  FhirInputDate: FhirInputDateRenderer;
  FhirInputString: FhirInputStringRenderer;
  FhirPagination: FhirPaginationRenderer;
  FhirQueryLoader: FhirQueryLoaderRenderer;
  FhirTable: FhirTableRenderer;
  FhirValue: FhirValueRenderer;
}
