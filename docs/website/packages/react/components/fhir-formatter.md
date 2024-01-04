---
title: <FhirFormatter />
---

The `<FhirFormatter />` is a variation of the [`<FhirValue />`](/packages/react/components/fhir-value) that is intended to compose better with the
[formatter message API](/packages/core/data-types-formatters#the-message-api):

## Example usage

```tsx
const patientQuery = useFhirRead("Patient", "123");
const patient = patientQuery.data;

<FhirFormatter
  format={(f) =>
    f.message`${["HumanName", patient?.name, { max: 1 }]}${[
      "date",
      patient?.birthDate,
      { decorator: " (born {})" },
    ]}`
  }
/>;
```

## preview

```tsx
<FhirFormatter
  format={(f) =>
    f.message`Name: ${["HumanName", patient.name]}${[
      "boolean",
      patient.active,
      { decorator: ", Active: {}" },
    ]}`
  }
/>
```

<iframe src="https://bonfhir.dev/storybook/iframe.html?args=&id=bonfhir-data-display-fhirformatter--default&viewMode=story" width="100%" />
