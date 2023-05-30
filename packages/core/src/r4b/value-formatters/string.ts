import { ValueFormatter } from "../formatters.js";
import { TruncateOptions, truncate } from "../lang-utils.js";

export interface StringFormatterOptions {
  /**
   * Truncates string if it's longer than the given maximum string length.
   */
  truncate?: true | TruncateOptions | null | undefined;
}

export const stringFormatter: ValueFormatter<
  "string",
  string | null | undefined,
  StringFormatterOptions | null | undefined
> = {
  type: "string",
  format: (value, options) => {
    const trimmedValue = value?.trim() || "";

    if (!trimmedValue) {
      return "";
    }

    if (options?.truncate) {
      return truncate(
        trimmedValue,
        typeof options.truncate === "boolean" ? undefined : options.truncate
      );
    }

    return trimmedValue;
  },
};
