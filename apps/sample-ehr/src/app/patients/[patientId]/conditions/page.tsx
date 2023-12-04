"use client";
import { ConditionSortOrder } from "@bonfhir/core/r4b";
import { useFhirSearchControllerNext } from "@bonfhir/next/r4b/client";
import { useFhirSearch } from "@bonfhir/query/r4b";
import {
  FhirPagination,
  FhirQueryLoader,
  FhirTable,
  FhirValue,
} from "@bonfhir/react/r4b";
import { Box, Button, Flex, Paper, Stack, Title } from "@mantine/core";
import { IconChevronRight, IconPlus } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";

export default function Conditions() {
  const params = useParams();
  const router = useRouter();

  const searchController = useFhirSearchControllerNext<ConditionSortOrder>(
    "q",
    {
      pageSize: 10,
      defaultSort: "clinical-status",
    },
  );

  // For pagination to work the total must be requested and
  // the `searchController.pageUrl` must be passed to the search as well
  const conditionsQuery = useFhirSearch(
    "Condition",
    (search) =>
      search
        .patient(params.patientId)
        ._sort(searchController.sort)
        ._count(searchController.pageSize)
        ._total("accurate"),
    searchController.pageUrl,
  );

  return (
    <Paper>
      <Stack>
        <Title order={3}>Conditions</Title>
        <Flex justify={"right"}>
          <Box>
            <Button
              onClick={() =>
                router.push(`/patients/${params.patientId}/conditions/new`)
              }
            >
              <IconPlus />
              Add Condition
            </Button>
          </Box>
        </Flex>
        <Box>
          <FhirQueryLoader query={conditionsQuery}>
            <FhirTable
              {...conditionsQuery}
              {...searchController}
              onRowNavigate={(condition) =>
                `/patients/${params.patientId}/conditions/${condition.id}`
              }
              columns={[
                {
                  key: "condition",
                  title: "Condition",
                  sortable: false,
                  render: (condition) => (
                    <FhirValue
                      type="string"
                      value={condition.code?.coding?.[0]?.display}
                    />
                  ),
                },
                {
                  key: "clinical-status",
                  title: "Condition Status",
                  sortable: true,
                  render: (condition) => (
                    <FhirValue
                      type="string"
                      value={condition.clinicalStatus?.coding?.[0]?.code}
                    />
                  ),
                },
                {
                  key: "onset-date",
                  title: "Onset Date",
                  sortable: true,
                  render: (condition) => (
                    <FhirValue
                      type="dateTime"
                      value={condition.onsetDateTime}
                    />
                  ),
                },
                {
                  key: "recorded-by",
                  title: "Recorded By",
                  sortable: false,
                  render: (condition) => (
                    <FhirValue
                      type="string"
                      value={condition.recorder?.display}
                    />
                  ),
                },
                {
                  key: "recorded-date",
                  title: "Recorded At",
                  sortable: false,
                  render: (condition) => (
                    <FhirValue type="dateTime" value={condition.recordedDate} />
                  ),
                },
                {
                  key: "arrow-icon",
                  title: "",
                  sortable: false,
                  render: () => <IconChevronRight />,
                },
              ]}
            />
            <FhirPagination {...conditionsQuery} {...searchController} />
          </FhirQueryLoader>
        </Box>
      </Stack>
    </Paper>
  );
}
