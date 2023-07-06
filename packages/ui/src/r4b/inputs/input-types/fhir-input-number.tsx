import { ReactElement } from "react";
import { useFhirUIContext } from "../../context.js";
import { FhirInputCommonProps } from "./common.js";

export type FhirInputNumberProps<TRendererProps = any> =
  FhirInputCommonProps & {
    min?: number | null | undefined;
    max?: number | null | undefined;
    step?: number | null | undefined;
    value?: number | null | undefined;
    onChange?: (value: number | undefined) => void;
    rendererProps?: TRendererProps;
  } & (
      | {
          type: "decimal";
          precision?: number | null | undefined;
        }
      | {
          type: "integer" | "integer64" | "positiveInt" | "unsignedInt";
        }
    );

export function FhirInputNumber<TRendererProps = any>(
  props: FhirInputNumberProps<TRendererProps>,
): ReactElement | null {
  const { render } = useFhirUIContext();

  return render("FhirInputNumber", { ...props });
}

export type FhirInputNumberRendererProps<TRendererProps = any> =
  FhirInputNumberProps<TRendererProps>;

export type FhirInputNumberRenderer = (
  props: FhirInputNumberRendererProps,
) => ReactElement | null;
