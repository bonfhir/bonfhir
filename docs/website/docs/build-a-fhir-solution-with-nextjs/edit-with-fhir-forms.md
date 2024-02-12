---
sidebar_position: 5
title: Edit resources with FHIR forms
description: Easy editing of FHIR resources
---

Let's learn how to create or edit FHIR resources through forms.

## Key concepts

- Create a new page and adapt the navigation
- [`useFhirResourceForm`](/packages/react/mantine/use-fhir-resource-form) to create a controlled form to edit FHIR resources
- [`<FhirInput>`](/packages/react/components/fhir-input) to create form inputs for FHIR data types
- [`<FhirInputArray>`](/packages/react/components/fhir-input-array) for repeating elements in resources

## Step by step

Let's start by creating a new page and adapt navigation.

1.  Create a new page called `src/app/patients/[patientId]/edit/page.tsx` that expect a patient ID in the url:

    ```tsx title="src/app/patients/[patientId]/edit/page.tsx"
    "use client";
    import { Title } from "@mantine/core";
    import { useParams } from "react-router-dom";

    export default function EditPatient() {
      const { patientId } = useParams<{ patientId: string }>();

      return <Title order={3}>Edit Patient {patientId}</Title>;
    }
    ```

    This page does not do much at the moment, but it will be used to validate the navigation.

2.  Add a link to navigate to this page from the home page:

    ```tsx title="src/app/page.tsx"
    import { Button } from "@mantine/core";
    import Link from "next/link";

    <Button component={Link} href={`/patients/${patient.id}/edit`}>
      Edit
    </Button>;
    ```

    When clicking on the "Edit" button now, we can see that we navigate to our new page!

