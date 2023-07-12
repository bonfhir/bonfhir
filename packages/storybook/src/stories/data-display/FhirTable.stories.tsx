import {
  Organization,
  OrganizationSortOrder,
  Retrieved,
} from "@bonfhir/core/r5";
import { useFhirSearch } from "@bonfhir/query/r5";
import { FhirTable, FhirValue, useFhirSearchController } from "@bonfhir/ui/r5";
import { Meta } from "@storybook/react";
import { createElement } from "react";
import { buildArgs } from "../helpers.js";

/**
 * Renders a table of resources
 */
const meta = {
  title: "Data Display/FhirTable",
  component: FhirTable,
  tags: ["autodocs"],
  args: {},
  argTypes: {
    columns: {
      control: "object",
    },
  },
} satisfies Meta<typeof FhirTable>;

export default meta;

export const Default = {
  args: {
    columns: [
      {
        key: "name",
        title: "Name",
        sortable: true,
        render: (row: Retrieved<Organization>) => (
          <FhirValue type="string" value={row.name} />
        ),
      },
      {
        key: "type",
        title: "Type",
        render: (row: Retrieved<Organization>) =>
          row.type?.map((type) => (
            <FhirValue type="CodeableConcept" value={type} />
          )),
      },
    ],
  },
  render: (props: any) =>
    createElement(() => {
      const searchController = useFhirSearchController<
        OrganizationSortOrder,
        { name: string | undefined }
      >({
        pageSize: 20,
        defaultSort: "name",
        defaultSearch: {
          name: undefined,
        },
      });

      const organizationsQuery = useFhirSearch(
        "Organization",
        (search) =>
          search
            .name(searchController.search?.name)
            ._sort(searchController.sort)
            ._count(searchController.pageSize)
            ._total("accurate"),
        searchController.pageUrl,
      );

      return (
        <FhirTable
          onRowNavigate={(org: Retrieved<Organization>) =>
            alert(`Clicked on ${org.name}`)
          }
          {...buildArgs(props)}
          {...searchController}
          {...organizationsQuery}
        />
      );
    }),
};
