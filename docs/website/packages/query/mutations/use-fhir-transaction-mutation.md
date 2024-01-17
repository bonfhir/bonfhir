---
sidebar_position: 8
title: useFhirTransactionMutation
description: Execute a FHIR transaction
---

Return a [Mutation](https://tanstack.com/query/latest/docs/react/guides/mutations) for a
[transaction](https://hl7.org/fhir/http.html#transaction) request.

Refer to the [core documentation on transaction builder](/packages/core/fhir-client#batchtransaction-builder) to understand
more about transaction support in bonFHIR.

### Basic usage

```tsx
import { build } from "@bonfhir/core/r4b";
import { useFhirTransactionMutation } from "@bonfhir/query/r4b";
import { Button } from "@mantine/core";

export default function MyComponent() {
  const transactionMutation = useFhirTransactionMutation();

  const executeTransaction = () => {
    transactionMutation.mutate((transaction) => {
      // The body of the mutate function is a function that can manipulate the transaction builder
      // We see here that we create an Organization, a Practitioner and a PractionerRole in the same transaction
      // with inner references.
      const org = transaction.create(
        build("Organization", { name: "Acme, Inc" }),
      );
      const practitioner = transaction.create(
        build("Practitioner", { name: [{ family: "Doe", given: ["John"] }] }),
      );
      transaction.create(
        build("PractitionerRole", {
          practitioner: practitioner.reference,
          organization: org.reference,
        }),
      );
    });
  };

  return (
    <Button
      loading={transactionMutation.isPending}
      onClick={executeTransaction}
    >
      Create organization and practitioner
    </Button>
  );
}
```

### With options

```tsx
import { DEFAULT_FHIR_CLIENT, useFhirTransactionMutation } from "@bonfhir/query/r4b";

export default function MyComponent() {
  const transactionMutation = useFhirTransactionMutation({
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

  // ...
}
```
