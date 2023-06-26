import {
  Questionnaire,
  QuestionnaireResponse,
  Retrieved,
} from "@bonfhir/core/r4b";
import { useFhirSearchOne } from "@bonfhir/query/r4b";
import { UseQueryResult } from "@tanstack/react-query";
import { ReactElement } from "react";
import { useFhirUIContext } from "../context.js";

export interface FhirQuestionnaireProps<TRendererProps = any> {
  /** Either the Questionnaire URL to use, or the Questionnaire itself. */
  source: string | UseQueryResult<Retrieved<Questionnaire>>;
  fhirClient?: string | null | undefined;
  value?: QuestionnaireResponse | null | undefined;
  onChange?: ((value: QuestionnaireResponse) => void) | null | undefined;
  rendererProps?: TRendererProps;
}

export function FhirQuestionnaire<TRendererProps = any>(
  props: FhirQuestionnaireProps<TRendererProps>
): ReactElement | null {
  const { applyDefaultProps, render } = useFhirUIContext();
  props = applyDefaultProps("FhirQuestionnaire", props);

  const questionnaireQuery = useFhirSearchOne(
    "Questionnaire",
    (search) => search.url(props.source as string).status("active"),
    {
      fhirClient: props.fhirClient,
      query: {
        enabled: typeof props.source === "string",
      },
    }
  );

  return render<FhirQuestionnaireRendererProps>("FhirQuestionnaire", {
    ...props,
    questionnaireQuery:
      typeof props.source === "string" || !props.source
        ? questionnaireQuery
        : props.source,
  });
}

export interface FhirQuestionnaireRendererProps<TRendererProps = any>
  extends FhirQuestionnaireProps<TRendererProps> {
  questionnaireQuery: UseQueryResult<Questionnaire>;
}

export type FhirQuestionnaireRenderer = (
  props: FhirQuestionnaireRendererProps
) => ReactElement | null;