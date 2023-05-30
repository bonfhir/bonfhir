import { ValueFormatter } from "../formatters.js";

export const uuidFormatter: ValueFormatter<
  "uuid",
  string | null | undefined,
  null | undefined
> = {
  type: "uuid",
  format: (value) => {
    return value?.trim() || "";
  },
};
