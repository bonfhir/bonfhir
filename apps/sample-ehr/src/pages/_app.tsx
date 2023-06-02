import { FetchFhirClient } from "@bonfhir/core/r4b";
import { FhirQueryProvider } from "@bonfhir/query/r4b";
import { MantineRenderer } from "@bonfhir/ui-mantine/r4b";
import { FhirUIProvider } from "@bonfhir/ui/r4b";
import { AppShell, MantineProvider } from "@mantine/core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "../components/layout/navbar";
import theme from "./theme";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const client = new FetchFhirClient({
    baseUrl: "http://localhost:8103/fhir/R4/",
    auth: "Basic ZjU0MzcwZGUtZWFmMy00ZDgxLWExN2UtMjQ4NjBmNjY3OTEyOjc1ZDhlN2QwNmJmOTI4MzkyNmM1MWQ1ZjQ2MTI5NWNjZjBiNjkxMjhlOTgzYjZlY2RkNWE5YzA3NTA2ODk1ZGU=",
  });

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
          <FhirUIProvider renderer={MantineRenderer}>
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
