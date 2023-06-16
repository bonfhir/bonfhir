import { FhirInputStringRendererProps } from "@bonfhir/ui/r4b";
import {
  TextInput,
  TextInputProps,
  Textarea,
  TextareaProps,
} from "@mantine/core";
import { IconLink } from "@tabler/icons-react";
import { FormEvent, ReactElement } from "react";

export function MantineFhirInputString(
  props: FhirInputStringRendererProps<MantineFhirInputStringProps>
): ReactElement | null {
  if (props.type === "string" && props.mode === "multiline") {
    return (
      <Textarea
        label={props.label}
        description={props.description}
        error={props.error}
        placeholder={props.placeholder}
        required={props.required}
        disabled={props.disabled}
        w="100%"
        autosize
        value={props.value || ""}
        onChange={(evt: FormEvent<HTMLInputElement>) =>
          props.onChange?.(evt.currentTarget.value || undefined)
        }
        {...props.rendererProps}
      />
    );
  }
  return (
    <TextInput
      label={props.label}
      description={props.description}
      error={props.error}
      placeholder={props.placeholder}
      required={props.required}
      disabled={props.disabled}
      w="100%"
      icon={
        ["url", "uri"].includes(props.type) ? (
          <IconLink size="0.8rem" />
        ) : undefined
      }
      value={props.value || ""}
      onChange={(evt: FormEvent<HTMLInputElement>) =>
        props.onChange?.(evt.currentTarget.value || undefined)
      }
      {...props.rendererProps}
    />
  );
}

export type MantineFhirInputStringProps = TextInputProps | TextareaProps;
