"use client";
import { SaveChangesButtons } from "@/components/save-changes-buttons";
import { useFhirResourceForm } from "@bonfhir/mantine/r4b";
import { FhirInput, FhirInputArray } from "@bonfhir/react/r4b";
import { Group, Paper, Stack, Title } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";

export default function EditPatient() {
  const params = useParams<{ patientId: string }>();
  const router = useRouter();

  const form = useFhirResourceForm({
    id: params.patientId,
    type: "Patient",
    mutationOptions: {
      onSuccess(patient) {
        router.push(`/patients/${patient.id}`);
      },
    },
  });

  return (
    <Paper>
      <Stack>
        <Title order={3}>Edit patient</Title>
        <form onSubmit={form.onSubmit}>
          <Stack>
            <FhirInputArray
              label="Name"
              min={1}
              {...form.getArrayInputProps("name", { newValue: {} })}
            >
              {({ index }) => {
                return (
                  <FhirInput
                    type="HumanName"
                    mode="simple"
                    {...form.getInputProps(`name.${index}`)}
                  />
                );
              }}
            </FhirInputArray>
            <Group grow>
              <FhirInput
                type="date"
                label="Date of Birth"
                {...form.getInputProps("birthDate")}
              />
              <FhirInput
                type="code"
                label="Administrative Gender"
                source="http://hl7.org/fhir/ValueSet/administrative-gender"
                {...form.getInputProps("gender")}
              />
            </Group>
            <FhirInputArray
              label="Contact Info"
              min={1}
              {...form.getArrayInputProps("telecom", { newValue: {} })}
            >
              {({ index }) => {
                return (
                  <FhirInput
                    type="ContactPoint"
                    {...form.getInputProps(`telecom.${index}`)}
                  />
                );
              }}
            </FhirInputArray>
            <FhirInputArray
              min={1}
              {...form.getArrayInputProps("address", { newValue: {} })}
            >
              {({ index }) => {
                return (
                  <Group grow>
                    <FhirInput
                      type="string"
                      label="Address"
                      {...form.getInputProps(`address.${index}.line.0`)}
                    />
                    <FhirInput
                      type="string"
                      label="City"
                      {...form.getInputProps(`address.${index}.city`)}
                    />
                    <FhirInput
                      type="string"
                      label="State"
                      {...form.getInputProps(`address.${index}.state`)}
                    />
                    <FhirInput
                      type="string"
                      label="Postal Code"
                      {...form.getInputProps(`address.${index}.postalCode`)}
                    />
                  </Group>
                );
              }}
            </FhirInputArray>
            <SaveChangesButtons save={{ loading: form.mutation.isLoading }} />
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
}
