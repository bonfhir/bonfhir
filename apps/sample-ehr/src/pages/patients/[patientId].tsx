import { MainPage } from "@/components";
import { Patient, Retrieved } from "@bonfhir/core/r4b";
import { useFhirRead } from "@bonfhir/query/r4b";
import { FhirQueryLoader, FhirValue } from "@bonfhir/ui/r4b";
import { Avatar, Divider, Group, Paper, Stack, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { ReactElement } from "react";

export default function Patient() {
  const router = useRouter();
  const { patientId } = router.query as { patientId: string };
  const patientQuery = useFhirRead("Patient", patientId);

  return (
    <MainPage title="Patients">
      <FhirQueryLoader query={patientQuery}>
        {(patient) => (
          <Stack>
            <PatientHeader patient={patient} />
          </Stack>
        )}
      </FhirQueryLoader>
    </MainPage>
  );
}

export function PatientHeader({
  patient,
}: {
  patient: Retrieved<Patient>;
}): ReactElement {
  return (
    <Paper>
      <Group position="apart">
        <Group>
          <Group>
            <Avatar size="xl" variant="light" />
            <Stack h="100%" spacing={0}>
              <Title order={4}>
                <FhirValue
                  type="HumanName"
                  value={patient.name}
                  options={{ max: 1 }}
                />
              </Title>
              <FhirValue
                type="date"
                value={patient.birthDate}
                options={{ dateStyle: "medium" }}
                rendererProps={{
                  text: {
                    fz: "sm",
                  },
                }}
              />
              <FhirValue
                type="Identifier"
                value={patient.identifier}
                options={{ max: 1, default: "No known identifier" }}
                rendererProps={{
                  text: {
                    fz: "sm",
                  },
                }}
              />
            </Stack>
          </Group>
          <Divider orientation="vertical" mx="lg" />
        </Group>
      </Group>
    </Paper>
  );
}
