/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Coding,
  ValueSetExpansionContains,
  codeableConcept,
} from "@bonfhir/core/r5";
import { FhirInputTerminologyRendererProps } from "@bonfhir/ui/r5";
import {
  Loader,
  Radio,
  RadioGroupProps,
  SegmentedControl,
  SegmentedControlProps,
  Select,
  SelectProps,
  Stack,
} from "@mantine/core";
import { ReactElement } from "react";

/**
 * Base component for all terminology-related inputs
 */
export function MantineFhirInputTerminology(
  props: FhirInputTerminologyRendererProps<MantineFhirInputTerminologyProps>,
): ReactElement | null {
  let value;
  let onChange;
  switch (props.type) {
    case "code": {
      value = props.value || "";
      onChange = (value: string) => props.onChange?.(value || undefined);
      break;
    }
    case "Coding": {
      value = props.value?.code || "";
      onChange = (code: string) => {
        if (!code) {
          return props.onChange?.(undefined);
        }

        const foundElement = props.data.find((x) => x.code === code);

        const coding: Coding = {
          code,
          system: foundElement?.system,
          display: foundElement?.display,
          userSelected: true,
        };

        return props.onChange?.(coding);
      };
      break;
    }
    case "CodeableConcept": {
      value = props.value?.coding?.[0]?.code || "";
      onChange = (code: string) => {
        if (!code) {
          return props.onChange?.(undefined);
        }

        const foundElement = props.data.find((x) => x.code === code);

        const codeableConceptValue = codeableConcept({
          code,
          system: foundElement?.system,
          display: foundElement?.display,
          userSelected: true,
        });

        return props.onChange?.(codeableConceptValue);
      };
      break;
    }
  }

  if (!props.mode || props.mode === "select") {
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      <Select
        label={props.label}
        description={props.description}
        error={props.error}
        placeholder={props.placeholder ?? undefined}
        required={Boolean(props.required)}
        disabled={Boolean(props.disabled)}
        w="100%"
        rightSection={props.loading ? <Loader size="1rem" /> : null}
        clearable={!props.required}
        value={value}
        onChange={onChange}
        data={
          props.data.map((element) => ({
            value: element.code,
            label: element.display,
            item: element,
          })) as any
        }
        {...props.rendererProps}
      />
    );
  }

  if (props.mode === "radio") {
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      <Radio.Group
        label={props.label}
        description={props.description}
        error={props.error}
        placeholder={props.placeholder ?? undefined}
        required={Boolean(props.required)}
        value={value as any}
        onChange={onChange}
        {...props.rendererProps}
      >
        <Stack spacing="xs" mt="xs">
          {props.data.map((element) => (
            <Radio
              key={element.code}
              value={element.code}
              label={element.display}
            />
          ))}
        </Stack>
      </Radio.Group>
    );
  }

  if (props.mode === "segmented") {
    return (
      <SegmentedControl
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        label={props.label}
        description={props.description}
        error={props.error}
        placeholder={props.placeholder ?? undefined}
        required={Boolean(props.required)}
        disabled={Boolean(props.disabled)}
        fullWidth
        value={value as any}
        onChange={onChange}
        data={
          props.data.map((element) => ({
            value: element.code,
            label: element.display,
            item: element,
          })) as any
        }
        {...props.rendererProps}
      />
    );
  }

  throw new TypeError(`Unsupported mode ${props.mode}.`);
}

export type MantineFhirInputTerminologyProps =
  | SelectProps
  | RadioGroupProps
  | SegmentedControlProps;

/**
 * Item types for terminology-related inputs.
 */
export type MantineFhirInputTerminologyItemProps = {
  value: string | undefined;
  label: string | undefined;
  item: ValueSetExpansionContains;
};
