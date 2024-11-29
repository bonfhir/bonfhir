import { Questionnaire, QuestionnaireResponseItem } from "@bonfhir/core/r5";
import { Children, useEffect, useMemo, useState } from "react";
import { FhirQuestionnaireContext } from "./context";
import { QuestionItemCustomization } from "./customization";
import { CustomComponentFactory } from "./items/custom-component-factory";
import { KnownQuestionTypeComponentFactory } from "./items/known-question-type-component-factory";
import { FhirQuestionnaireResponseItemToDictionaryTransformer } from "./transformers/fhir-questionnaire-to-dictionary";
import {
  QuestionnaireItemDictionary,
  QuestionnaireResponseDictionary,
} from "./transformers/types";
import {
  LinkId,
  QuestionnaireResponseItemWithErrors,
  QuestionnaireValidationBehavior,
} from "./types";

export type FhirQuestionnaireProviderProps = {
  /**
   * The controlled Questionnaire resource
   */
  questionnaire?: Questionnaire;
  /**
   * if your form already had answers an you wish to pre-fill the questionnaire with them
   */
  responses?: QuestionnaireResponseItem[];
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
   * @param questionnaireWithAnswers - is the structured questionnaire items with their data
   *
   * Called after the submit action has been triggered and completed: we highly suggest you use this method to handle the completed questionnaire.
   *
   * It is not invoked if the questionnaire is deemed invalid.
   */
  onSubmitted?: (
    allResponses: QuestionnaireResponseItemWithErrors[],
  ) => Promise<void>;

  /**
   * Forwards all the latest known state of the responses, note that these were not necessarily submitted: if validation behavior is set to
   * 'onChange', this callback will be triggered when a change (valid OR invalid) is propagated to the responses.
   * If your behavior is set to 'onSubmitted' it will be called beforehand.
   * @param allResponses
   */
  onValidated?: (
    allResponses: QuestionnaireResponseItemWithErrors[],
  ) => Promise<void>;
  /**
   * Called when the 'reset' action has been applied and all items were brought back to their original values
   */
  onCancelled?: () => void;

  children?: QuestionItemCustomization[] | QuestionItemCustomization;
};

/**
 * Provides a context for Questionnaire.
 *
 * **Currently requires a parent Fhir UI context**
 *
 * use to wrap individual Questionnaire & allows you to use hooks to access actions : submitting, validating, resetting, etc.
 */
export function FhirQuestionnaireProvider({
  questionnaire,
  responses,
  onCancelled,
  onSubmitted,
  onValidated,
  validateWhen,
  children,
}: FhirQuestionnaireProviderProps) {
  const customQuestionOnLinkId: QuestionItemCustomization[] = [];
  const customQuestionOnType: QuestionItemCustomization[] = [];

  Children.forEach(children, (child) => {
    if (child) {
      if (child.props.whenLinkIdIs) {
        customQuestionOnLinkId.push(child);
      }

      if (child.props.whenItemTypeIs) {
        customQuestionOnType.push(child);
      }
    }
  });

  const [questionDictionary, setQuestionDictionary] =
    useState<QuestionnaireItemDictionary>({});

  const [responsesWithValidation, setResponsesWithValidation] =
    useState<QuestionnaireResponseDictionary>({});

  const [showValidationErrors, setShowValidationErrors] = useState(
    validateWhen === "onChanged",
  );

  const handleOnResponded = async (
    updated: QuestionnaireResponseItemWithErrors,
  ): Promise<void> => {
    setResponsesWithValidation((previous) => {
      const listOfResponses: QuestionnaireResponseItemWithErrors[] =
        previous[updated.linkId] ?? [];
      const updatedListOfResponse = listOfResponses.map((existing) => {
        if (existing.id === updated.id) {
          return updated;
        }

        return existing;
      });

      previous[updated.linkId] = updatedListOfResponse;
      return previous;
    });
  };

  const handleOnValidated = async (): Promise<
    QuestionnaireResponseItemWithErrors[]
  > => {
    const cloneOfResponses = { ...responsesWithValidation };
    for (const linkId of Object.keys(responsesWithValidation)) {
      const maybeQuestionLinked = questionDictionary[linkId];

      if (!maybeQuestionLinked) {
        console.warn(
          `Strange, we failed to find a response's question... link searched for:[${linkId}].. skipping`,
        );
        continue;
      }
      const maybeResponses = responsesWithValidation[linkId] ?? [];
      if (maybeQuestionLinked.customization?.validateWith) {
        const errors =
          await maybeQuestionLinked.customization?.validateWith(maybeResponses);
        cloneOfResponses[linkId] = errors;
      }

      // TODO : OUR VALIDATOR GOES HERE
    }

    setResponsesWithValidation(cloneOfResponses);

    return Object.values(cloneOfResponses).flat();
  };

  const handleOnQuestionCleared = async (removedLinkId: LinkId) => {
    setResponsesWithValidation((previous) => {
      previous[removedLinkId] = [];
      return previous;
    });
  };

  const handleOnSubmitted = async (): Promise<void> => {
    const allResponses = Object.values(responsesWithValidation).flat();
    let isValid = true;

    if (validateWhen === "onSubmit" && onValidated) {
      const updated: QuestionnaireResponseItemWithErrors[] =
        await handleOnValidated();
      isValid = updated.every(
        (response: QuestionnaireResponseItemWithErrors) =>
          (response.errors ?? []).length === 0,
      );

      setShowValidationErrors(true);
    }

    if (isValid && onSubmitted) {
      await onSubmitted(allResponses);
      return;
    }
  };

  const handleOnCancelled = () => {
    if (onCancelled) {
      onCancelled();
    }
  };

  useEffect(() => {
    if (questionnaire) {
      const transformer =
        new FhirQuestionnaireResponseItemToDictionaryTransformer(
          questionnaire,
          responses ?? [],
        );
      const transformedQuestions = transformer.toQuestionLinkIdDictionary({
        customOnLinkIds: customQuestionOnLinkId,
        customOnType: customQuestionOnType,
      });
      const transformedResponses = transformer.toResponseLinkIdDictionary();

      setQuestionDictionary(transformedQuestions);
      setResponsesWithValidation(transformedResponses);
    }
  }, [questionnaire, responses]);

  const wrapped = useMemo(() => {
    return {
      validateWhen,
      questions: questionDictionary,
      responses: responsesWithValidation,
      showValidationErrors,
      onAnswered: handleOnResponded,
      onQuestionCleared: handleOnQuestionCleared,
      onSubmitted: handleOnSubmitted,
      onCancelled: handleOnCancelled,
    };
  }, [responsesWithValidation, questionDictionary, showValidationErrors]);

  return (
    questionnaire && (
      <FhirQuestionnaireContext.Provider value={wrapped}>
        {(questionnaire.item ?? []).map((q, i) =>
          questionDictionary[q.linkId]?.customization?.component ? (
            <CustomComponentFactory key={i} linkId={q.linkId} />
          ) : (
            <KnownQuestionTypeComponentFactory key={i} linkId={q.linkId} />
          ),
        )}
      </FhirQuestionnaireContext.Provider>
    )
  );
}
