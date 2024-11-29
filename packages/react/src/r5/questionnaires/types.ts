import { QuestionnaireItem, QuestionnaireResponseItem } from "@bonfhir/core/r5";

// this may look extremely silly, but it's actually super useful to remember _what_ property is being represented by this string.
export type LinkId = string;

export type QuestionnaireValidationBehavior =
  | "onSubmit"
  | "onChanged"
  | "never";

export type QuestionnaireResponseItemWithErrors = {
  errors?: string[];
  item?: Array<QuestionnaireResponseItemWithErrors> | undefined;
} & QuestionnaireResponseItem;

export type QuestionnaireItemCustomization = {
  component?: React.ReactNode | undefined; // TODO: add support for context as a func type
  validateWith?: (
    responseItems: QuestionnaireResponseItem[],
  ) => Promise<QuestionnaireResponseItemWithErrors[]>;
};

export type QuestionnaireItemWithCustomization = {
  customization?: QuestionnaireItemCustomization;
} & QuestionnaireItem;
