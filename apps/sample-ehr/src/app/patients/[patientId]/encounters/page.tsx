"use client";
import { Encounter, EncounterSortOrder } from "@bonfhir/core/r4b";
import { useFhirSearchController } from "@bonfhir/next/r4b/client";
import { useFhirSearch } from "@bonfhir/query/r4b";
import {
  FhirPagination,
  FhirQueryLoader,
  FhirTable,
  FhirValue,
} from "@bonfhir/react/r4b";
import { Paper, Title } from "@mantine/core";
import { usePatientContext } from "../patient.context";

export default function Appointments() {
  const { patient } = usePatientContext();

  const searchController = useFhirSearchController<EncounterSortOrder>("past", {
    defaultSort: "-date",
    pageSize: 10,
  });
  const encountersQuery = useFhirSearch(
    "Encounter",
    (search) =>
      search
        .patient(patient.id)
        ._total("accurate")
        ._count(searchController.pageSize)
        ._sort(searchController.sort)
        ._include("Appointment", "actor"),
    searchController.pageUrl,
  );

  return (
    <Paper>
      <Title order={3}>Encounters</Title>
      <FhirQueryLoader query={encountersQuery}>
        <FhirTable
          {...encountersQuery}
          {...searchController}
          columns={[
            {
              key: "date",
              title: "Start Time",
              sortable: true,
              render: (encounter: Encounter) => (
                <FhirValue type="dateTime" value={encounter.period?.start} />
              ),
            },
            {
              key: "status",
              title: "Status",
              render: (encounter: Encounter) => (
                <FhirValue type="string" value={encounter.status} />
              ),
            },
            {
              key: "type",
              title: "Type",
              render: (encounter: Encounter) => (
                <FhirValue type="CodeableConcept" value={encounter.type?.[0]} />
              ),
            },
            {
              key: "participants",
              title: "Participants",
              render: (encounter: Encounter) => (
                <>
                  {encounter.participant?.map((participant, index) => (
                    <div key={index}>
                      <FhirValue
                        type="Reference"
                        value={participant.individual}
                      />
                    </div>
                  ))}
                </>
              ),
            },
          ]}
        />
        <FhirPagination {...encountersQuery} {...searchController} />
      </FhirQueryLoader>
    </Paper>
  );
}
