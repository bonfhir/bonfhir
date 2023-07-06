/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import {
  splitLongLines,
  targetProfileToTsTypes,
  toJsComment,
  toTsType,
} from "../util-codegen.js";

/**
 * Holds all FHIR definitions
 */
export class FhirDefinitions {
  static async load(
    release: string,
    path?: string | null | undefined,
  ): Promise<FhirDefinitions> {
    if (!path) {
      path = import.meta?.url
        ? new URL(`../../definitions/fhir/${release}`, import.meta.url).pathname
        : // eslint-disable-next-line unicorn/prefer-module
          join(__dirname, "..", "..", "definitions", "fhir", release);
    }

    const version = JSON.parse(
      await readFile(join(path, "package.json"), "utf8"),
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
              parsed,
            );
            definitions.structureDefinitionsByUrl.set(
              structureDefinition.url,
              structureDefinition,
            );
            break;
          }

          case "ValueSet": {
            const valueSet = Object.assign(new ValueSet(definitions), parsed);
            definitions.valueSetsByUrl.set(valueSet.url, valueSet);
            break;
          }

          case "SearchParameter": {
            const searchParameter = Object.assign(
              new SearchParameter(),
              parsed,
            );
            definitions.searchParameters.push(searchParameter);
            for (const base of (searchParameter as any).base || []) {
              if (!definitions.searchParametersByResourceType.has(base)) {
                definitions.searchParametersByResourceType.set(base, []);
              }
              definitions.searchParametersByResourceType
                .get(base)
                ?.push(searchParameter);
            }
            break;
          }

          case "OperationDefinition": {
            const operationDefinition = Object.assign(
              new OperationDefinition(definitions),
              parsed,
            );
            definitions.operationDefinitions.push(operationDefinition);
            break;
          }
        }
      } catch (error) {
        console.warn(`Failed to parse ${file}`, error);
      }
    }

    return definitions;
  }

  private constructor(
    public release: string,
    public version: string,
  ) {}

  public structureDefinitionsByUrl = new Map<string, StructureDefinition>();
  public valueSetsByUrl = new Map<string, ValueSet>();
  public searchParameters: SearchParameter[] = [];
  public searchParametersByResourceType = new Map<string, SearchParameter[]>();
  public operationDefinitions: OperationDefinition[] = [];

  /**
   * All structure definitions sorted by name
   */
  public get structureDefinitions(): StructureDefinition[] {
    return [...this.structureDefinitionsByUrl.values()].sort((a: any, b: any) =>
      a.name.localeCompare(b.name),
    );
  }

  /**
   * All resources sorted by name
   */
  public get resources(): StructureDefinition[] {
    return this.structureDefinitions.filter(
      (x: any) => x.isResource && x.derivation != "constraint",
    );
  }

  /**
   * All domain resources sorted by name
   */
  public get domainResources(): StructureDefinition[] {
    return this.resources.filter((x) => x.isDomainResource);
  }

  /**
   * All primitive types sorted by name
   */
  public get primitiveTypes(): StructureDefinition[] {
    return this.structureDefinitions.filter((x: any) => x.isPrimitiveType);
  }

  /**
   * All complex types sorted by name
   */
  public get complexTypes(): StructureDefinition[] {
    return this.structureDefinitions.filter((x: any) => x.isComplexType);
  }

  /**
   * All value sets sorted by name
   */
  public get valueSets(): ValueSet[] {
    return [...this.valueSetsByUrl.values()].sort((a: any, b: any) =>
      a.name.localeCompare(b.name),
    );
  }

  /**
   * All value sets that are referenced by an element with a required binding
   */
  public get requiredBindingValueSets(): ValueSet[] {
    const requiredBindingsValueSetUrls = new Set(
      this.structureDefinitions
        .flatMap((structureDef) =>
          structureDef.elements.map((element) =>
            element.hasRequiredBinding &&
            (element as any).type?.[0]?.code === "code"
              ? (element as any).binding?.valueSet?.split("|")?.[0]
              : undefined,
          ),
        )
        .filter(Boolean),
    );

    return [...this.valueSetsByUrl.values()]
      .filter((valueSet) =>
        requiredBindingsValueSetUrls.has((valueSet as any).url),
      )
      .sort((a: any, b: any) => a.name.localeCompare(b.name));
  }

  public get operationDefinitionsWithResourceVariants(): OperationDefinition[] {
    return this.operationDefinitions.flatMap((x: any) =>
      x.resource.length === 1
        ? x
        : x.resource.map((resource: any) =>
            Object.assign(new OperationDefinition(this), {
              ...x,
              id: `${resource}-${x.id}`,
              resource: [resource],
            }),
          ),
    );
  }
}

