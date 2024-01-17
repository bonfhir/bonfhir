import { FetchFhirClientOptions } from "@bonfhir/core/r4b";

export const FhirServerTypes = ["medplum", "hapi"] as const;

export type FhirServerType = (typeof FhirServerTypes)[number];

export const FhirServerChoices = [
  {
    name: "Medplum (Recommended)",
    value: "medplum",
  },
  {
    name: "HAPI",
    value: "hapi",
  },
  {
    name: "(None)",
    value: undefined,
  },
];

/**
 * Return package.json scripts for the given FHIR server type.
 */
export function packageJsonFhirServerScripts(
  projectName: string,
  type: FhirServerType | undefined,
  redirectUri?: string | undefined,
): Record<string, string> {
  switch (type) {
    case "medplum": {
      return {
        "fhir:start-server": `docker start ${projectName}_fhir_server || docker run -p 8100:8100 -p 8103:8103 --name ${projectName}_fhir_server${
          redirectUri
            ? ` -e INITIAL_CLIENT_APP_REDIRECT_URI=${redirectUri} `
            : " "
        }ghcr.io/bonfhir/medplum-devbox:latest`,
        "fhir:add-sample-data":
          "npx -y @bonfhir/cli import --source synthea-sample --fhir r4b --base-url http://localhost:8103/fhir/R4/ --auth-token-url http://localhost:8103/oauth2/token --auth-client-id f54370de-eaf3-4d81-a17e-24860f667912 --auth-client-secret 75d8e7d06bf9283926c51d5f461295ccf0b69128e983b6ecdd5a9c07506895de",
      };
    }
    case "hapi": {
      return {
        "fhir:start-server": `docker start ${projectName}_fhir_server || docker run -p 8080:8080 --name ${projectName}_fhir_server -e hapi.fhir.subscription.resthook_enabled=true hapiproject/hapi:latest`,
        "fhir:add-sample-data":
          "npx -y @bonfhir/cli import --source synthea-sample --fhir r4b --base-url http://localhost:8080/fhir",
      };
    }
    default: {
      return {};
    }
  }
}

/**
 * Return the FetchFhirClientOptions for the given FHIR server type.
 */
export function fetchFhirClientConfig(
  type: FhirServerType | undefined,
): FetchFhirClientOptions {
  switch (type) {
    case "medplum": {
      return {
        baseUrl: "http://localhost:8103/fhir/R4/",
        auth: {
          tokenUrl: "http://localhost:8103/oauth2/token",
          clientId: "f54370de-eaf3-4d81-a17e-24860f667912",
          clientSecret:
            "75d8e7d06bf9283926c51d5f461295ccf0b69128e983b6ecdd5a9c07506895de",
        },
      };
    }
    case "hapi": {
      return {
        baseUrl: "http://localhost:8080/fhir",
      };
    }
    default: {
      return {
        baseUrl: "<FHIR Server URL>",
      };
    }
  }
}
