import {
  AnyResourceType,
  ConcurrencyParameters,
  ConditionalSearchParameters,
  ExtractResource,
  FhirClientPatchBody,
  GeneralParameters,
  ResourceTypeOf,
  Retrieved,
} from "@bonfhir/core/r4b";
import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys.js";
import { useFhirClientQueryContext } from "../context.js";

export interface UseFhirPatchMutationArgs<
  TResourceType extends AnyResourceType,
> {
  id: string;
  body: FhirClientPatchBody<ResourceTypeOf<TResourceType>>;
  options?:
    | (GeneralParameters &
        ConcurrencyParameters & {
          versionId?: string | null | undefined;
        } & ConditionalSearchParameters<TResourceType>)
    | null
    | undefined;
}

export interface UseFhirPatchMutationOptions<
  TResourceType extends AnyResourceType,
> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  mutation?:
    | Omit<
        UseMutationOptions<
          Retrieved<ExtractResource<TResourceType>>,
          unknown,
          UseFhirPatchMutationArgs<TResourceType>,
          unknown
        >,
        "mutationFn"
      >
    | null
    | undefined;
}

/**
 * Return a [Mutation](https://tanstack.com/query/latest/docs/react/guides/mutations) for a patch request.
 *
 * @see https://hl7.org/fhir/http.html#patch
 */
export function useFhirPatchMutation<TResourceType extends AnyResourceType>(
  type: TResourceType,
  options?: UseFhirPatchMutationOptions<TResourceType> | null | undefined,
): UseMutationResult<
  Retrieved<ExtractResource<TResourceType>>,
  unknown,
  UseFhirPatchMutationArgs<TResourceType>,
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
      fhirQueryContext.fhirClient.patch(
        type,
        args.id,
        args.body,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        args.options as any,
      ),
  });
}
