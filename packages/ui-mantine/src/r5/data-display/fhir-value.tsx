import type { CommonFormatterOptions, valueFormatters } from "@bonfhir/core/r5";
import { FhirValueRendererProps, useFhirUIContext } from "@bonfhir/ui/r5";
import {
  HoverCard,
  HoverCardDropdownProps,
  HoverCardProps,
  HoverCardTargetProps,
  Text,
  TextProps,
} from "@mantine/core";
import { ReactElement } from "react";

export function MantineFhirValue(
  props: FhirValueRendererProps<MantineFhirValueProps>
): ReactElement | null {
  const { formatter } = useFhirUIContext();
  if (hasRelativeOptions(props.options)) {
    return (
      <HoverCard openDelay={1000} {...props.rendererProps?.hoverCard}>
        <HoverCard.Target {...props.rendererProps?.hoverCardTarget}>
          <Text span {...props.rendererProps?.text}>
            {props.formattedValue}
          </Text>
        </HoverCard.Target>
        <HoverCard.Dropdown {...props.rendererProps?.hoverCardDropdown}>
          <Text span {...props.rendererProps?.text}>
            {formatter.format(
              props.type,
              props.value as never,
              props.rendererProps?.relativeDateHoverCardFormatter
            )}
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
    );
  }

  if (props.type === "markdown") {
    return (
      <Text span {...props.rendererProps?.text}>
        <div
          dangerouslySetInnerHTML={{
            __html: props.formattedValue,
          }}
        />
      </Text>
    );
  }

  return (
    <Text span {...props.rendererProps?.text}>
      {props.formattedValue}
    </Text>
  );
}

export interface MantineFhirValueProps {
  text?: TextProps | null | undefined;
  hoverCard?: HoverCardProps | null | undefined;
  hoverCardTarget?: HoverCardTargetProps | null | undefined;
  hoverCardDropdown?: HoverCardDropdownProps | null | undefined;
  relativeDateHoverCardFormatter?:
    | (valueFormatters.DatetimeFormatterOptions & CommonFormatterOptions)
    | null
    | undefined;
}

function hasRelativeOptions(
  value: FhirValueRendererProps<MantineFhirValueProps>["options"]
): value is { dateStyle: "relative" } {
  return !!value && "dateStyle" in value && value.dateStyle === "relative";
}
