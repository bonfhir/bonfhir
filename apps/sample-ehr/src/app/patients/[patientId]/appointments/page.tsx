"use client";
import {
  Appointment,
  AppointmentParticipant,
  AppointmentSortOrder,
  BundleNavigator,
  Practitioner,
  Retrieved,
  isReferenceOf,
} from "@bonfhir/core/r4b";
import { useFhirSearchControllerNext } from "@bonfhir/next/r4b/client";
import { useFhirSearch } from "@bonfhir/query/r4b";
import {
  FhirPagination,
  FhirQueryLoader,
  FhirTable,
  FhirValue,
  UseFhirSearchControllerValue,
} from "@bonfhir/react/r4b";
import { Paper, Stack, Title } from "@mantine/core";
import { UseQueryResult } from "@tanstack/react-query";
import { usePatientContext } from "../patient.context";

export default function Appointments() {
  const { patient } = usePatientContext();

  const currentDate = new Date();
  const upcomingAppointmentsSearchController =
    useFhirSearchControllerNext<AppointmentSortOrder>("upcoming", {
      defaultSort: "date",
      pageSize: 10,
    });
  const upcomingAppointmentsQuery = useFhirSearch(
    "Appointment",
    (search) =>
      search
        .patient(patient.id)
        .date(currentDate.toDateString(), "ge")
        ._total("accurate")
        ._count(upcomingAppointmentsSearchController.pageSize)
        ._sort(upcomingAppointmentsSearchController.sort)
        ._include("Appointment", "actor"),
    upcomingAppointmentsSearchController.pageUrl,
  );

  const pastAppointmentsSearchController =
    useFhirSearchControllerNext<AppointmentSortOrder>("past", {
      defaultSort: "-date",
      pageSize: 10,
    });
  const pastAppointmentsQuery = useFhirSearch(
    "Appointment",
    (search) =>
      search
        .patient(patient.id)
        .date(currentDate.toDateString(), "lt")
        ._total("accurate")
        ._count(pastAppointmentsSearchController.pageSize)
        ._sort(pastAppointmentsSearchController.sort)
        ._include("Appointment", "actor"),
    pastAppointmentsSearchController.pageUrl,
  );

  return (
    <Stack>
      <AppointmentTable
        query={upcomingAppointmentsQuery}
        searchController={upcomingAppointmentsSearchController}
        title="Upcoming Appointments"
      />
      <AppointmentTable
        query={pastAppointmentsQuery}
        searchController={pastAppointmentsSearchController}
        title="Past Appointments"
      />
    </Stack>
  );
}

function AppointmentTable({
  query,
  searchController,
  title,
}: {
  query: UseQueryResult<BundleNavigator<Retrieved<Appointment>>>;
  searchController: UseFhirSearchControllerValue<AppointmentSortOrder>;
  title: string;
}) {
  return (
    <Paper>
      <Title order={3}>{title}</Title>
      <FhirQueryLoader query={query}>
        <FhirTable
          {...query}
          {...searchController}
          columns={[
            {
              key: "appointmentType",
              title: "Appointment Type",
              render: (appointment: Appointment) => (
                <FhirValue
                  type="CodeableConcept"
                  value={appointment.appointmentType}
                />
              ),
            },
            {
              key: "date",
              title: "Scheduled Time",
              sortable: true,
              render: (appointment: Appointment) => (
                <FhirValue type="dateTime" value={appointment.start} />
              ),
            },
            {
              key: "status",
              title: "Status",
              render: (appointment: Appointment) => (
                <FhirValue type="string" value={appointment.status} />
              ),
            },
            {
              key: "participant",
              title: "Provider",
              render: (appointment: Appointment) => (
                <FhirValue
                  type="HumanName"
                  value={
                    (
                      appointment.participant
                        .find((participant: AppointmentParticipant) =>
                          isReferenceOf(participant.actor, "Practitioner"),
                        )
                        // @ts-expect-error see https://github.com/bonfhir/bonfhir/issues/112
                        ?.actor?.included() as Practitioner
                    )?.name
                  }
                />
              ),
            },
            {
              key: "location",
              title: "Location",
              render: (appointment: Appointment) => (
                <FhirValue
                  type="Reference"
                  value={
                    appointment.participant.find((participant) =>
                      isReferenceOf(participant.actor, "Location"),
                    )?.actor
                  }
                />
              ),
            },
          ]}
        />
        <FhirPagination {...query} {...searchController} />
      </FhirQueryLoader>
    </Paper>
  );
}
