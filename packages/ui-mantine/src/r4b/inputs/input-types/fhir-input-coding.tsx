import { Coding, ValueSetExpansionContains } from "@bonfhir/core/r4b";
import { FhirInputCodingRendererProps } from "@bonfhir/ui/r4b";
import { SelectProps } from "@mantine/core";
import { ReactElement } from "react";
import { MantineFhirInputTerminologyCommon } from "./fhir-input-terminology-common.js";

export function MantineFhirInputCoding(
  props: FhirInputCodingRendererProps<MantineFhirInputCodingProps>
): ReactElement | null {
  return (
    <MantineFhirInputTerminologyCommon
      value={props.value?.code || ""}
      onChange={(code: string) => {
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
      }}
      {...props}
    />
  );
}

export type MantineFhirInputCodingProps = SelectProps;

export type MantineFhirInputCodingRendererItemProps = {
  value: string | undefined;
  label: string | undefined;
  item: ValueSetExpansionContains;
};
