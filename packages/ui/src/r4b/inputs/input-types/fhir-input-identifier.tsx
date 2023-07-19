import {
  CodeableConcept,
  FhirClientSearchParameters,
  Identifier,
  IdentifierUse,
} from "@bonfhir/core/r4b";
import { ReactElement } from "react";
import { useFhirUIContext } from "../../context";
import { FhirInputCommonProps } from "./common";

export interface FhirInputIdentifierProps<TRendererProps = any>
  extends FhirInputCommonProps {
  type: "Identifier";
  mode?:
    | "simple"
    | "full"
    | Array<
        | "use"
        | "type"
        | "system"
        | "value"
        | "period"
        | "assigner-ref"
        | "assigner-text"
      >;
  identifiers?: IdentifierSystem[];
  defaultUse?: IdentifierUse | null | undefined;
  assignerSearch?:
    | ((query: string) => FhirClientSearchParameters<"Organization">)
    | undefined;
  value?: Identifier | null | undefined;
  onChange?: (value: Identifier | undefined) => void;
  rendererProps?: TRendererProps;
}

export interface IdentifierSystem {
  system: string;
  label?: string | null | undefined;
  type?: CodeableConcept | null | undefined;
  processValue?: (value: string) => string;
}

export function FhirInputIdentifier<TRendererProps = any>(
  props: FhirInputIdentifierProps<TRendererProps>,
): ReactElement | null {
  const { render } = useFhirUIContext();

  return render<FhirInputIdentifierRendererProps>("FhirInputIdentifier", {
    ...props,
  });
}

export interface FhirInputIdentifierRendererProps<TRendererProps = any>
  extends FhirInputIdentifierProps<TRendererProps> {}

export type FhirInputIdentifierRenderer = (
  props: FhirInputIdentifierRendererProps,
) => ReactElement | null;