/**
 * http://hl7.org/fhir/structuredefinition.html
 */
export class StructureDefinition {
  constructor(private _definitions: FhirDefinitions) {}

  /**
   * The base structure definition this "derives" from
   */
  public get base(): StructureDefinition | undefined {
    return this._definitions.structureDefinitionsByUrl.get(
      (this as any).baseDefinition,
    );
  }

  /**
   * True if this is a resource
   */
  public get isResource(): boolean {
    return (this as any).kind === "resource";
  }

  /**
   * True if this is a domain resource
   */
  public get isDomainResource(): boolean {
    return (
      (this.base as any)?.name === "DomainResource" ||
      this.base?.isDomainResource ||
      false
    );
  }

  /**
   * True if this is a resource
   */
  public get isPrimitiveType(): boolean {
    return (this as any).kind === "primitive-type";
  }

  /**
   * True if this is a resource
   */
  public get isComplexType(): boolean {
    return (this as any).kind === "complex-type";
  }

  /**
   * All the element definitions of this structure definition
   */
  public get elements(): ElementDefinition[] {
    return (
      ((this as any).snapshot?.element || [])
        .map((x: any) =>
          Object.assign(new ElementDefinition(this._definitions, this), x),
        )
        //.filter((x: any) => !!x.type?.length)
        .sort((a: any, b: any) => a.path.localeCompare(b.path))
    );
  }

  /**
   * Only the element definitions that starts with this structure definition's name
   */
  public get ownElements(): ElementDefinition[] {
    return this.elements.filter((x: any) =>
      x.base.path.startsWith((this as any).name + "."),
    );
  }

  /**
   * Only the elements that are root elements - e.g. not nested in another backbone element
   */
  public get ownRootElements(): ElementDefinition[] {
    return this.ownElements.filter((x) => x.isRoot);
  }

  /**
   * Only the elements that are root elements with the data type choice variants expanded.
   */
  public get ownRootElementsWithChoices(): ElementDefinition[] {
    return this.ownRootElements.flatMap((x) =>
      x.hasDataTypeChoiceVariants ? x.dataTypeChoiceVariants : x,
    );
  }

  public get allRootElementsWithChoices(): ElementDefinition[] {
    return [
      ...(this.base?.ownRootElementsWithChoices || []),
      ...this.ownRootElementsWithChoices,
    ];
  }

  public get ownSearchParameters(): SearchParameter[] {
    return (
      this._definitions.searchParametersByResourceType.get(
        (this as any).type,
      ) || []
    );
  }

  public get allSearchParameters(): SearchParameter[] {
    return [
      ...(this.base?.allSearchParameters || []),
      ...this.ownSearchParameters,
    ].filter(
      (x, i, self) =>
        i === self.findIndex((y) => (x as any).code === (y as any).code),
    );
  }

  /**
   * URL to the official FHIR documentation for this structure definition
   */
  public get fhirDocUrl(): string {
    return `http://hl7.org/fhir/${this._definitions.release.toUpperCase()}/${
      (this as any).id
    }.html`;
  }

  /**
   * Base URL to the official FHIR documentation for definitions (e.g. elements)
   */
  public get fhirDocDefinitionsUrl(): string {
    return `http://hl7.org/fhir/${this._definitions.release.toUpperCase()}/${
      (this as any).id
    }-definitions.html`;
  }

  /**
   * A JSDoc comment for this structure definition
   */
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

  /**
   * Nested backbone elements inside this structure definition, regardless of nesting level
   */
  public get backboneElements(): BackboneElement[] {
    return this.ownElements
      .filter((x) => x.backboneElementName)
      .map((x) => new BackboneElement(this, x));
  }
}

