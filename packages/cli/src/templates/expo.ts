import chalk from "chalk";
import { Listr } from "listr2";
import { exec } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import * as semver from "semver";
import { TemplateOptions } from "../commands/create";
import { Template } from "./template";
import { modifyJsonFile } from "./utils/modify-json-file";

const execAsync = promisify(exec);
export interface ExpoContext {
  options: TemplateOptions;
  expoVersion?: semver.SemVer | null | undefined;
}

export const Expo: Template = {
  name: "expo",
  description:
    "A new expo typescript project with gluestack-ui renderer, expo router and expo auth session.",
  async handler(options) {
    await new Listr<ExpoContext>([
      {
        title: "Create expo app",
        task: async (context, task) => {
          task.title += ` ${context.options.cwd}`;
          if (existsSync(context.options.cwd)) {
            throw new Error(`Directory ${context.options.cwd} already exists`);
          }
          await execAsync(
            `npx -y create-expo-app ${context.options.cwd} -t expo-template-blank-typescript`,
          );

          const packageJson = JSON.parse(
            await readFile(`${context.options.cwd}/package.json`, "utf8"),
          );
          context.expoVersion = semver.coerce(packageJson.dependencies.expo);
        },
      },
      {
        title: "Add Expo router and Auth session packages",
        task: async ({ options: { cwd }, expoVersion }) => {
          // Router dependencies are different based on expo version
          // https://docs.expo.dev/router/installation/#install-dependencies
          await (expoVersion!.major >= 50
            ? execAsync(
                `npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar`,
                {
                  cwd,
                },
              )
            : execAsync(
                `npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar react-native-gesture-handler`,
                {
                  cwd,
                },
              ));

          await execAsync(`npx expo install expo-auth-session expo-crypto`, {
            cwd,
          });
        },
      },
      {
        title: "Add bonFHIR dependencies",
        task: async ({ options: { cwd, packageManager } }) => {
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

          await packageManager.addDev(
            cwd,
            "prettier",
            "prettier-plugin-organize-imports",
            "eslint",
            "eslint-config-prettier",
            "eslint-config-universe",
          );
        },
      },
      {
        title: "Setup Expo project",
        task: async ({
          options: { cwd, name, packageManager },
          expoVersion,
        }) => {
          await modifyJsonFile(`${cwd}/app.json`, (config) => ({
            ...config,
            expo: {
              ...config.expo,
              web: {
                ...config.expo.web,
                bundler: "metro",
              },
              jsEngine: "jsc",
              scheme: name,
            },
          }));

          await modifyJsonFile(`${cwd}/tsconfig.json`, (config) => ({
            ...config,
            compilerOptions: {
              ...config.compilerOptions,
              moduleResolution: "bundler",
              strict: true,
            },
          }));

          await modifyJsonFile(`${cwd}/package.json`, (config) => ({
            ...config,
            main: "expo-router/entry",
            scripts: {
              ...config.scripts,
              lint: "prettier --check ./src && eslint ./src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
              format: "prettier --write ./src",
              "start-fhir-server": `docker run -p 8100:8100 -p 8103:8103 -v ${name}_fhir_data:/var/lib/postgresql/15/main -v ${name}_fhir_files:/usr/src/medplum/packages/server/dist/binary --name ${name}_fhir_server --rm -d ghcr.io/bonfhir/medplum-devbox:latest`,
              "stop-fhir-server": `docker stop ${name}_fhir_server`,
              "add-sample-data":
                "npx @bonfhir/cli import --source synthea-sample --fhir r4b --base-url http://localhost:8103/fhir/R4/ --auth-token-url http://localhost:8103/oauth2/token --auth-client-id f54370de-eaf3-4d81-a17e-24860f667912 --auth-client-secret 75d8e7d06bf9283926c51d5f461295ccf0b69128e983b6ecdd5a9c07506895de",
            },
            prettier: {
              plugins: ["prettier-plugin-organize-imports"],
            },
            eslintConfig: {
              root: true,
              extends: ["universe/native", "prettier"],
            },
            // https://docs.expo.dev/router/installation/#update-resolutions
            overrides:
              packageManager.packageManager !== "yarn" &&
              expoVersion!.major <= 50
                ? undefined
                : {
                    "react-refresh": "~0.14.0",
                  },
            resolutions:
              packageManager.packageManager === "yarn" &&
              expoVersion!.major <= 50
                ? undefined
                : {
                    "react-refresh": "~0.14.0",
                  },
          }));

          if (expoVersion!.major < 50) {
            // Because of the override above, we need to force resolution of packages
            await packageManager.install(cwd);
          }

          try {
            const babelConfigFilePath = `${cwd}/babel.config.js`;
            const data = await readFile(babelConfigFilePath, "utf8");
            const updatedConfig =
              expoVersion!.major >= 50
                ? data.replace(
                    `presets: ['babel-preset-expo'],`,
                    `presets: ['babel-preset-expo'],
              plugins: [
                ["@babel/plugin-transform-private-methods", { "loose": true }],
              ],`,
                  )
                : data.replace(
                    `presets: ['babel-preset-expo'],`,
                    `presets: ['babel-preset-expo'],
              plugins: [
                ["@babel/plugin-transform-private-methods", { "loose": true }],
                "expo-router/babel"
              ],`,
                  );
            await writeFile(babelConfigFilePath, updatedConfig, "utf8");
          } catch (error) {
            console.error(
              "Error reading or writing the babel.config.js file:",
              error,
            );
          }

          await rm(`${cwd}/App.tsx`, { force: true });
          await mkdir(`${cwd}/src/app`, { recursive: true });
          await writeFile(`${cwd}/src/config.ts`, CONFIG_CONTENT, "utf8");
          await writeFile(`${cwd}/src/app/_layout.tsx`, LAYOUT_CONTENT, "utf8");
          await writeFile(`${cwd}/src/app/index.tsx`, INDEX_CONTENT, "utf8");

          await writeFile(
            `${cwd}/metro.config.js`,
            METRO_CONFIG_CONTENT,
            "utf8",
          );
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

const CONFIG_CONTENT = `export const Config = {
  fhirUrl: process.env.FHIR_URL || "http://localhost:8103/fhir/R4/",
  authServerUrl: process.env.AUTH_SERVER_URL || "http://localhost:8103",
  authClientId:
    process.env.AUTH_CLIENT_ID || "f54370de-eaf3-4d81-a17e-24860f667912",
} as const;
`;

const LAYOUT_CONTENT = `import { FetchFhirClient, FhirClient } from "@bonfhir/core/r4b";
import { GluestackUIRenderer } from "@bonfhir/gluestack-ui/r4b";
import { FhirQueryProvider } from "@bonfhir/query/r4b";
import { FhirUIProvider } from "@bonfhir/react/r4b";
import { config as gluestackUIConfig } from "@gluestack-ui/config";
import {
  Button,
  ButtonText,
  Center,
  GluestackUIProvider,
} from "@gluestack-ui/themed";
import {
  ResponseType,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";
import { Slot } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { PropsWithChildren, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

import { Config } from "../config";

WebBrowser.maybeCompleteAuthSession();
const redirectUri = makeRedirectUri();
console.log(
  [
    \`Auth redirect uri: \${redirectUri} - this MUST be configured on the OpenID Client\`,
    "If using the local FHIR server, go to http://localhost:8100/ClientApplication/f54370de-eaf3-4d81-a17e-24860f667912/edit and update the value",
    "(Login with admin@example.com - medplum_admin - Default Project))",
  ].join("\\n")
);

export default function RootLayout() {
  return (
    <GluestackUIProvider config={gluestackUIConfig}>
      <FhirUIProvider renderer={GluestackUIRenderer}>
        <SafeAreaView>
          <WithAuth>
            <Slot />
          </WithAuth>
        </SafeAreaView>
      </FhirUIProvider>
    </GluestackUIProvider>
  );
}

/**
 * This is a deliberately simple auth flow that uses Expo's AuthSession to
 * login to the local auth server. You will need to adapt this to your own.
 * If you get an error about the redirectUri not being registered, you need
 * to make sure that the redirectUri is registered on the OpenID Client to
 * the value of the redirectUri variable above.
 */
function WithAuth(props: PropsWithChildren) {
  const [fhirClient, setFhirClient] = useState<FhirClient>();

  const discovery = useAutoDiscovery(Config.authServerUrl);
  // Create and load an auth request
  const [request, result, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Code,
      clientId: Config.authClientId,
      redirectUri,
      scopes: ["openid"],
      usePKCE: true,
    },
    discovery,
  );

  useEffect(() => {
    (async () => {
      if (result?.type === "success") {
        const { code } = result.params;
        const response = await fetch(discovery!.tokenEndpoint!, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: \`grant_type=authorization_code&client_id=\${Config.authClientId}&code=\${code}&redirect_uri=\${redirectUri}&code_verifier=\${request?.codeVerifier}\`,
        });
        const { access_token } = await response.json();
        setFhirClient(
          new FetchFhirClient({
            baseUrl: Config.fhirUrl,
            auth: \`Bearer \${access_token}\`,
          }),
        );
      }
    })();
  }, [result]);

  if (!fhirClient && request) {
    return (
      <Center height="100%">
        <Button onPress={() => promptAsync()}>
          <ButtonText>Login</ButtonText>
        </Button>
      </Center>
    );
  }

  if (!fhirClient) {
    return null;
  }

  return (
    <FhirQueryProvider fhirClient={fhirClient}>
      {props.children}
    </FhirQueryProvider>
  );
}
`;

const INDEX_CONTENT = `import { useFhirSearch } from "@bonfhir/query/r4b";
import { FhirValue } from "@bonfhir/react/r4b";
import { Center, Text } from "@gluestack-ui/themed";

export default function Home() {
  const patientsSearchQuery = useFhirSearch("Patient", (search) =>
    search
      ._include("Patient", "organization")
      ._sort("-_lastUpdated")
      ._count(20)
      ._total("accurate"),
  );
  const patientData = patientsSearchQuery.data?.searchMatch()[0];
  if (patientsSearchQuery.isLoading) {
    return <Text>Loading...</Text>;
  }
  if (patientsSearchQuery.error) {
    return <Text>{JSON.stringify(patientsSearchQuery, null, 2)}</Text>;
  }
  return (
    <Center height="100%">
      <FhirValue type="HumanName" value={patientData?.name} />
    </Center>
  );
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
