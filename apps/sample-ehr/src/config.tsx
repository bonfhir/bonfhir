export const Config = {
  public: {
    fhirUrl:
      process.env.NEXT_PUBLIC_FHIR_URL || "http://localhost:8103/fhir/R4/",
  },
  server: {
    authServerUrl: process.env.AUTH_SERVER_URL || "http://localhost:8103",
    authTokenUrl:
      process.env.AUTH_TOKEN_URL || "http://localhost:8103/oauth2/token",
    logoutUrl: process.env.LOGOUT_URL || "http://localhost:8103/oauth2/logout",
    authClientId:
      process.env.AUTH_CLIENT_ID || "f54370de-eaf3-4d81-a17e-24860f667912",
    authClientSecret:
      process.env.AUTH_CLIENT_SECRET ||
      "75d8e7d06bf9283926c51d5f461295ccf0b69128e983b6ecdd5a9c07506895de",
    authSecret: process.env.AUTH_SECRET || "secret",
    appBaseUrl: process.env.APP_BASE_URL || "http://host.docker.internal:3000",
    fhirSubscriptionsSecret: process.env.FHIR_SUBSCRIPTION_SECRET || "secret",
  },
} as const;
