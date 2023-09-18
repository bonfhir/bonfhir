import { MainPage, NavButton } from "@/components";
import { CustomPatient } from "@/fhir/patient";
import { Retrieved } from "@bonfhir/core/r4b";
import { useFhirRead } from "@bonfhir/query/r4b";
import { FhirQueryLoader, FhirValue } from "@bonfhir/react/r4b";
import { Avatar, Divider, Group, Paper, Stack, Title } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { ReactElement } from "react";

export default function Patient() {
  const router = useRouter();
  const { patientId } = router.query as { patientId: string };
  const patientQuery = useFhirRead(CustomPatient, patientId);

  return (
    <MainPage
      title="Patients"
      titleRight={
        <NavButton
          target={`/patients/${patientId}/edit`}
          variant="outline"
          leftIcon={<IconEdit size="1rem" />}
        >
          Edit
        </NavButton>
      }
    >
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
  patient: Retrieved<CustomPatient>;
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
                  options={{ max: 1, style: "standard" }}
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
          <FhirValue
            type="markdown"
            value={patient.internalNote}
            options={{ style: "html" }}
          />
        </Group>
      </Group>
    </Paper>
  );
}
