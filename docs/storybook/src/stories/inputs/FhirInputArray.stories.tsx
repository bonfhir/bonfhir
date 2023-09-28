import { useFhirForm } from "@bonfhir/mantine/r5";
import { FhirInput, FhirInputArray } from "@bonfhir/react/r5";
import { Box, Button, Group, Stack } from "@mantine/core";
import { Meta } from "@storybook/react";
import { buildArgs } from "../helpers";

/**
 * Renders FHIR arrays as inputs, allowing management or repeatition.
 */
const meta = {
  title: "Inputs/FhirInputArray",
  component: FhirInputArray,
  tags: ["autodocs"],
  args: {
    label: "Array Label",
  },
  argTypes: {
    label: {
      control: "text",
      description: "The label to display above the input.",
    },
    description: {
      control: "text",
      description: "A description for the input.",
    },
    error: {
      control: "text",
      description: "An error message to display below the input.",
    },
    required: {
      control: "boolean",
      description: "Indicate that the input is required",
    },
    min: {
      control: "Boolean",
    },
    max: {
      control: "Boolean",
    },
  },
} satisfies Meta<typeof FhirInputArray>;

export default meta;

export const Default = {
  args: {
    min: 1,
  },
  render: (props: any) => {
    const form = useFhirForm();
    return (
      <form
        onSubmit={form.onSubmit((values) => {
          const value = JSON.stringify(values.value, undefined, 2);
          alert(value);
          console.log("value", value);
        })}
      >
        <Stack>
          <Box maw={800}>
            <FhirInputArray
              {...buildArgs(props)}
              {...form.getArrayInputProps("value", { newValue: "" })}
            >
              {({ index }) => (
                <FhirInput
                  type="string"
                  {...form.getInputProps(`value.${index}`)}
                />
              )}
            </FhirInputArray>
          </Box>
          <Group mt="md">
            <Button type="submit" compact variant="outline">
              Submit
            </Button>
            <Button
              compact
              variant="outline"
              color="red"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          </Group>
        </Stack>
      </form>
    );
  },
};
