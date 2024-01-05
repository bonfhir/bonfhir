---
sidebar_position: 4
title: useFhirPatchMutation
description: Patch a FHIR resource
---

Return a [Mutation](https://tanstack.com/query/latest/docs/react/guides/mutations) for a
[patch](https://hl7.org/fhir/http.html#create) request.

This is very useful when you need to update small bits of information easily, without impacting the whole resource.

### Basic usage

```tsx
import { Patient, Retrieved } from "@bonfhir/core/r4b";
import { useFhirPatchMutation, useFhirSearch } from "@bonfhir/query/r4b";
import { FhirQueryLoader, FhirValue } from "@bonfhir/react/r4b";
import { Checkbox, Group, List } from "@mantine/core";

export default function MyComponent() {
  const patientsQuery = useFhirSearch("Patient", (search) =>
    search._sort("family"),
  );

  const patchPatientMutation = useFhirPatchMutation("Patient");

  const togglePatientActive = (patient: Retrieved<Patient>) => {
    patchPatientMutation.mutate({
      id: patient.id,
      body: (patch) => patch.add("/active", !patient.active),
    });
  };

  return (
    <FhirQueryLoader query={patientsQuery}>
      {(result) => (
        <List>
          {result.searchMatch().map((patient) => (
            <List.Item key={patient.id}>
              <Group>
                <FhirValue type="HumanName" value={patient.name} />
                <Checkbox
                  label="Active"
                  checked={patient.active}
                  onClick={() => togglePatientActive(patient)}
                />
              </Group>
            </List.Item>
          ))}
        </List>
      )}
    </FhirQueryLoader>
  );
}
```

Notice how there is no need to refresh the search after the patch - this is all managed by the query cache.

### With options

```tsx
import {
  DEFAULT_FHIR_CLIENT,
  useFhirPatchMutation,
  useFhirSearch,
} from "@bonfhir/query/r4b";
import { notifications } from "@mantine/notifications";

export default function MyComponent() {
  const patientsQuery = useFhirSearch("Patient", (search) =>
    search._sort("family"),
  );

  const patchPatientMutation = useFhirPatchMutation("Patient", {
    // The name of the FhirClient to use
    fhirClient: DEFAULT_FHIR_CLIENT,

    // React query mutation options
    mutation: {
      onSuccess: (patient) => {
        notifications.show({
          title: "Patient updated",
          message: patient.active
            ? "Patient is now active"
            : "Patient is now inactive",
          color: "green",
        });
      },
      onError: (error) => {...}
    },
  });

  //...
}
```
