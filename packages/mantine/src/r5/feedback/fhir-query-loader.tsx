import {
  FhirError,
  FhirErrorProps,
  FhirQueryLoaderRendererProps,
} from "@bonfhir/react/r5";
import {
  Center,
  CenterProps,
  Loader,
  LoaderProps,
  Stack,
  StackProps,
} from "@mantine/core";
import { ReactElement } from "react";

export function MantineFhirQueryLoader(
  props: FhirQueryLoaderRendererProps<MantineFhirQueryLoaderProps>,
): ReactElement | null {
  if (props.isLoading) {
    return (
      <Stack className={props.className} {...props.rendererProps?.stack}>
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
      <Stack className={props.className} {...props.rendererProps?.stack}>
        {props.errors.map((error, index) =>
          props.error ? (
            props.error(error)
          ) : (
            <FhirError
              key={index}
              error={error}
              onRetry={
                props.allowRetry == undefined || props.allowRetry
                  ? () => props.retry()
                  : undefined
              }
              {...props.rendererProps?.error}
            />
          ),
        )}
      </Stack>
    );
  }

  return (
    <Stack className={props.className} {...props.rendererProps?.stack}>
      {props.children}
    </Stack>
  );
}

export interface MantineFhirQueryLoaderProps {
  stack?: StackProps | null | undefined;
  center?: CenterProps | null | undefined;
  loader?: LoaderProps | null | undefined;
  error?: FhirErrorProps | null | undefined;
}
