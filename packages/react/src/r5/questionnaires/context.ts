import { createContext, useContext } from "react";
import {
  QuestionnaireItemDictionary,
  QuestionnaireResponseDictionary,
} from "./transformers/types";

import {
  LinkId,
  QuestionnaireResponseItemWithErrors,
  QuestionnaireValidationBehavior,
} from "./types";

export interface FhirQuestionnaireContext {
  questions: QuestionnaireItemDictionary;
  responses: QuestionnaireResponseDictionary;
  showValidationErrors: boolean;
  validateWhen: QuestionnaireValidationBehavior;
  onAnswered: (response: QuestionnaireResponseItemWithErrors) => Promise<void>;
  onQuestionCleared: (questionId: LinkId) => Promise<void>;
  onSubmitted: () => Promise<void>;
  onCancelled: () => void;
}

/**
 * The context used by FHIR Questionnaire.
 */
export const FhirQuestionnaireContext = createContext<FhirQuestionnaireContext>(
  undefined!,
);

/**
 * Get the current {@link FhirQuestionnaireContext}.
 *
 * @throws Error if no parent context exists (a.k.a. no `FhirQuestionnaireContext` was used in the parent tree).
 */
export const useFhirQuestionnaire = (): FhirQuestionnaireContext => {
  const context = useContext(FhirQuestionnaireContext);
  if (!context) {
    throw new Error(
      "Missing FhirQuestionnaireContext. Did you forget to use a parent FhirQuestionnaireProvider?",
    );
  }

  return context;
};
