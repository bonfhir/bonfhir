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

### With pagination

Pagination works the same way as [`useFhirSearch`](/packages/query/queries/use-fhir-search#with-pagination),
except that the `pageUrl` argument is in the options:

```tsx
import { useFhirHistory } from "@bonfhir/query/r4b";
import { FhirQueryLoader, FhirValue } from "@bonfhir/react/r4b";
import { List, Stack } from "@mantine/core";
import { useState } from "react";

export default function MyComponent() {
  const [pageUrl, setPageUrl] = useState<string | undefined>(undefined);

  const patientHistoryQuery = useFhirHistory(
    "Patient",
    "bddc8d51-7e38-451c-8dd6-5a313b988bfe",
    {
      pageUrl,
    },
  );

  return (
    <FhirQueryLoader query={patientHistoryQuery}>
      {(result) => (
        <Stack>
          <List>
            {result.searchMatch().map((entry) => (
              <List.Item key={entry.meta.versionId}>
                {entry.meta.versionId} (on{" "}
                <FhirValue type="instant" value={entry.meta.lastUpdated} />)
              </List.Item>
            ))}
          </List>
          {result.linkUrl("next") && (
            // Here we set the pageUrl using the bundle next link.
            <Button onClick={() => setPageUrl(result.linkUrl("next"))}>
              Go to next page - {result.total} total result(s)
            </Button>
          )}
        </Stack>
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
