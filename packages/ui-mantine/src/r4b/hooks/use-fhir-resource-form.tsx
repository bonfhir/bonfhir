/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnyResourceTypeOrCustomResource,
  ResourceOf,
  ResourceTypeOf,
  Retrieved,
  build,
  resourceTypeOf,
} from "@bonfhir/core/r4b";
import {
  UseFhirSaveMutationArgs,
  UseFhirSaveMutationOptions,
  useFhirRead,
  useFhirSaveMutation,
} from "@bonfhir/query/r4b";
import { UseFormReturnType } from "@mantine/form";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { UseFhirFormReturnType, useFhirForm } from "./use-fhir-form.js";

export interface UseFhirResourceFormArgs<
  TResourceType extends AnyResourceTypeOrCustomResource
> {
  type: TResourceType;
  id: string | "new" | undefined;
  defaultValues?: Partial<ResourceOf<TResourceType>>;
  mutationOptions?:
    | UseFhirSaveMutationOptions<ResourceTypeOf<TResourceType>>["mutation"]
    | null
    | undefined;
  formOptions?: Parameters<typeof useFhirForm<ResourceOf<TResourceType>>>[0];
}

export interface UseFhirResourceFormResult<
  TResourceType extends AnyResourceTypeOrCustomResource
> {
  query: UseQueryResult<Retrieved<ResourceOf<TResourceType>>>;
  mutation: UseMutationResult<
    Retrieved<ResourceOf<TResourceType>>,
    unknown,
    UseFhirSaveMutationArgs<ResourceTypeOf<TResourceType>>,
    unknown
  >;
  form: UseFormReturnType<
    ResourceOf<TResourceType>,
    (values: {
      resourceType: ResourceOf<TResourceType>["resourceType"];
    }) => ResourceOf<TResourceType>
  >;
  onSubmit: () => void;
  getInputProps: UseFhirFormReturnType<
    ResourceOf<TResourceType>,
    (values: {
      resourceType: ResourceOf<TResourceType>["resourceType"];
    }) => ResourceOf<TResourceType>
  >["getInputProps"];
  getArrayInputProps: UseFhirFormReturnType<
    ResourceOf<TResourceType>,
    (values: {
      resourceType: ResourceOf<TResourceType>["resourceType"];
    }) => ResourceOf<TResourceType>
  >["getArrayInputProps"];
}

/**
 * Encapsulate the whole logic to save a single FHIR resource using a controlled form.
 */
export function useFhirResourceForm<
  TResourceType extends AnyResourceTypeOrCustomResource
>(
  args: UseFhirResourceFormArgs<TResourceType>
): UseFhirResourceFormResult<TResourceType> {
  const isNew = args.id == null || args.id === "new";
  const query = useFhirRead(args.type, args.id || "new", {
    query: { enabled: !isNew },
  });

  const mutation = useFhirSaveMutation(resourceTypeOf(args.type), {
    mutation: args.mutationOptions,
  });

  const form = useFhirForm({
    initialValues: {
      ...args.defaultValues,
      resourceType: resourceTypeOf(args.type),
    },
    transformValues: (values) => {
      return typeof args.type === "string"
        ? build(args.type as any, values as any)
        : new (args.type as any)(values);
    },
    ...(args.formOptions as any),
  });

  useEffect(() => {
    if (query.data) {
      form.setValues(query.data as any);
      form.resetDirty(query.data as any);
    }
  }, [query.isSuccess]);

  return {
    query,
    mutation: mutation as any,
    form: form as any,
    onSubmit: form.onSubmit((resource) => mutation.mutate(resource as any)),
    getInputProps: form.getInputProps,
    getArrayInputProps: form.getArrayInputProps,
  };
}
