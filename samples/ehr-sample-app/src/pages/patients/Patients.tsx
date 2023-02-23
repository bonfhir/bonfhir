import { useFhirSearch } from "@bonfhir/fhir-query/r4b";
import { FhirTable, FhirValue, useFhirTable } from "@bonfhir/ui-components/r4b";
import { TableProps as AntdTableProps, Typography } from "antd";
import { Patient } from "fhir/r4";
import { ReactElement } from "react";
import { useNavigate } from "react-router";
import { Page } from "../../components/Page";

export function Patients(): ReactElement | null {
  const navigate = useNavigate();

  const fhirTable = useFhirTable({
    pageSize: 5,
    restoreKey: "patient-list",
  });

  const patientsQuery = useFhirSearch(
    "Patient",
    (search) => search._count(fhirTable.pageSize)._total("accurate"),
    fhirTable.pageUrl
  );

  return (
    <Page>
      <Typography.Title>Patients</Typography.Title>
      <FhirTable<Patient, Patient, AntdTableProps<Patient>>
        query={patientsQuery}
        querySelect={(result) => result.nav.type("Patient")}
        columns={[
          {
            title: "Name",
            render: (patient) =>
              `${patient.name?.[0]?.given?.[0]} ${patient.name?.[0]?.family}`,
          },
          {
            title: "Gender",
            render: (patient) => (
              <FhirValue
                type="code"
                value={patient.gender}
                options={{
                  valueSetExpand: {
                    url: "http://hl7.org/fhir/ValueSet/administrative-gender",
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
