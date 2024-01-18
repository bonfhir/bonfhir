/* eslint-disable @typescript-eslint/no-explicit-any */
import { cleanFhirValues } from "@bonfhir/core/r4b";
import { FhirInputArrayProps } from "@bonfhir/react/r4b";
import { UseFormInput, UseFormReturnType, useForm } from "@mantine/form";

/**
 * These types are internal mantine/forms type that we need here.
 * They used to be exposed before v7, but no longer are.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type LooseKeys<Values> = keyof Values | (string & {});
export type _TransformValues<Values> = (values: Values) => unknown;

export type UseFhirFormReturnType<
  Values,
  TransformValues extends _TransformValues<Values> = (values: Values) => Values,
> = UseFormReturnType<Values, TransformValues> & {
  getArrayInputProps: GetArrayInputProps<Values>;
};

export type GetArrayInputProps<Values> = <Field extends LooseKeys<Values>>(
  path: Field,
  options?: {
    newValue?: any | (() => any) | null | undefined;
  },
) => {
  value: any;
  error?: any;
  onAdd: FhirInputArrayProps<any, any>[`onAdd`];
  canAdd: FhirInputArrayProps<any, any>[`canAdd`];
  onRemove: FhirInputArrayProps<any, any>[`onRemove`];
};

export function useFhirForm<
  Values = Record<string, unknown>,
  TransformValues extends _TransformValues<Values> = (values: Values) => Values,
>(
  args?: UseFormInput<Values, TransformValues>,
): UseFhirFormReturnType<Values, TransformValues> {
  const { transformValues, ...remainingArgs } = args || {};

  const form = useForm<Values, TransformValues>({
    ...remainingArgs,
    transformValues: ((values: Values) => {
      cleanFhirValues(values);
      return transformValues ? transformValues(values) : values;
    }) as any,
  });
  return {
    ...form,
    getArrayInputProps: (path, options) => {
      const inputResult = form.getInputProps(path);
      return {
        value: inputResult.value,
        error: inputResult.error,
        onAdd: (index) => {
          const newValue =
            options && typeof options.newValue === "function"
              ? options.newValue()
              : options?.newValue;
          if (form.getInputProps(path).value) {
            form.insertListItem(path, newValue, index + 1);
          } else {
            form.setFieldValue(path, [newValue] as any);
          }
        },
        canAdd: (value) => {
          const newValue =
            options && typeof options.newValue === "function"
              ? options.newValue()
              : options?.newValue;
          return JSON.stringify(value) !== JSON.stringify(newValue);
        },
        onRemove: (index) => form.removeListItem(path, index),
      };
    },
  };
}
