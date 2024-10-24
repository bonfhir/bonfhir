import { AnyResourceType } from "@bonfhir/core/r5";
import { FhirInput, FhirInputResourceSelectorRendererProps } from "@bonfhir/react/r5";
import {
  Group,
} from "@mantine/core";
import { ReactElement, useState } from "react";

export function MantineFhirInputResourceSelector(
  props: FhirInputResourceSelectorRendererProps<MantineFhirInputResourceSelectorProps>,
): ReactElement | null {
  const [resourceType, setResourceType] = useState<AnyResourceType | undefined | null>(
    props.resourceTypes?.length === 1
      ? props.resourceTypes[0]
      : null
  );

  const onChangeResourceType = (value: AnyResourceType | undefined) => {
    setResourceType(value);
    props.onChangeResourceType?.(value);
  };

  return (
    <Group
      className={props.className}
      style={props.style}
    >
      <FhirInput 
        type="ResourceType"
        value={resourceType}
        onChange={onChangeResourceType}
        resourceTypes={props.resourceTypes}
        required={props.required}
        {...props.rendererProps}
      />
      {resourceType && (
        props.type === "Resource" ? (
          <FhirInput
            type="Resource"
            resourceType={resourceType}
            value={props.value}
            onChange={props.onChange}
            required={props.required}
            {...props.rendererProps}
          />
        ) : props.type === "Reference" && (
          <FhirInput
            type="Reference"
            resourceType={resourceType}
            value={props.value}
            onChange={props.onChange}
            required={props.required}
            {...props.rendererProps}
          />
        )
      )}
    </Group>
  );
}

export interface MantineFhirInputResourceSelectorProps {
  // yay
}
