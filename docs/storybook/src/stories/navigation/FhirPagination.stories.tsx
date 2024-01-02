import { FhirPagination } from "@bonfhir/react/r5";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

/**
 * Renders a paginator for a Bundle
 *
 * See https://bonfhir.dev/packages/react/components/fhir-pagination for more information.
 */
const meta = {
  title: "Navigation/FhirPagination",
  component: FhirPagination,
  tags: ["autodocs"],
  argTypes: {
    textTemplate: {
      control: "text",
      description:
        'The text to display. Defaults to "{{pageFirstEntry}}-{{pageLastEntry}} of {{total}}". Available tokens: pageNumber pageSize, total, pageFirstEntry, pageLastEntry, totalPages',
    },
  },
} satisfies Meta<typeof FhirPagination>;

export default meta;

type Story = StoryObj<typeof FhirPagination>;

export const Default: Story = {
  args: {
    pageSize: 20,
    pageNumber: 1,
    total: 120,
  },
  render(props) {
    const [pageNumber, setPageNumber] = useState(props.pageNumber);
    return (
      <FhirPagination
        {...props}
        pageNumber={pageNumber}
        onPageChange={(_, number) => setPageNumber(number)}
      />
    );
  },
};
