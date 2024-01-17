export const MANTINE_RENDERER_PROPS_CONTENT = `/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MantineFhirErrorProps,
  MantineFhirFormatterProps,
  MantineFhirInputArrayProps,
  MantineFhirInputBooleanProps,
  MantineFhirInputContactPointProps,
  MantineFhirInputDateProps,
  MantineFhirInputDateTimeProps,
  MantineFhirInputDurationProps,
  MantineFhirInputHumanNameProps,
  MantineFhirInputIdentifierProps,
  MantineFhirInputMarkdownProps,
  MantineFhirInputNumberProps,
  MantineFhirInputQuantityProps,
  MantineFhirInputResourceProps,
  MantineFhirInputStringProps,
  MantineFhirInputTerminologyProps,
  MantineFhirInputTimeProps,
  MantineFhirPaginationProps,
  MantineFhirQueryLoaderProps,
  MantineFhirQuestionnaireProps,
  MantineFhirTableProps,
  MantineFhirValueProps,
} from "@bonfhir/mantine/r4b";
import {
  FhirErrorProps,
  FhirFormatterProps,
  FhirInputArrayProps,
  FhirPaginationProps,
  FhirQueryLoaderProps,
  FhirQuestionnaireProps,
  FhirTableProps,
  FhirValueProps,
} from "@bonfhir/react/r4b";

/**
 * This file override the @bonfhir/react/r4b types to add the MantineFhir*Props
 */
declare module "@bonfhir/react/r4b" {
  export function FhirError(
    props: FhirErrorProps<MantineFhirErrorProps>,
  ): ReactElement | null;

  export function FhirFormatter(
    props: FhirFormatterProps<MantineFhirFormatterProps>,
  ): ReactElement | null;

  export function FhirInputArray(
    props: FhirInputArrayProps<MantineFhirInputArrayProps>,
  ): ReactElement | null;

  export function FhirPagination(
    props: FhirPaginationProps<MantineFhirPaginationProps>,
  ): ReactElement | null;

  export function FhirQueryLoader<TData>(
    props: FhirQueryLoaderProps<MantineFhirQueryLoaderProps, TData>,
  ): ReactElement | null;

  export function FhirQuestionnaire(
    props: FhirQuestionnaireProps<MantineFhirQuestionnaireProps>,
  ): ReactElement | null;

  export function FhirQuestionnaire(
    props: FhirQuestionnaireProps<MantineFhirQuestionnaireProps>,
  ): ReactElement | null;

  export function FhirTable<
    TData extends BundleNavigator | any[],
    TRow = TData extends BundleNavigator<infer TResource>
      ? WithResolvableReferences<Retrieved<TResource>>
      : TData extends Array<infer TArrayElement>
        ? TArrayElement
        : any,
  >(
    props: FhirTableProps<TData, MantineFhirTableProps, TRow>,
  ): ReactElement | null;

  export function FhirValue(
    props: FhirValueProps<MantineFhirValueProps>,
  ): ReactElement | null;
}

declare global {
  // FhirInput must be declared globally to properly override the type
  export function FhirInput<
    TResourceType extends AnyResourceType = AnyResourceType,
  >(props: FhirInputProps<TResourceType>): ReactElement | null;

  export type FhirInputProps<
    TResourceType extends AnyResourceType = AnyResourceType,
  > =
    | FhirInputBooleanProps<MantineFhirInputBooleanProps>
    | FhirInputContactPointProps<MantineFhirInputContactPointProps>
    | FhirInputDateProps<MantineFhirInputDateProps>
    | FhirInputDateTimeProps<MantineFhirInputDateTimeProps>
    | FhirInputDurationProps<MantineFhirInputDurationProps>
    | FhirInputHumanNameProps<MantineFhirInputHumanNameProps>
    | FhirInputIdentifierProps<MantineFhirInputIdentifierProps>
    | FhirInputMarkdownProps<MantineFhirInputMarkdownProps>
    | FhirInputNumberProps<MantineFhirInputNumberProps>
    | FhirInputQuantityProps<MantineFhirInputQuantityProps>
    | FhirInputResourceProps<MantineFhirInputResourceProps, TResourceType>
    | FhirInputStringProps<MantineFhirInputStringProps>
    | FhirInputTerminologyProps<MantineFhirInputTerminologyProps>
    | FhirInputTimeProps<MantineFhirInputTimeProps>;
}
`;
