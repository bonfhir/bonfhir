import { FhirInputBooleanRendererProps } from "@bonfhir/ui/r5";
import { Checkbox, CheckboxProps, Switch, SwitchProps } from "@mantine/core";
import { FormEvent, ReactElement } from "react";

export function MantineFhirInputBoolean(
  props: FhirInputBooleanRendererProps<MantineFhirInputBooleanProps>
): ReactElement | null {
  if (!props.mode || props.mode === "checkbox") {
    return (
      <Checkbox
        label={props.label}
        description={props.description}
        error={props.error}
        required={props.required}
        disabled={props.disabled}
        checked={props.value || false}
        onChange={(evt: FormEvent<HTMLInputElement>) =>
          props.onChange?.(evt.currentTarget.checked)
        }
        {...props.rendererProps}
      />
    );
  }

  if (props.mode === "switch") {
    return (
      <Switch
        label={props.label}
        description={props.description}
        error={props.error}
        required={props.required}
        disabled={props.disabled}
        checked={props.value || false}
        onChange={(evt: FormEvent<HTMLInputElement>) =>
          props.onChange?.(evt.currentTarget.checked)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props.rendererProps as any)}
      />
    );
  }

  throw new TypeError(`Unsupported mode ${props.mode}.`);
}

export type MantineFhirInputBooleanProps = CheckboxProps | SwitchProps;
