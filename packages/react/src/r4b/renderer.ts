import type { FhirTableRenderer, FhirValueRenderer } from "./data-display";
import { FhirFormatterRenderer } from "./data-display";
import type { FhirErrorRenderer, FhirQueryLoaderRenderer } from "./feedback";
import type {
  FhirInputArrayRenderer,
  FhirInputBooleanRenderer,
  FhirInputContactPointRenderer,
  FhirInputDateRenderer,
  FhirInputDateTimeRenderer,
  FhirInputDurationRenderer,
  FhirInputHumanNameRenderer,
  FhirInputIdentifierRenderer,
  FhirInputMarkdownRenderer,
  FhirInputNumberRenderer,
  FhirInputQuantityRenderer,
  FhirInputResourceRenderer,
  FhirInputStringRenderer,
  FhirInputTerminologyRenderer,
  FhirInputTimeRenderer,
  FhirQuestionnaireRenderer,
} from "./inputs";
import type {
  FhirInfiniteMarkerRenderer,
  FhirPaginationRenderer,
} from "./navigation";

export interface FhirUIRenderer {
  FhirError: FhirErrorRenderer;
  FhirFormatter: FhirFormatterRenderer;
  FhirInfiniteMarker: FhirInfiniteMarkerRenderer;
  FhirInputArray: FhirInputArrayRenderer;
  FhirInputBoolean: FhirInputBooleanRenderer;
  FhirInputContactPoint: FhirInputContactPointRenderer;
  FhirInputDate: FhirInputDateRenderer;
  FhirInputDateTime: FhirInputDateTimeRenderer;
  FhirInputDuration: FhirInputDurationRenderer;
  FhirInputIdentifier: FhirInputIdentifierRenderer;
  FhirInputHumanName: FhirInputHumanNameRenderer;
  FhirInputMarkdown: FhirInputMarkdownRenderer;
  FhirInputNumber: FhirInputNumberRenderer;
  FhirInputQuantity: FhirInputQuantityRenderer;
  FhirInputResource: FhirInputResourceRenderer;
  FhirInputString: FhirInputStringRenderer;
  FhirInputTerminology: FhirInputTerminologyRenderer;
  FhirInputTime: FhirInputTimeRenderer;
  FhirPagination: FhirPaginationRenderer;
  FhirQueryLoader: FhirQueryLoaderRenderer;
  FhirQuestionnaire: FhirQuestionnaireRenderer;
  FhirTable: FhirTableRenderer;
  FhirValue: FhirValueRenderer;
}
