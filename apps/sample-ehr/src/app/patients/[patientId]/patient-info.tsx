"use client";
import { Patient } from "@bonfhir/core/r4b";
import { FhirValue } from "@bonfhir/react/r4b";
import { ActionIcon, Button, Group, Paper, Stack, Title } from "@mantine/core";
import { IconArrowLeft, IconEdit } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface PatientInfoProps {
  patient: Patient;
}

export default function PatientInfo({ patient }: PatientInfoProps) {
  const router = useRouter();

  return (
    <Stack gap="sm">
      <Stack align="flex-start" gap="xs">
        <Button
          variant="subtle"
          size="compact-sm"
          leftSection={<IconArrowLeft />}
          onClick={() => router.push("/patients")}
        >
          Back to Patient List
        </Button>
      </Stack>
      <Paper>
        <Group justify="space-between">
          <Title order={3}>
            <FhirValue type="HumanName" value={patient.name} />
          </Title>
          <ActionIcon
            component={Link}
            href={`/patients/${patient.id}/edit`}
            variant="subtle"
            size="sm"
            aria-label="Edit"
          >
            <IconEdit />
          </ActionIcon>
        </Group>
      </Paper>
    </Stack>
  );
}
