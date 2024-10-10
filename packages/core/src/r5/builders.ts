import {
  AnyDomainResourceType,
  AnyResourceType,
  CodeableConcept,
  Coding,
  ExtractDomainResource,
  ExtractResource,
  Reference,
} from "@bonfhir/fhirtypes/r5";
import { asArray } from "./lang-utils";
import { narrative } from "./narratives.codegen";

/**
 * Build a specific FHIR resource.
 * If the narrative property is not provided, it is generated using a default narrative generator.
 */
export function build<TDomainResourceType extends AnyDomainResourceType>(
  resourceType: TDomainResourceType,
  resource: Omit<ExtractDomainResource<TDomainResourceType>, "resourceType">,
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
export function id(value: {
  resourceType: AnyResourceType;
  id: string;
}): string;
export function id(
  value:
    | { reference?: string | undefined }
    | { resourceType: AnyResourceType; id: string }
    | string
    | null
    | undefined,
): string | undefined;
export function id(
  value:
    | { reference?: string | undefined }
    | { resourceType: AnyResourceType; id: string }
    | string
    | null
    | undefined,
): string | undefined {
  if (!value) {
    return undefined;
  }

  if (typeof value === "string") {
    return value.trim().split("/").pop() || undefined;
  }

  const valueAsDomainResource = value as {
    resourceType: AnyResourceType;
    id: string;
  };
  if (valueAsDomainResource.resourceType) {
    return valueAsDomainResource.id?.split("/").pop() || undefined;
  }

  const valueAsReference = value as { reference?: string | undefined };

  if (!valueAsReference.reference) {
    return undefined;
  }

  return valueAsReference.reference.split("/").pop() || undefined;
}

export function codeableConcept(coding: null | undefined): undefined;
export function codeableConcept(coding: Coding): CodeableConcept;
export function codeableConcept(coding: Coding[]): CodeableConcept;
export function codeableConcept(
  coding: Coding | Coding[] | null | undefined,
): CodeableConcept | undefined;
export function codeableConcept(
  coding: Coding | Coding[] | null | undefined,
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
    | undefined,
): string | undefined {
  if (!resource?.url) {
    return;
  }

  return resource.version
    ? `${resource.url}|${resource.version}`
    : resource.url;
}

/**
 * Check whether a reference is a reference to a specific resource type, and assert the strong Reference type.
 */
export function isReferenceOf<TResourceType extends AnyResourceType>(
  reference: Reference | null | undefined,
  resourceType: TResourceType,
): reference is Reference<ExtractResource<TResourceType>>;
export function isReferenceOf<
  TResourceType extends AnyResourceType,
  TResourceType2 extends AnyResourceType,
>(
  reference: Reference | null | undefined,
  resourceType: TResourceType,
  resourceType2: TResourceType2,
): reference is Reference<
  ExtractResource<TResourceType> | ExtractResource<TResourceType2>
>;
export function isReferenceOf<
  TResourceType extends AnyResourceType,
  TResourceType2 extends AnyResourceType,
  TResourceType3 extends AnyResourceType,
>(
  reference: Reference | null | undefined,
  resourceType: TResourceType,
  resourceType2: TResourceType2,
  resourceType3: TResourceType3,
): reference is Reference<
  | ExtractResource<TResourceType>
  | ExtractResource<TResourceType2>
  | ExtractResource<TResourceType3>
>;
export function isReferenceOf<
  TResourceType extends AnyResourceType,
  TResourceType2 extends AnyResourceType,
  TResourceType3 extends AnyResourceType,
  TResourceType4 extends AnyResourceType,
>(
  reference: Reference | null | undefined,
  resourceType: TResourceType,
  resourceType2: TResourceType2,
  resourceType3: TResourceType3,
  resourceType4: TResourceType4,
): reference is Reference<
  | ExtractResource<TResourceType>
  | ExtractResource<TResourceType2>
  | ExtractResource<TResourceType3>
  | ExtractResource<TResourceType4>
>;
export function isReferenceOf<
  TResourceType extends AnyResourceType,
  TResourceType2 extends AnyResourceType,
  TResourceType3 extends AnyResourceType,
  TResourceType4 extends AnyResourceType,
  TResourceType5 extends AnyResourceType,
>(
  reference: Reference | null | undefined,
  resourceType: TResourceType,
  resourceType2: TResourceType2,
  resourceType3: TResourceType3,
  resourceType4: TResourceType4,
  resourceType5: TResourceType5,
): reference is Reference<
  | ExtractResource<TResourceType>
  | ExtractResource<TResourceType2>
  | ExtractResource<TResourceType3>
  | ExtractResource<TResourceType4>
  | ExtractResource<TResourceType5>
>;
export function isReferenceOf<TResourceType extends AnyResourceType>(
  reference: Reference | null | undefined,
  ...resourceType: TResourceType[]
): boolean {
  if (!reference?.reference) {
    return false;
  }
  for (const rt of resourceType) {
    if (reference.reference.startsWith(`${rt}/`)) {
      return true;
    }
  }
  return false;
}
