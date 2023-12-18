import { Formatter, build } from "@bonfhir/core/r5";
import { FhirFormatter } from "@bonfhir/react/r5";
import { Meta } from "@storybook/react";

/**
 * Allows complex message formatting using the `Formatter.message` builder.
 *
 * As opposed to the `FhirValue` component, returns a ReactNode instead of a `Text`.
 */
const meta = {
  title: "Data Display/FhirFormatter",
  component: FhirFormatter,
  tags: ["autodocs"],
  argTypes: {
    format: {
      type: "function",
      description: "A function that takes the formatter and return a ReactNode",
    },
  },
} satisfies Meta<typeof FhirFormatter>;

export default meta;

const patient = build("Patient", {
  name: [
    {
      given: ["John"],
      family: "Doe",
    },
  ],
  active: true,
});

export const Default = {
  args: {
    format: (f: Formatter) =>
      f.message`Name: ${["HumanName", patient.name]}${[
        "boolean",
        patient.active,
        { decorator: ", Active: {}" },
      ]}`,
  },
};
