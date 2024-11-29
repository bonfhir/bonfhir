import {
  QuestionnaireItemType,
  QuestionnaireResponseItem,
} from "@bonfhir/core/r5";
import React, { PropsWithChildren } from "react";
import { LinkId, QuestionnaireResponseItemWithErrors } from "./types";

export type QuestionItemCustomizationProps = PropsWithChildren<{
  whenLinkIdIs?: LinkId;
  whenItemTypeIs?: QuestionnaireItemType;
  validateWith?: (
    responseItems: QuestionnaireResponseItem[],
  ) => Promise<QuestionnaireResponseItemWithErrors[]>; // todo: async validation?
}>;

//TODO
export class QuestionItemCustomization extends React.Component<QuestionItemCustomizationProps> {
  render(): React.ReactNode {
    return <></>;
  }
}

// so the idea is to get somehting liiiike:
/* 
  <FhirQuestionnaireProvider questionnaire={q} validateWhen={'onSubmit'}>
  <QuestionItemCustomization
    whenLinkIdIs={"2376t2367t23gyhfd"}
    validateWith={() => false}
  >
    <strong>yolo!</strong>
  </QuestionItemCustomization>
  <QuestionItemCustomization whenItemTypeIs={"bob"}>
    <strong>roger!</strong>
  </QuestionItemCustomization>
</FhirQuestionnaireProvider>;


and when you are  in a FhirQuestionaireItem factory component:

const yourQuestion = useFhirQuestion("2376t2367t23gyhfd");

where you have responses, customization, callbacks, etc...
*/
