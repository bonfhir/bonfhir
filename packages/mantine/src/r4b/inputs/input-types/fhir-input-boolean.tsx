import { FhirInputBooleanRendererProps } from "@bonfhir/react/r4b";
import { Checkbox, CheckboxProps, Switch, SwitchProps } from "@mantine/core";
import { FormEvent, ReactElement } from "react";

export function MantineFhirInputBoolean(
  props: FhirInputBooleanRendererProps<MantineFhirInputBooleanProps>,
): ReactElement | null {
  if (!props.mode || props.mode === "checkbox") {
    return (
      <Checkbox
        className={props.className}
        style={props.style}
        label={props.label}
        description={props.description}
        error={props.error}
        required={Boolean(props.required)}
        disabled={Boolean(props.disabled)}
        checked={props.value || false}
        onChange={(evt: FormEvent<HTMLInputElement>) =>
          props.onChange?.(evt.currentTarget.checked)
        }
        //TODO: fix this as className was giving type error
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props.rendererProps as unknown as any)}
      />
    );
  }

  if (props.mode === "switch") {
    return (
      <Switch
        className={props.className}
        style={props.style}
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
