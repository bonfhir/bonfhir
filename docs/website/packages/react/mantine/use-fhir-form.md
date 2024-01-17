---
sidebar_position: 1
title: useFhirForm
description: FHIR forms
---

The `useFhirForm` hook is an extension of [Mantine `useForm` hook](https://mantine.dev/form/use-form/) with support
for FHIR arrays.

It is used in the same way as [Mantine `useForm` hook](https://mantine.dev/form/use-form/), and adds a new method
named `getArrayInputProps` that is meant to be used with [`<FhirInputArray />`](/packages/react/components/fhir-input-array)
to automatically manage values that are repeated (e.g. when the FHIR cardinality is 0...\*).

## Basic usage

```tsx
import { Patient } from "@bonfhir/core/r4b";
import { useFhirForm } from "@bonfhir/mantine/r4b";
import { useFhirSaveMutation } from "@bonfhir/query/r4b";
import { FhirInput, FhirInputArray } from "@bonfhir/react/r4b";
import { Button, Group, Paper, Stack } from "@mantine/core";

export default function MyComponent() {
  const patientSaveMutation = useFhirSaveMutation("Patient", {
    mutation: {
      onSuccess: (patient) => {
        alert(`Patient ${patient.id} saved!`);
      },
    },
  });

  const form = useFhirForm<Patient>({
    initialValues: {
      resourceType: "Patient",
    },
  });

  return (
    <Paper p="lg">
      <form
        onSubmit={form.onSubmit((patient) =>
          patientSaveMutation.mutate(patient),
        )}
      >
        <Stack>
          <Group w={500}>
            <FhirInputArray
              label="Name"
              {...form.getArrayInputProps("name")}
              min={1}
            >
              {({ index }) => (
                <FhirInput
                  type="HumanName"
                  mode="simple"
                  {...form.getInputProps(`name.${index}`)}
                />
              )}
            </FhirInputArray>
          </Group>
          <Group w={300}>
            <FhirInput
              label="Birth date"
              type="date"
              {...form.getInputProps("birthDate")}
            />
          </Group>
          <Group>
            <Button type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}
```

## Create multiple resources

Here is another example that shows how to combine multiple resources into a single form:

```tsx
import { Condition, Encounter, now } from "@bonfhir/core/r4b";
import { useFhirForm } from "@bonfhir/mantine/r4b";
import { useFhirTransactionMutation } from "@bonfhir/query/r4b";
import { FhirInput, FhirInputArray } from "@bonfhir/react/r4b";
import { Button, Group, Paper, Stack } from "@mantine/core";

// You don;t have to do this, but it makes things clearer IMHO
interface FormData {
  encounter: Encounter;
  conditions: Condition[];
}

export default function MyComponent() {
  const mutation = useFhirTransactionMutation({
    mutation: {
      onSuccess: (result) => {
        alert(JSON.stringify(result, undefined, 2));
      },
    },
  });

  const form = useFhirForm<FormData>({
    initialValues: {
      encounter: {
        resourceType: "Encounter",
        status: "in-progress",
        class: {
          code: "AMB",
          display: "ambulatory",
          system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
        },
        period: {
          start: now(),
        },
      },
      conditions: [],
    },
  });

  const submit = form.onSubmit((data) =>
    mutation.mutate((transaction) => {
      const encounter = transaction.create(data.encounter);
      for (const conditions of data.conditions?.filter((c) => c.code?.text) ||
        []) {
        conditions.encounter = encounter.reference;
        transaction.create(conditions);
      }
      return transaction;
    }),
  );

  return (
    <Paper p="lg">
      <form onSubmit={submit}>
        <Stack>
          <Group w={300}>
            <FhirInput
              label="Start"
              type="dateTime"
              {...form.getInputProps(`encounter.period.start`)}
            />
            <FhirInput
              label="Status"
              required
              type="code"
              source="http://hl7.org/fhir/ValueSet/encounter-status"
              {...form.getInputProps(`encounter.status`)}
            />
          </Group>
          <Group w={500}>
            <FhirInputArray
              label="Conditions"
              {...form.getArrayInputProps(`conditions`, {
                newValue: {
                  resourceType: "Condition",
                  subject: { reference: "Patient/123" },
                  code: {},
                },
              })}
            >
              {({ index }) => (
                <FhirInput
                  type="string"
                  {...form.getInputProps(`conditions.${index}.code.text`)}
                />
              )}
            </FhirInputArray>
          </Group>
          <Group>
            <Button type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}
```
