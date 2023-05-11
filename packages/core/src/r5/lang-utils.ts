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
