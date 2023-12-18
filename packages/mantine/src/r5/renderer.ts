import { FhirUIRenderer } from "@bonfhir/react/r5";
import {
  MantineFhirFormatter,
  MantineFhirTable,
  MantineFhirValue,
} from "./data-display";
import { MantineFhirError, MantineFhirQueryLoader } from "./feedback";
import {
  MantineFhirInputArray,
  MantineFhirInputBoolean,
  MantineFhirInputContactPoint,
  MantineFhirInputDate,
  MantineFhirInputDateTime,
  MantineFhirInputDuration,
  MantineFhirInputHumanName,
  MantineFhirInputIdentifier,
  MantineFhirInputMarkdown,
  MantineFhirInputNumber,
  MantineFhirInputQuantity,
  MantineFhirInputResource,
  MantineFhirInputString,
  MantineFhirInputTerminology,
  MantineFhirInputTime,
  MantineFhirQuestionnaire,
} from "./inputs";
import { MantineFhirPagination } from "./navigation";

export const MantineRenderer: FhirUIRenderer = {
  FhirError: MantineFhirError,
  FhirFormatter: MantineFhirFormatter,
  FhirInputArray: MantineFhirInputArray,
  FhirInputBoolean: MantineFhirInputBoolean,
  FhirInputContactPoint: MantineFhirInputContactPoint,
  FhirInputDate: MantineFhirInputDate,
  FhirInputDateTime: MantineFhirInputDateTime,
  FhirInputDuration: MantineFhirInputDuration,
  FhirInputHumanName: MantineFhirInputHumanName,
  FhirInputIdentifier: MantineFhirInputIdentifier,
  FhirInputMarkdown: MantineFhirInputMarkdown,
  FhirInputNumber: MantineFhirInputNumber,
  FhirInputQuantity: MantineFhirInputQuantity,
  FhirInputResource: MantineFhirInputResource,
  FhirInputString: MantineFhirInputString,
  FhirInputTerminology: MantineFhirInputTerminology,
  FhirInputTime: MantineFhirInputTime,
  FhirPagination: MantineFhirPagination,
  FhirQueryLoader: MantineFhirQueryLoader,
  FhirQuestionnaire: MantineFhirQuestionnaire,
  FhirTable: MantineFhirTable,
  FhirValue: MantineFhirValue,
};
