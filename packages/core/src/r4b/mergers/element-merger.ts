import { Merger } from "./merger.js";

export function elementMerger(
  matchingKey: string | null | undefined,
  matchers: string[]
): Merger {
  return {
    canMerge: ({ current, incoming, key }) => {
      return (
        (matchingKey ? key === matchingKey : true) &&
        (Array.isArray(current) || Array.isArray(incoming))
      );
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
      const mergedByMatchers = new Map();
      for (const item of merged) {
        if (item) {
          uniqueMerged.add(JSON.stringify(item));
          const itemKey = matchers
            .map((matcher) => JSON.stringify(item[matcher]))
            .filter(Boolean)
            .join("");
          if (itemKey) {
            mergedByMatchers.set(itemKey, item);
          }
        }
      }
      for (const [index, item] of incoming.entries()) {
        if (uniqueMerged.has(JSON.stringify(item))) {
          continue;
        }
        const itemKey = matchers
          .map((matcher) => JSON.stringify(item[matcher]))
          .filter(Boolean)
          .join("");
        if (mergedByMatchers.has(itemKey)) {
          const mergedItem = merge({
            current: mergedByMatchers.get(itemKey),
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
}
