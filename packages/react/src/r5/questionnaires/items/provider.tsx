import { PropsWithChildren, useMemo, useState } from "react";
import {
  LinkId,
  QuestionnaireItemWithCustomization,
  QuestionnaireResponseItemWithErrors,
  QuestionnaireValidationBehavior,
} from "../types";
import { ChildQuestion } from "./child-questions";
import { FhirQuestionContext } from "./context";

export type FhirQuestionnaireItemProviderProps = {
  /**
   * The controlled QuestionnaireItem resource
   */
  question: QuestionnaireItemWithCustomization;
  /**
   * if your form already had answers an you wish to pre-fill the questionnaire with them
   */
  responses?: QuestionnaireResponseItemWithErrors[];
  /**
   * Driving the validation process of the questionnaire:
   * - 'onSubmit' will only go through each validation rule when the questionnaire is submitted
   * - 'onChanged' will go through each validation rule the moment a value has been modified
   * - 'never' will never trigger validation of this questionnaire's values
   *
   * each time a validation process is completed, the callback 'onValidated' will be triggered
   */
  validateWhen: QuestionnaireValidationBehavior;
  /**
   * @param questionItem - is the validated questionnaire item with their modified data & validation results
   *
   * depending on validation behavior: is only used when validation behavior is set to onChanged:
   * - if the validation was requested on field changed, you will get the specific questionnaire item
   */
  onResponseValidated?: (
    responseItem: QuestionnaireResponseItemWithErrors,
  ) => Promise<void>;
  /**
   * @param questionItem - is the latest updated questionnaire item with their modified data & validation results
   *
   * sent every time on of the response is changed
   */
  onResponseChanged?: (
    updatedResponse: QuestionnaireResponseItemWithErrors,
  ) => Promise<void>;
  /**
   * Triggered when all responses are removed from a question item
   * @param linkId
   */
  onResponseCleared?: (linkId: LinkId) => Promise<void>;
} & PropsWithChildren;

/**
 * Provides a context for Questionnaire.
 *
 * **Currently requires a parent Fhir UI context**
 *
 * use to wrap individual Questionnaire & allows you to use hooks to access actions : submitting, validating, resetting, etc.
 */
export function FhirQuestionnaireItemProvider({
  question,
  responses,
  validateWhen,
  onResponseValidated,
  onResponseChanged,
  onResponseCleared,
  children,
}: FhirQuestionnaireItemProviderProps) {
  const [modifiedResponses, setModifiedResponses] = useState<
    QuestionnaireResponseItemWithErrors[]
  >(responses ?? []);

  const handleOnFieldValidation = async (
    responseItem: QuestionnaireResponseItemWithErrors,
  ): Promise<QuestionnaireResponseItemWithErrors[]> => {
    let cloned: QuestionnaireResponseItemWithErrors[] =
      [...modifiedResponses].map((stored) =>
        stored.id === responseItem.id ? responseItem : stored,
      ) ?? [];

    const customValidation = question?.customization?.validateWith;
    if (customValidation) {
      cloned = await customValidation(cloned);
    }
    // TODO : OUR VALIDATOR GOES HERE

    if (onResponseValidated) {
      await onResponseValidated(responseItem);
    }

    return cloned;
  };

  const handleOnAnswered = async (
    updatedResponse: QuestionnaireResponseItemWithErrors,
  ) => {
    if (validateWhen === "onChanged") {
      const questionItemWithValidation =
        await handleOnFieldValidation(updatedResponse);
      setModifiedResponses(questionItemWithValidation);
      return;
    }

    const cloned: QuestionnaireResponseItemWithErrors[] =
      [...modifiedResponses].map((stored) =>
        stored.id === updatedResponse.id ? updatedResponse : stored,
      ) ?? [];

    setModifiedResponses(cloned);
    if (onResponseChanged) {
      await onResponseChanged(updatedResponse);
    }
  };

  const handleOnCleared = async () => {
    setModifiedResponses([]);
    if (onResponseCleared) {
      await onResponseCleared(question?.linkId);
    }
  };

  const wrapped = useMemo(() => {
    const context: FhirQuestionContext = {
      onAnswered: handleOnAnswered,
      onCleared: handleOnCleared,
      question: question,
      responses: modifiedResponses,
      validateWhen,
    };

    return context;
  }, [modifiedResponses, question, responses]);

  if (question === undefined || question === null) {
    // TODO user logger wrapper
    console.warn(
      "An undefined question was provided to a FhirQuestionnaireItemProvider -> please make sure your questionnaire has proper question items",
    );
    return <></>;
  }

  return (
    <FhirQuestionContext.Provider value={wrapped}>
      {question.item &&
        question.item.map((child, i) => <ChildQuestion item={child} key={i} />)}
      {children}
    </FhirQuestionContext.Provider>
  );
}
