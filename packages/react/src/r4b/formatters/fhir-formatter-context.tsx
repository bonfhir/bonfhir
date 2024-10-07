import { Formatter } from "@bonfhir/core/r4b";
import { createContext, useContext } from "react";

export type FhirFormatterDefinition = { formatter: Formatter }; // redirecting in case we add strictly react-functionalities

export const FhirFormatterContext = createContext<FhirFormatterDefinition>({
  formatter: Formatter.default,
} as FhirFormatterDefinition);

/**
 * @returns the value formatters available for FHIR values
 * @example
 * const { formatter } = useFhirFormatter();
 *
 * const totalCosts = formatter.format('Money', costs);
 */
export const useFhirFormatter = () => {
  const context = useContext(FhirFormatterContext);
  if (!context || !context.formatter) {
    throw new Error(
      "Missing FhirFormattersContext. Did you forget to use a parent FhirFormatterProvider?",
    );
  }

  return context;
};
