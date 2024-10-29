import { useFhirForm } from "@bonfhir/mantine/r5";
import { FhirInputResourceSelector } from "@bonfhir/react/r5";
import { Box, Button, Group, Stack } from "@mantine/core";
import { Meta } from "@storybook/react";
import { buildArgs } from "../helpers";

/**
 * Renders a selector for a resource from multiple resource types.
 *
 * See https://bonfhir.dev/packages/react/components/fhir-input-resoure-selector for more information.
 */
const meta = {
  title: "Inputs/FhirInputResourceSelector",
  component: FhirInputResourceSelector,
  tags: ["autodocs"],
  args: {
    label: "Select a resource",
    resourceTypes: ["Patient", "Practitioner", "Organization"],
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
    type: {
      control: "select",
      description: "Render a Resource or Reference FhirInput",
      options: ["Resource", "Reference"],
    },
    resourceTypes: {
      control: "array",
      description: "Optional array of resource types to allow",
    },
    resourceTypeConfig: {
      control: "Object",
      description: "Search and display functions for each resource type",
    },
    onChangeResourceType: {
      control: "Callback when a resource type is selected",
    },
  },
} satisfies Meta<typeof FhirInputResourceSelector>;

export default meta;

export const Default = {
  args: {
    type: "Resource",
    resourceTypes: ["Patient", "Organization"],
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
            <FhirInputResourceSelector
              {...buildArgs(props)}
              {...form.getInputProps("value")}
            />
          </Box>
          <Group mt="md">
            <Button type="submit" variant="outline">
              Submit
            </Button>
            <Button variant="outline" color="red" onClick={() => form.reset()}>
              Reset
            </Button>
          </Group>
        </Stack>
      </form>
    );
  },
};
