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

export interface UseFhirReadOptions<TResourceType extends AnyResourceType> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  fhir?: Omit<Parameters<FhirClient["read"]>[2], "signal"> | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          Retrieved<ExtractResource<TResourceType>>,
          unknown,
          Retrieved<ExtractResource<TResourceType>>,
          ReturnType<(typeof FhirQueryKeys)["read"]>
        >,
        "initialData" | "queryKey" | "queryFn"
      >
    | null
    | undefined;
}

export interface UseFhirReadOptionsCustom<
  TCustomResourceClass extends CustomResourceClass
> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  fhir?: Parameters<FhirClient["read"]>[2] | null | undefined;
  query?:
    | Omit<
        UseQueryOptions<
          Retrieved<InstanceType<TCustomResourceClass>>,
          unknown,
          Retrieved<InstanceType<TCustomResourceClass>>,
          ReturnType<(typeof FhirQueryKeys)["read"]>
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
export function useFhirRead<TResourceType extends AnyResourceType>(
  type: TResourceType,
  id: string,
  options?: UseFhirReadOptions<TResourceType> | null | undefined
): UseQueryResult<Retrieved<ExtractResource<TResourceType>>>;
export function useFhirRead<TCustomResourceClass extends CustomResourceClass>(
  type: TCustomResourceClass,
  id: string,
  options?: UseFhirReadOptionsCustom<TCustomResourceClass> | null | undefined
): UseQueryResult<Retrieved<InstanceType<TCustomResourceClass>>>;
export function useFhirRead<
  TResourceType extends AnyResourceType,
  TCustomResourceClass extends CustomResourceClass
>(
  type: TResourceType | TCustomResourceClass,
  id: string,
  options?:
    | UseFhirReadOptions<TResourceType>
    | UseFhirReadOptionsCustom<TCustomResourceClass>
    | null
    | undefined
):
  | UseQueryResult<Retrieved<ExtractResource<TResourceType>>>
  | UseQueryResult<Retrieved<InstanceType<TCustomResourceClass>>> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);

  return useQuery<Retrieved<ExtractResource<TResourceType>>>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.query as any),
    queryKey: FhirQueryKeys.read(
      fhirQueryContext.clientKey,
      type,
      id,
      options?.fhir
    ),
    queryFn: ({ signal }) =>
      fhirQueryContext.fhirClient.read(type as TResourceType, id, {
        ...options?.fhir,
        signal: signal ?? undefined,
      }),
  });
}
