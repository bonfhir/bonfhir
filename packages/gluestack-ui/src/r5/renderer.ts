import { FhirUIRenderer } from "@bonfhir/react/r5";

import { GlueStackFhirValue } from "./data-display/index";
import { GlueStackFhirError, GlueStackFhirQueryLoader } from "./feedback/index";

export const GluestackUIRenderer: Partial<FhirUIRenderer> = {
  FhirValue: GlueStackFhirValue,
  FhirError: GlueStackFhirError,
  FhirQueryLoader: GlueStackFhirQueryLoader,
};
