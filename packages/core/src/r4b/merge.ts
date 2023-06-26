import { cloneResource } from "./extensions.js";
import { Resource } from "./fhir-types.codegen.js";
import {
  MergeArgs,
  MergeResult,
  Merger,
  MergerArgs,
  arrayMerger,
  defaultMerger,
} from "./mergers/index.js";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyMergers(args: MergerArgs, mergers: Array<Merger>): any {
  for (const merger of mergers) {
    if (merger.canMerge(args)) {
      return merger.merge(args, (args) => applyMergers(args, mergers));
    }
  }

  throw new Error(`No merger found for ${args.current} and ${args.incoming}`);
}
