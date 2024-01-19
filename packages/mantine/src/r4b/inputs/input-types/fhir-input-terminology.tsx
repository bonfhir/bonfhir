/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Coding,
  ValueSetExpansionContains,
  codeableConcept,
} from "@bonfhir/core/r4b";
import { FhirInputTerminologyRendererProps } from "@bonfhir/react/r4b";
import {
  Input,
  InputWrapperProps,
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
      onChange = (value: string | null) => {
        props.onChange?.(value || undefined);
      };
      break;
    }
    case "Coding": {
      value = props.value?.code || "";
      onChange = (code: string | null) => {
        if (!code) {
          props.onChange?.(undefined);
          return;
        }

        const foundElement = props.data.find((x) => x.code === code);

        const coding: Coding = {
          code,
          system: foundElement?.system,
          display: foundElement?.display,
          userSelected: true,
        };

        props.onChange?.(coding);
      };
      break;
    }
    case "CodeableConcept": {
      value = props.value?.coding?.[0]?.code || "";
      onChange = (code: string | null) => {
        if (!code) {
          props.onChange?.(undefined);
          return;
        }

        const foundElement = props.data.find((x) => x.code === code);

        const codeableConceptValue = codeableConcept({
          code: code ?? undefined,
          system: foundElement?.system,
          display: foundElement?.display,
          userSelected: true,
        });

        props.onChange?.(codeableConceptValue);
      };
      break;
    }
  }

  if (!props.mode || props.mode === "select") {
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      <Select
        className={props.className}
        style={props.style}
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
        // @ts-expect-error - onChange type does not seem to propagate correctly.
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
      <Radio.Group
        className={props.className}
        style={props.style}
        label={props.label}
        description={props.description}
        error={props.error}
        placeholder={props.placeholder ?? undefined}
        required={Boolean(props.required)}
        value={value as any}
        // @ts-expect-error Mantine / TS types error
        onChange={onChange}
        {...props.rendererProps}
      >
        <Stack justify="xs" mt="xs">
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
      <Input.Wrapper
        className={props.className}
        style={props.style}
        label={props.label}
        description={props.description}
        error={props.error}
        required={Boolean(props.required)}
        {...(props.rendererProps as any)?.wrapper}
      >
        <SegmentedControl
          disabled={Boolean(props.disabled)}
          fullWidth
          value={value as any}
          // @ts-expect-error Mantine / TS types error
          onChange={onChange}
          // @ts-expect-error Mantine / TS types error
          data={props.data.map((element) => ({
            value: element.code || "",
            label: element.display,
          }))}
          {...props.rendererProps}
        />
      </Input.Wrapper>
    );
  }

  throw new TypeError(`Unsupported mode ${props.mode}.`);
}

export type MantineFhirInputTerminologyProps =
  | SelectProps
  | RadioGroupProps
  | (SegmentedControlProps & { wrapper: InputWrapperProps });

/**
 * Item types for terminology-related inputs.
 */
export type MantineFhirInputTerminologyItemProps = {
  value: string | undefined;
  label: string | undefined;
  item: ValueSetExpansionContains;
};
