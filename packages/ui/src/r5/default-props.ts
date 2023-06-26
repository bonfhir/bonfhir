import {
  AnyResource,
  Retrieved,
  WithResolvableReferences,
} from "@bonfhir/core/r5";
import { FhirTableProps, FhirValueProps } from "./data-display/index.js";
import { FhirQueryLoaderProps } from "./feedback/index.js";
import { FhirInputArrayProps, FhirInputProps } from "./inputs/index.js";
import { FhirPaginationProps } from "./navigation/index.js";

export interface FhirUIDefaultProps {
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
    | Partial<FhirQueryLoaderProps>
    | ((props: FhirQueryLoaderProps) => FhirQueryLoaderProps)
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
        >
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
