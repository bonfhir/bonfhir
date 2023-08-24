/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomResourceClass } from "./extensions";
import {
  AnyResource,
  AnyResourceType,
  Bundle,
  ExtractResource,
  Meta,
  Reference,
  Resource,
  Retrieved,
  WithRequired,
} from "./fhir-types.codegen";
import { asArray, uniqBy } from "./lang-utils";

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
  bundle: Bundle<TResource>,
): BundleNavigator<TResource>;
export function bundleNavigator<
  TResource extends Resource,
  TCustomResourceClass extends CustomResourceClass<TResource>,
>(
  bundle: Bundle<any>,
  customResourceClass?: TCustomResourceClass,
): BundleNavigator<InstanceType<TCustomResourceClass>>;
export function bundleNavigator<TResource extends Resource = Resource>(
  bundle: Bundle<TResource>,
  customResourceClass?: CustomResourceClass<TResource>,
): BundleNavigator<TResource> {
  return new BundleNavigator<TResource>(bundle, customResourceClass);
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
    included<TResult = TTargetResource>(): TResult | undefined;
    included<TResult extends Resource = TTargetResource>(
      customResourceClass?: CustomResourceClass<TResult> | null | undefined,
    ): TResult | undefined;
  };

/**
 * Defines a new type from T where all the Reference<> properties are replaced by ResolvableReference<>,
 * and with revIncluded method added at the root.
 */
export type WithResolvableReferences<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function
    ? T[K]
    : T[K] extends Array<Resource> | undefined
    ? Array<Resource> | undefined
    : T[K] extends Reference<infer TTargetResource>
    ? ResolvableReference<TTargetResource>
    : T[K] extends Reference<infer TTargetResource> | undefined
    ? ResolvableReference<TTargetResource> | undefined
    : RecursiveResolvableReferences<T[K]>;
} & {
  revIncluded<TResource extends AnyResource>(
    select: (
      resource: TResource,
    ) => Reference | Array<Reference | null | undefined> | null | undefined,
  ): RecursiveResolvableReferences<TResource>[];
  revIncluded<TCustomResourceClass extends CustomResourceClass>(
    select: (
      resource: ExtractResource<TCustomResourceClass["resourceType"]>,
    ) => Reference | Array<Reference | null | undefined> | null | undefined,
    customResourceClass: TCustomResourceClass,
  ): RecursiveResolvableReferences<InstanceType<TCustomResourceClass>>[];
};

