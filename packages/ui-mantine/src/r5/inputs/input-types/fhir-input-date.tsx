import { FhirInputDateRendererProps } from "@bonfhir/ui/r5";
import { DateInput, DateInputProps } from "@mantine/dates";
import { ReactElement } from "react";

export function MantineFhirInputDate(
  props: FhirInputDateRendererProps<MantineFhirInputDateProps>
): ReactElement | null {
  let normalizedValue = props.value;
  if (normalizedValue?.trim()) {
    if (normalizedValue.length <= 5) {
      normalizedValue = `${normalizedValue?.slice(0, 4)}-01-01`;
    } else if (normalizedValue.length <= 8) {
      normalizedValue = `${normalizedValue?.slice(0, 6)}-01`;
    }
  } else {
    normalizedValue = "";
  }

  return (
    <DateInput
      label={props.label}
      description={props.description}
      error={props.error}
      placeholder={props.placeholder}
      required={props.required}
      allowDeselect={!props.required}
      value={normalizedValue ? new Date(normalizedValue) : ""}
      onChange={(value: Date | undefined | null) => {
        if (!value) {
          return props.onChange?.(undefined);
        }
        return props.onChange?.(value.toDateString());
      }}
      {...props.rendererProps}
    />
  );
}

export type MantineFhirInputDateProps = DateInputProps;
