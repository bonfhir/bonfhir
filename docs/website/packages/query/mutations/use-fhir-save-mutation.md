---
sidebar_position: 3
title: useFhirSaveMutation
description: Create or update a FHIR resource
---

Return a [Mutation](https://tanstack.com/query/latest/docs/react/guides/mutations) for a
[create](https://hl7.org/fhir/http.html#create) or [update](https://hl7.org/fhir/http.html#create) request.

This is basically a shorthand that invokes the create operation when the resource has no `id`, or the update otherwise.

### Basic usage

```tsx
import { build } from "@bonfhir/core/r4b";
import { useFhirSaveMutation } from "@bonfhir/query/r4b";
import { Button } from "@mantine/core";

export default function MyComponent() {
  const savePatientMutation = useFhirSaveMutation("Patient");

  const buildPatient = () =>
    build("Patient", {
      name: [{ given: ["John"], family: "Doe" }],
      active: true,
    });

  return (
    <Button
      loading={savePatientMutation.isPending}
      onClick={() => savePatientMutation.mutate(buildPatient())}
    >
      Create Patient
    </Button>
  );
}
```

### With options

```tsx
import { DEFAULT_FHIR_CLIENT, useFhirSaveMutation } from "@bonfhir/query/r4b";
import { useFhirUIContext } from "@bonfhir/react/r4b";
import { notifications } from "@mantine/notifications";

export default function MyComponent() {
  const { formatter } = useFhirUIContext();

  const savePatientMutation = useFhirSaveMutation("Patient", {
    // The name of the FhirClient to use
    fhirClient: DEFAULT_FHIR_CLIENT,

    // React query mutation options
    mutation: {
      onSuccess: (patient) => {
        notifications.show({
          title: "Patient saved",
          message: formatter.message`Saved patient ${[
            "HumanName",
            patient.name,
          ]}`,
          color: "green",
        });
      },
      onError: (error) => {...}
    },
  });

  //...
}
```
