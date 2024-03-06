---
sidebar_position: 2
title: Triggers
description: Trigger workflows using FHIR Subscriptions
---

The bonFHIR n8n community node contains a trigger for FHIR Subscriptions.

:::warning

The current trigger is only compatible with R2/R3/R4/R4B styles Subscription.  
It is **not compatible with R5** subscription.

:::

It allows a workflow to be triggered using a FHIR subscription.
The creation of the subscription is managed automatically by the node, and is created when the workflow is activated, and deleted when it is inactivated.

![Add bonFHIR Trigger](/img/docs/n8n/add-bonfhir-trigger.png)
![CR received output](/img/docs/n8n/cr-received-output.png)

## Modes

The trigger has 2 modes: Webhook or Resthook

### Webhook

In this mode, the trigger behaves like a standard webhook:

- listen for POST requests
- only listen at the root of the webhook URL (A unique path prefix is generated to avoid potential collisions)

This is the mode that servers like [Medplum](https://medplum.com) expect.

### Resthook

In Resthook mode, the trigger behaves closer to what a "real" FHIR server would do:

- listen for PUT requests
- expect a resource type and resource id to be appended in the path

This is the mode that servers like [HAPI FHIR](https://hapifhir.io/) expect.
