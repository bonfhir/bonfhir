/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  AnyResourceType,
  Coding,
  Extension,
  ExtractResource,
  Meta,
  Resource,
} from "./fhir-types.codegen.js";
import { narrative } from "./narratives.codegen.js";

/**
 * Type definition for a Custom Resource *Class*
 */
export type CustomResourceClass<TResource extends Resource = Resource> = {
  resourceType: TResource["resourceType"];
} & {
  new (json?: any): TResource;
};

export function extendResource<
  TResourceType extends AnyResourceType,
  TExtensions
>(
  resourceType: TResourceType,
  extensions: TExtensions &
    ThisType<ExtractResource<TResourceType> & TExtensions>
): {
  resourceType: typeof resourceType;
  new (
    json?: Omit<ExtractResource<TResourceType>, "resourceType">
  ): ExtractResource<TResourceType> & TExtensions;
} {
  const result = class {
    static readonly resourceType = resourceType;
    constructor(data?: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any).resourceType = resourceType;
      Object.assign(this, extensions);
      if (data) {
        if (data.resourceType && data.resourceType !== resourceType) {
          throw new Error(
            `Unable to assign custom resource class for a ${resourceType} to a resource data for resource type ${data.resourceType}`
          );
        }
        Object.assign(this, data);
      }
    }

    toJSON(): this {
      (this as any).text = narrative(this as any);
      return this;
    }
  } as any;

  return result;
}

export function getSetExtension<TExtensionType extends keyof AnyExtensionType>(
  resource: HasExtension,
  extension: ExtensionHelperManageExtensionArgs<TExtensionType>,
  value?: AnyExtensionType[TExtensionType] | null | undefined
): AnyExtensionType[TExtensionType] | undefined {
  const extensionValue = (resource.extension || []).find(
    (x) => x.url === extension.url
  );

  if (value === undefined) {
    return extensionValue?.[extension.kind];
  }

  if (value === null) {
    // this is the setter to delete the extension.
    if (extensionValue) {
      resource.extension = resource.extension?.filter(
        (x) => x.url !== extension.url
      );

      if (resource.extension?.length === 0) {
        resource.extension = undefined;
      }
    }
    return undefined;
  }

  const newExtensionValue = {
    url: extension.url,
    [extension.kind]: value,
  };

  resource.extension = [
    ...(resource.extension?.filter((x) => x.url !== extension.url) || []),
    newExtensionValue,
  ];

  return value;
}

export function getSetManyExtension<
  TExtensionType extends keyof AnyExtensionType
>(
  resource: HasExtension,
  extension: ExtensionHelperManageExtensionArgs<TExtensionType>,
  value?:
    | Array<AnyExtensionType[TExtensionType]>
    | Array<NonNullable<AnyExtensionType[TExtensionType]>>
    | ((
        current: Array<NonNullable<AnyExtensionType[TExtensionType]>>
      ) => Array<AnyExtensionType[TExtensionType]>)
    | null
    | undefined
): Array<NonNullable<AnyExtensionType[TExtensionType]>> {
  const extensionValues = (resource.extension || []).filter(
    (x) => x.url === extension.url
  );

  if (value === undefined) {
    return extensionValues
      .map((ext) => ext?.[extension.kind])
      .filter(Boolean) as any;
  }

  const newValues =
    typeof value === "function"
      ? value(
          extensionValues.map((ext) => ext?.[extension.kind]) as any
        ).filter(Boolean)
      : value || [];
  resource.extension = [
    ...(resource.extension?.filter((x) => x.url !== extension.url) || []),
    ...newValues.map((newValue: any) => ({
      url: extension.url,
      [extension.kind]: newValue,
    })),
  ];

  if (resource.extension.length === 0) {
    resource.extension = undefined;
  }

  return newValues as any;
}

export interface ExtensionHelperManageExtensionArgs<
  TExtensionType extends keyof AnyExtensionType
> {
  url: string;
  kind: TExtensionType;
}

export type AnyExtensionType = ExtensionDataTypes<Extension>;

export type ExtensionDataTypes<T = Extension> = {
  [K in keyof T as K extends `value${infer _U}` ? K : never]: T[K];
};

export type HasExtension = { extension?: Array<Extension> | undefined };

export function getSetTag(
  resource: HasMeta,
  args: { system: string },
  value?: Omit<Coding, "system"> | null | undefined
): Coding | undefined {
  const tagValue = (resource.meta?.tag || []).find(
    (x) => x.system === args.system
  );

  if (value === undefined) {
    return tagValue;
  }

  if (value === null) {
    if (!resource.meta) {
      return undefined;
    }

    // this is the setter to delete the tag.
    if (tagValue) {
      resource.meta.tag = resource.meta.tag?.filter(
        (x) => x.system !== args.system
      );

      if (resource.meta.tag?.length === 0) {
        resource.meta.tag = undefined;
      }
      if (JSON.stringify(resource.meta) === "{}") {
        resource.meta = undefined;
      }
    }
    return undefined;
  }

  const newTagValue = {
    ...tagValue,
    ...value,
    system: args.system,
  };

  if (!resource.meta) {
    resource.meta = {};
  }

  resource.meta.tag = [
    ...(resource.meta.tag || []).filter((x) => x.system !== args.system),
    newTagValue,
  ];

  return newTagValue;
}

export type HasMeta = { meta?: Meta | undefined };
