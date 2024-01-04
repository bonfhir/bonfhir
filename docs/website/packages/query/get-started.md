---
sidebar_position: 1
title: Get Started
description: Configure the <FhirQueryProvider />
---

## Install the packages

```bash npm2yarn
npm install @bonfhir/query @tanstack/react-query@^5 @tanstack/react-query-devtools@^5
```

:::info

If you are using one of our project templates, you don't need to install anything as the packages are already included
and configured.

:::

## Add the `<FhirQueryProvider />`

Once the packages are installed and the underlying tookit is configured, you know need to configure the `<FhirQueryProvider />`.

Wrap you application with the `<FhirQueryProvider />`, and pass an instance of a [`FhirClient`](/packages/core/fhir-client):

```tsx
import { FhirQueryProvider } from "@bonfhir/query/r4b";

// Create a FHIR Client to connect to a server
const client = new FetchFhirClient({
  // Refer to https://bonfhir.dev/packages/core/fhir-client#initialize to understand how to properly initialize
  // a FhirClient
});

function Root() {
  //...

  return (
    <FhirQueryProvider fhirClient={client}>
      <App />
    </FhirQueryProvider>
  );
}
```

## Use multiple `FhirClient`

It is possible to configure the library to use multiple FHIR clients if you need to communicate with different FHIR servers:

```tsx
import { DEFAULT_FHIR_CLIENT, FhirQueryProvider } from "@bonfhir/query/r4b";

// Create a FHIR Client to connect to a server
const mainClient = new FetchFhirClient({
  // Refer to https://bonfhir.dev/packages/core/fhir-client#initialize to understand how to properly initialize
  // a FhirClient
});

// Create another client to connect to a different terminology server for example
const terminologyClient = new FetchFhirClient({
  // Refer to https://bonfhir.dev/packages/core/fhir-client#initialize to understand how to properly initialize
  // a FhirClient
});

function Root() {
  //...

  return (
    <FhirQueryProvider
      fhirClient={{
        [DEFAULT_FHIR_CLIENT]: mainClient,
        terminology: terminologyClient,
      }}
    >
      <App />
    </FhirQueryProvider>
  );
}
```

In this case, clients are indexed with a name (in this case, `DEFAULT_FHIR_CLIENT` and `"terminology"`).  
The hooks use the "default" client when no option is provided, or use the name provided as part of their `fhirClient` argument:

```tsx
const patientQuery = useFhirRead("Patient", "123", {
  fhirClient: "terminology",
});
```

It uses the same React Query cache, but treats invalidation as separate domains.

## Configure React Query

It is possible to configure the underlying React Query by either providing configuration options, or a pre-configured instance:

```tsx
import { FhirQueryProvider } from "@bonfhir/query/r4b";

// Create a FHIR Client to connect to a server
const client = new FetchFhirClient({
  // Refer to https://bonfhir.dev/packages/core/fhir-client#initialize to understand how to properly initialize
  // a FhirClient
});

function Root() {
  //...

  return (
    <FhirQueryProvider
      fhirClient={client}
      queryClientConfig={{
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }}
    >
      <App />
    </FhirQueryProvider>
  );
}
```

```tsx
import { FhirQueryProvider } from "@bonfhir/query/r4b";
import { QueryClient } from "@tanstack/react-query";

// Create a FHIR Client to connect to a server
const client = new FetchFhirClient({
  // Refer to https://bonfhir.dev/packages/core/fhir-client#initialize to understand how to properly initialize
  // a FhirClient
});

const queryClient = new QueryClient();

function Root() {
  //...

  return (
    <FhirQueryProvider fhirClient={client} queryClient={queryClient}>
      <App />
    </FhirQueryProvider>
  );
}
```

## Get the context and the query client

If you need to access the `FhirClient` or `QueryClient`, you can use the `useFhirQueryContext` and `useFhirClientQueryContext` hooks:

```tsx
// Returns all configured FhirClient and the QueryClient
const { fhirClient, queryClient } = useFhirQueryContext();

// Return a specific FhirClient by its name configured in the provider, or throw an error if not found
const { fhirClient, queryClient } =
  useFhirClientQueryContext(DEFAULT_FHIR_CLIENT);
```

## Disable cache management

One of the benefits of using the `@bonfhir/query` library is the automatic cache management that is provided.  
If for any reason you want to disable default cache strategies and manage cache invalidation yourself,
use the `manageCache` option:

```tsx
import { FhirQueryProvider } from "@bonfhir/query/r4b";
import { QueryClient } from "@tanstack/react-query";

// Create a FHIR Client to connect to a server
const client = new FetchFhirClient({
  // Refer to https://bonfhir.dev/packages/core/fhir-client#initialize to understand how to properly initialize
  // a FhirClient
});

function Root() {
  //...

  return (
    <FhirQueryProvider fhirClient={client} manageCache={false}>
      <App />
    </FhirQueryProvider>
  );
}
```

You will then need to handle cache invalidation yourself.
You may want to leverage the `FhirQueryKeys` helper to get the correct cache keys used in the hooks:

```tsx
// Get the queryKey managed by the read hook
const queryKeyForPatientRead = FhirQueryKeys.read(
  DEFAULT_FHIR_CLIENT,
  "Patient",
  "123",
);

// Invalidate all queries that have a relationship with Patient/123.
FhirQueryKeys.invalidateQueries(
  DEFAULT_FHIR_CLIENT,
  queryClient,
  "Patient",
  "123",
);
```
