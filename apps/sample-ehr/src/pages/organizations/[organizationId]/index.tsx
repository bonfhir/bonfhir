import { MainPage, NavButton } from "@/components";
import { useFhirRead } from "@bonfhir/query/r4b";
import { FhirQueryLoader, FhirValue } from "@bonfhir/ui/r4b";
import { Paper, Stack, Title } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function Organization() {
  const router = useRouter();
  const { organizationId } = router.query as { organizationId: string };
  const organizationQuery = useFhirRead("Organization", organizationId);

  return (
    <MainPage
      title="Organizations"
      titleRight={
        <NavButton
          target={`/organizations/${organizationId}/edit`}
          variant="outline"
          leftIcon={<IconEdit size="1rem" />}
        >
          Edit
        </NavButton>
      }
    >
      <FhirQueryLoader query={organizationQuery}>
        {(org) => (
          <Paper>
            <Stack>
              <Title order={3}>
                <FhirValue type="string" value={org.name} />
              </Title>
            </Stack>
          </Paper>
        )}
      </FhirQueryLoader>
    </MainPage>
  );
}
