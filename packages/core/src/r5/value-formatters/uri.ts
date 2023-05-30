import { ValueFormatter } from "../formatters.js";

export const uriFormatter: ValueFormatter<
  "uri",
  string | null | undefined,
  null | undefined
> = {
  type: "uri",
  format: (value) => {
    return value?.trim() || "";
  },
};
