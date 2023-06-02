import MainPage from "@/components/layout/main-page";
import { useFhirSearch } from "@bonfhir/query/r4b";
import { FhirTable, FhirValue } from "@bonfhir/ui/r4b";
import { Paper } from "@mantine/core";

export default function Patients() {
  const patientsQuery = useFhirSearch("Patient", (search) =>
    search._include("Patient", "organization")._total("accurate")
  );

  return (
    <MainPage title="Patients">
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
    </MainPage>
  );
}
