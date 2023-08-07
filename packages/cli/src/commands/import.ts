/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnyResource,
  Bundle,
  DedupSearchRules,
  Retrieved,
  fhirDedupSearch,
  reference,
} from "@bonfhir/core/r4b";
import chalk from "chalk";
import decompress from "decompress";
import fg from "fast-glob";
import { Listr } from "listr2";
import { readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, extname, join, parse } from "node:path";
import { CommandModule } from "yargs";
import {
  ClientCommandBuilder,
  ClientCommandContext,
  ClientCommandOptions,
  ClientConnectTask,
} from "../modules";

export interface CommandOptions extends ClientCommandOptions {
  source: string;
  rules?: string;
}

export interface CommandContext extends ClientCommandContext {
  options: CommandOptions;
  localSource: string;
  rules?: DedupSearchRules;
  files: string[];
  errors: Record<string, any>;
}

export default <CommandModule<unknown, CommandOptions>>{
  command: "import",
  describe: "Import FHIR resources (with deduplication)",
  builder: {
    source: {
      type: "string",
      alias: "f",
      demandOption: true,
      describe:
        "The files to import. These can be individual resources or bundles. Glob patterns are supported for files, or you can use a full URL for a file or archive to download. Use synthea-sample to download the Synthea sample data.",
    },
    rules: {
      type: "string",
      alias: "r",
      describe:
        "Path to a json files that contains custom deduplication rules to use.",
    },
    ...ClientCommandBuilder,
  },
  handler: async (options) => {
    if (options.source === "synthea-sample") {
      options.source =
        "https://synthetichealth.github.io/synthea-sample-data/downloads/synthea_sample_data_fhir_r4_sep2019.zip";
    }

    try {
      const finalContext = await new Listr<CommandContext>([
        ClientConnectTask(),
        {
          title: "Loading rules...",
          task: async (context) => {
            context.rules = JSON.parse(
              await readFile(context.options.rules!, "utf8"),
            );
          },
          enabled: (context) => !!context.options.rules,
        },
        {
          title: "Download source...",
          task: async (context, task) => {
            const fullPathLocalFile = join(
              tmpdir(),
              basename(context.options.source),
            );
            const response = await fetch(context.options.source);
            if (!response.ok) {
              throw new Error(await response.text());
            }
            await writeFile(fullPathLocalFile, response.body as any);
            context.localSource = fullPathLocalFile;
            task.title = `Downloaded source to ${fullPathLocalFile}`;

            if (extname(context.localSource) === ".zip") {
              const targetDir = join(
                tmpdir(),
                parse(basename(context.options.source)).name,
              );
              task.title += ` and extracting to ${targetDir}...`;
              await decompress(context.localSource, targetDir);
              context.localSource = join(targetDir, "**/*.*");
              task.title = `Downloaded source and extracted to ${targetDir}`;
            }
          },
          enabled: (context) => context.options.source.startsWith("http"),
        },
        {
          title: "Scanning files",
          task: async (context, task) => {
            context.files = await fg(context.localSource, {
              onlyFiles: true,
            });
            task.title += `: ${context.files.length} files(s) to process.`;
          },
        },
        {
          title: "Importing files",
          task: async (context, task) => {
            let total = 1;
            for (const file of context.files) {
              task.title = `Importing file ${file} (${total}/${context.files.length})`;
              try {
                await processImport(file, context);
              } catch (error: any) {
                context.errors[file] = error;
              } finally {
                ++total;
              }
            }
          },
        },
      ]).run({
        options,
        localSource: options.source,
        errors: {},
      } as unknown as CommandContext);

      if (Object.keys(finalContext.errors).length > 0) {
        console.log(
          chalk.green(
            `${
              finalContext.files.length -
              Object.keys(finalContext.errors).length
            } file(s) imported`,
          ),
        );
        for (const [file, error] of Object.entries(finalContext.errors)) {
          console.error(chalk.red(`Error while processing ${file}: ${error}}`));
          console.error();
          console.error(chalk.gray((error as Error).stack));
        }
      } else {
        console.log(
          chalk.green(`${finalContext.files.length} file(s) imported`),
        );
      }
    } catch (error) {
      console.error(chalk.red(error));
      console.error();
      console.error(chalk.gray((error as Error).stack));
    }
  },
};

async function processImport(file: string, context: CommandContext) {
  const resource = JSON.parse(await readFile(file, "utf8"));
  await (resource.resourceType === "Bundle"
    ? processBundle(resource, context)
    : context.client.createOr(
        "return",
        resource,
        fhirDedupSearch(resource, context.rules)?.href,
      ));
}

async function processBundle(bundle: any, { client, rules }: CommandContext) {
  // Create a batch search to find if resource already exists
  const searchBatch = buildSearchBatch(bundle, rules);
  const existingResourcesResponse = (await client.batch(
    searchBatch,
  )) as Bundle<Bundle>;

  // Based on the search batch, create a substitution mapping
  // where if there is a match, we have an entry in the substitution mapping
  const substitutionMapping = buildSubstitutionMapping(
    searchBatch,
    existingResourcesResponse,
  );

  // Based on the substitution mapping, we remove entries in the source bundle
  // if we have a match, only keeping new resources.
  bundle.entry = (bundle.entry || []).filter(
    (entry: any) => !substitutionMapping[entry.fullUrl!],
  );

  // Update references in the bundle to point to existing resources if they exist in the
  // substitution mapping.
  updateBundleReferences(bundle, substitutionMapping);

  // For now we use batch as Medplum as a bug with transactions.
  bundle.type = "batch";
  await client.batch(bundle as Bundle & { type: "batch" });
}

function buildSearchBatch(bundle: any, rules?: DedupSearchRules): Bundle {
  return {
    resourceType: "Bundle",
    type: "batch",
    entry: (bundle.entry ?? [])
      .map((entry: any) => ({
        entry,
        query: fhirDedupSearch(entry.resource, rules),
      }))
      .filter(({ query }: any) => !!query)
      .map(({ entry, query }: any) => ({
        request: {
          method: "GET",
          url: `/${entry.resource.resourceType}?${query}`,
        },
        id: entry.fullUrl,
      })),
  };
}

function buildSubstitutionMapping(
  search: Bundle,
  response: Bundle<Bundle>,
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [index, entry] of (search.entry || []).entries()) {
    const resource = response.entry?.[index]?.resource?.entry?.[0]?.resource;
    if (resource) {
      result[entry.id!] = reference(
        resource as Retrieved<AnyResource>,
      ).reference!;
    }
  }

  return result;
}

function updateBundleReferences(
  value: any,
  substitutionMapping: Record<string, string>,
) {
  if (typeof value === "object") {
    for (const entry of Object.entries(value) as [string, any][]) {
      if (entry[0] !== "fullUrl" && substitutionMapping[entry[1]]) {
        (value as any)[entry[0]] = substitutionMapping[entry[1]];
        continue;
      }

      if (Array.isArray(entry[1])) {
        updateBundleReferences(entry[1], substitutionMapping);
      } else {
        updateBundleReferences(entry[1], substitutionMapping);
        continue;
      }
    }

    return;
  }
}
