import { build } from "@bonfhir/core/r5";
import { renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
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

  const server = setupServer(
    rest.get(`${baseUrl}/Patient/:patientId`, (req, res, ctx) => {
      if (req.params.patientId === "not-found") {
        return res(ctx.status(404));
      }

      return res(
        ctx.json(build("Patient", { id: req.params.patientId as string }))
      );
    })
  );

  const wrapper = ({ children }: PropsWithChildren) => (
    <FhirQueryProvider fhirClient={baseUrl}>{children}</FhirQueryProvider>
  );

  beforeAll(() => server.listen());

  beforeEach(() => {
    const { result } = renderHook(
      () => useFhirClientQueryContext(DEFAULT_FHIR_CLIENT),
      { wrapper }
    );

    result.current.queryClient.clear();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it("read", async () => {
    const { result } = renderHook(
      () => useFhirRead("Patient", "a942b3d5-19bc-4959-8b5d-f9aedd790a94"),
      { wrapper }
    );

    await waitFor(
      () => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data).toMatchObject({
          resourceType: "Patient",
          id: "a942b3d5-19bc-4959-8b5d-f9aedd790a94",
        });
      },
      { timeout: 10_000 }
    );
  }, 10_000);
});
