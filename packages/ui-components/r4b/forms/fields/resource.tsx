import {
  buildReferenceFromResource,
  resourceSearch,
  ResourceType,
} from "@bonfhir/core/r4b";
import { useFhirSearch } from "@bonfhir/fhir-query/r4b";
import { useField } from "formik";
import { createElement, ReactElement, useState } from "react";
import { useFhirUIComponentsContext } from "../../FhirUIComponentsContext";

export type FhirFieldResourceProps<TRendererProps = unknown> =
  TRendererProps & {
    type: "resource";
    name: string;
    options: FhirFieldResourcePropsOptions;
  };

export interface FhirFieldResourcePropsOptions {
  resourceType: ResourceType;
  placeholder?: string | null | undefined;
  search?: ((value: string) => string) | null | undefined;
  label: (resource: any) => string | undefined;
}

export function FhirFieldResource<TRendererProps = unknown>(
  props: FhirFieldResourceProps<TRendererProps>
): ReactElement | null {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { type, name, options, ...rendererProps } = props;
  const { renderer } = useFhirUIComponentsContext();
  const [field, meta, helpers] = useField<string>(name);
  const [searchString, setSearchString] = useState("");

  const finalSearch =
    options.search ??
    ((x) => resourceSearch(options.resourceType)._text(x).href);

  const resourceQuery = useFhirSearch(
    options.resourceType,
    finalSearch(searchString)
  );

  return createElement(renderer.resource, {
    options,
    field,
    meta,
    helpers,
    onSearch: setSearchString,
    items:
      resourceQuery.data?.nav.resources.map((x) => ({
        value: buildReferenceFromResource(x)!.reference,
        label: options.label(x) || "",
      })) || [],
    ...rendererProps,
  });
}
