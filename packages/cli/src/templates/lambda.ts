import chalk from "chalk";
import { Listr, ListrTask } from "listr2";

import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { TemplateOptions } from "../commands/create";
import { Template } from "./template";
import {
  FhirServerType,
  fetchFhirClientConfig,
  packageJsonFhirServerScripts,
} from "./utils/fhir-servers";
import { PackageManager } from "./utils/package-manager";

export interface Context {
  options: TemplateOptions;
  monorepo?: string;
}

export const Lambda: Template = {
  name: "lambda",
  description:
    "An AWS Lambda serverless application connected to a FHIR Server.",
  async handler(options) {
    await new Listr<Context>(LambdaTasks()).run({ options });

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
  },
};

export const LambdaTasks = (): ListrTask<Context>[] => [
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
    title: "Create Lambda project",
    task: async ({
      options: { cwd, name, packageManager, fhirServer },
      monorepo,
    }) => {
      await mkdir(`${cwd}/src/subscriptions`, { recursive: true });

      if (!monorepo) {
        await writeFile(`${cwd}/.editorconfig`, EDITORCONFIG_CONTENT, "utf8");
        await writeFile(`${cwd}/.gitignore`, GITIGNORE_CONTENT, "utf8");
      }
      await writeFile(
        `${cwd}/package.json`,
        PACKAGE_JSON_CONTENT(name, fhirServer, monorepo),
        "utf8",
      );

      await writeFile(
        `${cwd}/serverless.yml`,
        SERVERLESS_CONTENT(name, packageManager.packageManager),
        "utf8",
      );
      await writeFile(
        `${cwd}/tsconfig.json`,
        monorepo
          ? `{
        "extends": "@${monorepo}/tsconfig/tsconfig.json",
        "include": ["src/**/*"]
      }`
          : TSCONFIG_CONTENT,
        "utf8",
      );

      await writeFile(
        `${cwd}/src/subscriptions/index.ts`,
        SUBSCRIPTIONS_INDEX_CONTENT(fhirServer),
        "utf8",
      );
      await writeFile(
        `${cwd}/src/subscriptions/communication-requests.ts`,
        SUBSCRIPTIONS_COMMUNICATIONS_REQUEST_CONTENT,
        "utf8",
      );
    },
  },
  {
    title: "Add dependencies",
    task: async ({ options: { cwd, packageManager }, monorepo }) => {
      await packageManager.install(cwd);
      await packageManager.add(
        cwd,
        "@bonfhir/aws-lambda",
        "@bonfhir/core",
        "@bonfhir/subscriptions",
      );
      await packageManager.addDev(
        cwd,
        "@types/aws-lambda",
        "@types/node",
        "@typescript-eslint/eslint-plugin",
        "@typescript-eslint/parser",
        "eslint",
        "eslint-config-prettier",
        "prettier",
        "prettier-plugin-organize-imports",
        "serverless@^3",
        "serverless-esbuild@^1",
        "serverless-offline@^13",
        "typescript",
        monorepo ? `@${monorepo}/eslint-config-custom` : "",
        monorepo ? `@${monorepo}/tsconfig` : "",
        monorepo ? `@${monorepo}/fhir` : "",
      );
    },
  },
  {
    title: "Format all files",
    task: async ({ options: { cwd, packageManager } }) => {
      await packageManager.runPrettier(cwd);
    },
  },
];

const GITIGNORE_CONTENT = `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
jspm_packages
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Serverless directories
.serverless
.build
.esbuild
`;

const EDITORCONFIG_CONTENT = `
[*]
end_of_line = lf
insert_final_newline = true

[*.{js,jsx,ts,tsx,json,yml}]
charset = utf-8
indent_style = space
indent_size = 2
`;

const PACKAGE_JSON_CONTENT = (
  name: string,
  fhirServer?: FhirServerType,
  monorepo?: string,
) =>
  JSON.stringify(
    {
      name,
      version: "0.1.0",
      private: true,
      type: "module",
      scripts: {
        dev: "serverless offline start --reloadHandler",
        build: "serverless package",
        lint: "prettier --check ./src && eslint ./src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
        format: "prettier --write ./src",
        deploy: "serverless deploy",
        "register-subscriptions":
          "curl -i --request POST 'http://localhost:6000/fhir/subscriptions/register' --header 'X-Subscription-Auth: secret'",
        ...(monorepo
          ? undefined
          : packageJsonFhirServerScripts(name, fhirServer)),
      },
      prettier: {
        plugins: ["prettier-plugin-organize-imports"],
      },
      eslintConfig: monorepo
        ? {
            env: { node: true, es2020: true },
            extends: ["@${monorepo}/eslint-config"],
            ignorePatterns: ["dist", ".serverless"],
          }
        : {
            env: { node: true, es2020: true },
            ignorePatterns: ["dist", ".serverless"],
            parser: "@typescript-eslint/parser",
            plugins: ["@typescript-eslint/eslint-plugin"],
            extends: ["prettier"],
          },
    },
    undefined,
    2,
  );

const SERVERLESS_CONTENT = (
  name: string,
  packageManager: PackageManager,
) => `service: "${name.replace("@", "").replace("/", "-")}"
frameworkVersion: "3"

provider:
  name: aws
  runtime: nodejs18.x

functions:
  subscriptions:
    handler: src/subscriptions/index.handler
    events:
      - httpApi:
          path: /fhir/subscriptions/{endpoint+}
          method: any

plugins:
  - serverless-esbuild
  - serverless-offline

custom:
  esbuild:
    format: esm
    outputFileExtension: .mjs
    packager: ${packageManager}
  serverless-offline:
    httpPort: 6000
    host: 0.0.0.0
`;

const TSCONFIG_CONTENT = `{
  "compilerOptions": {
    "lib": ["es2020", "DOM"],
    "moduleResolution": "Bundler",
    "module": "ES2020",
    "skipLibCheck": true
  }
}
`;

const SUBSCRIPTIONS_INDEX_CONTENT = (
  fhirServer?: FhirServerType,
) => `import { fhirSubscriptionHandler } from "@bonfhir/aws-lambda/r4b";
import { FetchFhirClient } from "@bonfhir/core/r4b";
import { communicationRequests } from "./communication-requests.js";

export const handler = fhirSubscriptionHandler({
  /**
   * The following lines connect to a local FHIR server
   */
  fhirClient: () =>
    new FetchFhirClient(${JSON.stringify(fetchFhirClientConfig(fhirServer))}),
  baseUrl: process.env.APP_BASE_URL || "http://host.docker.internal:6000",
  webhookSecret: process.env.FHIR_SUBSCRIPTION_SECRET || "secret",
  subscriptions: [communicationRequests],
});
`;

const SUBSCRIPTIONS_COMMUNICATIONS_REQUEST_CONTENT = `import { CommunicationRequest } from "@bonfhir/core/r4b";
import { FhirSubscription } from "@bonfhir/subscriptions/r4b";

export const communicationRequests: FhirSubscription<CommunicationRequest> = {
  criteria: "CommunicationRequest?",
  reason: "Send communication requests",
  endpoint: "communication-requests",
  async handler({ resource, logger }) {
    logger?.info(resource);
  },
};
`;
