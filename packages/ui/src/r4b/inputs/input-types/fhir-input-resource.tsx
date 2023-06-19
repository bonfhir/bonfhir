import {
  AnyResourceType,
  ExtractResource,
  FhirClientSearchParameters,
  Reference,
  Resource,
  ResourceTypeOf,
  id,
  reference,
} from "@bonfhir/core/r4b";
import { useFhirRead, useFhirSearch } from "@bonfhir/query/r4b";
import { ReactElement, ReactNode, useState } from "react";
import { useFhirUIContext } from "../../context.js";
import { FhirInputCommonProps } from "./common.js";

export type FhirInputResourceProps<
  TRendererProps = any,
  TResourceType extends AnyResourceType = AnyResourceType
> = FhirInputCommonProps & {
  placeholder?: string | null | undefined;
  resourceType: TResourceType;
  search?: (
    query: string
  ) => FhirClientSearchParameters<ResourceTypeOf<TResourceType>>;
  display?:
    | ((resource: ExtractResource<TResourceType>) => ReactNode)
    | null
    | undefined;
  rendererProps?: TRendererProps;
} & (
    | {
        type: "Resource";
        value?: ExtractResource<TResourceType> | string | null | undefined;
        onChange?: (value: ExtractResource<TResourceType> | undefined) => void;
      }
    | {
        type: "Reference";
        value?: Reference | null | undefined;
        onChange?: (
          value: Reference<ExtractResource<TResourceType>> | undefined
        ) => void;
      }
  );

export function FhirInputResource<
  TRendererProps = any,
  TResourceType extends AnyResourceType = AnyResourceType
>(
  props: FhirInputResourceProps<TRendererProps, TResourceType>
): ReactElement | null {
  const { render } = useFhirUIContext();
  const [searchParam, setSearchParams] =
    useState<FhirClientSearchParameters<ResourceTypeOf<TResourceType>>>("");

  const searchQuery = useFhirSearch(props.resourceType, searchParam);
  const valueQuery = useFhirRead(props.resourceType, id(props.value as any), {
    query: {
      enabled: !!id(props.value as any),
    },
  });

  return render("FhirInputResource", {
    ...props,
    value: valueQuery.data || undefined,
    onSearch: (query: string) => {
      if (props.search) {
        setSearchParams(props.search(query));
      } else {
        setSearchParams("");
      }
    },
    onChange: (value: Resource | undefined) => {
      if (!value) {
        props.onChange?.(undefined);
      }

      if (props.type === "Reference") {
        props.onChange?.(reference(value as any));
      }

      if (props.type === "Resource") {
        props.onChange?.(value as any);
      }
    },
    data: searchQuery.data?.searchMatch() ?? [],
    display:
      props.display ??
      ((resource: Resource) =>
        reference(resource as any)?.display ??
        `${resource.resourceType}/${resource.id}`),
  });
}

export type FhirInputResourceRendererProps<TRendererProps = any> =
  FhirInputResourceProps<TRendererProps> & {
    value: Resource | undefined;
    onChange: (value: Resource | undefined) => void;
    onSearch: (query: string) => void;
    data: Resource[];
    display: (resource: Resource) => string;
  };

export type FhirInputResourceRenderer = (
  props: FhirInputResourceRendererProps
) => ReactElement | null;
