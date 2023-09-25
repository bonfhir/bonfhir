import { FhirInputBooleanRendererProps } from "@bonfhir/react/r5";
import { Checkbox, CheckboxProps, Switch, SwitchProps } from "@mantine/core";
import { FormEvent, ReactElement } from "react";

export function MantineFhirInputBoolean(
  props: FhirInputBooleanRendererProps<MantineFhirInputBooleanProps>,
): ReactElement | null {
  if (!props.mode || props.mode === "checkbox") {
    return (
      <Checkbox
        className={props.className}
        label={props.label}
        description={props.description}
        error={props.error}
        required={Boolean(props.required)}
        disabled={Boolean(props.disabled)}
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
        className={props.className}
        label={props.label}
        description={props.description}
        error={props.error}
        required={Boolean(props.required)}
        disabled={Boolean(props.disabled)}
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
