import { ReactElement } from "react";
import {
  FhirInputCode,
  FhirInputCodeProps,
  FhirInputDate,
  FhirInputDateProps,
  FhirInputDateTime,
  FhirInputDateTimeProps,
  FhirInputString,
  FhirInputStringProps,
} from "./input-types/index.js";

export function FhirInput<TRendererProps = any>(
  props: FhirInputProps<TRendererProps>
): ReactElement | null {
  switch (props.type) {
    case "code": {
      return <FhirInputCode {...props} />;
    }
    case "date": {
      return <FhirInputDate {...props} />;
    }
    case "dateTime": {
      return <FhirInputDateTime {...props} />;
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
  | FhirInputCodeProps<TRendererProps>
  | FhirInputDateProps<TRendererProps>
  | FhirInputDateTimeProps<TRendererProps>
  | FhirInputStringProps<TRendererProps>;
