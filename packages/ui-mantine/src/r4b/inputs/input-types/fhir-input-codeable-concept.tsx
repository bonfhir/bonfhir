import { ValueSetExpansionContains, codeableConcept } from "@bonfhir/core/r4b";
import { FhirInputCodeableConceptRendererProps } from "@bonfhir/ui/r4b";
import { Loader, Select, SelectProps } from "@mantine/core";
import { ReactElement } from "react";

export function MantineFhirInputCodeableConcept(
  props: FhirInputCodeableConceptRendererProps<MantineFhirInputCodeableConceptProps>
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
        value={props.value?.coding?.[0]?.code || ""}
        rightSection={props.loading ? <Loader size="1rem" /> : null}
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
        data={props.data.map(
          (element) =>
            ({
              value: element.code,
              label: element.display,
              item: element,
            } as MantineFhirInputCodeableConceptRendererItemProps)
        )}
        {...props.rendererProps}
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
