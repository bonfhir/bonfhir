import MainPage from "@/components/layout/main-page";
import { useFhirSearch } from "@bonfhir/query/r4b";
import { FhirTable } from "@bonfhir/ui/r4b";
import { Paper } from "@mantine/core";

export default function Patients() {
  const patientsQuery = useFhirSearch("Patient", (search) =>
    search._include("Patient", "organization")._total("accurate")
  );

  return (
    <MainPage title="Patients">
      <Paper>
        <FhirTable query={patientsQuery} />
      </Paper>
    </MainPage>
  );
}
