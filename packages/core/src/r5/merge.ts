/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneResource } from "./extensions.js";
import { Resource } from "./fhir-types.codegen.js";

export interface MergeArgs<T> {
  current: T | null | undefined;
  incoming: T | null | undefined;
}

/**
 * The result of a merge operation.
 * The first element is the resource, the second is a boolean indicating whether the final resource is different
 * than the original resource.
 */
export type MergeResult<T> = [T, boolean];

export interface Merger {
  canMerge: (args: MergeArgs<any>) => boolean;
  merge: (
    args: MergeArgs<any>,
    applyMergers: (args: MergeArgs<any>) => any
  ) => any;
}

/**
 * General strategy for merging resources in general.
 */
export const resourceMerger: Merger = {
  canMerge: ({ current, incoming }) => {
    return !!current?.resourceType && !!incoming?.resourceType;
  },
  merge: ({ current, incoming }, applyMergers) => {
    const merged = current;
    for (const [key, value] of Object.entries(incoming)) {
      merged[key] = applyMergers({
        current: merged[key],
        incoming: value,
      });
    }

    return merged;
  },
};

/**
 * Default strategy for merging arrays.
 */
export const arrayMerger: Merger = {
  canMerge: ({ current, incoming }) => {
    return Array.isArray(current) && Array.isArray(incoming);
  },
  merge: ({ current, incoming }) => {
    const merged = [...current];
    const uniqueMerged = new Set(...merged.map((x) => JSON.stringify(x)));
    for (const item of incoming) {
      if (uniqueMerged.has(JSON.stringify(item))) {
        continue;
      }
      merged.push(item);
    }
    return merged;
  },
};

/** The default strategy for merge, which only keep the incoming value. */
export const defaultMerger: Merger = {
  canMerge: () => true,
  merge: ({ current, incoming }) => {
    if (incoming) {
      return incoming;
    }
    return current;
  },
};

export const MERGERS: Array<Merger> = [
  resourceMerger,
  arrayMerger,
  defaultMerger,
];

export function merge<TResource extends Resource>({
  current,
  incoming,
}: MergeArgs<TResource>): MergeResult<TResource> {
  if (current == undefined) {
    return [cloneResource(incoming) as TResource, true];
  }

  const currentClone = cloneResource(current);

  if (incoming == undefined) {
    return [currentClone, false];
  }

  const merged = applyMergers({ current: currentClone, incoming }, MERGERS);
  return [merged, JSON.stringify(current) !== JSON.stringify(merged)];
}

export function applyMergers(
  args: MergeArgs<any>,
  mergers: Array<Merger>
): any {
  for (const merger of mergers) {
    if (merger.canMerge(args)) {
      return merger.merge(args, (args) => applyMergers(args, mergers));
    }
  }

  throw new Error(`No merger found for ${args.current} and ${args.incoming}`);
}
