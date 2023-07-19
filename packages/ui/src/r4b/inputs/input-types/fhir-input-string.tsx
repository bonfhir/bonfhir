import { ReactElement } from "react";
import { useFhirUIContext } from "../../context";
import { FhirInputCommonProps } from "./common";

export type FhirInputStringProps<TRendererProps = any> =
  FhirInputCommonProps & {
    placeholder?: string | null | undefined;
    value?: string | null | undefined;
    onChange?: (value: string | undefined) => void;
    rendererProps?: TRendererProps;
  } & (
      | { type: "canonical" | "id" | "oid" | "uri" | "url" | "uuid" }
      | { type: "string"; mode?: "single" | "multiline" }
    );

export function FhirInputString<TRendererProps = any>(
  props: FhirInputStringProps<TRendererProps>,
): ReactElement | null {
  const { render } = useFhirUIContext();

  return render("FhirInputString", { ...props });
}

export type FhirInputStringRendererProps<TRendererProps = any> =
  FhirInputStringProps<TRendererProps>;

export type FhirInputStringRenderer = (
  props: FhirInputStringRendererProps,
) => ReactElement | null;
