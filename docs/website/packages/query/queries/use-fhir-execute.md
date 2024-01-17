---
sidebar_position: 7
title: useFhirExecute
description: Execute an operation that does not affect state
---

Return a [Query](https://tanstack.com/query/latest/docs/react/guides/queries) for an
[operation](https://hl7.org/fhir/operations.html) request.

:::warning

This is the query version - meaning that it should only be used for operations that **do NOT** [affect state](https://hl7.org/fhir/operationdefinition-definitions.html#OperationDefinition.affectsState).
If the operation DO affect state, please use the [mutation](/packages/query/mutations/use-fhir-execute-mutation) instead.

:::

### Basic usage

```tsx
import { ValueSet, asError } from "@bonfhir/core/r4b";
import { useFhirExecute } from "@bonfhir/query/r4b";
import { List } from "@mantine/core";

export default function MyComponent() {
  const expandMaritalStatusQuery = useFhirExecute<ValueSet>({
    operation: "$expand",
    resourceType: "ValueSet",
    parameters: [
      {
        name: "url",
        valueUri: "http://hl7.org/fhir/ValueSet/marital-status",
      },
    ],
    affectsState: false,
  });

  if (expandMaritalStatusQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (expandMaritalStatusQuery.isError) {
    return <div>{asError(expandMaritalStatusQuery.error)?.message}</div>;
  }

  return (
    <List>
      {expandMaritalStatusQuery.data?.expansion?.contains?.map((item) => (
        <List.Item key={item.code}>{item.display}</List.Item>
      ))}
    </List>
  );
}
```

### With the `<FhirQueryLoader />`

```tsx
import { ValueSet } from "@bonfhir/core/r4b";
import { useFhirExecute } from "@bonfhir/query/r4b";
import { FhirQueryLoader } from "@bonfhir/react/r4b";
import { List } from "@mantine/core";

export default function MyComponent() {
  const expandMaritalStatusQuery = useFhirExecute<ValueSet>({
    operation: "$expand",
    resourceType: "ValueSet",
    parameters: [
      {
        name: "url",
        valueUri: "http://hl7.org/fhir/ValueSet/marital-status",
      },
    ],
    affectsState: false,
  });

  return (
    <FhirQueryLoader query={expandMaritalStatusQuery}>
      {(valueSet) => (
        <List>
          {valueSet.expansion?.contains?.map((item) => (
            <List.Item key={item.code}>{item.display}</List.Item>
          ))}
        </List>
      )}
    </FhirQueryLoader>
  );
}
```

### With options

```tsx
import { ValueSet } from "@bonfhir/core/r4b";
import { DEFAULT_FHIR_CLIENT, useFhirExecute } from "@bonfhir/query/r4b";

export default function MyComponent() {
  const expandMaritalStatusQuery = useFhirExecute<ValueSet>(
    {
      operation: "$expand",
      resourceType: "ValueSet",
      parameters: [
        {
          name: "url",
          valueUri: "http://hl7.org/fhir/ValueSet/marital-status",
        },
      ],
      affectsState: false,
    },
    {
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
