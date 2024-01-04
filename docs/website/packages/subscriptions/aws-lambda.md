---
sidebar_position: 1
title: AWS Lambda
description: Host in AWS Lambda function
---

[![npm](https://img.shields.io/npm/v/@bonfhir/aws-lambda)](https://www.npmjs.com/package/@bonfhir/aws-lambda)

```bash npm2yarn
npm install @bonfhir/aws-lambda
```

The `@bonfhir/aws-lambda` package contains an adapter that takes any number of [subscription handlers](/packages/subscriptions/subscription-handlers)
and expose an [AWS Lambda function handler](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html) that can:

- register all the active subscriptions
- execute the subscription handlers when receiving a notification from the FHIR server
- validate the authenticity of the subscription invocation through a [shared secret](/packages/subscriptions/subscription-handlers#subscriptions-security)

We recommend that you follow our "Get Started" tutorial on AWS lambda to experiment with this package, as it will go through
the creation of an AWS Lambda app and subscription handlers.
In particular, the AWS Lambda function _must_ be exposed through an API Gateway in order to be invokable by the FHIR Server.

## Create the AWS Lambda function handler

```typescript
import { fhirSubscriptionHandler } from "@bonfhir/aws-lambda/r4b";
import { FetchFhirClient } from "@bonfhir/core/r4b";
import { communicationRequests } from "./communication-requests";

export const handler = fhirSubscriptionHandler({
  // A function that gets invoke when the framework needs a FhirClient to connect to the FhirServer.
  fhirClient: () =>
    new FetchFhirClient({
      // Refer to https://bonfhir.dev/packages/core/fhir-client#initialize to understand how to properly initialize
      // a FhirClient
    }),

  // The public URL where the handler is exposed.
  // e.g. - https://abcdef123.execute-api.us-east-2.amazonaws.com/
  // if using custom domains, this needs to be the public custom domain URL.
  baseUrl: process.env.APP_BASE_URL,

  // The shared secret that secures the invocations
  webhookSecret: process.env.FHIR_SUBSCRIPTION_SECRET,

  // The list of subscriptions to manage.
  subscriptions: [],
});
```

Refer to [this example on how to create a susbcription handler](/packages/subscriptions/subscription-handlers).

## Invoke the registration of the subscriptions

Once the lambda has been deployed / is running, you will need to trigger the registration of the managed subscriptions
in the FHIR server.

To do so, you'll need to create a HTTP request to the base URL like so:

```bash
curl -i --request POST <baseUrl>/register --header \"X-Subscription-Auth: <webhookSecret>\"
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
