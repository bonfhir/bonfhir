import { Config } from "@/config";
import { FetchFhirClient } from "@bonfhir/core/r4b";
import { fhirSubscriptions } from "@bonfhir/next/r4b/server";

export const config = {
  matcher: ["/api/fhir/subscriptions/:subscription*"],
};

export const middleware = fhirSubscriptions({
  fhirClient: () =>
    new FetchFhirClient({
      baseUrl: Config.public.fhirUrl,
      auth: {
        tokenUrl: Config.server.authTokenUrl,
        clientId: Config.server.authClientId,
        clientSecret: Config.server.authClientSecret,
      },
    }),
  baseUrl: Config.server.appBaseUrl,
  prefix: "/api/fhir/subscriptions",
  webhookSecret: Config.server.fhirSubscriptionsSecret,
  subscriptions: [],
});
