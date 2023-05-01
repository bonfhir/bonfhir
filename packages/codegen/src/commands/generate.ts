import chalk from "chalk";
import chunkText from "chunk-text";
import fg from "fast-glob";
import Listr from "listr";
import { exec } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { join, parse } from "node:path";
import { promisify } from "node:util";
import nunjucks from "nunjucks";
import { CommandModule } from "yargs";
import { FhirDefinitions } from "../fhir";

const execAsync = promisify(exec);

const GLOBAL_POST_PROCESSING_CHUNK_SIZE = 100;
const EXEC_MAX_BUFFER_SIZE = 1024 * 1000 * 10;

export interface CommandOptions {
  fhir?: "r4b" | "r5" | null | undefined;
  postProcessing: string[] | undefined;
  templates: string;
}

export interface CommandContext {
  /** Command-line options */
  options: CommandOptions;

  /** Loaded FHIR definitions */
  fhir?: FhirDefinitions;

  /** The full path of each template file. */
  templates: string[];

  /** The full path of each written files (from templates). */
  writtenFiles: string[];
}

export default <CommandModule<unknown, CommandOptions>>{
  command: "generate",
  describe: "Generate code from FHIR definitions",
  builder: {
    fhir: {
      choices: ["r4b", "r5"],
      describe: "Load FHIR definitions from a specific release",
      type: "string",
    },
    "post-processing": {
      type: "array",
      alias: "p",
      describe:
        "Command(s) to run for each file after generation. Use the token %file% to reference the file, or %files% to reference all files.",
    },
    templates: {
      type: "string",
      alias: "t",
      demandOption: true,
      describe: "Template files path (glob pattern).",
    },
  },
  handler: async (options) => {
    try {
      await new Listr<CommandContext>([
        {
          title: "Loading FHIR definitions",
          task: async (context, task) => {
            task.title += ` (${context.options.fhir})`;
            context.fhir = await FhirDefinitions.load(
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              context.options.fhir!
            );
          },
          enabled: (context) => !!context.options.fhir,
        },
        {
          title: "Scan templates",
          task: async (context, task) => {
            context.templates = await fg(context.options.templates);
            task.title += `: ${context.templates.length} template(s) found.`;
          },
        },
        {
          title: "Process templates",
          task: async (context) => {
            const nunjucksEnvironment = new nunjucks.Environment(undefined, {
              autoescape: false,
              noCache: true,
            });

            nunjucksEnvironment.addFilter("jsdoc", (value: string) => {
              const lines = value.split("\n").flatMap((line) => {
                return line.trim().length === 0 ? line : chunkText(line, 80);
              });
              return `/**\n * ${lines.join("\n * ")}\n */`;
            });

            context.writtenFiles = [];

            return new Listr<CommandContext>(
              context.templates.map((template) => {
                const templateParsedPath = parse(template);
                return {
                  title: templateParsedPath.name,
                  task: async (context) => {
                    const writtenFile = join(
                      templateParsedPath.dir,
                      templateParsedPath.name
                    );
                    await writeFile(
                      writtenFile,
                      nunjucksEnvironment.renderString(
                        await readFile(template, "utf8"),
                        context
                      ),
                      { encoding: "utf8" }
                    );
                    context.writtenFiles.push(writtenFile);
                  },
                };
              })
            );
          },
        },
        {
          title: "Post processing files",
          task: async (context) => {
            const globalPostProcessingTasks =
              context.options.postProcessing?.filter(
                (x) => !x.includes("%file%")
              ) || [];
            for (const globalPostProcessingTask of globalPostProcessingTasks) {
              const fileChunks = chunk(
                context.writtenFiles,
                GLOBAL_POST_PROCESSING_CHUNK_SIZE
              );
              for (const fileChunk of fileChunks) {
                await execAsync(
                  globalPostProcessingTask.replace(
                    /%files%/g,
                    fileChunk.join(" ")
                  ),
                  {
                    maxBuffer: EXEC_MAX_BUFFER_SIZE,
                  }
                );
              }
            }

            if (
              context.options.postProcessing?.some((x) => x.includes("%file%"))
            ) {
              return new Listr<CommandContext>(
                context.writtenFiles
                  .filter((x) => x.includes("%file%"))
                  .map((filePath) => ({
                    title: `Post-processing ${filePath}`,
                    task: async (context) => {
                      for (const command of context.options.postProcessing?.filter(
                        (x) => x.includes("%file%")
                      ) || []) {
                        await execAsync(command.replace(/%file%/g, filePath), {
                          maxBuffer: EXEC_MAX_BUFFER_SIZE,
                        });
                      }
                    },
                  }))
              );
            }
          },
          skip: (context) => !context.options.postProcessing?.length,
        },
      ]).run({
        options,
      } as unknown as CommandContext);
    } catch (error) {
      console.error(chalk.red(error));
      console.error();
      console.error(chalk.gray((error as Error).stack));
    }
  },
};

const chunk = <T>(array: T[], chunkSize: number) => {
  return array.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex]?.push(item);

    return resultArray;
  }, [] as Array<T[]>);
};
