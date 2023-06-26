import { mock, mockReset } from "jest-mock-extended";
import { build } from "./builders.js";
import { BundleExecutor } from "./bundle-executor.js";
import { FhirClient } from "./fhir-client.js";
import { Patient, Retrieved } from "./fhir-types.codegen.js";
import { uuid } from "./lang-utils.js";
import { ValueSetExpandOperation } from "./operations.codegen.js";

describe("bundle-executor", () => {
  const client = mock<Pick<FhirClient, "batch" | "transaction">>();

  beforeEach(() => {
    mockReset(client);
  });

  it("runs with no requests", async () => {
    const executor = new BundleExecutor(client, "batch");
    await expect(executor.send()).resolves.not.toThrow();
    expect(executor.futureRequests.length).toBeFalsy();
  });

  it("returns FutureRequests", async () => {
    const executor = new BundleExecutor(client, "batch");

    const futurePatient = executor.read("Patient", "123");
    const futureOrg = executor.read("Organization", "456");

    expect(futurePatient.requestEntry).toBeDefined();
    expect(futurePatient.responseEntry).toBeUndefined();
    expect(futurePatient.entryIndex).toEqual(0);
    expect(futurePatient.executor).toBe(executor);
    expect(futurePatient.sent).toBeFalsy();
    expect(() => futurePatient.resource).toThrow();

    expect(futureOrg.entryIndex).toEqual(1);

    client.batch.mockResolvedValueOnce({
      resourceType: "Bundle",
      type: "batch-response",
      entry: [
        {
          resource: {
            resourceType: "Patient",
            id: "123",
          },
        },
        {
          resource: {
            resourceType: "Organization",
            id: "456",
          },
        },
      ],
    });

    await executor.send();

    expect(futurePatient.sent).toBeTruthy();
    expect(futurePatient.resource.resourceType).toEqual("Patient");
    expect(futureOrg.sent).toBeTruthy();
    expect(futureOrg.resource.resourceType).toEqual("Organization");

    expect(executor.response).toBeDefined();
    expect(executor.futureRequests.length).toEqual(2);
  });

  it("read", async () => {
    const executor = new BundleExecutor(client, "batch");
    const futureRequest = executor.read("Patient", "123");
    expect(futureRequest.requestEntry.request?.method).toEqual("GET");
    await executor.send();
  });

  it("vread", async () => {
    const executor = new BundleExecutor(client, "batch");
    const futureRequest = executor.vread("Patient", "123", "1");
    expect(futureRequest.requestEntry.request?.method).toEqual("GET");
    await executor.send();
  });

  it("update", async () => {
    const executor = new BundleExecutor(client, "transaction");
    const futureRequest = executor.update(
      build("Organization", {
        id: uuid(),
        name: "Acme, Inc.",
      })
    );
    expect(futureRequest.requestEntry.request?.method).toEqual("PUT");
    await executor.send();
  });

  it("patch", async () => {
    const executor = new BundleExecutor(client, "transaction");
    const futureRequest = executor.patch("Patient", "123", (patch) =>
      patch.add("/active", false)
    );
    expect(futureRequest.requestEntry.request?.method).toEqual("PATCH");
    await executor.send();
  });

  it("delete", async () => {
    const executor = new BundleExecutor(client, "transaction");
    const futureRequest = executor.delete(
      build("Patient", { id: "123" }) as Retrieved<Patient>
    );
    expect(futureRequest.requestEntry.request?.method).toEqual("DELETE");
    await executor.send();
  });

  it("history", async () => {
    const executor = new BundleExecutor(client, "batch");
    const futureRequest = executor.history("Patient", "123");
    expect(futureRequest.requestEntry.request?.method).toEqual("GET");
    await executor.send();
  });

  it("create", async () => {
    const executor = new BundleExecutor(client, "transaction");
    const futureRequest = executor.create(
      build("Organization", {
        name: "Acme, Inc.",
      })
    );
    expect(futureRequest.requestEntry.request?.method).toEqual("POST");
    await executor.send();
  });

  it("search", async () => {
    const executor = new BundleExecutor(client, "batch");
    const futureRequest = executor.search("Medication", (search) =>
      search.code("123")
    );
    expect(futureRequest.requestEntry.request?.method).toEqual("GET");
    await executor.send();
  });

  it("searchOne", async () => {
    const executor = new BundleExecutor(client, "batch");
    const futureRequest = executor.searchOne("Encounter", (search) =>
      search.status("finished")
    );
    expect(futureRequest.requestEntry.request?.method).toEqual("GET");
    await executor.send();
  });

  it("capabilities", async () => {
    const executor = new BundleExecutor(client, "batch");
    const futureRequest = executor.capabilities();
    expect(futureRequest.requestEntry.request?.method).toEqual("GET");
    await executor.send();
  });

  it("execute", async () => {
    const executor = new BundleExecutor(client, "batch");
    const futureRequest = executor.execute(
      new ValueSetExpandOperation({
        url: "http://hl7.org/fhir/ValueSet/example",
      })
    );
    expect(futureRequest.requestEntry.request?.method).toEqual("GET");
    await executor.send();
  });
});
