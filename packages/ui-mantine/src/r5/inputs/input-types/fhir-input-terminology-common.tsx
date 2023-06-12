import { ValueSetExpansionContains } from "@bonfhir/core/r5";
import { FhirInputCommonProps } from "@bonfhir/ui/r5";
import { Loader, Select } from "@mantine/core";
import { ReactElement } from "react";

export interface MantineFhirInputTerminologyCommon
  extends FhirInputCommonProps {
  mode: "select";
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
  if (props.mode === "select") {
    const {
      label,
      description,
      error,
      placeholder,
      required,
      disabled,
      loading,
      data,
      ...remainingProps
    } = props;
    return (
      <Select
        label={label}
        description={description}
        error={error}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
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
