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
import {
  IconGenderFemale,
  IconGenderMale,
  IconGenderThird,
} from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function EditPatient() {
  const { formatter } = useFhirUIContext();
  const router = useRouter();
  const { patientId } = router.query as { patientId: "new" | string };
  const newPatient = patientId === "new";

  const resourceForm = useFhirResourceForm({
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
        <form onSubmit={resourceForm.onSubmit}>
          <LoadingOverlay visible={resourceForm.query.isInitialLoading} />
          <Box maw={300}>
            <Stack align="flex-start">
              <FhirInput
                type="string"
                label="Name"
                disabled={true}
                value={formatter.format(
                  "HumanName",
                  resourceForm.form.values.name
                )}
              />
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
              <FhirInput
                type="code"
                label="Gender"
                mode="select"
                source="http://hl7.org/fhir/ValueSet/administrative-gender"
                // rendererProps={{
                //   itemComponent: forwardRef<
                //     HTMLDivElement,
                //     MantineFhirInputCodeRendererItemProps
                //   >(({ item, ...others }, ref) => (
                //     <div ref={ref} {...others}>
                //       <Group noWrap>
                //         <GenderIcon code={item.code} />
                //         <Text>{item.display}</Text>
                //       </Group>
                //     </div>
                //   )),
                // }}
                {...resourceForm.getInputProps("gender")}
              />
              <FhirInput
                type="CodeableConcept"
                label="Marital Status"
                mode="select"
                source="http://hl7.org/fhir/ValueSet/marital-status"
                {...resourceForm.getInputProps("maritalStatus")}
              />
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

function GenderIcon({ code }: { code: string | undefined }) {
  switch (code) {
    case "male": {
      return <IconGenderMale size="1rem" />;
    }
    case "female": {
      return <IconGenderFemale size="1rem" />;
    }
    case "other": {
      return <IconGenderThird size="1rem" />;
    }
  }

  // eslint-disable-next-line unicorn/no-null
  return null;
}
