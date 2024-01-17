---
sidebar_position: 9
title: useFhirClientMutation
description: Execute a series of FHIR operations
---

Return a [Mutation](https://tanstack.com/query/latest/docs/react/guides/mutations) with access to the raw [FhirClient](/packages/core/fhir-client).

This is useful when you have a series of operations to execute as part of a single mutation, or if the other [mutation hooks](/packages/query/mutations)
won't allow you to do what you mean.  
**You should always prefer to use a more precise hook.**

:::warning

By default, this mutation will invalidate the _entire_ query cache, unless you use the `doNotInvalidateAllQueries` option

:::

### Basic usage

```tsx
import { Organization, build } from "@bonfhir/core/r4b";
import { useFhirClientMutation } from "@bonfhir/query/r4b";
import { Button } from "@mantine/core";

export default function MyComponent() {
  // The type here is the awaited return type of the `mutate` method below
  const clientMutation = useFhirClientMutation<[Organization, boolean]>();

  const execute = () => {
    clientMutation.mutate(async (client) => {
      return await client.createOr(
        "return",
        build("Organization", { name: "Acme, Inc" }),
      );
    });
  };

  return (
    <Button loading={clientMutation.isPending} onClick={execute}>
      Create organization if it does not already exist (by its name)
    </Button>
  );
}
```

### With options

```tsx
import { DEFAULT_FHIR_CLIENT, useFhirClientMutation } from "@bonfhir/query/r4b";

export default function MyComponent() {
  const clientMutation = useFhirClientMutation<[Organization, boolean]>({
    // The name of the FhirClient to use
    fhirClient: DEFAULT_FHIR_CLIENT,

    // Settings this to true will prevent the mutation from invalidating all queries
    doNotInvalidateAllQueries: true,

    // React query mutation options
    mutation: {
      onSuccess: ([org, wasCreated]) => {
        if (wasCreated) {
          notifications.show({
            title: "Organization created",
            message: `Created organization ${org.name}`,
            color: "green",
          });
        } else {
          notifications.show({
            title: "Organization already exists",
            message: "Nothing to do here!",
            color: "blue",
          });
        }
      },
      onError: (error) => {...}
    },
  });
  // ...
}
```
