import { CodeableConcept, Reference } from "fhir/r4";
import { narrative } from "./narratives";
import {
  ExtractResource,
  isDomainResource,
  ResourceType,
  WithRequired,
} from "./types";

/**
 * Build a specific FHIR resource.
 * If the narrative property is not provided, it is generated using a default narrative generator.
 */
export function build<TResource extends ResourceType>(
  resourceType: TResource,
  resource: Omit<ExtractResource<TResource>, "resourceType">
): ExtractResource<TResource> {
  const result = {
    ...resource,
    resourceType,
  } as ExtractResource<TResource>;

  if (isDomainResource(result) && !result.text) {
    result.text = narrative(result);
  }

  return result;
}

/**
 * Build a new `CodeableConcept`.
 * The `text` property default to the first coding `display` value if not provided.
 */
export function buildCodeableConcept(element: CodeableConcept): CodeableConcept;
export function buildCodeableConcept(element: null | undefined): undefined;
export function buildCodeableConcept(
  element: CodeableConcept | null | undefined
): CodeableConcept | undefined;
export function buildCodeableConcept(
  element: CodeableConcept | null | undefined
): CodeableConcept | undefined {
  return element
    ? {
        ...element,
        text: element?.text || element?.coding?.[0]?.display,
      }
    : undefined;
}

export interface Referenceable {
  resourceType: string | undefined;
  id?: string | undefined;
}

export interface VersionSpecific {
  meta?: {
    versionId?: string | undefined;
  };
}

/**
 * Build a new Reference to a resource.
 */
export function buildReferenceFromResource(
  resource: Referenceable & VersionSpecific,
  referenceType?: "version-specific"
): WithRequired<Reference, "reference">;
export function buildReferenceFromResource(
  resource: Referenceable,
  referenceType?: null | undefined
): WithRequired<Reference, "reference">;
export function buildReferenceFromResource(
  resource: Referenceable & VersionSpecific,
  referenceType?: "version-specific" | null | undefined
): WithRequired<Reference, "reference">;
export function buildReferenceFromResource(
  resource: null | undefined,
  referenceType?: "version-specific" | null | undefined
): undefined;
export function buildReferenceFromResource(
  resource: (Referenceable & VersionSpecific) | null | undefined,
  referenceType?: "version-specific" | null | undefined
): WithRequired<Reference, "reference"> | undefined;
export function buildReferenceFromResource(
  resource: (Referenceable & VersionSpecific) | null | undefined,
  referenceType?: "version-specific" | null | undefined
): WithRequired<Reference, "reference"> | undefined {
  if (!resource) {
    return undefined;
  }

  if (!resource.resourceType || !resource.id) {
    throw new Error(
      `Cannot build reference from ${JSON.stringify(
        resource
      )}. Missing either the resourceType or id.`
    );
  }

  if (referenceType === "version-specific") {
    if (!resource.meta?.versionId) {
      throw new Error(
        `Cannot build version-specific reference from ${JSON.stringify(
          resource
        )}. Missing meta.versionId.`
      );
    }
    return {
      reference: `${resource.resourceType}/${resource.id}/_history/${resource.meta.versionId}`,
      type: resource.resourceType,
    };
  }

  return {
    reference: `${resource.resourceType}/${resource.id}`,
    type: resource.resourceType,
  };
}

/**
 * Extract the id portion of a `Reference.reference`.
 */
export function getIdFromReference(reference: Reference): string | undefined;
export function getIdFromReference(reference: null | undefined): undefined;
export function getIdFromReference(
  reference: Reference | null | undefined
): string | undefined;
export function getIdFromReference(
  reference: Reference | null | undefined
): string | undefined {
  if (!reference?.reference) {
    return undefined;
  }

  const splittedRef = reference.reference.split("/");
  return splittedRef.length === 1
    ? splittedRef[0]
    : splittedRef.slice(1).join("/");
}
