import { FhirUIRenderer } from "@bonfhir/react/r4b";

import { GlueStackFhirValue } from "./data-display/index";

export const GluestackUIRenderer: Partial<FhirUIRenderer> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FhirValue: GlueStackFhirValue,
};
