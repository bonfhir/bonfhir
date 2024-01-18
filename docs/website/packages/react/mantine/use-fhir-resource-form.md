---
sidebar_position: 2
title: useFhirResourceForm
description: FHIR forms (enhanced)
---

The `useFhirResourceForm` hook is similar to the [`useFhirForm` hook](/packages/react/mantine/use-fhir-form), but it
goes one step further in that:

- it is meant to create or update a _single_ FHIR resource
- it incorporates the retrieval of the existing resource, and the management of the mutation
- it switches intelligently from create to update based on the resource id value

## Basic usage

```tsx
import { duration, now } from "@bonfhir/core/r4b";
import { useFhirResourceForm } from "@bonfhir/mantine/r4b";
import { FhirInput } from "@bonfhir/react/r4b";
import { Button, Group, Paper, Stack } from "@mantine/core";

export default function MyComponent() {
  const form = useFhirResourceForm({
    id: "new", // Use "new" to create a new resource, or an existing id to retrieve it.
    type: "Appointment",
    defaultValues: {
      status: "proposed",
      start: now(),
      end: duration.add(now(), duration.minutes(30)),
      participant: [
        {
          actor: {},
          status: "accepted",
        },
      ],
    },
    mutationOptions: {
      onSuccess(data) {
        alert(JSON.stringify(data, undefined, 2));
      },
    },
  });

  return (
    <Paper p="lg">
      <form onSubmit={form.onSubmit}>
        <Stack>
          <Group w={300}>
            <FhirInput
              label="Start"
              required
              type="instant"
              {...form.getInputProps(`start`)}
            />
            <FhirInput
              label="End"
              required
              type="instant"
              {...form.getInputProps(`end`)}
            />
          </Group>
          <Group w={500}>
            <FhirInput
              type="code"
              label="status"
              source="http://hl7.org/fhir/ValueSet/appointmentstatus"
              {...form.getInputProps("status")}
            />
          </Group>
          <Group w={500}>
            <FhirInput
              label="Patient"
              required
              type="Reference"
              resourceType="Patient"
              search={(query) => (search) => search.family(query)}
              {...form.getInputProps("participant.0.actor")}
            />
          </Group>
          <Group w={500}>
            <FhirInput
              type="string"
              label="Comment"
              {...form.getInputProps("comment")}
            />
          </Group>
          <Group>
            <Button type="submit">Save</Button>
            <Button
              variant="outline"
              color="grey"
              onClick={() => form.form.reset()}
            >
              Reset
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}
```

As opposed to the example in [`useFhirForm`](/packages/react/mantine/use-fhir-form), we do not have to create a query
to read the appointment, or a mutation to save it - it is all done automatically.
