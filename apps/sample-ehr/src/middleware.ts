import { FetchFhirClient } from "@bonfhir/core/r4b";
import { fhirSubscriptions } from "@bonfhir/next/r4b/server";
import { communicationRequests } from "./subscriptions";

export const config = {
  matcher: ["/api/fhir/subscriptions/:subscription*"],
};

export const middleware = fhirSubscriptions({
  fhirClient: () =>
    new FetchFhirClient({
      baseUrl: "http://localhost:8103/fhir/R4/",
      auth: {
        tokenUrl: "http://localhost:8103/oauth2/token",
        clientId: "f54370de-eaf3-4d81-a17e-24860f667912",
        clientSecret:
          "75d8e7d06bf9283926c51d5f461295ccf0b69128e983b6ecdd5a9c07506895de",
      },
    }),
  baseUrl: process.env.APP_BASE_URL || "http://host.docker.internal:4000",
  prefix: "/api/fhir/subscriptions",
  webhookSecret: process.env.FHIR_SUBSCRIPTION_SECRET || "secret",
  subscriptions: [communicationRequests],
});
