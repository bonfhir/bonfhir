---
sidebar_position: 2
title: useFhirVRead
description: Read a version of a FHIR resource
---

Return a [Query](https://tanstack.com/query/latest/docs/react/guides/queries) for a
[vread](https://hl7.org/fhir/http.html#vread) request.

```tsx
import { useFhirVRead } from "@bonfhir/query/r4b";

export default function MyComponent() {
  const patientQuery = useFhirVRead(
    "Patient",
    "a337ccfc-3ad4-47b4-9f02-3a19e035bb03",
    // The version id to retrieve
    "51a9a637-465b-4ab8-afe4-79875eaf9dd7",
  );

  if (patientQuery.isInitialLoading) {
    return <div>Loading...</div>;
  }

  if (patientQuery.isError) {
    return <div>{asError(patientQuery.error)?.message}</div>;
  }

  return <FhirValue type="HumanName" value={patientQuery.data?.name} />;
}
```

More concisely, with the [`<FhirQueryLoader />`](/packages/react/components/fhir-query-loader) component:

```tsx
import { useFhirRead } from "@bonfhir/query/r4b";
import { FhirQueryLoader, FhirValue } from "@bonfhir/react/r4b";

export default function MyComponent() {
  const patientQuery = useFhirRead(
    "Patient",
    "a337ccfc-3ad4-47b4-9f02-3a19e035bb03",
    // The version id to retrieve
    "51a9a637-465b-4ab8-afe4-79875eaf9dd7",
  );

  return (
    <FhirQueryLoader query={patientQuery}>
      {(patient) => <FhirValue type="HumanName" value={patient.name} />}
    </FhirQueryLoader>
  );
}
```

With options:

```tsx
import { DEFAULT_FHIR_CLIENT, useFhirRead } from "@bonfhir/query/r4b";

export default function MyComponent() {
  const patientQuery = useFhirRead(
    "Patient",
    "a337ccfc-3ad4-47b4-9f02-3a19e035bb03",
    // The version id to retrieve
    "51a9a637-465b-4ab8-afe4-79875eaf9dd7",
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

The `useFhirVRead` hook errors out on not found - same behavior as the [`FhirClient.vread`](/packages/core/fhir-client#crud).
