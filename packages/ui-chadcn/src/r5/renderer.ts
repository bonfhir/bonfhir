import { FhirUIRenderer } from "@bonfhir/ui/r5";
import { ShadcnFhirTable, ShadcnFhirValue } from "./data-display/index";
import { ShadcnFhirError, ShadcnFhirQueryLoader } from "./feedback/index";
import {
  ShadcnFhirInputArray,
  ShadcnFhirInputBoolean,
  ShadcnFhirInputContactPoint,
  ShadcnFhirInputDate,
  ShadcnFhirInputDateTime,
  ShadcnFhirInputHumanName,
  ShadcnFhirInputIdentifier,
  ShadcnFhirInputMarkdown,
  ShadcnFhirInputNumber,
  ShadcnFhirInputResource,
  ShadcnFhirInputString,
  ShadcnFhirInputTerminology,
  ShadcnFhirInputTime,
  ShadcnFhirQuestionnaire,
} from "./inputs/index";
import { ShadcnFhirPagination } from "./navigation/index";

export const ShadCnRenderer: FhirUIRenderer = {
  FhirError: ShadcnFhirError,
  FhirInputArray: ShadcnFhirInputArray,
  FhirInputBoolean: ShadcnFhirInputBoolean,
  FhirInputContactPoint: ShadcnFhirInputContactPoint,
  FhirInputDate: ShadcnFhirInputDate,
  FhirInputDateTime: ShadcnFhirInputDateTime,
  FhirInputHumanName: ShadcnFhirInputHumanName,
  FhirInputIdentifier: ShadcnFhirInputIdentifier,
  FhirInputMarkdown: ShadcnFhirInputMarkdown,
  FhirInputNumber: ShadcnFhirInputNumber,
  FhirInputResource: ShadcnFhirInputResource,
  FhirInputString: ShadcnFhirInputString,
  FhirInputTerminology: ShadcnFhirInputTerminology,
  FhirInputTime: ShadcnFhirInputTime,
  FhirPagination: ShadcnFhirPagination,
  FhirQueryLoader: ShadcnFhirQueryLoader,
  FhirQuestionnaire: ShadcnFhirQuestionnaire,
  FhirTable: ShadcnFhirTable,
  FhirValue: ShadcnFhirValue,
};
