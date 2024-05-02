import chalk from "chalk";
import { Listr } from "listr2";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { TemplateOptions } from "../commands/create";
import { Template } from "./template";
import { FAVICON_CONTENT_BASE64 } from "./utils/favicon";
import { packageJsonFhirServerScripts } from "./utils/fhir-servers";
import { MANTINE_RENDERER_PROPS_CONTENT } from "./utils/mantine-renderer-props";

export interface Context {
  options: TemplateOptions;
}

export const Next: Template = {
  name: "next",
  description:
    "A Next.js app with BonFHIR UI & Subscription API, with NextAuth integration.",
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
          await mkdir(`${cwd}/src/app/api/auth/[...nextauth]`, {
            recursive: true,
          });
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

          await writeFile(
            `${cwd}/postcss.config.cjs`,
            POSTCSS_CONFIG_CONTENT,
            "utf8",
          );
          await writeFile(`${cwd}/tsconfig.json`, TSCONFIG_CONTENT, "utf8");
          await writeFile(
            `${cwd}/next.config.cjs`,
            NEXT_CONFIG_CONTENT,
            "utf8",
          );
          await writeFile(`${cwd}/src/app/layout.tsx`, LAYOUT_CONTENT, "utf8");
          await writeFile(`${cwd}/src/app/page.tsx`, PAGE_CONTENT, "utf8");
          await writeFile(
            `${cwd}/src/app/api/auth/[...nextauth]/route.ts`,
            NEXT_AUTH_API_CONTENT,
            "utf8",
          );
          await writeFile(`${cwd}/src/config.tsx`, CONFIG_CONTENT, "utf8");
          await writeFile(
            `${cwd}/src/middleware.ts`,
            MIDDLEWARE_CONTENT,
            "utf8",
          );
          await writeFile(
            `${cwd}/src/next-auth.d.ts`,
            NEXT_AUTH_TYPES_CONTENT,
            "utf8",
          );
          await writeFile(
            `${cwd}/src/bonfhir.d.ts`,
            MANTINE_RENDERER_PROPS_CONTENT,
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
            "@bonfhir/mantine",
            "@bonfhir/next",
            "@bonfhir/query",
            "@bonfhir/subscriptions",
            "@bonfhir/react",
            "@mantine/code-highlight@^7",
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
            "next",
            "next-auth",
            "react",
            "react-dom",
            "tiptap-markdown",
          );

          await packageManager.addDev(
            cwd,
            "@types/node",
            "@types/react",
            "@types/react-dom",
            "eslint@^8",
            "eslint-config-next",
            "eslint-config-prettier",
            "postcss@^8",
            "postcss-preset-mantine@^1",
            "postcss-simple-vars@^7",
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

const PACKAGE_JSON_CONTENT = (name: string) =>
  JSON.stringify(
    {
      name,
      version: "0.1.0",
      private: true,
      type: "module",
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
        lint: "prettier --check ./src && next lint",
        format: "prettier --write ./src",
        ...packageJsonFhirServerScripts(
          name,
          "medplum",
          "http://localhost:3000/api/auth/callback/medplum",
        ),
        "register-subscriptions":
          "curl -i --request POST 'http://localhost:3000/api/fhir/subscriptions/register' --header 'X-Subscription-Auth: secret'",
      },
      prettier: {
        plugins: ["prettier-plugin-organize-imports"],
      },
      eslintConfig: {
        extends: ["next/core-web-vitals", "prettier"],
      },
    },
    undefined,
    2,
  );

const TSCONFIG_CONTENT = `{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
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
      "@/*": [
        "./src/*"
      ]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
`;

const NEXT_CONFIG_CONTENT = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
`;

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

const LAYOUT_CONTENT = `"use client";
import { Config } from "@/config";
import { FetchFhirClient, FhirClient } from "@bonfhir/core/r4b";
import { MantineRenderer } from "@bonfhir/mantine/r4b";
import { FhirQueryProvider } from "@bonfhir/query/r4b";
import { FhirUIProvider } from "@bonfhir/react/r4b";
import "@mantine/code-highlight/styles.css";
import {
  AppShell,
  Center,
  ColorSchemeScript,
  Loader,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/tiptap/styles.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

/**
 * Customize Mantine Theme.
 * https://mantine.dev/theming/theme-object/
 */
const theme = createTheme({});

export default function RootLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <html lang="en">
      <head>
        <title>bonFHIR sample Next app</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <ColorSchemeScript forceColorScheme="light" />
    </head>
      <body>
        <MantineProvider theme={theme}>
          <SessionProvider>
            <WithAuth>
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
                  <AppShell.Main>
                    {children}
                  </AppShell.Main>
                </AppShell>
                <ReactQueryDevtools />
              </FhirUIProvider>
            </WithAuth>
          </SessionProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

function WithAuth(props: PropsWithChildren) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn("medplum");
    },
  });
  const [fhirClient, setFhirClient] = useState<FhirClient>();

  useEffect(() => {
    if (session?.accessToken) {
      setFhirClient(
        new FetchFhirClient({
          baseUrl: Config.public.fhirUrl,
          auth: \`Bearer \${session.accessToken}\`,
          async onError(response) {
            if (response.status === 401) {
              signOut({ callbackUrl: "/" });
            }
          },
        }),
      );
    }
  }, [session?.accessToken]);

  if (status !== "authenticated" || !session?.accessToken || !fhirClient) {
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

  return (
    <FhirQueryProvider fhirClient={fhirClient}>
      {props.children}
    </FhirQueryProvider>
  );
}

`;

const PAGE_CONTENT = `"use client";
import { Center, Title } from "@mantine/core";

export default function Home() {
  return (
    <Center h="100vh">
      <Title>BonFHIR + Mantine + Next = 🔥</Title>
    </Center>
  );
}
`;

const CONFIG_CONTENT = `export const Config = {
  public: {
    fhirUrl:
      process.env.NEXT_PUBLIC_FHIR_URL || "http://localhost:8103/fhir/R4/",
  },
  server: {
    authServerUrl: process.env.AUTH_SERVER_URL || "http://localhost:8103",
    authTokenUrl:
      process.env.AUTH_TOKEN_URL || "http://localhost:8103/oauth2/token",
    logoutUrl: process.env.LOGOUT_URL || "http://localhost:8103/oauth2/logout",
    authClientId:
      process.env.AUTH_CLIENT_ID || "f54370de-eaf3-4d81-a17e-24860f667912",
    authClientSecret:
      process.env.AUTH_CLIENT_SECRET ||
      "75d8e7d06bf9283926c51d5f461295ccf0b69128e983b6ecdd5a9c07506895de",
    authSecret: process.env.AUTH_SECRET || "secret",
    appBaseUrl: process.env.APP_BASE_URL || "http://host.docker.internal:3000",
    fhirSubscriptionsSecret: process.env.FHIR_SUBSCRIPTION_SECRET || "secret",
  },
} as const;
`;

const MIDDLEWARE_CONTENT = `import { Config } from "@/config";
import { FetchFhirClient } from "@bonfhir/core/r4b";
import { fhirSubscriptions } from "@bonfhir/next/r4b/server";

export const config = {
  matcher: ["/api/fhir/subscriptions/:subscription*"],
};

export const middleware = fhirSubscriptions({
  fhirClient: () =>
    new FetchFhirClient({
      baseUrl: Config.public.fhirUrl,
      auth: {
        tokenUrl: Config.server.authTokenUrl,
        clientId: Config.server.authClientId,
        clientSecret: Config.server.authClientSecret,
      },
    }),
  baseUrl: Config.server.appBaseUrl,
  prefix: "/api/fhir/subscriptions",
  webhookSecret: Config.server.fhirSubscriptionsSecret,
  subscriptions: [],
});

`;

const NEXT_AUTH_TYPES_CONTENT = `import { Practitioner, Reference, RelatedPerson } from "@bonfhir/core/r4b";
import "next-auth";

declare module "next-auth" {
  interface Account {
    profile: {
      reference: string;
      display: string;
    };
  }

  interface Session {
    user: {
      id: string;
      profile: Reference<Practitioner | RelatedPerson>;
    };
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    profile: {
      reference: string;
      display: string;
    };
  }
}
`;

const NEXT_AUTH_API_CONTENT = `import { Config } from "@/config";
import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    {
      id: "medplum",
      name: "Medplum",
      type: "oauth",
      checks: ["state", "nonce"],
      wellKnown: \`\${Config.server.authServerUrl}/.well-known/openid-configuration\`,
      clientId: Config.server.authClientId,
      clientSecret: Config.server.authClientSecret,
      profile: (profile) => {
        return {
          id: profile.sub,
        };
      },
    },
  ],
  secret: Config.server.authSecret,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token!;
        token.profile = account.profile;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = {
        id: token.sub!,
        profile: token.profile,
      };
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      await fetch(Config.server.logoutUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: \`Bearer \${token.accessToken}\`,
        },
        body: JSON.stringify({}),
      });
    },
  },
});

export { handler as GET, handler as POST };
`;
