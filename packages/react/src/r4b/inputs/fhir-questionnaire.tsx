import {
  Questionnaire,
  QuestionnaireResponse,
  Retrieved,
  asError,
  isResource,
} from "@bonfhir/core/r4b";
import { useFhirSearchOne } from "@bonfhir/query/r4b";
import { UseQueryResult } from "@tanstack/react-query";
import { ReactElement } from "react";
import { useFhirUIContext } from "../context";

export interface FhirQuestionnaireProps<TRendererProps = any> {
  /** Either the Questionnaire URL to use, or the Questionnaire itself. */
  source:
    | string
    | UseQueryResult<Retrieved<Questionnaire>>
    | Questionnaire
    | null
    | undefined;
  fhirClient?: string | null | undefined;
  initialValues?:
    | QuestionnaireResponse
    | UseQueryResult<Retrieved<QuestionnaireResponse>>
    | null
    | undefined;
  onSubmit?: ((value: QuestionnaireResponse) => void) | null | undefined;
  onCancel?: (() => void) | null | undefined;
  /**
   * Invoked on every response change in the form.
   * If the function returns a value, it will be used as the new response and the form should update.
   * Be careful to check for infinite loops when using this function.
   */
  onResponseChange?: (
    response: QuestionnaireResponse,
  ) => QuestionnaireResponse | void | undefined;
  className?: string | undefined;
  style?: Record<string, any> | undefined;
  rendererProps?: TRendererProps;
}

export function FhirQuestionnaire<TRendererProps = any>(
  props: FhirQuestionnaireProps<TRendererProps>,
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
    },
  );

  const questionnaire =
    typeof props.source === "string"
      ? questionnaireQuery.data
      : isResource("Questionnaire", props.source)
        ? props.source
        : props.source?.data;
  const questionnaireResponse = props.initialValues
    ? isResource("QuestionnaireResponse", props.initialValues)
      ? props.initialValues
      : props.initialValues.data
    : undefined;
  const isLoading = Boolean(
    !questionnaire || (props.initialValues && !questionnaireResponse),
  );

  const errors = [
    questionnaireQuery.error ? asError(questionnaireQuery.error) : undefined,
    (props.initialValues as any)?.error
      ? asError((props.initialValues as any).error)
      : undefined,
  ].filter(Boolean);

  return render<FhirQuestionnaireRendererProps>("FhirQuestionnaire", {
    ...props,
    questionnaire,
    questionnaireResponse,
    isLoading,
    errors,
  } as any);
}

export type FhirQuestionnaireRendererProps<TRendererProps = any> =
  FhirQuestionnaireProps<TRendererProps> &
    (
      | {
          questionnaire: Questionnaire | undefined;
          questionnaireResponse: undefined;
          isLoading: true;
          errors: Array<Error>;
        }
      | {
          questionnaire: Questionnaire;
          questionnaireResponse: QuestionnaireResponse | undefined;
          isLoading: false;
          errors: Array<Error>;
        }
    );

export type FhirQuestionnaireRenderer = (
  props: FhirQuestionnaireRendererProps,
) => ReactElement | null;
