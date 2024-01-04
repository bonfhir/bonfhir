---
sidebar_position: 4
title: Next.js
description: Next.js hooks and helpers
---

[![npm](https://img.shields.io/npm/v/@bonfhir/next)](https://www.npmjs.com/package/@bonfhir/next)

```bash npm2yarn
npm install @bonfhir/next
```

## `useFhirSearchController`

When in an Next.js app, you can substitute the base [`useFhirSearchController`](/packages/react/components/use-fhir-search-controller)
for the Next.js version, like so:

```tsx
import { OrganizationSortOrder } from "@bonfhir/core/r4b";
import { useFhirSearchController } from "@bonfhir/next/r4b/client";

// The first argument is a scope  - it allows multiple search controllers to be on the same page.
const orgsSearchController = useFhirSearchController<OrganizationSortOrder>(
  "search",
  {
    defaultSort: "name",
    pageSize: 20,
  },
);
```

It offers the same features as the original, but is already integrated with the Next.js router by default.
