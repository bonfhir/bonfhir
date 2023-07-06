import { FhirQueryLoaderRendererProps } from "@bonfhir/ui/r5";
import {
  ActionIcon,
  ActionIconProps,
  Alert,
  Center,
  CenterProps,
  Loader,
  LoaderProps,
  Stack,
  StackProps,
} from "@mantine/core";
import { IconAlertCircle, IconReload } from "@tabler/icons-react";
import { ReactElement } from "react";

export function MantineFhirQueryLoader(
  props: FhirQueryLoaderRendererProps<MantineFhirQueryLoaderProps>,
): ReactElement | null {
  if (props.isLoading) {
    return (
      <Stack {...props.rendererProps?.stack}>
        {props.loader || (
          <Center {...props.rendererProps?.center}>
            <Loader {...props.rendererProps?.loader} />
          </Center>
        )}
      </Stack>
    );
  }

  if (props.isError) {
    console.error(props.errors);
    return (
      <Stack {...props.rendererProps?.stack}>
        {props.errors.map((error, index) =>
          props.error ? (
            props.error(error)
          ) : (
            <Alert
              key={index}
              icon={<IconAlertCircle size="1rem" />}
              title="Something went wrong."
              color="red"
            >
              <Stack>
                {error.message}
                {(props.allowRetry == undefined || props.allowRetry) && (
                  <ActionIcon
                    color="red"
                    variant="outline"
                    onClick={() => props.retry()}
                    title="Retry"
                    {...props.rendererProps?.retryActionIcon}
                  >
                    {props.rendererProps?.retryIcon || <IconReload />}
                  </ActionIcon>
                )}
              </Stack>
            </Alert>
          ),
        )}
      </Stack>
    );
  }

  return <Stack {...props.rendererProps?.stack}>{props.children}</Stack>;
}

export interface MantineFhirQueryLoaderProps {
  stack?: StackProps | null | undefined;
  center?: CenterProps | null | undefined;
  loader?: LoaderProps | null | undefined;
  retryActionIcon?: ActionIconProps | null | undefined;
  retryIcon?: Element | null | undefined;
}
