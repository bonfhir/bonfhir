import { FhirValueRendererProps } from "@bonfhir/react/r5";
import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

export function ShadcnFhirValue(
  props: FhirValueRendererProps<ShadcnFhirValueProps>,
): ReactElement | null {
  return (
    <span className={twMerge("leading-7", props.rendererProps?.className)}>
      {props.formattedValue}
    </span>
  );
}

export interface ShadcnFhirValueProps {
  className?: string;
}
