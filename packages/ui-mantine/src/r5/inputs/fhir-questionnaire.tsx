import { QuestionnaireItem } from "@bonfhir/core/r5";
import {
  FhirInput,
  FhirQueryLoader,
  FhirQuestionnaireRendererProps,
  FhirValue,
} from "@bonfhir/ui/r5";
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
            <MantineQuestionnaireItemRenderer key={index} item={item} />
          ))}
        </Stack>
      )}
    </FhirQueryLoader>
  );
}

export interface MantineFhirQuestionnaireProps {
  mainStack?: StackProps | null | undefined;
  title?: TitleProps | null | undefined;
}

function MantineQuestionnaireItemRenderer({
  item,
}: {
  item: QuestionnaireItem;
}): ReactElement | null {
  switch (item.type) {
    case "display": {
      return <FhirValue type="string" value={item.text} />;
    }
    case "group": {
      return (
        <Stack>
          {item.text && <Title order={3}>{item.text}</Title>}
          {/* // TODO: Fix Questionnaire type */}
          {((item as any).item || []).map(
            (item: QuestionnaireItem, index: number) => (
              <MantineQuestionnaireItemRenderer key={index} item={item} />
            )
          )}
        </Stack>
      );
    }
    case "string": {
      return <FhirInput type="string" label={item.text} />;
    }
  }

  return null;
}