/**
 * http://hl7.org/fhir/elementdefinition.html
 */
export class ElementDefinition {
  constructor(
    private _definitions: FhirDefinitions,
    private _structureDefinition: StructureDefinition,
  ) {}

  /**
   * The name of this element
   */
  public get name(): string {
    return (this as any).id.split(".").pop() || "";
  }

  /** The title to use in summary generation. */
  public get summaryTitle(): string {
    return this.name[0]?.toUpperCase() + this.name.slice(1);
  }

  /**
   * True if this is an array (e.g. max = "*")
   */
  public get isArray(): boolean {
    return (this as any).max === "*";
  }

  /**
   * True if this is optional (e.g. min = 0)
   */
  public get isOptional(): boolean {
    return (this as any).min === 0;
  }

  /**
   * If this element is a BackboneElement, return the name of the BackboneElement.
   * Otherwise, return undefined.
   */
  public get backboneElementName(): string | undefined {
    if ((this as any).type?.[0]?.code !== "BackboneElement") {
      return undefined;
    }

    return (this as any).path
      .split(".")
      .map((x: any) => x[0].toUpperCase() + x.slice(1))
      .join("");
  }

  /**
   * https://hl7.org/fhir/formats.html#choice
   */
  public get hasDataTypeChoiceVariants(): boolean {
    return (this as any).path.endsWith("[x]");
  }

  /**
   * If this element has data type choice variants, return all the variants.
   */
  public get dataTypeChoiceVariants(): ElementDefinition[] {
    if (!this.hasDataTypeChoiceVariants) {
      return [];
    }

    return (this as any).type.map((t: any) => {
      const suffix = t.code[0].toUpperCase() + t.code.slice(1);
      return Object.assign(
        new ElementDefinition(this._definitions, this._structureDefinition),
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
        },
      );
    });
  }

  public get isPrimitiveType(): boolean {
    return (this as any).type?.some((t: any) =>
      PRIMITIVE_TYPES.includes(t.code),
    );
  }

  /**
   * The TypeScript type for this element
   */
  public get tsType(): string {
    if ((this as any).contentReference) {
      let resolvedReference = (this as any).contentReference
        .slice(1)
        .split(".")
        .map((x: string) => x[0]?.toUpperCase() + x.slice(1))
        .join("");

      if (this.isArray) {
        resolvedReference = `Array<${resolvedReference}>`;
      }

      if (this.isOptional) {
        resolvedReference = `${resolvedReference} | undefined`;
      }

      return resolvedReference;
    }

    let resolvedType = (this as any).type
      ?.map((x: any) => {
        const tsType = toTsType(x.code);
        if (tsType === "Reference") {
          const targetTypes = targetProfileToTsTypes(x.targetProfile);
          if (targetTypes) {
            return `Reference<${targetTypes}>`;
          }
        }

        if (
          (this._structureDefinition as any).type === "Bundle" &&
          this.name === "resource" &&
          tsType === "Resource"
        ) {
          return "TTargetResource";
        }

        return tsType;
      })
      .join(" | ");

    if (this.hasRequiredBinding && resolvedType === "string") {
      resolvedType = this._definitions.valueSetsByUrl.get(
        (this as any).binding.valueSet.split("|")[0],
      )?.safeName;
    }

    if (this.backboneElementName) {
      resolvedType = this.backboneElementName;
      if (
        (this._structureDefinition as any).type === "Bundle" &&
        this.name === "entry" &&
        resolvedType === "BundleEntry"
      ) {
        resolvedType = "BundleEntry<TTargetResource>";
      }
    }

    if (this.isArray) {
      resolvedType = `Array<${resolvedType}>`;
    }

    if (this.isOptional) {
      resolvedType = `${resolvedType} | undefined`;
    }
    return resolvedType;
  }

  /**
   * URL to the official FHIR documentation for this element
   */
  public get fhirDocUrl(): string {
    return this._structureDefinition.isResource
      ? `${this._structureDefinition.fhirDocDefinitionsUrl}#${(this as any).id}`
      : "";
  }

  /**
   * A JSDoc comment for this element
   */
  public get jsDoc(): string {
    return toJsComment(
      [
        ...splitLongLines(
          [(this as any).definition, (this as any).comment].filter(
            (x) => !!x?.trim(),
          ),
        ),
        this.fhirDocUrl ? `@see {@link ${this.fhirDocUrl}}` : undefined,
        this.hasRequiredBinding && (this as any).type?.[0]?.code === "code"
          ? `@see {@link ${this._definitions.valueSetsByUrl.get(
              (this as any).binding.valueSet.split("|")[0],
            )?.safeName}}`
          : undefined,
        this.isPrimitiveType
          ? `@fhirType ${(this as any).type
              .map((x: any) => x.code)
              .join(" | ")}`
          : undefined,
      ].filter(Boolean) as string[],
    );
  }

  /**
   * True if this element is at the root of StructureDefinition
   */
  public get isRoot(): boolean {
    return (this as any).path.split(".").length === 2;
  }

  /**
   * True if this element is linked to a ValueSet and has a binding strength of "required"
   */
  public get hasRequiredBinding(): boolean {
    return (this as any).binding?.strength === "required";
  }
}

