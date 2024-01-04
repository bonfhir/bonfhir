"use client";
import { Address, OrganizationSortOrder } from "@bonfhir/core/r4b";
import { useFhirSearchController } from "@bonfhir/next/r4b/client";
import { useFhirGraphQL } from "@bonfhir/query/r4b";
import { FhirTable, FhirValue } from "@bonfhir/react/r4b";
import { Paper, Stack, Title } from "@mantine/core";
import { ListOrganizationsDocument } from "./organizations.generated";

export default function Organizations() {
  const searchController = useFhirSearchController<
    OrganizationSortOrder,
    { name: string | undefined }
  >("search", {
    pageSize: 10,
    defaultSort: "name",
    defaultSearch: {
      name: undefined,
    },
  });

  const organizationsQuery = useFhirGraphQL(ListOrganizationsDocument, {
    name: searchController.search?.name,
    _count: searchController.pageSize,
    _sort: searchController.sort,
  });

  return (
    <Paper>
      <Stack>
        <Title order={3}>Organizations</Title>
        <FhirTable
          data={organizationsQuery.data?.OrganizationList}
          {...searchController}
          columns={[
            {
              key: "name",
              title: "Name",
              sortable: true,
              render: (org) => <FhirValue type="string" value={org?.name} />,
            },
            {
              key: "address",
              title: "Address",
              render: (org) => (
                <FhirValue type="Address" value={org?.address as Address} />
              ),
            },
          ]}
        />
      </Stack>
    </Paper>
  );
}
