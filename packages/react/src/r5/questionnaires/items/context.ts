import { createContext, useContext } from "react";
import {
  QuestionnaireItemWithCustomization,
  QuestionnaireResponseItemWithErrors,
  QuestionnaireValidationBehavior,
} from "../types";

export interface FhirQuestionContext {
  question: QuestionnaireItemWithCustomization;
  responses: QuestionnaireResponseItemWithErrors[];
  validateWhen: QuestionnaireValidationBehavior;
  onAnswered: (response: QuestionnaireResponseItemWithErrors) => Promise<void>;
  onCleared: () => Promise<void>;
}

/**
 * The context used by FHIR Questionnaire Item.
 */
export const FhirQuestionContext = createContext<FhirQuestionContext>(
  undefined!,
);

/**
 * Get the current {@link FhirQuestionContext}.
 *
 * @throws Error if no parent context exists (a.k.a. no `FhirQuestionContext` was used in the parent tree).
 */
export const useFhirQuestion = (): FhirQuestionContext => {
  const context = useContext(FhirQuestionContext);
  if (!context) {
    throw new Error(
      "Missing FhirQuestionContext. Did you forget to use a parent FhirQuestionContext?",
    );
  }

  return context;
};
