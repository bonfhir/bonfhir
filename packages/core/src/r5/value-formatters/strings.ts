import { ValueFormatter } from "../formatters";
import { truncate } from "../lang-utils";

export interface StringFormatterTruncateOptions {
  /** The maximum string length */
  length: number;

  /** The string to indicate text is omitted */
  suffix?: string | null | undefined;

  /** The separator pattern to truncate to */
  separator?: RegExp | string | null | undefined;
}

export interface StringFormatterOptions {
  /**
   * Truncates string if it's longer than the given maximum string length.
   * The last characters of the truncated string are replaced with the omission string which defaults to "...".
   */
  truncate?: StringFormatterTruncateOptions | null | undefined;
}

export const canonicalFormatter: ValueFormatter<
  "canonical",
  string,
  null | undefined
> = {
  type: "canonical",
  format: (value) => {
    return value || "";
  },
};

export const fhirPathFormatter: ValueFormatter<
  "http://hl7.org/fhirpath/System.String",
  string,
  null | undefined
> = {
  type: "http://hl7.org/fhirpath/System.String",
  format: (value) => {
    return value || "";
  },
};

export const idFormatter: ValueFormatter<"id", string, null | undefined> = {
  type: "id",
  format: (value) => {
    return value || "";
  },
};

export const oidFormatter: ValueFormatter<"oid", string, null | undefined> = {
  type: "oid",
  format: (value) => {
    return value || "";
  },
};

export const stringFormatter: ValueFormatter<
  "string",
  string,
  StringFormatterOptions | null | undefined
> = {
  type: "string",
  format: (value, options) => {
    if (!value) {
      return "";
    }

    if (options?.truncate) {
      return truncate(
        value,
        options.truncate.length,
        options.truncate.suffix,
        options.truncate.separator
      );
    }

    return value;
  },
};

export const uriFormatter: ValueFormatter<"uri", string, null | undefined> = {
  type: "uri",
  format: (value) => {
    return value || "";
  },
};

export const urlFormatter: ValueFormatter<"url", string, null | undefined> = {
  type: "url",
  format: (value) => {
    return value || "";
  },
};

export const uuidFormatter: ValueFormatter<"uuid", string, null | undefined> = {
  type: "uuid",
  format: (value) => {
    return value || "";
  },
};
