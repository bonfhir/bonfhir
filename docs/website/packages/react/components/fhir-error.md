---
title: <FhirError />
---

The `<FhirError />` displays error messages, and optionaly allows to retry a query or a mutation.

See also [`<FhirQueryLoader />`](/packages/react/components/fhir-query-loader) for a more complete error management solution.

## Example usage

```tsx
const encountersQuery = useFhirSearch("Encounter");

if (encountersQuery.isError) {
  return (
    <FhirError
      error={encountersQuery.error}
      onRetry={() => encountersQuery.refetch()}
    />
  );
}

//...
```

## Preview

<iframe src="https://bonfhir.dev/storybook/iframe.html?args=&id=bonfhir-feedback-fhirerror--default&viewMode=story" width="100%" />
