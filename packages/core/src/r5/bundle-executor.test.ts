import { mock, mockReset } from "jest-mock-extended";
import { BundleExecutor } from "./bundle-executor";
import { FhirClient } from "./fhir-client";

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

    expect(futurePatient.entry).toBeDefined();
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
    executor.read("Patient", "123");
    await executor.send();
  });

  it("vread", async () => {
    const executor = new BundleExecutor(client, "batch");
    executor.vread("Patient", "123", "1");
    await executor.send();
  });
});
