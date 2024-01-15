import chalk from "chalk";
import { Listr } from "listr2";

import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { TemplateOptions } from "../commands/create";
import { LambdaTasks } from "./lambda";
import { Template } from "./template";
import { packageJsonFhirServerScripts } from "./utils/fhir-servers";
import { PackageManager } from "./utils/package-manager";
import { ViteTasks } from "./vite";

export interface Context {
  options: TemplateOptions;
}

export const Monorepo: Template = {
  name: "monorepo",
  description:
    "A Monorepo with a Web app (SPA), an AWS Lambda API, and supporting packages. This for more advanced projects.",
  async handler(options) {
    if (options.packageManager.packageManager !== "pnpm") {
      throw new Error(`Only pnpm is supported at this time.`);
    }

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
        title: "Create root project",
        task: async ({ options: { cwd, name, packageManager } }) => {
          await mkdir(`${cwd}/apps`, { recursive: true });
          await writeFile(`${cwd}/.editorconfig`, EDITORCONFIG_CONTENT, "utf8");
          await writeFile(`${cwd}/.gitignore`, GITIGNORE_CONTENT, "utf8");
          await writeFile(`${cwd}/.npmrc`, NPMRC_CONTENT, "utf8");
          await writeFile(
            `${cwd}/package.json`,
            ROOT_PACKAGE_JSON_CONTENT(name, packageManager.packageManager),
            "utf8",
          );
          if (packageManager.packageManager === "pnpm") {
            await writeFile(
              `${cwd}/pnpm-workspace.yaml`,
              PNPM_WORKSPACE_CONTENT,
              "utf8",
            );
          }
          await writeFile(`${cwd}/turbo.json`, TURBO_CONTENT, "utf8");
          await packageManager.install(cwd);
        },
      },
      {
        title: "Create packages",
        task: async ({ options: { cwd, name, packageManager } }) => {
          await mkdir(`${cwd}/packages/tsconfig`, { recursive: true });
          await writeFile(
            `${cwd}/packages/tsconfig/package.json`,
            TSCONFIG_PACKAGE_CONTENT(name),
            "utf8",
          );
          await writeFile(
            `${cwd}/packages/tsconfig/tsconfig.json`,
            TSCONFIG_TSCONFIG_CONTENT,
            "utf8",
          );

          await mkdir(`${cwd}/packages/eslint-config-custom`, {
            recursive: true,
          });
          await writeFile(
            `${cwd}/packages/eslint-config-custom/package.json`,
            ESLINT_PACKAGE_CONTENT(name),
            "utf8",
          );
          await writeFile(
            `${cwd}/packages/eslint-config-custom/index.cjs`,
            ESLINT_INDEX_CONTENT,
            "utf8",
          );
          await packageManager.add(
            `${cwd}/packages/eslint-config-custom`,
            "@typescript-eslint/eslint-plugin",
            "@typescript-eslint/parser",
            "eslint-config-prettier",
            "eslint-plugin-react",
            "eslint-config-turbo",
            "prettier",
            "typescript",
          );

          await mkdir(`${cwd}/packages/fhir/src`, {
            recursive: true,
          });

          await writeFile(
            `${cwd}/packages/fhir/package.json`,
            FHIR_PACKAGE_CONTENT(name),
            "utf8",
          );

          await writeFile(
            `${cwd}/packages/fhir/tsconfig.json`,
            FHIR_TSCONFIG_CONTENT,
            "utf8",
          );

          await writeFile(
            `${cwd}/packages/fhir/src/index.ts`,
            `export * from "./patient";
            `,
            "utf8",
          );

          await writeFile(
            `${cwd}/packages/fhir/src/patient.ts`,
            FHIR_PATIENT_CONTENT,
            "utf8",
          );

          await packageManager.add(`${cwd}/packages/fhir`, "@bonfhir/core");
          await packageManager.addDev(
            `${cwd}/packages/fhir`,
            `@${name}/eslint-config-custom`,
            `@${name}/tsconfig`,
            "eslint",
            "eslint-config-prettier",
            "prettier",
            "prettier-plugin-organize-imports",
            "rimraf",
            "typescript",
          );
        },
      },
      {
        title: "Create web app",
        task: async ({ options: { cwd, name, packageManager } }, task) => {
          return task.newListr(ViteTasks(), {
            ctx: {
              options: {
                cwd: `${cwd}/apps/web`,
                name: `@${name}/web`,
                packageManager,
                template: "vite",
                fhirServer: undefined,
              },
              monorepo: name,
            },
          });
        },
      },
      {
        title: "Create api app",
        task: async ({ options: { cwd, name, packageManager } }, task) => {
          return task.newListr(LambdaTasks(), {
            ctx: {
              options: {
                cwd: `${cwd}/apps/api`,
                name: `@${name}/api`,
                packageManager,
                template: "lambda",
                fhirServer: undefined,
              },
              monorepo: name,
            },
          });
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
    console.log(`${options.packageManager.packageManager} run build`);
    console.log();
  },
};

const EDITORCONFIG_CONTENT = `root = true

[*]
end_of_line = lf
insert_final_newline = true

[*.{js,jsx,ts,tsx,json,yml}]
charset = utf-8
indent_style = space
indent_size = 2
`;

const GITIGNORE_CONTENT = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
node_modules
.pnp
.pnp.js

# testing
coverage

# builds
.next/
out/
build
.build
.serverless
.esbuild

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# turbo
.turbo

# vercel
.vercel
`;

const NPMRC_CONTENT = `auto-install-peers = true
`;

const ROOT_PACKAGE_JSON_CONTENT = (
  name: string,
  packageManager: PackageManager,
) =>
  JSON.stringify(
    {
      name,
      private: true,
      scripts: {
        build: "turbo run build",
        dev: "turbo run dev",
        lint: "turbo run lint",
        format: "turbo run format",
        ...packageJsonFhirServerScripts(
          name,
          "medplum",
          "http://localhost:5173",
        ),
      },
      devDependencies: {
        turbo: "latest",
      },
      workspaces:
        packageManager === "npm" ? ["apps/*", "packages/*"] : undefined,
    },
    undefined,
    2,
  );

const PNPM_WORKSPACE_CONTENT = `packages:
- "apps/*"
- "packages/*"
`;

const TURBO_CONTENT = `{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
`;

const TSCONFIG_PACKAGE_CONTENT = (name: string) => `{
  "name": "@${name}/tsconfig",
  "version": "0.0.0",
  "private": true
}
`;

const TSCONFIG_TSCONFIG_CONTENT = `{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Default",
  "compilerOptions": {
    "composite": false,
    "declaration": true,
    "declarationMap": true,
    "forceConsistentCasingInFileNames": true,
    "inlineSources": false,
    "isolatedModules": true,
    "module": "ES2020",
    "moduleResolution": "Bundler",
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "preserveWatchOutput": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "ES2020"
  },
  "exclude": ["node_modules"]
}
`;

const ESLINT_PACKAGE_CONTENT = (name: string) => `{
  "name": "@${name}/eslint-config-custom",
  "version": "0.0.0",
  "private": true,
  "main": "index.cjs",
  "dependencies": {
    "eslint-config-next": "^13.4.1",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-react": "7.28.0",
    "eslint-config-turbo": "^1.9.3"
  }
}
`;

const ESLINT_INDEX_CONTENT = `
/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  root: true,
  extends: ["eslint:recommended", "turbo", "prettier"],
  ignorePatterns: [
    "**/{.cache,.parcel-cache,coverage,dist,node_modules}/*",
    "dist",
    ".eslintrc.cjs",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint/eslint-plugin"],
  rules: {},
};
`;

const FHIR_PACKAGE_CONTENT = (name: string) => `{
  "name": "@${name}/fhir",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "clean": "rimraf dist",
    "lint": "prettier --check ./src && eslint ./src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write ./src",
    "watch": "tsc --watch"
  },
  "prettier": {
    "plugins": [
      "prettier-plugin-organize-imports"
    ]
  },
  "eslintConfig": {
    "env": {
      "es2020": true
    },
    "extends": [
      "@${name}/eslint-config"
    ],
    "ignorePatterns": [
      "dist"
    ]
  }
}
`;

const FHIR_TSCONFIG_CONTENT = `{
  "extends": "@sample-monorepo/tsconfig/tsconfig.json",
  "include": [
    "src/**/*"
  ],
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "outDir": "dist/"
  }
}`;

const FHIR_PATIENT_CONTENT = `import { extendResource } from "@bonfhir/core/r4b"

export const CustomPatient = extendResource("Patient", {
  // Custom tags and extension goes here.
});

export type CustomPatient = InstanceType<typeof CustomPatient>;
`;
