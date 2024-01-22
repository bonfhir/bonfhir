import { FhirErrorRendererProps } from "@bonfhir/react/r5";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  ButtonIcon,
  HStack,
  IButtonProps,
  InfoIcon,
  RepeatIcon,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { ComponentProps, ReactElement } from "react";

type AlertProps = ComponentProps<typeof Alert>;

export function GlueStackFhirError(
  props: FhirErrorRendererProps<GlueStackFhirErrorProps>,
): ReactElement | null {
  if (!props.error) {
    return <></>;
  }

  return (
    <Alert style={props.style} action="error" {...props.rendererProps?.alert}>
      <HStack>
        <VStack
          alignItems="flex-start"
          justifyContent="flex-start"
          pt="$1"
          pl="$2"
        >
          <AlertIcon as={InfoIcon} />
        </VStack>
        <VStack px="$4">
          <Text color="red" fontWeight="$bold">
            {props.rendererProps?.titleText ?? "Something went wrong."}
          </Text>
          <Text pt="$2" pb="$3">
            {props.error.message}
          </Text>
          <Box alignItems="flex-start">
            {Boolean(props.onRetry) &&
              (props.rendererProps?.retry?.(props) ?? (
                <Button
                  size="sm"
                  variant="outline"
                  onPress={() => props.onRetry?.()}
                  action="negative"
                  {...props.rendererProps?.retryButton}
                >
                  {props.rendererProps?.retryIcon || (
                    <ButtonIcon as={RepeatIcon} />
                  )}
                </Button>
              ))}
          </Box>
        </VStack>
      </HStack>
    </Alert>
  );
}

export interface GlueStackFhirErrorProps {
  alert?: AlertProps | null | undefined;
  titleText?: string | null | undefined;
  retry?: (
    props: FhirErrorRendererProps<GlueStackFhirErrorProps>,
  ) => ReactElement | null | undefined;
  retryButton?: IButtonProps | null | undefined;
  retryIcon?: ReactElement | null | undefined;
}
