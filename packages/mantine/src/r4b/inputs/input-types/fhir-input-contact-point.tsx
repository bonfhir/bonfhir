import { ContactPointSystem, ContactPointUse } from "@bonfhir/core/r4b";
import {
  FhirInput,
  FhirInputContactPointRendererProps,
  FhirInputStringProps,
  FhirInputTerminologyProps,
} from "@bonfhir/react/r4b";
import { Group, GroupProps, Input, InputWrapperProps } from "@mantine/core";
import {
  IconAt,
  IconDeviceLandlinePhone,
  IconDeviceMobileMessage,
  IconLink,
  IconPhone,
  IconPrinter,
} from "@tabler/icons-react";
import { ReactElement } from "react";
import { MantineFhirInputStringProps } from "./fhir-input-string";

export function MantineFhirInputContactPoint(
  props: FhirInputContactPointRendererProps<MantineFhirInputContactPointProps>,
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
      mode = ["use", "system", "value"];
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
                <FhirInput<MantineFhirInputStringProps>
                  key={comp}
                  type="string"
                  value={props.value?.value}
                  onChange={(value) =>
                    props.onChange?.({ ...props.value, value })
                  }
                  rendererProps={{
                    icon: valueIcon(props.value?.system),
                    ...props.rendererProps?.value?.rendererProps,
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

export type MantineFhirInputContactPointProps = {
  wrapper?: Omit<InputWrapperProps, "children"> | null | undefined;
  group?: GroupProps | null | undefined;
  use?: FhirInputTerminologyProps | null | undefined;
  system?: FhirInputTerminologyProps | null | undefined;
  value?: FhirInputStringProps | null | undefined;
};

function valueIcon(system?: ContactPointSystem): ReactElement | undefined {
  switch (system) {
    case "email": {
      return <IconAt size="0.8rem" />;
    }
    case "phone": {
      return <IconPhone size="0.8rem" />;
    }
    case "fax": {
      return <IconPrinter size="0.8rem" />;
    }
    case "sms": {
      return <IconDeviceMobileMessage size="0.8rem" />;
    }
    case "pager": {
      return <IconDeviceLandlinePhone size="0.8rem" />;
    }
    case "url": {
      return <IconLink size="0.8rem" />;
    }
  }

  return;
}
