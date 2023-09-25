import { FhirErrorRendererProps } from "@bonfhir/react/r4b";
import {
  ActionIcon,
  ActionIconProps,
  Alert,
  AlertProps,
  Stack,
} from "@mantine/core";
import { IconAlertCircle, IconReload } from "@tabler/icons-react";
import { ReactElement } from "react";

export function MantineFhirError(
  props: FhirErrorRendererProps<MantineFhirErrorProps>,
): ReactElement | null {
  if (!props.error) {
    return null;
  }

  return (
    <Alert
      className={props.className}
      icon={<IconAlertCircle size="1rem" />}
      title={props.rendererProps?.titleText ?? "Something went wrong."}
      color="red"
      {...props.rendererProps?.alert}
    >
      <Stack>
        {props.error.message}
        {Boolean(props.onRetry) &&
          (props.rendererProps?.retry?.(props) ?? (
            <ActionIcon
              color="red"
              variant="outline"
              onClick={() => props.onRetry?.()}
              title="Retry"
              {...props.rendererProps?.retryActionIcon}
            >
              {props.rendererProps?.retryIcon || <IconReload />}
            </ActionIcon>
          ))}
      </Stack>
    </Alert>
  );
}

export interface MantineFhirErrorProps {
  alert?: AlertProps | null | undefined;
  titleText?: string | null | undefined;
  retry?: (
    props: FhirErrorRendererProps<MantineFhirErrorProps>,
  ) => ReactElement | null | undefined;
  retryActionIcon?: ActionIconProps | null | undefined;
  retryIcon?: ReactElement | null | undefined;
}
