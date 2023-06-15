import {
  AnyResourceType,
  CustomResourceClass,
  ExtractResource,
  FhirClient,
  Retrieved,
} from "@bonfhir/core/r4b";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys.js";
import { useFhirClientQueryContext } from "../context.js";

export interface UseFhirVReadOptions<TResourceType extends AnyResourceType> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  fhir?: Omit<Parameters<FhirClient["vread"]>[3], "signal"> | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          Retrieved<ExtractResource<TResourceType>>,
          unknown,
          Retrieved<ExtractResource<TResourceType>>,
          ReturnType<(typeof FhirQueryKeys)["vread"]>
        >,
        "initialData" | "queryKey" | "queryFn"
      >
    | null
    | undefined;
}

export interface UseFhirVReadOptionsCustom<
  TCustomResourceClass extends CustomResourceClass
> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  fhir?: Parameters<FhirClient["vread"]>[3] | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          Retrieved<InstanceType<TCustomResourceClass>>,
          unknown,
          Retrieved<InstanceType<TCustomResourceClass>>,
          ReturnType<(typeof FhirQueryKeys)["vread"]>
        >,
        "initialData" | "queryKey" | "queryFn"
      >
    | null
    | undefined;
}

/**
 * Return a [Query](https://tanstack.com/query/latest/docs/react/guides/queries) for a vread request.
 *
 * @see https://hl7.org/fhir/http.html#vread
 */
export function useFhirVRead<TResourceType extends AnyResourceType>(
  type: TResourceType,
  id: string,
  vid: string,
  options?: UseFhirVReadOptions<TResourceType> | null | undefined
): UseQueryResult<Retrieved<ExtractResource<TResourceType>>>;
export function useFhirVRead<TCustomResourceClass extends CustomResourceClass>(
  type: TCustomResourceClass,
  id: string,
  vid: string,
  options?: UseFhirVReadOptionsCustom<TCustomResourceClass> | null | undefined
): UseQueryResult<Retrieved<InstanceType<TCustomResourceClass>>>;
export function useFhirVRead<
  TResourceType extends AnyResourceType,
  TCustomResourceClass extends CustomResourceClass
>(
  type: TResourceType | TCustomResourceClass,
  id: string,
  vid: string,
  options?:
    | UseFhirVReadOptions<TResourceType>
    | UseFhirVReadOptionsCustom<TCustomResourceClass>
    | null
    | undefined
):
  | UseQueryResult<Retrieved<ExtractResource<TResourceType>>>
  | UseQueryResult<Retrieved<InstanceType<TCustomResourceClass>>> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);

  return useQuery<Retrieved<ExtractResource<TResourceType>>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.query as any),
    queryKey: FhirQueryKeys.vread(
      fhirQueryContext.clientKey,
      type,
      id,
      vid,
      options?.fhir
    ),
    queryFn: ({ signal }) =>
      fhirQueryContext.fhirClient.vread(type as TResourceType, id, vid, {
        ...options?.fhir,
        signal,
      }),
  });
}