/**
 * http://hl7.org/fhir/valueset.html
 */
export class ValueSet {
  constructor(private _definitions: FhirDefinitions) {}

  /**
   * A JSDoc comment for this value set
   */
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
            (x: any) => `- ${x.code}: ${x.display}`,
          )
        : []),
    ]);
  }

  /**
   * The name of this value set, but will make sure to avoid conflicts with other names
   * for StructureDefinitions and other value sets.
   */
  public get safeName(): string {
    const name = (this as any).name.replaceAll(/[^\dA-Za-z]/g, "");
    // We avoid conflicts with structure definitions by appending "ValueSet" to the name
    if (
      this._definitions.structureDefinitions.some(
        (x) => (x as any).name === name,
      )
    ) {
      return `${name}ValueSet`;
    }

    // We avoid conflicts with other value sets by using the title as the name in that case.
    if (
      this._definitions.valueSets.some(
        (x) => (x as any).name === name && (x as any).id !== (this as any).id,
      )
    ) {
      return (this as any).title.replaceAll(/[^\dA-Za-z]/g, "");
    }
    return name;
  }
}

/**
 * http://hl7.org/fhir/types.html#BackBoneElement
 */
export class BackboneElement {
  constructor(
    private _parent: StructureDefinition,
    public rootElement: ElementDefinition,
  ) {}

  /**
   * Only the element definitions that starts with this backbone element's name
   */
  public get ownElements(): ElementDefinition[] {
    return this._parent.elements.filter((x: any) =>
      x.path.startsWith((this.rootElement as any).path + "."),
    );
  }

  /**
   * Only the elements that are root elements - e.g. not nested in another backbone element
   */
  public get ownRootElements(): ElementDefinition[] {
    return this.ownElements.filter(
      (x) =>
        (x as any).path.split(".").length ===
        (this.rootElement as any).path.split(".").length + 1,
    );
  }

  /**
   * Only the elements that are root elements with the data type choice variants expanded.
   */
  public get ownRootElementsWithChoices(): ElementDefinition[] {
    return this.ownRootElements.flatMap((x) =>
      x.hasDataTypeChoiceVariants ? x.dataTypeChoiceVariants : x,
    );
  }
}

export class SearchParameter {
  public get safeName(): string {
    return (this as any).name
      .split(/[\s-]/g)
      .map((word: string, index: number) => {
        return (
          (index === 0
            ? word.charAt(0).toLowerCase()
            : word.charAt(0).toUpperCase()) + word.slice(1)
        );
      })
      .join("");
  }

  /**
   * A JSDoc comment for this search parameters
   */
  public get jsDoc(): string {
    return toJsComment(
      [
        ...splitLongLines([(this as any).description]),
        `@fhirSearchType \`${(this as any).type}\``,
        (this as any).expression
          ? `@fhirPath \`${(this as any).expression}\``
          : undefined,
      ].filter(Boolean) as string[],
    );
  }
}

