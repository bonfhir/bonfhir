"use client";
import { Config } from "@/config";
import { SystemLabels } from "@/fhir/known-identifiers";
import { FetchFhirClient, FhirClient, Formatter } from "@bonfhir/core/r4b";
import { MantineRenderer } from "@bonfhir/mantine/r4b";
import { FhirQueryProvider } from "@bonfhir/query/r4b";
import { FhirUIProvider } from "@bonfhir/react/r4b";
import {
  AppShell,
  Center,
  ColorSchemeScript,
  Loader,
  MantineProvider,
  createTheme,
  rem,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import Header from "./header";
import Navbar from "./navbar";

/**
 * Customize Mantine Theme.
 * https://mantine.dev/theming/theme-object/
 */
const theme = createTheme({
  components: {
    Paper: {
      defaultProps: {
        p: "sm",
        shadow: "xs",
      },
    },
    Table: {
      defaultProps: {
        striped: true,
      },
    },
  },
  fontSizes: {
    xs: rem(10),
    sm: rem(12),
    md: rem(14),
    lg: rem(16),
    xl: rem(18),
  },
  colors: {
    destructive: [
      "#FFF5F5",
      "#FFE3E3",
      "#FFC9C9",
      "#FFA8A8",
      "#FF8787",
      "#FF6B6B",
      "#FA5252",
      "#F03E3E",
      "#E03131",
      "#C92A2A",
    ],
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5C5F66",
      "#373A40",
      "#2C2E33",
      "#25262B",
      "#1A1B1E",
      "#141517",
      "#101113",
    ],
    primary: [
      "#E7F5FF",
      "#D0EBFF",
      "#A5D8FF",
      "#74C0FC",
      "#4DABF7",
      "#339AF0",
      "#228BE6",
      "#1C7ED6",
      "#1971C2",
      "#1864AB",
    ],
    neutral: [
      "#F8F9FA",
      "#F1F3F5",
      "#E9ECEF",
      "#DEE2E6",
      "#CED4DA",
      "#ADB5BD",
      "#868E96",
      "#495057",
      "#343A40",
      "#212529",
    ],
  },
});

export default function RootLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <html lang="en">
      <head>
        <title>bonFHIR sample EHR</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <ColorSchemeScript forceColorScheme="light" />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <SessionProvider>
            <WithAuth>
              <FhirUIProvider
                renderer={MantineRenderer}
                formatter={Formatter.build({
                  systemsLabels: SystemLabels,
                })}
                onNavigate={({ target, aux }) => {
                  if (aux) {
                    window.open(target, "_blank");
                  } else {
                    router.push(target);
                  }
                }}
              >
                <ModalsProvider>
                  <AppShell
                    header={{ height: 60 }}
                    navbar={{ width: { sm: 160 }, breakpoint: "sm" }}
                    padding="md"
                    styles={(theme) => ({
                      main: {
                        backgroundColor: theme.colors.gray[0],
                      },
                    })}
                  >
                    <AppShell.Header>
                      <Header />
                    </AppShell.Header>
                    <AppShell.Navbar>
                      <Navbar />
                    </AppShell.Navbar>
                    <AppShell.Main>{children}</AppShell.Main>
                  </AppShell>
                </ModalsProvider>
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
          auth: `Bearer ${session.accessToken}`,
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
