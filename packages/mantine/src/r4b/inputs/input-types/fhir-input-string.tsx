import { FhirInputStringRendererProps } from "@bonfhir/react/r4b";
import {
  TextInput,
  TextInputProps,
  Textarea,
  TextareaProps,
} from "@mantine/core";
import { IconLink } from "@tabler/icons-react";
import { ReactElement } from "react";

export function MantineFhirInputString(
  props: FhirInputStringRendererProps<MantineFhirInputStringProps>,
): ReactElement | null {
  if (props.type === "string" && props.mode === "multiline") {
    return (
      <Textarea
        className={props.className}
        style={props.style}
        label={props.label}
        description={props.description}
        error={props.error}
        placeholder={props.placeholder ?? undefined}
        required={Boolean(props.required)}
        disabled={Boolean(props.disabled)}
        w="100%"
        autosize
        value={props.value || ""}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        onChange={(evt) =>
          props.onChange?.(evt.currentTarget.value || undefined)
        }
        {...props.rendererProps}
      />
    );
  }
  return (
    <TextInput
      className={props.className}
      style={props.style}
      label={props.label}
      description={props.description}
      error={props.error}
      placeholder={props.placeholder ?? undefined}
      required={Boolean(props.required)}
      disabled={Boolean(props.disabled)}
      w="100%"
      icon={
        ["url", "uri"].includes(props.type) ? (
          <IconLink size="0.8rem" />
        ) : undefined
      }
      value={props.value || ""}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      onChange={(evt) => props.onChange?.(evt.currentTarget.value || undefined)}
      {...props.rendererProps}
    />
  );
}

export type MantineFhirInputStringProps = TextInputProps | TextareaProps;