export class OperationDefinition {
  constructor(private _definitions: FhirDefinitions) {}

  public get safeName(): string {
    return (this as any).id
      .split(/[\s-]/g)
      .map((word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join("");
  }

  /**
   * A JSDoc comment for this operation definition
   */
  public get jsDoc(): string {
    return toJsComment([
      (this as any).title,
      "",
      ...splitLongLines([(this as any).description]),
      (this as any).url ? `@see {@link ${(this as any).url}}` : undefined,
    ]);
  }

  public get inParameters(): OperationParameter[] {
    return ((this as any).parameter || [])
      .filter((x: any) => x.use === "in")
      .map((x: any) => Object.assign(new OperationParameter(this), x));
  }

  public get outParameters(): OperationParameter[] {
    return ((this as any).parameter || [])
      .filter((x: any) => x.use === "out")
      .map((x: any) => Object.assign(new OperationParameter(this), x));
  }

  public get firstResource(): StructureDefinition | undefined {
    const resource = (this as any).resource?.[0];
    if (!resource) {
      return;
    }

    return this._definitions.structureDefinitions.find(
      (x: any) => x.type === resource,
    );
  }

  public get allParts(): OperationParameter[] {
    return [
      ...new Set(
        [...this.inParameters, ...this.outParameters]
          .filter((x) => x.partName)
          .flatMap((x) => [x, ...x.allParts]),
      ),
    ];
  }
}

export class OperationParameter {
  constructor(public _parent: OperationDefinition | OperationParameter) {}

  /**
   * True if this is an array (e.g. max = "*")
   */
  public get isArray(): boolean {
    return (this as any).max === "*";
  }

  /**
   * True if this is optional (e.g. min = 0)
   */
  public get isOptional(): boolean {
    return (this as any).min === 0;
  }

  /**
   * If this element is an OperationParameter part, return the name of the OperationParameterPart.
   * Otherwise, return undefined.
   */
  public get partName(): string | undefined {
    if (!(this as any).part?.length) {
      return undefined;
    }

    return `${
      (this._parent as OperationParameter).partName ||
      (this._parent as OperationDefinition).safeName + "Operation"
    }${(this as any).name[0].toUpperCase()}${(this as any).name.slice(1)}`;
  }

  public get parameters(): OperationParameter[] {
    if ((this as any).part.length === 0) return [];

    return (this as any).part.map((x: any) =>
      Object.assign(new OperationParameter(this), x),
    );
  }

  public get allParts(): OperationParameter[] {
    if ((this as any).part.length === 0) return [];

    return this.parameters
      .filter((x) => x.partName)
      .flatMap((x) => [x, ...x.allParts]);
  }

  /**
   * The TypeScript type for this element
   */
  public get tsType(): string {
    let resolvedType = toTsType((this as any).type);

    if (resolvedType === "Any") {
      resolvedType = "any";
    }

    if (this.partName) {
      resolvedType = this.partName;
    }

    if (this.isArray) {
      resolvedType = `Array<${resolvedType}>`;
    }

    if (this.isOptional) {
      resolvedType = `${resolvedType} | undefined`;
    }
    return resolvedType;
  }

  public get isPrimitiveType(): boolean {
    return PRIMITIVE_TYPES.includes((this as any).type);
  }

  /**
   * A JSDoc comment for this element
   */
  public get jsDoc(): string {
    return toJsComment(
      [
        ...splitLongLines(
          [(this as any).documentation].filter((x) => !!x?.trim()),
        ),
        this.isPrimitiveType ? `@fhirType ${(this as any).type}` : undefined,
      ].filter(Boolean) as string[],
    );
  }
}

export const PRIMITIVE_TYPES = [
  "base64Binary",
  "boolean",
  "canonical",
  "code",
  "date",
  "dateTime",
  "decimal",
  "http://hl7.org/fhirpath/System.String",
  "id",
  "instant",
  "integer",
  "integer64",
  "markdown",
  "oid",
  "string",
  "positiveInt",
  "time",
  "unsignedInt",
  "uri",
  "url",
  "uuid",
  "xhtml",
];
