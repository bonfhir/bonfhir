/**
 * This module is used to provide a set of utility functions for typescript
 */

import { Period } from "./fhir-types.codegen";

/**
 * Returns the given `value` as is if it satisfies `Array.isArray` or otherwise
 * wraps the given `value` in an array.
 */
export function asArray<T>(
  value: T
): T extends ReadonlyArray<unknown> ? T : [T] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Array.isArray(value) ? (value as any) : [value];
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
 * Truncate a string to a given length and append an optional suffix.
 */
export function truncate(
  value: null | undefined,
  options?: TruncateOptions | null | undefined
): undefined;
export function truncate(
  value: string,
  options?: TruncateOptions | null | undefined
): string;
export function truncate(
  value: string | null | undefined,
  options?: TruncateOptions | null | undefined
): string | undefined;
export function truncate(
  value: string | null | undefined,
  options?: TruncateOptions | null | undefined
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
  dateOnlyMode = false
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
    (relativeToDate.getTime() - value.getTime()) / 1000
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

export interface WithPeriod {
  period?: Period | undefined;
}

export function comparePeriods(
  element1: WithPeriod,
  element2: WithPeriod
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

/**
 * Convert the string to start case (First letter of each word capitalized).
 *
 * @see {@link https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage}
 */
export function startCase(value: null | undefined): undefined;
export function startCase(value: string): string;
export function startCase(value: string | null | undefined): string | undefined;
export function startCase(
  value: string | null | undefined
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
      ""
    );
}

/**
 * Type that drop the first element of a type array.
 */
export type DropFirst<T extends unknown[]> = T extends [infer _, ...infer U]
  ? U
  : never;
