import { FhirUIRenderer } from "@bonfhir/ui/r4b";
import { MantineFhirTable, MantineFhirValue } from "./data-display/index";
import { MantineFhirError, MantineFhirQueryLoader } from "./feedback/index";
import {
  MantineFhirInputArray,
  MantineFhirInputBoolean,
  MantineFhirInputContactPoint,
  MantineFhirInputDate,
  MantineFhirInputDateTime,
  MantineFhirInputHumanName,
  MantineFhirInputIdentifier,
  MantineFhirInputMarkdown,
  MantineFhirInputNumber,
  MantineFhirInputResource,
  MantineFhirInputString,
  MantineFhirInputTerminology,
  MantineFhirInputTime,
  MantineFhirQuestionnaire,
} from "./inputs/index";
import { MantineFhirPagination } from "./navigation/index";

export const MantineRenderer: FhirUIRenderer = {
  FhirError: MantineFhirError,
  FhirInputArray: MantineFhirInputArray,
  FhirInputBoolean: MantineFhirInputBoolean,
  FhirInputContactPoint: MantineFhirInputContactPoint,
  FhirInputDate: MantineFhirInputDate,
  FhirInputDateTime: MantineFhirInputDateTime,
  FhirInputHumanName: MantineFhirInputHumanName,
  FhirInputIdentifier: MantineFhirInputIdentifier,
  FhirInputMarkdown: MantineFhirInputMarkdown,
  FhirInputNumber: MantineFhirInputNumber,
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
