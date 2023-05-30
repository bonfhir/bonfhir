import { rest } from "msw";
import { setupServer } from "msw/node";
import { v4 as uuid } from "uuid";
import * as patientsListFixture from "../../fixtures/bundle-navigator.list-patients.test.fhir.json";
import * as patientExample from "../../fixtures/patient-example.fhir.json";
import { build } from "./builders.js";
import { BundleExecutor } from "./bundle-executor.js";
import { BundleNavigator, bundleNavigator } from "./bundle-navigator.js";
import { FetchFhirClient } from "./fetch-fhir-client.js";
import {
  CapabilityStatement,
  Claim,
  Organization,
  Patient,
} from "./fhir-types.codegen.js";
import {
  ClaimSubmitOperation,
  ValueSetExpandOperation,
} from "./operations.codegen.js";

describe("fetch-fhir-client", () => {
  const baseUrl = "http://example.com";
  const client = new FetchFhirClient({ baseUrl });
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
      }
    ),

    rest.put(`${baseUrl}/Organization`, async (req, res, ctx) => {
      return res(ctx.json({ ...(await req.json<Organization>()), id: uuid() }));
    }),

    rest.put(
      `${baseUrl}/Organization/:organizationId`,
      async (req, res, ctx) => {
        return res(ctx.json(await req.json<Organization>()));
      }
    ),

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
      return res(ctx.json(await req.json<Organization>()));
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
        ctx.json(build("CapabilityStatement", {} as CapabilityStatement))
      );
    }),

    rest.post(`${baseUrl}/`, (_req, res, ctx) => {
      return res(ctx.json(patientsListFixture));
    }),

    rest.get(`${baseUrl}/$convert`, (_req, res, ctx) => {
      return res(ctx.json(patientsListFixture));
    }),

    rest.post(`${baseUrl}/Claim/$submit`, (_req, res, ctx) => {
      return res(ctx.json(patientsListFixture));
    }),

    rest.post(
      `${baseUrl}/Composition/:compositionId/$document`,
      (_req, res, ctx) => {
        return res(ctx.json(patientsListFixture));
      }
    ),

    rest.get(`${baseUrl}/ValueSet/$expand`, (_req, res, ctx) => {
      return res(ctx.json(patientsListFixture));
    })
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

    it("a resource", async () => {
      const result = await client.read("Patient", "123", { _pretty: true });
      expect(result).toBeDefined();
      expect(result?.resourceType).toEqual("Patient");
    });
  });

  describe("vread", () => {
    it("return a resource when found", async () => {
      const result = await client.vread("Patient", "123", "1");
      expect(result).toBeDefined();
      expect(result?.resourceType).toEqual("Patient");
    });

    it("a resource when found with options", async () => {
      const result = await client.vread("Patient", "123", "1", {
        _elements: "id,name",
      });
      expect(result).toBeDefined();
      expect(result?.resourceType).toEqual("Patient");
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
  });

  describe("patch", () => {
    it("resource with builder", async () => {
      const result = await client.patch("Patient", "123", (patch) =>
        patch.add("/active", true)
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
        { preventConcurrentUpdates: true, versionId: "1" }
      );
      expect(result).toBeDefined();
    });

    it("resource with condition update", async () => {
      const result = await client.patch(
        "Patient",
        "123",
        (patch) => patch.add("/active", false),
        { search: (search) => search.deceased("true") }
      );
      expect(result).toBeDefined();
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
  });

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
        search.name("John Doe")
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
        { _summary: "true" }
      );
      expect(result.searchMatch().length).not.toBe(0);
    });
  });

  describe("searchOne", () => {
    it("throw when multiple values are found", async () => {
      await expect(
        client.searchOne("Patient", (search) => search._id("1234"))
      ).rejects.toThrow();
    });
  });

  describe("searchByPage", () => {
    it("search by page", async () => {
      await client.searchByPage(
        "Patient",
        (search) => search.name("John Doe"),
        async (result) => {
          expect(result).toBeDefined();
        }
      );
    });
  });

  describe("searchAllPages", () => {
    it("search all pages", async () => {
      const result = await client.searchAllPages("Patient", (search) =>
        search.name("John Doe")
      );
      expect(result).toBeDefined();
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
        { _pretty: true }
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
        { _pretty: true }
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
        parameters: {
          format: "application/pdf",
        },
        affectsState: true,
      });
      expect(result).toBeDefined();
    });

    it("with typed operation - affectsState false", async () => {
      const result = await client.execute(
        new ValueSetExpandOperation({
          url: "http://hl7.org/fhir/ValueSet/example",
        })
      );
      expect(result).toBeDefined();
    });

    it("with typed operation - affectsState true", async () => {
      const result = await client.execute(
        new ClaimSubmitOperation({
          resource: build("Claim", {} as Claim),
        })
      );
      expect(result).toBeDefined();
    });
  });

  describe("fetchPage", () => {
    it("fetch page and return a bundleNavigator", async () => {
      const nextPageUrl = bundleNavigator(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        patientsListFixture as any
      ).linkUrl("next");
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const result = await client.fetchPage(nextPageUrl!);
      expect(result).toBeInstanceOf(BundleNavigator);
    });
  });

  describe("fetch", () => {
    it("throws if absolute url with wrong baseUrl", async () => {
      await expect(
        client.fetch("http://www.google.com/Patient")
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
