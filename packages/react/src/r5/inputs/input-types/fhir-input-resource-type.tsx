import {
  AnyResourceType,
} from "@bonfhir/core/r5";
import { useFhirCapabilities } from "@bonfhir/query/r5";
import { ReactElement, useState, useEffect } from "react";
import { useFhirUIContext } from "../../context";
import { FhirInputCommonProps } from ".";

export type FhirInputResourceTypeProps<TRendererProps = any> = FhirInputCommonProps & {
  type: "ResourceType";
  value?: AnyResourceType | null | undefined;
  onChange?: (value: AnyResourceType | undefined) => void;
  resourceTypes?: AnyResourceType[] | null | undefined;
  placeholder?: string | null | undefined;
  className?: string | undefined;
  style?: Record<string, any> | undefined;
  rendererProps?: TRendererProps;
};

export function FhirInputResourceType<TRendererProps = any>(
  props: FhirInputResourceTypeProps<TRendererProps>,
): ReactElement | null {
  const { render } = useFhirUIContext();
  const [availableResourceTypes, setAvailableResourceTypes] = useState<AnyResourceType[]>([]);

  const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
  const capabilitiesQuery = useFhirCapabilities(undefined, {
    query: { staleTime: oneWeekInMs }, // FHIR server capabilities unlikely to change
  });

  useEffect(() => {
    if (capabilitiesQuery.data) {
      const types = capabilitiesQuery.data.rest?.[0]?.resource?.map(r => r.type as AnyResourceType) || [];
      const filteredTypes = props.resourceTypes 
        ? types.filter(type => props.resourceTypes?.includes(type)) 
        : types;
      setAvailableResourceTypes(filteredTypes);
    }
  }, [capabilitiesQuery.data, props.resourceTypes]);

  return render("FhirInputResourceType", {
    ...props,
    value: props.value || undefined,
    onChange: (value: AnyResourceType | undefined) => {
      props.onChange?.(value);
    },
    availableResourceTypes,
    isLoading: capabilitiesQuery.isLoading,
    error: capabilitiesQuery.error,
  });
}

export type FhirInputResourceTypeRendererProps<TRendererProps = any> =
FhirInputResourceTypeProps<TRendererProps> & {
    availableResourceTypes: AnyResourceType[];
    isLoading: boolean;
    error: unknown | undefined;
  };

export type FhirInputResourceTypeRenderer = (
  props: FhirInputResourceTypeRendererProps,
) => ReactElement | null;