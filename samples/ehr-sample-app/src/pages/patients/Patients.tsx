import { SortOrderPatient } from "@bonfhir/core/r4b";
import { useFhirSearch } from "@bonfhir/fhir-query/r4b";
import { ValueSetURIs } from "@bonfhir/terminology/r4b";
import {
  FhirTable,
  FhirValue,
  useDebounce,
  useFhirTable,
} from "@bonfhir/ui-components/r4b";
import {
  Divider,
  TableColumnProps as AntdTableColumnProps,
  TableProps as AntdTableProps,
  Typography,
} from "antd";
import { Patient } from "fhir/r4";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Page } from "../../components/Page";

export function Patients(): ReactElement | null {
  interface SearchParams {
    patientName: string;
  }

  const navigate = useNavigate();

  const { register, watch } = useForm<SearchParams>();

  const watchDebounced = useDebounce(watch());

  const fhirTable = useFhirTable<SortOrderPatient, SearchParams>({
    key: "patient-list",
    pageSize: 5,
    defaultSort: "name",
    searchParams: watchDebounced,
  });

  const patientsQuery = useFhirSearch(
    "Patient",
    (search) =>
      search
        .name(fhirTable.searchParams?.patientName)
        ._count(fhirTable.pageSize)
        ._sort(fhirTable.sort!)
        ._total("accurate"),
    fhirTable.pageUrl
  );

  return (
    <Page>
      <Typography.Title>Patients</Typography.Title>
      <Divider />
      <input placeholder="Search by name" {...register("patientName")} />
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
