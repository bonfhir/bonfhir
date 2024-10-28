import { AnyResourceType } from "@bonfhir/core/r4b";
import {
  FhirInput,
  FhirInputResourceProps,
  FhirInputResourceSelectorRendererProps,
} from "@bonfhir/react/r4b";
import { Group, Input, InputWrapperProps } from "@mantine/core";
import { ReactElement, useState } from "react";

export function MantineFhirInputResourceSelector(
  props: FhirInputResourceSelectorRendererProps<MantineFhirInputResourceSelectorProps>,
): ReactElement | null {
  const [resourceType, setResourceType] = useState<
    AnyResourceType | undefined | null
  >(props.resourceTypes?.length === 1 ? props.resourceTypes[0] : null);

  const onChangeResourceType = (value: AnyResourceType | undefined) => {
    setResourceType(value);
    props.onChangeResourceType?.(value);
  };

  const resourceTypeConfig =
    resourceType && props.resourceTypeConfig?.[resourceType];

  return (
    <Input.Wrapper
      className={props.className}
      style={{ ...props.style, width: "100%" }}
      label={props.label}
      description={props.description}
      error={props.error}
      required={Boolean(props.required)}
      {...props.rendererProps?.wrapper}
    >
      <Group>
        <FhirInput
          type="ResourceType"
          value={resourceType}
          onChange={onChangeResourceType}
          resourceTypes={props.resourceTypes}
          required={props.required}
          {...props.rendererProps}
        />
        {resourceType &&
          (props.type === "Resource" ? (
            <FhirInput
              type="Resource"
              resourceType={resourceType}
              value={props.value}
              onChange={props.onChange}
              required={props.required}
              search={
                resourceTypeConfig?.search as FhirInputResourceProps<AnyResourceType>["search"]
              }
              display={
                resourceTypeConfig?.display as FhirInputResourceProps<AnyResourceType>["display"]
              }
              {...props.rendererProps}
            />
          ) : (
            props.type === "Reference" && (
              <FhirInput
                type="Reference"
                resourceType={resourceType}
                value={props.value}
                onChange={props.onChange}
                required={props.required}
                search={
                  resourceTypeConfig?.search as FhirInputResourceProps<AnyResourceType>["search"]
                }
                display={
                  resourceTypeConfig?.display as FhirInputResourceProps<AnyResourceType>["display"]
                }
                {...props.rendererProps}
              />
            )
          ))}
      </Group>
    </Input.Wrapper>
  );
}

export interface MantineFhirInputResourceSelectorProps {
  wrapper?: InputWrapperProps | null | undefined;
}
