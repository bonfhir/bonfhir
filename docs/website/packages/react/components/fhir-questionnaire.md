---
title: <FhirQuestionnaire />
---

The `<FhirQuestionnaire />` renders a [FHIR Questionnaire](https://hl7.org/fhir/questionnaire.html)
and creates a corresponding [FHIR QuestionnaireResponse](https://hl7.org/fhir/questionnaireresponse.html).

## Example usage

```typescript
// Use the Questionnaire URL directly.
<FhirQuestionnaire
  source="http://acme.org/sample-questionnaire"
  onSubmit={(questionnaireResponse) => alert(questionnaireResponse)}
/>

// Use a query to retrieve the Questionnaire
const { data: questionnaire } = useFhirSearchOne("Questionnaire", (search) =>
  search
    .url("http://acme.org/sample-questionnaire")
    .status("active"),
);

<FhirQuestionnaire
  source={questionnaire}
  onSubmit={(questionnaireResponse) => alert(questionnaireResponse)}
/>
```

## Preview

<iframe src="https://bonfhir.dev/storybook/iframe.html?args=&id=bonfhir-inputs-fhirquestionnaire--default&viewMode=story" width="100%" height="500" />
