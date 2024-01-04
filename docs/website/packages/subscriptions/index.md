---
sidebar_position: 4
title: Subscriptions
---

import DocCardList from '@theme/DocCardList';

[![npm](https://img.shields.io/npm/v/@bonfhir/subscriptions)](https://www.npmjs.com/package/@bonfhir/subscriptions)

```bash npm2yarn
npm install @bonfhir/subscriptions
```

The `@bonfhir/subscriptions` package helps with managing and handling server-side [FHIR Subscriptions](https://hl7.org/fhir/R4B/subscription.html).

Subscriptions are like webhooks and allow to react to resources modifications as they occur in a FHIR server.

It is composed of a core package, this one, and then needs adapter packages dependending on the hosting model selected.  
For now, bonFHIR provides out-of-the-box support for:

- [AWS Lambda](/packages/subscriptions/aws-lambda)
- Next.js

bonFHIR creates FHIR susbcriptions of type [`rest-hook`](https://hl7.org/fhir/R4B/codesystem-subscription-channel-type.html#subscription-channel-type-rest-hook) only.

:::warning

It is only compatible with FHIR version **R4B** for the moment and does **not** support the R5 subscription model.

:::

<DocCardList />
