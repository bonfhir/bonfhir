import { FhirInputTimeRendererProps } from "@bonfhir/react/r4b";
import { TimeInput, TimeInputProps } from "@mantine/dates";
import { FormEvent, ReactElement } from "react";

export function MantineFhirInputTime(
  props: FhirInputTimeRendererProps<MantineFhirInputTimeProps>,
): ReactElement | null {
  return (
    <TimeInput
      className={props.className}
      style={props.style}
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
