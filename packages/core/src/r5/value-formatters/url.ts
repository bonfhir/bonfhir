import { ValueFormatter } from "../formatters";

export const urlFormatter: ValueFormatter<
  "url",
  string | null | undefined,
  null | undefined
> = {
  type: "url",
  format: (value) => {
    return value?.trim() || "";
  },
};
