import { Formatter } from "@bonfhir/core/r5";
import { createContext, useContext } from "react";
export type FhirFormatters = { formatter: Formatter }; // redirecting in case we add strictly react-functionalities

export const FhirFormattersContext = createContext<FhirFormatters>({
  formatter: Formatter.default,
} as FhirFormatters);

/**
 * @returns the value formatters available for FHIR values
 * @example
 * const { formatter } = useFhirFormatters();
 *
 * const totalCosts = formatters.format('Money', costs);
 */
export const useFhirFormatters = () => {
  const context = useContext(FhirFormattersContext);
  if (!context || !context.formatter) {
    throw new Error(
      "Missing FhirFormattersContext. Did you forget to use a parent FhirFormattersProvider?",
    );
  }

  return context;
};
