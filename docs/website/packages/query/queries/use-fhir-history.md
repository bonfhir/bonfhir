---
sidebar_position: 9
title: useFhirHistory
description: Retrieve previous versions of a FHIR resource
---

Return a [Query](https://tanstack.com/query/latest/docs/react/guides/queries) for a
[history](https://hl7.org/fhir/http.html#history) request.

### Basic usage

```tsx
import { asError } from "@bonfhir/core/r4b";
import { useFhirHistory } from "@bonfhir/query/r4b";
import { FhirValue } from "@bonfhir/react/r4b";
import { List } from "@mantine/core";

export default function MyComponent() {
  const patientHistoryQuery = useFhirHistory(
    "Patient",
    "bddc8d51-7e38-451c-8dd6-5a313b988bfe",
  );

  if (patientHistoryQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (patientHistoryQuery.isError) {
    return <div>{asError(patientHistoryQuery.error)?.message}</div>;
  }

  return (
    <List>
      {patientHistoryQuery.data?.searchMatch().map((entry) => (
        <List.Item key={entry.meta.versionId}>
          {entry.meta.versionId} (on{" "}
          <FhirValue type="instant" value={entry.meta.lastUpdated} />)
        </List.Item>
      ))}
    </List>
  );
}
```

### With the `<FhirQueryLoader />`

```tsx
import { useFhirHistory } from "@bonfhir/query/r4b";
import { FhirQueryLoader, FhirValue } from "@bonfhir/react/r4b";
import { List } from "@mantine/core";

export default function MyComponent() {
  const patientHistoryQuery = useFhirHistory(
    "Patient",
    "bddc8d51-7e38-451c-8dd6-5a313b988bfe",
  );

  return (
    <FhirQueryLoader query={patientHistoryQuery}>
      {(result) => (
        <List>
          {result.searchMatch().map((entry) => (
            <List.Item key={entry.meta.versionId}>
              {entry.meta.versionId} (on{" "}
              <FhirValue type="instant" value={entry.meta.lastUpdated} />)
            </List.Item>
          ))}
        </List>
      )}
    </FhirQueryLoader>
  );
}
```

### With options

```tsx
import { DEFAULT_FHIR_CLIENT, useFhirHistory } from "@bonfhir/query/r4b";

export default function MyComponent() {
  const patientHistoryQuery = useFhirHistory(
    "Patient",
    "bddc8d51-7e38-451c-8dd6-5a313b988bfe",
    {
      // FHIR API options - matches the `FhirClient` options
      fhir: {
        _summary: "true",
      },

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
