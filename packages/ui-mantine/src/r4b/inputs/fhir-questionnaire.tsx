import { QuestionnaireItem } from "@bonfhir/core/r4b";
import {
  FhirInput,
  FhirInputProps,
  FhirQueryLoader,
  FhirQuestionnaireRendererProps,
  FhirValue,
  FhirValueProps,
} from "@bonfhir/ui/r4b";
import { Stack, StackProps, Title, TitleProps } from "@mantine/core";
import { ReactElement } from "react";

export function MantineFhirQuestionnaire(
  props: FhirQuestionnaireRendererProps<MantineFhirQuestionnaireProps>
): ReactElement | null {
  return (
    <FhirQueryLoader query={props.questionnaireQuery}>
      {(questionnaire) => (
        <Stack {...props.rendererProps?.mainStack}>
          {questionnaire.title && (
            <Title order={2} {...props.rendererProps?.title}>
              {questionnaire.title}
            </Title>
          )}
          {(questionnaire.item || []).map((item, index) => (
            <MantineQuestionnaireItemRenderer
              key={index}
              props={props}
              item={item}
            />
          ))}
        </Stack>
      )}
    </FhirQueryLoader>
  );
}

export interface MantineFhirQuestionnaireProps {
  mainStack?: StackProps | null | undefined;
  title?: TitleProps | null | undefined;
  itemDisplay?: FhirValueProps | null | undefined;
  itemGroupStack?: StackProps | null | undefined;
  itemGroupTitle?: TitleProps | null | undefined;
  itemString?: FhirInputProps | null | undefined;
}

function MantineQuestionnaireItemRenderer({
  props,
  item,
}: {
  props: FhirQuestionnaireRendererProps<MantineFhirQuestionnaireProps>;
  item: QuestionnaireItem;
}): ReactElement | null {
  switch (item.type) {
    case "display": {
      return (
        <FhirValue
          type="string"
          value={item.text}
          {...props.rendererProps?.itemDisplay}
        />
      );
    }
    case "group": {
      return (
        <Stack {...props.rendererProps?.itemGroupStack}>
          {item.text && (
            <Title order={3} {...props.rendererProps?.itemGroupTitle}>
              {item.text}
            </Title>
          )}
          {(item.item || []).map((item: QuestionnaireItem, index: number) => (
            <MantineQuestionnaireItemRenderer
              key={index}
              props={props}
              item={item}
            />
          ))}
        </Stack>
      );
    }
    case "string": {
      return (
        <FhirInput
          type="string"
          label={item.text}
          {...props.rendererProps?.itemString}
        />
      );
    }
  }

  return null;
}
