import { FhirUIRenderer } from "@bonfhir/ui/r5";
import { MantineFhirValue } from "./data-display/fhir-value.js";

export const MantineRenderer: FhirUIRenderer = {
  FhirValue: MantineFhirValue,
};
