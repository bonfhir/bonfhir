/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  QuestionnaireItem,
  QuestionnaireItemAnswerOption,
  QuestionnaireItemType,
  QuestionnaireResponse,
  QuestionnaireResponseItem,
  ValueSetExpansionContains,
  build,
  canonical,
} from "@bonfhir/core/r4b";
import {
  FhirInput,
  FhirInputProps,
  FhirQuestionnaireRendererProps,
  FhirValue,
  FhirValueProps,
} from "@bonfhir/ui/r4b";
import {
  Alert,
  Button,
  ButtonProps,
  Group,
  Loader,
  LoaderProps,
  Stack,
  StackProps,
  Title,
  TitleProps,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { ReactElement, ReactNode, useEffect } from "react";
import { UseFhirFormReturnType, useFhirForm } from "../hooks/use-fhir-form";

export function MantineFhirQuestionnaire(
  props: FhirQuestionnaireRendererProps<MantineFhirQuestionnaireProps>,
): ReactElement | null {
  const form = useFhirForm<object, (values: object) => QuestionnaireResponse>({
    transformValues(values) {
      return build("QuestionnaireResponse", {
        questionnaire: canonical(props.questionnaire)!,
        status: "completed",
        authored: new Date().toISOString(),
        item: buildQuestionnaireResponseItems(
          props.questionnaire!.item || [],
          values,
        ),
      });
    },
  });

  useEffect(() => {
    if (props.isLoading) {
      return;
    }

    if (props.questionnaire) {
      form.setValues(
        buildInitialValues(
          props.questionnaire.item || [],
          "",
          props.questionnaireResponse?.item || [],
        ),
      );
    }
  }, [
    props.isLoading,
    props.questionnaire?.id,
    props.questionnaireResponse?.id,
  ]);

  if (props.isLoading || !props.questionnaire) {
    return (
      <Stack align="center" {...props.rendererProps?.mainStack}>
        <Loader {...props.rendererProps?.loader} />
      </Stack>
    );
  }

  if (props.errors.length > 0) {
    console.error(props.errors);
    return (
      <Stack {...props.rendererProps?.mainStack}>
        {props.errors.map((error, index) => (
          <Alert
            key={index}
            icon={<IconAlertCircle size="1rem" />}
            title="Something went wrong."
            color="red"
          >
            <Stack>{error.message}</Stack>
          </Alert>
        ))}
      </Stack>
    );
  }

  return (
    <form
      onSubmit={form.onSubmit(
        (questionnaireResponse) => props.onSubmit?.(questionnaireResponse),
      )}
    >
      <Stack {...props.rendererProps?.mainStack}>
        {props.questionnaire!.title && (
          <Title order={2} {...props.rendererProps?.title}>
            {props.questionnaire!.title}
          </Title>
        )}
        {(props.questionnaire!.item || []).map((item, index) => (
          <MantineQuestionnaireItemRenderer
            key={index}
            props={props}
            item={item}
            parentPath=""
            form={form}
          />
        ))}
        <Group mt="md">
          <Button type="submit" {...props.rendererProps?.submit}>
            {props.rendererProps?.submitText || "Submit"}
          </Button>
          {props.onCancel && (
            <Button
              variant="outline"
              onClick={props.onCancel}
              {...props.rendererProps?.cancel}
            >
              {props.rendererProps?.cancelText || "Cancel"}
            </Button>
          )}
        </Group>
      </Stack>
    </form>
  );
}

export interface MantineFhirQuestionnaireProps {
  mainStack?: StackProps | null | undefined;
  loader?: LoaderProps | null | undefined;
  title?: TitleProps | null | undefined;
  itemDisplay?: FhirValueProps | null | undefined;
  itemGroupStack?: StackProps | null | undefined;
  itemGroupTitle?: TitleProps | null | undefined;
  itemInput?: FhirInputProps | null | undefined;
  submit?: ButtonProps | null | undefined;
  submitText?: ReactNode | null | undefined;
  cancel?: ButtonProps | null | undefined;
  cancelText?: ReactNode | null | undefined;
}

function MantineQuestionnaireItemRenderer({
  props,
  item,
  parentPath,
  form,
}: {
  props: FhirQuestionnaireRendererProps<MantineFhirQuestionnaireProps>;
  item: QuestionnaireItem;
  parentPath: string;
  form: UseFhirFormReturnType<any, any>;
}): ReactElement | null {
  const level = parentPath.split(".").filter(Boolean).length;
  const additionalPropsAsString = item.extension?.find(
    (x) =>
      x.url ===
      "http://bonfhir.dev/StructureDefinition/fhir-questionnaire-props",
  )?.valueString;
  const additionalProps = additionalPropsAsString
    ? JSON.parse(additionalPropsAsString)
    : {};
  switch (item.type as string) {
    case "display": {
      return (
        <FhirValue
          type="string"
          value={item.text}
          {...props.rendererProps?.itemDisplay}
          {...additionalProps}
        />
      );
    }
    case "group": {
      return (
        <Stack {...props.rendererProps?.itemGroupStack}>
          {item.text && (
            <Title
              order={level + 3 > 6 ? 6 : level + 3}
              {...props.rendererProps?.itemGroupTitle}
              {...additionalProps}
            >
              {item.text}
            </Title>
          )}
          {(item.item || []).map(
            (childItem: QuestionnaireItem, index: number) => (
              <MantineQuestionnaireItemRenderer
                key={index}
                props={props}
                item={childItem}
                parentPath={concatPath(parentPath, item.linkId)}
                form={form}
              />
            ),
          )}
        </Stack>
      );
    }
    case "boolean":
    case "decimal":
    case "integer":
    case "date":
    case "dateTime":
    case "time":
    case "string":
    case "url": {
      return (
        <FhirInput
          type={item.type as any}
          label={item.text}
          required={item.required}
          disabled={item.readOnly}
          {...form.getInputProps(concatPath(parentPath, item.linkId))}
          {...props.rendererProps?.itemInput}
          {...additionalProps}
        />
      );
    }
    case "text": {
      return (
        <FhirInput
          type="string"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          mode="multiline"
          label={item.text}
          required={item.required}
          disabled={item.readOnly}
          {...form.getInputProps(concatPath(parentPath, item.linkId))}
          {...props.rendererProps?.itemInput}
          {...additionalProps}
        />
      );
    }
    case "choice":
    case "coding": {
      return (
        <FhirInput
          type="Coding"
          source={
            item.answerOption?.length
              ? convertAnswerOptions(item.answerOption)
              : item.answerValueSet || []
          }
          label={item.text}
          required={item.required}
          disabled={item.readOnly}
          {...form.getInputProps(concatPath(parentPath, item.linkId))}
          {...props.rendererProps?.itemInput}
          {...additionalProps}
        />
      );
    }
  }

  return null;
}

function concatPath(...paths: string[]): string {
  return paths.filter(Boolean).join(".");
}

function buildQuestionnaireResponseItems(
  item: QuestionnaireItem[],
  values: any,
): QuestionnaireResponseItem[] | undefined {
  const result: QuestionnaireResponseItem[] = [];

  for (const i of item) {
    switch (i.type as QuestionnaireItemType | "choice") {
      case "group": {
        const groupValues = values[i.linkId];
        if (groupValues) {
          const groupQuestionnaireResponseItems =
            buildQuestionnaireResponseItems(i.item || [], groupValues);
          if (groupQuestionnaireResponseItems?.length) {
            result.push({
              linkId: i.linkId,
              text: i.text,
              item: groupQuestionnaireResponseItems,
            });
          }
        }
        break;
      }
      case "question":
      case "display": {
        break;
      }
      case "choice": {
        if (values[i.linkId]) {
          result.push({
            linkId: i.linkId,
            text: i.text,
            answer: [
              {
                valueCoding: values[i.linkId],
              },
            ],
          });
        }
        break;
      }
      default: {
        if (values[i.linkId]) {
          result.push({
            linkId: i.linkId,
            text: i.text,
            answer: [
              {
                [`value${i.type[0]?.toUpperCase()}${i.type.slice(1)}`]:
                  values[i.linkId],
              },
            ],
          });
        }
        break;
      }
    }
  }

  return result.length === 0 ? undefined : result;
}

function buildInitialValues(
  item: QuestionnaireItem[],
  parentPath: string,
  responseItem: QuestionnaireResponseItem[],
): object {
  const result = {} as any;
  for (const i of item) {
    const responseI = responseItem.find(
      (responseI) => responseI.linkId === i.linkId,
    );
    switch (i.type) {
      case "group": {
        result[i.linkId] = buildInitialValues(
          i.item || [],
          concatPath(parentPath, i.linkId),
          responseI?.item || [],
        );
        break;
      }
      default: {
        const initialValue = responseI?.answer ||
          i.initial || [i.answerOption?.find((ao) => ao.initialSelected)];
        result[i.linkId] = Object.entries(initialValue?.[0] || {}).find(
          ([key, value]) => key.startsWith("value") && value,
        )?.[1];
      }
    }
  }
  return result;
}

function convertAnswerOptions(
  answerOption: QuestionnaireItemAnswerOption[],
): ValueSetExpansionContains[] {
  return answerOption
    .map((option) => {
      if (option.valueCoding) {
        return {
          code: option.valueCoding?.code,
          display: option.valueCoding?.display,
        };
      }
      console.warn(
        `Unsupported answerOption value format: ${JSON.stringify(option)}`,
      );
      return;
    })
    .filter(Boolean) as ValueSetExpansionContains[];
}
