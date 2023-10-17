import { Divider, Group, Stack, StackProps, Text, Title } from "@mantine/core";
import { ReactElement } from "react";

export interface TitleDividerProps extends StackProps {
  title: string;
  secondaryText?: string | null | undefined;
}

export function TitleDivider(props: TitleDividerProps): ReactElement {
  const { title, secondaryText, ...stackProps } = props;
  return (
    <Stack gap="0.3rem" {...stackProps}>
      <Group justify="apart">
        <Title order={6}>{title}</Title>
        {secondaryText && <Text size="xs">{secondaryText}</Text>}
      </Group>
      <Divider size="sm" />
    </Stack>
  );
}
