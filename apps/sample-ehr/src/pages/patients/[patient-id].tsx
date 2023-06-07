import { MainPage } from "@/components";
import { useFhirRead } from "@bonfhir/query/r4b";
import { FhirQueryLoader } from "@bonfhir/ui/r4b";
import { Stack } from "@mantine/core";
import { useRouter } from "next/router";

export default function Patient() {
  const router = useRouter();
  const patientQuery = useFhirRead(
    "Patient",
    router.query["patient-id"] as string
  );

  return (
    <MainPage title="Patients">
      <FhirQueryLoader query={patientQuery}>
        <Stack></Stack>
      </FhirQueryLoader>
    </MainPage>
  );
}
