import { ReactElement } from "react";
import {
  FhirInputDate,
  FhirInputDateProps,
  FhirInputString,
  FhirInputStringProps,
} from "./input-types/index.js";

export function FhirInput<TRendererProps = any>(
  props: FhirInputProps<TRendererProps>
): ReactElement | null {
  switch (props.type) {
    case "date": {
      return <FhirInputDate {...props} />;
    }
    case "string": {
      return <FhirInputString {...props} />;
    }
    default: {
      throw new Error(`Unknown FhirInput type: ${(props as any).type}`);
    }
  }
}

export type FhirInputProps<TRendererProps = any> =
  | FhirInputDateProps<TRendererProps>
  | FhirInputStringProps<TRendererProps>;
