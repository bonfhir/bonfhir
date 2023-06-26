import { Merger } from "./merger.js";

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
