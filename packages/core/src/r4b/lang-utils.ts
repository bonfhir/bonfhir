/**
 * This module is used to provide a set of utility functions for typescript
 */
import {
  AnyResourceType,
  DomainResource,
  ExtractResource,
  QuestionnaireItem,
  QuestionnaireResponseItem,
  Reference,
  Resource,
  isResource,
} from "@bonfhir/fhirtypes/r4b";
import { ResolvableReference } from ".";
import { isReferenceOf } from "./builders";

/**
 * Returns the given `value` as is if it satisfies `Array.isArray` or otherwise
 * wraps the given `value` in an array.
 */
export function asArray<T>(
  value: T,
): T extends ReadonlyArray<unknown> ? T : [T] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Array.isArray(value) ? (value as any) : [value];
}

/**
 * Return the given value as an Error if it's not already one.
 */
export function asError(value: unknown): Error {
  return value instanceof Error ? value : new Error(String(value));
}

export interface TruncateOptions {
  /** The maximum string length. Defaults to 30. */
  length?: number | null | undefined;

  /** The string to indicate text is omitted. Defaults to "..." */
  suffix?: string | null | undefined;

  /** The separator pattern to truncate to. Defaults to null. */
  separator?: RegExp | string | null | undefined;
}

/**
 * Filter values by removing duplicates entries by an iteratee function.
 */
export function uniqBy<T>(
  values: ReadonlyArray<T>,
  iteratee: (value: T) => unknown,
): T[] {
  return values.filter(
    (x, i, self) => i === self.findIndex((y) => iteratee(x) === iteratee(y)),
  );
}

/**
 * Truncate a string to a given length and append an optional suffix.
 */
export function truncate(
  value: null | undefined,
  options?: TruncateOptions | null | undefined,
): undefined;
export function truncate(
  value: string,
  options?: TruncateOptions | null | undefined,
): string;
export function truncate(
  value: string | null | undefined,
  options?: TruncateOptions | null | undefined,
): string | undefined;
export function truncate(
  value: string | null | undefined,
  options?: TruncateOptions | null | undefined,
): string | undefined {
  if (value == undefined) {
    return undefined;
  }

  const length = options?.length ?? 30;
  const suffix = options?.suffix ?? "...";

  if (value.length <= length) {
    return value;
  }

  if (options?.separator) {
    const stringBeforeTruncation = value.slice(0, Math.max(0, length));
    const stringAfterTruncation = value.slice(length);
    const separatorIndex =
      typeof options.separator === "string"
        ? stringAfterTruncation.indexOf(options.separator, length)
        : stringAfterTruncation.search(options.separator);

    if (separatorIndex !== -1 && separatorIndex <= length) {
      return (
        stringBeforeTruncation +
        stringAfterTruncation.slice(0, Math.max(0, separatorIndex)) +
        (suffix || "")
      );
    }
  }

  return value.slice(0, Math.max(0, length)) + (suffix || "");
}

/**
 * @see https://momentjs.com/docs/#/displaying/fromnow/
 * @see https://momentjs.com/docs/#/displaying/tonow/
 */
