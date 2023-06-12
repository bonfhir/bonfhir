import { ValueSetExpansionContains } from "@bonfhir/core/r4b";
import { FhirInputCodeRendererProps } from "@bonfhir/ui/r4b";
import { SelectProps } from "@mantine/core";
import { ReactElement } from "react";
import { MantineFhirInputTerminologyCommon } from "./fhir-input-terminology-common.js";

export function MantineFhirInputCode(
  props: FhirInputCodeRendererProps<MantineFhirInputCodeProps>
): ReactElement | null {
  if (props.mode === "select") {
    return (
      <MantineFhirInputTerminologyCommon
        value={props.value || ""}
        onChange={(value: string) => props.onChange?.(value || undefined)}
        {...props}
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
