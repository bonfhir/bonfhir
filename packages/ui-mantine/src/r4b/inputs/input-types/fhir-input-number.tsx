import { FhirInputNumberRendererProps } from "@bonfhir/ui/r4b";
import { NumberInput, NumberInputProps } from "@mantine/core";
import { ReactElement } from "react";

export function MantineFhirInputNumber(
  props: FhirInputNumberRendererProps<MantineFhirInputNumberProps>,
): ReactElement | null {
  return (
    <NumberInput
      label={props.label}
      description={props.description}
      error={props.error}
      required={props.required}
      disabled={props.disabled}
      checked={props.value ?? ""}
      min={defaultMin(props)}
      max={props.max}
      step={props.step}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      precision={(props as any).precision}
      onChange={(value: number | "") =>
        props.onChange?.(value === "" ? undefined : value)
      }
      {...props.rendererProps}
    />
  );
}

export type MantineFhirInputNumberProps = NumberInputProps;

function defaultMin(
  props: FhirInputNumberRendererProps<MantineFhirInputNumberProps>,
) {
  switch (props.type) {
    case "unsignedInt": {
      return Math.max(props.min ?? 0, 0);
    }
    case "positiveInt": {
      return Math.max(props.min ?? 1, 1);
    }
  }
  return props.min;
}
