import fg from "fast-glob";
import micromatch from "micromatch";
import { exec } from "node:child_process";
import { existsSync } from "node:fs";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { promisify } from "node:util";
import { CommandModule } from "yargs";

const execAsync = promisify(exec);

export interface CommandOptions {
  sourceFhir?: string | null | undefined;
  targetFhir?: string | null | undefined;
  source: string;
  target: string;
  exclude?: string[] | null | undefined;
  include?: string[] | null | undefined;
}

export interface CommandContext {
  /** Command-line options */
  options: CommandOptions;
}

export default <CommandModule<unknown, CommandOptions>>{
  command: "copy",
  describe: "Copy files with preprocessing",
  builder: {
    "source-fhir": {
      type: "string",
      describe: "The source FHIR release to use (e.g. r4b, r5...)",
    },
    "target-fhir": {
      type: "string",
      describe: "The target FHIR release to use (e.g. r4b, r5...)",
    },
    source: {
      type: "string",
      alias: "s",
      describe: "The source directory to copy from",
    },
    target: {
      type: "string",
      alias: "t",
      describe: "The target directory to copy to",
    },
    exclude: {
      type: "array",
      alias: "e",
      describe: "Pattern that can be used to exclude files from the copy",
    },
    include: {
      type: "array",
      alias: "i",
      describe: "Pattern that can be used to include files from the copy",
    },
  },
  handler: async (options) => {
    const rootSourceDir = resolve(options.source);
    const rootTargetDir = resolve(options.target);
    for (const source of await fg(join(rootSourceDir, "**/*"), {
      onlyFiles: true,
    })) {
      if (
        options.include?.length &&
        !micromatch.isMatch(source, options.include)
      ) {
        continue;
      }
      if (
        options.exclude?.length &&
        micromatch.isMatch(source, options.exclude)
      ) {
        continue;
      }
      const targetPath = source.replace(rootSourceDir, rootTargetDir);
      const targetDir = dirname(targetPath);
      if (!existsSync(targetDir)) {
        await mkdir(targetDir, { recursive: true });
      }

      if (!options.targetFhir) {
        await copyFile(source, targetPath);
        continue;
      }

      const initialContent = await readFile(source, "utf8");

      const processedContent = preprocess(source, initialContent, options);

      if (processedContent.trim()) {
        await writeFile(targetPath, processedContent, "utf8");

        if (processedContent != initialContent) {
          await execAsync(`prettier --write "${targetPath}"`);
        }
      }
    }
  },
};

function preprocess(
  source: string,
  input: string,
  options: CommandOptions
): string {
  const processedFileContent = [];
  const preprocessorStack: Array<string | undefined> = [];
  for (const [lineNumber, contentLine] of input.split("\n").entries()) {
    const matchedPreprocessorDirective = contentLine.match(
      /\s*\/\/\s*#(?<directive>(end)?if)(\s+(?<condition>.+))?\s*/
    )?.groups as { directive: string; condition?: string };

    if (matchedPreprocessorDirective?.directive) {
      switch (matchedPreprocessorDirective.directive) {
        case "if": {
          preprocessorStack.push(matchedPreprocessorDirective.condition);
          break;
        }
        case "endif": {
          preprocessorStack.pop();
          break;
        }
      }
    } else {
      if (
        preprocessorStack.every((condition) =>
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          evalCondition(source, lineNumber + 1, condition, options.targetFhir!)
        )
      ) {
        processedFileContent.push(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          contentLine.replaceAll(options.sourceFhir!, options.targetFhir!)
        );
      }
      continue;
    }
  }
  return processedFileContent.join("\n");
}

function evalCondition(
  source: string,
  lineNumber: number,
  condition: string | undefined,
  targetFhir: string
): boolean {
  if (!condition?.trim()) {
    throw new Error(
      `Missing pre-processor condition: (${source}:${lineNumber})`
    );
  }
  const parsedCondition = condition
    .trim()
    .match(/\s*(?<variable>fhir)\s*(?<operator>[<=>]=?)\s*(?<value>\S+)/)
    ?.groups as {
    variable: "fhir";
    operator: "=" | "==" | "<" | ">" | ">=" | "<=";
    value: string;
  };

  if (!parsedCondition) {
    throw new Error(
      `Invalid pre-processor condition: "${condition}" (${source}:${lineNumber})`
    );
  }

  switch (parsedCondition.operator) {
    case "<": {
      return targetFhir < parsedCondition.value;
    }
    case "<=": {
      return targetFhir <= parsedCondition.value;
    }
    case ">": {
      return targetFhir > parsedCondition.value;
    }
    case ">=": {
      return targetFhir >= parsedCondition.value;
    }
    case "==":
    case "=": {
      return targetFhir == parsedCondition.value;
    }
    default: {
      throw new Error(
        `Unsupported operator condition: "${condition}" (${source}:${lineNumber})`
      );
    }
  }
}
