---
title: <FhirQuestionnaire />
---

The `<FhirQuestionnaire />` renders a [FHIR Questionnaire](https://hl7.org/fhir/questionnaire.html)
and creates a corresponding [FHIR QuestionnaireResponse](https://hl7.org/fhir/questionnaireresponse.html).

## Example usage

```tsx
// Use the Questionnaire URL directly.
<FhirQuestionnaire
  source="http://acme.org/sample-questionnaire"
  onSubmit={(questionnaireResponse) => alert(questionnaireResponse)}
/>;

// Use a query to retrieve the Questionnaire
const { data: questionnaire } = useFhirSearchOne("Questionnaire", (search) =>
  search.url("http://acme.org/sample-questionnaire").status("active"),
);

<FhirQuestionnaire
  source={questionnaire}
  onSubmit={(questionnaireResponse) => alert(questionnaireResponse)}
/>;
```

## Preview

<iframe src="https://bonfhir.dev/storybook/iframe.html?args=&id=bonfhir-inputs-fhirquestionnaire--default&viewMode=story" width="100%" height="500" />

## Customization

Both the questionnaire and questionnaire item components can be overridden to allow for custom rendering. 

Here is an example of how to customize the questionnaire item renderer:


```tsx
// Define a custom questionnaire item:
import { MantineFhirQuestionnaireItem, MantineQuestionnaireItemRendererProps } from "@bonfhir/mantine/r4b";

export function CustomQuestionnaireItem({
  props,
  item,
  parentPath,
  form,
}: MantineQuestionnaireItemRendererProps) {

  // Customize the questionnaire item here

  // Fallback to the default renderer when needed
  return (
    <MantineFhirQuestionnaireItem
      props={props}
      item={item}
      parentPath={parentPath}
      form={form}
    />
  );
}
```
```tsx
// Define a custom renderer:
import { MantineRenderer } from "@bonfhir/mantine/r4b";

export const CustomRenderer = {
  ...MantineRenderer,
  FhirQuestionnaire: CustomQuestionnaire,
  FhirQuestionnaireItem: CustomQuestionnaireItem,
};

// Configure the new renderer on the <FhirUIProvider />
<FhirUIProvider renderer={CustomRenderer}>
  <App />
</FhirUIProvider>
```

See the [Custom renderers](/packages/react/custom-renderers) documentation for more detailed instructions.
