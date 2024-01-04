---
title: useFhirUIProvider
---

The `useFhirUIContext` hook gives access to the [`<FhirUIProvider />` configuration](/packages/react/get-started#configure-the-fhiruiprovider-).

## Basic usage

```tsx
const { formatter, render } = useFhirUIContext();
```

Features:

- `formatter`: the globally configured formatter instance
- `onNavigate`: to use the navigation configured in the provider

You should probably ignore all other features, as they exists for the purpose of the bonFHIR React component implementation
and should probably not be used anywhere else.
