import { FhirFormatterRendererProps } from "@bonfhir/react/r5";
import { ReactElement } from "react";

export function MantineFhirFormatter(
  props: FhirFormatterRendererProps<unknown>,
): ReactElement | null {
  return <>{props.formattedValue}</>;
}
