import { Coding, QuantityComparator } from "@bonfhir/core/r5";
import {
  FhirInput,
  FhirInputQuantityRendererProps,
  FhirInputStringProps,
  FhirInputTerminologyProps,
} from "@bonfhir/react/r5";
import {
  Group,
  GroupProps,
  Input,
  InputWrapperProps,
  Text,
} from "@mantine/core";
import { ReactElement } from "react";

export function MantineFhirInputQuantity(
  props: FhirInputQuantityRendererProps<MantineFhirInputQuantityProps>,
): ReactElement | null {
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
      <Group gap="xs" grow {...props.rendererProps?.group}>
        {Boolean(props.comparator) && (
          <FhirInput
            type="code"
            value={props.value?.comparator}
            onChange={(code) =>
              props.onChange?.({
                ...props.value,
                comparator: code as QuantityComparator,
              })
            }
            {...(typeof props.comparator === "boolean"
              ? { source: "http://hl7.org/fhir/ValueSet/quantity-comparator" }
              : (props.comparator as Omit<
                  FhirInputTerminologyProps,
                  "type" | "onChange"
                >))}
          />
        )}
        {typeof props.unit === "string" ? (
          <FhirInput
            type="decimal"
            value={props.value?.value}
            onChange={(value) =>
              props.onChange?.({
                ...props.value,
                value,
                unit: props.value?.unit || (props.unit as string),
              })
            }
            rendererProps={{
              rightSection: <Text>{props.value?.unit || props.unit}</Text>,
              rightSectionWidth: 50,
            }}
            {...props.decimal}
          />
        ) : (
          <FhirInput
            type="decimal"
            value={props.value?.value}
            onChange={(value) => props.onChange?.({ ...props.value, value })}
            {...props.decimal}
          />
        )}
        {props.unit ? (
          typeof props.unit === "string" ? null : (
            <FhirInput
              type="Coding"
              value={
                props.value?.unit || props.value?.code
                  ? {
                      code: props.value?.code,
                      system: props.value?.system,
                      display: props.value?.unit,
                    }
                  : (undefined as Coding | undefined)
              }
              onChange={(coding: Coding | undefined) =>
                props.onChange?.({
                  ...props.value,
                  unit: coding?.display,
                  system: coding?.system,
                  code: coding?.code,
                })
              }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...(props.unit as any)}
            />
          )
        ) : (
          <FhirInput
            type="string"
            value={props.value?.unit}
            onChange={(unit) => props.onChange?.({ ...props.value, unit })}
            {...props.rendererProps?.unit}
          />
        )}
      </Group>
    </Input.Wrapper>
  );
}

export interface MantineFhirInputQuantityProps {
  wrapper?: Omit<InputWrapperProps, "children"> | null | undefined;
  group?: GroupProps | null | undefined;
  unit?: FhirInputStringProps | null | undefined;
}
