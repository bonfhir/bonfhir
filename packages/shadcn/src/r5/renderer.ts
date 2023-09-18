import { FhirUIRenderer } from "@bonfhir/react/r5";
import { ShadcnFhirValue } from "./data-display";
import { ShadcnFhirInputString } from "./inputs";

export const ShadcnRenderer: Partial<FhirUIRenderer> = {
  FhirInputString: ShadcnFhirInputString,
  FhirValue: ShadcnFhirValue,
};
