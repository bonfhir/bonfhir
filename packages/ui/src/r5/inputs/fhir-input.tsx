import { ReactElement } from "react";
import { FhirInputString, FhirInputStringProps } from "./input-types/index.js";

export function FhirInput<TRendererProps = any>(
  props: FhirInputProps<TRendererProps>
): ReactElement | null {
  switch (props.type) {
    case "string": {
      return <FhirInputString {...props} />;
    }
    default: {
      throw new Error(`Unknown FhirInput type: ${props.type}`);
    }
  }
}

export type FhirInputProps<TRendererProps = any> =
  FhirInputStringProps<TRendererProps>;
