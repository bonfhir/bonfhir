import { ValueSetExpansionContains } from "@bonfhir/core/r5";
import { FhirInputCommonProps } from "@bonfhir/ui/r5";
import { Loader, Radio, SegmentedControl, Select, Stack } from "@mantine/core";
import { ReactElement } from "react";

export interface MantineFhirInputTerminologyCommon
  extends FhirInputCommonProps {
  mode?: "select" | "radio" | "segmented";
  placeholder?: string | null | undefined;
  loading: boolean;
  data: ValueSetExpansionContains[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rendererProps?: any;
}

/**
 * Base component for all terminology-related inputs
 */
export function MantineFhirInputTerminologyCommon(
  props: MantineFhirInputTerminologyCommon
): ReactElement | null {
  if (!props.mode || props.mode === "select") {
    const { loading, data, ...remainingProps } = props;
    return (
      <Select
        w="100%"
        rightSection={loading ? <Loader size="1rem" /> : null}
        data={data.map(
          (element) =>
            ({
              value: element.code,
              label: element.display,
              item: element,
            } as MantineFhirInputTerminologyItemProps)
        )}
        {...remainingProps}
        {...props.rendererProps}
      />
    );
  }

  if (props.mode === "radio") {
    const { loading, data, ...remainingProps } = props;

    return (
      <Radio.Group {...remainingProps} {...props.rendererProps}>
        <Stack spacing="xs" mt="xs">
          {data.map((element) => (
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
    const { loading, data, ...remainingProps } = props;

    return (
      <SegmentedControl
        fullWidth
        data={data.map(
          (element) =>
            ({
              value: element.code,
              label: element.display,
              item: element,
            } as MantineFhirInputTerminologyItemProps)
        )}
        {...remainingProps}
        {...props.rendererProps}
      />
    );
  }

  throw new TypeError(`Unsupported mode ${props.mode}.`);
}

/**
 * Item types for terminology-related inputs.
 */
export type MantineFhirInputTerminologyItemProps = {
  value: string | undefined;
  label: string | undefined;
  item: ValueSetExpansionContains;
};
