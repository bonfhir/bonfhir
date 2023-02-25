import { FhirUIComponentsRenderer } from "@bonfhir/ui-components/r4b";
import { empty } from "./empty";
import { errorPanel } from "./error-panel";
import { loader } from "./loader";
import { table } from "./table";
import { value } from "./value";

export const antdFhirUIComponentsRenderer = (): FhirUIComponentsRenderer => ({
  empty,
  errorPanel,
  loader,
  table: table as any,
  value: value as any,
});
