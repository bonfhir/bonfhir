/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  QuestionnaireItem,
  QuestionnaireResponse,
  QuestionnaireResponseItem,
  build,
  canonical,
} from "@bonfhir/core/r5";
import {
  FhirInput,
  FhirInputProps,
  FhirQueryLoader,
  FhirQuestionnaireRendererProps,
  FhirValue,
  FhirValueProps,
} from "@bonfhir/ui/r5";
import {
  Button,
  Group,
  Stack,
  StackProps,
  Title,
  TitleProps,
} from "@mantine/core";
import { ReactElement, useEffect } from "react";
import { UseFhirFormReturnType, useFhirForm } from "../hooks/use-fhir-form.js";

export function MantineFhirQuestionnaire(
  props: FhirQuestionnaireRendererProps<MantineFhirQuestionnaireProps>
): ReactElement | null {
  const form = useFhirForm<object, (values: object) => QuestionnaireResponse>({
    transformValues(values) {
      return build("QuestionnaireResponse", {
        questionnaire: canonical(props.questionnaireQuery.data)!,
        status: "completed",
        authored: new Date().toISOString(),
        item: buildQuestionnaireResponseItems(
          props.questionnaireQuery.data?.item || [],
          values
        ),
      });
    },
  });

  useEffect(() => {
    if (props.questionnaireQuery.data && JSON.stringify(form.values) === "{}") {
      form.setValues(buildValues(props.questionnaireQuery.data.item || [], ""));
    }
  }, [props.questionnaireQuery.data]);

  return (
    <FhirQueryLoader query={props.questionnaireQuery}>
      {(questionnaire) => (
        <form
          onSubmit={form.onSubmit((questionnaireResponse) =>
            props.onSubmit?.(questionnaireResponse)
          )}
        >
          <Stack {...props.rendererProps?.mainStack}>
            {questionnaire.title && (
              <Title order={2} {...props.rendererProps?.title}>
                {questionnaire.title}
              </Title>
            )}
            {(questionnaire.item || []).map((item, index) => (
              <MantineQuestionnaireItemRenderer
                key={index}
                props={props}
                item={item}
                parentPath=""
                form={form}
              />
            ))}
            <Group mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </Stack>
        </form>
      )}
    </FhirQueryLoader>
  );
}

export interface MantineFhirQuestionnaireProps {
  mainStack?: StackProps | null | undefined;
  title?: TitleProps | null | undefined;
  itemDisplay?: FhirValueProps | null | undefined;
  itemGroupStack?: StackProps | null | undefined;
  itemGroupTitle?: TitleProps | null | undefined;
  itemInput?: FhirInputProps | null | undefined;
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
  switch (item.type as string) {
    case "display": {
      return (
        <FhirValue
          type="string"
          value={item.text}
          {...props.rendererProps?.itemDisplay}
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
            )
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
        />
      );
    }
    case "choice":
    case "coding": {
      return (
        <FhirInput
          type="Coding"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          source={item.answerValueSet!}
          label={item.text}
          required={item.required}
          disabled={item.readOnly}
          {...form.getInputProps(concatPath(parentPath, item.linkId))}
          {...props.rendererProps?.itemInput}
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
  values: any
): QuestionnaireResponseItem[] | undefined {
  const result: QuestionnaireResponseItem[] = [];

  for (const i of item) {
    switch (i.type) {
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

function buildValues(item: QuestionnaireItem[], parentPath: string): object {
  const result = {} as any;
  for (const i of item) {
    switch (i.type) {
      case "group": {
        result[i.linkId] = buildValues(
          i.item || [],
          concatPath(parentPath, i.linkId)
        );
        break;
      }
      default: {
        result[i.linkId] = Object.entries(i.initial?.[0] || {}).find(
          ([key, value]) => key.startsWith("value") && value
        )?.[1];
      }
    }
  }
  return result;
}
