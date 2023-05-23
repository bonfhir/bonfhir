import fg from "fast-glob";
import micromatch from "micromatch";
import { existsSync } from "node:fs";
import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { CommandModule } from "yargs";

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
      await copyFile(source, targetPath);
    }
  },
};
