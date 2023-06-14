import { FhirInputArrayRendererProps } from "@bonfhir/ui/r4b";
import {
  ActionIcon,
  ActionIconProps,
  Grid,
  GridProps,
  Group,
  Input,
  InputWrapperProps,
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { ReactElement } from "react";

export function MantineFhirInputArray(
  props: FhirInputArrayRendererProps<MantineFhirInputArrayProps>
): ReactElement | null {
  const max = props.max ?? Number.POSITIVE_INFINITY;
  const min = props.min ?? Number.NEGATIVE_INFINITY;
  return (
    <Input.Wrapper
      label={props.label}
      description={props.description}
      error={props.error}
      required={props.required}
      sx={{ width: "100%" }}
      {...props.rendererProps?.wrapper}
    >
      {props.value?.map((value, index) => (
        <Grid key={index} align="center" {...props.rendererProps?.grid}>
          <Grid.Col span="auto">
            {props.children?.({ arrayValue: props.value, value, index })}
          </Grid.Col>
          <Grid.Col span="content">
            <Group noWrap spacing="xs">
              {index >= max || (props.canAdd && !props.canAdd(value, index)) ? (
                // TODO: Better placeholder
                <svg width="24" height="24"></svg>
              ) : (
                <ActionIcon
                  variant="outline"
                  color="primary"
                  onClick={() => props.onAdd?.(index)}
                  {...props.rendererProps?.actionIconAdd}
                >
                  <IconPlus />
                </ActionIcon>
              )}
              {index < min ? (
                // TODO: Better placeholder
                <svg width="24" height="24"></svg>
              ) : (
                <ActionIcon
                  variant="subtle"
                  onClick={() => props.onRemove?.(index)}
                  {...props.rendererProps?.actionRemove}
                >
                  <IconTrash />
                </ActionIcon>
              )}
            </Group>
          </Grid.Col>
        </Grid>
      ))}
    </Input.Wrapper>
  );
}

export interface MantineFhirInputArrayProps {
  wrapper?: InputWrapperProps | null | undefined;
  grid?: GridProps | null | undefined;
  actionIconAdd?: ActionIconProps | null | undefined;
  actionIconRemove?: ActionIconProps | null | undefined;
}
