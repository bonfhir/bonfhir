import { FhirError } from "@bonfhir/ui/r5";
import { Meta } from "@storybook/react";
import { buildArgs } from "../helpers.js";

/**
 * Renders an error permanently on screen
 */
const meta = {
  title: "Feedback/FhirError",
  component: FhirError,
  tags: ["autodocs"],
  args: {
    onRetry: true as any,
  },
  argTypes: {
    error: {
      control: "text",
      description: "Can either be a string or an Error object.",
    },
    onRetry: {
      control: "boolean",
      description: "This should be a function invoked when retrying.",
    },
    "rendererProps.titleText": {
      control: "text",
    },
    "rendererProps.alert.variant": {
      control: "select",
      options: ["filled", "outline", "light", undefined],
    },
  } as any,
  render(props: any) {
    return (
      <FhirError
        {...buildArgs(props)}
        onRetry={props.onRetry ? () => alert("Retrying...") : undefined}
      />
    );
  },
} satisfies Meta<typeof FhirError>;

export default meta;

export const Default = {
  args: {
    error: "This is an error message.",
  },
};
