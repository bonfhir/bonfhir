import chalk from "chalk";
import { Listr } from "listr2";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";

import { TemplateOptions } from "../commands/create";
import { Template } from "./template";
import {
  FhirServerType,
  fetchFhirClientConfig,
  packageJsonFhirServerScripts,
} from "./utils/fhir-servers";
import { PackageManagerHandler } from "./utils/package-manager";

export interface Context {
  options: TemplateOptions;
}

export const Playground: Template = {
  name: "playground",
  description: "A simple playground to get started playing with bonFHIR core.",
  async handler(options) {
    await new Listr<Context>([
      {
        title: "Create directory",
        task: async ({ options: { cwd } }, task) => {
          task.title += ` ${cwd}`;
          if (existsSync(cwd)) {
            throw new Error(`Directory ${cwd} already exists`);
          }
          await mkdir(cwd);
        },
      },
      {
        title: "Create Playground project",
        task: async ({
          options: { cwd, name, packageManager, fhirServer },
        }) => {
          await mkdir(`${cwd}/src`, { recursive: true });
          await writeFile(`${cwd}/tsconfig.json`, TSCONFIG_CONTENT, "utf8");
          await writeFile(
            `${cwd}/package.json`,
            PACKAGE_JSON_CONTENT(name, fhirServer),
            "utf8",
          );
          await writeFile(
            `${cwd}/src/fhir-client.ts`,
            FHIR_CLIENT_CONTENT(packageManager, fhirServer),
            "utf8",
          );
          await writeFile(`${cwd}/src/index.ts`, INDEX_CONTENT, "utf8");
        },
      },
      {
        title: "Add dependencies",
        task: async ({ options: { cwd, packageManager } }) => {
          await packageManager.install(cwd);
          await packageManager.add(cwd, "@bonfhir/core");
          await packageManager.addDev(
            cwd,
            "@types/node",
            "@types/react-dom",
            "nodemon",
            "ts-node",
            "typescript",
          );
        },
      },
      {
        title: "Format all files",
        task: async ({ options: { cwd, packageManager } }) => {
          await packageManager.runPrettier(cwd);
        },
      },
    ]).run({ options });

    console.log();
    console.log(
      chalk.green(`🔥 Successfully created project ${options.name}.`),
    );
    console.log();
    console.log(`To get started, run the following commands:`);
    console.log();
    console.log(`cd ${options.name}`);
    console.log(`${options.packageManager.packageManager} run dev`);
    console.log();
    console.log(`...and start editing ${options.name}/src/index.ts`);
    console.log();
  },
};

const TSCONFIG_CONTENT = `{
  "compilerOptions": {
    "composite": false,
    "declaration": true,
    "declarationMap": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "inlineSources": false,
    "isolatedModules": true,
    "module": "ES2022",
    "moduleResolution": "Bundler",
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "preserveWatchOutput": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "ES2022"
  },
  "include": ["src"],
  "exclude": ["node_modules"],
  "ts-node": {
    "esm": true,
    "transpileOnly": true,
    "experimentalSpecifierResolution": "node"
  }
}
`;

const PACKAGE_JSON_CONTENT = (name: string, fhirServer?: FhirServerType) =>
  JSON.stringify(
    {
      name,
      version: "0.1.0",
      private: true,
      type: "module",
      scripts: {
        dev: "nodemon",
        start: "node --loader ts-node/esm --no-warnings src/index.ts",
        ...packageJsonFhirServerScripts(name, fhirServer),
      },
      nodemonConfig: {
        exec: "node --loader ts-node/esm --no-warnings src/index.ts",
        ext: "ts",
        quiet: true,
        watch: "src",
      },
    },
    undefined,
    2,
  );

const FHIR_CLIENT_CONTENT = (
  packageManager: PackageManagerHandler,
  fhirServer?: FhirServerType,
) => `import { FetchFhirClient } from "@bonfhir/core/r4b";

/**
 * The following lines connect to a local FHIR server
 * 
 * Use \`${
   packageManager.packageManager
 } run fhir:start-server\` to start the server locally using Docker.
 */
export const client = new FetchFhirClient(${JSON.stringify(
  fetchFhirClientConfig(fhirServer),
)});
`;

const INDEX_CONTENT = `/**
* This is the entry point of the application.
* You can use this as a playground to experiment with bonFHIR core.
*/

import { inspect } from "util";
import {
 build,
 duration,
 Formatter,
 isResource,
 reference,
 today,
} from "@bonfhir/core/r4b";
import { client } from "./fhir-client";

// Let's organize the output
console.log();
console.log("--------------------");

/** Print a complete object on the console. */
function print(object: any) {
 console.log(
   inspect(object, {
     depth: null,
     colors: true,
     showProxy: false,
     showHidden: false,
   })
 );
 console.log();
}

/** Playground starts here */

`;
