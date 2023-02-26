import { useField } from "formik";
import { createElement, ReactElement } from "react";
import { useFhirUIComponentsContext } from "../../FhirUIComponentsContext";

export type FhirFieldStringProps<TRendererProps = unknown> = TRendererProps & {
  type: "string";
  name: string;
  options?: FhirFieldStringPropsOptions;
};

export interface FhirFieldStringPropsOptions {
  placeholder?: string | null | undefined;
  minLength?: number | null | undefined;
  maxLength?: number | null | undefined;
}

export function FhirFieldString<TRendererProps = unknown>(
  props: FhirFieldStringProps<TRendererProps>
): ReactElement | null {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { type, name, options, ...rendererProps } = props;
  const { renderer } = useFhirUIComponentsContext();
  const [field, meta, helpers] = useField<string>(name);

  return createElement(renderer.input, {
    options,
    field,
    meta,
    helpers,
    ...rendererProps,
  });
}
