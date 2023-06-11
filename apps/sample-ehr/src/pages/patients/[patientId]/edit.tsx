import { MainPage } from "@/components";
import { useFhirResourceForm } from "@bonfhir/ui-mantine/r4b";
import { FhirInput, useFhirUIContext } from "@bonfhir/ui/r4b";
import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Paper,
  Stack,
} from "@mantine/core";
import { useRouter } from "next/router";

export default function EditPatient() {
  const { formatter } = useFhirUIContext();
  const router = useRouter();
  const { patientId } = router.query as { patientId: "new" | string };
  const newPatient = patientId === "new";

  const formResource = useFhirResourceForm({
    type: "Patient",
    id: patientId,
    mutationOptions: {
      onSuccess(data) {
        router.push(`/patients/${data.id}`);
      },
    },
  });

  return (
    <MainPage title={newPatient ? `New Patient` : `Edit Patient`}>
      <Paper>
        <form onSubmit={formResource.onSubmit}>
          <LoadingOverlay visible={formResource.query.isInitialLoading} />
          <Box maw={300}>
            <Stack align="flex-start">
              <FhirInput
                type="string"
                label="Name"
                disabled={true}
                value={formatter.format(
                  "HumanName",
                  formResource.form.values.name
                )}
              />
              <FhirInput
                type="date"
                label="Date of Birth"
                {...formResource.getInputProps("birthDate")}
              />
              <FhirInput
                type="dateTime"
                label="Deceased"
                {...formResource.getInputProps("deceasedDateTime")}
              />
              <Group mt="md">
                <Button type="submit" loading={formResource.mutation.isLoading}>
                  Save
                </Button>
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </Group>
            </Stack>
          </Box>
        </form>
      </Paper>
    </MainPage>
  );
}
