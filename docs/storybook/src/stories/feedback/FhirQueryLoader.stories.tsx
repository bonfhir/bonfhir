import { FhirQueryLoader } from "@bonfhir/react/r5";
import { Meta, StoryObj } from "@storybook/react";
import { buildArgs } from "../helpers";

/**
 * Renders a loading/error/loaded state for a FHIR query.
 *
 * See https://bonfhir.dev/packages/react/components/fhir-query-loader for more information.
 */
const meta = {
  title: "Feedback/FhirQueryLoader",
  component: FhirQueryLoader,
  tags: ["autodocs"],
  args: {},
  argTypes: {
    allowRetry: {
      control: "boolean",
    },
  } as any,
  render(props: any) {
    return (
      <FhirQueryLoader {...buildArgs(props)}>
        This is the loader content, displayed once loaded.
      </FhirQueryLoader>
    );
  },
} satisfies Meta<typeof FhirQueryLoader>;

export default meta;

type Story = StoryObj<typeof FhirQueryLoader>;

export const Default: Story = {
  args: {
    query: {
      isLoading: false,
      isError: false,
    } as any,
  },
};

export const Loading: Story = {
  args: {
    query: {
      isLoading: true,
      isError: false,
    } as any,
  },
};

export const OnError: Story = {
  args: {
    query: {
      isLoading: false,
      isError: true,
      error: new Error("Query error messages"),
      refetch: () => {
        alert("Refetching!");
      },
    } as any,
  },
};
