import { ValueFormatter } from "../formatters";

export const idFormatter: ValueFormatter<"id", string, null | undefined> = {
  type: "id",
  format: (value) => {
    return value?.trim() || "";
  },
};
