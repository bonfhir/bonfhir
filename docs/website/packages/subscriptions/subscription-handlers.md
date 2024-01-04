---
sidebar_position: 0
title: Subscription handlers
description: React to FHIR Resources changes
---

At the heart of the bonFHIR subscription models lies the concept of a `FhirSubscription`.  
A `FhirSubscription` is an abstraction that represents both the criterias that trigger it (the registration information),
and the handler that gets executed when said subscription is triggered.

## Basic usage

```typescript
import { CommunicationRequest } from "@bonfhir/core/r4b";
import { FhirSubscription } from "@bonfhir/subscriptions/r4b";

export const communicationRequestsSubscription: FhirSubscription<CommunicationRequest> =
  {
    // The subscription criteria can be any valid FHIR search
    criteria: "CommunicationRequest?status=active",

    // This is purely for documentation purposes
    reason: "Send communication requests",

    // The local endpoint that will get triggered by the subscription
    // e.g. if the baseUrl is http://my-server.com/subscriptions,
    // then this will be http://my-server.com/subscriptions/communication-requests
    endpoint: "communication-requests",

    // The handler that gets invoked when a FHIR resource matches the criteria.
    async handler({ fhirClient, resource, logger }) {
      logger?.info(resource);
    },
  };
```

## Additional subscription customization

Some FHIR servers implement extensions to FHIR subscriptions to accomodate more granular scenarios.
If need be, you can use the `registration` method to further customize the registration information.

```typescript
export const communicationRequestsSubscription: FhirSubscription<CommunicationRequest> =
  {
    //...

    registration(subscription) {
      subscription.extension = [
        ...(subscription.extension ?? []),
        {
          url: "https://acme.org/subscription-max-attempts",
          valueInteger: 3,
        },
      ];

      return subscription;
    },
  };
```

## Register subscriptions

The regsitration of `FhirSubscription` should be handled by the hosting package that you choose to host the subscriptions.
Nonetheless, the `@bonfhir/subscriptions` package contains the `registerSubscriptions` function that can do it if need be.

## Subscriptions security

In order to protect the subscription endpoints from unwanted invocation, the subscription registration adds a custom header
to the [FHIR subscription](https://hl7.org/fhir/R4B/subscription-definitions.html#Subscription.channel.header) with a shared
secret. This header is then verified by the subscription infrastructure to prevent any unwanted invocation from happening.

The shared secret (named `webhookSecret` in the configuration) must be protected adequately (as you would handle other secrets).
