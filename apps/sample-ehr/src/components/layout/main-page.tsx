import { Stack, Title } from "@mantine/core";
import { PropsWithChildren, ReactElement } from "react";

export interface MainPageProps extends PropsWithChildren {
  title: string;
}

export default function MainPage(props: MainPageProps): ReactElement | null {
  return (
    <Stack>
      <Title>{props.title}</Title>
      {props.children}
    </Stack>
  );
}
