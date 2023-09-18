import { FhirUIRenderer } from "@bonfhir/react/r4b";
import { ShadcnFhirValue } from "./data-display";
import { ShadcnFhirInputString } from "./inputs";

export const ShadcnRenderer: Partial<FhirUIRenderer> = {
  FhirInputString: ShadcnFhirInputString,
  FhirValue: ShadcnFhirValue,
};
