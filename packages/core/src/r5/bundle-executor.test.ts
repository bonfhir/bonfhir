import { mock, mockReset } from "jest-mock-extended";
import { randomUUID } from "node:crypto";
import { build } from "./builders";
import { BundleExecutor } from "./bundle-executor";
import { FhirClient } from "./fhir-client";
import { Patient, Retrieved } from "./fhir-types.codegen";

describe("bundle-executor", () => {
  const client = mock<Pick<FhirClient, "batch">>();

  beforeEach(() => {
    mockReset(client);
  });

  it("runs with no requests", async () => {
    const executor = new BundleExecutor(client, "batch");
    await expect(executor.send()).resolves.not.toThrow();
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
        id: randomUUID(),
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
});
