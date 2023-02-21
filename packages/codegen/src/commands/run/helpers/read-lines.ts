import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Load a file and return an array with each line as a string. Ignores empty lines.
 */

export const buildReadLines =
  (templateDir: string) =>
  (filePath: string): string[] => {
    return readFileSync(join(templateDir, filePath))
      .toString()
      .split("\n")
      .filter((x) => !!x.trim());
  };
