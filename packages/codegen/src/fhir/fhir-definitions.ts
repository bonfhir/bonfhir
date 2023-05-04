/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { splitLongLines, toJsComment, toJsType } from "../util-codegen";

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
          case "ValueSet": {
            const valueSet = Object.assign(new ValueSet(definitions), parsed);
            definitions.valueSetsByUrl.set(valueSet.url, valueSet);
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
  public valueSetsByUrl = new Map<string, ValueSet>();

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

  public get valueSets(): ValueSet[] {
    return [...this.valueSetsByUrl.values()].sort((a: any, b: any) =>
      a.name.localeCompare(b.name)
    );
  }

  public get requiredBindingValueSets(): ValueSet[] {
    const requiredBindingsValueSetUrls = new Set(
      this.structureDefinitions
        .flatMap((structureDef) =>
          structureDef.elements.map((element) =>
            element.hasRequiredBinding
              ? (element as any).binding?.valueSet?.split("|")?.[0]
              : undefined
          )
        )
        .filter(Boolean)
    );

    return [...this.valueSetsByUrl.values()]
      .filter((valueSet) =>
        requiredBindingsValueSetUrls.has((valueSet as any).url)
      )
      .sort((a: any, b: any) => a.name.localeCompare(b.name));
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
      .map((x: any) => Object.assign(new Element(this._definitions, this), x))
      .sort((a: any, b: any) => a.path.localeCompare(b.path));
  }

  public get ownElements(): Element[] {
    return this.elements.filter((x: any) =>
      x.base.path.startsWith((this as any).name + ".")
    );
  }

  public get ownRootElements(): Element[] {
    return this.ownElements.filter((x) => x.isRoot);
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
  constructor(
    private _definitions: FhirDefinitions,
    private _structureDefinition: StructureDefinition
  ) {}

  public get name(): string {
    return (this as any).id.split(".").pop() || "";
  }

  public get isArray(): boolean {
    return (this as any).max === "*";
  }

  public get isOptional(): boolean {
    return (this as any).min === 0;
  }

  /** https://hl7.org/fhir/formats.html#choice */
  public get hasDataTypeChoiceVariants(): boolean {
    return (this as any).path.endsWith("[x]");
  }

  public get dataTypeChoiceVariants(): Element[] {
    if (!this.hasDataTypeChoiceVariants) {
      return [];
    }

    return (this as any).type.map((t: any) => {
      const suffix = t.code[0].toUpperCase() + t.code.slice(1);
      return Object.assign(
        new Element(this._definitions, this._structureDefinition),
        {
          ...this,
          id: (this as any).id.replace("[x]", suffix),
          path: (this as any).path.replace("[x]", suffix),
          min: 0,
          base: {
            ...(this as any).base,
            path: (this as any).base.path.replace("[x]", suffix),
          },
          type: [t],
        }
      );
    });
  }

  public get jsType(): string {
    let resolvedType = (this as any).type
      ?.map((x: any) => toJsType(x.code))
      .join(" | ");

    if (this.hasRequiredBinding) {
      resolvedType = this._definitions.valueSetsByUrl.get(
        (this as any).binding.valueSet.split("|")[0]
      )?.safeName;
    }

    if (this.isArray) {
      resolvedType = `Array<${resolvedType}>`;
    }

    if (this.isOptional) {
      resolvedType = `${resolvedType} | undefined`;
    }
    return resolvedType;
  }

  public get fhirDocUrl(): string {
    return this._structureDefinition.isResource
      ? `${this._structureDefinition.fhirDocDefinitionsUrl}#${(this as any).id}`
      : "";
  }

  public get jsDoc(): string {
    return toJsComment(
      [
        ...splitLongLines(
          [(this as any).definition, (this as any).comment].filter(
            (x) => !!x?.trim()
          )
        ),
        this.fhirDocUrl ? `@see {@link ${this.fhirDocUrl}}` : undefined,
        this.hasRequiredBinding
          ? `@see {@link ${
              this._definitions.valueSetsByUrl.get(
                (this as any).binding.valueSet.split("|")[0]
              )?.safeName
            }}`
          : undefined,
      ].filter(Boolean) as string[]
    );
  }

  public get isRoot(): boolean {
    return (this as any).path.split(".").length === 2;
  }

  public get hasRequiredBinding(): boolean {
    return (this as any).binding?.strength === "required";
  }
}

export class ValueSet {
  constructor(private _definitions: FhirDefinitions) {}

  public get jsDoc(): string {
    return toJsComment([
      ...splitLongLines([
        (this as any).title,
        "",
        (this as any).description === (this as any).title
          ? undefined
          : (this as any).description,
      ]),
      ...((this as any).expansion?.contains?.length
        ? (this as any).expansion.contains.map(
            (x: any) => `- ${x.code}: ${x.display}`
          )
        : []),
    ]);
  }

  public get safeName(): string {
    const name = (this as any).name.replace(/[^\dA-Za-z]/g, "");
    // We avoid conflicts with structure definitions by appending "ValueSet" to the name
    if (
      this._definitions.structureDefinitions.some(
        (x) => (x as any).name === name
      )
    ) {
      return `${name}ValueSet`;
    }

    // We avoid conflicts with other value sets by using the title as the name in that case.
    if (
      this._definitions.valueSets.some(
        (x) => (x as any).name === name && (x as any).id !== (this as any).id
      )
    ) {
      return (this as any).title.replace(/[^\dA-Za-z]/g, "");
    }
    return name;
  }
}
