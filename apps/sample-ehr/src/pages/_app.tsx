import { Navbar } from "@/components";
import { SystemLabels } from "@/fhir/known-identifiers";
import { FetchFhirClient, Formatter } from "@bonfhir/core/r4b";
import { FhirQueryProvider } from "@bonfhir/query/r4b";
import { MantineRenderer } from "@bonfhir/ui-mantine/r4b";
import { FhirUIProvider } from "@bonfhir/ui/r4b";
import { AppShell, MantineProvider, MantineThemeOverride } from "@mantine/core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/navigation";

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

const client = new FetchFhirClient({
  baseUrl: "http://localhost:8103/fhir/R4/",
  auth: {
    tokenUrl: "http://localhost:8103/oauth2/token",
    clientId: "f54370de-eaf3-4d81-a17e-24860f667912",
    clientSecret:
      "75d8e7d06bf9283926c51d5f461295ccf0b69128e983b6ecdd5a9c07506895de",
  },
});

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
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
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <FhirQueryProvider fhirClient={client}>
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
        </FhirQueryProvider>
      </MantineProvider>
    </>
  );
}
