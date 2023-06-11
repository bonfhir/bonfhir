import { Group, Stack, Title } from "@mantine/core";
import { PropsWithChildren, ReactElement, ReactNode } from "react";

export interface MainPageProps extends PropsWithChildren {
  title: string;
  titleRight?: ReactNode;
}

export function MainPage(props: MainPageProps): ReactElement | null {
  return (
    <Stack>
      <Group position="apart">
        <Title>{props.title}</Title>
        {props.titleRight}
      </Group>
      {props.children}
    </Stack>
  );
}
