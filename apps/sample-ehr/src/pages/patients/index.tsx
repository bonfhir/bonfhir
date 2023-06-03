/* eslint-disable unicorn/no-useless-undefined */
import {
  IndicatorCard,
  MainPage,
  QuickFilter,
  TitleDivider,
} from "@/components";
import { Patient } from "@bonfhir/core/r4b";
import { useFhirSearch } from "@bonfhir/query/r4b";
import { MantineFhirTableProps } from "@bonfhir/ui-mantine/r4b";
import { FhirTable, FhirValue } from "@bonfhir/ui/r4b";
import { Drawer, Grid, Paper, SimpleGrid, Stack } from "@mantine/core";
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
  const patientsQuery = useFhirSearch("Patient", (search) =>
    search._sort("name")._include("Patient", "organization")._total("accurate")
  );

  return (
    <Grid>
      <Grid.Col span="auto">
        <Paper mih="100%">
          <FhirTable<Patient, Patient, MantineFhirTableProps>
            rendererProps={{
              table: {
                mih: "100%",
              },
            }}
            query={patientsQuery}
            columns={[
              {
                key: "name",
                title: "Name",
                render: (row) => (
                  <FhirValue
                    type="HumanName"
                    value={row.name}
                    options={{ max: 1 }}
                  />
                ),
              },
              {
                key: "birth-date",
                title: "Birth Date",
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
                    }}
                  />
                ),
              },
              {
                key: "risk",
                title: "Risk",
                render: () => "unknown",
              },
            ]}
          />
        </Paper>
      </Grid.Col>
      <Grid.Col span="content">
        <Paper>
          <Stack>
            <TitleDivider title="Quick Filters" />
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
