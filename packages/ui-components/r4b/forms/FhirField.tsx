import { ReactElement } from "react";
import { FhirFieldString, FhirFieldStringProps } from "./fields/string";

export type FhirFieldProps<TRendererProps = unknown> =
  FhirFieldStringProps<TRendererProps>;

export function FhirField(props: FhirFieldProps): ReactElement | null {
  switch (props.type) {
    case "string":
      return <FhirFieldString {...props} />;
  }

  throw new Error(
    `FhirField: Unsupported type ${props.type} for ${props.name}`
  );
}
