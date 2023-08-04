import chalk from "chalk";
import fg from "fast-glob";
import Listr from "listr";

import { existsSync } from "node:fs";
import { mkdir, rm, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { TemplateOptions } from "../commands/create";
import { Template } from "./template";

export interface Context {
  options: TemplateOptions;
}

export const Vite: Template = {
  name: "vite",
  description: "A Vite SPA project with BonFHIR UI and React-Router.",
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
        title: "Create Vite project",
        task: async ({ options: { name, packageManager } }) => {
          await packageManager.create(
            "vite@^4",
            name,
            "--template",
            "react-ts",
          );
        },
      },
      {
        title: "Add dependencies",
        task: async ({ options: { cwd, packageManager } }) => {
          await packageManager.install(cwd);

          //TODO : remove once npm packages have been published.
          await writeFile(
            join(cwd, ".npmrc"),
            `@bonfhir:registry=https://npm.pkg.github.com/
      //npm.pkg.github.com/:_authToken=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`,
            "utf8",
          );
          await packageManager.add(
            cwd,
            "@bonfhir/core",
            "@bonfhir/query",
            "@bonfhir/ui",
            "@bonfhir/ui-mantine",
            "@mantine/core@^6",
            "@mantine/dates@^6",
            "@mantine/form@^6",
            "@mantine/hooks@^6",
            "@mantine/tiptap@^6",
            "@tabler/icons-react@^2",
            "@tanstack/react-query@^4",
            "@tanstack/react-query-devtools@^4",
            "react-router-dom@^6",
          );
        },
      },
      {
        title: "Add BonFHIR sample files",
        task: async ({ options: { cwd, packageManager } }) => {
          for (const cssFile of await fg(`${cwd}/src/**/*.css`, {
            onlyFiles: true,
          })) {
            await unlink(cssFile);
          }

          await rm(`${cwd}/src/assets`, {
            recursive: true,
            force: true,
          });

          await writeFile(
            `${cwd}/src/main.tsx`,
            `import React from "react";
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
            `,
            "utf8",
          );

          await writeFile(
            `${cwd}/src/App.tsx`,
            `import { FetchFhirClient } from "@bonfhir/core/r4b";
            import { FhirQueryProvider } from "@bonfhir/query/r4b";
            import { MantineRenderer } from "@bonfhir/ui-mantine/r4b";
            import { FhirUIProvider } from "@bonfhir/ui/r4b";
            import { AppShell, MantineProvider, MantineThemeOverride } from "@mantine/core";
            import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
            import { Outlet, useNavigate } from "react-router-dom";
            
            /**
             * Uncomment the following lines to connect to a local
             * Medplum Devbox FHIR server
             * https://bonfhir.dev/docs/medplum-devbox
             */
            const client = new FetchFhirClient({
              baseUrl: "http://localhost:8103/fhir/R4/",
              auth: {
                tokenUrl: "http://localhost:8103/oauth2/token",
                clientId: "f54370de-eaf3-4d81-a17e-24860f667912",
                clientSecret:
                  "75d8e7d06bf9283926c51d5f461295ccf0b69128e983b6ecdd5a9c07506895de",
              },
            });
            
            /**
             * Customize Mantine Theme.
             * https://v6.mantine.dev/theming/theme-object/
             */
            const theme: MantineThemeOverride = {};
            
            export default function App() {
              const navigate = useNavigate();
              return (
                <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
                  <FhirQueryProvider fhirClient={client}>
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
                        <Outlet />
                      </AppShell>
                      <ReactQueryDevtools />
                    </FhirUIProvider>
                  </FhirQueryProvider>
                </MantineProvider>
              );
            }
            `,
            "utf8",
          );

          await mkdir(`${cwd}/src/pages`);
          await writeFile(
            `${cwd}/src/pages/Home.tsx`,
            `import { Center, Title } from "@mantine/core";

            export default function Home() {
              return (
                <Center h="100%">
                  <Title>BonFHIR + Mantine + Vite = 🔥</Title>
                </Center>
              );
            }
            `,
            "utf8",
          );

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
  },
};
