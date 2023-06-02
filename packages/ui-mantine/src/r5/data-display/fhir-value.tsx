import { FhirValueRendererProps } from "@bonfhir/ui/r5";
import { Text, TextProps } from "@mantine/core";
import { ReactElement } from "react";

export function MantineFhirValue(
  props: FhirValueRendererProps<MantineFhirValueProps>
): ReactElement | null {
  return (
    <Text span {...props.rendererProps?.text}>
      {props.formattedValue}
    </Text>
  );
}

export interface MantineFhirValueProps {
  text?: TextProps | null | undefined;
}
