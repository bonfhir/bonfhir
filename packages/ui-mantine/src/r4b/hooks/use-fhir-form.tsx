/* eslint-disable @typescript-eslint/no-explicit-any */
import { FhirInputArrayProps } from "@bonfhir/ui/r4b";
import { useForm } from "@mantine/form";
import {
  LooseKeys,
  UseFormInput,
  UseFormReturnType,
  _TransformValues,
} from "@mantine/form/lib/types.js";

export type UseFhirFormReturnType<
  Values,
  TransformValues extends _TransformValues<Values> = (values: Values) => Values
> = UseFormReturnType<Values, TransformValues> & {
  getArrayInputProps: GetArrayInputProps<Values>;
};

export type GetArrayInputProps<Values> = <Field extends LooseKeys<Values>>(
  path: Field,
  options?: {
    newValue?: any | (() => any) | null | undefined;
  }
) => {
  value: any;
  error?: any;
  onAdd: FhirInputArrayProps<any, any>[`onAdd`];
  canAdd: FhirInputArrayProps<any, any>[`canAdd`];
  onRemove: FhirInputArrayProps<any, any>[`onRemove`];
};

export function useFhirForm<
  Values = Record<string, unknown>,
  TransformValues extends _TransformValues<Values> = (values: Values) => Values
>(
  args?: UseFormInput<Values, TransformValues>
): UseFhirFormReturnType<Values, TransformValues> {
  const form = useForm(args);
  return {
    ...form,
    getArrayInputProps: (path, options) => {
      const inputResult = form.getInputProps(path);
      return {
        value: inputResult.value,
        error: inputResult.error,
        onAdd: (index) => {
          const newValue = options?.newValue
            ? typeof options.newValue === "function"
              ? options.newValue()
              : options.newValue
            : {};
          if (form.getInputProps(path).value) {
            form.insertListItem(path, newValue, index + 1);
          } else {
            form.setFieldValue(path, [newValue] as any);
          }
        },
        canAdd: (value) => {
          const newValue = options?.newValue
            ? typeof options.newValue === "function"
              ? options.newValue()
              : options.newValue
            : {};
          return JSON.stringify(value) !== JSON.stringify(newValue);
        },
        onRemove: (index) => form.removeListItem("name", index),
      };
    },
  };
}
