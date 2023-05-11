import { ValueFormatter } from "../formatters";
import { TruncateOptions, truncate } from "../lang-utils";

export interface StringFormatterOptions {
  /**
   * Truncates string if it's longer than the given maximum string length.
   */
  truncate?: true | TruncateOptions | null | undefined;
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
        typeof options.truncate === "boolean" ? undefined : options.truncate
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
