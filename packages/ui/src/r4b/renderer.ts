import type {
  FhirTableRenderer,
  FhirValueRenderer,
} from "./data-display/index.js";
import type { FhirQueryLoaderRenderer } from "./feedback/index.js";
import type {
  FhirInputArrayRenderer,
  FhirInputBooleanRenderer,
  FhirInputDateRenderer,
  FhirInputDateTimeRenderer,
  FhirInputHumanNameRenderer,
  FhirInputNumberRenderer,
  FhirInputStringRenderer,
  FhirInputTerminologyRenderer,
} from "./inputs/index.js";
import type { FhirPaginationRenderer } from "./navigation/index.js";

export interface FhirUIRenderer {
  FhirInputArray: FhirInputArrayRenderer;
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
