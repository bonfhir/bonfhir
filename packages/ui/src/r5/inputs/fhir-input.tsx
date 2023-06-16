import { AnyResourceType } from "@bonfhir/core/r5";
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
  FhirInputIdentifier,
  FhirInputIdentifierProps,
  FhirInputNumber,
  FhirInputNumberProps,
  FhirInputResource,
  FhirInputResourceProps,
  FhirInputString,
  FhirInputStringProps,
  FhirInputTerminology,
  FhirInputTerminologyProps,
} from "./input-types/index.js";

export function FhirInput<
  TRendererProps = any,
  TResourceType extends AnyResourceType = AnyResourceType
>(props: FhirInputProps<TRendererProps, TResourceType>): ReactElement | null {
  switch (props.type) {
    case "boolean": {
      return <FhirInputBoolean<TRendererProps> {...props} />;
    }
    case "ContactPoint": {
      return <FhirInputContactPoint<TRendererProps> {...props} />;
    }
    case "date": {
      return <FhirInputDate<TRendererProps> {...props} />;
    }
    case "dateTime":
    case "instant": {
      return <FhirInputDateTime<TRendererProps> {...props} />;
    }
    case "HumanName": {
      return <FhirInputHumanName<TRendererProps> {...props} />;
    }
    case "Identifier": {
      return <FhirInputIdentifier<TRendererProps> {...props} />;
    }
    case "decimal":
    case "integer":
    case "integer64":
    case "positiveInt":
    case "unsignedInt": {
      return <FhirInputNumber<TRendererProps> {...props} />;
    }
    case "Resource":
    case "Reference": {
      return <FhirInputResource<TRendererProps, TResourceType> {...props} />;
    }
    case "string":
    case "canonical":
    case "id":
    case "oid":
    case "uri":
    case "url":
    case "uuid": {
      return <FhirInputString<TRendererProps> {...props} />;
    }
    case "code":
    case "Coding":
    case "CodeableConcept": {
      return <FhirInputTerminology<TRendererProps> {...props} />;
    }
    default: {
      throw new Error(`Unknown FhirInput type: ${(props as any).type}`);
    }
  }
}

export type FhirInputProps<
  TRendererProps = any,
  TResourceType extends AnyResourceType = AnyResourceType
> =
  | FhirInputBooleanProps<TRendererProps>
  | FhirInputContactPointProps<TRendererProps>
  | FhirInputDateProps<TRendererProps>
  | FhirInputDateTimeProps<TRendererProps>
  | FhirInputHumanNameProps<TRendererProps>
  | FhirInputIdentifierProps<TRendererProps>
  | FhirInputNumberProps<TRendererProps>
  | FhirInputResourceProps<TRendererProps, TResourceType>
  | FhirInputStringProps<TRendererProps>
  | FhirInputTerminologyProps<TRendererProps>;
