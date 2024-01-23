import {
  FhirError,
  FhirErrorProps,
  FhirQueryLoaderRendererProps,
} from "@bonfhir/react/r4b";
import { Box, Center, Spinner } from "@gluestack-ui/themed";
import { ComponentProps, ReactElement } from "react";

type BoxProps = ComponentProps<typeof Box>;
type CenterProps = ComponentProps<typeof Center>;
type SpinnerProps = ComponentProps<typeof Spinner>;

export function GlueStackFhirQueryLoader(
  props: FhirQueryLoaderRendererProps<GlueStackFhirQueryLoaderProps>,
): ReactElement | null {
  if (props.isLoading) {
    return (
      <Center style={props.style} {...props.rendererProps?.center}>
        {props.loader || (
          <Spinner size="large" {...props.rendererProps?.spinner} />
        )}
      </Center>
    );
  }

  if (props.isError) {
    console.error(props.errors);
    return (
      <Box style={props.style} {...props.rendererProps?.box}>
        {props.errors.map((error, index) =>
          props.error ? (
            props.error(error)
          ) : (
            <FhirError
              key={index}
              error={error}
              onRetry={
                props.allowRetry === undefined || props.allowRetry
                  ? () => props.retry()
                  : undefined
              }
              {...props.rendererProps?.error}
            />
          ),
        )}
      </Box>
    );
  }

  return (
    <Box style={props.style} {...props.rendererProps?.box}>
      {props.children}
    </Box>
  );
}

export interface GlueStackFhirQueryLoaderProps {
  box?: BoxProps | null | undefined;
  center?: CenterProps | null | undefined;
  spinner?: SpinnerProps | null | undefined;
  error?: FhirErrorProps | null | undefined;
}
