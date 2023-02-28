import { antdFhirUIComponentsRenderer } from "@bonfhir/antd/r4b";
import { FhirQueryProvider } from "@bonfhir/fhir-query/r4b";
import { buildFhirRestfulClientAdapter } from "@bonfhir/medplum/r4b";
import { FhirUIComponentsProvider } from "@bonfhir/ui-components/r4b";
import { LoginState, MedplumClient } from "@medplum/core";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

export function App(): ReactElement | null {
  const renderer = useMemo(antdFhirUIComponentsRenderer, []);

  const medplum = useMemo(
    () =>
      new MedplumClient({
        baseUrl:
          process.env.SAMPLE_APP_MEDPLUM_SERVER_URL || "http://localhost:8103",
      }),
    []
  );

  const [loginState, setLoginState] = useState<LoginState | undefined>();

  useEffect(() => {
    function changeEventListener() {
      setLoginState(medplum.getActiveLogin());
    }

    medplum.addEventListener("change", changeEventListener);
    return () => medplum.removeEventListeneer("change", changeEventListener);
  }, [medplum]);

  useEffect(() => {
    async function signIn() {
      if (!loginState && !medplum.getActiveLogin() && !medplum.isLoading()) {
        await medplum.signInWithRedirect({
          clientId: process.env.MEDPLUM_CLIENT_ID,
          redirectUri: window.location.origin.endsWith("/")
            ? window.location.origin
            : `${window.location.origin}/`,
        });
      }
    }

    signIn();
  }, [medplum, loginState, medplum.getActiveLogin(), medplum.isLoading()]);

  const fhirClient = useMemo(() => {
    if (!medplum) {
      return undefined;
    }
    return buildFhirRestfulClientAdapter(medplum);
  }, [medplum]);

  if (!fhirClient) {
    return null;
  }

  if (!loginState) {
    return null;
  }

  return (
    <BrowserRouter>
      <FhirQueryProvider fhirClient={fhirClient}>
        <ConfigProvider>
          <FhirUIComponentsProvider renderer={renderer}>
            <AppRoutes />
            <ReactQueryDevtools />
          </FhirUIComponentsProvider>
        </ConfigProvider>
      </FhirQueryProvider>
    </BrowserRouter>
  );
}
