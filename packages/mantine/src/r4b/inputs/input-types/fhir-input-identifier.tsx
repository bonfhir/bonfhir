import { IdentifierUse } from "@bonfhir/core/r4b";
import {
  FhirInput,
  FhirInputIdentifierRendererProps,
  FhirInputResourceProps,
  FhirInputStringProps,
  FhirInputTerminologyProps,
} from "@bonfhir/react/r4b";
import {
  Group,
  GroupProps,
  Input,
  InputWrapperProps,
  Select,
} from "@mantine/core";
import { ReactElement } from "react";

export function MantineFhirInputIdentifier(
  props: FhirInputIdentifierRendererProps<MantineFhirInputIdentifierProps>,
): ReactElement | null {
  let mode = props.mode;
  switch (mode) {
    case "simple":
    case null:
    case undefined: {
      mode = ["system", "value"];
      break;
    }
    case "full": {
      mode = [
        "use",
        "system",
        props.identifiers?.length ? undefined : "type",
        "assigner-ref",
        "value",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ].filter(Boolean) as Array<
        "use" | "type" | "system" | "value" | "assigner-ref"
      >;
      break;
    }
  }

  return (
    <Input.Wrapper
      className={props.className}
      style={props.style}
      label={props.label}
      description={props.description}
      error={props.error}
      required={Boolean(props.required)}
      {...props.rendererProps?.wrapper}
    >
      <Group gap="xs" wrap="nowrap" {...props.rendererProps?.group}>
        {mode.map((comp) => {
          switch (comp) {
            case "use": {
              return (
                <FhirInput
                  key={comp}
                  type="code"
                  source="http://hl7.org/fhir/ValueSet/identifier-use"
                  placeholder="Use"
                  value={props.value?.use || props.defaultUse}
                  onChange={(use) =>
                    props.onChange?.({
                      ...props.value,
                      use: use as IdentifierUse,
                    })
                  }
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  {...(props.rendererProps?.use as any)}
                />
              );
            }
            case "assigner-ref": {
              return (
                <FhirInput
                  key={comp}
                  type="Reference"
                  resourceType="Organization"
                  placeholder="Assigner"
                  search={props.assignerSearch}
                  value={props.value?.assigner}
                  onChange={(assigner) =>
                    props.onChange?.({
                      ...props.value,
                      assigner,
                    })
                  }
                  {...(props.rendererProps?.assigner as object)}
                />
              );
            }
            case "assigner-text": {
              return (
                <FhirInput
                  type="string"
                  placeholder="Assigner"
                  value={props.value?.assigner?.display}
                  onChange={(assigner) =>
                    props.onChange?.({
                      ...props.value,
                      assigner: assigner ? { display: assigner } : undefined,
                    })
                  }
                />
              );
            }
            case "system": {
              if (props.identifiers?.length) {
                return (
                  <Select
                    key={comp}
                    clearable
                    data={props.identifiers.map((x) => ({
                      value: x.system,
                      label: x.label || x.system,
                    }))}
                    value={props.value?.system}
                    onChange={(system) =>
                      props.onChange?.({
                        ...props.value,
                        system: system ?? undefined,
                        type:
                          props.identifiers?.find((x) => x.system === system)
                            ?.type || undefined,
                      })
                    }
                  />
                );
              }

              return (
                <FhirInput
                  key={comp}
                  type="uri"
                  placeholder="System"
                  value={props.value?.system}
                  onChange={(system) =>
                    props.onChange?.({ ...props.value, system })
                  }
                  {...props.rendererProps?.system}
                />
              );
            }
            case "value": {
              return (
                <FhirInput
                  key={comp}
                  type="string"
                  value={props.value?.value}
                  onChange={(value) => {
                    value = value?.trim();
                    if (
                      value &&
                      props.identifiers?.length &&
                      props.value?.system
                    ) {
                      const processValue = props.identifiers?.find(
                        (x) => x.system === props.value?.system,
                      )?.processValue;
                      if (processValue) {
                        value = processValue(value);
                      }
                    }
                    return props.onChange?.({ ...props.value, value: value });
                  }}
                  {...props.rendererProps?.value}
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

export type MantineFhirInputIdentifierProps = {
  wrapper?: Omit<InputWrapperProps, "children"> | null | undefined;
  group?: GroupProps | null | undefined;
  use?: FhirInputTerminologyProps | null | undefined;
  system?: FhirInputStringProps | null | undefined;
  value?: FhirInputStringProps | null | undefined;
  assigner?: FhirInputResourceProps | null | undefined;
};
