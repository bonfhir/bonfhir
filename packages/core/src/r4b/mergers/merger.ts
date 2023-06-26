/* eslint-disable @typescript-eslint/no-explicit-any */
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
