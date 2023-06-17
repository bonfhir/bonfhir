import type {
  FhirTableRenderer,
  FhirValueRenderer,
} from "./data-display/index.js";
import type { FhirQueryLoaderRenderer } from "./feedback/index.js";
import type {
  FhirInputArrayRenderer,
  FhirInputBooleanRenderer,
  FhirInputContactPointRenderer,
  FhirInputDateRenderer,
  FhirInputDateTimeRenderer,
  FhirInputHumanNameRenderer,
  FhirInputIdentifierRenderer,
  FhirInputNumberRenderer,
  FhirInputResourceRenderer,
  FhirInputStringRenderer,
  FhirInputTerminologyRenderer,
  FhirInputTimeRenderer,
} from "./inputs/index.js";
import type { FhirPaginationRenderer } from "./navigation/index.js";

export interface FhirUIRenderer {
  FhirInputArray: FhirInputArrayRenderer;
  FhirInputBoolean: FhirInputBooleanRenderer;
  FhirInputContactPoint: FhirInputContactPointRenderer;
  FhirInputDate: FhirInputDateRenderer;
  FhirInputDateTime: FhirInputDateTimeRenderer;
  FhirInputIdentifier: FhirInputIdentifierRenderer;
  FhirInputHumanName: FhirInputHumanNameRenderer;
  FhirInputNumber: FhirInputNumberRenderer;
  FhirInputResource: FhirInputResourceRenderer;
  FhirInputString: FhirInputStringRenderer;
  FhirInputTerminology: FhirInputTerminologyRenderer;
  FhirInputTime: FhirInputTimeRenderer;
  FhirPagination: FhirPaginationRenderer;
  FhirQueryLoader: FhirQueryLoaderRenderer;
  FhirTable: FhirTableRenderer;
  FhirValue: FhirValueRenderer;
}
