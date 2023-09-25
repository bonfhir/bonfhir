import { ReactElement, ReactNode } from "react";
import { useFhirUIContext } from "../context";

export interface FhirInputArrayHelper<TValue> {
  arrayValue: TValue[] | null | undefined;
  value: TValue | null | undefined;
  index: number;
}

export interface FhirInputArrayProps<TValue, TRendererProps = any> {
  label?: ReactNode | null | undefined;
  description?: ReactNode | null | undefined;
  error?: ReactNode | null | undefined;
  required?: boolean | null | undefined;
  value: TValue[] | null | undefined;
  min?: number | null | undefined;
  max?: number | null | undefined;
  children?: ((helper: FhirInputArrayHelper<TValue>) => ReactNode) | undefined;
  onAdd?: (index: number) => void;
  canAdd?: ((value: TValue, index: number) => boolean) | null | undefined;
  onRemove?: (index: number) => void;
  className?: string | undefined;
  style?: Record<string, any> | undefined;
  rendererProps?: TRendererProps;
}

export function FhirInputArray<TRendererProps = any>(
  props: FhirInputArrayProps<TRendererProps>,
): ReactElement | null {
  const { applyDefaultProps, render } = useFhirUIContext();
  props = applyDefaultProps("FhirInputArray", props);

  return render<FhirInputArrayRendererProps>("FhirInputArray", { ...props });
}

export interface FhirInputArrayRendererProps<TRendererProps = any>
  extends FhirInputArrayProps<TRendererProps> {}

export type FhirInputArrayRenderer = (
  props: FhirInputArrayRendererProps,
) => ReactElement | null;
