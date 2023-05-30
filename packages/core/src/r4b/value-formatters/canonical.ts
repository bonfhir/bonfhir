import { ValueFormatter } from "../formatters.js";

export const canonicalFormatter: ValueFormatter<
  "canonical",
  string | null | undefined,
  null | undefined
> = {
  type: "canonical",
  format: (value) => {
    return value?.trim() || "";
  },
};
