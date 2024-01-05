---
sidebar_position: 3
title: Mutations
description: Modify FHIR Data from a FHIR Server
---

import DocCardList from '@theme/DocCardList';

These are all [Mutation hooks](https://tanstack.com/query/v5/docs/react/guides/mutations).

The main difference with [queries](/packages/query/queries) is that mutations do not execute by default - they are invoked
by an action on the page.

:::info[Refresh strategies]

One important thing to understand is that since the query cache is managed by the `<FhirQueryProvider />`, you don't need
to refresh the [queries](/packages/query/queries) whenever [mutations](/packages/query/mutations) occur - data is refreshed automatically.

This greatly simplifies code flow and avoid a lot of spaghetti code when creating an application.  
Basically, you don't need to worry about data refresh dependencies in the whole application.

:::

<DocCardList />
