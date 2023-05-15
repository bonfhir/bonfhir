import {
  FhirResource,
  HumanName,
  Reference,
  Retrieved,
} from "./fhir-types.codegen";

export interface ReferenceOptions {
  versionSpecific?: boolean | null | undefined;
}

/**
 * Build a reference from a resource.
 */
export function reference<TTargetResource extends FhirResource = FhirResource>(
  resource: Retrieved<TTargetResource>,
  options?: ReferenceOptions | null | undefined
): Reference<TTargetResource> {
  const reference: Reference<TTargetResource> = {
    reference: options?.versionSpecific
      ? `${resource.resourceType}/${resource.id}/_history/${resource.meta.versionId}`
      : `${resource.resourceType}/${resource.id}`,
    type: resource.resourceType,
  };

  // TODO: leverage formatters for HumanName.
  if (hasName(resource) && typeof resource.name === "string") {
    reference.display = resource.name;
  }

  return reference;
}

export interface HasName {
  name: string | HumanName;
}

export function hasName(resource: unknown): resource is HasName {
  return !!(resource as HasName).name;
}
