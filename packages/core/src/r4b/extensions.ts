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
  const specialExtensions: Record<string, SpecialExtension> = {};
  const extensionsWithoutSpecialExtensions = {} as any;
  for (const [key, value] of Object.entries(extensions)) {
    if (isSpecialExtension(value)) {
      specialExtensions[key] = value;
    } else {
      extensionsWithoutSpecialExtensions[key] = value;
    }
  }

  const result = class {
    static readonly resourceType = resourceType;
    constructor(data?: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any).resourceType = resourceType;
      Object.assign(this, extensionsWithoutSpecialExtensions);
      if (data) {
        if (data.resourceType && data.resourceType !== resourceType) {
          throw new Error(
            `Unable to assign custom resource class for a ${resourceType} to a resource data for resource type ${data.resourceType}`
          );
        }
        Object.assign(this, data);
      }

      return new Proxy(this, {
        get(target, prop) {
          const specialExtension =
            prop.toString() !== "constructor" &&
            specialExtensions[prop.toString()];
          return specialExtension
            ? specialExtension.__get(target)
            : Reflect.get(target, prop);
        },
        set(target, prop, value) {
          const specialExtension =
            prop.toString() !== "constructor" &&
            specialExtensions[prop.toString()];
          return specialExtension
            ? specialExtension.__set(target, value)
            : Reflect.set(target, prop, value);
        },
      });
    }

    toJSON(): this {
      (this as any).text = narrative(this as any);
      return this;
    }
  } as any;

  return result;
}

export function extension<TExtensionType extends keyof AnyExtensionType>(
  extension: ExtensionHelperManageExtensionArgs<TExtensionType>
): AnyExtensionType[TExtensionType] | undefined {
  return {
    ...extension,
    __isSpecialExtension: true,
    __get(target: HasExtension) {
      const extensionValue = (target.extension || []).find(
        (x) => x.url === extension.url
      );

      return extensionValue?.[extension.kind];
    },
    __set(target: HasExtension, value: AnyExtensionType[TExtensionType]) {
      const extensionValue = (target.extension || []).find(
        (x) => x.url === extension.url
      );

      if (value == undefined || (typeof value === "string" && !value)) {
        // Delete the extension.
        if (extensionValue) {
          target.extension = target.extension?.filter(
            (x) => x.url !== extension.url
          );

          if (target.extension?.length === 0) {
            target.extension = undefined;
          }
        }
        return;
      }

      const newExtensionValue = {
        url: extension.url,
        [extension.kind]: value,
      };

      target.extension = [
        ...(target.extension?.filter((x) => x.url !== extension.url) || []),
        newExtensionValue,
      ];

      return value;
    },
  } as any;
}

export function extensionMany<TExtensionType extends keyof AnyExtensionType>(
  extension: ExtensionHelperManageExtensionArgs<TExtensionType>
): Array<NonNullable<AnyExtensionType[TExtensionType]>> {
  return {
    ...extension,
    __isSpecialExtension: true,
    __get(target: HasExtension) {
      const extensionValues = (target.extension || []).filter(
        (x) => x.url === extension.url
      );

      return extensionValues
        .map((ext) => ext?.[extension.kind])
        .filter(Boolean) as any;
    },
    __set(
      target: HasExtension,
      value: Array<AnyExtensionType[TExtensionType]> | null | undefined
    ) {
      target.extension = [
        ...(target.extension?.filter((x) => x.url !== extension.url) || []),
        ...(value || []).map((newValue: any) => ({
          url: extension.url,
          [extension.kind]: newValue,
        })),
      ];

      if (target.extension.length === 0) {
        target.extension = undefined;
      }

      return value as any;
    },
  } as any;
}

export function tag(tag: { system: string }): Coding | undefined {
  return {
    ...tag,
    __isSpecialExtension: true,
    __get(target: HasMeta) {
      return (target.meta?.tag || []).find((x) => x.system === tag.system);
    },
    __set(target: HasMeta, value: Omit<Coding, "system"> | null | undefined) {
      const tagValue = (target.meta?.tag || []).find(
        (x) => x.system === tag.system
      );

      if (value == undefined) {
        if (!target.meta) {
          return;
        }

        // this is the setter to delete the tag.
        if (tagValue) {
          target.meta.tag = target.meta.tag?.filter(
            (x) => x.system !== tag.system
          );

          if (target.meta.tag?.length === 0) {
            target.meta.tag = undefined;
          }
          if (JSON.stringify(target.meta) === "{}") {
            target.meta = undefined;
          }
        }
        return;
      }

      const newTagValue = {
        ...tagValue,
        ...value,
        system: tag.system,
      };

      if (!target.meta) {
        target.meta = {};
      }

      target.meta.tag = [
        ...(target.meta.tag || []).filter((x) => x.system !== tag.system),
        newTagValue,
      ];

      return newTagValue;
    },
  } as any;
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

export type HasMeta = { meta?: Meta | undefined };

export interface SpecialExtension {
  __isSpecialExtension: true;
  __get(target: any): any;
  __set(target: any, value: any): any;
}

export function isSpecialExtension(value: any): value is SpecialExtension {
  return value?.__isSpecialExtension;
}
