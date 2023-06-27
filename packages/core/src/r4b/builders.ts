import {
  AnyDomainResourceType,
  AnyResource,
  CodeableConcept,
  Coding,
  ExtractDomainResource,
  Reference,
  Retrieved,
} from "./fhir-types.codegen.js";
import { asArray } from "./lang-utils.js";
import { narrative } from "./narratives.codegen.js";

/**
 * Build a specific FHIR resource.
 * If the narrative property is not provided, it is generated using a default narrative generator.
 */
export function build<TDomainResourceType extends AnyDomainResourceType>(
  resourceType: TDomainResourceType,
  resource: Omit<ExtractDomainResource<TDomainResourceType>, "resourceType">
): ExtractDomainResource<TDomainResourceType> {
  const result = {
    ...resource,
    resourceType,
  } as ExtractDomainResource<TDomainResourceType>;

  if (!result.text) {
    result.text = narrative(result);
  }

  return result;
}

/**
 * Returns the id of a resource, a reference, or an id itself.
 */
export function id(value: Retrieved<AnyResource>): string;
export function id(
  value: Reference | Retrieved<AnyResource> | string | null | undefined
): string | undefined;
export function id(
  value: Reference | Retrieved<AnyResource> | string | null | undefined
): string | undefined {
  if (!value) {
    return undefined;
  }

  if (typeof value === "string") {
    return value.trim().split("/").pop() || undefined;
  }

  const valueAsDomainResource = value as Retrieved<AnyResource>;
  if (valueAsDomainResource.resourceType) {
    return valueAsDomainResource.id?.split("/").pop() || undefined;
  }

  const valueAsReference = value as Reference;

  if (!valueAsReference.reference) {
    return undefined;
  }

  return valueAsReference.reference.split("/").pop() || undefined;
}

export function codeableConcept(coding: null | undefined): undefined;
export function codeableConcept(coding: Coding): CodeableConcept;
export function codeableConcept(coding: Coding[]): CodeableConcept;
export function codeableConcept(
  coding: Coding | Coding[] | null | undefined
): CodeableConcept | undefined;
export function codeableConcept(
  coding: Coding | Coding[] | null | undefined
): CodeableConcept | undefined {
  if (!coding) {
    return undefined;
  }
  const codings = asArray(coding);

  const text =
    codings.find((x) => x.userSelected)?.display || codings[0]?.display;
  return {
    coding: codings,
    text,
  };
}

export function canonical(
  resource:
    | { url?: string | undefined; version?: string | undefined }
    | null
    | undefined
): string | undefined {
  if (!resource?.url) {
    return;
  }

  return resource.version
    ? `${resource.url}|${resource.version}`
    : resource.url;
}
