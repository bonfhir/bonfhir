import { elementMerger } from "./element-merger";

/**
 * Default strategy for merging arrays.
 */
export const arrayMerger = elementMerger(undefined, ["id"]);
