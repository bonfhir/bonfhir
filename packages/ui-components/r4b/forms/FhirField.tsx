import { ReactElement } from "react";
import { FhirFieldResource, FhirFieldResourceProps } from "./fields/resource";
import { FhirFieldString, FhirFieldStringProps } from "./fields/string";

export type FhirFieldProps<TRendererProps = unknown> =
  | FhirFieldStringProps<TRendererProps>
  | FhirFieldResourceProps<TRendererProps>;

export function FhirField<TRendererProps = unknown>(
  props: FhirFieldProps<TRendererProps>
): ReactElement | null {
  switch (props.type) {
    case "string":
      return <FhirFieldString {...props} />;
    case "resource":
      return <FhirFieldResource {...props} />;
  }

  throw new Error(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    `FhirField: Unsupported type ${(props as any).type} for ${
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (props as any).name
    }`
  );
}
