import { Formatter } from "@bonfhir/core/r4b";
import { createContext, useContext } from "react";
import { FhirUIRenderer } from "./renderer.js";

export interface FhirUIContext {
  formatter: Formatter;
  renderer: FhirUIRenderer;
}

/**
 * The context used by FHIR UI Components.
 */
export const FhirUIContext = createContext<FhirUIContext | undefined>(
  undefined
);

/**
 * Get the current {@link FhirUIContext}.
 *
 * @throws Error if no parent context exists (a.k.a. no `FhirUIProvider` was used in the parent tree).
 */
export const useFhirUIContext = (): FhirUIContext => {
  const context = useContext(FhirUIContext);
  if (!context) {
    throw new Error(
      "Missing FhirUIContext. Did you forget to use a parent FhirUIProvider?"
    );
  }

  return context;
};
