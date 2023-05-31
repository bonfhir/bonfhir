import {
  Bundle,
  BundleNavigator,
  CapabilityStatement,
  ValueSetExpandOperation,
  build,
} from "@bonfhir/core/r5";
import { renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import React, { PropsWithChildren } from "react";
import {
  DEFAULT_FHIR_CLIENT,
  FhirQueryProvider,
  useFhirCapabilities,
  useFhirClientQueryContext,
  useFhirExecute,
  useFhirHistory,
  useFhirInfiniteSearch,
  useFhirRead,
  useFhirSearch,
  useFhirSearchOne,
  useFhirUpdateMutation,
  useFhirVRead,
} from "./index.js";

globalThis.React = React;

describe("hooks", () => {
  const baseUrl = "http://example.com";

  const server = setupServer(
    rest.get(`${baseUrl}/Patient/:patientId`, (req, res, ctx) => {
      if (req.params.patientId === "not-found") {
        return res(ctx.status(404));
      }

      return res(
        ctx.json(build("Patient", { id: req.params.patientId as string }))
      );
    }),

    rest.get(`${baseUrl}/Patient/:patientId/_history`, (_req, res, ctx) => {
      return res(ctx.json({ resourceType: "Bundle", entry: [] }));
    }),

    rest.get(
      `${baseUrl}/Patient/:patientId/_history/:versionId`,
      (req, res, ctx) => {
        if (req.params.patientId === "not-found") {
          return res(ctx.status(404));
        }

        return res(
          ctx.json(build("Patient", { id: req.params.patientId as string }))
        );
      }
    ),

    rest.get(`${baseUrl}/Patient`, (req, res, ctx) => {
      if (req.url.searchParams.get("_page_token")) {
        return res(ctx.json({ resourceType: "Bundle" }));
      }

      const bundle: Bundle = {
        resourceType: "Bundle",
        type: "searchset",
        entry: [
          {
            resource: build("Patient", {}),
            search: {
              mode: "match",
            },
          },
        ],
        link: [
          {
            relation: "next",
            url: `${baseUrl}/Patient?_page_token=next`,
          },
        ],
      };
      return res(ctx.json(bundle));
    }),

    rest.get(`${baseUrl}/metadata`, async (_req, res, ctx) => {
      return res(
        ctx.json(build("CapabilityStatement", {} as CapabilityStatement))
      );
    }),

    rest.get(`${baseUrl}/ValueSet/$expand`, (req, res, ctx) => {
      return res(
        ctx.json({
          resourceType: "ValueSet",
          url: req.url.searchParams.get("url"),
        })
      );
    }),

    rest.put(
      `${baseUrl}/Organization/:organizationId`,
      async (req, res, ctx) => {
        return res(
          ctx.json(
            build("Organization", { id: req.params.organizationId as string })
          )
        );
      }
    )
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

  describe("queries", () => {
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

    it("vread", async () => {
      const { result } = renderHook(
        () =>
          useFhirVRead("Patient", "a942b3d5-19bc-4959-8b5d-f9aedd790a94", "1"),
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

    it("history", async () => {
      const { result } = renderHook(
        () => useFhirHistory("Patient", "a942b3d5-19bc-4959-8b5d-f9aedd790a94"),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data).toBeDefined();
      });
    });

    describe("search", () => {
      it("initial search", async () => {
        const { result } = renderHook(
          () => useFhirSearch("Patient", (search) => search.name("John Doe")),
          { wrapper }
        );

        await waitFor(() => {
          expect(result.current.isSuccess).toBeTruthy();
          expect(result.current.data).toBeInstanceOf(BundleNavigator);
        });
      });

      it("next page", async () => {
        const { result } = renderHook(
          () => useFhirSearch("Patient", (search) => search.name("John Doe")),
          { wrapper }
        );

        await waitFor(() => {
          expect(result.current.isSuccess).toBeTruthy();
          expect(result.current.data?.linkUrl("next")).toBeDefined();
        });

        const { result: nextPageResult } = renderHook(
          () =>
            useFhirSearch(
              "Patient",
              (search) => search.name("John Doe"),
              result.current.data?.linkUrl("next")
            ),
          { wrapper }
        );

        await waitFor(() => {
          expect(nextPageResult.current.isSuccess).toBeTruthy();
          expect(nextPageResult.current.data).toBeInstanceOf(BundleNavigator);
        });
      });
    });

    it("infinite-search", async () => {
      const { result } = renderHook(
        () =>
          useFhirInfiniteSearch("Patient", (search) => search.name("John Doe")),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data?.pages.at(-1)).toBeInstanceOf(
          BundleNavigator
        );
        expect(result.current.hasNextPage).toBeTruthy();
      });
    });

    it("search-one", async () => {
      const { result } = renderHook(
        () => useFhirSearchOne("Patient", (search) => search.name("The one")),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data?.resourceType).toEqual("Patient");
      });
    });

    it("capabilities", async () => {
      const { result } = renderHook(() => useFhirCapabilities(), { wrapper });

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data).toBeDefined();
      });
    });

    it("execute", async () => {
      const { result } = renderHook(
        () =>
          useFhirExecute(
            new ValueSetExpandOperation({
              url: "http://hl7.org/fhir/ValueSet/example",
            })
          ),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data?.resourceType).toEqual("ValueSet");
        expect(result.current.data?.url).toEqual(
          "http://hl7.org/fhir/ValueSet/example"
        );
      });
    });
  });

  describe("mutations", () => {
    it("update", async () => {
      const { result } = renderHook(
        () => useFhirUpdateMutation("Organization"),
        {
          wrapper,
        }
      );

      result.current.mutate(
        build("Organization", {
          id: "a942b3d5-19bc-4959-8b5d-f9aedd790a94",
        })
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data?.resourceType).toEqual("Organization");
      });
    });
  });
});
