import { FhirUIRenderer } from "@bonfhir/react/r5";
import { ShadcnFhirValue } from "./data-display";

export const ShadcnRenderer: Partial<FhirUIRenderer> = {
  FhirValue: ShadcnFhirValue,
};
