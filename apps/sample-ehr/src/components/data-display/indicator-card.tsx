import { ActionIcon, Card, CardProps, Group, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { MouseEventHandler, ReactElement } from "react";

export interface IndicatorCardProps
  extends Omit<CardProps, "children" | "onClick"> {
  title: string;
  value: number | string;
  size?: "main" | "secondary" | undefined;
  kind?: "neutral" | "high" | "medium" | "low" | undefined;
  onClick?: MouseEventHandler<HTMLElement> | undefined;
}

export function IndicatorCard(props: IndicatorCardProps): ReactElement {
  const { title, value, size, kind, onClick, ...cardProps } = props;
  let color = "#E9EFF4";
  switch (kind) {
    case "high": {
      color = "#F9D3D4";
      break;
    }
    case "medium": {
      color = "#FFE1BE";
      break;
    }
    case "low": {
      color = "#D6F3E2";
      break;
    }
  }
  return (
    <Card
      padding="sm"
      bg={color}
      miw={150}
      onClick={onClick}
      style={{
        cursor: onClick ? "pointer" : "default",
      }}
      {...cardProps}
    >
      <Group position="apart">
        <Text fz="xs" fw={500}>
          {title}
        </Text>
        {onClick && (
          <ActionIcon size="sm" variant="transparent">
            <IconChevronRight />
          </ActionIcon>
        )}
      </Group>
      <Text fz={size === "secondary" ? 16 : 30} fw={700}>
        {value}
      </Text>
    </Card>
  );
}