export function formatRelativeDateTime(
  locale: string | undefined,
  value: Date,
  relativeTo: string | number | Date | null | undefined,
  relativeStyle: "long" | "short" | null | undefined,
  dateOnlyMode = false,
) {
  const relativeToDate = relativeTo ? new Date(relativeTo) : new Date();
  const relative = new Intl.RelativeTimeFormat(locale || undefined, {
    style: relativeStyle ?? undefined,
    numeric: "auto",
  });

  if (
    dateOnlyMode &&
    value.getUTCFullYear() === relativeToDate.getUTCFullYear() &&
    value.getUTCMonth() === relativeToDate.getUTCMonth() &&
    value.getUTCDate() === relativeToDate.getUTCDate()
  ) {
    return relative.format(0, "day");
  }

  const diffSec = Math.floor(
    (relativeToDate.getTime() - value.getTime()) / 1000,
  );

  // from now
  if (diffSec >= 0) {
    if (diffSec < 44) {
      return relative.format(-diffSec, "seconds");
    } else if (diffSec < 89) {
      return relative.format(-1, "minute");
    } else if (diffSec < 2640) {
      return relative.format(-Math.floor(diffSec / 60), "minutes");
    } else if (diffSec < 5340) {
      return relative.format(-1, "hour");
    } else if (diffSec < 75_600) {
      return relative.format(-Math.floor(diffSec / 3600), "hours");
    } else if (diffSec < 126_000) {
      return relative.format(-1, "day");
    } else if (diffSec < 2_160_000) {
      return relative.format(-Math.floor(diffSec / 86_400), "days");
    } else if (diffSec < 3_888_000) {
      return relative.format(-1, "month");
    } else if (diffSec < 27_561_600) {
      const monthDiff = relativeToDate.getMonth() - value.getMonth();
      const yearDiff = relativeToDate.getFullYear() - value.getFullYear();
      return relative.format(-(monthDiff + yearDiff * 12), "months");
    } else if (diffSec < 47_260_800) {
      return relative.format(-1, "year");
    }

    return relative.format(-Math.floor(diffSec / 31_104_000), "years");
  }

  // in now
  if (diffSec > -44) {
    return relative.format(-diffSec, "seconds");
  } else if (diffSec > -89) {
    return relative.format(-1, "minute");
  } else if (diffSec > -2640) {
    return relative.format(-Math.floor(diffSec / 60), "minutes");
  } else if (diffSec > -5340) {
    return relative.format(-1, "hour");
  } else if (diffSec > -75_600) {
    return relative.format(-Math.floor(diffSec / 3600), "hours");
  } else if (diffSec > -126_000) {
    return relative.format(1, "day");
  } else if (diffSec > -2_160_000) {
    return relative.format(-Math.floor(diffSec / 86_400), "days");
  } else if (diffSec > -3_888_000) {
    return relative.format(1, "month");
  } else if (diffSec > -27_561_600) {
    const monthDiff = relativeToDate.getMonth() - value.getMonth();
    const yearDiff = relativeToDate.getFullYear() - value.getFullYear();
    return relative.format(-(monthDiff + yearDiff * 12), "months");
  } else if (diffSec > -47_260_800) {
    return relative.format(1, "year");
  }

  return relative.format(-Math.floor(diffSec / 31_104_000), "years");
}

/**
 * Returns a formatted value based on the given `pattern` and `value`.
 * If no pattern is provided, the value is returned as is.
 * @param value - the value to format
 * @param pattern - the pattern to use
 * @returns the formatted value
 */
export function formatValueWithPattern(value: string, pattern: string): string {
  if (!pattern) {
    return value;
  }

  const patternChars = [...pattern];
  const valueChars = [...value];

  return patternChars
    .map((char, i) => {
      if (char === `\\` && patternChars[i + 1] === "#") {
        return "#";
      }
      if (char === "#") {
        const valueChar = valueChars.shift();
        return valueChar;
      }

      if (char === valueChars[0]) {
        return valueChars.shift();
      }

      return char;
    })
    .join("");
}

/**
 * Substitute {{tokens}} in the given value with the given tokens.
 */
export function formatWithTokens(
  value: string | null | undefined,
  tokens: Record<string, string>,
): string {
  if (!value) {
    return "";
  }

  return value.replaceAll(
    /({{[^}]+}})/g,
    (match) => tokens[match.slice(2, -2)] ?? match,
  );
}

export interface WithPeriod {
  period?:
    | {
        start?: string | number | null | undefined;
        end?: string | number | null | undefined;
      }
    | null
    | undefined;
}

export function comparePeriods(
  element1: WithPeriod,
  element2: WithPeriod,
): number {
  const element1EndDate = element1?.period?.end
    ? new Date(element1.period.end)
    : undefined;
  const element2EndDate = element2?.period?.end
    ? new Date(element2.period.end)
    : undefined;

  // sort by period
  if (!element1EndDate && element2EndDate) return -1;
  if (!element2EndDate && element1EndDate) return 1;
  if (element1EndDate && element2EndDate) {
    if (element1EndDate > element2EndDate) return -1;
    if (element2EndDate > element1EndDate) return 1;
  }

  return 0;
}

export type SortOrderOf<T> =
  | keyof T
  | keyof {
      [K in keyof T as K extends string ? `-${K}` : never]: T[K];
    };

/**
 * Build a compare function to be used inside a sort to sort by a property value.
 *
 * Defaults to ascending order.
 * Prefix the sort order with a `-` to sort in reverse (descending) order.
 *
 * @example
 *
 * declare const listOfPatients: Patient[];
 * const patientsSortedByDateOfBirthOldestFirst = listOfPatients.sort(compareBy("birthDate"));
 * const patientsSortedByDateOfBirthYoungestFirst = listOfPatients.sort(compareBy("-birthDate"));
 */
