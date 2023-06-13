import type { FhirTableRenderer } from "./data-display/fhir-table.js";
import type { FhirValueRenderer } from "./data-display/fhir-value.js";
import type { FhirQueryLoaderRenderer } from "./feedback/fhir-query-loader.js";
import type {
  FhirInputBooleanRenderer,
  FhirInputDateRenderer,
  FhirInputDateTimeRenderer,
  FhirInputHumanNameRenderer,
  FhirInputNumberRenderer,
  FhirInputStringRenderer,
  FhirInputTerminologyRenderer,
} from "./inputs/input-types/index.js";
import type { FhirPaginationRenderer } from "./navigation/fhir-pagination.js";

export interface FhirUIRenderer {
  FhirInputBoolean: FhirInputBooleanRenderer;
  FhirInputDate: FhirInputDateRenderer;
  FhirInputDateTime: FhirInputDateTimeRenderer;
  FhirInputHumanName: FhirInputHumanNameRenderer;
  FhirInputNumber: FhirInputNumberRenderer;
  FhirInputString: FhirInputStringRenderer;
  FhirInputTerminology: FhirInputTerminologyRenderer;
  FhirPagination: FhirPaginationRenderer;
  FhirQueryLoader: FhirQueryLoaderRenderer;
  FhirTable: FhirTableRenderer;
  FhirValue: FhirValueRenderer;
}
