/* eslint-disable @typescript-eslint/no-explicit-any */
import { FhirUIComponentsRenderer } from "@bonfhir/ui-components/r4b";
import { empty } from "./empty";
import { errorPanel } from "./error-panel";
import { input } from "./input";
import { loader } from "./loader";
import { resource } from "./resource";
import { table } from "./table";
import { value } from "./value";

export const antdFhirUIComponentsRenderer = (): FhirUIComponentsRenderer => ({
  empty,
  errorPanel,
  input,
  loader,
  resource: resource as any,
  table: table as any,
  value: value as any,
});