export function compareBy<T>(
  by: SortOrderOf<T> | null | undefined,
): (a: T, b: T) => number {
  if (!by || typeof by !== "string") return () => 0;
  if (by.startsWith("-")) {
    const reverseCompare = compareBy(by.slice(1) as SortOrderOf<T>);
    return (a, b) => -reverseCompare(a, b);
  }
  return (a: T, b: T) => {
    if (a[by as keyof T] && b[by as keyof T]) {
      if (a[by as keyof T] > b[by as keyof T]) {
        return 1;
      } else if (a[by as keyof T] < b[by as keyof T]) {
        return -1;
      }
    }
    if (a[by as keyof T]) {
      return 1;
    } else if (b[by as keyof T]) {
      return -1;
    }

    return 0;
  };
}

/**
 * Convert the string to start case (First letter of each word capitalized).
 *
 * @see {@link https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage}
 */
export function startCase(value: null | undefined): undefined;
export function startCase(value: string): string;
export function startCase(value: string | null | undefined): string | undefined;
export function startCase(
  value: string | null | undefined,
): string | undefined {
  if (value == undefined) return undefined;
  return value
    .match(/[A-Z]?[a-z]+|\d+|[A-Z]+(?![a-z])/g)
    ?.reduce(
      (result, word, index) =>
        result +
        (index ? " " : "") +
        word.charAt(0).toUpperCase() +
        word.slice(1),
      "",
    );
}

export function urlSafeConcat(
  ...urls: Array<string | URL | null | undefined>
): string {
  return urls
    .map((url, index) => {
      if (index !== urls.length - 1) {
        url = url?.toString().endsWith("/")
          ? url?.toString().slice(0, -1)
          : url?.toString();
      }
      if (index !== 0) {
        url = url?.toString().startsWith("/")
          ? url?.toString().slice(1)
          : url?.toString();
      }
      return url;
    })
    .filter(Boolean)
    .join("/");
}

/**
 * Generate a UUID v4.
 * This method is NOT cryptographically secure when the execution environment does not support
 * the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API).
 *
 * Why having it though? It allows isomorphic code to generate UUIDs without having to rely on an external library,
 * nor importing the Web Crypto API polyfill or having error messages generated by bundlers.
 *
 * We can probably remove the fallback when Node LTS moves to Node 19+.
 */
export function uuid(): string {
  // We test randomUUID specifically because some implementations like jsdom have crypto, but not randomUUID
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  // Fallback implementation is taken from https://stackoverflow.com/a/8809472
  let d = Date.now(),
    d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0;

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replaceAll(/[xy]/g, (c) => {
    let r = Math.random() * 16;
    if (d > 0) {
      r = Math.trunc((d + r) % 16);
      d = Math.floor(d / 16);
    } else {
      r = Math.trunc((d2 + r) % 16);
      d2 = Math.floor(d2 / 16);
    }
    return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
  });
}

/**
 * Recursively explore value and cleans up un-FHIR values: empty strings, arrays with null, undefined,
 * empty strings or {}, etc.
 */
export function cleanFhirValues<T>(value: T | null | undefined): T | undefined {
  if (value == undefined) {
    return undefined;
  }

  if (typeof value === "string" && !value.trim()) {
    return;
  }

  if (Array.isArray(value)) {
    const filteredArray = value
      .map((x) => cleanFhirValues(x))
      .filter(Boolean) as unknown[];
    return filteredArray.length > 0 ? (filteredArray as T) : undefined;
  }

  if (typeof value === "object") {
    for (const [key, itemValue] of Object.entries(value)) {
      const finalItemValue = cleanFhirValues(itemValue);
      if (finalItemValue) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (value as any)[key] = finalItemValue;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (value as any)[key];
      }
    }

    return JSON.stringify(value) === "{}" ? undefined : value;
  }

  return value;
}

/**
 * Type that drop the first element of a type array.
 */
export type DropFirst<T extends unknown[]> = T extends [infer _, ...infer U]
  ? U
  : never;

/**
 * Type that filter keys that start with an underscore.
 */
export type RemoveUnderscoreKeys<T extends PropertyKey> =
  T extends `_${infer _U}` ? never : T;

/**
 * Semantically compare 2 resources, ignoring the id, meta and text fields.
 */
