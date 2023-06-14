import { ReactElement } from "react";
import {
  FhirInputBoolean,
  FhirInputBooleanProps,
  FhirInputContactPoint,
  FhirInputContactPointProps,
  FhirInputDate,
  FhirInputDateProps,
  FhirInputDateTime,
  FhirInputDateTimeProps,
  FhirInputHumanName,
  FhirInputHumanNameProps,
  FhirInputNumber,
  FhirInputNumberProps,
  FhirInputString,
  FhirInputStringProps,
  FhirInputTerminology,
  FhirInputTerminologyProps,
} from "./input-types/index.js";

export function FhirInput<TRendererProps = any>(
  props: FhirInputProps<TRendererProps>
): ReactElement | null {
  switch (props.type) {
    case "boolean": {
      return <FhirInputBoolean {...props} />;
    }
    case "ContactPoint": {
      return <FhirInputContactPoint {...props} />;
    }
    case "date": {
      return <FhirInputDate {...props} />;
    }
    case "dateTime":
    case "instant": {
      return <FhirInputDateTime {...props} />;
    }
    case "HumanName": {
      return <FhirInputHumanName {...props} />;
    }
    case "decimal":
    case "integer":
    case "integer64":
    case "positiveInt":
    case "unsignedInt": {
      return <FhirInputNumber {...props} />;
    }
    case "string":
    case "canonical":
    case "id":
    case "oid":
    case "uri":
    case "url":
    case "uuid": {
      return <FhirInputString {...props} />;
    }
    case "code":
    case "Coding":
    case "CodeableConcept": {
      return <FhirInputTerminology {...props} />;
    }
    default: {
      throw new Error(`Unknown FhirInput type: ${(props as any).type}`);
    }
  }
}

export type FhirInputProps<TRendererProps = any> =
  | FhirInputBooleanProps<TRendererProps>
  | FhirInputContactPointProps<TRendererProps>
  | FhirInputDateProps<TRendererProps>
  | FhirInputDateTimeProps<TRendererProps>
  | FhirInputHumanNameProps<TRendererProps>
  | FhirInputNumberProps<TRendererProps>
  | FhirInputStringProps<TRendererProps>
  | FhirInputTerminologyProps<TRendererProps>;
