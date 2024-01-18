---
sidebar_position: 3
title: useFhirSearch
description: Search for FHIR resources
---

Return a [Query](https://tanstack.com/query/latest/docs/react/guides/queries) for a
[search](https://hl7.org/fhir/http.html#search) request.

### Basic usage

```tsx
import { asError } from "@bonfhir/core/r4b";
import { useFhirSearch } from "@bonfhir/query/r4b";
import { FhirValue } from "@bonfhir/react/r4b";
import { List } from "@mantine/core";

export default function MyComponent() {
  const patientsSearchQuery = useFhirSearch("Patient", (search) =>
    search
      ._include("Patient", "organization")
      ._sort("-_lastUpdated")
      ._count(20)
      ._total("accurate"),
  );

  if (patientsSearchQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (patientsSearchQuery.isError) {
    return <div>{asError(patientsSearchQuery.error)?.message}</div>;
  }

  return (
    <List>
      {patientsSearchQuery.data?.searchMatch().map((patient) => {
        return (
          <List.Item key={patient.id}>
            <FhirValue type="HumanName" value={patient.name} /> -
            <FhirValue
              type="string"
              value={patient.managingOrganization?.included()?.name}
            />
          </List.Item>
        );
      })}
    </List>
  );
}
```

See the [Core documentation around search](/packages/core/fhir-client#search-builders-and-bundle-navigators) for more information
about the search or the bundle navigator.

### With the `<FhirQueryLoader />`

```tsx
import { useFhirSearch } from "@bonfhir/query/r4b";
import { FhirQueryLoader, FhirValue } from "@bonfhir/react/r4b";
import { List } from "@mantine/core";

export default function MyComponent() {
  const patientsSearchQuery = useFhirSearch("Patient", (search) =>
    search
      ._include("Patient", "organization")
      ._sort("-_lastUpdated")
      ._count(20)
      ._total("accurate"),
  );

  return (
    <FhirQueryLoader query={patientsSearchQuery}>
      {(result) => (
        <List>
          {result.searchMatch().map((patient) => {
            return (
              <List.Item key={patient.id}>
                <FhirValue type="HumanName" value={patient.name} /> -
                <FhirValue
                  type="string"
                  value={patient.managingOrganization?.included()?.name}
                />
              </List.Item>
            );
          })}
        </List>
      )}
    </FhirQueryLoader>
  );
}
```

### With pagination

The third argument of `useFhirSearch` is there to handle subsequent pages.
Since there is a direct depency between the search result and the url for the next page, you need to handle it through
a state change somehow. Ex:

```tsx
import { useFhirSearch } from "@bonfhir/query/r4b";
import { FhirQueryLoader, FhirValue } from "@bonfhir/react/r4b";
import { Button, List, Stack } from "@mantine/core";
import { useState } from "react";

export default function MyComponent() {
  const [pageUrl, setPageUrl] = useState<string | undefined>(undefined);

  const patientsSearchQuery = useFhirSearch(
    "Patient",
    (search) =>
      search
        ._include("Patient", "organization")
        ._sort("-_lastUpdated")
        ._count(20)
        ._total("accurate"),
    // Notice how we pass the "next" page url here as a third argument
    // When it is falsy, it uses the search defined above.
    pageUrl,
  );

  return (
    <FhirQueryLoader query={patientsSearchQuery}>
      {(result) => (
        <Stack>
          <List>
            {result.searchMatch().map((patient) => {
              return (
                <List.Item key={patient.id}>
                  <FhirValue type="HumanName" value={patient.name} /> -
                  <FhirValue
                    type="string"
                    value={patient.managingOrganization?.included()?.name}
                  />
                </List.Item>
              );
            })}
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

This is a simple example. You might be interested in leveraging the [`<FhirPagination />`](/packages/react/components/fhir-pagination) components
and [`useFhirSearchController`](/packages/react/components/use-fhir-search-controller) hook for this:

```tsx
import { useFhirSearch } from "@bonfhir/query/r4b";
import {
  FhirPagination,
  FhirQueryLoader,
  FhirValue,
  useFhirSearchController,
} from "@bonfhir/react/r4b";
import { List, Stack } from "@mantine/core";

export default function MyComponent() {
  const searchController = useFhirSearchController({
    defaultSort: "-_lastUpdated",
    pageSize: 20,
  });

  const patientsSearchQuery = useFhirSearch(
    "Patient",
    (search) =>
      search
        ._include("Patient", "organization")
        ._sort(searchController.sort)
        ._count(searchController.pageSize)
        ._total("accurate"),
    searchController.pageUrl,
  );

  return (
    <FhirQueryLoader query={patientsSearchQuery}>
      {(result) => (
        <Stack>
          <List>
            {result.searchMatch().map((patient) => {
              return (
                <List.Item key={patient.id}>
                  <FhirValue type="HumanName" value={patient.name} /> -
                  <FhirValue
                    type="string"
                    value={patient.managingOrganization?.included()?.name}
                  />
                </List.Item>
              );
            })}
          </List>
          <FhirPagination {...patientsSearchQuery} {...searchController} />
        </Stack>
      )}
    </FhirQueryLoader>
  );
}
```

### With options

```tsx
import { DEFAULT_FHIR_CLIENT, useFhirSearch } from "@bonfhir/query/r4b";

export default function MyComponent() {
  const patientQuery = useFhirSearch(
    "Patient",
    (search) =>
      search
        ._include("Patient", "organization")
        ._sort("-_lastUpdated")
        ._count(20)
        ._total("accurate"),
    undefined,
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
