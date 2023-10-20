/* eslint-disable unicorn/no-useless-undefined */
import {
  IndicatorCard,
  MainPage,
  NavButton,
  QuickFilter,
  TitleDivider,
} from "@/components";
import { CustomPatient } from "@/fhir/patient";
import { BundleNavigator, PatientSortOrder } from "@bonfhir/core/r4b";
import {
  MantineFhirInputDateProps,
  MantineFhirTableProps,
  MantineFhirValueProps,
} from "@bonfhir/mantine/r4b";
import { useFhirSearchControllerNext } from "@bonfhir/next/r4b/client";
import { useFhirSearch } from "@bonfhir/query/r4b";
import {
  FhirInput,
  FhirPagination,
  FhirQueryLoader,
  FhirTable,
  FhirValue,
} from "@bonfhir/react/r4b";
import { Drawer, Grid, Paper, SimpleGrid, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { PropsWithChildren, ReactElement, useState } from "react";

export default function Patients() {
  return (
    <MainPage title="Patients">
      <Stack>
        <Indicators />
        <PatientsList />
      </Stack>
    </MainPage>
  );
}

function Indicators(): ReactElement {
  const [drawerContent, setDrawerContent] = useState<
    PageDrawerContent | undefined
  >();

  return (
    <>
      <Paper>
        <Grid>
          <Grid.Col span="auto">
            <Stack>
              <TitleDivider
                title="Hospital Encounters"
                secondaryText="Last updated: March 22, 2022 at 10:10 AM"
              />
              <SimpleGrid cols={2}>
                <IndicatorCard
                  title="Currently in ER"
                  value={3}
                  onClick={() => {
                    setDrawerContent({
                      title: "Currently in ER",
                    });
                  }}
                />
                <IndicatorCard
                  title="Inpatient"
                  value={5}
                  onClick={() => {
                    setDrawerContent({
                      title: "Inpatient",
                    });
                  }}
                />
                <IndicatorCard
                  title="Discharged"
                  value={5}
                  onClick={() => {
                    setDrawerContent({
                      title: "Discharged",
                    });
                  }}
                />
                <IndicatorCard
                  title="Post-Discharge"
                  value={8}
                  onClick={() => {
                    setDrawerContent({
                      title: "Post-Discharge",
                    });
                  }}
                />
              </SimpleGrid>
            </Stack>
          </Grid.Col>
          <Grid.Col span="content">
            <Stack>
              <TitleDivider title="Upcoming Appointments" />
              <SimpleGrid cols={2}>
                <IndicatorCard
                  title="Today"
                  value={20}
                  size="secondary"
                  onClick={() => {
                    setDrawerContent({
                      title: "Today",
                    });
                  }}
                />
                <IndicatorCard
                  title="Tomorrow"
                  value={16}
                  size="secondary"
                  onClick={() => {
                    setDrawerContent({
                      title: "Tomorrow",
                    });
                  }}
                />
              </SimpleGrid>
              <TitleDivider title="Patients Risk Stratification" />
              <SimpleGrid cols={3}>
                <IndicatorCard
                  title="High Risk"
                  value={200}
                  size="secondary"
                  kind="high"
                />
                <IndicatorCard
                  title="Medium Risk"
                  value={400}
                  size="secondary"
                  kind="medium"
                />
                <IndicatorCard
                  title="Low Risk"
                  value={1200}
                  size="secondary"
                  kind="low"
                />
              </SimpleGrid>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
      <PageDrawer
        content={drawerContent}
        onClose={() => {
          setDrawerContent(undefined);
        }}
      />
    </>
  );
}

function PatientsList(): ReactElement {
  const searchController = useFhirSearchControllerNext<
    PatientSortOrder,
    { name: string | undefined; birthDate: string | undefined }
  >("search", {
    pageSize: 5,
    defaultSearch: {
      name: undefined,
      birthDate: undefined,
    },
  });

  const patientsQuery = useFhirSearch(
    CustomPatient,
    (search) =>
      search
        .name(searchController.search?.name)
        .birthdate(searchController.search?.birthDate)
        ._sort(searchController.sort)
        ._count(searchController.pageSize)
        ._include("Patient", "organization")
        ._total("accurate"),
    searchController.pageUrl,
  );

  return (
    <Grid>
      <Grid.Col span="auto">
        <Paper mih="100%">
          <FhirQueryLoader query={patientsQuery}>
            <FhirTable<BundleNavigator<CustomPatient>, MantineFhirTableProps>
              {...searchController}
              {...patientsQuery}
              onRowNavigate={(patient) => `/patients/${patient.id}`}
              rendererProps={{
                table: {
                  mih: "100%",
                },
                td(column) {
                  switch (column.key) {
                    case "name": {
                      return {};
                    }
                  }
                  return { style: { width: 200 } };
                },
              }}
              columns={[
                {
                  key: "organization",
                  title: "Clinic",
                  render: (row) => (
                    <FhirValue<MantineFhirValueProps>
                      type="string"
                      value={row.organization()?.name}
                      options={{ default: "Unassigned" }}
                      rendererProps={{
                        text: {
                          c: row.organization() ? undefined : "dimmed",
                        },
                      }}
                    />
                  ),
                },
                {
                  key: "name",
                  title: "Name",
                  sortable: true,
                  render: (row) => (
                    <FhirValue
                      type="HumanName"
                      value={row.name}
                      options={{ max: 1 }}
                    />
                  ),
                },
                {
                  key: "birthdate",
                  title: "Birth Date",
                  sortable: true,
                  render: (row) => (
                    <FhirValue
                      type="date"
                      value={row.birthDate}
                      options={{
                        dateStyle: "medium",
                      }}
                    />
                  ),
                },
                {
                  key: "ssn",
                  title: "SSN",
                  render: (row) => (
                    <FhirValue
                      type="Identifier"
                      value={row.identifier}
                      options={{
                        max: 1,
                        systemFilterOrder: ["http://hl7.org/fhir/sid/us-ssn"],
                        style: "value",
                        default: "Unknown",
                      }}
                    />
                  ),
                },
                {
                  key: "passport",
                  title: "Passport",
                  render: (row) => (
                    <FhirValue
                      type="Identifier"
                      value={row.identifier}
                      options={{
                        max: 1,
                        systemFilterOrder: [
                          "http://standardhealthrecord.org/fhir/StructureDefinition/passportNumber",
                        ],
                        style: "value",
                        default: "Unknown",
                      }}
                    />
                  ),
                },
                {
                  key: "_lastUpdated",
                  title: "Last Updated",
                  sortable: true,
                  render: (row) => (
                    <FhirValue
                      type="instant"
                      value={row.meta.lastUpdated}
                      options={{ dateStyle: "relative" }}
                    />
                  ),
                },
              ]}
            />
            <FhirPagination {...patientsQuery} {...searchController} />
          </FhirQueryLoader>
        </Paper>
      </Grid.Col>
      <Grid.Col span="content">
        <Paper>
          <Stack>
            <NavButton
              leftSection={<IconPlus size="1rem" />}
              target="/patients/new/edit"
            >
              New patient
            </NavButton>
            <TitleDivider title="Quick Filters" />
            <FhirInput
              type="string"
              label="Patient Name"
              {...searchController.getInputProps("name")}
            />
            <FhirInput<MantineFhirInputDateProps>
              type="date"
              label="Patient DOB"
              {...searchController.getInputProps("birthDate")}
              rendererProps={{
                maxDate: new Date(),
              }}
            />
            <QuickFilter
              label="Patient Risk Stratification"
              options={["High Risk", "Medium Risk", "Low Risk"]}
            />
            <QuickFilter
              label="Clinical Program"
              options={["CHF", "CAD", "POP"]}
            />
            <QuickFilter
              label="Hospital/Facility Encounters"
              options={[
                "Currently in ER",
                "Inpatient",
                "Discharged",
                "Post-Discharge",
              ]}
            />
          </Stack>
        </Paper>
      </Grid.Col>
    </Grid>
  );
}

interface PageDrawerContent extends PropsWithChildren {
  title: string;
}

interface PageDrawerProps {
  content: PageDrawerContent | undefined;
  onClose: () => void;
}

function PageDrawer(props: PageDrawerProps): ReactElement {
  return (
    <Drawer
      position="right"
      opened={Boolean(props.content)}
      onClose={props.onClose}
      title={props.content?.title}
    >
      {props.content?.children}
    </Drawer>
  );
}
