import {
  AnyResource,
  AnyResourceType,
  Bundle,
  ExtractResource,
  Reference,
  Resource,
  Retrieved,
} from "./fhir-types.codegen";
import { asArray } from "./lang-utils";

/**
 * Allows easy navigation inside a mixed bundle, principally returned by search operations.
 * Builds lazy indexes that allows fast resolution of references, search mode and types to
 * efficiently navigate resources contained in the bundle.
 *
 * Will _not_ perform network calls to resolve references, only resolve resources that are in the bundle.
 *
 * @example
 *    // bundle from /Patient?_include=Patient:managingOrganization&_revinclude=Provenance:target&_include:iterate=Provenance:agent
 *    const navigator = bundleNavigator<Patient>(bundle);
 *    for(const patient of navigator.searchMatch()) {
 *       const managingOrganization = navigator.reference(patient?.managingOrganization);
 *       const provenance = navigator.firstRevReference<Provenance>((provenance) => provenance.target, patient);
 *       // Use the dynamic proxy resolution to access the included resource
 *       const provenanceOrganization = provenance?.agent[0]?.who?.included
 *    }
 */
export function bundleNavigator<TResource extends Resource = Resource>(
  bundle: Bundle<TResource>
): BundleNavigator<TResource> {
  return new BundleNavigator<TResource>(bundle);
}

/**
 * Define a new type that adds an `included` property to a Reference<> that can be resolved automatically from the
 * incoming bundle, if it was included.
 */
export type ResolvableReference<TTargetResource extends Resource = Resource> =
  Reference<TTargetResource> & {
    /**
     * If the original bundle includes the reference (probably from a search query with _include instructions),
     * return the included resource, or undefined if it wasn't included or not found.
     */
    included: TTargetResource | undefined;
  };

/**
 * Defines a new type from T where all the Reference<> properties are replaced by ResolvableReference<>,
 * and with revIncluded method added at the root.
 */
export type WithResolvableReferences<T> = {
  [K in keyof T]: T[K] extends Reference<infer TTargetResource>
    ? ResolvableReference<TTargetResource>
    : T[K] extends Reference<infer TTargetResource> | undefined
    ? ResolvableReference<TTargetResource> | undefined
    : WithResolvableReferences<T[K]>;
} & {
  revIncluded: <TReferencedType extends AnyResource>(
    select: (
      resource: TReferencedType
    ) => Reference | Reference[] | null | undefined
  ) => WithResolvableReferences<TReferencedType>[];
  firstRevIncluded: <TReferencedType extends AnyResource>(
    select: (
      resource: TReferencedType
    ) => Reference | Reference[] | null | undefined
  ) => WithResolvableReferences<TReferencedType> | undefined;
};

export class BundleNavigator<TResource extends Resource = Resource> {
  // Index of resources by their reference - e.g. Patient/982effa0-aa0f-4995-b380-c1621b1f0ffc -> Patient
  // Built by _ensurePrimaryIndices.
  private _resourcesByRelativeReference:
    | Map<string, WithResolvableReferences<Resource>>
    | undefined;

  // Index of resources by their entry search mode - e.g. entry.search.mode = "search" or "include" - e.g.
  // "search" -> [Patient]
  // Built by _ensurePrimaryIndices.
  private _resourcesBySearchMode:
    | Map<
        "match" | "include" | "outcome",
        Array<WithResolvableReferences<Resource>>
      >
    | undefined;

  // Index of resources by their type - e.g. "Patient" or "Organization" - e.g.
  // "Organization" -> [Organization]
  // Built by _ensurePrimaryIndices.
  private _resourcesByType:
    | Map<AnyResourceType, Array<WithResolvableReferences<Resource>>>
    | undefined;

  // Index resources first by a select function expression indicating a reverse reference
  // (probably obtained through a _revinclude instruction), then by the actual reverse reference - e.g.
  // `(res) => res.target` -> Patient/982effa0-aa0f-4995-b380-c1621b1f0ffc -> [Provenance]
  // Built by _ensureSelectIndex
  private _resourcesByRefSelectIndex:
    | Map<string, Map<string, Array<WithResolvableReferences<Resource>>>>
    | undefined;

  /**
   * Initialize a new Bundle navigator, using an existing bundle.
   * Indexing is lazy and performed on-demand, so initialization is cheap.
   */
  constructor(public bundle: Bundle<TResource>) {}

