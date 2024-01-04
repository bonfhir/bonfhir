---
sidebar_position: 5
title: useFhirSearchAllPages
description: Get all the search results at once
---

This hook is similar to the [`useFhirSearch`](/packages/query/read/use-fhir-search) one, except that it retrieves all the
result pages before returning all the results as a consolidated serach navigator.

:::warning[Use with caution]

Use this with precaution. Make sure to only use it when the expected number of result is finite, and choose the `_count`
parameter size wizely to limit the number of fetch that needs to happen.

Most of the time there is a better way to achieve a feature, through referenced resources or graph operations for example.

:::

```tsx
import { asError } from "@bonfhir/core/r4b";
import { useFhirSearchAllPages } from "@bonfhir/query/r4b";
import { FhirValue } from "@bonfhir/react/r4b";
import { List } from "@mantine/core";

export default function MyComponent() {
  const allObservationsLinkedToAnEnounterQuery = useFhirSearchAllPages(
    "Observation",
    (search) =>
      search
        .encounter("Encounter/5def0123-5a8a-4842-a3c0-7dd8386bdf6a")
        // Prefer using a large number here to minimize round trips to the server
        ._count(100),
  );

  if (allObservationsLinkedToAnEnounterQuery.isInitialLoading) {
    return <div>Loading...</div>;
  }

  if (allObservationsLinkedToAnEnounterQuery.isError) {
    return (
      <div>
        {asError(allObservationsLinkedToAnEnounterQuery.error)?.message}
      </div>
    );
  }

  return (
    <List>
      {allObservationsLinkedToAnEnounterQuery.data
        ?.searchMatch()
        .map((observation) => (
          <List.Item key={observation.id}>
            <FhirValue type="CodeableConcept" value={observation.code} />
          </List.Item>
        ))}
    </List>
  );
}
```

More concisely, with the [`<FhirQueryLoader />`](/packages/react/components/fhir-query-loader) component:

```tsx
import { useFhirSearchAllPages } from "@bonfhir/query/r4b";
import { FhirQueryLoader, FhirValue } from "@bonfhir/react/r4b";
import { List } from "@mantine/core";

export default function MyComponent() {
  const allObservationsLinkedToAnEnounterQuery = useFhirSearchAllPages(
    "Observation",
    (search) =>
      search
        .encounter("Encounter/5def0123-5a8a-4842-a3c0-7dd8386bdf6a")
        // Prefer using a large number here to minimize round trips to the server
        ._count(100),
  );

  return (
    <FhirQueryLoader query={allObservationsLinkedToAnEnounterQuery}>
      {(result) => (
        <List>
          {result.searchMatch().map((observation) => (
            <List.Item key={observation.id}>
              <FhirValue type="CodeableConcept" value={observation.code} />
            </List.Item>
          ))}
        </List>
      )}
    </FhirQueryLoader>
  );
}
```

With options:

```tsx
import { DEFAULT_FHIR_CLIENT, useFhirSearchAllPages } from "@bonfhir/query/r4b";

export default function MyComponent() {
  const allObservationsLinkedToAnEnounterQuery = useFhirSearchAllPages(
    "Observation",
    (search) =>
      search
        .encounter("Encounter/5def0123-5a8a-4842-a3c0-7dd8386bdf6a")
        // Prefer using a large number here to minimize round trips to the server
        ._count(100),
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
