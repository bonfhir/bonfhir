---
sidebar_position: 2
title: Query
description: React app state management with React Query
---

import DocCardList from '@theme/DocCardList';

# Query

[![npm](https://img.shields.io/npm/v/@bonfhir/query)](https://www.npmjs.com/package/@bonfhir/query)

The `@bonfhir/query` package contains a series of hooks meant to manage FHIR data fetching in a react and react-native
application.

:::info[React Query]

It heavily relies on the [Tanstack Query (React Query) v5](https://tanstack.com/query/v5) library.  
If you are not familiar with this library, I strongly suggest you go ahead and read the [Overview](https://tanstack.com/query/v5/docs/react/overview)
first - it will greatly help.

:::

With this library, you don't need to worry about fecthing strategies, cache invalidation, data freshness,
loading / error cycles, and all those pesky details that are hard to get right.
You just use the provided hooks, and the library normalize the React Query cache for you.

<DocCardList />
