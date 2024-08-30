import chalk from "chalk";
import { Listr, ListrTask } from "listr2";

import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";

import { TemplateOptions } from "../commands/create";
import { Template } from "./template";
import { FAVICON_CONTENT_BASE64 } from "./utils/favicon";
import {
  FhirServerType,
  fetchFhirClientConfig,
  packageJsonFhirServerScripts,
} from "./utils/fhir-servers";
import { MANTINE_RENDERER_PROPS_CONTENT } from "./utils/mantine-renderer-props";

export interface Context {
  options: TemplateOptions;
  monorepo?: string;
}

export const Vite: Template = {
  name: "vite",
  description: "A Vite SPA project with BonFHIR UI and React-Router.",
  async handler(options) {
    await new Listr<Context>(ViteTasks()).run({ options });

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

export const ViteTasks = (): ListrTask<Context>[] => [
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
    title: "Create Vite project",
    task: async ({ options: { cwd, name, fhirServer }, monorepo }) => {
      await mkdir(`${cwd}/src/pages`, { recursive: true });
      await mkdir(`${cwd}/src/components`, { recursive: true });
      await mkdir(`${cwd}/public`, { recursive: true });

      if (!monorepo) {
        await writeFile(`${cwd}/.editorconfig`, EDITORCONFIG_CONTENT, "utf8");
        await writeFile(`${cwd}/.gitignore`, GITIGNORE_CONTENT, "utf8");
        await writeFile(
          `${cwd}/postcss.config.cjs`,
          POSTCSS_CONFIG_CONTENT,
          "utf8",
        );
        await writeFile(
          `${cwd}/tsconfig.node.json`,
          TSCONFIG_NODE_CONTENT,
          "utf8",
        );
      }

      await writeFile(
        `${cwd}/package.json`,
        PACKAGE_JSON_CONTENT(name, fhirServer, monorepo),
        "utf8",
      );
      await writeFile(`${cwd}/index.html`, INDEX_HTML_CONTENT, "utf8");
      await writeFile(
        `${cwd}/tsconfig.json`,
        monorepo
          ? `{
          "extends": "@${monorepo}/tsconfig/tsconfig.json",
          "include": ["src", "vite.config.ts"],
          "compilerOptions": {
            "allowImportingTsExtensions": true,
            "allowSyntheticDefaultImports": true,
            "jsx": "react-jsx",
            "noEmit": true,
            "useDefineForClassFields": true
          }
        }
        `
          : TSCONFIG_CONTENT,
        "utf8",
      );
      await writeFile(`${cwd}/vite.config.ts`, VITE_CONFIG_CONTENT, "utf8");

      await writeFile(`${cwd}/src/App.tsx`, APP_CONTENT(fhirServer), "utf8");
      await writeFile(`${cwd}/src/index.tsx`, INDEX_CONTENT, "utf8");
      await writeFile(`${cwd}/src/vite-env.d.ts`, VITE_ENV_CONTENT, "utf8");
      await writeFile(
        `${cwd}/src/bonfhir.d.ts`,
        MANTINE_RENDERER_PROPS_CONTENT,
        "utf8",
      );
      await mkdir(`${cwd}/src/pages`, { recursive: true });
      await writeFile(`${cwd}/src/pages/Home.tsx`, HOME_CONTENT, "utf8");
      await writeFile(
        `${cwd}/public/favicon.ico`,
        FAVICON_CONTENT_BASE64,
        "base64",
      );
    },
  },
  {
    title: "Add dependencies",
    task: async ({
      options: { cwd, packageManager, fhirServer },
      monorepo,
    }) => {
      await packageManager.install(cwd);
      await packageManager.add(
        cwd,
        "@bonfhir/core",
        "@bonfhir/query",
        "@bonfhir/react",
        "@bonfhir/mantine",
        "@mantine/core@^7",
        "@mantine/dates@^7",
        "@mantine/form@^7",
        "@mantine/hooks@^7",
        "@mantine/tiptap@^7",
        "@tabler/icons-react@^2",
        "@tanstack/react-query@^5",
        "@tanstack/react-query-devtools@^5",
        "@tiptap/core",
        "@tiptap/extension-link",
        "@tiptap/pm",
        "@tiptap/react",
        "@tiptap/starter-kit",
        "dayjs@^1",
        "react",
        "react-dom",
        "react-router-dom@^6",
        "tiptap-markdown",
        fhirServer === "medplum" ? "oidc-client-ts@^2" : undefined,
        fhirServer === "medplum" ? "react-oidc-context@^2" : undefined,
      );
      await packageManager.addDev(
        cwd,
        "@types/react",
        "@types/react-dom",
        "@typescript-eslint/eslint-plugin",
        "@typescript-eslint/parser",
        "@vitejs/plugin-react@^4",
        "eslint@^8",
        "eslint-config-prettier",
        "eslint-plugin-react-hooks",
        "eslint-plugin-react-refresh",
        "postcss@^8",
        "postcss-preset-mantine@^1",
        "postcss-simple-vars@^7",
        "prettier",
        "prettier-plugin-organize-imports",
        "typescript",
        "vite@^4",
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

const POSTCSS_CONFIG_CONTENT = `module.exports = {
  plugins: {
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-xs": "36em",
        "mantine-breakpoint-sm": "48em",
        "mantine-breakpoint-md": "62em",
        "mantine-breakpoint-lg": "75em",
        "mantine-breakpoint-xl": "88em",
      },
    },
  },
};
`;

const GITIGNORE_CONTENT = `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
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

const INDEX_HTML_CONTENT = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
    <title>BonFHIR + Mantine + Vite</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
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
        dev: "vite",
        build: "tsc && vite build",
        lint: "prettier --check ./src && eslint ./src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
        format: "prettier --write ./src",
        preview: "vite preview",
        ...(monorepo
          ? undefined
          : packageJsonFhirServerScripts(
              name,
              fhirServer,
              fhirServer === "medplum" ? "http://localhost:5173" : undefined,
            )),
      },
      prettier: {
        plugins: ["prettier-plugin-organize-imports"],
      },
      eslintConfig: monorepo
        ? {
            env: { browser: true, es2020: true },
            extends: [
              "plugin:react-hooks/recommended",
              `@${monorepo}/eslint-config`,
            ],
            ignorePatterns: ["dist"],
            plugins: ["react-refresh"],
            rules: {
              "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
              ],
            },
          }
        : {
            env: { browser: true, es2020: true },
            extends: [
              "eslint:recommended",
              "plugin:@typescript-eslint/recommended",
              "plugin:react-hooks/recommended",
              "prettier",
            ],
            ignorePatterns: ["dist"],
            parser: "@typescript-eslint/parser",
            plugins: ["react-refresh"],
            rules: {
              "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
              ],
            },
          },
    },
    undefined,
    2,
  );

const TSCONFIG_CONTENT = `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
`;

const TSCONFIG_NODE_CONTENT = `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
`;

const VITE_CONFIG_CONTENT = `import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
`;

const INDEX_CONTENT = `import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
`;

const APP_CONTENT = (fhirServer?: FhirServerType) =>
  fhirServer === "medplum"
    ? `import { FetchFhirClient, FhirClient } from "@bonfhir/core/r4b";
    import { MantineRenderer } from "@bonfhir/mantine/r4b";
    import { FhirQueryProvider } from "@bonfhir/query/r4b";
    import { FhirFormattersProvider, FhirUIProvider } from "@bonfhir/react/r4b";
    import {
      Alert,
      AppShell,
      Center,
      Loader,
      MantineProvider,
      createTheme,
    } from "@mantine/core";
    import "@mantine/core/styles.css";
    import "@mantine/dates/styles.css";
    import "@mantine/tiptap/styles.css";
    import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
    import { PropsWithChildren, useEffect, useState } from "react";
    import { AuthProvider, useAuth } from "react-oidc-context";
    import { Outlet, useNavigate } from "react-router-dom";
    
    /**
     * Customize Mantine Theme.
     * https://mantine.dev/theming/theme-object/
     */
    const theme = createTheme({});
    
    export default function App() {
      const navigate = useNavigate();
    
      return (
        <MantineProvider theme={theme}>
          <AuthProvider
            authority="http://localhost:8103"
            client_id="f54370de-eaf3-4d81-a17e-24860f667912"
            redirect_uri={document.location.origin}
          >
            <WithAuth>
              <FhirFormattersProvider>
                <FhirUIProvider
                  renderer={MantineRenderer}
                  onNavigate={({ target, aux }) => {
                    if (aux) {
                      window.open(target, "_blank");
                    } else {
                      navigate(target);
                    }
                  }}
                >
                  <AppShell>
                    <AppShell.Main>
                      <Outlet />
                    </AppShell.Main>
                  </AppShell>
                </FhirUIProvider>
              </FhirFormattersProvider>
            </WithAuth>
          </AuthProvider>
        </MantineProvider>
      );
    }
    
    function WithAuth({ children }: PropsWithChildren) {
      const auth = useAuth();
      const [fhirClient, setFhirClient] = useState<FhirClient | undefined>();
    
      useEffect(() => {
        if (auth.isAuthenticated && auth.user?.access_token && !fhirClient) {
          setFhirClient(
            new FetchFhirClient({
              baseUrl: "http://localhost:8103/fhir/R4/",
              auth: \`Bearer \${auth.user?.access_token}\`,
              onError(response) {
                if (response.status === 401) {
                  auth.signoutRedirect();
                }
              },
            }),
          );
          // Clear the URL for any OpenID params
          history.pushState(null, "", location.href.split("?")[0]);
          return;
        }
    
        if (auth.isAuthenticated || auth.isLoading) return;
    
        auth.signinRedirect();
      }, [auth, fhirClient]);
    
      if (auth.isLoading) {
        return (
          <AppShell>
            <AppShell.Main>
              <Center h="100vh">
                <Loader />
              </Center>
            </AppShell.Main>
          </AppShell>
        );
      }
    
      if (auth.error) {
        return (
          <AppShell>
            <AppShell.Main>
              <Center h="100vh">
                <Alert variant="filled" color="red" title="Oops...">
                  {auth.error.message}
                </Alert>
              </Center>
            </AppShell.Main>
          </AppShell>
        );
      }
    
      if (fhirClient) {
        return (
          <FhirQueryProvider fhirClient={fhirClient}>
            {children}
            <ReactQueryDevtools />
          </FhirQueryProvider>
        );
      }
    
      return null;
    }
    `
    : `import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/tiptap/styles.css";
import { FetchFhirClient } from "@bonfhir/core/r4b";
import { FhirQueryProvider } from "@bonfhir/query/r4b";
import { MantineRenderer } from "@bonfhir/mantine/r4b";
import { FhirFormattersProvider, FhirUIProvider } from "@bonfhir/react/r4b";
import { AppShell, MantineProvider, createTheme } from "@mantine/core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, useNavigate } from "react-router-dom";

/**
 * The following lines connect to a local FHIR server
 */
const client = new FetchFhirClient(${JSON.stringify(
        fetchFhirClientConfig(fhirServer),
      )});

/**
 * Customize Mantine Theme.
 * https://mantine.dev/theming/theme-object/
 */
const theme = createTheme({});

export default function App() {
  const navigate = useNavigate();
  return (
    <MantineProvider theme={theme}>
      <FhirQueryProvider fhirClient={client}>
        <FhirFormattersProvider>
          <FhirUIProvider
            renderer={MantineRenderer}
            onNavigate={({ target, aux }) => {
              if (aux) {
                window.open(target, "_blank");
              } else {
                navigate(target);
              }
            }}
          >
            <AppShell>
              <AppShell.Main>
                <Outlet />
              </AppShell.Main>
            </AppShell>
            <ReactQueryDevtools />
          </FhirUIProvider>
        </FhirFormattersProvider>
      </FhirQueryProvider>
    </MantineProvider>
  );
}
`;

const VITE_ENV_CONTENT = `/// <reference types="vite/client" />
`;

const HOME_CONTENT = `import { Center, Title } from "@mantine/core";

export default function Home() {
  return (
    <Center h="100vh">
      <Title>BonFHIR + Mantine + Vite = 🔥</Title>
    </Center>
  );
}
`;
