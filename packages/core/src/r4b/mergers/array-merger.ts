import { elementMerger } from "./element-merger.js";

/**
 * Default strategy for merging arrays.
 */
export const arrayMerger = elementMerger(undefined, ["id"]);
