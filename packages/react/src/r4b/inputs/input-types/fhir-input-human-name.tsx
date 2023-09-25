import { HumanName, NameUse } from "@bonfhir/core/r4b";
import { ReactElement } from "react";
import { useFhirUIContext } from "../../context";
import { FhirInputCommonProps } from "./common";

export interface FhirInputHumanNameProps<TRendererProps = any>
  extends FhirInputCommonProps {
  type: "HumanName";
  mode?:
    | "full"
    | "simple"
    | Array<"prefix" | "given" | "family" | "suffix" | "use">;
  defaultUse?: NameUse | null | undefined;
  /**
   * The separator to use to separate values on repeating fields.
   * Default to comma.
   * May not be used by the underlying renderer.
   */
  separator?: string | null | undefined;
  value?: HumanName | null | undefined;
  onChange?: (value: HumanName | undefined) => void;
  className?: string | undefined;
  rendererProps?: TRendererProps;
}

export function FhirInputHumanName<TRendererProps = any>(
  props: FhirInputHumanNameProps<TRendererProps>,
): ReactElement | null {
  const { render } = useFhirUIContext();

  return render<FhirInputHumanNameRendererProps>("FhirInputHumanName", {
    ...props,
    separator: props.separator || HUMAN_NAME_DEFAULT_SEPARATOR,
  });
}

export interface FhirInputHumanNameRendererProps<TRendererProps = any>
  extends FhirInputHumanNameProps<TRendererProps> {
  separator: string;
}

export type FhirInputHumanNameRenderer = (
  props: FhirInputHumanNameRendererProps,
) => ReactElement | null;

const HUMAN_NAME_DEFAULT_SEPARATOR = ",";
