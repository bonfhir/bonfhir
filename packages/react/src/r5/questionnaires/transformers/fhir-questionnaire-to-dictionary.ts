import {
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireResponseItem,
} from "@bonfhir/core/r5";
import { QuestionItemCustomization } from "../customization";
import { QuestionnaireItemCustomization } from "../types";
import {
  QuestionnaireItemDictionary,
  QuestionnaireResponseDictionary,
} from "./types";

// todo: tests
export class FhirQuestionnaireResponseItemToDictionaryTransformer {
  private readonly _responses: QuestionnaireResponseItem[];
  private readonly _questionnaire: Questionnaire;
  constructor(
    questionnaire: Questionnaire,
    responses: QuestionnaireResponseItem[],
  ) {
    this._questionnaire = questionnaire;
    this._responses = responses;
  }

  toResponseLinkIdDictionary(): QuestionnaireResponseDictionary {
    const dict: QuestionnaireResponseDictionary = {};
    for (const r of this._responses) {
      const questionLinkId = r.linkId;
      const withErrors = { ...r, errors: [] };

      const maybeItem = dict[questionLinkId] ?? [];
      maybeItem.push(withErrors);

      dict[questionLinkId] = maybeItem;
    }

    return dict;
  }

  /**
   * **WARNING** this method is recursive
   * @returns a flatten representation of questions
   */
  toQuestionLinkIdDictionary(customizations: {
    customOnLinkIds: QuestionItemCustomization[];
    customOnType: QuestionItemCustomization[];
  }): QuestionnaireItemDictionary {
    const dict: QuestionnaireItemDictionary = {};

    const loopOnItem = (node: QuestionnaireItem) => {
      if (dict[node.linkId]) {
        throw new Error(
          "this link Id should be unique per questionnaire, this is weird",
        ); // todo, do we want to die here?
      }
      let customization: QuestionnaireItemCustomization | undefined;

      const maybeCustomizationOnLInkId = customizations.customOnLinkIds.find(
        (custom) => custom.props.whenLinkIdIs === node.linkId,
      );
      if (maybeCustomizationOnLInkId) {
        customization = {
          component: maybeCustomizationOnLInkId.props.children,
          validateWith: maybeCustomizationOnLInkId.props.validateWith,
        };
      }

      // if I dont have a customization on link id, maybe by type?
      if (!customization) {
        const maybeCustomizationOnType = customizations.customOnType.find(
          (custom) => custom.props.whenItemTypeIs === node.type,
        );

        if (maybeCustomizationOnType) {
          customization = {
            component: maybeCustomizationOnType.props.children,
            validateWith: maybeCustomizationOnType.props.validateWith,
          };
        }
      }

      dict[node.linkId] = {
        ...node,
        customization,
      };

      for (const q of node.item ?? []) {
        loopOnItem(q);
      }
    };

    for (const q of this._questionnaire.item ?? []) {
      loopOnItem(q);
    }

    return dict;
  }
}
