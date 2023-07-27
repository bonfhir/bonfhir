import {
  AnyResourceTypeOrCustomResource,
  BundleNavigator,
  FhirClient,
  ResourceOf,
  Retrieved,
  resourceTypeOf,
} from "@bonfhir/core/r5";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys";
import { useFhirClientQueryContext } from "../context";

export interface UseFhirGraphOptions<
  TResourceType extends AnyResourceTypeOrCustomResource,
> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  fhir?: Omit<Parameters<FhirClient["search"]>[2], "signal"> | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          BundleNavigator<Retrieved<ResourceOf<TResourceType>>>,
          unknown,
          BundleNavigator<Retrieved<ResourceOf<TResourceType>>>,
          ReturnType<(typeof FhirQueryKeys)["search"]>
        >,
        "initialData" | "queryKey" | "queryFn"
      >
    | null
    | undefined;
}

/**
 * Execute a [$graph operation](http://hl7.org/fhir/R4B/resource-operation-graph.html) to retrieve an entire graph
 * of resources.
 *
 * @see http://hl7.org/fhir/R4B/resource-operation-graph.html
 */
export function UseFhirGraph<
  TResourceType extends AnyResourceTypeOrCustomResource,
>(
  graph: string,
  resourceType?: TResourceType | null | undefined,
  resourceId?: string | null | undefined,
  options?: UseFhirGraphOptions<TResourceType> | null | undefined,
): UseQueryResult<BundleNavigator<Retrieved<ResourceOf<TResourceType>>>> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);

  return useQuery({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.query as any),
    queryKey: FhirQueryKeys.execute(fhirQueryContext.clientKey, {
      operation: "$graph",
      resourceType: resourceTypeOf(resourceType),
      resourceId,
      affectsState: false,
    }),
    queryFn: () =>
      fhirQueryContext.fhirClient.graph(graph, resourceType, resourceId),
  });
}
