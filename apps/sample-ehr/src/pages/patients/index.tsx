import MainPage from "@/components/layout/main-page";
import { useFhirSearch } from "@bonfhir/query/r4b";
import { FhirTable, FhirValue } from "@bonfhir/ui/r4b";
import {
  Card,
  Checkbox,
  Divider,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";

export default function Patients() {
  const patientsQuery = useFhirSearch("Patient", (search) =>
    search._include("Patient", "organization")._total("accurate")
  );

  return (
    <MainPage title="Patients">
      <Stack>
        <Paper>
          <Grid>
            <Grid.Col span="auto">
              <Stack spacing="xs">
                <Group position="apart">
                  <Title order={6}>Hospital Encounters</Title>
                  <Text size="xs">
                    Last updated: March 22, 2022 at 10:10 AM
                  </Text>
                </Group>
                <Divider size="sm" mb="sm" />
                <SimpleGrid cols={2}>
                  <Card padding="sm" bg="#E9EFF4">
                    <Text fz="xs" fw={700} c="dimmed">
                      Currently in ER
                    </Text>
                    <Text fz={30} fw={700}>
                      3
                    </Text>
                  </Card>
                </SimpleGrid>
              </Stack>
            </Grid.Col>
            <Grid.Col span="content">
              <Title order={6}>Upcoming Appointments</Title>
              <Divider size="sm" mb="sm" />
            </Grid.Col>
          </Grid>
        </Paper>
        <Grid>
          <Grid.Col span="auto">
            <Paper>
              <FhirTable
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
              <Title order={6}>Quick Filters</Title>
              <Divider size="sm" mb="sm" />
              <Stack>
                <Checkbox.Group
                  defaultValue={["all"]}
                  label="Patient Risk Stratification"
                >
                  <Stack mt="xs" ml="md">
                    <Checkbox value="all" label="All" />
                    <Checkbox value="high" label="High Risk" />
                    <Checkbox value="medium" label="Medium Risk" />
                    <Checkbox value="low" label="Low Risk" />
                  </Stack>
                </Checkbox.Group>
                <Checkbox.Group defaultValue={["all"]} label="Clinical Program">
                  <Stack mt="xs" ml="md">
                    <Checkbox value="all" label="All" />
                    <Checkbox value="chf" label="CHF" />
                    <Checkbox value="cad" label="CAD" />
                    <Checkbox value="pop" label="POP" />
                  </Stack>
                </Checkbox.Group>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </MainPage>
  );
}
