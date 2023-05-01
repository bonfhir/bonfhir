/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

export class FhirDefinitions {
  static async load(
    release: string,
    path?: string | null | undefined
  ): Promise<FhirDefinitions> {
    if (!path) {
      path = import.meta?.url
        ? new URL(`../../definitions/fhir/${release}`, import.meta.url).pathname
        : // eslint-disable-next-line unicorn/prefer-module
          join(__dirname, "..", "..", "definitions", "fhir", release);
    }

    const version = JSON.parse(
      await readFile(join(path, "package.json"), "utf8")
    ).version;

    const allFiles = await readdir(path);
    const definitions = [];
    for (const file of allFiles.filter((x) => !x.startsWith("."))) {
      try {
        definitions.push(JSON.parse(await readFile(join(path, file), "utf8")));
      } catch (error) {
        console.warn(`Failed to parse ${file}`, error);
      }
    }

    return new FhirDefinitions(release, version, definitions);
  }

  public resourcesByUrl: Map<string, FhirResource>;

  private constructor(
    public release: string,
    public version: string,
    public definitions: any[] = []
  ) {
    this.resourcesByUrl = FhirResource.loadAll(this);
  }

  public get resources(): FhirResource[] {
    return [...this.resourcesByUrl.values()].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  public get domainResources(): FhirResource[] {
    return this.resources.filter((resource) => resource.isDomainResource);
  }
}

export class FhirResource {
  static loadAll(fhirDefinitions: FhirDefinitions): Map<string, FhirResource> {
    const result = new Map<string, FhirResource>();

    for (const definition of fhirDefinitions.definitions) {
      if (
        definition.resourceType === "StructureDefinition" &&
        definition.kind === "resource" &&
        (!definition.derivation || definition.derivation === "specialization")
      ) {
        const resource = new FhirResource(fhirDefinitions, definition);
        result.set(resource.url, resource);
      }
    }

    return result;
  }

  public abstract: boolean;
  public baseDefinition: ResourcePointer;
  public description: string;
  public id: string;
  public name: string;
  public type: string;
  public url: string;
  public elementsByName: Map<string, FhirElement> = new Map();

  private constructor(
    private _fhirDefinitions: FhirDefinitions,
    structureDefinition: any
  ) {
    this.abstract = structureDefinition.abstract;
    this.baseDefinition = new ResourcePointer(
      this._fhirDefinitions,
      structureDefinition.baseDefinition
    );
    this.description = structureDefinition.description;
    this.id = structureDefinition.id;
    this.name = structureDefinition.name;
    this.type = structureDefinition.type;
    this.url = structureDefinition.url;
    this.elementsByName = FhirElement.loadAll(
      this._fhirDefinitions,
      this.type,
      structureDefinition.snapshot?.element || []
    );
  }

  public get isDomainResource() {
    return this.baseDefinition.resource?.name === "DomainResource";
  }

  public get elements() {
    return [...this.elementsByName.values()].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  public get allElements(): FhirElement[] {
    return [
      ...(this.baseDefinition.resource?.allElements || []),
      ...this.elements,
    ];
  }

  public get fhirDocUrl(): string {
    return `http://hl7.org/fhir/${this._fhirDefinitions.release.toUpperCase()}/${
      this.id
    }.html`;
  }

  public get fhirDocDefinitionsUrl(): string {
    return `http://hl7.org/fhir/${this._fhirDefinitions.release.toUpperCase()}/${
      this.id
    }-definitions.html`;
  }
}

export class FhirElement {
  static loadAll(
    fhirDefinitions: FhirDefinitions,
    baseName: string,
    elements: any[]
  ): Map<string, FhirElement> {
    const result = new Map<string, FhirElement>();

    for (const element of elements.filter(
      (x) => x.base.path.startsWith(baseName) && x.id !== baseName
    )) {
      const fhirElement = new FhirElement(fhirDefinitions, element);
      result.set(fhirElement.name, fhirElement);
    }

    return result;
  }

  public id: string;
  public short: string;
  public definition: string;
  public comment: string;
  public min: number;
  public max: string;
  public isSummary: boolean;
  public path: string;
  public type: string[];

  constructor(
    private _fhirDefinitions: FhirDefinitions,
    elementDefinition: any
  ) {
    this.id = elementDefinition.id;
    this.short = elementDefinition.short;
    this.definition = elementDefinition.definition;
    this.comment = elementDefinition.comment;
    this.min = elementDefinition.min;
    this.max = elementDefinition.max;
    this.isSummary = elementDefinition.isSummary;
    this.path = elementDefinition.path;
    this.type = elementDefinition.type?.map((x: any) => x.code) || [];
  }

  public get name(): string {
    return this.id.split(".").pop() || "";
  }

  public get isArray(): boolean {
    return this.max === "*";
  }

  public get jsType(): string {
    const resolvedType = this.type[0];
    if (this.isArray) {
      return `Array<${resolvedType}>`;
    }

    return resolvedType!;
  }
}

export class ResourcePointer {
  constructor(private _fhirDefinitions: FhirDefinitions, public url: string) {}

  public get resource(): FhirResource | undefined {
    return this._fhirDefinitions.resourcesByUrl.get(this.url);
  }
}
