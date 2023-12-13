import { Resource } from "@bonfhir/core/r4b";
import { FhirError, FhirInputResourceRendererProps } from "@bonfhir/react/r4b";
import { Select, SelectProps } from "@mantine/core";
import { usePrevious } from "@mantine/hooks";
import { ReactElement, useEffect, useState } from "react";

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

  // This is to track a reset event and reset the search as well.
  const previousValue = usePrevious(props.value);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!props.value && previousValue) {
      setSearchValue("");
    }
  }, [props.value]);

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
      onSearchChange={(value) => {
        setSearchValue(value);
        props.onSearch(value);
      }}
      value={props.value ? `${props.value.resourceType}/${props.value.id}` : ""}
      searchValue={searchValue}
      onChange={(value) => {
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
