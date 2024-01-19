---
sidebar_position: 6
title: useFhirInfiniteSearch
description: Search for FHIR resources
---

Return an [Infinite Query](https://tanstack.com/query/v5/docs/react/guides/infinite-queries) for a
[search](https://hl7.org/fhir/http.html#search) request.

This query is intended to be used in scenarios where "load more" or "infinite scroll" patterns are used.

### With a load more button

```tsx
import { useFhirInfiniteSearch } from "@bonfhir/query/r4b";
import { Button, List, Stack } from "@mantine/core";

export default function MyComponent() {
  const patientsQuery = useFhirInfiniteSearch("Patient", (search) =>
    // The search needs a sort criteria (to be stable),
    // the _count specifies the number of resources to fetch for each round-trip
    search._sort("family")._count(50),
  );

  return (
    <Stack>
      <List>
        {patientsQuery.data?.pages.flatMap((page) =>
          page
            .searchMatch()
            .map((patient) => (
              <List.Item key={patient.id}>
                {patient.name?.map((name) => name.family).join(", ")}
              </List.Item>
            )),
        )}
      </List>
      {patientsQuery.hasNextPage && (
        <Button
          loading={patientsQuery.isFetchingNextPage}
          onClick={() => patientsQuery.fetchNextPage()}
        >
          Load more
        </Button>
      )}
    </Stack>
  );
}
```

### With an infinite scroll marker to auto fetch on visibility

```tsx
import { useFhirInfiniteSearch } from "@bonfhir/query/r4b";
import { FhirInfiniteMarker } from "@bonfhir/react/r4b";
import { List, Stack } from "@mantine/core";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useEffect, useId, useRef } from "react";

export default function MyComponent() {
  const patientsQuery = useFhirInfiniteSearch("Patient", (search) =>
    // The search needs a sort criteria (to be stable),
    // the _count specifies the number of resources to fetch for each round-trip
    search._sort("family")._count(20),
  );

  return (
    <Stack>
      <List>
        {patientsQuery.data?.pages.flatMap((page) =>
          page
            .searchMatch()
            .map((patient) => (
              <List.Item key={patient.id}>
                {patient.name?.map((name) => name.family).join(", ")}
              </List.Item>
            )),
        )}
      </List>
      <FhirInfiniteMarker query={patientsQuery} />
    </Stack>
  );
}
```

### With options

```tsx
import { DEFAULT_FHIR_CLIENT, useFhirInfiniteSearch } from "@bonfhir/query/r4b";

export default function MyComponent() {
  const patientsQuery = useFhirInfiniteSearch(
    "Patient",
    (search) =>
      // The search needs a sort criteria (to be stable),
      // the _count specifies the number of resources to fetch for each round-trip
      search._sort("family")._count(20),
    {
      // FHIR API options - matches the `FhirClient` options
      fhir: {
        _pretty: "true",
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
