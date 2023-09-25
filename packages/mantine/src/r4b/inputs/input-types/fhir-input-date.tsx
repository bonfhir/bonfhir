import { FhirInputDateRendererProps } from "@bonfhir/react/r4b";
import { DateInput, DateInputProps } from "@mantine/dates";
import { ReactElement } from "react";

export function MantineFhirInputDate(
  props: FhirInputDateRendererProps<MantineFhirInputDateProps>,
): ReactElement | null {
  const matchingData = props.value
    ?.trim()
    .match(
      /^(?<year>\d(\d(\d[1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(?<month>0[1-9]|1[0-2])(-(?<day>0[1-9]|[12]\d|3[01]))?)?$/,
    )?.groups as { year?: string; month?: string; day?: string };

  let normalizedValue;
  if (matchingData?.year) {
    const yearNumber = Number.parseInt(matchingData.year);
    const monthNumber = matchingData.month
      ? Number.parseInt(matchingData.month)
      : undefined;
    const dayNumber = matchingData.day
      ? Number.parseInt(matchingData.day)
      : undefined;
    normalizedValue = new Date(
      yearNumber,
      monthNumber ? monthNumber - 1 : 0,
      dayNumber || 1,
    );
  }

  return (
    <DateInput
      className={props.className}
      style={props.style}
      label={props.label}
      description={props.description}
      error={props.error}
      placeholder={props.placeholder ?? undefined}
      required={Boolean(props.required)}
      allowDeselect={!props.required}
      disabled={Boolean(props.disabled)}
      w="100%"
      value={normalizedValue}
      onChange={(value: Date | undefined | null) => {
        if (!value) {
          return props.onChange?.(undefined);
        }
        return props.onChange?.(value.toISOString().slice(0, 10));
      }}
      {...props.rendererProps}
    />
  );
}

export type MantineFhirInputDateProps = DateInputProps;
