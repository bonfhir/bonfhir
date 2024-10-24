import { AnyResourceType, ExtractResource, Reference } from "@bonfhir/core/r4b";
import { ReactElement } from "react";
import { useFhirUIContext } from "../context";

export type FhirInputResourceSelectorProps<TRendererProps = any> = {
  required?: boolean | null | undefined;
  resourceTypes?: AnyResourceType[] | null | undefined;
  onChangeResourceType?: (value: AnyResourceType | undefined) => void;
  className?: string | undefined;
  style?: Record<string, any> | undefined;
  rendererProps?: TRendererProps;
} & (
  | {
      type: "Resource";
      value?: ExtractResource<AnyResourceType> | string | null | undefined;
      onChange?: (value: ExtractResource<AnyResourceType> | undefined) => void;
    }
  | {
      type: "Reference";
      value?: Reference | null | undefined;
      onChange?: (
        value: Reference<ExtractResource<AnyResourceType>> | undefined,
      ) => void;
    }
);

export function FhirInputResourceSelector<TRendererProps = any>(
  props: FhirInputResourceSelectorProps<TRendererProps>,
): ReactElement | null {
  const { applyDefaultProps, render } = useFhirUIContext();
  props = applyDefaultProps("FhirInputResourceSelector", props);

  return render<FhirInputResourceSelectorProps>("FhirInputResourceSelector", {
    ...props,
  });
}

export type FhirInputResourceSelectorRendererProps<TRendererProps = any> =
  FhirInputResourceSelectorProps<TRendererProps>;

export type FhirInputResourceSelectorRenderer = (
  props: FhirInputResourceSelectorRendererProps,
) => ReactElement | null;
