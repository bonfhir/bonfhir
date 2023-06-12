import { Coding, ValueSetExpansionContains } from "@bonfhir/core/r5";
import { FhirInputCodingRendererProps } from "@bonfhir/ui/r5";
import { Loader, Select, SelectProps } from "@mantine/core";
import { ReactElement } from "react";

export function MantineFhirInputCoding(
  props: FhirInputCodingRendererProps<MantineFhirInputCodingProps>
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
        value={props.value?.code || ""}
        rightSection={props.loading ? <Loader size="1rem" /> : null}
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
        data={props.data.map(
          (element) =>
            ({
              value: element.code,
              label: element.display,
              item: element,
            } as MantineFhirInputCodingRendererItemProps)
        )}
        {...props.rendererProps}
      />
    );
  }

  throw new TypeError(`Unsupported mode ${props.mode}.`);
}

export type MantineFhirInputCodingProps = SelectProps;

export type MantineFhirInputCodingRendererItemProps = {
  value: string | undefined;
  label: string | undefined;
  item: ValueSetExpansionContains;
};
