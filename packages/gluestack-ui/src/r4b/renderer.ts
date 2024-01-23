import { FhirUIRenderer } from "@bonfhir/react/r4b";

import { GlueStackFhirValue } from "./data-display/index";
import { GlueStackFhirError, GlueStackFhirQueryLoader } from "./feedback/index";

export const GluestackUIRenderer: Partial<FhirUIRenderer> = {
  FhirValue: GlueStackFhirValue,
  FhirError: GlueStackFhirError,
  FhirQueryLoader: GlueStackFhirQueryLoader,
};
