---
sidebar_position: 5
title: useFhirDeleteMutation
description: Delete a FHIR resource
---

Return a [Mutation](https://tanstack.com/query/latest/docs/react/guides/mutations) for a
[delete](https://hl7.org/fhir/http.html#delete) request.

:::warning[Should you delete?]

It is very rare that you have to delete a resource in FHIR.  
Most of the time, you should update attributes using the [resources lifecyle](https://hl7.org/fhir/lifecycle.html).

:::

### Basic usage

```tsx
import { useFhirDeleteMutation } from "@bonfhir/query/r4b";
import { Button } from "@mantine/core";

export default function MyComponent() {
  const deleteMutation = useFhirDeleteMutation();

  return (
    <Button
      loading={deleteMutation.isPending}
      onClick={() =>
        deleteMutation.mutate({
          resourceType: "Patient",
          id: "1baad35e-7b87-4149-8f8d-c1f72246cb32",
        })
      }
    >
      Delete Patient
    </Button>
  );
}
```

### With options

```tsx
import { DEFAULT_FHIR_CLIENT, useFhirDeleteMutation } from "@bonfhir/query/r4b";
import { notifications } from "@mantine/notifications";

export default function MyComponent() {
  const createPatientMutation = useFhirDeleteMutation({
    // The name of the FhirClient to use
    fhirClient: DEFAULT_FHIR_CLIENT,

    // React query mutation options
    mutation: {
      onSuccess: () => {
        notifications.show({
          title: "Patient deleted",
          message: "Patient has been deleted",
          color: "red",
        });
      },
      onError: (error) => {...}
    },
  });

  //...
}
```
