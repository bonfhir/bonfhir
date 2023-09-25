import chalk from "chalk";
import { Listr } from "listr2";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";

import { TemplateOptions } from "../commands/create";
import { PackageManagerHandler } from "./package-manager";
import { Template } from "./template";

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
        task: async ({ options: { cwd, name, packageManager } }) => {
          await mkdir(`${cwd}/src`, { recursive: true });
          await writeFile(`${cwd}/tsconfig.json`, TSCONFIG_CONTENT, "utf8");
          await writeFile(
            `${cwd}/package.json`,
            PACKAGE_JSON_CONTENT(name),
            "utf8",
          );
          await writeFile(
            `${cwd}/src/fhir-client.ts`,
            FHIR_CLIENT_CONTENT(packageManager),
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

const PACKAGE_JSON_CONTENT = (name: string) => `{
  "name": "${name}",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "nodemon",
    "start": "node --loader ts-node/esm --no-warnings src/index.ts",
    "start-fhir-server": "docker run -p 8100:8100 -p 8103:8103 -v ${name}_fhir_data:/var/lib/postgresql/15/main -v ${name}_fhir_files:/usr/src/medplum/packages/server/dist/binary --name ${name}_fhir_server --rm -d ghcr.io/bonfhir/medplum-devbox:latest",
    "stop-fhir-server": "docker stop ${name}_fhir_server",
    "add-sample-data": "npx @bonfhir/cli import --source synthea-sample --fhir r4b --base-url http://localhost:8103/fhir/R4/ --auth-token-url http://localhost:8103/oauth2/token --auth-client-id f54370de-eaf3-4d81-a17e-24860f667912 --auth-client-secret 75d8e7d06bf9283926c51d5f461295ccf0b69128e983b6ecdd5a9c07506895de"
  },
  "nodemonConfig": {
    "exec": "node --loader ts-node/esm --no-warnings src/index.ts",
    "ext": "ts",
    "quiet": true,
    "watch": "src"
  }
}
`;

const FHIR_CLIENT_CONTENT = (
  packageManager: PackageManagerHandler,
) => `import { FetchFhirClient } from "@bonfhir/core/r4b";

/**
 * The following lines connect to a local
 * Medplum Devbox FHIR server
 * https://bonfhir.dev/docs/medplum-devbox
 * 
 * Use \`${packageManager.packageManager} run start-fhir-server\` to start the server locally using Docker.
 */
export const client = new FetchFhirClient({
  baseUrl: "http://localhost:8103/fhir/R4/",
  auth: {
    tokenUrl: "http://localhost:8103/oauth2/token",
    clientId: "f54370de-eaf3-4d81-a17e-24860f667912",
    clientSecret:
      "75d8e7d06bf9283926c51d5f461295ccf0b69128e983b6ecdd5a9c07506895de",
  },
});
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
