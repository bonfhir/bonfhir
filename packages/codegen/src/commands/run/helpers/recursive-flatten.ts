/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Depth-first recursive exploration of an array using a single attribute.
 */
export const recursiveFlatten = <T>(fnCtx: T[], attribute: string): T[] => {
  if (!fnCtx) {
    return [];
  }

  if (!Array.isArray(fnCtx)) {
    throw new TypeError(
      "The context passed to recursiveFlatten must be an array."
    );
  }

  return [...recursiveExploration(fnCtx, attribute)];
};

function* recursiveExploration(
  elements: any[],
  attribute: string
): Generator<any, any, undefined> {
  for (const element of elements) {
    yield element;
    if (element[attribute]) {
      for (const child of recursiveExploration(element[attribute], attribute)) {
        yield child;
      }
    }
  }
}
