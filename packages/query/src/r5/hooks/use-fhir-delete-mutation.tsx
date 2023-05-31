import { AnyResourceType, GeneralParameters } from "@bonfhir/core/r5";
import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { FhirQueryKeys } from "../cache-keys.js";
import { useFhirClientQueryContext } from "../context.js";

export interface UseFhirDeleteMutationArgs {
  resourceType: AnyResourceType;
  id: string;
  options?: GeneralParameters | null | undefined;
}

export interface UseFhirDeleteMutationOptions {
  /** The FhirClient key to use to perform the query. */
  fhirClient?: string | null | undefined;
  mutation?:
    | Omit<
        UseMutationOptions<void, unknown, UseFhirDeleteMutationArgs, unknown>,
        "mutationFn"
      >
    | null
    | undefined;
}

/**
 * Return a [Mutation](https://tanstack.com/query/latest/docs/react/guides/mutations) for a delete request.
 *
 * @see https://hl7.org/fhir/http.html#delete
 */
export function useFhirDeleteMutation(
  options?: UseFhirDeleteMutationOptions | null | undefined
): UseMutationResult<void, unknown, UseFhirDeleteMutationArgs, unknown> {
  const fhirQueryContext = useFhirClientQueryContext(options?.fhirClient);

  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options?.mutation as any),
    onSuccess: (data, variables, context) => {
      if (fhirQueryContext.manageCache) {
        FhirQueryKeys.invalidateQueries(
          fhirQueryContext.clientKey,
          fhirQueryContext.queryClient,
          variables.resourceType,
          variables.id
        );
      }
      options?.mutation?.onSuccess?.(data, variables, context);
    },
    mutationFn: (args) => {
      return fhirQueryContext.fhirClient.delete(
        args.resourceType,
        args.id,
        args.options
      );
    },
  });
}
