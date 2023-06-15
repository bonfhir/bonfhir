import { FhirUIRenderer } from "@bonfhir/ui/r4b";
import { MantineFhirTable, MantineFhirValue } from "./data-display/index.js";
import { MantineFhirQueryLoader } from "./feedback/index.js";
import {
  MantineFhirInputArray,
  MantineFhirInputBoolean,
  MantineFhirInputContactPoint,
  MantineFhirInputDate,
  MantineFhirInputDateTime,
  MantineFhirInputHumanName,
  MantineFhirInputNumber,
  MantineFhirInputResource,
  MantineFhirInputString,
  MantineFhirInputTerminology,
} from "./inputs/index.js";
import { MantineFhirPagination } from "./navigation/index.js";

export const MantineRenderer: FhirUIRenderer = {
  FhirInputArray: MantineFhirInputArray,
  FhirInputBoolean: MantineFhirInputBoolean,
  FhirInputContactPoint: MantineFhirInputContactPoint,
  FhirInputDate: MantineFhirInputDate,
  FhirInputDateTime: MantineFhirInputDateTime,
  FhirInputHumanName: MantineFhirInputHumanName,
  FhirInputNumber: MantineFhirInputNumber,
  FhirInputResource: MantineFhirInputResource,
  FhirInputString: MantineFhirInputString,
  FhirInputTerminology: MantineFhirInputTerminology,
  FhirPagination: MantineFhirPagination,
  FhirQueryLoader: MantineFhirQueryLoader,
  FhirTable: MantineFhirTable,
  FhirValue: MantineFhirValue,
};
