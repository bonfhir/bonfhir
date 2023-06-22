import { FetchFhirClient } from "@bonfhir/core/r4b";
import { fhirSubscriptions } from "@bonfhir/next/r4b";
import { communicationRequests } from "./subscriptions";

export const config = {
  matcher: ["/api/fhir/subscriptions/:subscription*"],
};

export const middleware = fhirSubscriptions({
  fhirClient: () =>
    new FetchFhirClient({
      baseUrl: "http://localhost:8103/fhir/R4/",
      auth: "Basic ZjU0MzcwZGUtZWFmMy00ZDgxLWExN2UtMjQ4NjBmNjY3OTEyOjc1ZDhlN2QwNmJmOTI4MzkyNmM1MWQ1ZjQ2MTI5NWNjZjBiNjkxMjhlOTgzYjZlY2RkNWE5YzA3NTA2ODk1ZGU=",
    }),
  baseUrl: process.env.APP_BASE_URL || "http://host.docker.internal:4000",
  prefix: "/api/fhir/subscriptions",
  webhookSecret: process.env.FHIR_SUBSCRIPTION_SECRET || "secret",
  subscriptions: [communicationRequests],
});
