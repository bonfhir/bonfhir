---
sidebar_position: 1
title: useFhirCreateMutation
description: Create a FHIR resource
---

Return a [Mutation](https://tanstack.com/query/latest/docs/react/guides/mutations) for a
[create](https://hl7.org/fhir/http.html#create) request.

### Basic usage

```tsx
import { build } from "@bonfhir/core/r4b";
import { useFhirCreateMutation } from "@bonfhir/query/r4b";
import { Button } from "@mantine/core";

export default function MyComponent() {
  const createPatientMutation = useFhirCreateMutation("Patient");

  const buildPatient = () =>
    build("Patient", {
      name: [{ given: ["John"], family: "Doe" }],
      active: true,
    });

  return (
    <Button
      loading={createPatientMutation.isPending}
      onClick={() => createPatientMutation.mutate(buildPatient())}
    >
      Create Patient
    </Button>
  );
}
```

## With options

```tsx
import { DEFAULT_FHIR_CLIENT, useFhirCreateMutation } from "@bonfhir/query/r4b";
import { useFhirUIContext } from "@bonfhir/react/r4b";
import { notifications } from "@mantine/notifications";

export default function MyComponent() {
  const { formatter } = useFhirUIContext();

  const createPatientMutation = useFhirCreateMutation("Patient", {
    // The name of the FhirClient to use
    fhirClient: DEFAULT_FHIR_CLIENT,

    // React query mutation options
    mutation: {
      onSuccess: (patient) => {
        notifications.show({
          title: "Patient created",
          message: formatter.message`Created patient ${[
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