export type RecursiveResolvableReferences<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function
    ? T[K]
    : T[K] extends Array<Resource> | undefined
    ? Array<Resource> | undefined
    : T[K] extends Reference<infer TTargetResource>
    ? ResolvableReference<TTargetResource>
    : T[K] extends Reference<infer TTargetResource> | undefined
    ? ResolvableReference<TTargetResource> | undefined
    : RecursiveResolvableReferences<T[K]>;
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
  constructor(
    private _bundleOrNavigator:
      | Bundle<TResource>
      | Array<BundleNavigator<TResource>>,
    private _customResourceClass?: CustomResourceClass<TResource>,
  ) {}

  /**
   * Returns the current mode for this navigator:
   *  - bundle: navigates a single bundle
   *  - aggregator: navigates an array of bundle navigators
   */
  public get navigatorMode(): "bundle" | "aggregator" {
    return Array.isArray(this._bundleOrNavigator) ? "aggregator" : "bundle";
  }

  /**
   * Access the underlying bundle.
   */
  public get bundle(): Bundle<Retrieved<TResource>> {
    if (Array.isArray(this._bundleOrNavigator)) {
      throw new TypeError(
        "Cannot access bundle on a bundle navigator that was created from an array of bundle navigators",
      );
    }
    return this._bundleOrNavigator as Bundle<Retrieved<TResource>>;
  }

  public toJSON() {
    return this._bundleOrNavigator;
  }

  /**
   * Return a resource identifies by its unique reference, or undefined if not found.
   * If there are duplicates in the bundle, will return one of them.
   *
   * @param reference: the relative resource reference as a string or a Reference<> - e.g. Patient/982effa0-aa0f-4995-b380-c1621b1f0ffc
   */
  public reference<TResource extends AnyResource>(
    reference: string | Reference<TResource> | null | undefined,
    customResourceClass?: CustomResourceClass<TResource> | null | undefined,
  ): WithResolvableReferences<Retrieved<TResource>> | undefined {
    if (Array.isArray(this._bundleOrNavigator)) {
      for (const navigator of this._bundleOrNavigator) {
        const res = navigator.reference(reference, customResourceClass);
        if (res) {
          return res;
        }
      }
      return;
    }

    const finalReference =
      typeof reference === "string" ? reference : reference?.reference;
    if (!finalReference?.length) {
      return undefined;
    }

    this._ensurePrimaryIndices();

    const result = (this._resourcesByRelativeReference?.get(finalReference) ||
      undefined) as WithResolvableReferences<Retrieved<TResource>> | undefined;

    if (result && customResourceClass) {
      return new customResourceClass(result) as any;
    }

    if (
      result &&
      this._customResourceClass &&
      this._customResourceClass.resourceType === (result.resourceType as any)
    ) {
      return new this._customResourceClass(result) as any;
    }

    return result;
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
  public revReference<TResource extends AnyResource>(
    select: (
      resource: TResource,
    ) => Reference | Array<Reference | null | undefined> | null | undefined,
    reference: Retrieved<AnyResource> | string | null | undefined,
  ): WithResolvableReferences<Retrieved<TResource>>[];
  public revReference<TCustomResourceClass extends CustomResourceClass>(
    select: (
      resource: ExtractResource<TCustomResourceClass["resourceType"]>,
    ) => Reference | Array<Reference | null | undefined> | null | undefined,
    reference: Retrieved<AnyResource> | string | null | undefined,
    customResourceClass: TCustomResourceClass,
  ): WithResolvableReferences<Retrieved<InstanceType<TCustomResourceClass>>>[];
  public revReference<
    TResource extends AnyResource,
    TCustomResourceClass extends CustomResourceClass,
  >(
    select: (
      resource: TResource,
    ) => Reference | Array<Reference | null | undefined> | null | undefined,
    reference: Retrieved<AnyResource> | string | null | undefined,
    customResourceClass?: TCustomResourceClass,
  ): WithResolvableReferences<Retrieved<TResource>>[] {
    if (!reference) {
      return [];
    }

    if (Array.isArray(this._bundleOrNavigator)) {
      for (const navigator of this._bundleOrNavigator) {
        const res = navigator.revReference(
          select as any,
          reference,
          customResourceClass as any,
        );
        if (res.length > 0) {
          return res as any;
        }
      }
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

    const result = (this._resourcesByRefSelectIndex
      ?.get(select.toString())
      ?.get(finalReference) || []) as WithResolvableReferences<
      Retrieved<TResource>
    >[];

    if (customResourceClass) {
      return result.map((x) => new customResourceClass(x) as any);
    }
    return result;
  }

  /**
   * Get all the resources that have a search mode of match (e.g. the primary resource or the bundle).
   * This is useful to iterate over the primary resource for a search.
   */
  public searchMatch<
    TResult extends Resource = TResource,
  >(): WithResolvableReferences<Retrieved<TResult>>[] {
    if (Array.isArray(this._bundleOrNavigator)) {
      return this._bundleOrNavigator.flatMap((nav) => nav.searchMatch());
    }

    this._ensurePrimaryIndices();

    const result = (this._resourcesBySearchMode?.get("match") ||
      []) as unknown as WithResolvableReferences<Retrieved<TResult>>[];

    // Let's be nice to non-compliant servers and check if they do not position the search mode properly.
    if (
      result.length === 0 &&
      this.bundle.entry?.[0] &&
      !this.bundle.entry[0].search?.mode &&
      this.bundle.entry[0].resource?.resourceType
    ) {
      return this.type(
        (this._customResourceClass ||
          this.bundle.entry[0].resource.resourceType) as any,
      ) as WithResolvableReferences<Retrieved<TResult>>[];
    }

    return this._customResourceClass
      ? result.map((x) => new this._customResourceClass!(x) as any)
      : result;
  }

  /**
   * Get the first entry in the bundle that has a search mode of match.
   * If there aren't, or there are multiple results, throw an error.
   * If you want to return undefined on not found, you should use `searchMatch()[0]` instead.
   */
  public searchMatchOne<
    TResult extends Resource = TResource,
  >(): WithResolvableReferences<Retrieved<TResult>> {
    if (Array.isArray(this._bundleOrNavigator)) {
      if (this._bundleOrNavigator.length === 0) {
        throw new Error(`No match found in bundle`);
      }

      if (this._bundleOrNavigator.length > 1) {
        throw new Error(`Cannot searchMatchOne on multiple bundles`);
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this._bundleOrNavigator[0]!.searchMatchOne<TResult>();
    }
    const searchMatches = this.searchMatch<TResult>();
    if (searchMatches.length === 0) {
      throw new Error(`No match found in bundle`);
    }

    if (searchMatches.length > 1) {
      throw new Error(`Multiple search matches found in bundle`);
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return searchMatches[0]!;
  }

  /**
   * Get all the resources of a specific type.
   */
  type<TResourceType extends AnyResourceType = AnyResourceType>(
    type: TResourceType,
  ): WithResolvableReferences<Retrieved<ExtractResource<TResourceType>>>[];
  type<TCustomResourceClass extends CustomResourceClass>(
    type: TCustomResourceClass,
  ): WithResolvableReferences<Retrieved<InstanceType<TCustomResourceClass>>>[];
  public type<
    TCustomResourceClass extends CustomResourceClass,
    TResourceType extends AnyResourceType = AnyResourceType,
  >(
    type: TResourceType | CustomResourceClass,
  ):
    | WithResolvableReferences<Retrieved<ExtractResource<TResourceType>>>[]
    | WithResolvableReferences<
        Retrieved<InstanceType<TCustomResourceClass>>
      >[] {
    if (Array.isArray(this._bundleOrNavigator)) {
      return uniqBy(
        this._bundleOrNavigator.flatMap((nav) =>
          nav.type(type as TResourceType),
        ),
        (res) => `${res.id}${(res.meta as Meta)?.versionId}`,
      );
    }

    this._ensurePrimaryIndices();

    const resourceType = typeof type === "string" ? type : type.resourceType;

    const matched = (this._resourcesByType?.get(resourceType) ||
      []) as WithResolvableReferences<
      Retrieved<ExtractResource<TResourceType>>
    >[];

    return typeof type === "string"
      ? matched
      : matched.map((m) => new type(m) as any);
  }

  /**
   * Return the url associated with a link, characterized by a relation.
   */
  public linkUrl(
    relation: "self" | "first" | "next" | "previous" | "last",
  ): string | undefined;
  public linkUrl(relation: string): string | undefined {
    if (Array.isArray(this._bundleOrNavigator)) {
      return;
    }

    return this.bundle.link?.find((link) => link.relation === relation)?.url;
  }

  /**
   * If a set of search matches, this is the (potentially estimated) total number of
   * entries of type 'match' across all pages in the search.  It does not include
   * search.mode = 'include' or 'outcome' entries and it does not provide a count of
   * the number of entries in the Bundle.
   * @see {@link http://hl7.org/fhir/Bundle-definitions.html#Bundle.total}
   * @fhirType unsignedInt
   */
  public get total(): number | undefined {
    if (Array.isArray(this._bundleOrNavigator)) {
      if (this._bundleOrNavigator[0]?.total == undefined) {
        return undefined;
      }

      return this._bundleOrNavigator.reduce(
        (sum, nav) => sum + (nav.total ?? 0),
        0,
      );
    }
    return this.bundle.total;
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
            this,
          ) as WithResolvableReferences<Resource>;
          if (entry.resource?.id?.length) {
            this._resourcesByRelativeReference.set(
              `${entry.resource.resourceType}/${entry.resource.id}`,
              resolvableResource,
            );

            if (entry.resource.meta?.versionId?.length) {
              this._resourcesByRelativeReference.set(
                `${entry.resource.resourceType}/${entry.resource.id}/_history/${entry.resource.meta.versionId}`,
                resolvableResource,
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
    select: (
      res: unknown,
    ) => Reference | Array<Reference | null | undefined> | null | undefined,
  ): void {
    if (!this._resourcesByRefSelectIndex) {
      this._resourcesByRefSelectIndex = new Map();
    }

    if (!this._resourcesByRefSelectIndex.has(select.toString())) {
      const mappedByReference = new Map();
      for (const entry of (this.bundle.entry || []).filter(Boolean) || []) {
        for (const reference of asArray(select(entry.resource) || []).filter(
          (ref) => !!ref?.reference,
        ) as Array<WithRequired<Reference, "reference">>) {
          if (entry.resource) {
            if (!mappedByReference.has(reference.reference)) {
              mappedByReference.set(reference.reference, []);
            }

            const resolvableReference = withResolvableProxy(
              entry.resource,
              this,
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

function withResolvableProxy<T extends Resource>(
  resource: T,
  navigator: BundleNavigator<T>,
): WithResolvableReferences<T> {
  if (
    !resource ||
    typeof resource !== "object" ||
    (resource as any)["__withResolvableProxy__"]
  ) {
    return resource as any;
  }

  return new Proxy(resource, {
    ownKeys(target) {
      return [
        ...Reflect.ownKeys(target),
        "included",
        "revIncluded",
        "__withResolvableProxy__",
      ];
    },
    getOwnPropertyDescriptor(target, prop) {
      if (prop === "included") {
        return {
          configurable: true,
          enumerable: true,
          writable: true,
          value: (customResourceClass: any) =>
            navigator.reference(
              (target as Reference)?.reference,
              customResourceClass,
            ),
        };
      }

      if (prop === "revIncluded") {
        return {
          configurable: true,
          enumerable: true,
          writable: true,
          value: (
            select: (
              resource: any,
            ) => Reference | Reference[] | null | undefined,
            customResourceClass?: any,
          ) =>
            navigator.revReference(select, target as any, customResourceClass),
        };
      }

      if (prop === "__withResolvableProxy__") {
        return {
          configurable: true,
          enumerable: true,
          writable: true,
          value: () => true,
        };
      }

      return Reflect.getOwnPropertyDescriptor(target, prop);
    },
    get: (target, prop, receiver) => {
      if (prop === "included") {
        return (customResourceClass: any) =>
          navigator.reference(
            (target as Reference)?.reference,
            customResourceClass,
          );
      }

      if (prop === "revIncluded") {
        return (
          select: (resource: any) => Reference | Reference[] | null | undefined,
          customResourceClass?: any,
        ) => navigator.revReference(select, target as any, customResourceClass);
      }

      if (prop === "__withResolvableProxy__") {
        return () => true;
      }

      const targetValue = Reflect.get(target, prop, receiver) as any;
      if (targetValue == undefined) {
        return targetValue;
      }

      if (targetValue["__withResolvableProxy__"]) {
        return targetValue;
      }

      return withResolvableProxy(targetValue, navigator);
    },
  }) as unknown as WithResolvableReferences<T>;
}

/**
 * Ensure and convert a resource as being a {@link RecursiveResolvableReferences}.
 *
 * This can be used to typecast a resource that is known to be included in a bundle, and was retrieved from a bundle navigator.
 */
export function asResolvableReferences<T extends Resource>(
  resource: T,
): RecursiveResolvableReferences<Retrieved<T>> {
  if (!("revIncluded" in resource)) {
    throw new Error(
      `Resource ${resource.resourceType} is not a resolvable reference. You need to search for it first, and use the _include or _revinclude parameters in your search query.`,
    );
  }

  return resource as any;
}

/**
 * Transforms and paginate an array as a BundleNavigator pagination, so that it can be used in place of
 * a bundle navigator.
 */
export function asBundlePagination<T>({
  data,
  pageSize,
  pageUrl,
}: {
  data: T[];
  pageSize: number;
  pageUrl?: string | null | undefined;
}): { data: T[] } & Pick<BundleNavigator, "total" | "linkUrl">;
export function asBundlePagination({
  data,
  pageSize,
  pageUrl,
}: {
  data: null | undefined;
  pageSize: number;
  pageUrl?: string | null | undefined;
}): { data: undefined } & Pick<BundleNavigator, "total" | "linkUrl">;
export function asBundlePagination<T>({
  data,
  pageSize,
  pageUrl,
}: {
  data: T[] | null | undefined;
  pageSize: number;
  pageUrl?: string | null | undefined;
}): { data: T[] | undefined } & Pick<BundleNavigator, "total" | "linkUrl">;
export function asBundlePagination<T>({
  data,
  pageSize,
  pageUrl,
}: {
  data: T[] | null | undefined;
  pageSize: number;
  pageUrl?: string | null | undefined;
}): { data: T[] | undefined } & Pick<BundleNavigator, "total" | "linkUrl"> {
  if (data == undefined) {
    return {
      data: undefined,
      total: 0,
      linkUrl: (): undefined => {
        return;
      },
    };
  }

  const currentPage =
    pageUrl && !Number.isNaN(Number.parseInt(pageUrl))
      ? Number.parseInt(pageUrl)
      : 0;
  const numberOfPages =
    data.length < pageSize ? 1 : Math.ceil(data.length / pageSize);
  const paginatedData = data.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize,
  );
  return {
    data: paginatedData,
    total: data.length,
    linkUrl: (relation: string): string | undefined => {
      switch (relation) {
        case "self": {
          return currentPage.toString();
        }
        case "first": {
          return "0";
        }
        case "next": {
          if (currentPage + 1 < numberOfPages) {
            return (currentPage + 1).toString();
          }
          return;
        }
        case "previous": {
          if (currentPage === 0) {
            return;
          }
          return (currentPage - 1).toString();
        }
        case "last": {
          return (numberOfPages - 1).toString();
        }
        default: {
          throw new TypeError(`Unimplemented relation ${relation}`);
        }
      }
    },
  };
}
