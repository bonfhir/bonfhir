import { SortOrderPatient } from "@bonfhir/core/r4b";
import { useFhirSearch } from "@bonfhir/fhir-query/r4b";
import { ValueSetURIs } from "@bonfhir/terminology/r4b";
import {
  FhirInput,
  FhirTable,
  FhirValue,
  useDebounce,
  useFhirTable,
} from "@bonfhir/ui-components/r4b";
import {
  Divider,
  InputProps as AntdInputProps,
  TableColumnProps as AntdTableColumnProps,
  TableProps as AntdTableProps,
  Typography,
} from "antd";
import { Patient } from "fhir/r4";
import { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Page } from "../../components/Page";

export function Patients(): ReactElement | null {
  interface SearchParams {
    patientName: string;
  }

  const navigate = useNavigate();

  const fhirTable = useFhirTable<SortOrderPatient, SearchParams>({
    key: "patient-list",
    pageSize: 5,
    defaultSort: "name",
  });

  const { control, watch } = useForm<SearchParams>({
    defaultValues: fhirTable.search,
  });

  const watchDebounced = useDebounce(watch());

  useEffect(() => {
    fhirTable.onSearch(watchDebounced);
  }, [watchDebounced]);

  const patientsQuery = useFhirSearch(
    "Patient",
    (search) =>
      search
        .name(fhirTable.search?.patientName)
        ._count(fhirTable.pageSize)
        ._sort(fhirTable.sort!)
        ._total("accurate"),
    fhirTable.pageUrl
  );

  return (
    <Page>
      <Typography.Title>Patients</Typography.Title>
      <Divider />
      <FhirInput<AntdInputProps, SearchParams>
        control={control}
        name="patientName"
        placeholder="Search by patient name"
      />
      <Divider />
      <FhirTable<
        Patient,
        Patient,
        AntdTableProps<Patient>,
        AntdTableColumnProps<Patient>
      >
        query={patientsQuery}
        querySelect={(result) => result.nav.type("Patient")}
        columns={[
          {
            key: "name",
            title: "Name",
            sortable: true,
            render: (patient) =>
              `${patient.name?.[0]?.given?.[0]} ${patient.name?.[0]?.family}`,
          },
          {
            key: "gender",
            title: "Gender",
            sortable: true,
            render: (patient) => (
              <FhirValue
                type="code"
                value={patient.gender}
                options={{
                  valueSetExpand: {
                    url: ValueSetURIs.AdministrativeGender,
                  },
                }}
              />
            ),
          },
        ]}
        {...fhirTable}
        onRow={(patient) => {
          return {
            onClick: () => navigate(`/patients/${patient.id}`),
          };
        }}
      />
    </Page>
  );
}
