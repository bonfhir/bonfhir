import { ValueSetExpansionContains } from "@bonfhir/core/r4b";
import { FhirInputCodeRendererProps } from "@bonfhir/ui/r4b";
import { Loader, Select, SelectProps } from "@mantine/core";
import { ReactElement } from "react";

export function MantineFhirInputCode(
  props: FhirInputCodeRendererProps<MantineFhirInputCodeProps>
): ReactElement | null {
  if (props.mode === "select") {
    return (
      <Select
        label={props.label}
        description={props.description}
        error={props.error}
        placeholder={props.placeholder}
        required={props.required}
        disabled={props.disabled}
        w="100%"
        value={props.value || ""}
        rightSection={props.loading ? <Loader size="1rem" /> : null}
        onChange={(value: string) => props.onChange?.(value || undefined)}
        data={props.data.map(
          (element) =>
            ({
              value: element.code,
              label: element.display,
              item: element,
            } as MantineFhirInputCodeRendererItemProps)
        )}
        {...props.rendererProps}
      />
    );
  }

  throw new TypeError(`Unsupported mode ${props.mode}.`);
}

export type MantineFhirInputCodeProps = SelectProps;

export type MantineFhirInputCodeRendererItemProps = {
  value: string | undefined;
  label: string | undefined;
  item: ValueSetExpansionContains;
};
