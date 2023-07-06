import chunkText from "chunk-text";

export function toJsComment(lines: string[]) {
  return `/**\n * ${lines.join("\n * ")}\n */`.replaceAll(
    IRREGULAR_WHITESPACE,
    " ",
  );
}

export function splitLongLines(lines: string[]): string[] {
  return lines.flatMap((line) => {
    if (line == undefined) {
      return "";
    }
    return line.trim().length === 0 ? line : chunkText(line, 80);
  });
}

export function toTsType(fhirType: string): string {
  /* eslint-disable unicorn/switch-case-braces */
  switch (fhirType) {
    case "base64Binary":
    case "canonical":
    case "code":
    case "date":
    case "dateTime":
    case "http://hl7.org/fhirpath/System.String":
    case "id":
    case "instant":
    case "markdown":
    case "oid":
    case "integer64": // TODO: Investigate BigInt support
    case "time":
    case "uri":
    case "url":
    case "uuid":
    case "xhtml":
      return "string";
    case "integer":
    case "decimal":
    case "positiveInt":
    case "unsignedInt":
      return "number";
    default:
      return fhirType || "unknown";
  }
  /* eslint-enable unicorn/switch-case-braces */
}

export function targetProfileToTsTypes(
  targetDefinitions: string[] | undefined,
): string | undefined {
  return targetDefinitions
    ?.map((x) => x?.replace("http://hl7.org/fhir/StructureDefinition/", ""))
    .filter(Boolean)
    .join(" | ");
}

/**
 * This was taken from https://github.com/eslint/eslint/blob/0c415cda5d76dbe5120ab9f3c4c81320538e35f0/lib/rules/no-irregular-whitespace.js#LL20C1-L20C163
 * Some FHIR definitions contain irregular whitespace characters, which are not allowed in JavaScript.
 */
const IRREGULAR_WHITESPACE =
  /[\f\v\u0085\uFEFF\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u200B\u202F\u205F\u3000]+/gmu;
