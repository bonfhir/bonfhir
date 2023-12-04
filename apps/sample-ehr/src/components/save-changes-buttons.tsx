import { Button, ButtonProps, Group, GroupProps } from "@mantine/core";
import { useRouter } from "next/navigation";

export interface SaveChangesButtonsProps {
  cancel?: Partial<ButtonProps> | undefined;
  group?: Partial<GroupProps> | undefined;
  isLoading?: boolean | undefined;
  save?: Partial<ButtonProps> | undefined;
}

export function SaveChangesButtons({
  cancel,
  group,
  save,
}: SaveChangesButtonsProps) {
  const router = useRouter();

  return (
    <Group justify="flex-end" {...group}>
      <Button
        variant="subtle"
        color="red"
        onClick={() => router.back()}
        {...cancel}
      >
        Cancel
      </Button>
      <Button type="submit" {...save}>
        Save
      </Button>
    </Group>
  );
}
