/* eslint-disable @typescript-eslint/no-explicit-any */
import { CapabilityStatement, TerminologyCapabilities } from "@bonfhir/core/r5";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys";
import { useFhirClientQueryContext } from "../context";

export interface UseFhirCapabilitiesOptions<
  TResourceType extends CapabilityStatement | TerminologyCapabilities,
> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          TResourceType,
          unknown,
          TResourceType,
          ReturnType<(typeof FhirQueryKeys)["capabilities"]>
        >,
        "initialData" | "queryKey" | "queryFn"
      >
    | null
    | undefined;
}

/**
 * The capabilities interaction retrieves the information about a server's capabilities - which portions of this specification it supports.
 *
 * https://hl7.org/fhir/http.html#capabilities
 */
export function useFhirCapabilities(
  mode?: "full" | "normative" | null | undefined,
  options?: UseFhirCapabilitiesOptions<CapabilityStatement> | null | undefined,
): UseQueryResult<CapabilityStatement>;
export function useFhirCapabilities(
  mode: "terminology",
  options?:
    | UseFhirCapabilitiesOptions<TerminologyCapabilities>
    | null
    | undefined,
): UseQueryResult<TerminologyCapabilities>;
export function useFhirCapabilities(
  mode?: "full" | "normative" | "terminology" | null | undefined,
  options?: UseFhirCapabilitiesOptions<any> | null | undefined,
): UseQueryResult<CapabilityStatement | TerminologyCapabilities> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);

  return useQuery({
    ...(options?.query as any),
    queryKey: FhirQueryKeys.capabilities(fhirQueryContext.clientKey, mode),
    queryFn: () => fhirQueryContext.fhirClient.capabilities(mode as any),
  });
}
