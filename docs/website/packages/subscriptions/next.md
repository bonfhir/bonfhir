---
sidebar_position: 2
title: Next.js
description: Host in a Next.js application
---

[![npm](https://img.shields.io/npm/v/@bonfhir/next)](https://www.npmjs.com/package/@bonfhir/next)

```bash npm2yarn
npm install @bonfhir/next
```

You can host your [Subscription handlers](/packages/subscriptions/subscription-handlers) in a
[Next.js](https://nextjs.org/) application, alongside the rest of the application.

This package can create a [Next.js middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
that can:

- register all the active subscriptions
- execute the subscription handlers when receiving a notification from the FHIR server
- validate the authenticity of the subscription invocation through a [shared secret](/packages/subscriptions/subscription-handlers#subscriptions-security)

We recommend that you initialize your next application using our official template - this way, it will come pre-configured
properly. To get started, simply run the following command in your terminal:

```bash
npm create -y bonfhir@latest
```

And select the `next` template.

## Create the Next.js middleware

Create a file named `middleware.ts` at the root of the project:

```typescript title="middleware.ts"
import { FetchFhirClient } from "@bonfhir/core/r4b";
import { fhirSubscriptions } from "@bonfhir/next/r4b/server";

// This is optional, but recommended.
// It allows the Next runtime to only execute the middleware on the subpath.
export const config = {
  matcher: ["/api/fhir/subscriptions/:subscription*"],
};

// The name of the variable is important here - keep it as "middleware"
export const middleware = fhirSubscriptions({
  // A function that gets invoke when the framework needs a FhirClient to connect to the FhirServer.
  fhirClient: () =>
    new FetchFhirClient({
      // Refer to https://bonfhir.dev/packages/core/fhir-client#initialize to understand how to properly initialize
      // a FhirClient
    }),

  // The public URL where the Next.js app is exposed.
  baseUrl: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.APP_BASE_URL,

  // The prefix that the middleware match for subscriptions
  // Must match the config.match value above (minus the `:subscription*` part)
  prefix: "/api/fhir/subscriptions",

  // The shared secret that secures the invocations
  webhookSecret: process.env.FHIR_SUBSCRIPTION_SECRET,

  // The list of subscriptions to manage.
  subscriptions: [],
});
```

Refer to [this example on how to create a susbcription handler](/packages/subscriptions/subscription-handlers).

## Invoke the registration of the subscriptions

Once your app is running, you will need to trigger the registration of the managed subscriptions
in the FHIR server.

To do so, you'll need to create a HTTP request to the base URL like so:

```bash
curl -i --request POST <baseUrl>/<prefix>/register --header \"X-Subscription-Auth: <webhookSecret>\"
```

This will connect to the FHIR server using the configured `FhirClient` and create the proper [FHIR Subscriptions](https://hl7.org/fhir/R4B/subscription.html).

:::info[Registration information]

It is safe to call the registration multiple times as it will not duplicate the registrations, and will update the existing ones if some parameters change.  
Uniqueness is based on the `baseUrl`, so if that parameter changes then whole new subscriptions will be created.

For safety reasons it does _not_ remove subscriptions that are no longer active (or removed from the `subscriptions` array).  
It is up to you to clean it up in the FHIR Server.

:::

We recommend that you run the register command in your deployment pipeline as well, to ensure that your subscriptions are
always registered properly.
