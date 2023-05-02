import chunkText from "chunk-text";

export function toJsComment(lines: string[]) {
  return `/**\n * ${lines.join("\n * ")}\n */`;
}

export function splitLongLines(lines: string[]): string[] {
  return lines.flatMap((line) => {
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
    case "instant":
    case "markdown":
    case "uri":
    case "url":
      return "string";
    case "integer":
    case "decimal":
    case "positiveInt":
      return "number";
    default:
      return fhirType;
  }
  /* eslint-enable unicorn/switch-case-braces */
}
