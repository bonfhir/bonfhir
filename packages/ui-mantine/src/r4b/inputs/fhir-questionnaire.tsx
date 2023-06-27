import {
  QuestionnaireItem,
  QuestionnaireResponse,
  build,
  canonical,
} from "@bonfhir/core/r4b";
import {
  FhirInput,
  FhirInputProps,
  FhirQueryLoader,
  FhirQuestionnaireRendererProps,
  FhirValue,
  FhirValueProps,
} from "@bonfhir/ui/r4b";
import {
  Button,
  Group,
  Stack,
  StackProps,
  Title,
  TitleProps,
} from "@mantine/core";
import { ReactElement, useMemo } from "react";
import { UseFhirFormReturnType, useFhirForm } from "../hooks/use-fhir-form.js";

export function MantineFhirQuestionnaire(
  props: FhirQuestionnaireRendererProps<MantineFhirQuestionnaireProps>
): ReactElement | null {
  const itemsByLinkId = useMemo(() => {
    if (!props.questionnaireQuery.data) {
      return {};
    }

    function visit(
      item: QuestionnaireItem[]
    ): Record<string, QuestionnaireItem> {
      return item.reduce((acc, item) => {
        acc[item.linkId] = item;
        if (item.item) {
          acc = { ...acc, ...visit(item.item) };
        }
        return acc;
      }, {} as Record<string, QuestionnaireItem>);
    }

    return visit(props.questionnaireQuery.data.item || []);
  }, [props.questionnaireQuery.data]);

  const form = useFhirForm<object, (values: object) => QuestionnaireResponse>({
    initialValues: {},
    transformValues(values) {
      return build("QuestionnaireResponse", {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        questionnaire: canonical(props.questionnaireQuery.data)!,
        status: "completed",
        authored: new Date().toISOString(),
        item: Object.entries(values)
          .map(([linkId, value]) => {
            const originalItem = itemsByLinkId[linkId];
            if (originalItem) {
              return {
                linkId,
                text: originalItem.text,
                answer: [
                  {
                    [`value${originalItem.type[0]?.toUpperCase()}${originalItem.type.slice(
                      1
                    )}`]: value,
                  },
                ],
              };
            }
            return;
          })
          .filter(Boolean) as QuestionnaireResponse["item"],
      });
    },
  });

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
                level={0}
                form={form}
              />
            ))}
            <Group mt="md">
              <Button type="submit">Save</Button>
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
  itemString?: FhirInputProps | null | undefined;
}

function MantineQuestionnaireItemRenderer({
  props,
  item,
  level,
  form,
}: {
  props: FhirQuestionnaireRendererProps<MantineFhirQuestionnaireProps>;
  item: QuestionnaireItem;
  level: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFhirFormReturnType<any, any>;
}): ReactElement | null {
  switch (item.type) {
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
          {(item.item || []).map((item: QuestionnaireItem, index: number) => (
            <MantineQuestionnaireItemRenderer
              key={index}
              props={props}
              item={item}
              level={level + 1}
              form={form}
            />
          ))}
        </Stack>
      );
    }
    case "string": {
      return (
        <FhirInput
          type="string"
          label={item.text}
          required={item.required}
          disabled={item.readOnly}
          {...form.getInputProps(item.linkId)}
          {...props.rendererProps?.itemString}
        />
      );
    }
  }

  return null;
}
