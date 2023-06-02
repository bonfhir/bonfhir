import type { FhirValueRenderer } from "./data-display/fhir-value.js";

export interface FhirUIRenderer {
  FhirValue: FhirValueRenderer;
}
