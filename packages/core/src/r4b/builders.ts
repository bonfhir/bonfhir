import { AnyDomainResource, Reference, Retrieved } from "./fhir-types.codegen";
import { ReferenceDecorators } from "./reference-decorators.codegen";

export interface ReferenceOptions {
  versionSpecific?: boolean | null | undefined;
}

/**
 * Build a reference from a resource.
 */
export function reference<
  TTargetResource extends AnyDomainResource = AnyDomainResource
>(
  resource: Retrieved<TTargetResource>,
  options?: ReferenceOptions | null | undefined
): Reference<TTargetResource> {
  let reference: Reference<TTargetResource> = {
    reference: options?.versionSpecific
      ? `${resource.resourceType}/${resource.id}/_history/${resource.meta.versionId}`
      : `${resource.resourceType}/${resource.id}`,
    type: resource.resourceType,
  };

  if (ReferenceDecorators[resource.resourceType]) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    reference = ReferenceDecorators[resource.resourceType]!(
      resource,
      reference
    ) as Reference<TTargetResource>;
  }

  return reference;
}
