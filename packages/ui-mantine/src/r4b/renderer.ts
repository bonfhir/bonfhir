import { FhirUIRenderer } from "@bonfhir/ui/r4b";
import { MantineFhirValue } from "./data-display/fhir-value.js";

export const MantineRenderer: FhirUIRenderer = {
  FhirValue: MantineFhirValue,
};
