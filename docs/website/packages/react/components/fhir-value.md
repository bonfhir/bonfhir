---
title: <FhirValue />
---

The purpose of the `<FhirValue />` component is to display [FHIR Data Types](https://hl7.org/fhir/datatypes.html) easily.

It uses the [Core formatter](/packages/core/data-types-formatters) and should provide most of the same options.  
The default formatter options can be configured in the [`<FhirUIProvider />`](/packages/react/get-started#custom-global-formatter).

### Example usage

```tsx

const patientQuery = useFhirRead("Patient", "123");
const patient = patientQuery.data;

<FhirValue type="date" value={patient?.birthDate} options={{ dateStyle: "relative" }} />
<FhirValue type="HumanName" value={patient?.name} options={{ max: 1 }} />
```

### Preview

```tsx
<FhirValue type="HumanName" value={patient?.name} />
```

<iframe src="https://bonfhir.dev/storybook/iframe.html?args=&id=bonfhir-data-display-fhirvalue--human-name&viewMode=story" width="100%" />
