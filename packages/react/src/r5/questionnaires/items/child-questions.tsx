import { QuestionnaireItem } from "@bonfhir/core/r5";
import { useFhirQuestionnaire } from "../context";
import { CustomComponentFactory } from "./custom-component-factory";
import { KnownQuestionTypeComponentFactory } from "./known-question-type-component-factory";

type Props = {
  item: QuestionnaireItem;
};

export const ChildQuestion: React.FC<Props> = ({ item }) => {
  const questionnaire = useFhirQuestionnaire();
  const withCustomizationInformation = questionnaire.questions[item.linkId];

  if (!withCustomizationInformation) {
    console.warn(
      `Child question with link id [${item.linkId}] could not be found in the flattened questionnaire...`,
    );

    return <></>;
  }

  return withCustomizationInformation?.customization?.component ? (
    <CustomComponentFactory linkId={item.linkId} />
  ) : (
    <KnownQuestionTypeComponentFactory linkId={item.linkId} />
  );
};
