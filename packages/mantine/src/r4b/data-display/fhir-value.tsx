import type {
  CommonFormatterOptions,
  valueFormatters,
} from "@bonfhir/core/r4b";
import { FhirValueRendererProps, useFhirUIContext } from "@bonfhir/react/r4b";
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
  props: FhirValueRendererProps<MantineFhirValueProps>,
): ReactElement | null {
  const { formatter } = useFhirUIContext();
  if (hasRelativeOptions(props.options)) {
    return (
      <HoverCard openDelay={1000} {...props.rendererProps?.hoverCard}>
        <HoverCard.Target {...props.rendererProps?.hoverCardTarget}>
          <Text
            span
            className={props.className}
            style={props.style}
            {...props.rendererProps?.text}
          >
            {props.formattedValue}
          </Text>
        </HoverCard.Target>
        <HoverCard.Dropdown {...props.rendererProps?.hoverCardDropdown}>
          <Text span {...props.rendererProps?.text}>
            {formatter.format(
              props.type,
              props.value as never,
              props.rendererProps?.relativeDateHoverCardFormatter,
            )}
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
    );
  }

  if (props.type === "markdown" && props.options?.style === "html") {
    return (
      <Text
        className={props.className}
        style={props.style}
        component="div"
        dangerouslySetInnerHTML={{
          __html: props.formattedValue,
        }}
        {...props.rendererProps?.text}
      />
    );
  }

  return (
    <Text
      span
      className={props.className}
      style={props.style}
      {...props.rendererProps?.text}
    >
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
  value: FhirValueRendererProps<MantineFhirValueProps>["options"],
): value is { dateStyle: "relative" } {
  return !!value && "dateStyle" in value && value.dateStyle === "relative";
}
