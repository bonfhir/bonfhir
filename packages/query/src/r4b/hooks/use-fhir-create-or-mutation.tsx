import {
  AnyResourceTypeOrCustomResource,
  CreateOrAction,
  FhirClientSearchParameters,
  MergeResult,
  ResourceOf,
  Retrieved,
} from "@bonfhir/core/r4b";
import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys.js";
import { useFhirClientQueryContext } from "../context.js";

export type UseFhirCreateOrMutationArgs<
  TResourceType extends AnyResourceTypeOrCustomResource
> = {
  action: CreateOrAction;
  body: ResourceOf<TResourceType>;
  search?:
    | FhirClientSearchParameters<ResourceOf<TResourceType>["resourceType"]>
    | null
    | undefined;
};

export interface UseFhirCreateOrMutationOptions<
  TResourceType extends AnyResourceTypeOrCustomResource
> {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  mutation?:
    | Omit<
        UseMutationOptions<
          MergeResult<Retrieved<ResourceOf<TResourceType>>>,
          unknown,
          UseFhirCreateOrMutationArgs<TResourceType>,
          unknown
        >,
        "mutationFn"
      >
    | null
    | undefined;
}

export function useFhirCreateOrMutation<
  TResourceType extends AnyResourceTypeOrCustomResource
>(
  _type: TResourceType,
  options?: UseFhirCreateOrMutationOptions<TResourceType> | null | undefined
): UseMutationResult<
  MergeResult<Retrieved<ResourceOf<TResourceType>>>,
  unknown,
  UseFhirCreateOrMutationArgs<TResourceType>,
  unknown
> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);

  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.mutation as any),
    onSuccess: ([resource, isChanged], variables, context) => {
      if (isChanged && fhirQueryContext.manageCache) {
        FhirQueryKeys.invalidateQueries(
          fhirQueryContext.clientKey,
          fhirQueryContext.queryClient,
          resource.resourceType,
          resource.id
        );
        fhirQueryContext.queryClient.setQueryData(
          FhirQueryKeys.read(
            fhirQueryContext.clientKey,
            resource.resourceType,
            resource.id
          ),
          resource
        );
      }
      options?.mutation?.onSuccess?.([resource, isChanged], variables, context);
    },
    mutationFn: (args) =>
      fhirQueryContext.fhirClient.createOr(
        args.action,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        args.body as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        args.search as any
      ),
  });
}
