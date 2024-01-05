---
sidebar_position: 2
title: useFhirUpdateMutation
description: Update a FHIR resource
---

Return a [Mutation](https://tanstack.com/query/latest/docs/react/guides/mutations) for an
[update](https://hl7.org/fhir/http.html#create) request.

### Basic usage

```tsx
import { build } from "@bonfhir/core/r4b";
import { useFhirUpdateMutation } from "@bonfhir/query/r4b";
import { Button } from "@mantine/core";

export default function MyComponent() {
  const updatePatientMutation = useFhirUpdateMutation("Patient");

  const buildPatient = () =>
    build("Patient", {
      id: "1baad35e-7b87-4149-8f8d-c1f72246cb32",
      name: [{ given: ["John"], family: "Doe" }],
      active: true,
    });

  return (
    <Button
      loading={updatePatientMutation.isPending}
      onClick={() => updatePatientMutation.mutate(buildPatient())}
    >
      Create Patient
    </Button>
  );
}
```

### With options

```tsx
import { DEFAULT_FHIR_CLIENT, useFhirUpdateMutation } from "@bonfhir/query/r4b";
import { useFhirUIContext } from "@bonfhir/react/r4b";
import { notifications } from "@mantine/notifications";

export default function MyComponent() {
  const { formatter } = useFhirUIContext();

  const updatePatientMutation = useFhirUpdateMutation("Patient", {
    // The name of the FhirClient to use
    fhirClient: DEFAULT_FHIR_CLIENT,

    // React query mutation options
    mutation: {
      onSuccess: (patient) => {
        notifications.show({
          title: "Patient updated",
          message: formatter.message`Updated patient ${[
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
