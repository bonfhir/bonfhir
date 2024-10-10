/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  AnyResourceType,
  Coding,
  Extension,
  ExtractResource,
  Meta,
  Resource,
} from "@bonfhir/fhirtypes/r5";
import { asArray } from "./lang-utils";
import { narrative } from "./narratives.codegen";

/**
 * Type definition for a Custom Resource *Class*
 */
export type CustomResourceClass<TResource extends Resource = Resource> = {
  resourceType: TResource["resourceType"];
} & {
  new (json?: any): TResource;
};

export interface ExtendResourceOptions<TResource extends Resource = Resource> {
  /** The FHIR profile(s) to apply to the final FHIR resource */
  profile?: string | string[] | undefined;

  /**
   * Called after the extension normalization to FHIR, but before the value is returned.
   *
   * This is useful for setting values programmatically.
   */
  onFhirResource?: (resource: TResource) => TResource;
}

export interface ToFhirResource<TResource extends Resource = Resource> {
  /**
   * Return the plain, "original" FHIR resource representation - without the custom properties.
   */
  toFhirResource(): TResource;
}

export function extendResource<
  TResourceType extends AnyResourceType,
  TExtensions,
>(
  resourceType: TResourceType,
  extensions: TExtensions &
    ThisType<
      ExtractResource<TResourceType> &
        TExtensions &
        ToFhirResource<ExtractResource<TResourceType>>
    >,
  options?: ExtendResourceOptions<ExtractResource<TResourceType>> | undefined,
): {
  resourceType: typeof resourceType;
  new (
    data?: Omit<ExtractResource<TResourceType>, "resourceType">,
  ): ExtractResource<TResourceType> &
    TExtensions &
    ToFhirResource<ExtractResource<TResourceType>>;
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

  function ExtendedResource(this: any, data?: any) {
    if (!(this instanceof ExtendedResource)) {
      return new (ExtendedResource as any)(data);
    }

    Object.assign(this, {
      resourceType,
      ...extensionsWithoutSpecialExtensions,
    });

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
        specialExtensions[key]!.__set(this, value);
      }
    }

    // Add getters and setters for special extensions
    for (const [key, specialExtension] of Object.entries(specialExtensions)) {
      Object.defineProperty(this, key, {
        get: () => specialExtension.__get(this),
        set: (value) => specialExtension.__set(this, value),
        enumerable: true,
        configurable: true,
      });
    }
  }

  ExtendedResource.prototype.toFhirResource =
    function (): ExtractResource<TResourceType> {
      (this as any).text = narrative(this as any);

      if (options?.profile) {
        (this as any).meta = {
          ...(this as any).meta,
          profile: asArray(options.profile),
        };
      }

      const value = Object.entries(this)
        .filter(
          ([key, value]) =>
            !specialExtensions[key] && typeof value !== "function",
        )
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as any);

      if (options?.onFhirResource) {
        return options.onFhirResource(value);
      }

      return value;
    };

  ExtendedResource.prototype.toJSON = function () {
    return this.toFhirResource();
  };

  ExtendedResource.resourceType = resourceType;

  return ExtendedResource as any;
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

  // Create a new object with the same prototype
  const clone = Object.create(Object.getPrototypeOf(value));

  // Use Object.assign to do a deep copy properties
  return Object.assign(clone, value);
}
