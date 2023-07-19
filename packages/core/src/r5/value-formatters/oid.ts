import { ValueFormatter } from "../formatters";

export const oidFormatter: ValueFormatter<"oid", string, null | undefined> = {
  type: "oid",
  format: (value) => {
    return value?.trim() || "";
  },
};
