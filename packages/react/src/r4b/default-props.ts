import {
  FhirFormatterProps,
  FhirTableProps,
  FhirValueProps,
} from "./data-display";
import { FhirErrorProps, FhirQueryLoaderProps } from "./feedback";
import {
  FhirInputArrayProps,
  FhirInputProps,
  FhirInputResourceSelectorProps,
  FhirQuestionnaireProps,
} from "./inputs";
import { FhirInfiniteMarkerProps, FhirPaginationProps } from "./navigation";

export interface FhirUIDefaultProps {
  FhirError?:
    | Partial<FhirErrorProps>
    | ((props: FhirErrorProps) => FhirErrorProps)
    | null
    | undefined;
  FhirFormatter?:
    | Partial<FhirFormatterProps>
    | ((props: FhirFormatterProps) => FhirFormatterProps)
    | null
    | undefined;
  FhirInfiniteMarker?:
    | Partial<FhirInfiniteMarkerProps>
    | ((props: FhirInfiniteMarkerProps) => FhirInfiniteMarkerProps)
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
  FhirInputResourceSelector?:
    | Partial<FhirInputResourceSelectorProps>
    | ((
        props: FhirInputResourceSelectorProps,
      ) => FhirInputResourceSelectorProps)
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
    | Partial<FhirTableProps<any, any, any>>
    | ((props: FhirTableProps<any, any, any>) => FhirTableProps<any, any, any>)
    | null
    | undefined;
  FhirValue?:
    | Partial<FhirValueProps>
    | ((props: FhirValueProps) => FhirValueProps)
    | null
    | undefined;
}