  /**
   * Return a resource identifies by its unique reference, or undefined if not found.
   * If there are duplicates in the bundle, will return one of them.
   *
   * @param reference: the relative resource reference as a string or a Reference<> - e.g. Patient/982effa0-aa0f-4995-b380-c1621b1f0ffc
   */
  public reference<TReferencedType extends AnyResource>(
    reference: string | Reference<TReferencedType> | null | undefined
  ): WithResolvableReferences<TReferencedType> | undefined {
    const finalReference =
      typeof reference === "string" ? reference : reference?.reference;
    if (!finalReference?.length) {
      return undefined;
    }

    this._ensurePrimaryIndices();

    return (this._resourcesByRelativeReference?.get(finalReference) ||
      undefined) as WithResolvableReferences<TReferencedType> | undefined;
  }

  /**
   * Return matching resources that have the reference returned by the specified select expression
   * This can be used to find associated resource returned as part of a revinclude search parameter.
   * @param select - the select function to index the resources. - e.g. `claim => claim.patient`
   * @param reference - the resource reference to match with the values returned by the select - e.g. "Patient/59ba0a80-035a-4a8e-930b-d9f6c523b97a"
   *
   * @example
   *   navigator.refReference<Appointment>(appointment => appointment.participant.actor, "Practitioner/06549508-aae9-4d82-a937-0ddeb0f2de38");
   *
   * @see http://hl7.org/fhir/fhirpath.html
   */
  public revReference<TReferencedType extends AnyResource>(
    select: (
      resource: TReferencedType
    ) => Reference | Reference[] | null | undefined,
    reference: Retrieved<AnyResource> | string | null | undefined
  ): WithResolvableReferences<TReferencedType>[] {
    if (!reference) {
      return [];
    }

    const finalReference =
      typeof reference === "string"
        ? reference
        : `${reference.resourceType}/${reference.id}`;
    if (finalReference.length === 0) {
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this._ensureSelectIndex(select as any);

    return (this._resourcesByRefSelectIndex
      ?.get(select.toString())
      ?.get(finalReference) ||
      []) as WithResolvableReferences<TReferencedType>[];
  }

  /**
   * Return the first matching resource that have the reference returned by the specified select expression, or undefined if there isn't any.
   * This can be used to find associated resource returned as part of a revinclude search parameter.
   * @param select - the select function to index the resources. - e.g. `claim => claim.patient`
   * @param reference - the resource reference to match with the values returned by the select - e.g. "Patient/59ba0a80-035a-4a8e-930b-d9f6c523b97a"
   *
   * @example
   *   navigator.firstRevReference<Appointment>(provenance => provenance.target.actor, "Patient/06549508-aae9-4d82-a937-0ddeb0f2de38");
   *
   * @see http://hl7.org/fhir/fhirpath.html
   */
  public firstRevReference<TReferencedType extends AnyResource>(
    select: (
      resource: TReferencedType
    ) => Reference | Reference[] | null | undefined,
    reference: Retrieved<AnyResource> | string | null | undefined
  ): WithResolvableReferences<TReferencedType> | undefined {
    return this.revReference<TReferencedType>(select, reference)?.[0];
  }

  /**
   * Get all the resources that have a search mode of match (e.g. the primary resource or the bundle).
   * This is useful to iterate over the primary resource for a search.
   */
  public searchMatch<
    TResult extends Resource = TResource
  >(): WithResolvableReferences<TResult>[] {
    this._ensurePrimaryIndices();

    return (this._resourcesBySearchMode?.get("match") ||
      []) as unknown as WithResolvableReferences<TResult>[];
  }

  /**
   * Get the first entry in the bundle that has a search mode of match, or undefined if there isn't any.
   */
  public firstSearchMatch<TResult extends Resource = TResource>():
    | WithResolvableReferences<TResult>
    | undefined {
    this._ensurePrimaryIndices();

    return this._resourcesBySearchMode?.get("match")?.[0] as unknown as
      | WithResolvableReferences<TResult>
      | undefined;
  }

  /**
   * Get all the resources of a specific type.
   */
  public type<TResourceType extends AnyResourceType = AnyResourceType>(
    type: TResourceType
  ): WithResolvableReferences<ExtractResource<TResourceType>>[] {
    this._ensurePrimaryIndices();

    return (this._resourcesByType?.get(type) || []) as WithResolvableReferences<
      ExtractResource<TResourceType>
    >[];
  }

  /**
   * Return all unique resources in the bundle.
   **/
  public resources<TResource extends AnyResource = AnyResource>(): Array<
    WithResolvableReferences<TResource>
  > {
    this._ensurePrimaryIndices();
    return [
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...this._resourcesByRelativeReference!.values(),
    ] as WithResolvableReferences<TResource>[];
  }

  /**
   * Return the url associated with a link, characterized by a relation.
   */
  public linkUrl(
    relation: "self" | "first" | "next" | "previous"
  ): string | undefined;
  public linkUrl(relation: string): string | undefined {
    return this.bundle.link?.find((link) => link.relation === relation)?.url;
  }

  private _ensurePrimaryIndices() {
    if (!this._resourcesByRelativeReference) {
      this._resourcesByRelativeReference = new Map();
      this._resourcesBySearchMode = new Map();
      this._resourcesByType = new Map();

      for (const entry of (this.bundle.entry || []).filter(Boolean) || []) {
        if (entry.resource) {
          const resolvableResource = withResolvableProxy(
            entry.resource,
            this
          ) as WithResolvableReferences<Resource>;
          if (entry.resource?.id?.length) {
            this._resourcesByRelativeReference.set(
              `${entry.resource.resourceType}/${entry.resource.id}`,
              resolvableResource
            );

            if (entry.resource.meta?.versionId?.length) {
              this._resourcesByRelativeReference.set(
                `${entry.resource.resourceType}/${entry.resource.id}/_history/${entry.resource.meta.versionId}`,
                resolvableResource
              );
            }
          }

          if (entry.search?.mode?.length) {
            if (!this._resourcesBySearchMode.has(entry.search.mode)) {
              this._resourcesBySearchMode.set(entry.search.mode, []);
            }

            this._resourcesBySearchMode
              .get(entry.search.mode)
              ?.push(resolvableResource);
          }

          if (entry.resource.resourceType?.length) {
            if (!this._resourcesByType.has(entry.resource.resourceType)) {
              this._resourcesByType.set(entry.resource.resourceType, []);
            }

            this._resourcesByType
              .get(entry.resource.resourceType)
              ?.push(resolvableResource);
          }
        }
      }
    }
  }

  private _ensureSelectIndex(
    select: (res: unknown) => Reference | Reference[] | null | undefined
  ): void {
    if (!this._resourcesByRefSelectIndex) {
      this._resourcesByRefSelectIndex = new Map();
    }

    if (!this._resourcesByRefSelectIndex.has(select.toString())) {
      const mappedByReference = new Map();
      for (const entry of (this.bundle.entry || []).filter(Boolean) || []) {
        for (const reference of asArray(select(entry.resource) || []).filter(
          (ref) => !!ref?.reference
        )) {
          if (entry.resource) {
            if (!mappedByReference.has(reference.reference)) {
              mappedByReference.set(reference.reference, []);
            }

            const resolvableReference = withResolvableProxy(
              entry.resource,
              this
            );
            mappedByReference
              .get(reference.reference)
              .push(resolvableReference);
          }
        }
      }
      this._resourcesByRefSelectIndex.set(select.toString(), mappedByReference);
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function withResolvableProxy<T extends Resource>(
  resource: T,
  navigator: BundleNavigator<T>
): WithResolvableReferences<T> {
  if (typeof resource !== "object" || !resource) {
    return resource;
  }

  return new Proxy(resource, {
    get: (target, prop) => {
      if (prop === "included" && (target as Reference)?.reference) {
        return navigator.reference((target as Reference)?.reference);
      }

      if (prop === "revIncluded" && (target as Resource).resourceType) {
        return (
          select: (resource: any) => Reference | Reference[] | null | undefined
        ) => navigator.revReference(select, target as any);
      }

      if (prop === "firstRevIncluded" && (target as Resource).resourceType) {
        return (
          select: (resource: any) => Reference | Reference[] | null | undefined
        ) => navigator.firstRevReference(select, target as any);
      }

      return withResolvableProxy(Reflect.get(target, prop) as any, navigator);
    },
  }) as unknown as WithResolvableReferences<T>;
}
/* eslint-enable */
