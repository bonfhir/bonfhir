/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { splitLongLines, toJsComment } from "../util-codegen";

/**
 * Holds all FHIR definitions
 */
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

    const definitions = new FhirDefinitions(release, version);

    const allFiles = await readdir(path);
    for (const file of allFiles.filter((x) => !x.startsWith("."))) {
      try {
        const parsed = JSON.parse(await readFile(join(path, file), "utf8"));
        switch (parsed.resourceType) {
          case "StructureDefinition": {
            const structureDefinition = Object.assign(
              new StructureDefinition(definitions),
              parsed
            );
            definitions.structureDefinitionsByUrl.set(
              structureDefinition.url,
              structureDefinition
            );
            break;
          }
        }
      } catch (error) {
        console.warn(`Failed to parse ${file}`, error);
      }
    }

    return definitions;
  }

  private constructor(public release: string, public version: string) {}

  public structureDefinitionsByUrl = new Map<string, StructureDefinition>();

  public get structureDefinitions(): StructureDefinition[] {
    return [...this.structureDefinitionsByUrl.values()].sort((a: any, b: any) =>
      a.name.localeCompare(b.name)
    );
  }

  public get resources(): StructureDefinition[] {
    return this.structureDefinitions.filter((x: any) => x.isResource);
  }

  public get domainResources(): StructureDefinition[] {
    return this.resources.filter((x) => x.isDomainResource);
  }
}

export class StructureDefinition {
  constructor(private _definitions: FhirDefinitions) {}

  public get base(): StructureDefinition | undefined {
    return this._definitions.structureDefinitionsByUrl.get(
      (this as any).baseDefinition
    );
  }

  public get isResource(): boolean {
    return (this as any).kind === "resource";
  }

  public get isDomainResource(): boolean {
    return (this.base as any)?.name === "DomainResource";
  }

  public get elements(): Element[] {
    return ((this as any).snapshot?.element || [])
      .map((x: any) => Object.assign(new Element(this._definitions), x))
      .sort((a: any, b: any) => a.path.localeCompare(b.path));
  }

  public get ownElements(): Element[] {
    return this.elements.filter((x: any) =>
      x.path.startsWith((this as any).name + ".")
    );
  }

  public get fhirDocUrl(): string {
    return `http://hl7.org/fhir/${this._definitions.release.toUpperCase()}/${
      (this as any).id
    }.html`;
  }

  public get fhirDocDefinitionsUrl(): string {
    return `http://hl7.org/fhir/${this._definitions.release.toUpperCase()}/${
      (this as any).id
    }-definitions.html`;
  }

  public get jsDoc(): string {
    return toJsComment([
      ...splitLongLines([
        (this as any).name,
        "",
        (this as any).description,
        "",
      ]),
      `@see {@link ${this.fhirDocUrl}}`,
    ]);
  }
}

export class Element {
  constructor(private _definitions: FhirDefinitions) {}

  public get name(): string {
    return (this as any).id.split(".").pop() || "";
  }

  public get isArray(): boolean {
    return (this as any).max === "*";
  }
}
