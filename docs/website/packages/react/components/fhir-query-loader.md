---
title: <FhirQueryLoader />
---

The `<FhirQueryLoader />` manages the loading / success / error lifecycle of a query.  
It offers a completely managed solution for client-side error handling.

Here is the lifecycle:

- render a loader when the query is initially loading
- render its children when loading is successful
- render a [`<FhirError />`](/packages/react/components/fhir-error) if the query execution resulted in an error; the retry button is connected to the query automatically

## Example usage

```tsx
const encountersQuery = useFhirSearch("Encounter");

return (
  <FhirQueryLoader query={encountersQuery}>
    // Only show the encounters if the query is successful
  </FhirQueryLoader>
);
```

If using a function as the child component, it passes the query `data` as an non-null argument.

```tsx
const patientQuery = useFhirRead("Patient", "123");

return (
  <FhirQueryLoader query={patientQuery}>
    // Here patient is of type Patient!
    {(patient) => <FhirValue type="HumanName" value={patient.name} />}
  </FhirQueryLoader>
);
```

Multiple queries can be tracked for loading status, and only renders when all queries are loaded.  
In that case, the argument to the child function is the first query of the array.

```tsx
const patientQuery = useFhirRead("Patient", "123");
const encountersQuery = useFhirSearch("Encounter", (search) =>
  search.patient("Patient/123"),
);

return (
  <FhirQueryLoader query={[patientQuery, encountersQuery]}>
    {(patient) => <FhirValue type="HumanName" value={patient.name} />}
  </FhirQueryLoader>
);
```

## Preview

<iframe src="https://bonfhir.dev/storybook/iframe.html?args=&id=bonfhir-feedback-fhirqueryloader--loading&viewMode=story" width="100%" />

<iframe src="https://bonfhir.dev/storybook/iframe.html?args=&id=bonfhir-feedback-fhirqueryloader--default&viewMode=story" width="100%" />

<iframe src="https://bonfhir.dev/storybook/iframe.html?args=&id=bonfhir-feedback-fhirqueryloader--on-error&viewMode=story" width="100%" />
