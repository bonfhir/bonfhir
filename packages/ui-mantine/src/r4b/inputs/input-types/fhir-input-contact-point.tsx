import { ContactPointSystem, ContactPointUse } from "@bonfhir/core/r4b";
import {
  FhirInput,
  FhirInputContactPointRendererProps,
  FhirInputStringProps,
  FhirInputTerminologyProps,
} from "@bonfhir/ui/r4b";
import { Group, GroupProps, Input, InputWrapperProps } from "@mantine/core";
import { ReactElement } from "react";

export function MantineFhirInputContactPoint(
  props: FhirInputContactPointRendererProps<MantineFhirInputContactPointProps>
): ReactElement | null {
  let mode = props.mode;
  switch (mode) {
    case "simple": {
      mode = ["value"];
      break;
    }
    case "full":
    case null:
    case undefined: {
      mode = ["system", "use", "value"];
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
      <Group spacing="xs" noWrap grow {...props.rendererProps?.group}>
        {mode.map((comp) => {
          switch (comp) {
            case "system": {
              return (
                <FhirInput
                  key={comp}
                  type="code"
                  source="http://hl7.org/fhir/ValueSet/contact-point-system"
                  placeholder="System"
                  value={props.value?.system}
                  onChange={(system) =>
                    props.onChange?.({
                      ...props.value,
                      system: system as ContactPointSystem,
                    })
                  }
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  {...(props.rendererProps?.system as any)}
                />
              );
            }
            case "use": {
              return (
                <FhirInput
                  key={comp}
                  type="code"
                  source="http://hl7.org/fhir/ValueSet/contact-point-use"
                  placeholder="Use"
                  value={props.value?.use}
                  onChange={(use) =>
                    props.onChange?.({
                      ...props.value,
                      use: use as ContactPointUse,
                    })
                  }
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  {...(props.rendererProps?.use as any)}
                />
              );
            }
            case "value": {
              return (
                <FhirInput
                  key={comp}
                  type="string"
                  value={props.value?.value}
                  onChange={(value) =>
                    props.onChange?.({ ...props.value, value })
                  }
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

export type MantineFhirInputContactPointProps = {
  wrapper?: Omit<InputWrapperProps, "children"> | null | undefined;
  group?: GroupProps | null | undefined;
  use?: FhirInputTerminologyProps | null | undefined;
  system?: FhirInputTerminologyProps | null | undefined;
  value?: FhirInputStringProps | null | undefined;
};
