import {
  AnyResource,
  Retrieved,
  WithResolvableReferences,
} from "@bonfhir/core/r5";
import { FhirTableProps, FhirValueProps } from "./data-display/index";
import { FhirErrorProps, FhirQueryLoaderProps } from "./feedback/index";
import {
  FhirInputArrayProps,
  FhirInputProps,
  FhirQuestionnaireProps,
} from "./inputs/index";
import { FhirPaginationProps } from "./navigation/index";

export interface FhirUIDefaultProps {
  FhirError?:
    | Partial<FhirErrorProps>
    | ((props: FhirErrorProps) => FhirErrorProps)
    | null
    | undefined;
  FhirInput?:
    | Partial<FhirInputProps>
    | ((props: FhirInputProps) => FhirInputProps)
    | null
    | undefined;
  FhirInputArray?:
    | Partial<FhirInputArrayProps<any, any>>
    | ((props: FhirInputArrayProps<any, any>) => FhirInputArrayProps<any, any>)
    | null
    | undefined;
  FhirPagination?:
    | Partial<FhirPaginationProps>
    | ((props: FhirPaginationProps) => FhirPaginationProps)
    | null
    | undefined;
  FhirQueryLoader?:
    | Partial<FhirQueryLoaderProps<any, any>>
    | ((
        props: FhirQueryLoaderProps<any, any>,
      ) => FhirQueryLoaderProps<any, any>)
    | null
    | undefined;
  FhirQuestionnaire?:
    | Partial<FhirQuestionnaireProps>
    | ((props: FhirQuestionnaireProps) => FhirQuestionnaireProps)
    | null
    | undefined;
  FhirTable?:
    | Partial<
        FhirTableProps<
          AnyResource,
          any,
          WithResolvableReferences<Retrieved<AnyResource>>
        >
      >
    | ((
        props: FhirTableProps<
          AnyResource,
          any,
          WithResolvableReferences<Retrieved<AnyResource>>
        >,
      ) => FhirTableProps<
        AnyResource,
        any,
        WithResolvableReferences<Retrieved<AnyResource>>
      >)
    | null
    | undefined;
  FhirValue?:
    | Partial<FhirValueProps>
    | ((props: FhirValueProps) => FhirValueProps)
    | null
    | undefined;
}
