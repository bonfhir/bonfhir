import { FhirInputTimeRendererProps } from "@bonfhir/ui/r5";
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
      placeholder={props.placeholder ?? undefined}
      required={Boolean(props.required)}
      disabled={Boolean(props.disabled)}
      w="100%"
      value={props.value ?? undefined}
      onChange={(evt: FormEvent<HTMLInputElement>) =>
        props.onChange?.(evt.currentTarget.value || undefined)
      }
      {...props.rendererProps}
    />
  );
}

export type MantineFhirInputTimeProps = TimeInputProps;
