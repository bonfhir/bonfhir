import { existsSync, readFileSync, watch } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import repl from "node:repl";
import { format as prettier } from "prettier";

const playgroundFile = join(
  fileURLToPath(new URL(".", import.meta.url)),
  "playground.ts",
);

const END_OF_EXECUTION = "// --------- End of execution ---------";

console.clear();
console.log(chalk.bold("🔥 BonFHIR Playground 🎢"));
console.log();

if (!existsSync(playgroundFile)) {
  console.log(
    chalk.gray(`Playground file ${playgroundFile} not found. creating...`),
  );
  writeFile(
    playgroundFile,
    `// BonFHIR Playground
//
// You can edit this file in your favorite editor.
// When saved, the watcher pick it up, and automatically executes all the lines below the previous
// end of execution line.
//
${END_OF_EXECUTION}
`,
    { encoding: "utf8" },
  );

  console.log();
  console.log(
    chalk.green(
      `Playground file ${playgroundFile} created. Please open in your favorite code editor!`,
    ),
  );
  console.log();
}

const replServer = repl.start({
  terminal: false,
  writer: (output) => {
    console.log("Writer!!" + output);
    return output;
  },
});

let previousHash: string | undefined;

async function execute() {
  const content = await readFile(playgroundFile, "utf8");
  const newContent: string[] = [];
  let endOfExecutionLineNumber = 0;
  for (const [lineNumber, line] of content.split(/\r?\n/).entries()) {
    console.log(chalk.grey("Reading " + line));
    if (!endOfExecutionLineNumber) {
      if (line.startsWith(END_OF_EXECUTION)) {
        endOfExecutionLineNumber = lineNumber;
      } else {
        newContent.push(line);
      }
      continue;
    }

    console.log(chalk.grey("Executing " + line));
    replServer.input.emit("data", line);
    newContent.push(line);
  }
  newContent.push(END_OF_EXECUTION);

  console.log(chalk.grey("newContent " + newContent.join("\n")));

  const formattedFile = await prettier(newContent.join("\n"), {
    parser: "typescript",
  });
  await writeFile(playgroundFile, formattedFile, { encoding: "utf8" });
  previousHash = createHash("md5")
    .update(await readFile(playgroundFile))
    .digest("hex");
}

(async () => {
  await execute();
  let fsWait: NodeJS.Timeout | boolean = false;
  const watcher = watch(playgroundFile, (_, filename) => {
    if (filename) {
      if (fsWait) return;
      fsWait = setTimeout(() => {
        fsWait = false;
      }, 2000);
      const currentHash = createHash("md5")
        .update(readFileSync(playgroundFile))
        .digest("hex");
      if (currentHash === previousHash) {
        return;
      }
      previousHash = currentHash;
      execute();
    }
  });

  console.log();
  console.log(chalk.green(`Watching ${playgroundFile} for changes...`));

  process.on("SIGINT", () => {
    replServer.close();
    watcher.close();

    console.log(chalk.green("Bye bye 👋"));
    process.exit(0);
  });
})();