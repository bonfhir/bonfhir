import { FhirInputArrayRendererProps } from "@bonfhir/react/r4b";
import {
  ActionIcon,
  ActionIconProps,
  Grid,
  GridProps,
  Group,
  Input,
  InputWrapperProps,
} from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { ReactElement, ReactNode, useEffect } from "react";

export function MantineFhirInputArray(
  props: FhirInputArrayRendererProps<MantineFhirInputArrayProps>,
): ReactElement | null {
  const max = props.max ?? Number.POSITIVE_INFINITY;
  const min = props.min ?? Number.NEGATIVE_INFINITY;

  useEffect(() => {
    if (!props.value?.length && min > 0) {
      for (let i = 0; i < min; i++) {
        props.onAdd?.(i);
      }
    }
  }, []);

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
      {!props.value?.length && (
        <ActionIcon
          variant="outline"
          color="primary"
          onClick={() => props.onAdd?.(-1)}
          {...props.rendererProps?.actionIconAdd}
        >
          <IconPlus />
        </ActionIcon>
      )}
      {props.value?.map((value, index) => (
        <Grid key={index} align="center" {...props.rendererProps?.grid}>
          <Grid.Col span="auto">
            {props.children?.({ arrayValue: props.value, value, index })}
          </Grid.Col>
          <Grid.Col span="content">
            <Group wrap="nowrap" gap="xs">
              <ActionIcon
                variant="outline"
                color="primary"
                onClick={() => props.onAdd?.(index)}
                style={{
                  visibility:
                    index >= max ||
                    (props.canAdd && !props.canAdd(value, index))
                      ? "hidden"
                      : "visible",
                }}
                {...props.rendererProps?.actionIconAdd}
              >
                {props.rendererProps?.iconAdd ?? <IconPlus />}
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                color="red"
                onClick={() => props.onRemove?.(index)}
                style={{
                  visibility: index < min ? "hidden" : "visible",
                }}
                {...props.rendererProps?.actionRemove}
              >
                {props.rendererProps?.iconRemove ?? <IconMinus />}
              </ActionIcon>
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
  iconAdd?: ReactNode | null | undefined;
  actionIconRemove?: ActionIconProps | null | undefined;
  iconRemove?: ReactNode | null | undefined;
}
