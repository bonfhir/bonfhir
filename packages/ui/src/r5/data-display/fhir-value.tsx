import { Formatter } from "@bonfhir/core/r5";
import { ReactElement } from "react";

export interface FhirValueProps {
  type: string;
  value: unknown;
  options?: any;
}

export function FhirValue(props: FhirValueProps): ReactElement | null {
  return (
    <>
      {Formatter.default.format(
        props.type,
        props.value as never,
        props.options
      )}
    </>
  );
}
