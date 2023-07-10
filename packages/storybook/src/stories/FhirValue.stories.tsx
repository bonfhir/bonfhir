import { FhirValue } from "@bonfhir/ui/r5";
import { Meta, StoryObj } from "@storybook/react";

/**
 * Renders [FHIR data types](https://hl7.org/fhir/datatypes.html) as string using the core formatter.
 */
const meta = {
  title: "FhirValue",
  parameters: {
    docs: {},
  },
  component: FhirValue,
  tags: ["autodocs"],
  argTypes: {
    type: {
      type: "string",
    },
  },
} satisfies Meta<typeof FhirValue>;

export default meta;
type Story = StoryObj<typeof FhirValue>;

/**
 * Render FHIR string
 */
export const String: Story = {
  args: {
    type: "string",
    value: "Hello, world!",
    options: {
      default: "",
      decorator: "",
      truncate: {
        length: undefined,
        separator: undefined,
        suffix: undefined,
      },
    },
  },
};

/**
 * Render FHIR canonical
 */
export const Canonical: Story = {
  args: {
    type: "canonical",
    value: "http://acme.org",
  },
};

/**
 * Render FHIR code
 */
export const Code: Story = {
  args: {
    type: "code",
    value: "female",
    options: {
      default: "",
      decorator: "",
      expansions: [
        {
          code: "female",
          display: "Female",
        },
      ],
    },
  },
};
