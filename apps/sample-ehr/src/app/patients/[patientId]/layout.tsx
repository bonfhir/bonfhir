"use client";
import { useFhirRead } from "@bonfhir/query/r4b";
import { FhirQueryLoader, useFhirUIContext } from "@bonfhir/react/r4b";
import { Space, Stack, Tabs } from "@mantine/core";
import {
  IconActivity,
  IconCalendar,
  IconClipboardText,
  IconPill,
  IconStethoscope,
  IconUser,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import PatientInfo from "./patient-info";
import { PatientContext } from "./patient.context";

const tabs = [
  {
    title: "Overview",
    value: "overview",
    icon: IconUser,
  },
  {
    title: "Appointments",
    value: "appointments",
    icon: IconCalendar,
  },
  {
    title: "Conditions",
    value: "conditions",
    icon: IconStethoscope,
  },
  {
    title: "Medications",
    value: "medications",
    icon: IconPill,
  },
  {
    title: "Vitals",
    value: "vitals",
    icon: IconActivity,
  },
  {
    title: "Encounters",
    value: "encounters",
    icon: IconClipboardText,
  },
];

export default function PatientLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();

  const { formatter } = useFhirUIContext();
  const patientId = pathname?.split("/")?.[2];
  const activeTab = pathname.split("/")?.[3] || tabs[0].value;

  const patientQuery = useFhirRead("Patient", patientId!, {
    query: {
      enabled: Boolean(patientId),
      onSuccess(patient) {
        if (patient) {
          document.title = formatter.format("HumanName", patient.name, {
            max: 1,
          });
        }
      },
    },
  });

  return (
    <FhirQueryLoader query={patientQuery}>
      {(patient) => (
        <PatientContext.Provider value={{ patient }}>
          {tabs.map((tab) => tab.value).includes(activeTab) ? (
            <Stack>
              <PatientInfo patient={patient} />
              <Tabs
                value={activeTab}
                onChange={(tab) =>
                  router.push(
                    tab === "overview"
                      ? `/patients/${patientId}`
                      : `/patients/${patientId}/${tab}`,
                  )
                }
              >
                <Tabs.List>
                  {tabs.map((tab) => (
                    <Tabs.Tab
                      key={tab.value}
                      leftSection={<tab.icon size="0.8rem" />}
                      value={tab.value}
                    >
                      {tab.title}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
                <Space h="md" />
                {children}
              </Tabs>
            </Stack>
          ) : (
            children
          )}
        </PatientContext.Provider>
      )}
    </FhirQueryLoader>
  );
}
