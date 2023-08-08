import chalk from "chalk";
import { Listr } from "listr2";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { TemplateOptions } from "../commands/create";
import { FAVICON_CONTENT_BASE64 } from "./favicon";
import { Template } from "./template";

export interface Context {
  options: TemplateOptions;
}

export const Next: Template = {
  name: "next",
  description: "A Next.js app with BonFHIR UI & Subscription API.",
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
        title: "Create Next project",
        task: async ({ options: { cwd, name } }) => {
          await mkdir(`${cwd}/src/pages`, { recursive: true });
          await mkdir(`${cwd}/src/subscriptions`, { recursive: true });
          await mkdir(`${cwd}/src/components`, { recursive: true });
          await mkdir(`${cwd}/public`, { recursive: true });

          await writeFile(`${cwd}/.editorconfig`, EDITORCONFIG_CONTENT, "utf8");
          await writeFile(`${cwd}/.gitignore`, GITIGNORE_CONTENT, "utf8");
          await writeFile(
            `${cwd}/package.json`,
            PACKAGE_JSON_CONTENT(name),
            "utf8",
          );
          await writeFile(`${cwd}/tsconfig.json`, TSCONFIG_CONTENT, "utf8");
          await writeFile(`${cwd}/next.config.js`, NEXT_CONFIG_CONTENT, "utf8");
          await writeFile(`${cwd}/src/pages/_app.tsx`, APP_CONTENT, "utf8");
          await writeFile(
            `${cwd}/src/pages/_document.tsx`,
            DOCUMENT_CONTENT,
            "utf8",
          );
          await writeFile(`${cwd}/src/pages/index.tsx`, INDEX_CONTENT, "utf8");
          await writeFile(
            `${cwd}/src/middleware.ts`,
            MIDDLEWARE_CONTENT,
            "utf8",
          );
          await writeFile(
            `${cwd}/public/favicon.ico`,
            FAVICON_CONTENT_BASE64,
            "base64",
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
            "@bonfhir/next",
            "@bonfhir/query",
            "@bonfhir/subscriptions",
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
            "next",
            "react",
            "react-dom",
          );

          await packageManager.addDev(
            cwd,
            "@types/node",
            "@types/react",
            "@types/react-dom",
            "eslint",
            "eslint-config-next",
            "eslint-config-prettier",
            "prettier",
            "prettier-plugin-organize-imports",
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
  },
};

const EDITORCONFIG_CONTENT = `
[*]
end_of_line = lf
insert_final_newline = true

[*.{js,jsx,ts,tsx,json,yml}]
charset = utf-8
indent_style = space
indent_size = 2
`;

const PACKAGE_JSON_CONTENT = (name: string) => `{
  "name": "${name}",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "prettier --check ./src && next lint",
    "format": "prettier --write ./src",
    "start-fhir-server": "docker run -p 8100:8100 -p 8103:8103 -v ${name}_fhir_data:/var/lib/postgresql/15/main -v ${name}_fhir_files:/usr/src/medplum/packages/server/dist/binary --name ${name}_fhir_server --rm -d ghcr.io/bonfhir/medplum-devbox:latest",
    "stop-fhir-server": "docker stop ${name}_fhir_server",
    "add-sample-data": "npx @bonfhir/cli import --source synthea-sample --fhir r4b --base-url http://localhost:8103/fhir/R4/ --auth-token-url http://localhost:8103/oauth2/token --auth-client-id f54370de-eaf3-4d81-a17e-24860f667912 --auth-client-secret 75d8e7d06bf9283926c51d5f461295ccf0b69128e983b6ecdd5a9c07506895de",
    "register-subscriptions": "curl -i --request POST 'http://localhost:3000/api/fhir/subscriptions/register' --header 'X-Subscription-Auth: secret'"
  },
  "prettier": {
    "plugins": ["prettier-plugin-organize-imports"]
  },
  "eslintConfig": {
    "extends": ["next/core-web-vitals", "prettier"]
  }
}
`;

const TSCONFIG_CONTENT = `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
`;

const NEXT_CONFIG_CONTENT = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
`;

const GITIGNORE_CONTENT = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts            
`;

const APP_CONTENT = `import { FetchFhirClient } from "@bonfhir/core/r4b";
import { FhirQueryProvider } from "@bonfhir/query/r4b";
import { MantineRenderer } from "@bonfhir/ui-mantine/r4b";
import { FhirUIProvider } from "@bonfhir/ui/r4b";
import { AppShell, MantineProvider, MantineThemeOverride } from "@mantine/core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from 'next/app';
import { useRouter } from "next/navigation";

/**
 * The following lines connect to a local
 * Medplum Devbox FHIR server for the CLIENT side.
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

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <FhirQueryProvider fhirClient={client}>
        <FhirUIProvider
          renderer={MantineRenderer}
          onNavigate={({ target, aux }) => {
            if (aux) {
              window.open(target, "_blank");
            } else {
              router.push(target);
            }
          }}
        >
          <AppShell>
            <Component {...pageProps} />
          </AppShell>
          <ReactQueryDevtools />
        </FhirUIProvider>
      </FhirQueryProvider>
    </MantineProvider>
  );
}
`;

const DOCUMENT_CONTENT = `import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
`;

const INDEX_CONTENT = `import { Center, Title } from "@mantine/core";

export default function Home() {
  return (
    <Center h="100%">
      <Title>BonFHIR + Mantine + Next = 🔥</Title>
    </Center>
  );
}
`;

const MIDDLEWARE_CONTENT = `import { FetchFhirClient } from "@bonfhir/core/r4b";
import { fhirSubscriptions } from "@bonfhir/next/r4b/server";
import { communicationRequests } from "./subscriptions";

export const config = {
  matcher: ["/api/fhir/subscriptions/:subscription*"],
};

export const middleware = fhirSubscriptions({
  /**
   * The following lines connect to a local
   * Medplum Devbox FHIR server for the SERVER side.
   * https://bonfhir.dev/docs/medplum-devbox
   */
  fhirClient: () =>
    new FetchFhirClient({
      baseUrl: "http://localhost:8103/fhir/R4/",
      auth: {
        tokenUrl: "http://localhost:8103/oauth2/token",
        clientId: "f54370de-eaf3-4d81-a17e-24860f667912",
        clientSecret:
          "75d8e7d06bf9283926c51d5f461295ccf0b69128e983b6ecdd5a9c07506895de",
      },
    }),
  baseUrl: process.env.APP_BASE_URL || process.env.VERCEL_URL ? \`https://$\{process.env.VERCEL_URL}\` : "http://host.docker.internal:4000",
  prefix: "/api/fhir/subscriptions",
  webhookSecret: process.env.FHIR_SUBSCRIPTION_SECRET || "secret",
  // Register custom subscriptions here
  subscriptions: [],
});
`;
