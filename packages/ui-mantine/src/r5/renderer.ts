import { FhirUIRenderer } from "@bonfhir/ui/r5";
import { MantineFhirTable, MantineFhirValue } from "./data-display/index.js";
import { MantineFhirQueryLoader } from "./feedback/index.js";
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
} from "./inputs/index.js";
import { MantineFhirPagination } from "./navigation/index.js";

export const MantineRenderer: FhirUIRenderer = {
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
