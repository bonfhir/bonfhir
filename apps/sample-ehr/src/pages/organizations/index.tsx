import { MainPage, NavButton, TitleDivider } from "@/components";
import { ListOrganizationsDocument } from "@/components/graphql/organizations.generated";
import { Address, asBundlePagination, compareBy } from "@bonfhir/core/r4b";
import { useFhirSearchControllerNext } from "@bonfhir/next/r4b/client";
import { useFhirGraphQL } from "@bonfhir/query/r4b";
import {
  FhirInput,
  FhirPagination,
  FhirQueryLoader,
  FhirTable,
  useFhirUIContext,
} from "@bonfhir/react/r4b";
import { Grid, Paper, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export default function Organizations() {
  const { formatter } = useFhirUIContext();
  const searchController = useFhirSearchControllerNext<
    "name" | "address",
    { name: string | undefined }
  >("search", {
    defaultSearch: {
      name: undefined,
    },
  });

  const organizationsQuery = useFhirGraphQL(ListOrganizationsDocument, {
    name: searchController.search?.name,
  });

  const paginatedOrgTable = asBundlePagination({
    data: organizationsQuery.data?.OrganizationList?.map((org) => ({
      id: org?.id,
      name: org?.name,
      address: formatter.format("Address", org?.address as Address[]),
    })).sort(compareBy(searchController.sort)),
    pageSize: searchController.pageSize,
    pageUrl: searchController.pageUrl,
  });

  return (
    <MainPage title="Organizations">
      <Grid>
        <Grid.Col span="auto">
          <Paper mih="100%">
            <FhirQueryLoader query={organizationsQuery}>
              <FhirTable
                data={paginatedOrgTable.data || []}
                onRowNavigate={(org) => `/organizations/${org!.id}`}
                columns={[
                  {
                    key: "name",
                    title: "Name",
                    sortable: true,
                    render: (row) => row!.name,
                  },
                  {
                    key: "address",
                    title: "Address",
                    sortable: true,
                    render: (row) => row!.address,
                  },
                ]}
                {...searchController}
              />
              <FhirPagination {...searchController} data={paginatedOrgTable} />
            </FhirQueryLoader>
          </Paper>
        </Grid.Col>
        <Grid.Col span="content">
          <Paper mih="100%">
            <Stack>
              <NavButton
                leftIcon={<IconPlus size="1rem" />}
                target="/organizations/new/edit"
              >
                New organization
              </NavButton>
              <TitleDivider title="Quick Filters" />
              <FhirInput
                type="string"
                label="Organization Name"
                {...searchController.getInputProps("name")}
              />
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </MainPage>
  );
}
