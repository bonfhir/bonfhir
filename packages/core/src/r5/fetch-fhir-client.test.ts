import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { rest } from "msw";
import { setupServer } from "msw/node";
import * as graphResultFixture from "../../fixtures/bundle-graph-result.fhir.json";
import * as patientsListFixture from "../../fixtures/bundle-navigator.list-patients.test.fhir.json";
import * as patientExample from "../../fixtures/patient-example.fhir.json";
import { build } from "./builders";
import { BundleExecutor } from "./bundle-executor";
import { BundleNavigator, bundleNavigator } from "./bundle-navigator";
import { extendResource, extension } from "./extensions";
import { FetchFhirClient } from "./fetch-fhir-client";
import { FhirClient } from "./fhir-client";
import {
  Bundle,
  CapabilityStatement,
  Claim,
  Organization,
  Patient,
  Reference,
} from "./fhir-types.codegen";
import { uuid } from "./lang-utils";

const CustomPatient = extendResource("Patient", {
  /** L'age de toto. */
  toto: extension({
    url: "http://example.com/toto",
    kind: "valueAge",
  }),
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
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
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

describe("fetch-fhir-client", () => {
  const baseUrl = "http://example.com";
  const client: FhirClient = new FetchFhirClient({ baseUrl });

  const server = setupServer(
    rest.get(`${baseUrl}/Patient/_history`, (_req, res, ctx) => {
      return res(ctx.json({ resourceType: "Bundle", entry: [] }));
    }),

    rest.get(`${baseUrl}/Patient/:patientId`, (req, res, ctx) => {
      if (req.params.patientId === "not-found") {
        return res(ctx.status(404));
      }

      return res(ctx.json({ ...patientExample, id: req.params.patientId }));
    }),

    rest.get(
      `${baseUrl}/Patient/:patientId/_history/:versionId`,
      (req, res, ctx) => {
        if (req.params.patientId === "not-found") {
          return res(ctx.status(404));
        }

        return res(ctx.json({ ...patientExample, id: req.params.patientId }));
      },
    ),

    rest.put(`${baseUrl}/Organization`, async (req, res, ctx) => {
      return res(ctx.json({ ...(await req.json<Organization>()), id: uuid() }));
    }),

    rest.put(
      `${baseUrl}/Organization/:organizationId`,
      async (req, res, ctx) => {
        return res(ctx.json(await req.json<Organization>()));
      },
    ),

    rest.put(`${baseUrl}/Patient/:patientId`, async (req, res, ctx) => {
      return res(ctx.json(await req.json<Patient>()));
    }),

    rest.patch(`${baseUrl}/Patient/:patientId`, async (req, res, ctx) => {
      return res(ctx.json({ ...patientExample, id: req.params.patientId }));
    }),

    rest.delete(`${baseUrl}/Patient/:patientId`, (req, res, ctx) => {
      if (req.params.patientId === "not-found") {
        return res(ctx.status(404));
      }

      return res(ctx.status(204));
    }),

    rest.get(`${baseUrl}/_history`, (_req, res, ctx) => {
      return res(ctx.json({ resourceType: "Bundle", entry: [] }));
    }),

    rest.get(`${baseUrl}/Patient/:patientId/_history`, (_req, res, ctx) => {
      return res(ctx.json({ resourceType: "Bundle", entry: [] }));
    }),

    rest.post(`${baseUrl}/Organization`, async (req, res, ctx) => {
      return res(ctx.json({ id: uuid(), ...(await req.json<Organization>()) }));
    }),

    rest.post(`${baseUrl}/Patient`, async (req, res, ctx) => {
      return res(ctx.json({ id: uuid(), ...(await req.json<Patient>()) }));
    }),

    rest.get(`${baseUrl}/`, (_req, res, ctx) => {
      return res(ctx.json(patientsListFixture));
    }),

    rest.get(`${baseUrl}/Patient`, (req, res, ctx) => {
      if (req.url.searchParams.get("_page_token")) {
        return res(ctx.json({ resourceType: "Bundle" }));
      }
      return res(ctx.json(patientsListFixture));
    }),

    rest.get(`${baseUrl}/metadata`, async (_req, res, ctx) => {
      return res(
        ctx.json(build("CapabilityStatement", {} as CapabilityStatement)),
      );
    }),

    rest.post(`${baseUrl}/`, (_req, res, ctx) => {
      return res(ctx.json(patientsListFixture));
    }),

    rest.get(`${baseUrl}/$convert`, (_req, res, ctx) => {
      return res(ctx.json(patientsListFixture));
    }),

    rest.post(`${baseUrl}/Claim/$submit`, async (_req, res, ctx) => {
      return res(ctx.json(patientsListFixture));
    }),

    rest.post(
      `${baseUrl}/Composition/:compositionId/$document`,
      (_req, res, ctx) => {
        return res(ctx.json(patientsListFixture));
      },
    ),

    rest.get(`${baseUrl}/ValueSet/$expand`, (_req, res, ctx) => {
      return res(ctx.json(patientsListFixture));
    }),

    rest.get(`${baseUrl}/ConceptMap`, (req, res, ctx) => {
      const searchedUrl = req.url.searchParams.get("url");
      if (searchedUrl === "http://existingconceptmap") {
        return res(
          ctx.json(<Bundle>{
            resourceType: "Bundle",
            type: "searchset",
            entry: [
              {
                resource: build("ConceptMap", {
                  id: "theconceptmapid",
                  url: searchedUrl,
                  status: "active",
                }),
              },
            ],
          }),
        );
      }

      return res(
        ctx.json(<Bundle>{
          resourceType: "Bundle",
          type: "searchset",
          entry: [],
        }),
      );
    }),

    rest.post(`${baseUrl}/ConceptMap`, async (req, res, ctx) => {
      return res(ctx.json({ id: uuid(), ...(await req.json<object>()) }));
    }),

    rest.put(`${baseUrl}/ConceptMap/:conceptMapId`, async (req, res, ctx) => {
      return res(ctx.json(await req.json()));
    }),

    rest.get(
      `${baseUrl}/Patient/50e500d7-2afd-42a8-adb7-350489ea3e3c/$graph`,
      async (req, res, ctx) => {
        const graph = req.url.searchParams.get("graph");
        if (graph !== "patient-with-appointments") {
          throw new Error(`Incorrect graph parameter: ${graph}`);
        }

        return res(ctx.json(graphResultFixture));
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

  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  describe("read", () => {
    it("a resource", async () => {
      const result = await client.read("Patient", "123");
      expect(result).toBeDefined();
      expect(result?.resourceType).toEqual("Patient");
    });

    it("a resource with options", async () => {
      const result = await client.read("Patient", "123", { _pretty: true });
      expect(result).toBeDefined();
      expect(result?.resourceType).toEqual("Patient");
    });

    it("a resource with a custom type", async () => {
      const result = await client.read(CustomPatient, "123");
      expect(result).toBeInstanceOf(CustomPatient);
      expect(result.name).toBeTruthy();
    });

    it("a typed reference", async () => {
      const reference: Reference<Patient> = { reference: "Patient/123" };
      const result = await client.read(reference);
      expect(result).toBeDefined();
      expect(result?.resourceType).toEqual("Patient");
    });

    it("an untyped reference", async () => {
      const reference: Reference = { reference: "Patient/123" };
      const result = await client.read("Patient", reference);
      expect(result).toBeDefined();
      expect(result?.resourceType).toEqual("Patient");
    });
  });

  describe("vread", () => {
    it("a resource", async () => {
      const result = await client.vread("Patient", "123", "1");
      expect(result).toBeDefined();
      expect(result?.resourceType).toEqual("Patient");
    });

    it("a resource with options", async () => {
      const result = await client.vread("Patient", "123", "1", {
        _elements: "id,name",
      });
      expect(result).toBeDefined();
      expect(result?.resourceType).toEqual("Patient");
    });

    it("a resource with custom type", async () => {
      const result = await client.vread(CustomPatient, "123", "1");
      expect(result).toBeInstanceOf(CustomPatient);
      expect(result.name).toBeTruthy();
    });
  });

  describe("update", () => {
    it("resource with a creation", async () => {
      const organization = build("Organization", {});
      const result = await client.update(organization);
      expect(result.resourceType).toEqual("Organization");
    });

    it("resource with an actual update", async () => {
      const organization = build("Organization", {
        id: uuid(),
        name: "Acme, Inc.",
      });
      const result = await client.update(organization);
      expect(result.id).toEqual(organization.id);
    });

    it("resource with concurrent update", async () => {
      const organization = build("Organization", {
        id: uuid(),
        name: "Acme, Inc.",
        meta: {
          versionId: "1",
        },
      });
      const result = await client.update(organization, {
        preventConcurrentUpdates: true,
      });
      expect(result.id).toEqual(organization.id);
    });

    it("resource with conditional update", async () => {
      const organization = build("Organization", {
        id: uuid(),
        name: "Acme, Inc.",
      });
      const result = await client.update(organization, {
        search: (search) => search.active("true"),
      });
      expect(result.id).toEqual(organization.id);
    });

    it("resource with a creation with custom type", async () => {
      const patient = new CustomPatient({
        id: "custom-type",
        name: [{ given: ["John"], family: "Doe" }],
      });
      const result = await client.update(patient);
      expect(result).toBeInstanceOf(CustomPatient);
      expect(result.name).toBeTruthy();
    });
  });

  describe("patch", () => {
    it("resource with builder", async () => {
      const result = await client.patch("Patient", "123", (patch) =>
        patch.add("/active", true),
      );
      expect(result).toBeDefined();
    });

    it("resource with JSON patch body", async () => {
      const result = await client.patch("Patient", "123", [
        { op: "remove", path: "/active" },
      ]);
      expect(result).toBeDefined();
    });

    it("resource with concurrent update", async () => {
      const result = await client.patch(
        "Patient",
        "123",
        (patch) => patch.add("/active", true),
        { preventConcurrentUpdates: true, versionId: "1" },
      );
      expect(result).toBeDefined();
    });

    it("resource with condition update", async () => {
      const result = await client.patch(
        "Patient",
        "123",
        (patch) => patch.add("/active", false),
        { search: (search) => search.deceased("true") },
      );
      expect(result).toBeDefined();
    });

    it("resource with custom type", async () => {
      const result = await client.patch(CustomPatient, "123", (patch) =>
        patch.add("/active", true),
      );
      expect(result).toBeInstanceOf(CustomPatient);
      expect(result.name).toBeTruthy();
    });
  });

  describe("delete", () => {
    it("by type and id", async () => {
      await client.delete("Patient", "123");
    });

    it("by resource", async () => {
      const patient = await client.read("Patient", "123");
      await client.delete(patient);
    });
  });

  describe("history", () => {
    it("root", async () => {
      const result = await client.history(undefined, undefined, {
        _since: "2021-01-01",
      });
      expect(result).toBeDefined();
    });

    it("by type", async () => {
      const result = await client.history("Patient");
      expect(result).toBeDefined();
    });

    it("by type and id", async () => {
      const result = await client.history("Patient", "123");
      expect(result).toBeDefined();
    });

    it("by resource", async () => {
      const patient = await client.read("Patient", "123");
      const result = await client.history(patient);
      expect(result).toBeDefined();
    });
  });

  describe("create", () => {
    it("resource", async () => {
      const organization = build("Organization", {});
      const result = await client.create(organization);
      expect(result.resourceType).toEqual("Organization");
    });

    it("resource with conditional create", async () => {
      const organization = build("Organization", {
        id: uuid(),
        name: "Acme, Inc.",
      });
      const result = await client.create(organization, {
        search: (search) => search.name("Acme, Inc."),
      });
      expect(result.id).toEqual(organization.id);
    });

    it("resource with custom type", async () => {
      const patient = new CustomPatient({
        name: [{ given: ["John"], family: "Doe" }],
      });
      const result = await client.create(patient);
      expect(result).toBeInstanceOf(CustomPatient);
    });
  });

  describe("createOr", () => {
    it("createOr return existing", async () => {
      const conceptMap = build("ConceptMap", {
        url: "http://existingconceptmap",
        status: "draft",
      });
      const [resultResource, updated] = await client.createOr(
        "return",
        conceptMap,
      );
      expect(updated).toBeFalsy();
      expect(resultResource).not.toBe(conceptMap);
    });

    it("createOr return if not found", async () => {
      const conceptMap = build("ConceptMap", {
        url: "http://notfound",
        status: "draft",
      });
      const [resultResource, updated] = await client.createOr(
        "return",
        conceptMap,
      );
      expect(updated).toBeTruthy();
      expect(resultResource).toMatchObject(conceptMap);
    });

    it("createOr replace", async () => {
      const conceptMap = build("ConceptMap", {
        url: "http://existingconceptmap",
        status: "draft",
      });
      const [, updated] = await client.createOr("replace", conceptMap);
      expect(updated).toBeTruthy();
    });

    it("createOr replace - do nothing if the same", async () => {
      const conceptMap = build("ConceptMap", {
        url: "http://existingconceptmap",
        status: "active",
      });
      const [, updated] = await client.createOr("replace", conceptMap);
      expect(updated).toBeFalsy();
    });
  });

  describe("save", () => {
    it("resource", async () => {
      const organization = build("Organization", {});
      let result = await client.save(organization);
      expect(result.resourceType).toEqual("Organization");
      expect(result.id).toBeTruthy();

      const resultId = result.id;
      result = await client.save(result);
      expect(result.resourceType).toEqual("Organization");
      expect(result.id).toEqual(resultId);
    });
  }),
    describe("search", () => {
      it("root", async () => {
        const result = await client.search();
        expect(result.searchMatch().length).not.toBe(0);
      });

      it("type only", async () => {
        const result = await client.search("Patient");
        expect(result.searchMatch().length).not.toBe(0);
      });

      it("type and search builder", async () => {
        const result = await client.search("Patient", (search) =>
          search.name("John Doe"),
        );
        expect(result.searchMatch().length).not.toBe(0);
      });

      it("type and search string", async () => {
        const result = await client.search("Patient", "name=John");
        expect(result.searchMatch().length).not.toBe(0);
      });

      it("type and search builder with options", async () => {
        const result = await client.search(
          "Patient",
          (search) => search.name("John Doe"),
          { _summary: "true" },
        );
        expect(result.searchMatch().length).not.toBe(0);
      });

      it("with a custom type", async () => {
        const result = await client.search(CustomPatient, (search) =>
          search.name("John Doe"),
        );
        for (const patient of result.searchMatch()) {
          expect(patient).toBeInstanceOf(CustomPatient);
        }
      });
    });

  describe("searchOne", () => {
    it("throw when multiple values are found", async () => {
      await expect(
        client.searchOne("Patient", (search) => search._id("1234")),
      ).rejects.toThrow("Multiple");
    });

    it("throws with a custom type when multiple values are found", async () => {
      await expect(
        client.searchOne(CustomPatient, (search) => search._id("1234")),
      ).rejects.toThrow("Multiple");
    });
  });

  describe("searchByPage", () => {
    it("search by page", async () => {
      await client.searchByPage(
        "Patient",
        (search) => search.name("John Doe"),
        async (result) => {
          expect(result).toBeDefined();
        },
      );
    });

    it("search by page with custom type", async () => {
      await client.searchByPage(
        CustomPatient,
        (search) => search.name("John Doe"),
        async (result) => {
          expect(result).toBeDefined();
          for (const patient of result.searchMatch()) {
            expect(patient).toBeInstanceOf(CustomPatient);
          }
        },
      );
    });
  });

  describe("searchAllPages", () => {
    it("search all pages", async () => {
      const result = await client.searchAllPages("Patient", (search) =>
        search.name("John Doe"),
      );
      expect(result).toBeDefined();
    });

    it("search all pages with custom type", async () => {
      const result = await client.searchAllPages(CustomPatient, (search) =>
        search.name("John Doe"),
      );
      for (const patient of result.searchMatch()) {
        expect(patient).toBeInstanceOf(CustomPatient);
      }
    });
  });

  describe("graph", () => {
    it("execute a $graph operation", async () => {
      const result = await client.graph(
        "patient-with-appointments",
        "Patient",
        "50e500d7-2afd-42a8-adb7-350489ea3e3c",
      );
      expect(result).toBeDefined();
    });

    it("execute a $graph operation with custom type", async () => {
      const result = await client.graph(
        "patient-with-appointments",
        CustomPatient,
        "50e500d7-2afd-42a8-adb7-350489ea3e3c",
      );
      for (const patient of result.searchMatch()) {
        expect(patient).toBeInstanceOf(CustomPatient);
      }
    });
  });

  describe("graphql", () => {
    it("execute a query as string", async () => {
      const result = await client.graphql(`{
        Patient(id: "patient-id") {
          resourceType
          id
          name {
            given
            family
          }
        }
      }`);
      expect(result).toMatchObject({
        Patient: {
          resourceType: "Patient",
          id: expect.stringMatching(/.+/),
        },
      });
    });

    it("execute a query as string with variables", async () => {
      const result = await client.graphql(
        `query GetPatient($id: ID!) {
          Patient(id: $id) {
            resourceType
            id
            name {
              given
              family
            }
          }
        }`,
        {
          id: "patient-id-2",
        },
      );
      expect(result).toMatchObject({
        Patient: {
          resourceType: "Patient",
          id: "patient-id-2",
        },
      });
    });

    it("throw errors on GraphQL errors", async () => {
      await expect(() =>
        client.graphql(
          `query GetPatient($id: ID!) {
            Patient(id: $id) {
              resourceType
              id
              name {
                given
                family
              }
            }
          }`,
          {
            id: "graphql-error",
          },
        ),
      ).rejects.toThrow("GraphQL");
    });

    it("execute a query as typed document", async () => {
      const result = await client.graphql(ListOrganizationsDocument, {
        name: "Acme, Inc",
      });
      expect(result).toMatchObject({
        OrganizationList: [
          {
            resourceType: "Organization",
            name: "Acme, Inc",
          },
        ],
      } satisfies Partial<ListOrganizationsQuery>);
    });
  });

  describe("graphqlResult", () => {
    it("execute a query as string", async () => {
      const result = await client.graphqlResult(`{
        Patient(id: "patient-id") {
          resourceType
          id
          name {
            given
            family
          }
        }
      }`);
      expect(result.data).toMatchObject({
        Patient: {
          resourceType: "Patient",
          id: expect.stringMatching(/.+/),
        },
      });
      expect(result.errors).toBeFalsy();
    });

    it("execute a query as string with variables", async () => {
      const result = await client.graphqlResult(
        `query GetPatient($id: ID!) {
          Patient(id: $id) {
            resourceType
            id
            name {
              given
              family
            }
          }
        }`,
        {
          id: "patient-id-2",
        },
      );
      expect(result.data).toMatchObject({
        Patient: {
          resourceType: "Patient",
          id: "patient-id-2",
        },
      });
      expect(result.errors).toBeFalsy();
    });

    it("does not throw error on GraphQL errors and return execution result", async () => {
      const result = await client.graphqlResult(
        `query GetPatient($id: ID!) {
            Patient(id: $id) {
              resourceType
              id
              name {
                given
                family
              }
            }
          }`,
        {
          id: "graphql-error",
        },
      );
      expect(result.errors?.length).toBeGreaterThan(0);
      expect(result.data?.Patient).toBeFalsy();
    });

    it("execute a query as typed document", async () => {
      const result = await client.graphqlResult(ListOrganizationsDocument, {
        name: "Acme, Inc",
      });
      expect(result.data).toMatchObject({
        OrganizationList: [
          {
            resourceType: "Organization",
            name: "Acme, Inc",
          },
        ],
      } satisfies Partial<ListOrganizationsQuery>);
    });
  });

  describe("capabilities", () => {
    it("return", async () => {
      const result = await client.capabilities();
      expect(result).toBeDefined();
    });
  });

  describe("batch", () => {
    it("return", async () => {
      const result = await client.batch({
        resourceType: "Bundle",
        type: "batch",
        entry: [],
      });
      expect(result).toBeDefined();
    });

    it("return with options", async () => {
      const result = await client.batch(
        {
          resourceType: "Bundle",
          type: "batch",
          entry: [],
        },
        { _pretty: true },
      );
      expect(result).toBeDefined();
    });

    it("return builder", async () => {
      const builder = client.batch();
      expect(builder).toBeInstanceOf(BundleExecutor);
      expect(builder.request.type).toEqual("batch");
    });
  });

  describe("transaction", () => {
    it("return", async () => {
      const result = await client.transaction({
        resourceType: "Bundle",
        type: "transaction",
        entry: [],
      });
      expect(result).toBeDefined();
    });

    it("return with options", async () => {
      const result = await client.transaction(
        {
          resourceType: "Bundle",
          type: "transaction",
          entry: [],
        },
        { _pretty: true },
      );
      expect(result).toBeDefined();
    });

    it("return builder", async () => {
      const builder = client.transaction();
      expect(builder).toBeInstanceOf(BundleExecutor);
      expect(builder.request.type).toEqual("transaction");
    });
  });

  describe("execute", () => {
    it("root operation", async () => {
      const result = await client.execute({
        operation: "$convert",
        affectsState: false,
      });
      expect(result).toBeDefined();
    });

    it("type operation", async () => {
      const result = await client.execute({
        operation: "$submit",
        resourceType: "Claim",
        affectsState: true,
      });
      expect(result).toBeDefined();
    });

    it("type and id operation", async () => {
      const result = await client.execute({
        operation: "$document",
        resourceType: "Composition",
        resourceId: "1234",
        affectsState: true,
      });
      expect(result).toBeDefined();
    });

    it("with parameters", async () => {
      const result = await client.execute({
        operation: "$document",
        resourceType: "Composition",
        resourceId: "1234",
        parameters: [
          {
            name: "persist",
            valueBoolean: true,
          },
        ],
      });
      expect(result).toBeDefined();
    });

    it("with affectsState false and simple arguments", async () => {
      const result = await client.execute({
        operation: "$expand",
        resourceType: "ValueSet",
        parameters: [
          {
            name: "url",
            valueUri: "http://hl7.org/fhir/ValueSet/example",
          },
        ],
        affectsState: false,
      });
      expect(result).toBeDefined();
    });

    it("with typed operation - affectsState true", async () => {
      const result = await client.execute({
        operation: "$submit",
        resourceType: "Claim",
        parameters: [
          {
            name: "resource",
            resource: build("Claim", {} as Claim),
          },
        ],
      });
      expect(result).toBeDefined();
    });
  });

  describe("fetchPage", () => {
    it("fetch page and return a bundleNavigator", async () => {
      const nextPageUrl = bundleNavigator(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        patientsListFixture as any,
      ).linkUrl("next");
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const result = await client.fetchPage(nextPageUrl!);
      expect(result).toBeInstanceOf(BundleNavigator);
    });
  });

  describe("fetch", () => {
    it("throws if absolute url with wrong baseUrl", async () => {
      await expect(
        client.fetch("http://www.google.com/Patient"),
      ).rejects.toThrow();
    });

    it("accepts absolute urls", async () => {
      const result = await client.fetch<Patient>(`${baseUrl}/Patient/1234`);
      expect(result).toBeDefined();
      expect(result?.resourceType).toEqual("Patient");
    });

    it("accepts relative urls", async () => {
      const result = await client.fetch<Patient>(`Patient/1234`);
      expect(result).toBeDefined();
      expect(result?.resourceType).toEqual("Patient");
    });
  });
});
