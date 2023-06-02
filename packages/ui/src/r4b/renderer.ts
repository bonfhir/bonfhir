import type {
  FhirTableRenderer,
  FhirValueRenderer,
} from "./data-display/index.js";

export interface FhirUIRenderer {
  FhirTable: FhirTableRenderer;
  FhirValue: FhirValueRenderer;
}
