import { ContactPoint } from "@bonfhir/core/r5";
import { ReactElement } from "react";
import { useFhirUIContext } from "../../context";
import { FhirInputCommonProps } from "./common";

export interface FhirInputContactPointProps<TRendererProps = any>
  extends FhirInputCommonProps {
  type: "ContactPoint";
  mode?: "full" | "simple" | Array<"system" | "value" | "use">;
  value?: ContactPoint | null | undefined;
  onChange?: (value: ContactPoint | undefined) => void;
  className?: string | undefined;
  style?: Record<string, any> | undefined;
  rendererProps?: TRendererProps;
}

export function FhirInputContactPoint<TRendererProps = any>(
  props: FhirInputContactPointProps<TRendererProps>,
): ReactElement | null {
  const { render } = useFhirUIContext();

  return render<FhirInputContactPointRendererProps>(
    "FhirInputContactPoint",
    props,
  );
}

export interface FhirInputContactPointRendererProps<TRendererProps = any>
  extends FhirInputContactPointProps<TRendererProps> {}

export type FhirInputContactPointRenderer = (
  props: FhirInputContactPointRendererProps,
) => ReactElement | null;
