import chunkText from "chunk-text";

export function toJsComment(lines: string[]) {
  return `/**\n * ${lines.join("\n * ")}\n */`;
}

export function splitLongLines(lines: string[]): string[] {
  return lines.flatMap((line) => {
    return line.trim().length === 0 ? line : chunkText(line, 80);
  });
}
