/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneResource } from "./extensions.js";
import { Resource } from "./fhir-types.codegen.js";

export interface MergeArgs<T> {
  current: T | null | undefined;
  incoming: T | null | undefined;
  mergers?: Array<Merger> | null | undefined;
}

/**
 * The result of a merge operation.
 * The first element is the resource, the second is a boolean indicating whether the final resource is different
 * than the original resource.
 */
export type MergeResult<T> = [T, boolean];

export type MergerArgs = MergeArgs<any> & { key: string };

export interface Merger {
  canMerge: (args: MergerArgs) => boolean;
  merge: (args: MergerArgs, merge: (args: MergerArgs) => any) => any;
}

/**
 * Default strategy for merging arrays.
 */
export const arrayMerger: Merger = {
  canMerge: ({ current, incoming }) => {
    return Array.isArray(current) || Array.isArray(incoming);
  },
  merge: ({ current, incoming, key }, merge) => {
    if (!current || !Array.isArray(current)) {
      return incoming;
    }
    if (!incoming) {
      return current;
    }

    if (!Array.isArray(incoming)) {
      return incoming;
    }

    const merged = [...current];
    const uniqueMerged = new Set();
    const mergedById = new Map();
    for (const item of merged) {
      if (item) {
        uniqueMerged.add(JSON.stringify(item));
        if (item.id) {
          mergedById.set(item.id, item);
        }
      }
    }
    for (const [index, item] of incoming.entries()) {
      if (uniqueMerged.has(JSON.stringify(item))) {
        continue;
      }
      if (mergedById.has(item.id)) {
        const mergedItem = merge({
          current: mergedById.get(item.id),
          incoming: item,
          key,
        });
        merged[index] = mergedItem;
        continue;
      }
      merged.push(item);
    }
    return merged;
  },
};

/** The default strategy for merge, that merges values one-by-one. */
export const defaultMerger: Merger = {
  canMerge: () => true,
  merge: ({ current, incoming }, merge) => {
    if (!current) {
      return incoming;
    }
    if (!incoming) {
      return current;
    }
    if (typeof incoming === "object") {
      const merged = current;
      for (const [key, value] of Object.entries(incoming)) {
        merged[key] = merge({
          current: merged[key],
          incoming: value,
          key,
        });
      }
      return merged;
    }

    return incoming;
  },
};

export const DEFAULT_MERGERS: Array<Merger> = [arrayMerger, defaultMerger];

export function merge<TResource extends Resource>({
  current,
  incoming,
  mergers,
}: MergeArgs<TResource>): MergeResult<TResource> {
  if (current == undefined) {
    return [cloneResource(incoming) as TResource, true];
  }

  const currentClone = cloneResource(current);

  if (incoming == undefined) {
    return [currentClone, false];
  }

  const merged = applyMergers(
    { current: currentClone, incoming, key: "" },
    mergers || DEFAULT_MERGERS
  );
  return [merged, JSON.stringify(current) !== JSON.stringify(merged)];
}

export function applyMergers(args: MergerArgs, mergers: Array<Merger>): any {
  for (const merger of mergers) {
    if (merger.canMerge(args)) {
      return merger.merge(args, (args) => applyMergers(args, mergers));
    }
  }

  throw new Error(`No merger found for ${args.current} and ${args.incoming}`);
}
