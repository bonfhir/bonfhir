import { FSWatcher, existsSync, watch } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import * as prettier from "prettier";
import { ReplService, create, createRepl } from "ts-node";

const PLAYGROUND_FILENAME = "playground.ts";
const END_OF_EXECUTION = "// --------- End of execution ---------";

const dirname = fileURLToPath(new URL(".", import.meta.url));
const playgroundFile = join(dirname, PLAYGROUND_FILENAME);

(async () => {
  initConsole();
  await createPlaygroundFileIfNeeded(playgroundFile);
  const replService = createReplService();
  await execute(playgroundFile, replService);
  const watcher = await setupWatch(playgroundFile, () =>
    execute(playgroundFile, replService),
  );

  process.on("SIGINT", () => {
    watcher.close();

    console.log(chalk.green("Bye bye 👋"));
    process.exit(0);
  });
})();

function initConsole() {
  console.clear();
  console.log(chalk.bold("🔥 BonFHIR Playground 🎢"));
  console.log(chalk.dim("Press Ctrl+C to exit"));
  console.log();
}

async function createPlaygroundFileIfNeeded(file: string) {
  if (!existsSync(file)) {
    await writeFile(
      file,
      `// BonFHIR Playground
//
// You can edit this file in your favorite editor.
// When saved, the watcher pick it up, and automatically executes all the lines below the previous
// end of execution line.
//
${END_OF_EXECUTION}

// Import the whole core library
import * as core from "@bonfhir/core/r4b";

// Create a client connected to the local BonFHIR server
const client = new core.FetchFhirClient({
  baseUrl: "http://localhost:8103/fhir/R4/",
  auth: {
    tokenUrl: "http://localhost:8103/oauth2/token",
    clientId: "f54370de-eaf3-4d81-a17e-24860f667912",
    clientSecret:
      "75d8e7d06bf9283926c51d5f461295ccf0b69128e983b6ecdd5a9c07506895de",
  },
});
  `,
      { encoding: "utf8" },
    );

    console.log();
    console.log(
      chalk.green(
        `Playground file ${file} created. Please open in your favorite code editor!`,
      ),
    );
    console.log();
  }
}

function createReplService(): ReplService {
  const repl = createRepl();
  const service = create({
    ...repl.evalAwarePartialHost,
    esm: true,
    swc: true,
    transpileOnly: true,
    experimentalSpecifierResolution: "node",
  });
  repl.setService(service);
  repl.start();
  return repl;
}

async function execute(file: string, replService: ReplService) {
  const content = await readFile(file, "utf8");
  const newContent: string[] = [];
  let endOfExecutionLineNumber = 0;
  for (const [lineNumber, line] of content.split(/\r?\n/).entries()) {
    if (!endOfExecutionLineNumber) {
      if (line.startsWith(END_OF_EXECUTION)) {
        endOfExecutionLineNumber = lineNumber;
      } else {
        newContent.push(line);
      }
      continue;
    }

    if (!line.trim()) {
      newContent.push(line);
      continue;
    }

    try {
      const result = await replService.evalCode(line);
      console.log({ result });
      newContent.push(line);
      if (result) {
        //newContent.push(`// >>> ${JSON.stringify(result, undefined, 2)}`);
        newContent.push(`// >>> ${result}`);
      }
    } catch (error: unknown) {
      newContent.push(`// ${line}`, `// ERROR: ${error}`);
    }
  }
  newContent.push(END_OF_EXECUTION);

  // const prettierConfig = await prettier.resolveConfig(file);
  // const formattedFile = await prettier.format(newContent.join("\n"), {
  //   ...prettierConfig,
  //   parser: "typescript",
  // });
  const formattedFile = newContent.join("\n");

  setTimeout(async () => {
    await writeFile(file, formattedFile, { encoding: "utf8" });
  }, 2000);
}

async function setupWatch(
  file: string,
  fn: () => Promise<void>,
): Promise<FSWatcher> {
  let previousHash = await hash(file);
  let fsWait: NodeJS.Timeout | undefined;
  return watch(file, (_, filename) => {
    if (!filename) {
      return;
    }

    if (fsWait) {
      clearTimeout(fsWait);
    }

    fsWait = setTimeout(async () => {
      const currentHash = await hash(file);
      if (previousHash !== currentHash) {
        await fn();
        previousHash = await hash(file);
      }
      fsWait = undefined;
    }, 300);
  });
}

async function hash(file: string) {
  return createHash("md5")
    .update(await readFile(file))
    .digest("hex");
}