3.  Edit the `src/app/patients/[patientId]/edit/page.tsx` page to create a form to edit the patient `birthDate`:

    ```tsx title="src/app/patients/[patientId]/edit/page.tsx"
    "use client";
    import { useFhirResourceForm } from "@bonfhir/mantine/r4b";
    import { FhirInput } from "@bonfhir/react/r4b";
    import { Button, Group, Paper, Stack, Title } from "@mantine/core";
    import { useParams, useRouter } from "next/navigation";

    export default function EditPatient() {
      const { patientId } = useParams<{ patientId: string }>();
      const router = useRouter();

      const form = useFhirResourceForm({
        id: patientId,
        type: "Patient",
        mutationOptions: {
          onError(error) {
            alert(JSON.stringify(error, null, 2));
          },
          onSuccess() {
            router.back();
          },
        },
      });

      return (
        <Paper p="xl">
          <form onSubmit={form.onSubmit}>
            <Stack>
              <Title order={3}>Edit Patient {form.form.values?.id}</Title>
              <Group w={300}>
                <FhirInput
                  type="date"
                  label="Birthday"
                  {...form.getInputProps(`birthDate`)}
                />
              </Group>
              <Group>
                <Button type="submit">Save</Button>
                <Button
                  variant="subtle"
                  color="red"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      );
    }
    ```

    Here you can see a couple of constructs:

        - `useFhirResourceForm` is a hook that manages the complete life-cycle of retrieving a FHIR resource and submitting
          it for change or creation; you just have to specify the resource type and id, or `new` for id to create a new resource;
          the resulting variable can be spread out to the form's input to apply the forms binding;
          this follows the mode of operation of [Mantine's `useForm` hook](https://mantine.dev/form/use-form/)
          IF you need more control over the loading and submission of forms, there is an alternative `useFhirForm` hook
          that only handle form control, without interaction with the FHIR API
        - `<FhirInput>` as a mirror to `<FhirValue>` to create inputs for FHIR data types - in this case `date`
        - hook-up navigation on cancellation or success of the submission; for now we simply go back to the previous page

    Simply update the birth date of the patient, and observe the resource being updated back in the home page.

    ![Patient form with birthDate](/img/docs/patient-form-birthDate.png)

    Notice how we did not need to do anything to refresh the data in the home page; the `@bonfhir/query` package takes
    care of cache invalidation and refresh for us.

    :::warning[FHIR validation error on synthea resources]

    You may get a validation error if you use a patient from the synthea import (loaded using the `npm run add-sample-data` command).  
    Some of these resources have invalid data schemas that might failed when they are updated.

    If this is the case, either pick a different patient, manually edit the patient in Medplum and remove the extensions,
    or you can simply strip their extensions by applying a transformation to the data prior to it being submitted:

    ```tsx
    const form = useFhirResourceForm({
      id: patientId,
      type: "Patient",
      formOptions: {
        transformValues(patient) {
          // This remove the extension field from the patient object
          const { extension, ...rest } = patient;
          return rest;
        },
      },
      mutationOptions: {
        onError(error) {
          alert(JSON.stringify(error, null, 2));
        },
        onSuccess() {
          router.back();
        },
      },
    });
    ```

    :::

4.  Add another input to manipulate patient names:

    ```tsx title="src/app/patients/[patientId]/edit/page.tsx"
    <Group w="50%">
      <FhirInputArray
        label="Name"
        min={1}
        max={5}
        {...form.getArrayInputProps(`name`, { newValue: {} })}
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
    ```

    Notice the usage of `<FhirInputArray>` in conjunction with `form.getArrayInputProps` to handle repeating elements
    in a FHIR resource.

    ![Patient form with names](/img/docs/patient-form-with-names.png)

:::info[Works in creation too]

If you navigate to this page using `new` for the patientId value (http://localhost:3000/patients/new/edit),
you will be presented with a form that can create a new patient. Go ahead and try it!  
Then head over to http://localhost:8100/Patient to see your newly created patient!

:::

## Final result

```tsx title="src/app/page.tsx"
"use client";
import { useFhirRead } from "@bonfhir/query/r4b";
import { FhirQueryLoader, FhirValue } from "@bonfhir/react/r4b";
import { Button, Group, Paper, Stack, Text } from "@mantine/core";
import Link from "next/link";
import PatientReportsTable from "./PatientReportsTable";

export default function Home() {
  const patientQuery = useFhirRead(
    "Patient",
    "d126c3d8-3d9a-4e75-8f39-5aed91560e3a",
  );

  return (
    <FhirQueryLoader query={patientQuery}>
      {(patient) => (
        <Paper p="xl">
          <Paper shadow="xs" p="xl">
            <Stack gap="sm">
              <Text size="xl">
                <FhirValue type="HumanName" value={patient.name} />
              </Text>
              <Group>
                <Text fw={600}>Birthday: </Text>
                <FhirValue type="date" value={patient.birthDate} />
              </Group>
              <Group>
                <Text fw={600}>Address: </Text>
                <FhirValue type="Address" value={patient.address} />
              </Group>
              <Group>
                <Text fw={600}>Contact: </Text>
                <FhirValue type="ContactPoint" value={patient.telecom} />
              </Group>
              <Group>
                <Button component={Link} href={`/patients/${patient.id}/edit`}>
                  Edit
                </Button>
              </Group>
            </Stack>
          </Paper>
          <br />
          <PatientReportsTable patientId={patient.id} />
        </Paper>
      )}
    </FhirQueryLoader>
  );
}
```

```tsx title="src/app/patients/[patientId]/edit/page.tsx"
"use client";
import { useFhirResourceForm } from "@bonfhir/mantine/r4b";
import { FhirInput, FhirInputArray } from "@bonfhir/react/r4b";
import { Button, Group, Paper, Stack, Title } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";

export default function EditPatient() {
  const { patientId } = useParams<{ patientId: string }>();
  const router = useRouter();

  const form = useFhirResourceForm({
    id: patientId,
    type: "Patient",
    mutationOptions: {
      onError(error) {
        alert(JSON.stringify(error, null, 2));
      },
      onSuccess() {
        router.back();
      },
    },
  });

  return (
    <Paper p="xl">
      <form onSubmit={form.onSubmit}>
        <Stack>
          <Title order={3}>Edit Patient {form.form.values?.id}</Title>
          <Group w="50%">
            <FhirInputArray
              label="Name"
              min={1}
              max={5}
              {...form.getArrayInputProps(`name`, { newValue: {} })}
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
              type="date"
              label="Birthday"
              {...form.getInputProps(`birthDate`)}
            />
          </Group>
          <Group>
            <Button type="submit">Save</Button>
            <Button variant="subtle" color="red" onClick={() => router.back()}>
              Cancel
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}
```

## Bonus points

It is always nice to notify users of the success of an operation.  
We can use [Mantine Notification system](https://mantine.dev/x/notifications/) for that.

1. Stop the dev server (Ctrl+C) and add the package:

   ```bash npm2yarn
   npm install @mantine/notifications
   ```

2. Add the CSS and provider in the `src/app/layout.tsx` file:

   ```tsx title="src/app/layout.tsx"
   import "@mantine/notifications/styles.css";
   import { Notifications } from '@mantine/notifications';

   export default function RootLayout({ children }: PropsWithChildren) {
      //...
      return (
        //...
        <MantineProvider theme={theme}>
          <Notifications />
          //...
   ```

3. Hook up to the mutation success to inform the user:

   ```tsx title="src/app/patients/[patientId]/edit/page.tsx"
   import { notifications } from "@mantine/notifications";

   export default function EditPatient() {
    const { patientId } = useParams<{ patientId: string }>();
    const router = useRouter();
    const { formatter } = useFhirUIContext();

    const form = useFhirResourceForm({
      id: patientId,
      type: "Patient",
      mutationOptions: {
        onError(error) {
          alert(JSON.stringify(error, null, 2));
        },
        onSuccess(patient) {
          notifications.show({
            message: `Saved patient ${formatter.format(
              "HumanName",
              patient.name,
              { max: 1 },
            )}`,
            color: "green",
          });
          router.back();
        },
      },
    });
   ```
