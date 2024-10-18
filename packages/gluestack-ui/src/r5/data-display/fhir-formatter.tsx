import "@formatjs/intl-datetimeformat/polyfill";
import "@formatjs/intl-listformat/polyfill";
import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-relativetimeformat/polyfill";

import { FhirFormatterRendererProps } from "@bonfhir/react/r5";
import { Text } from "@gluestack-ui/themed";
import { ComponentProps, ReactElement } from "react";

type TextProps = ComponentProps<typeof Text>;

export function GlueStackFhirFormatter(
  props: FhirFormatterRendererProps<GlueStackFhirFormatter>,
): ReactElement | null {
  return <Text {...props.rendererProps?.text}>{props.formattedValue}</Text>;
}

export interface GlueStackFhirFormatter {
  text?: TextProps | null | undefined;
}
