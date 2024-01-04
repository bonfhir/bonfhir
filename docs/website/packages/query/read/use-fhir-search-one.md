---
sidebar_position: 4
title: useFhirSearchOne
description: Search for a single FHIR resource
---

This hook is similar to the [`useFhirSearch`](/packages/query/read/use-fhir-search) one, except that it is optimized to
return one and only one search match.  
This is very convenient on cases where:

- you need to address a single resource by its [canonical URL](https://www.hl7.org/fhir/references.html#canonical)
- or you are looking to also retrieve [referenced resources](https://www.hl7.org/fhir/search.html#include) (e.g. `_include` and `_revinclude` usage)

```tsx
import { asError } from "@bonfhir/core/r4b";
import { useFhirSearchOne } from "@bonfhir/query/r4b";

export default function MyComponent() {
  const questionnaireQuery = useFhirSearchOne("Questionnaire", (search) =>
    search.url("http://acme.org/fhir/my-questionnaire"),
  );

  if (questionnaireQuery.isInitialLoading) {
    return <div>Loading...</div>;
  }

  if (questionnaireQuery.isError) {
    return <div>{asError(questionnaireQuery.error)?.message}</div>;
  }

  return questionnaireQuery.data?.title;
}
```

More concisely, with the [`<FhirQueryLoader />`](/packages/react/components/fhir-query-loader) component:

```tsx
import { DocumentReference } from "@bonfhir/core/r4b";
import { useFhirSearchOne } from "@bonfhir/query/r4b";
import { FhirQueryLoader, FhirValue } from "@bonfhir/react/r4b";
import { List, Stack } from "@mantine/core";

export default function MyComponent() {
  const encounterQuery = useFhirSearchOne("Encounter", (search) =>
    search
      ._id("5def0123-5a8a-4842-a3c0-7dd8386bdf6a")
      ._include("Encounter", "patient")
      ._include("Encounter", "diagnosis")
      ._revinclude("DocumentReference", "encounter")
      ._revinclude("Observation", "encounter"),
  );

  return (
    <FhirQueryLoader query={encounterQuery}>
      {(encounter) => (
        <Stack>
          <FhirValue type="Period" value={encounter.period} />
          <List>
            {encounter
              .revIncluded<DocumentReference>((doc) => doc.context?.encounter)
              .map((doc) => (
                <List.Item key={doc.id}>
                  <FhirValue type="CodeableConcept" value={doc.type} />:{" "}
                  {doc.description}
                </List.Item>
              ))}
          </List>
        </Stack>
      )}
    </FhirQueryLoader>
  );
}
```

With options:

```tsx
import { DEFAULT_FHIR_CLIENT, useFhirSearchOne } from "@bonfhir/query/r4b";

export default function MyComponent() {
  const questionnaireQuery = useFhirSearchOne(
    "Questionnaire",
    (search) => search.url("http://acme.org/fhir/my-questionnaire"),
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

The `useFhirSearchOne` hook errors out if there is no result, or more than one match in the bundle (referenced resources are OK).

If you are not sure about the existence of the resource, you might want to use [`useFhirSearch`](/packages/query/read/use-fhir-search) instead.
