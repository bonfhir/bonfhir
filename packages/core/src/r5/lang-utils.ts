/**
 * This module is used to provide a set of utility functions for typescript
 */

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

/**
 * Truncate a string to a given length and append an optional suffix.
 * @param value The string to truncate
 * @param length The maximum string length
 * @param suffix The string to indicate text is omitted
 * @param separator The separator pattern to truncate to
 * @returns
 */
export function truncate(
  value: string,
  length = 27,
  suffix: string | null | undefined = "...",
  separator?: RegExp | string | null | undefined
): string {
  if (!value) {
    return "";
  }

  if (value.length <= length) {
    return value;
  }

  if (separator) {
    const stringBeforeTruncation = value.slice(0, Math.max(0, length));
    const stringAfterTruncation = value.slice(length);
    const separatorIndex =
      typeof separator === "string"
        ? stringAfterTruncation.indexOf(separator, length)
        : stringAfterTruncation.search(separator);

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
