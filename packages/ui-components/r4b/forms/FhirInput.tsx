import { createElement, ReactElement } from "react";
import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";
import { useFhirUIComponentsContext } from "../FhirUIComponentsContext";

export type FhirInputProps<
  TRendererProps = unknown,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = TRendererProps & UseControllerProps<TFieldValues, TName>;

export function FhirInput<
  TRendererProps = unknown,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: FhirInputProps<TRendererProps, TFieldValues, TName>
): ReactElement | null {
  const { renderer } = useFhirUIComponentsContext();

  return createElement(renderer.input, props as any);
}
