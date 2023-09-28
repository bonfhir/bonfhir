import {
  Organization,
  OrganizationSortOrder,
  Retrieved,
} from "@bonfhir/core/r5";
import { useFhirSearch } from "@bonfhir/query/r5";
import {
  FhirPagination,
  FhirTable,
  FhirValue,
  useFhirSearchController,
} from "@bonfhir/react/r5";
import { Stack } from "@mantine/core";
import { Meta } from "@storybook/react";
import { createElement } from "react";
import { buildArgs } from "../helpers";

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
        key: "_lastUpdated",
        title: "Last Updated",
        sortable: true,
        render: (row: Retrieved<Organization>) => (
          <FhirValue type="instant" value={row.meta.lastUpdated} />
        ),
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

export const WithPagination = {
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
        key: "_lastUpdated",
        title: "Last Updated",
        sortable: true,
        render: (row: Retrieved<Organization>) => (
          <FhirValue type="instant" value={row.meta.lastUpdated} />
        ),
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
        <Stack>
          <FhirTable
            onRowNavigate={(org: Retrieved<Organization>) =>
              alert(`Clicked on ${org.name}`)
            }
            {...buildArgs(props)}
            {...searchController}
            {...organizationsQuery}
          />
          <FhirPagination {...organizationsQuery} {...searchController} />
        </Stack>
      );
    }),
};
