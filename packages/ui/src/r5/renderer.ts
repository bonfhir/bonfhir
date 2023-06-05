import type {
  FhirTableRenderer,
  FhirValueRenderer,
} from "./data-display/index.js";
import { FhirPaginationRenderer } from "./index.js";

export interface FhirUIRenderer {
  FhirPagination: FhirPaginationRenderer;
  FhirTable: FhirTableRenderer;
  FhirValue: FhirValueRenderer;
}
