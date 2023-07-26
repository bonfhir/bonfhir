import { CommunicationRequest } from "@bonfhir/core/r4b";
import { FhirSubscription } from "@bonfhir/subscriptions/r4b";

export const communicationRequests: FhirSubscription<CommunicationRequest> = {
  criteria: "CommunicationRequest",
  reason: "Send communication requests",
  endpoint: "communication-requests",
  async handler({ resource, logger }) {
    logger?.info(resource);
  },
};
