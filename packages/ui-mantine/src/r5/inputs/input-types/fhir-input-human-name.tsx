import { NameUse } from "@bonfhir/core/r5";
import {
  FhirInput,
  FhirInputCodeProps,
  FhirInputHumanNameRendererProps,
  FhirInputStringProps,
} from "@bonfhir/ui/r5";
import { Group, GroupProps, Input, InputWrapperProps } from "@mantine/core";
import { ReactElement } from "react";

export function MantineFhirInputHumanName(
  props: FhirInputHumanNameRendererProps<MantineFhirInputHumanNameProps>
): ReactElement | null {
  let mode = props.mode;
  switch (mode) {
    case "simple": {
      mode = ["given", "family"];
      break;
    }
    case "full":
    case null:
    case undefined: {
      mode = ["use", "prefix", "given", "family", "suffix"];
      break;
    }
  }

  return (
    <Input.Wrapper
      label={props.label}
      description={props.description}
      error={props.error}
      required={props.required}
      {...props.rendererProps?.wrapper}
    >
      <Group spacing="xs" noWrap {...props.rendererProps?.group}>
        {mode.map((comp) => {
          switch (comp) {
            case "use": {
              return (
                <FhirInput
                  key={comp}
                  type="code"
                  source="http://hl7.org/fhir/ValueSet/name-use"
                  placeholder="Use"
                  value={props.value?.use || props.defaultUse}
                  onChange={(use) =>
                    props.onChange?.({ ...props.value, use: use as NameUse })
                  }
                  {...props.rendererProps?.use}
                />
              );
            }
            case "prefix":
            case "given":
            case "suffix": {
              return (
                <FhirInput
                  key={comp}
                  type="string"
                  placeholder={comp[0]?.toUpperCase() + comp.slice(1)}
                  value={props.value?.[comp]?.join(props.separator)}
                  onChange={(prefix) =>
                    props.onChange?.({
                      ...props.value,
                      [comp]: splitTrim(prefix, props.separator),
                    })
                  }
                  {...props.rendererProps?.[comp]}
                />
              );
            }
            case "family": {
              return (
                <FhirInput
                  key={comp}
                  type="string"
                  placeholder="Family"
                  value={props.value?.family}
                  onChange={(family) =>
                    props.onChange?.({ ...props.value, family })
                  }
                  {...props.rendererProps?.family}
                />
              );
            }
            default: {
              throw new TypeError(`Invalid component: ${comp}`);
            }
          }
        })}
      </Group>
    </Input.Wrapper>
  );
}

export type MantineFhirInputHumanNameProps = {
  wrapper?: Omit<InputWrapperProps, "children"> | null | undefined;
  group?: GroupProps | null | undefined;
  use?: FhirInputCodeProps | null | undefined;
  prefix?: FhirInputStringProps | null | undefined;
  given?: FhirInputStringProps | null | undefined;
  family?: FhirInputStringProps | null | undefined;
  suffix?: FhirInputStringProps | null | undefined;
};

function splitTrim(
  value: string | undefined,
  separator: string
): string[] | undefined {
  if (!value) {
    return undefined;
  }

  const result = value
    .split(separator)
    .map((x) => x.trim())
    .filter(Boolean);
  return result.length === 0 ? undefined : result;
}
