import { Navbar } from "@/components";
import { SystemLabels } from "@/fhir/known-identifiers";
import { FetchFhirClient, FhirClient, Formatter } from "@bonfhir/core/r4b";
import { FhirQueryProvider } from "@bonfhir/query/r4b";
import { MantineRenderer } from "@bonfhir/ui-mantine/r4b";
import { FhirUIProvider } from "@bonfhir/ui/r4b";
import { AppShell, MantineProvider, MantineThemeOverride } from "@mantine/core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

const montserrat = Montserrat({ subsets: ["latin-ext"] });

const theme: MantineThemeOverride = {
  colorScheme: "light",
  fontFamily: montserrat.style.fontFamily,
  components: {
    Grid: {
      defaultProps: {
        columns: 12,
      },
    },
    Paper: {
      defaultProps: {
        p: "sm",
      },
    },
    Table: {
      defaultProps: {
        striped: true,
        highlightOnHover: true,
      },
    },
  },
};

export default function App(props: AppProps) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Sample EHR</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <SessionProvider session={session}>
        <WithSession>
          <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
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
              <AppShell
                navbar={<Navbar />}
                styles={{
                  main: {
                    backgroundColor: "#F1F1F1",
                  },
                }}
              >
                <Component {...pageProps} />
              </AppShell>
              <ReactQueryDevtools position="bottom-right" />
            </FhirUIProvider>
          </MantineProvider>
        </WithSession>
      </SessionProvider>
    </>
  );
}

function WithSession(props: PropsWithChildren) {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("medplum");
    }
  }, [status]);

  const [fhirClient, setFhirClient] = useState<FhirClient>();

  useEffect(() => {
    if (session) {
      setFhirClient(
        new FetchFhirClient({
          baseUrl: "http://localhost:8103/fhir/R4/",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          auth: `Bearer ${(session as any).accessToken}}`,
        }),
      );
    }
  }, [session]);

  if (!fhirClient) {
    return;
  }

  return (
    <FhirQueryProvider fhirClient={fhirClient}>
      {props.children}
    </FhirQueryProvider>
  );
}
