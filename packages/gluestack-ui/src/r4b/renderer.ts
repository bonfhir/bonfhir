import { FhirUIRenderer } from "@bonfhir/react/r4b";

import {
  GlueStackFhirFormatter,
  GlueStackFhirValue,
} from "./data-display/index";
import { GlueStackFhirError, GlueStackFhirQueryLoader } from "./feedback/index";

export const GluestackUIRenderer: Partial<FhirUIRenderer> = {
  FhirValue: GlueStackFhirValue,
  FhirFormatter: GlueStackFhirFormatter,
  FhirError: GlueStackFhirError,
  FhirQueryLoader: GlueStackFhirQueryLoader,
};
