import React from "react";
import { useFhirQuestionnaire } from "../context";
import { LinkId } from "../types";
import { FhirQuestionnaireItemProvider } from "./provider";

type Props = {
  linkId: LinkId;
};
export const KnownQuestionTypeComponentFactory: React.FC<Props> = ({
  linkId,
}) => {
  const questionnaire = useFhirQuestionnaire();

  const q = questionnaire.questions[linkId];

  if (!q) {
    return <></>;
  }

  return (
    <FhirQuestionnaireItemProvider
      question={q}
      validateWhen={questionnaire.validateWhen}
      onResponseChanged={questionnaire.onAnswered}
      onResponseCleared={questionnaire.onQuestionCleared}
      responses={questionnaire.responses[linkId]}
    >
      <>{String(q._type) ?? "dunno"}</>
    </FhirQuestionnaireItemProvider>
  );
};
