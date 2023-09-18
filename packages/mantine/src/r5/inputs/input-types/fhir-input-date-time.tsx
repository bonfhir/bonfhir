import { FhirInputDateTimeRendererProps } from "@bonfhir/react/r5";
import { DateTimePicker, DateTimePickerProps } from "@mantine/dates";
import { ReactElement } from "react";

export function MantineFhirInputDateTime(
  props: FhirInputDateTimeRendererProps<MantineFhirInputDateTimeProps>,
): ReactElement | null {
  return (
    <DateTimePicker
      label={props.label}
      description={props.description}
      error={props.error}
      placeholder={props.placeholder ?? undefined}
      required={Boolean(props.required)}
      disabled={Boolean(props.disabled)}
      value={props.value ? new Date(props.value) : null}
      onChange={(value: Date | undefined | null) => {
        if (!value) {
          return props.onChange?.(undefined);
        }
        return props.onChange?.(value.toISOString());
      }}
      w="100%"
      {...props.rendererProps}
    />
  );
}

export type MantineFhirInputDateTimeProps = DateTimePickerProps;
