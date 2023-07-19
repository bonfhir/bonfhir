import {
  AnyResourceType,
  CapabilityStatement,
  ExtractResource,
  Retrieved,
} from "@bonfhir/core/r5";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys";
import { useFhirClientQueryContext } from "../context";

export interface UseFhirCapabilitiesOptions<
  TResourceType extends AnyResourceType,
> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          Retrieved<ExtractResource<TResourceType>>,
          unknown,
          Retrieved<ExtractResource<TResourceType>>,
          ReturnType<(typeof FhirQueryKeys)["capabilities"]>
        >,
        "initialData" | "queryKey" | "queryFn"
      >
    | null
    | undefined;
}

/**
 * Return a [Query](https://tanstack.com/query/latest/docs/react/guides/queries) for a read request.
 *
 * @see https://hl7.org/fhir/http.html#read
 */
export function useFhirCapabilities<TResourceType extends AnyResourceType>(
  mode?: "full" | "normative" | "terminology" | null | undefined,
  options?: UseFhirCapabilitiesOptions<TResourceType> | null | undefined,
): UseQueryResult<CapabilityStatement> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);

  return useQuery({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.query as any),
    queryKey: FhirQueryKeys.capabilities(fhirQueryContext.clientKey, mode),
    queryFn: () => fhirQueryContext.fhirClient.capabilities(mode),
  });
}
