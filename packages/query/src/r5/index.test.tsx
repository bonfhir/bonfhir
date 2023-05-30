import { renderHook, waitFor } from "@testing-library/react";
import React, { PropsWithChildren } from "react";
import {
  DEFAULT_FHIR_CLIENT,
  FhirQueryProvider,
  useFhirClientQueryContext,
  useFhirRead,
} from "./index.js";

globalThis.React = React;

describe("query", () => {
  const baseUrl = "http://example.com";

  const wrapper = ({ children }: PropsWithChildren) => (
    <FhirQueryProvider fhirClient={baseUrl}>{children}</FhirQueryProvider>
  );

  beforeEach(() => {
    const { result } = renderHook(
      () => useFhirClientQueryContext(DEFAULT_FHIR_CLIENT),
      { wrapper }
    );

    result.current.queryClient.clear();
  });

  it("read", async () => {
    const { result } = renderHook(
      () => useFhirRead("Patient", "a942b3d5-19bc-4959-8b5d-f9aedd790a94"),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
      expect(result.current.data).toMatchObject({
        resourceType: "Patient",
        id: "a942b3d5-19bc-4959-8b5d-f9aedd790a94",
      });
    });
  });
});
