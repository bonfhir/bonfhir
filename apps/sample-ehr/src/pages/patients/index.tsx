import { useFhirSearch } from "@bonfhir/query/r4b";
import { FhirValue } from "@bonfhir/ui/r4b";
import { Title } from "@mantine/core";

export default function Patients() {
  const patients = useFhirSearch("Patient", (search) =>
    search._include("Patient", "organization")._total("accurate")
  );

  return (
    <>
      <Title>Patients</Title>
      <ul>
        {patients.data?.type("Patient").map((patient) => (
          <li key={patient.id}>
            <FhirValue type="HumanName" value={patient.name} /> (
            <FhirValue
              type="string"
              value={patient.managingOrganization?.included?.name}
            />
            )
          </li>
        ))}
      </ul>
    </>
  );
}
