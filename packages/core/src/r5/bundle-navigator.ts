import {
  AnyResource,
  Bundle,
  Reference,
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
 *    const navigator = bundleNavigator<Patient, Organization | Provenance>(bundle);
 *    for(const patient of navigator.searchMatch()) {
 *       const managingOrganization = navigator.reference(patient?.managingOrganization);
 *       const provenance = navigator.firstRevReference<Provenance>((provenance) => provenance.target, patient);
 *       const provenanceOrganization = navigator.reference(provenance?.agent[0]?.who);
 *    }
 */
export function bundleNavigator<
  PrimaryResourceType extends AnyResource = AnyResource,
  SecondaryResourceType extends AnyResource = PrimaryResourceType
>(
  bundle: Bundle<PrimaryResourceType | SecondaryResourceType>
): BundleNavigator<PrimaryResourceType, SecondaryResourceType> {
  return new BundleNavigator<PrimaryResourceType, SecondaryResourceType>(
    bundle
  );
}

export class BundleNavigator<
  PrimaryResourceType extends AnyResource = AnyResource,
  SecondaryResourceType extends AnyResource = PrimaryResourceType
> {
  // Index of resources by their reference - e.g. Patient/982effa0-aa0f-4995-b380-c1621b1f0ffc -> Patient
  // Built by _ensurePrimaryIndices.
  private _resourcesByRelativeReference:
    | Map<string, PrimaryResourceType | SecondaryResourceType>
    | undefined;

  // Index of resources by their entry search mode - e.g. entry.search.mode = "search" or "include" - e.g.
  // "search" -> [Patient]
  // Built by _ensurePrimaryIndices.
  private _resourcesBySearchMode:
    | Map<
        "match" | "include" | "outcome",
        Array<PrimaryResourceType | SecondaryResourceType>
      >
    | undefined;

  // Index of resources by their type - e.g. "Patient" or "Organization" - e.g.
  // "Organization" -> [Organization]
  // Built by _ensurePrimaryIndices.
  private _resourcesByType:
    | Map<
        (PrimaryResourceType | SecondaryResourceType)["resourceType"],
        Array<PrimaryResourceType | SecondaryResourceType>
      >
    | undefined;

  // Index resources first by a select function expression indicating a reverse reference
  // (probably obtained through a _revinclude instruction), then by the actual reverse reference - e.g.
  // `(res) => res.target` -> Patient/982effa0-aa0f-4995-b380-c1621b1f0ffc -> [Provenance]
  // Built by _ensureSelectIndex
  private _resourcesByRefSelectIndex:
    | Map<
        string,
        Map<string, Array<PrimaryResourceType | SecondaryResourceType>>
      >
    | undefined;

  /**
   * Initialize a new Bundle navigator, using an existing bundle.
   * Indexing is lazy and performed on-demand, so initialization is cheap.
   */
  constructor(
    public bundle: Bundle<PrimaryResourceType | SecondaryResourceType>
  ) {}

  /**
   * Return a resource identifies by its unique reference, or undefined if not found.
   * If there are duplicates in the bundle, will return one of them.
   *
   * @param reference: the relative resource reference - e.g. Patient/982effa0-aa0f-4995-b380-c1621b1f0ffc
   */
  public reference<
    MatchType extends PrimaryResourceType | SecondaryResourceType
  >(reference: Reference<MatchType>): MatchType | undefined;
  public reference<
    MatchType extends PrimaryResourceType | SecondaryResourceType =
      | PrimaryResourceType
      | SecondaryResourceType
  >(
    reference: string | Reference<MatchType> | null | undefined
  ): MatchType | undefined;
  public reference<
    MatchType extends PrimaryResourceType | SecondaryResourceType =
      | PrimaryResourceType
      | SecondaryResourceType
  >(
    reference: string | Reference<MatchType> | null | undefined
  ): MatchType | undefined {
    const finalReference =
      typeof reference === "string" ? reference : reference?.reference;
    if (!finalReference?.length) {
      return undefined;
    }

    this._ensurePrimaryIndices();

    return (this._resourcesByRelativeReference?.get(finalReference) ||
      undefined) as MatchType | undefined;
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
  public revReference<
    MatchType extends PrimaryResourceType | SecondaryResourceType =
      | PrimaryResourceType
      | SecondaryResourceType
  >(
    select: (resource: MatchType) => Reference | Reference[] | null | undefined,
    reference: Retrieved<AnyResource> | string | null | undefined
  ): MatchType[] {
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
      ?.get(finalReference) || []) as MatchType[];
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
  public firstRevReference<
    MatchType extends PrimaryResourceType | SecondaryResourceType =
      | PrimaryResourceType
      | SecondaryResourceType
  >(
    select: (resource: MatchType) => Reference | Reference[] | null | undefined,
    reference: Retrieved<AnyResource> | string | null | undefined
  ): MatchType | undefined {
    return this.revReference<MatchType>(select, reference)?.[0];
  }

  /**
   * Get all the resources that have a search mode of match (e.g. the primary resource or the bundle).
   * This is useful to iterate over the primary resource for a search.
   */
  public searchMatch<
    MatchType extends PrimaryResourceType = PrimaryResourceType
  >(): MatchType[] {
    this._ensurePrimaryIndices();

    return (this._resourcesBySearchMode?.get("match") ||
      []) as unknown as MatchType[];
  }

  /**
   * Get the first entry in the bundle that has a search mode of match, or undefined if there isn't any.
   */
  public firstSearchMatch<
    MatchType extends PrimaryResourceType = PrimaryResourceType
  >(): MatchType | undefined {
    this._ensurePrimaryIndices();

    return this._resourcesBySearchMode?.get("match")?.[0] as unknown as
      | MatchType
      | undefined;
  }

  /**
   * Get all the resources of a specific type.
   */
  public type<
    MatchResourceType extends (
      | PrimaryResourceType
      | SecondaryResourceType
    )["resourceType"] = (
      | PrimaryResourceType
      | SecondaryResourceType
    )["resourceType"]
  >(
    type: MatchResourceType
  ): Extract<
    PrimaryResourceType | SecondaryResourceType,
    { resourceType: MatchResourceType }
  >[] {
    this._ensurePrimaryIndices();

    return (this._resourcesByType?.get(type) || []) as Extract<
      PrimaryResourceType | SecondaryResourceType,
      { resourceType: MatchResourceType }
    >[];
  }

  /**
   * Return all unique resources across bundles.
   **/
  public get resources(): Array<PrimaryResourceType | SecondaryResourceType> {
    this._ensurePrimaryIndices();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return [...this._resourcesByRelativeReference!.values()];
  }

  private _ensurePrimaryIndices() {
    if (!this._resourcesByRelativeReference) {
      this._resourcesByRelativeReference = new Map();
      this._resourcesBySearchMode = new Map();
      this._resourcesByType = new Map();

      for (const entry of (this.bundle.entry || []).filter(Boolean) || []) {
        if (entry.resource) {
          if (entry.resource?.id?.length) {
            this._resourcesByRelativeReference.set(
              `${entry.resource.resourceType}/${entry.resource.id}`,
              entry.resource
            );

            if (entry.resource.meta?.versionId?.length) {
              this._resourcesByRelativeReference.set(
                `${entry.resource.resourceType}/${entry.resource.id}/_history/${entry.resource.meta.versionId}`,
                entry.resource
              );
            }
          }

          if (entry.search?.mode?.length) {
            if (!this._resourcesBySearchMode.has(entry.search.mode)) {
              this._resourcesBySearchMode.set(entry.search.mode, []);
            }

            this._resourcesBySearchMode
              .get(entry.search.mode)
              ?.push(entry.resource);
          }

          if (entry.resource.resourceType?.length) {
            if (!this._resourcesByType.has(entry.resource.resourceType)) {
              this._resourcesByType.set(entry.resource.resourceType, []);
            }

            this._resourcesByType
              .get(entry.resource.resourceType)
              ?.push(entry.resource);
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
          if (!mappedByReference.has(reference.reference)) {
            mappedByReference.set(reference.reference, []);
          }

          mappedByReference.get(reference.reference).push(entry.resource);
        }
      }
      this._resourcesByRefSelectIndex.set(select.toString(), mappedByReference);
    }
  }
}
