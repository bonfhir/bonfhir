import { MainPage, NavButton, TitleDivider } from "@/components";
import { ListOrganizationsDocument } from "@/components/graphql/organizations.generated";
import { Address, Identifier, OrganizationSortOrder } from "@bonfhir/core/r4b";
import { useFhirSearchControllerNext } from "@bonfhir/next/r4b/client";
import { useFhirGraphQL } from "@bonfhir/query/r4b";
import {
  FhirInput,
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
    defaultSearch: {
      name: undefined,
    },
  });

  const organizationsQuery = useFhirGraphQL(ListOrganizationsDocument, {
    name: searchController.search?.name,
  });

  return (
    <MainPage title="Organizations">
      <Grid>
        <Grid.Col span="auto">
          <Paper mih="100%">
            <FhirQueryLoader query={organizationsQuery}>
              {({ OrganizationList }) => (
                <FhirTable
                  data={OrganizationList || []}
                  onRowNavigate={(org) => `/organizations/${org!.id}`}
                  columns={[
                    {
                      key: "name",
                      title: "Name",
                      sortable: true,
                      render: (row) => (
                        <FhirValue type="string" value={row!.name} />
                      ),
                    },
                    {
                      key: "address",
                      title: "Address",
                      render: (row) => (
                        <>
                          <FhirValue
                            type="Address"
                            value={row!.address as Address[]}
                          />
                          <FhirValue
                            type="Identifier"
                            value={row!.identifier as Identifier[]}
                          />
                        </>
                      ),
                    },
                  ]}
                  {...searchController}
                />
              )}
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
