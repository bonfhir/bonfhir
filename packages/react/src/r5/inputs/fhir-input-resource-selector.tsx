import { AnyResourceType, ExtractResource, Reference } from "@bonfhir/core/r5";
import { ReactElement, ReactNode } from "react";
import { FhirInputResourceProps } from "..";
import { useFhirUIContext } from "../context";

export type ResourceSelectorConfig<
  TAnyResourceType extends AnyResourceType = AnyResourceType,
> = {
  [TResourceType in TAnyResourceType]?: {
    search?: FhirInputResourceProps<any, TResourceType>["search"];
    display?: FhirInputResourceProps<any, TResourceType>["display"];
  };
};

export type FhirInputResourceSelectorProps<
  TRendererProps = any,
  TResourceTypes extends AnyResourceType[] = AnyResourceType[],
> = {
  label?: ReactNode | null | undefined;
  description?: ReactNode | null | undefined;
  error?: ReactNode | null | undefined;
  required?: boolean | null | undefined;
  resourceTypes?: TResourceTypes | null | undefined;
  resourceTypeConfig?: ResourceSelectorConfig | null | undefined;
  onChangeResourceType?: (value: TResourceTypes[number] | undefined) => void;
  className?: string | undefined;
  style?: Record<string, any> | undefined;
  rendererProps?: TRendererProps;
} & (
  | {
      type: "Resource";
      value?:
        | ExtractResource<TResourceTypes[number]>
        | string
        | null
        | undefined;
      onChange?: (
        value: ExtractResource<TResourceTypes[number]> | undefined,
      ) => void;
    }
  | {
      type: "Reference";
      value?: Reference | null | undefined;
      onChange?: (
        value: Reference<ExtractResource<TResourceTypes[number]>> | undefined,
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
