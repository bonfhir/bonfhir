/**
 * Return true if the first argument is not in the second argument.
 * List of values can be provided as an array, or a comma-delimited string.
 */
export const notIn = <T>(fnCtx: T, values: T[] | string) => {
  const filter =
    typeof values === "string" ? (values.split(",") as T[]) : values;
  return filter.includes(fnCtx) ? undefined : fnCtx;
};
