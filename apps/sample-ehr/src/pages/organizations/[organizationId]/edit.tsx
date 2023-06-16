import { MainPage } from "@/components";
import { useFhirResourceForm } from "@bonfhir/ui-mantine/r4b";
import { FhirInput } from "@bonfhir/ui/r4b";
import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  Paper,
  Stack,
} from "@mantine/core";
import { useRouter } from "next/router";

export default function EditOrganization() {
  const router = useRouter();
  const { organizationId } = router.query as { organizationId: "new" | string };
  const newOrganization = organizationId === "new";

  const form = useFhirResourceForm({
    type: "Organization",
    id: organizationId,
    mutationOptions: {
      onSuccess(data) {
        router.push(`/organizations/${data.id}`);
      },
    },
  });

  return (
    <MainPage
      title={newOrganization ? `New Organization` : `Edit Organization`}
    >
      <Paper>
        <form onSubmit={form.onSubmit}>
          <LoadingOverlay visible={form.query.isInitialLoading} />
          <Box maw={800}>
            <Stack>
              <FhirInput
                type="string"
                label="Name"
                {...form.getInputProps("name")}
              />
              <Group mt="md">
                <Button type="submit" loading={form.mutation.isLoading}>
                  Save
                </Button>
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </Group>
            </Stack>
          </Box>
        </form>
      </Paper>
    </MainPage>
  );
}
