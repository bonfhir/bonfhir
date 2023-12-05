/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  AnyResourceType,
  Coding,
  Extension,
  ExtractResource,
  Meta,
  Resource,
} from "./fhir-types.codegen";
import { narrative } from "./narratives.codegen";

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
  TExtensions,
>(
  resourceType: TResourceType,
  extensions: TExtensions &
    ThisType<ExtractResource<TResourceType> & TExtensions>,
): {
  resourceType: typeof resourceType;
  new (
    data?: Omit<ExtractResource<TResourceType>, "resourceType">,
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
            `Unable to assign custom resource class for a ${resourceType} to a resource data for resource type ${data.resourceType}`,
          );
        }
        const dataWithoutSpecialExtensions = Object.entries(data)
          .filter(([key]) => !specialExtensions[key])
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as any);
        Object.assign(this, dataWithoutSpecialExtensions);
        for (const [key, value] of Object.entries(data).filter(
          ([key]) => specialExtensions[key],
        )) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          specialExtensions[key]!.__set(this, value);
        }
      }

      return new Proxy(this, {
        ownKeys(target) {
          return [
            ...Reflect.ownKeys(target),
            ...Object.keys(specialExtensions),
          ];
        },
        getOwnPropertyDescriptor(target, prop) {
          const specialExtension =
            prop.toString() !== "constructor" &&
            specialExtensions[prop.toString()];
          return specialExtension
            ? {
                configurable: true,
                enumerable: true,
                writable: true,
              }
            : Reflect.getOwnPropertyDescriptor(target, prop);
        },
        get(target, prop, receiver) {
          const specialExtension =
            prop.toString() !== "constructor" &&
            specialExtensions[prop.toString()];
          return specialExtension
            ? specialExtension.__get(target)
            : Reflect.get(target, prop, receiver);
        },
        set(target, prop, value, receiver) {
          const specialExtension =
            prop.toString() !== "constructor" &&
            specialExtensions[prop.toString()];
          if (specialExtension) {
            specialExtension.__set(target, value);
            return true;
          }
          return Reflect.set(target, prop, value, receiver);
        },
      });
    }

    toJSON(): this {
      (this as any).text = narrative(this as any);
      return Object.entries(this)
        .filter(([key]) => !specialExtensions[key])
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as any);
    }
  } as any;

  return result;
}

export function extension<TExtensionType extends keyof AnyExtensionType>(
  extension: ExtensionHelperArgs<TExtensionType>,
): AnyExtensionType[TExtensionType] | undefined;
export function extension<TExtensionType extends keyof AnyExtensionType>(
  extension: ExtensionHelperArgs<TExtensionType> & { allowMultiple: true },
): Array<NonNullable<AnyExtensionType[TExtensionType]>>;
export function extension<TExtensionType extends keyof AnyExtensionType>(
  extension: ExtensionHelperArgs<TExtensionType> & { allowMultiple?: boolean },
):
  | AnyExtensionType[TExtensionType]
  | Array<NonNullable<AnyExtensionType[TExtensionType]>>
  | undefined {
  return {
    ...extension,
    __isSpecialExtension: true,
    __get(target: HasExtension) {
      const extensionValues = (target.extension || []).filter(
        (x) => x.url === extension.url,
      );

      if (extension.allowMultiple) {
        return extensionValues
          .map((ext) => ext?.[extension.kind])
          .filter(Boolean) as any;
      }

      return extensionValues?.[0]?.[extension.kind];
    },
    __set(
      target: HasExtension,
      value:
        | AnyExtensionType[TExtensionType]
        | Array<AnyExtensionType[TExtensionType]>,
    ) {
      if (extension.allowMultiple) {
        target.extension = [
          ...(target.extension?.filter((x) => x.url !== extension.url) || []),
          ...((value as Array<AnyExtensionType[TExtensionType]>) || []).map(
            (newValue: any) => ({
              url: extension.url,
              [extension.kind]: newValue,
            }),
          ),
        ];

        if (target.extension.length === 0) {
          target.extension = undefined;
        }

        return value as any;
      }

      const extensionValue = (target.extension || []).find(
        (x) => x.url === extension.url,
      );

      if (value == undefined || (typeof value === "string" && !value)) {
        // Delete the extension.
        if (extensionValue) {
          target.extension = target.extension?.filter(
            (x) => x.url !== extension.url,
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

export function tag(tag: { system: string }): Coding | undefined {
  return {
    ...tag,
    __isSpecialExtension: true,
    __get(target: HasMeta) {
      return (target.meta?.tag || []).find((x) => x.system === tag.system);
    },
    __set(target: HasMeta, value: Omit<Coding, "system"> | null | undefined) {
      const tagValue = (target.meta?.tag || []).find(
        (x) => x.system === tag.system,
      );

      if (value == undefined) {
        if (!target.meta) {
          return;
        }

        // this is the setter to delete the tag.
        if (tagValue) {
          target.meta.tag = target.meta.tag?.filter(
            (x) => x.system !== tag.system,
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

export interface ExtensionHelperArgs<
  TExtensionType extends keyof AnyExtensionType,
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

export type AnyResourceTypeOrCustomResource =
  | AnyResourceType
  | CustomResourceClass;

export type ResourceOf<T extends AnyResourceTypeOrCustomResource> =
  T extends AnyResourceType
    ? ExtractResource<T>
    : T extends CustomResourceClass
      ? InstanceType<T>
      : never;

export type ResourceTypeOf<T extends AnyResourceTypeOrCustomResource> =
  T extends AnyResourceType
    ? T
    : T extends CustomResourceClass
      ? T["resourceType"]
      : never;

export function resourceTypeOf<T extends AnyResourceTypeOrCustomResource>(
  value: T,
): ResourceTypeOf<T>;
export function resourceTypeOf(value: null | undefined): undefined;
export function resourceTypeOf<T extends AnyResourceTypeOrCustomResource>(
  value: T | null | undefined,
): ResourceTypeOf<T> | undefined;
export function resourceTypeOf<T extends AnyResourceTypeOrCustomResource>(
  value: T | null | undefined,
): ResourceTypeOf<T> | undefined {
  if (!value) {
    return;
  }
  return typeof value === "string" ? value : (value.resourceType as any);
}

export function cloneResource<T>(value: T): T;
export function cloneResource(value: null | undefined): undefined;
export function cloneResource<T>(value: T | null | undefined): T | undefined;
export function cloneResource<T>(value: T | null | undefined): T | undefined {
  if (!value) {
    return;
  }

  return new (value as any).constructor(JSON.parse(JSON.stringify(value)));
}
