import chunkText from "chunk-text";

export function toJsComment(lines: string[]) {
  return `/**\n * ${lines.join("\n * ")}\n */`;
}

export function splitLongLines(lines: string[]): string[] {
  return lines.flatMap((line) => {
    if (line == undefined) {
      return "";
    }
    return line.trim().length === 0 ? line : chunkText(line, 80);
  });
}

export function toJsType(fhirType: string): string {
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
    case "time":
    case "uri":
    case "url":
    case "uuid":
    case "xhtml":
      return "string";
    case "integer":
    case "integer64": // TODO: Investigate BigInt support
    case "decimal":
    case "positiveInt":
    case "unsignedInt":
      return "number";
    default:
      return fhirType;
  }
  /* eslint-enable unicorn/switch-case-braces */
}
