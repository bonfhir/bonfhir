import { CommunicationRequest } from "@bonfhir/core/r4b";
import { FhirSubscription } from "@bonfhir/subscriptions/r4b";

export const communicationRequests: FhirSubscription<CommunicationRequest> = {
  criteria: "CommunicationRequest?",
  reason: "Send communication requests",
  endpoint: "communication-requests",
  async handler({ resource, logger }) {
    logger?.info(resource);
  },

  registration(subscription) {
    subscription.extension = [
      ...(subscription.extension ?? []),
      {
        url: "https://acme.org/fhir/StructureDefinition/subscription-max-attempts",
        valueInteger: 3,
      },
    ];

    return subscription;
  },
};
