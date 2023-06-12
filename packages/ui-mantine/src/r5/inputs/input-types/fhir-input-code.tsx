import { ValueSetExpansionContains } from "@bonfhir/core/r5";
import { FhirInputCodeRendererProps } from "@bonfhir/ui/r5";
import { SelectProps } from "@mantine/core";
import { ReactElement } from "react";
import { MantineFhirInputTerminologyCommon } from "./fhir-input-terminology-common.js";

export function MantineFhirInputCode(
  props: FhirInputCodeRendererProps<MantineFhirInputCodeProps>
): ReactElement | null {
  return (
    <MantineFhirInputTerminologyCommon
      value={props.value || ""}
      onChange={(value: string) => props.onChange?.(value || undefined)}
      {...props}
    />
  );
}

export type MantineFhirInputCodeProps = SelectProps;

export type MantineFhirInputCodeRendererItemProps = {
  value: string | undefined;
  label: string | undefined;
  item: ValueSetExpansionContains;
};