export function resourcesAreEqual(
  resourceA: Resource,
  resourceB: Resource,
): boolean {
  const {
    id: idA,
    meta: metaA,
    text: textA,
    ...resourceAWithoutMeta
  } = resourceA as DomainResource;
  const {
    id: idB,
    meta: metaB,
    text: textB,
    ...resourceBWithoutMeta
  } = resourceB as DomainResource;

  return deepEqual(resourceAWithoutMeta, resourceBWithoutMeta);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepEqual(x: any, y: any): boolean {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;
  return x && y && tx === "object" && tx === ty
    ? ok(x).length === ok(y).length &&
        ok(x).every((key) => deepEqual(x[key], y[key]))
    : x === y;
}

/**
 * Return undefined if the resource is not of the given type,
 * or the resource itself if it is, properly typed.
 */
export function asResource<TResourceType extends AnyResourceType>(
  type: TResourceType,
  resource: Resource | null | undefined,
): ExtractResource<TResourceType> | undefined {
  return isResource(type, resource) ? resource : undefined;
}

/**
 * Iterate over the given array of references and return the first one that is of the given type.
 */
export function findReference<TResourceType extends AnyResourceType>(
  values: Array<Reference | null | undefined> | null | undefined,
  type: TResourceType,
): ResolvableReference<ExtractResource<TResourceType>> | undefined {
  if (!values?.length) {
    return undefined;
  }

  return values.find((x) => isReferenceOf(x, type)) as
    | ResolvableReference<ExtractResource<TResourceType>>
    | undefined;
}

/**
 * Iterate over the given array of references and return all the references to the given type.
 */
export function findReferences<TResourceType extends AnyResourceType>(
  values: Array<Reference | null | undefined> | null | undefined,
  type: TResourceType,
): ResolvableReference<ExtractResource<TResourceType>>[] {
  if (!values?.length) {
    return [];
  }

  return values.filter((x) => isReferenceOf(x, type)) as ResolvableReference<
    ExtractResource<TResourceType>
  >[];
}

/**
 * Handles https://hl7.org/fhir/formats.html#choice.
 * Execute the proper function based on the presence of the value in the
 * choice of data types identified by the prefix.
 *
 * @example
 *
 * const result = choiceOfDataTypes(condition, "onset", {
 *   dateTime: (value: string) => value + " as dateTime",
 *   string: (value: string) => value + " as string",
 *   period: (value: Period) => value + " as Period",
 * });
 */
export function choiceOfDataTypes<TParent, TPrefix extends string, TResult>(
  parent: TParent | null | undefined,
  prefix: TPrefix,
  options: ChoiceOfDataTypesOptions<TParent, TPrefix, TResult>,
): TResult | undefined {
  if (!parent) {
    return undefined;
  }

  const value = Object.entries(parent).find(
    // eslint-disable-next-line unicorn/no-null
    ([k, v]) => k.startsWith(prefix) && v != null,
  );
  if (!value) {
    return undefined;
  }

  const suffix = value[0].slice(prefix.length);
  const optionKey = (suffix.charAt(0).toLowerCase() +
    suffix.slice(1)) as keyof ChoiceOfDataTypesOptions<
    TParent,
    TPrefix,
    TResult
  >;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (options[optionKey] as any)?.(
    value[1] as TParent[TPrefix & keyof TParent],
  ) as TResult;
}

export type ChoiceOfDataTypesOptions<
  TParent,
  TPrefix extends string,
  TResult,
> = {
  [K in keyof TParent as K extends `${TPrefix}${infer TRest}`
    ? Uncapitalize<TRest>
    : never]: (value: NonNullable<TParent[K]>) => TResult;
};

/**
 * Flattens `Questionnaire` or `QuestionnaireResponse` items into a flat array.
 * Depth-first search.
 */
export function flattenQuestionnaireItems<
  T extends QuestionnaireItem | QuestionnaireResponseItem,
>(withItem: { item?: T[] }): T[] {
  return (withItem.item?.flatMap((item) => [
    item,
    ...flattenQuestionnaireItems(item as never),
  ]) ?? []) as T[];
}

/**
 * Find a `Questionnaire` or `QuestionnaireResponse` item using their linkId path.
 * The complete path must be provided.
 * For a search by partial path, use `flattenQuestionnaireItems`.
 */
export function getQuestionnaireItemByLinkId<
  T extends QuestionnaireItem | QuestionnaireResponseItem,
>(withItem: { item?: T[] }, ...linkIds: string[]): T | undefined {
  if (linkIds.length === 0) {
    return undefined;
  }
  const [currentLinkId, ...restLinkIds] = linkIds;
  const item = withItem.item?.find((x) => x.linkId === currentLinkId);
  if (restLinkIds.length === 0) {
    return item;
  }
  return getQuestionnaireItemByLinkId(item as never, ...restLinkIds);
}
