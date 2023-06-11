import { MainPage } from "@/components";
import { build } from "@bonfhir/core/r4b";
import { useFhirRead } from "@bonfhir/query/r4b";
import { FhirInput, useFhirUIContext } from "@bonfhir/ui/r4b";
import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Paper,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function EditPatient() {
  const { formatter } = useFhirUIContext();
  const router = useRouter();
  const { patientId } = router.query as { patientId: "new" | string };
  const newPatient = patientId === "new";
  const patientQuery = useFhirRead("Patient", patientId, {
    query: { enabled: !newPatient },
  });

  const form = useForm({
    initialValues: build("Patient", {}),
  });

  useEffect(() => {
    if (patientQuery.data) {
      const { meta, text, ...clonedPatient } = structuredClone(
        patientQuery.data
      );
      form.setValues(clonedPatient);
      form.resetDirty(clonedPatient);
    }
  }, [patientQuery.data]);

  return (
    <MainPage title={newPatient ? `New Patient` : `Edit Patient`}>
      <Paper>
        <form
          onSubmit={form.onSubmit((newPatient) =>
            console.log(build("Patient", newPatient))
          )}
        >
          <LoadingOverlay visible={patientQuery.isInitialLoading} />
          <Box maw={300}>
            <Stack align="flex-start">
              <FhirInput
                type="string"
                label="Name"
                disabled={true}
                value={formatter.format("HumanName", form.values.name)}
              />
              <FhirInput
                type="date"
                label="Date of Birth"
                {...form.getInputProps("birthDate")}
              />
              <FhirInput
                type="dateTime"
                label="Deceased"
                {...form.getInputProps("deceasedDateTime")}
              />
              <Group mt="md">
                <Button type="submit">Save</Button>
              </Group>
            </Stack>
          </Box>
        </form>
      </Paper>
    </MainPage>
  );
}
