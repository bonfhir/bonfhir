/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuestionnaireResponse, SpecialExtension } from "@bonfhir/core/r4b";

/**
 * https://www.hl7.org/fhir/us/core/StructureDefinition-us-core-extension-questionnaire-uri.html
 */
export const US_CORE_QUESTIONNAIRE_URI_URL =
  "http://hl7.org/fhir/us/core/StructureDefinition/us-core-extension-questionnaire-uri";

/**
 * https://hl7.org/fhir/us/core/StructureDefinition-us-core-race.html
 */
export function usCoreQuestionnaireResponseQuestionnaireUri():
  | string
  | undefined {
  return {
    __isSpecialExtension: true,
    __get(target: QuestionnaireResponse): string | undefined {
      const extensionValue = (target._questionnaire?.extension || []).find(
        (x) => (x as any).url === US_CORE_QUESTIONNAIRE_URI_URL,
      );

      return extensionValue?.valueUri;
    },
    __set(
      target: QuestionnaireResponse,
      value: string | undefined,
    ): string | undefined {
      if (!value) {
        if (!target._questionnaire) {
          return;
        }

        target._questionnaire.extension =
          target._questionnaire?.extension?.filter(
            (x) => x.url !== US_CORE_QUESTIONNAIRE_URI_URL,
          );

        if (target._questionnaire.extension?.length === 0) {
          target._questionnaire.extension = undefined;

          if (JSON.stringify(target._questionnaire) === "{}") {
            target._questionnaire = undefined;
          }
        }
        return;
      }

      const newExtensionValue = {
        url: US_CORE_QUESTIONNAIRE_URI_URL,
        valueUri: value,
      };

      if (!target._questionnaire) {
        target._questionnaire = {};
      }

      target._questionnaire.extension = [
        ...(target._questionnaire.extension?.filter(
          (x) => x.url !== US_CORE_QUESTIONNAIRE_URI_URL,
        ) || []),
        newExtensionValue,
      ];

      return value;
    },
  } satisfies SpecialExtension as any;
}

export function usCoreQuestionnaireResponse() {
  return {
    questionnaireUri: usCoreQuestionnaireResponseQuestionnaireUri(),
  };
}
