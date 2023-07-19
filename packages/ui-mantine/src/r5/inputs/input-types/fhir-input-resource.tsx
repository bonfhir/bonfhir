import { Resource } from "@bonfhir/core/r5";
import { FhirInputResourceRendererProps } from "@bonfhir/ui/r5";
import { Select, SelectProps, Text } from "@mantine/core";
import { ReactElement, forwardRef } from "react";

export function MantineFhirInputResource(
  props: FhirInputResourceRendererProps<MantineFhirInputResourceProps>,
): ReactElement | null {
  const data = props.data.filter(Boolean).map(
    (resource): MantineFhirInputResourceItemProps => ({
      label: props.display(resource),
      value: `${resource.resourceType}/${resource.id}`,
      resource,
    }),
  );

  return (
    <Select
      label={props.label}
      description={props.description}
      error={props.error}
      placeholder={props.placeholder ?? undefined}
      required={Boolean(props.required)}
      disabled={Boolean(props.disabled)}
      searchable
      nothingFound="No results"
      clearable={!props.required}
      data={data}
      itemComponent={forwardRef<
        HTMLDivElement,
        MantineFhirInputResourceItemProps
      >(({ value: _, label: __, resource, ...others }, ref) => {
        if (!resource) return null;
        const rendered = props.display(resource);
        return (
          <div ref={ref} {...others}>
            {typeof rendered === "string" ? <Text>{rendered}</Text> : rendered}
          </div>
        );
      })}
      onSearchChange={props.onSearch}
      value={
        props.value
          ? `${props.value.resourceType}/${props.value.id}`
          : undefined
      }
      onChange={(value: string) => {
        const resource = value
          ? data.find(
              (x) => value === `${x.resource?.resourceType}/${x.resource?.id}`,
            )?.resource
          : undefined;
        return props.onChange(resource);
      }}
      {...props.rendererProps}
    />
  );
}

export type MantineFhirInputResourceProps = SelectProps;

export interface MantineFhirInputResourceItemProps {
  label: string;
  value: string;
  resource: Resource;
}
