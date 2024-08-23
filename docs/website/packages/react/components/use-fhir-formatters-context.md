---
title: useFhirFormatters & FhirFormattersProvider
---

[`<FhirFormattersProvider>`](/packages/react/get-started#configure-the-fhirformattersprovider-) allows your React components to use the `useFhirFormatters` hook to format data from your queries on demand.

# `FhirFormattersProvider` Context provider

## Basic usage

When used from the root of your app, it allows the use of any FHIR resource formatting in any component through the use of its hook `useFhirFormatters`.

Using all the default for the formatters would look like this:

```tsx
export const BaseLayout: React.FC = () => {
  return (
    <FhirFormattersProvider>
      <YourAppOrOtherProviders>...</YourAppOrOtherProviders>
    </FhirFormattersProvider>
  );
};
```

And if you wish to support formatters dynamically by changing Locales, you can do something like this:

```tsx
export const BaseLayout: React.FC = () => {
  const [locale, setLocale] = useState<"en" | "es" | "fr">("en");

  const handleOnLocaleSwitch = (changedTo: "en" | "es" | "fr") => {
    setLocale(changedTo);
  };

  return (
    <FhirFormattersProvider options={{ locale }}>
      <button onClick={() => handleOnLocaleSwitch("en")}>EN</button>
      <button onClick={() => handleOnLocaleSwitch("es")}>ES</button>
      <button onClick={() => handleOnLocaleSwitch("fr")}>FR</button>
      ...
    </FhirFormattersProvider>
  );
};
```

# `useFhirFormatters` hook

## Basic usage

You can leverage the data formatting without depending on Bonfhir's React components simply by using the hook: this allows you to either create your own custom components or leverage any Component Library.

### Gluestack-ui v2

Example: you have a data table to display, with patient names, appointment time \*

\* we take a shortcut here and pretend we wrapped our FHIR query in a local custom hook

```tsx
import { useFhirFormatters } from "@bonfhir/react/r5/formatters";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableData,
  TableRow,
} from "@/components/ui/table";
import { useTodaysAppointments } from "./data/use-todays-appointments";
import {
  ConfirmAppointmentButton,
  NoShowAppointmentButton,
  CancelAppointmentButton,
} from "./actions";

export const TodaysAppointmentSchedule = () => {
  const { format } = useFhirFormatters();
  const { data, isLoading } = useTodaysAppointments();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer Name</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((appointment, i) => {
          return (
            <TableRow key={i}>
              <TableData>{format("HumanName", appointment.patient)}</TableData>
              <TableData>
                {format("dateTime", appointment.bookedAt, {
                  timeStyle: "medium",
                })}
              </TableData>
              <TableData>
                <ButtonGroup>
                  <ConfirmAppointmentButton appointment={appointment} />
                  <NoShowAppointmentButton appointment={appointment} />
                  <CancelAppointmentButton appointment={appointment} />
                </ButtonGroup>
              </TableData>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
```

### Mantine

```tsx
import { useFhirFormatters } from "@bonfhir/react/r5/formatters";
import { Table, Button, Loader } from "@mantine/core";
import { useTodaysAppointments } from "./data/use-todays-appointments";
import {
  ConfirmAppointmentButton,
  NoShowAppointmentButton,
  CancelAppointmentButton,
} from "./actions";

export const TodaysAppointmentSchedule = () => {
  const { format } = useFhirFormatters();
  const { data, isLoading } = useTodaysAppointments();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Customer Name</Table.Th>
          <Table.Th>Time</Table.Th>
          <Table.Th>Action</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.map((appointment, i) => {
          return (
            <Table.Tr key={i}>
              <Table.Td>{format("HumanName", appointment.patient)}</Table.Td>
              <Table.Td>
                {format("dateTime", appointment.bookedAt, {
                  timeStyle: "medium",
                })}
              </Table.Td>
              <Table.Td>
                <Button.Group>
                  <ConfirmAppointmentButton appointment={appointment} />
                  <NoShowAppointmentButton appointment={appointment} />
                  <CancelAppointmentButton appointment={appointment} />
                </Button.Group>
              </Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
};
```

### Ant design

```tsx
import { useFhirFormatters } from "@bonfhir/react/r5/formatters";
import { Table, Skeleton } from "antd";
import { useTodaysAppointments } from "./data/use-todays-appointments";
import {
  ConfirmAppointmentButton,
  NoShowAppointmentButton,
  CancelAppointmentButton,
} from "./actions";

export const TodaysAppointmentSchedule = () => {
  const { format } = useFhirFormatters();
  const { data, isLoading } = useTodaysAppointments();

  const columns = [
    {
      title: "Patient",
      dataIndex: "patient",
      key: "patient",
      render: (patient) => <>{format("HumanName", patient)}</>,
    },
    {
      title: "Time",
      dataIndex: "bookedAt",
      key: "bookedAt",
      render: (_, { bookedAt }) => (
        <>
          {format("dateTime", bookedAt, {
            timeStyle: "medium",
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, appointment) => (
        <>
          <ConfirmAppointmentButton appointment={appointment} />
          <NoShowAppointmentButton appointment={appointment} />
          <CancelAppointmentButton appointment={appointment} />
        </>
      ),
    },
  ];

  if (isLoading) {
    return <Spinner />;
  }

  return <Table columns={columns} dataSource={data} />;
};
```

### Your own

```tsx
import { useFhirFormatters } from "@bonfhir/react/r5/formatters";
import { useTodaysAppointments } from "./data/use-todays-appointments";
import {
  ConfirmAppointmentButton,
  NoShowAppointmentButton,
  CancelAppointmentButton,
} from "./actions";

import "./appointments-table.css";

export const TodaysAppointmentSchedule = () => {
  const { format } = useFhirFormatters();
  const { data, isLoading } = useTodaysAppointments();

  if (isLoading) {
    return <>Loading.... please wait</>;
  }

  return (
    <table className="appointments-table">
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Time</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((appointment, i) => {
          return (
            <tr key={i}>
              <td>{format("HumanName", appointment.patient)}</td>
              <td>
                {format("dateTime", appointment.bookedAt, {
                  timeStyle: "medium",
                })}
              </td>
              <td>
                <ConfirmAppointmentButton appointment={appointment} />
                <NoShowAppointmentButton appointment={appointment} />
                <CancelAppointmentButton appointment={appointment} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
```
