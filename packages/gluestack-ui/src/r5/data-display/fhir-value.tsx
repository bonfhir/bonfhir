import { FhirValueRendererProps } from "@bonfhir/react/r5";
import { Text } from "@gluestack-ui/themed";
import { ReactElement } from "react";

export function GlueStackFhirValue(
  props: FhirValueRendererProps<GlueStackFhirValueProps>,
): ReactElement | null {
  return (
    <Text style={props.style} {...props.rendererProps?.text}>
      {props.formattedValue}
    </Text>
  );
}

export interface GlueStackFhirValueProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text?: any | null | undefined;
}
