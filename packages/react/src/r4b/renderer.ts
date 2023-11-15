import type {
  FhirTableRenderer,
  FhirValueRenderer,
} from "./data-display/index";
import type {
  FhirErrorRenderer,
  FhirQueryLoaderRenderer,
} from "./feedback/index";
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
} from "./inputs/index";
import type { FhirPaginationRenderer } from "./navigation/index";

export interface FhirUIRenderer {
  FhirError: FhirErrorRenderer;
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
