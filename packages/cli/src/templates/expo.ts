import chalk from "chalk";
import { Listr } from "listr2";
import { exec } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import { TemplateOptions } from "../commands/create";
import { Template } from "./template";
import { modifyJsonFile } from "./utils/modify-json-file";

const execAsync = promisify(exec);
export interface ExpoContext {
  options: TemplateOptions;
}

export const Expo: Template = {
  name: "expo",
  description: "A new expo typescript project with gluestack-ui renderer",
  async handler(options) {
    await new Listr<ExpoContext>([
      {
        title: "Create directory",
        task: async ({ options: { cwd } }, task) => {
          task.title += ` ${cwd}`;
          if (existsSync(cwd)) {
            throw new Error(`Directory ${cwd} already exists`);
          }
          await execAsync(
            `npx -y create-expo-app ${cwd} -t expo-template-blank-typescript`,
          );
        },
      },
      {
        title: "Create Expo project",
        task: async ({ options: { cwd } }) => {
          const appJsonFilePath = `${cwd}/app.json`;
          await modifyJsonFile(appJsonFilePath, (config) => {
            config.expo.jsEngine = "jsc";
            return config;
          });

          const tsConfigFilePath = `${cwd}/tsconfig.json`;
          await modifyJsonFile(tsConfigFilePath, (config) => {
            config.extends = "expo/tsconfig.base";
            config.compilerOptions = {
              moduleResolution: "bundler",
              strict: true,
            };
            return config;
          });

          const packageJsonFilePath = `${cwd}/package.json`;
          await modifyJsonFile(packageJsonFilePath, (config) => {
            config.scripts.format = "prettier --write .";
            return config;
          });

          try {
            const babelConfigFilePath = `${cwd}/babel.config.js`;
            const data = await readFile(babelConfigFilePath, "utf8");
            const updatedConfig = data.replace(
              `presets: ['babel-preset-expo'],`,
              `presets: ['babel-preset-expo'],
              plugins: [
                ["@babel/plugin-transform-private-methods", { "loose": true }],
              ],`,
            );
            await writeFile(babelConfigFilePath, updatedConfig, "utf8");
          } catch (error) {
            console.error(
              "Error reading or writing the babel.config.js file:",
              error,
            );
          }

          await writeFile(`${cwd}/App.tsx`, APP_TSX_CONTENT, "utf8");
          await writeFile(
            `${cwd}/metro.config.js`,
            METRO_CONFIG_CONTENT,
            "utf8",
          );
          await writeFile(
            `${cwd}/PatientComponent.tsx`,
            PATIENT_COMPONENT_CONTENT,
            "utf8",
          );

          await writeFile(
            `${cwd}/.prettierignore`,
            PRETTIER_IGNORE_CONTENT,
            "utf8",
          );
        },
      },
      {
        title: "Add dependencies",
        task: async ({ options: { cwd, packageManager } }) => {
          await packageManager.install(cwd);
          await packageManager.add(
            cwd,
            "@bonfhir/core",
            "@bonfhir/query",
            "@bonfhir/react",
            "@bonfhir/gluestack-ui",
            "@gluestack-style/react",
            "@gluestack-ui/themed",
            "@gluestack-ui/config",
            "@legendapp/motion",
            "react-dom",
            "react-native-web",
            "@expo/webpack-config",
          );

          await packageManager.addDev(cwd, "@types/react-native", "prettier");
        },
      },
      {
        title: "Format all files",
        task: async ({ options: { cwd, packageManager } }) => {
          await packageManager.runPrettier(cwd, ".");
        },
      },
      {
        title: "Commit bonFHIR setup changes",
        task: async ({ options: { cwd } }) => {
          await execAsync(`git add .`, { cwd });
          await execAsync(`git commit -m "Setup bonFHIR"`, { cwd });
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
    console.log(`npx expo start`);
    console.log();
  },
};

const APP_TSX_CONTENT = `import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { FetchFhirClient } from "@bonfhir/core/r4b";
import { FhirQueryProvider } from "@bonfhir/query/r4b";
import { GluestackUIRenderer } from "@bonfhir/gluestack-ui/r4b";
import { FhirUIProvider } from "@bonfhir/react/r4b";
import { GluestackUIProvider, Text } from "@gluestack-ui/themed";
import { config as gluestackUIConfig } from "@gluestack-ui/config";

import PatientComponent from "./PatientComponent";

const client = new FetchFhirClient({
  baseUrl: "http://localhost:8103/fhir/R4/",
  auth: {
    tokenUrl: "http://localhost:8103/oauth2/token",
    clientId: "f54370de-eaf3-4d81-a17e-24860f667912",
    clientSecret:
      "75d8e7d06bf9283926c51d5f461295ccf0b69128e983b6ecdd5a9c07506895de",
  },
});

export default function App() {
  return (
    <FhirQueryProvider fhirClient={client}>
      <GluestackUIProvider config={gluestackUIConfig}>
        <FhirUIProvider renderer={GluestackUIRenderer}>
          <SafeAreaView>
            <PatientComponent />
            <Text>This is a FhirValue Component ^</Text>
            <StatusBar style="auto" />
          </SafeAreaView>
        </FhirUIProvider>
      </GluestackUIProvider>
    </FhirQueryProvider>
  );
}`;

const PATIENT_COMPONENT_CONTENT = `import { FhirValue } from "@bonfhir/react/r4b";
import { useFhirSearch } from "@bonfhir/query/r4b";
import { Text } from "@gluestack-ui/themed";

export default function PatientComponent() {
  const patientsSearchQuery = useFhirSearch("Patient", (search) =>
    search
      ._include("Patient", "organization")
      ._sort("-_lastUpdated")
      ._count(20)
      ._total("accurate")
  );

  const patientData = patientsSearchQuery.data?.searchMatch()[0];

  if (patientsSearchQuery.isLoading) {
    return <Text>Loading...</Text>;
  }

  if (patientsSearchQuery.error) {
    return <Text>{JSON.stringify(patientsSearchQuery, null, 2)}</Text>;
  }

  return <FhirValue type="HumanName" value={patientData?.name} />;
}
`;

const METRO_CONFIG_CONTENT = `// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Enable Package Exports
config.resolver = {
  ...config.resolver,
  sourceExts: [
    ...config.resolver.sourceExts,
    "mjs"
  ],
  unstable_enablePackageExports: true,
};

module.exports = config;`;

const PRETTIER_IGNORE_CONTENT = `# Ignore artifacts:
.expo
.assets
node_modules
package-lock.json
.gitignore
`;
