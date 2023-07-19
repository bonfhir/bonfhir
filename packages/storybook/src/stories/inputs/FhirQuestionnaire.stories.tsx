import { FhirQuestionnaire } from "@bonfhir/ui/r5";
import { Meta, StoryObj } from "@storybook/react";
import { buildArgs } from "../helpers";

/**
 * Renders a paginator for a Bundle
 */
const meta = {
  title: "Inputs/FhirQuestionnaire",
  component: FhirQuestionnaire,
  tags: ["autodocs"],
  argTypes: {
    source: {
      control: "object",
      description:
        "Either the Questionnaire URL to use, or the Questionnaire itself.",
    },
    initialValues: {
      control: "object",
      description:
        "A QuestionnaireResponse to use as the initial values for the form.",
    },
    onCancel: {
      control: "boolean",
      description: "Callback to allow cancelling.",
    },
  },
  render(props) {
    console.log({ props });
    return (
      <FhirQuestionnaire
        {...buildArgs(props)}
        onSubmit={(value) => {
          const valueAsJSON = JSON.stringify(value, undefined, 2);
          alert(valueAsJSON);
          console.log("value", valueAsJSON);
        }}
      />
    );
  },
} satisfies Meta<typeof FhirQuestionnaire>;

export default meta;

type Story = StoryObj<typeof FhirQuestionnaire>;

export const Default: Story = {
  args: {
    source: "http://acme.org/sample-questionnaire",
  },
};
