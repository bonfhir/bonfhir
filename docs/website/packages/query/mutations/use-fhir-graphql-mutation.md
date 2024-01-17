---
sidebar_position: 7
title: useFhirGraphQLMutation
description: Execute a GraphQL mutation
---

Return a [Mutation](https://tanstack.com/query/latest/docs/react/guides/mutations) for a
[GraphQL](https://hl7.org/fhir/graphql.html) request.

:::warning[GraphQL mutation]

This hooks is intended for GraphQL `mutation` operations.

If you need to execute a query, you should use the [`useFhirGraphQL`](/packages/query/queries/use-fhir-graphql) hook.

:::

### Usage with GraphQL mutations as string

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { build } from "@bonfhir/core/r4b";
import { useFhirGraphQLMutation } from "@bonfhir/query/r4b";
import { Button } from "@mantine/core";

export default function MyComponent() {
  const createOrganizationMutation = useFhirGraphQLMutation(`
  mutation CreateOrganization($res: OrganizationCreate!) {
    OrganizationCreate(res: $res) {
      id
      name
    }
  }
`);

  const createOrganization = () => {
    createOrganizationMutation.mutate({
      res: build("Organization", {
        name: "Acme, Inc",
      }),
    });
  };

  return (
    <Button
      loading={createOrganizationMutation.isPending}
      onClick={createOrganization}
    >
      Create organization
    </Button>
  );
}
```

### Usage with typed GraphQL

It is possible to generate proper type information for GraphQL queries.
The details depend on your setup, but [following this guide](/docs/guides/graphql)
should get you started. You can then do this:

```tsx title="codegen.ts"
import type { CodegenConfig } from "@graphql-codegen/cli";

export default {
  schema: "fhir-schema.graphql.json",
  documents: ["./src/**/*.tsx"],
  emitLegacyCommonJSImports: false,
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      preset: "client",
    },
  },
} satisfies CodegenConfig;
```

### With options

Useful to react on the success or error of a mutation:

```tsx
import {
  DEFAULT_FHIR_CLIENT,
  useFhirGraphQLMutation,
} from "@bonfhir/query/r4b";
import { notifications } from "@mantine/notifications";
import { graphql } from "../gql";

export default function MyComponent() {
  const createOrganizationMutationDocument = graphql(`
    mutation CreateOrganization($res: OrganizationCreate!) {
      OrganizationCreate(res: $res) {
        id
        name
      }
    }
  `);

  const createOrganizationMutation = useFhirGraphQLMutation(
    createOrganizationMutationDocument,
    {
      // The name of the FhirClient to use
      fhirClient: DEFAULT_FHIR_CLIENT,

      // React query mutation options
      mutation: {
        onSuccess: (org) => {
          notifications.show({
            title: "Organization created",
            message: `Created org ${org.OrganizationCreate?.name} (${org.OrganizationCreate?.id})`,
            color: "green",
          });
        },
      },
    },
  );

  //...
}
```
