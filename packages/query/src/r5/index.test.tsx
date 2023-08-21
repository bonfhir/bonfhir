import {
  Bundle,
  BundleExecutor,
  BundleNavigator,
  CapabilityStatement,
  Claim,
  Organization,
  Patient,
  Resource,
  Retrieved,
  ValueSet,
  build,
  extendResource,
  uuid,
} from "@bonfhir/core/r5";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import React, { PropsWithChildren } from "react";
import {
  DEFAULT_FHIR_CLIENT,
  FhirQueryProvider,
  UseFhirGraph,
  useFhirBatchMutation,
  useFhirCapabilities,
  useFhirClientQueryContext,
  useFhirCreateMutation,
  useFhirCreateOrMutation,
  useFhirDeleteMutation,
  useFhirExecute,
  useFhirExecuteMutation,
  useFhirGraphQL,
  useFhirGraphQLMutation,
  useFhirHistory,
  useFhirInfiniteSearch,
  useFhirPatchMutation,
  useFhirRead,
  useFhirSaveMutation,
  useFhirSearch,
  useFhirSearchAllPages,
  useFhirSearchOne,
  useFhirTransactionMutation,
  useFhirUpdateMutation,
  useFhirVRead,
} from "./index";

globalThis.React = React;

describe("hooks", () => {
  const CustomPatient = extendResource("Patient", {
    toto() {
      return "aah";
    },
  });

  // GraphQL TypedDocumentNode generated.
  // We just take the output of the generation here, to not bring too much external dependencies in the project.
  type ListOrganizationsQueryVariables = {
    name?: string;
  };

  type ListOrganizationsQuery = {
    __typename?: "QueryType";
    OrganizationList?: Array<{
      __typename?: "Organization";
      resourceType: string;
      id?: string | null;
      name?: string | null;
      alias?: Array<string> | null;
    } | null> | null;
  };

  const ListOrganizationsDocument = {
    kind: "Document",
    definitions: [
      {
        kind: "OperationDefinition",
        operation: "query",
        name: { kind: "Name", value: "ListOrganizations" },
        variableDefinitions: [
          {
            kind: "VariableDefinition",
            variable: {
              kind: "Variable",
              name: { kind: "Name", value: "name" },
            },
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        ],
        selectionSet: {
          kind: "SelectionSet",
          selections: [
            {
              kind: "Field",
              name: { kind: "Name", value: "OrganizationList" },
              arguments: [
                {
                  kind: "Argument",
                  name: { kind: "Name", value: "name" },
                  value: {
                    kind: "Variable",
                    name: { kind: "Name", value: "name" },
                  },
                },
              ],
              selectionSet: {
                kind: "SelectionSet",
                selections: [
                  {
                    kind: "Field",
                    name: { kind: "Name", value: "resourceType" },
                  },
                  { kind: "Field", name: { kind: "Name", value: "id" } },
                  { kind: "Field", name: { kind: "Name", value: "name" } },
                  { kind: "Field", name: { kind: "Name", value: "alias" } },
                ],
              },
            },
          ],
        },
      },
    ],
  } as unknown as TypedDocumentNode<
    ListOrganizationsQuery,
    ListOrganizationsQueryVariables
  >;

  const baseUrl = "http://example.com";

  const server = setupServer(
    rest.get(`${baseUrl}/Patient/:patientId`, (req, res, ctx) => {
      if (req.params.patientId === "not-found") {
        return res(ctx.status(404));
      }

      return res(
        ctx.json(build("Patient", { id: req.params.patientId as string })),
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
          ctx.json(build("Patient", { id: req.params.patientId as string })),
        );
      },
    ),

    rest.get(`${baseUrl}/Patient`, (req, res, ctx) => {
      if (req.url.searchParams.get("_page_token")) {
        return res(
          ctx.json({
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
          }),
        );
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
        ctx.json(build("CapabilityStatement", {} as CapabilityStatement)),
      );
    }),

    rest.get(`${baseUrl}/ValueSet/$expand`, (req, res, ctx) => {
      return res(
        ctx.json({
          resourceType: "ValueSet",
          url: req.url.searchParams.get("url"),
        }),
      );
    }),

    rest.put(
      `${baseUrl}/Organization/:organizationId`,
      async (req, res, ctx) => {
        return res(
          ctx.json(
            build("Organization", { id: req.params.organizationId as string }),
          ),
        );
      },
    ),

    rest.patch(`${baseUrl}/Patient/:patientId`, async (req, res, ctx) => {
      return res(
        ctx.json({ resourceType: "Patient", id: req.params.patientId }),
      );
    }),

    rest.delete(`${baseUrl}/Patient/:patientId`, (_req, res, ctx) => {
      return res(ctx.status(204));
    }),

    rest.post(`${baseUrl}/Organization`, async (req, res, ctx) => {
      return res(ctx.json({ ...(await req.json<Organization>()), id: uuid() }));
    }),

    rest.post(`${baseUrl}/Claim/$submit`, (_req, res, ctx) => {
      return res(ctx.json({}));
    }),

    rest.post(`${baseUrl}/`, async (req, res, ctx) => {
      const requestBundle = await req.json<Bundle>();
      return res(
        ctx.json({
          resourceType: "Bundle",
          type: `${requestBundle.type}-response`,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          entry: requestBundle.entry!.map(() => ({
            resource: {},
          })),
        }),
      );
    }),

    rest.get(`${baseUrl}/Organization`, (_req, res, ctx) => {
      return res(
        ctx.json({ resourceType: "Bundle", type: "searchset", entry: [] }),
      );
    }),

    rest.get(
      `${baseUrl}/Patient/50e500d7-2afd-42a8-adb7-350489ea3e3c/$graph`,
      async (_, res, ctx) => {
        const bundle: Bundle = {
          resourceType: "Bundle",
          type: "collection",
          entry: [],
        };

        return res(ctx.json(bundle));
      },
    ),

    rest.post(`${baseUrl}/$graphql`, async (req, res, ctx) => {
      const { query, variables } = await req.json();

      if (variables?.id === "graphql-error") {
        return res(
          ctx.json({
            errors: [
              {
                message: "Not found",
                path: ["Patient"],
                locations: [
                  {
                    line: 1,
                    column: 3,
                  },
                ],
                extensions: {},
              },
            ],
            data: {
              Patient: undefined,
            },
          }),
        );
      }

      if (query.includes("OrganizationList")) {
        return res(
          ctx.json({
            data: {
              OrganizationList: [
                {
                  resourceType: "Organization",
                  id: "86ea22f7-4b7c-4470-8fe7-294933d02e02",
                  name: "Acme, Inc",
                  alias: undefined,
                },
              ],
            },
          }),
        );
      }

      return res(
        ctx.json({
          data: {
            Patient: {
              resourceType: "Patient",
              id: variables?.id || "patient-id",
              name: [
                {
                  given: ["John"],
                  family: "Doe",
                },
              ],
            },
          },
        }),
      );
    }),
  );

  const wrapper = ({ children }: PropsWithChildren) => (
    <FhirQueryProvider
      fhirClient={baseUrl}
      queryClientConfig={{
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      }}
    >
      {children}
    </FhirQueryProvider>
  );

  beforeAll(() => server.listen());

  beforeEach(() => {
    const { result } = renderHook(
      () => useFhirClientQueryContext(DEFAULT_FHIR_CLIENT),
      { wrapper },
    );

    result.current.queryClient.clear();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  describe("queries", () => {
    it("read", async () => {
      const { result } = renderHook(
        () => useFhirRead("Patient", "a942b3d5-19bc-4959-8b5d-f9aedd790a94"),
        { wrapper },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data).toMatchObject({
          resourceType: "Patient",
          id: "a942b3d5-19bc-4959-8b5d-f9aedd790a94",
        });
      });
    });

    it("read with custom type", async () => {
      const { result } = renderHook(
        () =>
          useFhirRead(CustomPatient, "a942b3d5-19bc-4959-8b5d-f9aedd790a94"),
        { wrapper },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data).toBeInstanceOf(CustomPatient);
      });
    });

    it("read a reference", async () => {
      const { result } = renderHook(
        () =>
          useFhirRead("Patient", {
            reference: "Patient/a942b3d5-19bc-4959-8b5d-f9aedd790a94",
          }),
        { wrapper },
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
        { wrapper },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data).toMatchObject({
          resourceType: "Patient",
          id: "a942b3d5-19bc-4959-8b5d-f9aedd790a94",
        });
      });
    });

    it("vread with custom type", async () => {
      const { result } = renderHook(
        () =>
          useFhirVRead(
            CustomPatient,
            "a942b3d5-19bc-4959-8b5d-f9aedd790a94",
            "1",
          ),
        { wrapper },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data).toBeInstanceOf(CustomPatient);
      });
    });

    it("history", async () => {
      const { result } = renderHook(
        () => useFhirHistory("Patient", "a942b3d5-19bc-4959-8b5d-f9aedd790a94"),
        { wrapper },
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
          { wrapper },
        );

        await waitFor(() => {
          expect(result.current.isSuccess).toBeTruthy();
          expect(result.current.data).toBeInstanceOf(BundleNavigator);
        });
      });

      it("next page", async () => {
        const { result } = renderHook(
          () => useFhirSearch("Patient", (search) => search.name("John Doe")),
          { wrapper },
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
              result.current.data?.linkUrl("next"),
            ),
          { wrapper },
        );

        await waitFor(() => {
          expect(nextPageResult.current.isSuccess).toBeTruthy();
          expect(nextPageResult.current.data).toBeInstanceOf(BundleNavigator);
        });
      });

      it("initial search with custom type", async () => {
        const { result } = renderHook(
          () =>
            useFhirSearch(CustomPatient, (search) => search.name("John Doe")),
          { wrapper },
        );

        await waitFor(() => {
          expect(result.current.isSuccess).toBeTruthy();
          expect(result.current.data).toBeInstanceOf(BundleNavigator);
          for (const patient of result.current.data?.searchMatch() || []) {
            expect(patient).toBeInstanceOf(CustomPatient);
          }
        });
      });

      it("next page with custom type", async () => {
        const { result } = renderHook(
          () =>
            useFhirSearch(CustomPatient, (search) => search.name("John Doe")),
          { wrapper },
        );

        await waitFor(() => {
          expect(result.current.isSuccess).toBeTruthy();
          expect(result.current.data?.linkUrl("next")).toBeDefined();
        });

        const { result: nextPageResult } = renderHook(
          () =>
            useFhirSearch(
              CustomPatient,
              (search) => search.name("John Doe"),
              result.current.data?.linkUrl("next"),
            ),
          { wrapper },
        );

        await waitFor(() => {
          expect(nextPageResult.current.isSuccess).toBeTruthy();
          expect(nextPageResult.current.data).toBeInstanceOf(BundleNavigator);
          for (const patient of result.current.data?.searchMatch() || []) {
            expect(patient).toBeInstanceOf(CustomPatient);
          }
        });
      });
    });

    it("infinite-search", async () => {
      const { result } = renderHook(
        () =>
          useFhirInfiniteSearch("Patient", (search) => search.name("John Doe")),
        { wrapper },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data?.pages.at(-1)).toBeInstanceOf(
          BundleNavigator,
        );
        expect(result.current.hasNextPage).toBeTruthy();
      });
    });

    it("infinite-search with custom type", async () => {
      const { result } = renderHook(
        () =>
          useFhirInfiniteSearch(CustomPatient, (search) =>
            search.name("John Doe"),
          ),
        { wrapper },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data?.pages.at(-1)).toBeInstanceOf(
          BundleNavigator,
        );
        expect(result.current.hasNextPage).toBeTruthy();
        for (const patient of result.current.data?.pages.flatMap((page) =>
          page.searchMatch(),
        ) || []) {
          expect(patient).toBeInstanceOf(CustomPatient);
        }
      });
    });

    it("search-one", async () => {
      const { result } = renderHook(
        () => useFhirSearchOne("Patient", (search) => search.name("The one")),
        { wrapper },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data?.resourceType).toEqual("Patient");
      });
    });

    it("search-one with custom type", async () => {
      const { result } = renderHook(
        () =>
          useFhirSearchOne(CustomPatient, (search) => search.name("The one")),
        { wrapper },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data?.resourceType).toEqual("Patient");
        expect(result.current.data).toBeInstanceOf(CustomPatient);
      });
    });

    it("search-all-pages", async () => {
      const { result } = renderHook(
        () =>
          useFhirSearchAllPages("Patient", (search) => search.name("The one")),
        { wrapper },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data).toBeInstanceOf(BundleNavigator);
      });
    });

    it("search-all-pages with custom type", async () => {
      const { result } = renderHook(
        () =>
          useFhirSearchAllPages(CustomPatient, (search) =>
            search.name("The one"),
          ),
        { wrapper },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data).toBeInstanceOf(BundleNavigator);
        for (const patient of result.current.data?.searchMatch() || []) {
          expect(patient).toBeInstanceOf(CustomPatient);
        }
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
          useFhirExecute<ValueSet>({
            operation: "$expand",
            resourceType: "ValueSet",
            parameters: [
              { name: "url", valueUri: "http://hl7.org/fhir/ValueSet/example" },
            ],
            affectsState: false,
          }),
        { wrapper },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data?.resourceType).toEqual("ValueSet");
        expect(result.current.data?.url).toEqual(
          "http://hl7.org/fhir/ValueSet/example",
        );
      });
    });

    it("graph", async () => {
      const { result } = renderHook(
        () =>
          UseFhirGraph(
            "patient-with-appointments",
            "Patient",
            "50e500d7-2afd-42a8-adb7-350489ea3e3c",
          ),
        { wrapper },
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data).toBeInstanceOf(BundleNavigator);
      });
    });

    describe("GraphQL", () => {
      it("execute a query as a string", async () => {
        const { result } = renderHook(
          () =>
            useFhirGraphQL(
              `{
                Patient(id: "patient-id") {
                  resourceType
                  id
                  name {
                    given
                    family
                  }
                }
              }`,
            ),
          { wrapper },
        );

        await waitFor(() => {
          expect(result.current.isSuccess).toBeTruthy();
          expect(result.current.data).toMatchObject({
            Patient: {
              resourceType: "Patient",
              id: expect.stringMatching(/.+/),
            },
          });
        });
      });

      it("execute a query as a document", async () => {
        const { result } = renderHook(
          () =>
            useFhirGraphQL(ListOrganizationsDocument, {
              name: "Acme, Inc",
            }),
          { wrapper },
        );

        await waitFor(() => {
          expect(result.current.isSuccess).toBeTruthy();
          expect(result.current.data).toMatchObject({
            OrganizationList: [
              {
                resourceType: "Organization",
                name: "Acme, Inc",
              },
            ],
          } satisfies Partial<ListOrganizationsQuery>);
        });
      });
    });
  });

  describe("mutations", () => {
    it("update", async () => {
      const { result } = renderHook(
        () => useFhirUpdateMutation("Organization"),
        {
          wrapper,
        },
      );

      result.current.mutate(
        build("Organization", {
          id: "a942b3d5-19bc-4959-8b5d-f9aedd790a94",
        }),
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data?.resourceType).toEqual("Organization");
      });
    });

    it("patch", async () => {
      const { result } = renderHook(() => useFhirPatchMutation("Patient"), {
        wrapper,
      });

      result.current.mutate({
        id: "123",
        body: (patch) => patch.add("/active", true),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data?.resourceType).toEqual("Patient");
      });
    });

    it("delete", async () => {
      const { result } = renderHook(() => useFhirDeleteMutation(), {
        wrapper,
      });

      result.current.mutate(
        build("Patient", { id: "123" }) as Retrieved<Patient>,
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
      });
    });

    it("create", async () => {
      const { result } = renderHook(
        () => useFhirCreateMutation("Organization"),
        {
          wrapper,
        },
      );

      result.current.mutate(build("Organization", {}));

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data?.resourceType).toEqual("Organization");
      });
    });

    it("create", async () => {
      const { result } = renderHook(
        () => useFhirCreateOrMutation("Organization"),
        {
          wrapper,
        },
      );

      result.current.mutate({
        action: "return",
        body: build("Organization", {
          name: "Acme, Inc.",
        }),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const [resource, isChanged] = result.current.data!;
        expect(resource.resourceType).toEqual("Organization");
        expect(isChanged).toBeTruthy();
      });
    });

    it("save", async () => {
      const { result } = renderHook(() => useFhirSaveMutation("Organization"), {
        wrapper,
      });

      result.current.mutate(build("Organization", {}));

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data?.resourceType).toEqual("Organization");
      });
    });

    it("execute", async () => {
      const { result } = renderHook(() => useFhirExecuteMutation<Resource>(), {
        wrapper,
      });

      result.current.mutate({
        operation: "$submit",
        resourceType: "Claim",
        parameters: [
          {
            name: "resource",
            resource: build("Claim", {} as Claim),
          },
        ],
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data).toBeDefined();
      });
    });

    it("transaction", async () => {
      const { result } = renderHook(() => useFhirTransactionMutation(), {
        wrapper,
      });

      result.current.mutate((transaction) => {
        transaction.update(build("Patient", { id: "123" }));
        transaction.update(build("Organization", { id: "123" }));
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data).toBeInstanceOf(BundleExecutor);
        expect(result.current.data?.request.type).toBe("transaction");
        expect(result.current.data?.futureRequests).toHaveLength(2);
        expect(result.current.data?.futureRequests[0]?.sent).toBeTruthy();
      });
    });

    it("batch", async () => {
      const { result } = renderHook(() => useFhirBatchMutation(), {
        wrapper,
      });

      result.current.mutate((batch) => {
        batch.update(build("Patient", { id: "123" }));
        batch.update(build("Organization", { id: "123" }));
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBeTruthy();
        expect(result.current.data).toBeInstanceOf(BundleExecutor);
        expect(result.current.data?.request.type).toBe("batch");
        expect(result.current.data?.futureRequests).toHaveLength(2);
        expect(result.current.data?.futureRequests[0]?.sent).toBeTruthy();
      });
    });

    describe("GraphQL", () => {
      it("execute a mutation as a string", async () => {
        const { result } = renderHook(
          () =>
            useFhirGraphQLMutation(
              `{
                Patient(id: "patient-id") {
                  resourceType
                  id
                  name {
                    given
                    family
                  }
                }
              }`,
            ),
          { wrapper },
        );

        result.current.mutate({});

        await waitFor(() => {
          expect(result.current.isSuccess).toBeTruthy();
          expect(result.current.data).toMatchObject({
            Patient: {
              resourceType: "Patient",
              id: expect.stringMatching(/.+/),
            },
          });
        });
      });

      it("execute a mutation as a document", async () => {
        const { result } = renderHook(
          () => useFhirGraphQLMutation(ListOrganizationsDocument),
          { wrapper },
        );

        result.current.mutate({ name: "Acme, Inc" });

        await waitFor(() => {
          expect(result.current.isSuccess).toBeTruthy();
          expect(result.current.data).toMatchObject({
            OrganizationList: [
              {
                resourceType: "Organization",
                name: "Acme, Inc",
              },
            ],
          } satisfies Partial<ListOrganizationsQuery>);
        });
      });
    });
  });
});
