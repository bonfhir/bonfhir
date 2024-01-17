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
      <InfiniteScroller {...patientsQuery} />
    </Stack>
  );
}

function InfiniteScroller({
  hasNextPage,
  fetchNextPage,
}: UseInfiniteQueryResult) {
  const id = useId();
  const observerRef = useRef<IntersectionObserver | undefined>(undefined);

  useEffect(() => {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }
    const options = { root: null, rootMargin: "0px", threshold: 1 };
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting && hasNextPage)) {
        fetchNextPage();
      }
    }, options);
    observerRef.current.observe(target);
    return () => {
      observerRef.current?.disconnect();
    };
  }, [id, hasNextPage, fetchNextPage]);

  return <div id={id} />;
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
