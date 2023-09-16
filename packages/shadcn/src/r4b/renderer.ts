import { FhirUIRenderer } from "@bonfhir/react/r4b";
import { ShadcnFhirValue } from "./data-display";

export const ShadcnRenderer: Partial<FhirUIRenderer> = {
  FhirValue: ShadcnFhirValue,
};
