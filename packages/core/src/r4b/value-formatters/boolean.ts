import { ValueFormatter } from "../formatters.js";

export interface BooleanLabels {
  true?: string | null | undefined;
  false?: string | null | undefined;
  nil?: string | null | undefined;
}

export interface BooleanFormatterOptions {
  labels?: BooleanLabels | null | undefined;
}

export const booleanFormatter: ValueFormatter<
  "boolean",
  boolean | null | undefined,
  BooleanFormatterOptions | null | undefined
> = {
  type: "boolean",
  format: (value, options, formatterOptions) => {
    const labels = {
      ...DEFAULT_BOOLEAN_LABELS,
      ...formatterOptions.booleanLabels,
      ...options?.labels,
    };

    switch (value) {
      case true: {
        return labels["true"] || "";
      }
      case false: {
        return labels["false"] || "";
      }
      // eslint-disable-next-line unicorn/no-null
      case null:
      case undefined: {
        return labels["nil"] || "";
      }
    }
  },
};

export const DEFAULT_BOOLEAN_LABELS: BooleanLabels = {
  true: "yes",
  false: "no",
  nil: "",
};
