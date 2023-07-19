import {
  AnyResourceType,
  ConcurrencyParameters,
  ConditionalSearchParameters,
  ExtractResource,
  GeneralParameters,
  Retrieved,
  isResource,
} from "@bonfhir/core/r4b";
import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys";
import { useFhirClientQueryContext } from "../context";

export type UseFhirSaveMutationArgs<TResourceType extends AnyResourceType> =
  | {
      body: ExtractResource<TResourceType>;
      options?:
        | (GeneralParameters &
            ConcurrencyParameters &
            ConditionalSearchParameters<TResourceType>)
        | null
        | undefined;
    }
  | ExtractResource<TResourceType>;

export interface UseFhirSaveMutationOptions<
  TResourceType extends AnyResourceType,
> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  mutation?:
    | Omit<
        UseMutationOptions<
          Retrieved<ExtractResource<TResourceType>>,
          unknown,
          UseFhirSaveMutationArgs<TResourceType>,
          unknown
        >,
        "mutationFn"
      >
    | null
    | undefined;
}

/**
 * Return a [Mutation](https://tanstack.com/query/latest/docs/react/guides/mutations) for a create or update request.
 *
 * @see https://hl7.org/fhir/http.html#create
 * @see https://hl7.org/fhir/http.html#update
 */
export function useFhirSaveMutation<TResourceType extends AnyResourceType>(
  type: TResourceType,
  options?: UseFhirSaveMutationOptions<TResourceType> | null | undefined,
): UseMutationResult<
  Retrieved<ExtractResource<TResourceType>>,
  unknown,
  UseFhirSaveMutationArgs<TResourceType>,
  unknown
> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);

  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.mutation as any),
    onSuccess: (data, variables, context) => {
      if (fhirQueryContext.manageCache) {
        FhirQueryKeys.invalidateQueries(
          fhirQueryContext.clientKey,
          fhirQueryContext.queryClient,
          data.resourceType,
          data.id,
        );
        fhirQueryContext.queryClient.setQueryData(
          FhirQueryKeys.read(
            fhirQueryContext.clientKey,
            data.resourceType,
            data.id,
          ),
          data,
        );
      }
      options?.mutation?.onSuccess?.(data, variables, context);
    },
    mutationFn: (args) =>
      isResource(type, args)
        ? fhirQueryContext.fhirClient.save(args)
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fhirQueryContext.fhirClient.save(args.body, args.options as any),
  });
}
