---
sidebar_position: 10
title: useFhirClient
description: Execute a series of FHIR operations
---

Return a [Query](https://tanstack.com/query/latest/docs/react/guides/queries) with access to the raw [FhirClient](/packages/core/fhir-client).

This is useful when you have a series of operations to execute as part of a single query, or if the other [query hooks](/packages/query/queries)
won't allow you to do what you want.  
**You should always prefer to use a more precise hook.**

:::warning

It is your responsibility to ensure that the operations are **read-only**.  
If they are not, you should use the [`useFhirClientMutation`](/packages/query/mutations/use-fhir-client-mutation) hook instead.

:::

### Basic usage

```tsx
import { asError } from "@bonfhir/core/r4b";
import { useFhirClient } from "@bonfhir/query/r4b";
import { FhirValue } from "@bonfhir/react/r4b";
import { useSearchParams } from "react-router-dom";

export default function MyComponent() {
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get("patientId");

  const clientQuery = useFhirClient(
    async (client) => {
      const batch = client.batch();
      const patient = batch.search("Patient", (search) =>
        search._id(patientId),
      );
      const conditions = batch.search("Condition", (search) =>
        search.subject(`Patient/${patientId}`),
      );

      await batch.send();

      return { patient: patient.resource, conditions: conditions.resource };
    },
    // This allows you to specify dependencies for your method - they will invalidate the query if changed.
    [patientId],
  );

  if (clientQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (clientQuery.isError) {
    return <div>{asError(clientQuery.error)?.message}</div>;
  }

  return (
    <FhirValue
      type="HumanName"
      value={clientQuery.data?.patient.searchMatch()[0]?.name}
    />
  );
}
```

### With `<FhirQueryLoader />`

```tsx
import { useFhirClient } from "@bonfhir/query/r4b";
import { FhirQueryLoader, FhirValue } from "@bonfhir/react/r4b";
import { useSearchParams } from "react-router-dom";

export default function MyComponent() {
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get("patientId");

  const clientQuery = useFhirClient(
    async (client) => {
      const batch = client.batch();
      const patient = batch.search("Patient", (search) =>
        search._id(patientId),
      );
      const conditions = batch.search("Condition", (search) =>
        search.subject(`Patient/${patientId}`),
      );

      await batch.send();

      return { patient: patient.resource, conditions: conditions.resource };
    },
    [patientId],
  );

  return (
    <FhirQueryLoader query={clientQuery}>
      {(result) => (
        <FhirValue
          type="HumanName"
          value={result.patient.searchMatch()[0]?.name}
        />
      )}
    </FhirQueryLoader>
  );
}
```

### With options

```tsx
import { DEFAULT_FHIR_CLIENT, useFhirClient } from "@bonfhir/query/r4b";

export default function MyComponent() {
  const clientQuery = useFhirClient(
    async (client) => {
      const batch = client.batch();
      const patient = batch.search("Patient", (search) =>
        search._id(patientId),
      );
      const conditions = batch.search("Condition", (search) =>
        search.subject(`Patient/${patientId}`),
      );

      await batch.send();

      return { patient: patient.resource, conditions: conditions.resource };
    },
    [patientId],
    {
      // The name of the FhirClient to use
      fhirClient: DEFAULT_FHIR_CLIENT,

      // React query options
      query: {
        gcTime: Number.POSITIVE_INFINITY,
      },
    },
  );

  //...
}
```
