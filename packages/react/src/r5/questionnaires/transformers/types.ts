import {
  LinkId,
  QuestionnaireItemWithCustomization,
  QuestionnaireResponseItemWithErrors,
} from "../types";

export type QuestionnaireResponseDictionary = {
  [key: LinkId]: QuestionnaireResponseItemWithErrors[];
};

export type QuestionnaireItemDictionary = {
  [key: LinkId]: QuestionnaireItemWithCustomization; // hmm...
};
