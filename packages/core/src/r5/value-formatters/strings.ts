import { ValueFormatter } from "../formatters";

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
  null | undefined
> = {
  type: "string",
  format: (value) => {
    return value || "";
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
