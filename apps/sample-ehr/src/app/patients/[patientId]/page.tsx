"use client";
import { Condition, Task } from "@bonfhir/core/r4b";
import { useFhirSearch } from "@bonfhir/query/r4b";
import { FhirValue } from "@bonfhir/react/r4b";
import {
  ActionIcon,
  Button,
  Divider,
  Flex,
  Paper,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import {
  IconCalendar,
  IconChevronRight,
  IconClipboardText,
  IconExternalLink,
} from "@tabler/icons-react";
import { FC, ReactNode } from "react";
import { usePatientContext } from "./patient.context";

type TODOType =
  | "flagged-messages"
  | "lab-and-studies"
  | "open-encounter-notes"
  | "tentative-appointments";

const groupTasks = (tasks: Task[]): Record<TODOType, Task[]> => {
  const groups: Record<TODOType, Task[]> = {
    "flagged-messages": [],
    "lab-and-studies": [],
    "open-encounter-notes": [],
    "tentative-appointments": [],
  };

  const hasCode = (task: Task, code: string) =>
    task.code?.coding?.some((c) => c.code === code);

  for (const task of tasks) {
    if (hasCode(task, "flagged-messages")) {
      groups["flagged-messages"].push(task);
    } else if (hasCode(task, "lab-and-studies")) {
      groups["lab-and-studies"].push(task);
    } else if (hasCode(task, "open-encounter-notes")) {
      groups["open-encounter-notes"].push(task);
    } else if (hasCode(task, "tentative-appointments")) {
      groups["tentative-appointments"].push(task);
    }
  }
  return groups;
};

export default function Overview() {
  const { patient } = usePatientContext();

  const { data } = useFhirSearch("Appointment", (search) =>
    search.patient(patient.id)._sort("-_lastUpdated")._count(5),
  );

  const appointments = data?.bundle.entry?.map((entry) => entry.resource);
  const firstAppointment = appointments?.[0];

  const locationRef = firstAppointment?.participant
    ?.filter((p) => p.actor?.reference?.includes("Location"))
    .map((p) => p.actor)[0];

  const location = useFhirSearch("Location", (search) =>
    search._id(locationRef?.reference),
  ).data?.bundle.entry?.map((entry) => entry.resource)[0];

  const conditions = useFhirSearch("Condition", (search) =>
    search.patient(patient.id).clinicalStatus({ value: "active" }),
  ).data?.bundle.entry?.map((entry) => entry.resource);

  const tasks = useFhirSearch("Task", (search) =>
    search.patient(patient.id).status({ value: "in-progress,ready" }),
  ).data?.bundle.entry?.map((entry) => entry.resource);

  const groupedTasks = groupTasks((tasks as Task[]) ?? []);

  return (
    <Flex direction={"row"} gap={20}>
      <Paper style={{ flexGrow: 2 }}>
        <Flex direction={"column"} gap={20}>
          <Title order={3}>Upcoming appointment</Title>
          <Flex direction={"column"} gap={8}>
            <ViewInfo
              label="Appointment type"
              value={
                <FhirValue
                  type="CodeableConcept"
                  value={firstAppointment?.appointmentType}
                />
              }
            />
            <ViewInfo
              label="Scheduled time"
              value={
                <FhirValue type="instant" value={firstAppointment?.start} />
              }
            />
            <ViewInfo
              label="Status"
              value={<FhirValue type="code" value={firstAppointment?.status} />}
            />
            {location && <ViewInfo label="Location" value={location.name} />}
          </Flex>
          <Flex direction="row" gap={16}>
            <Button leftSection={<IconCalendar />} variant="outline">
              View Appointment
            </Button>
            <Button leftSection={<IconClipboardText />} variant="outline">
              View Notes
            </Button>
          </Flex>
        </Flex>
      </Paper>
      <Paper style={{ flexGrow: 2 }}>
        <Title order={3}>Recent active conditions</Title>
        <Flex direction="column">
          {(conditions ?? []).map((condition, index) => (
            <div key={(condition as Condition).id}>
              <ConditionRow condition={condition as Condition} />
              {(conditions?.length ?? 0) > index + 1 && (
                <Divider
                  key={index}
                  style={{ marginTop: 16, marginBottom: 16 }}
                />
              )}
            </div>
          ))}
        </Flex>
      </Paper>
      <Paper style={{ flexGrow: 1 }} p={"lg"}>
        <Title order={3}>Patient to-dos</Title>
        <Flex direction="column">
          <Divider style={{ marginTop: 16, marginBottom: 16 }} />
          <ToDoRow
            title="Flagged messages"
            count={groupedTasks["flagged-messages"].length}
          />
          <Divider style={{ marginTop: 16, marginBottom: 16 }} />
          <ToDoRow
            title="Labs and studies"
            count={groupedTasks["lab-and-studies"].length}
          />
          <Divider style={{ marginTop: 16, marginBottom: 16 }} />
          <ToDoRow
            title="Open encounter notes"
            count={groupedTasks["open-encounter-notes"].length}
          />
          <Divider style={{ marginTop: 16, marginBottom: 16 }} />
          <ToDoRow
            title="Tentative appointments"
            count={groupedTasks["tentative-appointments"].length}
          />
          <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        </Flex>
      </Paper>
    </Flex>
  );
}

interface ViewInfoProps {
  label: string;
  value: ReactNode;
}

const ViewInfo: FC<ViewInfoProps> = ({ label, value }) => {
  return (
    <Flex direction={"row"} gap={8}>
      <Text fw={600} c="neutral.8">
        {label}:
      </Text>
      <div>{value}</div>
    </Flex>
  );
};

interface ConditionRowProps {
  condition: Condition;
}

const ConditionRow: FC<ConditionRowProps> = ({ condition }) => {
  return (
    <Flex direction="column" gap={8}>
      <UnstyledButton>
        <Flex direction="row" gap={8} align="center">
          <Text fw={600} c="neutral.8" td="underline">
            <FhirValue type="CodeableConcept" value={condition.code} />
          </Text>
          <IconExternalLink size={16} />
        </Flex>
      </UnstyledButton>

      <Flex direction="row" gap={8}>
        <Text fw={600} c="neutral.8">
          Onset date:
        </Text>
        <FhirValue type="instant" value={condition.onsetDateTime} />
      </Flex>
    </Flex>
  );
};

interface ToDoRowProps {
  title: string;
  count: number;
}

const ToDoRow: FC<ToDoRowProps> = ({ title, count }) => {
  return (
    <Flex direction="row" gap={16} style={{ flexGrow: 1 }} align={"center"}>
      <Text fw={400} style={{ flexGrow: 1 }}>
        {title}
      </Text>
      <Text>{count}</Text>
      <ActionIcon size={34} bg={count > 0 ? "primary.1" : "#fff"}>
        <IconChevronRight size={16} color="#1C7ED6" />
      </ActionIcon>
    </Flex>
  );
};
