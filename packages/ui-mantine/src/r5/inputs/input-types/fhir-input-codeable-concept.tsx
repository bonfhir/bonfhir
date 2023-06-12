import { ValueSetExpansionContains, codeableConcept } from "@bonfhir/core/r5";
import { FhirInputCodeableConceptRendererProps } from "@bonfhir/ui/r5";
import { SelectProps } from "@mantine/core";
import { ReactElement } from "react";
import { MantineFhirInputTerminologyCommon } from "./fhir-input-terminology-common.js";

export function MantineFhirInputCodeableConcept(
  props: FhirInputCodeableConceptRendererProps<MantineFhirInputCodeableConceptProps>
): ReactElement | null {
  if (props.mode === "select") {
    return (
      <MantineFhirInputTerminologyCommon
        value={props.value?.coding?.[0]?.code || ""}
        onChange={(code: string) => {
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
        }}
        {...props}
      />
    );
  }

  throw new TypeError(`Unsupported mode ${props.mode}.`);
}

export type MantineFhirInputCodeableConceptProps = SelectProps;

export type MantineFhirInputCodeableConceptRendererItemProps = {
  value: string | undefined;
  label: string | undefined;
  item: ValueSetExpansionContains;
};
