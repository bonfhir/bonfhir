import { MainPage } from "@/components";
import {
  MantineFhirInputHumanNameProps,
  useFhirResourceForm,
} from "@bonfhir/ui-mantine/r4b";
import { FhirInput, FhirInputArray } from "@bonfhir/ui/r4b";
import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Paper,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import { useRouter } from "next/router";

export default function EditPatient() {
  const router = useRouter();
  const { patientId } = router.query as { patientId: "new" | string };
  const newPatient = patientId === "new";

  const resourceForm = useFhirResourceForm({
    type: "Patient",
    id: patientId,
    defaultValues: {
      name: [],
    },
    mutationOptions: {
      onSuccess(data) {
        router.push(`/patients/${data.id}`);
      },
    },
  });

  return (
    <MainPage title={newPatient ? `New Patient` : `Edit Patient`}>
      <Paper>
        <form onSubmit={resourceForm.onSubmit}>
          <LoadingOverlay visible={resourceForm.query.isInitialLoading} />
          <Box maw={600}>
            <Stack align="flex-start">
              <FhirInputArray
                label="Name"
                min={1}
                {...resourceForm.getArrayInputProps("name", { newValue: {} })}
              >
                {({ index }) => {
                  return (
                    <FhirInput<MantineFhirInputHumanNameProps>
                      type="HumanName"
                      mode="simple"
                      {...resourceForm.getInputProps(`name.${index}`)}
                    />
                  );
                }}
              </FhirInputArray>
              <SimpleGrid cols={2} spacing="md" w="100%">
                <FhirInput
                  type="date"
                  label="Date of Birth"
                  {...resourceForm.getInputProps("birthDate")}
                />
                <FhirInput
                  type="dateTime"
                  label="Deceased"
                  {...resourceForm.getInputProps("deceasedDateTime")}
                />
                {/* <FhirInput
                  type="boolean"
                  label="Deceased"
                  mode="checkbox"
                  {...resourceForm.getInputProps("deceasedBoolean")}
                /> */}
                <FhirInput
                  type="code"
                  label="Gender"
                  mode="select"
                  source="http://hl7.org/fhir/ValueSet/administrative-gender"
                  {...resourceForm.getInputProps("gender")}
                />
                <FhirInput
                  type="CodeableConcept"
                  label="Marital Status"
                  mode="select"
                  source="http://hl7.org/fhir/ValueSet/marital-status"
                  {...resourceForm.getInputProps("maritalStatus")}
                />
              </SimpleGrid>
              <Group mt="md">
                <Button type="submit" loading={resourceForm.mutation.isLoading}>
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
