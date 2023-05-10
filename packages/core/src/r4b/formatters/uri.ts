import { ValueFormatter } from "../formatters";

export const uriFormatter: ValueFormatter<"uri", string, null | undefined> = {
  type: "uri",
  format: (value) => {
    return value || "";
  },
};
