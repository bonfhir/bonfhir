import { FhirInputTimeRendererProps } from "@bonfhir/ui/r4b";
import { TimeInput, TimeInputProps } from "@mantine/dates";
import { FormEvent, ReactElement } from "react";

export function MantineFhirInputTime(
  props: FhirInputTimeRendererProps<MantineFhirInputTimeProps>,
): ReactElement | null {
  return (
    <TimeInput
      label={props.label}
      description={props.description}
      error={props.error}
      placeholder={props.placeholder}
      required={props.required}
      allowDeselect={!props.required}
      disabled={props.disabled}
      w="100%"
      value={props.value}
      onChange={(evt: FormEvent<HTMLInputElement>) =>
        props.onChange?.(evt.currentTarget.value || undefined)
      }
      {...props.rendererProps}
    />
  );
}

export type MantineFhirInputTimeProps = TimeInputProps;
