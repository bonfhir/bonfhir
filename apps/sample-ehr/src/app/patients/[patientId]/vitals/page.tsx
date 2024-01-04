"use client";
import {
  BundleNavigator,
  Observation,
  ObservationSortOrder,
} from "@bonfhir/core/r4b";
import { MantineFhirTableProps } from "@bonfhir/mantine/r4b";
import { useFhirSearchController } from "@bonfhir/next/r4b/client";
import { useFhirSearch } from "@bonfhir/query/r4b";
import {
  FhirPagination,
  FhirQueryLoader,
  FhirTable,
  FhirValue,
} from "@bonfhir/react/r4b";
import { Grid, Paper, Title } from "@mantine/core";
import { usePatientContext } from "../patient.context";

export default function Vitals() {
  const { patient } = usePatientContext();

  const searchController = useFhirSearchController<ObservationSortOrder>(
    "search",
    {
      pageSize: 5,
    },
  );

  const vitalsQuery = useFhirSearch(
    "Observation",
    (search) =>
      search
        .category("vital-signs")
        .patient(patient)
        ._sort("-date")
        ._count(searchController.pageSize)
        ._total("accurate"),
    searchController.pageUrl,
  );

  return (
    <Paper>
      <Title order={3}>Vitals</Title>
      <Grid>
        <Grid.Col span="auto">
          <Paper mih="100%">
            <FhirQueryLoader query={vitalsQuery}>
              <FhirTable<BundleNavigator<Observation>, MantineFhirTableProps>
                {...searchController}
                {...vitalsQuery}
                rendererProps={{
                  td() {
                    return { style: { width: 200 } };
                  },
                }}
                columns={[
                  {
                    key: "status",
                    title: "Status",
                    sortable: true,
                    render: (row) => (
                      <FhirValue type="string" value={row.status} />
                    ),
                  },
                  {
                    key: "code",
                    title: "Code",
                    sortable: true,
                    render: (row) => (
                      <FhirValue type="CodeableConcept" value={row.code} />
                    ),
                  },
                  {
                    key: "effectiveDateTime",
                    title: "Effective Date Time",
                    sortable: true,
                    render: (row) => (
                      <FhirValue
                        type="dateTime"
                        value={row.effectiveDateTime}
                      />
                    ),
                  },
                ]}
              />
              <FhirPagination {...vitalsQuery} {...searchController} />
            </FhirQueryLoader>
          </Paper>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
