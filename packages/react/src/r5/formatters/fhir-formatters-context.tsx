import { Formatter } from "@bonfhir/core/r5";
import { createContext, useContext } from "react";

type FhirFormatters = Formatter; // redirecting in case we add strictly react-functionalities

export const FhirFormattersContext = createContext<FhirFormatters>(
  {} as FhirFormatters,
);

/**
 * @returns the value formatters available for FHIR values
 * @example
 * const formatters = useFhirFormatters();
 *
 * const totalCosts = formatters.format('Money', costs);
 *
 * @example
 * const { format } = useFhirFormatters();
 *
 * const totalCosts = format('Money', costs);
 */
export const useFhirFormatters = () => useContext(FhirFormattersContext);
