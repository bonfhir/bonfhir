import { useFhirQuestionnaire } from "../context";
import { LinkId } from "../types";
import { FhirQuestionnaireItemProvider } from "./provider";

type Props = {
  linkId: LinkId;
};

export const CustomComponentFactory: React.FC<Props> = ({ linkId }) => {
  const questionnaire = useFhirQuestionnaire();
  const maybeQuestion = questionnaire.questions[linkId];

  if (!maybeQuestion) {
    console.warn(
      `Could not find requested question in questionnaire: linkId [${linkId}]`,
    );

    return <></>;
  }

  const component: React.ReactNode = questionnaire.questions[linkId]
    ?.customization?.component ?? <></>;

  return (
    <FhirQuestionnaireItemProvider
      question={maybeQuestion}
      validateWhen={questionnaire.validateWhen}
      onResponseChanged={questionnaire.onAnswered}
      onResponseCleared={questionnaire.onQuestionCleared}
      responses={questionnaire.responses[maybeQuestion.linkId]}
    >
      {component}
    </FhirQuestionnaireItemProvider>
  );
};
