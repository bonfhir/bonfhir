import { AnyResourceType } from "@bonfhir/core/r5";
import {
  FhirError,
  FhirInputResourceTypeRendererProps,
} from "@bonfhir/react/r5";
import { Select, SelectProps } from "@mantine/core";
import { ReactElement } from "react";

export function MantineFhirInputResourceType(
  props: FhirInputResourceTypeRendererProps<MantineFhirInputResourceTypeProps>,
): ReactElement | null {
  const data = props.availableResourceTypes.map((resourceType) => ({
    label: resourceType,
    value: resourceType,
  }));

  if (props.error) {
    return <FhirError error={props.error} />;
  }

  return (
    <Select
      className={props.className}
      style={props.style}
      label={props.label}
      description={props.description}
      error={props.error}
      placeholder={props.placeholder ?? undefined}
      required={Boolean(props.required)}
      disabled={Boolean(props.disabled)}
      searchable
      nothingFoundMessage="No results"
      clearable={!props.required}
      data={data}
      value={props.value || null}
      onChange={(value) =>
        props.onChange?.(value as AnyResourceType | undefined)
      }
      {...props.rendererProps}
    />
  );
}

export type MantineFhirInputResourceTypeProps = SelectProps;
