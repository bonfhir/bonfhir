import { MainPage, NavButton, TitleDivider } from "@/components";
import { Address, OrganizationSortOrder } from "@bonfhir/core/r4b";
import { useFhirSearchControllerNext } from "@bonfhir/next/r4b/client";
import { useFhirSearch } from "@bonfhir/query/r4b";
import {
  FhirInput,
  FhirPagination,
  FhirQueryLoader,
  FhirTable,
  FhirValue,
} from "@bonfhir/ui/r4b";
import { Grid, Paper, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export default function Organizations() {
  const searchController = useFhirSearchControllerNext<
    OrganizationSortOrder,
    { name: string | undefined }
  >("search", {
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
    searchController.pageUrl
  );

  return (
    <MainPage title="Organizations">
      <Grid>
        <Grid.Col span="auto">
          <Paper mih="100%">
            <FhirQueryLoader query={organizationsQuery}>
              <FhirTable
                onRowNavigate={(org) => `/organizations/${org.id}`}
                columns={[
                  {
                    key: "name",
                    title: "Name",
                    sortable: true,
                    render: (row) => (
                      <FhirValue type="string" value={row.name} />
                    ),
                  },
                  {
                    key: "address",
                    title: "Address",
                    render: (row) => (
                      <>
                        <FhirValue
                          type="Address"
                          value={row.address as Address[]}
                        />
                        <FhirValue type="Identifier" value={row.identifier} />
                      </>
                    ),
                  },
                ]}
                {...searchController}
                {...organizationsQuery}
              />
              <FhirPagination {...searchController} {...organizationsQuery} />
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
