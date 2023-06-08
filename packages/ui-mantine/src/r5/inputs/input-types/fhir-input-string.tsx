import { FhirInputStringRendererProps } from "@bonfhir/ui/r5";
import { TextInput, TextInputProps } from "@mantine/core";
import { FormEvent, ReactElement } from "react";

export function MantineFhirInputString(
  props: FhirInputStringRendererProps<MantineFhirInputStringProps>
): ReactElement | null {
  return (
    <TextInput
      label={props.label}
      description={props.description}
      error={props.error}
      placeholder={props.placeholder}
      required={props.required}
      value={props.value}
      onChange={(evt: FormEvent<HTMLInputElement>) =>
        props.onChange?.(evt.currentTarget.value || undefined)
      }
      {...props.rendererProps?.input}
    />
  );
}

export type MantineFhirInputStringProps = {
  input: TextInputProps | null | undefined;
};
