---
sidebar_position: 6
title: useFhirExecuteMutation
description: Execute an operation that affects state
---

Return a [Mutation](https://tanstack.com/query/latest/docs/react/guides/mutations) for an
[operation](https://hl7.org/fhir/operations.html) request.

This can be used for operations that [affect states or not](https://hl7.org/fhir/operationdefinition-definitions.html#OperationDefinition.affectsState).

### Basic usage

```tsx
import { Operation } from "@bonfhir/core/r4b";
import { useFhirExecuteMutation } from "@bonfhir/query/r4b";
import { Button } from "@mantine/core";

export default function MyComponent() {
  const translateOperationMutation = useFhirExecuteMutation();

  const buildTranslateOperation = (): Operation => ({
    operation: "$translate",
    affectsState: false,
    resourceType: "ConceptMap",
    parameters: [
      {
        name: "url",
        valueUri: "http://hl7.org/fhir/ConceptMap/101",
      },
      {
        name: "system",
        valueUri: "http://hl7.org/fhir/ValueSet/address-use",
      },
      {
        name: "code",
        valueCode: "work",
      },
    ],
  });

  return (
    <Button
      loading={translateOperationMutation.isPending}
      onClick={() =>
        translateOperationMutation.mutate(buildTranslateOperation())
      }
    >
      Translate code
    </Button>
  );
}
```

### With options

```tsx
import { DEFAULT_FHIR_CLIENT, useFhirExecuteMutation } from "@bonfhir/query/r4b";

export default function MyComponent() {
  const translateOperationMutation = useFhirExecuteMutation({
    // The name of the FhirClient to use
    fhirClient: DEFAULT_FHIR_CLIENT,

    // React query mutation options
    mutation: {
      onSuccess: (patient) => {...},
      onError: (error) => {...}
    },
  });

  //...
}
```
